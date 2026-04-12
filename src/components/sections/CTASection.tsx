'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import type React from 'react'
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const EASE_EXPO: [number, number, number, number]   = [0.19, 1, 0.22, 1]
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const SPRING_CONFIG = {
  type:       'spring' as const,
  stiffness:  90,
  damping:    18,
  mass:       0.8,
  restDelta:  0.005,
}

const fadeVariants: Variants = {
  hidden:  { opacity: 0, filter: 'blur(8px)', y: 8  },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0  },
}

const IMAGES = [
  { src: '/images/sayan-nath-i7KUmMOiNFo-unsplash.jpg',                                              alt: 'UK residential property exterior'    },
  { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=800&fit=crop&q=80',   alt: 'Contemporary UK house'               },
  { src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=800&fit=crop&q=80',   alt: 'Residential property in high-growth area' },
  { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=800&fit=crop&q=80',   alt: 'UK city skyline'                     },
]

const AREA_CLASSES = [
  'col-start-2 col-end-3 row-start-1 row-end-3',
  'col-start-1 col-end-2 row-start-2 row-end-4',
  'col-start-1 col-end-2 row-start-4 row-end-6',
  'col-start-2 col-end-3 row-start-3 row-end-5',
]

/* ── ContainerStagger ────────────────────────── */
const ContainerStagger = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ transition, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{
        staggerChildren: transition?.staggerChildren ?? 0.16,
        delayChildren:   transition?.delayChildren   ?? 0.1,
        ...transition,
      }}
      {...props}
    />
  )
)
ContainerStagger.displayName = 'ContainerStagger'

/* ── ContainerAnimated ───────────────────────── */
const ContainerAnimated = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ transition, className, ...props }, ref) => {
    const shouldReduce = useReducedMotion()
    return (
      <motion.div
        ref={ref}
        variants={
          shouldReduce
            ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
            : fadeVariants
        }
        transition={{ ...SPRING_CONFIG, duration: 0.45, ...transition }}
        className={className}
        {...props}
      />
    )
  }
)
ContainerAnimated.displayName = 'ContainerAnimated'

/* ── GalleryGrid ─────────────────────────────── */
const GalleryGrid = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-2 grid-rows-[50px_150px_50px_150px_50px] gap-3',
        className
      )}
      {...props}
    />
  )
)
GalleryGrid.displayName = 'GalleryGrid'

/* ── GalleryGridCell ─────────────────────────── */
interface GalleryGridCellProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  index:     number
  children?: React.ReactNode
}

const GalleryGridCell = forwardRef<HTMLDivElement, GalleryGridCellProps>(
  ({ className, index, children, ...props }, ref) => {
    const shouldReduce = useReducedMotion()
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        /* Delight: subtle scale lift on hover */
        whileHover={shouldReduce ? {} : { scale: 1.045 }}
        transition={{
          opacity: { duration: 0.55, delay: index * 0.14, ease: EASE_SMOOTH },
          scale:   { duration: 0.4,  ease: EASE_SMOOTH },
        }}
        className={cn('group relative cursor-default overflow-hidden', AREA_CLASSES[index], className)}
        {...props}
      >
        {children}
        {/* Delight: sage veil reveals on hover — restrained, on-brand */}
        <div
          aria-hidden
          className="absolute inset-0 bg-sage-700/25 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        />
        {/* Delight: gold corner pip appears on hover */}
        <div
          aria-hidden
          className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-gold-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </motion.div>
    )
  }
)
GalleryGridCell.displayName = 'GalleryGridCell'

/* ── CTASection ──────────────────────────────── */
export function CTASection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-neutral-50">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 lg:gap-24 lg:px-16 lg:py-36">

        {/* ── Text side ──────────────────────── */}
        <ContainerStagger>

          {/* Label */}
          <ContainerAnimated>
            <p className="mb-5 font-body text-xs font-medium tracking-[0.2em] uppercase text-sage-500">
              03 / Get In Touch
            </p>
          </ContainerAnimated>

          {/* Headline */}
          <ContainerAnimated>
            <h2
              className="font-display font-light leading-tight tracking-tight text-neutral-800"
              style={{ fontSize: 'clamp(2rem, 4vw, 4.25rem)' }}
            >
              Ready to start{' '}
              <em className="not-italic text-sage-600">investing?</em>
            </h2>
          </ContainerAnimated>

          {/* Gold rule */}
          <ContainerAnimated>
            <motion.div
              aria-hidden
              className="my-6 h-px origin-left bg-gold-400"
              style={{ width: '3rem' }}
              initial={shouldReduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE_EXPO }}
            />
          </ContainerAnimated>

          {/* Description */}
          <ContainerAnimated>
            <p className="mb-8 max-w-[42ch] font-body text-base leading-relaxed text-neutral-600">
              We work with a selective group of investors. Whether you have a
              specific property in mind or want to build a portfolio from
              scratch, get in touch and we will take it from there.
            </p>
          </ContainerAnimated>

          {/* CTA button */}
          <ContainerAnimated>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 bg-sage-500 px-7 py-3.5 font-body text-sm font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sage-600 hover:shadow-[0_8px_24px_rgba(78,112,80,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
            >
              Register Your Interest
              {/* Delight: arrow slides right on hover */}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </ContainerAnimated>

        </ContainerStagger>

        {/* ── Gallery side ────────────────────── */}
        <GalleryGrid>
          {IMAGES.map((img, i) => (
            <GalleryGridCell key={i} index={i}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 50vw, 22vw"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </GalleryGridCell>
          ))}
        </GalleryGrid>

      </div>
    </section>
  )
}
