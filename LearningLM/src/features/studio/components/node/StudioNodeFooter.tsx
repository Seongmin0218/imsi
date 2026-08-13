import {
  ArrowRight,
} from 'lucide-react'

import type {
  StudioStage,
} from '../../types/studioNode'

import {
  studioStageMeta,
} from './studioNodeStyles'

interface StudioNodeFooterProps {
  stage: StudioStage
  disabled?: boolean
  label?: string
}

export function StudioNodeFooter({
  stage,
  disabled = false,
  label = '다음 단계로 전달',
}: StudioNodeFooterProps) {
  const stageMeta =
    studioStageMeta[stage]

  return (
    <div
      className={[
        '-mx-5 -mb-5 flex h-[58px] items-center justify-between border-t-[1.5px] border-dashed border-[#E4E4E7] px-5 text-[15px] font-black',
        disabled
          ? 'text-[#C4C4CC]'
          : stageMeta.footerClassName,
      ].join(' ')}
    >
      <span>{label}</span>

      <ArrowRight
        size={19}
        strokeWidth={3}
      />
    </div>
  )
}