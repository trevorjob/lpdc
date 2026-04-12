import type { Metadata } from 'next'
import { ServicesPage } from '@/components/sections/ServicesPage'

export const metadata: Metadata = {
  title:       'Services | Luli Properties',
  description: 'From bespoke investment strategy to full portfolio building — how Luli Properties works with investors across the UK.',
}

export default function Services() {
  return <ServicesPage />
}
