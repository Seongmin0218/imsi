import type {
  StudioNodeState,
  StudioSlotState,
  StudioStage,
} from '../../types/studioNode'

export const studioStageMeta: Record<
  StudioStage,
  {
    label: string
    code: string
    nodeNumberClassName: string
    stageTextClassName: string
    slotMarkClassName: string
    footerClassName: string
    handleClassName: string
  }
> = {
  INPUT: {
    label: '입력',
    code: 'INPUT',
    nodeNumberClassName:
      'bg-[#4A5E8A] text-white',
    stageTextClassName:
      'text-[#4A5E8A]',
    slotMarkClassName:
      'bg-[#4A5E8A]',
    footerClassName:
      'text-[#4A5E8A]',
    handleClassName:
      'border-[#4A5E8A] bg-white',
  },

  CONTEXT: {
    label: '컨텍스트',
    code: 'CONTEXT',
    nodeNumberClassName:
      'bg-[#2F8190] text-white',
    stageTextClassName:
      'text-[#2F8190]',
    slotMarkClassName:
      'bg-[#2F8190]',
    footerClassName:
      'text-[#2F8190]',
    handleClassName:
      'border-[#2F8190] bg-white',
  },

  PROCESS: {
    label: '프로세스',
    code: 'PROCESS',
    nodeNumberClassName:
      'bg-[#6366F1] text-white',
    stageTextClassName:
      'text-[#6366F1]',
    slotMarkClassName:
      'bg-[#6366F1]',
    footerClassName:
      'text-[#6366F1]',
    handleClassName:
      'border-[#6366F1] bg-white',
  },

  REVIEW: {
    label: '검토',
    code: 'REVIEW',
    nodeNumberClassName:
      'bg-[#B07A2E] text-white',
    stageTextClassName:
      'text-[#B07A2E]',
    slotMarkClassName:
      'bg-[#B07A2E]',
    footerClassName:
      'text-[#B07A2E]',
    handleClassName:
      'border-[#B07A2E] bg-white',
  },

  OUTPUT: {
    label: '결과',
    code: 'OUTPUT',
    nodeNumberClassName:
      'bg-[#3C7A52] text-white',
    stageTextClassName:
      'text-[#3C7A52]',
    slotMarkClassName:
      'bg-[#3C7A52]',
    footerClassName:
      'text-[#3C7A52]',
    handleClassName:
      'border-[#3C7A52] bg-white',
  },
}

/*
 * 와이어프레임에서는 검증 실패 여부와 관계없이
 * 노드 외곽선은 기본 회색을 유지합니다.
 *
 * 필수 충족 상태는 헤더의 "필수 n/n"으로 표시하고,
 * 상세 오류는 우측 검증 패널에서 표시합니다.
 */
export const nodeStateClassMap: Record<
  StudioNodeState,
  string
> = {
  default:
    'border-[#E4E4E7] bg-white shadow-sm',

  selected:
    'border-[#6366F1] bg-white shadow-md ring-2 ring-[#E0E1FF]',

  complete:
    'border-[#E4E4E7] bg-white shadow-sm',

  warning:
    'border-[#E4E4E7] bg-white shadow-sm',

  missing:
    'border-[#E4E4E7] bg-white shadow-sm',

  error:
    'border-[#E4E4E7] bg-white shadow-sm',

  pending:
    'border-dashed border-[#D4D4DB] bg-white/80 shadow-sm',

  disabled:
    'border-dashed border-[#D4D4DB] bg-white/50 opacity-60 shadow-none',
}

export const nodeStatusVariantMap: Record<
  StudioNodeState,
  | 'success'
  | 'warning'
  | 'danger'
  | 'missing'
  | 'pending'
  | 'info'
  | 'muted'
> = {
  default: 'info',
  selected: 'info',
  complete: 'success',
  warning: 'warning',
  missing: 'missing',
  error: 'danger',
  pending: 'pending',
  disabled: 'muted',
}

/*
 * 슬롯도 검증 상태에 따라 붉거나 주황색으로 바꾸지 않습니다.
 * 모든 슬롯은 와이어프레임의 회색 테두리를 유지합니다.
 */
export const slotStateClassMap: Record<
  StudioSlotState,
  string
> = {
  default:
    'border-[#E4E4E7] bg-white',

  filled:
    'border-[#E4E4E7] bg-white',

  empty:
    'border-[#E4E4E7] bg-white',

  warning:
    'border-[#E4E4E7] bg-white',

  missing:
    'border-[#E4E4E7] bg-white',

  error:
    'border-[#E4E4E7] bg-white',
}

export function getNodeStateClassName(
  state: StudioNodeState = 'default',
  selected = false,
): string {
  if (selected) {
    return nodeStateClassMap.selected
  }

  return nodeStateClassMap[state]
}