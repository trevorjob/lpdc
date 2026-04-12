import { Hero }                    from '@/components/sections/Hero'
import { AboutSnippet }           from '@/components/sections/AboutSnippet'
import { Stats }                  from '@/components/sections/Stats'
import { FeaturedSpotlightSection } from '@/components/sections/FeaturedSpotlightSection'
import { PortfolioPreview }       from '@/components/sections/PortfolioPreview'
import { CTASection }             from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <Stats />
      <FeaturedSpotlightSection />
      <PortfolioPreview />
      <CTASection />
    </>
  )
}
