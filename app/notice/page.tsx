import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Research information notice',
  'How the material on this site should and should not be used.',
  '/notice',
)

export default function NoticePage() {
  return (
    <div className="pt-32">
      <section className="shell section">
        <SectionLabel extent="36%">Notice</SectionLabel>
        <h1 className="mb-12 max-w-[16ch] text-[clamp(2.25rem,5.5vw,4rem)]">
          Research information notice
        </h1>

        <div className="prose-block measure text-body">
          <p className="text-ink">
            The material on this site is published for research and educational
            purposes.
          </p>
          <p>
            It is not medical advice. It does not diagnose, treat, cure or
            prevent any condition, and it is not a substitute for consultation
            with a qualified healthcare professional. If you have a health
            concern, speak to a clinician.
          </p>
          <p>
            No claim of regulatory approval, clearance, registration or listing
            is made anywhere on this site, by any authority in any jurisdiction.
            Should any such status be established in future, it would be
            published in the exact terms of the official record, with a link to
            that record.
          </p>
          <p>
            Research described here includes work classified by its publisher as
            a perspective article and work presented at conference. Those
            classifications are stated on each record. They are not equivalent to
            controlled clinical evidence, and nothing on this site should be read
            as establishing efficacy or safety.
          </p>
          <p>
            Publications are summarised with attribution and linked to their
            sources. Copyright in the underlying works remains with their authors
            and publishers.
          </p>
          <p>
            If you believe anything published here is inaccurate or improperly
            attributed, please tell us and we will correct or remove it.
          </p>
        </div>
      </section>
    </div>
  )
}
