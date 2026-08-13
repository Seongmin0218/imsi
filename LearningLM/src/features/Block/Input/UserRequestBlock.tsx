import { useState } from 'react'
import { MessageCircleMore } from 'lucide-react'
import {
  Button,
  Textarea,
  ToggleSwitch,
} from '../../../components/ui'
import { BlockButton } from '../components/ui/BlockButton'
import { ConnectedSegmentedControl } from '../components/ui/ConnectedSegmentedControl'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'

const requestModes = [
  { label: '직접 입력', value: 'direct' },
  { label: '이전 값', value: 'previous' },
  { label: '예시 입력', value: 'example' },
]

const cleanupLevelOptions = ['원문 유지', '핵심 정리', '지시문 변환']

export function UserRequestBlock() {
  const [request, setRequest] = useState('')
  const [hasEditedRequest, setHasEditedRequest] = useState(false)
  const [mode, setMode] = useState('direct')
  const [selectedCleanupLevels, setSelectedCleanupLevels] = useState<string[]>([
    '원문 유지',
  ])
  const [preserveExpression, setPreserveExpression] = useState(true)
  const showError = hasEditedRequest && request.trim().length === 0
  const missingCount = Number(request.trim().length === 0) + Number(mode.length === 0)

  return (
    <ExpandableSettingBlock
      title="사용자 요청 받기"
      code="IN-001"
      stage="INPUT"
      description="사용자의 요청 문장을 받아 흐름의 출발점으로 사용합니다."
      icon={<MessageCircleMore size={18} />}
      tagCounts={{ required: 2, optional: 2, missing: missingCount }}
      required
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {missingCount > 0
              ? `필수 옵션 ${missingCount}개 미입력`
              : '필수 옵션 입력 완료'}
          </span>
          <Button size="sm" variant="secondary">검증</Button>
        </div>
      }
    >
      <div className="space-y-5">
        <label className="block">
          <span className="mb-[25px] block text-xs font-bold text-slate-700">
            사용자 요청 <span className="text-rose-500">*</span>
          </span>
          <Textarea
            value={request}
            onChange={(value) => {
              setRequest(value)
              setHasEditedRequest(true)
            }}
            placeholder="분석하거나 작성할 내용을 입력하세요"
            maxLength={2000}
            showCount
            error={showError}
            rows={3}
          />
        </label>

        <div>
          <p className="mb-[13px] text-xs font-bold text-slate-700">
            입력 방식 <span className="text-rose-500">*</span>
          </p>
          <ConnectedSegmentedControl
            options={requestModes}
            value={mode}
            onChange={setMode}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-bold text-slate-700">요청 정리 수준</p>
              <span className="text-[11px] font-medium text-indigo-500">복수 선택</span>
            </div>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <BlockButton
            multiple
            options={cleanupLevelOptions.map((level) => ({
              label: level,
              value: level,
            }))}
            value={selectedCleanupLevels}
            onChange={setSelectedCleanupLevels}
            className="flex-wrap"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-700">원문 유지</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <ToggleSwitch
            checked={preserveExpression}
            onChange={setPreserveExpression}
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
