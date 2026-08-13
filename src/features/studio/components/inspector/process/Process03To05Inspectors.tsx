import {
  useState,
} from 'react'

import {
  ArrowDownUp,
  GitCompareArrows,
  Layers3,
  Plus,
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
  getNumberArray,
  readStringArray,
  readNumberArray,
} from './processInspectorUtils'

/*
 * ============================================================
 * PR-003
 * 항목별로 분류하기
 * ============================================================
 */

const classificationCriteria = [
  '주제',
  '유형',
  '우선순위',
  '담당자',
  '상태',
  '공통점',
  '직접 입력',
]

const unclassifiedOptions = [
  '기타로 모으기',
  '별도 표시',
  '제외',
]

export function ClassifyItemsInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const classificationCriterion =
    getString(
      slot.config,
      'classificationCriterion',
      '직접 입력',
    )

  const categories =
    getStringArray(
      slot.config,
      'categories',
      [
        '',
        '',
      ],
    )

  const multiCategory =
    getBoolean(
      slot.config,
      'multiCategory',
      false,
    )

  const unclassifiedHandling =
    getString(
      slot.config,
      'unclassifiedHandling',
      '기타로 모으기',
    )

  const [
    dragIndex,
    setDragIndex,
  ] = useState<number | null>(
    null,
  )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextCriterion =
      typeof patch.classificationCriterion ===
      'string'
        ? patch.classificationCriterion
        : classificationCriterion

    const nextCategories =
      'categories' in patch
        ? readStringArray(
            patch.categories,
            categories,
          )
        : categories

    const nextMultiCategory =
      typeof patch.multiCategory ===
      'boolean'
        ? patch.multiCategory
        : multiCategory

    const nextUnclassified =
      typeof patch.unclassifiedHandling ===
      'string'
        ? patch.unclassifiedHandling
        : unclassifiedHandling

    const validCategories =
      nextCategories.filter(
        (item) =>
          item.trim().length >
          0,
      )

    const requiresCategories =
      nextCriterion ===
      '직접 입력'

    const complete =
      Boolean(
        nextCriterion,
      ) &&
      (
        !requiresCategories ||
        validCategories.length >=
          2
      ) &&
      Boolean(
        nextUnclassified,
      )

    onConfigChange(
      {
        classificationCriterion,
        categories,
        multiCategory,
        unclassifiedHandling,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? requiresCategories
              ? `${validCategories.length}개 카테고리`
              : nextCriterion
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  const updateCategory = (
    index: number,
    value: string,
  ) => {
    const next =
      [
        ...categories,
      ]

    next[index] =
      value

    save({
      categories:
        next,
    })
  }

  const addCategory = () => {
    save({
      categories: [
        ...categories,
        '',
      ],
    })
  }

  const reorderCategory = (
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
        ...categories,
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
      categories:
        next,
    })
  }

  const validCategoryCount =
    categories.filter(
      (item) =>
        item.trim(),
    ).length

  return (
    <ExpandableSettingBlock
      title="항목별로 분류하기"
      code="PR-003"
      stage="PROCESS"
      description="분류 기준을 정하고 카테고리를 구성합니다."
      icon={
        <Layers3
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 2,
        conditional: 1,
        optional: 1,
        missing:
          Number(
            classificationCriterion ===
              '직접 입력' &&
              validCategoryCount <
                2,
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
            {classificationCriterion ===
              '직접 입력' &&
            validCategoryCount <
              2
              ? '카테고리 2개 이상 필요'
              : '분류 설정 완료'}
          </span>

          <button
            type="button"
            onClick={() =>
              save({})
            }
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700"
          >
            검증
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            분류 기준{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="grid grid-cols-4 gap-2">
            {classificationCriteria.map(
              (
                option,
              ) => {
                const selected =
                  classificationCriterion ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        classificationCriterion:
                          option,
                      })
                    }
                    className={[
                      'min-h-[70px] rounded-xl border-2 px-2 py-3 text-xs font-bold',
                      selected
                        ? 'border-indigo-500 text-slate-700'
                        : 'border-slate-200 text-slate-500',
                    ].join(
                      ' ',
                    )}
                  >
                    {option}
                  </button>
                )
              },
            )}
          </div>
        </div>

        {classificationCriterion ===
          '직접 입력' && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <p className="text-xs font-bold text-slate-700">
                분류 카테고리
              </p>

              <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">
                조건부
              </span>
            </div>

            <p className="mb-3 text-[11px] font-semibold text-indigo-500">
              ↳ 직접 입력 선택됨
            </p>

            <div className="space-y-3">
              {categories.map(
                (
                  category,
                  index,
                ) => (
                  <div
                    key={
                      index
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
                        reorderCategory(
                          dragIndex,
                          index,
                        )
                      }

                      setDragIndex(
                        null,
                      )
                    }}
                    className="flex min-h-[52px] items-center gap-3 rounded-xl border-2 border-slate-200 px-4"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-500 text-[10px] font-bold text-white">
                      {index +
                        1}
                    </span>

                    <input
                      type="text"
                      value={
                        category
                      }
                      onChange={(
                        event,
                      ) =>
                        updateCategory(
                          index,
                          event.target
                            .value,
                        )
                      }
                      placeholder="카테고리 이름 입력"
                      className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>
                ),
              )}

              <button
                type="button"
                onClick={
                  addCategory
                }
                className="flex h-[48px] w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400"
              >
                <Plus
                  size={14}
                  className="mr-1"
                />
                카테고리 추가
              </button>
            </div>
          </div>
        )}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              다중 분류
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-600">
              한 항목이 여러 카테고리에 소속
            </span>

            <button
              type="button"
              onClick={() =>
                save({
                  multiCategory:
                    !multiCategory,
                })
              }
              className={[
                'relative h-[26px] w-[48px] rounded-full transition-colors',
                multiCategory
                  ? 'bg-indigo-500'
                  : 'bg-slate-200',
              ].join(
                ' ',
              )}
            >
              <span
                className={[
                  'absolute top-[3px] h-5 w-5 rounded-full bg-white transition-all',
                  multiCategory
                    ? 'left-[25px]'
                    : 'left-[3px]',
                ].join(
                  ' ',
                )}
              />
            </button>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            미분류 처리{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-2">
            {unclassifiedOptions.map(
              (
                option,
              ) => {
                const selected =
                  unclassifiedHandling ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        unclassifiedHandling:
                          option,
                      })
                    }
                    className={[
                      'flex h-[48px] w-full items-center gap-3 rounded-xl border-2 px-4 text-left text-sm font-bold',
                      selected
                        ? 'border-indigo-500 text-slate-700'
                        : 'border-slate-200 text-slate-500',
                    ].join(
                      ' ',
                    )}
                  >
                    <span
                      className={[
                        'h-4 w-4 rounded-full',
                        selected
                          ? 'bg-indigo-500'
                          : 'border border-slate-200',
                      ].join(
                        ' ',
                      )}
                    />

                    {option}
                  </button>
                )
              },
            )}
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * PR-004
 * 비교하기
 * ============================================================
 */

const comparisonMethods = [
  '항목별 비교',
  '장단점',
  '공통·차이',
  '점수화',
]

const defaultComparisonTargets = [
  '우리 제품',
  '경쟁사 X',
  '경쟁사 Y',
]

const defaultCriterionNames = [
  '가격',
  '성능',
  '지원',
]

const defaultCriterionWeights = [
  0.6,
  0.85,
  0.4,
]

export function CompareInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const comparisonTargets =
    getStringArray(
      slot.config,
      'comparisonTargets',
      defaultComparisonTargets,
    )

  const criterionNames =
    getStringArray(
      slot.config,
      'criterionNames',
      defaultCriterionNames,
    )

  const criterionWeights =
    getNumberArray(
      slot.config,
      'criterionWeights',
      defaultCriterionWeights,
    )

  const comparisonMethod =
    getString(
      slot.config,
      'comparisonMethod',
      '항목별 비교',
    )

  const includeRecommendation =
    getBoolean(
      slot.config,
      'includeRecommendation',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextTargets =
      'comparisonTargets' in
      patch
        ? readStringArray(
            patch.comparisonTargets,
            comparisonTargets,
          )
        : comparisonTargets

    const nextCriterionNames =
      'criterionNames' in
      patch
        ? readStringArray(
            patch.criterionNames,
            criterionNames,
          )
        : criterionNames

    const nextCriterionWeights =
      'criterionWeights' in
      patch
        ? readNumberArray(
            patch.criterionWeights,
            criterionWeights,
          )
        : criterionWeights

    const nextMethod =
      typeof patch.comparisonMethod ===
      'string'
        ? patch.comparisonMethod
        : comparisonMethod

    const nextRecommendation =
      typeof patch.includeRecommendation ===
      'boolean'
        ? patch.includeRecommendation
        : includeRecommendation

    const validTargets =
      nextTargets.filter(
        (item) =>
          item.trim(),
      )

    const validCriteria =
      nextCriterionNames.filter(
        (item) =>
          item.trim(),
      )

    const complete =
      validTargets.length >=
        2 &&
      validCriteria.length >=
        1 &&
      Boolean(
        nextMethod,
      )

    onConfigChange(
      {
        comparisonTargets,
        criterionNames,
        criterionWeights,
        comparisonMethod,
        includeRecommendation,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `대상 ${validTargets.length} · 기준 ${validCriteria.length}`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )

    void nextCriterionWeights
    void nextRecommendation
  }

  const updateTarget = (
    index: number,
    value: string,
  ) => {
    const next =
      [
        ...comparisonTargets,
      ]

    next[index] =
      value

    save({
      comparisonTargets:
        next,
    })
  }

  const addTarget = () => {
    save({
      comparisonTargets: [
        ...comparisonTargets,
        '',
      ],
    })
  }

  const updateCriterionWeight = (
    index: number,
    weight: number,
  ) => {
    const next =
      [
        ...criterionWeights,
      ]

    next[index] =
      weight

    save({
      criterionWeights:
        next,
    })
  }

  return (
    <ExpandableSettingBlock
      title="비교하기"
      code="PR-004"
      stage="PROCESS"
      description="비교 대상과 기준을 각각 카드로 만들고 정렬합니다."
      icon={
        <GitCompareArrows
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 3,
        optional: 1,
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
            대상 2개 이상 · 기준 1개 이상
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
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            비교 대상{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-3">
            {comparisonTargets.map(
              (
                target,
                index,
              ) => (
                <div
                  key={
                    index
                  }
                  className="rounded-xl border-2 border-slate-200 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-[#4A5E8A] px-1.5 text-[10px] font-black text-white">
                      {String.fromCharCode(
                        65 +
                          index,
                      )}
                    </span>

                    <span className="text-xs font-bold text-slate-700">
                      제품{' '}
                      {String.fromCharCode(
                        65 +
                          index,
                      )}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={
                      target
                    }
                    onChange={(
                      event,
                    ) =>
                      updateTarget(
                        index,
                        event.target
                          .value,
                      )
                    }
                    placeholder="비교 대상 입력"
                    className="h-[36px] w-full rounded-lg bg-slate-100 px-3 text-xs text-slate-600 outline-none"
                  />
                </div>
              ),
            )}

            <button
              type="button"
              onClick={
                addTarget
              }
              className="flex h-[48px] w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400"
            >
              <Plus
                size={14}
                className="mr-1"
              />
              대상 추가
            </button>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            비교 기준{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-3">
            {criterionNames.map(
              (
                criterion,
                index,
              ) => {
                const weight =
                  criterionWeights[
                    index
                  ] ??
                  0.5

                return (
                  <div
                    key={
                      `${criterion}-${index}`
                    }
                    className="rounded-xl border-2 border-slate-200 p-4"
                  >
                    <p className="mb-2 text-xs font-bold text-slate-700">
                      {
                        criterion
                      }
                    </p>

                    <p className="mb-2 text-[10px] text-slate-400">
                      중요도
                    </p>

                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={
                        weight
                      }
                      onChange={(
                        event,
                      ) =>
                        updateCriterionWeight(
                          index,
                          Number(
                            event
                              .target
                              .value,
                          ),
                        )
                      }
                      className="w-full accent-indigo-500"
                    />

                    <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                      <span>
                        낮음
                      </span>

                      <span className="font-bold text-indigo-500">
                        {weight.toFixed(
                          2,
                        )}
                      </span>

                      <span>
                        높음
                      </span>
                    </div>
                  </div>
                )
              },
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            비교 방식{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-2">
            {comparisonMethods.map(
              (
                option,
              ) => {
                const selected =
                  comparisonMethod ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        comparisonMethod:
                          option,
                      })
                    }
                    className={[
                      'flex h-[48px] w-full items-center gap-3 rounded-xl border-2 px-4 text-left text-sm font-bold',
                      selected
                        ? 'border-indigo-500 text-slate-700'
                        : 'border-slate-200 text-slate-500',
                    ].join(
                      ' ',
                    )}
                  >
                    <span
                      className={[
                        'h-4 w-4 rounded-full',
                        selected
                          ? 'bg-indigo-500'
                          : 'border border-slate-200',
                      ].join(
                        ' ',
                      )}
                    />

                    {option}
                  </button>
                )
              },
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-700">
              결론 추천
            </p>

            <p className="mt-1 text-xs font-bold text-slate-600">
              가중치를 반영해 추천 제시
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              save({
                includeRecommendation:
                  !includeRecommendation,
              })
            }
            className={[
              'relative h-[26px] w-[48px] rounded-full',
              includeRecommendation
                ? 'bg-indigo-500'
                : 'bg-slate-200',
            ].join(
              ' ',
            )}
          >
            <span
              className={[
                'absolute top-[3px] h-5 w-5 rounded-full bg-white transition-all',
                includeRecommendation
                  ? 'left-[25px]'
                  : 'left-[3px]',
              ].join(
                ' ',
              )}
            />
          </button>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * PR-005
 * 순서대로 정리하기
 * ============================================================
 */

const orderCriteria = [
  '시간',
  '작업',
  '중요도',
  '선후',
  '직접',
]

const orderShapes = [
  '번호 목록',
  '단계',
  '타임라인',
  '절차도',
]

const defaultStepTitles = [
  '자료 수집',
  '핵심 정리',
  '결론 도출',
]

const defaultStepDescriptions = [
  '관련 문서 모으기',
  '요점 추출',
  '판단·정리',
]

export function OrderInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const orderCriterion =
    getString(
      slot.config,
      'orderCriterion',
      '시간',
    )

  const orderShape =
    getString(
      slot.config,
      'orderShape',
      '타임라인',
    )

  const stepTitles =
    getStringArray(
      slot.config,
      'stepTitles',
      defaultStepTitles,
    )

  const stepDescriptions =
    getStringArray(
      slot.config,
      'stepDescriptions',
      defaultStepDescriptions,
    )

  const showPrecondition =
    getBoolean(
      slot.config,
      'showPrecondition',
      true,
    )

  const showEstimatedTime =
    getBoolean(
      slot.config,
      'showEstimatedTime',
      false,
    )

  const [
    dragIndex,
    setDragIndex,
  ] = useState<number | null>(
    null,
  )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextCriterion =
      typeof patch.orderCriterion ===
      'string'
        ? patch.orderCriterion
        : orderCriterion

    const nextShape =
      typeof patch.orderShape ===
      'string'
        ? patch.orderShape
        : orderShape

    const nextTitles =
      'stepTitles' in
      patch
        ? readStringArray(
            patch.stepTitles,
            stepTitles,
          )
        : stepTitles

    const nextDescriptions =
      'stepDescriptions' in
      patch
        ? readStringArray(
            patch.stepDescriptions,
            stepDescriptions,
          )
        : stepDescriptions

    const complete =
      Boolean(
        nextCriterion,
      ) &&
      Boolean(
        nextShape,
      )

    onConfigChange(
      {
        orderCriterion,
        orderShape,
        stepTitles,
        stepDescriptions,
        showPrecondition,
        showEstimatedTime,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `${nextShape} · ${nextTitles.length}단계`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )

    void nextDescriptions
  }

  const updateStep = (
    index: number,
    title: string,
    description: string,
  ) => {
    const nextTitles =
      [
        ...stepTitles,
      ]

    const nextDescriptions =
      [
        ...stepDescriptions,
      ]

    nextTitles[index] =
      title

    nextDescriptions[index] =
      description

    save({
      stepTitles:
        nextTitles,

      stepDescriptions:
        nextDescriptions,
    })
  }

  const reorderStep = (
    sourceIndex: number,
    targetIndex: number,
  ) => {
    if (
      sourceIndex ===
      targetIndex
    ) {
      return
    }

    const nextTitles =
      [
        ...stepTitles,
      ]

    const nextDescriptions =
      [
        ...stepDescriptions,
      ]

    const [
      movedTitle,
    ] = nextTitles.splice(
      sourceIndex,
      1,
    )

    const [
      movedDescription,
    ] = nextDescriptions.splice(
      sourceIndex,
      1,
    )

    nextTitles.splice(
      targetIndex,
      0,
      movedTitle,
    )

    nextDescriptions.splice(
      targetIndex,
      0,
      movedDescription,
    )

    save({
      stepTitles:
        nextTitles,

      stepDescriptions:
        nextDescriptions,
    })
  }

  const addStep = () => {
    save({
      stepTitles: [
        ...stepTitles,
        '',
      ],

      stepDescriptions: [
        ...stepDescriptions,
        '',
      ],
    })
  }

  return (
    <ExpandableSettingBlock
      title="순서대로 정리하기"
      code="PR-005"
      stage="PROCESS"
      description="단계 카드를 끌어 순서를 지정합니다."
      icon={
        <ArrowDownUp
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 2,
        optional: 2,
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
            {orderShape} · {stepTitles.length}단계 배치 중
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
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            정렬 기준{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="grid grid-cols-3 gap-2">
            {orderCriteria.map(
              (
                option,
              ) => (
                <button
                  key={
                    option
                  }
                  type="button"
                  onClick={() =>
                    save({
                      orderCriterion:
                        option,
                    })
                  }
                  className={[
                    'h-[60px] rounded-xl border-2 text-xs font-bold',
                    orderCriterion ===
                    option
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-slate-200 text-slate-500',
                  ].join(
                    ' ',
                  )}
                >
                  {option}
                </button>
              ),
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            정리 형태{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-2">
            {orderShapes.map(
              (
                option,
              ) => (
                <button
                  key={
                    option
                  }
                  type="button"
                  onClick={() =>
                    save({
                      orderShape:
                        option,
                    })
                  }
                  className={[
                    'flex h-[48px] w-full items-center gap-3 rounded-xl border-2 px-4 text-left text-sm font-bold',
                    orderShape ===
                    option
                      ? 'border-indigo-500 text-slate-700'
                      : 'border-slate-200 text-slate-500',
                  ].join(
                    ' ',
                  )}
                >
                  <span
                    className={[
                      'h-4 w-4 rounded-full',
                      orderShape ===
                      option
                        ? 'bg-indigo-500'
                        : 'border border-slate-200',
                    ].join(
                      ' ',
                    )}
                  />

                  {option}
                </button>
              ),
            )}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              단계 블록 · 드래그 정렬 중
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-3">
            {stepTitles.map(
              (
                title,
                index,
              ) => (
                <div
                  key={
                    index
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
                      reorderStep(
                        dragIndex,
                        index,
                      )
                    }

                    setDragIndex(
                      null,
                    )
                  }}
                  className="rounded-xl border-2 border-slate-200 px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-indigo-500 px-1.5 text-[10px] font-bold text-white">
                      {index +
                        1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <input
                        type="text"
                        value={
                          title
                        }
                        onChange={(
                          event,
                        ) =>
                          updateStep(
                            index,
                            event.target
                              .value,
                            stepDescriptions[
                              index
                            ] ??
                              '',
                          )
                        }
                        placeholder="단계 제목"
                        className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                      />

                      <input
                        type="text"
                        value={
                          stepDescriptions[
                            index
                          ] ??
                          ''
                        }
                        onChange={(
                          event,
                        ) =>
                          updateStep(
                            index,
                            title,
                            event.target
                              .value,
                          )
                        }
                        placeholder="설명"
                        className="mt-1 w-full bg-transparent text-xs text-slate-400 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ),
            )}

            <button
              type="button"
              onClick={
                addStep
              }
              className="flex h-[48px] w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400"
            >
              <Plus
                size={14}
                className="mr-1"
              />
              단계 추가
            </button>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              단계 옵션
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">
                선행 조건 표시
              </span>

              <button
                type="button"
                onClick={() =>
                  save({
                    showPrecondition:
                      !showPrecondition,
                  })
                }
                className={[
                  'relative h-[26px] w-[48px] rounded-full',
                  showPrecondition
                    ? 'bg-indigo-500'
                    : 'bg-slate-200',
                ].join(
                  ' ',
                )}
              >
                <span
                  className={[
                    'absolute top-[3px] h-5 w-5 rounded-full bg-white',
                    showPrecondition
                      ? 'left-[25px]'
                      : 'left-[3px]',
                  ].join(
                    ' ',
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">
                예상 결과 표시
              </span>

              <button
                type="button"
                onClick={() =>
                  save({
                    showEstimatedTime:
                      !showEstimatedTime,
                  })
                }
                className={[
                  'relative h-[26px] w-[48px] rounded-full',
                  showEstimatedTime
                    ? 'bg-indigo-500'
                    : 'bg-slate-200',
                ].join(
                  ' ',
                )}
              >
                <span
                  className={[
                    'absolute top-[3px] h-5 w-5 rounded-full bg-white',
                    showEstimatedTime
                      ? 'left-[25px]'
                      : 'left-[3px]',
                  ].join(
                    ' ',
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

