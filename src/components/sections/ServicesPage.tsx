'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  ArrowRight,
  Search,
  ClipboardList,
  TrendingUp,
  ShieldCheck,
  Handshake,
} from 'lucide-react'
import { PageHero } from './PageHero'

const EASE_EXPO: [number, number, number, number]   = [0.19, 1, 0.22, 1]
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

/* ── data ─────────────────────────────────────── */

const PILLARS = [
  {
    number:  '01',
    title:   'Investment Strategy',
    summary:
      'We design a personalised investment plan matched to your capital, risk appetite, and return targets. Whether you are deploying £50k or scaling to a multi-property portfolio, every recommendation is data-backed and built around your specific goals.',
    points: [
      'In-depth financial and risk profiling',
      'Target yield and capital growth modelling',
      'Tailored strategy across property types and regions',
    ],
    image:     'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=900&h=1100&fit=crop&q=80',
    imageAlt:  'UK city skyline representing high-growth investment regions',
    imageLeft: true,
    bg:        'bg-neutral-50',
  },
  {
    number:  '02',
    title:   'Portfolio Building',
    summary:
      'We source, acquire, and manage residential assets across the UK\'s highest-growth regions on your behalf. Our investor-first network gives you first access to below-market-value deals before they reach the open market.',
    points: [
      'Below-market-value sourcing across UK regions',
      'First-access deals via our investor network',
      'Full acquisition and ongoing management support',
    ],
    image:     '/images/sayan-nath-i7KUmMOiNFo-unsplash.jpg',
    imageAlt:  'UK residential property exterior',
    imageLeft: false,
    bg:        'bg-neutral-100',
  },
]

const STEPS = [
  {
    number: '01',
    icon:   <Handshake className="h-5 w-5" />,
    title:  'Initial Consultation',
    body:
      'We start with a focused conversation about your goals, timeline, and capital. No forms, no jargon, just a frank discussion about what you want your money to do.',
  },
  {
    number: '02',
    icon:   <ClipboardList className="h-5 w-5" />,
    title:  'Investment Strategy',
    body:
      'Based on your profile, we design a bespoke strategy covering property types, target regions, yield expectations, and growth projections. You approve every step before anything moves.',
  },
  {
    number: '03',
    icon:   <Search className="h-5 w-5" />,
    title:  'Property Sourcing',
    body:
      'Our team identifies below-market-value assets that match your strategy. We assess local demand, comparable sales, structural condition, and projected yield before presenting any deal.',
  },
  {
    number: '04',
    icon:   <ShieldCheck className="h-5 w-5" />,
    title:  'Acquisition Support',
    body:
      'We guide you through due diligence, legal requirements, and completion. Full visibility at every stage, with a dedicated point of contact from offer to keys.',
  },
  {
    number: '05',
    icon:   <TrendingUp className="h-5 w-5" />,
    title:  'Ongoing Management',
    body:
      'Post-acquisition we actively manage your asset, coordinating tenants, maintenance, and compliance. Your investment is protected and performing from day one.',
  },
]

const WHY = [
  {
    number: '01',
    title:  'Built-in equity from day one',
    body:
      'Every property we source is acquired below market value. That gap between purchase price and market value is not a saving. It is instant equity working in your favour before a single tenant pays rent.',
  },
  {
    number: '02',
    title:  'High-growth UK regions only',
    body:
      'We focus on areas with structural demand drivers: employment hubs, university towns, regeneration zones. Not postcodes that performed well a decade ago.',
  },
  {
    number: '03',
    title:  'End-to-end, not hand-off',
    body:
      'Most sourcing companies hand you a deal and disappear. We stay involved from identification through acquisition through ongoing management. One relationship, full continuity.',
  },
  {
    number: '04',
    title:  'Selective by design',
    body:
      'We work with a focused group of investors. Fewer clients means more time, more access, and better outcomes for everyone we work with.',
  },
]

/* ── ServicesPage ──────────────────────────────── */

export function ServicesPage() {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <>
      <PageHero
        sectionNumber="03"
        sectionLabel="Services"
        headlineLines={['Investing that works', 'around you.']}
        description="From a single acquisition to a full property portfolio, we handle strategy, sourcing, and management so you can focus on results."
      />

      {PILLARS.map((pillar) => (
        <PillarRow key={pillar.number} pillar={pillar} shouldReduce={shouldReduce} />
      ))}

      <ProcessSection shouldReduce={shouldReduce} />
      <WhySection     shouldReduce={shouldReduce} />
      <DarkCTA        shouldReduce={shouldReduce} />
    </>
  )
}

/* ── PillarRow ─────────────────────────────────── */

interface Pillar {
  number:    string
  title:     string
  summary:   string
  points:    string[]
  image:     string
  imageAlt:  string
  imageLeft: boolean
  bg:        string
}

function PillarRow({ pillar, shouldReduce }: { pillar: Pillar; shouldReduce: boolean }) {
  const sectionRef  = useRef<HTMLElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const inView      = useInView(contentRef, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start end', 'end start'],
  })
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? ['0%', '0%'] : ['-7%', '7%']
  )

  const textContent = (
    <div
      ref={contentRef}
      className="relative flex h-full flex-col justify-center overflow-hidden px-8 py-20 lg:px-16 lg:py-28"
    >
      {/* Ghost number */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-4 select-none font-display font-light leading-none text-neutral-200/60"
        style={{ fontSize: 'clamp(7rem, 12vw, 12rem)' }}
      >
        {pillar.number}
      </span>

      <div className="relative z-10 max-w-lg">
        {/* Label */}
        <motion.p
          className="mb-4 font-body text-[10px] font-medium tracking-[0.2em] uppercase text-gold-400"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
        >
          {pillar.number} / {pillar.title}
        </motion.p>

        {/* Headline */}
        <h2
          className="mb-6 font-display font-light leading-tight tracking-tight text-neutral-800"
          style={{ fontSize: 'clamp(2.25rem, 3.5vw, 3.5rem)' }}
        >
          {pillar.title.split(' ').map((word, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden">
              <motion.span
                className="block"
                initial={shouldReduce ? false : { y: '110%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASE_EXPO }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Gold rule */}
        <motion.div
          aria-hidden
          className="mb-7 h-px origin-left bg-gold-400"
          style={{ width: '3rem' }}
          initial={shouldReduce ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_EXPO }}
        />

        {/* Body */}
        <motion.p
          className="mb-8 font-body text-sm leading-relaxed text-neutral-600"
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE_SMOOTH }}
        >
          {pillar.summary}
        </motion.p>

        {/* Points */}
        <ul className="space-y-3">
          {pillar.points.map((pt, i) => (
            <motion.li
              key={pt}
              className="flex items-start gap-3 font-body text-sm text-neutral-700"
              initial={shouldReduce ? false : { opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.45 + i * 0.08, ease: EASE_SMOOTH }}
            >
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-sage-500" />
              {pt}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )

  const imageContent = (
    <div className="relative min-h-[360px] overflow-hidden lg:min-h-0">
      {/* Parallax wrapper */}
      <motion.div
        className="absolute inset-[-8%]"
        style={shouldReduce ? {} : { y: imgY }}
      >
        <Image
          src={pillar.image}
          alt={pillar.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 52vw"
        />
      </motion.div>

      {/* Tint */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-neutral-900/20" />

      {/* Gold corner accents */}
      {pillar.imageLeft ? (
        <>
          <div aria-hidden className="absolute left-5 top-5 h-9 w-9 border-l border-t border-gold-400/60" />
          <div aria-hidden className="absolute bottom-5 left-5 h-9 w-9 border-b border-l border-gold-400/60" />
        </>
      ) : (
        <>
          <div aria-hidden className="absolute right-5 top-5 h-9 w-9 border-r border-t border-gold-400/60" />
          <div aria-hidden className="absolute bottom-5 right-5 h-9 w-9 border-b border-r border-gold-400/60" />
        </>
      )}
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className={`${pillar.bg} min-h-[600px] overflow-hidden`}
    >
      <div
        className={`grid min-h-[600px] grid-cols-1 lg:grid-cols-2 ${
          pillar.imageLeft ? '' : 'lg:[&>*:first-child]:order-last'
        }`}
      >
        {pillar.imageLeft ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </section>
  )
}

/* ── ProcessSection ────────────────────────────── */

function ProcessSection({ shouldReduce }: { shouldReduce: boolean }) {
  const headerRef  = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerView = useInView(headerRef, { once: true, margin: '-6% 0px' })

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start end', 'end start'],
  })
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? ['0%', '0%'] : ['-6%', '6%']
  )

  return (
    <section ref={sectionRef} className="bg-neutral-100 py-24 lg:py-36">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-16">

        {/* Header */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <motion.p
            className="mb-5 font-body text-xs font-medium tracking-[0.2em] uppercase text-sage-500"
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={headerView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
          >
            How it works
          </motion.p>
          <h2
            className="font-display font-light leading-tight tracking-tight text-neutral-800"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
          >
            {['Five steps from', 'first call to first yield.'].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={shouldReduce ? false : { y: '110%' }}
                  animate={headerView ? { y: 0 } : {}}
                  transition={{ duration: 0.85, delay: 0.1 + i * 0.12, ease: EASE_EXPO }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* Two-col: steps + sticky image */}
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_360px]">

          {/* Steps */}
          <div className="divide-y divide-neutral-200">
            {STEPS.map((step, i) => (
              <StepRow
                key={step.number}
                step={step}
                index={i}
                shouldReduce={shouldReduce}
              />
            ))}
          </div>

          {/* Sticky image */}
          <div className="hidden lg:sticky lg:top-28 lg:block">
            <div className="relative aspect-[3/4] overflow-hidden">
              {/* Offset gold border */}
              <div
                aria-hidden
                className="absolute -inset-3 border border-gold-400/40 pointer-events-none z-10"
              />
              <motion.div
                className="absolute inset-[-6%]"
                style={shouldReduce ? {} : { y: imgY }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1762205059931-7c8fbb749e3b?w=800&h=1100&fit=crop&q=80"
                  alt="UK residential investment property"
                  fill
                  className="object-cover"
                  sizes="360px"
                />
              </motion.div>
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-neutral-900/15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface StepData {
  number: string
  icon:   React.ReactNode
  title:  string
  body:   string
}

function StepRow({
  step,
  index,
  shouldReduce,
}: {
  step:        StepData
  index:       number
  shouldReduce: boolean
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      className="group relative grid grid-cols-1 gap-4 py-10 transition-colors duration-300 hover:bg-white lg:grid-cols-[7rem_1fr] lg:items-start lg:gap-8 lg:px-6"
      initial={shouldReduce ? false : { opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: EASE_EXPO }}
    >
      {/* Gold left border on hover */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-gold-400 transition-transform duration-400 group-hover:scale-y-100"
      />

      {/* Step number */}
      <div>
        <span
          className="block font-display font-light leading-none text-neutral-200 transition-colors duration-400 group-hover:text-gold-400/50"
          style={{ fontSize: 'clamp(3rem, 4.5vw, 4.5rem)' }}
          aria-hidden
        >
          {step.number}
        </span>
      </div>

      {/* Content */}
      <div className="pt-1">
        <div className="mb-2.5 flex items-center gap-3">
          <span className="text-sage-500 transition-colors duration-300 group-hover:text-sage-600">
            {step.icon}
          </span>
          <h3 className="font-body text-base font-medium text-neutral-800 lg:text-lg">
            {step.title}
          </h3>
        </div>
        <p className="font-body text-sm leading-relaxed text-neutral-600">
          {step.body}
        </p>
      </div>
    </motion.div>
  )
}

/* ── WhySection ────────────────────────────────── */

function WhySection({ shouldReduce }: { shouldReduce: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)
  const headerView = useInView(headerRef, { once: true, margin: '-8% 0px' })

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start end', 'end start'],
  })
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? ['0%', '0%'] : ['-7%', '7%']
  )

  return (
    <section ref={sectionRef} className="bg-neutral-50 py-24 lg:py-36">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[380px_1fr] lg:gap-24">

          {/* Sticky image — desktop */}
          <div className="hidden lg:sticky lg:top-28 lg:block">
            <div className="relative aspect-[3/4] overflow-hidden">
              <div
                aria-hidden
                className="absolute -inset-3 border border-gold-400/40 pointer-events-none z-10"
              />
              <motion.div
                className="absolute inset-[-6%]"
                style={shouldReduce ? {} : { y: imgY }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1663043546936-531f379af8f2?w=800&h=1100&fit=crop&q=80"
                  alt="Contemporary UK residential property"
                  fill
                  className="object-cover"
                  sizes="380px"
                />
              </motion.div>
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-neutral-900/15" />
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Header */}
            <div ref={headerRef} className="mb-14">
              <motion.p
                className="mb-5 font-body text-xs font-medium tracking-[0.2em] uppercase text-sage-500"
                initial={shouldReduce ? false : { opacity: 0 }}
                animate={headerView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              >
                Why Luli
              </motion.p>
              <h2
                className="font-display font-light leading-tight tracking-tight text-neutral-800"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
              >
                {['What sets us', 'apart.'].map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={shouldReduce ? false : { y: '110%' }}
                      animate={headerView ? { y: 0 } : {}}
                      transition={{ duration: 0.85, delay: 0.1 + i * 0.12, ease: EASE_EXPO }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h2>
            </div>

            {/* Differentiators */}
            <div className="space-y-12">
              {WHY.map((item, i) => (
                <WhyItem
                  key={item.number}
                  item={item}
                  index={i}
                  inView={headerView}
                  shouldReduce={shouldReduce}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyItem({
  item,
  index,
  inView,
  shouldReduce,
}: {
  item:        typeof WHY[0]
  index:       number
  inView:      boolean
  shouldReduce: boolean
}) {
  return (
    <motion.div
      className="group border-t border-neutral-200 pt-8"
      initial={shouldReduce ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.25 + index * 0.1, ease: EASE_SMOOTH }}
    >
      <div className="flex items-start gap-6">
        {/* Number */}
        <span
          aria-hidden
          className="shrink-0 font-display text-4xl font-light leading-none text-neutral-200 transition-colors duration-400 group-hover:text-gold-400/40"
        >
          {item.number}
        </span>

        <div>
          {/* Gold rule */}
          <motion.div
            aria-hidden
            className="mb-4 h-px origin-left bg-gold-400"
            style={{ width: '2rem' }}
            initial={shouldReduce ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35 + index * 0.1, ease: EASE_EXPO }}
          />
          <h3 className="mb-3 font-display text-xl font-light leading-snug text-neutral-800 lg:text-2xl">
            {item.title}
          </h3>
          <p className="font-body text-sm leading-relaxed text-neutral-600">
            {item.body}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ── DarkCTA ───────────────────────────────────── */

function DarkCTA({ shouldReduce }: { shouldReduce: boolean }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1600&h=900&fit=crop&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-sage-700/90" />
      </div>

      <div ref={ref} className="relative z-10 py-24 lg:py-36">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">

            {/* Left */}
            <div>
              <motion.p
                className="mb-6 font-body text-xs font-medium tracking-[0.2em] uppercase text-gold-400"
                initial={shouldReduce ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              >
                Ready to begin
              </motion.p>

              <h2
                className="font-display font-light leading-tight tracking-tight text-white"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4.5rem)' }}
              >
                {['Build your portfolio.', 'On your terms.'].map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={shouldReduce ? false : { y: '110%' }}
                      animate={inView ? { y: 0 } : {}}
                      transition={{ duration: 0.9, delay: 0.15 + i * 0.13, ease: EASE_EXPO }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h2>
            </div>

            {/* Right */}
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_SMOOTH }}
            >
              <div aria-hidden className="mb-8 h-px w-10 bg-gold-400/50" />

              <p className="mb-10 max-w-[42ch] font-body text-sm leading-relaxed text-white/65">
                Whether you are starting with a single investment or scaling an existing portfolio,
                we will design a plan built around your capital and your goals.
                The first conversation is always free.
              </p>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 bg-gold-400 px-8 py-4 font-body text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-500 hover:shadow-[0_8px_28px_rgba(201,162,74,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-700"
              >
                Register Your Interest
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
