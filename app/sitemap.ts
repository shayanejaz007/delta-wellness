import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { publications } from '@/lib/publications'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/technology',
    '/meta-genesis',
    '/research',
    '/team',
    '/consultation',
    '/sessions',
    '/network',
    '/notice',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }))

  const papers = publications.map((p) => ({
    url: `${SITE_URL}/research/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...routes, ...papers]
}
