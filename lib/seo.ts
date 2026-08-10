export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deltawellness.com'

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/sessions', label: 'Sessions' },
  { href: '/technology', label: 'Method' },
  { href: '/meta-genesis', label: 'Meta Genesis' },
  { href: '/research', label: 'Research' },
  { href: '/team', label: 'People' },
  { href: '/consultation', label: 'Free consultation' },
] as const

/**
 * Studio contact details, in one place so the address and telephone cannot
 * drift apart between the consultation page, the footer and the schema.
 */
export const CONTACT = {
  street: '661 East Palisades Ave, Suite A4',
  city: 'Englewood Cliffs',
  region: 'NJ',
  postalCode: '07632',
  phone: '+1-551-401-2604',
  phoneHref: '+15514012604',
  phoneDisplay: '(551) 401-2604',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=661+East+Palisades+Ave+Suite+A4+Englewood+Cliffs+NJ+07632',
} as const

export function pageMeta(
  title: string,
  description: string,
  path: string,
) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: `${SITE_URL}${path}` },
    twitter: { title, description },
  }
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
