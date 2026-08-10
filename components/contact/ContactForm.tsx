'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type FieldErrors = Record<string, string[] | undefined>

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone number (optional)', type: 'tel', required: false, autoComplete: 'tel' },
  { name: 'subject', label: 'Subject', type: 'text', required: true, autoComplete: 'off' },
] as const

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setFieldErrors({})

    const data = Object.fromEntries(new FormData(event.currentTarget))

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await response.json()

      if (!response.ok) {
        setFieldErrors(body.fields ?? {})
        setMessage(body.error ?? 'That did not send.')
        setStatus('error')
        return
      }

      setStatus('sent')
    } catch {
      setMessage('The network dropped that request. Try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="glass-card p-10" role="status">
        <p className="mb-3 font-display text-3xl">Message sent</p>
        <p className="text-body">
          Your enquiry has reached us. We reply to research and institutional
          correspondence directly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot — visually and programmatically hidden from people. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className={field.name === 'subject' ? 'sm:col-span-2' : ''}>
            <label htmlFor={field.name} className="eyebrow mb-2 block">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              autoComplete={field.autoComplete}
              aria-invalid={Boolean(fieldErrors[field.name])}
              aria-describedby={
                fieldErrors[field.name] ? `${field.name}-error` : undefined
              }
              className="w-full field px-4 py-3 text-ink placeholder:text-body/60"
            />
            {fieldErrors[field.name] && (
              <p id={`${field.name}-error`} className="mt-2 text-sm num-band">
                {fieldErrors[field.name]![0]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="message" className="eyebrow mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? 'message-error' : 'message-hint'}
          className="field"
        />
        {fieldErrors.message && (
          <p id="message-error" className="mt-2 text-sm num-band">
            {fieldErrors.message[0]}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl border border-band/50 bg-band-wash p-4 text-sm text-ink">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
