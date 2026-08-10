import Link from 'next/link'
import PingPongVideo from './PingPongVideo'

const HAS_VIDEO = process.env.NEXT_PUBLIC_HERO_VIDEO === '1'

/**
 * Three short markers. Deliberately factual — programme dates, the published
 * framework, and where the work has been presented. No outcome, benefit or
 * treatment claims appear in the hero.
 */
const MARKERS: [string, string][] = [
  ['Est. 2003', 'Brain Power Institute, Bangkok'],
  ['8 pathways', 'Neural signalling framework'],
  ['Peer reviewed', 'Nova Science Publishers, 2018\u20132019'],
]

/**
 * Full-bleed opening band.
 *
 * The design problem here is that frosted glass needs something behind it to
 * refract. An earlier pass washed the footage out to near-white, which left
 * the copy plate reading as a plain white rectangle. So the wash is now much
 * lighter, and contrast is created *locally* instead: a soft radial shadow
 * pools behind the plate, giving the glass an edge to catch light against.
 *
 * Depth is built in layers, back to front — footage, wash, colour bloom,
 * vignette, grain, then the plate itself with its own inner light. Type sits
 * on the plate, so it never fights the moving water underneath.
 */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden">
      {/* ---- Media stack ------------------------------------------------ */}
      <div className="absolute inset-0 -z-10">
        {/* Stand-in for a poster still: covered by the video within a few
            hundred milliseconds, and no file that can fail to decode. */}
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#dceaf0_0%,#eef4fa_45%,#f8efdf_100%)]" />

        {HAS_VIDEO && (
          <PingPongVideo
            src="/hero.mp4"
            fade={1.6}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Light wash. Deliberately weak — the footage needs to stay visible
            or there is nothing for the glass above it to refract. */}
        <div className="absolute inset-0 bg-white/20 [backdrop-filter:saturate(125%)]" />

        {/* Colour bloom in the site palette: teal top-left, warm gold
            top-right, tying the hero to the aurora field used site-wide. */}
        <div className="absolute inset-0 bg-[radial-gradient(50rem_36rem_at_8%_-4%,rgba(14,110,133,0.30),transparent_58%),radial-gradient(44rem_32rem_at_94%_2%,rgba(217,154,43,0.26),transparent_60%)]" />

        {/* Pool of shadow behind the plate. This is what makes the glass read
            as glass: a darker field for its lit edges to sit against. */}
        <div className="absolute inset-0 bg-[radial-gradient(60rem_44rem_at_34%_54%,rgba(15,27,45,0.20),transparent_66%)]" />

        {/* Vignette: settles the corners so the eye lands on the plate. */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_40%,transparent_38%,rgba(15,27,45,0.16)_100%)]" />

        {/* Fine grain. Stops the gradients banding on wide displays and gives
            the whole frame a printed, tactile quality. */}
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
            backgroundSize: '160px 160px',
          }}
        />

        {/* Resolve into the page background so there is no seam at the fold. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_58%,rgba(245,248,252,0.55)_82%,var(--paper)_100%)]" />
      </div>

      {/* ---- Content ---------------------------------------------------- */}
      <div className="shell w-full pb-[clamp(6rem,12vw,9rem)] pt-[clamp(9rem,16vw,12rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.72fr)] lg:gap-14">
          {/* Principal plate */}
          <div className="relative">
            {/* Offset pane behind the plate. A second sheet of glass, rotated
                a degree and pushed back, so the front pane reads as one of
                several layers rather than a lone box. */}
            <div
              aria-hidden="true"
              className="hero-plate absolute -inset-x-3 -top-5 bottom-6 -rotate-[0.9deg] rounded-[30px] border border-white/45 bg-white/25 [backdrop-filter:blur(14px)]"
              style={{ '--d': '80ms' } as React.CSSProperties}
            />

            <div
              className="hero-plate relative overflow-hidden rounded-[28px] border border-white/60 bg-[linear-gradient(152deg,rgba(255,255,255,0.80),rgba(255,255,255,0.50)_52%,rgba(255,255,255,0.68))] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_0_0_1px_rgba(255,255,255,0.35),inset_0_-30px_50px_-34px_rgba(14,110,133,0.30),0_2px_6px_rgba(15,27,45,0.06),0_40px_90px_-28px_rgba(15,27,45,0.42)] [backdrop-filter:blur(28px)_saturate(200%)] sm:p-11 lg:p-14"
              style={{ '--d': '160ms' } as React.CSSProperties}
            >
              {/* Specular sweep across the top-left corner. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-1/4 -top-1/2 h-[140%] w-[120%] rotate-[18deg] bg-[linear-gradient(180deg,rgba(255,255,255,0.55),transparent_55%)] mix-blend-overlay"
              />

              {/* Hairline accent rule — a small piece of structure that stops
                  the eyebrow floating in space. */}
              <div className="relative mb-7 flex items-center gap-3">
                <span
                  className="hero-rule h-px w-9 bg-[linear-gradient(90deg,var(--accent),transparent)]"
                  style={{ '--d': '420ms' } as React.CSSProperties}
                />
                <span
                  className="hero-in font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent-ink"
                  style={{ '--d': '500ms' } as React.CSSProperties}
                >
                  Meta Genesis · Quantum biocomputing
                </span>
              </div>

              <h1
                className="hero-track relative mb-6 !leading-[0.94]"
                style={{ '--d': '620ms' } as React.CSSProperties}
              >
                The physics{' '}
                <span className="bg-[linear-gradient(120deg,var(--accent-ink),var(--accent)_45%,var(--band-ink))] bg-clip-text text-transparent">
                  of life
                </span>
              </h1>

              <p
                className="hero-in measure relative mb-9 text-lg leading-relaxed text-body sm:text-xl"
                style={{ '--d': '900ms' } as React.CSSProperties}
              >
                Meta Genesis takes the study of living systems as its subject:
                not the brain simulated in software, but the interaction of
                space, time and consciousness read directly — through the
                six-dimensional and Ψ-wave frameworks set out in the published
                research.
              </p>

              <div
                className="hero-in relative flex flex-wrap items-center gap-3"
                style={{ '--d': '1040ms' } as React.CSSProperties}
              >
                <Link href="/research" className="btn btn-primary">
                  Explore the research
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Contact us
                </Link>
              </div>

              {/* Proof markers, divided off from the call to action. */}
              <dl className="relative mt-10 grid gap-5 border-t border-[var(--line)] pt-7 sm:grid-cols-3">
                {MARKERS.map(([value, label], i) => (
                  <div
                    key={label}
                    className="hero-in"
                    style={{ '--d': `${1180 + i * 110}ms` } as React.CSSProperties}
                  >
                    <dt className="font-mono text-sm tracking-tight text-accent-ink">
                      {value}
                    </dt>
                    <dd className="mt-1 text-[0.8125rem] leading-snug text-muted">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Secondary column: two small floating panes. On narrow screens
              they would compete with the plate, so they are desktop-only. */}
          <div className="hidden lg:flex lg:flex-col lg:gap-4">
            <div
              style={{ '--d': '1320ms' } as React.CSSProperties}
              className="hero-plate rounded-[22px] border border-white/55 bg-white/35 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_20px_50px_-24px_rgba(15,27,45,0.35)] [backdrop-filter:blur(20px)_saturate(180%)]">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                The programme
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
                Where large simulation efforts modelled the brain in software,
                Meta Genesis builds on foundational work in physics,
                neuroscience and psychology instead.
              </p>
              <Link
                href="/technology"
                className="mt-4 inline-block text-sm text-accent hover:underline"
              >
                See the model →
              </Link>
            </div>

            <div
              style={{ '--d': '1440ms' } as React.CSSProperties}
              className="hero-plate rounded-[22px] border border-white/55 bg-[linear-gradient(150deg,rgba(253,243,226,0.72),rgba(255,255,255,0.34))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_20px_50px_-24px_rgba(15,27,45,0.30)] [backdrop-filter:blur(20px)_saturate(180%)]">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-band-ink">
                Sourcing
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
                Programme descriptions are stated by the Brain Power Institute.
                Research claims are traced to a named document and cited.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="hero-in pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
        style={{ '--d': '1700ms' } as React.CSSProperties}
      >
        <span className="h-12 w-px bg-[linear-gradient(180deg,transparent,rgba(15,27,45,0.30))]" />
      </div>
    </section>
  )
}
