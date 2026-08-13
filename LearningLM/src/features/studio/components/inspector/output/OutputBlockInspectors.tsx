import {
  useState,
} from 'react'

import {
  AlignLeft,
  Braces,
  Code2,
  Copy,
  FileText,
  Globe2,
  ListChecks,
  ListOrdered,
  Presentation,
  Save,
  Table2,
} from 'lucide-react'

import {
  Button,
  Textarea,
  ToggleSwitch,
} from '../../../../../components/ui'

import {
  BlockButton,
} from '../../../../Block/components/ui/BlockButton'

import {
  BlockCard,
} from '../../../../Block/components/ui/BlockCard'

import {
  Checkbox,
} from '../../../../Block/components/ui/Checkbox'

import {
  ConnectedSegmentedControl,
} from '../../../../Block/components/ui/ConnectedSegmentedControl'

import {
  Radio,
} from '../../../../Block/components/ui/Radio'

import {
  ExpandableSettingBlock,
} from '../../../../Block/components/layouts/ExpandableSettingBlock'

import type {
  StudioBlockConfig,
  StudioSlotState,
} from '../../../types/studioNode'

import type {
  StudioBlockInspectorComponentProps,
} from '../StudioBlockInspector'

const studioInspectorClassName =
  '!w-full !rounded-[12px] !border-[#E4E4E7] !shadow-none [&_.setting-block-fields]:!w-full [&_.setting-block-fields]:max-w-full'

function getString(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback = '',
): string {
  const value =
    config?.[key]

  return typeof value ===
    'string'
    ? value
    : fallback
}

function getBoolean(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback: boolean,
): boolean {
  const value =
    config?.[key]

  return typeof value ===
    'boolean'
    ? value
    : fallback
}

function getNumber(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback: number,
): number {
  const value =
    config?.[key]

  return typeof value ===
    'number'
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

  if (
    !Array.isArray(
      value,
    )
  ) {
    return fallback
  }

  return value.filter(
    (
      item,
    ): item is string =>
      typeof item ===
      'string',
  )
}

function resolveState(
  complete: boolean,
): StudioSlotState {
  return complete
    ? 'filled'
    : 'empty'
}

/*
 * ============================================================
 * OUT-001 텍스트로 출력하기
 * ============================================================
 *
 * 원본:
 * Default2.tsx
 *
 * 필수:
 * - 텍스트 구조
 * - 분량
 *
 * 선택:
 * - 제목 표시
 * - 핵심어 강조
 * - 출처 표시
 * - 문체
 * ============================================================
 */

const textStructureOptions = [
  {
    label: '단락',
    value: 'paragraph',
    description:
      '이어지는 문단',
  },
  {
    label: '제목 + 단락',
    value: 'title-paragraph',
  },
  {
    label: '목록 포함',
    value: 'with-list',
  },
  {
    label: '자유',
    value: 'free',
  },
]

const textLengthOptions = [
  {
    label: '한 문장',
    value: 'one-sentence',
  },
  {
    label: '짧게',
    value: 'short',
  },
  {
    label: '보통',
    value: 'normal',
  },
  {
    label: '자세히',
    value: 'detail',
  },
]

export function TextOutputInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const structure =
    getString(
      slot.config,
      'structure',
      'paragraph',
    )

  const length =
    getString(
      slot.config,
      'length',
    )

  const showTitle =
    getBoolean(
      slot.config,
      'showTitle',
      false,
    )

  const emphasizeKeywords =
    getBoolean(
      slot.config,
      'emphasizeKeywords',
      false,
    )

  const showSource =
    getBoolean(
      slot.config,
      'showSource',
      false,
    )

  const styleSource =
    getString(
      slot.config,
      'styleSource',
      'input-conditions',
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextStructure =
      typeof patch.structure ===
      'string'
        ? patch.structure
        : structure

    const nextLength =
      typeof patch.length ===
      'string'
        ? patch.length
        : length

    const complete =
      Boolean(
        nextStructure,
      ) &&
      Boolean(
        nextLength,
      )

    const structureLabel =
      textStructureOptions.find(
        (
          option,
        ) =>
          option.value ===
          nextStructure,
      )?.label ??
      nextStructure

    const lengthLabel =
      textLengthOptions.find(
        (
          option,
        ) =>
          option.value ===
          nextLength,
      )?.label ??
      nextLength

    onConfigChange(
      {
        structure,
        length,
        showTitle,
        emphasizeKeywords,
        showSource,
        styleSource,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `${structureLabel} · ${lengthLabel}`
            : structureLabel,

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="텍스트로 출력하기"
      code="OUT-001"
      stage="OUTPUT"
      description="결과를 일반 텍스트 형태로 출력합니다."
      icon={
        <AlignLeft
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 2,
        optional: 2,
        missing:
          Number(
            !length,
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
            {length
              ? '텍스트 출력 설정 완료'
              : '분량을 선택하세요'}
          </span>

          <Button
            size="sm"
            onClick={() =>
              save({})
            }
          >
            출력
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            텍스트 구조{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`output-text-structure-${slot.id}`}
            options={
              textStructureOptions
            }
            value={
              structure
            }
            onChange={(
              value,
            ) =>
              save({
                structure:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            분량{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockButton
            options={
              textLengthOptions
            }
            value={
              length
            }
            onChange={(
              value,
            ) =>
              save({
                length:
                  value,
              })
            }
            className="flex-wrap"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              제목·강조·출처
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              checked={
                showTitle
              }
              onChange={(
                value,
              ) =>
                save({
                  showTitle:
                    value,
                })
              }
              label="제목 표시"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                emphasizeKeywords
              }
              onChange={(
                value,
              ) =>
                save({
                  emphasizeKeywords:
                    value,
                })
              }
              label="핵심어 강조"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                showSource
              }
              onChange={(
                value,
              ) =>
                save({
                  showSource:
                    value,
                })
              }
              label="출처 표시"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              문체
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="rounded-xl border-2 border-slate-200 px-4 py-3">
            <p className="text-sm font-bold text-slate-700">
              입력 조건 사용
            </p>

            <p className="mt-1 text-xs text-slate-400">
              INPUT 단계의 문체·톤 조건을 사용합니다.
            </p>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * OUT-002 표로 출력하기
 * ============================================================
 *
 * 원본:
 * Default5.tsx
 * ============================================================
 */

const tableCellLengthOptions = [
  {
    label: '한 줄',
    value: 'one-line',
  },
  {
    label: '짧게',
    value: 'short',
  },
  {
    label: '자세히',
    value: 'detail',
  },
]

export function TableOutputInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const [
    columnDraft,
    setColumnDraft,
  ] =
    useState('')

  const title =
    getString(
      slot.config,
      'title',
    )

  const columns =
    getStringArray(
      slot.config,
      'columns',
      [
        '대상',
        '장점',
        '단점',
      ],
    )

  const rowKey =
    getString(
      slot.config,
      'rowKey',
      '대상',
    )

  const cellLength =
    getString(
      slot.config,
      'cellLength',
      'one-line',
    )

  const emptyCellHandling =
    getString(
      slot.config,
      'emptyCellHandling',
      '미정 표시',
    )

  const sorting =
    getString(
      slot.config,
      'sorting',
      '대상 오름차순',
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextColumns =
      Array.isArray(
        patch.columns,
      )
        ? patch.columns.filter(
            (
              item,
            ): item is string =>
              typeof item ===
              'string',
          )
        : columns

    const nextRowKey =
      typeof patch.rowKey ===
      'string'
        ? patch.rowKey
        : rowKey

    const nextCellLength =
      typeof patch.cellLength ===
      'string'
        ? patch.cellLength
        : cellLength

    const complete =
      nextColumns.length >
        0 &&
      Boolean(
        nextRowKey,
      )

    onConfigChange(
      {
        title,
        columns,
        rowKey,
        cellLength,
        emptyCellHandling,
        sorting,
        ...patch,
      },
      {
        summaryValue:
          complete
            ? `열 ${nextColumns.length}개 · 행 ${nextRowKey}`
            : '',

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  const removeColumn = (
    column: string,
  ) => {
    save({
      columns:
        columns.filter(
          (
            item,
          ) =>
            item !==
            column,
        ),
    })
  }

  const moveColumn = (
    index: number,
    direction: -1 | 1,
  ) => {
    const nextIndex =
      index +
      direction

    if (
      nextIndex <
        0 ||
      nextIndex >=
        columns.length
    ) {
      return
    }

    const next =
      [
        ...columns,
      ]

    const current =
      next[index]

    next[index] =
      next[nextIndex]

    next[nextIndex] =
      current

    save({
      columns:
        next,
    })
  }

  const addColumn =
    () => {
      const nextColumn =
        columnDraft.trim()

      if (
        !nextColumn ||
        columns.includes(
          nextColumn,
        )
      ) {
        return
      }

      save({
        columns: [
          ...columns,
          nextColumn,
        ],
      })

      setColumnDraft('')
    }

  return (
    <ExpandableSettingBlock
      title="표로 출력하기"
      code="OUT-002"
      stage="OUTPUT"
      description="출력할 표의 열 순서, 행 기준과 셀 분량을 지정합니다."
      icon={
        <Table2
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 2,
        optional: 3,
        sortable: 1,
        missing:
          Number(
            columns.length ===
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
            열 {columns.length}개 · 행 기준{' '}
            {rowKey}
          </span>

          <Button
            size="sm"
            onClick={() =>
              save({})
            }
          >
            출력
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              표 제목
            </span>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </span>

          <input
            type="text"
            value={
              title
            }
            onChange={(
              event,
            ) =>
              save({
                title:
                  event.target.value,
              })
            }
            placeholder="제품 비교 요약표"
            className="h-[48px] w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            열 블록 · 순서 변경{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-2">
            {columns.map(
              (
                column,
                index,
              ) => (
                <div
                  key={
                    column
                  }
                  className="flex min-h-[54px] items-center gap-2 rounded-xl border-2 border-slate-200 px-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-700 text-xs font-bold text-white">
                    {index +
                      1}
                  </span>

                  <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-700">
                    {
                      column
                    }
                  </span>

                  <button
                    type="button"
                    disabled={
                      index ===
                      0
                    }
                    onClick={() =>
                      moveColumn(
                        index,
                        -1,
                      )
                    }
                    className="h-7 w-7 rounded-md border border-slate-200 text-xs disabled:opacity-30"
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    disabled={
                      index ===
                      columns.length -
                        1
                    }
                    onClick={() =>
                      moveColumn(
                        index,
                        1,
                      )
                    }
                    className="h-7 w-7 rounded-md border border-slate-200 text-xs disabled:opacity-30"
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      removeColumn(
                        column,
                      )
                    }
                    className="h-7 w-7 rounded-md border border-slate-200 text-xs text-slate-400"
                  >
                    ×
                  </button>
                </div>
              ),
            )}
          </div>

          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={
                columnDraft
              }
              onChange={(
                event,
              ) =>
                setColumnDraft(
                  event.target.value,
                )
              }
              onKeyDown={(
                event,
              ) => {
                if (
                  event.key ===
                  'Enter'
                ) {
                  event.preventDefault()
                  addColumn()
                }
              }}
              placeholder="열 이름"
              className="h-[42px] min-w-0 flex-1 rounded-xl border-2 border-slate-200 px-3 text-sm outline-none focus:border-indigo-500"
            />

            <button
              type="button"
              onClick={
                addColumn
              }
              className="h-[42px] rounded-xl border-2 border-dashed border-slate-300 px-4 text-sm font-bold text-slate-500"
            >
              + 열 추가
            </button>
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-xs font-bold text-slate-700">
            행 기준{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <input
            type="text"
            value={
              rowKey
            }
            onChange={(
              event,
            ) =>
              save({
                rowKey:
                  event.target.value,
              })
            }
            placeholder="대상"
            className="h-[48px] w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              셀 분량
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <ConnectedSegmentedControl
            options={
              tableCellLengthOptions
            }
            value={
              cellLength
            }
            onChange={(
              value,
            ) =>
              save({
                cellLength:
                  value,
              })
            }
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              빈 값 · 정렬
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border-2 border-slate-200 px-3 py-3">
              <p className="text-xs text-slate-400">
                빈 셀
              </p>

              <p className="mt-1 text-sm font-bold text-slate-700">
                {
                  emptyCellHandling
                }
              </p>
            </div>

            <div className="rounded-xl border-2 border-slate-200 px-3 py-3">
              <p className="text-xs text-slate-400">
                정렬
              </p>

              <p className="mt-1 text-sm font-bold text-slate-700">
                {
                  sorting
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * OUT-003 체크리스트로 출력하기
 * ============================================================
 */

const checklistGroupOptions = [
  {
    label: '단계',
    value: 'step',
    description:
      '진행 순서 기준',
  },
  {
    label: '담당자',
    value: 'assignee',
  },
  {
    label: '우선순위',
    value: 'priority',
  },
  {
    label: '없음',
    value: 'none',
  },
]

const checklistStateOptions = [
  {
    label: '빈 체크',
    value: 'empty',
  },
  {
    label: '현재 상태 반영',
    value: 'current',
  },
]

export function ChecklistOutputInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const groupBy =
    getString(
      slot.config,
      'groupBy',
      'step',
    )

  const checkState =
    getString(
      slot.config,
      'checkState',
      'empty',
    )

  const showRequiredBadge =
    getBoolean(
      slot.config,
      'showRequiredBadge',
      false,
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

  const showNote =
    getBoolean(
      slot.config,
      'showNote',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextGroup =
      typeof patch.groupBy ===
      'string'
        ? patch.groupBy
        : groupBy

    const nextState =
      typeof patch.checkState ===
      'string'
        ? patch.checkState
        : checkState

    const complete =
      Boolean(
        nextGroup,
      ) &&
      Boolean(
        nextState,
      )

    const groupLabel =
      checklistGroupOptions.find(
        (
          option,
        ) =>
          option.value ===
          nextGroup,
      )?.label ??
      nextGroup

    const stateLabel =
      checklistStateOptions.find(
        (
          option,
        ) =>
          option.value ===
          nextState,
      )?.label ??
      nextState

    onConfigChange(
      {
        groupBy,
        checkState,
        showRequiredBadge,
        showCompletionCriteria,
        showAssignee,
        showNote,
        ...patch,
      },
      {
        summaryValue:
          `${groupLabel} · ${stateLabel}`,

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="체크리스트로 출력하기"
      code="OUT-003"
      stage="OUTPUT"
      description="결과를 점검용 체크리스트로 출력합니다."
      icon={
        <ListChecks
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        conditional: 1,
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
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            기본값으로 출력 가능
          </span>

          <Button
            size="sm"
            onClick={() =>
              save({})
            }
          >
            출력
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            그룹 기준{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`output-checklist-group-${slot.id}`}
            options={
              checklistGroupOptions
            }
            value={
              groupBy
            }
            onChange={(
              value,
            ) =>
              save({
                groupBy:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            체크 상태{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <ConnectedSegmentedControl
            options={
              checklistStateOptions
            }
            value={
              checkState
            }
            onChange={(
              value,
            ) =>
              save({
                checkState:
                  value,
              })
            }
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              부가 필드
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              checked={
                showRequiredBadge
              }
              onChange={(
                value,
              ) =>
                save({
                  showRequiredBadge:
                    value,
                })
              }
              label="필수 배지"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                showCompletionCriteria
              }
              onChange={(
                value,
              ) =>
                save({
                  showCompletionCriteria:
                    value,
                })
              }
              label="완료 기준"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                showAssignee
              }
              onChange={(
                value,
              ) =>
                save({
                  showAssignee:
                    value,
                })
              }
              label="담당자"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                showNote
              }
              onChange={(
                value,
              ) =>
                save({
                  showNote:
                    value,
                })
              }
              label="비고"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />
          </div>
        </div>

        {groupBy !==
          'none' && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-700">
                그룹 순서
              </p>

              <span className="text-[11px] font-bold text-amber-600">
                조건부
              </span>
            </div>

            <div className="space-y-2">
              {[
                1,
                2,
              ].map(
                (
                  index,
                ) => (
                  <div
                    key={
                      index
                    }
                    className="flex h-[52px] items-center rounded-xl border-2 border-slate-200 px-4"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-700 text-xs font-bold text-white">
                      {
                        index
                      }
                    </span>

                    <span className="ml-3 text-sm font-bold text-slate-700">
                      그룹 이름
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * OUT-004 문서 초안으로 출력하기
 * ============================================================
 */

const documentTypeOptions = [
  {
    label: '기획',
    value: 'planning',
    icon: (
      <span>
        📝
      </span>
    ),
  },
  {
    label: '기능명세',
    value: 'feature-spec',
    icon: (
      <span>
        ⚙
      </span>
    ),
  },
  {
    label: '정책',
    value: 'policy',
    icon: (
      <span>
        📋
      </span>
    ),
  },
  {
    label: '보고',
    value: 'report',
    icon: (
      <span>
        📊
      </span>
    ),
  },
  {
    label: '회의록',
    value: 'minutes',
    icon: (
      <span>
        🗒
      </span>
    ),
  },
  {
    label: '제안',
    value: 'proposal',
    icon: (
      <span>
        📮
      </span>
    ),
  },
]

const documentSectionOptions = [
  {
    label: '자동',
    value: 'auto',
  },
  {
    label: '템플릿',
    value: 'template',
  },
  {
    label: '직접',
    value: 'manual',
  },
]

const documentDepthOptions = [
  {
    label: '개요',
    value: 'outline',
  },
  {
    label: '기본',
    value: 'basic',
  },
  {
    label: '상세',
    value: 'detail',
  },
]

const unknownHandlingOptions = [
  {
    label: '미정으로 표시',
    value: 'mark-unknown',
  },
  {
    label: '가정으로 채움',
    value: 'assume',
  },
  {
    label: '질문으로 남김',
    value: 'question',
  },
]

export function DocumentDraftInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const documentType =
    getString(
      slot.config,
      'documentType',
      'feature-spec',
    )

  const title =
    getString(
      slot.config,
      'title',
    )

  const sectionMode =
    getString(
      slot.config,
      'sectionMode',
      'template',
    )

  const depth =
    getString(
      slot.config,
      'depth',
      'basic',
    )

  const unknownHandling =
    getString(
      slot.config,
      'unknownHandling',
      'mark-unknown',
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextType =
      typeof patch.documentType ===
      'string'
        ? patch.documentType
        : documentType

    const nextTitle =
      typeof patch.title ===
      'string'
        ? patch.title
        : title

    const nextSection =
      typeof patch.sectionMode ===
      'string'
        ? patch.sectionMode
        : sectionMode

    const nextDepth =
      typeof patch.depth ===
      'string'
        ? patch.depth
        : depth

    const complete =
      Boolean(
        nextType,
      ) &&
      Boolean(
        nextTitle.trim(),
      ) &&
      Boolean(
        nextSection,
      ) &&
      Boolean(
        nextDepth,
      )

    const typeLabel =
      documentTypeOptions.find(
        (
          option,
        ) =>
          option.value ===
          nextType,
      )?.label ??
      nextType

    onConfigChange(
      {
        documentType,
        title,
        sectionMode,
        depth,
        unknownHandling,
        ...patch,
      },
      {
        summaryValue:
          nextTitle.trim()
            ? `${typeLabel} · ${nextTitle.trim()}`
            : typeLabel,

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="문서 초안으로 출력하기"
      code="OUT-004"
      stage="OUTPUT"
      description="문서 종류와 제목, 목차 방식과 깊이를 지정합니다."
      icon={
        <FileText
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 4,
        optional: 1,
        missing:
          Number(
            !title.trim(),
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
            {title.trim()
              ? '문서 초안 설정 완료'
              : '문서 제목 미입력'}
          </span>

          <Button
            size="sm"
            onClick={() =>
              save({})
            }
          >
            초안 생성
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            문서 종류{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockCard
            columns={3}
            options={
              documentTypeOptions
            }
            value={
              documentType
            }
            onChange={(
              value,
            ) =>
              save({
                documentType:
                  value,
              })
            }
          />
        </div>

        <label className="block">
          <span className="mb-2 block text-xs font-bold text-slate-700">
            문서 제목{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <input
            type="text"
            value={
              title
            }
            onChange={(
              event,
            ) =>
              save({
                title:
                  event.target.value,
              })
            }
            placeholder="신규 기능 기획서"
            className="h-[48px] w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            목차 방식{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <ConnectedSegmentedControl
            options={
              documentSectionOptions
            }
            value={
              sectionMode
            }
            onChange={(
              value,
            ) =>
              save({
                sectionMode:
                  value,
              })
            }
          />
        </div>

        {sectionMode ===
          'manual' && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-700">
                목차 블록
              </p>

              <span className="text-[11px] font-bold text-amber-600">
                조건부
              </span>
            </div>

            <div className="space-y-2">
              {[
                [
                  '배경 및 목표',
                  '문제 정의 · 기대 효과',
                ],
                [
                  '주요 기능',
                  '기능 목록 · 우선순위',
                ],
                [
                  '일정 및 리스크',
                  '마일스톤 · 위험 요소',
                ],
              ].map(
                (
                  [
                    heading,
                    description,
                  ],
                  index,
                ) => (
                  <div
                    key={
                      heading
                    }
                    className="rounded-xl border-2 border-slate-200 px-4 py-3"
                  >
                    <div className="flex items-center">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-700 text-xs font-bold text-white">
                        {index +
                          1}
                      </span>

                      <span className="ml-3 text-sm font-bold text-slate-700">
                        {
                          heading
                        }
                      </span>
                    </div>

                    <p className="ml-9 mt-1 text-xs text-slate-400">
                      {
                        description
                      }
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            깊이{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <ConnectedSegmentedControl
            options={
              documentDepthOptions
            }
            value={
              depth
            }
            onChange={(
              value,
            ) =>
              save({
                depth:
                  value,
              })
            }
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              미정 처리
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <Radio
            name={`document-unknown-${slot.id}`}
            options={
              unknownHandlingOptions
            }
            value={
              unknownHandling
            }
            onChange={(
              value,
            ) =>
              save({
                unknownHandling:
                  value,
              })
            }
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * OUT-005 발표용 요약으로 출력하기
 * ============================================================
 */

const presentationTypeOptions = [
  {
    label: '스크립트',
    value: 'script',
  },
  {
    label: '슬라이드 개요',
    value: 'slide-outline',
    description:
      '슬라이드별 요점',
  },
  {
    label: '핵심 요약',
    value: 'core-summary',
  },
]

const presentationDurationOptions = [
  {
    label: '30초',
    value: '30s',
  },
  {
    label: '1분',
    value: '1m',
  },
  {
    label: '3분',
    value: '3m',
  },
  {
    label: '5분',
    value: '5m',
  },
  {
    label: '직접',
    value: 'custom',
  },
]

const presentationAudienceOptions = [
  {
    label: '팀',
    value: 'team',
    icon: (
      <span>
        팀
      </span>
    ),
  },
  {
    label: '심사',
    value: 'judge',
    icon: (
      <span>
        심
      </span>
    ),
  },
  {
    label: '고객',
    value: 'customer',
    icon: (
      <span>
        고
      </span>
    ),
  },
  {
    label: '일반',
    value: 'general',
    icon: (
      <span>
        일
      </span>
    ),
  },
]

export function PresentationSummaryInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const presentationType =
    getString(
      slot.config,
      'presentationType',
      'script',
    )

  const duration =
    getString(
      slot.config,
      'duration',
      '30s',
    )

  const audience =
    getString(
      slot.config,
      'audience',
      'team',
    )

  const slideCount =
    getNumber(
      slot.config,
      'slideCount',
      0,
    )

  const includeQuestions =
    getBoolean(
      slot.config,
      'includeQuestions',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextType =
      typeof patch.presentationType ===
      'string'
        ? patch.presentationType
        : presentationType

    const nextDuration =
      typeof patch.duration ===
      'string'
        ? patch.duration
        : duration

    const nextAudience =
      typeof patch.audience ===
      'string'
        ? patch.audience
        : audience

    const nextSlideCount =
      typeof patch.slideCount ===
      'number'
        ? patch.slideCount
        : slideCount

    const slideCountRequired =
      nextType ===
      'slide-outline'

    const complete =
      Boolean(
        nextType,
      ) &&
      Boolean(
        nextDuration,
      ) &&
      Boolean(
        nextAudience,
      ) &&
      (
        !slideCountRequired ||
        nextSlideCount >
          0
      )

    const typeLabel =
      presentationTypeOptions.find(
        (
          option,
        ) =>
          option.value ===
          nextType,
      )?.label ??
      nextType

    const durationLabel =
      presentationDurationOptions.find(
        (
          option,
        ) =>
          option.value ===
          nextDuration,
      )?.label ??
      nextDuration

    onConfigChange(
      {
        presentationType,
        duration,
        audience,
        slideCount,
        includeQuestions,
        ...patch,
      },
      {
        summaryValue:
          `${typeLabel} · ${durationLabel}`,

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="발표용 요약으로 출력하기"
      code="OUT-005"
      stage="OUTPUT"
      description="발표 시간에 맞는 요약을 출력합니다."
      icon={
        <Presentation
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        conditional:
          Number(
            presentationType ===
              'slide-outline',
          ),
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
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {duration} ·{' '}
            {presentationType ===
            'slide-outline'
              ? `슬라이드 ${slideCount}장`
              : '발표 요약'}
          </span>

          <Button
            size="sm"
            onClick={() =>
              save({})
            }
          >
            출력
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            발표 형태{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`presentation-type-${slot.id}`}
            options={
              presentationTypeOptions
            }
            value={
              presentationType
            }
            onChange={(
              value,
            ) =>
              save({
                presentationType:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            발표 시간{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockButton
            options={
              presentationDurationOptions
            }
            value={
              duration
            }
            onChange={(
              value,
            ) =>
              save({
                duration:
                  value,
              })
            }
            className="flex-wrap"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              청중
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <BlockCard
            columns={4}
            options={
              presentationAudienceOptions
            }
            value={
              audience
            }
            onChange={(
              value,
            ) =>
              save({
                audience:
                  value,
              })
            }
          />
        </div>

        {presentationType ===
          'slide-outline' && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-700">
                슬라이드 수
              </p>

              <span className="text-[11px] font-bold text-amber-600">
                조건부
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  save({
                    slideCount:
                      Math.max(
                        0,
                        slideCount -
                          1,
                      ),
                  })
                }
                className="h-[42px] w-[42px] rounded-xl border-2 border-slate-200 font-bold"
              >
                −
              </button>

              <div className="flex h-[42px] min-w-[64px] items-center justify-center rounded-xl border-2 border-slate-200 text-sm font-bold">
                {
                  slideCount
                }
              </div>

              <button
                type="button"
                onClick={() =>
                  save({
                    slideCount:
                      slideCount +
                      1,
                  })
                }
                className="h-[42px] w-[42px] rounded-xl border-2 border-slate-200 font-bold"
              >
                +
              </button>

              {[
                3,
                5,
                7,
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
                        slideCount:
                          count,
                      })
                    }
                    className={[
                      'h-[42px] w-[42px] rounded-xl border-2 text-sm font-bold',
                      slideCount ===
                      count
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : 'border-slate-200 text-slate-500',
                    ].join(
                      ' ',
                    )}
                  >
                    {
                      count
                    }
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        <ToggleSwitch
          checked={
            includeQuestions
          }
          onChange={(
            value,
          ) =>
            save({
              includeQuestions:
                value,
            })
          }
          label="예상 질문"
          description="Q&A 예상 질문 추가"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * OUT-006 개발자 전달용으로 출력하기
 * ============================================================
 */

const developerTargetOptions = [
  {
    label: 'FE',
    value: 'FE',
    icon: (
      <span>
        FE
      </span>
    ),
  },
  {
    label: 'BE',
    value: 'BE',
    icon: (
      <span>
        BE
      </span>
    ),
  },
  {
    label: '전체',
    value: 'ALL',
    icon: (
      <span>
        全
      </span>
    ),
  },
  {
    label: 'QA',
    value: 'QA',
    icon: (
      <span>
        QA
      </span>
    ),
  },
]

const developerIncludeOptions = [
  '기능',
  '트리거',
  '입력',
  '출력',
  '상태',
  'API',
  '예외',
  '권한',
]

const developerDetailOptions = [
  {
    label: '핵심',
    value: 'core',
  },
  {
    label: '구현 가능',
    value: 'implementable',
  },
  {
    label: '상세',
    value: 'detail',
  },
]

export function DeveloperHandoffInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const target =
    getString(
      slot.config,
      'target',
      'FE',
    )

  const includedItems =
    getStringArray(
      slot.config,
      'includedItems',
    )

  const detailLevel =
    getString(
      slot.config,
      'detailLevel',
      'implementable',
    )

  const showFeatureId =
    getBoolean(
      slot.config,
      'showFeatureId',
      false,
    )

  const showUndecided =
    getBoolean(
      slot.config,
      'showUndecided',
      false,
    )

  const showPriority =
    getBoolean(
      slot.config,
      'showPriority',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextTarget =
      typeof patch.target ===
      'string'
        ? patch.target
        : target

    const nextItems =
      Array.isArray(
        patch.includedItems,
      )
        ? patch.includedItems.filter(
            (
              item,
            ): item is string =>
              typeof item ===
              'string',
          )
        : includedItems

    const nextDetail =
      typeof patch.detailLevel ===
      'string'
        ? patch.detailLevel
        : detailLevel

    const complete =
      Boolean(
        nextTarget,
      ) &&
      nextItems.length >
        0 &&
      Boolean(
        nextDetail,
      )

    onConfigChange(
      {
        target,
        includedItems,
        detailLevel,
        normalExceptionSeparated:
          true,
        showFeatureId,
        showUndecided,
        showPriority,
        ...patch,
      },
      {
        summaryValue:
          `${nextTarget} · ${nextItems.length}개 항목`,

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="개발자 전달용으로 출력하기"
      code="OUT-006"
      stage="OUTPUT"
      description="개발 역할에 맞는 전달 문서를 출력합니다."
      icon={
        <Code2
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 4,
        optional: 3,
        missing:
          Number(
            includedItems.length ===
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
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {includedItems.length >
            0
              ? `${includedItems.length}개 항목 선택`
              : '포함 항목 미선택'}
          </span>

          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              save({})
            }
          >
            검증
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            전달 대상{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockCard
            columns={4}
            options={
              developerTargetOptions
            }
            value={
              target
            }
            onChange={(
              value,
            ) =>
              save({
                target:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            포함 항목{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockButton
            multiple
            options={developerIncludeOptions.map(
              (
                item,
              ) => ({
                label:
                  item,
                value:
                  item,
              }),
            )}
            value={
              includedItems
            }
            onChange={(
              value,
            ) =>
              save({
                includedItems:
                  value,
              })
            }
            className="flex-wrap"
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            상세 수준{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <ConnectedSegmentedControl
            options={
              developerDetailOptions
            }
            value={
              detailLevel
            }
            onChange={(
              value,
            ) =>
              save({
                detailLevel:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            정상·예외 구분{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="rounded-xl border-2 border-slate-200 px-4 py-3">
            <p className="text-sm font-bold text-slate-700">
              🔒 정상·예외 흐름 구분
            </p>

            <p className="mt-1 text-xs text-slate-400">
              고정 ON · 해제 불가
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              ID·미정·우선순위
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              checked={
                showFeatureId
              }
              onChange={(
                value,
              ) =>
                save({
                  showFeatureId:
                    value,
                })
              }
              label="기능 ID 표시"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                showUndecided
              }
              onChange={(
                value,
              ) =>
                save({
                  showUndecided:
                    value,
                })
              }
              label="미정 항목 표시"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                showPriority
              }
              onChange={(
                value,
              ) =>
                save({
                  showPriority:
                    value,
                })
              }
              label="우선순위 표시"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * OUT-007 프롬프트로 출력하기
 * ============================================================
 */

const promptFormatOptions = [
  {
    label: '일반',
    value: 'general',
  },
  {
    label: '역할형',
    value: 'role',
    description:
      '역할·지시 구조',
  },
  {
    label: '단계형',
    value: 'step',
  },
  {
    label: '템플릿형',
    value: 'template',
  },
]

const promptVariables = [
  '주제',
  '문서',
  '역할',
  '분량',
  '출력',
]

const variableNotationOptions = [
  {
    label: '{변수}',
    value: 'curly',
  },
  {
    label: '[변수]',
    value: 'bracket',
  },
  {
    label: '빈칸',
    value: 'blank',
  },
]

export function PromptOutputInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const format =
    getString(
      slot.config,
      'format',
      'general',
    )

  const variables =
    getStringArray(
      slot.config,
      'variables',
    )

  const variableNotation =
    getString(
      slot.config,
      'variableNotation',
      'blank',
    )

  const includeUsageGuide =
    getBoolean(
      slot.config,
      'includeUsageGuide',
      true,
    )

  const includeExample =
    getBoolean(
      slot.config,
      'includeExample',
      true,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextFormat =
      typeof patch.format ===
      'string'
        ? patch.format
        : format

    const formatLabel =
      promptFormatOptions.find(
        (
          option,
        ) =>
          option.value ===
          nextFormat,
      )?.label ??
      nextFormat

    onConfigChange(
      {
        format,
        variables,
        variableNotation,
        includeUsageGuide,
        includeExample,
        ...patch,
      },
      {
        summaryValue:
          `${formatLabel} · 변수 ${variables.length}개`,

        state:
          resolveState(
            Boolean(
              nextFormat,
            ),
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="프롬프트로 출력하기"
      code="OUT-007"
      stage="OUTPUT"
      description="결과를 재사용 가능한 프롬프트로 출력합니다."
      icon={
        <Braces
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 1,
        optional: 4,
      }}
      required={
        slot.required
      }
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            프롬프트 설정 완료
          </span>

          <Button
            size="sm"
            onClick={() =>
              save({})
            }
          >
            출력
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            형식{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`output-prompt-format-${slot.id}`}
            options={
              promptFormatOptions
            }
            value={
              format
            }
            onChange={(
              value,
            ) =>
              save({
                format:
                  value,
              })
            }
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              변수 블록
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <BlockButton
            multiple
            options={promptVariables.map(
              (
                item,
              ) => ({
                label:
                  item,
                value:
                  item,
              }),
            )}
            value={
              variables
            }
            onChange={(
              value,
            ) =>
              save({
                variables:
                  value,
              })
            }
            className="flex-wrap"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              변수 표기
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <BlockButton
            options={
              variableNotationOptions
            }
            value={
              variableNotation
            }
            onChange={(
              value,
            ) =>
              save({
                variableNotation:
                  value,
              })
            }
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              사용 안내·예시
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              checked={
                includeUsageGuide
              }
              onChange={(
                value,
              ) =>
                save({
                  includeUsageGuide:
                    value,
                })
              }
              label="사용 안내 포함"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                includeExample
              }
              onChange={(
                value,
              ) =>
                save({
                  includeExample:
                    value,
                })
              }
              label="예시 포함"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              최종 편집
            </p>

            <span className="text-[11px] text-slate-400">
              응용 모드 이상
            </span>
          </div>

          <div className="rounded-xl bg-[#1C1C22] px-4 py-4 font-mono text-xs leading-6 text-slate-400">
            <p>
              # 역할
            </p>

            <p>
              당신은{' '}
              <span className="text-violet-300">
                {'{역할}'}
              </span>{' '}
              입니다.
            </p>

            <p>
              # 작업
            </p>

            <p>
              <span className="text-violet-300">
                {'{주제}'}
              </span>
              를{' '}
              <span className="text-emerald-300">
                {'{출력}'}
              </span>{' '}
              형식으로 정리하세요.
            </p>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * OUT-008 단계별 가이드로 출력하기
 * ============================================================
 */

const guideTargetOptions = [
  {
    label: '초보',
    value: 'beginner',
    icon: (
      <span>
        초
      </span>
    ),
  },
  {
    label: '팀원',
    value: 'team',
    icon: (
      <span>
        팀
      </span>
    ),
  },
  {
    label: '개발',
    value: 'developer',
    icon: (
      <span>
        개
      </span>
    ),
  },
  {
    label: '일반',
    value: 'general',
    icon: (
      <span>
        일
      </span>
    ),
  },
]

const guideStepCountOptions = [
  {
    label: '자동',
    value: 'auto',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '5',
    value: '5',
  },
  {
    label: '7',
    value: '7',
  },
]

const guideCompositionOptions = [
  '할 일',
  '입력',
  '결과',
  '주의',
]

export function StepGuideInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const target =
    getString(
      slot.config,
      'target',
    )

  const stepCount =
    getString(
      slot.config,
      'stepCount',
    )

  const composition =
    getStringArray(
      slot.config,
      'composition',
    )

  const includeExample =
    getBoolean(
      slot.config,
      'includeExample',
      false,
    )

  const includeErrorHandling =
    getBoolean(
      slot.config,
      'includeErrorHandling',
      false,
    )

  const includeCompletionCheck =
    getBoolean(
      slot.config,
      'includeCompletionCheck',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextTarget =
      typeof patch.target ===
      'string'
        ? patch.target
        : target

    const nextStepCount =
      typeof patch.stepCount ===
      'string'
        ? patch.stepCount
        : stepCount

    const nextComposition =
      Array.isArray(
        patch.composition,
      )
        ? patch.composition.filter(
            (
              item,
            ): item is string =>
              typeof item ===
              'string',
          )
        : composition

    const complete =
      Boolean(
        nextTarget,
      ) &&
      Boolean(
        nextStepCount,
      ) &&
      nextComposition.length >
        0

    onConfigChange(
      {
        target,
        stepCount,
        composition,
        includeExample,
        includeErrorHandling,
        includeCompletionCheck,
        ...patch,
      },
      {
        summaryValue:
          nextTarget
            ? `${nextTarget} · ${nextStepCount || '단계 미지정'}`
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
      title="단계별 가이드로 출력하기"
      code="OUT-008"
      stage="OUTPUT"
      description="따라 할 수 있는 단계별 가이드로 출력합니다."
      icon={
        <ListOrdered
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 3,
        optional: 2,
        recommended: 1,
        missing:
          Number(
            !target,
          ) +
          Number(
            !stepCount,
          ) +
          Number(
            composition.length ===
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
            {target &&
            stepCount &&
            composition.length >
              0
              ? '가이드 설정 완료'
              : '필수 설정 미완료'}
          </span>

          <Button
            size="sm"
            onClick={() =>
              save({})
            }
          >
            출력
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            가이드 대상{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockCard
            columns={4}
            options={
              guideTargetOptions
            }
            value={
              target
            }
            onChange={(
              value,
            ) =>
              save({
                target:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            단계 수{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockButton
            options={
              guideStepCountOptions
            }
            value={
              stepCount
            }
            onChange={(
              value,
            ) =>
              save({
                stepCount:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            단계 구성{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockButton
            multiple
            options={guideCompositionOptions.map(
              (
                item,
              ) => ({
                label:
                  item,
                value:
                  item,
              }),
            )}
            value={
              composition
            }
            onChange={(
              value,
            ) =>
              save({
                composition:
                  value,
              })
            }
            className="flex-wrap"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              예시·오류·완료
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              checked={
                includeExample
              }
              onChange={(
                value,
              ) =>
                save({
                  includeExample:
                    value,
                })
              }
              label="예시 포함"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                includeErrorHandling
              }
              onChange={(
                value,
              ) =>
                save({
                  includeErrorHandling:
                    value,
                })
              }
              label="오류 대처 포함"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                includeCompletionCheck
              }
              onChange={(
                value,
              ) =>
                save({
                  includeCompletionCheck:
                    value,
                })
              }
              label="완료 확인 포함"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * OUT-009 내 저장소에 저장하기
 * ============================================================
 */

const saveTargetOptions = [
  {
    label: '블록 흐름',
    value: 'workflow',
    description:
      '노드·옵션 구성 전체',
  },
  {
    label: '예시 결과',
    value: 'example',
    description:
      '학습용 미리보기',
  },
  {
    label: '최종 결과',
    value: 'result',
    description:
      '실행 결과물',
  },
]

const storageLocationOptions = [
  {
    label: '내 흐름',
    value: 'my-workflow',
    icon: (
      <span>
        📁
      </span>
    ),
  },
  {
    label: '튜토리얼 진행',
    value: 'tutorial',
    icon: (
      <span>
        🎓
      </span>
    ),
  },
]

const saveTimingOptions = [
  {
    label: '수동 저장',
    value: 'manual',
  },
  {
    label: '단계 완료 시',
    value: 'stage-complete',
  },
  {
    label: '실행 후',
    value: 'after-run',
  },
]

const existingItemOptions = [
  {
    label: '덮어쓰기',
    value: 'overwrite',
  },
  {
    label: '새 버전',
    value: 'new-version',
  },
]

export function SaveStorageInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const saveTarget =
    getString(
      slot.config,
      'saveTarget',
      'workflow',
    )

  const title =
    getString(
      slot.config,
      'title',
    )

  const location =
    getString(
      slot.config,
      'location',
      'my-workflow',
    )

  const saveTiming =
    getString(
      slot.config,
      'saveTiming',
    )

  const existingItemHandling =
    getString(
      slot.config,
      'existingItemHandling',
      'overwrite',
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextTarget =
      typeof patch.saveTarget ===
      'string'
        ? patch.saveTarget
        : saveTarget

    const nextTitle =
      typeof patch.title ===
      'string'
        ? patch.title
        : title

    const nextLocation =
      typeof patch.location ===
      'string'
        ? patch.location
        : location

    const nextTiming =
      typeof patch.saveTiming ===
      'string'
        ? patch.saveTiming
        : saveTiming

    const complete =
      Boolean(
        nextTarget,
      ) &&
      Boolean(
        nextTitle.trim(),
      ) &&
      Boolean(
        nextLocation,
      ) &&
      Boolean(
        nextTiming,
      )

    onConfigChange(
      {
        saveTarget,
        title,
        location,
        saveTiming,
        existingItemHandling,

        /*
         * MVP 원본 명세 기준 고정값
         */
        visibility:
          'private',

        ...patch,
      },
      {
        summaryValue:
          nextTitle.trim()
            ? `${nextTitle.trim()} · 비공개`
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
      title="내 저장소에 저장하기"
      code="OUT-009"
      stage="OUTPUT"
      description="저장할 대상과 위치, 저장 시점을 지정합니다."
      icon={
        <Save
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 4,
        optional: 1,
        missing:
          Number(
            !title.trim(),
          ) +
          Number(
            !saveTiming,
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
            {title.trim() &&
            saveTiming
              ? '내 흐름에 비공개 저장'
              : '저장 설정 미완료'}
          </span>

          <Button
            size="sm"
            onClick={() =>
              save({})
            }
          >
            저장
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            저장 대상{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`storage-target-${slot.id}`}
            options={
              saveTargetOptions
            }
            value={
              saveTarget
            }
            onChange={(
              value,
            ) =>
              save({
                saveTarget:
                  value,
              })
            }
          />
        </div>

        <label className="block">
          <span className="mb-2 block text-xs font-bold text-slate-700">
            흐름 제목{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <input
            type="text"
            value={
              title
            }
            onChange={(
              event,
            ) =>
              save({
                title:
                  event.target.value,
              })
            }
            placeholder="제품 리뷰 요약기"
            className="h-[48px] w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            저장 위치{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockCard
            columns={2}
            options={
              storageLocationOptions
            }
            value={
              location
            }
            onChange={(
              value,
            ) =>
              save({
                location:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            저장 시점{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`storage-timing-${slot.id}`}
            options={
              saveTimingOptions
            }
            value={
              saveTiming
            }
            onChange={(
              value,
            ) =>
              save({
                saveTiming:
                  value,
              })
            }
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              기존 항목
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <ConnectedSegmentedControl
            options={
              existingItemOptions
            }
            value={
              existingItemHandling
            }
            onChange={(
              value,
            ) =>
              save({
                existingItemHandling:
                  value,
              })
            }
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              공개 범위
            </p>

            <span className="text-[11px] text-slate-400">
              고정
            </span>
          </div>

          <div className="rounded-xl border-2 border-slate-200 px-4 py-3">
            <p className="text-sm font-bold text-slate-700">
              🔒 비공개 · MVP 기본
            </p>

            <p className="mt-1 text-xs text-slate-400">
              저장 후 저장소에서 공개로 전환 가능
            </p>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * OUT-010 공개용 설명 만들기
 * ============================================================
 */

const publicPurposeOptions = [
  {
    label: '자료',
    value: 'data',
    icon: (
      <span>
        📚
      </span>
    ),
  },
  {
    label: '요약',
    value: 'summary',
    icon: (
      <span>
        📝
      </span>
    ),
  },
  {
    label: '글쓰기',
    value: 'write',
    icon: (
      <span>
        ✍️
      </span>
    ),
  },
  {
    label: '반복',
    value: 'repeat',
    icon: (
      <span>
        🔁
      </span>
    ),
  },
  {
    label: '검토',
    value: 'review',
    icon: (
      <span>
        ✓
      </span>
    ),
  },
  {
    label: 'AI툴',
    value: 'ai',
    icon: (
      <span>
        🤖
      </span>
    ),
  },
]

const publicDifficultyOptions = [
  {
    label: '입문',
    value: 'intro',
  },
  {
    label: '기초',
    value: 'basic',
  },
  {
    label: '응용',
    value: 'advanced',
  },
]

export function PublicDescriptionInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const publicTitle =
    getString(
      slot.config,
      'publicTitle',
    )

  const shortDescription =
    getString(
      slot.config,
      'shortDescription',
    )

  const purpose =
    getString(
      slot.config,
      'purpose',
    )

  const difficulty =
    getString(
      slot.config,
      'difficulty',
    )

  const tags =
    getString(
      slot.config,
      'tags',
    )

  const authorNote =
    getString(
      slot.config,
      'authorNote',
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextTitle =
      typeof patch.publicTitle ===
      'string'
        ? patch.publicTitle
        : publicTitle

    const nextDescription =
      typeof patch.shortDescription ===
      'string'
        ? patch.shortDescription
        : shortDescription

    const nextPurpose =
      typeof patch.purpose ===
      'string'
        ? patch.purpose
        : purpose

    const nextDifficulty =
      typeof patch.difficulty ===
      'string'
        ? patch.difficulty
        : difficulty

    const nextTags =
      typeof patch.tags ===
      'string'
        ? patch.tags
        : tags

    const complete =
      Boolean(
        nextTitle.trim(),
      ) &&
      Boolean(
        nextDescription.trim(),
      ) &&
      Boolean(
        nextPurpose,
      ) &&
      Boolean(
        nextDifficulty,
      ) &&
      Boolean(
        nextTags.trim(),
      )

    onConfigChange(
      {
        publicTitle,
        shortDescription,
        purpose,
        difficulty,
        tags,
        authorNote,
        ...patch,
      },
      {
        summaryValue:
          nextTitle.trim(),

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="공개용 설명 만들기"
      code="OUT-010"
      stage="OUTPUT"
      description="흐름을 공개할 때 보일 소개 정보를 작성합니다."
      icon={
        <Globe2
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 5,
        optional: 1,
        missing:
          Number(
            !publicTitle.trim(),
          ) +
          Number(
            !shortDescription.trim(),
          ) +
          Number(
            !purpose,
          ) +
          Number(
            !difficulty,
          ) +
          Number(
            !tags.trim(),
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
            {publicTitle.trim()
              ? publicTitle
              : '공개 제목 미입력'}
          </span>

          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              save({})
            }
          >
            검증
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-xs font-bold text-slate-700">
            공개 제목{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <input
            type="text"
            value={
              publicTitle
            }
            onChange={(
              event,
            ) =>
              save({
                publicTitle:
                  event.target.value,
              })
            }
            placeholder="공개 제목을 입력하세요"
            className="h-[48px] w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold text-slate-700">
            한 줄 설명{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <input
            type="text"
            value={
              shortDescription
            }
            onChange={(
              event,
            ) =>
              save({
                shortDescription:
                  event.target.value,
              })
            }
            placeholder="흐름을 한 줄로 소개하세요"
            className="h-[48px] w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            사용 목적{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockCard
            columns={3}
            options={
              publicPurposeOptions
            }
            value={
              purpose
            }
            onChange={(
              value,
            ) =>
              save({
                purpose:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            난이도{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <ConnectedSegmentedControl
            options={
              publicDifficultyOptions
            }
            value={
              difficulty
            }
            onChange={(
              value,
            ) =>
              save({
                difficulty:
                  value,
              })
            }
          />
        </div>

        <label className="block">
          <span className="mb-2 block text-xs font-bold text-slate-700">
            태그{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <input
            type="text"
            value={
              tags
            }
            onChange={(
              event,
            ) =>
              save({
                tags:
                  event.target.value,
              })
            }
            placeholder="태그 입력"
            className="h-[48px] w-full rounded-xl border-2 border-slate-200 px-4 text-sm outline-none focus:border-indigo-500"
          />
        </label>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            예시 입력·결과{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border-2 border-slate-200 px-3 py-4 text-center text-xs text-slate-400">
              예시 입력 선택
            </div>

            <div className="rounded-xl border-2 border-slate-200 px-3 py-4 text-center text-xs text-slate-400">
              예시 결과 선택
            </div>
          </div>

          <p className="mt-2 text-[11px] leading-5 text-slate-400">
            실제 예시 데이터 선택은
            저장·실행 데이터 연결 단계에서 연결합니다.
          </p>
        </div>

        <label className="block">
          <span className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              작성자 노트
            </span>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </span>

          <Textarea
            value={
              authorNote
            }
            onChange={(
              value,
            ) =>
              save({
                authorNote:
                  value,
              })
            }
            placeholder="활용 팁을 적어주세요"
            rows={3}
          />
        </label>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * OUT-011 복사 가능한 흐름으로 만들기
 * ============================================================
 */

const copyTargetOptions = [
  {
    label: '블록 구조',
    value: 'block-structure',
  },
  {
    label: '옵션 값',
    value: 'option-values',
  },
  {
    label: '예시 입력',
    value: 'example-input',
  },
]

const documentLinkHandlingOptions = [
  {
    label: '연결 제거',
    value: 'remove',
    description:
      '문서 연결을 끊고 복사',
  },
  {
    label: '대체 문서 요청',
    value: 'request-replacement',
    description:
      '복사자에게 문서 요청',
  },
]

const inputResetOptions = [
  {
    label: '모두 초기화',
    value: 'reset-all',
  },
  {
    label: '예시 유지',
    value: 'keep-example',
  },
]

const editableScopeOptions = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '입력만',
    value: 'input-only',
  },
]

export function CopyableFlowInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const copyAllowed =
    getBoolean(
      slot.config,
      'copyAllowed',
      true,
    )

  const copyTarget =
    getString(
      slot.config,
      'copyTarget',
      'block-structure',
    )

  const documentLinkHandling =
    getString(
      slot.config,
      'documentLinkHandling',
    )

  const inputReset =
    getString(
      slot.config,
      'inputReset',
    )

  const editableScope =
    getString(
      slot.config,
      'editableScope',
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextCopyAllowed =
      typeof patch.copyAllowed ===
      'boolean'
        ? patch.copyAllowed
        : copyAllowed

    const nextTarget =
      typeof patch.copyTarget ===
      'string'
        ? patch.copyTarget
        : copyTarget

    const nextDocumentHandling =
      typeof patch.documentLinkHandling ===
      'string'
        ? patch.documentLinkHandling
        : documentLinkHandling

    const nextReset =
      typeof patch.inputReset ===
      'string'
        ? patch.inputReset
        : inputReset

    const complete =
      nextCopyAllowed &&
      Boolean(
        nextTarget,
      ) &&
      Boolean(
        nextDocumentHandling,
      ) &&
      Boolean(
        nextReset,
      )

    onConfigChange(
      {
        copyAllowed,
        copyTarget,

        /*
         * 원본 와이어프레임에서 고정 ON입니다.
         */
        removePersonalData:
          true,

        documentLinkHandling,
        inputReset,
        editableScope,

        ...patch,
      },
      {
        summaryValue:
          nextCopyAllowed
            ? '복사 허용 · 개인 데이터 제거'
            : '복사 비허용',

        state:
          resolveState(
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="복사 가능한 흐름으로 만들기"
      code="OUT-011"
      stage="OUTPUT"
      description="다른 사용자가 복사해 쓸 수 있게 흐름을 정리합니다."
      icon={
        <Copy
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 5,
        optional: 1,
        missing:
          Number(
            !copyAllowed,
          ) +
          Number(
            !documentLinkHandling,
          ) +
          Number(
            !inputReset,
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
            {copyAllowed
              ? '복사 허용 · 개인 데이터 제거 고정'
              : '복사 비허용'}
          </span>

          <Button
            size="sm"
            onClick={() =>
              save({})
            }
          >
            적용
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            복사 허용{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <ToggleSwitch
            checked={
              copyAllowed
            }
            onChange={(
              value,
            ) =>
              save({
                copyAllowed:
                  value,
              })
            }
            label="복사 허용"
            description="기본 ON"
            size="sm"
            className="flex w-full flex-row-reverse justify-between"
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            복사 대상{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`copy-target-${slot.id}`}
            options={
              copyTargetOptions
            }
            value={
              copyTarget
            }
            onChange={(
              value,
            ) =>
              save({
                copyTarget:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            개인 데이터 제거{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="rounded-xl border-2 border-slate-200 px-4 py-3">
            <p className="text-sm font-bold text-slate-700">
              🔒 개인 데이터 제거
            </p>

            <p className="mt-1 text-xs text-slate-400">
              고정 ON · 해제 불가
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            문서 연결 처리{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`copy-document-${slot.id}`}
            options={
              documentLinkHandlingOptions
            }
            value={
              documentLinkHandling
            }
            onChange={(
              value,
            ) =>
              save({
                documentLinkHandling:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            입력 초기화{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockButton
            options={
              inputResetOptions
            }
            value={
              inputReset
            }
            onChange={(
              value,
            ) =>
              save({
                inputReset:
                  value,
              })
            }
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              수정 범위
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <ConnectedSegmentedControl
            options={
              editableScopeOptions
            }
            value={
              editableScope
            }
            onChange={(
              value,
            ) =>
              save({
                editableScope:
                  value,
              })
            }
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}