import type { InputHTMLAttributes, ReactNode } from 'react'

interface SliderProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange'
  > {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: ReactNode
  showValue?: boolean
  valueLabel?: ReactNode
  helperText?: ReactNode
  className?: string
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  valueLabel,
  helperText,
  className = '',
  disabled,
  ...props
}: SliderProps) {
  const percent =
    max === min
      ? 0
      : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))

  return (
    <div className={['w-full space-y-3', className].join(' ')}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-4">
          {label && (
            <label className="text-sm font-black text-slate-700">{label}</label>
          )}

          {showValue && (
            <span className="text-sm font-black text-indigo-500">
              {valueLabel ?? value}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-slate-100" />
        <div
          className="absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-indigo-500"
          style={{ width: `${percent}%` }}
        />

        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(event) => onChange(Number(event.target.value))}
          className={[
            'relative z-10 h-2 w-full cursor-pointer appearance-none bg-transparent accent-indigo-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-500',
            '[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm',
            '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4',
            '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2',
            '[&::-moz-range-thumb]:border-indigo-500 [&::-moz-range-thumb]:bg-white',
          ].join(' ')}
          {...props}
        />
      </div>

      {helperText && (
        <p className="text-xs font-semibold text-slate-400">{helperText}</p>
      )}
    </div>
  )
}
