import type { ReactNode } from 'react'

export interface ChoiceGroupOption {
  label: ReactNode
  value: string
  description?: ReactNode
  badge?: ReactNode
  disabled?: boolean
}

type ChoiceGroupVariant = 'button' | 'card'

interface ChoiceGroupProps {
  options: ChoiceGroupOption[]
  value: string
  onChange: (value: string) => void
  variant?: ChoiceGroupVariant
  disabled?: boolean
  className?: string
}

export function ChoiceGroup({
  options,
  value,
  onChange,
  variant = 'button',
  disabled = false,
  className = '',
}: ChoiceGroupProps) {
  return (
    <div
      className={[
        variant === 'card' ? 'grid gap-3 sm:grid-cols-2' : 'flex flex-wrap gap-2',
        className,
      ].join(' ')}
      role="radiogroup"
    >
      {options.map((option) => {
        const isSelected = option.value === value
        const isDisabled = disabled || option.disabled

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={isDisabled}
            onClick={() => onChange(option.value)}
            className={[
              'text-left transition',
              variant === 'card'
                ? 'rounded-2xl border p-4'
                : 'rounded-xl border px-4 py-2 text-sm font-black',
              isSelected
                ? 'border-indigo-400 bg-indigo-50 text-indigo-600 shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50',
              isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            ].join(' ')}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="font-black">{option.label}</span>
              {option.badge && <span>{option.badge}</span>}
            </span>

            {variant === 'card' && option.description && (
              <span className="mt-2 block text-xs font-semibold leading-5 text-slate-400">
                {option.description}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
