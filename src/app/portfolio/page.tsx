import type { Metadata } from 'next'
import { properties }      from '@/data/properties'
import { PortfolioClient } from '@/components/sections/PortfolioClient'

export const metadata: Metadata = {
  title:       'Investment Portfolio | Luli Properties',
  description: 'Browse our curated selection of below-market-value UK residential investment properties.',
}

export default function PortfolioPage() {
  return <PortfolioClient properties={properties} />
}
