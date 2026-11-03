# Stock Fintech — mystockfintech.com

A ground-up rebuild of the Stock Fintech website: Next.js 15 (App Router), TypeScript,
Tailwind CSS and Framer Motion, exported as **pure static HTML**.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # builds + exports to ./out, then writes deploy configs
npm run analyze  # prints the 12 largest JS chunks
```

`npm run build` produces a fully static `./out` directory. There is no Node server to
run in production — any static host will do.

> **Stop the dev server before running a build.** `next dev` and `next build` share the
> `.next` directory and will clobber each other — the symptom is a successful-looking
> build whose chunks are several MB of unminified dev code. If `out/_next/static/chunks/
> app/layout.js` is over ~100 KB, that is what happened: stop dev, `rm -rf .next out`,
> rebuild.

---

## What's in here

```
src/
├── app/
│   ├── layout.tsx              root shell: fonts, metadata, JSON-LD, preloader
│   ├── page.tsx                homepage
│   ├── globals.css             design tokens, component classes, preloader CSS
│   ├── sitemap.ts              generates /sitemap.xml
│   ├── robots.ts               generates /robots.txt
│   ├── not-found.tsx           404 page
│   ├── about/ careers/ contact/ courses/ mentors/ pricing/
│   └── terms/ privacy/ refund-policy/
├── components/
│   ├── Preloader.tsx           the candlestick market-open intro
│   ├── MotionProvider.tsx      LazyMotion wrapper (see "Animation" below)
│   ├── motion.tsx              shared scroll-reveal primitives
│   ├── Header.tsx Footer.tsx Logo.tsx Icons.tsx
│   ├── TickerTape.tsx Counter.tsx FloatingUI.tsx ContactForm.tsx
│   ├── ui.tsx                  SectionHeading, CourseCard, Accordion, CTABand…
│   └── home/                   Hero, Sections, Social
└── lib/
    ├── site.ts                 ALL site copy, contact details, stats, FAQs
    ├── courses.ts              course catalogue + pricing
    ├── seo.ts                  metadata helper + JSON-LD builders
    └── redirects.ts            301 map from the old WordPress URLs
```

### Editing content

Almost everything you'd want to change lives in **two files**:

| Change | File |
| --- | --- |
| Phone, email, address, hours, social links | `src/lib/site.ts` |
| Stats, testimonials, FAQs, mentors, career roles | `src/lib/site.ts` |
| Course names, fees, syllabus, outcomes | `src/lib/courses.ts` |

Both feed the pages *and* the structured data, so you never update a number twice.

---

## The preloader

`src/components/Preloader.tsx`. An **uptrend printing itself**: 18 all-green candles
step up left to right in a rising staircase (each lifting from below its close and
growing into its body), a gradient trendline draws through the closes, the price readout
rallies from 24,102.40 to 24,836.30, and a glowing breakout marker lands on the final
close. Wordmark rises letter by letter; ticker tape runs along the bottom.

Behaviour that matters:

- Dismisses on `window.load`, but shows for **no less than 3.5s** (so the uptrend has
  time to finish) and **no more than 6s** (so a slow third-party asset can never hold
  the page hostage).
- Shown **once per browser session** — repeat navigations skip straight to the page.
  To see it again, hard-refresh in a new tab or a private window.
- Skipped entirely for visitors with `prefers-reduced-motion`.
- Candle geometry is a fixed array, never random, so server and client markup match.

### Retiming it

The choreography is paced to land just inside `MIN_MS`. Three places have to move
together, or the trendline will still be drawing when the overlay wipes away:

| What | Where |
| --- | --- |
| `MIN_MS`, candle `LEAD`/`STEP`, wordmark + marker delays | `Preloader.tsx` |
| `.preloader-candle` animation duration | `globals.css` |
| `.preloader-path` draw duration and delay | `globals.css` |

`.preloader-path` also carries a `stroke-dasharray` matched to the measured trendline
length (~355 user units). **If you change the `CANDLES` array, re-measure it** — too
short and the line never finishes drawing, too long and it completes early.
- Shown **once per browser session** — repeat navigations skip straight to the page.
- Skipped entirely for visitors with `prefers-reduced-motion`.
- The candle geometry is a fixed array, never random, so server and client markup match.

Tune `MIN_MS` / `MAX_MS` at the top of the file.

---

## Animation

Built on Framer Motion, but through `LazyMotion` rather than the full bundle.

**Use `m.div`, not `motion.div`.** `MotionProvider` runs in `strict` mode, so a stray
`motion.*` component throws immediately instead of silently pulling the full library
back in. This is worth ~28 kB of JavaScript on every page.

`domAnimation` covers animation, variants, `AnimatePresence` exits, `whileInView`,
`whileHover`, `whileTap` and focus — everything this site uses. If you ever need drag
or layout animations, swap `domAnimation` for `domMax` in `MotionProvider.tsx`.

Shared primitives in `src/components/motion.tsx`:

- `<Reveal>` — fades/slides itself into view once
- `<StaggerGroup>` / `<StaggerItem>` — staggered children
- `hoverLift` — the spread-in hover behaviour used on cards

---

## Theme (light / dark)

Every colour resolves through a CSS variable, so the whole palette flips without
touching a class name. Values live in `globals.css` under `:root` (dark) and
`:root[data-theme='light']`; `tailwind.config.ts` maps the Tailwind tokens onto them.

- `themeScript` in `src/components/theme.tsx` is inlined into `<head>` and runs before
  first paint, so there is **no theme flash**.
- Order of preference: stored choice → OS `prefers-color-scheme` → dark.
- The OS is only followed while the visitor has not clicked the toggle.
- Brand hues darken in light mode (`--c-brand`, `--c-cyan`...) so they stay legible on
  white. Bull/bear stay green/red in both themes — they carry market meaning, not brand
  meaning.

Adding a colour means adding it in three places: both `:root` blocks and the Tailwind
config. Use plain `border-line` (it is a pre-baked rgba and takes no opacity modifier).

---

## The logo

`src/components/BrandMark.tsx` is a vector trace of the original brand PNG, which is
kept for reference at `brand-assets/logo-original-wide.png`.

The geometry — five diagonal bars rising left to right with a corner arrowhead on the
longest — was measured off the source artwork by rotating into its 45° frame, and
verified at ~96% pixel agreement against the original. The gradient colours are sampled
from the same file: magenta `#BC06F5` at bottom-left through periwinkle to cyan
`#16F1FF` at top-right.

**The bars are a real knockout (an SVG mask), not filled navy.** That is what lets one
mark work on both themes — whatever is behind it shows through.

`interactive` adds the premium treatment: the disc tilts in 3D toward the pointer, a
specular sheen tracks across it, and it lifts off its cast shadow. There is also a
baked-in lit-sphere look (highlight upper-left, contact shade lower-right, glossy rim)
that is present even when static.

> If you still have the original vector (AI / EPS / SVG), drop it in and replace the
> `BARS` / `ARROW` constants — a trace is very close but not identical to the source.

---

## Daily news

`scripts/fetch-news.mjs` pulls Indian market headlines into `src/data/news.json` at
build time. It runs automatically as the first step of `npm run build`, or on its own
with `npm run news`.

Content is baked into the HTML rather than fetched in the browser, which is both faster
and what lets crawlers see it. Headline, short snippet and an outbound `nofollow` link
only — article bodies are never republished.

Feeds: Economic Times (Markets, Wealth, Mutual Funds), LiveMint, Hindu BusinessLine.
Moneycontrol, Business Standard and NDTV Profit all return 403 to non-browser clients,
and Google News RSS only returns redirect URLs, so none of them are used.

Failure handling: a dead feed is skipped, never fatal. If *every* feed fails, the
existing `news.json` is left alone and the build continues with yesterday's headlines.

### Keeping it current

The site is static, so "daily" means **rebuild daily**. Pick whichever fits your host:

| Host | How |
| --- | --- |
| Vercel | Project Settings → Cron Jobs, or a Deploy Hook called from any scheduler |
| Netlify | Build & deploy → Build hooks, then trigger it from a daily cron |
| GitHub Actions | `schedule: - cron: '30 1 * * *'` (07:00 IST) running `npm run build` + deploy |
| cPanel | A nightly cron that runs the build and rsyncs `out/` into `public_html` |

---

## SEO

### What is implemented

- Per-page title, description, canonical, OpenGraph and Twitter cards via `pageMeta()`.
- **Structured data**: `EducationalOrganization`, `LocalBusiness` (address, geo, hours),
  `WebSite`, `FAQPage`, `ItemList`, `BreadcrumbList`, `Course` per course (with price and
  `CourseInstance`), `EducationalOccupationalProgram` per landing page, and
  `CollectionPage` for news.
- `sitemap.xml` and `robots.txt` generated from the real route list at build time.
- `llms.txt` for AI answer engines (ChatGPT, Perplexity, AI Overviews).
- 301 redirects from every old WordPress URL — this is what preserves existing rankings.
- One `h1` per page, semantic headings, descriptive links, skip-to-content.
- Sitewide internal linking into the landing pages from the footer "Popular" block.

### The three landing pages

| Page | Targets | Realistic outlook |
| --- | --- | --- |
| `/stock-market-course-in-lucknow/` | "stock market course in Lucknow", "share market classes Lucknow", "trading institute Lucknow" | **Winnable in 2–6 months.** Low competition, highest conversion. |
| `/stock-market-course/` | "stock market course", "stock course", "stock learning", "share market course" | Long game. Needs backlinks + time. |
| `/trading-course/` | "trading course", "intraday trading course", "options trading course" | Long game. Needs backlinks + time. |

Each is 1300+ words of genuinely distinct content with its own FAQ block and schema.
They are deliberately **not** templated variants of each other — Google treats
near-duplicate keyword pages as doorway pages and suppresses them.

### Honest expectations

On-page work cannot by itself win a national head term like "trading course". Those
SERPs are held by Zerodha Varsity, NSE Academy, Udemy and Groww, which have years of
domain authority and thousands of referring domains. Code gets you eligible to rank; it
does not get you to #1 on its own.

What actually moves those rankings, in rough order of impact:

1. **Google Business Profile.** Claim and fully complete it. For a physical institute
   this is the single highest-return action, and it drives the Lucknow map pack.
2. **Real reviews.** Ask every graduating batch. See the note below about schema.
3. **Backlinks.** Local press, Lucknow education directories, guest posts, alumni
   mentions, partnerships with colleges.
4. **Content cadence.** A blog earning links over time is what eventually makes the
   national terms reachable.
5. **Search Console.** Submit the sitemap, then actually read the Queries report and
   write pages for what people already find you for.

### A deliberate omission

`localBusinessLd` carries **no `aggregateRating`**. The earlier draft had
`reviewCount: 1240`, which was invented. Google requires aggregate ratings to come from
genuine reviews visible on the page, and fabricated review markup is one of the fastest
routes to a structured-data manual action — which would undo everything else here. Add
it back only with real numbers, and surface those reviews on the site.

---

## Performance

| Metric | Value |
| --- | --- |
| Homepage HTML | 23.7 KB gzipped |
| CSS (whole site) | 9.1 KB gzipped |
| First-load JS, homepage | 160 KB |
| First-load JS, inner pages | 131 KB |
| Images | none — every graphic is inline SVG |
| Fonts | 2 families, self-hosted, subset, `display: swap` |

What makes it fast:

- **Static export.** No PHP, no database, no plugin chain. Every page is a flat HTML
  file served from cache.
- **Content is in the HTML.** Everything a crawler needs is server-rendered; JS only
  hydrates interactivity.
- **No image payload.** Charts, icons and the OG card are all SVG.
- **Self-hosted fonts** via `next/font`, subset to Latin, with a metric-matched
  fallback so there's no layout shift when they swap in.
- **Lazy animation bundle** (see above).
- **Immutable caching** on hashed assets via the generated headers files.

### Checking it

```bash
npm run build
npx serve out -l 4000
npx lighthouse http://localhost:4000 --view
```

---

### After you deploy

1. Submit `https://mystockfintech.com/sitemap.xml` in Google Search Console and request
   indexing for the three landing pages.
2. Claim and complete the Google Business Profile — highest-return action for Lucknow.
3. Run the live URLs through the [Rich Results Test](https://search.google.com/test/rich-results).
4. Confirm the old URLs 301 correctly — especially `/about-us/` and the long UTP course URL.
5. Add your real social profile URLs to `socials` in `src/lib/site.ts`; they feed the
   `sameAs` field Google uses for the knowledge panel.
6. Set up the daily rebuild so the news feed does not go stale.

---


## Deploying

Host-specific guides:
>
> - **[CLOUDFLARE.md](CLOUDFLARE.md)** — recommended. Free for commercial use, edge
>   nodes inside India. Note: use a **Pages** project, not Workers — Cloudflare's
>   Next.js auto-detect picks the OpenNext adapter, which fails on a static export.
> - **[VERCEL.md](VERCEL.md)** — best DX, but the free tier is non-commercial.
> - **[HOSTINGER.md](HOSTINGER.md)** — serving from the Premium plan you already pay
>   for, including backing up WordPress and what happens to the LearnPress LMS.

The build writes host-specific config into `./out` automatically.

### Vercel
Connect the repo. `vercel.json` at the root handles redirects, caching and security
headers. Nothing else to configure.

### Netlify / Cloudflare Pages
Build command `npm run build`, publish directory `out`. The generated `out/_redirects`
and `out/_headers` are picked up automatically.

### Hostinger / cPanel / shared Apache hosting
Run `npm run package` to build and produce `site.zip`, then extract it into
`public_html`. The generated `out/.htaccess` handles HTTPS, non-www, the legacy 301s,
compression, caching and the 404 page.

**Hidden files must be included in the upload** — without `.htaccess` you silently lose
every redirect. `npm run package` forces dotfiles into the zip for exactly this reason.

For the daily news rebuild on shared hosting, use the GitHub Actions workflow at
`.github/workflows/deploy-hostinger.yml` — shared plans have no Node.js runtime, so the
build has to happen off-server. Full walkthrough in [HOSTINGER.md](HOSTINGER.md).

---

## The contact form

The site is static, so there's no server action. `ContactForm.tsx` reads
`NEXT_PUBLIC_FORM_ENDPOINT`:

```bash
# .env.local
NEXT_PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit
```

Works with Web3Forms, Formspree, Basin or your own handler — anything that accepts a
JSON POST. **With no endpoint set, the form falls back to opening a pre-filled email**,
so the page is never a dead end. It also carries a honeypot field against bots.

---

## Things to replace before launch

These are placeholders, flagged here so they don't ship by accident:

1. **Course fees** in `src/lib/courses.ts` — the old site showed no prices anywhere, so
   these are realistic guesses. They appear on the pricing page *and* in `Course`
   structured data, so wrong numbers would be published to Google.
2. **Social media URLs** in `src/lib/site.ts` — currently `#`.
3. **The form endpoint** (above).
4. **Map coordinates** in `seo.ts` (`localBusinessLd.geo`) — currently approximate for
   Ashiyana, Lucknow. Use the exact lat/long from your Google Business Profile.
5. **Stats.** The old site carried conflicting figures (`10,000+` students in one place,
   `50 K` in another, plus a template-default `183,406 learner reviews` and `2.3M`
   subscribers on all four social accounts). I kept the conservative, consistent ones:
   10,000+ students and the 4.85 rating. The 92% NISM pass rate and the `reviewCount:
   1240` in `LocalBusiness` schema are **estimates I introduced** — replace them with
   real figures or remove them, because fabricated review counts in structured data can
   get a site penalised.
6. **The LMS.** Course enrolment, login and cart lived in LearnPress on the old
   WordPress site; none of that is in this static build. Either keep WordPress running
   on a subdomain for the LMS, or point "Enrol" at a payment link.
