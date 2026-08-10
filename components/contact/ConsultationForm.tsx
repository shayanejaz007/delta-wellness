'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type FieldErrors = Record<string, string[] | undefined>

const REASONS = [
  'Book a free consultation',
  'Ask about the sessions',
  'Research or publication enquiry',
  'Something else',
] as const

const TIMES = ['Morning', 'Afternoon', 'Evening', 'No preference'] as const

const CONTACT_METHODS = ['Phone call', 'Email', 'Either'] as const

/**
 * Consultation request form.
 *
 * Posts to the same /api/contact route as before: the extra choices are folded
 * into `subject` and `message` client-side, so the server contract and its
 * validation are unchanged. Keeping one endpoint means one place where
 * delivery, rate limiting and the honeypot are handled.
 *
 * Deliberately absent: any field asking why someone is booking, what symptoms
 * they have, or what condition they are managing. Collecting that would turn a
 * booking form into a health questionnaire — which changes what this business
 * is doing, what it is promising, and what law applies to it.
 */
export default function ConsultationForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [notice, setNotice] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setFieldErrors({})

    const form = new FormData(event.currentTarget)
    const reason = String(form.get('reason') ?? REASONS[0])
    const preferredTime = String(form.get('preferredTime') ?? '')
    const contactMethod = String(form.get('contactMethod') ?? '')
    const note = String(form.get('note') ?? '')

    // Fold the choices into the message body the API already expects.
    const message = [
      `Reason: ${reason}`,
      preferredTime ? `Preferred time: ${preferredTime}` : null,
      contactMethod ? `Best way to reach me: ${contactMethod}` : null,
      '',
      note ||
        'No additional note. Please get in touch to arrange a consultation.',
    ]
      .filter((line) => line !== null)
      .join('\n')

    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      phone: String(form.get('phone') ?? ''),
      subject: reason,
      message,
      company: String(form.get('company') ?? ''),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await response.json()

      if (!response.ok) {
        setFieldErrors(body.fields ?? {})
        setNotice(body.error ?? 'That did not send.')
        setStatus('error')
        return
      }

      setNotice(
        'Thank you — your request has reached us. We will be in touch shortly to arrange a time, and a confirmation is on its way to your inbox.',
      )
      setStatus('sent')
      event.currentTarget.reset()
    } catch {
      setNotice('Something went wrong sending that. Please try again.')
      setStatus('error')
    }
  }

  const errorFor = (field: string) => fieldErrors[field]?.[0]

  return (
    <form onSubmit={handleSubmit} className="glass-card card-feature p-7 sm:p-9">
      <p className="eyebrow mb-6">Request a consultation</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-body">Full name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="field"
            aria-invalid={Boolean(errorFor('name'))}
          />
          {errorFor('name') && (
            <span className="mt-1.5 block text-xs text-band-ink">
              {errorFor('name')}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-body">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field"
            aria-invalid={Boolean(errorFor('email'))}
          />
          {errorFor('email') && (
            <span className="mt-1.5 block text-xs text-band-ink">
              {errorFor('email')}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-body">
            Phone number (optional)
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="field"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-body">
            Best way to reach you
          </span>
          <select name="contactMethod" className="field" defaultValue="Either">
            {CONTACT_METHODS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-body">
            What can we help with
          </span>
          <select name="reason" className="field" defaultValue={REASONS[0]}>
            {REASONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-body">Preferred time</span>
          <select
            name="preferredTime"
            className="field"
            defaultValue="No preference"
          >
            {TIMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm text-body">
          Anything you would like us to know (optional)
        </span>
        <textarea name="note" rows={5} className="field resize-y" />
        <span className="mt-2 block text-xs text-muted">
          Please do not send medical information or health records — this is not
          a clinical channel and we are not able to advise on health matters.
        </span>
      </label>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {notice && (
        <p
          role="status"
          className={`mt-6 rounded-xl border p-4 text-sm ${
            status === 'error'
              ? 'border-band/50 bg-band-wash text-band-ink'
              : 'border-accent/30 bg-accent-wash text-accent-ink'
          }`}
        >
          {notice}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-primary mt-7 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Request my free consultation'}
      </button>
    </form>
  )
}
