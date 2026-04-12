export type PropertyStatus = 'available' | 'sold' | 'under-offer'
export type PropertyType =
  | 'hmo'
  | 'semi-detached'
  | 'terraced'
  | 'detached'
  | 'flat'
  | 'commercial'

export interface Property {
  id:                  string
  slug:                string
  name:                string
  location:            string
  type:                PropertyType
  status:              PropertyStatus
  description:         string
  shortDescription:    string
  sqft:                number
  bedrooms:            number
  bathrooms?:          number
  heroImage:           string
  images:              string[]
  investmentHighlights: string[]
  projectedYield?:     string
  refurbished?:        boolean
  occupancyRate?:      string
}

export interface TeamMember {
  id:    string
  name:  string
  title: string
  bio:   string
  image?: string
}

export interface Partner {
  id:    string
  name:  string
  logo?: string
  url?:  string
}

export interface Stat {
  label:   string
  value:   string
  suffix?: string
  prefix?: string
}
