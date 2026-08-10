# What changed, and why it scrolls smoothly now

The previous version had four costs stacked on top of each other. Every one is
gone.

| Removed | Why it was slow |
|---|---|
| **Lenis smooth scroll** | Ran a `requestAnimationFrame` loop permanently, on every frame, whether or not you were scrolling. It also fought the browser's own scrolling, which is already GPU-accelerated. |
| **Framer Motion scroll transforms** | The hero read scroll position and recalculated `opacity`, `scale` and `translate` on every frame. Four animated properties on a full-viewport element. |
| **`backdrop-blur` on an animating nav** | The nav's background colour changed as you scrolled *while* a blur filter was applied to it. That forces the browser to re-rasterise the blurred region on every scroll frame — the single most expensive thing on the old page. |
| **Continuously animating SVG hero** | Five sine paths animating opacity and position on an infinite loop, running even when scrolled past. |
| **Per-element Framer Motion components** | Every revealed card mounted its own animation instance and observer. |

## What replaced them

- **Native scrolling.** No hijacking, no loop.
- **Static hero.** A generated image plate with art-directed desktop and mobile
  crops. No scroll listeners, no parallax.
- **Constant glass surface.** The nav still has `backdrop-filter`, but its
  background never changes, so the blur is rasterised once and reused. Only a
  box-shadow transitions on scroll, which is compositor-only.
- **One IntersectionObserver for the whole page.** Elements are unobserved the
  moment they reveal, so the observer empties as you scroll.
- **CSS transitions on `opacity` and `transform` only.** Both run on the
  compositor and never trigger layout or paint.
- **Pure CSS `position: sticky`** for the pinned levels panel, replacing an
  observer that re-rendered the whole list on every crossing.

## Measured result

| Route | Before | After |
|---|---|---|
| Home | 143 kB | **105 kB** |
| /about | 124 kB | **87.5 kB** |
| /technology | 137 kB | **99.4 kB** |
| /team | 133 kB | **96.2 kB** |

Two runtime dependencies (`framer-motion`, `lenis`) were removed entirely.

## Still slow?

Check you are not running `npm run dev`. Dev mode is unminified and carries
React instrumentation; it is not representative. Always measure with:

```bash
npm run build
npm start
```
