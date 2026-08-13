import type { StudioStage } from './studioNode'

/**
 * Studio 팔레트에서 블록을 드래그할 때 사용하는 MIME 타입입니다.
 *
 * 다른 일반 텍스트 Drag & Drop 데이터와 구분하기 위해
 * LearningLM 전용 MIME 타입을 사용합니다.
 */
export const STUDIO_BLOCK_DRAG_MIME_TYPE =
  'application/x-learninglm-studio-block'

/**
 * 팔레트에 표시되는 블록의 중요도입니다.
 *
 * required:
 * 반드시 필요한 블록
 *
 * recommended:
 * 필수는 아니지만 사용을 권장하는 블록
 *
 * optional:
 * 사용자가 필요할 때 선택하는 블록
 */
export type StudioBlockRequirement =
  | 'required'
  | 'recommended'
  | 'optional'

/**
 * 블록 사용 가능 상태입니다.
 *
 * available:
 * 현재 팔레트에서 선택하고 드래그할 수 있음
 *
 * coming-soon:
 * UI에는 표시하지만 아직 사용할 수 없음
 */
export type StudioBlockAvailability =
  | 'available'
  | 'coming-soon'

/**
 * Studio 팔레트에 표시되는 단일 블록 정의입니다.
 *
 * 이 데이터는 다음 기능에서 공통으로 사용합니다.
 *
 * 1. 좌측 블록 팔레트 렌더링
 * 2. 블록 검색 및 단계별 필터링
 * 3. Drag & Drop 데이터 전달
 * 4. Stage Node의 슬롯 생성
 * 5. 필수 블록 검증
 */
export interface StudioBlockDefinition {
  /**
   * 프로젝트 전체에서 중복되지 않는 블록 ID입니다.
   *
   * React key, Drag Payload, 검증 식별자로 사용되므로
   * 화면에 표시되는 한글 제목과 분리합니다.
   */
  id: string

  /**
   * 이 블록이 들어갈 수 있는 Stage Node입니다.
   */
  stage: StudioStage

  /**
   * 같은 Stage 내부에서 표시되는 순서입니다.
   */
  order: number

  /**
   * 사용자에게 표시되는 블록 이름입니다.
   */
  title: string

  /**
   * 팔레트 카드 하단에 표시되는 설명입니다.
   */
  description: string

  /**
   * 필수, 권장, 선택 상태입니다.
   */
  requirement: StudioBlockRequirement

  /**
   * 현재 사용 가능한 블록인지 나타냅니다.
   */
  availability: StudioBlockAvailability
}

/**
 * HTML Drag & Drop의 dataTransfer에 저장되는 데이터입니다.
 *
 * Drag 단계에서는 전체 블록 객체를 넣지 않고 ID만 전달합니다.
 * Drop 단계에서 ID를 이용해 Catalog의 최신 정의를 다시 조회합니다.
 */
export interface StudioBlockDragPayload {
  blockId: string
}

/**
 * UI에 표시할 한글 라벨입니다.
 */
export const studioBlockRequirementLabelMap: Record<
  StudioBlockRequirement,
  string
> = {
  required: '필수',
  recommended: '권장',
  optional: '선택',
}

/**
 * 블록 사용 가능 상태의 한글 라벨입니다.
 */
export const studioBlockAvailabilityLabelMap: Record<
  StudioBlockAvailability,
  string
> = {
  available: '사용 가능',
  'coming-soon': '준비중',
}