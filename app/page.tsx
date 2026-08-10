import Link from 'next/link'
import Hero from '@/components/home/Hero'
import NeuralBand from '@/components/home/NeuralBand'
import Levels from '@/components/home/Levels'
import SourceEvidence from '@/components/ui/SourceEvidence'
import SectionLabel from '@/components/ui/SectionLabel'
import ResearchCard from '@/components/research/ResearchCard'
import { publications } from '@/lib/publications'

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section shell" aria-labelledby="about-heading">
        <SectionLabel extent="28%">About</SectionLabel>
        <div className="split">
          <div className="reveal">
            <h2 id="about-heading" className="mb-5">
              A record of published work
            </h2>
            <p className="measure text-body">
              Delta Wellness presents research into neural signalling, mental
              states and the mechanics of human movement, drawn from papers by
              Marina Lobova of the Brain Power Institute in Bangkok together
              with the works those papers cite.
            </p>
          </div>
          <div className="reveal" data-delay="90">
            <SourceEvidence id="consciousnessChallenge" />
          </div>
        </div>
      </section>

      <section className="section shell pt-0" aria-labelledby="model-heading">
        <SectionLabel extent="44%">The model</SectionLabel>
        <div className="split mb-10">
          <h2 id="model-heading" className="reveal">
            Signal read against a band
          </h2>
          <p className="reveal measure text-body" data-delay="80">
            The method groups neural signals into eight functional pathways and
            reads each against a reported band of optimum regulation. Values
            below and above that band are associated in the paper with retarded
            and hyper signalling respectively.
          </p>
        </div>
        <div className="reveal" data-delay="120">
          <NeuralBand />
        </div>
      </section>

      <Levels />

      <section className="section shell pt-0" aria-labelledby="lineage-heading">
        <SectionLabel extent="66%">Theoretical lineage</SectionLabel>
        <div className="split">
          <div className="reveal">
            <h2 id="lineage-heading" className="mb-5">
              Where the geometry comes from
            </h2>
            <div className="prose-block measure text-body">
              <p>
                The 2018 paper builds on work by the Russian theoretical
                physicist Gennady Shipov, whose <em>Theory of Physical Vacuum</em>{' '}
                was published in 1990 and whose{' '}
                <em>Descartes&rsquo; Mechanics</em> was presented at the
                University of Liège in 2005.
              </p>
              <p>
                Lobova applies the logic of a six-dimensional coordinate system,
                in which four translational coordinates describe the motion of
                an orientable point and six angular coordinates describe the
                change in its orientation, to the movements of the human body.
              </p>
            </div>
          </div>
          <div className="reveal" data-delay="90">
            <SourceEvidence id="carmeliOnShipov" />
          </div>
        </div>
      </section>

      <section className="section shell pt-0" aria-labelledby="research-heading">
        <SectionLabel extent="80%">Research</SectionLabel>
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <h2 id="research-heading" className="reveal">
            Publications
          </h2>
          <Link
            href="/research"
            className="reveal text-sm text-accent hover:underline"
          >
            View the full library →
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publications.map((paper, i) => (
            <li
              key={paper.slug}
              className="reveal"
              data-delay={Math.min(i * 70, 210)}
            >
              <ResearchCard publication={paper} />
            </li>
          ))}
        </ul>
      </section>

      <section className="section shell pt-0">
        <div className="glass reveal p-8 sm:p-12">
          <div className="split items-center">
            <div>
              <h2 className="mb-4">Enquiries from researchers</h2>
              <p className="measure text-body">
                For questions about the published work, requests for original
                papers, or research collaboration.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Link href="/contact" className="btn btn-primary">
                Contact Delta Wellness
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
