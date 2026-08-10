import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import SourceEvidence from '@/components/ui/SourceEvidence'
import NeuralBand from '@/components/home/NeuralBand'
import { neuralPathways } from '@/lib/publications'
import { pageMeta, breadcrumb } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Method',
  'The reference frame, the eight neural signatures and the reported spectral ranges, as described in the published papers.',
  '/technology',
)

export default function MethodPage() {
  const crumbs = breadcrumb([
    { name: 'Home', path: '/' },
    { name: 'Method', path: '/technology' },
  ])

  return (
    <div className="pt-32">
      <section className="shell section pb-0">
        <SectionLabel extent="46%">Method</SectionLabel>
        <h1 className="mb-10 max-w-[13ch] text-[clamp(2.75rem,7vw,5.5rem)]">
          The method as published
        </h1>
        <p className="measure text-lg text-body">
          What follows describes the approach set out in Marina Lobova&rsquo;s
          papers. It is a description of published work, not a product
          specification and not an account of a service offered to the public.
        </p>
      </section>

      <section className="shell section" aria-labelledby="frame-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <div className="reveal">
            <h2 id="frame-heading" className="mb-8">
              The reference frame
            </h2>
            <div className="prose-block measure text-body">
              <p>
                The paper describes taking the concept of a light cone and
                transforming it into what the author calls a PSY-cone: a
                reference frame with neuro-temporal transitional phases. The point
                of origin represents a real-time capture; the lower cone is
                described as a vector to the past, the upper cone a vector to the
                future.
              </p>
              <p>
                Signals are grouped by cerebral area — upper cortical, left and
                right hemispheres, medial left and right — into functional
                matrices, so that events of the same type can be compared across
                regions.
              </p>
            </div>
          </div>
          <div className="reveal" data-delay="90">
            <SourceEvidence id="fisherInformation" />
          </div>
        </div>
      </section>

      <section className="shell section pt-0" aria-labelledby="pathways-heading">
        <SectionLabel extent="62%">Eight pathways</SectionLabel>
        <h2 id="pathways-heading" className="mb-6">
          The functional groups
        </h2>
        <p className="mb-14 measure text-body">
          Transcribed from{' '}
          <em className="not-italic text-ink">
            State of Art Method and Advanced Computerized Technology For
            Assessment of Mental States
          </em>
          , pp. 42&ndash;43. Descriptions follow the source wording and are not
          extended.
        </p>

        <ul className="grid gap-4 sm:grid-cols-2">
          {neuralPathways.map((pathway, i) => (
            <li key={pathway.id} className="reveal" data-delay={Math.min(i * 50, 250)}>
              <article className="glass-glass-card h-full p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="block h-3 w-3"
                    style={{ backgroundColor: pathway.color }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs num-band">
                    {pathway.id}
                  </span>
                </div>
                <h3 className="mb-3 text-xl">{pathway.name}</h3>
                <p className="text-sm leading-relaxed text-body">
                  {pathway.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell section pt-0" aria-labelledby="ranges-heading">
        <SectionLabel extent="78%">Reported ranges</SectionLabel>
        <h2 id="ranges-heading" className="mb-6">
          Reading against the band
        </h2>
        <p className="mb-14 measure text-body">
          The paper reports three spectral ranges. They are presented here as the
          author&rsquo;s reported observations, not as diagnostic criteria.
        </p>
        <NeuralBand />
      </section>

      <section className="shell section pt-0" aria-labelledby="limits-heading">
        <div className="max-w-3xl">
          <h2 id="limits-heading" className="mb-8 text-3xl">
            Scope and limits
          </h2>
          <div className="prose-block text-body">
            <p>
              The account above is descriptive. Nothing on this page should be
              read as an efficacy claim, a safety claim, or a statement about
              regulatory status — no such claims are made in the supplied
              material, and none are made here.
            </p>
            <p>
              Readers evaluating this work should consult the original
              publications, including their stated classification, and form their
              own judgement.
            </p>
          </div>
          <Link
            href="/research"
            className="mt-10 inline-block border border-transparent px-8 py-4 text-sm text-accent transition-colors "
          >
            Read the publications
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    </div>
  )
}
