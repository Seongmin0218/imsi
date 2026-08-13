import {
  AlignLeft,
  Search,
} from 'lucide-react'

import {
  Button,
} from '../../../../../components/ui'

import {
  BlockButton,
} from '../../../../Block/components/ui/BlockButton'

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
 * PROCESS-001
 * 핵심 내용 추출하기
 * ============================================================
 *
 * 기존 Process.tsx 실제 구현:
 *
 * 추출 대상
 * - 주장
 * - 사실
 * - 요구
 * - 결정
 * - 액션
 * - 키워드
 *
 * 추출 단위
 * - 문장
 * - 항목
 * - 주제
 *
 * 추출 강도
 * - 0.0 ~ 1.0
 * - 기존 기본값 0.7
 *
 * 최대 항목
 * - 직접 증감
 * - 3
 * - 5
 * - 10
 * - 제한없음
 * ============================================================
 */

const extractionTargetOptions = [
  '주장',
  '사실',
  '요구',
  '결정',
  '액션',
  '키워드',
]

const extractionUnitOptions = [
  {
    label: '문장',
    value: 'sentence',
  },
  {
    label: '항목',
    value: 'item',
  },
  {
    label: '주제',
    value: 'topic',
  },
]

const maxItemPresetOptions = [
  {
    label: '3',
    value: 3,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '제한없음',
    value: 0,
  },
]

function getExtractionIntensityLabel(
  value: number,
) {
  return value >= 0.5
    ? '적극적'
    : '보수적'
}

export function ExtractCoreInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const extractionTargets =
    getStringArray(
      slot.config,
      'extractionTargets',
    )

  /*
   * 기존 Process.tsx의 sectionType 기본값이
   * "item"이므로 그대로 유지합니다.
   */
  const extractionUnit =
    getString(
      slot.config,
      'extractionUnit',
      'item',
    )

  /*
   * 기존 progress = 70
   * → Studio config에서는 0.7로 저장합니다.
   */
  const intensity =
    getNumber(
      slot.config,
      'intensity',
      0.7,
    )

  /*
   * 기존 count 초기값이 0입니다.
   *
   * Studio에서는 0을 "제한없음"으로 사용합니다.
   */
  const maxItems =
    getNumber(
      slot.config,
      'maxItems',
      0,
    )

  const complete =
    extractionTargets.length >
      0 &&
    Boolean(
      extractionUnit,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextTargets =
      Array.isArray(
        patch.extractionTargets,
      )
        ? patch.extractionTargets.filter(
            (
              item,
            ): item is string =>
              typeof item ===
              'string',
          )
        : extractionTargets

    const nextUnit =
      typeof patch.extractionUnit ===
      'string'
        ? patch.extractionUnit
        : extractionUnit

    const nextIntensity =
      typeof patch.intensity ===
      'number'
        ? patch.intensity
        : intensity

    const nextMaxItems =
      typeof patch.maxItems ===
      'number'
        ? patch.maxItems
        : maxItems

    const nextComplete =
      nextTargets.length >
        0 &&
      Boolean(
        nextUnit,
      )

    const unitLabel =
      extractionUnitOptions.find(
        (
          option,
        ) =>
          option.value ===
          nextUnit,
      )?.label ??
      nextUnit

    onConfigChange(
      {
        extractionTargets:
          nextTargets,

        extractionUnit:
          nextUnit,

        intensity:
          nextIntensity,

        maxItems:
          nextMaxItems,
      },
      {
        summaryValue:
          nextComplete
            ? `${unitLabel} · ${getExtractionIntensityLabel(
                nextIntensity,
              )}`
            : '',

        state:
          resolveState(
            nextComplete,
          ),
      },
    )
  }

  const handleMaxItemsChange = (
    nextValue: number,
  ) => {
    save({
      maxItems:
        Math.max(
          0,
          nextValue,
        ),
    })
  }

  return (
    <ExpandableSettingBlock
        title="핵심 내용 추출하기"
        code="PROCESS-001"
        stage="PROCESS"
        description="입력에서 필요한 핵심 내용을 지정한 단위와 강도로 추출합니다."
        icon={
            <Search
            size={18}
            />
        }
        category="CORE"
      tagCounts={{
        required: 3,
        optional: 1,
        missing:
          Number(
            extractionTargets.length ===
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
            {complete
              ? `${extractionTargets.length}개 대상 · ${getExtractionIntensityLabel(
                  intensity,
                )}`
              : '추출 대상을 선택하세요'}
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
        {/* 추출 대상 */}
        <div>
          <div className="mb-2 flex items-baseline gap-2">
            <p className="text-xs font-bold text-slate-700">
              추출 대상{' '}
              <span className="text-rose-500">
                *
              </span>
            </p>

            <span className="text-[11px] font-medium text-indigo-500">
              복수 선택
            </span>
          </div>

          <BlockButton
            multiple
            options={extractionTargetOptions.map(
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
              extractionTargets
            }
            onChange={(
              value,
            ) =>
              save({
                extractionTargets:
                  value,
              })
            }
            className="flex-wrap"
          />
        </div>

        {/* 추출 단위 */}
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            추출 단위{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <ConnectedSegmentedControl
            options={
              extractionUnitOptions
            }
            value={
              extractionUnit
            }
            onChange={(
              value,
            ) =>
              save({
                extractionUnit:
                  value,
              })
            }
          />
        </div>

        {/* 추출 강도 */}
        <div>
          <p className="mb-3 text-xs font-bold text-slate-700">
            추출 강도{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={
              intensity
            }
            onChange={(
              event,
            ) =>
              save({
                intensity:
                  Number(
                    event.target.value,
                  ),
              })
            }
            className="w-full cursor-pointer accent-indigo-500"
          />

          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              보수적
            </span>

            <span className="font-bold text-indigo-500">
              {intensity.toFixed(
                1,
              )}{' '}
              ·{' '}
              {getExtractionIntensityLabel(
                intensity,
              )}
            </span>

            <span className="text-slate-400">
              적극적
            </span>
          </div>
        </div>

        {/* 최대 항목 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              최대 항목
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-[44px] overflow-hidden rounded-xl border-2 border-slate-200">
              <button
                type="button"
                onClick={() =>
                  handleMaxItemsChange(
                    maxItems >
                      0
                      ? maxItems -
                          1
                      : 0,
                  )
                }
                className="flex w-[44px] items-center justify-center border-r-2 border-slate-200 text-lg text-slate-600"
              >
                −
              </button>

              <div className="flex min-w-[54px] items-center justify-center text-sm font-bold text-slate-700">
                {maxItems ===
                0
                  ? '∞'
                  : maxItems}
              </div>

              <button
                type="button"
                onClick={() =>
                  handleMaxItemsChange(
                    maxItems ===
                    0
                      ? 1
                      : maxItems +
                          1,
                  )
                }
                className="flex w-[44px] items-center justify-center border-l-2 border-slate-200 text-lg text-slate-600"
              >
                +
              </button>
            </div>

            {maxItemPresetOptions.map(
              (
                option,
              ) => (
                <button
                  key={
                    option.label
                  }
                  type="button"
                  onClick={() =>
                    save({
                      maxItems:
                        option.value,
                    })
                  }
                  className={[
                    'h-[44px] rounded-xl border-2 px-3 text-sm font-bold',
                    maxItems ===
                    option.value
                      ? 'border-indigo-500 bg-indigo-500 text-white'
                      : 'border-slate-200 bg-white text-slate-500',
                  ].join(
                    ' ',
                  )}
                >
                  {
                    option.label
                  }
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * PROCESS-002
 * 요약하기
 * ============================================================
 *
 * 기존 Process.tsx 실제 구현:
 *
 * 요약 길이
 * - 한 문장
 * - 짧게
 * - 보통
 * - 자세히
 *
 * 요약 형식
 * - 단락
 * - 목록
 * - 핵심 문장
 * - 항목별
 *
 * 요약 관점
 * - 현재 원본에 실제 표시된 값은 "전체"
 * - 드롭다운의 다른 option 데이터는 구현돼 있지 않음
 * ============================================================
 */

const summaryLengthOptions = [
  {
    label: '한 문장',
    value: 'sentence',
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

const summaryFormatOptions = [
  {
    label: '단락',
    value: 'paragraph',
  },
  {
    label: '목록',
    value: 'list',
    description:
      '글머리 기호로 항목화',
  },
  {
    label: '핵심 문장',
    value: 'key-sentence',
  },
  {
    label: '항목별',
    value: 'by-item',
  },
]

export function SummaryInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  /*
   * 기존 Process.tsx:
   * useState("short")
   */
  const length =
    getString(
      slot.config,
      'length',
      'short',
    )

  /*
   * 기존 Process.tsx:
   * form 초기값은 빈 문자열.
   *
   * 따라서 사용자가 실제 형식을 선택하기 전까지
   * required 설정 완료로 처리하지 않습니다.
   */
  const format =
    getString(
      slot.config,
      'format',
    )

  /*
   * 기존 원본에서 실제 표시된 유일한 관점 값.
   * 다른 dropdown option은 구현돼 있지 않습니다.
   */
  const perspective =
    getString(
      slot.config,
      'perspective',
      'all',
    )

  const complete =
    Boolean(
      length,
    ) &&
    Boolean(
      format,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextLength =
      typeof patch.length ===
      'string'
        ? patch.length
        : length

    const nextFormat =
      typeof patch.format ===
      'string'
        ? patch.format
        : format

    const nextPerspective =
      typeof patch.perspective ===
      'string'
        ? patch.perspective
        : perspective

    const nextComplete =
      Boolean(
        nextLength,
      ) &&
      Boolean(
        nextFormat,
      )

    const lengthLabel =
      summaryLengthOptions.find(
        (
          option,
        ) =>
          option.value ===
          nextLength,
      )?.label ??
      nextLength

    const formatLabel =
      summaryFormatOptions.find(
        (
          option,
        ) =>
          option.value ===
          nextFormat,
      )?.label ??
      nextFormat

    onConfigChange(
      {
        length:
          nextLength,

        format:
          nextFormat,

        perspective:
          nextPerspective,
      },
      {
        summaryValue:
          nextComplete
            ? `${lengthLabel} · ${formatLabel}`
            : '',

        state:
          resolveState(
            nextComplete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
        title="요약하기"
        code="PROCESS-002"
        stage="PROCESS"
        description="내용을 지정한 길이와 형식으로 요약합니다."
        icon={
            <AlignLeft
            size={18}
            />
        }
        category="CORE"
      tagCounts={{
        required: 2,
        optional: 1,
        missing:
          Number(
            !format,
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
            {complete
              ? '요약 설정 완료'
              : '요약 형식을 선택하세요'}
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
        {/* 요약 길이 */}
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            요약 길이{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockButton
            options={
              summaryLengthOptions
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

        {/* 요약 형식 */}
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            요약 형식{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`process-summary-format-${slot.id}`}
            options={
              summaryFormatOptions
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

        {/* 요약 관점 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              요약 관점
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="rounded-xl border-2 border-slate-200 px-4 py-3">
            <p className="text-sm font-bold text-slate-700">
              전체
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              현재 원본 Process UI에는
              "전체" 이외의 관점 옵션 데이터가
              정의되어 있지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}