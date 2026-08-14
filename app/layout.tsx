import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Figtree, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ConsultationPrompt from '@/components/contact/ConsultationPrompt'
import RevealObserver from '@/components/ui/Reveal'
import { SITE_URL } from '@/lib/seo'

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})
const sans = Figtree({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Delta Wellness — Neuroscience and consciousness research',
    template: '%s — Delta Wellness',
  },
  description:
    'A sourced research library presenting published work by Marina Lobova on neural signalling, mental states, biomechanics and psychomechanics.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Delta Wellness',
    url: SITE_URL,
    title: 'Delta Wellness — Neuroscience and consciousness research',
    description:
      'Published research on neural signalling, mental states, biomechanics and psychomechanics.',
    images: ['/logo.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delta Wellness',
    description:
      'Published research on neural signalling, mental states, biomechanics and psychomechanics.',
    images: ['/logo.jpg'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/logo-mark.svg',
  },
  robots: { index: true, follow: true },
}

/**
 * `viewport-fit=cover` lets the page paint under the iPhone notch and home
 * indicator; the safe-area padding in the prompt and footer relies on it.
 * `maximumScale` is deliberately left alone — capping it blocks pinch-zoom,
 * which is an accessibility failure for anyone who needs to magnify text.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F5F8FC',
}

/** Organization only. MedicalOrganization / Physician are not used: nothing in
 *  the supplied material establishes those classifications. */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Delta Wellness',
  url: SITE_URL,
  description:
    'Research organisation presenting published work on neural signalling, mental states, biomechanics and psychomechanics.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Marks JS as available before first paint, so `.reveal` can hide
            content only when something exists to reveal it again. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ConsultationPrompt />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  )
}
