import {
  StatusBadge,
  type StatusBadgeVariant,
} from '../../../../components/ui/StatusBadge'

import type {
  StudioNodeCardData,
} from '../../types/studioNode'

import {
  nodeStatusVariantMap,
  studioStageMeta,
} from './studioNodeStyles'

interface StudioNodeHeaderProps {
  node: StudioNodeCardData
  selected?: boolean
}

export function StudioNodeHeader({
  node,
  selected = false,
}: StudioNodeHeaderProps) {
  const stageMeta =
    studioStageMeta[node.stage]

  const nodeState =
    selected
      ? 'selected'
      : node.state ?? 'default'

  /*
   * 와이어프레임의 "필수 n/n"은
   * 필수 설정값의 입력 완료 수가 아니라
   * 현재 노드에 추가된 필수 블록 수를 뜻합니다.
   *
   * 따라서 slot.value나 slot.state는
   * 이 카운트에 사용하지 않습니다.
   */
  const requiredBlockCount =
    node.slots.filter(
      (slot) => slot.required,
    ).length

  const requiredBlockStatusLabel =
    requiredBlockCount > 0
      ? `필수 ${requiredBlockCount}/${requiredBlockCount}`
      : undefined

  /*
   * 검증 결과나 가이드 진행 상태처럼
   * 외부에서 명시적으로 statusLabel을 제공한 경우에는
   * 해당 문구를 우선 표시합니다.
   *
   * 예:
   * 완료
   * 설정 중
   * 대기
   * 통과
   * 경고 1
   * 오류 1
   * 미입력 1
   */
  const hasExplicitStatusLabel =
    typeof node.statusLabel ===
      'string' &&
    node.statusLabel.trim().length >
      0

  const statusLabel =
    hasExplicitStatusLabel
      ? node.statusLabel
      : requiredBlockStatusLabel

  /*
   * 일반 작성 상태의 "필수 n/n"은
   * 와이어프레임과 동일한 초록색 필수 배지를 사용합니다.
   *
   * 명시적인 상태 문구가 있으면
   * node.state에 대응하는 상태 색상을 사용합니다.
   */
  const statusVariant:
    StatusBadgeVariant =
    hasExplicitStatusLabel
      ? nodeStatusVariantMap[
          nodeState
        ]
      : 'required'

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3">
        <span
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black',
            stageMeta.nodeNumberClassName,
          ].join(' ')}
        >
          {node.order}
        </span>

        <div className="min-w-0">
          <h3 className="truncate text-base font-black text-slate-950">
            {node.title}
          </h3>

          <p className="mt-0.5 text-xs font-black text-slate-300">
            {stageMeta.code}
          </p>
        </div>
      </div>

      {statusLabel && (
        <StatusBadge
          variant={statusVariant}
          size="sm"
          className="shrink-0"
        >
          {statusLabel}
        </StatusBadge>
      )}
    </div>
  )
}