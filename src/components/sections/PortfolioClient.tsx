'use client'

import { useState, useCallback } from 'react'
import { PropertyCard }   from './PropertyCard'
import { PageHero }       from './PageHero'
import { PropertyModal }  from '@/components/ui/PropertyModal'
import type { Property }  from '@/types'

interface PortfolioClientProps {
  properties: Property[]
}

export function PortfolioClient({ properties }: PortfolioClientProps) {
  const [selected, setSelected] = useState<Property | null>(null)

  const handleOpen  = useCallback((p: Property) => setSelected(p),   [])
  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <>
      {/* ── Page hero ────────────────────────────── */}
      <PageHero
        sectionNumber="02"
        sectionLabel="Investment Portfolio"
        headlineLines={['Our current', 'properties.']}
        description="Curated below-market-value residential assets across the UK's highest-growth regions. Select any property to view the full investment case."
      />

      {/* ── Property list ────────────────────────── */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-16">
          <div className="flex flex-col gap-6">
            {properties.map((property, i) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={i}
                onOpen={handleOpen}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal ────────────────────────────────── */}
      <PropertyModal property={selected} onClose={handleClose} />
    </>
  )
}
