import { Hash } from 'lucide-react'
import { useState } from 'react'
import { Button, Textarea} from '../../../components/ui'
import { ConnectedSegmentedControl } from '../components/ui/ConnectedSegmentedControl'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'

const scopeOptions = [
  { label: '좁게', value: 'narrow' },
  { label: '보통', value: 'normal' },
  { label: '넓게', value: 'wide' },
]

export function TopicInputBlock() {
  const [topic, setTopic] = useState('')
  const [hasEditedTopic, setHasEditedTopic] = useState(false)
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState('')
  const [scope, setScope] = useState('normal')
  const [extraScope, setExtraScope] = useState('')
  const showError = hasEditedTopic && topic.trim().length === 0
  const missingCount = Number(topic.trim().length === 0)

  const addKeyword = () => {
    const value = keywordInput.trim()
    if (value && !keywords.includes(value)) setKeywords((items) => [...items, value])
    setKeywordInput('')
  }

  return (
    <ExpandableSettingBlock
      title="주제 입력하기"
      code="IN-003"
      stage="INPUT"
      description="대표 주제와 키워드를 입력해 작업 범위를 정합니다."
      icon={<Hash size={19} />}
      tagCounts={{ required: 1, optional: 3, sortable: 1, missing: missingCount }}
      required
      footer={
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            {topic.trim() ? '주제가 입력되었습니다.' : '주제 미입력 — 저장할 수 없습니다.'}
          </span>
          <Button size="sm" variant="secondary">검증</Button>
        </div>
      }
    >
      <div className="space-y-5">
        <label className="block">
          <span className="mb-[25px] block text-xs font-bold text-slate-700">
            주제 <span className="text-rose-500">*</span>
          </span>
          <Textarea
            value={topic}
            onChange={(value) => {
              setTopic(value)
              setHasEditedTopic(true)
            }}
            placeholder="대표 주제를 입력하세요"
            error={showError}
            rows={2}
          />
          {showError && (
            <span className="mt-1.5 block text-xs font-semibold text-rose-500">⚠ 필수 항목입니다</span>
          )}
        </label>

        <div>
          <div className="mb-[13px] flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">키워드</span>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <Textarea
            value={keywordInput}
            onChange={setKeywordInput}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                addKeyword()
              }
            }}
            placeholder="Enter로 칩 생성 · 드래그로 순서 변경"
            rows={2}
          />
          {keywords.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => setKeywords((items) => items.filter((item) => item !== keyword))}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600"
                  title="클릭하여 삭제"
                >
                  {keyword} ×
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">주제 범위</span>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <ConnectedSegmentedControl
            options={scopeOptions}
            value={scope}
            onChange={setScope}
          />
        </div>

        <label className="block">
          <span className="mb-[13px] flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">포함·제외 범위</span>
            <span className="text-[11px] text-emerald-500">선택</span>
          </span>
          <Textarea
            value={extraScope}
            onChange={setExtraScope}
            placeholder="추가 설정 — 포함·제외 범위 입력"
            rows={2}
          />
        </label>
      </div>
    </ExpandableSettingBlock>
  )
}
