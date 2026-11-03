# Deploying to Hostinger

Written for: whoever is doing the deploy on the Hostinger **Premium** plan where
`mystockfintech.com` currently runs WordPress.

This site is a **static export** — plain HTML, CSS and JS. Hostinger just serves files;
nothing Node-related runs on the server. That means it works on every Hostinger plan,
Premium included, and it will be dramatically faster than the WordPress site it replaces.

---

## Before you touch anything: two decisions

### 1. Back up the existing WordPress site

Non-negotiable. The deploy replaces the contents of `public_html`.

- **hPanel → Files → Backups → Create new backup.** Wait for it to finish and download it.
- Also export the database: **hPanel → Databases → phpMyAdmin → Export → Go.**

Keep both somewhere off Hostinger. If anything goes wrong you can restore in minutes.

### 2. Decide what happens to the LMS

The old WordPress site runs **LearnPress** — the course pages, shopping cart, student
login and `/account/` area. **None of that exists in this rebuild.** It is a marketing
site: it sells the courses and captures enquiries, but it does not enrol, charge or log
anyone in.

Pick one before you deploy:

| Option | What to do | Trade-off |
| --- | --- | --- |
| **A. Retire the LMS** (simplest) | Deploy over `public_html`. Enrolment happens by phone, WhatsApp and the contact form. | You lose online self-serve enrolment. Fine if most students enrol in person or by call — which, for a Lucknow classroom institute, is usually the case. |
| **B. Keep the LMS on a subdomain** | Move WordPress to `learn.mystockfintech.com`, deploy the static site to the root domain, point "Enrol" buttons at the subdomain. | Keeps student logins and course delivery working. Takes an afternoon to migrate WordPress and fix its site URL. |
| **C. Payment links only** | Deploy over `public_html`, add a Razorpay/Instamojo payment link per course. | Online payment without running an LMS. Course delivery moves to WhatsApp/Drive/Zoom. |

The redirects in `src/lib/redirects.ts` currently assume **Option A** — `/account/`,
`/cart/` and `/checkout/` all 301 to `/contact/`. If you choose B, change those to point
at the subdomain and rebuild.

---

## Step 1 — Get your FTP credentials

**hPanel → Files → FTP Accounts.**

Note down:

- **FTP hostname** (something like `ftp.mystockfintech.com` or an IP)
- **FTP username**
- **FTP password** — set a new one here if you don't know it
- Port **21** (FTPS)

---

## Step 2 — Pick a deploy method

### Method A: GitHub Actions (recommended)

This is the one to use, because **the news feed needs a daily rebuild** and this does it
for you. Hostinger Premium is shared hosting with no Node.js runtime, so the build cannot
run there — GitHub builds it and uploads the result.

1. Push this project to a GitHub repo (it is not a git repo yet):

   ```bash
   git init
   git add .
   git commit -m "Rebuild: Next.js static site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. In the repo: **Settings → Secrets and variables → Actions → New repository secret.**
   Add three:

   | Secret | Value |
   | --- | --- |
   | `HOSTINGER_FTP_HOST` | your FTP hostname |
   | `HOSTINGER_FTP_USER` | your FTP username |
   | `HOSTINGER_FTP_PASSWORD` | your FTP password |

3. That's it. `.github/workflows/deploy-hostinger.yml` then runs:
   - on every push to `main`
   - **daily at 01:30 UTC (07:00 IST)** — refreshes the market news before market open
   - whenever you click "Run workflow" in the Actions tab

   Each run fetches fresh headlines, builds, sanity-checks the output and uploads only
   the changed files to `/public_html/`.

### Method B: Manual zip upload

Fine for a one-off, but the news feed will go stale until you repeat it.

```bash
npm run package      # builds, then writes site.zip
```

Then **hPanel → Files → File Manager → `public_html`** → Upload `site.zip` → right-click
→ **Extract** → delete the zip.

---

## Step 3 — Clear out WordPress

Once you have the backup from the top of this page:

**hPanel → Files → File Manager → `public_html`** → select all → Delete.

Make sure **"Show hidden files"** is enabled in the File Manager settings menu first, or
WordPress's own `.htaccess` will survive and fight with ours.

> If you chose Option B (LMS on a subdomain), migrate WordPress to the subdomain's
> directory **before** clearing this one.

Now run the deploy (push to GitHub, or extract the zip).

---

## Step 4 — Confirm `.htaccess` landed

This is the single most common thing to get wrong, because it is a hidden file.

In File Manager, enable **Show hidden files** and check that `public_html/.htaccess`
exists and is about 3 KB. It is what provides:

- HTTPS and non-www redirects
- **14 permanent redirects from the old WordPress URLs** — this is what preserves your
  existing Google rankings
- Long-lived caching on hashed assets, no caching on HTML
- Security headers
- The 404 page

If it is missing, the site will still load but you will quietly lose your SEO equity.

---

## Step 5 — SSL

**hPanel → Security → SSL.** Confirm an active certificate on `mystockfintech.com`. If
there isn't one, install the free Let's Encrypt certificate and wait a few minutes.

Do **not** enable Hostinger's "Force HTTPS" toggle as well — our `.htaccess` already does
the redirect, and running both can cause a redirect loop. Pick one; `.htaccess` is fine.

---

## Step 6 — Verify

Work through this list once the DNS/cache settles (a few minutes):

```
https://mystockfintech.com/                        -> loads, preloader runs
https://www.mystockfintech.com/                    -> 301 to non-www
http://mystockfintech.com/                         -> 301 to https
https://mystockfintech.com/about-us/               -> 301 to /about/
https://mystockfintech.com/pricing-plan/           -> 301 to /pricing/
https://mystockfintech.com/term_conditions/        -> 301 to /terms/
https://mystockfintech.com/stock-market-course-in-lucknow/   -> loads
https://mystockfintech.com/news/                   -> today's headlines
https://mystockfintech.com/sitemap.xml             -> 18 URLs
https://mystockfintech.com/robots.txt              -> loads
https://mystockfintech.com/llms.txt                -> loads
https://mystockfintech.com/nonsense-page           -> 404 page, not a blank screen
```

Check the redirects return a real **301**, not a 302 or a soft redirect:

```bash
curl -sI https://mystockfintech.com/about-us/ | head -3
```

Then:

1. **Google Search Console** → add the property → submit `/sitemap.xml` → request
   indexing on the three landing pages.
2. **Google Business Profile** → claim and complete it. For a Lucknow classroom
   institute this is the highest-return SEO action available to you.
3. Run the homepage through [PageSpeed Insights](https://pagespeed.web.dev/).

---

## Caching gotcha

Hostinger Premium has a built-in **LiteSpeed cache**. After each deploy, if you see stale
content: **hPanel → Performance → Cache Manager → Purge all.** The `.htaccess` sets HTML
to `must-revalidate`, so this should be rare — but purge once right after the first
deploy, since the server will be holding WordPress pages.

---

## Rolling back

If something is wrong and you need the old site immediately:

**hPanel → Files → Backups → Restore** the backup you took in step 0. It replaces
`public_html` and the database. Takes a few minutes.

---

## What NOT to do

- **Don't install WordPress alongside it.** The static site owns `public_html`.
- **Don't enable Hostinger's "Force HTTPS" and the `.htaccess` HTTPS rule together** —
  redirect loop.
- **Don't edit files directly in File Manager.** The next deploy overwrites them. Change
  the source, rebuild, redeploy.
- **Don't delete `.htaccess`** when cleaning up between deploys.
