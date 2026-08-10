import Link from 'next/link'
import type { Publication } from '@/lib/publications'

export default function ResearchCard({
  publication,
}: {
  publication: Publication
}) {
  return (
    <article className="glass-card flex h-full flex-col p-6 sm:p-7">
      <span className="eyebrow mb-5">{publication.kind}</span>

      <h3 className="mb-3 text-[1.15rem] leading-snug">
        <Link href={`/research/${publication.slug}`}>{publication.title}</Link>
      </h3>

      <p className="text-sm text-ink">{publication.authors.join(', ')}</p>
      <p className="mb-5 text-sm text-muted">
        {publication.venue}
        {publication.volume ? ` · ${publication.volume}` : ''}
        {publication.year ? ` · ${publication.year}` : ''}
      </p>

      <p className="mb-6 flex-1 text-sm leading-relaxed text-body">
        {publication.summary}
      </p>

      <Link
        href={`/research/${publication.slug}`}
        className="mt-auto text-sm text-accent hover:underline"
      >
        Read research →
      </Link>
    </article>
  )
}
