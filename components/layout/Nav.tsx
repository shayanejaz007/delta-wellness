'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '@/lib/seo'
import Logo from '@/components/ui/Logo'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  /**
   * rAF-throttled, passive, and it only ever flips a boolean. The glass surface
   * itself is constant, so the browser never re-rasterises the blur while you
   * scroll — that was the single biggest cost in the previous version.
   */
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      toggleRef.current?.focus()
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`glass mx-auto flex max-w-[78rem] items-center justify-between px-4 transition-shadow duration-300 sm:px-6 ${
          scrolled ? 'shadow-[0_16px_40px_-20px_rgba(15,27,45,0.22)]' : ''
        }`}
        style={{ height: 62 }}
      >
        <Link href="/" className="flex items-center text-ink" aria-label="Delta Wellness, home">
          <Logo variant="nav" showRule={false} className="h-9 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.slice(1)
            .filter((link) => link.href !== '/consultation')
            .map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`text-sm transition-colors ${
                  active ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link href="/consultation" className="btn btn-primary !py-2.5 !text-sm">
            Free consultation
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid h-10 w-10 place-items-center lg:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="relative block h-3 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="glass mx-auto mt-2 max-w-[78rem] p-4 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.filter((link) => link.href !== '/consultation').map(
              (link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-[var(--line)] py-3.5 font-display text-xl text-ink last:border-0"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              href="/consultation"
              className="btn btn-primary mt-4 justify-center"
            >
              Free consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
