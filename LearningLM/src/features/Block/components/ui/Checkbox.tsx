import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

export interface CheckboxOption {
  label: ReactNode
  value: string
  description?: ReactNode
  disabled?: boolean
}

interface CheckboxProps {
  options: CheckboxOption[]
  title?: ReactNode
  code?: ReactNode
  description?: ReactNode
  value?: string[]
  onChange?: (value: string[]) => void
  selectionMode?: 'single' | 'multiple'
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Checkbox({
  options,
  title,
  code,
  description,
  value = [],
  onChange,
  selectionMode = 'multiple',
  disabled = false,
  orientation = 'vertical',
  className = '',
}: CheckboxProps) {
  const toggle = (optionValue: string) => {
    onChange?.(
      value.includes(optionValue)
        ? value.filter((item) => item !== optionValue)
        : selectionMode === 'single'
          ? [optionValue]
          : [...value, optionValue],
    )
  }

  return (
    <section className={className}>
      {(title || code || description) && (
        <header className="mb-4">
          <div className="flex items-start justify-between gap-4">
            {title && (
              <h3 className="text-base font-bold tracking-[-0.03em] text-slate-800">
                {title}
              </h3>
            )}
            {code && (
              <span className="shrink-0 text-xs font-medium text-slate-400">
                {code}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-2 text-xs leading-5 text-slate-400">{description}</p>
          )}
        </header>
      )}
      <div
        className={
          orientation === 'horizontal'
            ? 'flex flex-wrap gap-2'
            : 'space-y-2'
        }
      >
        {options.map((option) => {
          const isDisabled = disabled || option.disabled
          const isSelected = value.includes(option.value)

          return (
            <label
              key={option.value}
              className={[
                'flex min-h-[76px] items-center gap-3 rounded-[10px] border-2 bg-white px-4 py-3 text-sm outline-none transition focus-within:ring-4 focus-within:ring-indigo-100',
                orientation === 'horizontal' ? 'min-w-36 flex-1' : 'w-full',
                isSelected
                  ? 'border-indigo-500'
                  : 'border-slate-200 hover:border-indigo-200',
                isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              ].join(' ')}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => toggle(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={[
                  'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 transition',
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500 text-white'
                    : 'border-slate-300 bg-white text-transparent',
                  isDisabled ? 'opacity-50' : '',
                ].join(' ')}
              >
                <Check size={13} strokeWidth={3} />
              </span>
              <span className="min-w-0">
                <span className="block font-bold text-slate-700">
                  {option.label}
                </span>
                {option.description && (
                  <span className="mt-1 block text-xs leading-5 text-slate-400">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          )
        })}
      </div>
    </section>
  )
}
