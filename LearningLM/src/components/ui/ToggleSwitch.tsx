import type { ReactNode } from 'react'

type ToggleSwitchSize = 'sm' | 'md'

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
  description?: ReactNode
  labelClassName?: string
  descriptionClassName?: string
  size?: ToggleSwitchSize
  disabled?: boolean
  className?: string
}

const trackSizeClassMap: Record<ToggleSwitchSize, string> = {
  sm: 'h-6 w-11',
  md: 'h-7 w-12',
}

const thumbSizeClassMap: Record<ToggleSwitchSize, string> = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
}

const thumbTranslateClassMap: Record<ToggleSwitchSize, string> = {
  sm: 'translate-x-5',
  md: 'translate-x-5',
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
  labelClassName = '',
  descriptionClassName = '',
  size = 'md',
  disabled = false,
  className = '',
}: ToggleSwitchProps) {
  return (
    <label
      className={[
        'inline-flex items-center gap-3',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className,
      ].join(' ')}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          'relative shrink-0 rounded-full transition',
          trackSizeClassMap[size],
          checked ? 'bg-indigo-500' : 'bg-slate-200',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <span
          className={[
            'absolute left-0.5 top-0.5 rounded-full bg-white shadow-sm transition',
            thumbSizeClassMap[size],
            checked ? thumbTranslateClassMap[size] : 'translate-x-0',
          ].join(' ')}
        />
      </button>

      {(label || description) && (
        <span className="flex flex-col">
          {label && (
            <span
              className={['text-sm font-black text-slate-700', labelClassName].join(' ')}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className={[
                'text-xs font-semibold text-slate-400',
                descriptionClassName,
              ].join(' ')}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  )
}
