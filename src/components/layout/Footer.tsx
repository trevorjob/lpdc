import Link from 'next/link'
import { WavePath } from '@/components/ui/wave-path'
import { Logo } from '@/components/ui/Logo'

const NAV_LINKS = [
  { href: '/',          label: 'Home'      },
  // { href: '/about',     label: 'About'     },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services',  label: 'Services'  },
  { href: '/contact',   label: 'Contact'   },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-sage-700 text-white">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-16 lg:px-16 lg:pt-20">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.6fr_1fr_1.4fr] lg:gap-24">

          {/* Brand */}
          <div>
            <Logo variant="dark" iconSize={38} />

            <p className="mt-5 max-w-[30ch] font-body text-sm leading-relaxed text-white/45">
              UK residential property investment. Sourcing below-market-value assets for a selective group of investors.
            </p>

            <div aria-hidden className="mt-6 h-px w-8 bg-gold-400/40" />

            <p className="mt-4 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
              London, United Kingdom
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-6 font-body text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
              Navigation
            </p>
            <ul className="space-y-3.5">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[13px] text-white/50 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-6 font-body text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
              Get in Touch
            </p>

            <div className="space-y-3">
              <a
                href="mailto:hello@lpdc.estate"
                className="block font-body text-[13px] text-white/50 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400"
              >
                hello@lpdc.estate
              </a>
              <a
                href="tel:+441322643289"
                className="block font-body text-[13px] text-white/50 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400"
              >
                +44 (0)1322 643289
              </a>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center border border-gold-400/40 px-5 py-2.5 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400"
            >
              Register Interest
            </Link>
          </div>
        </div>

        {/* WavePath — replaces the static border-t */}
        <div className="mt-16 text-white/15">
          <WavePath />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 pt-6 sm:flex-row sm:items-center">
          <p className="font-body text-[11px] text-white/25">
            &copy; {year} Luli Properties &amp; Dev.co.ltd. All rights reserved.
          </p>
          <p className="text-white/18 font-body text-[11px]">
            UK residential property investment services
          </p>
        </div>
      </div>
    </footer>
  )
}
