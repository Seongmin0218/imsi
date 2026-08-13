export interface ConnectedSegmentedControlOption {
  label: string
  value: string
  disabled?: boolean
}

interface ConnectedSegmentedControlProps {
  options: ConnectedSegmentedControlOption[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

export function ConnectedSegmentedControl({
  options,
  value,
  onChange,
  disabled = false,
  className = '',
}: ConnectedSegmentedControlProps) {
  return (
    <div
      className={[
        'grid w-full overflow-hidden rounded-xl border-2 border-slate-200 bg-white',
        disabled ? 'opacity-60' : '',
        className,
      ].join(' ')}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      role="tablist"
    >
      {options.map((option, index) => {
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
              'h-10 px-4 text-sm font-semibold transition',
              index > 0 ? 'border-l border-slate-200' : '',
              isSelected
                ? 'bg-[#6366F1] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50',
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
