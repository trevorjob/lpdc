import type { Property } from '@/types'

export const properties: Property[] = [
  {
    id:               '1',
    slug:             'the-riverside-apartments',
    name:             'The Riverside Apartments',
    location:         'Manchester, Greater Manchester',
    type:             'hmo',
    status:           'available',
    description:
      'A premium HMO development in the heart of Manchester\'s growing Salford Quays district. This fully refurbished property offers strong yields with high occupancy demand from young professionals and postgraduate students.',
    shortDescription: 'Premium HMO in Manchester — fully refurbished, 97% occupancy.',
    sqft:             1850,
    bedrooms:         6,
    bathrooms:        3,
    heroImage:        '/images/sayan-nath-i7KUmMOiNFo-unsplash.jpg',
    images:           ['/images/sayan-nath-i7KUmMOiNFo-unsplash.jpg'],
    investmentHighlights: [
      'Located in high-demand commuter corridor',
      'Fully refurbished to HMO compliance standards',
      'Consistent 97% occupancy rate',
      'Professional management already in place',
    ],
    projectedYield: '8.2%',
    refurbished:    true,
    occupancyRate:  '97%',
  },
  {
    id:               '2',
    slug:             'laurel-grove-portfolio',
    name:             'Laurel Grove Portfolio',
    location:         'Birmingham, West Midlands',
    type:             'terraced',
    status:           'available',
    description:
      'A portfolio of three terraced houses in Birmingham\'s Jewellery Quarter — a high-growth area with strong rental demand and consistent capital appreciation over the last decade.',
    shortDescription: 'Three-property portfolio in Birmingham\'s Jewellery Quarter.',
    sqft:             3200,
    bedrooms:         9,
    bathrooms:        4,
    heroImage:        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&h=1200&fit=crop&q=80',
    images:           ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&h=1200&fit=crop&q=80'],
    investmentHighlights: [
      'Below-market-value acquisition',
      'High-growth Birmingham postcode',
      'Strong capital appreciation history',
      'Tenanted and income-generating from day one',
    ],
    projectedYield: '7.6%',
    refurbished:    false,
    occupancyRate:  '100%',
  },
  {
    id:               '3',
    slug:             'oakfield-semi',
    name:             'Oakfield Semi-Detached',
    location:         'Leeds, West Yorkshire',
    type:             'semi-detached',
    status:           'under-offer',
    description:
      'A well-positioned semi-detached family home in a sought-after Leeds suburb. Acquired below market value with scope for light refurbishment and strong long-term rental yield.',
    shortDescription: 'Semi-detached in sought-after Leeds suburb, below market value.',
    sqft:             1120,
    bedrooms:         3,
    bathrooms:        2,
    heroImage:        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&h=1200&fit=crop&q=80',
    images:           ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&h=1200&fit=crop&q=80'],
    investmentHighlights: [
      'Acquired 18% below market value',
      'Strong local rental demand',
      'Family-friendly location near top-rated schools',
      'Light refurbishment adds immediate capital value',
    ],
    projectedYield: '6.8%',
    refurbished:    false,
  },
]

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}
