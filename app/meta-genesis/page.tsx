import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import SourceEvidence from '@/components/ui/SourceEvidence'
import { pageMeta, breadcrumb } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Meta Genesis',
  'Meta Genesis as described by Nature Marine and Brain Power International, placed alongside the published research that informs the wider Physics of Life framework.',
  '/meta-genesis',
)

const conceptCards = [
  {
    n: '01',
    title: 'Quantum biocomputing',
    body:
      'Nature Marine presents Meta Genesis as a quantum-biocomputing framework informed by physics, neuroscience, psychology, clinical psychology and biomedical studies.',
  },
  {
    n: '02',
    title: 'Real-time phenomena',
    body:
      'Brain Power International describes the system as focusing on real-time life phenomena and on the relationship between brain function, perception and psychophysical state.',
  },
  {
    n: '03',
    title: 'Space, time and consciousness',
    body:
      'The first-party description places interactions between space, time and consciousness at the centre of the Meta Genesis concept rather than treating the brain only as a simulated computational object.',
  },
  {
    n: '04',
    title: 'Research lineage',
    body:
      'The language connects to concepts found across Marina Lobova’s published work, including neural signalling, the PSY-cone reference frame, psychomechanics and temporal organisation of living systems.',
  },
]

export default function MetaGenesisPage() {
  const crumbs = breadcrumb([
    { name: 'Home', path: '/' },
    { name: 'Meta Genesis', path: '/meta-genesis' },
  ])

  return (
    <div className="pt-32">
      <section className="shell section pb-0">
        <SectionLabel extent="48%">Meta Genesis®</SectionLabel>
        <h1 className="mb-10 max-w-[14ch] text-[clamp(2.75rem,7vw,5.5rem)]">
          Quantum biocomputing in the Physics of Life framework
        </h1>
        <p className="measure text-lg text-body">
          Meta Genesis is presented by Nature Marine and Brain Power
          International as a next-stage framework for applying ideas from
          physics, neuroscience and psychology to living systems. Delta Wellness
          documents that first-party description here alongside the published
          research that provides its broader theoretical context.
        </p>
      </section>

      <section className="shell section" aria-labelledby="description-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <div className="reveal">
            <h2 id="description-heading" className="mb-8">
              How Meta Genesis is described
            </h2>
            <div className="prose-block measure text-body">
              <p>
                Nature Marine describes Meta Genesis as an evolution toward
                “quantum biocomputing,” built on work spanning physics,
                neuroscience, psychology, clinical psychology and biomedical
                studies. The site frames the concept around the interaction of
                space, time and consciousness in living systems.
              </p>
              <p>
                Brain Power International uses closely related language,
                presenting Meta Genesis as an advanced method and system intended
                to focus attention on real-time life phenomena and the dynamics
                of mental and physical well-being.
              </p>
              <p>
                These are descriptions made by the organisations that publish
                and promote the technology. They are included as primary-source
                material and are not presented by Delta Wellness as independent
                proof of clinical effectiveness.
              </p>
            </div>
          </div>
          <div className="reveal" data-delay="90">
            <SourceEvidence id="metaGenesisNatureMarine" />
          </div>
        </div>
      </section>

      <section className="shell section pt-0" aria-labelledby="framework-heading">
        <SectionLabel extent="64%">Framework</SectionLabel>
        <h2 id="framework-heading" className="mb-6">
          Four ideas that organise the concept
        </h2>
        <p className="mb-14 measure text-body">
          The source websites use broad language. The points below separate that
          language into its recurring conceptual parts without extending the
          claims beyond what those sources state.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {conceptCards.map((item, i) => (
            <li key={item.n} className="reveal" data-delay={Math.min(i * 60, 180)}>
              <article className="glass-glass-card h-full p-7">
                <span className="font-mono text-xs num-band">{item.n}</span>
                <h3 className="mb-3 mt-5 text-xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-body">{item.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell section pt-0" aria-labelledby="lineage-heading">
        <SectionLabel extent="76%">Research lineage</SectionLabel>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <div className="reveal">
            <h2 id="lineage-heading" className="mb-8">
              From neural signals to a wider model of living systems
            </h2>
            <div className="prose-block measure text-body">
              <p>
                The published papers already indexed by Delta Wellness describe
                eight neural signalling groups, a PSY-cone reference frame and a
                hierarchy that extends from basic movement through higher-order
                control to the perception of time.
              </p>
              <p>
                Meta Genesis uses a broader vocabulary, but it sits in the same
                conceptual lineage: brain function is treated as dynamic,
                distributed and time-dependent, with psychophysical events read
                as part of a larger system rather than as isolated measurements.
              </p>
              <p>
                This connection is a conceptual mapping between the publications
                and the current first-party technology descriptions; the papers
                themselves do not evaluate Meta Genesis as a product.
              </p>
            </div>
            <Link href="/technology" className="mt-8 inline-block text-sm text-accent hover:underline">
              Explore the published method →
            </Link>
          </div>
          <div className="reveal" data-delay="90">
            <SourceEvidence id="brainPowerMetaGenesis" />
          </div>
        </div>
      </section>

      <section className="shell section pt-0" aria-labelledby="institute-heading">
        <SectionLabel extent="58%">Brain Power Institute</SectionLabel>
        <div className="split">
          <div className="reveal">
            <h2 id="institute-heading" className="mb-6">
              The institutional context behind the program
            </h2>
            <div className="prose-block measure text-body">
              <p>
                Nature Marine states that the Brain Power Institute was founded
                in 2004 and describes more than two decades of work involving
                complex client cases, biomedical research and collaborations
                across scientific fields.
              </p>
              <p>
                Its current public material places particular emphasis on what it
                calls the “brain code”: the search for patterns that organise the
                dynamics and stability of living systems. Meta Genesis is
                presented as one of the technologies emerging from that wider
                program.
              </p>
            </div>
          </div>
          <div className="reveal" data-delay="90">
            <SourceEvidence id="brainPowerFounded" />
          </div>
        </div>
      </section>

      <section className="shell section pt-0" aria-labelledby="genesis-heading">
        <SectionLabel extent="72%">Related Genesis program</SectionLabel>
        <div className="glass reveal p-8 sm:p-12">
          <div className="split items-start">
            <div>
              <h2 id="genesis-heading" className="mb-5">
                Genesis 2 in the same conceptual family
              </h2>
              <p className="measure text-body">
                Nature Marine separately presents Genesis 2 as a “Space-Time
                Phase Generator” combining hardware and software around its
                Chrono Neuro Genesis concept. The site associates the device with
                psychophysical balance, memory, sleep and organ-level balance.
                Those statements remain first-party product claims; Delta
                Wellness does not restate them as established medical outcomes.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <a
                href="https://naturemarine.vip/Genesis-1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View Nature Marine source ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section pt-0" aria-labelledby="evidence-heading">
        <SectionLabel extent="86%">Evidence status</SectionLabel>
        <h2 id="evidence-heading" className="mb-10">
          What is established, and what is only described
        </h2>
        <ul className="grid max-w-5xl gap-4 sm:grid-cols-3">
          <li className="glass-glass-card p-7">
            <p className="eyebrow mb-4">Published</p>
            <p className="text-sm leading-relaxed text-body">
              Neural signalling, psychomechanics, the PSY-cone framework and the
              eight-level control model are documented in publications indexed
              in the Research section.
            </p>
          </li>
          <li className="glass-glass-card p-7">
            <p className="eyebrow mb-4">First-party</p>
            <p className="text-sm leading-relaxed text-body">
              Meta Genesis, quantum biocomputing and Genesis product descriptions
              come from Nature Marine and Brain Power International themselves.
            </p>
          </li>
          <li className="glass-glass-card p-7">
            <p className="eyebrow mb-4">Not established here</p>
            <p className="text-sm leading-relaxed text-body">
              Clinical efficacy, safety, diagnosis, treatment outcomes and
              regulatory status are not established by the material presented on
              this site.
            </p>
          </li>
        </ul>
      </section>

      <section className="shell section pt-0">
        <div className="glass reveal p-8 sm:p-12">
          <div className="split items-center">
            <div>
              <h2 className="mb-4">Continue into the source material</h2>
              <p className="measure text-body">
                Read the publications behind the research framework or review the
                original Meta Genesis descriptions from Nature Marine and Brain
                Power International.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-self-end">
              <Link href="/research" className="btn btn-primary">
                Research library
              </Link>
              <a
                href="https://naturemarine.vip/Meta-Genesis"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Nature Marine ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    </div>
  )
}
