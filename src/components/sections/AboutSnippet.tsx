'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import {
  Home,
  Search,
  TrendingUp,
  Settings,
  Hammer,
  ArrowUpRight,
  Building2,
  BarChart2,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { WavePath } from '@/components/ui/wave-path'

const EASE_EXPO: [number, number, number, number]   = [0.19, 1, 0.22, 1]
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const HEADLINE = ['What we do,', 'and how we do it.']

const services = [
  {
    icon:        <Home className="h-5 w-5" />,
    title:       'Property Sourcing',
    description: 'We identify and secure below-market-value residential assets in high-growth UK locations, giving investors a built-in equity advantage from day one.',
    position:    'left' as const,
  },
  {
    icon:        <Search className="h-5 w-5" />,
    title:       'Due Diligence',
    description: 'Every acquisition is backed by rigorous analysis: local market data, yield projections, comparable sales, and structural assessments before any commitment.',
    position:    'left' as const,
  },
  {
    icon:        <TrendingUp className="h-5 w-5" />,
    title:       'Portfolio Building',
    description: 'For investors ready to scale, we design and build bespoke portfolios aligned to specific return targets, risk profiles, and timelines.',
    position:    'left' as const,
  },
  {
    icon:        <Settings className="h-5 w-5" />,
    title:       'Asset Management',
    description: 'We actively manage each property after acquisition, coordinating tenants, maintenance, and compliance to protect and grow your investment.',
    position:    'right' as const,
  },
  {
    icon:        <Hammer className="h-5 w-5" />,
    title:       'Refurbishment',
    description: 'Strategic refurbishment adds immediate capital value. We oversee works to the standard required for strong occupancy and long-term asset preservation.',
    position:    'right' as const,
  },
  {
    icon:        <ArrowUpRight className="h-5 w-5" />,
    title:       'Exit Planning',
    description: 'When the time is right, we advise on and execute exit strategies that maximise return, whether through direct sale, refinance, or portfolio transfer.',
    position:    'right' as const,
  },
]

const stats = [
  { icon: <Building2 className="h-5 w-5" />, value: 12,  suffix: '+',  label: 'Properties Sourced' },
  { icon: <Users className="h-5 w-5" />,     value: 97,  suffix: '%',  label: 'Average Occupancy'  },
  { icon: <BarChart2 className="h-5 w-5" />, value: 8,   suffix: '%+', label: 'Average Yield'      },
  { icon: <Award className="h-5 w-5" />,     value: 3,   suffix: '',   label: 'UK Cities Active'   },
]

export function AboutSnippet() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()

  const isInView      = useInView(sectionRef, { once: true,  margin: '-8% 0px' })
  const isStatsInView = useInView(statsRef,   { once: false, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40])
  const y2 = useTransform(scrollYProgress, [0, 1], [0,  40])

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden:  { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE_SMOOTH },
    },
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-neutral-100 py-24 lg:py-36"
    >
      {/* Decorative blurs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-8 top-16 h-64 w-64 rounded-full bg-sage-500/5 blur-3xl"
        style={shouldReduce ? {} : { y: y1 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-16 right-8 h-80 w-80 rounded-full bg-gold-400/5 blur-3xl"
        style={shouldReduce ? {} : { y: y2 }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >

        {/* Header */}
        <motion.div className="mb-4 flex flex-col items-center" variants={itemVariants}>
          <p className="mb-3 font-body text-xs font-medium tracking-[0.2em] uppercase text-sage-500">
            About Us
          </p>

          <h2
            className="mb-5 text-center font-display font-light leading-tight tracking-tight text-neutral-800"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={shouldReduce ? false : { y: '110%' }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 0.85, delay: 0.1 + i * 0.13, ease: EASE_EXPO }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.div
            aria-hidden
            className="h-px origin-left bg-gold-400"
            style={{ width: '4rem' }}
            initial={shouldReduce ? false : { scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE_EXPO }}
          />
        </motion.div>

        <motion.p
          className="mx-auto max-w-[58ch] text-center font-body text-base leading-relaxed text-neutral-600"
          variants={itemVariants}
        >
          A focused UK property investment firm. We source, acquire, and manage
          below-market-value residential assets across high-growth regions,
          delivering consistent returns for a selective group of investors.
        </motion.p>

        {/* Interactive WavePath divider */}
        <div className="my-12 text-gold-400/50">
          <WavePath />
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">

          {/* Left services */}
          <div className="space-y-12">
            {services
              .filter(s => s.position === 'left')
              .map((s, i) => (
                <ServiceItem
                  key={`left-${i}`}
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  variants={itemVariants}
                  delay={i * 0.1}
                  direction="left"
                />
              ))}
          </div>

          {/* Center image */}
          <div className="order-first flex items-center justify-center md:order-none">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              {/* Offset border */}
              <motion.div
                aria-hidden
                className="absolute -inset-3 border border-gold-400/50"
                initial={shouldReduce ? false : { opacity: 0, scale: 1.06 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE_EXPO }}
              />

              <motion.div
                className="relative aspect-[3/4] w-full overflow-hidden"
                initial={shouldReduce ? false : { scale: 0.96, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.0, delay: 0.3, ease: EASE_EXPO }}
                whileHover={shouldReduce ? {} : { scale: 1.02, transition: { duration: 0.4, ease: EASE_SMOOTH } }}
              >
                <Image
                  src="/images/sayan-nath-i7KUmMOiNFo-unsplash.jpg"
                  alt="Contemporary UK residential property representing the Luli Properties portfolio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 280px"
                />

                {/* Image overlay with CTA */}
                <motion.div
                  className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-neutral-900/60 to-transparent p-5"
                  initial={shouldReduce ? false : { opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.8, ease: EASE_SMOOTH }}
                >
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 bg-white px-4 py-2.5 font-body text-xs font-medium tracking-wide text-neutral-800 transition-colors duration-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
                  >
                    View Portfolio <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right services */}
          <div className="space-y-12">
            {services
              .filter(s => s.position === 'right')
              .map((s, i) => (
                <ServiceItem
                  key={`right-${i}`}
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  variants={itemVariants}
                  delay={i * 0.1}
                  direction="right"
                />
              ))}
          </div>

        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 gap-6 lg:grid-cols-4"
          initial="hidden"
          animate={isStatsInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {stats.map((stat, i) => (
            <StatCounter
              key={i}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.08}
            />
          ))}
        </motion.div>

        {/* CTA banner */}
        <motion.div
          className="mt-16 flex flex-col items-start justify-between gap-6 bg-sage-700 px-8 py-8 sm:flex-row sm:items-center lg:px-10"
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_SMOOTH }}
        >
          <div>
            <h3 className="mb-1 font-display text-2xl font-light text-white">
              Interested in investing with us?
            </h3>
            <p className="font-body text-sm text-white/65">
              We work with a focused group of investors. Get in touch to learn more.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2.5 bg-gold-400 px-6 py-3 font-body text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-700"
          >
            Register Interest
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

      </motion.div>
    </section>
  )
}

/* ── ServiceItem ─────────────────────────────── */

interface ServiceItemProps {
  icon:        ReactNode
  title:       string
  description: string
  variants:    Variants
  delay:       number
  direction:   'left' | 'right'
}

function ServiceItem({ icon, title, description, variants, delay, direction }: ServiceItemProps) {
  return (
    <motion.div
      className="group flex flex-col"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-sage-500/10 text-sage-500 transition-colors duration-300 group-hover:bg-sage-500/20">
          {icon}
        </div>
        <h3 className="font-body text-base font-medium text-neutral-800 transition-colors duration-300 group-hover:text-sage-600">
          {title}
        </h3>
      </div>

      <p className="pl-[3.25rem] font-body text-sm leading-relaxed text-neutral-600">
        {description}
      </p>

      <div className="mt-2.5 flex items-center gap-1 pl-[3.25rem] font-body text-xs font-medium text-sage-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Learn more <ArrowRight className="h-3 w-3" />
      </div>
    </motion.div>
  )
}

/* ── StatCounter ─────────────────────────────── */

interface StatCounterProps {
  icon:   ReactNode
  value:  number
  suffix: string
  label:  string
  delay:  number
}

function StatCounter({ icon, value, suffix, label, delay }: StatCounterProps) {
  const ref          = useRef<HTMLDivElement>(null)
  const isInView     = useInView(ref, { once: false })
  const shouldReduce = useReducedMotion()
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, { stiffness: 60, damping: 20 })
  const display = useTransform(spring, v => Math.floor(v))

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value)
      setHasAnimated(true)
    } else if (!isInView && hasAnimated) {
      spring.set(0)
      setHasAnimated(false)
    }
  }, [isInView, value, spring, hasAnimated])

  return (
    <motion.div
      className="group flex flex-col items-center bg-white/60 px-4 py-6 text-center transition-colors duration-300 hover:bg-white"
      variants={{
        hidden:  { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center bg-sage-500/8 text-sage-500 transition-colors duration-300 group-hover:bg-sage-500/15">
        {icon}
      </div>

      <div ref={ref} className="flex items-baseline gap-0.5 font-display text-3xl font-light text-neutral-800">
        {shouldReduce ? (
          <span>{value}{suffix}</span>
        ) : (
          <>
            <motion.span>{display}</motion.span>
            <span className="font-body text-sm font-medium text-sage-500">{suffix}</span>
          </>
        )}
      </div>

      <p className="mt-1.5 font-body text-xs text-neutral-500">{label}</p>

      <div
        aria-hidden
        className="mt-3 h-px w-8 bg-gold-400 transition-all duration-300 group-hover:w-12"
      />
    </motion.div>
  )
}
