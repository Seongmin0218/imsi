import {
  useState,
} from 'react'

import {
  BarChart2,
  FileText,
  Layers,
  Lightbulb,
  List,
  Monitor,
  PenTool,
  Plus,
  RefreshCw,
  Ruler,
  Search,
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
 * CTX-001 프로젝트 문서 불러오기
 * ============================================================
 */

const projectUseRangeOptions = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '핵심',
    value: 'core',
  },
  {
    label: '특정 섹션',
    value: 'section',
  },
]

export function ProjectDocumentInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const projectId =
    getString(
      slot.config,
      'projectId',
    )

  const projectLabel =
    getString(
      slot.config,
      'projectLabel',
    )

  const selectedDocuments =
    getStringArray(
      slot.config,
      'selectedDocuments',
    )

  const useRange =
    getString(
      slot.config,
      'useRange',
      'all',
    )

  const complete =
    Boolean(
      projectId,
    ) &&
    selectedDocuments.length >
      0 &&
    Boolean(
      useRange,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextProjectId =
      typeof patch.projectId ===
      'string'
        ? patch.projectId
        : projectId

    const nextProjectLabel =
      typeof patch.projectLabel ===
      'string'
        ? patch.projectLabel
        : projectLabel

    const nextDocuments =
      Array.isArray(
        patch.selectedDocuments,
      )
        ? patch.selectedDocuments.filter(
            (
              item,
            ): item is string =>
              typeof item ===
              'string',
          )
        : selectedDocuments

    const nextUseRange =
      typeof patch.useRange ===
      'string'
        ? patch.useRange
        : useRange

    const nextComplete =
      Boolean(
        nextProjectId,
      ) &&
      nextDocuments.length >
        0 &&
      Boolean(
        nextUseRange,
      )

    onConfigChange(
      {
        projectId:
          nextProjectId,

        projectLabel:
          nextProjectLabel,

        selectedDocuments:
          nextDocuments,

        useRange:
          nextUseRange,
      },
      {
        summaryValue:
          nextProjectLabel ||
          nextProjectId ||
          (
            nextDocuments.length >
            0
              ? `${nextDocuments.length}개 문서`
              : ''
          ),

        state:
          resolveState(
            nextComplete,
          ),
      },
    )
  }

  const moveDocument = (
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
        selectedDocuments.length
    ) {
      return
    }

    const next =
      [
        ...selectedDocuments,
      ]

    const current =
      next[index]

    next[index] =
      next[nextIndex]

    next[nextIndex] =
      current

    save({
      selectedDocuments:
        next,
    })
  }

  return (
    <ExpandableSettingBlock
      title="프로젝트 문서 불러오기"
      code="CTX-001"
      stage="CONTEXT"
      description="프로젝트를 선택하고 참고할 문서를 지정합니다."
      icon={
        <FileText
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 2,
        optional: 2,
        missing:
          Number(
            !projectId,
          ) +
          Number(
            selectedDocuments.length ===
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
              ? '프로젝트 문서 설정 완료'
              : '프로젝트 또는 참고 문서 미선택'}
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
            프로젝트{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          {projectId ? (
            <div className="flex min-h-[52px] items-center rounded-xl border-2 border-slate-200 px-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-700">
                  {projectLabel ||
                    projectId}
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  연결된 프로젝트
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-4">
              <p className="text-sm font-bold text-slate-500">
                프로젝트 데이터 연결 대기
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                프로젝트 목록 API 연결 후
                선택 목록이 표시됩니다.
              </p>
            </div>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            참고 문서{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          {selectedDocuments.length >
          0 ? (
            <div className="space-y-2">
              {selectedDocuments.map(
                (
                  document,
                  index,
                ) => (
                  <div
                    key={`${document}-${index}`}
                    className="flex min-h-[68px] items-center gap-3 rounded-xl border-2 border-indigo-500 bg-white px-4 py-3"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-500 text-xs font-bold text-white">
                      ✓
                    </span>

                    <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-700">
                      {
                        document
                      }
                    </span>

                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        disabled={
                          index ===
                          0
                        }
                        onClick={() =>
                          moveDocument(
                            index,
                            -1,
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-xs text-slate-500 disabled:opacity-30"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        disabled={
                          index ===
                          selectedDocuments.length -
                            1
                        }
                        onClick={() =>
                          moveDocument(
                            index,
                            1,
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-xs text-slate-500 disabled:opacity-30"
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-5 text-center">
              <p className="text-sm font-bold text-slate-500">
                참고 문서 미선택
              </p>

              <p className="mt-1 text-xs text-slate-400">
                프로젝트 선택 후
                문서 목록을 연결합니다.
              </p>
            </div>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              문서 우선순위
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <p className="rounded-lg bg-slate-50 px-3 py-3 text-xs leading-5 text-slate-400">
            선택된 문서의 위쪽이 더 높은
            우선순위로 저장됩니다.
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            사용 범위{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <ConnectedSegmentedControl
            options={
              projectUseRangeOptions
            }
            value={
              useRange
            }
            onChange={(
              value,
            ) =>
              save({
                useRange:
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
 * CTX-002 업로드 문서 읽기
 * ============================================================
 */

const readRangeOptions = [
  {
    label: '전체',
    value: 'all',
    description:
      '전체 읽기',
  },
  {
    label: '페이지 지정',
    value: 'pages',
    description:
      '사용자가 원하는 범위 지정',
  },
  {
    label: '키워드 주변',
    value: 'keyword',
    description:
      '키워드 앞뒤 문맥만',
  },
]

export function UploadedDocumentInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const readRange =
    getString(
      slot.config,
      'readRange',
      'all',
    )

  const locator =
    getString(
      slot.config,
      'locator',
    )

  const includeTable =
    getBoolean(
      slot.config,
      'includeTable',
      true,
    )

  const includeImages =
    getBoolean(
      slot.config,
      'includeImages',
      true,
    )

  const includeAppendix =
    getBoolean(
      slot.config,
      'includeAppendix',
      false,
    )

  const complete =
    Boolean(
      readRange,
    ) &&
    (
      readRange ===
        'all' ||
      Boolean(
        locator.trim(),
      )
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextReadRange =
      typeof patch.readRange ===
      'string'
        ? patch.readRange
        : readRange

    const nextLocator =
      typeof patch.locator ===
      'string'
        ? patch.locator
        : locator

    const nextComplete =
      Boolean(
        nextReadRange,
      ) &&
      (
        nextReadRange ===
          'all' ||
        Boolean(
          nextLocator.trim(),
        )
      )

    onConfigChange(
      {
        sourceBlockId:
          'input-file-upload',

        readRange,
        locator,
        includeTable,
        includeImages,
        includeAppendix,

        ...patch,
      },
      {
        summaryValue:
          nextReadRange ===
          'all'
            ? '전체 읽기'
            : nextLocator.trim()
              ? `${nextReadRange} · ${nextLocator.trim()}`
              : nextReadRange,

        state:
          resolveState(
            nextComplete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="업로드 문서 읽기"
      code="CTX-002"
      stage="CONTEXT"
      description="업로드한 파일의 읽기 범위를 지정합니다."
      icon={
        <FileText
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        conditional:
          Number(
            readRange !==
              'all',
          ),
        optional: 1,
        missing:
          Number(
            !complete,
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
              ? '읽기 범위 설정 완료'
              : '페이지·키워드 범위를 입력하세요'}
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
            업로드 파일{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <div className="flex min-h-[60px] items-center rounded-xl border-2 border-slate-200 px-4">
            <span className="h-5 w-5 shrink-0 rounded-full bg-indigo-500" />

            <div className="ml-3 min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-700">
                업로드 파일
              </p>

              <p className="mt-1 text-[11px] text-slate-400">
                INPUT · IN-004 파일 업로드 받기
              </p>
            </div>

            <span className="rounded-lg bg-indigo-500 px-3 py-2 text-xs font-bold text-white">
              연결 대상
            </span>
          </div>

          <p className="mt-2 text-[11px] leading-5 text-slate-400">
            실제 파일 존재 여부는 이후
            블록 간 연결 검증에서 확인합니다.
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            읽기 범위{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <Radio
            name={`context-read-range-${slot.id}`}
            options={
              readRangeOptions
            }
            value={
              readRange
            }
            onChange={(
              value,
            ) =>
              save({
                readRange:
                  value,
              })
            }
          />
        </div>

        {readRange !==
          'all' && (
          <label className="block">
            <span className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                페이지·키워드
              </span>

              <span className="text-[11px] font-bold text-amber-600">
                조건부
              </span>
            </span>

            <Textarea
              value={
                locator
              }
              onChange={(
                value,
              ) =>
                save({
                  locator:
                    value,
                })
              }
              placeholder={
                readRange ===
                'pages'
                  ? '예: 3-12'
                  : '키워드를 입력하세요'
              }
              rows={2}
            />
          </label>
        )}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              표·이미지·부록
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              checked={
                includeTable
              }
              onChange={(
                value,
              ) =>
                save({
                  includeTable:
                    value,
                })
              }
              label="표 포함"
              description="기본 ON"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                includeImages
              }
              onChange={(
                value,
              ) =>
                save({
                  includeImages:
                    value,
                })
              }
              label="이미지 포함"
              description="기본 ON"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                includeAppendix
              }
              onChange={(
                value,
              ) =>
                save({
                  includeAppendix:
                    value,
                })
              }
              label="부록 포함"
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
 * CTX-003 직접 입력 내용 사용하기
 * ============================================================
 */

const directInputCategories = [
  '배경',
  '사실',
  '요구',
  '예시',
]

export function DirectContextInputInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const content =
    getString(
      slot.config,
      'content',
    )

  const category =
    getString(
      slot.config,
      'category',
      '배경',
    )

  const priority =
    getBoolean(
      slot.config,
      'priority',
      false,
    )

  const keepOriginal =
    getBoolean(
      slot.config,
      'keepOriginal',
      true,
    )

  const complete =
    !enabled ||
    Boolean(
      content.trim(),
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled ===
      'boolean'
        ? patch.enabled
        : enabled

    const nextContent =
      typeof patch.content ===
      'string'
        ? patch.content
        : content

    const nextComplete =
      !nextEnabled ||
      Boolean(
        nextContent.trim(),
      )

    onConfigChange(
      {
        enabled,
        content,
        category,
        priority,
        keepOriginal,
        ...patch,
      },
      {
        summaryValue:
          nextContent
            .trim()
            .slice(
              0,
              80,
            ),

        state:
          resolveState(
            nextComplete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="직접 입력 내용 사용하기"
      code="CTX-003"
      stage="CONTEXT"
      description="사용자가 직접 입력한 참고 내용을 컨텍스트로 사용합니다."
      icon={
        <PenTool
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 1,
        optional: 3,
        missing:
          Number(
            enabled &&
              !content.trim(),
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
              ? '참고 내용 설정 완료'
              : '참고 내용 미입력'}
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
        <ToggleSwitch
          checked={
            enabled
          }
          onChange={(
            value,
          ) =>
            save({
              enabled:
                value,
            })
          }
          label="직접 입력 내용 사용"
          description="입력한 내용을 컨텍스트로 포함"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <label className="block">
              <span className="mb-[13px] block text-xs font-bold text-slate-700">
                참고 내용{' '}
                <span className="text-rose-500">
                  *
                </span>
              </span>

              <Textarea
                value={
                  content
                }
                onChange={(
                  value,
                ) =>
                  save({
                    content:
                      value,
                  })
                }
                placeholder="참고할 내용을 직접 입력하세요"
                rows={4}
              />
            </label>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  내용 구분
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <BlockButton
                options={directInputCategories.map(
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
                  category
                }
                onChange={(
                  value,
                ) =>
                  save({
                    category:
                      value,
                  })
                }
              />
            </div>

            <ToggleSwitch
              checked={
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
              label="우선 적용"
              description="다른 문서보다 우선 참고"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />

            <ToggleSwitch
              checked={
                keepOriginal
              }
              onChange={(
                value,
              ) =>
                save({
                  keepOriginal:
                    value,
                })
              }
              label="원문 유지"
              description="입력 표현을 그대로 보존 · 기본 ON"
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
 * CTX-004 참고 범위 정하기
 * ============================================================
 */

const rangeModeOptions = [
  {
    label: '전체',
    value: 'all',
    icon: (
      <Search
        size={16}
      />
    ),
  },
  {
    label: '특정 문서',
    value: 'document',
    icon: (
      <FileText
        size={16}
      />
    ),
  },
  {
    label: '섹션',
    value: 'section',
    icon: (
      <Layers
        size={16}
      />
    ),
  },
  {
    label: '키워드',
    value: 'keyword',
    icon: (
      <Lightbulb
        size={16}
      />
    ),
  },
]

const contextModeOptions = [
  {
    label: '해당 부분',
    value: 'part',
  },
  {
    label: '앞뒤 포함',
    value: 'surrounding',
  },
  {
    label: '전체 연계',
    value: 'all',
  },
]

export function ReferenceScopeInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const [
    keywordInput,
    setKeywordInput,
  ] =
    useState('')

  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const rangeMode =
    getString(
      slot.config,
      'rangeMode',
      'document',
    )

  const selectedDocuments =
    getStringArray(
      slot.config,
      'selectedDocuments',
    )

  const keywords =
    getStringArray(
      slot.config,
      'keywords',
    )

  const contextMode =
    getString(
      slot.config,
      'contextMode',
      'surrounding',
    )

  const complete =
    !enabled ||
    (
      rangeMode !==
        'document' ||
      selectedDocuments.length >
        0
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled ===
      'boolean'
        ? patch.enabled
        : enabled

    const nextMode =
      typeof patch.rangeMode ===
      'string'
        ? patch.rangeMode
        : rangeMode

    const nextDocuments =
      Array.isArray(
        patch.selectedDocuments,
      )
        ? patch.selectedDocuments.filter(
            (
              item,
            ): item is string =>
              typeof item ===
              'string',
          )
        : selectedDocuments

    const nextComplete =
      !nextEnabled ||
      (
        nextMode !==
          'document' ||
        nextDocuments.length >
          0
      )

    onConfigChange(
      {
        enabled,
        rangeMode,
        selectedDocuments,
        keywords,
        contextMode,
        ...patch,
      },
      {
        summaryValue:
          nextMode,

        state:
          resolveState(
            nextComplete,
          ),
      },
    )
  }

  const addKeyword =
    () => {
      const nextKeyword =
        keywordInput.trim()

      if (!nextKeyword) {
        return
      }

      if (
        !keywords.includes(
          nextKeyword,
        )
      ) {
        save({
          keywords: [
            ...keywords,
            nextKeyword,
          ],
        })
      }

      setKeywordInput('')
    }

  return (
    <ExpandableSettingBlock
      title="참고 범위 정하기"
      code="CTX-004"
      stage="CONTEXT"
      description="참고할 자료의 범위 방식을 정합니다."
      icon={
        <Layers
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 1,
        conditional:
          Number(
            rangeMode ===
              'document',
          ),
        optional: 2,
        missing:
          Number(
            enabled &&
              rangeMode ===
                'document' &&
              selectedDocuments.length ===
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
              ? '참고 범위 설정 완료'
              : '대상 문서 미선택'}
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
        <ToggleSwitch
          checked={
            enabled
          }
          onChange={(
            value,
          ) =>
            save({
              enabled:
                value,
            })
          }
          label="참고 범위 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                범위 방식{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <BlockCard
                columns={4}
                options={
                  rangeModeOptions
                }
                value={
                  rangeMode
                }
                onChange={(
                  value,
                ) =>
                  save({
                    rangeMode:
                      value,
                  })
                }
              />
            </div>

            {rangeMode ===
              'document' && (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-700">
                    대상 문서
                  </p>

                  <span className="text-[11px] font-bold text-amber-600">
                    조건부
                  </span>
                </div>

                {selectedDocuments.length >
                0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedDocuments.map(
                      (
                        document,
                      ) => (
                        <span
                          key={
                            document
                          }
                          className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600"
                        >
                          {
                            document
                          }
                        </span>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-4 text-center text-xs leading-5 text-slate-400">
                    프로젝트/문서 데이터 연결 후
                    복수 선택할 수 있습니다.
                  </div>
                )}
              </div>
            )}

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  포함·제외 키워드
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <input
                value={
                  keywordInput
                }
                onChange={(
                  event,
                ) =>
                  setKeywordInput(
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
                    addKeyword()
                  }
                }}
                placeholder="키워드 입력 후 Enter"
                className="h-[44px] w-full rounded-xl border-2 border-slate-200 px-3 text-sm outline-none focus:border-indigo-500"
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
                        className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600"
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
                <p className="text-xs font-bold text-slate-700">
                  문맥 확장
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <ConnectedSegmentedControl
                options={
                  contextModeOptions
                }
                value={
                  contextMode
                }
                onChange={(
                  value,
                ) =>
                  save({
                    contextMode:
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
 * CTX-005 역할 부여하기
 * ============================================================
 */

const roleOptions = [
  {
    label: '기획자',
    icon: PenTool,
  },
  {
    label: '개발자',
    icon: Monitor,
  },
  {
    label: '디자이너',
    icon: Ruler,
  },
  {
    label: '튜터',
    icon: Lightbulb,
  },
  {
    label: '분석가',
    icon: BarChart2,
  },
  {
    label: '작성자',
    icon: List,
  },
  {
    label: '리뷰어',
    icon: RefreshCw,
  },
  {
    label: '직접입력',
    icon: Plus,
  },
]

const perspectiveOptions = [
  '사용자',
  '비즈니스',
  '기술',
  '품질',
  '학습',
]

const expertiseOptions = [
  {
    label: '기본',
    value: '기본',
  },
  {
    label: '실무',
    value: '실무',
  },
  {
    label: '전문',
    value: '전문',
  },
]

export function RoleAssignmentInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const role =
    getString(
      slot.config,
      'role',
      '기획자',
    )

  const perspective =
    getString(
      slot.config,
      'perspective',
      '사용자',
    )

  const expertise =
    getString(
      slot.config,
      'expertise',
      '기본',
    )

  const behaviorPrinciple =
    getString(
      slot.config,
      'behaviorPrinciple',
    )

  const complete =
    !enabled ||
    Boolean(
      role,
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled ===
      'boolean'
        ? patch.enabled
        : enabled

    const nextRole =
      typeof patch.role ===
      'string'
        ? patch.role
        : role

    const nextComplete =
      !nextEnabled ||
      Boolean(
        nextRole,
      )

    onConfigChange(
      {
        enabled,
        role,
        perspective,
        expertise,
        behaviorPrinciple,
        ...patch,
      },
      {
        summaryValue:
          nextRole,

        state:
          resolveState(
            nextComplete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="역할 부여하기"
      code="CTX-005"
      stage="CONTEXT"
      description="AI가 수행할 역할과 관점을 지정합니다."
      icon={
        <PenTool
          size={18}
        />
      }
      category="CORE"
      tagCounts={{
        required: 1,
        optional: 3,
        recommended: 1,
        missing:
          Number(
            enabled &&
              !role,
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
            {role
              ? `${role} · ${expertise}`
              : '역할 미선택'}
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
        <ToggleSwitch
          checked={
            enabled
          }
          onChange={(
            value,
          ) =>
            save({
              enabled:
                value,
            })
          }
          label="역할 설정 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                역할{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <BlockCard
                columns={4}
                options={roleOptions.map(
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
                          16
                        }
                      />
                    ),
                  }),
                )}
                value={
                  role
                }
                onChange={(
                  value,
                ) =>
                  save({
                    role:
                      value,
                  })
                }
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  역할 관점
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <BlockButton
                options={perspectiveOptions.map(
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
                  perspective
                }
                onChange={(
                  value,
                ) =>
                  save({
                    perspective:
                      value,
                  })
                }
                className="flex-wrap"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  전문성
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <ConnectedSegmentedControl
                options={
                  expertiseOptions
                }
                value={
                  expertise
                }
                onChange={(
                  value,
                ) =>
                  save({
                    expertise:
                      value,
                  })
                }
              />
            </div>

            <label className="block">
              <span className="mb-[13px] flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  행동 원칙
                </span>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </span>

              <Textarea
                value={
                  behaviorPrinciple
                }
                onChange={(
                  value,
                ) =>
                  save({
                    behaviorPrinciple:
                      value,
                  })
                }
                placeholder="추가 설정 · 행동 원칙 입력"
                rows={3}
              />
            </label>
          </>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}

/*
 * ============================================================
 * CTX-006 배경 설명 추가하기
 * ============================================================
 */

const backgroundStages = [
  '아이디어',
  '기획',
  '설계',
  '개발',
  'QA',
  '운영',
]

const importanceOptions = [
  {
    label: '참고',
    value: '참고',
  },
  {
    label: '중요',
    value: '중요',
  },
  {
    label: '반드시',
    value: '반드시',
  },
]

export function BackgroundContextInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const backgroundText =
    getString(
      slot.config,
      'backgroundText',
    )

  const stage =
    getString(
      slot.config,
      'stage',
      '아이디어',
    )

  const decidedItems =
    getString(
      slot.config,
      'decidedItems',
    )

  const undecidedItems =
    getString(
      slot.config,
      'undecidedItems',
    )

  const importance =
    getString(
      slot.config,
      'importance',
      '중요',
    )

  const complete =
    !enabled ||
    Boolean(
      backgroundText.trim(),
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled ===
      'boolean'
        ? patch.enabled
        : enabled

    const nextText =
      typeof patch.backgroundText ===
      'string'
        ? patch.backgroundText
        : backgroundText

    const nextComplete =
      !nextEnabled ||
      Boolean(
        nextText.trim(),
      )

    onConfigChange(
      {
        enabled,
        backgroundText,
        stage,
        decidedItems,
        undecidedItems,
        importance,
        ...patch,
      },
      {
        summaryValue:
          nextText
            .trim()
            .slice(
              0,
              80,
            ),

        state:
          resolveState(
            nextComplete,
          ),
      },
    )
  }

  return (
    <ExpandableSettingBlock
      title="배경 설명 추가하기"
      code="CTX-006"
      stage="CONTEXT"
      description="작업의 배경 상황과 현재 단계를 알려줍니다."
      icon={
        <Lightbulb
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 1,
        optional: 3,
        missing:
          Number(
            enabled &&
              !backgroundText.trim(),
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
              ? '배경 설명 설정 완료'
              : '배경 설명 미입력'}
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
        <ToggleSwitch
          checked={
            enabled
          }
          onChange={(
            value,
          ) =>
            save({
              enabled:
                value,
            })
          }
          label="배경 설명 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <label className="block">
              <span className="mb-[13px] block text-xs font-bold text-slate-700">
                배경 설명{' '}
                <span className="text-rose-500">
                  *
                </span>
              </span>

              <Textarea
                value={
                  backgroundText
                }
                onChange={(
                  value,
                ) =>
                  save({
                    backgroundText:
                      value,
                  })
                }
                placeholder="참고할 배경을 입력하세요"
                rows={4}
              />
            </label>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  현재 단계
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <BlockButton
                options={backgroundStages.map(
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
                  stage
                }
                onChange={(
                  value,
                ) =>
                  save({
                    stage:
                      value,
                  })
                }
                className="flex-wrap"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  결정·미정 사항
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Textarea
                  value={
                    decidedItems
                  }
                  onChange={(
                    value,
                  ) =>
                    save({
                      decidedItems:
                        value,
                    })
                  }
                  placeholder="결정된 사항"
                  rows={3}
                />

                <Textarea
                  value={
                    undecidedItems
                  }
                  onChange={(
                    value,
                  ) =>
                    save({
                      undecidedItems:
                        value,
                    })
                  }
                  placeholder="미정 사항"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700">
                  중요도
                </p>

                <span className="text-[11px] text-emerald-500">
                  선택
                </span>
              </div>

              <ConnectedSegmentedControl
                options={
                  importanceOptions
                }
                value={
                  importance
                }
                onChange={(
                  value,
                ) =>
                  save({
                    importance:
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
 * CTX-009 참고하지 말아야 할 내용 정하기
 * ============================================================
 */

const exclusionTypeOptions = [
  {
    label: '문서',
    value: '문서',
    description:
      '연결된 문서 제외',
  },
  {
    label: '섹션',
    value: '섹션',
    description:
      '입력된 섹션 제외',
  },
  {
    label: '키워드',
    value: '키워드',
    description:
      '키워드 기준 제외',
  },
  {
    label: '이전 버전',
    value: '이전 버전',
    description:
      '이전 버전 결과 제외',
  },
]

const conflictOptions = [
  {
    label: '제외 규칙 우선',
    value: '제외 규칙 우선',
    description:
      '충돌 시 제외를 우선',
  },
  {
    label: '경고',
    value: '경고',
    description:
      '경고만 표시',
  },
]

export function ExclusionContextInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const enabled =
    getBoolean(
      slot.config,
      'enabled',
      true,
    )

  const exclusionTypes =
    getStringArray(
      slot.config,
      'exclusionTypes',
      [
        '키워드',
      ],
    )

  const exclusionTarget =
    getString(
      slot.config,
      'exclusionTarget',
    )

  const conflictHandling =
    getString(
      slot.config,
      'conflictHandling',
    )

  const mentionExclusion =
    getBoolean(
      slot.config,
      'mentionExclusion',
      false,
    )

  const keywordActive =
    exclusionTypes.includes(
      '키워드',
    )

  const complete =
    !enabled ||
    (
      exclusionTypes.length >
        0 &&
      Boolean(
        conflictHandling,
      ) &&
      (
        !keywordActive ||
        Boolean(
          exclusionTarget.trim(),
        )
      )
    )

  const save = (
    patch: StudioBlockConfig,
  ) => {
    const nextEnabled =
      typeof patch.enabled ===
      'boolean'
        ? patch.enabled
        : enabled

    const nextTypes =
      Array.isArray(
        patch.exclusionTypes,
      )
        ? patch.exclusionTypes.filter(
            (
              item,
            ): item is string =>
              typeof item ===
              'string',
          )
        : exclusionTypes

    const nextTarget =
      typeof patch.exclusionTarget ===
      'string'
        ? patch.exclusionTarget
        : exclusionTarget

    const nextConflict =
      typeof patch.conflictHandling ===
      'string'
        ? patch.conflictHandling
        : conflictHandling

    const nextKeywordActive =
      nextTypes.includes(
        '키워드',
      )

    const nextComplete =
      !nextEnabled ||
      (
        nextTypes.length >
          0 &&
        Boolean(
          nextConflict,
        ) &&
        (
          !nextKeywordActive ||
          Boolean(
            nextTarget.trim(),
          )
        )
      )

    onConfigChange(
      {
        enabled,
        exclusionTypes,
        exclusionTarget,
        conflictHandling,
        mentionExclusion,
        ...patch,
      },
      {
        summaryValue:
          nextTypes.length >
          0
            ? nextTypes.join(
                ', ',
              )
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
      title="참고하지 말아야 할 내용 정하기"
      code="CTX-009"
      stage="CONTEXT"
      description="참고에서 제외할 유형과 대상을 정합니다."
      icon={
        <RefreshCw
          size={18}
        />
      }
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        conditional:
          Number(
            keywordActive,
          ),
        optional: 1,
        missing:
          Number(
            enabled &&
              exclusionTypes.length ===
                0,
          ) +
          Number(
            enabled &&
              !conflictHandling,
          ) +
          Number(
            enabled &&
              keywordActive &&
              !exclusionTarget.trim(),
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
              ? '제외 규칙 설정 완료'
              : '제외 규칙 설정 필요'}
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
        <ToggleSwitch
          checked={
            enabled
          }
          onChange={(
            value,
          ) =>
            save({
              enabled:
                value,
            })
          }
          label="참고 제외 규칙 사용"
          size="sm"
          className="flex w-full flex-row-reverse justify-between"
        />

        {enabled && (
          <>
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                제외 유형{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <Checkbox
                options={
                  exclusionTypeOptions
                }
                value={
                  exclusionTypes
                }
                onChange={(
                  value,
                ) =>
                  save({
                    exclusionTypes:
                      value,
                  })
                }
              />
            </div>

            {keywordActive && (
              <label className="block">
                <span className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    제외 대상
                  </span>

                  <span className="text-[11px] font-bold text-amber-600">
                    조건부
                  </span>
                </span>

                <Textarea
                  value={
                    exclusionTarget
                  }
                  onChange={(
                    value,
                  ) =>
                    save({
                      exclusionTarget:
                        value,
                    })
                  }
                  placeholder="제외할 키워드 입력"
                  rows={2}
                />
              </label>
            )}

            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">
                충돌 처리{' '}
                <span className="text-rose-500">
                  *
                </span>
              </p>

              <Radio
                name={`context-conflict-${slot.id}`}
                options={
                  conflictOptions
                }
                value={
                  conflictHandling
                }
                onChange={(
                  value,
                ) =>
                  save({
                    conflictHandling:
                      value,
                  })
                }
              />
            </div>

            <ToggleSwitch
              checked={
                mentionExclusion
              }
              onChange={(
                value,
              ) =>
                save({
                  mentionExclusion:
                    value,
                })
              }
              label="제외 내용 언급"
              description="결과에 제외 사실 표시 · 기본 OFF"
              size="sm"
              className="flex w-full flex-row-reverse justify-between"
            />
          </>
        )}
      </div>
    </ExpandableSettingBlock>
  )
}