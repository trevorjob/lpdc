'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface WavePathProps extends React.ComponentProps<'div'> {
  /** Tailwind text-color class used for the stroke — defaults to gold */
  color?: string
  strokeWidth?: number
}

export function WavePath({
  className,
  color = 'text-gold-400',
  strokeWidth = 1.5,
  ...props
}: WavePathProps) {
  const pathRef      = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mutable animation state — no re-renders needed (direct SVG DOM manipulation)
  const state = useRef({ progress: 0, x: 0.5, time: Math.PI / 2, reqId: null as number | null })

  const getWidth = () =>
    containerRef.current?.getBoundingClientRect().width ?? window.innerWidth

  const setPath = (progress: number) => {
    if (!pathRef.current) return
    const w = getWidth()
    const { x } = state.current
    pathRef.current.setAttributeNS(
      null,
      'd',
      `M0 100 Q${w * x} ${100 + progress * 0.6}, ${w} 100`,
    )
  }

  useEffect(() => {
    setPath(0)
    // Re-draw on resize so the path always fits the container
    const onResize = () => setPath(state.current.progress)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t

  const onMouseEnter = () => {
    const s = state.current
    if (s.reqId !== null) {
      cancelAnimationFrame(s.reqId)
      s.reqId    = null
      s.progress = 0
      s.time     = Math.PI / 2
    }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    const s = state.current
    if (!pathRef.current) return
    const bounds = pathRef.current.getBoundingClientRect()
    s.x        = (e.clientX - bounds.left) / bounds.width
    s.progress += e.movementY
    setPath(s.progress)
  }

  const onMouseLeave = () => animateOut()

  const animateOut = () => {
    const s = state.current
    const newProgress = s.progress * Math.sin(s.time)
    s.progress = lerp(s.progress, 0, 0.025)
    s.time    += 0.2
    setPath(newProgress)
    if (Math.abs(s.progress) > 0.75) {
      s.reqId = requestAnimationFrame(animateOut)
    } else {
      s.progress = 0
      s.time     = Math.PI / 2
      s.reqId    = null
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative h-px w-full', className)}
      {...props}
    >
      {/* Invisible hover target — tall enough to catch the mouse above/below the line */}
      <div
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative -top-5 z-10 h-10 w-full cursor-none hover:-top-[150px] hover:h-[300px]"
        aria-hidden="true"
      />

      {/* SVG — tall enough to accommodate the max wave height */}
      <svg
        className={cn('pointer-events-none absolute -top-[100px] h-[300px] w-full', color)}
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          className="fill-none stroke-current"
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  )
}
