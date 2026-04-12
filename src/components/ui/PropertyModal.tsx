'use client'

import { useEffect, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  X,
  ArrowRight,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { Property } from '@/types'

const EASE_EXPO: [number, number, number, number]   = [0.19, 1, 0.22, 1]
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const TYPE_LABELS: Record<string, string> = {
  hmo:            'HMO',
  'semi-detached': 'Semi-Detached',
  terraced:       'Terraced',
  detached:       'Detached',
  flat:           'Flat',
  commercial:     'Commercial',
}

interface PropertyModalProps {
  property: Property | null
  onClose:  () => void
}

export function PropertyModal({ property, onClose }: PropertyModalProps) {
  const shouldReduce = useReducedMotion()

  /* Lock body scroll */
  useEffect(() => {
    if (property) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [property])

  /* Escape key */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const statusColor = property?.status === 'available' ? 'text-sage-500' : 'text-gold-400'
  const statusLabel =
    property?.status === 'available'   ? 'Available'   :
    property?.status === 'under-offer' ? 'Under Offer' : 'Sold'

  return (
    <AnimatePresence>
      {property && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-neutral-900/60 backdrop-blur-sm"
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_SMOOTH }}
            onClick={onClose}
            aria-hidden
          />

          {/* Positioning wrapper — pointer-events-none so backdrop receives clicks */}
          <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center lg:items-center lg:p-8">

            {/* Modal panel */}
            <motion.div
              key="modal"
              role="dialog"
              aria-modal
              aria-label={property.name}
              className="pointer-events-auto flex w-full max-w-5xl flex-col overflow-hidden bg-white"
              style={{ maxHeight: 'min(92dvh, 92vh)' }}
              initial={shouldReduce ? false : { y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE_EXPO }}
            >

              {/* Sticky header */}
              <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-6 py-4 lg:px-8">
                <div>
                  <p className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-sage-500">
                    {TYPE_LABELS[property.type] ?? property.type}
                  </p>
                  <h2 className="font-display text-xl font-light text-neutral-800 lg:text-2xl">
                    {property.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center text-neutral-400 transition-colors duration-200 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto">

                {/* Hero image */}
                <div className="relative h-52 w-full lg:h-72">
                  <Image
                    src={property.heroImage}
                    alt={property.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 896px"
                    priority
                  />
                  {/* Gold corner accents */}
                  <div aria-hidden className="absolute left-5 top-5 h-8 w-8 border-l border-t border-gold-400/70" />
                  <div aria-hidden className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-gold-400/70" />
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-neutral-900/10" />
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-3 lg:gap-10 lg:px-8 lg:py-10">

                  {/* Left: description + highlights */}
                  <div className="lg:col-span-2">

                    {/* Location */}
                    <div className="mb-4 flex items-center gap-1.5 font-body text-sm text-neutral-500">
                      <MapPin className="h-3.5 w-3.5 text-sage-500" />
                      {property.location}
                    </div>

                    {/* Status */}
                    <div className="mb-5">
                      <span className={`font-body text-xs font-medium tracking-[0.15em] uppercase ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </div>

                    {/* Gold divider */}
                    <div aria-hidden className="mb-6 h-px w-12 bg-gold-400" />

                    {/* Full description */}
                    <p className="mb-8 font-body text-sm leading-relaxed text-neutral-700">
                      {property.description}
                    </p>

                    {/* Investment highlights */}
                    <div>
                      <h3 className="mb-4 font-body text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-400">
                        Investment Highlights
                      </h3>
                      <ul className="space-y-3">
                        {property.investmentHighlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3 font-body text-sm text-neutral-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: metrics */}
                  <div>
                    <div className="border border-neutral-200 p-6">
                      <h3 className="mb-5 font-body text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-400">
                        Property Details
                      </h3>
                      <div className="space-y-4">
                        {property.projectedYield && (
                          <MetricRow
                            icon={<TrendingUp className="h-4 w-4" />}
                            label="Projected Yield"
                            value={property.projectedYield}
                            highlight
                          />
                        )}
                        <MetricRow
                          icon={<BedDouble className="h-4 w-4" />}
                          label="Bedrooms"
                          value={String(property.bedrooms)}
                        />
                        {property.bathrooms && (
                          <MetricRow
                            icon={<Bath className="h-4 w-4" />}
                            label="Bathrooms"
                            value={String(property.bathrooms)}
                          />
                        )}
                        <MetricRow
                          icon={<Ruler className="h-4 w-4" />}
                          label="Floor Area"
                          value={`${property.sqft.toLocaleString()} sqft`}
                        />
                        {property.occupancyRate && (
                          <MetricRow
                            icon={<TrendingUp className="h-4 w-4" />}
                            label="Occupancy Rate"
                            value={property.occupancyRate}
                          />
                        )}
                      </div>

                      {property.refurbished && (
                        <div className="mt-5 border-t border-neutral-100 pt-5">
                          <span className="inline-block bg-sage-500/10 px-3 py-1.5 font-body text-xs font-medium text-sage-600">
                            Fully Refurbished
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA strip */}
                <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-6 lg:px-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-display text-lg font-light text-neutral-800">
                        Interested in this property?
                      </h3>
                      <p className="font-body text-sm text-neutral-500">
                        Register your interest and we will be in touch.
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      onClick={onClose}
                      className="group inline-flex shrink-0 items-center gap-2.5 bg-sage-500 px-6 py-3 font-body text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-sage-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
                    >
                      Register Interest
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ── MetricRow ───────────────────────────────── */

interface MetricRowProps {
  icon:      ReactNode
  label:     string
  value:     string
  highlight?: boolean
}

function MetricRow({ icon, label, value, highlight }: MetricRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 font-body text-xs text-neutral-500">
        <span className="text-sage-500">{icon}</span>
        {label}
      </div>
      <span className={`font-body text-sm font-medium ${highlight ? 'text-sage-600' : 'text-neutral-800'}`}>
        {value}
      </span>
    </div>
  )
}
