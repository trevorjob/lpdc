'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const HEADLINE_LINES = [
  'Making your assets',
  'and investment portfolio',
  'work for you.',
]

const EASE_EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1]
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export function Hero() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden bg-neutral-900">

      {/* Background — swap <source> for /videos/hero.mp4 when ready */}
      <video
        autoPlay={shouldReduce !== true}
        muted
        loop
        playsInline
        poster="/images/sayan-nath-i7KUmMOiNFo-unsplash.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — dark at bottom for legibility, subtle at top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(15,12,9,0.90) 0%, rgba(15,12,9,0.55) 40%, rgba(15,12,9,0.15) 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 lg:px-16 lg:pb-24">

          {/* Label */}
          <motion.p
            className="mb-6 font-body text-xs font-medium tracking-[0.2em] uppercase text-gold-400"
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_SMOOTH }}
          >
            Luli Properties, UK Property Investment
          </motion.p>

          {/* Headline — line reveal */}
          <h1
            className="font-display font-light leading-[1.05] tracking-tight text-white"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
          >
            {HEADLINE_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={shouldReduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.25 + i * 0.14,
                    ease: EASE_EXPO,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Gold rule */}
          <motion.div
            className="my-8 h-px origin-left bg-gold-400"
            initial={shouldReduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.8, ease: EASE_EXPO }}
          />

          {/* Subtext + CTAs */}
          <motion.div
            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: EASE_SMOOTH }}
          >
            <p className="max-w-xs font-body text-sm leading-relaxed text-white/65 lg:max-w-sm lg:text-base">
              Sourcing and investing in below-market-value assets
              in high-growth areas across the UK.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center bg-sage-500 px-7 py-3.5 font-body text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-sage-600"
              >
                View Portfolio
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center border border-gold-400 px-7 py-3.5 font-body text-sm font-medium tracking-wide text-gold-400 transition-colors duration-300 hover:bg-gold-400/10"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 lg:right-16"
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4, ease: EASE_SMOOTH }}
        aria-hidden
      >
        <span className="font-body text-[10px] tracking-[0.25em] uppercase text-white/40">
          Scroll
        </span>
        <motion.div
          className="h-10 w-px bg-white/30"
          animate={shouldReduce ? {} : { scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

    </section>
  )
}
