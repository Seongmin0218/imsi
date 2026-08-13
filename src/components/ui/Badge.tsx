import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant =
  | 'gray'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'levelBeginner'
  | 'levelBasic'
  | 'levelAdvanced'
type BadgeSize = 'sm' | 'md'



interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  children: ReactNode
}

const variantClass: Record<BadgeVariant, string> = {
  gray:
    'bg-slate-100 text-slate-600',

  green:
    'bg-emerald-50 text-emerald-600',

  blue:
    'bg-blue-50 text-blue-600',

  purple:
    'bg-indigo-50 text-indigo-600',

  pink:
    'bg-rose-50 text-rose-600',

  levelBeginner:
    'border border-[#5FAA81] bg-[#DFF2DF] text-[#5FAA81]',

  levelBasic:
    'border border-[#A9BDD4] bg-[#ECEEFF] text-[#A9BDD4]',

  levelAdvanced:
    'border border-[#EF8888] bg-[#FFE1E1] text-[#EF8888]',
}

const sizeClass: Record<BadgeSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-2.5 py-1.5 text-sm',
}

export function Badge({
  variant = 'gray',
  size = 'sm',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const isLevelVariant =
    variant === 'levelBeginner' ||
    variant === 'levelBasic' ||
    variant === 'levelAdvanced'
  return (
    <span
      className={[
        'inline-flex items-center rounded-lg',
        isLevelVariant
          ? 'font-black'
          : 'font-semibold',
        variantClass[variant],
        sizeClass[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}
