import type { ReactNode } from 'react'
import { Typography } from '../ui/Typography'

interface ConditionalSectionProps {
  title: string
  selectedLabel: string
  visible?: boolean
  children: ReactNode
  className?: string
}

export function ConditionalSection({
  title,
  selectedLabel,
  visible = true,
  children,
  className = '',
}: ConditionalSectionProps) {
  if (!visible) return null

  return (
    <section className={['flex flex-col gap-[25px]', className].join(' ')}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-baseline gap-2">
          <Typography as="h3" variant="body2-long" weight="bold" className="text-slate-700">
            {title}
          </Typography>
          <Typography as="span" variant="caption" className="text-indigo-500">
            “{selectedLabel}” 선택됨
          </Typography>
        </div>

        <Typography as="span" variant="caption" className="shrink-0 text-amber-600">
          조건부
        </Typography>
      </div>

      {children}
    </section>
  )
}
