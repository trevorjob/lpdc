'use client'

import { useState, useEffect, useRef, useCallback, type TouchEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SlideData {
  title:          string
  subtitle:       string
  description:    string
  imageUrl:       string
  projectedYield: string
  status:         'Available' | 'Under Offer' | 'Sold'
  slug:           string
}

const slides: SlideData[] = [
  {
    title:          'The Riverside Apartments',
    subtitle:       'HMO Investment, Manchester',
    description:
      'Premium HMO development in Manchester\'s Salford Quays district. Fully refurbished and consistently at 97% occupancy, with strong yields backed by professional management.',
    imageUrl:       'https://images.unsplash.com/photo-1578687047263-631a67f01e0d?w=1200&h=900&fit=crop&q=80',
    projectedYield: '8.2%',
    status:         'Available',
    slug:           'the-riverside-apartments',
  },
  {
    title:          'Laurel Grove Portfolio',
    subtitle:       'Terraced Portfolio, Birmingham',
    description:
      'Three terraced houses in Birmingham\'s Jewellery Quarter. Below-market-value acquisition in a high-growth area with a decade of consistent capital appreciation.',
    imageUrl:       'https://images.unsplash.com/photo-1652013368406-ddeac5542742?w=1200&h=900&fit=crop&q=80',
    projectedYield: '7.6%',
    status:         'Available',
    slug:           'laurel-grove-portfolio',
  },
  {
    title:          'Oakfield Semi-Detached',
    subtitle:       'Semi-Detached, Leeds',
    description:
      'Sought-after Leeds suburb, acquired 18% below market value. Strong local rental demand and scope for light refurbishment to add immediate capital value.',
    imageUrl:       'https://images.unsplash.com/photo-1710883727446-0bf5692fd709?w=1200&h=900&fit=crop&q=80',
    projectedYield: '6.8%',
    status:         'Under Offer',
    slug:           'oakfield-semi',
  },
]

const SLIDE_DURATION  = 6000
const TRANSITION_HALF = 400

export function PortfolioPreview() {
  const [currentIndex,    setCurrentIndex]    = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress,        setProgress]        = useState(0)
  const [isPaused,        setIsPaused]        = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)
  const touchEndX   = useRef(0)

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setProgress(0)
    setTimeout(() => {
      setCurrentIndex(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, TRANSITION_HALF)
  }, [isTransitioning, currentIndex])

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % slides.length)
  }, [currentIndex, goToSlide])

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length)
  }, [currentIndex, goToSlide])

  useEffect(() => {
    if (isPaused) return
    progressRef.current = setInterval(() => {
      setProgress(prev => Math.min(prev + 100 / (SLIDE_DURATION / 50), 100))
    }, 50)
    intervalRef.current = setInterval(goNext, SLIDE_DURATION)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [currentIndex, isPaused, goNext])

  const handleTouchStart = (e: TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX }
  const handleTouchMove  = (e: TouchEvent) => { touchEndX.current   = e.targetTouches[0].clientX }
  const handleTouchEnd   = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 60) diff > 0 ? goNext() : goPrev()
  }

  const slide = slides[currentIndex]

  const textCls = `transition-[opacity,transform] duration-[400ms] ease-out ${
    isTransitioning ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
  }`

  const statusColor = slide.status === 'Available' ? 'text-sage-500' : 'text-gold-400'

  return (
    <section
      className="relative w-full overflow-hidden bg-neutral-50"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Investment portfolio preview"
    >
      <div className="flex min-h-[88vh] flex-col lg:flex-row">

        {/* ── Content side ─────────────────────────── */}
        <div className="relative flex flex-col justify-center overflow-hidden px-6 pb-16 pt-20 lg:w-[46%] lg:flex-none lg:px-16 lg:py-28">

          {/* Ghost slide number */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 bottom-0 select-none font-display text-[28vw] font-light leading-none text-neutral-100 lg:text-[14vw]"
          >
            {String(currentIndex + 1).padStart(2, '0')}
          </span>

          {/* Section label */}
          <p className="mb-10 font-body text-xs font-medium tracking-[0.2em] uppercase text-sage-500">
            02 / Investment Portfolio
          </p>

          {/* Slide counter */}
          <div className={`mb-6 flex items-center gap-3 ${textCls}`}>
            <span aria-hidden className="h-px w-8 bg-gold-400" />
            <span className="font-body text-xs font-medium tracking-[0.2em] text-neutral-400">
              {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <h2
            className={`mb-2 font-display font-light leading-tight tracking-tight text-neutral-800 ${textCls}`}
            style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3.5rem)' }}
          >
            {slide.title}
          </h2>

          {/* Subtitle */}
          <p className={`mb-6 font-body text-sm font-medium tracking-wide text-sage-500 ${textCls}`}>
            {slide.subtitle}
          </p>

          {/* Gold rule */}
          <div aria-hidden className={`mb-6 h-px w-10 bg-gold-400 ${textCls}`} />

          {/* Description */}
          <p className={`mb-8 max-w-[44ch] font-body text-sm leading-relaxed text-neutral-600 ${textCls}`}>
            {slide.description}
          </p>

          {/* Metrics row */}
          <div className={`mb-9 flex items-center gap-6 ${textCls}`}>
            <div>
              <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                Projected Yield
              </p>
              <p className="font-display text-2xl font-light leading-snug text-neutral-800">
                {slide.projectedYield}
              </p>
            </div>
            <div aria-hidden className="h-8 w-px bg-neutral-200" />
            <div>
              <p className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                Status
              </p>
              <p className={`font-body text-sm font-medium ${statusColor}`}>
                {slide.status}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className={`mb-10 flex items-center gap-5 ${textCls}`}>
            {/* <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2.5 bg-sage-500 px-6 py-3 font-body text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-sage-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
            >
              View Property
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link> */}
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2.5 bg-sage-500 px-6 py-3 font-body text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-sage-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
            >
              View All Properties
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />

            </Link>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-500 transition-colors duration-200 hover:border-neutral-600 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
              aria-label="Previous property"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-500 transition-colors duration-200 hover:border-neutral-600 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
              aria-label="Next property"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

        {/* ── Image side ────────────────────────────── */}
        <div
          className="relative min-h-[55vw] flex-1 lg:min-h-0 lg:w-[54%] lg:flex-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Stacked images — crossfade on index change */}
          {slides.map((s, i) => (
            <div
              key={s.slug}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                i === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={i !== currentIndex}
            >
              <Image
                src={s.imageUrl}
                alt={s.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 54vw"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Subtle dark tint */}
          <div className="absolute inset-0 bg-neutral-900/12 pointer-events-none" aria-hidden />

          {/* Gold corner accents */}
          <div aria-hidden className="absolute left-5 top-5 h-9 w-9 border-l border-t border-gold-400/70" />
          <div aria-hidden className="absolute bottom-5 right-5 h-9 w-9 border-b border-r border-gold-400/70" />

        </div>

      </div>

      {/* ── Progress bar ──────────────────────────── */}
      <div className="flex border-t border-neutral-200 bg-white">
        {slides.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => goToSlide(i)}
            className="group flex flex-1 flex-col gap-1.5 px-4 py-4 text-left transition-colors duration-200 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-sage-500 lg:px-6 lg:py-5"
            aria-label={`Go to ${s.title}`}
            aria-current={i === currentIndex ? 'true' : undefined}
          >
            <div className="h-px w-full bg-neutral-200">
              <div
                className="h-full bg-sage-500"
                style={{
                  width:      i === currentIndex ? `${progress}%` : i < currentIndex ? '100%' : '0%',
                  transition: i === currentIndex ? 'none' : 'width 400ms ease-out',
                }}
              />
            </div>
            <span className="truncate font-body text-xs text-neutral-400 transition-colors duration-200 group-hover:text-neutral-600">
              {s.title}
            </span>
          </button>
        ))}
      </div>

    </section>
  )
}
