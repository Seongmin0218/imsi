import { Network } from 'lucide-react'
import { useState } from 'react'

import { Button, ToggleSwitch } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockButton } from '../components/ui/BlockButton'
import { ConnectedSegmentedControl } from '../components/ui/ConnectedSegmentedControl'

const targets = ['화면', '요구사항', '흐름', '문서']
const levels = [
  { label: '상위', value: 'high' },
  { label: '기본', value: 'basic' },
  { label: '세부', value: 'detail' },
]
const stateValues = ['기능명', '목적', '트리거', '입력', '출력', '상태']

export function FunctionSplitBlock() {
  const [target, setTarget] = useState('화면')
  const [level, setLevel] = useState('basic')
  const [selectedValues, setSelectedValues] = useState(['기능명', '목적'])
  const [groupByScreen, setGroupByScreen] = useState(false)
  const [useAutomaticId, setUseAutomaticId] = useState(false)
  const [showPriority, setShowPriority] = useState(false)

  return (
    <ExpandableSettingBlock
      title="기능으로 분해하기"
      code="PRO-006"
      stage="PROCESS"
      description="대상을 기능 단위로 분해합니다."
      icon={<Network size={18} />}
      category="RECOMMENDED"
      tagCounts={{ required: 3, optional: 2 }}
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
            분해 대상 <span className="text-rose-500">*</span>
          </p>
          <BlockButton
            options={targets.map((item) => ({ label: item, value: item }))}
            value={target}
            onChange={setTarget}
            size="md"
            className="flex-wrap"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            분해 수준 <span className="text-rose-500">*</span>
          </p>
          <ConnectedSegmentedControl
            options={levels}
            value={level}
            onChange={setLevel}
            className="w-full [&>button]:flex-1"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <p className="text-sm font-bold text-slate-700">상태값</p>
              <span className="text-[11px] font-medium text-indigo-500">복수 선택</span>
            </div>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <BlockButton
            multiple
            options={stateValues.map((item) => ({ label: item, value: item }))}
            value={selectedValues}
            onChange={setSelectedValues}
            size="md"
            className="flex-wrap"
          />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">그룹화</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">화면별로 그룹</span>
            <ToggleSwitch checked={groupByScreen} onChange={setGroupByScreen} size="sm" />
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">ID·우선순위</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">자동 ID 부여</span>
              <ToggleSwitch checked={useAutomaticId} onChange={setUseAutomaticId} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">필수·권장 표시</span>
              <ToggleSwitch checked={showPriority} onChange={setShowPriority} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
