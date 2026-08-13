import {
  Archive,
  BookOpenCheck,
  Braces,
  CheckCircle2,
  CopyCheck,
  FileJson,
  FileText,
  List,
  MapPin,
  MessageSquareText,
  PenTool,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Table2,
  Wrench,
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
  const value = config?.[key]

  return typeof value === 'string'
    ? value
    : fallback
}

function getBoolean(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback: boolean,
): boolean {
  const value = config?.[key]

  return typeof value === 'boolean'
    ? value
    : fallback
}

function getNumber(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback: number,
): number {
  const value = config?.[key]

  return typeof value === 'number'
    ? value
    : fallback
}

function getStringArray(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback: string[] = [],
): string[] {
  const value = config?.[key]

  if (!Array.isArray(value)) {
    return fallback
  }

  return value.filter(
    (item): item is string =>
      typeof item === 'string',
  )
}

function resolveEnabledState(
  enabled: boolean,
  required: boolean | undefined,
  complete: boolean,
): StudioSlotState {
  if (!enabled) {
    return required
      ? 'empty'
      : 'filled'
  }

  return complete
    ? 'filled'
    : 'empty'
}

/*
 * ============================================================
 * RV-001 누락 확인하기
 * ============================================================
 */

const omissionTargets = [
  '필수항목',
  '섹션',
  '기능',
  '정책',
  '조건',
  '근거',
]

const criteriaSources = [
  {
    label: '사용자 조건',
    value: '사용자 조건',
    description:
      '사용자가 정의한 조건으로 작성',
  },
  {
    label: '템플릿',
    value: '템플릿',
    description:
      '템플릿 기준으로 작성',
  },
  {
    label: '문서',
    value: '문서',
    description:
      '문서 기준으로 작성',
  },
  {
    label: '직접 입력',
    value: '직접 입력',
    description:
      '기준을 직접 작성',
  },
]

export function MissingCheckInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const confirmTarget =
    getString(
      slot.config,
      'confirmTarget',
      '필수항목',
    )

  const criteriaSource =
    getString(
      slot.config,
      'criteriaSource',
      '직접 입력',
    )

  const customCriteria =
    getString(
      slot.config,
      'customCriteria',
    )

  const severityDisplay =
    getBoolean(
      slot.config,
      'severityDisplay',
      false,
    )

  const suggestFix =
    getBoolean(
      slot.config,
      'suggestFix',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled === 'boolean'
        ? patch.enabled
        : enabled

    const nextTarget =
      typeof patch.confirmTarget === 'string'
        ? patch.confirmTarget
        : confirmTarget

    const nextSource =
      typeof patch.criteriaSource === 'string'
        ? patch.criteriaSource
        : criteriaSource

    const nextCriteria =
      typeof patch.customCriteria === 'string'
        ? patch.customCriteria
        : customCriteria

    const complete =
      Boolean(nextTarget) &&
      Boolean(nextSource) &&
      (
        nextSource !== '직접 입력' ||
        Boolean(nextCriteria.trim())
      )

    onConfigChange(
      {
        enabled,
        confirmTarget,
        criteriaSource,
        customCriteria,
        severityDisplay,
        suggestFix,
        ...patch,
      },
      {
        summaryValue:
          nextSource === '직접 입력'
            ? nextCriteria.trim().slice(0, 60)
            : `${nextTarget} · ${nextSource}`,

        state:
          resolveEnabledState(
            nextEnabled,
            slot.required,
            complete,
          ),
      },
    )
  }

  const directCriteriaRequired =
    criteriaSource === '직접 입력'

  return (
    <ExpandableSettingBlock
      title="누락 확인하기"
      code="RV-001"
      stage="REVIEW"
      description="빠진 항목이 없는지 기준에 따라 점검합니다."
      icon={
        <CheckCircle2 size={18} />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        conditional:
          Number(
            directCriteriaRequired,
          ),
        optional: 2,
        missing:
          Number(
            directCriteriaRequired &&
              !customCriteria.trim(),
          ),
      }}
      required={slot.required}
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {directCriteriaRequired &&
            !customCriteria.trim()
              ? '직접 기준 입력 대기'
              : '누락 검사 설정 완료'}
          </span>

          <Button
            size="sm"
            onClick={() => save({})}
          >
            적용
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <ToggleSwitch
          checked={enabled}
          onChange={(value) =>
            save({
              enabled: value,
            })
          }
          label="누락 확인 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                확인 대상{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <BlockButton
                options={omissionTargets.map(
                  (item) => ({
                    label: item,
                    value: item,
                  }),
                )}
                value={confirmTarget}
                onChange={(value) =>
                  save({
                    confirmTarget:
                      value,
                  })
                }
                className="flex-wrap"
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                기준 출처{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <Radio
                name={`review-criteria-${slot.id}`}
                options={
                  criteriaSources
                }
                value={
                  criteriaSource
                }
                onChange={(value) =>
                  save({
                    criteriaSource:
                      value,
                  })
                }
              />
            </div>

            {directCriteriaRequired && (
              <label className="block">
                <span className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    직접 기준
                  </span>

                  <span className="text-[11px] font-bold text-amber-600">
                    조건부
                  </span>
                </span>

                <Textarea
                  value={
                    customCriteria
                  }
                  onChange={(value) =>
                    save({
                      customCriteria:
                        value,
                    })
                  }
                  placeholder="점검 기준을 입력하세요"
                  rows={3}
                />
              </label>
            )}

            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  심각도·보완
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <div className="space-y-4">
                <ToggleSwitch
                  checked={
                    severityDisplay
                  }
                  onChange={(value) =>
                    save({
                      severityDisplay:
                        value,
                    })
                  }
                  label="심각도 표시"
                  size="sm"
                  className="flex w-full flex-row-reverse justify-between"
                />

                <ToggleSwitch
                  checked={
                    suggestFix
                  }
                  onChange={(value) =>
                    save({
                      suggestFix:
                        value,
                    })
                  }
                  label="수정 제안 포함"
                  size="sm"
                  className="flex w-full flex-row-reverse justify-between"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * RV-002 형식 확인하기
 * ============================================================
 */

const expectedFormats = [
  {
    label: '단락',
    value: '단락',
    icon: <MessageSquareText size={17} />,
  },
  {
    label: '목록',
    value: '목록',
    icon: <List size={17} />,
  },
  {
    label: '표',
    value: '표',
    icon: <Table2 size={17} />,
  },
  {
    label: '체크',
    value: '체크',
    icon: <CheckCircle2 size={17} />,
  },
  {
    label: '문서',
    value: '문서',
    icon: <FileText size={17} />,
  },
  {
    label: '프롬프트',
    value: '프롬프트',
    icon: <PenTool size={17} />,
  },
  {
    label: 'JSON',
    value: 'JSON',
    icon: <FileJson size={17} />,
  },
]

const decompositionOptions = [
  {
    label: '결과 설정',
    value: '결과 설정',
  },
  {
    label: '템플릿',
    value: '템플릿',
  },
  {
    label: '직접',
    value: '직접',
  },
]

const formatErrorOptions = [
  {
    label: '자동 수정',
    value: '자동 수정',
    description:
      '형식을 맞춰 재작성',
  },
  {
    label: '표시만',
    value: '표시만',
    description:
      '위치만 표시하고 유지',
  },
]

export function FormatCheckInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const expectedFormat =
    getString(
      slot.config,
      'expectedFormat',
      '표',
    )

  const decompositionLevel =
    getString(
      slot.config,
      'decompositionLevel',
      '결과 설정',
    )

  const requiredComposition =
    getString(
      slot.config,
      'requiredComposition',
    )

  const errorHandling =
    getString(
      slot.config,
      'errorHandling',
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled === 'boolean'
        ? patch.enabled
        : enabled

    const nextFormat =
      typeof patch.expectedFormat === 'string'
        ? patch.expectedFormat
        : expectedFormat

    const nextLevel =
      typeof patch.decompositionLevel === 'string'
        ? patch.decompositionLevel
        : decompositionLevel

    const nextHandling =
      typeof patch.errorHandling === 'string'
        ? patch.errorHandling
        : errorHandling

    const complete =
      Boolean(nextFormat) &&
      Boolean(nextLevel) &&
      Boolean(nextHandling)

    onConfigChange(
      {
        enabled,
        expectedFormat,
        decompositionLevel,
        requiredComposition,
        errorHandling,
        ...patch,
      },
      {
        summaryValue:
          nextFormat && nextHandling
            ? `${nextFormat} · ${nextHandling}`
            : nextFormat,

        state:
          resolveEnabledState(
            nextEnabled,
            slot.required,
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="형식 확인하기"
      code="RV-002"
      stage="REVIEW"
      description="결과물이 기대 형식과 일치하는지 검사합니다."
      icon={
        <Archive size={18} />
      }
      category="CORE"
      tagCounts={{
        required: 3,
        optional: 1,
        missing:
          Number(
            !errorHandling,
          ),
      }}
      required={slot.required}
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {errorHandling
              ? `오류 처리 · ${errorHandling}`
              : '오류 처리 미선택'}
          </span>

          <Button
            size="sm"
            onClick={() => save({})}
          >
            적용
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <ToggleSwitch
          checked={enabled}
          onChange={(value) =>
            save({
              enabled: value,
            })
          }
          label="형식 확인 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                기대 형식{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <BlockCard
                columns={4}
                options={
                  expectedFormats
                }
                value={
                  expectedFormat
                }
                onChange={(value) =>
                  save({
                    expectedFormat:
                      value,
                  })
                }
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                분해 수준{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <ConnectedSegmentedControl
                options={
                  decompositionOptions
                }
                value={
                  decompositionLevel
                }
                onChange={(value) =>
                  save({
                    decompositionLevel:
                      value,
                  })
                }
              />
            </div>

            <label className="block">
              <span className="mb-[13px] flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  필수 구성
                </span>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </span>

              <Textarea
                value={
                  requiredComposition
                }
                onChange={(value) =>
                  save({
                    requiredComposition:
                      value,
                  })
                }
                placeholder="예: 제목 · 열 3개 이상 · 합계 행"
                rows={2}
              />
            </label>

            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                오류 처리{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <Radio
                name={`review-format-error-${slot.id}`}
                options={
                  formatErrorOptions
                }
                value={
                  errorHandling
                }
                onChange={(value) =>
                  save({
                    errorHandling:
                      value,
                  })
                }
              />
            </div>
          </>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * RV-003 조건 충족 확인하기
 * ============================================================
 */

const conditionApplyOptions = [
  {
    label: '모두 충족',
    value: '모두 충족',
  },
  {
    label: '핵심 필수',
    value: '핵심 필수',
  },
]

export function ConditionCheckInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const applyMode =
    getString(
      slot.config,
      'applyMode',
      '모두 충족',
    )

  const partialAllowed =
    getBoolean(
      slot.config,
      'partialAllowed',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled === 'boolean'
        ? patch.enabled
        : enabled

    const nextMode =
      typeof patch.applyMode === 'string'
        ? patch.applyMode
        : applyMode

    onConfigChange(
      {
        enabled,
        applyMode,
        partialAllowed,
        ...patch,
      },
      {
        summaryValue:
          nextMode,

        /*
         * 이전 블록의 실제 조건 연결 여부는
         * 추후 Block Validator에서 검사합니다.
         *
         * Inspector 단계에서는 설정값만 판정합니다.
         */
        state:
          resolveEnabledState(
            nextEnabled,
            slot.required,
            Boolean(nextMode),
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="조건 충족 확인하기"
      code="RV-003"
      stage="REVIEW"
      description="이전 블록의 조건을 불러와 충족 여부를 검사합니다."
      icon={
        <Braces size={18} />
      }
      category="CORE"
      tagCounts={{
        required: 2,
        optional: 1,
      }}
      required={slot.required}
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            조건 연결 검증은 Workflow 검증에서 수행
          </span>

          <Button
            size="sm"
            onClick={() => save({})}
          >
            검사
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <ToggleSwitch
          checked={enabled}
          onChange={(value) =>
            save({
              enabled: value,
            })
          }
          label="조건 검사 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  조건 목록{' '}
                  <span className="text-rose-500">
                    *
                  </span>
                </p>

                <span className="text-[11px] text-slate-400">
                  이전 블록에서 불러옴
                </span>
              </div>

              <div className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-5 text-center">
                <p className="text-sm font-bold text-slate-500">
                  연결된 조건 표시 영역
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  조건 소스 연결 기능이 붙으면
                  통과·미흡·대기 상태가 여기에 표시됩니다.
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                적용 방식{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <ConnectedSegmentedControl
                options={
                  conditionApplyOptions
                }
                value={
                  applyMode
                }
                onChange={(value) =>
                  save({
                    applyMode:
                      value,
                  })
                }
              />
            </div>

            <ToggleSwitch
              checked={
                partialAllowed
              }
              onChange={(value) =>
                save({
                  partialAllowed:
                    value,
                })
              }
              label="부분 충족 허용"
              description="일부만 만족해도 통과 처리"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />
          </>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * RV-004 정책 충돌 확인하기
 * ============================================================
 */

const comparisonTargets = [
  {
    label: '기능 - 정책',
    value: '기능 - 정책',
    description:
      '기능 요구와 정책을 비교',
  },
  {
    label: '정책 간',
    value: '정책 간',
    description:
      '서로 다른 정책 비교',
  },
  {
    label: '화면 - 정책',
    value: '화면 - 정책',
    description:
      '화면 동작과 정책 비교',
  },
  {
    label: '권한 - 액션',
    value: '권한 - 액션',
    description:
      '권한과 실행 가능 동작 비교',
  },
]

const conflictTypes = [
  '권한',
  '상태',
  '예외',
  '저장',
  '공개',
]

export function PolicyConflictInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const comparisonTarget =
    getString(
      slot.config,
      'comparisonTarget',
      '기능 - 정책',
    )

  const policyDocument =
    getString(
      slot.config,
      'policyDocument',
    )

  const selectedConflictTypes =
    getStringArray(
      slot.config,
      'conflictTypes',
      [
        '권한',
        '상태',
      ],
    )

  const includeSolution =
    getBoolean(
      slot.config,
      'includeSolution',
      true,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled === 'boolean'
        ? patch.enabled
        : enabled

    const nextTarget =
      typeof patch.comparisonTarget === 'string'
        ? patch.comparisonTarget
        : comparisonTarget

    const nextDocument =
      typeof patch.policyDocument === 'string'
        ? patch.policyDocument
        : policyDocument

    const complete =
      Boolean(nextTarget) &&
      Boolean(nextDocument)

    onConfigChange(
      {
        enabled,
        comparisonTarget,
        policyDocument,
        conflictTypes:
          selectedConflictTypes,
        includeSolution,
        ...patch,
      },
      {
        summaryValue:
          nextDocument
            ? `${nextTarget} · ${nextDocument}`
            : nextTarget,

        state:
          resolveEnabledState(
            nextEnabled,
            slot.required,
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="정책 충돌 확인하기"
      code="RV-004"
      stage="REVIEW"
      description="기능과 정책, 정책 간 충돌을 점검합니다."
      icon={
        <ShieldCheck size={18} />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        optional: 2,
        missing:
          Number(
            !policyDocument,
          ),
      }}
      required={slot.required}
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {policyDocument
              ? '정책 충돌 설정 완료'
              : '정책 문서 미선택'}
          </span>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => save({})}
          >
            검증
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <ToggleSwitch
          checked={enabled}
          onChange={(value) =>
            save({
              enabled: value,
            })
          }
          label="정책 충돌 검사 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                비교 대상{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <Radio
                name={`policy-target-${slot.id}`}
                options={
                  comparisonTargets
                }
                value={
                  comparisonTarget
                }
                onChange={(value) =>
                  save({
                    comparisonTarget:
                      value,
                  })
                }
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                정책 문서{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              {policyDocument ? (
                <div className="flex min-h-[60px] items-center rounded-xl border-2 border-indigo-500 px-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-black text-indigo-600">
                    DOC
                  </span>

                  <span className="ml-3 min-w-0 flex-1 truncate text-sm font-bold text-slate-700">
                    {
                      policyDocument
                    }
                  </span>
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-4">
                  <p className="text-sm font-bold text-slate-500">
                    정책 문서 연결 대기
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    문서 데이터 연결 후
                    여기에서 정책 문서를 선택합니다.
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  충돌 유형
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <BlockButton
                multiple
                options={conflictTypes.map(
                  (item) => ({
                    label: item,
                    value: item,
                  }),
                )}
                value={
                  selectedConflictTypes
                }
                onChange={(value) =>
                  save({
                    conflictTypes:
                      value,
                  })
                }
                className="flex-wrap"
              />
            </div>

            <ToggleSwitch
              checked={
                includeSolution
              }
              onChange={(value) =>
                save({
                  includeSolution:
                    value,
                })
              }
              label="해결안 제안 포함"
              description="기본 ON"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />
          </>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * RV-005 근거 확인하기
 * ============================================================
 */

const evidenceTargets = [
  '사실',
  '수치',
  '정책',
  '결정',
  '비교',
]

const allowedEvidenceOptions = [
  {
    label: '프로젝트 문서',
    value: '프로젝트 문서',
  },
  {
    label: '업로드 문서',
    value: '업로드 문서',
  },
  {
    label: '사용자 입력',
    value: '사용자 입력',
  },
]

const noEvidenceOptions = [
  {
    label: '삭제',
    value: '삭제',
    description:
      '근거가 없는 경우 삭제 처리',
  },
  {
    label: '추정으로 표시',
    value: '추정으로 표시',
    description:
      '추정임을 명시하고 유지',
  },
  {
    label: '경고',
    value: '경고',
    description:
      '근거가 없는 경우 경고 처리',
  },
]

export function EvidenceCheckInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const requiredTargets =
    getStringArray(
      slot.config,
      'requiredTargets',
      [
        '사실',
        '수치',
      ],
    )

  const allowedEvidence =
    getStringArray(
      slot.config,
      'allowedEvidence',
      [
        '프로젝트 문서',
      ],
    )

  const noEvidenceHandling =
    getString(
      slot.config,
      'noEvidenceHandling',
      '추정으로 표시',
    )

  const showDocLocation =
    getBoolean(
      slot.config,
      'showDocLocation',
      false,
    )

  const distinguishInference =
    getBoolean(
      slot.config,
      'distinguishInference',
      false,
    )

  const showSourceConflict =
    getBoolean(
      slot.config,
      'showSourceConflict',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled === 'boolean'
        ? patch.enabled
        : enabled

    const nextTargets =
      Array.isArray(
        patch.requiredTargets,
      )
        ? patch.requiredTargets.filter(
            (
              item,
            ): item is string =>
              typeof item === 'string',
          )
        : requiredTargets

    const nextEvidence =
      Array.isArray(
        patch.allowedEvidence,
      )
        ? patch.allowedEvidence.filter(
            (
              item,
            ): item is string =>
              typeof item === 'string',
          )
        : allowedEvidence

    const nextHandling =
      typeof patch.noEvidenceHandling === 'string'
        ? patch.noEvidenceHandling
        : noEvidenceHandling

    const complete =
      nextTargets.length > 0 &&
      nextEvidence.length > 0 &&
      Boolean(nextHandling)

    onConfigChange(
      {
        enabled,
        requiredTargets,
        allowedEvidence,
        noEvidenceHandling,
        showDocLocation,
        distinguishInference,
        showSourceConflict,
        ...patch,
      },
      {
        summaryValue:
          `${nextTargets.length}개 대상 · ${nextHandling}`,

        state:
          resolveEnabledState(
            nextEnabled,
            slot.required,
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="근거 확인하기"
      code="RV-005"
      stage="REVIEW"
      description="주장·수치에 근거가 있는지 검사합니다."
      icon={
        <BookOpenCheck size={18} />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 3,
        optional: 3,
      }}
      required={slot.required}
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            기본값으로 적용 가능
          </span>

          <Button
            size="sm"
            onClick={() => save({})}
          >
            적용
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <ToggleSwitch
          checked={enabled}
          onChange={(value) =>
            save({
              enabled: value,
            })
          }
          label="근거 확인 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                근거 필수 대상{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <BlockButton
                multiple
                options={evidenceTargets.map(
                  (item) => ({
                    label: item,
                    value: item,
                  }),
                )}
                value={
                  requiredTargets
                }
                onChange={(value) =>
                  save({
                    requiredTargets:
                      value,
                  })
                }
                className="flex-wrap"
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                허용 근거{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <Checkbox
                options={
                  allowedEvidenceOptions
                }
                value={
                  allowedEvidence
                }
                onChange={(value) =>
                  save({
                    allowedEvidence:
                      value,
                  })
                }
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                근거 없음 처리{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <Radio
                name={`review-no-evidence-${slot.id}`}
                options={
                  noEvidenceOptions
                }
                value={
                  noEvidenceHandling
                }
                onChange={(value) =>
                  save({
                    noEvidenceHandling:
                      value,
                  })
                }
              />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  위치·추론·충돌
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <div className="space-y-4">
                <ToggleSwitch
                  checked={
                    showDocLocation
                  }
                  onChange={(value) =>
                    save({
                      showDocLocation:
                        value,
                    })
                  }
                  label="문서 위치 표시"
                  size="sm"
                  className="flex w-full flex-row-reverse justify-between"
                />

                <ToggleSwitch
                  checked={
                    distinguishInference
                  }
                  onChange={(value) =>
                    save({
                      distinguishInference:
                        value,
                    })
                  }
                  label="추론 구분"
                  size="sm"
                  className="flex w-full flex-row-reverse justify-between"
                />

                <ToggleSwitch
                  checked={
                    showSourceConflict
                  }
                  onChange={(value) =>
                    save({
                      showSourceConflict:
                        value,
                    })
                  }
                  label="출처 충돌 표시"
                  size="sm"
                  className="flex w-full flex-row-reverse justify-between"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * RV-006 중복 제거하기
 * ============================================================
 */

const judgmentUnits = [
  '문장',
  '항목',
  '의미',
  '기능',
]

function getRemovalIntensityLabel(
  value: number,
) {
  if (value <= 0.3) {
    return '보수적'
  }

  if (value >= 0.7) {
    return '적극적'
  }

  return '균형'
}

export function DuplicateRemovalInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const judgmentUnit =
    getString(
      slot.config,
      'judgmentUnit',
      '의미',
    )

  const removalIntensity =
    getNumber(
      slot.config,
      'removalIntensity',
      0.5,
    )

  const mergeSimilar =
    getBoolean(
      slot.config,
      'mergeSimilar',
      true,
    )

  const provideComparison =
    getBoolean(
      slot.config,
      'provideComparison',
      false,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled === 'boolean'
        ? patch.enabled
        : enabled

    const nextUnit =
      typeof patch.judgmentUnit === 'string'
        ? patch.judgmentUnit
        : judgmentUnit

    const nextIntensity =
      typeof patch.removalIntensity === 'number'
        ? patch.removalIntensity
        : removalIntensity

    onConfigChange(
      {
        enabled,
        judgmentUnit,
        removalIntensity,
        mergeSimilar,
        provideComparison,
        ...patch,
      },
      {
        summaryValue:
          `${nextUnit} · ${getRemovalIntensityLabel(
            nextIntensity,
          )}`,

        state:
          resolveEnabledState(
            nextEnabled,
            slot.required,
            Boolean(nextUnit),
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="중복 제거하기"
      code="RV-006"
      stage="REVIEW"
      description="반복되는 내용을 정리합니다."
      icon={
        <CopyCheck size={18} />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        optional: 2,
      }}
      required={slot.required}
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            기본값으로 적용 가능
          </span>

          <Button
            size="sm"
            onClick={() => save({})}
          >
            적용
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <ToggleSwitch
          checked={enabled}
          onChange={(value) =>
            save({
              enabled: value,
            })
          }
          label="중복 제거 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                판단 단위{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <BlockButton
                options={judgmentUnits.map(
                  (item) => ({
                    label: item,
                    value: item,
                  }),
                )}
                value={
                  judgmentUnit
                }
                onChange={(value) =>
                  save({
                    judgmentUnit:
                      value,
                  })
                }
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                제거 강도{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <input
                type="range"
                min={0}
                max={1}
                step={0.5}
                value={
                  removalIntensity
                }
                onChange={(event) =>
                  save({
                    removalIntensity:
                      Number(
                        event.target.value,
                      ),
                  })
                }
                className="w-full cursor-pointer accent-indigo-500"
              />

              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>
                  보수적
                </span>

                <span className="font-bold text-indigo-500">
                  {removalIntensity.toFixed(
                    1,
                  )}{' '}
                  ·{' '}
                  {getRemovalIntensityLabel(
                    removalIntensity,
                  )}
                </span>

                <span>
                  적극적
                </span>
              </div>
            </div>

            <ToggleSwitch
              checked={
                mergeSimilar
              }
              onChange={(value) =>
                save({
                  mergeSimilar:
                    value,
                })
              }
              label="유사 내용 통합"
              description="비슷한 내용은 하나로 합침 · 기본 ON"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                provideComparison
              }
              onChange={(value) =>
                save({
                  provideComparison:
                    value,
                })
              }
              label="삭제 내역"
              description="변경 전후 비교 제공"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />
          </>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * RV-007 톤 조정하기
 * ============================================================
 */

const toneOptions = [
  {
    label: '객관',
    value: '객관',
    icon: <span className="font-black">일</span>,
  },
  {
    label: '전문',
    value: '전문',
    icon: <span className="font-black">전</span>,
  },
  {
    label: '쉬운',
    value: '쉬운',
    icon: <span className="font-black">기</span>,
  },
  {
    label: '친근',
    value: '친근',
    icon: <span className="font-black">일</span>,
  },
  {
    label: '설득',
    value: '설득',
    icon: <span className="font-black">학</span>,
  },
  {
    label: '발표',
    value: '발표',
    icon: <span className="font-black">리</span>,
  },
]

const endingStyles = [
  '합니다',
  '해요',
  '명사형',
  '유지',
]

const jargonOptions = [
  {
    label: '최소',
    value: '최소',
  },
  {
    label: '보통',
    value: '보통',
  },
  {
    label: '전문',
    value: '전문',
  },
]

const sentenceLengthOptions = [
  {
    label: '짧게',
    value: '짧게',
  },
  {
    label: '보통',
    value: '보통',
  },
  {
    label: '길게',
    value: '길게',
  },
]

function getMeaningLabel(
  value: number,
) {
  if (value <= 0.2) {
    return '엄격'
  }

  if (value <= 0.7) {
    return '엄격에 가깝게'
  }

  if (value < 0.9) {
    return '균형'
  }

  return '자연스럽게'
}

export function ToneAdjustmentInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const targetTone =
    getString(
      slot.config,
      'targetTone',
      '객관',
    )

  const endingStyle =
    getString(
      slot.config,
      'endingStyle',
      '합니다',
    )

  const jargonLevel =
    getString(
      slot.config,
      'jargonLevel',
      '보통',
    )

  const sentenceLength =
    getString(
      slot.config,
      'sentenceLength',
      '보통',
    )

  const meaningPreservation =
    getNumber(
      slot.config,
      'meaningPreservation',
      0.5,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled === 'boolean'
        ? patch.enabled
        : enabled

    const nextTone =
      typeof patch.targetTone === 'string'
        ? patch.targetTone
        : targetTone

    const nextEnding =
      typeof patch.endingStyle === 'string'
        ? patch.endingStyle
        : endingStyle

    onConfigChange(
      {
        enabled,
        targetTone,
        endingStyle,
        jargonLevel,
        sentenceLength,
        meaningPreservation,
        ...patch,
      },
      {
        summaryValue:
          `${nextTone} · ${nextEnding}`,

        state:
          resolveEnabledState(
            nextEnabled,
            slot.required,
            Boolean(nextTone),
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="톤 조정하기"
      code="RV-007"
      stage="REVIEW"
      description="결과물의 어조를 목표 톤에 맞게 다듬습니다."
      icon={
        <SlidersHorizontal size={18} />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        optional: 3,
      }}
      required={slot.required}
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {targetTone} · {endingStyle}
          </span>

          <Button
            size="sm"
            onClick={() => save({})}
          >
            적용
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <ToggleSwitch
          checked={enabled}
          onChange={(value) =>
            save({
              enabled: value,
            })
          }
          label="톤 조정 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                목표 톤{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <BlockCard
                columns={3}
                options={
                  toneOptions
                }
                value={
                  targetTone
                }
                onChange={(value) =>
                  save({
                    targetTone:
                      value,
                  })
                }
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  종결 방식
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <BlockButton
                options={endingStyles.map(
                  (item) => ({
                    label: item,
                    value: item,
                  }),
                )}
                value={
                  endingStyle
                }
                onChange={(value) =>
                  save({
                    endingStyle:
                      value,
                  })
                }
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  전문 용어
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <ConnectedSegmentedControl
                options={
                  jargonOptions
                }
                value={
                  jargonLevel
                }
                onChange={(value) =>
                  save({
                    jargonLevel:
                      value,
                  })
                }
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  문장 길이
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <ConnectedSegmentedControl
                options={
                  sentenceLengthOptions
                }
                value={
                  sentenceLength
                }
                onChange={(value) =>
                  save({
                    sentenceLength:
                      value,
                  })
                }
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                의미 유지{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <input
                type="range"
                min={0}
                max={1}
                step={0.5}
                value={
                  meaningPreservation
                }
                onChange={(event) =>
                  save({
                    meaningPreservation:
                      Number(
                        event.target.value,
                      ),
                  })
                }
                className="w-full cursor-pointer accent-indigo-500"
              />

              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>
                  엄격
                </span>

                <span className="font-bold text-indigo-500">
                  {meaningPreservation.toFixed(
                    1,
                  )}{' '}
                  ·{' '}
                  {getMeaningLabel(
                    meaningPreservation,
                  )}
                </span>

                <span>
                  자연스럽게
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * RV-009 오류 위치 표시하기
 * ============================================================
 *
 * 독립 RV 파일은 없고 기존 통합 Review.tsx에는
 * "블록 단위 · 강조 ON"으로 정의되어 있습니다.
 *
 * 확인되지 않은 추가 설정을 만들지 않고
 * 실제 확인되는 두 설정만 Studio config로 연결합니다.
 * ============================================================
 */

export function ErrorLocationInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const displayUnit =
    getString(
      slot.config,
      'displayUnit',
      'block',
    )

  const highlight =
    getBoolean(
      slot.config,
      'highlight',
      true,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled === 'boolean'
        ? patch.enabled
        : enabled

    const nextUnit =
      typeof patch.displayUnit === 'string'
        ? patch.displayUnit
        : displayUnit

    const nextHighlight =
      typeof patch.highlight === 'boolean'
        ? patch.highlight
        : highlight

    onConfigChange(
      {
        enabled,
        displayUnit,
        highlight,
        ...patch,
      },
      {
        summaryValue:
          `블록 단위 · 강조 ${
            nextHighlight
              ? 'ON'
              : 'OFF'
          }`,

        state:
          resolveEnabledState(
            nextEnabled,
            slot.required,
            Boolean(nextUnit),
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="오류 위치 표시하기"
      code="RV-009"
      stage="REVIEW"
      description="검토에 실패한 위치와 오류 지점을 표시합니다."
      icon={
        <MapPin size={18} />
      }
      category="CORE"
      tagCounts={{
        required: 1,
        optional: 1,
      }}
      required={slot.required}
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            블록 단위 · 강조{' '}
            {highlight
              ? 'ON'
              : 'OFF'}
          </span>

          <Button
            size="sm"
            onClick={() => save({})}
          >
            적용
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <ToggleSwitch
          checked={enabled}
          onChange={(value) =>
            save({
              enabled: value,
            })
          }
          label="오류 위치 표시 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                표시 단위{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <ConnectedSegmentedControl
                options={[
                  {
                    label: '블록 단위',
                    value: 'block',
                  },
                ]}
                value={
                  displayUnit
                }
                onChange={(value) =>
                  save({
                    displayUnit:
                      value,
                  })
                }
              />
            </div>

            <ToggleSwitch
              checked={
                highlight
              }
              onChange={(value) =>
                save({
                  highlight:
                    value,
                })
              }
              label="오류 강조"
              description="오류가 발생한 블록을 강조 표시"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />
          </>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * RV-010 수정 가이드 제공하기
 * ============================================================
 */

const guideScopes = [
  '현재 오류',
  '단계',
  '전체',
]

const guidanceMethods = [
  {
    label: '위치',
    value: '위치',
    description:
      '어디가 문제인지',
  },
  {
    label: '방법',
    value: '방법',
    description:
      '어떻게 고치는지',
  },
  {
    label: '추천값',
    value: '추천값',
    description:
      '대체 값을 제안',
  },
]

const explanationOptions = [
  {
    label: '입문',
    value: '입문',
  },
  {
    label: '기본',
    value: '기본',
  },
  {
    label: '상세',
    value: '상세',
  },
]

export function FixGuideInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const guideScope =
    getString(
      slot.config,
      'guideScope',
      '현재 오류',
    )

  const guidanceMethod =
    getString(
      slot.config,
      'guidanceMethod',
      '방법',
    )

  const autoApplySuggestion =
    getBoolean(
      slot.config,
      'autoApplySuggestion',
      false,
    )

  const explanationLevel =
    getString(
      slot.config,
      'explanationLevel',
      '기본',
    )

  const autoRecheck =
    getBoolean(
      slot.config,
      'autoRecheck',
      true,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled === 'boolean'
        ? patch.enabled
        : enabled

    const nextScope =
      typeof patch.guideScope === 'string'
        ? patch.guideScope
        : guideScope

    const nextMethod =
      typeof patch.guidanceMethod === 'string'
        ? patch.guidanceMethod
        : guidanceMethod

    const complete =
      Boolean(nextScope) &&
      Boolean(nextMethod)

    onConfigChange(
      {
        enabled,
        guideScope,
        guidanceMethod,
        autoApplySuggestion,
        explanationLevel,
        autoRecheck,
        ...patch,
      },
      {
        summaryValue:
          `${nextScope} · ${nextMethod}`,

        state:
          resolveEnabledState(
            nextEnabled,
            slot.required,
            complete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="수정 가이드 제공하기"
      code="RV-010"
      stage="REVIEW"
      description="검토 실패 시 어디를 어떻게 고칠지 안내합니다."
      icon={
        <Wrench size={18} />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        optional: 3,
      }}
      required={slot.required}
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {guideScope} · {guidanceMethod}
          </span>

          <Button
            size="sm"
            onClick={() => save({})}
          >
            적용
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <ToggleSwitch
          checked={enabled}
          onChange={(value) =>
            save({
              enabled: value,
            })
          }
          label="수정 가이드 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                가이드 범위{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <BlockButton
                options={guideScopes.map(
                  (item) => ({
                    label: item,
                    value: item,
                  }),
                )}
                value={
                  guideScope
                }
                onChange={(value) =>
                  save({
                    guideScope:
                      value,
                  })
                }
              />
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                안내 방식{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <Radio
                name={`review-guide-method-${slot.id}`}
                options={
                  guidanceMethods
                }
                value={
                  guidanceMethod
                }
                onChange={(value) =>
                  save({
                    guidanceMethod:
                      value,
                  })
                }
              />
            </div>

            <ToggleSwitch
              checked={
                autoApplySuggestion
              }
              onChange={(value) =>
                save({
                  autoApplySuggestion:
                    value,
                })
              }
              label="추천값 적용"
              description="승인 후 자동 입력"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  설명 수준
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <ConnectedSegmentedControl
                options={
                  explanationOptions
                }
                value={
                  explanationLevel
                }
                onChange={(value) =>
                  save({
                    explanationLevel:
                      value,
                  })
                }
              />
            </div>

            <ToggleSwitch
              checked={
                autoRecheck
              }
              onChange={(value) =>
                save({
                  autoRecheck:
                    value,
                })
              }
              label="재검증"
              description="수정 후 자동 재검사 · 기본 ON"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />
          </>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}