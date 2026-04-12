import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'sage' | 'gold' | 'outline-gold' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

const variantMap: Record<Variant, string> = {
  sage:         'bg-sage-500 text-white hover:bg-sage-600 focus-visible:ring-sage-500',
  gold:         'bg-gold-400 text-white hover:bg-gold-500 focus-visible:ring-gold-400',
  'outline-gold':'border border-gold-400 text-gold-600 hover:bg-gold-50 hover:text-gold-700 focus-visible:ring-gold-400',
  ghost:        'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 focus-visible:ring-neutral-400',
}

const sizeMap: Record<Size, string> = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-4 text-base',
}

const base =
  'inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide ' +
  'transition-colors duration-300 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant
  size?:     Size
  href?:     string
  external?: boolean
  children:  React.ReactNode
}

export function Button({
  variant  = 'sage',
  size     = 'md',
  href,
  external = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variantMap[variant], sizeMap[size], className)

  if (href) {
    return external ? (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
