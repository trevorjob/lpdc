"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

// ── Types ─────────────────────────────────────────────────────────────────
interface FeaturedSpotlightProps {
  label?:       string
  tag?:         string
  titleLine1?:  string
  titleLine2?:  string
  description?: string
  ctaLabel?:    string
  ctaHref?:     string
  imageSrc?:    string
  imageAlt?:    string
  index?:       string
  /** Controls entrance animation — set by the parent section via useInView */
  isInView?:    boolean
}

const easeExpo = "cubic-bezier(0.16, 1, 0.3, 1)"

// ── Component ─────────────────────────────────────────────────────────────
export function FeaturedSpotlight({
  label       = "Featured Investment",
  tag         = "Prime Asset",
  titleLine1  = "Riverfront",
  titleLine2  = "Collection.",
  description = "Premium HMO conversions in high-demand riverside districts. 9.2% projected yield.",
  ctaLabel    = "View Portfolio",
  ctaHref     = "/portfolio",
  imageSrc    = "/images/sayan-nath-i7KUmMOiNFo-unsplash.jpg",
  imageAlt    = "Featured investment property",
  index       = "01",
  isInView    = true,
}: FeaturedSpotlightProps) {
  const [isHovered, setIsHovered]     = useState(false)
  const prefersReduced                = useReducedMotion()

  // Never trigger hover microinteractions when reduced motion is preferred
  const hovered = prefersReduced ? false : isHovered

  return (
    <motion.div
      className="relative flex cursor-default flex-col items-center gap-8 md:flex-row md:items-start md:gap-12 lg:gap-20"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* ── Left: text ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex w-full max-w-[320px] shrink-0 flex-col items-center text-center md:w-[260px] md:items-start md:text-left lg:w-[300px] lg:pt-4">

        {/* Label row with animated gold line */}
        <div className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
          <div
            className="h-px bg-gold-400 transition-all duration-700"
            style={{
              width:                    hovered ? 48 : 32,
              transitionTimingFunction: easeExpo,
            }}
          />
          <span
            className="font-body text-[10px] font-medium uppercase text-sage-500 md:text-xs"
            style={{
              letterSpacing:            hovered ? "0.3em" : "0.25em",
              transition:               "letter-spacing 700ms",
              transitionTimingFunction: easeExpo,
            }}
          >
            {tag}
          </span>
        </div>

        {/* Two-line heading — Cormorant, same style as hero phrases */}
        <h2 className="relative mb-0">
          <span
            className="block font-display font-light tracking-tight text-neutral-800 transition-all duration-700"
            style={{
              fontSize:                 "clamp(2.5rem, 3.5vw, 4rem)",
              lineHeight:               1.08,
              transform:                hovered ? "translateY(-2px)" : "translateY(0)",
              transitionTimingFunction: easeExpo,
            }}
          >
            {titleLine1}
          </span>
          <span
            className="block font-display font-light italic tracking-tight text-sage-700 transition-all duration-700"
            style={{
              fontSize:                 "clamp(2.5rem, 3.5vw, 4rem)",
              lineHeight:               1.08,
              transform:                hovered ? "translateX(12px)" : "translateX(0)",
              transitionTimingFunction: easeExpo,
            }}
          >
            {titleLine2}
          </span>
        </h2>

        {/* Description */}
        <p
          className="mt-6 max-w-[260px] font-body text-sm leading-relaxed transition-all duration-700 md:mt-8 lg:mt-10"
          style={{
            color:                    hovered ? "#635A52" : "#B8ADA0",
            transform:                hovered ? "translateY(-4px)" : "translateY(0)",
            transitionTimingFunction: easeExpo,
          }}
        >
          {description}
        </p>

        {/* CTA row */}
        <div className="mt-6 flex items-center gap-4 md:mt-8 lg:mt-10">
          <Link
            href={ctaHref}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 md:h-11 md:w-11 lg:h-12 lg:w-12"
            style={{
              borderColor:              hovered ? "#4E7050" : "rgba(184,173,160,0.35)",
              backgroundColor:          hovered ? "#4E7050" : "transparent",
              color:                    hovered ? "#FAF8F5" : "#3F3830",
              transform:                hovered ? "scale(1.05)" : "scale(1)",
              boxShadow:                hovered ? "0 8px 32px rgba(78,112,80,0.2)" : "none",
              transitionTimingFunction: easeExpo,
            }}
            aria-label={ctaLabel}
          >
            <ArrowUpRight
              className="h-3.5 w-3.5 md:h-4 md:w-4"
              style={{
                transform:                hovered ? "rotate(45deg)" : "rotate(0deg)",
                transition:               "transform 500ms",
                transitionTimingFunction: easeExpo,
              }}
            />
          </Link>

          <span
            className="font-body text-[10px] font-medium uppercase tracking-widest text-neutral-600 transition-all duration-700 md:text-xs"
            style={{
              opacity:                  hovered ? 1 : 0.45,
              transform:                hovered ? "translateX(0)" : "translateX(-8px)",
              transitionTimingFunction: easeExpo,
              transitionDelay:          hovered ? "100ms" : "0ms",
            }}
          >
            {ctaLabel}
          </span>
        </div>
      </div>

      {/* ── Right: image ──────────────────────────────────────────────────── */}
      <div
        className="relative transition-all duration-700"
        style={{
          transform:                hovered ? "translateX(4px) translateY(-4px)" : "translateX(0) translateY(0)",
          transitionTimingFunction: easeExpo,
        }}
      >
        {/* Gold frame outline — appears on hover */}
        <div
          className="pointer-events-none absolute -inset-3 border transition-all duration-700 md:-inset-4"
          style={{
            borderColor:              hovered ? "rgba(201,162,74,0.35)" : "transparent",
            transform:                hovered ? "scale(1.01)" : "scale(1)",
            transitionTimingFunction: easeExpo,
          }}
          aria-hidden="true"
        />

        {/* Image */}
        <div className="relative h-[280px] w-[260px] overflow-hidden sm:h-[320px] sm:w-[300px] md:h-[380px] md:w-[340px] lg:h-[460px] lg:w-[420px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, (max-width: 1024px) 340px, 420px"
            className="object-cover"
            style={{
              objectPosition:           "65% 40%",
              transform:                hovered ? "scale(1.03)" : "scale(1)",
              transition:               "transform 1000ms",
              transitionTimingFunction: easeExpo,
            }}
          />

          {/* Subtle dark overlay on hover */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent transition-opacity duration-700"
            style={{ opacity: hovered ? 1 : 0 }}
            aria-hidden="true"
          />

          {/* Gold corner accents — top-left */}
          <div
            className="pointer-events-none absolute left-3 top-3 h-6 w-px bg-gold-400 transition-all duration-500"
            style={{
              opacity:                  hovered ? 1 : 0,
              transform:                hovered ? "scaleY(1)" : "scaleY(0)",
              transformOrigin:          "top",
              transitionTimingFunction: easeExpo,
              transitionDelay:          "50ms",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-3 top-3 h-px w-6 bg-gold-400 transition-all duration-500"
            style={{
              opacity:                  hovered ? 1 : 0,
              transform:                hovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin:          "left",
              transitionTimingFunction: easeExpo,
              transitionDelay:          "100ms",
            }}
            aria-hidden="true"
          />

          {/* Gold corner accents — bottom-right */}
          <div
            className="pointer-events-none absolute bottom-3 right-3 h-6 w-px bg-gold-400 transition-all duration-500"
            style={{
              opacity:                  hovered ? 1 : 0,
              transform:                hovered ? "scaleY(1)" : "scaleY(0)",
              transformOrigin:          "bottom",
              transitionTimingFunction: easeExpo,
              transitionDelay:          "150ms",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-3 right-3 h-px w-6 bg-gold-400 transition-all duration-500"
            style={{
              opacity:                  hovered ? 1 : 0,
              transform:                hovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin:          "right",
              transitionTimingFunction: easeExpo,
              transitionDelay:          "200ms",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Index number */}
        <span
          className="absolute -bottom-7 right-0 font-display text-sm text-neutral-400 transition-all duration-700 md:-bottom-9 md:text-base"
          style={{
            opacity:                  hovered ? 1 : 0.35,
            transform:                hovered ? "translateY(10px)" : "translateY(0)",
            transitionTimingFunction: easeExpo,
          }}
          aria-hidden="true"
        >
          {index}
        </span>
      </div>
    </motion.div>
  )
}
