import {
  useState,
} from 'react'

import {
  BarChart3,
  BookOpen,
  Braces,
  BriefcaseBusiness,
  CheckSquare2,
  Compass,
  FilePenLine,
  GitCompareArrows,
  Hash,
  Lightbulb,
  Paperclip,
  Plus,
  Search,
  SearchCheck,
  Target,
  Users,
} from 'lucide-react'

import {
  Button,
  Select,
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
  DraggableBlock,
} from '../../../../Block/components/ui/DraggableBlock'

import {
  FileDropzone,
} from '../../../../Block/components/ui/FileDropzone'

import {
  Radio,
} from '../../../../Block/components/ui/Radio'

import {
  ConditionalSection,
} from '../../../../Block/components/layouts/ConditionalSection'

import {
  ExpandableSettingBlock,
} from '../../../../Block/components/layouts/ExpandableSettingBlock'

import {
  Typography,
} from '../../../../Block/components/ui/Typography'

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

function getStringArray(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback: string[] = [],
): string[] {
  const value =
    config?.[key]

  if (
    !Array.isArray(value)
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

function getObjectArray(
  config: StudioBlockConfig | undefined,
  key: string,
): Record<
  string,
  StudioBlockConfigValue
>[] {
  const value =
    config?.[key]

  if (
    !Array.isArray(value)
  ) {
    return []
  }

  return value.filter(
    (
      item,
    ): item is Record<
      string,
      StudioBlockConfigValue
    > =>
      typeof item ===
        'object' &&
      item !== null &&
      !Array.isArray(item),
  )
}

function resolveState(
  complete: boolean,
): StudioSlotState {
  return complete
    ? 'filled'
    : 'empty'
}

/* ============================================================
 * IN-002 목표 정하기
 * ============================================================
 */

const goalTypes = [
  {
    label: '정보 파악',
    icon: Search,
  },
  {
    label: '정리',
    icon: BarChart3,
  },
  {
    label: '비교',
    icon: GitCompareArrows,
  },
  {
    label: '아이디어',
    icon: Lightbulb,
  },
  {
    label: '작성',
    icon: FilePenLine,
  },
  {
    label: '검토',
    icon: SearchCheck,
  },
  {
    label: '의사결정',
    icon: CheckSquare2,
  },
  {
    label: '직접 입력',
    icon: Plus,
  },
]

const priorities = [
  '정확성',
  '속도',
  '간결성',
  '완성도',
]

export function GoalSettingInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const goalType =
    getString(
      slot.config,
      'goalType',
      '직접 입력',
    )

  const description =
    getString(
      slot.config,
      'description',
    )

  const completionRule =
    getString(
      slot.config,
      'completionRule',
    )

  const priority =
    getString(
      slot.config,
      'priority',
      '정확성',
    )

  const isCustomGoal =
    goalType ===
    '직접 입력'

  const complete =
    Boolean(
      goalType &&
        (
          !isCustomGoal ||
          description.trim()
        ),
    )

  const save = (
    patch: StudioBlockConfig,
    summary?: string,
  ) => {
    const nextGoalType =
      typeof patch.goalType ===
      'string'
        ? patch.goalType
        : goalType

    const nextDescription =
      typeof patch.description ===
      'string'
        ? patch.description
        : description

    const nextIsCustomGoal =
      nextGoalType ===
      '직접 입력'

    const nextComplete =
      Boolean(
        nextGoalType &&
          (
            !nextIsCustomGoal ||
            nextDescription.trim()
          ),
      )

    const nextSummary =
      summary ??
      (
        nextIsCustomGoal &&
        nextDescription.trim()
          ? nextDescription.trim()
          : nextGoalType
      )

    onConfigChange(
      {
        goalType,
        description,
        completionRule,
        priority,
        ...patch,
      },
      {
        summaryValue:
          nextComplete
            ? nextSummary
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
      title="목표 정하기"
      code="IN-002"
      stage="INPUT"
      description="이번 작업의 목표 유형을 정하고 완료 기준을 지정합니다."
      icon={
        <Target
          size={18}
        />
      }
      tagCounts={{
        required: 1,
        optional: 2,
        conditional:
          Number(
            isCustomGoal,
          ),
        missing:
          Number(
            isCustomGoal &&
              !description.trim(),
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
            {complete
              ? '목표 설정 완료'
              : '목표 설명 입력 대기'}
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
          <Typography
            variant="body2-long"
            weight="bold"
            className="mb-2 text-slate-700"
          >
            작업 목표{' '}
            <span className="text-rose-500">
              *
            </span>
          </Typography>

          <BlockCard
            columns={4}
            options={goalTypes.map(
              ({
                label,
                icon: Icon,
              }) => ({
                label,
                value:
                  label,
                icon: (
                  <Icon
                    size={
                      17
                    }
                  />
                ),
              }),
            )}
            value={
              goalType
            }
            onChange={(
              value,
            ) =>
              save(
                {
                  goalType:
                    value,
                },
                value,
              )
            }
          />
        </div>

        <ConditionalSection
          title="목표 설정"
          selectedLabel="직접 입력"
          visible={
            isCustomGoal
          }
        >
          <Textarea
            value={
              description
            }
            onChange={(
              value,
            ) =>
              save(
                {
                  description:
                    value,
                },
                value.trim()
                  ? value
                  : goalType,
              )
            }
            placeholder="목표를 한 줄로 설명하세요"
            rows={2}
          />
        </ConditionalSection>

        <label className="block">
          <Typography
            as="span"
            variant="body2-long"
            weight="bold"
            className="mb-[25px] flex items-center justify-between text-slate-700"
          >
            <span>
              완료 기준
            </span>

            <span className="text-[11px] font-normal text-emerald-500">
              선택
            </span>
          </Typography>

          <Textarea
            value={
              completionRule
            }
            onChange={(
              value,
            ) =>
              save({
                completionRule:
                  value,
              })
            }
            placeholder="예: 비교표가 완성되면 종료"
            rows={2}
          />
        </label>

        <div>
          <Typography
            variant="body2-long"
            weight="bold"
            className="mb-4 flex items-center justify-between text-slate-700"
          >
            <span>
              우선 기준
            </span>

            <span className="text-[11px] font-normal text-emerald-500">
              선택
            </span>
          </Typography>

          <BlockButton
            options={priorities.map(
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
              priority
            }
            onChange={(
              value,
            ) =>
              save({
                priority:
                  value,
              })
            }
            variant="bare"
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/* ============================================================
 * IN-003 주제 입력하기
 * ============================================================
 */

const topicScopeOptions = [
  {
    label: '좁게',
    value: 'narrow',
  },
  {
    label: '보통',
    value: 'normal',
  },
  {
    label: '넓게',
    value: 'wide',
  },
]

export function TopicInputInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const [
    keywordInput,
    setKeywordInput,
  ] =
    useState('')

  const [
    hasEdited,
    setHasEdited,
  ] =
    useState(false)

  const topic =
    getString(
      slot.config,
      'topic',
    )

  const keywords =
    getStringArray(
      slot.config,
      'keywords',
    )

  const scope =
    getString(
      slot.config,
      'scope',
      'normal',
    )

  const extraScope =
    getString(
      slot.config,
      'extraScope',
    )

  const save = (
    patch: StudioBlockConfig,
    nextTopic = topic,
  ) => {
    onConfigChange(
      {
        topic,
        keywords,
        scope,
        extraScope,
        ...patch,
      },
      {
        summaryValue:
          nextTopic.trim(),
        state:
          resolveState(
            Boolean(
              nextTopic.trim(),
            ),
          ),
      },
    )
  }

  const addKeyword =
    () => {
      const value =
        keywordInput.trim()

      if (!value) {
        return
      }

      if (
        !keywords.includes(
          value,
        )
      ) {
        save({
          keywords: [
            ...keywords,
            value,
          ],
        })
      }

      setKeywordInput('')
    }

  const showError =
    hasEdited &&
    !topic.trim()

  return (
    <ExpandableSettingBlock
      title="주제 입력하기"
      code="IN-003"
      stage="INPUT"
      description="대표 주제와 키워드를 입력해 작업 범위를 정합니다."
      icon={
        <Hash
          size={19}
        />
      }
      tagCounts={{
        required: 1,
        optional: 3,
        sortable: 1,
        missing:
          Number(
            !topic.trim(),
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
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            {topic.trim()
              ? '주제가 입력되었습니다.'
              : '주제 미입력'}
          </span>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setHasEdited(
                true,
              )

              save({})
            }}
          >
            검증
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <label className="block">
          <span className="mb-[25px] block text-xs font-bold text-slate-700">
            주제{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <Textarea
            value={
              topic
            }
            onChange={(
              value,
            ) => {
              setHasEdited(
                true,
              )

              save(
                {
                  topic:
                    value,
                },
                value,
              )
            }}
            placeholder="대표 주제를 입력하세요"
            error={
              showError
            }
            rows={2}
          />

          {showError && (
            <span className="mt-1.5 block text-xs font-semibold text-rose-500">
              ⚠ 필수 항목입니다
            </span>
          )}
        </label>

        <div>
          <div className="mb-[13px] flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              키워드
            </span>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <Textarea
            value={
              keywordInput
            }
            onChange={
              setKeywordInput
            }
            onKeyDown={(
              event,
            ) => {
              if (
                event.key ===
                'Enter'
              ) {
                event.preventDefault()
                addKeyword()
              }
            }}
            placeholder="Enter로 칩 생성"
            rows={2}
          />

          {keywords.length >
            0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {keywords.map(
                (
                  keyword,
                ) => (
                  <button
                    key={
                      keyword
                    }
                    type="button"
                    onClick={() =>
                      save({
                        keywords:
                          keywords.filter(
                            (
                              item,
                            ) =>
                              item !==
                              keyword,
                          ),
                      })
                    }
                    className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600"
                  >
                    {
                      keyword
                    }{' '}
                    ×
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              주제 범위
            </span>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <ConnectedSegmentedControl
            options={
              topicScopeOptions
            }
            value={
              scope
            }
            onChange={(
              value,
            ) =>
              save({
                scope:
                  value,
              })
            }
          />
        </div>

        <label className="block">
          <span className="mb-[13px] flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              포함·제외 범위
            </span>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </span>

          <Textarea
            value={
              extraScope
            }
            onChange={(
              value,
            ) =>
              save({
                extraScope:
                  value,
              })
            }
            placeholder="추가 설정 — 포함·제외 범위 입력"
            rows={2}
          />
        </label>
      </div>
    </ExpandableSettingBlock>
  )
}

/* ============================================================
 * IN-004 파일 업로드 받기
 * ============================================================
 */

type StudioUploadedFile = {
  id: string
  name: string
  size: number
  role: string
  validationError:
    | string
    | null
}

const fileRoleOptions = [
  {
    label: '분석 대상',
    value: 'analysis',
  },
  {
    label: '참고',
    value: 'reference',
  },
  {
    label: '제외',
    value: 'exclude',
  },
]

const fileMissingOptions = [
  {
    value: 'stop',
    label: '실행 중지',
    description:
      '파일이 없으면 실행하지 않음',
  },
  {
    value: 'warn',
    label: '경고 후 진행',
    description:
      '경고만 표시하고 계속',
  },
]

const allowedExtensions =
  new Set([
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
  ])

const maxFileSize =
  20 *
  1024 *
  1024

function getFileValidationError(
  file: File,
) {
  const extension =
    file.name
      .split('.')
      .pop()
      ?.toLowerCase() ??
    ''

  const supported =
    file.type.startsWith(
      'image/',
    ) ||
    allowedExtensions.has(
      extension,
    )

  if (!supported) {
    return '지원하지 않는 형식입니다.'
  }

  if (
    file.size >
    maxFileSize
  ) {
    return '20MB 용량을 초과했습니다.'
  }

  return null
}

function formatFileSize(
  bytes: number,
) {
  if (
    bytes <
    1024 * 1024
  ) {
    return `${Math.max(
      1,
      Math.round(
        bytes /
          1024,
      ),
    )}KB`
  }

  return `${(
    bytes /
    1024 /
    1024
  ).toFixed(1)}MB`
}

function getFileTypeStyle(
  fileName: string,
  hasError: boolean,
) {
  if (hasError) {
    return 'border-slate-500 bg-slate-100 text-slate-600'
  }

  const extension =
    fileName
      .split('.')
      .pop()
      ?.toLowerCase()

  if (
    extension ===
    'pdf'
  ) {
    return 'border-rose-400 bg-rose-200 text-white'
  }

  if (
    extension ===
      'xls' ||
    extension ===
      'xlsx'
  ) {
    return 'border-emerald-500 bg-emerald-50 text-emerald-600'
  }

  if (
    extension ===
      'doc' ||
    extension ===
      'docx'
  ) {
    return 'border-blue-500 bg-blue-50 text-blue-600'
  }

  return 'border-slate-200 bg-slate-100 text-slate-500'
}

function readFiles(
  config: StudioBlockConfig | undefined,
): StudioUploadedFile[] {
  return getObjectArray(
    config,
    'files',
  )
    .map(
      (
        value,
      ) => ({
        id:
          typeof value.id ===
          'string'
            ? value.id
            : '',

        name:
          typeof value.name ===
          'string'
            ? value.name
            : '',

        size:
          typeof value.size ===
          'number'
            ? value.size
            : 0,

        role:
          typeof value.role ===
          'string'
            ? value.role
            : 'analysis',

        validationError:
          typeof value.validationError ===
          'string'
            ? value.validationError
            : null,
      }),
    )
    .filter(
      (
        file,
      ) =>
        file.id &&
        file.name,
    )
}

export function FileUploadInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const files =
    readFiles(
      slot.config,
    )

  const missingAction =
    getString(
      slot.config,
      'missingAction',
      'stop',
    )

  const validFileCount =
    files.filter(
      (
        file,
      ) =>
        !file.validationError,
    ).length

  const errorCount =
    files.length -
    validFileCount

  const complete =
    validFileCount >
      0 &&
    Boolean(
      missingAction,
    ) &&
    errorCount === 0

  const save = (
    nextFiles:
      StudioUploadedFile[],
    nextMissingAction =
      missingAction,
  ) => {
    const nextValidCount =
      nextFiles.filter(
        (
          file,
        ) =>
          !file.validationError,
      ).length

    const nextErrorCount =
      nextFiles.length -
      nextValidCount

    onConfigChange(
      {
        files:
          nextFiles,

        missingAction:
          nextMissingAction,
      },
      {
        summaryValue:
          nextValidCount >
          0
            ? `${nextValidCount}개 파일`
            : '',

        state:
          nextErrorCount >
          0
            ? 'error'
            : resolveState(
                nextValidCount >
                  0 &&
                  Boolean(
                    nextMissingAction,
                  ),
              ),
      },
    )
  }

  const addFiles = (
    incoming:
      | FileList
      | File[],
  ) => {
    const next =
      Array.from(
        incoming,
      ).map(
        (
          file,
        ): StudioUploadedFile => ({
          id:
            globalThis.crypto
              ?.randomUUID?.() ??
            `${Date.now()}-${Math.random()}`,

          name:
            file.name,

          size:
            file.size,

          role:
            'analysis',

          validationError:
            getFileValidationError(
              file,
            ),
        }),
      )

    save([
      ...files,
      ...next,
    ])
  }

  return (
    <ExpandableSettingBlock
      title="파일 업로드 받기"
      code="IN-004"
      stage="INPUT"
      description="문서·이미지를 드래그해 업로드합니다. 카드별 역할과 우선순위를 정할 수 있습니다."
      icon={
        <Paperclip
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        optional: 1,
        sortable: 1,
        missing:
          Number(
            validFileCount ===
              0,
          ) +
          Number(
            !missingAction,
          ),
        error:
          errorCount,
      }}
      required={
        slot.required
      }
      defaultOpen
      className={
        studioInspectorClassName
      }
      footer={
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            {errorCount >
            0
              ? `오류 파일 ${errorCount}개`
              : complete
                ? '파일 설정 완료'
                : '파일 설정 대기'}
          </span>

          <Button
            size="sm"
            onClick={() =>
              save(files)
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
            파일 업로드{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <FileDropzone
            accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
            multiple
            title="파일을 여기에 놓기 또는 찾아보기"
            description="PDF · DOCX · XLSX · 이미지 · 최대 20MB"
            onFiles={
              addFiles
            }
          />
        </div>

        {files.length >
          0 && (
          <div>
            <p className="mb-2 text-xs font-bold text-slate-700">
              업로드 된 파일
              <span className="font-medium text-slate-300">
                {' '}
                · 드래그로 우선순위 변경
              </span>
            </p>

            <DraggableBlock
              items={files.map(
                (
                  file,
                ) => ({
                  id:
                    file.id,

                  error:
                    Boolean(
                      file.validationError,
                    ),

                  content: (
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={[
                          'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 text-base font-black',
                          getFileTypeStyle(
                            file.name,
                            Boolean(
                              file.validationError,
                            ),
                          ),
                        ].join(
                          ' ',
                        )}
                      >
                        {file.name
                          .split(
                            '.',
                          )
                          .pop()
                          ?.toUpperCase()
                          .slice(
                            0,
                            4,
                          )}
                      </span>

                      <span className="min-w-[80px] basis-0 flex-1">
                        <span className="block truncate text-[15px] font-bold text-slate-700">
                          {
                            file.name
                          }
                        </span>

                        <span className="mt-0.5 block text-xs text-slate-400">
                          {file.validationError ??
                            formatFileSize(
                              file.size,
                            )}
                        </span>
                      </span>

                      {!file.validationError && (
                        <Select
                          size="sm"
                          value={
                            file.role
                          }
                          options={
                            fileRoleOptions
                          }
                          onChange={(
                            role,
                          ) =>
                            save(
                              files.map(
                                (
                                  item,
                                ) =>
                                  item.id ===
                                  file.id
                                    ? {
                                        ...item,
                                        role,
                                      }
                                    : item,
                              ),
                            )
                          }
                          className="!w-[105px] shrink-0"
                        />
                      )}
                    </div>
                  ),
                }),
              )}
              onChange={(
                orderedItems,
              ) =>
                save(
                  orderedItems
                    .map(
                      (
                        item,
                      ) =>
                        files.find(
                          (
                            file,
                          ) =>
                            file.id ===
                            item.id,
                        ),
                    )
                    .filter(
                      (
                        file,
                      ): file is StudioUploadedFile =>
                        Boolean(
                          file,
                        ),
                    ),
                )
              }
            />
          </div>
        )}

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            누락 시 처리{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`file-missing-${slot.id}`}
            options={
              fileMissingOptions
            }
            value={
              missingAction
            }
            onChange={(
              value,
            ) =>
              save(
                files,
                value,
              )
            }
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/* ============================================================
 * IN-005 필요한 문서 확인하기
 * ============================================================
 */

const documentSources = [
  {
    label: '프로젝트 문서',
    value: 'project',
    description:
      '연결된 프로젝트에서 사용',
  },
  {
    label: '업로드 문서',
    value: 'upload',
    description:
      '연결된 문서에서 사용',
  },
  {
    label: '직접 입력',
    value: 'direct',
    description:
      '사용자가 입력한 텍스트로 사용',
  },
  {
    label: '이전 결과',
    value: 'previous',
    description:
      '이전 블록 결과 사용',
  },
]

const documentMissingOptions =
  [
    {
      label: '차단',
      value: 'block',
      description:
        '실행하지 않음',
    },
    {
      label: '경고',
      value: 'warning',
      description:
        '경고 후 진행',
    },
    {
      label: '직접 입력 대체',
      value: 'replace',
      description:
        '입력창으로 대체',
    },
  ]

export function RequiredDocumentInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const sources =
    getStringArray(
      slot.config,
      'sources',
      [
        'project',
      ],
    )

  const required =
    getBoolean(
      slot.config,
      'required',
      true,
    )

  const checkTiming =
    getString(
      slot.config,
      'checkTiming',
      'now',
    )

  const missingAction =
    getString(
      slot.config,
      'missingAction',
    )

  const complete =
    sources.length >
      0 &&
    Boolean(
      checkTiming,
    ) &&
    Boolean(
      missingAction,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextSources =
      'sources' in
      patch
        ? (
            patch.sources as string[]
          )
        : sources

    const nextTiming =
      typeof patch.checkTiming ===
      'string'
        ? patch.checkTiming
        : checkTiming

    const nextMissing =
      typeof patch.missingAction ===
      'string'
        ? patch.missingAction
        : missingAction

    onConfigChange(
      {
        sources,
        required,
        checkTiming,
        missingAction,
        ...patch,
      },
      {
        summaryValue:
          nextSources.length >
          0
            ? `${nextSources.length}개 자료 유형`
            : '',

        state:
          resolveState(
            nextSources.length >
              0 &&
              Boolean(
                nextTiming,
              ) &&
              Boolean(
                nextMissing,
              ),
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="필요한 문서 확인하기"
      code="IN-005"
      stage="INPUT"
      description="실행 전 필요한 자료 유형과 없을 때의 처리 방식을 정합니다."
      icon={
        <BookOpen
          size={18}
        />
      }
      tagCounts={{
        required: 3,
        optional: 1,
        missing:
          Number(
            sources.length ===
              0,
          ) +
          Number(
            !checkTiming,
          ) +
          Number(
            !missingAction,
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
            {complete
              ? '필수 옵션 입력 완료'
              : '필수 옵션 미입력'}
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
            자료 유형{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Checkbox
            options={
              documentSources
            }
            value={
              sources
            }
            onChange={(
              value,
            ) =>
              save({
                sources:
                  value,
              })
            }
            selectionMode="single"
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            자료가 있어야 실행{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <ToggleSwitch
            checked={
              required
            }
            onChange={(
              value,
            ) =>
              save({
                required:
                  value,
              })
            }
            label="필수 자료가 있을 때만 블록 실행"
            description="기본 ON"
            descriptionClassName="!text-indigo-500"
            size="sm"
            className="flex w-full flex-row-reverse justify-between"
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            선택 시점
          </p>

          <ConnectedSegmentedControl
            options={[
              {
                label: '지금',
                value: 'now',
              },
              {
                label: '실행 전',
                value: 'before',
              },
            ]}
            value={
              checkTiming
            }
            onChange={(
              value,
            ) =>
              save({
                checkTiming:
                  value,
              })
            }
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            자료 없음 처리{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`document-missing-${slot.id}`}
            options={
              documentMissingOptions
            }
            value={
              missingAction
            }
            onChange={(
              value,
            ) =>
              save({
                missingAction:
                  value,
              })
            }
          />

          {!missingAction && (
            <p className="mt-2 text-xs font-semibold text-rose-500">
              ⚠ 처리 방식을 선택하세요
            </p>
          )}
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/* ============================================================
 * IN-006 필요한 스킬 확인하기
 * ============================================================
 */

const skillTypes = [
  '추출',
  '요약',
  '분류',
  '비교',
  '작성',
  '표',
  '질문',
  '검토',
]

const skillDescriptions:
  Record<
    string,
    string
  > = {
    추출:
      '필요한 정보만 골라내기',
    요약:
      '핵심을 짧게 정리',
    분류:
      '기준에 따라 항목 나누기',
    비교:
      '항목 간 차이 분석',
    작성:
      '목적에 맞는 결과 작성',
    표:
      '내용을 표 형태로 구성',
    질문:
      '확인할 질문 만들기',
    검토:
      '내용의 오류와 품질 확인',
  }

export function RequiredSkillInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const selectedSkills =
    getStringArray(
      slot.config,
      'selectedSkills',
      [
        '요약',
      ],
    )

  const mainSkill =
    getString(
      slot.config,
      'mainSkill',
      '요약',
    )

  const showRecommendation =
    getBoolean(
      slot.config,
      'showRecommendation',
      true,
    )

  const orderedSkills =
    mainSkill
      ? [
          mainSkill,
          ...selectedSkills.filter(
            (
              skill,
            ) =>
              skill !==
              mainSkill,
          ),
        ]
      : selectedSkills

  const save = (
    patch: StudioBlockConfig,
    nextSkills =
      selectedSkills,
    nextMainSkill =
      mainSkill,
  ) => {
    onConfigChange(
      {
        selectedSkills,
        mainSkill,
        showRecommendation,
        ...patch,
      },
      {
        summaryValue:
          nextMainSkill
            ? `대표 ${nextMainSkill}`
            : '',

        state:
          resolveState(
            nextSkills.length >
              0 &&
              Boolean(
                nextMainSkill,
              ),
          ),
      },
    )
  }

  const handleSkillsChange = (
    nextSkills: string[],
  ) => {
    const nextMain =
      nextSkills.includes(
        mainSkill,
      )
        ? mainSkill
        : nextSkills[0] ??
          ''

    save(
      {
        selectedSkills:
          nextSkills,
        mainSkill:
          nextMain,
      },
      nextSkills,
      nextMain,
    )
  }

  return (
    <ExpandableSettingBlock
      title="필요한 스킬 확인하기"
      code="IN-006"
      stage="INPUT"
      description="작업 유형을 복수로 고른 뒤 대표 스킬 1개를 지정합니다."
      icon={
        <BriefcaseBusiness
          size={18}
        />
      }
      tagCounts={{
        required: 2,
        optional: 1,
        sortable: 1,
        recommended:
          Number(
            showRecommendation,
          ),
        missing:
          Number(
            selectedSkills.length ===
              0,
          ) +
          Number(
            !mainSkill,
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
            {mainSkill
              ? `대표 스킬 ${mainSkill} · 순서 ${orderedSkills.length}단계`
              : '대표 스킬을 선택하세요'}
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
          <div className="mb-2 flex items-baseline gap-2">
            <p className="text-xs font-bold text-slate-700">
              작업 유형{' '}
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
            options={skillTypes.map(
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
              selectedSkills
            }
            onChange={
              handleSkillsChange
            }
            variant="bare"
            className="flex-wrap"
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            주요 스킬{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          {selectedSkills.length >
          0 ? (
            <Radio
              name={`main-skill-${slot.id}`}
              options={selectedSkills.map(
                (
                  skill,
                ) => ({
                  label:
                    skill,
                  value:
                    skill,
                  description:
                    skillDescriptions[
                      skill
                    ],
                }),
              )}
              value={
                mainSkill
              }
              onChange={(
                value,
              ) =>
                save(
                  {
                    mainSkill:
                      value,
                  },
                  selectedSkills,
                  value,
                )
              }
            />
          ) : (
            <p className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-5 text-center text-xs text-slate-400">
              작업 유형을 먼저 선택하세요.
            </p>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            스킬 순서 · 위에서 아래로 수행
          </p>

          <div className="space-y-2">
            {orderedSkills.map(
              (
                skill,
                index,
              ) => (
                <div
                  key={
                    skill
                  }
                  className="flex min-h-[76px] items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3"
                >
                  <span
                    className={[
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white',
                      index ===
                      0
                        ? 'bg-indigo-500'
                        : 'bg-cyan-600',
                    ].join(
                      ' ',
                    )}
                  >
                    {index +
                      1}
                  </span>

                  <span>
                    <b className="block text-sm text-slate-800">
                      {
                        skill
                      }
                    </b>

                    <span className="mt-1 block text-xs text-slate-400">
                      {
                        skillDescriptions[
                          skill
                        ]
                      }
                    </span>
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-700">
              추천 템플릿 표시
            </p>
          </div>

          <ToggleSwitch
            checked={
              showRecommendation
            }
            onChange={(
              value,
            ) =>
              save({
                showRecommendation:
                  value,
              })
            }
            size="sm"
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/* ============================================================
 * IN-007 대상 독자 정하기
 * ============================================================
 */

const audiences = [
  [
    '일반',
    '일',
  ],
  [
    '학생',
    '학',
  ],
  [
    '기획',
    '기',
  ],
  [
    '디자인',
    '디',
  ],
  [
    '개발',
    '개',
  ],
  [
    '관리자',
    '관',
  ],
  [
    '전문가',
    '전',
  ],
  [
    '직접 입력',
    '+',
  ],
]

export function TargetAudienceInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const audience =
    getString(
      slot.config,
      'audience',
      '일반',
    )

  const level =
    getString(
      slot.config,
      'level',
      'basic',
    )

  const styles =
    getStringArray(
      slot.config,
      'styles',
    )

  const terms =
    getString(
      slot.config,
      'terms',
      'normal',
    )

  const customAudience =
    getString(
      slot.config,
      'customAudience',
    )

  const isCustomAudience =
    audience ===
    '직접 입력'

  const complete =
    Boolean(
      audience &&
        level &&
        (
          !isCustomAudience ||
          customAudience.trim()
        ),
    )

  const save = (
    patch: StudioBlockConfig,
    summary?: string,
  ) => {
    const nextAudience =
      typeof patch.audience ===
      'string'
        ? patch.audience
        : audience

    const nextLevel =
      typeof patch.level ===
      'string'
        ? patch.level
        : level

    const nextCustomAudience =
      typeof patch.customAudience ===
      'string'
        ? patch.customAudience
        : customAudience

    const nextIsCustomAudience =
      nextAudience ===
      '직접 입력'

    const nextComplete =
      Boolean(
        nextAudience &&
          nextLevel &&
          (
            !nextIsCustomAudience ||
            nextCustomAudience.trim()
          ),
      )

    const nextSummary =
      summary ??
      (
        nextIsCustomAudience &&
        nextCustomAudience.trim()
          ? nextCustomAudience.trim()
          : nextAudience
      )

    onConfigChange(
      {
        audience,
        level,
        styles,
        terms,
        customAudience,
        ...patch,
      },
      {
        summaryValue:
          nextComplete
            ? nextSummary
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
      title="대상 독자 정하기"
      code="IN-007"
      stage="INPUT"
      description="결과물을 읽을 대상과 이해 수준을 지정합니다."
      icon={
        <Users
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        optional: 2,
        recommended: 1,
        missing:
          Number(
            !audience,
          ) +
          Number(
            !level,
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
            기본값으로 저장 가능
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
            대상 독자{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <BlockCard
            columns={4}
            options={audiences.map(
              ([
                label,
                mark,
              ]) => ({
                label,
                value:
                  label,
                icon: (
                  <span className="font-black">
                    {
                      mark
                    }
                  </span>
                ),
              }),
            )}
            value={
              audience
            }
            onChange={(
              value,
            ) =>
              save(
                {
                  audience:
                    value,
                },
                value,
              )
            }
          />
        </div>

        <ConditionalSection
          title="직접 입력"
          selectedLabel="직접 입력"
          visible={
            audience ===
            '직접 입력'
          }
        >
          <Textarea
            value={
              customAudience
            }
            onChange={(
              value,
            ) =>
              save(
                {
                  customAudience:
                    value,
                },
                value.trim()
                  ? value
                  : audience,
              )
            }
            placeholder="대상 독자를 입력하세요"
            maxLength={
              800
            }
            rows={2}
          />
        </ConditionalSection>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            이해 수준{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <ConnectedSegmentedControl
            options={[
              {
                label: '입문',
                value: 'intro',
              },
              {
                label: '기본',
                value: 'basic',
              },
              {
                label: '실무',
                value: 'work',
              },
              {
                label: '전문',
                value: 'expert',
              },
            ]}
            value={
              level
            }
            onChange={(
              value,
            ) =>
              save({
                level:
                  value,
              })
            }
          />
        </div>

        <div>
          <div className="mb-4 flex justify-between">
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-bold text-slate-700">
                설명 방식
              </p>

              <span className="text-[11px] font-medium text-indigo-500">
                복수 선택
              </span>
            </div>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <BlockButton
            multiple
            options={[
              '쉬운 설명',
              '예시',
              '단계별',
              '핵심만',
            ].map(
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
              styles
            }
            onChange={(
              value,
            ) =>
              save({
                styles:
                  value,
              })
            }
            className="flex-wrap"
          />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <p className="text-xs font-bold text-slate-700">
              전문 용어
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <ConnectedSegmentedControl
            options={[
              {
                label: '최소',
                value: 'min',
              },
              {
                label: '보통',
                value: 'normal',
              },
              {
                label: '적극',
                value: 'active',
              },
            ]}
            value={
              terms
            }
            onChange={(
              value,
            ) =>
              save({
                terms:
                  value,
              })
            }
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/* ============================================================
 * IN-008 결과 사용 상황 정하기
 * ============================================================
 */

const usages = [
  [
    '과제',
    '📚',
  ],
  [
    '회의',
    '🗣️',
  ],
  [
    '발표',
    '🎥',
  ],
  [
    '개발 전달',
    '💻',
  ],
  [
    '보고',
    '📄',
  ],
  [
    '학습',
    '🎓',
  ],
  [
    '공개',
    '🌐',
  ],
]

export function ResultUsageInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const usage =
    getString(
      slot.config,
      'usage',
    )

  const timing =
    getString(
      slot.config,
      'timing',
      '즉시',
    )

  const channels =
    getStringArray(
      slot.config,
      'channels',
    )

  const formality =
    getString(
      slot.config,
      'formality',
      'internal',
    )

  const save = (
    patch: StudioBlockConfig,
    summary =
      usage,
  ) => {
    const nextUsage =
      typeof patch.usage ===
      'string'
        ? patch.usage
        : usage

    onConfigChange(
      {
        usage,
        timing,
        channels,
        formality,
        ...patch,
      },
      {
        summaryValue:
          summary,

        state:
          resolveState(
            Boolean(
              nextUsage,
            ),
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="결과 사용 상황 정하기"
      code="IN-008"
      stage="INPUT"
      description="결과물이 쓰일 상황과 매체를 지정해 형식을 맞춥니다."
      icon={
        <Compass
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 1,
        optional: 3,
        missing:
          Number(
            !usage,
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
            {usage
              ? '사용 상황 선택 완료'
              : '사용 상황 미선택'}
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
            사용 상황{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="space-y-2">
            <BlockCard
              columns={4}
              options={usages
                .slice(
                  0,
                  4,
                )
                .map(
                  ([
                    label,
                    icon,
                  ]) => ({
                    label,
                    value:
                      label,
                    icon: (
                      <span>
                        {
                          icon
                        }
                      </span>
                    ),
                  }),
                )}
              value={
                usage
              }
              onChange={(
                value,
              ) =>
                save(
                  {
                    usage:
                      value,
                  },
                  value,
                )
              }
            />

            <BlockCard
              columns={3}
              options={usages
                .slice(4)
                .map(
                  ([
                    label,
                    icon,
                  ]) => ({
                    label,
                    value:
                      label,
                    icon: (
                      <span>
                        {
                          icon
                        }
                      </span>
                    ),
                  }),
                )}
              value={
                usage
              }
              onChange={(
                value,
              ) =>
                save(
                  {
                    usage:
                      value,
                  },
                  value,
                )
              }
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <p className="text-xs font-bold text-slate-700">
              사용 시점
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <BlockButton
            options={[
              '즉시',
              '수정 후',
              '참고',
            ].map(
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
              timing
            }
            onChange={(
              value,
            ) =>
              save({
                timing:
                  value,
              })
            }
          />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-bold text-slate-700">
                전달 매체
              </p>

              <span className="text-[11px] font-medium text-indigo-500">
                복수 선택
              </span>
            </div>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <BlockButton
            multiple
            options={[
              '문서',
              '메신저',
              '이메일',
              '발표',
              'Notion',
              '개발 이슈',
            ].map(
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
              channels
            }
            onChange={(
              value,
            ) =>
              save({
                channels:
                  value,
              })
            }
            className="flex-wrap"
          />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <p className="text-xs font-bold text-slate-700">
              공식성
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <ConnectedSegmentedControl
            options={[
              {
                label: '비공식',
                value: 'casual',
              },
              {
                label: '내부',
                value: 'internal',
              },
              {
                label: '공식',
                value: 'formal',
              },
            ]}
            value={
              formality
            }
            onChange={(
              value,
            ) =>
              save({
                formality:
                  value,
              })
            }
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}

/* ============================================================
 * IN-009 제약조건 입력하기
 * ============================================================
 */

export function ConstraintInputInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const length =
    getString(
      slot.config,
      'length',
      'normal',
    )

  const customLength =
    getString(
      slot.config,
      'customLength',
    )

  const styles =
    getStringArray(
      slot.config,
      'styles',
    )

  const rules =
    getString(
      slot.config,
      'rules',
    )

  const language =
    getString(
      slot.config,
      'language',
      'ko',
    )

  const complete =
    length !==
      'custom' ||
    Boolean(
      customLength.trim(),
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextLength =
      typeof patch.length ===
      'string'
        ? patch.length
        : length

    const nextCustom =
      typeof patch.customLength ===
      'string'
        ? patch.customLength
        : customLength

    const nextComplete =
      nextLength !==
        'custom' ||
      Boolean(
        nextCustom.trim(),
      )

    onConfigChange(
      {
        length,
        customLength,
        styles,
        rules,
        language,
        ...patch,
      },
      {
        summaryValue:
          nextLength ===
          'custom'
            ? nextCustom
            : nextLength,

        state:
          resolveState(
            nextComplete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="제약조건 입력하기"
      code="IN-009"
      stage="INPUT"
      description="분량·문체·포함·제외 규칙 등 결과물의 제약을 정합니다."
      icon={
        <Braces
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        optional: 4,
        conditional:
          Number(
            length ===
              'custom',
          ),
        sortable: 1,
        missing:
          Number(
            length ===
              'custom' &&
              !customLength.trim(),
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
            {complete
              ? '제약 설정 가능'
              : '직접 지정 분량 미입력'}
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
          <div className="mb-2 flex justify-between">
            <p className="text-xs font-bold text-slate-700">
              분량
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <BlockButton
            options={[
              [
                '매우 짧게',
                'very-short',
              ],
              [
                '짧게',
                'short',
              ],
              [
                '보통',
                'normal',
              ],
              [
                '자세히',
                'detail',
              ],
              [
                '직접 지정',
                'custom',
              ],
            ].map(
              ([
                label,
                value,
              ]) => ({
                label,
                value,
              }),
            )}
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

        <ConditionalSection
          title="분량 설정"
          selectedLabel="직접 지정"
          visible={
            length ===
            'custom'
          }
        >
          <Textarea
            value={
              customLength
            }
            onChange={(
              value,
            ) =>
              save({
                customLength:
                  value,
              })
            }
            placeholder="예: 800자 이내"
            rows={2}
          />
        </ConditionalSection>

        <div>
          <div className="mb-2 flex justify-between">
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-bold text-slate-700">
                문체·톤
              </p>

              <span className="text-[11px] font-medium text-indigo-500">
                복수 선택
              </span>
            </div>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <BlockButton
            multiple
            options={[
              '존댓말',
              '보고서체',
              '친근',
              '객관',
              '설득',
            ].map(
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
              styles
            }
            onChange={(
              value,
            ) =>
              save({
                styles:
                  value,
              })
            }
            className="flex-wrap"
          />
        </div>

        <label className="block">
          <span className="mb-[25px] flex justify-between">
            <span className="text-xs font-bold text-slate-700">
              포함·제외·금지
            </span>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </span>

          <Textarea
            value={
              rules
            }
            onChange={(
              value,
            ) =>
              save({
                rules:
                  value,
              })
            }
            placeholder="포함·제외 규칙 입력"
            rows={2}
          />
        </label>

        <div>
          <div className="mb-2 flex justify-between">
            <p className="text-xs font-bold text-slate-700">
              언어
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <Select
            value={
              language
            }
            onChange={(
              value,
            ) =>
              save({
                language:
                  value,
              })
            }
            options={[
              {
                label: '한국어',
                value: 'ko',
              },
              {
                label: 'English',
                value: 'en',
              },
              {
                label: '日本語',
                value: 'ja',
              },
              {
                label: '中文',
                value: 'zh',
              },
            ]}
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}