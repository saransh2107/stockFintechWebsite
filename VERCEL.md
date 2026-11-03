# Deploying to Vercel (domain stays at Hostinger)

You keep `mystockfintech.com` registered at Hostinger, keep your Hostinger email working,
and point the website at Vercel. Nothing about the domain ownership changes.

This is the recommended setup for this project. `git push` deploys; there is no file
upload step, which is the thing that went wrong on shared hosting.

---

## Step 1 — Push the project to GitHub

Not a git repo yet, so:

```bash
git init
git add .
git commit -m "Rebuild: Next.js static site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Keep the repo **private** — it is your site source, and `src/lib/site.ts` holds contact
details you may not want scraped.

---

## Step 2 — Import into Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New → Project** → pick the repo → **Import**.
3. Vercel detects Next.js automatically. **Change nothing.** Framework preset Next.js,
   build command `npm run build`, output handled by the framework.
4. **Deploy.**

First build takes ~2 minutes. You get a URL like `stock-fintech.vercel.app` — open it and
check the site works end to end *before* touching DNS.

---

## Step 3 — Add your domain in Vercel

Project → **Settings → Domains** → add:

- `mystockfintech.com`
- `www.mystockfintech.com`

Vercel will show you the DNS records it wants. **Use the values Vercel shows you**, not
the ones below — they are the current defaults but Vercel does change them.

Typically:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

---

## Step 4 — Point DNS from Hostinger

> **Do NOT change your nameservers to Vercel.** You have Hostinger email on this domain
> (hPanel → Emails). Moving nameservers moves DNS control away from Hostinger, your MX
> records go with it, and mail stops. Edit the individual records instead — email is
> untouched that way.

In hPanel → **Domains → DNS / Nameservers → DNS records**:

1. **Delete** the existing `A` record for `@` (it currently points at the Hostinger
   shared server).
2. **Add** `A` · name `@` · value `76.76.21.21` · TTL default.
3. **Delete** any existing `CNAME` or `A` for `www`, then **add**
   `CNAME` · name `www` · value `cname.vercel-dns.com`.
4. **Leave every `MX` and `TXT` record exactly as it is.** Those are your email and
   domain verification.

Propagation is usually minutes, up to a few hours. Vercel's Domains page shows a green
tick and issues the SSL certificate automatically once it sees the records.

---

## Step 5 — Daily news rebuild

The site is statically generated, so fresh headlines need a rebuild. Two options:

### Option A — Vercel Deploy Hook (simplest)

1. Project → **Settings → Git → Deploy Hooks** → create one named `daily-news` on `main`.
   You get a URL.
2. Trigger it once a day. Either:
   - A free scheduler like [cron-job.org](https://cron-job.org) — paste the URL, set
     07:00 IST, done. No code.
   - Or the GitHub Actions workflow below.

### Option B — GitHub Actions

Replace the FTP workflow with this (`.github/workflows/daily-news.yml`):

```yaml
name: Daily news rebuild
on:
  schedule:
    - cron: '30 1 * * *' # 07:00 IST
  workflow_dispatch:
jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - run: curl -fsSL -X POST "${{ secrets.VERCEL_DEPLOY_HOOK }}"
```

Add the hook URL as the repo secret `VERCEL_DEPLOY_HOOK`.

Either way, each trigger re-runs `npm run build`, which re-fetches the RSS feeds.

---

## Step 6 — Verify

```
https://mystockfintech.com/                   -> loads
https://www.mystockfintech.com/               -> 308 to non-www
https://mystockfintech.com/about-us/          -> 308 to /about/
https://mystockfintech.com/news/              -> today's headlines
https://mystockfintech.com/sitemap.xml        -> 18 URLs
```

Vercel issues **308** (permanent) rather than 301. Google treats both as permanent, so
your redirects still pass link equity.

---

## What about Hostinger then?

You keep paying for it until 2027-01-28 anyway, and it stays useful:

- **Domain registration** — stays where it is.
- **Email** — untouched, still Hostinger.
- **The LMS, if you want it back.** WordPress is still sitting in `/wp-old` with its
  database intact. Point a `learn.mystockfintech.com` subdomain at the Hostinger server,
  move WordPress into that subdomain's folder, and you get the best of both: a fast
  static marketing site on Vercel at the root, and LearnPress handling logins and course
  delivery on the subdomain.

That split is cleaner than what you had — the marketing site can no longer be slowed
down or broken by a plugin update.

---

## Vercel vs Hostinger for this site

| | Hostinger shared | Vercel |
| --- | --- | --- |
| Deploy | Manual zip / FTP | `git push` |
| Rollback | Restore a backup | One click, any past deploy |
| Preview builds | No | Every branch gets a URL |
| CDN | Single server, one location | Global edge network |
| Daily news rebuild | Needs external CI anyway | Deploy hook |
| Cost | Already paid | Free tier covers this easily |
| Can host the WP LMS | Yes | No |

The free Hobby tier is sufficient here: a static site with no server functions, well
inside the bandwidth allowance. Note Hobby is for non-commercial use — for a business
site Vercel expects the Pro plan. Read their current terms and decide; the alternative
is Cloudflare Pages or Netlify, which are both free for commercial use and which this
project already has config for (`out/_headers`, `out/_redirects`).
