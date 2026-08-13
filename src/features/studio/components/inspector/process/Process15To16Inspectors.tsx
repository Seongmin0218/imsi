import {
  useState,
} from 'react'

import {
  Layers3,
  Plus,
  Puzzle,
} from 'lucide-react'

import {
  ExpandableSettingBlock,
} from '../../../../Block/components/layouts/ExpandableSettingBlock'

import type {
  StudioBlockConfig,
} from '../../../types/studioNode'

import type {
  StudioBlockInspectorComponentProps,
} from '../StudioBlockInspector'

import {
  studioInspectorClassName,
  resolveState,
  getString,
  getBoolean,
  getStringArray,
  readStringArray,
  ToggleRow,
} from './processInspectorUtils'

/*
 * ============================================================
 * PR-015
 * 빈칸 프롬프트 채우기
 * ============================================================
 */

type PromptBlankSlotType =
  | 'role'
  | 'task'
  | 'target'
  | 'output'

interface PromptWordCard {
  label: string
  type: PromptBlankSlotType
}

const promptWordCards: PromptWordCard[] = [
  {
    label: '요약',
    type: 'task',
  },
  {
    label: '분류',
    type: 'task',
  },
  {
    label: '비교',
    type: 'task',
  },
  {
    label: '표',
    type: 'output',
  },
  {
    label: '목록',
    type: 'output',
  },
  {
    label: '전문가',
    type: 'role',
  },
]

const promptSlotLabelMap: Record<
  PromptBlankSlotType,
  string
> = {
  role: '역할',
  task: '작업',
  target: '대상',
  output: '출력',
}

export function PromptFillBlanksInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const template =
    getString(
      slot.config,
      'template',
      '요약 요청 템플릿',
    )

  /*
   * Figma 초기 상태:
   * 역할 + 대상 2개는 채워져 있고
   * 작업 + 출력 2개는 비어 있습니다.
   */
  const roleValue =
    getString(
      slot.config,
      'roleValue',
      '리뷰 분석가',
    )

  const taskValue =
    getString(
      slot.config,
      'taskValue',
    )

  const targetValue =
    getString(
      slot.config,
      'targetValue',
      '사용자 리뷰',
    )

  const outputValue =
    getString(
      slot.config,
      'outputValue',
    )

  const [
    draggedWord,
    setDraggedWord,
  ] =
    useState<PromptWordCard | null>(
      null,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextTemplate =
      typeof patch.template ===
      'string'
        ? patch.template
        : template

    const nextRole =
      typeof patch.roleValue ===
      'string'
        ? patch.roleValue
        : roleValue

    const nextTask =
      typeof patch.taskValue ===
      'string'
        ? patch.taskValue
        : taskValue

    const nextTarget =
      typeof patch.targetValue ===
      'string'
        ? patch.targetValue
        : targetValue

    const nextOutput =
      typeof patch.outputValue ===
      'string'
        ? patch.outputValue
        : outputValue

    const values = [
      nextRole,
      nextTask,
      nextTarget,
      nextOutput,
    ]

    const filledCount =
      values.filter(
        (value) =>
          value.trim().length >
          0,
      ).length

    const complete =
      Boolean(
        nextTemplate,
      ) &&
      filledCount ===
        4

    onConfigChange(
      {
        template,
        roleValue,
        taskValue,
        targetValue,
        outputValue,
        ...patch,
      },
      {
        summaryValue:
          `빈칸 ${filledCount}/4 채움`,

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  const getSlotValue = (
    type: PromptBlankSlotType,
  ) => {
    if (
      type ===
      'role'
    ) {
      return roleValue
    }

    if (
      type ===
      'task'
    ) {
      return taskValue
    }

    if (
      type ===
      'target'
    ) {
      return targetValue
    }

    return outputValue
  }

  const getSlotConfigKey = (
    type: PromptBlankSlotType,
  ) => {
    if (
      type ===
      'role'
    ) {
      return 'roleValue'
    }

    if (
      type ===
      'task'
    ) {
      return 'taskValue'
    }

    if (
      type ===
      'target'
    ) {
      return 'targetValue'
    }

    return 'outputValue'
  }

  const dropWord = (
    targetType: PromptBlankSlotType,
  ) => {
    if (
      !draggedWord ||
      draggedWord.type !==
        targetType
    ) {
      return
    }

    save({
      [getSlotConfigKey(
        targetType,
      )]:
        draggedWord.label,
    })

    setDraggedWord(
      null,
    )
  }

  const resetSlots = () => {
    save({
      roleValue:
        '리뷰 분석가',

      taskValue:
        '',

      targetValue:
        '사용자 리뷰',

      outputValue:
        '',
    })
  }

  const filledCount =
    [
      roleValue,
      taskValue,
      targetValue,
      outputValue,
    ].filter(
      (value) =>
        value.trim().length >
        0,
    ).length

  const renderSlot = (
    type: PromptBlankSlotType,
  ) => {
    const value =
      getSlotValue(
        type,
      )

    const canDrop =
      draggedWord?.type ===
      type

    return (
      <span
        onDragOver={(
          event,
        ) => {
          if (
            canDrop
          ) {
            event.preventDefault()
          }
        }}
        onDrop={() =>
          dropWord(
            type,
          )
        }
        title={
          promptSlotLabelMap[
            type
          ]
        }
        className={[
          'mx-1 inline-flex min-h-[32px] min-w-[72px] items-center justify-center rounded-lg border px-2 py-1 text-xs font-bold transition-colors',
          value
            ? type ===
              'role'
              ? 'border-[#4A5E8A] bg-[#EDF1F8] text-[#4A5E8A]'
              : type ===
                  'target'
                ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                : type ===
                    'task'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                  : 'border-violet-500 bg-violet-50 text-violet-600'
            : canDrop
              ? 'border-indigo-500 bg-indigo-50 text-indigo-500'
              : 'border-dashed border-indigo-400 text-indigo-500',
        ].join(
          ' ',
        )}
      >
        {value ||
          type}
      </span>
    )
  }

  return (
    <ExpandableSettingBlock
      title="빈칸 프롬프트 채우기"
      code="PR-015"
      stage="PROCESS"
      description="단어 카드를 문장의 빈칸으로 끌어다 놓습니다."
      icon={
        <Puzzle
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 1,
        conditional: 4,
        missing:
          4 -
          filledCount,
      }}
      required={
        slot.required
      }
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            빈칸{' '}
            {filledCount}/4
            {' '}채움
            {filledCount <
              4
              ? ` · ${
                  [
                    !taskValue &&
                      '작업',
                    !outputValue &&
                      '출력',
                    !roleValue &&
                      '역할',
                    !targetValue &&
                      '대상',
                  ]
                    .filter(
                      Boolean,
                    )
                    .join(
                      '·',
                    )
                } 남음`
              : ' · 완료'}
          </span>

          <button
            type="button"
            onClick={() =>
              save({})
            }
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700"
          >
            적용
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 템플릿 */}
        <label className="block">
          <span className="mb-3 block text-xs font-bold text-slate-700">
            템플릿 문장{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <select
            value={
              template
            }
            onChange={(
              event,
            ) =>
              save({
                template:
                  event.target
                    .value,
              })
            }
            className="h-[48px] w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none"
          >
            {/*
             * 제공된 Figma에서 확인되는
             * 템플릿은 이 항목 하나뿐입니다.
             */}
            <option value="요약 요청 템플릿">
              요약 요청 템플릿
            </option>
          </select>
        </label>

        {/* 템플릿 문장 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            문장{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-10 text-slate-700">
            당신은
            {renderSlot(
              'role',
            )}
            로서,
            {renderSlot(
              'target',
            )}
            를 분석해
            {renderSlot(
              'task',
            )}
            하고
            {renderSlot(
              'output',
            )}
            형식으로
            정리하세요.
          </div>

          <p className="mt-2 text-[11px] text-slate-400">
            ‘작업’ 슬롯이
            유효한 드롭 위치로
            강조될 수 있습니다.
          </p>
        </div>

        {/* 단어 카드 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            단어 카드 · 드래그해 빈칸에
          </p>

          <div className="flex flex-wrap gap-2">
            {promptWordCards.map(
              (
                card,
              ) => (
                <div
                  key={
                    `${card.type}-${card.label}`
                  }
                  draggable
                  onDragStart={() =>
                    setDraggedWord(
                      card,
                    )
                  }
                  onDragEnd={() =>
                    setDraggedWord(
                      null,
                    )
                  }
                  className={[
                    'cursor-grab rounded-lg border-2 px-4 py-2 text-xs font-bold active:cursor-grabbing',
                    card.type ===
                      'task'
                      ? 'border-indigo-500 bg-indigo-500 text-white'
                      : card.type ===
                          'output'
                        ? 'border-violet-500 bg-violet-500 text-white'
                        : 'border-dashed border-indigo-400 text-indigo-500',
                  ].join(
                    ' ',
                  )}
                >
                  {card.label}
                </div>
              ),
            )}
          </div>
        </div>

        {/* 완성 문장 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            완성 문장 · 실시간
          </p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
            당신은{' '}
            <strong>
              {roleValue ||
                '[역할]'}
            </strong>
            {' '}로서,{' '}
            <strong>
              {targetValue ||
                '[대상]'}
            </strong>
            를 분석해{' '}
            <strong>
              {taskValue ||
                '[작업]'}
            </strong>
            하고{' '}
            <strong>
              {outputValue ||
                '[출력]'}
            </strong>
            {' '}형식으로
            정리하세요.
          </div>
        </div>

        {/* 범례 */}
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-[10px] font-bold text-slate-500">
          <span>
            🔵 역할
          </span>

          <span>
            🟣 작업
          </span>

          <span>
            🔷 대상
          </span>

          <span>
            🟢 출력
          </span>

          <span>
            🟤 조건
          </span>

          <span>
            🟡 참고
          </span>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={
              resetSlots
            }
            className="rounded-lg border border-dashed border-slate-200 px-4 py-2 text-xs font-bold text-slate-400"
          >
            ↻ 전체 초기화
          </button>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * PR-016
 * 요약 프롬프트 배치하기
 * ============================================================
 */

const summaryPromptCardMeta: Record<
  string,
  {
    type: string
    title: string
    description: string
  }
> = {
  role: {
    type: '역할',
    title: '분석가',
    description:
      '리뷰를 객관적으로 해석',
  },

  task: {
    type: '작업',
    title: '핵심 요약',
    description:
      '긍정·부정 요점 추출',
  },

  reference: {
    type: '참고',
    title: '리뷰 데이터',
    description:
      '연결된 참조 노드',
  },

  output: {
    type: '출력',
    title: '표',
    description:
      '항목별 빈도표',
  },
}

const defaultSummaryPromptCardOrder = [
  'role',
  'task',
  'reference',
  'output',
]

export function SummaryPromptLayoutInspector({
  slot,
  connectionInfo,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const cardOrder =
    getStringArray(
      slot.config,
      'cardOrder',
      defaultSummaryPromptCardOrder,
    )

  const showDetails =
    getBoolean(
      slot.config,
      'showDetails',
      true,
    )

  const [
    dragIndex,
    setDragIndex,
  ] =
    useState<number | null>(
      null,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextOrder =
      'cardOrder' in
      patch
        ? readStringArray(
            patch.cardOrder,
            cardOrder,
          )
        : cardOrder

    const complete =
      nextOrder.length >
      0

    const typeCount =
      new Set(
        nextOrder,
      ).size

    onConfigChange(
      {
        cardOrder,
        showDetails,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `유형 ${typeCount}종 배치`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  const reorderCard = (
    sourceIndex: number,
    targetIndex: number,
  ) => {
    if (
      sourceIndex ===
      targetIndex
    ) {
      return
    }

    const next =
      [
        ...cardOrder,
      ]

    const [
      moved,
    ] = next.splice(
      sourceIndex,
      1,
    )

    next.splice(
      targetIndex,
      0,
      moved,
    )

    save({
      cardOrder:
        next,
    })
  }

  const referenceNode =
    connectionInfo
      ?.incomingNodes.find(
        (node) =>
          node.stage ===
          'CONTEXT',
      ) ??
    connectionInfo
      ?.incomingNodes[0]

  const linkedCount =
    referenceNode
      ? 1
      : 0

  return (
    <ExpandableSettingBlock
      title="요약 프롬프트 배치하기"
      code="PR-016"
      stage="PROCESS"
      description="역할·작업·참고·출력 카드를 색과 아이콘으로 구분해 배치합니다."
      icon={
        <Layers3
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 1,
        optional: 1,
        missing:
          Number(
            cardOrder.length ===
              0,
          ),
      }}
      required={
        slot.required
      }
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            유형{' '}
            {
              new Set(
                cardOrder,
              ).size
            }
            종 배치 · 상세 연결{' '}
            {linkedCount}개
          </span>

          <button
            type="button"
            onClick={() =>
              save({})
            }
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700"
          >
            적용
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 요약 카드 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            요약 카드 · 드래그 정렬{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-4">
            {cardOrder.map(
              (
                cardId,
                index,
              ) => {
                const card =
                  summaryPromptCardMeta[
                    cardId
                  ]

                if (
                  !card
                ) {
                  return null
                }

                return (
                  <div
                    key={
                      cardId
                    }
                    draggable
                    onDragStart={() =>
                      setDragIndex(
                        index,
                      )
                    }
                    onDragOver={(
                      event,
                    ) =>
                      event.preventDefault()
                    }
                    onDrop={() => {
                      if (
                        dragIndex !==
                        null
                      ) {
                        reorderCard(
                          dragIndex,
                          index,
                        )
                      }

                      setDragIndex(
                        null,
                      )
                    }}
                    className="cursor-grab rounded-xl border-2 border-slate-200 px-5 py-4 active:cursor-grabbing"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={[
                          'rounded-md px-2 py-1 text-[10px] font-bold text-white',
                          cardId ===
                            'role'
                            ? 'bg-[#4A5E8A]'
                            : cardId ===
                                'task'
                              ? 'bg-indigo-500'
                              : cardId ===
                                  'reference'
                                ? 'bg-amber-700'
                                : 'bg-emerald-700',
                        ].join(
                          ' ',
                        )}
                      >
                        {card.type}
                      </span>

                      <span className="text-sm font-bold text-slate-700">
                        {card.title}
                      </span>
                    </div>

                    <p className="text-xs leading-5 text-slate-500">
                      {cardId ===
                      'reference'
                        ? referenceNode
                          ? `← ${referenceNode.title} 노드`
                          : '연결된 참조 노드 없음'
                        : card.description}
                    </p>
                  </div>
                )
              },
            )}

            {/*
             * Figma에는 "+ 카드 추가"가 존재하지만
             * 추가 후 카드 편집 UI는 제공되지 않았습니다.
             * 따라서 없는 편집 동작을 만들지 않습니다.
             */}
            <div className="flex h-[50px] items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400">
              <Plus
                size={14}
                className="mr-1"
              />
              카드 추가
            </div>
          </div>
        </div>

        {/* 상세 보기 */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              상세 보기
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <ToggleRow
            label="카드별 상세 프롬프트 펼쳐 보기"
            checked={
              showDetails
            }
            onChange={() =>
              save({
                showDetails:
                  !showDetails,
              })
            }
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
