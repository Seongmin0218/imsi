import { Compass } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../../components/ui'
import { BlockButton } from '../components/ui/BlockButton'
import { ConnectedSegmentedControl } from '../components/ui/ConnectedSegmentedControl'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockCard } from '../components/ui/BlockCard'

const usages = [['과제', '📚'], ['회의', '🗣️'], ['발표', '🎥'], ['개발 전달', '💻'], ['보고', '📄'], ['학습', '🎓'], ['공개', '🌐']]

export function ResultUsageBlock() {
  const [usage, setUsage] = useState('')
  const [timing, setTiming] = useState('즉시')
  const [channels, setChannels] = useState<string[]>([])
  const [formality, setFormality] = useState('internal')

  return (
    <ExpandableSettingBlock title="결과 사용 상황 정하기" code="IN-008" stage="INPUT" description="결과물이 쓰일 상황과 매체를 지정해 형식을 맞춥니다." icon={<Compass size={18} />} category="RECOMMENDED" tagCounts={{ required: 1, optional: 3, missing: Number(usage.length === 0) }} required footer={<div className="flex items-center justify-between"><span className="text-xs text-slate-400">{usage ? '사용 상황 선택 완료' : '사용 상황 미선택'}</span><Button size="sm" variant="secondary">검증</Button></div>}>
      <div className="space-y-5">
        <div><p className="mb-2 text-xs font-bold text-slate-700">
          사용 상황 <span className="text-rose-500">*</span>
        </p>
          <div className="space-y-2">
          <BlockCard
              columns={4}
              options={usages.slice(0, 4).map(([label, icon]) => ({ label, value: label, icon: <span>{icon}</span> }))}
              value={usage} onChange={setUsage} />
          <BlockCard
              columns={3}
              options={usages.slice(4).map(([label, icon]) => ({ label, value: label, icon: <span>{icon}</span> }))}
              value={usage} onChange={setUsage} />
          </div>
          {!usage && <p className="mt-2 text-xs font-semibold text-rose-500">⚠ 사용 상황을 선택하세요</p>}
        </div>
        <div>
          <div className="mb-2 flex justify-between">
            <p className="text-xs font-bold text-slate-700">사용 시점</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <BlockButton options={['즉시', '수정 후', '참고'].map((item) => ({ label: item, value: item }))} value={timing} onChange={setTiming} />
        </div>
        <div>
          <div className="mb-2 flex justify-between">
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-bold text-slate-700">전달 매체</p>
              <span className="text-[11px] font-medium text-indigo-500">복수 선택</span>
            </div><span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <BlockButton
            multiple options={['문서', '메신저', '이메일', '발표', 'Notion', '개발 이슈'].map((item) => ({ label: item, value: item }))}
            value={channels} onChange={setChannels} className="flex-wrap" />
        </div>
        <div>
          <div className="mb-2 flex justify-between">
            <p className="text-xs font-bold text-slate-700">공식성</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <ConnectedSegmentedControl
            options={[
              { label: '비공식', value: 'casual' },
              { label: '내부', value: 'internal' },
              { label: '공식', value: 'formal' }]}
            value={formality} onChange={setFormality} />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
