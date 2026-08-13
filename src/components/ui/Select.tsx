import { ChevronDown } from 'lucide-react'
import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

type SelectSize = 'sm' | 'md'

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'> {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  size?: SelectSize
  error?: boolean
}

const sizeClassMap: Record<SelectSize, string> = {
  sm: 'h-9 text-sm',
  md: 'h-11 text-sm',
}

export function Select({
  options,
  value = '',
  onChange,
  placeholder = '선택하세요',
  size = 'md',
  error = false,
  className = '',
  disabled,
  ...props
}: SelectProps) {
  return (
    <div className={['relative w-full', className].join(' ')}>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        className={[
          'w-full appearance-none rounded-xl border bg-white px-4 pr-10 font-semibold text-slate-700 outline-none transition',
          value.length === 0 ? 'text-slate-400' : 'text-slate-700',
          error
            ? 'border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
            : 'border-slate-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100',
          'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400',
          sizeClassMap[size],
        ].join(' ')}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  )
}
