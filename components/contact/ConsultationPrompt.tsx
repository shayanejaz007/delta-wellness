'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { CONTACT } from '@/lib/seo'
import { CONVERSIONS, reportConversion } from '@/lib/gtag'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** How long to wait before offering the dialog. */
const DELAY_MS = 3000

/** Remembered dismissals, so the dialog does not nag on every page view. */
const STORAGE_KEY = 'dw-consult-prompt'
const SNOOZE_DAYS = 14

/**
 * Consultation prompt.
 *
 * Calling is the primary action. Someone who is ready to book converts far
 * better on a tap-to-call than on a form they have to fill in and then wait
 * for a reply to, so the telephone number is the loudest element here and the
 * form is offered underneath as the quieter alternative for people who cannot
 * talk right now.
 *
 * The form is three fields. Every additional field costs completions, and
 * name, telephone and email are all that is needed to call someone back.
 *
 * Shown once, a few seconds after arrival, then remembered — a dialog that
 * reappears on every navigation trains people to dismiss it without reading.
 * It never appears on the pages that already carry the form.
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
  const callRef = useRef<HTMLAnchorElement>(null)
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

    let idle = 0
    const timer = window.setTimeout(() => {
      // Mount on an idle frame. At three seconds the hero entrance animations
      // and the video crossfade may still be running; forcing a dialog into
      // that frame is what produces a visible stutter. requestIdleCallback
      // waits for a gap, with a timeout so it always fires regardless.
      const schedule =
        window.requestIdleCallback ??
        ((cb: IdleRequestCallback) => window.setTimeout(() => cb({} as IdleDeadline), 0))

      idle = schedule(
        () => {
          restoreFocusTo.current = document.activeElement
          setOpen(true)
        },
        { timeout: 1200 },
      ) as unknown as number
    }, DELAY_MS)

    return () => {
      window.clearTimeout(timer)
      if (idle && window.cancelIdleCallback) window.cancelIdleCallback(idle)
    }
  }, [suppressed])

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

    // Pause any background video for as long as the dialog is up. The hero
    // runs two <video> layers to crossfade its loop; leaving both decoding
    // behind an opaque panel burns CPU no one can see, and on weaker phones
    // that is the difference between the dialog appearing instantly and the
    // page stalling for a second first.
    const videos = Array.from(document.querySelectorAll('video'))
    const wasPlaying = videos.filter((v) => !v.paused)
    wasPlaying.forEach((v) => v.pause())

    // Focus lands on the call button, not the first input: it is the primary
    // action, and opening a keyboard unprompted on mobile is hostile.
    callRef.current?.focus()

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
      wasPlaying.forEach((v) => {
        v.play().catch(() => {
          /* autoplay may be refused on resume; the poster layer covers it */
        })
      })
    }
  }, [open, close])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setNotice('')

    // Captured before the await: React recycles the event, so reading
    // currentTarget afterwards returns null and throws.
    const formEl = event.currentTarget
    const data = new FormData(formEl)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          phone: String(data.get('phone') ?? ''),
          subject: 'Free 30-minute consultation request',
          // The API requires at least twenty characters, and this form has no
          // message field, so the request carries its own body.
          message:
            'Requested a free 30-minute consultation using the pop-up form. Please call them back to arrange a time.',
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
      reportConversion(CONVERSIONS.leadForm)
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
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/45"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-prompt-title"
        /*
          Deliberately NOT `glass-card card-feature`.

          Those classes carry `backdrop-filter: blur(22px) saturate(190%)`, and
          this panel sits over the scrim, the fixed page gradients and two
          crossfading hero videos. Stacking full-viewport backdrop filters over
          decoding video costs a blur pass per frame and locks up mid-range
          phones — which is what made the page hang as the dialog appeared.

          A near-opaque panel is also simply more readable for a form.
        */
        className="
          relative w-full border border-white/70 bg-[#fbfdfe] shadow-[0_-8px_60px_-12px_rgba(15,27,45,0.45)]
          max-h-[92svh] overflow-y-auto overscroll-contain
          rounded-b-none rounded-t-[26px]
          p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]
          sm:max-w-md sm:rounded-[26px] sm:p-8 sm:pb-8
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
              We have your details and will call shortly to arrange a time. A
              confirmation is on its way to your inbox.
            </p>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              onClick={() => reportConversion(CONVERSIONS.phoneCall)}
              className="btn btn-primary mt-7 w-full justify-center"
            >
              Or call us now
            </a>
            <button type="button" onClick={close} className="btn btn-ghost mt-3 w-full justify-center">
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow mb-3">Free · 30 minutes · No obligation</p>
            <h2 id="consult-prompt-title" className="mb-3 pr-10 text-2xl">
              Talk to us today
            </h2>
            <p className="mb-6 text-[0.9375rem] leading-relaxed text-body">
              A short conversation about the sessions at our Englewood Cliffs
              studio. The quickest way is simply to call — we can usually book
              you in on the spot.
            </p>

            {/* Primary action. Sized and coloured to be the obvious next step,
                with the number shown in full: people trust a number they can
                read, and on desktop, where tapping does nothing, seeing it is
                the whole point. */}
            <a
              ref={callRef}
              href={`tel:${CONTACT.phoneHref}`}
              onClick={() => reportConversion(CONVERSIONS.phoneCall)}
              className="btn btn-primary w-full justify-center gap-2.5 !py-4 !text-lg"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-5 w-5 shrink-0"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M2.5 3.5A1.5 1.5 0 014 2h1.6a1.5 1.5 0 011.45 1.11l.6 2.2a1.5 1.5 0 01-.4 1.47l-1 1a11.5 11.5 0 004.47 4.47l1-1a1.5 1.5 0 011.47-.4l2.2.6A1.5 1.5 0 0118 13.4V15a1.5 1.5 0 01-1.5 1.5h-.5A13.5 13.5 0 012.5 4v-.5z" />
              </svg>
              {CONTACT.phoneDisplay}
            </a>

            <p className="mt-3 text-center text-xs text-muted">
              Mon–Fri 9am–6pm · Sat by appointment
            </p>

            {/* Divider into the secondary path. */}
            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-[var(--line)]" />
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                or we&rsquo;ll call you
              </span>
              <span className="h-px flex-1 bg-[var(--line)]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/*
                `text-base` on every control is deliberate. Safari on iOS zooms
                the viewport whenever a focused input renders below 16px, and
                the page never zooms back out.

                Labels are visible rather than placeholder-only: placeholders
                vanish on focus, which leaves people who look away mid-form
                unsure what a field was for.
              */}
              <label className="block">
                <span className="mb-1.5 block text-sm text-body">Name</span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  autoCapitalize="words"
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
                className="btn btn-ghost w-full justify-center disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Request a call back'}
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-relaxed text-muted">
              Delta Wellness offers relaxation sessions and is not a medical
              practice. Please do not send medical information here.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
