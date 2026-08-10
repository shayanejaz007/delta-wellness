'use client'

import { useEffect, useRef } from 'react'

/**
 * Seamless looping video.
 *
 * A plain `loop` attribute snaps hard from the last frame back to the first.
 * Reverse-scrubbing (ping-pong) avoids the snap but looks steppy, because
 * stepping `currentTime` backwards makes the decoder hunt between keyframes —
 * negative `playbackRate` is not supported in any current browser.
 *
 * So instead this crossfades between two copies of the same clip. Layer A
 * plays; `fade` seconds before it ends, layer B starts from zero and fades up
 * while A fades down. When A finishes it is reset and becomes the waiting
 * layer. The dissolve hides the seam entirely, so the footage reads as one
 * endless take regardless of whether its first and last frames match.
 *
 * Cost is one extra decoded video. Both layers are muted and share the same
 * cached file, so there is no second network fetch.
 */
export default function PingPongVideo({
  src,
  poster,
  className = '',
  /** Length of the dissolve, in seconds. */
  fade = 1.1,
}: {
  src: string
  poster?: string
  className?: string
  fade?: number
}) {
  const aRef = useRef<HTMLVideoElement>(null)
  const bRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const a = aRef.current
    const b = bRef.current
    if (!a || !b) return

    // Respect a reduced-motion preference: hold the first frame, no loop.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      a.pause()
      b.pause()
      a.style.opacity = '1'
      b.style.opacity = '0'
      return
    }

    let raf = 0
    let front = a // the layer currently visible and playing
    let back = b // the layer waiting to take over
    let handingOver = false

    const play = (video: HTMLVideoElement) =>
      video.play().catch(() => {
        /* autoplay blocked — the poster stays visible, which is fine */
      })

    const tick = () => {
      const duration = front.duration

      if (duration && !Number.isNaN(duration)) {
        const remaining = duration - front.currentTime

        // Start the handover once we are inside the fade window.
        if (!handingOver && remaining <= fade) {
          handingOver = true
          back.currentTime = 0
          play(back)
        }

        if (handingOver) {
          // Linear dissolve. The two layers are stacked, so the crossfade is
          // a straight opacity swap: front down, back up, in step.
          const t = Math.min(1, Math.max(0, (fade - remaining) / fade))
          front.style.opacity = String(1 - t)
          back.style.opacity = String(t)

          // Handover complete: swap roles and park the old layer at frame 0
          // so it is ready to fade in next time round.
          if (remaining <= 0.03) {
            front.style.opacity = '0'
            back.style.opacity = '1'
            front.pause()
            front.currentTime = 0

            const previousFront = front
            front = back
            back = previousFront
            handingOver = false
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    a.style.opacity = '1'
    b.style.opacity = '0'
    play(a)
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [fade, src])

  const layer =
    'absolute inset-0 h-full w-full object-cover will-change-[opacity]'

  return (
    <>
      <video
        ref={aRef}
        className={`${layer} ${className}`}
        style={{ opacity: 1 }}
        muted
        playsInline
        autoPlay
        preload="auto"
        poster={poster}
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
      <video
        ref={bRef}
        className={`${layer} ${className}`}
        style={{ opacity: 0 }}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  )
}
