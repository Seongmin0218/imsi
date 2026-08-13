import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  error?: boolean
  showCount?: boolean
  maxLength?: number
}

export function Textarea({
  value = '',
  onChange,
  error = false,
  showCount = false,
  maxLength,
  className = '',
  disabled,
  rows = 5,
  ...props
}: TextareaProps) {
  return (
    <div className={['w-full space-y-2', className].join(' ')}>
      <textarea
        value={value}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        onChange={(event) => onChange?.(event.target.value)}
        className={[
          'w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700 outline-none transition',
          'placeholder:text-slate-400',
          error
            ? 'border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
            : 'border-slate-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100',
          'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400',
        ].join(' ')}
        {...props}
      />

      {showCount && maxLength && (
        <p className="text-right text-xs font-semibold text-slate-400">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  )
}
