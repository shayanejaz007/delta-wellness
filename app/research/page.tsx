import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import ResearchExplorer from '@/components/research/ResearchExplorer'
import { referencedWorks } from '@/lib/publications'
import { pageMeta, breadcrumb } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Research',
  'Published papers and conference presentations on neural signalling, mental states, biomechanics and psychomechanics, with links to original sources.',
  '/research',
)

export default function ResearchPage() {
  const crumbs = breadcrumb([
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
  ])

  return (
    <div className="pt-32">
      <section className="shell section pb-0">
        <SectionLabel extent="70%">Library</SectionLabel>
        <h1 className="mb-8 max-w-[12ch] text-[clamp(2.75rem,7vw,5.5rem)]">
          Research
        </h1>
        <p className="mb-16 measure text-lg text-body">
          Every record below is transcribed from the publication itself.
          Unknown fields are left out rather than filled in, and the type of each
          record — journal article, perspective, conference presentation — is
          stated as the publisher classified it.
        </p>
      </section>

      <section className="shell section pt-0">
        <ResearchExplorer />
      </section>

      <section className="shell section" aria-labelledby="refs-heading">
        <SectionLabel extent="40%">Cited works</SectionLabel>
        <h2 id="refs-heading" className="mb-10">
          References
        </h2>
        <ol className="max-w-3xl space-y-5">
          {referencedWorks.map((work, i) => (
            <li key={work.title} className="flex gap-5 border-b border-[var(--line)] pb-5 text-sm">
              <span className="font-mono text-xs num-band">
                [{i + 1}]
              </span>
              <span>
                <span className="text-ink">{work.author}</span>{' '}
                — <em className="not-italic text-ink">{work.title}</em>{' '}
                — <span className="text-body">{work.detail}</span>
                {work.url && (
                  <>
                    {' '}
                    —{' '}
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      Link ↗
                    </a>
                  </>
                )}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    </div>
  )
}
