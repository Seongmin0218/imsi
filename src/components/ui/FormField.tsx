import type { ReactNode } from 'react'

interface FormFieldProps {
  label?: ReactNode
  htmlFor?: string
  required?: boolean
  helperText?: ReactNode
  errorMessage?: ReactNode
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  htmlFor,
  required = false,
  helperText,
  errorMessage,
  children,
  className = '',
}: FormFieldProps) {
  const description = errorMessage ?? helperText

  return (
    <div className={['w-full space-y-2', className].join(' ')}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-black text-slate-700"
        >
          {label}
          {required && <span className="ml-1 text-rose-500">*</span>}
        </label>
      )}

      {children}

      {description && (
        <p
          className={[
            'text-xs font-semibold',
            errorMessage ? 'text-rose-500' : 'text-slate-400',
          ].join(' ')}
        >
          {description}
        </p>
      )}
    </div>
  )
}
