import {
  Layers3,
  Link2,
  TriangleAlert,
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

