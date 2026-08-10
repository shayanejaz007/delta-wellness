import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Terms',
  'Terms of use for the Delta Wellness research library.',
  '/terms',
)

export default function TermsPage() {
  return (
    <div className="pt-32">
      <section className="shell section">
        <SectionLabel extent="22%">Terms</SectionLabel>
        <h1 className="mb-12 text-[clamp(2.25rem,5.5vw,4rem)]">Terms of use</h1>

        <div className="prose-block measure text-body">
          <h2 className="mb-4 mt-12 text-2xl text-ink">Use of this site</h2>
          <p>
            You may read, cite and link to the material here. Please attribute
            quotations to their original authors and publishers rather than to
            this site.
          </p>

          <h2 className="mb-4 mt-12 text-2xl text-ink">Third-party rights</h2>
          <p>
            Publications referenced here belong to their authors and publishers.
            Summaries are our own; quotations are short and attributed. We do not
            reproduce full articles.
          </p>

          <h2 className="mb-4 mt-12 text-2xl text-ink">No warranty</h2>
          <p>
            The material is provided as published, without warranty of any kind.
            Research summarised here is presented for evaluation by the reader,
            not as settled fact.
          </p>

          <h2 className="mb-4 mt-12 text-2xl text-ink">External links</h2>
          <p>
            Links to publishers and archives are provided for reference. We do
            not control those sites and are not responsible for their content.
          </p>

          <h2 className="mb-4 mt-12 text-2xl text-ink">Corrections</h2>
          <p>
            Tell us about an error and we will fix it. Accuracy matters more to
            us than presentation.
          </p>
        </div>
      </section>
    </div>
  )
}
