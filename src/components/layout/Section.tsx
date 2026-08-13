import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'

interface SectionProps {
  title: string
  description?: string
  actionLabel?: string
  onActionClick?: () => void
  children: ReactNode
  className?: string
}

export function Section({
  title,
  description,
  actionLabel,
  onActionClick,
  children,
  className = '',
}: SectionProps) {
  return (
    <section className={['space-y-5', className].join(' ')}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>

        {actionLabel && (
          <Button
            variant="link"
            rightIcon={<ArrowRight size={16} />}
            onClick={onActionClick}
          >
            {actionLabel}
          </Button>
        )}
      </div>

      {children}
    </section>
  )
}
