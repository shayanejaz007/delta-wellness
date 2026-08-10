import type { Metadata } from 'next'
import Link from 'next/link'
import MarinaImageCarousel from '@/components/team/MarinaImageCarousel'
import SectionLabel from '@/components/ui/SectionLabel'
import SourceEvidence from '@/components/ui/SourceEvidence'
import { publications } from '@/lib/publications'
import { pageMeta, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'People',
  'Dr. Marina Lobova, chief medical officer, and Imam Feisal Abdul Rauf, chief executive officer.',
  '/team',
)

/**
 * Person schemas carry only what a supplied document states. The chief
 * executive's entry is deliberately minimal: he has asked that no portrait and
 * no outside affiliation be published, and that request governs this page.
 */
const personSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Marina Alexandrovna Lobova',
    jobTitle: 'Chief Medical Officer',
    affiliation: { '@type': 'Organization', name: 'Brain Power Institute' },
    url: `${SITE_URL}/team`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Feisal Abdul Rauf',
    jobTitle: 'Chief Executive Officer',
    url: `${SITE_URL}/team`,
  },
]

const lobovaRecord: [string, string][] = [
  ['Office', 'Chief Medical Officer'],
  ['Institute', 'Brain Power Institute, Bangkok'],
  ['Academic career', 'Moscow State University, from 1974'],
  ['Academician', 'Russian Academy of Natural Sciences \u00b7 neurology research, since 2003'],
  ['Fellow', 'American Academy of Anti-Aging Medicine'],
  ['Research line', 'Extends Shipov\u2019s vacuum mechanics to living systems'],
  ['Member', 'Association of Quantum Medicine'],
  ['Foundation', 'Albert Einstein and Nikola Tesla Scientific Foundation \u00b7 president and co-founder'],
]

/** Conference record, drawn from the supplied professional biography. */
const lobovaAppearances: [string, string][] = [
  ['2010', '36th Congress on Science and Technology of Thailand, under Royal Patronage'],
  ['2017', 'Movement: Brain, Body, Cognition \u2014 University of Oxford'],
  ['2018', 'International conference, Harvard Medical School'],
  ['2018', 'Invited chair, session ME50 \u2014 Movement and Cognition (did not attend)'],
  ['2021\u201322', 'Sorbonne University'],
]

const raufRecognition: [string, string][] = [
  ['2011', 'Time 100 \u2014 one of the hundred most influential people in the world'],
  ['2010', 'Arianna Huffington Game Changer Award'],
  ['2010', 'Foreign Policy \u2014 Top 100 Global Thinkers'],
  ['2006', 'James Parks Morton Interfaith Award'],
]

const raufBooks: [string, string, string][] = [
  ['2012', 'Moving the Mountain: Beyond Ground Zero to a New Vision of Islam in America', 'Free Press'],
  ['2004', 'What\u2019s Right with Islam: A New Vision for Muslims and the West', 'HarperCollins'],
  ['2000', 'Islam: A Sacred Law', 'Threshold Books'],
  ['1996', 'Islam: A Search for Meaning', 'Mazda Publishers'],
]

export default function TeamPage() {
  const authored = publications.filter((p) =>
    p.authors.includes('Marina Lobova'),
  )

  return (
    <div className="pt-32">
      <section className="shell section-tight pb-0">
        <SectionLabel extent="24%">People</SectionLabel>
        <h1 className="mb-10 max-w-[14ch]">Our Team</h1>
      </section>

      {/* Chief medical officer \u2014 the profile that carries the most weight. */}
      <section className="shell section-loose" aria-labelledby="lobova-heading">
        <div className="reveal card-feature glass-card p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <figure className="m-0 flex flex-col gap-3">
              <MarinaImageCarousel />
              <figcaption className="font-mono text-[0.625rem] leading-relaxed tracking-[0.04em] text-muted">
                FIG. P1 &mdash; Photographs supplied by the subject.
              </figcaption>
            </figure>

            <div>
              <p className="eyebrow mb-4">Chief medical officer</p>
              <h2 id="lobova-heading" className="mb-3">
                Dr. Marina Lobova
              </h2>
              <p className="mb-8 text-body">
                Brain Power Institute, Bangkok, Thailand
              </p>

              <div className="prose-block measure mb-10 text-body">
                <p>
                  Marina Alexandrovna Lobova is chief medical officer of Delta
                  Wellness and the author of the research presented on this
                  site. Her papers list her affiliation as the Brain Power
                  Institute in Bangkok. She was invited to chair session ME50 at
                  the 2018 International Conference on Movement and Cognition;
                  she was unable to travel and did not attend, and the work was
                  published afterwards with Gerry Leisman as second author.
                </p>
                <p>
                  Her academic career began in 1974 at Moscow State University.
                  Her professional biography records that she served there as an
                  adviser on foreign affairs to the university&rsquo;s president,
                  Rem Viktorovich Khokhlov, and later as an associate professor
                  in the diplomatic department of the USSR Ministry of Foreign
                  Affairs. The same biography records advisory work on
                  Singapore&rsquo;s education development programme between 1981
                  and 1984, and a further advisory role with the Presidential
                  Commission on Advanced Technologies from 2001 to 2005.
                </p>
                <p>
                  Her published research applies the logic of a six-dimensional
                  coordinate system to human movement, and sets out a reference
                  frame for describing neural signalling across eight functional
                  pathways &mdash; the framework her biography describes as the
                  basis for the Institute&rsquo;s assessment of mental states.
                  Her theoretical work in this area has been developed alongside
                  the physicist Gennady Shipov, whose writing on the geometry of
                  physical vacuum is cited in the research library.
                </p>
                <p>
                  She is a designated academician of the Russian Academy of
                  Natural Sciences for neurology research, a member of the
                  Association of Quantum Medicine, a fellow of the American
                  Academy of Anti-Aging Medicine, and president and co-founder
                  of the Albert Einstein and Nikola Tesla Scientific Foundation.
                </p>
              </div>

              <dl className="ledger mb-10">
                {lobovaRecord.map(([term, detail]) => (
                  <div key={term} className="contents">
                    <dt>{term}</dt>
                    <dd>{detail}</dd>
                  </div>
                ))}
              </dl>

              <p className="eyebrow mb-4">Conference record</p>
              <ul className="mb-10 space-y-2.5">
                {lobovaAppearances.map(([year, detail]) => (
                  <li key={detail} className="flex gap-4 text-[0.9375rem]">
                    <span className="shrink-0 font-mono text-xs text-band-ink">
                      {year}
                    </span>
                    <span className="text-ink">{detail}</span>
                  </li>
                ))}
              </ul>

              <p className="eyebrow mb-4">Publications</p>
              <ul className="space-y-3">
                {authored.map((paper) => (
                  <li key={paper.slug}>
                    <Link
                      href={`/research/${paper.slug}`}
                      className="text-sm text-accent hover:underline"
                    >
                      {paper.title} &rarr;
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        
      </section>

      {/* Chief executive \u2014 published at his own request as a name and an
          office only: no portrait, no outside affiliations. */}
      <section className="shell section-tight pt-0" aria-labelledby="rauf-heading">
        <div className="reveal">
          <div className="glass-card card-quiet grid gap-10 p-6 sm:p-9 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <div
              className="flex aspect-[4/5] w-full items-end rounded-xl border border-[var(--line)] bg-paper2 p-6"
              role="img"
              aria-label="No portrait is published for this profile, at the subject's request."
            >
            </div>

            <div>
              <p className="eyebrow mb-4">Chief executive officer</p>
              <h2 id="rauf-heading" className="mb-2">
                Imam Feisal Abdul Rauf
              </h2>
              <p className="mb-8 text-body">
                Author, and imam of Masjid al-Farah, New York, 1983&ndash;2009.
              </p>

              <div className="prose-block measure mb-10 text-body">
                <p>
                  Imam Feisal Abdul Rauf is chief executive officer of Delta
                  Wellness. He is an Egyptian-American Sufi imam, author and
                  advocate of interfaith dialogue, and served as imam of Masjid
                  al-Farah in Tribeca, New York City, from 1983 to 2009.
                </p>
                <p>
                  At his request, this profile is limited to his office and his
                  published work. No portrait is published, and his other
                  professional affiliations are not listed here.
                </p>
              </div>

              <p className="eyebrow mb-4">Recognition</p>
              <ul className="mb-10 space-y-2.5">
                {raufRecognition.map(([year, detail]) => (
                  <li key={detail} className="flex gap-4 text-[0.9375rem]">
                    <span className="shrink-0 font-mono text-xs text-band-ink">
                      {year}
                    </span>
                    <span className="text-ink">{detail}</span>
                  </li>
                ))}
              </ul>

              <p className="eyebrow mb-4">Selected books</p>
              <ul className="space-y-2.5">
                {raufBooks.map(([year, title, publisher]) => (
                  <li key={title} className="flex gap-4 text-[0.9375rem]">
                    <span className="shrink-0 font-mono text-xs text-band-ink">
                      {year}
                    </span>
                    <span className="text-ink">
                      <em>{title}</em>{' '}
                      <span className="text-muted">&middot; {publisher}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchemas) }}
      />
    </div>
  )
}
