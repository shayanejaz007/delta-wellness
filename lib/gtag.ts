/**
 * Google Ads conversion reporting.
 *
 * The account id below is the one from the supplied tag, and it is also what
 * `app/layout.tsx` configures. Page views are therefore already recorded.
 *
 * The two lead actions on this site — tapping the telephone number, and
 * submitting a call-back form — report as conversions as well, because Ads
 * bidding only improves when Google is told which sessions produced an
 * enquiry rather than just a visit.
 *
 * These default to the account id so they work immediately with no further
 * setup. To see calls and form fills as *separate* conversion actions in the
 * Ads UI (worth doing before spending much), create two conversion actions
 * under Goals → Conversions, then paste the labels Google issues below —
 * they look like `AW-18379237482/AbCdEfGhIjK`. Nothing else needs changing.
 */

export const GADS_ID = 'AW-18379237482'

export const CONVERSIONS = {
  /**
   * Phone call conversion. Still falling back to the account id: create a
   * "Phone call lead" action under Goals -> Conversions and paste its
   * `send_to` value here to report calls separately from form fills.
   */
  phoneCall: GADS_ID,

  /** "Submit lead form" action, created in the Ads UI. */
  leadForm: 'AW-18379237482/2j8oCN2Wt-EcEOrQ87tE',
} as const

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

/**
 * Report a conversion. Safe to call before the tag has loaded or when an ad
 * blocker has removed it: in either case it does nothing rather than throwing
 * inside a click handler, so analytics can never break the action the visitor
 * is actually taking.
 */
export function reportConversion(sendTo: string) {
  if (!sendTo) return
  const w = window as GtagWindow
  if (typeof w.gtag !== 'function') return

  try {
    w.gtag('event', 'conversion', { send_to: sendTo })
  } catch {
    /* analytics must never break the action the visitor is taking */
  }
}
