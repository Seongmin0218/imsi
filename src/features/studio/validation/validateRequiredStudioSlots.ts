import type {
  StudioFlowNodeInstance,
} from '../components/node/StudioFlowNode'

import type {
  StudioNodeSlot,
  StudioNodeState,
} from '../types/studioNode'

import type {
  RequiredStudioSlotValidationResult,
  StudioValidationIssue,
} from '../types/studioValidation'

/**
 * 필수 슬롯 검증 설정입니다.
 */
export interface ValidateRequiredStudioSlotsOptions {
  /**
   * 현재 React Flow 노드 목록입니다.
   */
  nodes: readonly StudioFlowNodeInstance[]
}

/**
 * 슬롯에 실제 값이 들어 있는지 검사합니다.
 */
export function hasStudioSlotValue(
  slot: StudioNodeSlot,
): boolean {
  if (slot.state === 'filled') {
    return true
  }

  if (typeof slot.value !== 'string') {
    return false
  }

  return slot.value.trim().length > 0
}

/**
 * 필수 슬롯이 정상적으로 설정됐는지 검사합니다.
 */
export function isRequiredStudioSlotComplete(
  slot: StudioNodeSlot,
): boolean {
  if (!slot.required) {
    return true
  }

  if (
    slot.state === 'error' ||
    slot.state === 'missing' ||
    slot.state === 'empty'
  ) {
    return false
  }

  return hasStudioSlotValue(slot)
}

/**
 * 노드의 슬롯 검증 결과를 바탕으로
 * 노드 상태를 결정합니다.
 */
function resolveStudioNodeValidationState(
  node: StudioFlowNodeInstance,
  nodeIssues: readonly StudioValidationIssue[],
): StudioNodeState {
  const hasInvalidSlot =
    nodeIssues.some(
      (issue) =>
        issue.type ===
        'invalid-required-slot',
    )

  if (hasInvalidSlot) {
    return 'error'
  }

  const hasMissingSlot =
    nodeIssues.some(
      (issue) =>
        issue.type ===
        'missing-required-slot-value',
    )

  if (hasMissingSlot) {
    return 'missing'
  }

  const hasWarning =
    nodeIssues.some(
      (issue) =>
        issue.severity === 'warning',
    )

  if (hasWarning) {
    return 'warning'
  }

  const currentState =
    node.data.node.state ?? 'default'

  /**
   * 명시적으로 대기 또는 비활성화된 노드는
   * 문제가 없더라도 기존 상태를 유지합니다.
   */
  if (
    currentState === 'pending' ||
    currentState === 'disabled'
  ) {
    return currentState
  }

  return 'complete'
}

/**
 * 각 노드의 필수 슬롯에 값이 입력됐는지 검사합니다.
 */
export function validateRequiredStudioSlots({
  nodes,
}: ValidateRequiredStudioSlotsOptions): RequiredStudioSlotValidationResult {
  const issues: StudioValidationIssue[] =
    []

  const nodeStates: Record<
    string,
    StudioNodeState
  > = {}

  nodes.forEach((node) => {
    const nodeIssues: StudioValidationIssue[] =
      []

    node.data.node.slots.forEach(
      (slot) => {
        if (!slot.required) {
          return
        }

        if (slot.state === 'error') {
          nodeIssues.push({
            id: `invalid-required-slot:${node.id}:${slot.id}`,
            type: 'invalid-required-slot',
            severity: 'error',
            stage: node.data.node.stage,
            nodeId: node.id,
            blockId: slot.id,
            slotId: slot.id,
            message: `${slot.label} 필수 블록에 오류가 있습니다.`,
          })

          return
        }

        if (
          !isRequiredStudioSlotComplete(
            slot,
          )
        ) {
          nodeIssues.push({
            id: `missing-required-slot-value:${node.id}:${slot.id}`,
            type:
              'missing-required-slot-value',
            severity: 'error',
            stage: node.data.node.stage,
            nodeId: node.id,
            blockId: slot.id,
            slotId: slot.id,
            message: `${slot.label} 필수 블록의 설정이 완료되지 않았습니다.`,
          })

          return
        }

        if (slot.state === 'warning') {
          nodeIssues.push({
            id: `required-slot-warning:${node.id}:${slot.id}`,
            type: 'required-slot-warning',
            severity: 'warning',
            stage: node.data.node.stage,
            nodeId: node.id,
            blockId: slot.id,
            slotId: slot.id,
            message: `${slot.label} 필수 블록의 설정을 확인해 주세요.`,
          })
        }
      },
    )

    issues.push(...nodeIssues)

    nodeStates[node.id] =
      resolveStudioNodeValidationState(
        node,
        nodeIssues,
      )
  })

  const hasError =
    issues.some(
      (issue) =>
        issue.severity === 'error',
    )

  return {
    valid: !hasError,
    issues,
    nodeStates,
  }
}