import type {
  Connection,
  Edge,
  IsValidConnection,
} from '@xyflow/react'

import type {
  StudioFlowNodeInstance,
} from '../components/node/StudioFlowNode'

import {
  STUDIO_STAGE_ORDER,
} from '../data/studioBlockCatalog'

import type {
  StudioNodeState,
  StudioStage,
} from '../types/studioNode'

/**
 * 연결이 유효하거나 거부된 이유입니다.
 */
export type StudioConnectionValidationReason =
  | 'valid'
  | 'missing-source'
  | 'missing-target'
  | 'unknown-source'
  | 'unknown-target'
  | 'self-connection'
  | 'source-disabled'
  | 'target-disabled'
  | 'output-as-source'
  | 'input-as-target'
  | 'duplicate-connection'
  | 'source-handle-in-use'
  | 'backward-stage'
  | 'non-adjacent-stage'
  | 'cycle'

/**
 * 연결 검증에 적용할 정책입니다.
 */
export interface StudioConnectionValidationPolicy {
  /**
   * INPUT → CONTEXT → PROCESS → REVIEW → OUTPUT 순서를
   * 역행하는 연결을 차단합니다.
   *
   * 기본값은 true입니다.
   */
  enforceStageOrder?: boolean

  /**
   * 바로 다음 단계에만 연결하도록 제한합니다.
   *
   * false이면 INPUT에서 PROCESS처럼 중간 단계를 건너뛰는
   * 순방향 연결도 허용합니다.
   *
   * 기본값은 false입니다.
   */
  requireAdjacentStages?: boolean

  /**
   * 순환 구조가 발생하는 연결을 차단합니다.
   *
   * 기본값은 true입니다.
   */
  preventCycles?: boolean

  /**
   * 동일한 Source, Target, Handle 조합의 연결을 차단합니다.
   *
   * 기본값은 true입니다.
   */
  rejectDuplicateConnections?: boolean
    /**
   * 하나의 Source Handle에서 하나의 Edge만 나갈 수 있도록 제한합니다.
   *
   * 기본값은 true입니다.
   */
  limitSourceHandleToSingleEdge?: boolean
}


/**
 * 연결 검증에 필요한 값입니다.
 */
export interface ValidateStudioConnectionOptions {
  /**
   * React Flow에서 전달한 연결 후보입니다.
   */
  connection: Connection | Edge

  /**
   * 현재 Studio 노드 목록입니다.
   */
  nodes: readonly StudioFlowNodeInstance[]

  /**
   * 현재 Edge 목록입니다.
   */
  edges: readonly Edge[]

  /**
   * 연결 정책입니다.
   */
  policy?: StudioConnectionValidationPolicy
}

/**
 * 유효한 연결 결과입니다.
 */
export interface ValidStudioConnectionResult {
  valid: true
  reason: 'valid'
  message: null
  sourceNodeId: string
  targetNodeId: string
}

/**
 * 거부된 연결 결과입니다.
 */
export interface InvalidStudioConnectionResult {
  valid: false
  reason: Exclude<
    StudioConnectionValidationReason,
    'valid'
  >
  message: string
  sourceNodeId: string | null
  targetNodeId: string | null
}

/**
 * 연결 검증 결과입니다.
 */
export type StudioConnectionValidationResult =
  | ValidStudioConnectionResult
  | InvalidStudioConnectionResult

/**
 * React Flow의 isValidConnection에 바로 전달할 검증 함수를
 * 생성할 때 사용하는 설정입니다.
 */
export interface CreateStudioConnectionValidatorOptions {
  /**
   * 최신 노드 목록을 반환하는 함수입니다.
   */
  getNodes: () =>
    readonly StudioFlowNodeInstance[]

  /**
   * 최신 Edge 목록을 반환하는 함수입니다.
   */
  getEdges: () => readonly Edge[]

  /**
   * 연결 검증 정책입니다.
   */
  policy?: StudioConnectionValidationPolicy
}

const DEFAULT_CONNECTION_POLICY: Required<StudioConnectionValidationPolicy> = {
  enforceStageOrder: true,
  requireAdjacentStages: true,
  preventCycles: true,
  rejectDuplicateConnections: true,
  limitSourceHandleToSingleEdge: true,
}

/**
 * 연결할 수 없는 노드 상태입니다.
 */
const NON_CONNECTABLE_NODE_STATES: readonly StudioNodeState[] = [
  'disabled',
  'pending',
]

/**
 * Handle ID를 비교 가능한 형태로 정리합니다.
 */
function normalizeHandleId(
  handleId: string | null | undefined,
): string | null {
  const normalizedHandleId =
    handleId?.trim()

  return normalizedHandleId
    ? normalizedHandleId
    : null
}

/**
 * Connection 또는 Edge에서 현재 Edge ID를 읽습니다.
 *
 * 기존 Edge 재연결 검증에서는 자기 자신을 중복 Edge나
 * 순환 검사 대상으로 포함하지 않기 위해 사용합니다.
 */
function getCandidateEdgeId(
  connection: Connection | Edge,
): string | null {
  if (
    'id' in connection &&
    typeof connection.id === 'string'
  ) {
    return connection.id
  }

  return null
}

/**
 * Stage의 순서를 숫자로 반환합니다.
 */
export function getStudioStageIndex(
  stage: StudioStage,
): number {
  return STUDIO_STAGE_ORDER.indexOf(stage)
}

/**
 * 노드가 연결 가능한 상태인지 확인합니다.
 */
export function isStudioNodeConnectable(
  node: StudioFlowNodeInstance,
): boolean {
  const nodeState =
    node.data.node.state ?? 'default'

  return !NON_CONNECTABLE_NODE_STATES.includes(
    nodeState,
  )
}

/**
 * 동일한 Source, Target, Handle 조합의 Edge가
 * 이미 존재하는지 검사합니다.
 */
export function hasDuplicateStudioConnection({
  connection,
  edges,
}: Pick<
  ValidateStudioConnectionOptions,
  'connection' | 'edges'
>): boolean {
  const candidateEdgeId =
    getCandidateEdgeId(connection)

  const sourceHandle =
    normalizeHandleId(
      connection.sourceHandle,
    )

  const targetHandle =
    normalizeHandleId(
      connection.targetHandle,
    )

  return edges.some((edge) => {
    /**
     * 기존 Edge를 재연결하는 상황에서는
     * 자기 자신을 중복으로 판단하지 않습니다.
     */
    if (
      candidateEdgeId &&
      edge.id === candidateEdgeId
    ) {
      return false
    }

    return (
      edge.source === connection.source &&
      edge.target === connection.target &&
      normalizeHandleId(
        edge.sourceHandle,
      ) === sourceHandle &&
      normalizeHandleId(
        edge.targetHandle,
      ) === targetHandle
    )
  })
}

/**
 * 하나의 Source Handle에 이미 다른 Edge가 연결되어 있는지 검사합니다.
 *
 * Handle ID가 없는 현재 Studio 노드는 null Handle 하나를 사용하는 것으로
 * 간주하므로 노드당 하나의 출력 연결만 허용하게 됩니다.
 */
export function hasSourceHandleConnection({
  connection,
  edges,
}: Pick<
  ValidateStudioConnectionOptions,
  'connection' | 'edges'
>): boolean {
  const sourceNodeId =
    connection.source?.trim()

  if (!sourceNodeId) {
    return false
  }

  const candidateEdgeId =
    getCandidateEdgeId(
      connection,
    )

  const sourceHandle =
    normalizeHandleId(
      connection.sourceHandle,
    )

  return edges.some(
    (edge) => {
      /*
       * 기존 Edge 재연결 상황에서는
       * 자기 자신을 사용 중인 Edge로 판단하지 않습니다.
       */
      if (
        candidateEdgeId &&
        edge.id ===
          candidateEdgeId
      ) {
        return false
      }

      return (
        edge.source ===
          sourceNodeId &&
        normalizeHandleId(
          edge.sourceHandle,
        ) ===
          sourceHandle
      )
    },
  )
}

/**
 * 새로운 Source → Target 연결이 순환 구조를 만드는지
 * 검사합니다.
 *
 * Target에서 출발해 기존 Edge를 따라 이동했을 때
 * Source에 다시 도달할 수 있으면 새 연결은 순환을 만듭니다.
 */
export function wouldCreateStudioCycle({
  connection,
  edges,
}: Pick<
  ValidateStudioConnectionOptions,
  'connection' | 'edges'
>): boolean {
  const sourceNodeId =
    connection.source

  const targetNodeId =
    connection.target

  if (
    !sourceNodeId ||
    !targetNodeId
  ) {
    return false
  }

  if (sourceNodeId === targetNodeId) {
    return true
  }

  const candidateEdgeId =
    getCandidateEdgeId(connection)

  const outgoingNodeMap =
    new Map<string, string[]>()

  edges.forEach((edge) => {
    /**
     * 기존 Edge 재연결 검증에서는 기존 위치의 Edge를
     * 그래프에서 잠시 제외합니다.
     */
    if (
      candidateEdgeId &&
      edge.id === candidateEdgeId
    ) {
      return
    }

    const currentTargets =
      outgoingNodeMap.get(edge.source) ?? []

    currentTargets.push(edge.target)

    outgoingNodeMap.set(
      edge.source,
      currentTargets,
    )
  })

  const nodesToVisit: string[] = [
    targetNodeId,
  ]

  const visitedNodeIds =
    new Set<string>()

  while (nodesToVisit.length > 0) {
    const currentNodeId =
      nodesToVisit.pop()

    if (!currentNodeId) {
      continue
    }

    if (
      currentNodeId === sourceNodeId
    ) {
      return true
    }

    if (
      visitedNodeIds.has(
        currentNodeId,
      )
    ) {
      continue
    }

    visitedNodeIds.add(
      currentNodeId,
    )

    const outgoingNodeIds =
      outgoingNodeMap.get(
        currentNodeId,
      ) ?? []

    outgoingNodeIds.forEach(
      (outgoingNodeId) => {
        if (
          !visitedNodeIds.has(
            outgoingNodeId,
          )
        ) {
          nodesToVisit.push(
            outgoingNodeId,
          )
        }
      },
    )
  }

  return false
}

/**
 * 거부 결과를 생성합니다.
 */
function createInvalidConnectionResult(
  reason: InvalidStudioConnectionResult['reason'],
  message: string,
  sourceNodeId: string | null,
  targetNodeId: string | null,
): InvalidStudioConnectionResult {
  return {
    valid: false,
    reason,
    message,
    sourceNodeId,
    targetNodeId,
  }
}

/**
 * Studio 노드 연결을 검증합니다.
 *
 * boolean만 반환하지 않고 거부 사유와 메시지를 함께 반환하므로
 * Toast, 검증 패널, 오류 표시에서 같은 결과를 사용할 수 있습니다.
 */
export function validateStudioConnection({
  connection,
  nodes,
  edges,
  policy,
}: ValidateStudioConnectionOptions): StudioConnectionValidationResult {
  const resolvedPolicy = {
    ...DEFAULT_CONNECTION_POLICY,
    ...policy,
  }

  const sourceNodeId =
    connection.source?.trim() || null

  const targetNodeId =
    connection.target?.trim() || null

  if (!sourceNodeId) {
    return createInvalidConnectionResult(
      'missing-source',
      '연결을 시작한 노드가 없습니다.',
      null,
      targetNodeId,
    )
  }

  if (!targetNodeId) {
    return createInvalidConnectionResult(
      'missing-target',
      '연결할 대상 노드가 없습니다.',
      sourceNodeId,
      null,
    )
  }

  const sourceNode =
    nodes.find(
      (node) =>
        node.id === sourceNodeId,
    )

  if (!sourceNode) {
    return createInvalidConnectionResult(
      'unknown-source',
      `연결을 시작한 노드를 찾을 수 없습니다: ${sourceNodeId}`,
      sourceNodeId,
      targetNodeId,
    )
  }

  const targetNode =
    nodes.find(
      (node) =>
        node.id === targetNodeId,
    )

  if (!targetNode) {
    return createInvalidConnectionResult(
      'unknown-target',
      `연결 대상 노드를 찾을 수 없습니다: ${targetNodeId}`,
      sourceNodeId,
      targetNodeId,
    )
  }

  if (
    sourceNodeId === targetNodeId
  ) {
    return createInvalidConnectionResult(
      'self-connection',
      '하나의 노드를 자기 자신에게 연결할 수 없습니다.',
      sourceNodeId,
      targetNodeId,
    )
  }

  if (
    !isStudioNodeConnectable(
      sourceNode,
    )
  ) {
    return createInvalidConnectionResult(
      'source-disabled',
      '비활성화되거나 대기 중인 노드에서는 연결을 시작할 수 없습니다.',
      sourceNodeId,
      targetNodeId,
    )
  }

  if (
    !isStudioNodeConnectable(
      targetNode,
    )
  ) {
    return createInvalidConnectionResult(
      'target-disabled',
      '비활성화되거나 대기 중인 노드에는 연결할 수 없습니다.',
      sourceNodeId,
      targetNodeId,
    )
  }

  const sourceStage =
    sourceNode.data.node.stage

  const targetStage =
    targetNode.data.node.stage

  if (sourceStage === 'OUTPUT') {
    return createInvalidConnectionResult(
      'output-as-source',
      '결과 노드에서는 다른 노드로 연결할 수 없습니다.',
      sourceNodeId,
      targetNodeId,
    )
  }

  if (targetStage === 'INPUT') {
    return createInvalidConnectionResult(
      'input-as-target',
      '입력 노드는 다른 노드의 연결을 받을 수 없습니다.',
      sourceNodeId,
      targetNodeId,
    )
  }

  const sourceStageIndex =
    getStudioStageIndex(
      sourceStage,
    )

  const targetStageIndex =
    getStudioStageIndex(
      targetStage,
    )

  if (
    resolvedPolicy.enforceStageOrder &&
    sourceStageIndex >=
      targetStageIndex
  ) {
    return createInvalidConnectionResult(
      'backward-stage',
      [
        'Studio 단계의 역방향 연결은 허용되지 않습니다.',
        `${sourceStage} → ${targetStage}`,
      ].join(' '),
      sourceNodeId,
      targetNodeId,
    )
  }

  if (
    resolvedPolicy.requireAdjacentStages &&
    targetStageIndex !==
      sourceStageIndex + 1
  ) {
    return createInvalidConnectionResult(
      'non-adjacent-stage',
      [
        '현재 연결 정책에서는 바로 다음 단계의 노드만 연결할 수 있습니다.',
        `${sourceStage} → ${targetStage}`,
      ].join(' '),
      sourceNodeId,
      targetNodeId,
    )
  }

  if (
    resolvedPolicy.rejectDuplicateConnections &&
    hasDuplicateStudioConnection({
      connection,
      edges,
    })
  ) {
    return createInvalidConnectionResult(
      'duplicate-connection',
      '두 노드 사이에 동일한 연결이 이미 존재합니다.',
      sourceNodeId,
      targetNodeId,
    )
  }

  if (
    resolvedPolicy.limitSourceHandleToSingleEdge &&
    hasSourceHandleConnection({
      connection,
      edges,
    })
  ) {
    return createInvalidConnectionResult(
      'source-handle-in-use',
      '하나의 출력 포트에서는 하나의 노드에만 연결할 수 있습니다.',
      sourceNodeId,
      targetNodeId,
    )
  }

  if (
    resolvedPolicy.preventCycles &&
    wouldCreateStudioCycle({
      connection,
      edges,
    })
  ) {
    return createInvalidConnectionResult(
      'cycle',
      '이 연결을 추가하면 워크플로우에 순환 구조가 생깁니다.',
      sourceNodeId,
      targetNodeId,
    )
  }

  return {
    valid: true,
    reason: 'valid',
    message: null,
    sourceNodeId,
    targetNodeId,
  }
}

/**
 * 검증 결과 중 boolean 값만 반환합니다.
 */
export function isStudioConnectionValid(
  options: ValidateStudioConnectionOptions,
): boolean {
  return validateStudioConnection(
    options,
  ).valid
}

/**
 * React Flow의 isValidConnection 속성에 전달할 수 있는
 * 검증 함수를 생성합니다.
 *
 * getNodes와 getEdges를 사용하므로 렌더 시점의 배열이 아니라
 * 연결을 시도하는 순간의 최신 상태를 검사할 수 있습니다.
 */
export function createStudioConnectionValidator({
  getNodes,
  getEdges,
  policy,
}: CreateStudioConnectionValidatorOptions): IsValidConnection {
  return (connection) =>
    validateStudioConnection({
      connection,
      nodes: getNodes(),
      edges: getEdges(),
      policy,
    }).valid
}