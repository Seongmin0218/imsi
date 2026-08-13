import type { ButtonHTMLAttributes, ReactNode } from 'react'

type IconButtonVariant = 'ghost' | 'outline' | 'solid'
type IconButtonSize = 'sm' | 'md' | 'lg'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  variant?: IconButtonVariant
  size?: IconButtonSize
  selected?: boolean
  'aria-label': string
}

const sizeClassMap: Record<IconButtonSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

const variantClassMap: Record<IconButtonVariant, string> = {
  ghost: 'text-slate-500 hover:bg-slate-100 hover:text-slate-800',
  outline:
    'border border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-500',
  solid: 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-600',
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  selected = false,
  disabled,
  className = '',
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'inline-flex shrink-0 items-center justify-center rounded-xl font-black transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2',
        sizeClassMap[size],
        selected
          ? 'border border-indigo-200 bg-indigo-50 text-indigo-600'
          : variantClassMap[variant],
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ].join(' ')}
      {...props}
    >
      {icon ?? children}
    </button>
  )
}
