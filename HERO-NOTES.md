# Hero changes

## Full-bleed

The section is now `min-h-[100svh]`, edge to edge, with the media layer at
`inset-0`. `svh` rather than `vh`, so mobile browser chrome appearing and
disappearing does not make the hero jump.

## The loop no longer cuts

`loop` on a `<video>` jumps hard from the last frame back to the first — that
snap is what you were seeing. `PingPongVideo` plays forward to the end, then
scrubs backwards to the start, then forwards again: a continuous there-and-back
with no discontinuity.

The reversal steps `currentTime` on `requestAnimationFrame`, because no browser
supports a negative `playbackRate`.

**If the reverse pass looks steppy**, that is keyframe density in your encode,
not the code. Two options, both in `public/README.md`:

- **Best:** bake a true palindrome (forward + reverse in one file) with a single
  ffmpeg command, then swap `PingPongVideo` for a plain looping `<video>`.
  Perfect loop, no scripting, lowest CPU.
- **Or:** re-encode with `-g 12 -keyint_min 12 -sc_threshold 0` for dense
  keyframes, which makes backwards seeking much smoother.

## Text is legible now

The real problem was that the type was dark navy — it had been designed for the
light poster plate, and your video is dark, so the headline was sinking into it.

- Headline and body are white, with a soft text-shadow
- A three-stop scrim sits over the media for contrast
- The scrim resolves to the page background at the foot of the section, so the
  dark band flows into the light page instead of ending on a hard seam
- `hero-poster.jpg` and `hero-mobile.jpg` were regenerated as dark plates so the
  fallback matches the video's tonality. Re-run `scripts/make-hero-art.py` to
  regenerate them.

## Removed

The three statistic cards are gone.

## Note on the nav

The navigation stays as light glass over the dark hero — that contrast is
intentional and reads well. It needs no change.
