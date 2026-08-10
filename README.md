# Delta Wellness

A sourced research library for published work on neural signalling, mental
states, biomechanics and psychomechanics.

Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Lenis · Resend

---

## Running it

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph |
| `RESEND_API_KEY` | Contact form delivery. Server-only — never exposed to the client |
| `CONTACT_TO_EMAIL` | Where enquiries are delivered |
| `CONTACT_FROM_EMAIL` | Verified Resend sender |
| `NEXT_PUBLIC_HERO_VIDEO` | Set to `1` once a hero video is supplied |

Without the three contact variables the form returns a clean 503 and tells the
visitor to try later. It never fails silently or logs to the console only.

## The content rule

**Read `CONTENT-AUDIT.md` before adding anything.**

Every substantive statement resolves to an entry in `lib/sources.ts` carrying the
quote, author, publication, document, page and — where one exists — a link. The
`SourceEvidence` component renders all of that together. If a statement cannot be
rendered through it, it does not belong on the site.

Two things are deliberately absent and must stay absent until documented:

- **Any regulatory status.** No FDA term of any kind appears in the supplied
  material. FDA records are public; supply a 510(k)/De Novo/PMA number or
  registrant name, verify it against the FDA database, and publish the exact
  official wording with a link. Never a paraphrase — "registered" is not
  "cleared", and "cleared" is not "approved".
- **Unverified people.** No name, title, qualification or affiliation is
  published on secondary evidence. See the audit for the outstanding case.

## Adding a hero video

Drop `hero.mp4`, `hero-mobile.mp4` and `hero-poster.jpg` into `/public`, set
`NEXT_PUBLIC_HERO_VIDEO=1`. The mobile source is served below 768px, the poster
prevents layout shift, and the layer is skipped entirely under
`prefers-reduced-motion`. Until then the hero renders an ambient SVG signal
field — no stand-in footage pretending to be laboratory imagery.

## Motion

- Lenis runs only on fine-pointer, motion-tolerant sessions. Touch devices keep
  native scrolling and the instance is destroyed on unmount.
- Animation is limited to `transform` and `opacity`.
- Reveal distances shrink on small screens; `prefers-reduced-motion` collapses
  everything to a plain fade and disables parallax.
- The pinned panel in the level hierarchy is desktop-only.
- No content depends on animation to be readable.

## Accessibility

Skip link, visible focus rings, labelled form controls with `aria-invalid` and
error association, `aria-live` on the result count, body scroll lock and focus
return on the mobile menu, single `h1` per page, the readout exposed to screen
readers as text.

## Structure

```
app/            routes, API, sitemap, robots
components/     layout · ui · home · research · contact
lib/sources.ts  the traceability registry
lib/publications.ts  bibliography, pathway model, level hierarchy
CONTENT-AUDIT.md     what shipped, what didn't, and why
```

## Before deploying

- [ ] Set all environment variables in the host
- [ ] Send a live test through the contact form
- [ ] Swap the in-memory rate limiter for a shared store if running more than
      one instance (see the note in `app/api/contact/route.ts`)
- [ ] Re-read `CONTENT-AUDIT.md` and confirm nothing in the NEEDS REVIEW table
      has quietly made it into a page
