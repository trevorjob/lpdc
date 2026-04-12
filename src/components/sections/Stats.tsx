'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface StatItem {
  prefix?:  string
  value:    number
  suffix?:  string
  label:    string
}

const stats: StatItem[] = [
  { prefix: '£', value: 38,  suffix: 'M+', label: 'Assets Under Management' },
  { value: 124,  suffix: '+',              label: 'Tenants & Counting'       },
  { value: 97,   suffix: '%',              label: 'Occupancy Rate'           },
  { value: 14,                             label: 'Sites Across the UK'      },
]

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

// ── Count-up hook ─────────────────────────────────────────────────────────
// delay: ms to wait after `started` becomes true before counting begins.
// Respects prefers-reduced-motion by jumping straight to the target value.
function useCountUp(
  target:   number,
  duration: number,
  delay:    number,
  started:  boolean,
) {
  const [count, setCount] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!started) return

    if (prefersReduced) {
      setCount(target)
      return
    }

    let rafId: number
    const timer = window.setTimeout(() => {
      let startTime: number | null = null

      const step = (ts: number) => {
        if (!startTime) startTime = ts
        const progress = Math.min((ts - startTime) / duration, 1)
        const eased    = 1 - Math.pow(1 - progress, 4) // ease-out-quart
        setCount(Math.round(eased * target))
        if (progress < 1) rafId = requestAnimationFrame(step)
      }

      rafId = requestAnimationFrame(step)
    }, delay)

    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(rafId)
    }
  }, [started, target, duration, delay, prefersReduced])

  return count
}

// ── Individual stat ───────────────────────────────────────────────────────
interface StatCounterProps extends StatItem {
  started: boolean
  index:   number
}

function StatCounter({ prefix, value, suffix, label, started, index }: StatCounterProps) {
  // Entrance: stagger 120ms between each block, first fires at 200ms
  const entranceDelay = 0.2 + index * 0.12

  // Count starts 400ms after this block's entrance begins:
  // the number materialises as the block fades in, creating a connected feel
  const countDelay = (entranceDelay + 0.4) * 1000

  const count = useCountUp(value, 1400, countDelay, started)

  return (
    <motion.div
      className="flex flex-col items-center text-center px-6 py-8 lg:py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay: entranceDelay }}
    >
      {/* Number — aria-label always shows final value for screen readers */}
      <div
        className="font-display font-light leading-none text-sage-700 mb-4"
        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
        aria-label={`${prefix ?? ''}${value}${suffix ?? ''}`}
        aria-live="off"
      >
        {prefix && <span className="text-gold-400">{prefix}</span>}
        {count}
        {suffix && <span className="text-gold-400">{suffix}</span>}
      </div>

      {/* Label — fades in with a small offset after the number appears */}
      <motion.p
        className="label-upper text-sage-600 text-[11px]"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease, delay: entranceDelay + 0.25 }}
      >
        {label}
      </motion.p>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────
export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      className="bg-sage-50 section-py"
      aria-labelledby="stats-heading"
    >
      <div className="container-site">

        {/* Header — label first, heading 100ms later */}
        <div className="text-center mb-14">
          <motion.span
            className="label-upper text-sage-500 block mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease, delay: 0 }}
          >
            Our Journey
          </motion.span>
          <motion.h2
            id="stats-heading"
            className="heading-section max-w-lg mx-auto"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
          >
            A track record built on performance.
          </motion.h2>
        </div>

        {/* Stats grid — thin gold dividers between columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-gold-200">
          {stats.map((stat, i) => (
            <StatCounter
              key={stat.label}
              {...stat}
              started={isInView}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
