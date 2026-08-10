'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Re-scans on every route change. The previous version mounted once in the root
 * layout, so any page reached by client-side navigation had its `.reveal`
 * elements left at opacity 0 permanently — the People and Method pages rendered
 * blank. `usePathname` in the dependency array is the fix.
 *
 * Two further safety nets, because invisible content is a far worse failure
 * than a missing animation:
 *   1. Content is visible by default in CSS (see `html.js .reveal`).
 *   2. A timeout force-reveals anything still hidden after 2s.
 */
export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const revealAll = () =>
      document
        .querySelectorAll<HTMLElement>('.reveal')
        .forEach((n) => n.classList.add('is-in'))

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      revealAll()
      return
    }

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'),
    )
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          const delay = Number(el.dataset.delay ?? 0)
          if (delay) el.style.transitionDelay = `${delay}ms`
          el.classList.add('is-in')
          observer.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.02 },
    )

    nodes.forEach((n) => observer.observe(n))

    // Safety net: nothing stays hidden, whatever happens.
    const failsafe = window.setTimeout(revealAll, 2000)

    return () => {
      window.clearTimeout(failsafe)
      observer.disconnect()
    }
  }, [pathname])

  return null
}
