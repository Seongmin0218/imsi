import type {
  Node,
  NodeProps,
  NodeTypes,
} from '@xyflow/react'

import type {
  StudioNodeCardData,
} from '../../types/studioNode'

import {
  StudioNodeCard,
} from './StudioNodeCard'

export const STUDIO_FLOW_NODE_TYPE =
  'studioNode' as const

export type StudioFlowNodeData = {
  node: StudioNodeCardData
  footerLabel?: string
  showTargetHandle?: boolean
  showSourceHandle?: boolean
  targetHandleId?: string
  sourceHandleId?: string
  handlesConnectable?: boolean
}

export type StudioFlowNodeInstance =
  Node<
    StudioFlowNodeData,
    typeof STUDIO_FLOW_NODE_TYPE
  >

export function StudioFlowNode({
  data,
  selected,
  dragging,
}: NodeProps<StudioFlowNodeInstance>) {
  const {
    node,
    footerLabel,
    showTargetHandle,
    showSourceHandle,
    targetHandleId,
    sourceHandleId,
    handlesConnectable = true,
  } = data

  /*
   * 와이어프레임에서는 모든 노드에
   * 좌우 연결점이 시각적으로 표시됩니다.
   *
   * 실제 연결 가능 여부는 StudioNodeCard에서
   * Stage에 따라 별도로 제한합니다.
   *
   * INPUT 왼쪽:
   * 표시되지만 연결 불가
   *
   * OUTPUT 오른쪽:
   * 표시되지만 연결 불가
   */
  const shouldShowTargetHandle =
    showTargetHandle ?? true

  const shouldShowSourceHandle =
    showSourceHandle ?? true

  return (
    <StudioNodeCard
      node={node}
      selected={selected}
      footerLabel={
        footerLabel
      }
      showTargetHandle={
        shouldShowTargetHandle
      }
      showSourceHandle={
        shouldShowSourceHandle
      }
      interactiveHandles
      targetHandleId={
        targetHandleId
      }
      sourceHandleId={
        sourceHandleId
      }
      handlesConnectable={
        handlesConnectable
      }
      data-flow-node-id={
        node.id
      }
      data-flow-node-stage={
        node.stage
      }
      aria-label={`${node.title} 노드`}
      className={[
        'cursor-grab',
        dragging
          ? 'cursor-grabbing opacity-90 shadow-lg'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}

export const studioNodeTypes = {
  [STUDIO_FLOW_NODE_TYPE]:
    StudioFlowNode,
} satisfies NodeTypes