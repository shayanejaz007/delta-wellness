'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** How long to wait before offering the dialog. */
const DELAY_MS = 6000

/** Remembered dismissals, so the dialog does not nag on every page view. */
const STORAGE_KEY = 'dw-consult-prompt'
const SNOOZE_DAYS = 14

/**
 * Consultation prompt.
 *
 * Shown once, a few seconds after arrival, then remembered — a dialog that
 * reappears on every navigation trains people to dismiss it without reading,
 * which costs more enquiries than it wins. It also never appears on the pages
 * that already carry the form, where it would be pure friction.
 *
 * Mobile behaviour differs from desktop on purpose: on a phone this is a
 * bottom sheet within thumb reach, and the field order and input types are set
 * so the correct keyboard opens and iOS does not zoom on focus. See the notes
 * on `text-base` below — that one is a real bug on iPhones, not a style
 * preference.
 *
 * Accessibility: labelled dialog, focus moved in and restored on close, focus
 * trapped while open, Escape closes, background scroll locked.
 */
export default function ConsultationPrompt() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [notice, setNotice] = useState('')

  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const restoreFocusTo = useRef<Element | null>(null)

  // Pages that already ask for a consultation. Prompting there is redundant.
  const suppressed = pathname === '/consultation' || pathname === '/contact'

  const close = useCallback(() => {
    setOpen(false)
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ until: Date.now() + SNOOZE_DAYS * 86_400_000 }),
      )
    } catch {
      /* private browsing or storage disabled — the dialog simply returns */
    }
    if (restoreFocusTo.current instanceof HTMLElement) {
      restoreFocusTo.current.focus()
    }
  }, [])

  // Decide whether to offer the dialog at all.
  useEffect(() => {
    if (suppressed) return

    let snoozed = false
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) snoozed = (JSON.parse(raw)?.until ?? 0) > Date.now()
    } catch {
      /* unreadable storage is treated as no record */
    }
    if (snoozed) return

    const timer = window.setTimeout(() => {
      restoreFocusTo.current = document.activeElement
      setOpen(true)
    }, DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [suppressed])

  // Escape to close, and keep focus inside the dialog while it is open.
  useEffect(() => {
    if (!open) return

    // Lock background scroll without the page jumping: pad by the width of the
    // scrollbar that is about to disappear.
    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    firstFieldRef.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [open, close])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')

    // Captured before the await: React recycles the event, so reading
    // currentTarget afterwards returns null and throws.
    const formEl = event.currentTarget
    const data = new FormData(formEl)

    const name = String(data.get('name') ?? '')
    const description = String(data.get('description') ?? '').trim()

    // The API requires a message of at least twenty characters, and the
    // description here is optional, so the request always carries a body of
    // its own and appends the note when there is one.
    const message = [
      'Requested a free 30-minute consultation using the pop-up form.',
      description ? `\nWhat they told us:\n${description}` : '',
    ].join('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: String(data.get('email') ?? ''),
          phone: String(data.get('phone') ?? ''),
          subject: 'Free 30-minute consultation request',
          message,
          company: String(data.get('company') ?? ''),
        }),
      })
      const body = await response.json()

      if (!response.ok) {
        setNotice(body.error ?? 'That did not send. Please try again.')
        setStatus('error')
        return
      }

      setStatus('sent')
      formEl.reset()
      // Do not re-prompt someone who has just booked.
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ until: Date.now() + 365 * 86_400_000 }),
        )
      } catch {
        /* ignore */
      }
    } catch {
      setNotice('Something went wrong sending that. Please try again.')
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4"
      role="presentation"
    >
      {/* Scrim. Clicking it closes, matching the expectation set by every
          other dialog on the web. */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/35 backdrop-blur-[2px]"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-prompt-title"
        className="
          glass-card card-feature relative w-full
          max-h-[92svh] overflow-y-auto overscroll-contain
          rounded-b-none rounded-t-[26px]
          p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]
          sm:max-w-lg sm:rounded-[26px] sm:p-9 sm:pb-9
        "
      >
        {/* Grab handle: reads as a sheet on touch devices. */}
        <span
          aria-hidden="true"
          className="mx-auto mb-5 block h-1 w-10 rounded-full bg-ink/15 sm:hidden"
        />

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/60 hover:text-ink"
        >
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
          </svg>
        </button>

        {status === 'sent' ? (
          <div className="py-6 text-center">
            <p className="eyebrow mb-4">Request received</p>
            <h2 id="consult-prompt-title" className="mb-4 text-2xl">
              Thank you
            </h2>
            <p className="mx-auto max-w-sm text-body">
              We have your request and will be in touch shortly to arrange a
              time. A confirmation is on its way to your inbox.
            </p>
            <button
              type="button"
              onClick={close}
              className="btn btn-ghost mt-7"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow mb-3">No cost, no obligation</p>
            <h2 id="consult-prompt-title" className="mb-3 pr-10 text-2xl">
              Book a free 30-minute consultation
            </h2>
            <p className="mb-6 text-[0.9375rem] leading-relaxed text-body">
              A short conversation about the sessions at our Englewood Cliffs
              studio — what they involve and whether they suit what you are
              looking for. Leave your details and we will arrange a time.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/*
                `text-base` on every control is deliberate. Safari on iOS zooms
                the viewport whenever a focused input renders below 16px, and
                the page never zooms back out — so smaller type here would
                break the layout on iPhone the moment someone taps a field.
              */}
              <label className="block">
                <span className="mb-1.5 block text-sm text-body">
                  Full name
                </span>
                <input
                  ref={firstFieldRef}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  autoCapitalize="words"
                  className="field text-base"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm text-body">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  inputMode="email"
                  className="field text-base"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm text-body">
                  Phone number
                </span>
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  className="field text-base"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm text-body">
                  Anything you would like us to know{' '}
                  <span className="text-muted">(optional)</span>
                </span>
                <textarea
                  name="description"
                  rows={3}
                  className="field resize-y text-base"
                />
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
                  className="rounded-xl border border-band/50 bg-band-wash p-3 text-sm text-band-ink"
                >
                  {notice}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn btn-primary w-full justify-center disabled:opacity-60"
              >
                {status === 'sending'
                  ? 'Sending…'
                  : 'Request my free consultation'}
              </button>

              <p className="text-center text-xs leading-relaxed text-muted">
                Delta Wellness offers relaxation sessions and is not a medical
                practice. Please do not send medical information here.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
