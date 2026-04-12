'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/',           label: 'Home'                 },
  { href: '/about',      label: 'About Us'             },
  { href: '/portfolio',  label: 'Investment Portfolio' },
  { href: '/services',   label: 'Services'             },
  { href: '/contact',    label: 'Contact Us'           },
]

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48)
    // Fire once on mount so SSR/hydration mismatch is corrected immediately
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        'transition-[background-color,box-shadow] duration-500 ease-smooth',
        scrolled
          ? 'bg-neutral-50/95 backdrop-blur-sm shadow-navbar'
          : 'bg-transparent',
      )}
    >
      <nav
        className="container-site flex items-center justify-between h-16 lg:h-20"
        aria-label="Main navigation"
      >
        {/* ── Logo ─────────────────────────────────────────────── */}
        <Link
          href="/"
          className={cn(
            'group flex items-end gap-2.5',
            'transition-opacity duration-300 hover:opacity-75',
          )}
          aria-label="Luli Properties — Home"
        >
          <span className={cn(
            'font-display text-xl lg:text-2xl font-light tracking-[0.04em]',
            'transition-colors duration-500',
            scrolled ? 'text-neutral-800' : 'text-neutral-900',
          )}>
            Luli Properties
          </span>
          <span className={cn(
            'hidden sm:inline font-body text-[9px] tracking-[0.22em] uppercase pb-0.5',
            'transition-colors duration-500',
            scrolled ? 'text-gold-500' : 'text-gold-400',
          )}>
            &amp; Dev.co.ltd
          </span>
        </Link>

        {/* ── Desktop nav ───────────────────────────────────────── */}
        <div
          className="hidden lg:flex items-center gap-7"
          role="list"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                role="listitem"
                className={cn(
                  'group relative font-body text-sm tracking-[0.08em] py-1',
                  'transition-colors duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 rounded-sm',
                  isActive
                    ? 'text-sage-600'
                    : 'text-neutral-600 hover:text-neutral-900',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {/* Active underline — thin gold rule */}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-px bg-gold-400',
                    'transition-[width] duration-400 ease-smooth',
                    isActive ? 'w-full' : 'w-0 group-hover:w-full',
                  )}
                  aria-hidden="true"
                />
              </Link>
            )
          })}

          {/* Divider before CTA */}
          <span
            className="h-4 w-px bg-neutral-300 mx-1"
            aria-hidden="true"
          />

          <Link
            href="/contact"
            className="btn-gold"
          >
            Book an Appointment
          </Link>
        </div>

        {/* ── Mobile hamburger ──────────────────────────────────── */}
        <button
          className={cn(
            // 44×44 touch target
            'lg:hidden flex flex-col justify-center items-center gap-[5px]',
            'w-11 h-11 -mr-2 text-neutral-700',
            'transition-colors duration-300 hover:text-neutral-900',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 rounded-sm',
          )}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <span className={cn(
            'block w-[18px] h-px bg-current origin-center',
            'transition-transform duration-300 ease-smooth',
            mobileOpen && 'translate-y-[6px] rotate-45',
          )} />
          <span className={cn(
            'block w-[18px] h-px bg-current',
            'transition-opacity duration-300',
            mobileOpen ? 'opacity-0' : 'opacity-100',
          )} />
          <span className={cn(
            'block w-[18px] h-px bg-current origin-center',
            'transition-transform duration-300 ease-smooth',
            mobileOpen && '-translate-y-[6px] -rotate-45',
          )} />
        </button>
      </nav>

      {/* ── Mobile drawer ──────────────────────────────────────────
          Using grid-template-rows for a smooth, physically accurate
          height animation (max-height hacks produce non-linear easing).
      ─────────────────────────────────────────────────────────────── */}
      <div
        id="mobile-nav"
        className={cn(
          'lg:hidden grid transition-[grid-template-rows] duration-500 ease-smooth',
          mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="overflow-hidden">
          <div className="bg-neutral-50 border-t border-neutral-200 shadow-card">
            <nav
              className="container-site py-8 flex flex-col gap-4"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'font-body text-sm tracking-[0.08em] py-1.5',
                      'border-l-2 pl-3 transition-colors duration-300',
                      isActive
                        ? 'border-gold-400 text-sage-600'
                        : 'border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <Link
                href="/contact"
                className="btn-gold mt-4 self-start"
              >
                Book an Appointment
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
