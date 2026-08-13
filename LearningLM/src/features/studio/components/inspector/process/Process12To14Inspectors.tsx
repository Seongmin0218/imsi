import {
  useState,
} from 'react'

import {
  CircleHelp,
  Plus,
  Puzzle,
  Sparkles,
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
  connectionInfo,
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

  const incomingNode =
    connectionInfo
      ?.incomingNodes[0]

  const hasIncomingConnection =
    Boolean(
      incomingNode,
    )

  const incomingNodeLabel =
    incomingNode
      ? `${incomingNode.title} 노드`
      : '연결된 이전 노드 없음'

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

    const complete =
      Boolean(
        nextPreset,
      ) &&
      Boolean(
        nextPurpose.trim(),
      ) &&
      hasIncomingConnection

    onConfigChange(
      {
        skillPreset,
        executionPurpose,
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

          <div>
            <p className="mb-3 text-xs font-bold text-slate-700">
              적용 대상{' '}
              <span className="text-rose-500">
                *
              </span>
            </p>

            <div
              className={[
                'flex min-h-[60px] items-center gap-3 rounded-xl border-2 px-4',
                hasIncomingConnection
                  ? 'border-slate-200'
                  : 'border-rose-200 bg-rose-50',
              ].join(
                ' ',
              )}
            >
              <span
                className={[
                  'h-3 w-3 rounded-full',
                  hasIncomingConnection
                    ? 'bg-indigo-500'
                    : 'bg-slate-300',
                ].join(
                  ' ',
                )}
              />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-700">
                  이전 블록 결과
                </p>

                <p className="mt-1 truncate text-[10px] text-slate-400">
                  {incomingNodeLabel}
                </p>
              </div>

              <span
                className={[
                  'rounded-lg px-3 py-2 text-[10px] font-bold',
                  hasIncomingConnection
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-100 text-slate-400',
                ].join(
                  ' ',
                )}
              >
                {hasIncomingConnection
                  ? '연결됨'
                  : '미연결'}
              </span>
            </div>
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
  connectionInfo,
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

  const referenceNode =
    connectionInfo
      ?.incomingNodes.find(
        (node) =>
          node.stage ===
          'CONTEXT',
      ) ??
    connectionInfo
      ?.incomingNodes[0]

  const referenceText =
    referenceNode
      ? `← ${referenceNode.title} 노드`
      : ''

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
          referenceNode
            ? '연결됨'
            : '미연결',
        value:
          referenceText ||
          '연결된 컨텍스트 없음',
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

