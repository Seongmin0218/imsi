import { Lightbulb, ListChecks, Scale, Search } from 'lucide-react'
import { useState } from 'react'

import { Button, Select, ToggleSwitch } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockButton } from '../components/ui/BlockButton'
import { BlockCard } from '../components/ui/BlockCard'
import { ConnectedSegmentedControl } from '../components/ui/ConnectedSegmentedControl'

const checkPurposes = [
  { label: '실행', value: 'execution', icon: <Search size={17} /> },
  { label: '품질', value: 'quality', icon: <Search size={17} /> },
  { label: '제출', value: 'submission', icon: <Scale size={17} /> },
  { label: 'QA', value: 'qa', icon: <Lightbulb size={17} /> },
]

const detailLevels = [
  { label: '핵심', value: 'core' },
  { label: '기본', value: 'basic' },
  { label: '상세', value: 'detailed' },
]

const statusValues = ['미완료', '진행', '완료', '보류']

export function CheckListBlock() {
  const [purpose, setPurpose] = useState('execution')
  const [detailLevel, setDetailLevel] = useState('basic')
  const [groupCriterion, setGroupCriterion] = useState('step')
  const [status, setStatus] = useState('미완료')
  const [showCompletionCriteria, setShowCompletionCriteria] = useState(false)
  const [showOwner, setShowOwner] = useState(false)

  return (
    <ExpandableSettingBlock
      title="체크리스트로 바꾸기"
      code="PRO-011"
      stage="PROCESS"
      description="내용을 점검 가능한 체크리스트로 변환합니다."
      icon={<ListChecks size={18} />}
      category="RECOMMENDED"
      tagCounts={{ required: 2, optional: 3 }}
      required
      defaultOpen
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">기본값으로 적용 가능</span>
          <Button size="sm">적용</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            체크 목적 <span className="text-rose-500">*</span>
          </p>
          <BlockCard
            columns={4}
            options={checkPurposes}
            value={purpose}
            onChange={setPurpose}
            className="[&_button]:min-h-[88px] [&_button]:px-2 [&_button]:py-3"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            상세 수준 <span className="text-rose-500">*</span>
          </p>
          <ConnectedSegmentedControl
            options={detailLevels}
            value={detailLevel}
            onChange={setDetailLevel}
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">그룹 기준</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <Select
            value={groupCriterion}
            onChange={setGroupCriterion}
            options={[
              { label: '단계', value: 'step' },
              { label: '담당자', value: 'owner' },
              { label: '우선순위', value: 'priority' },
              { label: '상태', value: 'status' },
            ]}
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">상태값</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <BlockButton
            options={statusValues.map((item) => ({ label: item, value: item }))}
            value={status}
            onChange={setStatus}
            size="md"
            className="flex-wrap"
          />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">부가 열</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">완료 기준 열</span>
              <ToggleSwitch checked={showCompletionCriteria} onChange={setShowCompletionCriteria} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">담당자 열</span>
              <ToggleSwitch checked={showOwner} onChange={setShowOwner} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
