import {
  useState,
} from 'react'

import {
  MessageCircleMore,
} from 'lucide-react'

import {
  Button,
  Textarea,
  ToggleSwitch,
} from '../../../../../components/ui'

import {
  ExpandableSettingBlock,
} from '../../../../Block/components/layouts/ExpandableSettingBlock'

import {
  BlockButton,
} from '../../../../Block/components/ui/BlockButton'

import {
  ConnectedSegmentedControl,
} from '../../../../Block/components/ui/ConnectedSegmentedControl'

import type {
  StudioBlockConfig,
  StudioSlotState,
} from '../../../types/studioNode'

import type {
  StudioBlockInspectorComponentProps,
} from '../StudioBlockInspector'

const requestModes = [
  {
    label: '직접 입력',
    value: 'direct',
  },
  {
    label: '이전 값',
    value: 'previous',
  },
  {
    label: '예시 입력',
    value: 'example',
  },
]

const cleanupLevelOptions = [
  '원문 유지',
  '핵심 정리',
  '지시문 변환',
]

const DEFAULT_MODE =
  'direct'

const DEFAULT_CLEANUP_LEVELS = [
  '원문 유지',
]

const DEFAULT_PRESERVE_EXPRESSION =
  true

/**
 * config 내부 값이 string인지 확인합니다.
 */
function getStringConfigValue(
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

/**
 * config 내부 값이 boolean인지 확인합니다.
 */
function getBooleanConfigValue(
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

/**
 * config 내부 값을 string[] 형태로 안전하게 읽습니다.
 */
function getStringArrayConfigValue(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback: string[],
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

  const stringValues =
    value.filter(
      (
        item,
      ): item is string =>
        typeof item ===
        'string',
    )

  return stringValues
}

/**
 * IN-001 사용자 요청 받기
 *
 * 기존 UserRequestBlock의 UI와 설정 항목을
 * Studio Node의 slot.config에 연결한 Controlled Inspector입니다.
 *
 * 실제 데이터는 내부 useState가 아니라
 * StudioNodeSlot.config가 소유합니다.
 *
 * hasEditedRequest는 단순 UI 오류 표시용 상태이므로
 * 로컬 상태로 유지합니다.
 */
export function UserRequestInspector({
  slot,
  onConfigChange,
}: StudioBlockInspectorComponentProps) {
  const [
    hasEditedRequest,
    setHasEditedRequest,
  ] =
    useState(false)

  const request =
    getStringConfigValue(
      slot.config,
      'request',
      '',
    )

  const mode =
    getStringConfigValue(
      slot.config,
      'mode',
      DEFAULT_MODE,
    )

  const selectedCleanupLevels =
    getStringArrayConfigValue(
      slot.config,
      'cleanupLevels',
      DEFAULT_CLEANUP_LEVELS,
    )

  const preserveExpression =
    getBooleanConfigValue(
      slot.config,
      'preserveExpression',
      DEFAULT_PRESERVE_EXPRESSION,
    )

  const showError =
    hasEditedRequest &&
    request.trim().length ===
      0

  /**
   * IN-001의 현재 필수 설정 여부입니다.
   *
   * 기존 UI 기준:
   * - 사용자 요청
   * - 입력 방식
   *
   * 두 값이 있어야 완료입니다.
   */
  const isComplete =
    request.trim().length >
      0 &&
    mode.trim().length >
      0

  const missingCount =
    Number(
      request.trim().length ===
        0,
    ) +
    Number(
      mode.trim().length ===
        0,
    )

  /**
   * 현재 Inspector의 전체 설정을 구성합니다.
   *
   * 일부 필드만 저장하면 아직 건드리지 않은 기본값이
   * config에서 빠질 수 있기 때문에,
   * 사용자 조작 시 현재 설정 전체를 함께 저장합니다.
   */
  const buildConfig = (
    overrides: Partial<{
      request: string
      mode: string
      cleanupLevels: string[]
      preserveExpression: boolean
    }> = {},
  ): StudioBlockConfig => ({
    request:
      overrides.request ??
      request,

    mode:
      overrides.mode ??
      mode,

    cleanupLevels:
      overrides.cleanupLevels ??
      selectedCleanupLevels,

    preserveExpression:
      overrides.preserveExpression ??
      preserveExpression,
  })

  /**
   * 설정 변경 후 Slot 상태를 계산합니다.
   */
  const resolveState = (
    nextRequest: string,
    nextMode: string,
  ): StudioSlotState =>
    nextRequest.trim() &&
    nextMode.trim()
      ? 'filled'
      : 'empty'

  /**
   * Node의 접힌 슬롯이나 Inspector 요약에서 사용할 값입니다.
   *
   * 사용자 요청 원문 전체를 노드에 노출하면 너무 길어질 수 있으므로
   * 80자까지만 사용합니다.
   */
  const buildSummaryValue = (
    nextRequest: string,
  ) => {
    const normalized =
      nextRequest.trim()

    if (!normalized) {
      return ''
    }

    if (
      normalized.length <=
      80
    ) {
      return normalized
    }

    return `${normalized.slice(
      0,
      80,
    )}…`
  }

  const handleRequestChange = (
    nextRequest: string,
  ) => {
    setHasEditedRequest(
      true,
    )

    onConfigChange(
      buildConfig({
        request:
          nextRequest,
      }),
      {
        summaryValue:
          buildSummaryValue(
            nextRequest,
          ),

        state:
          resolveState(
            nextRequest,
            mode,
          ),
      },
    )
  }

  const handleModeChange = (
    nextMode: string,
  ) => {
    onConfigChange(
      buildConfig({
        mode:
          nextMode,
      }),
      {
        summaryValue:
          buildSummaryValue(
            request,
          ),

        state:
          resolveState(
            request,
            nextMode,
          ),
      },
    )
  }

  const handleCleanupLevelsChange =
    (
      nextLevels: string[],
    ) => {
      onConfigChange(
        buildConfig({
          cleanupLevels:
            nextLevels,
        }),
        {
          summaryValue:
            buildSummaryValue(
              request,
            ),

          state:
            resolveState(
              request,
              mode,
            ),
        },
      )
    }

  const handlePreserveExpressionChange =
    (
      nextValue: boolean,
    ) => {
      onConfigChange(
        buildConfig({
          preserveExpression:
            nextValue,
        }),
        {
          summaryValue:
            buildSummaryValue(
              request,
            ),

          state:
            resolveState(
              request,
              mode,
            ),
        },
      )
    }

  const handleValidate =
    () => {
      setHasEditedRequest(
        true,
      )

      onConfigChange(
        buildConfig(),
        {
          summaryValue:
            buildSummaryValue(
              request,
            ),

          state:
            isComplete
              ? 'filled'
              : 'missing',
        },
      )
    }

  return (
    <ExpandableSettingBlock
      title="사용자 요청 받기"
      code="IN-001"
      stage="INPUT"
      description="사용자의 요청 문장을 받아 흐름의 출발점으로 사용합니다."
      icon={
        <MessageCircleMore
          size={18}
        />
      }
      tagCounts={{
        required: 2,
        optional: 2,
        missing:
          missingCount,
      }}
      required
      defaultOpen
      className="!w-full !rounded-[12px] !border-[#E4E4E7] !shadow-none [&_.setting-block-fields]:!w-full [&_.setting-block-fields]:max-w-full"
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {missingCount >
            0
              ? `필수 옵션 ${missingCount}개 미입력`
              : '필수 옵션 입력 완료'}
          </span>

          <Button
            size="sm"
            variant="secondary"
            onClick={
              handleValidate
            }
          >
            검증
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        {/* 사용자 요청 */}
        <label className="block">
          <span className="mb-[25px] block text-xs font-bold text-slate-700">
            사용자 요청{' '}
            <span className="text-rose-500">
              *
            </span>
          </span>

          <Textarea
            value={
              request
            }
            onChange={
              handleRequestChange
            }
            placeholder="분석하거나 작성할 내용을 입력하세요"
            maxLength={
              2000
            }
            showCount
            error={
              showError
            }
            rows={3}
          />
        </label>

        {/* 입력 방식 */}
        <div>
          <p className="mb-[13px] text-xs font-bold text-slate-700">
            입력 방식{' '}
            <span className="text-rose-500">
              *
            </span>
          </p>

          <ConnectedSegmentedControl
            options={
              requestModes
            }
            value={
              mode
            }
            onChange={
              handleModeChange
            }
          />
        </div>

        {/* 요청 정리 수준 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-bold text-slate-700">
                요청 정리 수준
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
            options={cleanupLevelOptions.map(
              (
                level,
              ) => ({
                label:
                  level,
                value:
                  level,
              }),
            )}
            value={
              selectedCleanupLevels
            }
            onChange={
              handleCleanupLevelsChange
            }
            className="flex-wrap"
          />
        </div>

        {/* 원문 유지 */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">
              원문 유지
            </p>

            <span className="text-[11px] text-emerald-500">
              선택
            </span>
          </div>

          <ToggleSwitch
            checked={
              preserveExpression
            }
            onChange={
              handlePreserveExpressionChange
            }
            label="입력한 표현을 그대로 보존"
            description="기본 ON"
            labelClassName="!text-slate-700"
            descriptionClassName="!text-indigo-500"
            size="sm"
            className="flex w-full flex-row-reverse justify-between"
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}