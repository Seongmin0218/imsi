import type {
  HTMLAttributes,
} from 'react'

import type {
  StudioNodeCardData,
} from '../../types/studioNode'

import {
  StudioNodeConnectionHandle,
} from './StudioNodeConnectionHandle'

import {
  StudioNodeFooter,
} from './StudioNodeFooter'

import {
  StudioNodeHeader,
} from './StudioNodeHeader'

import {
  StudioNodeSlotRow,
} from './StudioNodeSlotRow'

import {
  getNodeStateClassName,
} from './studioNodeStyles'

interface StudioNodeCardProps
  extends HTMLAttributes<HTMLDivElement> {
  node: StudioNodeCardData
  selected?: boolean
  showTargetHandle?: boolean
  showSourceHandle?: boolean
  footerLabel?: string
  interactiveHandles?: boolean
  targetHandleId?: string
  sourceHandleId?: string
  handlesConnectable?: boolean
}

export function StudioNodeCard({
  node,
  selected = false,
  showTargetHandle = true,
  showSourceHandle = true,
  footerLabel,
  interactiveHandles = false,
  targetHandleId,
  sourceHandleId,
  handlesConnectable = true,
  className = '',
  onClick,
  ...props
}: StudioNodeCardProps) {
  const nodeState =
    node.state ?? 'default'

  const isDisabled =
    nodeState === 'disabled' ||
    nodeState === 'pending'

  const nodeCanConnect =
    handlesConnectable &&
    !isDisabled

  /*
   * INPUT의 왼쪽 원과 OUTPUT의 오른쪽 원은
   * 와이어프레임상 표시하지만 실제 연결은 막습니다.
   */
  const targetCanConnect =
    nodeCanConnect &&
    node.stage !== 'INPUT'

  const sourceCanConnect =
    nodeCanConnect &&
    node.stage !== 'OUTPUT'

  return (
    <article
      tabIndex={
        onClick
          ? 0
          : undefined
      }
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) {
          return
        }

        if (
          event.key ===
            'Enter' ||
          event.key === ' '
        ) {
          event.preventDefault()

          onClick(
            event as unknown as React.MouseEvent<HTMLDivElement>,
          )
        }
      }}
      className={[
        'relative w-[340px] overflow-visible rounded-[18px] border-[1.5px] p-5 transition',
        onClick
          ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md'
          : '',
        getNodeStateClassName(
          nodeState,
          selected,
        ),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-node-state={
        nodeState
      }
      {...props}
    >
      {showTargetHandle && (
        <StudioNodeConnectionHandle
          stage={node.stage}
          position="left"
          disabled={isDisabled}
          interactive={
            interactiveHandles
          }
          handleId={
            targetHandleId
          }
          isConnectable={
            targetCanConnect
          }
        />
      )}

      {showSourceHandle && (
        <StudioNodeConnectionHandle
          stage={node.stage}
          position="right"
          disabled={isDisabled}
          interactive={
            interactiveHandles
          }
          handleId={
            sourceHandleId
          }
          isConnectable={
            sourceCanConnect
          }
        />
      )}

      <div className="flex flex-col gap-5">
        <StudioNodeHeader
          node={node}
          selected={selected}
        />

        <div className="space-y-2">
          {node.slots.map(
            (slot) => (
              <StudioNodeSlotRow
                key={slot.id}
                slot={slot}
                stage={
                  node.stage
                }
              />
            ),
          )}
        </div>

        <StudioNodeFooter
          stage={node.stage}
          disabled={isDisabled}
          label={footerLabel}
        />
      </div>
    </article>
  )
}