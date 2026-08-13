import type {
  StudioNodeSlot,
  StudioStage,
} from '../../types/studioNode'

import {
  slotStateClassMap,
  studioStageMeta,
} from './studioNodeStyles'

interface StudioNodeSlotRowProps {
  slot: StudioNodeSlot
  stage: StudioStage
}

export function StudioNodeSlotRow({
  slot,
  stage,
}: StudioNodeSlotRowProps) {
  const stageMeta =
    studioStageMeta[stage]

  const slotState =
    slot.state ?? 'default'

  /*
   * 와이어프레임에서는 설정값이 존재할 때만
   * 슬롯 오른쪽에 실제 값이 표시됩니다.
   *
   * 값이 없을 때 "설정 필요", "필수", "선택" 같은
   * 임의 문구를 추가하지 않습니다.
   */
  const displayedValue =
    typeof slot.value === 'string'
      ? slot.value.trim()
      : ''

  return (
    <div
      className={[
        'flex h-11 items-center justify-between gap-3 rounded-[10px] border-[1.5px] px-3',
        slotStateClassMap[
          slotState
        ],
      ].join(' ')}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={[
            'h-2.5 w-2.5 shrink-0 rounded-[3px]',
            stageMeta.slotMarkClassName,
          ].join(' ')}
          aria-hidden="true"
        />

        <span className="truncate text-[15px] font-black text-[#27272A]">
          {slot.label}
        </span>
      </div>

      {displayedValue && (
        <span className="max-w-[145px] shrink-0 truncate text-[13px] font-medium text-[#A1A1AA]">
          {displayedValue}
        </span>
      )}
    </div>
  )
}