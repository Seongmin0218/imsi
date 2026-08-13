import type { StudioStage } from '../types/studioNode'

import type {
  StudioBlockDefinition,
  StudioBlockRequirement,
} from '../types/studioBlock'

/**
 * Studio 단계 표시 순서입니다.
 *
 * 팔레트 분류, 노드 정렬, 검증 결과 정렬 등에서
 * 동일한 순서를 사용합니다.
 */
export const STUDIO_STAGE_ORDER: readonly StudioStage[] = [
  'INPUT',
  'CONTEXT',
  'PROCESS',
  'REVIEW',
  'OUTPUT',
]

/**
 * Studio 단계별 한글 표시 이름입니다.
 */
export const studioStageLabelMap: Record<
  StudioStage,
  string
> = {
  INPUT: '입력',
  CONTEXT: '컨텍스트',
  PROCESS: '프로세스',
  REVIEW: '검토',
  OUTPUT: '결과',
}

/**
 * Studio 전체 블록 Catalog
 *
 * 상세 와이어프레임 기준:
 *
 * INPUT   9
 * CONTEXT 7
 * PROCESS 16
 * REVIEW  9
 * OUTPUT  11
 *
 * 총 52개 블록
 *
 * requirement는 단순 UI 중요도가 아니라
 * 현재 validateRequiredStudioBlocks에서 실제
 * 워크플로우 필수 블록 판정에 사용됩니다.
 */
export const studioBlockCatalog = [
  /*
   * ============================================================
   * INPUT
   * ============================================================
   *
   * 상세 설계:
   * IN-001 ~ IN-009
   *
   * 전체 9 blocks
   * 전역 필수 블록 3개
   */

  {
    id: 'input-text',
    stage: 'INPUT',
    order: 1,
    title: '사용자 요청 받기',
    description:
      '사용자의 요청 문장을 받아 흐름의 출발점으로 사용합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'input-goal',
    stage: 'INPUT',
    order: 2,
    title: '목표 정하기',
    description:
      '이번 작업의 목표 유형을 정하고 완료 기준을 지정합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'input-topic',
    stage: 'INPUT',
    order: 3,
    title: '주제 입력하기',
    description:
      '대표 주제와 키워드를 입력해 작업 범위를 정합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'input-file-upload',
    stage: 'INPUT',
    order: 4,
    title: '파일 업로드 받기',
    description:
      '문서·이미지를 업로드하고 파일별 역할과 우선순위를 정합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'input-required-document',
    stage: 'INPUT',
    order: 5,
    title: '필요한 문서 확인하기',
    description:
      '실행 전 필요한 자료 유형과 자료가 없을 때의 처리 방식을 정합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'input-required-skill',
    stage: 'INPUT',
    order: 6,
    title: '필요한 스킬 확인하기',
    description:
      '추출·요약·분류·비교·작성 등 작업에 필요한 스킬을 지정합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'input-target-audience',
    stage: 'INPUT',
    order: 7,
    title: '대상 독자 정하기',
    description:
      '결과물을 읽을 대상과 이해 수준을 지정합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'input-result-usage',
    stage: 'INPUT',
    order: 8,
    title: '결과 사용 상황 정하기',
    description:
      '결과물이 사용될 상황과 전달 매체를 지정합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'input-constraints',
    stage: 'INPUT',
    order: 9,
    title: '제약조건 입력하기',
    description:
      '분량·문체·포함·제외 규칙 등 결과물의 제약을 정합니다.',
    requirement: 'recommended',
    availability: 'available',
  },

  /*
   * ============================================================
   * CONTEXT
   * ============================================================
   *
   * 상세 설계:
   * CTX-001
   * CTX-002
   * CTX-003
   * CTX-004
   * CTX-005
   * CTX-006
   * CTX-009
   *
   * 전체 7 blocks
   * 전역 필수 블록 2개
   */

  {
    id: 'context-project-document',
    stage: 'CONTEXT',
    order: 1,
    title: '프로젝트 문서 불러오기',
    description:
      '프로젝트를 선택하고 작업에 참고할 문서를 지정합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'context-uploaded-document',
    stage: 'CONTEXT',
    order: 2,
    title: '업로드 문서 읽기',
    description:
      '업로드한 문서의 읽기 범위와 포함할 콘텐츠를 지정합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'context-direct-input',
    stage: 'CONTEXT',
    order: 3,
    title: '직접 입력 내용 사용하기',
    description:
      '사용자가 직접 입력한 참고 내용을 컨텍스트로 사용합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'context-reference-scope',
    stage: 'CONTEXT',
    order: 4,
    title: '참고 범위 정하기',
    description:
      '전체·문서·섹션·키워드 기준으로 참고할 자료의 범위를 정합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'context-role',
    stage: 'CONTEXT',
    order: 5,
    title: '역할 부여하기',
    description:
      'AI가 수행할 역할과 관점, 전문성 수준을 지정합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'context-background',
    stage: 'CONTEXT',
    order: 6,
    title: '배경 설명 추가하기',
    description:
      '작업의 배경 상황과 현재 진행 단계를 설명합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'context-exclusion',
    stage: 'CONTEXT',
    order: 7,
    title: '참고하지 말아야 할 내용 정하기',
    description:
      '참고 대상에서 제외할 문서·섹션·키워드 등의 규칙을 정합니다.',
    requirement: 'recommended',
    availability: 'available',
  },

  /*
   * ============================================================
   * PROCESS
   * ============================================================
   *
   * 상세 설계:
   * PROCESS · 16 blocks
   *
   * 전역 필수:
   * 핵심 내용 추출하기
   * 요약하기
   */

  {
    id: 'process-extract-core',
    stage: 'PROCESS',
    order: 1,
    title: '핵심 내용 추출하기',
    description:
      '입력된 자료에서 주장·사실·요구·결정·액션·키워드 등 핵심 내용을 추출합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'process-summary',
    stage: 'PROCESS',
    order: 2,
    title: '요약하기',
    description:
      '내용의 길이와 형식을 지정해 핵심 내용을 요약합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'process-classify-items',
    stage: 'PROCESS',
    order: 3,
    title: '항목별로 분류하기',
    description:
      '내용을 지정한 기준에 따라 여러 항목으로 분류합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-compare',
    stage: 'PROCESS',
    order: 4,
    title: '비교하기',
    description:
      '여러 대상의 공통점과 차이점을 기준에 따라 비교합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-order',
    stage: 'PROCESS',
    order: 5,
    title: '순서대로 정리하기',
    description:
      '항목을 작업 목적에 맞는 순서로 정리합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-decompose-functions',
    stage: 'PROCESS',
    order: 6,
    title: '기능으로 분해하기',
    description:
      '내용을 구현 또는 분석 가능한 기능 단위로 분해합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-link-policy',
    stage: 'PROCESS',
    order: 7,
    title: '정책과 연결하기',
    description:
      '기능과 권한·상태 등 관련 정책을 연결합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-find-exceptions',
    stage: 'PROCESS',
    order: 8,
    title: '예외 케이스 찾기',
    description:
      '빈 상태·잘못된 입력 등 발생 가능한 예외 상황을 찾습니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-draft',
    stage: 'PROCESS',
    order: 9,
    title: '초안 작성하기',
    description:
      '선택한 형식과 구성에 맞춰 결과물의 초안을 작성합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-table',
    stage: 'PROCESS',
    order: 10,
    title: '표로 재구성하기',
    description:
      '내용을 행과 열로 구성된 표 형태로 재구성합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-checklist',
    stage: 'PROCESS',
    order: 11,
    title: '체크리스트로 바꾸기',
    description:
      '내용을 확인 가능한 체크리스트 항목으로 변환합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-question-list',
    stage: 'PROCESS',
    order: 12,
    title: '질문 리스트 만들기',
    description:
      '추가 확인이나 검토가 필요한 내용을 질문 목록으로 만듭니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-call-skill',
    stage: 'PROCESS',
    order: 13,
    title: '특정 스킬 호출하기',
    description:
      '현재 작업에 필요한 특정 처리 스킬을 호출합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-prompt-compose',
    stage: 'PROCESS',
    order: 14,
    title: '프롬프트 조립하기',
    description:
      '역할·작업·입력·출력 조건을 하나의 프롬프트로 구성합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-prompt-fill-blanks',
    stage: 'PROCESS',
    order: 15,
    title: '빈칸 프롬프트 채우기',
    description:
      '프롬프트의 빈 슬롯에 필요한 내용을 배치합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'process-summary-prompt-layout',
    stage: 'PROCESS',
    order: 16,
    title: '요약 프롬프트 배치하기',
    description:
      '요약 작업에 필요한 프롬프트 요소를 카드 형태로 배치합니다.',
    requirement: 'optional',
    availability: 'available',
  },

  /*
   * ============================================================
   * REVIEW
   * ============================================================
   *
   * 최신 상세 와이어프레임 기준 9 blocks
   *
   * RV-001 누락 확인하기
   * RV-002 형식 확인하기
   * RV-003 조건 충족 확인하기
   * RV-004 정확성 확인하기
   * RV-005 근거 확인하기
   * RV-006 중복 제거하기
   * RV-007 톤 조정하기
   * RV-009 오류 위치 표시하기
   * RV-010 수정 가이드 제공하기
   *
   * repository의 기존 RV_004 "정책 충돌 확인하기"는
   * 최신 와이어프레임 기준에서는 제외합니다.
   */

  {
    id: 'review-missing',
    stage: 'REVIEW',
    order: 1,
    title: '누락 확인하기',
    description:
      '빠진 항목이 없는지 지정한 기준에 따라 점검합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    /*
     * 기존 review-quality ID를 유지합니다.
     *
     * 이미 Catalog 및 일부 데모 코드에서 사용하던 ID이므로
     * 불필요한 기존 데이터 파손을 막기 위해
     * 형식 확인 블록의 안정 ID로 재사용합니다.
     */
    id: 'review-quality',
    stage: 'REVIEW',
    order: 2,
    title: '형식 확인하기',
    description:
      '결과물이 기대한 형식과 일치하는지 검사합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'review-condition',
    stage: 'REVIEW',
    order: 3,
    title: '조건 충족 확인하기',
    description:
      '이전 블록에서 전달된 조건이 결과물에서 충족되는지 검사합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'review-policy-conflict',
    stage: 'REVIEW',
    order: 4,
    title: '정책 충돌 확인하기',
    description:
      '기능과 정책, 정책 간 충돌을 점검합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'review-evidence',
    stage: 'REVIEW',
    order: 5,
    title: '근거 확인하기',
    description:
      '주장과 수치에 적절한 근거가 있는지 검사합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'review-deduplicate',
    stage: 'REVIEW',
    order: 6,
    title: '중복 제거하기',
    description:
      '반복되거나 의미가 겹치는 내용을 찾아 정리합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'review-tone',
    stage: 'REVIEW',
    order: 7,
    title: '톤 조정하기',
    description:
      '결과물의 어조와 표현을 목표 톤에 맞게 다듬습니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'review-error-location',
    stage: 'REVIEW',
    order: 8,
    title: '오류 위치 표시하기',
    description:
      '검토에 실패한 위치와 오류 원인을 표시합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'review-fix-guide',
    stage: 'REVIEW',
    order: 9,
    title: '수정 가이드 제공하기',
    description:
      '검토 실패 시 어디를 어떻게 수정해야 하는지 안내합니다.',
    requirement: 'optional',
    availability: 'available',
  },

  /*
   * ============================================================
   * OUTPUT
   * ============================================================
   *
   * 상세 설계:
   * OUT-001 ~ OUT-011
   *
   * 전체 11 blocks
   * 전역 필수 블록 2개
   */

  {
    id: 'output-text',
    stage: 'OUTPUT',
    order: 1,
    title: '텍스트로 출력하기',
    description:
      '결과를 일반 텍스트 형태로 출력합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'output-table',
    stage: 'OUTPUT',
    order: 2,
    title: '표로 출력하기',
    description:
      '결과를 행과 열로 구성된 표 형태로 출력합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'output-checklist',
    stage: 'OUTPUT',
    order: 3,
    title: '체크리스트로 출력하기',
    description:
      '결과를 점검 가능한 체크리스트 형태로 출력합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'output-document-draft',
    stage: 'OUTPUT',
    order: 4,
    title: '문서 초안으로 출력하기',
    description:
      '문서 종류와 제목, 목차를 지정한 문서 초안으로 출력합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'output-presentation-summary',
    stage: 'OUTPUT',
    order: 5,
    title: '발표용 요약으로 출력하기',
    description:
      '발표 시간과 목적에 맞는 요약 형태로 출력합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'output-developer-handoff',
    stage: 'OUTPUT',
    order: 6,
    title: '개발자 전달용으로 출력하기',
    description:
      '개발 역할과 구현 목적에 맞는 전달 문서로 출력합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'output-prompt',
    stage: 'OUTPUT',
    order: 7,
    title: '프롬프트로 출력하기',
    description:
      '결과를 다시 사용할 수 있는 프롬프트 형태로 출력합니다.',
    requirement: 'optional',
    availability: 'available',
  },
  {
    id: 'output-step-guide',
    stage: 'OUTPUT',
    order: 8,
    title: '단계별 가이드로 출력하기',
    description:
      '사용자가 따라 할 수 있는 단계별 가이드 형태로 출력합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'output-save-storage',
    stage: 'OUTPUT',
    order: 9,
    title: '내 저장소에 저장하기',
    description:
      '완성된 결과와 워크플로우를 내 저장소에 저장합니다.',
    requirement: 'required',
    availability: 'available',
  },
  {
    id: 'output-public-description',
    stage: 'OUTPUT',
    order: 10,
    title: '공개용 설명 만들기',
    description:
      '워크플로우를 공개할 때 표시할 소개 정보를 작성합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
  {
    id: 'output-copyable-flow',
    stage: 'OUTPUT',
    order: 11,
    title: '복사 가능한 흐름으로 만들기',
    description:
      '다른 사용자가 복사해 사용할 수 있도록 워크플로우를 정리합니다.',
    requirement: 'recommended',
    availability: 'available',
  },
] as const satisfies readonly StudioBlockDefinition[]

/**
 * Catalog에서 자동으로 추론한 블록 ID 타입입니다.
 *
 * 오타가 있는 임의 문자열 대신 Catalog에 실제 존재하는 ID만
 * 사용할 수 있도록 합니다.
 */
export type StudioBlockId =
  (typeof studioBlockCatalog)[number]['id']

/**
 * ID로 블록 정의를 찾습니다.
 */
export function getStudioBlockDefinition(
  blockId: string,
): StudioBlockDefinition | undefined {
  return studioBlockCatalog.find(
    (block) => block.id === blockId,
  )
}

/**
 * 특정 Stage의 전체 블록을 order 순서대로 반환합니다.
 */
export function getStudioBlocksByStage(
  stage: StudioStage,
): StudioBlockDefinition[] {
  return studioBlockCatalog
    .filter(
      (block) =>
        block.stage === stage,
    )
    .slice()
    .sort(
      (
        firstBlock,
        secondBlock,
      ) =>
        firstBlock.order -
        secondBlock.order,
    )
}

/**
 * 현재 사용할 수 있는 블록만 반환합니다.
 */
export function getAvailableStudioBlocks(): StudioBlockDefinition[] {
  return studioBlockCatalog.filter(
    (block) =>
      block.availability ===
      'available',
  )
}

/**
 * 전체 필수 블록을 반환합니다.
 *
 * 이 목록은 현재 Studio Workflow 검증에서
 * 실제 필수 블록 판정에 사용됩니다.
 */
export function getRequiredStudioBlocks(): StudioBlockDefinition[] {
  return studioBlockCatalog.filter(
    (block) =>
      block.requirement ===
        'required' &&
      block.availability ===
        'available',
  )
}

/**
 * 특정 Stage의 필수 블록을 반환합니다.
 */
export function getRequiredStudioBlocksByStage(
  stage: StudioStage,
): StudioBlockDefinition[] {
  return studioBlockCatalog.filter(
    (block) =>
      block.stage === stage &&
      block.requirement ===
        'required' &&
      block.availability ===
        'available',
  )
}

/**
 * 필수도별 블록 목록을 반환합니다.
 */
export function getStudioBlocksByRequirement(
  requirement: StudioBlockRequirement,
): StudioBlockDefinition[] {
  return studioBlockCatalog.filter(
    (block) =>
      block.requirement ===
      requirement,
  )
}

/**
 * 전달받은 문자열이 실제 Catalog에 존재하는 블록 ID인지 확인합니다.
 */
export function isStudioBlockId(
  blockId: string,
): blockId is StudioBlockId {
  return studioBlockCatalog.some(
    (block) =>
      block.id === blockId,
  )
}