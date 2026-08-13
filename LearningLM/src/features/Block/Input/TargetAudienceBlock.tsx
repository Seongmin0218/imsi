import { Users } from 'lucide-react'
import { useState } from 'react'
import { Button, Textarea } from '../../../components/ui'
import { BlockButton } from '../components/ui/BlockButton'
import { ConnectedSegmentedControl } from '../components/ui/ConnectedSegmentedControl'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockCard } from '../components/ui/BlockCard'
import { ConditionalSection } from '../components/layouts/ConditionalSection'

const audiences = [['일반', '일'], ['학생', '학'], ['기획', '기'], ['디자인', '디'], ['개발', '개'], ['관리자', '관'], ['전문가', '전'], ['직접 입력', '+']]

export function TargetAudienceBlock() {
  const [audience, setAudience] = useState('일반')
  const [level, setLevel] = useState('basic')
  const [styles, setStyles] = useState<string[]>([])
  const [terms, setTerms] = useState('normal')
  const [customAudience, setCustomAudience] = useState('')
  const isCustomAudience = audience === '직접 입력'

  return (
    <ExpandableSettingBlock title="대상 독자 정하기" code="IN-007" stage="INPUT" description="결과물을 읽을 대상과 이해 수준을 지정합니다." icon={<Users size={18} />} category="RECOMMENDED" tagCounts={{ required: 2, optional: 2, recommended: 1, missing: Number(audience.length === 0) + Number(level.length === 0) }} required footer={<div className="flex items-center justify-between"><span className="text-xs text-slate-400">기본값으로 저장 가능</span><Button size="sm">적용</Button></div>}>
      <div className="space-y-5">
        <div><p className="mb-2 text-xs font-bold text-slate-700">대상 독자 <span className="text-rose-500">*</span></p><BlockCard columns={4} options={audiences.map(([label, mark]) => ({ label, value: label, icon: <span className="font-black">{mark}</span> }))} value={audience} onChange={setAudience} /></div>
        <ConditionalSection
          title="직접 입력"
          selectedLabel="직접 입력"
          visible={isCustomAudience}
        >
          <Textarea
            value={customAudience}
            onChange={setCustomAudience}
            placeholder="예: 800자 이내"
            maxLength={800}
            rows={2}
          />
        </ConditionalSection>
        <div><p className="mb-2 text-xs font-bold text-slate-700">이해 수준 <span className="text-rose-500">*</span></p><ConnectedSegmentedControl options={[{ label: '입문', value: 'intro' }, { label: '기본', value: 'basic' }, { label: '실무', value: 'work' }, { label: '전문', value: 'expert' }]} value={level} onChange={setLevel} /></div>
        <div><div className="mb-4 flex justify-between"><div className="flex items-baseline gap-2"><p className="text-xs font-bold text-slate-700">설명 방식</p><span className="text-[11px] font-medium text-indigo-500">복수 선택</span></div><span className="text-[11px] text-emerald-500">선택</span></div><BlockButton multiple options={['쉬운 설명', '예시', '단계별', '핵심만'].map((item) => ({ label: item, value: item }))} value={styles} onChange={setStyles} className="flex-wrap" /></div>
        <div><div className="mb-2 flex justify-between"><p className="text-xs font-bold text-slate-700">전문 용어</p><span className="text-[11px] text-emerald-500">선택</span></div><ConnectedSegmentedControl options={[{ label: '최소', value: 'min' }, { label: '보통', value: 'normal' }, { label: '적극', value: 'active' }]} value={terms} onChange={setTerms} /></div>
      </div>
    </ExpandableSettingBlock>
  )
}
