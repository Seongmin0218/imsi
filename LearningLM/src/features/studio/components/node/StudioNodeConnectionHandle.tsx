import type {
  CSSProperties,
} from 'react'

import {
  Handle,
  Position,
} from '@xyflow/react'

import type {
  StudioStage,
} from '../../types/studioNode'

import {
  studioStageMeta,
} from './studioNodeStyles'

export interface StudioNodeConnectionHandleProps {
  stage: StudioStage

  position:
    | 'left'
    | 'right'

  disabled?: boolean

  interactive?: boolean

  handleId?: string

  isConnectable?: boolean

  className?: string
}

export function StudioNodeConnectionHandle({
  stage,
  position,
  disabled = false,
  interactive = false,
  handleId,
  isConnectable = true,
  className = '',
}: StudioNodeConnectionHandleProps) {
  const stageMeta =
    studioStageMeta[stage]

  const isTarget =
    position === 'left'

  const handleType =
    isTarget
      ? 'target'
      : 'source'

  const flowPosition =
    isTarget
      ? Position.Left
      : Position.Right

  const resolvedHandleId =
    handleId ?? handleType

  const canConnect =
    !disabled &&
    isConnectable

  /*
   * 첨부 와이어프레임 기준 위치:
   *
   * 왼쪽 연결점은 헤더 영역 중앙
   * 오른쪽 연결점은 하단 전달 영역 중앙
   */
  const handlePositionStyle:
    CSSProperties =
    isTarget
      ? {
          top: 38,
          left: 0,
          right: 'auto',
          bottom: 'auto',
          transform:
            'translate(-50%, -50%)',
        }
      : {
          top: 'auto',
          left: 'auto',
          right: 0,
          bottom: 28,
          transform:
            'translate(50%, 50%)',
        }

  /*
   * 좌우 연결점 모두 흰색 내부와
   * 단계 색상의 테두리를 사용합니다.
   */
  const visualStateClass =
    disabled
      ? 'border-[#D4D4DB] bg-white'
      : [
          stageMeta.stageTextClassName,
          'border-current',
          'bg-white',
        ].join(' ')

  if (!interactive) {
    return (
      <span
        className={[
          'pointer-events-none absolute z-10 h-[18px] w-[18px] rounded-full border-[3px]',
          visualStateClass,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={
          handlePositionStyle
        }
        aria-hidden="true"
      />
    )
  }

  return (
    <Handle
      id={resolvedHandleId}
      type={handleType}
      position={flowPosition}
      isConnectable={canConnect}
      aria-label={
        isTarget
          ? `${stageMeta.label} 노드 입력 연결점`
          : `${stageMeta.label} 노드 출력 연결점`
      }
      aria-disabled={
        !canConnect
      }
      data-handle-id={
        resolvedHandleId
      }
      data-handle-stage={
        stage
      }
      data-handle-type={
        handleType
      }
      className={[
        'z-10 !h-[18px] !w-[18px] !min-h-[18px] !min-w-[18px] !rounded-full !border-[3px] !bg-white transition',
        disabled
          ? 'cursor-not-allowed !border-[#D4D4DB] opacity-70'
          : [
              stageMeta.stageTextClassName,
              '!border-current',
            ].join(' '),
        canConnect
          ? 'cursor-crosshair hover:scale-110'
          : 'cursor-default',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        handlePositionStyle
      }
    />
  )
}