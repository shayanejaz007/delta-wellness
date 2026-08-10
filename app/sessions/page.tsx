import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { pageMeta, CONTACT } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Sessions',
  'What a relaxation session at Delta Wellness in North Bergen involves — how long it takes, what happens in the room, and what to expect afterwards.',
  '/sessions',
)

/**
 * Session content is written at the level the evidence supports: what happens
 * in the room, how long it takes, how it feels. Comfort and relaxation are
 * things a person can report for themselves, so they can be described here.
 *
 * What is deliberately absent: any claim to detect, assess, diagnose, treat,
 * cure or improve a medical condition. Those claims require clinical evidence
 * and, for a physical location offering them, licensure — see CONTENT-AUDIT.md.
 */

const STAGES: [string, string, string][] = [
  [
    '01',
    'Arrival and settling',
    'You arrive, take a seat, and we go over what the session involves and how long it runs. Nothing starts until you are comfortable and your questions are answered. Most people find this part takes about ten minutes.',
  ],
  [
    '02',
    'The session',
    'You rest in a reclined position, fully clothed, in a quiet low-lit room. The session is passive: there is nothing to do, nothing to concentrate on, and nothing is inserted, injected or broken. Most people close their eyes. Some fall asleep, which is fine.',
  ],
  [
    '03',
    'Coming back',
    'The session ends gradually rather than abruptly. You sit up in your own time, have a glass of water, and take a few minutes before heading out. We do not rush this part.',
  ],
  [
    '04',
    'Afterwards',
    'You can drive, work, and carry on with your day as normal. There is no recovery period and no aftercare. If you would like to come again, you can book at the studio or later on.',
  ],
]

const PRACTICAL: [string, string][] = [
  ['Duration', 'About 45 minutes in the room, an hour in the building'],
  ['What to wear', 'Whatever you are comfortable in. Nothing is removed'],
  ['First visit', 'Arrive ten minutes early so we are not rushing the start'],
  ['Bring', 'Nothing. Water is provided'],
  ['Location', `${CONTACT.street}, ${CONTACT.city}, ${CONTACT.region}`],
  ['Booking', 'By phone or through the consultation form'],
]

const HONEST: [string, string][] = [
  [
    'It is a relaxation service',
    'The sessions are offered for rest and relaxation. They are not a medical procedure, and we make no claim that they detect, assess, treat or improve any medical condition.',
  ],
  [
    'It is not a substitute for care',
    'Nothing offered here replaces a doctor, a therapist or a prescription. If you are managing a health condition, keep working with the clinician who is managing it, and do not change any treatment because of a session with us.',
  ],
  [
    'Responses vary, and some people feel nothing',
    'People describe sessions differently. Some find them deeply restful, some find them pleasant but unremarkable, and some notice nothing in particular. All of those are ordinary outcomes and none of them means anything went wrong.',
  ],
  [
    'We will tell you if it is not for you',
    'If what you are hoping for is something a relaxation session cannot do, we would rather say that at the consultation than take a booking. That conversation is free and carries no obligation.',
  ],
]

export default function SessionsPage() {
  return (
    <div className="pt-32">
      <section className="shell section-tight pb-0">
        <SectionLabel extent="24%">Sessions</SectionLabel>
        <h1 className="mb-10 max-w-[15ch]">What a session involves</h1>
        <p className="lede measure">
          Delta Wellness offers relaxation sessions at our studio in North
          Bergen, New Jersey. This page describes exactly what happens, so you
          know what you are booking before you arrive.
        </p>
      </section>

      {/* The sequence of a visit. */}
      <section className="shell section-loose" aria-labelledby="stages-heading">
        <h2 id="stages-heading" className="mb-10">
          A visit, start to finish
        </h2>

        <div className="grid gap-4 lg:grid-cols-2">
          {STAGES.map(([number, title, detail]) => (
            <div key={number} className="reveal glass-card p-7 sm:p-9">
              <span className="font-mono text-xs tracking-[0.16em] text-accent-ink">
                {number}
              </span>
              <h3 className="mb-3 mt-4 text-xl">{title}</h3>
              <p className="text-body">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Practical detail, as a ledger. */}
      <section className="shell section-tight pt-0">
        <div className="reveal glass-card card-feature p-7 sm:p-10">
          <p className="eyebrow mb-7">Practical detail</p>
          <dl className="ledger">
            {PRACTICAL.map(([term, detail]) => (
              <div key={term} className="contents">
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The honest section. Placed before the call to action on purpose:
          anyone booking should have read it first. */}
      <section className="shell section-loose pt-0" aria-labelledby="honest-heading">
        <h2 id="honest-heading" className="mb-4">
          Being straight with you
        </h2>
        <p className="lede measure mb-10">
          Wellness is a field with a lot of overclaiming in it. Here is what we
          do and do not say about these sessions.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {HONEST.map(([title, detail]) => (
            <div
              key={title}
              className="reveal glass-card card-quiet border-l-4 border-l-band p-7"
            >
              <h3 className="mb-3 text-lg">{title}</h3>
              <p className="text-sm leading-relaxed text-body">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action. */}
      <section className="shell section-tight pt-0">
        <div className="reveal glass-card card-feature p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-center lg:gap-16">
            <div>
              <h2 className="mb-4">Start with a free consultation</h2>
              <p className="measure text-body">
                Twenty minutes, no cost, no obligation. We answer your
                questions, you see the space if you would like to, and you
                decide afterwards in your own time.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/consultation" className="btn btn-primary">
                Book a consultation
              </Link>
              <a href={`tel:${CONTACT.phoneHref}`} className="btn btn-ghost">
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
