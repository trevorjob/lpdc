'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface LampContainerProps {
  children:   ReactNode
  className?: string
}

export function LampContainer({ children, className }: LampContainerProps) {
  const shouldReduce = useReducedMotion()

  return (
    <div className={cn('relative w-full overflow-hidden bg-neutral-900', className)}>

      {/* ── Lamp glow — absolute, never affects layout ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center"
        style={{ height: '28rem' }}          /* 448px — enough for cones + cover */
      >
        {/* scale-y to make beam look wider / more dramatic */}
        <div className="relative flex h-full w-full scale-y-[1.2] items-center justify-center">

          {/* Left cone */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0.4, width: '12rem' }}
            animate={{ opacity: 1, width: '30rem' }}
            transition={{ delay: 0.15, duration: 1.0, ease: 'easeInOut' }}
            style={{
              backgroundImage:
                'conic-gradient(from 70deg at center top, #C9A24A 0%, transparent 45%)',
              position: 'absolute',
              inset:    'auto',
              right:    '50%',
              height:   '14rem',
              overflow: 'visible',
            }}
          >
            <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-neutral-900 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-neutral-900 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>

          {/* Right cone */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0.4, width: '12rem' }}
            animate={{ opacity: 1, width: '30rem' }}
            transition={{ delay: 0.15, duration: 1.0, ease: 'easeInOut' }}
            style={{
              backgroundImage:
                'conic-gradient(from 290deg at center top, transparent 55%, #C9A24A 100%)',
              position: 'absolute',
              inset:    'auto',
              left:     '50%',
              height:   '14rem',
              overflow: 'visible',
            }}
          >
            <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-neutral-900 [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-neutral-900 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>

          {/* Cover below lamp — dark fill that hides cone lower half */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-neutral-900 blur-2xl" />

          {/* Wide ambient glow around the beam */}
          <div
            className="absolute inset-auto z-50 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              width:           '28rem',
              height:          '9rem',
              backgroundColor: '#C9A24A',
              opacity:         0.2,
            }}
          />

          {/* Hot centre blob */}
          <motion.div
            initial={shouldReduce ? false : { width: '8rem' }}
            animate={{ width: '16rem' }}
            transition={{ delay: 0.15, duration: 1.0, ease: 'easeInOut' }}
            style={{
              position:        'absolute',
              inset:           'auto',
              zIndex:          30,
              height:          '9rem',
              transform:       'translateY(-6rem)',
              borderRadius:    '9999px',
              backgroundColor: '#D4AF6A',
              filter:          'blur(2rem)',
              opacity:         0.6,
            }}
          />

          {/* Lamp line — the fixture */}
          <motion.div
            initial={shouldReduce ? false : { width: '12rem' }}
            animate={{ width: '30rem' }}
            transition={{ delay: 0.15, duration: 1.0, ease: 'easeInOut' }}
            style={{
              position:        'absolute',
              inset:           'auto',
              zIndex:          50,
              height:          '1.5px',
              transform:       'translateY(-7rem)',
              backgroundColor: '#C9A24A',
              opacity:         0.8,
            }}
          />

          {/* Dark cover that cleans up the cone edges below the lamp line */}
          <div
            className="absolute inset-auto z-40 w-full bg-neutral-900"
            style={{ height: '11rem', transform: 'translateY(-12.5rem)' }}
          />
        </div>
      </div>

      {/* ── Content — sits over the lamp glow ── */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
