import { Settings2 } from 'lucide-react'
import { useState } from 'react'

import { Button, Select, ToggleSwitch } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockButton } from '../components/ui/BlockButton'
import { Radio } from '../components/ui/Radio'

const summaryLengths = [
  { label: '한 문장', value: 'one-sentence' },
  { label: '짧게', value: 'short' },
  { label: '보통', value: 'normal' },
  { label: '자세히', value: 'detailed' },
]

const summaryFormats = [
  { label: '단락', value: 'paragraph', description: '마침표 기준으로 요약' },
  { label: '목록', value: 'list', description: '글머리 기호 항목' },
  { label: '핵심 문장', value: 'key-sentence', description: '글의 핵심 문장 기준으로 요약' },
  { label: '항목별', value: 'by-item', description: '항목별 요약' },
]

const itemCounts = [
  { label: '3', value: '3' },
  { label: '5', value: '5' },
  { label: '7', value: '7' },
  { label: '제한없음', value: 'unlimited' },
]

function FieldLabel({ children, optional = false }: { children: React.ReactNode; optional?: boolean }) {
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

export function SummarizeBlock() {
  const [length, setLength] = useState('normal')
  const [format, setFormat] = useState('')
  const [perspective, setPerspective] = useState('all')
  const [itemCount, setItemCount] = useState('5')
  const [preserveProperNouns, setPreserveProperNouns] = useState(false)
  const [showSource, setShowSource] = useState(false)

  return (
    <ExpandableSettingBlock
      title="요약하기"
      code="PRO-002"
      stage="PROCESS"
      description="요약의 길이·형식·관점을 정합니다."
      icon={<Settings2 size={18} />}
      category="CORE"
      tagCounts={{ required: 2, optional: 2, recommended: 2 }}
      required
      defaultOpen
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">요약 설정 완료</span>
          <Button size="sm">적용</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <FieldLabel>요약 길이</FieldLabel>
          <BlockButton
            options={summaryLengths}
            value={length}
            onChange={setLength}
            size="md"
          />
        </div>

        <div>
          <FieldLabel>요약 형식</FieldLabel>
          <Radio
            name="summary-format"
            options={summaryFormats.map((option) => ({
              ...option,
              description:
                format === option.value ? option.description : undefined,
            }))}
            value={format}
            onChange={setFormat}
            className="[&_[role=radiogroup]>label]:min-h-[48px] [&_[role=radiogroup]>label]:rounded-xl [&_[role=radiogroup]>label]:py-2"
          />
        </div>

        <div>
          <FieldLabel optional>요약 관점</FieldLabel>
          <Select
            value={perspective}
            onChange={setPerspective}
            options={[
              { label: '전체', value: 'all' },
              { label: '작성자 관점', value: 'author' },
              { label: '독자 관점', value: 'reader' },
              { label: '객관적 관점', value: 'objective' },
            ]}
          />
        </div>

        {format === 'list' && <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <p className="text-sm font-bold text-slate-700">항목 수</p>
              <span className="text-[11px] font-medium text-indigo-500">
                "목록" 선택됨
              </span>
            </div>
            <span className="text-[11px] text-amber-500">조건부</span>
          </div>
          <BlockButton options={itemCounts} value={itemCount} onChange={setItemCount} size="sm" className="w-full [&>button]:flex-1" />
        </div>}

        <div>
          <FieldLabel optional>원문·출처</FieldLabel>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">고유어 유지</span>
              <ToggleSwitch checked={preserveProperNouns} onChange={setPreserveProperNouns} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">출처 표시</span>
              <ToggleSwitch checked={showSource} onChange={setShowSource} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
