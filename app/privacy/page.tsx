import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Privacy',
  'What this site collects, why, and how long it is kept.',
  '/privacy',
)

export default function PrivacyPage() {
  return (
    <div className="pt-32">
      <section className="shell section">
        <SectionLabel extent="26%">Privacy</SectionLabel>
        <h1 className="mb-12 text-[clamp(2.25rem,5.5vw,4rem)]">
          Privacy policy
        </h1>

        <div className="prose-block measure text-body">
          <h2 className="mb-4 mt-12 text-2xl text-ink">What we collect</h2>
          <p>
            Only what you type into the contact form: your name, email address,
            an optional phone number, a subject and your message. Nothing else is
            requested and no account is created.
          </p>

          <h2 className="mb-4 mt-12 text-2xl text-ink">Why</h2>
          <p>
            Solely to read and reply to your enquiry. Submissions are delivered
            by email to Delta Wellness. They are not sold, rented or used for
            advertising.
          </p>

          <h2 className="mb-4 mt-12 text-2xl text-ink">Health information</h2>
          <p>
            Please do not send medical records or other confidential health
            information through this form. It is not a secure clinical channel
            and is not operated as one.
          </p>

          <h2 className="mb-4 mt-12 text-2xl text-ink">Your rights</h2>
          <p>
            Ask us and we will tell you what correspondence we hold from you,
            correct it, or delete it.
          </p>

          <h2 className="mb-4 mt-12 text-2xl text-ink">Contact</h2>
          <p>
            Send privacy requests through the contact form, marking the subject
            line accordingly.
          </p>
        </div>
      </section>
    </div>
  )
}
