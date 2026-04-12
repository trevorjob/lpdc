'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { properties } from '@/data/properties'
import type { Property } from '@/types'

// Warm gradient placeholders — unique per property.
// Replace each with a Next.js <Image fill objectFit="cover"> when photography is provided.
const CARD_GRADIENTS = [
  'linear-gradient(140deg, #C8B89A 0%, #A89070 50%, #8A7258 100%)',
  'linear-gradient(140deg, #A8B8A0 0%, #88988A 50%, #6A7A6C 100%)',
  'linear-gradient(140deg, #C8C0A8 0%, #A8A088 50%, #88806A 100%)',
]

const TYPE_LABELS: Record<Property['type'], string> = {
  'hmo':           'HMO',
  'semi-detached': 'Semi-Detached',
  'terraced':      'Terraced',
  'detached':      'Detached',
  'flat':          'Flat',
  'commercial':    'Commercial',
}

const STATUS_CONFIG: Record<Property['status'], { label: string; className: string }> = {
  'available':   { label: 'Available',   className: 'status-available'   },
  'sold':        { label: 'Sold',        className: 'status-sold'        },
  'under-offer': { label: 'Under Offer', className: 'status-under-offer' },
}

// ── Easing ────────────────────────────────────────────────────────────────
const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

// ── Card entrance variants ────────────────────────────────────────────────
// Container staggers children; each card variant defines its own timing.
const cardContainerVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

// ── Header entrance variants ──────────────────────────────────────────────
const headerContainerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const headerItemVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

const ruleVariants = {
  hidden:  { scaleX: 0, originX: '0%' },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] as [number, number, number, number], delay: 0.25 } },
}

// ── PropertyCard ──────────────────────────────────────────────────────────
interface PropertyCardProps {
  property: Property
  gradient: string
}

function PropertyCard({ property, gradient }: PropertyCardProps) {
  const status = STATUS_CONFIG[property.status]

  return (
    // motion.div receives the card variant from the parent stagger container
    <motion.div variants={cardVariants}>
      <article
        className={cn(
          'property-card group',
          // Gold glow overrides the default card-hover shadow via utilities layer priority
          'hover:shadow-gold-glow',
        )}
        aria-label={`${property.name} — ${property.location}`}
      >

        {/* ── Image ───────────────────────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 10' }}>

          {/* Gradient placeholder */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-smooth group-hover:scale-105"
            style={{ background: gradient }}
            aria-hidden="true"
          />

          {/* Overlay link — large touch target, keyboard-navigable */}
          <Link
            href={`/portfolio/${property.slug}`}
            className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-400"
            aria-label={`View details for ${property.name}`}
          />

          {/* Status badge */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className={status.className}>{status.label}</span>
          </div>

          {/* Yield badge */}
          {property.projectedYield && (
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="font-body text-[10px] font-medium tracking-[0.12em] uppercase bg-white/95 backdrop-blur-sm text-sage-700 px-2.5 py-1">
                {property.projectedYield} yield
              </span>
            </div>
          )}
        </div>

        {/* ── Content ─────────────────────────────────────────────── */}
        <div className="p-6 lg:p-7">

          {/* Location + type */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="sage-tag">{property.location}</span>
            <span className="label-upper text-neutral-500 text-[10px]">
              {TYPE_LABELS[property.type]}
            </span>
          </div>

          {/* Property name */}
          <h3 className="heading-card mb-3 transition-colors duration-300 group-hover:text-sage-700">
            {property.name}
          </h3>

          {/* Short description */}
          <p className="text-sm font-body leading-relaxed text-neutral-600 mb-5 line-clamp-2">
            {property.shortDescription}
          </p>

          {/* Specs row */}
          <div className="flex items-center gap-5 mb-6 pb-5 border-b border-neutral-200">
            <div className="text-center">
              <div className="font-display text-xl font-medium text-neutral-800">
                {property.bedrooms}
              </div>
              <div className="label-upper text-[10px] text-neutral-500 mt-0.5">Beds</div>
            </div>

            {property.bathrooms && (
              <div className="text-center">
                <div className="font-display text-xl font-medium text-neutral-800">
                  {property.bathrooms}
                </div>
                <div className="label-upper text-[10px] text-neutral-500 mt-0.5">Baths</div>
              </div>
            )}

            <div className="text-center">
              <div className="font-display text-xl font-medium text-neutral-800">
                {property.sqft.toLocaleString()}
              </div>
              <div className="label-upper text-[10px] text-neutral-500 mt-0.5">Sq Ft</div>
            </div>
          </div>

          {/*
            CTA button — hidden from keyboard (image overlay handles tab nav).
            group/btn scopes arrow animation to button hover only, independent
            of the outer card group.
          */}
          <Link
            href={`/portfolio/${property.slug}`}
            className="btn-outline-gold group/btn"
            tabIndex={-1}
            aria-hidden="true"
          >
            Learn More
            <span
              className="inline-block ml-1.5 transition-transform duration-300 ease-smooth group-hover/btn:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </article>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────
export function PortfolioPreview() {
  const prefersReduced = useReducedMotion()

  const headerRef  = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const footerRef  = useRef<HTMLDivElement>(null)

  const headerInView = useInView(headerRef, { once: true, margin: '-60px 0px' })
  const gridInView   = useInView(gridRef,   { once: true, margin: '-80px 0px' })
  const footerInView = useInView(footerRef, { once: true, margin: '-40px 0px' })

  const preview = properties.slice(0, 3)

  return (
    <section className="section-py bg-neutral-100">
      <div className="container-site">

        {/* ── Section header — label, heading, rule stagger in individually ── */}
        <motion.div
          ref={headerRef}
          className="mb-10"
          variants={headerContainerVariants}
          initial={prefersReduced ? false : 'hidden'}
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <motion.span
                className="label-upper text-sage-500 block mb-4"
                variants={headerItemVariants}
              >
                Investment Portfolio
              </motion.span>
              <motion.h2
                className="heading-section max-w-lg"
                variants={headerItemVariants}
              >
                Assets sourced for performance.
              </motion.h2>
            </div>

            <motion.div variants={headerItemVariants}>
              <Link href="/portfolio" className="btn-sage shrink-0">
                View Full Portfolio
              </Link>
            </motion.div>
          </div>

          {/* Gold rule extends left→right after heading settles */}
          <motion.span
            className="block h-px bg-gold-400 origin-left mt-6"
            style={{ width: '3rem' }}
            variants={ruleVariants}
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Cards — single useInView on container, stagger children ── */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={cardContainerVariants}
          initial={prefersReduced ? false : 'hidden'}
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {preview.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              gradient={CARD_GRADIENTS[i] ?? CARD_GRADIENTS[0]}
            />
          ))}
        </motion.div>

        {/* ── Mobile footer link ──────────────────────────────────────── */}
        <motion.div
          ref={footerRef}
          className="mt-12 flex justify-center sm:hidden"
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={footerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <Link href="/portfolio" className="btn-sage">
            View Full Portfolio
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
