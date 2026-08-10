'use client'

import { useState } from 'react'
import { neuralPathways } from '@/lib/publications'

/**
 * SIGNATURE COMPONENT
 * Every figure in the source papers is the same artefact: eight labelled
 * channels read against a band marking optimum regulation.
 *
 * The three regimes are ILLUSTRATIONS OF THE PUBLISHED RANGES (below 84 /
 * 84–92 / above 92). They are not measurements and not anyone's data — the
 * interface says so directly.
 *
 * Bar heights animate with a plain CSS transition on `height`, triggered by a
 * state change, not by scroll. Nothing runs per frame.
 */

const SCALE_MIN = 72
const SCALE_MAX = 100

type Regime = 'retarded' | 'optimum' | 'hyper'

const regimes: Record<
  Regime,
  { label: string; caption: string; values: number[] }
> = {
  retarded: {
    label: 'Below 84',
    caption: 'The range the paper associates with retarded or deficient signalling.',
    values: [78, 79, 81, 80, 82, 79, 81, 78],
  },
  optimum: {
    label: '84 – 92',
    caption:
      'The range reported as optimum regulation, with 87–89 described as equilibrium.',
    values: [88, 89, 87, 88, 89, 88, 87, 89],
  },
  hyper: {
    label: 'Above 92',
    caption: 'The range the paper associates with stressed or hyper signalling.',
    values: [94, 95, 93, 94, 96, 94, 95, 93],
  },
}

const pct = (v: number) => ((v - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100

export default function NeuralBand() {
  const [regime, setRegime] = useState<Regime>('optimum')
  const active = regimes[regime]
  const bandLo = pct(84)
  const bandHi = pct(92)

  return (
    <section
      aria-labelledby="readout-heading"
      className="glass-card p-5 sm:p-8"
    >
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h3 id="readout-heading" className="mb-1.5 text-lg">
            Eight neural signatures
          </h3>
          <p className="text-sm text-muted">
            The model described in Assessment of Mental States, pp. 42–43.
          </p>
        </div>

        <div
          role="group"
          aria-label="Show reported range"
          className="flex overflow-hidden rounded-full border border-[var(--line-strong)] bg-white/70"
        >
          {(Object.keys(regimes) as Regime[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setRegime(key)}
              aria-pressed={regime === key}
              className={`px-3.5 py-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] transition-colors ${
                regime === key
                  ? 'bg-accent text-white'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {regimes[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-56 w-full rounded-xl bg-white/50 p-3 sm:h-72">
        <div className="relative h-full w-full">
          <div
            className="absolute inset-x-0 rounded-sm border-y-2 border-band/60 bg-band/10"
            style={{ bottom: `${bandLo}%`, height: `${bandHi - bandLo}%` }}
            aria-hidden="true"
          />
          {[
            [bandHi, '92'],
            [bandLo, '84'],
          ].map(([pos, label]) => (
            <span
              key={label as string}
              className="absolute right-1 -translate-y-1/2 rounded bg-white/90 px-1.5 font-mono text-[0.6rem] text-band"
              style={{ bottom: `${pos}%` }}
              aria-hidden="true"
            >
              {label}
            </span>
          ))}

          <ul className="absolute inset-0 flex items-end gap-1.5 sm:gap-2.5">
            {neuralPathways.map((p, i) => (
              <li key={p.id} className="group relative flex h-full flex-1 items-end">
                <div
                  className="w-full rounded-t-[3px] transition-[height] duration-500 ease-out"
                  style={{
                    height: `${pct(active.values[i])}%`,
                    backgroundColor: p.color,
                    transitionDelay: `${i * 28}ms`,
                  }}
                />
                <span className="sr-only">
                  {p.id}, {p.name}: {active.values[i]}
                </span>
                <span
                  className="pointer-events-none absolute -top-2 left-1/2 z-10 w-48 -translate-x-1/2 -translate-y-full rounded-xl border border-[var(--glass-edge)] bg-white p-3 text-xs opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <strong className="mb-1 block text-ink">
                    {p.id} · {p.name}
                  </strong>
                  <span className="text-muted">{p.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-2.5 flex gap-1.5 px-3 sm:gap-2.5" aria-hidden="true">
        {neuralPathways.map((p) => (
          <li
            key={p.id}
            className="flex-1 text-center font-mono text-[0.58rem] text-muted"
          >
            {p.id}
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-[var(--line)] pt-4 text-xs leading-relaxed text-muted">
        <strong className="font-medium text-ink">
          Illustration, not measurement.
        </strong>{' '}
        {active.caption} The bar heights show where each published range sits on
        the scale. They are not data from any individual and carry no diagnostic
        meaning.
      </p>
    </section>
  )
}
