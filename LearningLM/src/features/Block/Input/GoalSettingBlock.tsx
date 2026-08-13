import { useState } from 'react'
import {
  BarChart3,
  CheckSquare2,
  FilePenLine,
  GitCompareArrows,
  Lightbulb,
  Plus,
  Search,
  SearchCheck,
  Target,
} from 'lucide-react'
import {
  Button,
  Textarea,
} from '../../../components/ui'
import { BlockButton } from '../components/ui/BlockButton'
import { ConditionalSection } from '../components/layouts/ConditionalSection'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockCard } from '../components/ui/BlockCard'
import { Typography } from '../components/ui/Typography'

const goalTypes = [
  { label: '정보 파악', icon: Search },
  { label: '정리', icon: BarChart3 },
  { label: '비교', icon: GitCompareArrows },
  { label: '아이디어', icon: Lightbulb },
  { label: '작성', icon: FilePenLine },
  { label: '검토', icon: SearchCheck },
  { label: '의사결정', icon: CheckSquare2 },
  { label: '직접 입력', icon: Plus },
]

const priorities = ['정확성', '속도', '간결성', '완성도']

export function GoalSettingBlock() {
  const [goalType, setGoalType] = useState('직접 입력')
  const [description, setDescription] = useState('')
  const [completionRule, setCompletionRule] = useState('')
  const [priority, setPriority] = useState('정확성')
  const isCustomGoal = goalType === '직접 입력'
  const missingCount = Number(isCustomGoal && description.trim().length === 0)

  return (
    <ExpandableSettingBlock
      title="목표 정하기"
      code="IN-002"
      stage="INPUT"
      description="이번 작업의 목표 유형을 정하고 완료 기준을 지정합니다."
      icon={<Target size={18} />}
      tagCounts={{
        required: 1,
        optional: 2,
        conditional: Number(isCustomGoal),
        missing: missingCount,
      }}
      required
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {missingCount > 0 ? '목표 유형 선택됨 · 설명 입력 대기' : '목표 설정 완료'}
          </span>
          <Button size="sm">적용</Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <Typography variant="body2-long" weight="bold" className="mb-2 text-slate-700">
            작업 목표 <span className="text-rose-500">*</span>
          </Typography>
          <BlockCard
            columns={4}
            options={goalTypes.map(({ label, icon: Icon }) => ({
              label,
              value: label,
              icon: <Icon size={17} />,
            }))}
            value={goalType}
            onChange={setGoalType}
          />
        </div>

        <ConditionalSection
          title="목표 설정"
          selectedLabel="직접 입력"
          visible={isCustomGoal}
        >
          <label>
            <Textarea
              value={description}
              onChange={setDescription}
              placeholder="목표를 한 줄로 설명하세요"
              rows={2}
            />
          </label>
        </ConditionalSection>

        <label className="block">
          <Typography
            as="span"
            variant="body2-long"
            weight="bold"
            className="mb-[25px] flex items-center justify-between text-slate-700"
          >
            <span>완료 기준</span>
            <span className="text-[11px] font-normal text-emerald-500">선택</span>
          </Typography>
          <Textarea
            value={completionRule}
            onChange={setCompletionRule}
            placeholder="예: 비교표가 완성되면 종료"
            rows={2}
          />
        </label>

        <div>
          <Typography
            variant="body2-long"
            weight="bold"
            className="mb-4 flex items-center justify-between text-slate-700"
          >
            <span>우선 기준</span>
            <span className="text-[11px] font-normal text-emerald-500">선택</span>
          </Typography>
          <BlockButton
            options={priorities.map((item) => ({ label: item, value: item }))}
            value={priority}
            onChange={setPriority}
            variant="bare"
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
