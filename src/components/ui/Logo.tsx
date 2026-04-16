import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'light' | 'dark'
  className?: string
  iconSize?: number
}

export function Logo({ variant = 'light', className, iconSize = 40 }: LogoProps) {
  const isDark = variant === 'dark'

  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400',
        className
      )}
    >
      {/* Icon mark */}
      <div className="shrink-0 p-1.5 transition-opacity duration-300 group-hover:opacity-90">
        <Image
          src="/images/logo_luli.png"
          alt=""
          width={iconSize}
          height={iconSize}
          className="object-contain"
          style={{ width: iconSize, height: iconSize }}
          priority
        />
      </div>

      {/* Separator */}
      <span
        aria-hidden
        className={cn(
          'h-8 w-px shrink-0',
          isDark ? 'bg-white/20' : 'bg-neutral-300'
        )}
      />

      {/* Company name */}
      <div className="min-w-0 transition-opacity duration-300 group-hover:opacity-80">
        <p className={cn('font-body text-[14px] font-medium leading-tight tracking-normal', isDark ? 'text-white' : 'text-sage-700')}>
          Luli Properties
        </p>
        <p className={cn('font-body text-[14px] font-medium leading-tight tracking-normal', isDark ? 'text-white' : 'text-sage-700')}>
          &amp; Dev. Co. Ltd.
        </p>
      </div>
    </Link>
  )
}
