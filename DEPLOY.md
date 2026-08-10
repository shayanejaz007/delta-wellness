# Running and deploying Delta Wellness

Three things, in order: run it locally, put it on GitHub, ship it on Vercel.

---

## 1 — Run it on localhost

Requires Node 18.17 or newer (`node -v` to check).

```bash
unzip delta-wellness.zip
cd delta-wellness

npm install
cp .env.example .env.local
npm run dev
```

Open **http://localhost:3000**.

`npm install` takes a minute the first time. If port 3000 is taken, use
`npm run dev -- -p 3001`.

### Filling in .env.local

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=you@yourdomain.com
CONTACT_FROM_EMAIL=noreply@yourdomain.com
NEXT_PUBLIC_HERO_VIDEO=0
```

Everything renders without these. The contact form returns a clean "not
available right now" until the three Resend values are set — it never fails
silently.

To get Resend working: sign up at resend.com, verify a sending domain, create an
API key. `CONTACT_FROM_EMAIL` has to be on the verified domain;
`CONTACT_TO_EMAIL` can be any inbox.

### Checking the production build locally

```bash
npm run build
npm start
```

Worth doing before you deploy — it catches type errors that `dev` tolerates.

---

## 2 — Put it on GitHub

### Using the web interface

1. Go to **github.com/new**, name it `delta-wellness`, set it **Private**,
   and do **not** tick "Add a README" — the repo needs to start empty.
2. Back in your terminal:

```bash
cd delta-wellness
git init
git add .
git commit -m "Delta Wellness research library"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/delta-wellness.git
git push -u origin main
```

GitHub will ask for a password on push — it wants a **personal access token**,
not your account password. Settings → Developer settings → Personal access
tokens → Tokens (classic) → Generate new token, tick `repo`, paste that.

### Using the GitHub CLI instead

```bash
gh repo create delta-wellness --private --source=. --remote=origin --push
```

### About .env.local

`.gitignore` excludes it. Confirm before your first push:

```bash
git status --short | grep env
```

That should print nothing. If `.env.local` appears, stop and fix `.gitignore`
first — a leaked Resend key gets scraped within hours.

---

## 3 — Deploy on Vercel

1. Go to **vercel.com/new** and sign in with GitHub.
2. Import `delta-wellness`. Vercel detects Next.js on its own — leave the
   build command, output directory and install command alone.
3. Before clicking Deploy, open **Environment Variables** and add:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` (or the `.vercel.app` URL) |
| `RESEND_API_KEY` | your Resend key |
| `CONTACT_TO_EMAIL` | where enquiries go |
| `CONTACT_FROM_EMAIL` | your verified sender |
| `NEXT_PUBLIC_HERO_VIDEO` | `1` once the video is in `/public` |

4. Deploy. First build takes two or three minutes.

Every push to `main` redeploys automatically. Pushes to other branches get
preview URLs.

### Custom domain

Project → Settings → Domains → add your domain, then set the DNS records Vercel
shows you at your registrar. Once it resolves, update `NEXT_PUBLIC_SITE_URL` to
the real domain and redeploy — canonical tags, the sitemap and Open Graph URLs
all read from it.

### After the first deploy

- Send a real message through `/contact` and confirm it lands.
- Check `/sitemap.xml` and `/robots.txt` load.
- Run Lighthouse on the deployed URL, not localhost — dev mode scores badly by
  design.
- Submit the sitemap in Google Search Console.

---

## Adding the hero video

See `public/README.md`. Short version: drop `hero.mp4` into `/public`, set
`NEXT_PUBLIC_HERO_VIDEO=1` in both `.env.local` and Vercel's environment
variables, redeploy.

---

## Common snags

**`next: command not found`** — `npm install` didn't finish. Run it again.

**Build fails on Vercel, works locally** — nearly always a missing environment
variable. Check the build log for which one.

**Contact form returns 503** — the three Resend variables aren't set, or aren't
set in the environment you're testing. Vercel needs them added separately from
`.env.local`.

**Fonts don't load** — the three Google fonts are fetched at build time. Behind
a restrictive firewall, either allow `fonts.googleapis.com` or self-host them
with `next/font/local`.

**Contact form works on one request then rejects** — rate limiting is four
submissions per ten minutes per IP. Deliberate. If you run more than one
instance, swap the in-memory limiter for a shared store; there's a note in
`app/api/contact/route.ts`.

---

## Before you go live

- [ ] Read `CONTENT-AUDIT.md` end to end
- [ ] Confirm nothing from its NEEDS REVIEW table made it onto a page
- [ ] No regulatory claim anywhere until a public FDA record is verified
- [ ] No third party's name, title or affiliation without first-party proof
- [ ] Live test of the contact form on the deployed URL
- [ ] Lighthouse run against production
