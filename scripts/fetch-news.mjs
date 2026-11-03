/**
 * Pulls Indian market headlines into src/data/news.json at build time.
 *
 * The site is a static export, so there is no server to fetch on demand.
 * Instead the build bakes the latest headlines into the HTML — which is also
 * the right call for SEO, since crawlers see real content rather than an
 * empty div waiting on client-side JS.
 *
 * To keep it current, rebuild daily (see README > Daily news).
 *
 * Design rules:
 *  - No dependencies. Node's global fetch plus a small RSS reader.
 *  - A failing feed is skipped, never fatal.
 *  - If every feed fails, the existing news.json is left untouched and the
 *    build continues with yesterday's headlines rather than breaking.
 *  - Headline + short snippet + link only. We never republish article bodies.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const OUT = join(process.cwd(), 'src/data/news.json');
const MAX_ITEMS = 18;
const SNIPPET_LEN = 180;
const TIMEOUT_MS = 12000;

/*
 * Feeds that serve direct article links and real snippets.
 *
 * Deliberately excluded: Moneycontrol, Business Standard and NDTV Profit all
 * return 403 to non-browser clients, and Google News RSS only hands back
 * news.google.com redirect URLs rather than links to the publisher.
 */
const FEEDS = [
  {
    source: 'Economic Times',
    url: 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms',
  },
  { source: 'LiveMint', url: 'https://www.livemint.com/rss/markets' },
  {
    source: 'Hindu BusinessLine',
    url: 'https://www.thehindubusinessline.com/markets/feeder/default.rss',
  },
  {
    source: 'ET Wealth',
    url: 'https://economictimes.indiatimes.com/wealth/invest/rssfeeds/837555174.cms',
  },
  {
    source: 'ET Mutual Funds',
    url: 'https://economictimes.indiatimes.com/mf/rssfeeds/359241701.cms',
  },
];

/* ----------------------------- tiny RSS reader ---------------------------- */

const strip = (s = '') =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/\s+/g, ' ')
    .trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? strip(m[1]) : '';
};

function parseItems(xml, source) {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
  const out = [];
  for (const b of blocks) {
    const title = tag(b, 'title');
    let link = tag(b, 'link');
    // Atom-style <link href="..."/> fallback
    if (!link) {
      const m = b.match(/<link[^>]*href=["']([^"']+)["']/i);
      if (m) link = m[1];
    }
    if (!title || !link || !/^https?:\/\//i.test(link)) continue;

    const raw = tag(b, 'pubDate') || tag(b, 'dc:date') || tag(b, 'published');
    const t = raw ? Date.parse(raw) : NaN;

    let snippet = tag(b, 'description');
    if (snippet.length > SNIPPET_LEN) {
      snippet = snippet.slice(0, SNIPPET_LEN).replace(/\s+\S*$/, '') + '…';
    }
    // Some feeds repeat the headline as the description — drop the noise.
    if (snippet && title.startsWith(snippet.replace(/…$/, '').slice(0, 40))) snippet = '';

    out.push({
      title,
      link,
      source,
      snippet,
      publishedAt: Number.isFinite(t) ? new Date(t).toISOString() : null,
    });
  }
  return out;
}

async function getFeed({ url, source }) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ac.signal,
      headers: {
        // Some outlets reject a bare fetch UA.
        'User-Agent': 'Mozilla/5.0 (compatible; StockFintechBot/1.0; +https://mystockfintech.com)',
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = parseItems(await res.text(), source);
    console.log(`  ok    ${source.padEnd(18)} ${String(items.length).padStart(3)} items`);
    return items;
  } catch (err) {
    console.log(`  skip  ${source.padEnd(18)} ${err.message}`);
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/* ---------------------------------- main --------------------------------- */

console.log('[news] fetching market headlines');

const settled = await Promise.all(FEEDS.map(getFeed));
let items = settled.flat();

// Dedupe on a normalised headline — outlets syndicate the same story.
const seen = new Set();
items = items.filter((i) => {
  const k = i.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 70);
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

items.sort((a, b) => {
  if (a.publishedAt && b.publishedAt) return b.publishedAt.localeCompare(a.publishedAt);
  if (a.publishedAt) return -1;
  if (b.publishedAt) return 1;
  return 0;
});
items = items.slice(0, MAX_ITEMS);

if (!items.length) {
  if (existsSync(OUT)) {
    console.log('[news] every feed failed — keeping the existing news.json');
    process.exit(0);
  }
  console.log('[news] every feed failed and no cache exists — writing an empty set');
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(
  OUT,
  JSON.stringify({ fetchedAt: new Date().toISOString(), items }, null, 2) + '\n'
);
console.log(`[news] wrote ${items.length} headlines to src/data/news.json`);
