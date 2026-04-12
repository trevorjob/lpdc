'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ── Headline phrase config ─────────────────────────────────────────────────
const phrases = [
  { text: 'Making your assets and',  italic: false, accent: false },
  { text: 'investment portfolio',    italic: true,  accent: true  },
  { text: 'work for you.',           italic: false, accent: false },
] as const

// ── Easing ────────────────────────────────────────────────────────────────
const ease     = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
const easeExpo = [0.19, 1,    0.22, 1   ] as [number, number, number, number]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollY } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollY, [0, 700], ['0%', '18%'])

  const d = prefersReduced ? 0 : 1

  const phraseDelay  = (i: number) => d * (0.4 + i * 0.13)
  const ruleDelay    = d * (0.4 + phrases.length * 0.13 + 0.1)
  const subtextDelay = ruleDelay + d * 0.3
  const scrollDelay  = subtextDelay + d * 0.55

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden"
      aria-label="Hero — Luli Properties"
    >

      {/* ── Background image — full bleed ────────────────────────────────────
          objectPosition '50% 5%' keeps the sky visible in the upper portion
          where text lives. The building anchors naturally at the bottom,
          exactly like the reference: sky = text area, building = visual base.
      ─────────────────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 -top-[8%] h-[116%] will-change-transform"
        style={{ y: prefersReduced ? '0%' : bgY }}
        aria-hidden="true"
      >
        <Image
          src="/images/sayan-nath-i7KUmMOiNFo-unsplash.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '50% 5%' }}
        />

        {/* Grain texture */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-multiply"
          aria-hidden="true"
        >
          <filter id="hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>

        {/* Top veil — very light warm wash so text has clean contrast on sky */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-3/4"
          style={{
            background: 'linear-gradient(to bottom, rgba(250,248,245,0.55) 0%, rgba(250,248,245,0.15) 60%, transparent 100%)',
          }}
        />

        {/* Bottom fade — building bleeds into next section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            background: 'linear-gradient(to top, rgba(250,248,245,0.5) 0%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 container-site flex flex-1 flex-col pt-36 pb-32 lg:pt-44 lg:pb-40">

        {/* Eyebrow label */}
        <motion.span
          className="label-upper mb-8 block text-sage-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: d * 0.1 }}
        >
          UK Residential Property Investment
        </motion.span>

        {/*
          Two-column headline row — headline left (~60%), subtext right (~35%).
          This mirrors the reference exactly: headline dominates the left,
          body copy sits quietly to the right at the same vertical level.
        */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">

          {/* Headline — phrase by phrase */}
          <div className="lg:flex-[3]">
            <h1
              className="mb-0 font-display font-light leading-[1.08] tracking-tight text-neutral-800"
              style={{ fontSize: 'clamp(3rem, 5.5vw, 6.5rem)' }}
            >
              {phrases.map((phrase, i) => (
                <motion.span
                  key={phrase.text}
                  className={cn(
                    'block',
                    phrase.italic && 'italic',
                    phrase.accent && 'text-sage-700',
                  )}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease, delay: phraseDelay(i) }}
                >
                  {phrase.text}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtext — right column, top-aligned with headline */}
          <motion.p
            className="body-base max-w-[32ch] text-neutral-600 lg:flex-[1.4] lg:pt-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: subtextDelay }}
          >
            Sourcing and investing in below-market-value assets in
            high-growth areas — building long-term wealth through
            expert, considered property investment.
          </motion.p>
        </div>

        {/* Gold rule — full container width, draws after headline settles */}
        <motion.div
          className="mt-10 mb-10 h-px origin-left bg-gold-400 w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: easeExpo, delay: ruleDelay }}
          aria-hidden="true"
        />

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: subtextDelay + d * 0.15 }}
        >
          <Link href="/portfolio" className="btn-sage">
            View Portfolio
          </Link>
          <Link href="/contact" className="btn-outline-gold">
            Get In Touch
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease, delay: scrollDelay }}
        aria-hidden="true"
      >
        <span className="font-body text-[9px] font-medium tracking-[0.22em] uppercase text-neutral-500">
          Scroll
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-neutral-300/60">
          <motion.div
            className="absolute top-0 h-[40%] w-full bg-gold-400"
            animate={prefersReduced ? {} : { y: ['0%', '260%'] }}
            transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
          />
        </div>
      </motion.div>
    </section>
  )
}
