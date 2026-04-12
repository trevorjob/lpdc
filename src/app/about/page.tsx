'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { WavePath } from '@/components/ui/wave-path'

const ease     = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
const easeExpo = [0.19, 1,    0.22, 1   ] as [number, number, number, number]

// ── Team placeholders ─────────────────────────────────────────────────────
const team = [
  { name: 'Yuri Luli',      title: 'Founder & Managing Director', bio: 'Over a decade sourcing and managing high-yield residential assets across the UK. Specialist in below-market-value acquisitions and HMO strategy.'  },
  { name: 'Investment Team', title: 'Acquisitions & Asset Management', bio: 'A focused team of property analysts, legal specialists, and asset managers working to identify and deliver exceptional investment opportunities.' },
]

// ── Metric strip ──────────────────────────────────────────────────────────
const metrics = [
  { value: '£38M+', label: 'Assets Managed' },
  { value: '97%',   label: 'Occupancy Rate' },
  { value: '14',    label: 'UK Sites'        },
  { value: '9.2%',  label: 'Avg. Yield'     },
]

export default function AboutPage() {
  const prefersReduced = useReducedMotion()
  const d = prefersReduced ? 0 : 1

  const heroRef    = useRef<HTMLDivElement>(null)
  const aboutRef   = useRef<HTMLElement>(null)
  const teamRef    = useRef<HTMLElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)

  const heroInView    = useInView(heroRef,    { once: true, margin: '-40px 0px' })
  const aboutInView   = useInView(aboutRef,   { once: true, margin: '-80px 0px' })
  const teamInView    = useInView(teamRef,    { once: true, margin: '-80px 0px' })
  const metricsInView = useInView(metricsRef, { once: true, margin: '-80px 0px' })

  return (
    <>

      {/* ── Page hero ───────────────────────────────────────────────────────
          Minimal centred hero — contrast with the homepage's dramatic
          left-aligned full-bleed approach. This signals: different page,
          deeper content.
      ─────────────────────────────────────────────────────────────────────── */}
      <section className="relative bg-neutral-50 pt-40 pb-24 lg:pt-52 lg:pb-32 text-center">
        <div className="container-site" ref={heroRef}>

          <motion.span
            className="label-upper text-sage-500 block mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease, delay: d * 0.1 }}
          >
            About Our Business
          </motion.span>

          <motion.h1
            className="font-display font-light leading-[1.08] tracking-tight text-neutral-800 mx-auto"
            style={{ fontSize: 'clamp(3rem, 5.5vw, 6rem)', maxWidth: '18ch' }}
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease, delay: d * 0.25 }}
          >
            Built on expertise.{' '}
            <span className="italic text-sage-700">Driven by results.</span>
          </motion.h1>

          {/* Gold rule — grows from centre */}
          <motion.div
            className="mx-auto mt-10 h-px origin-center bg-gold-400"
            style={{ width: '4rem' }}
            initial={{ scaleX: 0 }}
            animate={heroInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.0, ease: easeExpo, delay: d * 0.55 }}
            aria-hidden="true"
          />

          <motion.p
            className="body-lead mx-auto mt-8 max-w-[52ch] text-neutral-600"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: d * 0.7 }}
          >
            Luli Properties &amp; Dev.co.ltd is a focused UK residential
            property investment firm — sourcing, acquiring, and managing
            high-yield assets in the country's most growth-active regions.
          </motion.p>
        </div>
      </section>

      {/* ── Wave path divider ────────────────────────────────────────────────
          The interactive "string" — hover to warp, release to spring back.
          Signals the transition from introduction to editorial depth.
          Deliberately placed so the reader encounters it as they scroll into
          the main content — a rewarding moment of craft.
      ─────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white py-6 lg:py-10">
        <div className="container-site flex flex-col items-end gap-6">

          {/* Label + wave row */}
          <div className="flex w-full flex-col gap-4">
            <span className="label-upper text-neutral-400 text-right">
              Our Story
            </span>
            <WavePath color="text-gold-400" strokeWidth={1.5} />
          </div>

          {/* Editorial intro beside the wave */}
          <div className="flex w-full flex-col items-end gap-4 md:flex-row md:items-start md:justify-between">
            <p className="body-base max-w-[34ch] text-neutral-500">
              Founded with a clear mandate: find the best residential
              assets the UK market has to offer before anyone else does.
            </p>
            <p className="body-lead max-w-[44ch] text-neutral-800 md:text-right">
              A property investment firm that combines the rigour of
              institutional analysis with the agility of private capital —
              to deliver{' '}
              <span className="italic text-sage-700">consistently strong returns.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── About the business ───────────────────────────────────────────────
          Asymmetric two-column: wide editorial text left, tall image right.
      ─────────────────────────────────────────────────────────────────────── */}
      <section
        ref={aboutRef}
        className="section-py bg-white"
        aria-labelledby="about-heading"
      >
        <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-[1fr_40%] lg:gap-20 lg:items-start">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="lg:pt-4"
          >
            <span className="label-upper text-sage-500 block mb-3">
              Who We Are
            </span>
            <h2
              id="about-heading"
              className="heading-section mb-8 max-w-[22ch]"
            >
              A focused firm — built for performance.
            </h2>

            <span className="gold-rule" aria-hidden="true" />

            <div className="space-y-6 body-base">
              <p>
                Luli Properties &amp; Dev.co.ltd specialises in sourcing
                and investing in below-market-value residential assets
                across the UK&apos;s highest-growth regions. We combine
                rigorous market intelligence with hands-on asset management
                to deliver strong, consistent returns.
              </p>
              <p>
                Our strategy is built around identifying properties with
                significant upside — assets that can be repositioned,
                improved, or better managed to unlock their full potential.
                Whether through HMO conversion, refurbishment, or strategic
                acquisition, every decision is made with a clear investment
                thesis behind it.
              </p>
              <p>
                We work with a selective group of investors — individuals
                and families who want disciplined, transparent property
                investment without the complexity of going it alone. We
                handle everything: sourcing, due diligence, acquisition,
                management, and ongoing performance reporting.
              </p>
            </div>

            <Link href="/contact" className="btn-outline-gold mt-12 inline-flex">
              Invest With Us
            </Link>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            <div className="relative w-full overflow-hidden aspect-[3/2] lg:aspect-[4/5]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(160deg, #E8DCC8 0%, #D5C5A8 35%, #C2B08F 65%, #A89370 100%)',
                }}
              />
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] mix-blend-multiply"
                aria-hidden="true"
              >
                <filter id="about-page-grain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#about-page-grain)" />
              </svg>
              {/* Gold corner accent */}
              <div className="absolute bottom-5 right-5 h-14 w-px bg-gold-400 opacity-50" aria-hidden="true" />
              <div className="absolute bottom-5 right-5 h-px w-14 bg-gold-400 opacity-50" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Metric strip ─────────────────────────────────────────────────────
          Four key numbers — a trust signal anchored between the editorial
          section and the team.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        ref={metricsRef}
        className="bg-neutral-100 border-y border-neutral-200"
      >
        <div className="container-site grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-gold-200">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="flex flex-col items-center text-center px-6 py-10"
              initial={{ opacity: 0, y: 16 }}
              animate={metricsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.1 }}
            >
              <div
                className="font-display font-light leading-none text-sage-700 mb-3"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
              >
                {m.value}
              </div>
              <p className="label-upper text-sage-600 text-[11px]">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Team ─────────────────────────────────────────────────────────────
          Placeholder cards — circular avatar with gold ring. Swap for
          real photos when Mr. Yuri provides them.
      ─────────────────────────────────────────────────────────────────────── */}
      <section
        ref={teamRef}
        className="section-py bg-white"
        aria-labelledby="team-heading"
      >
        <div className="container-site">

          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 12 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            <span className="label-upper text-sage-500 block mb-3">The Team</span>
            <h2 id="team-heading" className="heading-section max-w-sm">
              Meet the people behind the portfolio.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12 max-w-3xl">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="flex flex-col gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease, delay: 0.15 + i * 0.12 }}
              >
                {/* Circular placeholder avatar */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-gold-400 ring-offset-2 ring-offset-white">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, #BDD1BC 0%, #4E7050 100%)',
                    }}
                  />
                </div>

                <div>
                  <h3 className="heading-card mb-1">{member.name}</h3>
                  <p className="label-upper text-gold-500 text-[10px] mb-3">{member.title}</p>
                  <p className="body-base text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners — hidden by default, toggle when confirmed ─────────────
          See CLAUDE.md: "Prepped but hidden by default — toggle visibility
          when partners are confirmed. Do not remove."
      ─────────────────────────────────────────────────────────────────────── */}
      <section className="hidden section-py-sm bg-neutral-100" aria-label="Partners">
        <div className="container-site text-center">
          <span className="label-upper text-sage-500 block mb-8">Our Partners</span>
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-8 w-24 bg-neutral-400 rounded-sm" />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-sage-700 py-28 lg:py-40 text-center">
        <div className="container-site relative">
          <motion.span
            className="label-upper text-gold-400 block mb-8 tracking-[0.2em]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{ duration: 0.55, ease }}
          >
            Invest With Us
          </motion.span>
          <motion.h2
            className="font-display font-light leading-[1.1] tracking-tight text-white mx-auto mb-8"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', maxWidth: '20ch' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{ duration: 0.75, ease, delay: 0.15 }}
          >
            Interested in investing{' '}
            <span className="italic text-gold-400">with us?</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            <Link href="/contact" className="btn-gold">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>

    </>
  )
}
