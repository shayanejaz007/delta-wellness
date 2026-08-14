'use client'

import { CONTACT } from '@/lib/seo'
import { CONVERSIONS, reportConversion } from '@/lib/gtag'

/**
 * Telephone link that reports a Google Ads conversion when tapped.
 *
 * Exists as its own client component so that pages using it can stay server
 * components: only this link needs to run in the browser, not the page around
 * it.
 */
export default function CallLink({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={`tel:${CONTACT.phoneHref}`}
      onClick={() => reportConversion(CONVERSIONS.phoneCall)}
      className={className}
    >
      {children}
    </a>
  )
}
