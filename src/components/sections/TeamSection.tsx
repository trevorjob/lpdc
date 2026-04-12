'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE_EXPO: [number, number, number, number]   = [0.19, 1, 0.22, 1]
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

/* ── data ─────────────────────────────────────── */

interface TeamMember {
  id:       string
  name:     string
  role:     string
  image:    string
  linkedin?: string
}

const TEAM: TeamMember[] = [
  {
    id:       '1',
    name:     'Lucas Harrington',
    role:     'Founder',
    image:    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=faces&q=80',
    linkedin: '#',
  },
  {
    id:       '2',
    name:     'Amara Osei',
    role:     'Investment Director',
    image:    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=faces&q=80',
    linkedin: '#',
  },
  {
    id:       '3',
    name:     'James Whitfield',
    role:     'Head of Sourcing',
    image:    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=faces&q=80',
    linkedin: '#',
  },
  {
    id:       '4',
    name:     'Sophie Adeyemi',
    role:     'Portfolio Manager',
    image:    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=faces&q=80',
    linkedin: '#',
  },
  {
    id:       '5',
    name:     'Daniel Okafor',
    role:     'Due Diligence Lead',
    image:    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=faces&q=80',
    linkedin: '#',
  },
  {
    id:       '6',
    name:     'Priya Sharma',
    role:     'Client Relations',
    image:    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=faces&q=80',
    linkedin: '#',
  },
]

/* ── TeamSection ───────────────────────────────── */

export function TeamSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const ref          = useRef<HTMLDivElement>(null)
  const inView       = useInView(ref, { once: true, margin: '-8% 0px' })
  const shouldReduce = useReducedMotion()

  /* Split into 3 staggered columns */
  const col1 = TEAM.filter((_, i) => i % 3 === 0)
  const col2 = TEAM.filter((_, i) => i % 3 === 1)
  const col3 = TEAM.filter((_, i) => i % 3 === 2)

  return (
    <section className="overflow-hidden bg-neutral-900 py-24 lg:py-36">
      <div ref={ref} className="mx-auto max-w-[1280px] px-6 lg:px-16">

        {/* Header */}
        <motion.p
          className="mb-5 font-body text-xs font-medium tracking-[0.2em] uppercase text-gold-400"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
        >
          Our Team
        </motion.p>

        <h2
          className="mb-16 font-display font-light leading-tight tracking-tight text-white lg:mb-20"
          style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
        >
          {['The people behind', 'the portfolio.'].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={shouldReduce ? false : { y: '110%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.1 + i * 0.12, ease: EASE_EXPO }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Showcase */}
        <motion.div
          className="flex flex-col gap-10 md:flex-row md:items-start md:gap-10 lg:gap-16"
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_SMOOTH }}
        >

          {/* Photo grid */}
          <div className="flex shrink-0 gap-2 overflow-x-auto pb-1 md:gap-3 md:pb-0">

            {/* Column 1 — no vertical offset */}
            <div className="flex flex-col gap-2 md:gap-3">
              {col1.map(m => (
                <PhotoCard
                  key={m.id}
                  member={m}
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                  className="h-[120px] w-[110px] sm:h-[140px] sm:w-[130px] md:h-[165px] md:w-[155px]"
                />
              ))}
            </div>

            {/* Column 2 — offset down */}
            <div className="mt-12 flex flex-col gap-2 md:mt-16 md:gap-3 lg:mt-[68px]">
              {col2.map(m => (
                <PhotoCard
                  key={m.id}
                  member={m}
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                  className="h-[132px] w-[122px] sm:h-[155px] sm:w-[145px] md:h-[182px] md:w-[172px]"
                />
              ))}
            </div>

            {/* Column 3 — half offset */}
            <div className="mt-6 flex flex-col gap-2 md:mt-8 md:gap-3 lg:mt-[32px]">
              {col3.map(m => (
                <PhotoCard
                  key={m.id}
                  member={m}
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                  className="h-[125px] w-[115px] sm:h-[146px] sm:w-[136px] md:h-[172px] md:w-[162px]"
                />
              ))}
            </div>
          </div>

          {/* Name list — fills remaining horizontal space */}
          <div className="flex min-w-0 flex-1 flex-col md:pt-2">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:gap-x-10 md:gap-x-12 md:gap-y-6">
              {TEAM.map(m => (
                <MemberRow
                  key={m.id}
                  member={m}
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>

            {/* Closing mark — fills vertical space */}
            <div className="mt-auto hidden pt-10 md:block">
              <div aria-hidden className="mb-4 h-px w-10 bg-gold-400/25" />
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-white/20">
                Luli Properties
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

/* ── PhotoCard ─────────────────────────────────── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member:    TeamMember
  className: string
  hoveredId: string | null
  onHover:   (id: string | null) => void
}) {
  const isActive = hoveredId === member.id
  const isDimmed = hoveredId !== null && !isActive

  return (
    <div
      className={cn(
        'relative shrink-0 cursor-pointer overflow-hidden transition-opacity duration-300',
        className,
        isDimmed ? 'opacity-50' : 'opacity-100'
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover transition-[filter] duration-500"
        style={{
          filter: isActive
            ? 'grayscale(0) brightness(1)'
            : 'grayscale(1) brightness(0.6)',
        }}
        sizes="(max-width: 640px) 115px, (max-width: 1024px) 145px, 172px"
      />

      {/* Gold corner accent on active */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-300',
          isActive ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div aria-hidden className="absolute left-2 top-2 h-5 w-5 border-l border-t border-gold-400/70" />
        <div aria-hidden className="absolute bottom-2 right-2 h-5 w-5 border-b border-r border-gold-400/70" />
      </div>
    </div>
  )
}

/* ── MemberRow ─────────────────────────────────── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member:    TeamMember
  hoveredId: string | null
  onHover:   (id: string | null) => void
}) {
  const isActive = hoveredId === member.id
  const isDimmed = hoveredId !== null && !isActive

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300',
        isDimmed ? 'opacity-30' : 'opacity-100'
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2.5">
        {/* Active pill */}
        <span
          className={cn(
            'h-[10px] shrink-0 transition-all duration-300',
            isActive
              ? 'w-5 bg-gold-400'
              : 'w-3.5 bg-white/20'
          )}
        />

        {/* Name */}
        <span
          className={cn(
            'font-body text-base font-medium leading-none tracking-tight transition-colors duration-300 md:text-[18px]',
            isActive ? 'text-white' : 'text-white/60'
          )}
        >
          {member.name}
        </span>

        {/* LinkedIn — slides in on hover */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            aria-label={`${member.name} on LinkedIn`}
            className={cn(
              'ml-0.5 flex h-6 w-6 items-center justify-center text-white/40 transition-all duration-200 hover:text-white',
              isActive
                ? 'translate-x-0 opacity-100'
                : '-translate-x-2 pointer-events-none opacity-0'
            )}
          >
            <LinkedinIcon />
          </a>
        )}
      </div>

      {/* Role */}
      <p className="mt-1.5 pl-[27px] font-body text-[9px] font-medium uppercase tracking-[0.2em] text-white/35 md:text-[10px]">
        {member.role}
      </p>
    </div>
  )
}

/* ── Inline LinkedIn SVG ───────────────────────── */

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="11"
      height="11"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
