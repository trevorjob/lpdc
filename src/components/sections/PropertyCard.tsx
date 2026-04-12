'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Property } from '@/types'

const EASE_EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1]

const TYPE_LABELS: Record<string, string> = {
  hmo:            'HMO',
  'semi-detached': 'Semi-Detached',
  terraced:       'Terraced',
  detached:       'Detached',
  flat:           'Flat',
  commercial:     'Commercial',
}

interface PropertyCardProps {
  property: Property
  index:    number
  onOpen:   (property: Property) => void
}

export function PropertyCard({ property, index, onOpen }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduce = useReducedMotion()

  const statusColor = property.status === 'available' ? 'text-sage-500' : 'text-gold-400'
  const statusLabel =
    property.status === 'available'    ? 'Available'  :
    property.status === 'under-offer'  ? 'Under Offer' : 'Sold'

  return (
    <motion.article
      className="group relative flex min-h-[420px] cursor-pointer bg-white"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onOpen(property)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(property) }}
      aria-label={`View details for ${property.name}`}
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE_EXPO }}
    >
      {/* Gold top border — extends on hover */}
      <motion.div
        aria-hidden
        className="absolute left-0 top-0 z-10 h-px bg-gold-400"
        animate={{ width: isHovered && !shouldReduce ? '100%' : '3rem' }}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
      />

      {/* Left: text content */}
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden px-8 py-10 lg:px-12 lg:py-14">

        {/* Ghost index */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-6 left-4 select-none font-display font-light leading-none text-neutral-100 lg:left-6"
          style={{ fontSize: 'clamp(8rem, 14vw, 14rem)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Top section */}
        <div className="relative z-10">

          {/* Type + status */}
          <div className="mb-5 flex items-center gap-4">
            <span className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-400">
              {TYPE_LABELS[property.type] ?? property.type}
            </span>
            <span aria-hidden className="h-px w-4 bg-neutral-200" />
            <span className={`font-body text-[10px] font-medium tracking-[0.15em] uppercase ${statusColor}`}>
              {statusLabel}
            </span>
          </div>

          {/* Property name */}
          <h2
            className="mb-2 font-display font-light leading-tight tracking-tight text-neutral-800"
            style={{ fontSize: 'clamp(1.875rem, 3vw, 3.25rem)' }}
          >
            {property.name}
          </h2>

          {/* Location */}
          <div className="mb-6 flex items-center gap-1.5 font-body text-sm text-neutral-500">
            <MapPin className="h-3.5 w-3.5 text-sage-500" />
            {property.location}
          </div>

          {/* Gold rule — grows on hover */}
          <motion.div
            aria-hidden
            className="mb-6 h-px bg-gold-400 origin-left"
            animate={{ width: isHovered && !shouldReduce ? '4rem' : '2.5rem' }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
          />

          {/* Short description */}
          <p className="mb-8 max-w-[38ch] font-body text-sm leading-relaxed text-neutral-600">
            {property.shortDescription}
          </p>
        </div>

        {/* Bottom: metrics + CTA */}
        <div className="relative z-10">

          {/* Metrics */}
          <div className="mb-8 flex flex-wrap items-center gap-6">
            {property.projectedYield && (
              <div>
                <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                  Yield
                </p>
                <p className="font-display text-2xl font-light text-neutral-800">
                  {property.projectedYield}
                </p>
              </div>
            )}
            <div aria-hidden className="h-8 w-px bg-neutral-200" />
            <div>
              <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                Bedrooms
              </p>
              <p className="font-display text-2xl font-light text-neutral-800">
                {property.bedrooms}
              </p>
            </div>
            <div aria-hidden className="h-8 w-px bg-neutral-200" />
            <div>
              <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                Size
              </p>
              <p className="font-display text-2xl font-light text-neutral-800">
                {property.sqft.toLocaleString()}
                <span className="ml-1 font-body text-xs text-neutral-400">sqft</span>
              </p>
            </div>
          </div>

          {/* View details link */}
          <div className="flex items-center gap-2 font-body text-sm font-medium text-sage-500 transition-colors duration-300 group-hover:text-sage-600">
            <span>View Details</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>

      {/* Right: image — desktop only */}
      <div className="relative hidden w-[42%] overflow-hidden lg:block">

        {/* Corner accents */}
        <div aria-hidden className="absolute left-4 top-4 z-10 h-8 w-8 border-l border-t border-gold-400/60" />
        <div aria-hidden className="absolute bottom-4 right-4 z-10 h-8 w-8 border-b border-r border-gold-400/60" />

        <Image
          src={property.heroImage}
          alt={property.name}
          fill
          className={`object-cover transition-transform duration-700 ease-out ${
            isHovered && !shouldReduce ? 'scale-[1.04]' : 'scale-100'
          }`}
          sizes="(max-width: 1024px) 0vw, 42vw"
          loading={index === 0 ? 'eager' : 'lazy'}
        />

        {/* Subtle tint */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-neutral-900/15" />
      </div>
    </motion.article>
  )
}
