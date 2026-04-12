'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

type WavePathProps = React.ComponentProps<'div'>

export function WavePath({ className, ...props }: WavePathProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef      = useRef<SVGPathElement>(null)

  let progress = 0
  let x        = 0.5
  let time     = Math.PI / 2
  let reqId: number | null = null

  const getWidth = () =>
    containerRef.current?.getBoundingClientRect().width ?? window.innerWidth * 0.7

  const setPath = (prog: number) => {
    const w = getWidth()
    pathRef.current?.setAttributeNS(
      null,
      'd',
      `M0 100 Q${w * x} ${100 + prog * 1.2}, ${w} 100`
    )
  }

  useEffect(() => {
    setPath(0)
    // Re-draw on resize
    const ro = new ResizeObserver(() => setPath(progress))
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t

  const manageMouseEnter = () => {
    if (reqId) { cancelAnimationFrame(reqId); resetAnimation() }
  }

  const manageMouseMove = (e: React.MouseEvent) => {
    const { movementY, clientX } = e
    const bound = pathRef.current?.getBoundingClientRect()
    if (bound) x = (clientX - bound.left) / bound.width
    progress += movementY
    setPath(progress)
  }

  const manageMouseLeave = () => { animateOut() }

  const animateOut = () => {
    const newProg = progress * Math.sin(time)
    progress      = lerp(progress, 0, 0.025)
    time         += 0.2
    setPath(newProg)
    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut)
    } else {
      resetAnimation()
    }
  }

  const resetAnimation = () => {
    time     = Math.PI / 2
    progress = 0
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative h-px w-full', className)}
      {...props}
    >
      {/* Invisible hit-area that intercepts mouse */}
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="absolute -top-10 left-0 z-10 h-20 w-full"
      />
      {/* Wave SVG — 200px tall, centred on the h-px baseline */}
      <svg
        className="pointer-events-none absolute left-0 w-full overflow-visible"
        style={{ top: '-100px', height: '200px' }}
      >
        <path
          ref={pathRef}
          className="fill-none stroke-current"
          strokeWidth={1.5}
        />
      </svg>
    </div>
  )
}
