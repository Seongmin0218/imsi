import type {
  StudioNodeState,
  StudioStage,
} from './studioNode'

/**
 * Studio 검증 문제의 심각도입니다.
 *
 * error:
 * 워크플로우 실행 또는 저장을 막는 문제
 *
 * warning:
 * 실행을 막지는 않지만 사용자 확인이 필요한 문제
 */
export type StudioValidationSeverity =
  | 'error'
  | 'warning'

/**
 * 필수 블록 및 슬롯 검증에서 발생할 수 있는 문제입니다.
 */
export type StudioValidationIssueType =
  | 'missing-required-block'
  | 'missing-recommended-block'
  | 'missing-required-slot-value'
  | 'invalid-required-slot'
  | 'required-slot-warning'

/**
 * Studio 검증에서 발견된 단일 문제입니다.
 */
export interface StudioValidationIssue {
  /**
   * 렌더링과 중복 제거에 사용하는 고유 ID입니다.
   */
  id: string

  /**
   * 검증 문제의 종류입니다.
   */
  type: StudioValidationIssueType

  /**
   * 오류 또는 경고 여부입니다.
   */
  severity: StudioValidationSeverity

  /**
   * 사용자에게 표시할 메시지입니다.
   */
  message: string

  /**
   * 문제가 발생한 Studio 단계입니다.
   */
  stage: StudioStage

  /**
   * 문제가 발생한 React Flow 노드 ID입니다.
   *
   * Stage Node 자체가 없는 경우에는 존재하지 않습니다.
   */
  nodeId?: string

  /**
   * 문제가 발생한 Catalog 블록 ID입니다.
   */
  blockId?: string

  /**
   * 문제가 발생한 슬롯 ID입니다.
   */
  slotId?: string
}

/**
 * 필수 블록 존재 여부 검증 결과입니다.
 */
export interface RequiredStudioBlockValidationResult {
  /**
   * 모든 필수 블록이 존재하면 true입니다.
   *
   * 권장 블록 누락은 valid에 영향을 주지 않습니다.
   */
  valid: boolean

  /**
   * 검증에서 발견된 전체 문제입니다.
   */
  issues: StudioValidationIssue[]

  /**
   * 누락된 필수 블록 ID입니다.
   */
  missingRequiredBlockIds: string[]

  /**
   * 누락된 권장 블록 ID입니다.
   */
  missingRecommendedBlockIds: string[]
}

/**
 * 필수 슬롯 값 검증 결과입니다.
 */
export interface RequiredStudioSlotValidationResult {
  /**
   * 모든 필수 슬롯이 정상 상태이면 true입니다.
   */
  valid: boolean

  /**
   * 검증에서 발견된 전체 문제입니다.
   */
  issues: StudioValidationIssue[]

  /**
   * 검증 결과에 따라 노드에 적용할 상태입니다.
   */
  nodeStates: Record<
    string,
    StudioNodeState
  >
}

/**
 * 전체 Studio 워크플로우 검증 결과입니다.
 */
export interface StudioWorkflowValidationResult {
  /**
   * 실행을 막는 error 문제가 없으면 true입니다.
   */
  valid: boolean

  /**
   * 전체 검증 문제입니다.
   */
  issues: StudioValidationIssue[]

  /**
   * 오류 개수입니다.
   */
  errorCount: number

  /**
   * 경고 개수입니다.
   */
  warningCount: number

  /**
   * 검증 후 각 노드에 적용할 상태입니다.
   */
  nodeStates: Record<
    string,
    StudioNodeState
  >

  /**
   * 누락된 필수 블록 ID입니다.
   */
  missingRequiredBlockIds: string[]

  /**
   * 누락된 권장 블록 ID입니다.
   */
  missingRecommendedBlockIds: string[]
}