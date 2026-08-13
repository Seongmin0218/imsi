import type { InputHTMLAttributes, ReactNode } from 'react'

type TextInputSize = 'sm' | 'md'

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  size?: TextInputSize
  error?: boolean
  leftContent?: ReactNode
  rightContent?: ReactNode
}

const sizeClassMap: Record<TextInputSize, string> = {
  sm: 'h-9 text-sm',
  md: 'h-11 text-sm',
}

export function TextInput({
  value = '',
  onChange,
  size = 'md',
  error = false,
  leftContent,
  rightContent,
  className = '',
  disabled,
  ...props
}: TextInputProps) {
  return (
    <div className={['relative w-full', className].join(' ')}>
      {leftContent && (
        <div className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-slate-400">
          {leftContent}
        </div>
      )}

      <input
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        className={[
          'w-full rounded-xl border bg-white px-4 font-semibold text-slate-700 outline-none transition',
          'placeholder:text-slate-400',
          leftContent ? 'pl-10' : '',
          rightContent ? 'pr-10' : '',
          error
            ? 'border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
            : 'border-slate-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100',
          'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400',
          sizeClassMap[size],
        ].join(' ')}
        {...props}
      />

      {rightContent && (
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center text-slate-400">
          {rightContent}
        </div>
      )}
    </div>
  )
}
