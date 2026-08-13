import {
  useCallback,
  type Dispatch,
  type DragEvent,
  type SetStateAction,
} from 'react'

import type {
  ReactFlowInstance,
  SnapGrid,
  XYPosition,
} from '@xyflow/react'

import type {
  StudioFlowNodeInstance,
} from '../components/node/StudioFlowNode'

import {
  getStudioBlockDefinition,
} from '../data/studioBlockCatalog'

import {
  STUDIO_BLOCK_DRAG_MIME_TYPE,
  type StudioBlockDefinition,
  type StudioBlockDragPayload,
} from '../types/studioBlock'

import {
  upsertStudioBlockNode,
  type StudioNodeIdFactory,
  type UpsertStudioBlockNodeResult,
} from '../utils/createStudioNode'

/**
 * xyflow의 화면 좌표 변환 함수 타입입니다.
 */
export type StudioScreenToFlowPosition =
  ReactFlowInstance<StudioFlowNodeInstance>['screenToFlowPosition']

/**
 * 블록 Drop이 거부된 이유입니다.
 */
export type StudioBlockDropRejectReason =
  | 'disabled'
  | 'missing-payload'
  | 'invalid-payload'
  | 'unknown-block'
  | 'unavailable'

/**
 * 블록 Drop이 거부됐을 때 전달되는 정보입니다.
 */
export interface StudioBlockDropRejection {
  reason: StudioBlockDropRejectReason
  message: string
  blockId?: string
}

/**
 * 블록 Drop이 정상 처리됐을 때 전달되는 정보입니다.
 */
export interface StudioBlockDropResult {
  block: StudioBlockDefinition
  position: XYPosition
  result: UpsertStudioBlockNodeResult
}

/**
 * useStudioBlockDrop에 전달하는 설정입니다.
 */
export interface UseStudioBlockDropOptions {
  /**
   * 현재 xyflow 노드 목록입니다.
   */
  nodes: readonly StudioFlowNodeInstance[]

  /**
   * xyflow 노드 목록을 변경하는 setter입니다.
   *
   * useNodesState의 setNodes 또는 동일한 형태의
   * 상태 setter를 전달할 수 있습니다.
   */
  setNodes: Dispatch<
    SetStateAction<StudioFlowNodeInstance[]>
  >

  /**
   * xyflow의 화면 좌표를 Flow 좌표로 변환하는 함수입니다.
   */
  screenToFlowPosition: StudioScreenToFlowPosition

  /**
   * 전체 블록 Drop 기능을 비활성화합니다.
   */
  disabled?: boolean

  /**
   * Drop 좌표를 Grid에 맞출지 결정합니다.
   */
  snapToGrid?: boolean

  /**
   * Grid의 가로·세로 간격입니다.
   *
   * 예:
   * [20, 20]
   */
  snapGrid?: SnapGrid

  /**
   * 새 Stage Node ID 생성 방식을 주입합니다.
   */
  idFactory?: StudioNodeIdFactory

  /**
   * Drop 처리가 끝난 뒤 실행됩니다.
   *
   * 새 노드 생성, 기존 노드 슬롯 추가,
   * 중복 블록 감지를 모두 포함합니다.
   */
  onDropComplete?: (
    dropResult: StudioBlockDropResult,
  ) => void

  /**
   * 올바르지 않은 Drag 데이터 또는 사용할 수 없는
   * 블록이 Drop됐을 때 실행됩니다.
   */
  onDropRejected?: (
    rejection: StudioBlockDropRejection,
  ) => void
}

/**
 * Hook이 반환하는 이벤트 Handler입니다.
 */
export interface UseStudioBlockDropReturn {
  onDragOver: (
    event: DragEvent<HTMLElement>,
  ) => void

  onDrop: (
    event: DragEvent<HTMLElement>,
  ) => void
}

/**
 * unknown 값을 StudioBlockDragPayload로 검사합니다.
 */
function isStudioBlockDragPayload(
  value: unknown,
): value is StudioBlockDragPayload {
  if (
    typeof value !== 'object' ||
    value === null
  ) {
    return false
  }

  const candidate = value as {
    blockId?: unknown
  }

  return (
    typeof candidate.blockId === 'string' &&
    candidate.blockId.trim().length > 0
  )
}

/**
 * dataTransfer에 저장된 JSON 문자열을 안전하게 해석합니다.
 */
export function parseStudioBlockDragPayload(
  rawPayload: string,
): StudioBlockDragPayload | null {
  if (!rawPayload.trim()) {
    return null
  }

  try {
    const parsedPayload: unknown =
      JSON.parse(rawPayload)

    if (
      !isStudioBlockDragPayload(
        parsedPayload,
      )
    ) {
      return null
    }

    return {
      blockId:
        parsedPayload.blockId.trim(),
    }
  } catch {
    return null
  }
}

/**
 * 현재 Drag 데이터가 LearningLM Studio 블록인지 확인합니다.
 */
export function hasStudioBlockDragData(
  event: DragEvent<HTMLElement>,
): boolean {
  return Array.from(
    event.dataTransfer.types,
  ).includes(
    STUDIO_BLOCK_DRAG_MIME_TYPE,
  )
}

/**
 * 팔레트의 StudioDraggableBlock과 xyflow 캔버스를
 * 연결하는 Drop Hook입니다.
 *
 * 담당 기능:
 *
 * 1. Studio 전용 MIME 타입 확인
 * 2. Drag Payload 해석
 * 3. Catalog에서 블록 정의 조회
 * 4. 브라우저 좌표를 xyflow 좌표로 변환
 * 5. Stage Node 생성 또는 기존 Stage Node 슬롯 추가
 * 6. 중복 블록 추가 방지
 */
export function useStudioBlockDrop({
  nodes,
  setNodes,
  screenToFlowPosition,
  disabled = false,
  snapToGrid = false,
  snapGrid,
  idFactory,
  onDropComplete,
  onDropRejected,
}: UseStudioBlockDropOptions): UseStudioBlockDropReturn {
  /**
   * 올바른 Studio 블록을 드래그하고 있을 때만
   * 브라우저의 기본 Drop 차단을 해제합니다.
   */
  const onDragOver = useCallback(
    (
      event: DragEvent<HTMLElement>,
    ) => {
      if (disabled) {
        return
      }

      if (
        !hasStudioBlockDragData(event)
      ) {
        return
      }

      event.preventDefault()
      event.dataTransfer.dropEffect =
        'copy'
    },
    [disabled],
  )

  const onDrop = useCallback(
    (
      event: DragEvent<HTMLElement>,
    ) => {
      if (disabled) {
        onDropRejected?.({
          reason: 'disabled',
          message:
            '현재 Studio 캔버스에는 블록을 추가할 수 없습니다.',
        })

        return
      }

      if (
        !hasStudioBlockDragData(event)
      ) {
        onDropRejected?.({
          reason: 'missing-payload',
          message:
            'LearningLM Studio 블록 Drag 데이터가 없습니다.',
        })

        return
      }

      event.preventDefault()

      const rawPayload =
        event.dataTransfer.getData(
          STUDIO_BLOCK_DRAG_MIME_TYPE,
        )

      const payload =
        parseStudioBlockDragPayload(
          rawPayload,
        )

      if (!payload) {
        onDropRejected?.({
          reason: 'invalid-payload',
          message:
            'Studio 블록 Drag 데이터를 해석할 수 없습니다.',
        })

        return
      }

      const block =
        getStudioBlockDefinition(
          payload.blockId,
        )

      if (!block) {
        onDropRejected?.({
          reason: 'unknown-block',
          blockId: payload.blockId,
          message: `등록되지 않은 Studio 블록입니다: ${payload.blockId}`,
        })

        return
      }

      if (
        block.availability !==
        'available'
      ) {
        onDropRejected?.({
          reason: 'unavailable',
          blockId: block.id,
          message: `현재 사용할 수 없는 Studio 블록입니다: ${block.title}`,
        })

        return
      }

      const clientPosition: XYPosition = {
        x: event.clientX,
        y: event.clientY,
      }

      const flowPosition =
        screenToFlowPosition(
          clientPosition,
          {
            snapToGrid,
            ...(snapGrid
              ? { snapGrid }
              : {}),
          },
        )

      const upsertResult =
        upsertStudioBlockNode({
          nodes,
          block,
          position: flowPosition,
          idFactory,
        })

      setNodes(upsertResult.nodes)

      onDropComplete?.({
        block,
        position: flowPosition,
        result: upsertResult,
      })
    },
    [
      disabled,
      idFactory,
      nodes,
      onDropComplete,
      onDropRejected,
      screenToFlowPosition,
      setNodes,
      snapGrid,
      snapToGrid,
    ],
  )

  return {
    onDragOver,
    onDrop,
  }
}