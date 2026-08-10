import { getEvidence, evidence } from '@/lib/sources'

/**
 * A quotation rendered together with everything needed to audit it. If a claim
 * cannot be shown through this component, it does not belong on the site.
 */
export default function SourceEvidence({
  id,
  className = '',
}: {
  id: keyof typeof evidence
  className?: string
}) {
  const record = getEvidence(id)

  return (
    <figure className={`glass-card p-7 sm:p-8 ${className}`}>
      <div
        className="band-rule mb-6"
        style={{ ['--band-extent' as string]: '28%' }}
      />
      <blockquote>
        <p className="font-display text-[1.6rem] leading-[1.25] text-ink sm:text-[1.9rem]">
          &ldquo;{record.quote}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-6 space-y-1">
        <p className="text-sm font-medium text-ink">{record.attribution}</p>
        <p className="text-sm text-muted">{record.publication}</p>
        <p className="eyebrow pt-3 !normal-case !tracking-normal">
          {record.sourceDocument} · {record.sourceLocation}
        </p>
        {record.sourceUrl && (
          <a
            href={record.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
          >
            View original source
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </figcaption>
    </figure>
  )
}
