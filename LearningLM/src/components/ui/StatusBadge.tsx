import type { HTMLAttributes, ReactNode } from 'react'

export type StatusBadgeVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'missing'
  | 'pending'
  | 'info'
  | 'required'
  | 'optional'
  | 'recommended'
  | 'muted'

type StatusBadgeSize = 'sm' | 'md'

interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: StatusBadgeVariant
  size?: StatusBadgeSize
  children: ReactNode
}

const variantClassMap: Record<StatusBadgeVariant, string> = {
  success: 'border-emerald-500 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-500 bg-amber-50 text-amber-700',
  danger: 'border-rose-500 bg-rose-50 text-rose-700',
  missing: 'border-amber-500 bg-amber-50 text-amber-700',
  pending: 'border-slate-300 bg-slate-100 text-slate-500',
  info: 'border-indigo-500 bg-indigo-50 text-indigo-700',
  required: 'border-emerald-500 bg-emerald-50 text-emerald-700',
  optional: 'border-slate-300 bg-slate-50 text-slate-500',
  recommended: 'border-emerald-500 bg-emerald-50 text-emerald-700',
  muted: 'border-slate-200 bg-slate-50 text-slate-400',
}

const sizeClassMap: Record<StatusBadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export function StatusBadge({
  variant = 'pending',
  size = 'sm',
  className = '',
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-md border font-black leading-none',
        variantClassMap[variant],
        sizeClassMap[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}