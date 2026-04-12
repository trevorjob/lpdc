'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease     = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
const easeExpo = [0.19, 1,    0.22, 1   ] as [number, number, number, number]

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px 0px' })
  const prefersReduced = useReducedMotion()

  const d = prefersReduced ? 0 : 1

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-sage-700 py-28 lg:py-44"
      aria-labelledby="cta-heading"
    >

      {/* ── Grain texture — matches hero material quality ──────────────── */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.045]"
        aria-hidden="true"
      >
        <filter id="cta-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-grain)" />
      </svg>

      {/*
        ── Oversized opening quote — editorial typographic device.
        Cormorant Garamond at 320px, 3% opacity. Clipped by overflow-hidden.
        Luxury print convention; invisible to casual viewers, felt as depth.
        Hidden on mobile (too close to content).
      */}
      <div
        className="pointer-events-none absolute -top-16 left-[4%] hidden select-none font-display leading-none text-white opacity-[0.04] lg:block"
        style={{ fontSize: 'clamp(12rem, 20vw, 22rem)' }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* ── Structural pillar accents — vertical gold bars, left & right ── */}
      {/* Only visible when viewport is wide enough not to crowd content */}
      <div
        className="absolute left-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 xl:flex"
        aria-hidden="true"
      >
        <div className="h-20 w-px bg-gold-400 opacity-20" />
        <div className="h-1.5 w-1.5 rotate-45 bg-gold-400 opacity-30" />
      </div>
      <div
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 xl:flex"
        aria-hidden="true"
      >
        <div className="h-1.5 w-1.5 rotate-45 bg-gold-400 opacity-30" />
        <div className="h-20 w-px bg-gold-400 opacity-20" />
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="container-site relative">
        <div className="mx-auto max-w-4xl text-center">

          {/* Eyebrow label */}
          <motion.span
            className="label-upper text-gold-400 block mb-10 tracking-[0.2em]"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease, delay: d * 0.1 }}
          >
            Start Your Investment Journey
          </motion.span>

          {/*
            Headline — three deliberate lines, each its own entrance.
            The middle line (italic gold) is the peak: slightly larger,
            a different voice, the emotional centre of the page.
            At max desktop size this reads ~5rem / 5.5rem / 5rem.
          */}
          <h2 id="cta-heading" className="mb-0">
            <motion.span
              className="block font-display font-light leading-[1.1] tracking-tight text-white"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4.75rem)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease, delay: d * 0.2 }}
            >
              Property investment has
            </motion.span>

            {/* Key phrase — italic Cormorant in gold, slightly larger for drama */}
            <motion.span
              className="block font-display font-light italic leading-[1.05] tracking-tight text-gold-400"
              style={{ fontSize: 'clamp(2.5rem, 5.75vw, 5.5rem)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease, delay: d * 0.33 }}
            >
              some of the highest returns
            </motion.span>

            <motion.span
              className="block font-display font-light leading-[1.1] tracking-tight text-white"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4.75rem)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease, delay: d * 0.46 }}
            >
              of any asset class.
            </motion.span>
          </h2>

          {/* Gold rule — grows from centre outward */}
          <motion.span
            className="mx-auto mt-10 mb-10 block h-px origin-center bg-gold-400"
            style={{ width: '4rem' }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.0, ease: easeExpo, delay: d * 0.62 }}
            aria-hidden="true"
          />

          {/* Subtext — tighter max-width for authority */}
          <motion.p
            className="mx-auto mb-12 max-w-md font-body text-lg leading-relaxed text-sage-200"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: d * 0.72 }}
          >
            Join a growing number of investors who trust Luli Properties to
            source, manage, and grow their property portfolios across the UK.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: d * 0.85 }}
          >
            <Link href="/contact" className="btn-gold">
              Register Your Interest
            </Link>
            <Link
              href="/services"
              className="btn font-body text-sm font-medium tracking-wide px-8 py-3.5 text-sage-100 border border-sage-500 transition-colors duration-300 hover:border-sage-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-700"
            >
              Our Services
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
