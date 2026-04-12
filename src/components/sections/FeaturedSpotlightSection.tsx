'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FeaturedSpotlight } from '@/components/ui/feature-spotlight'

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

export function FeaturedSpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      className="section-py bg-white"
      aria-labelledby="featured-heading"
    >
      <div className="container-site">

        {/* Section label */}
        <motion.span
          className="label-upper text-sage-500 block mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          Featured Investment
        </motion.span>

        {/* Visually hidden heading for screen readers */}
        <h2 id="featured-heading" className="sr-only">
          Featured Investment — Riverfront Collection
        </h2>

        <FeaturedSpotlight isInView={isInView} />
      </div>
    </section>
  )
}
