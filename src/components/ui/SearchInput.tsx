import { Search, X } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

type SearchInputSize = 'sm' | 'md'

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  size?: SearchInputSize
  showClearButton?: boolean
  onClear?: () => void
}

const sizeClassMap: Record<SearchInputSize, string> = {
  sm: 'h-9 pl-9 pr-9 text-sm',
  md: 'h-11 pl-11 pr-10 text-sm',
}

const iconSizeMap: Record<SearchInputSize, number> = {
  sm: 16,
  md: 18,
}

const iconPositionClassMap: Record<SearchInputSize, string> = {
  sm: 'left-3',
  md: 'left-4',
}

export function SearchInput({
  value = '',
  onChange,
  size = 'md',
  placeholder = '검색어를 입력하세요',
  showClearButton = true,
  onClear,
  className = '',
  disabled,
  ...props
}: SearchInputProps) {
  const hasValue = value.length > 0

  const handleClear = () => {
    onChange?.('')
    onClear?.()
  }

  return (
    <div className={['relative w-full', className].join(' ')}>
      <Search
        size={iconSizeMap[size]}
        className={[
          'pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400',
          iconPositionClassMap[size],
        ].join(' ')}
      />

      <input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        className={[
          'w-full rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 outline-none transition',
          'placeholder:text-slate-400',
          'focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100',
          'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400',
          sizeClassMap[size],
        ].join(' ')}
        {...props}
      />

      {showClearButton && hasValue && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="검색어 지우기"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
