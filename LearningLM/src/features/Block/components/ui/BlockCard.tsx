import type { ReactNode } from 'react'

export interface BlockCardOption {
  label: ReactNode
  value: string
  icon: ReactNode
  description?: ReactNode
  disabled?: boolean
}

interface BlockCardProps {
  options: BlockCardOption[]
  title?: ReactNode
  code?: ReactNode
  description?: ReactNode
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  columns?: 1 | 2 | 3 | 4
  className?: string
}

const columnClassMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

export function BlockCard({
  options,
  title,
  code,
  description,
  value,
  onChange,
  disabled = false,
  columns = 3,
  className = '',
}: BlockCardProps) {
  return (
    <section className={className}>
      {(title || code || description) && (
        <header className="mb-5">
          <div className="flex items-start justify-between gap-4">
            {title && (
              <h3 className="text-xl font-bold tracking-[-0.03em] text-slate-800">
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
            <p className="mt-3 text-sm leading-5 text-slate-400">{description}</p>
          )}
        </header>
      )}
      <div
        role="radiogroup"
        className={['grid gap-2', columnClassMap[columns]].join(' ')}
      >
        {options.map((option) => {
        const selected = value === option.value
        const isDisabled = disabled || option.disabled

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={isDisabled}
            onClick={() => onChange?.(option.value)}
            className={[
              'flex min-h-[100px] flex-col items-center justify-center rounded-xl border-2 px-3 py-4 text-center outline-none transition focus-visible:ring-4 focus-visible:ring-indigo-100',
              selected
                ? 'border-indigo-500 bg-white text-indigo-600'
                : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-200',
              isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            ].join(' ')}
          >
            <span
              className={[
                'mb-2 flex h-8 w-8 items-center justify-center rounded-lg',
                selected
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-100 text-slate-600',
              ].join(' ')}
            >
              {option.icon}
            </span>
            <span className="block text-sm font-bold text-slate-700">{option.label}</span>
            {option.description && (
              <span className="mt-1 block text-xs leading-5 text-slate-400">
                {option.description}
              </span>
            )}
          </button>
        )
        })}
      </div>
    </section>
  )
}
