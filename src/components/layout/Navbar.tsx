'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  // { href: '/about',     label: 'About'     },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services',  label: 'Services'  },
  { href: '/contact',   label: 'Contact'   },
]

const EASE_EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-neutral-900/96 shadow-[0_1px_0_rgba(201,162,74,0.12)] backdrop-blur-md'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6 lg:px-16">

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-baseline gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400"
          >
            <span className="font-display text-[22px] font-light tracking-[0.22em] text-white transition-opacity duration-300 group-hover:opacity-75">
              LULI
            </span>
            <span aria-hidden className="h-3.5 w-px bg-gold-400/50" />
            <span className="font-body text-[10px] font-medium tracking-[0.22em] uppercase text-white/50 transition-colors duration-300 group-hover:text-white/80">
              Properties
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map(link => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative font-body text-[13px] font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400',
                    active ? 'text-white' : 'text-white/50 hover:text-white'
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-gold-400"
                      transition={{ duration: 0.35, ease: EASE_EXPO }}
                    />
                  )}
                </Link>
              )
            })}

            <Link
              href="/contact"
              className="ml-2 inline-flex items-center border border-gold-400/50 px-4 py-2 font-body text-[11px] font-medium tracking-[0.18em] uppercase text-white/70 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400"
            >
              Register Interest
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(prev => !prev)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative flex h-10 w-10 items-center justify-center md:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400"
          >
            <div className="relative h-[14px] w-6">
              <span
                className={cn(
                  'absolute left-0 h-px w-full bg-white transition-all duration-300',
                  open ? 'top-[6px] rotate-45' : 'top-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[6px] h-px bg-white transition-all duration-300',
                  open ? 'w-0 opacity-0' : 'w-4 opacity-100'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-px w-full bg-white transition-all duration-300',
                  open ? 'top-[6px] -rotate-45' : 'top-[12px]'
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: EASE_EXPO }}
            className="fixed inset-x-0 top-[68px] z-40 bg-neutral-900/98 backdrop-blur-md md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 border-t border-white/8 px-6 py-8"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06, ease: EASE_EXPO }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'block py-3 font-body text-xl font-light transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400',
                      pathname === link.href
                        ? 'text-white'
                        : 'text-white/45 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.28, ease: EASE_EXPO }}
                className="mt-4 border-t border-white/8 pt-6"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center border border-gold-400/50 px-6 py-3 font-body text-[12px] font-medium tracking-[0.18em] uppercase text-white/70 transition-all duration-300 hover:border-gold-400 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400"
                >
                  Register Interest
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
