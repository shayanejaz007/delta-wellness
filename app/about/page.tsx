import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import SourceEvidence from '@/components/ui/SourceEvidence'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'About',
  'What Delta Wellness publishes, how sources are handled, and the standard every statement on this site has to meet.',
  '/about',
)

export default function AboutPage() {
  return (
    <div className="pt-32">
      <section className="shell section pb-0">
        <SectionLabel extent="30%">About</SectionLabel>
        <h1 className="mb-10 max-w-[14ch] text-[clamp(2.75rem,7vw,5.5rem)]">
          About Delta Wellness
        </h1>
        <p className="measure text-lg text-body">
          Delta Wellness publishes and indexes research into neural signalling,
          mental states, biomechanics and psychomechanics, drawn from the work of
          Marina Lobova — the organisation&rsquo;s chief medical officer, of the
          Brain Power Institute in Bangkok — and the works her papers cite. The
          wider network of organisations behind the work, including the
          Institute&rsquo;s Meta Genesis programme, is described under{' '}
          <a href="/network" className="text-accent hover:underline">
            Network
          </a>
          .
        </p>
      </section>

      <section className="shell section" aria-labelledby="standard-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <div className="reveal">
            <h2 id="standard-heading" className="mb-8">
              The standard for what gets published
            </h2>
            <div className="prose-block measure text-body">
              <p>
                A statement appears on this site only if it can be traced to a
                specific page of a specific document. Each one is stored with its
                source title, document, page and, where available, a link — so
                any reader or reviewer can follow it back.
              </p>
              <p>
                Where the original hedges, this site hedges. Language such as
                &ldquo;may&rdquo;, &ldquo;suggests&rdquo; and &ldquo;is
                associated with&rdquo; is carried across unchanged. It is never
                rewritten as proof.
              </p>
              <p>
                Where information does not exist, the section is smaller or
                absent. There are no invented dates, no invented affiliations, no
                regulatory claims, and no patient outcomes.
              </p>
            </div>
          </div>

          <div className="reveal" data-delay="90">
            <SourceEvidence id="dataLimits" />
            <p className="mt-8 measure text-sm text-body">
              The author states the limits of the work directly in the paper.
              That framing is preserved here rather than smoothed away.
            </p>
          </div>
        </div>
      </section>

      <section className="shell section pt-0" aria-labelledby="scope-heading">
        <SectionLabel extent="55%">Scope</SectionLabel>
        <h2 id="scope-heading" className="mb-10">
          What this site is not
        </h2>
        <ul className="grid max-w-4xl gap-4 sm:grid-cols-2">
          {[
            'Not a clinical service, and not an offer of treatment.',
            'Not a source of diagnosis or medical advice.',
            'Not a claim of regulatory clearance, approval or registration.',
            'Not a record of patient outcomes.',
          ].map((item) => (
            <li key={item} className="glass-glass-card p-7 text-sm text-body">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
