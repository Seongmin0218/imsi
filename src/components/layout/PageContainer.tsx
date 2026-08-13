import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <main className={['mx-auto w-full max-w-7xl px-6 py-8', className].join(' ')}>
      {children}
    </main>
  )
}
