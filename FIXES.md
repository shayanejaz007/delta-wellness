# Fixes in this build

## 1. People and Method pages rendered blank — FIXED

**Cause.** Reveal animations start elements at `opacity: 0`, and an
IntersectionObserver adds a class to fade them in. That observer was mounted in
the root layout, which mounts **once**. The homepage worked; any page reached by
client-side navigation never had its elements observed, so they stayed at
opacity 0 permanently.

**Fix, in three layers so this cannot recur:**

1. `RevealObserver` now depends on `usePathname()` and re-scans on every route
   change.
2. Content is **visible by default** in CSS. It is only hidden by
   `html.js .reveal`, and that `js` class is added by an inline script before
   first paint. If JavaScript fails entirely, everything still renders.
3. A 2-second timeout force-reveals anything still hidden.

Verified by serving the production build and counting rendered text:

```
/           2366 words
/about       887 words
/technology 1557 words
/team        718 words
/research   1012 words
/contact     553 words
```

## 2. Hero didn't animate — FIXED

It required a `hero.mp4` that was never supplied, so it fell back to a static
image. The hero now animates on its own: three SVG signal layers drift on
`transform` only, which runs on the GPU compositor with no main-thread cost.

A real video is still optional — drop `hero.mp4` in `/public` and set
`NEXT_PUBLIC_HERO_VIDEO=1` and it mounts over the top, using the generated plate
as its poster.

## 3. Glass looked dull — FIXED

Glass only reads as glass when there is something worth blurring behind it. The
background was nearly flat, so the cards looked like plain white rectangles.

- Background now carries four saturated colour blooms (teal, amber, blue)
- Blur raised 12px → 18px, with `saturate(180%)` so colour blooms through
- Specular highlight along the top edge of every glass surface
- Layered shadows including an inset top highlight
- Card borders raised to near-white at 85% opacity

## 4. Vulnerabilities — FIXED, 0 remaining

| Package | Was | Now |
|---|---|---|
| next | 14.2.35 (server-function disclosure) | 15.5.21 |
| postcss | ≤8.5.17 (3 high advisories) | 8.5.23 |
| sharp | <0.35.0 (libvips CVEs) | 0.35.3 via override |
| brace-expansion | ≤5.0.7 (DoS) | 5.0.8 via override |

`eslint-config-next` was removed — it pulled a large vulnerable dependency tree
and was not used by the build.

```
$ npm audit
found 0 vulnerabilities
```

Next 15 requires `params` to be awaited in dynamic routes; the publication page
was updated accordingly.

## 5. Leftover styling artefacts — FIXED

The earlier dark-to-light conversion left colourless `border` utilities and
dark-theme classes that rendered as faint or invisible outlines. All converted
to proper glass surfaces, and form controls now use the `.field` style.
