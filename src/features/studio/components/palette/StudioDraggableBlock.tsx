import {
  useState,
  type DragEvent,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react'
import { GripVertical } from 'lucide-react'

import { Card } from '../../../../components/ui/Card'
import {
  StatusBadge,
  type StatusBadgeVariant,
} from '../../../../components/ui/StatusBadge'

import { studioStageMeta } from '../node/studioNodeStyles'

import {
  STUDIO_BLOCK_DRAG_MIME_TYPE,
  studioBlockAvailabilityLabelMap,
  studioBlockRequirementLabelMap,
  type StudioBlockDefinition,
  type StudioBlockDragPayload,
} from '../../types/studioBlock'

interface StudioDraggableBlockProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    | 'children'
    | 'onClick'
    | 'onDragStart'
    | 'onDragEnd'
    | 'onKeyDown'
  > {
  /**
   * 렌더링할 팔레트 블록 정의입니다.
   */
  block: StudioBlockDefinition

  /**
   * availability와 별개로 외부에서 블록을 비활성화할 때 사용합니다.
   */
  disabled?: boolean

  /**
   * 팔레트에서 현재 선택된 블록인지 표시합니다.
   */
  selected?: boolean

  /**
   * 블록을 클릭하거나 키보드로 선택했을 때 실행됩니다.
   */
  onBlockClick?: (
    block: StudioBlockDefinition,
  ) => void

  /**
   * 드래그가 시작된 직후 실행됩니다.
   */
  onBlockDragStart?: (
    block: StudioBlockDefinition,
    event: DragEvent<HTMLDivElement>,
  ) => void

  /**
   * 드래그가 끝난 직후 실행됩니다.
   */
  onBlockDragEnd?: (
    block: StudioBlockDefinition,
    event: DragEvent<HTMLDivElement>,
  ) => void
}

interface BlockBadgeData {
  label: string
  variant: StatusBadgeVariant
}

const requirementBadgeVariantMap: Record<
  StudioBlockDefinition['requirement'],
  StatusBadgeVariant
> = {
  required: 'required',
  recommended: 'recommended',
  optional: 'optional',
}

function getBlockBadgeData(
  block: StudioBlockDefinition,
): BlockBadgeData {
  if (block.availability === 'coming-soon') {
    return {
      label:
        studioBlockAvailabilityLabelMap[
          block.availability
        ],
      variant: 'muted',
    }
  }

  return {
    label:
      studioBlockRequirementLabelMap[
        block.requirement
      ],
    variant:
      requirementBadgeVariantMap[
        block.requirement
      ],
  }
}

export function StudioDraggableBlock({
  block,
  disabled = false,
  selected = false,
  onBlockClick,
  onBlockDragStart,
  onBlockDragEnd,
  className = '',
  ...props
}: StudioDraggableBlockProps) {
  const [isDragging, setIsDragging] =
    useState(false)

  const stageMeta =
    studioStageMeta[block.stage]

  const badgeData =
    getBlockBadgeData(block)

  const isAvailable =
    block.availability === 'available'

  const isDisabled =
    disabled || !isAvailable

  const canSelect =
    !isDisabled &&
    typeof onBlockClick === 'function'

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    if (isDisabled) {
      event.preventDefault()
      return
    }

    const payload: StudioBlockDragPayload = {
      blockId: block.id,
    }

    event.dataTransfer.effectAllowed = 'copy'

    event.dataTransfer.setData(
      STUDIO_BLOCK_DRAG_MIME_TYPE,
      JSON.stringify(payload),
    )

    event.dataTransfer.setData(
      'text/plain',
      block.id,
    )

    setIsDragging(true)

    onBlockDragStart?.(
      block,
      event,
    )
  }

  const handleDragEnd = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    setIsDragging(false)

    onBlockDragEnd?.(
      block,
      event,
    )
  }

  const handleClick = () => {
    if (!canSelect) {
      return
    }

    onBlockClick?.(block)
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (!canSelect) {
      return
    }

    if (
      event.key !== 'Enter' &&
      event.key !== ' '
    ) {
      return
    }

    event.preventDefault()

    onBlockClick?.(block)
  }

  return (
    <Card
      {...props}
      draggable={!isDisabled}
      role={canSelect ? 'button' : undefined}
      tabIndex={canSelect ? 0 : -1}
      aria-disabled={isDisabled}
      data-block-id={block.id}
      data-block-stage={block.stage}
      data-block-requirement={
        block.requirement
      }
      data-block-availability={
        block.availability
      }
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={[
        'group relative select-none border-slate-200 px-4 py-3 shadow-none transition',
        isDisabled
          ? 'cursor-not-allowed bg-slate-50 opacity-60'
          : 'cursor-grab bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:cursor-grabbing',
        selected
          ? 'border-indigo-500 ring-2 ring-indigo-100'
          : '',
        isDragging
          ? 'scale-[0.98] border-indigo-400 opacity-60 ring-4 ring-indigo-100'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            'mt-0.5 flex h-8 w-6 shrink-0 items-center justify-center rounded-md transition',
            isDisabled
              ? 'text-slate-300'
              : 'text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600',
          ].join(' ')}
          aria-hidden="true"
        >
          <GripVertical size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <span
              className={[
                'mt-1.5 h-3 w-3 shrink-0 rounded',
                stageMeta.slotMarkClassName,
              ].join(' ')}
              aria-hidden="true"
            />

            <p className="min-w-0 flex-1 truncate text-sm font-black text-slate-800">
              {block.title}
            </p>

            <StatusBadge
              variant={badgeData.variant}
              size="sm"
              className="shrink-0"
            >
              {badgeData.label}
            </StatusBadge>
          </div>

          <p className="mt-1.5 line-clamp-2 pl-5 text-xs font-semibold leading-5 text-slate-400">
            {block.description}
          </p>
        </div>
      </div>

      {isDragging && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-dashed border-indigo-400"
          aria-hidden="true"
        />
      )}
    </Card>
  )
}