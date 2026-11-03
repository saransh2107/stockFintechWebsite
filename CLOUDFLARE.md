# Deploying to Cloudflare Pages

Free for commercial use, unlimited bandwidth, and edge nodes in Mumbai, Delhi,
Bengaluru, Chennai, Hyderabad and Kolkata — so pages are served from inside India to
the students you are actually trying to reach.

---

## Important: use Pages, not Workers

Cloudflare's "Next.js" auto-detection assumes a Next.js app with a **server** and sets
the build command to:

```
npx opennextjs-cloudflare build
```

That is the OpenNext adapter. It bundles a Next.js server, middleware and cache handlers
into a Worker.

**This project has no server.** `next.config.mjs` sets `output: 'export'`, which emits
plain HTML, CSS and JS into `out/`. OpenNext finds no server to bundle and exits 1:

```
✘ [ERROR] Running custom build 'npx opennextjs-cloudflare build' failed.
```

Nothing is wrong with the code. The wrong tool was selected. Use a **Pages** project with
a static output directory instead — it is simpler, faster and natively understands the
`_headers` and `_redirects` files this build already generates.

> If a Worker named `stockfintechwebsite` was already created, delete it:
> **Workers & Pages → stockfintechwebsite → Settings → Delete**. It will never build.

---

## Step 1 — Create the Pages project

**Workers & Pages → Create → Pages → Connect to Git**

Pick `saransh2107/stockFintechWebsite`, then set:

| Setting | Value |
| --- | --- |
| Framework preset | **Next.js (Static HTML Export)** |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | *(leave blank)* |
| Production branch | `main` |

If the preset list has no "Static HTML Export" option, choose **None** and enter the
build command and output directory by hand. Those two fields are what matter.

**Save and Deploy.** First build takes 2–3 minutes.

### Environment variables

None are required. `.nvmrc` pins Node 22 for the build.

Add one only if you wire up the contact form:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_FORM_ENDPOINT` | your Web3Forms / Formspree endpoint |

Without it the form falls back to opening a pre-filled email, so the page is never a
dead end.

### A note on the build

`npm run build` fetches live RSS headlines before building. Cloudflare's build
environment allows outbound network, so this works. If a feed is down the script skips
it, and if every feed fails it falls back to the `src/data/news.json` committed in the
repo — the build never fails because of the news.

---

## Step 2 — Check the preview URL

You get `stockfintechwebsite.pages.dev`. **Test it fully before touching DNS:**

- Homepage loads, preloader runs, styling is present
- `/news/`, `/trading-course/`, `/stock-market-course-in-lucknow/` all load
- The light/dark toggle works
- `/sitemap.xml` lists 18 URLs

If styling is missing, the output directory is wrong — it must be `out`.

---

## Step 3 — Add your domain

Project → **Custom domains → Set up a domain** → `mystockfintech.com`, then repeat for
`www.mystockfintech.com`.

Cloudflare will tell you the domain must use Cloudflare DNS. That means moving
nameservers — see the next step, and read the email warning first.

---

## Step 4 — Move DNS (carefully — your email lives here)

You have Hostinger email on this domain. DNS controls mail routing through `MX` records,
so those must survive the move.

**Before you change anything:**

1. hPanel → **Domains → DNS / Nameservers → DNS records**
2. **Screenshot the entire list**, or export it. Every row.
3. Pay particular attention to `MX` records and any `TXT` records (SPF, DKIM, domain
   verification).

**Then:**

1. In Cloudflare: **Add a site** → `mystockfintech.com` → Free plan.
2. Cloudflare scans your existing DNS and imports what it finds. **This is the step to
   check carefully** — compare the imported list against your screenshot and manually
   re-add anything missing, especially `MX` and `TXT`.
3. Cloudflare gives you two nameservers, e.g. `xxx.ns.cloudflare.com`.
4. hPanel → **Domains → Nameservers → Change nameservers** → enter Cloudflare's two.
5. Wait for propagation — usually under an hour, up to 24.

Once active, Cloudflare issues SSL automatically and the Pages custom domain goes live.

**Send yourself a test email afterwards** from an outside address to confirm mail still
arrives. If it does not, the MX records did not come across — re-add them in Cloudflare's
DNS tab and it recovers within minutes.

---

## Step 5 — Daily news rebuild

Pages does not rebuild on its own. Create a hook and fire it daily.

1. Project → **Settings → Builds & deployments → Deploy hooks** → create one named
   `daily-news` on branch `main`. Copy the URL.
2. Trigger it once a day with either:
   - [cron-job.org](https://cron-job.org) — free, no code. Paste the URL, set 07:00 IST.
   - Or GitHub Actions (`.github/workflows/daily-news.yml`):

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
           - run: curl -fsSL -X POST "${{ secrets.CF_DEPLOY_HOOK }}"
     ```

     with the hook URL stored as the repo secret `CF_DEPLOY_HOOK`.

---

## Step 6 — Verify live

```
https://mystockfintech.com/                   -> loads, styled
https://www.mystockfintech.com/               -> redirects to non-www
https://mystockfintech.com/about-us/          -> 301 to /about/
https://mystockfintech.com/pricing-plan/      -> 301 to /pricing/
https://mystockfintech.com/news/              -> today's headlines
https://mystockfintech.com/sitemap.xml        -> 18 URLs
```

The redirects come from `out/_redirects`, which the build generates from
`src/lib/redirects.ts`. Pages reads that file natively — no configuration needed.
Caching and security headers come from `out/_headers` the same way.

---

## What Hostinger still does

- **Domain registration** — unchanged, you just point its nameservers elsewhere.
- **Email** — unchanged, as long as the MX records moved correctly.
- **The WordPress LMS** — still in `/wp-old` with its database. If you want it back,
  point `learn.mystockfintech.com` at the Hostinger server and move WordPress into that
  subdomain's folder. Static marketing site on Cloudflare at the root, LearnPress on the
  subdomain.

---

## If you would rather not move nameservers

**Netlify** is the fallback: free for commercial use, connects to the same GitHub repo,
and works with plain A/CNAME records so Hostinger keeps your DNS and email untouched.
Build command `npm run build`, publish directory `out` — `netlify.toml` in this repo
already sets both. Slightly weaker CDN presence in India and a 100 GB/month bandwidth
cap, which this site will not come close to.
