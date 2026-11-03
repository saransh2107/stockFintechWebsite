/**
 * Writes host-specific deployment files into ./out after `next build`.
 *
 * Generates:
 *   out/_redirects   — Netlify / Cloudflare Pages
 *   out/_headers     — Netlify / Cloudflare Pages
 *   out/.htaccess    — Apache / LiteSpeed (Hostinger, cPanel)
 *
 * vercel.json lives at the repo root and is written by hand.
 *
 * Runs automatically as part of the `build` npm script.
 */

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'out');

if (!existsSync(OUT)) {
  console.error('[deploy-files] ./out not found — run `next build` first.');
  process.exit(1);
}

/* Read the redirect map straight out of the TS source (no build step needed). */
const src = readFileSync(join(ROOT, 'src/lib/redirects.ts'), 'utf8');
const redirects = [...src.matchAll(/from:\s*'([^']+)',\s*to:\s*'([^']+)'/g)].map((m) => ({
  from: m[1],
  to: m[2],
}));

if (!redirects.length) {
  console.error('[deploy-files] no redirects parsed — check src/lib/redirects.ts');
  process.exit(1);
}

const bare = (p) => p.replace(/^\//, '').replace(/\/$/, '');

/* ------------------------------ _redirects ------------------------------ */

writeFileSync(
  join(OUT, '_redirects'),
  [
    '# Legacy WordPress URLs -> rebuilt routes (301, permanent)',
    ...redirects.map((r) => `${r.from.padEnd(84)} ${r.to}  301!`),
    '',
    '# Anything else falls through to the 404 page',
    `${'/*'.padEnd(84)} /404.html  404`,
    '',
  ].join('\n')
);

/* ------------------------------- _headers ------------------------------- */

writeFileSync(
  join(OUT, '_headers'),
  `# Hashed build assets never change — cache them for a year.
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400

# HTML revalidates so content edits go live immediately.
/*.html
  Cache-Control: public, max-age=0, must-revalidate

/
  Cache-Control: public, max-age=0, must-revalidate

# Security headers for every response.
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
`
);

/* ------------------------------- .htaccess ------------------------------- */

const tpl = readFileSync(join(ROOT, 'scripts/templates/htaccess.tpl'), 'utf8');
const rules = redirects
  .map((r) => `  RewriteRule ^${bare(r.from)}/?$ ${r.to} [R=301,L]`)
  .join('\n');

writeFileSync(join(OUT, '.htaccess'), tpl.replace('{{REDIRECTS}}', rules));

console.log(
  `[deploy-files] wrote _redirects, _headers and .htaccess (${redirects.length} legacy redirects)`
);
