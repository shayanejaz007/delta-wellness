import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import ConsultationForm from '@/components/contact/ConsultationForm'
import { pageMeta, SITE_URL, CONTACT } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Free consultation',
  'Book a free, no-obligation consultation at Delta Wellness in North Bergen, New Jersey. Ask questions, see the studio, and decide in your own time.',
  '/consultation',
)

/**
 * LocalBusiness rather than MedicalBusiness or MedicalClinic.
 *
 * The schema type is a public claim about what this place is. Delta Wellness
 * offers a non-clinical relaxation service, so the health-care types would
 * misrepresent it to search engines and to anyone reading the markup.
 */
const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'Delta Wellness',
  url: `${SITE_URL}/consultation`,
  telephone: CONTACT.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.street,
    addressLocality: CONTACT.city,
    addressRegion: CONTACT.region,
    postalCode: CONTACT.postalCode,
    addressCountry: 'US',
  },
  areaServed: ['New Jersey', 'New York'],
  makesOffer: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    itemOffered: {
      '@type': 'Service',
      name: 'Introductory consultation',
      description:
        'A free, no-obligation conversation about the relaxation sessions offered at the studio.',
    },
  },
}

const EXPECT: [string, string][] = [
  [
    'A conversation, not an assessment',
    'We talk through what the sessions involve, what a visit looks like, and what they are and are not for. Nothing is measured, diagnosed or interpreted.',
  ],
  [
    'About twenty minutes',
    'By phone, or in person at the studio if you would rather see the space first. Long enough to answer questions properly, short enough to fit in a lunch break.',
  ],
  [
    'No cost and no commitment',
    'The consultation is free. There is no obligation to book anything afterwards, and we do not use it as a sales call.',
  ],
  [
    'Straight answers',
    'If what you are looking for is something we do not offer, we will say so and suggest where to look instead.',
  ],
]

export default function ConsultationPage() {
  return (
    <div className="pt-32">
      <section className="shell section-tight pb-0">
        <SectionLabel extent="22%">Consultation</SectionLabel>
        <h1 className="mb-10 max-w-[16ch]">Book a free consultation</h1>
        <p className="lede measure">
          A short, no-obligation conversation about the relaxation sessions at
          our North Bergen studio — what they involve, what to expect, and
          whether they are a fit for what you are looking for.
        </p>
      </section>

      <section className="shell section-loose">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <ConsultationForm />

          <aside className="space-y-6">
            {/* Address and telephone, as a real card rather than footer text. */}
            <div className="glass-card card-feature p-7">
              <p className="eyebrow mb-5">Visit or call</p>

              <address className="not-italic">
                <p className="text-body">
                  <span className="block text-ink">{CONTACT.street}</span>
                  {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
                </p>
                <p className="mt-5">
                  <a
                    href={`tel:${CONTACT.phoneHref}`}
                    className="font-mono text-lg text-accent hover:underline"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </p>
              </address>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${CONTACT.phoneHref}`} className="btn btn-primary">
                  Call the studio
                </a>
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Directions ↗
                </a>
              </div>
            </div>

            {/* The boundary statement. Kept prominent rather than buried in a
                footer: it is the thing that sets expectations honestly before
                anyone books, and it is also what keeps the offer compliant. */}
            <div className="glass-card card-quiet border-l-4 border-l-band p-7">
              <p className="eyebrow mb-3">What this is not</p>
              <p className="text-sm leading-relaxed text-body">
                Delta Wellness offers relaxation sessions. We are not a medical
                practice. The consultation is not a medical appointment: no
                diagnosis is offered, no condition is assessed or treated, and
                no medical advice is given. Nothing here is a substitute for
                care from a licensed clinician, and you should not delay or stop
                any treatment on the strength of a session with us.
              </p>
            </div>

            <div className="glass-card card-quiet p-7">
              <p className="eyebrow mb-3">Research correspondence</p>
              <p className="text-sm leading-relaxed text-body">
                For questions about the published papers, requests for an
                original, or collaboration, use the same form and say so in your
                message — it reaches the same place.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />

      <section className="shell section-tight pt-0">
        <p className="eyebrow mb-8">What to expect</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {EXPECT.map(([title, detail]) => (
            <div key={title} className="reveal glass-card card-quiet p-7">
              <h3 className="mb-3 text-lg">{title}</h3>
              <p className="text-sm leading-relaxed text-body">{detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
