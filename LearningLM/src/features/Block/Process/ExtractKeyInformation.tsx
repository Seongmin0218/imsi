import { FileSearch } from 'lucide-react'
import { useState } from 'react'

import { Button, Slider, ToggleSwitch } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockButton } from '../components/ui/BlockButton'

const extractionTargets = ['주장', '사실', '요구', '결정', '문제', '액션', '키워드']

const extractionUnits = [
  { label: '문장', value: 'sentence' },
  { label: '항목', value: 'item' },
  { label: '주제', value: 'topic' },
]

const maximumItems = [
  { label: '3', value: '3' },
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '제한없음', value: 'unlimited' },
]

function FieldLabel({
  children,
  optional = false,
}: {
  children: React.ReactNode
  optional?: boolean
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <p className="text-sm font-bold text-slate-700">
        {children}
        {!optional && <span className="ml-0.5 text-rose-500">*</span>}
      </p>
      {optional && <span className="text-[11px] text-emerald-500">선택</span>}
    </div>
  )
}

export function ExtractKeyInformation() {
  const [targets, setTargets] = useState<string[]>([])
  const [unit, setUnit] = useState('item')
  const [intensity, setIntensity] = useState(0)
  const [maximumItem, setMaximumItem] = useState('5')
  const [showEvidence, setShowEvidence] = useState(false)
  const [showImportance, setShowImportance] = useState(false)
  const [validationAttempted, setValidationAttempted] = useState(false)

  const missingCount = Number(targets.length === 0)
  const intensityLabel = intensity < 34 ? '보수적' : intensity < 67 ? '균형' : '적극적'

  return (
    <ExpandableSettingBlock
      title="핵심 내용 추출하기"
      code="PRO-001"
      stage="PROCESS"
      description="자료에서 추출할 대상과 강도를 정합니다."
      icon={<FileSearch size={18} />}
      category="CORE"
      tagCounts={{ required: 3, optional: 2, missing: validationAttempted ? missingCount : 0 }}
      required
      validationMessage={validationAttempted && missingCount > 0 ? '필수 작성 항목입니다' : undefined}
      defaultOpen
      footer={
        <div className="flex items-center justify-between">
          <span className={validationAttempted && missingCount > 0 ? 'text-xs text-rose-500' : 'text-xs text-slate-400'}>
            {missingCount === 0
              ? '필수 항목 입력 완료'
              : validationAttempted
                ? '추출 대상 미선택'
                : '필수 항목을 확인하세요'}
          </span>
          {missingCount === 0 ? (
            <Button size="sm">적용</Button>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setValidationAttempted(true)}
            >
              검증
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <FieldLabel>
            추출 대상
            <span className="ml-2 text-[11px] font-medium text-indigo-500">
              복수 선택
            </span>
          </FieldLabel>
          {validationAttempted && missingCount > 0 && (
            <p className="mb-3 text-xs font-medium text-rose-500">
              1개 이상 선택하세요
            </p>
          )}
          <BlockButton
            multiple
            size="md"
            options={extractionTargets.map((target) => ({
              label: target,
              value: target,
            }))}
            value={targets}
            onChange={setTargets}
            className="flex-wrap"
          />
        </div>

        <div>
          <FieldLabel>추출 단위</FieldLabel>
          <BlockButton
            options={extractionUnits}
            value={unit}
            onChange={setUnit}
          />
        </div>

        <div>
          <FieldLabel>추출 강도</FieldLabel>
          <Slider
            value={intensity}
            onChange={setIntensity}
            showValue={false}
            aria-label="추출 강도"
          />
          <div className="mt-1 flex justify-between text-[11px] font-medium">
            <span className={intensity < 34 ? 'text-indigo-500' : 'text-slate-400'}>
              보수적
            </span>
            <span className={intensity >= 34 && intensity < 67 ? 'text-indigo-500' : 'text-slate-400'}>
              0.5 · 균형
            </span>
            <span className={intensity >= 67 ? 'text-indigo-500' : 'text-slate-400'}>
              적극적
            </span>
          </div>
          <p className="sr-only">현재 추출 강도: {intensityLabel}</p>
        </div>

        <div>
          <FieldLabel optional>최대 항목</FieldLabel>
          <BlockButton
            options={maximumItems}
            value={maximumItem}
            onChange={setMaximumItem}
            className="w-full [&>button]:flex-1"
          />
        </div>

        <div>
          <FieldLabel optional>근거·중요도</FieldLabel>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">근거 위치 표시</span>
              <ToggleSwitch
                checked={showEvidence}
                onChange={setShowEvidence}
                size="sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">중요도 표시</span>
              <ToggleSwitch
                checked={showImportance}
                onChange={setShowImportance}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
