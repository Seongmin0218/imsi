import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl border border-slate-200 bg-white shadow-sm',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', ...props }: CardProps) {
  return (
    <div className={['px-5 pt-5', className].join(' ')} {...props}>
      {children}
    </div>
  )
}

export function CardBody({ children, className = '', ...props }: CardProps) {
  return (
    <div className={['px-5 py-4', className].join(' ')} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={['flex items-center justify-between px-5 pb-5', className].join(
        ' ',
      )}
      {...props}
    >
      {children}
    </div>
  )
}
