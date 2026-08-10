'use client'

import { useEffect, useRef, useState } from 'react'
import { controlLevels } from '@/lib/publications'
import SectionLabel from '@/components/ui/SectionLabel'

/**
 * The eight levels are a genuine ordered hierarchy in the source paper, which is
 * why they are numbered and why a deck reads correctly here — you move through
 * them in sequence.
 *
 * Scroll behaviour is pure CSS `position: sticky`: each card pins at an
 * increasing offset so they pile into a deck, the card beneath still showing its
 * number and label. No scroll listener, nothing per frame.
 *
 * The only JavaScript is one IntersectionObserver driving the left-hand
 * readout. It fires about eight times across the whole section.
 */
export default function Levels() {
  const [active, setActive] = useState(0)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          setActive(Number((entry.target as HTMLElement).dataset.index ?? 0))
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    )
    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const current = controlLevels[active]

  return (
    <section
      className="relative isolate py-[var(--section-y)]"
      aria-labelledby="levels-heading"
    >
      {/* Section-local colour field. Glass needs something worth blurring
          behind it, and the page gradient is weak this far down the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-[10%] top-[8%] h-[38rem] w-[38rem] rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -right-[6%] top-[38%] h-[32rem] w-[32rem] rounded-full bg-band/25 blur-3xl" />
        <div className="absolute bottom-[4%] left-[28%] h-[30rem] w-[30rem] rounded-full bg-[#3C78C8]/20 blur-3xl" />
      </div>

      <div className="shell">
        <SectionLabel extent="52%">
          Control architecture · Brain, Body, Cognition 2018
        </SectionLabel>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          {/* ---- Left: sticky live readout ---- */}
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <h2 id="levels-heading" className="mb-5">
              Eight levels of control
            </h2>
            <p className="measure mb-10 text-body">
              The 2018 paper subdivides the architecture of human movement into
              hierarchic levels ordered by causality, running from the mechanics
              of a single step through to the perception of time.
            </p>

            <div className="glass hidden p-7 lg:block">
              <div className="mb-5 flex items-baseline gap-4">
                <span className="font-display text-6xl leading-none text-ink">
                  {current.n}
                </span>
                <span className="eyebrow">{current.subtitle}</span>
              </div>
              <p className="font-display text-2xl text-ink">{current.title}</p>

              <ol className="mt-7 flex gap-1.5" aria-hidden="true">
                {controlLevels.map((level, i) => (
                  <li
                    key={level.n}
                    className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10"
                  >
                    <span
                      className="block h-full rounded-full bg-band transition-transform duration-500 ease-out"
                      style={{
                        transform: `scaleX(${i <= active ? 1 : 0})`,
                        transformOrigin: 'left',
                      }}
                    />
                  </li>
                ))}
              </ol>
              <p className="eyebrow mt-4">
                Level {current.n} of {controlLevels.length}
              </p>
            </div>
          </div>

          {/* ---- Right: stacking deck ---- */}
          <ol className="space-y-5 lg:space-y-8">
            {controlLevels.map((level, i) => (
              <li
                key={level.n}
                data-index={i}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                className="lg:sticky"
                style={{ top: `calc(7rem + ${i * 0.9}rem)`, zIndex: i + 1 }}
              >
                <article
                  className="glass-card reveal p-6 sm:p-8"
                  data-delay={Math.min(i * 30, 150)}
                >
                  <div className="mb-3 flex items-baseline gap-3">
                    <span className="num-band font-mono text-xs font-medium">
                      {level.n}
                    </span>
                    <span className="eyebrow">{level.subtitle}</span>
                  </div>
                  <h3 className="mb-2.5">{level.title}</h3>
                  <p className="text-[0.94rem] leading-relaxed text-body">
                    {level.body}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
