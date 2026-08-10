import Link from 'next/link'
import { NAV_LINKS, CONTACT } from '@/lib/seo'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-white/50">
      <div className="shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="footer" className="h-14 w-auto text-ink" />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Relaxation sessions in North Bergen, New Jersey, alongside a
              sourced library of published research.
            </p>

            <address className="mt-5 not-italic text-sm text-body">
              <span className="block">{CONTACT.street}</span>
              <span className="block">
                {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
              </span>
              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="mt-2 inline-block font-mono text-accent hover:underline"
              >
                {CONTACT.phoneDisplay}
              </a>
            </address>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow mb-4">Site</p>
            <ul className="space-y-2 text-sm text-body">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Sources</p>
            <ul className="space-y-2 text-sm text-body">
              <li>
                <a
                  href="http://mybrainpoweronline.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  Brain Power Institute ↗
                </a>
              </li>
              <li>
                <a
                  href="http://shipov.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  G. Shipov archive ↗
                </a>
              </li>
              <li>
                <Link href="/research" className="hover:text-accent">
                  References
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Legal</p>
            <ul className="space-y-2 text-sm text-body">
              <li>
                <Link href="/notice" className="hover:text-accent">
                  Research information notice
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-accent">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--line)] pt-7">
          <p className="mt-5 text-xs text-muted">
            © {new Date().getFullYear()} Delta Wellness
          </p>
        </div>
      </div>
    </footer>
  )
}
