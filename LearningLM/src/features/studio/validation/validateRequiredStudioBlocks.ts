import type {
  StudioFlowNodeInstance,
} from '../components/node/StudioFlowNode'

import {
  studioBlockCatalog,
} from '../data/studioBlockCatalog'

import type {
  StudioBlockDefinition,
} from '../types/studioBlock'

import type {
  RequiredStudioBlockValidationResult,
  StudioValidationIssue,
} from '../types/studioValidation'

/**
 * 필수 블록 검증 설정입니다.
 */
export interface ValidateRequiredStudioBlocksOptions {
  /**
   * 현재 React Flow 노드 목록입니다.
   */
  nodes: readonly StudioFlowNodeInstance[]

  /**
   * 검증에 사용할 블록 Catalog입니다.
   *
   * 별도 값을 전달하지 않으면 기본 Studio Catalog를 사용합니다.
   */
  catalog?: readonly StudioBlockDefinition[]

  /**
   * 권장 블록 누락도 warning 문제로 반환할지 결정합니다.
   *
   * 기본값은 true입니다.
   */
  includeRecommended?: boolean
}

/**
 * Stage와 블록 ID를 조합해 비교용 키를 생성합니다.
 */
function createStudioBlockPresenceKey(
  stage: StudioBlockDefinition['stage'],
  blockId: string,
): string {
  return `${stage}:${blockId}`
}

/**
 * 현재 노드 목록에 존재하는 블록 ID를 수집합니다.
 *
 * 블록이 잘못된 Stage Node에 들어가 있는 경우에는
 * 존재하는 블록으로 인정하지 않습니다.
 */
function collectPresentStudioBlocks(
  nodes: readonly StudioFlowNodeInstance[],
): Set<string> {
  const presentBlocks =
    new Set<string>()

  nodes.forEach((node) => {
    const stage =
      node.data.node.stage

    node.data.node.slots.forEach(
      (slot) => {
        presentBlocks.add(
          createStudioBlockPresenceKey(
            stage,
            slot.id,
          ),
        )
      },
    )
  })

  return presentBlocks
}

/**
 * 필수 블록과 권장 블록이 현재 워크플로우에
 * 존재하는지 검사합니다.
 */
export function validateRequiredStudioBlocks({
  nodes,
  catalog = studioBlockCatalog,
  includeRecommended = true,
}: ValidateRequiredStudioBlocksOptions): RequiredStudioBlockValidationResult {
  const presentBlocks =
    collectPresentStudioBlocks(nodes)

  const issues: StudioValidationIssue[] =
    []

  const missingRequiredBlockIds: string[] =
    []

  const missingRecommendedBlockIds: string[] =
    []

  catalog.forEach((block) => {
    /**
     * 아직 사용할 수 없는 블록은 필수 여부와 관계없이
     * 검증 대상에서 제외합니다.
     */
    if (
      block.availability !==
      'available'
    ) {
      return
    }

    const presenceKey =
      createStudioBlockPresenceKey(
        block.stage,
        block.id,
      )

    const isPresent =
      presentBlocks.has(presenceKey)

    if (isPresent) {
      return
    }

    if (
      block.requirement === 'required'
    ) {
      missingRequiredBlockIds.push(
        block.id,
      )

      issues.push({
        id: `missing-required-block:${block.id}`,
        type: 'missing-required-block',
        severity: 'error',
        stage: block.stage,
        blockId: block.id,
        message: `${block.title} 필수 블록이 추가되지 않았습니다.`,
      })

      return
    }

    if (
      includeRecommended &&
      block.requirement ===
        'recommended'
    ) {
      missingRecommendedBlockIds.push(
        block.id,
      )

      issues.push({
        id: `missing-recommended-block:${block.id}`,
        type: 'missing-recommended-block',
        severity: 'warning',
        stage: block.stage,
        blockId: block.id,
        message: `${block.title} 권장 블록이 추가되지 않았습니다.`,
      })
    }
  })

  return {
    valid:
      missingRequiredBlockIds.length ===
      0,
    issues,
    missingRequiredBlockIds,
    missingRecommendedBlockIds,
  }
}