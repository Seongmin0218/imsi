import {
  useState,
} from 'react'

import {
  ArrowDownUp,
  GitCompareArrows,
  Layers3,
  Link2,
  Plus,
  TriangleAlert,
  FilePenLine,
  ListChecks,
  Table2,
  CircleHelp,
  Puzzle,
  Sparkles,
} from 'lucide-react'

import {
  ExpandableSettingBlock,
} from '../../../../Block/components/layouts/ExpandableSettingBlock'

import type {
  StudioBlockConfig,
  StudioBlockConfigValue,
  StudioSlotState,
} from '../../../types/studioNode'

import type {
  StudioBlockInspectorComponentProps,
} from '../StudioBlockInspector'

const studioInspectorClassName =
  '!w-full !rounded-[12px] !border-[#E4E4E7] !shadow-none [&_.setting-block-fields]:!w-full [&_.setting-block-fields]:max-w-full'

function resolveState(
  complete: boolean,
): StudioSlotState {
  return complete
    ? 'filled'
    : 'empty'
}

function getString(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback = '',
): string {
  const value =
    config?.[key]

  return typeof value === 'string'
    ? value
    : fallback
}

function getBoolean(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback = false,
): boolean {
  const value =
    config?.[key]

  return typeof value === 'boolean'
    ? value
    : fallback
}

function getStringArray(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback: string[] = [],
): string[] {
  const value =
    config?.[key]

  if (!Array.isArray(value)) {
    return fallback
  }

  return value.filter(
    (
      item,
    ): item is string =>
      typeof item === 'string',
  )
}

function getNumberArray(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback: number[] = [],
): number[] {
  const value =
    config?.[key]

  if (!Array.isArray(value)) {
    return fallback
  }

  return value.filter(
    (
      item,
    ): item is number =>
      typeof item === 'number',
  )
}

function readStringArray(
  value:
    | StudioBlockConfigValue
    | undefined,
  fallback: string[],
): string[] {
  if (!Array.isArray(value)) {
    return fallback
  }

  return value.filter(
    (
      item,
    ): item is string =>
      typeof item === 'string',
  )
}

function readNumberArray(
  value:
    | StudioBlockConfigValue
    | undefined,
  fallback: number[],
): number[] {
  if (!Array.isArray(value)) {
    return fallback
  }

  return value.filter(
    (
      item,
    ): item is number =>
      typeof item === 'number',
  )
}

interface ToggleRowProps {
  label: string
  checked: boolean
  onChange: () => void
}

function ToggleRow({
  label,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-bold text-slate-600">
        {label}
      </span>

      <button
        type="button"
        onClick={
          onChange
        }
        aria-pressed={
          checked
        }
        className={[
          'relative h-[26px] w-[48px] shrink-0 rounded-full transition-colors',
          checked
            ? 'bg-indigo-500'
            : 'bg-slate-200',
        ].join(
          ' ',
        )}
      >
        <span
          className={[
            'absolute top-[3px] h-5 w-5 rounded-full bg-white transition-all',
            checked
              ? 'left-[25px]'
              : 'left-[3px]',
          ].join(
            ' ',
          )}
        />
      </button>
    </div>
  )
}

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

/*
 * ============================================================
 * PR-006
 * 기능으로 분해하기
 * ============================================================
 */

const decompositionTargets = [
  '화면',
  '요구사항',
  '흐름',
  '문서',
]

const decompositionLevels = [
  '상위',
  '기본',
  '세부',
]

const decompositionInfoOptions = [
  '기능명',
  '목적',
  '트리거',
  '입력',
  '출력',
  '상태',
]

export function DecomposeFunctionsInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const decompositionTarget =
    getString(
      slot.config,
      'decompositionTarget',
      '화면',
    )

  const decompositionLevel =
    getString(
      slot.config,
      'decompositionLevel',
      '기본',
    )

  const includedInfo =
    getStringArray(
      slot.config,
      'includedInfo',
      [
        '기능명',
        '목적',
      ],
    )

  const groupByScreen =
    getBoolean(
      slot.config,
      'groupByScreen',
      false,
    )

  const autoAssignId =
    getBoolean(
      slot.config,
      'autoAssignId',
      false,
    )

  const showRequirementLevel =
    getBoolean(
      slot.config,
      'showRequirementLevel',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextTarget =
      typeof patch.decompositionTarget ===
      'string'
        ? patch.decompositionTarget
        : decompositionTarget

    const nextLevel =
      typeof patch.decompositionLevel ===
      'string'
        ? patch.decompositionLevel
        : decompositionLevel

    const nextIncludedInfo =
      'includedInfo' in patch
        ? readStringArray(
            patch.includedInfo,
            includedInfo,
          )
        : includedInfo

    const complete =
      Boolean(
        nextTarget,
      ) &&
      Boolean(
        nextLevel,
      ) &&
      nextIncludedInfo.length >
        0

    onConfigChange(
      {
        decompositionTarget,
        decompositionLevel,
        includedInfo,
        groupByScreen,
        autoAssignId,
        showRequirementLevel,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `${nextTarget} · ${nextLevel}`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  const toggleIncludedInfo = (
    item: string,
  ) => {
    const next =
      includedInfo.includes(
        item,
      )
        ? includedInfo.filter(
            (value) =>
              value !==
              item,
          )
        : [
            ...includedInfo,
            item,
          ]

    save({
      includedInfo:
        next,
    })
  }

  return (
    <ExpandableSettingBlock
      title="기능으로 분해하기"
      code="PR-006"
      stage="PROCESS"
      description="대상을 기능 단위로 분해합니다."
      icon={
        <Layers3
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 3,
        optional: 2,
        missing:
          Number(
            !decompositionTarget,
          ) +
          Number(
            !decompositionLevel,
          ) +
          Number(
            includedInfo.length ===
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
            기본값으로 적용 가능
          </span>

          <button
            type="button"
            onClick={() =>
              save({})
            }
            className="rounded-lg bg-indigo-500 px-4 py-2 text-xs font-bold text-white"
          >
            적용
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            분해 대상{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="grid grid-cols-4 gap-2">
            {decompositionTargets.map(
              (
                option,
              ) => {
                const selected =
                  decompositionTarget ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        decompositionTarget:
                          option,
                      })
                    }
                    className={[
                      'h-[48px] rounded-xl border-2 text-xs font-bold',
                      selected
                        ? 'border-indigo-500 text-indigo-500'
                        : 'border-slate-200 text-slate-600',
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

        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            분해 수준{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex overflow-hidden rounded-xl border-2 border-slate-200">
            {decompositionLevels.map(
              (
                option,
              ) => {
                const selected =
                  decompositionLevel ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        decompositionLevel:
                          option,
                      })
                    }
                    className={[
                      'h-[44px] flex-1 border-r border-slate-200 text-xs font-bold last:border-r-0',
                      selected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white text-slate-600',
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

        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            포함 정보{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex flex-wrap gap-2">
            {decompositionInfoOptions.map(
              (
                option,
              ) => {
                const selected =
                  includedInfo.includes(
                    option,
                  )

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      toggleIncludedInfo(
                        option,
                      )
                    }
                    className={[
                      'flex h-[34px] items-center gap-2 rounded-lg border px-3 text-xs font-bold',
                      selected
                        ? 'border-indigo-200 text-indigo-600'
                        : 'border-slate-200 text-slate-600',
                    ].join(
                      ' ',
                    )}
                  >
                    <span
                      className={[
                        'flex h-4 w-4 items-center justify-center rounded',
                        selected
                          ? 'bg-indigo-500 text-white'
                          : 'border border-slate-300',
                      ].join(
                        ' ',
                      )}
                    >
                      {selected
                        ? '✓'
                        : ''}
                    </span>

                    {option}
                  </button>
                )
              },
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              그룹화
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <ToggleRow
            label="화면별로 그룹"
            checked={
              groupByScreen
            }
            onChange={() =>
              save({
                groupByScreen:
                  !groupByScreen,
              })
            }
          />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              ID·우선순위
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-4">
            <ToggleRow
              label="자동 ID 부여"
              checked={
                autoAssignId
              }
              onChange={() =>
                save({
                  autoAssignId:
                    !autoAssignId,
                })
              }
            />

            <ToggleRow
              label="필수·권장 표시"
              checked={
                showRequirementLevel
              }
              onChange={() =>
                save({
                  showRequirementLevel:
                    !showRequirementLevel,
                })
              }
            />
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * PR-007
 * 정책과 연결하기
 * ============================================================
 */

const policyLinkTargets = [
  '기능',
  '화면',
  '행동',
  '데이터',
]

const policyTypeOptions = [
  '권한',
  '상태',
  '검증',
  '예외',
  '저장',
  '공개',
]

const noPolicyHandlingOptions = [
  '미정으로 표시',
  '질문으로 남김',
  '제외',
]

export function LinkPolicyInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const connectionTarget =
    getString(
      slot.config,
      'connectionTarget',
      '기능',
    )

  const policyDocument =
    getString(
      slot.config,
      'policyDocument',
    )

  const policyTypes =
    getStringArray(
      slot.config,
      'policyTypes',
    )

  const matchingMode =
    getString(
      slot.config,
      'matchingMode',
      '추천',
    )

  const noPolicyHandling =
    getString(
      slot.config,
      'noPolicyHandling',
      '미정으로 표시',
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextTarget =
      typeof patch.connectionTarget ===
      'string'
        ? patch.connectionTarget
        : connectionTarget

    const nextDocument =
      typeof patch.policyDocument ===
      'string'
        ? patch.policyDocument
        : policyDocument

    const nextTypes =
      'policyTypes' in patch
        ? readStringArray(
            patch.policyTypes,
            policyTypes,
          )
        : policyTypes

    const nextMatchingMode =
      typeof patch.matchingMode ===
      'string'
        ? patch.matchingMode
        : matchingMode

    const nextNoPolicyHandling =
      typeof patch.noPolicyHandling ===
      'string'
        ? patch.noPolicyHandling
        : noPolicyHandling

    const complete =
      Boolean(
        nextTarget,
      ) &&
      Boolean(
        nextDocument,
      ) &&
      nextTypes.length >
        0 &&
      Boolean(
        nextMatchingMode,
      ) &&
      Boolean(
        nextNoPolicyHandling,
      )

    onConfigChange(
      {
        connectionTarget,
        policyDocument,
        policyTypes,
        matchingMode,
        noPolicyHandling,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `${nextTarget} · 정책 ${nextTypes.length}개`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  const togglePolicyType = (
    type: string,
  ) => {
    const next =
      policyTypes.includes(
        type,
      )
        ? policyTypes.filter(
            (item) =>
              item !==
              type,
          )
        : [
            ...policyTypes,
            type,
          ]

    save({
      policyTypes:
        next,
    })
  }

  return (
    <ExpandableSettingBlock
      title="정책과 연결하기"
      code="PR-007"
      stage="PROCESS"
      description="기능·화면을 정책 문서와 연결합니다."
      icon={
        <Link2
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 5,
        missing:
          Number(
            !policyDocument,
          ) +
          Number(
            policyTypes.length ===
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
            {policyDocument
              ? '정책 연결 설정 완료'
              : '정책 문서 미선택'}
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
            연결 대상{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="grid grid-cols-4 gap-2">
            {policyLinkTargets.map(
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
                      connectionTarget:
                        option,
                    })
                  }
                  className={[
                    'h-[44px] rounded-xl border-2 text-xs font-bold',
                    connectionTarget ===
                    option
                      ? 'border-indigo-500 text-indigo-500'
                      : 'border-slate-200 text-slate-600',
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
            정책 문서{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div
            className={[
              'flex min-h-[64px] items-center gap-3 rounded-xl border-2 px-4',
              policyDocument
                ? 'border-slate-200 bg-white'
                : 'border-rose-200 bg-rose-50',
            ].join(
              ' ',
            )}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-400">
              DOC
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-500">
                {policyDocument ||
                  '정책 문서를 선택하세요'}
              </p>

              {!policyDocument && (
                <p className="mt-1 text-[10px] font-bold text-rose-400">
                  필수 · 미선택
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            정책 유형{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex flex-wrap gap-2">
            {policyTypeOptions.map(
              (
                option,
              ) => {
                const selected =
                  policyTypes.includes(
                    option,
                  )

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      togglePolicyType(
                        option,
                      )
                    }
                    className="flex h-[34px] items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600"
                  >
                    <span
                      className={[
                        'h-4 w-4 rounded',
                        selected
                          ? 'bg-indigo-500'
                          : 'border border-slate-300',
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

        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            매칭 방식{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex overflow-hidden rounded-xl border-2 border-slate-200">
            {[
              '직접',
              '추천',
            ].map(
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
                      matchingMode:
                        option,
                    })
                  }
                  className={[
                    'h-[44px] flex-1 text-xs font-bold',
                    matchingMode ===
                    option
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-slate-600',
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
            정책 없음 처리{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-2">
            {noPolicyHandlingOptions.map(
              (
                option,
              ) => {
                const selected =
                  noPolicyHandling ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        noPolicyHandling:
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
 * PR-008
 * 예외 케이스 찾기
 * ============================================================
 */

const exceptionTypeOptions = [
  '빈 상태',
  '입력 오류',
  '네트워크',
  '권한',
  '중복',
  '삭제',
  '한도 초과',
]

const exceptionAnalysisScopes = [
  '선택 기능',
  '단계',
  '전체',
]

const responseScopeOptions = [
  '사용자 대응',
  '시스템 대응',
  '정책 질문',
]

export function FindExceptionsInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const exceptionTypes =
    getStringArray(
      slot.config,
      'exceptionTypes',
      [
        '빈 상태',
        '입력 오류',
      ],
    )

  const analysisScope =
    getString(
      slot.config,
      'analysisScope',
      '전체',
    )

  const showSeverity =
    getBoolean(
      slot.config,
      'showSeverity',
      false,
    )

  const responseScopes =
    getStringArray(
      slot.config,
      'responseScopes',
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextTypes =
      'exceptionTypes' in
      patch
        ? readStringArray(
            patch.exceptionTypes,
            exceptionTypes,
          )
        : exceptionTypes

    const nextScope =
      typeof patch.analysisScope ===
      'string'
        ? patch.analysisScope
        : analysisScope

    const complete =
      nextTypes.length >
        0 &&
      Boolean(
        nextScope,
      )

    onConfigChange(
      {
        exceptionTypes,
        analysisScope,
        showSeverity,
        responseScopes,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `유형 ${nextTypes.length}개 · ${nextScope}`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  const toggleExceptionType = (
    item: string,
  ) => {
    const next =
      exceptionTypes.includes(
        item,
      )
        ? exceptionTypes.filter(
            (value) =>
              value !==
              item,
          )
        : [
            ...exceptionTypes,
            item,
          ]

    save({
      exceptionTypes:
        next,
    })
  }

  const toggleResponseScope = (
    item: string,
  ) => {
    const next =
      responseScopes.includes(
        item,
      )
        ? responseScopes.filter(
            (value) =>
              value !==
              item,
          )
        : [
            ...responseScopes,
            item,
          ]

    save({
      responseScopes:
        next,
    })
  }

  return (
    <ExpandableSettingBlock
      title="예외 케이스 찾기"
      code="PR-008"
      stage="PROCESS"
      description="점검할 예외 유형과 범위를 정합니다."
      icon={
        <TriangleAlert
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        optional: 2,
        missing:
          Number(
            exceptionTypes.length ===
              0,
          ) +
          Number(
            !analysisScope,
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
            유형 {exceptionTypes.length}개 선택 · {analysisScope} 범위
          </span>

          <button
            type="button"
            onClick={() =>
              save({})
            }
            className="rounded-lg bg-indigo-500 px-4 py-2 text-xs font-bold text-white"
          >
            적용
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            예외 유형{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-2">
            {exceptionTypeOptions.map(
              (
                option,
              ) => {
                const selected =
                  exceptionTypes.includes(
                    option,
                  )

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      toggleExceptionType(
                        option,
                      )
                    }
                    className={[
                      'flex h-[48px] w-full items-center gap-3 rounded-xl border-2 px-4 text-left text-sm font-bold',
                      selected
                        ? 'border-indigo-500 text-slate-700'
                        : 'border-slate-200 text-slate-600',
                    ].join(
                      ' ',
                    )}
                  >
                    <span
                      className={[
                        'h-4 w-4 rounded',
                        selected
                          ? 'bg-indigo-500'
                          : 'border border-slate-300',
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

        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            분석 범위{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex gap-2">
            {exceptionAnalysisScopes.map(
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
                      analysisScope:
                        option,
                    })
                  }
                  className={[
                    'h-[38px] rounded-lg px-4 text-xs font-bold',
                    analysisScope ===
                    option
                      ? 'text-indigo-500'
                      : 'border border-slate-200 text-slate-600',
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
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              심각도
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <ToggleRow
            label="치명적·주의·경미 구분 표시"
            checked={
              showSeverity
            }
            onChange={() =>
              save({
                showSeverity:
                  !showSeverity,
              })
            }
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              대응 범위
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {responseScopeOptions.map(
              (
                option,
              ) => {
                const selected =
                  responseScopes.includes(
                    option,
                  )

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      toggleResponseScope(
                        option,
                      )
                    }
                    className="flex h-[34px] items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600"
                  >
                    <span
                      className={[
                        'h-4 w-4 rounded',
                        selected
                          ? 'bg-indigo-500'
                          : 'border border-slate-300',
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
 * PR-009
 * 초안 작성하기
 * ============================================================
 */

const draftDocumentTypes = [
  '보고서',
  '기획',
  '기능명세',
  '이메일',
  '블로그',
  '안내',
  '일반',
]

const draftCompositionModes = [
  '자동',
  '템플릿',
  '직접 목차',
]

const draftCompletionLevels = [
  '뼈대',
  '수정용',
  '거의 완성',
]

const draftMissingInfoOptions = [
  '미정으로 표시',
  '가정으로 채움',
  '질문으로 남김',
]

export function DraftInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const documentType =
    getString(
      slot.config,
      'documentType',
      '보고서',
    )

  const purpose =
    getString(
      slot.config,
      'purpose',
    )

  const compositionMode =
    getString(
      slot.config,
      'compositionMode',
      '직접 목차',
    )

  const sections =
    getStringArray(
      slot.config,
      'sections',
      [
        '',
        '',
      ],
    )

  const completionLevel =
    getString(
      slot.config,
      'completionLevel',
      '수정용',
    )

  const missingInfoHandling =
    getString(
      slot.config,
      'missingInfoHandling',
      '미정으로 표시',
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
    const nextDocumentType =
      typeof patch.documentType ===
      'string'
        ? patch.documentType
        : documentType

    const nextPurpose =
      typeof patch.purpose ===
      'string'
        ? patch.purpose
        : purpose

    const nextCompositionMode =
      typeof patch.compositionMode ===
      'string'
        ? patch.compositionMode
        : compositionMode

    const nextSections =
      'sections' in patch
        ? readStringArray(
            patch.sections,
            sections,
          )
        : sections

    const nextCompletionLevel =
      typeof patch.completionLevel ===
      'string'
        ? patch.completionLevel
        : completionLevel

    const nextMissingInfoHandling =
      typeof patch.missingInfoHandling ===
      'string'
        ? patch.missingInfoHandling
        : missingInfoHandling

    /*
     * Figma 기준 필수 3:
     * - 문서 유형
     * - 작성 목적
     * - 구성 방식
     *
     * 직접 목차의 목차 블록은 조건부 영역이므로
     * 빈 섹션 자체를 별도의 필수 누락으로 계산하지 않습니다.
     */
    const complete =
      Boolean(
        nextDocumentType,
      ) &&
      Boolean(
        nextPurpose.trim(),
      ) &&
      Boolean(
        nextCompositionMode,
      )

    onConfigChange(
      {
        documentType,
        purpose,
        compositionMode,
        sections,
        completionLevel,
        missingInfoHandling,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `${nextDocumentType} · ${nextCompletionLevel}`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )

    void nextSections
    void nextMissingInfoHandling
  }

  const updateSection = (
    index: number,
    value: string,
  ) => {
    const next =
      [
        ...sections,
      ]

    next[index] =
      value

    save({
      sections:
        next,
    })
  }

  const addSection = () => {
    save({
      sections: [
        ...sections,
        '',
      ],
    })
  }

  const reorderSection = (
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
        ...sections,
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
      sections:
        next,
    })
  }

  return (
    <ExpandableSettingBlock
      title="초안 작성하기"
      code="PR-009"
      stage="PROCESS"
      description="문서 유형과 목적, 구성 방식을 정해 초안을 만듭니다."
      icon={
        <FilePenLine
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 3,
        conditional: 1,
        optional: 2,
        missing:
          Number(
            !purpose.trim(),
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
            {purpose.trim()
              ? '초안 설정 완료'
              : '작성 목적 미입력'}
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
            문서 유형{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="grid grid-cols-4 gap-2">
            {draftDocumentTypes.map(
              (
                option,
              ) => {
                const selected =
                  documentType ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        documentType:
                          option,
                      })
                    }
                    className={[
                      'min-h-[64px] rounded-xl border-2 px-2 text-xs font-bold',
                      selected
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-slate-200 text-slate-600',
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

        <label className="block">
          <span className="mb-3 block text-xs font-bold text-slate-700">
            작성 목적{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <input
            type="text"
            value={
              purpose
            }
            onChange={(
              event,
            ) =>
              save({
                purpose:
                  event.target
                    .value,
              })
            }
            placeholder="작성 목적을 입력하세요"
            className={[
              'h-[48px] w-full rounded-xl border-2 px-4 text-sm outline-none',
              purpose.trim()
                ? 'border-slate-200 focus:border-indigo-500'
                : 'border-rose-200 focus:border-rose-400',
            ].join(
              ' ',
            )}
          />

          {!purpose.trim() && (
            <p className="mt-2 text-xs font-semibold text-rose-500">
              ▲ 필수 항목입니다
            </p>
          )}
        </label>

        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            구성 방식{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex overflow-hidden rounded-xl border-2 border-slate-200">
            {draftCompositionModes.map(
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
                      compositionMode:
                        option,
                    })
                  }
                  className={[
                    'h-[44px] flex-1 border-r border-slate-200 text-xs font-bold last:border-r-0',
                    compositionMode ===
                    option
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-slate-600',
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

        {compositionMode ===
          '직접 목차' && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <p className="text-xs font-bold text-slate-700">
                목차 블록
              </p>

              <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">
                조건부
              </span>
            </div>

            <p className="mb-3 text-[11px] font-semibold text-indigo-500">
              ↳ 직접 목차 선택됨
            </p>

            <div className="space-y-3">
              {sections.map(
                (
                  section,
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
                        reorderSection(
                          dragIndex,
                          index,
                        )
                      }

                      setDragIndex(
                        null,
                      )
                    }}
                    className="flex h-[52px] items-center gap-3 rounded-xl border-2 border-slate-200 px-4"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-500 text-[10px] font-bold text-white">
                      {index +
                        1}
                    </span>

                    <input
                      type="text"
                      value={
                        section
                      }
                      onChange={(
                        event,
                      ) =>
                        updateSection(
                          index,
                          event.target
                            .value,
                        )
                      }
                      placeholder="섹션 제목 입력"
                      className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>
                ),
              )}

              <button
                type="button"
                onClick={
                  addSection
                }
                className="flex h-[48px] w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400"
              >
                <Plus
                  size={14}
                  className="mr-1"
                />
                섹션 추가
              </button>
            </div>
          </div>
        )}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              완성도
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="flex overflow-hidden rounded-xl border-2 border-slate-200">
            {draftCompletionLevels.map(
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
                      completionLevel:
                        option,
                    })
                  }
                  className={[
                    'h-[44px] flex-1 border-r border-slate-200 text-xs font-bold last:border-r-0',
                    completionLevel ===
                    option
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-slate-600',
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
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              빈 정보
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-2">
            {draftMissingInfoOptions.map(
              (
                option,
              ) => {
                const selected =
                  missingInfoHandling ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        missingInfoHandling:
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
 * PR-010
 * 표로 재구성하기
 * ============================================================
 */

const tablePurposeOptions = [
  '요약',
  '비교',
  '기능',
  '일정',
  '체크',
]

const tableCellLengthOptions = [
  '한 줄',
  '짧게',
  '자세히',
]

const defaultTableColumns = [
  '항목',
  '제품 A',
  '제품 B',
]

export function TableTransformInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const tablePurpose =
    getString(
      slot.config,
      'tablePurpose',
      '비교',
    )

  const columns =
    getStringArray(
      slot.config,
      'columns',
      defaultTableColumns,
    )

  const rowKey =
    getString(
      slot.config,
      'rowKey',
      '기능',
    )

  const cellLength =
    getString(
      slot.config,
      'cellLength',
      '짧게',
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
    const nextPurpose =
      typeof patch.tablePurpose ===
      'string'
        ? patch.tablePurpose
        : tablePurpose

    const nextColumns =
      'columns' in patch
        ? readStringArray(
            patch.columns,
            columns,
          )
        : columns

    const nextRowKey =
      typeof patch.rowKey ===
      'string'
        ? patch.rowKey
        : rowKey

    const validColumns =
      nextColumns.filter(
        (item) =>
          item.trim(),
      )

    const complete =
      Boolean(
        nextPurpose,
      ) &&
      validColumns.length >=
        2 &&
      Boolean(
        nextRowKey,
      )

    onConfigChange(
      {
        tablePurpose,
        columns,
        rowKey,
        cellLength,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `${nextPurpose} · 열 ${validColumns.length}개`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  const updateColumn = (
    index: number,
    value: string,
  ) => {
    const next =
      [
        ...columns,
      ]

    next[index] =
      value

    save({
      columns:
        next,
    })
  }

  const addColumn = () => {
    save({
      columns: [
        ...columns,
        '',
      ],
    })
  }

  const reorderColumn = (
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
        ...columns,
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
      columns:
        next,
    })
  }

  return (
    <ExpandableSettingBlock
      title="표로 재구성하기"
      code="PR-010"
      stage="PROCESS"
      description="열 블록을 가로로 끌어 순서를 바꾸고, 행 기준을 정합니다."
      icon={
        <Table2
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 3,
        optional: 1,
        missing:
          Number(
            columns.filter(
              (item) =>
                item.trim(),
            ).length <
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
            열 2개 이상 · 미리보기 갱신됨
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
            표 목적{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex flex-wrap gap-2">
            {tablePurposeOptions.map(
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
                      tablePurpose:
                        option,
                    })
                  }
                  className={[
                    'h-[38px] rounded-lg px-4 text-xs font-bold',
                    tablePurpose ===
                    option
                      ? 'text-indigo-500'
                      : 'border border-slate-200 text-slate-600',
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
            열 구성 · 가로 드래그{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {columns.map(
              (
                column,
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
                      reorderColumn(
                        dragIndex,
                        index,
                      )
                    }

                    setDragIndex(
                      null,
                    )
                  }}
                  className="w-[120px] shrink-0 rounded-xl border-2 border-slate-200 p-3"
                >
                  <div className="mb-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>
                      •••
                    </span>
                  </div>

                  <input
                    type="text"
                    value={
                      column
                    }
                    onChange={(
                      event,
                    ) =>
                      updateColumn(
                        index,
                        event.target
                          .value,
                      )
                    }
                    placeholder="열 이름"
                    className="w-full bg-transparent text-xs font-bold text-slate-700 outline-none"
                  />

                  <div className="mt-3 space-y-1">
                    <div className="h-2 rounded bg-slate-100" />
                    <div className="h-2 w-4/5 rounded bg-slate-100" />
                    <div className="h-2 w-2/3 rounded bg-slate-100" />
                  </div>
                </div>
              ),
            )}

            <button
              type="button"
              onClick={
                addColumn
              }
              className="flex w-[62px] shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400"
            >
              <Plus
                size={22}
              />
            </button>
          </div>
        </div>

        <label className="block">
          <span className="mb-3 block text-xs font-bold text-slate-700">
            행 기준{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <select
            value={
              rowKey
            }
            onChange={(
              event,
            ) =>
              save({
                rowKey:
                  event.target
                    .value,
              })
            }
            className="h-[48px] w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="기능">
              기능
            </option>

            <option value="항목">
              항목
            </option>

            <option value="단계">
              단계
            </option>

            <option value="대상">
              대상
            </option>
          </select>
        </label>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              셀 길이
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="flex overflow-hidden rounded-xl border-2 border-slate-200">
            {tableCellLengthOptions.map(
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
                      cellLength:
                        option,
                    })
                  }
                  className={[
                    'h-[44px] flex-1 border-r border-slate-200 text-xs font-bold last:border-r-0',
                    cellLength ===
                    option
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-slate-600',
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
            미리보기
          </p>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="grid grid-cols-3 bg-slate-100">
              {columns
                .slice(
                  0,
                  3,
                )
                .map(
                  (
                    column,
                    index,
                  ) => (
                    <div
                      key={
                        index
                      }
                      className="px-3 py-3 text-xs font-bold text-slate-700"
                    >
                      {column ||
                        '열'}
                    </div>
                  ),
                )}
            </div>

            <div className="grid grid-cols-3 border-t border-slate-200">
              <div className="px-3 py-3 text-xs text-slate-600">
                가격
              </div>

              <div className="px-3 py-3 text-xs text-slate-600">
                ₩29,000
              </div>

              <div className="px-3 py-3 text-xs text-slate-600">
                ₩34,000
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-slate-200">
              <div className="px-3 py-3 text-xs text-slate-600">
                지원
              </div>

              <div className="px-3 py-3 text-xs text-slate-600">
                24시간
              </div>

              <div className="px-3 py-3 text-xs text-slate-600">
                평일
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * PR-011
 * 체크리스트로 바꾸기
 * ============================================================
 */

const checklistPurposeOptions = [
  '실행',
  '품질',
  '제출',
  'QA',
]

const checklistDetailLevels = [
  '핵심',
  '기본',
  '상세',
]

const checklistStatusOptions = [
  '미완료',
  '진행',
  '완료',
  '보류',
]

export function ChecklistTransformInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const checklistPurpose =
    getString(
      slot.config,
      'checklistPurpose',
      '실행',
    )

  const detailLevel =
    getString(
      slot.config,
      'detailLevel',
      '기본',
    )

  const groupBasis =
    getString(
      slot.config,
      'groupBasis',
      '단계',
    )

  const statusValues =
    getStringArray(
      slot.config,
      'statusValues',
      [
        '미완료',
      ],
    )

  const showCompletionCriteria =
    getBoolean(
      slot.config,
      'showCompletionCriteria',
      false,
    )

  const showAssignee =
    getBoolean(
      slot.config,
      'showAssignee',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextPurpose =
      typeof patch.checklistPurpose ===
      'string'
        ? patch.checklistPurpose
        : checklistPurpose

    const nextDetailLevel =
      typeof patch.detailLevel ===
      'string'
        ? patch.detailLevel
        : detailLevel

    const nextStatusValues =
      'statusValues' in patch
        ? readStringArray(
            patch.statusValues,
            statusValues,
          )
        : statusValues

    const complete =
      Boolean(
        nextPurpose,
      ) &&
      Boolean(
        nextDetailLevel,
      )

    onConfigChange(
      {
        checklistPurpose,
        detailLevel,
        groupBasis,
        statusValues,
        showCompletionCriteria,
        showAssignee,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `${nextPurpose} · ${nextDetailLevel}`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )

    void nextStatusValues
  }

  const toggleStatus = (
    option: string,
  ) => {
    const next =
      statusValues.includes(
        option,
      )
        ? statusValues.filter(
            (item) =>
              item !==
              option,
          )
        : [
            ...statusValues,
            option,
          ]

    save({
      statusValues:
        next,
    })
  }

  return (
    <ExpandableSettingBlock
      title="체크리스트로 바꾸기"
      code="PR-011"
      stage="PROCESS"
      description="내용을 점검 가능한 체크리스트로 변환합니다."
      icon={
        <ListChecks
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        optional: 3,
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
            기본값으로 적용 가능
          </span>

          <button
            type="button"
            onClick={() =>
              save({})
            }
            className="rounded-lg bg-indigo-500 px-4 py-2 text-xs font-bold text-white"
          >
            적용
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            체크 목적{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="grid grid-cols-4 gap-2">
            {checklistPurposeOptions.map(
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
                      checklistPurpose:
                        option,
                    })
                  }
                  className={[
                    'min-h-[64px] rounded-xl border-2 text-xs font-bold',
                    checklistPurpose ===
                    option
                      ? 'border-indigo-500 text-indigo-500'
                      : 'border-slate-200 text-slate-600',
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
            상세 수준{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex overflow-hidden rounded-xl border-2 border-slate-200">
            {checklistDetailLevels.map(
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
                      detailLevel:
                        option,
                    })
                  }
                  className={[
                    'h-[44px] flex-1 border-r border-slate-200 text-xs font-bold last:border-r-0',
                    detailLevel ===
                    option
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-slate-600',
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

        <label className="block">
          <span className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              그룹 기준
            </span>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </span>

          <select
            value={
              groupBasis
            }
            onChange={(
              event,
            ) =>
              save({
                groupBasis:
                  event.target
                    .value,
              })
            }
            className="h-[48px] w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none"
          >
            <option value="단계">
              단계
            </option>

            <option value="기능">
              기능
            </option>

            <option value="담당자">
              담당자
            </option>

            <option value="없음">
              없음
            </option>
          </select>
        </label>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              상태값
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {checklistStatusOptions.map(
              (
                option,
              ) => {
                const selected =
                  statusValues.includes(
                    option,
                  )

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      toggleStatus(
                        option,
                      )
                    }
                    className="flex h-[34px] items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600"
                  >
                    <span
                      className={[
                        'flex h-4 w-4 items-center justify-center rounded',
                        selected
                          ? 'bg-indigo-500 text-white'
                          : 'border border-slate-300',
                      ].join(
                        ' ',
                      )}
                    >
                      {selected
                        ? '✓'
                        : ''}
                    </span>

                    {option}
                  </button>
                )
              },
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              부가 열
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-4">
            <ToggleRow
              label="완료 기준 열"
              checked={
                showCompletionCriteria
              }
              onChange={() =>
                save({
                  showCompletionCriteria:
                    !showCompletionCriteria,
                })
              }
            />

            <ToggleRow
              label="담당자 열"
              checked={
                showAssignee
              }
              onChange={() =>
                save({
                  showAssignee:
                    !showAssignee,
                })
              }
            />
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * PR-012
 * 질문 리스트 만들기
 * ============================================================
 */

const questionPurposeOptions = [
  '요구 확인',
  '정책 확인',
  '인터뷰',
  '개발 확인',
  '누락 점검',
]

const questionTargetOptions = [
  '사용자',
  'PM',
  '디자인',
  '개발',
  '운영',
]

const questionTypeOptions = [
  '선택형',
  '개방형',
  '확인형',
  '우선순위',
]

export function QuestionListInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const questionPurpose =
    getString(
      slot.config,
      'questionPurpose',
      '요구 확인',
    )

  /*
   * Figma 기본 화면에서 질문 대상이
   * 선택되지 않은 상태로 누락 경고가 표시됩니다.
   */
  const questionTarget =
    getString(
      slot.config,
      'questionTarget',
    )

  const questionCountValue =
    slot.config?.questionCount

  const questionCount =
    typeof questionCountValue ===
    'number'
      ? questionCountValue
      : 5

  const questionCountMode =
    getString(
      slot.config,
      'questionCountMode',
      'fixed',
    )

  const questionTypes =
    getStringArray(
      slot.config,
      'questionTypes',
    )

  const showRequiredQuestion =
    getBoolean(
      slot.config,
      'showRequiredQuestion',
      false,
    )

  const showQuestionReason =
    getBoolean(
      slot.config,
      'showQuestionReason',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextPurpose =
      typeof patch.questionPurpose ===
      'string'
        ? patch.questionPurpose
        : questionPurpose

    const nextTarget =
      typeof patch.questionTarget ===
      'string'
        ? patch.questionTarget
        : questionTarget

    const nextCount =
      typeof patch.questionCount ===
      'number'
        ? patch.questionCount
        : questionCount

    const nextCountMode =
      typeof patch.questionCountMode ===
      'string'
        ? patch.questionCountMode
        : questionCountMode

    const complete =
      Boolean(
        nextPurpose,
      ) &&
      Boolean(
        nextTarget,
      ) &&
      (
        nextCountMode ===
          'auto' ||
        nextCount > 0
      )

    onConfigChange(
      {
        questionPurpose,
        questionTarget,
        questionCount,
        questionCountMode,
        questionTypes,
        showRequiredQuestion,
        showQuestionReason,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `${nextPurpose} · ${
                nextCountMode ===
                'auto'
                  ? '자동'
                  : `${nextCount}개`
              }`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  const toggleQuestionType = (
    type: string,
  ) => {
    const next =
      questionTypes.includes(
        type,
      )
        ? questionTypes.filter(
            (item) =>
              item !==
              type,
          )
        : [
            ...questionTypes,
            type,
          ]

    save({
      questionTypes:
        next,
    })
  }

  const changeCount = (
    difference: number,
  ) => {
    const nextCount =
      Math.max(
        1,
        Math.min(
          99,
          questionCount +
            difference,
        ),
      )

    save({
      questionCount:
        nextCount,

      questionCountMode:
        'fixed',
    })
  }

  return (
    <ExpandableSettingBlock
      title="질문 리스트 만들기"
      code="PR-012"
      stage="PROCESS"
      description="확인이 필요한 질문 목록을 생성합니다."
      icon={
        <CircleHelp
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 3,
        optional: 2,
        missing:
          Number(
            !questionTarget,
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
            {questionTarget
              ? '질문 설정 완료'
              : '질문 대상 미선택'}
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
        {/* 질문 목적 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            질문 목적{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-2">
            {questionPurposeOptions.map(
              (
                option,
              ) => {
                const selected =
                  questionPurpose ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        questionPurpose:
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

        {/* 질문 대상 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            질문 대상{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="grid grid-cols-4 gap-2">
            {questionTargetOptions.map(
              (
                option,
              ) => {
                const selected =
                  questionTarget ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        questionTarget:
                          option,
                      })
                    }
                    className={[
                      'flex min-h-[70px] flex-col items-center justify-center gap-2 rounded-xl border-2 text-xs font-bold',
                      selected
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-slate-200 text-slate-600',
                    ].join(
                      ' ',
                    )}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
                      {option.slice(
                        0,
                        2,
                      )}
                    </span>

                    {option}
                  </button>
                )
              },
            )}
          </div>

          {!questionTarget && (
            <p className="mt-2 text-xs font-semibold text-rose-500">
              ▲ 질문 대상을 선택하세요
            </p>
          )}
        </div>

        {/* 질문 수 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            질문 수{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex items-center gap-2">
            <div className="flex h-[40px] overflow-hidden rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() =>
                  changeCount(
                    -1,
                  )
                }
                className="w-10 border-r border-slate-200 text-sm font-bold text-slate-600"
              >
                −
              </button>

              <div className="flex w-12 items-center justify-center text-sm font-bold text-slate-700">
                {questionCountMode ===
                'auto'
                  ? '자동'
                  : questionCount}
              </div>

              <button
                type="button"
                onClick={() =>
                  changeCount(
                    1,
                  )
                }
                className="w-10 border-l border-slate-200 text-sm font-bold text-slate-600"
              >
                +
              </button>
            </div>

            {[
              3,
              5,
              10,
            ].map(
              (
                count,
              ) => (
                <button
                  key={
                    count
                  }
                  type="button"
                  onClick={() =>
                    save({
                      questionCount:
                        count,

                      questionCountMode:
                        'fixed',
                    })
                  }
                  className={[
                    'h-[36px] rounded-lg border px-3 text-xs font-bold',
                    questionCountMode ===
                      'fixed' &&
                    questionCount ===
                      count
                      ? 'border-indigo-500 text-indigo-500'
                      : 'border-slate-200 text-slate-500',
                  ].join(
                    ' ',
                  )}
                >
                  {count}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() =>
                save({
                  questionCountMode:
                    'auto',
                })
              }
              className={[
                'h-[36px] rounded-lg border px-3 text-xs font-bold',
                questionCountMode ===
                'auto'
                  ? 'border-indigo-500 text-indigo-500'
                  : 'border-slate-200 text-slate-500',
              ].join(
                ' ',
              )}
            >
              자동
            </button>
          </div>
        </div>

        {/* 질문 유형 */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              질문 유형
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {questionTypeOptions.map(
              (
                option,
              ) => {
                const selected =
                  questionTypes.includes(
                    option,
                  )

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      toggleQuestionType(
                        option,
                      )
                    }
                    className="flex h-[34px] items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600"
                  >
                    <span
                      className={[
                        'h-4 w-4 rounded',
                        selected
                          ? 'bg-indigo-500'
                          : 'border border-slate-300',
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

        {/* 중요도·배경 */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              중요도·배경
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-4">
            <ToggleRow
              label="필수 질문 표시"
              checked={
                showRequiredQuestion
              }
              onChange={() =>
                save({
                  showRequiredQuestion:
                    !showRequiredQuestion,
                })
              }
            />

            <ToggleRow
              label="질문 이유 표시"
              checked={
                showQuestionReason
              }
              onChange={() =>
                save({
                  showQuestionReason:
                    !showQuestionReason,
                })
              }
            />
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * PR-013
 * 특정 스킬 호출하기
 * ============================================================
 */

const skillPresetOptions = [
  '요약가',
  '기획자',
  '개발자',
  '작성자',
  '분석가',
  '리뷰어',
]

const skillIntensityOptions = [
  '빠르게',
  '균형',
  '정밀',
]

export function CallSkillInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const skillPreset =
    getString(
      slot.config,
      'skillPreset',
      '요약가',
    )

  const executionPurpose =
    getString(
      slot.config,
      'executionPurpose',
    )

  /*
   * 현재 Figma에서는 적용 대상이
   * "이전 블록 결과"로 연결된 상태입니다.
   */
  const applicationTarget =
    getString(
      slot.config,
      'applicationTarget',
      'previous-result',
    )

  const intensity =
    getString(
      slot.config,
      'intensity',
      '균형',
    )

  const resultDelivery =
    getString(
      slot.config,
      'resultDelivery',
      '다음 블록',
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextPreset =
      typeof patch.skillPreset ===
      'string'
        ? patch.skillPreset
        : skillPreset

    const nextPurpose =
      typeof patch.executionPurpose ===
      'string'
        ? patch.executionPurpose
        : executionPurpose

    const nextTarget =
      typeof patch.applicationTarget ===
      'string'
        ? patch.applicationTarget
        : applicationTarget

    const complete =
      Boolean(
        nextPreset,
      ) &&
      Boolean(
        nextPurpose.trim(),
      ) &&
      Boolean(
        nextTarget,
      )

    onConfigChange(
      {
        skillPreset,
        executionPurpose,
        applicationTarget,
        intensity,
        resultDelivery,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `${nextPreset} · ${intensity}`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="특정 스킬 호출하기"
      code="PR-013"
      stage="PROCESS"
      description="프리셋 스킬을 불러와 이전 결과에 적용합니다."
      icon={
        <Sparkles
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 3,
        optional: 2,
        recommended: 1,
        missing:
          Number(
            !executionPurpose.trim(),
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
            {executionPurpose.trim()
              ? '스킬 설정 완료'
              : '수행 목적 입력 대기'}
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
        {/* 스킬 프리셋 */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <p className="text-xs font-bold text-slate-700">
              스킬 프리셋{' '}
              <span className="text-rose-500">
                *
              </span>
            </p>

            <span className="rounded-md bg-indigo-500 px-2 py-1 text-[9px] font-bold text-white">
              튜토리얼 추천
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {skillPresetOptions.map(
              (
                option,
              ) => {
                const selected =
                  skillPreset ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        skillPreset:
                          option,
                      })
                    }
                    className={[
                      'flex min-h-[68px] flex-col items-center justify-center rounded-xl border-2 text-xs font-bold',
                      selected
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-slate-200 text-slate-600',
                    ].join(
                      ' ',
                    )}
                  >
                    <span className="mb-1 text-base">
                      ◼
                    </span>

                    {option}
                  </button>
                )
              },
            )}
          </div>
        </div>

        {/* 수행 목적 */}
        <label className="block">
          <span className="mb-3 block text-xs font-bold text-slate-700">
            수행 목적{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <input
            type="text"
            value={
              executionPurpose
            }
            onChange={(
              event,
            ) =>
              save({
                executionPurpose:
                  event.target
                    .value,
              })
            }
            placeholder="이 스킬을 사용하는 이유"
            className={[
              'h-[48px] w-full rounded-xl border-2 px-4 text-sm outline-none',
              executionPurpose.trim()
                ? 'border-slate-200 focus:border-indigo-500'
                : 'border-slate-200',
            ].join(
              ' ',
            )}
          />
        </label>

        {/* 적용 대상 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            적용 대상{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex min-h-[60px] items-center gap-3 rounded-xl border-2 border-slate-200 px-4">
            <span className="h-3 w-3 rounded-full bg-indigo-500" />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-700">
                이전 블록 결과
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                연결 포트 · 현재 입력
              </p>
            </div>

            <span className="rounded-lg bg-indigo-500 px-3 py-2 text-[10px] font-bold text-white">
              연결됨
            </span>
          </div>
        </div>

        {/* 수행 강도 */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              수행 강도
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="flex overflow-hidden rounded-xl border-2 border-slate-200">
            {skillIntensityOptions.map(
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
                      intensity:
                        option,
                    })
                  }
                  className={[
                    'h-[44px] flex-1 border-r border-slate-200 text-xs font-bold last:border-r-0',
                    intensity ===
                    option
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-slate-600',
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

        {/* 결과 전달 */}
        <label className="block">
          <span className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              결과 전달
            </span>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </span>

          {/*
           * 제공된 Figma에서는 "다음 블록"만
           * 확인되므로 존재하지 않는 선택지를 만들지 않습니다.
           */}
          <select
            value={
              resultDelivery
            }
            onChange={(
              event,
            ) =>
              save({
                resultDelivery:
                  event.target
                    .value,
              })
            }
            className="h-[48px] w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none"
          >
            <option value="다음 블록">
              다음 블록
            </option>
          </select>
        </label>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * PR-014
 * 프롬프트 조립하기
 * ============================================================
 */

const promptOutputFormatOptions = [
  '텍스트',
  '목록',
  '표',
  'JSON',
  '문서',
]

const defaultPromptPieceOrder = [
  'role',
  'task',
  'reference',
  'output',
]

export function PromptComposeInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const pieceOrder =
    getStringArray(
      slot.config,
      'pieceOrder',
      defaultPromptPieceOrder,
    )

  const roleText =
    getString(
      slot.config,
      'roleText',
      '10년차 UX 리서처',
    )

  const taskText =
    getString(
      slot.config,
      'taskText',
      '리뷰 100건을 항목별로 요약·비교하세요.',
    )

  const referenceText =
    getString(
      slot.config,
      'referenceText',
      '← 컨텍스트 노드 · 리뷰 데이터',
    )

  const outputInstruction =
    getString(
      slot.config,
      'outputInstruction',
      '행렬 / 긍정 / 부정 / 빈도',
    )

  const outputFormat =
    getString(
      slot.config,
      'outputFormat',
      '표',
    )

  const includeExample =
    getBoolean(
      slot.config,
      'includeExample',
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
    const nextOrder =
      'pieceOrder' in
      patch
        ? readStringArray(
            patch.pieceOrder,
            pieceOrder,
          )
        : pieceOrder

    const nextRole =
      typeof patch.roleText ===
      'string'
        ? patch.roleText
        : roleText

    const nextTask =
      typeof patch.taskText ===
      'string'
        ? patch.taskText
        : taskText

    const nextOutputInstruction =
      typeof patch.outputInstruction ===
      'string'
        ? patch.outputInstruction
        : outputInstruction

    const nextOutputFormat =
      typeof patch.outputFormat ===
      'string'
        ? patch.outputFormat
        : outputFormat

    /*
     * Figma Footer:
     * 필수 조각(역할·작업·출력) 충족
     */
    const complete =
      Boolean(
        nextRole.trim(),
      ) &&
      Boolean(
        nextTask.trim(),
      ) &&
      Boolean(
        nextOutputInstruction.trim(),
      ) &&
      Boolean(
        nextOutputFormat,
      )

    onConfigChange(
      {
        pieceOrder,
        roleText,
        taskText,
        referenceText,
        outputInstruction,
        outputFormat,
        includeExample,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `조각 ${nextOrder.length} · ${nextOutputFormat} 출력`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  const reorderPiece = (
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
        ...pieceOrder,
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
      pieceOrder:
        next,
    })
  }

  const renderPiece = (
    type: string,
  ) => {
    if (
      type ===
      'role'
    ) {
      return {
        badge:
          '역할',
        title:
          '리뷰 분석가',
        value:
          roleText,
        onChange:
          (
            value: string,
          ) =>
            save({
              roleText:
                value,
            }),
      }
    }

    if (
      type ===
      'task'
    ) {
      return {
        badge:
          '작업',
        title:
          '요약·비교',
        value:
          taskText,
        onChange:
          (
            value: string,
          ) =>
            save({
              taskText:
                value,
            }),
      }
    }

    if (
      type ===
      'reference'
    ) {
      return {
        badge:
          '참고',
        title:
          '연결됨',
        value:
          referenceText,
        onChange:
          null,
      }
    }

    return {
      badge:
        '출력',
      title:
        '표 형식',
      value:
        outputInstruction,
      onChange:
        (
          value: string,
        ) =>
          save({
            outputInstruction:
              value,
          }),
    }
  }

  const automaticPrompt = [
    `역할  ${roleText}`,
    `작업  ${taskText}`,
    referenceText
      ? `참고  ${referenceText}`
      : '',
    `출력  ${outputInstruction}`,
    '',
    `형식  ${outputFormat}`,
  ]
    .filter(
      Boolean,
    )
    .join(
      '\n',
    )

  return (
    <ExpandableSettingBlock
      title="프롬프트 조립하기"
      code="PR-014"
      stage="PROCESS"
      description="역할·작업·참고·조건·출력 조각을 끌어 순서대로 조립합니다."
      icon={
        <Puzzle
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 3,
        conditional: 5,
        missing:
          Number(
            !roleText.trim(),
          ) +
          Number(
            !taskText.trim(),
          ) +
          Number(
            !outputInstruction.trim(),
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
            {roleText.trim() &&
            taskText.trim() &&
            outputInstruction.trim()
              ? '필수 조각(역할·작업·출력) 충족'
              : '필수 프롬프트 조각 미입력'}
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
        {/* 프롬프트 조각 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            프롬프트 조각 · 드래그 정렬{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-3">
            {pieceOrder.map(
              (
                type,
                index,
              ) => {
                const piece =
                  renderPiece(
                    type,
                  )

                return (
                  <div
                    key={
                      type
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
                        reorderPiece(
                          dragIndex,
                          index,
                        )
                      }

                      setDragIndex(
                        null,
                      )
                    }}
                    className="rounded-xl border-2 border-slate-200 p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={[
                          'rounded-md px-2 py-1 text-[10px] font-bold text-white',
                          type ===
                            'reference'
                            ? 'bg-amber-600'
                            : type ===
                                'output'
                              ? 'bg-emerald-600'
                              : 'bg-[#4A5E8A]',
                        ].join(
                          ' ',
                        )}
                      >
                        {
                          piece.badge
                        }
                      </span>

                      <span className="text-xs font-bold text-slate-700">
                        {
                          piece.title
                        }
                      </span>
                    </div>

                    {piece.onChange ? (
                      <input
                        type="text"
                        value={
                          piece.value
                        }
                        onChange={(
                          event,
                        ) =>
                          piece.onChange?.(
                            event.target
                              .value,
                          )
                        }
                        className="h-[36px] w-full rounded-lg bg-slate-100 px-3 text-xs text-slate-600 outline-none"
                      />
                    ) : (
                      <div className="flex h-[36px] items-center rounded-lg bg-slate-100 px-3 text-xs text-slate-400">
                        {
                          piece.value
                        }
                      </div>
                    )}
                  </div>
                )
              },
            )}

            {/*
             * "추가" 이후 편집 화면은 제공되지 않았으므로
             * 실제 동작을 임의로 만들지 않고 Figma의
             * 현재 상태만 표현합니다.
             */}
            <div className="flex h-[48px] items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400">
              <Plus
                size={14}
                className="mr-1"
              />
              조각 추가 (조건 · 예시)
            </div>
          </div>
        </div>

        {/* 출력 형식 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            출력 형식{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-2">
            {promptOutputFormatOptions.map(
              (
                option,
              ) => {
                const selected =
                  outputFormat ===
                  option

                return (
                  <button
                    key={
                      option
                    }
                    type="button"
                    onClick={() =>
                      save({
                        outputFormat:
                          option,
                      })
                    }
                    className={[
                      'flex h-[44px] w-full items-center gap-3 rounded-xl border-2 px-4 text-left text-sm font-bold',
                      selected
                        ? 'border-indigo-500 text-slate-700'
                        : 'border-slate-200 text-slate-600',
                    ].join(
                      ' ',
                    )}
                  >
                    <span
                      className={[
                        'h-4 w-4 rounded-full',
                        selected
                          ? 'bg-indigo-500'
                          : 'border border-slate-300',
                      ].join(
                        ' ',
                      )}
                    />

                    {option}

                    {option ===
                      '표' && (
                      <span className="ml-2 text-[10px] font-normal text-slate-400">
                        행/열 구조로 출력
                      </span>
                    )}
                  </button>
                )
              },
            )}
          </div>
        </div>

        {/* 예시 포함 */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              예시 포함
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <ToggleRow
            label="예시 조각을 프롬프트에 추가"
            checked={
              includeExample
            }
            onChange={() =>
              save({
                includeExample:
                  !includeExample,
              })
            }
          />
        </div>

        {/* 자동 생성 미리보기 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            최종 프롬프트 · 자동 생성{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="overflow-hidden rounded-xl bg-[#202026]">
            <div className="border-b border-white/10 px-4 py-2 text-[10px] text-slate-400">
              prompt.final
            </div>

            <pre className="whitespace-pre-wrap px-4 py-4 text-[11px] leading-5 text-slate-300">
              {
                automaticPrompt
              }
            </pre>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

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
    linked?: boolean
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
      '← 상세 프롬프트 연결',
    linked: true,
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

  const linkedCount =
    cardOrder.filter(
      (id) =>
        summaryPromptCardMeta[
          id
        ]?.linked,
    ).length

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
                      {
                        card.description
                      }
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