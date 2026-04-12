import type { Metadata } from 'next'
import { displayFont, bodyFont } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default:  'Luli Properties & Dev.co.ltd',
    template: '%s | Luli Properties',
  },
  description:
    'UK residential property investment — sourcing and investing in below-market-value assets in high-growth areas.',
  openGraph: {
    siteName: 'Luli Properties & Dev.co.ltd',
    locale:   'en_GB',
    type:     'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
