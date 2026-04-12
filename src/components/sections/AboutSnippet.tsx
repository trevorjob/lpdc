'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

export function AboutSnippet() {
  const textRef  = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const textInView  = useInView(textRef,  { once: true, margin: '-60px 0px' })
  const imageInView = useInView(imageRef, { once: true, margin: '-40px 0px' })

  return (
    <section className="section-py bg-white">
      <div className="container-site">

        {/*
          Asymmetric grid — text column (1fr) intentionally wider than image (43%).
          The unequal split signals editorial confidence: content takes priority,
          the image is a considered accent, not a 50/50 compromise.
          items-start: lets the tall portrait image extend naturally.
        */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_43%] lg:gap-16 lg:items-start">

          {/* ── Left: text ─────────────────────────────────────────── */}
          <motion.div
            ref={textRef}
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="lg:pt-4"
          >
            <span className="label-upper text-sage-500 block mb-3">
              Who We Are
            </span>

            <h2 className="heading-section mb-8">
              A focused property investment firm — built on expertise and results.
            </h2>

            <span className="gold-rule" aria-hidden="true" />

            <p className="body-base mb-6">
              Luli Properties &amp; Dev.co.ltd specialises in sourcing and investing
              in below-market-value residential assets across the UK&apos;s highest-growth
              regions. We combine rigorous market research with hands-on asset management
              to deliver strong, consistent returns.
            </p>

            <p className="body-base mb-12">
              Whether you are looking to invest directly or build a personally curated
              portfolio, we bring the expertise, the network, and the discipline that
              serious investors require.
            </p>

            <Link href="/about" className="btn-outline-gold">
              More About Us
            </Link>
          </motion.div>

          {/* ── Right: image ───────────────────────────────────────── */}
          <motion.div
            ref={imageRef}
            initial={prefersReduced ? false : { opacity: 0, y: 32 }}
            animate={imageInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            {/*
              Replace this placeholder with a real <Image> from Next.js when
              photography is available. Suggested: exterior of a premium UK property.

              Mobile: landscape 3/2 ratio — portrait is too tall at full mobile width.
              Desktop: portrait 4/5 ratio — editorial, intentionally taller than the
              text column it sits beside, creating natural asymmetric composition.
            */}
            <div className="relative w-full overflow-hidden aspect-[3/2] lg:aspect-[4/5]">

              {/* Gradient placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(160deg, #E8DCC8 0%, #D5C5A8 35%, #C2B08F 65%, #A89370 100%)',
                }}
              />

              {/* Grain texture */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] mix-blend-multiply"
                aria-hidden="true"
              >
                <filter id="about-grain">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.72"
                    numOctaves="4"
                    stitchTiles="stitch"
                  />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#about-grain)" />
              </svg>

              {/* Gold corner accent — bottom-right L bracket */}
              <div
                className="absolute bottom-5 right-5 h-14 w-px bg-gold-400 opacity-50"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-5 right-5 h-px w-14 bg-gold-400 opacity-50"
                aria-hidden="true"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
