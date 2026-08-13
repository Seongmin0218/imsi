/**
 * Studio의 5개 기본 Stage입니다.
 */
export type StudioStage =
  | 'INPUT'
  | 'CONTEXT'
  | 'PROCESS'
  | 'REVIEW'
  | 'OUTPUT'

/**
 * Stage Node 전체의 상태입니다.
 */
export type StudioNodeState =
  | 'default'
  | 'selected'
  | 'complete'
  | 'warning'
  | 'missing'
  | 'error'
  | 'pending'
  | 'disabled'

/**
 * Stage Node에 부착된 개별 Block Slot의 상태입니다.
 */
export type StudioSlotState =
  | 'default'
  | 'filled'
  | 'empty'
  | 'warning'
  | 'missing'
  | 'error'

/**
 * Studio Block 설정값에 저장할 수 있는
 * 가장 기본적인 값입니다.
 *
 * Studio 데이터는 이후 저장소/API 요청에도
 * 그대로 사용할 수 있어야 하므로
 * JSON으로 직렬화 가능한 값만 허용합니다.
 */
export type StudioBlockConfigPrimitive =
  | string
  | number
  | boolean
  | null

/**
 * Block 설정 객체 안에 들어갈 수 있는 값입니다.
 *
 * 예:
 *
 * string
 * number
 * boolean
 * string[]
 *
 * {
 *   type: 'project'
 *   required: true
 * }
 *
 * 같은 중첩 구조까지 지원합니다.
 */
export type StudioBlockConfigValue =
  | StudioBlockConfigPrimitive
  | StudioBlockConfigValue[]
  | {
      [key: string]:
        StudioBlockConfigValue
    }

/**
 * 개별 Studio Block의 실제 Inspector 설정값입니다.
 *
 * 각 Block마다 서로 다른 필드가 필요하기 때문에
 * 공통 Slot에서는 Record 형태로 저장합니다.
 *
 * 이후 Inspector 구현 단계에서는
 * IN-001, CTX-001, RV-001 등의
 * Block 전용 Config 타입을 별도로 만들어
 * 이 타입을 기반으로 사용합니다.
 */
export type StudioBlockConfig =
  Record<
    string,
    StudioBlockConfigValue
  >

/**
 * Stage Node 안에 부착되는 단일 Block입니다.
 *
 * slot.id는 studioBlockCatalog의 block.id와 동일합니다.
 */
export interface StudioNodeSlot {
  /**
   * Catalog Block ID
   *
   * 예:
   * input-text
   * context-role
   * review-tone
   */
  id: string

  /**
   * 사용자에게 표시되는 Block 이름입니다.
   */
  label: string

  /**
   * 기존 Studio 코드와 호환하기 위한
   * 짧은 표시/요약 문자열입니다.
   *
   * 기존 Inspector와 Node Slot Row에서
   * 이미 사용 중이므로 제거하지 않습니다.
   *
   * 앞으로 실제 설정 데이터는 config에 저장하고,
   * value에는 Node에서 보여줄 요약값을
   * 저장하는 방식으로 사용합니다.
   *
   * 예:
   *
   * review-tone
   *
   * value:
   * "전문 · 합니다체"
   *
   * config:
   * {
   *   targetTone: "professional",
   *   endingStyle: "hamnida",
   *   jargonLevel: "normal"
   * }
   */
  value?: string

  /**
   * Inspector에서 설정한 Block의
   * 실제 구조화 데이터입니다.
   */
  config?: StudioBlockConfig

  /**
   * 현재 Workflow에서 반드시 설정되어야 하는
   * Block인지 나타냅니다.
   *
   * 현재는 Catalog의 requirement === 'required'
   * 값을 기반으로 생성됩니다.
   */
  required?: boolean

  /**
   * Block 설정 상태입니다.
   */
  state?: StudioSlotState
}

/**
 * React Flow Stage Node 내부에서 사용하는 데이터입니다.
 */
export interface StudioNodeCardData {
  id: string

  /**
   * INPUT=1
   * CONTEXT=2
   * PROCESS=3
   * REVIEW=4
   * OUTPUT=5
   */
  order: number

  stage: StudioStage

  /**
   * 사용자에게 표시되는 Stage 이름입니다.
   */
  title: string

  /**
   * Node에 표시할 보조 상태 문구입니다.
   */
  statusLabel?: string

  state?: StudioNodeState

  /**
   * 현재 Stage에 실제로 부착된 Block 목록입니다.
   */
  slots: StudioNodeSlot[]
}