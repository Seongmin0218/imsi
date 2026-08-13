import { Braces } from 'lucide-react'
import { useState } from 'react'
import {
  Button,
  Select,
  Textarea,
} from '../../../components/ui'
import { BlockButton } from '../components/ui/BlockButton'
import { ConditionalSection } from '../components/layouts/ConditionalSection'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'

export function ConstraintInputBlock() {
  const [length, setLength] = useState('normal')
  const [customLength, setCustomLength] = useState('')
  const [styles, setStyles] = useState<string[]>([])
  const [rules, setRules] = useState('')
  const [language, setLanguage] = useState('ko')

  return (
    <ExpandableSettingBlock
      title="제약조건 입력하기"
      code="IN-009"
      stage="INPUT"
      description="분량·문체·포함·제외 규칙 등 결과물의 제약을 정합니다."
      icon={<Braces size={18} />}
      category="RECOMMENDED"
      tagCounts={{
        optional: 4,
        conditional: Number(length === 'custom'),
        sortable: 1,
        missing: Number(length === 'custom' && customLength.trim().length === 0)
      }}
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {length === 'custom' && !customLength.trim() ? '직접 지정 분량 미입력' : '제약 없음 — 그대로 진행 가능'}
          </span>
          <Button size="sm">
            적용
          </Button>
        </div>}>
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
              ['매우 짧게', 'very-short'],
              ['짧게', 'short'],
              ['보통', 'normal'],
              ['자세히', 'detail'],
              ['직접 지정', 'custom']
            ].map(([label, value]) => ({ label, value }))}
            value={length}
            onChange={setLength}
            className="flex-wrap" />
        </div>
        <ConditionalSection
          title="분량 설정"
          selectedLabel="직접 지정"
          visible={length === 'custom'}>
          <label>
            <Textarea
              value={customLength}
              onChange={setCustomLength}
              placeholder="예: 800자 이내"
              rows={2} />
          </label>
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
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <BlockButton
            multiple options={['존댓말', '보고서체', '친근', '객관', '설득']
              .map((item) => ({ label: item, value: item }))}
            value={styles} onChange={setStyles}
            className="flex-wrap" />
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
            value={rules}
            onChange={setRules}
            placeholder="구분별 칩 추가 · 그룹 내 드래그 정렬"
            rows={2} />
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
            value={language}
            onChange={setLanguage}
            options={[
              { label: '한국어', value: 'ko' },
              { label: 'English', value: 'en' },
              { label: '日本語', value: 'ja' },
              { label: '中文', value: 'zh' }]} />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
