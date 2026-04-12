import Link from 'next/link'

const navLinks = [
  { href: '/',          label: 'Home'                 },
  { href: '/about',     label: 'About Us'             },
  { href: '/portfolio', label: 'Investment Portfolio' },
  { href: '/services',  label: 'Services'             },
  { href: '/contact',   label: 'Contact Us'           },
]

export function Footer() {
  return (
    <footer className="bg-sage-700 text-white">
      <div className="container-site py-16 lg:py-24">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Brand */}
          <div>
            <div className="font-display text-2xl font-medium text-white mb-1">
              Luli Properties
            </div>
            <div className="font-body text-xs tracking-[0.2em] text-gold-300 uppercase mb-6">
              &amp; Dev.co.ltd
            </div>
            <p className="font-body text-sm text-sage-200 leading-relaxed max-w-xs">
              UK residential property investment — sourcing and investing in
              below-market-value assets in high-growth areas across the UK.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="label-upper text-gold-400 mb-5">Navigation</div>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-sage-200 hover:text-white transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="label-upper text-gold-400 mb-5">Get in Touch</div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@luliproperties.co.uk"
                className="font-body text-sm text-sage-200 hover:text-white transition-colors duration-300 w-fit"
              >
                info@luliproperties.co.uk
              </a>
              <p className="font-body text-sm text-sage-300">
                United Kingdom
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-body text-sm text-gold-400 hover:text-gold-300 transition-colors duration-300 mt-2 w-fit"
              >
                Book an appointment
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-sage-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-xs text-sage-400">
            © {new Date().getFullYear()} Luli Properties &amp; Dev.co.ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-body text-xs text-sage-400 hover:text-sage-200 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-body text-xs text-sage-400 hover:text-sage-200 transition-colors duration-300"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
