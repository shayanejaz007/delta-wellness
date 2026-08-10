import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SectionLabel from '@/components/ui/SectionLabel'
import ResearchCard from '@/components/research/ResearchCard'
import { publications } from '@/lib/publications'
import { SITE_URL, breadcrumb } from '@/lib/seo'

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const paper = publications.find((p) => p.slug === slug)
  if (!paper) return {}

  const description = paper.summary.slice(0, 155)
  return {
    title: paper.title,
    description,
    alternates: { canonical: `/research/${paper.slug}` },
    openGraph: {
      type: 'article',
      title: paper.title,
      description,
      url: `${SITE_URL}/research/${paper.slug}`,
      authors: paper.authors,
    },
    twitter: { title: paper.title, description },
  }
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const paper = publications.find((p) => p.slug === slug)
  if (!paper) notFound()

  const related = publications.filter((p) => p.slug !== paper.slug)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: paper.title,
    author: paper.authors.map((name) => ({ '@type': 'Person', name })),
    ...(paper.year && { datePublished: paper.year }),
    isPartOf: { '@type': 'Periodical', name: paper.venue },
    ...(paper.issn && { issn: paper.issn }),
    ...(paper.publisher && {
      publisher: { '@type': 'Organization', name: paper.publisher },
    }),
    description: paper.summary,
    url: `${SITE_URL}/research/${paper.slug}`,
  }

  const crumbs = breadcrumb([
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
    { name: paper.title, path: `/research/${paper.slug}` },
  ])

  return (
    <article className="pt-32">
      <div className="shell section pb-0">
        <nav aria-label="Breadcrumb" className="eyebrow mb-10">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true"> / </span>
          <Link href="/research" className="hover:text-ink">
            Research
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-ink">Publication</span>
        </nav>

        <p className="eyebrow mb-6">{paper.kind}</p>
        <h1 className="mb-10 max-w-[22ch] text-[clamp(2rem,4.6vw,3.75rem)]">
          {paper.title}
        </h1>

        <dl className="glass-card grid max-w-3xl gap-x-8 p-7 sm:grid-cols-2">
          <Row label="Author" value={paper.authors.join(', ')} />
          <Row label="Publication" value={paper.venue} />
          {paper.volume && <Row label="Volume" value={paper.volume} />}
          {paper.pages && <Row label="Pages" value={paper.pages} />}
          {paper.year && <Row label="Year" value={paper.year} />}
          {paper.issn && <Row label="ISSN" value={paper.issn} />}
          {paper.publisher && <Row label="Publisher" value={paper.publisher} />}
        </dl>
      </div>

      <div className="shell section">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-24">
          <div>
            <h2 className="mb-6 text-3xl">Summary</h2>
            <p className="prose-block measure text-body">
              {paper.summary}
            </p>

            {paper.classificationNote && (
              <div className="glass-card mt-10 border-l-4 border-l-band p-6">
                <p className="eyebrow mb-2">Classification note</p>
                <p className="measure text-sm text-body">
                  {paper.classificationNote}
                </p>
              </div>
            )}
          </div>

          <aside className="glass-card p-7">
            <p className="eyebrow mb-4">Obtaining the original</p>
            <p className="mb-6 text-sm leading-relaxed text-body">
              {paper.access}
            </p>
            {paper.url ? (
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                Read full research ↗
              </a>
            ) : (
              <Link href="/contact" className="text-sm text-accent hover:underline">
                Request this paper →
              </Link>
            )}
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="shell section pt-0" aria-labelledby="related-heading">
          <SectionLabel extent="30%">Related</SectionLabel>
          <h2 id="related-heading" className="mb-10 text-3xl">
            Also in the library
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}>
                <ResearchCard publication={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    </article>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3">
      <dt className="eyebrow mb-1">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  )
}
