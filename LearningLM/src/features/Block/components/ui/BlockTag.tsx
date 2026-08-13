import { StatusBadge, type StatusBadgeVariant } from '../../../../components/ui/StatusBadge'

export interface SettingBlockTagCounts {
  required?: number
  optional?: number
  conditional?: number
  sortable?: number
  recommended?: number
  missing?: number
  error?: number
}

interface SettingBlockTagSummaryProps {
  counts: SettingBlockTagCounts
}

const tagDefinitions: Array<{
  key: keyof SettingBlockTagCounts
  label: string
  variant: StatusBadgeVariant
}> = [
  { key: 'required', label: '필수', variant: 'required' },
  { key: 'optional', label: '선택', variant: 'optional' },
  { key: 'recommended', label: '추천', variant: 'recommended' },
  { key: 'missing', label: '누락', variant: 'missing' },
  { key: 'error', label: '오류', variant: 'danger' },
]

export function BlockTag({ counts }: SettingBlockTagSummaryProps) {
  const visibleTags = tagDefinitions.filter(({ key }) => (counts[key] ?? 0) > 0)

  if (visibleTags.length === 0) return null

  return (
    <span className="flex flex-wrap gap-1.5">
      {visibleTags.map(({ key, label, variant }) => (
        <StatusBadge key={key} variant={variant}>
          {label} {counts[key]}
        </StatusBadge>
      ))}
    </span>
  )
}
