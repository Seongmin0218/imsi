import {
  Wrench,
} from 'lucide-react'

import {
  ExpandableSettingBlock,
} from '../../../../Block/components/layouts/ExpandableSettingBlock'

import type {
  StudioBlockInspectorComponentProps,
} from '../StudioBlockInspector'

const studioInspectorClassName =
  '!w-full !rounded-[12px] !border-[#E4E4E7] !shadow-none [&_.setting-block-fields]:!w-full [&_.setting-block-fields]:max-w-full'

interface LegacyProcessInspectorDefinition {
  title: string
  code: string
  description: string
  sourceSummary: string
}

interface LegacyProcessInspectorProps
  extends StudioBlockInspectorComponentProps {
  definition: LegacyProcessInspectorDefinition
}

function LegacyProcessInspector({
  slot,
  definition,
}: LegacyProcessInspectorProps) {
  const storedSummary =
    typeof slot.config?.sourceSummary ===
    'string'
      ? slot.config.sourceSummary
      : ''

  return (
    <ExpandableSettingBlock
      title={definition.title}
      code={definition.code}
      stage="PROCESS"
      description={definition.description}
      icon={
        <Wrench
          size={18}
        />
      }
      category="OPTIONAL"
      tagCounts={{
        optional: 1,
      }}
      required={slot.required}
      className={
        studioInspectorClassName
      }
    >
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            기존 설정 요약
          </p>

          <div className="rounded-xl border-2 border-slate-200 bg-white px-4 py-3">
            <p className="text-sm font-bold text-slate-700">
              {storedSummary ||
                definition.sourceSummary}
            </p>
          </div>
        </div>

        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-sm font-bold text-slate-600">
            상세 설정 UI 미구현
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            기존 Process.tsx에는 이 블록의
            펼쳐진 상세 설정 필드가 없고
            접힌 카드의 설정 요약만
            구현되어 있습니다.
          </p>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * PROCESS-003 항목별로 분류하기
 *
 * 원본:
 * 기준: 우선순위 · 다중 OFF
 * ============================================================
 */

export function ClassifyItemsInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '항목별로 분류하기',

        code:
          'PROCESS-003',

        description:
          '항목을 지정한 기준에 따라 분류합니다.',

        sourceSummary:
          '기준: 우선순위 · 다중 OFF',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-004 비교하기
 *
 * 원본:
 * 대상 3 · 기준 4 →
 * ============================================================
 */

export function CompareInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '비교하기',

        code:
          'PROCESS-004',

        description:
          '여러 대상을 기준에 따라 비교합니다.',

        sourceSummary:
          '대상 3 · 기준 4 →',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-005 순서대로 정리하기
 *
 * 원본:
 * 화면 · 기본
 * ============================================================
 */

export function OrderInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '순서대로 정리하기',

        code:
          'PROCESS-005',

        description:
          '항목을 지정한 순서에 맞게 정리합니다.',

        sourceSummary:
          '화면 · 기본',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-006 기능으로 분해하기
 *
 * 원본:
 * 화면 · 기본
 * ============================================================
 */

export function DecomposeFunctionsInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '기능으로 분해하기',

        code:
          'PROCESS-006',

        description:
          '내용을 구현 가능한 기능 단위로 분해합니다.',

        sourceSummary:
          '화면 · 기본',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-007 정책과 연결하기
 *
 * 원본:
 * 권한·상태
 * ============================================================
 */

export function LinkPolicyInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '정책과 연결하기',

        code:
          'PROCESS-007',

        description:
          '기능과 관련 정책을 연결합니다.',

        sourceSummary:
          '권한·상태',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-008 예외 케이스 찾기
 *
 * 원본:
 * 빈 상태·입력
 * ============================================================
 */

export function FindExceptionsInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '예외 케이스 찾기',

        code:
          'PROCESS-008',

        description:
          '정상 흐름에서 벗어나는 예외 케이스를 찾습니다.',

        sourceSummary:
          '빈 상태·입력',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-009 초안 작성하기
 *
 * 원본:
 * 보고서 · 자동 목차
 * ============================================================
 */

export function DraftInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '초안 작성하기',

        code:
          'PROCESS-009',

        description:
          '처리 결과를 기반으로 초안을 작성합니다.',

        sourceSummary:
          '보고서 · 자동 목차',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-010 표로 재구성하기
 *
 * 원본:
 * 비교 · 열 4개 →
 * ============================================================
 */

export function TableTransformInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '표로 재구성하기',

        code:
          'PROCESS-010',

        description:
          '내용을 비교 가능한 표 구조로 재구성합니다.',

        sourceSummary:
          '비교 · 열 4개 →',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-011 체크리스트로 바꾸기
 *
 * 원본:
 * QA · 기본
 * ============================================================
 */

export function ChecklistTransformInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '체크리스트로 바꾸기',

        code:
          'PROCESS-011',

        description:
          '내용을 점검 가능한 체크리스트로 변환합니다.',

        sourceSummary:
          'QA · 기본',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-012 질문 리스트 만들기
 *
 * 원본:
 * 요구 · 5개
 * ============================================================
 */

export function QuestionListInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '질문 리스트 만들기',

        code:
          'PROCESS-012',

        description:
          '확인이 필요한 내용을 질문 목록으로 구성합니다.',

        sourceSummary:
          '요구 · 5개',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-013 특정 스킬 호출하기
 *
 * 원본:
 * 요약가 · 이전 결과
 * ============================================================
 */

export function CallSkillInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '특정 스킬 호출하기',

        code:
          'PROCESS-013',

        description:
          '지정한 스킬을 호출해 이전 결과를 처리합니다.',

        sourceSummary:
          '요약가 · 이전 결과',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-014 프롬프트 조립하기
 *
 * 원본:
 * 조각 5 · 표 출력 →
 * ============================================================
 */

export function PromptComposeInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '프롬프트 조립하기',

        code:
          'PROCESS-014',

        description:
          '역할·작업·출력 조건을 하나의 프롬프트로 구성합니다.',

        sourceSummary:
          '조각 5 · 표 출력 →',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-015 빈칸 프롬프트 채우기
 *
 * 원본:
 * 슬롯 4 · 카드 →
 * ============================================================
 */

export function PromptFillBlanksInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '빈칸 프롬프트 채우기',

        code:
          'PROCESS-015',

        description:
          '프롬프트의 빈 슬롯을 입력값으로 채웁니다.',

        sourceSummary:
          '슬롯 4 · 카드 →',
      }}
    />
  )
}

/*
 * ============================================================
 * PROCESS-016 요약 프롬프트 배치하기
 *
 * 원본:
 * 카드 4 · 상세 ON →
 * ============================================================
 */

export function SummaryPromptLayoutInspector(
  props: StudioBlockInspectorComponentProps,
) {
  return (
    <LegacyProcessInspector
      {...props}
      definition={{
        title:
          '요약 프롬프트 배치하기',

        code:
          'PROCESS-016',

        description:
          '요약 프롬프트를 카드 형태로 배치합니다.',

        sourceSummary:
          '카드 4 · 상세 ON →',
      }}
    />
  )
}