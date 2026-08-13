import type {
  StudioFlowNodeInstance,
} from '../components/node/StudioFlowNode'

import {
  STUDIO_STAGE_ORDER,
  studioBlockCatalog,
} from '../data/studioBlockCatalog'

import type {
  StudioBlockDefinition,
} from '../types/studioBlock'

import type {
  StudioNodeState,
  StudioStage,
} from '../types/studioNode'

import type {
  StudioValidationIssue,
  StudioWorkflowValidationResult,
} from '../types/studioValidation'

import {
  validateRequiredStudioBlocks,
} from './validateRequiredStudioBlocks'

import {
  validateRequiredStudioSlots,
} from './validateRequiredStudioSlots'

/**
 * 전체 워크플로우 검증 설정입니다.
 */
export interface ValidateStudioWorkflowOptions {
  /**
   * 현재 React Flow 노드 목록입니다.
   */
  nodes: readonly StudioFlowNodeInstance[]

  /**
   * 검증에 사용할 블록 Catalog입니다.
   */
  catalog?: readonly StudioBlockDefinition[]

  /**
   * 권장 블록 누락을 warning으로 반환할지 결정합니다.
   *
   * 기본값은 true입니다.
   */
  includeRecommended?: boolean
}

/**
 * 노드 상태 우선순위입니다.
 *
 * 여러 검증 결과가 한 노드에 겹칠 때
 * 더 심각한 상태를 선택합니다.
 */
const NODE_STATE_PRIORITY: Record<
  StudioNodeState,
  number
> = {
  default: 0,
  selected: 0,
  complete: 0,
  pending: 1,
  disabled: 1,
  warning: 2,
  missing: 3,
  error: 4,
}

/**
 * 두 노드 상태 중 더 심각한 상태를 반환합니다.
 */
function mergeStudioNodeState(
  currentState: StudioNodeState,
  nextState: StudioNodeState,
): StudioNodeState {
  return NODE_STATE_PRIORITY[nextState] >
    NODE_STATE_PRIORITY[currentState]
    ? nextState
    : currentState
}

/**
 * 검증 문제를 Stage 순서대로 정렬합니다.
 */
function sortStudioValidationIssues(
  issues: readonly StudioValidationIssue[],
): StudioValidationIssue[] {
  return issues
    .slice()
    .sort((firstIssue, secondIssue) => {
      const firstStageIndex =
        STUDIO_STAGE_ORDER.indexOf(
          firstIssue.stage,
        )

      const secondStageIndex =
        STUDIO_STAGE_ORDER.indexOf(
          secondIssue.stage,
        )

      if (
        firstStageIndex !==
        secondStageIndex
      ) {
        return (
          firstStageIndex -
          secondStageIndex
        )
      }

      if (
        firstIssue.severity !==
        secondIssue.severity
      ) {
        return firstIssue.severity ===
          'error'
          ? -1
          : 1
      }

      return firstIssue.message.localeCompare(
        secondIssue.message,
        'ko',
      )
    })
}

/**
 * 특정 Stage에 누락된 필수 블록이 있는지 확인합니다.
 */
function getStagesWithMissingRequiredBlocks(
  issues: readonly StudioValidationIssue[],
): Set<StudioStage> {
  return new Set(
    issues
      .filter(
        (issue) =>
          issue.type ===
          'missing-required-block',
      )
      .map((issue) => issue.stage),
  )
}

/**
 * 필수 블록 존재 여부와 필수 슬롯 설정 여부를
 * 한 번에 검사합니다.
 */
export function validateStudioWorkflow({
  nodes,
  catalog = studioBlockCatalog,
  includeRecommended = true,
}: ValidateStudioWorkflowOptions): StudioWorkflowValidationResult {
  const requiredBlockResult =
    validateRequiredStudioBlocks({
      nodes,
      catalog,
      includeRecommended,
    })

  const requiredSlotResult =
    validateRequiredStudioSlots({
      nodes,
    })

  const issues =
    sortStudioValidationIssues([
      ...requiredBlockResult.issues,
      ...requiredSlotResult.issues,
    ])

  const stagesWithMissingRequiredBlocks =
    getStagesWithMissingRequiredBlocks(
      requiredBlockResult.issues,
    )

  const nodeStates: Record<
    string,
    StudioNodeState
  > = {}

  nodes.forEach((node) => {
    const slotValidationState =
      requiredSlotResult.nodeStates[
        node.id
      ] ?? 'complete'

    const hasMissingRequiredBlock =
      stagesWithMissingRequiredBlocks.has(
        node.data.node.stage,
      )

    const blockValidationState:
      StudioNodeState =
      hasMissingRequiredBlock
        ? 'missing'
        : 'complete'

    nodeStates[node.id] =
      mergeStudioNodeState(
        slotValidationState,
        blockValidationState,
      )
  })

  const errorCount =
    issues.filter(
      (issue) =>
        issue.severity === 'error',
    ).length

  const warningCount =
    issues.filter(
      (issue) =>
        issue.severity === 'warning',
    ).length

  return {
    valid: errorCount === 0,
    issues,
    errorCount,
    warningCount,
    nodeStates,
    missingRequiredBlockIds:
      requiredBlockResult
        .missingRequiredBlockIds,
    missingRecommendedBlockIds:
      requiredBlockResult
        .missingRecommendedBlockIds,
  }
}