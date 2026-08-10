import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import { pageMeta, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Network',
  'The Brain Power Institute in Bangkok, the Meta Genesis programme and the Genesis product line — the organisations and projects connected to the research on this site.',
  '/network',
)

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Brain Power Institute',
  url: 'http://mybrainpoweronline.com',
  location: { '@type': 'Place', address: 'Bangkok, Thailand' },
  sameAs: [
    'https://www.instagram.com/brainpowerinstitute/',
    'https://www.facebook.com/profile.php?id=100064249141422',
  ],
  memberOf: { '@type': 'Organization', name: 'Delta Wellness network', url: `${SITE_URL}/network` },
}

/** Directory facts published by the Institute on its own channels. */
const instituteRecord: [string, string][] = [
  ['Location', 'Pakkret, Nonthaburi, Thailand'],
  ['Active since', 'Brain Power project, 2003'],
  ['Led by', 'Marina Lobova, Chief Medical Officer, Delta Wellness'],
  ['Telephone', '098 287 1090'],
  ['Hours', 'Mon–Fri 8am–5pm · Sat 10am–1pm'],
  ['Web', 'mybrainpoweronline.com · naturemarine.vip'],
]

export default function NetworkPage() {
  return (
    <div className="pt-32">
      <section className="shell section-tight pb-0">
        <SectionLabel extent="26%">Network</SectionLabel>
        <h1 className="mb-10 max-w-[16ch]">The organisations behind the work</h1>
        <p className="lede measure">
          The research on this site sits inside a wider body of work carried out
          by the Brain Power Institute in Bangkok. This page describes that
          network. Statements about products and clinical services are made by
          those organisations on their own sites, and are linked rather than
          restated here as verified content.
        </p>
      </section>

      {/* The Institute — the anchor of the network. */}
      <section className="shell section-loose" aria-labelledby="bpi-heading">
        <div className="reveal card-feature glass-card p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.28fr)_minmax(0,0.72fr)] lg:gap-16">
            <div>
              <p className="eyebrow mb-4">Research partner</p>
              <h2 id="bpi-heading" className="mb-3">
                Brain Power International Institute
              </h2>
              <p className="mb-8 text-body">Bangkok, Thailand · active since 2003</p>

              <div className="prose-block measure mb-10 text-body">
                <p>
                  The Brain Power Institute is the research home of Marina
                  Lobova, chief medical officer of Delta Wellness and the author
                  of both papers in this site&rsquo;s research library. Both
                  papers list the Institute as her affiliation, and the
                  correspondence address printed in each is the
                  Institute&rsquo;s former Ladprao Road office in Bangkok; it
                  now operates from Chaengwattana, Pakkret, Nonthaburi.
                </p>
                <p>
                  On its own site, the Institute describes itself as a
                  freestanding scientific and health centre operating under the
                  guidelines of the Union of Thai Traditional Medicine Society
                  under the Ministry of Public Health, collaborating with
                  universities, hospitals and private clinics on research and
                  clinical trial work for health devices, herbal products and
                  dietary supplements.
                </p>
                <p>
                  The Institute frames its research programme as the
                  &ldquo;physics of life&rdquo;: the application of quantum and
                  wave-mechanical concepts — the Ψ-wave framework set out in the
                  2018 <em>Functional Neurology</em> paper — to the assessment
                  of mental and physical states. Its imaging concept,
                  Ψ&#8209;tronic Tomography, extends that published framework;
                  its clinical descriptions and service claims are published on
                  the Institute&rsquo;s own site.
                </p>
              </div>

              <dl className="ledger mb-10">
                {instituteRecord.map(([term, detail]) => (
                  <div key={term} className="contents">
                    <dt>{term}</dt>
                    <dd>{detail}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-3">
                <a
                  href="http://mybrainpoweronline.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Visit the Institute&rsquo;s site ↗
                </a>
                <a
                  href="https://www.instagram.com/brainpowerinstitute/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Instagram ↗
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="glass-card card-quiet p-6">
                <p className="eyebrow mb-3">In the research library</p>
                <p className="text-sm leading-relaxed text-body">
                  The Institute&rsquo;s published output — the 2018 papers on
                  six-dimensional biomechanics and on the assessment of mental
                  states, and the Movement &amp; Cognition conference session —
                  is indexed with full sourcing under{' '}
                  <a href="/research" className="text-accent hover:underline">
                    Research
                  </a>
                  .
                </p>
              </div>
              <div className="glass-card card-quiet p-6">
                <p className="eyebrow mb-3">Attribution note</p>
                <p className="text-sm leading-relaxed text-body">
                  Descriptions of the Institute&rsquo;s clinical services,
                  methods and results on this page are the Institute&rsquo;s own
                  statements, drawn from its public site, and are marked as
                  such. Delta Wellness republishes as verified only what its
                  cited documents establish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meta Genesis — the flagship programme. */}
      <section className="shell section-tight pt-0" aria-labelledby="mg-heading">
        <div className="reveal glass-card p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="eyebrow mb-4">Programme</p>
              <h2 id="mg-heading" className="mb-6">
                Meta Genesis<span className="text-muted">®</span>
              </h2>
              <div className="prose-block measure text-body">
                <p>
                  Meta Genesis is the Institute&rsquo;s flagship research
                  programme, presented on the Nature Marine site as its work in
                  quantum biocomputing — an attempt to build on foundational
                  research in physics, neuroscience and psychology rather than
                  on brain simulation.
                </p>
                <p>
                  The programme positions itself against large simulation
                  efforts such as the EU&rsquo;s Human Brain Project, which
                  concluded in 2023: where those projects sought to model the
                  brain in software, Meta Genesis is described by its authors as
                  studying the interaction of space, time and consciousness
                  directly, using the Ψ-wave and six-dimensional coordinate
                  frameworks published in the Institute&rsquo;s papers.
                </p>
              </div>
            </div>
            <div>
              <p className="eyebrow mb-4">Genesis product line</p>
              <div className="prose-block measure mb-8 text-body">
                <p>
                  Alongside the research programme, the network operates a
                  product line under the Genesis name, presented and sold
                  through Nature Marine. Product descriptions, intended
                  benefits, availability and pricing are published by Nature
                  Marine on its own site, and readers should evaluate those
                  claims there.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/meta-genesis"
                  className="btn btn-ghost"
                >
                  The Meta Genesis concept
                </a>
                <a
                  href="https://naturemarine.vip/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  naturemarine.vip ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section-tight pt-0">
        <div className="max-w-3xl border-l-2 border-band/60 py-6 pl-6 sm:pl-8">
          <p className="eyebrow mb-3">What this page is</p>
          <p className="text-sm leading-relaxed text-body">
            A directory of the organisations and programmes connected to the
            research indexed on this site, with links to their own publications.
            Health-related product and treatment claims are not restated here:
            this site publishes as its own content only what its cited documents
            establish, and everything else is attributed to its source.
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </div>
  )
}
