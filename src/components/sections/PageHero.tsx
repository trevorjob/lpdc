'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { LampContainer } from '@/components/ui/lamp'

const EASE_EXPO: [number, number, number, number]   = [0.19, 1, 0.22, 1]
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

interface PageHeroProps {
  sectionNumber: string    /* "02" */
  sectionLabel:  string    /* "Investment Portfolio" */
  headlineLines: string[]  /* ["Our current", "properties."] */
  description:   string
}

export function PageHero({
  sectionNumber,
  sectionLabel,
  headlineLines,
  description,
}: PageHeroProps) {
  const shouldReduce = useReducedMotion()

  return (
    <LampContainer>
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-24 pt-52 lg:px-16 lg:pb-32 lg:pt-60">

        {/* Section label */}
        <motion.p
          className="mb-6 font-body text-xs font-medium tracking-[0.2em] uppercase text-gold-400"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE_SMOOTH }}
        >
          {sectionNumber} / {sectionLabel}
        </motion.p>

        {/* Headline */}
        <h1
          className="font-display font-light leading-[1.05] tracking-tight text-white"
          style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
        >
          {headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={shouldReduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay:    0.55 + i * 0.12,
                  ease:     EASE_EXPO,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Gold rule */}
        <motion.div
          aria-hidden
          className="my-8 h-px origin-left bg-gold-400"
          style={{ width: '4rem' }}
          initial={shouldReduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.85, ease: EASE_EXPO }}
        />

        {/* Description */}
        <motion.p
          className="max-w-[44ch] font-body text-sm leading-relaxed text-white/60 lg:text-base"
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE_SMOOTH }}
        >
          {description}
        </motion.p>
      </div>
    </LampContainer>
  )
}
