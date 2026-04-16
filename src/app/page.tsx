import { Hero }             from '@/components/sections/Hero'
import { AboutSnippet }     from '@/components/sections/AboutSnippet'
import { PortfolioPreview } from '@/components/sections/PortfolioPreview'
import { CTASection }       from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSnippet />
      <PortfolioPreview />
      <CTASection />
    </>
  )
}
