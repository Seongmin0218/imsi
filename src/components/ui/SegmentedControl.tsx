export interface SegmentedControlOption {
  label: string
  value: string
  disabled?: boolean
}

type SegmentedControlSize = 'sm' | 'md'

interface SegmentedControlProps {
  options: SegmentedControlOption[]
  value: string
  onChange: (value: string) => void
  size?: SegmentedControlSize
  disabled?: boolean
  className?: string
}

const sizeClassMap: Record<SegmentedControlSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
}

export function SegmentedControl({
  options,
  value,
  onChange,
  size = 'md',
  disabled = false,
  className = '',
}: SegmentedControlProps) {
  return (
    <div
      className={[
        'inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1',
        disabled ? 'opacity-60' : '',
        className,
      ].join(' ')}
      role="tablist"
    >
      {options.map((option) => {
        const isSelected = option.value === value
        const isDisabled = disabled || option.disabled

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={isDisabled}
            onClick={() => onChange(option.value)}
            className={[
              'rounded-lg font-black transition',
              sizeClassMap[size],
              isSelected
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-500 hover:bg-white hover:text-slate-800',
              isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            ].join(' ')}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
