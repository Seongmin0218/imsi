import {
  Archive,
  Clock3,
  Lightbulb,
  ListOrdered,
  Scale,
  Tag,
} from 'lucide-react'
import { useState } from 'react'

import { Button, TextInput, ToggleSwitch } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockCard } from '../components/ui/BlockCard'
import {
  DraggableBlock,
  type DraggableBlockItem,
} from '../components/ui/DraggableBlock'
import { Radio } from '../components/ui/Radio'

const sortingCriteria = [
  { label: '시간', value: 'time', icon: <Clock3 size={17} /> },
  { label: '작업', value: 'task', icon: <Archive size={17} /> },
  { label: '중요도', value: 'importance', icon: <Scale size={17} /> },
  { label: '선호', value: 'preference', icon: <Lightbulb size={17} /> },
  { label: '직접', value: 'custom', icon: <Tag size={17} /> },
]

const arrangementTypes = [
  { label: '번호 목록', value: 'numbered', description: '텍스트 형식 출력' },
  { label: '단계', value: 'steps', description: '목록 형식 출력' },
  { label: '타임라인', value: 'timeline', description: '행위 구조로 출력' },
  { label: '절차도', value: 'flowchart', description: '개념 코드 출력' },
]

interface Stage {
  id: string
  title: string
  description: string
}

const initialStages: Stage[] = [
  { id: 'collect', title: '자료 수집', description: '관련 문서 모으기' },
  { id: 'organize', title: '핵심 정리', description: '요점 추출' },
  { id: 'conclude', title: '결론 도출', description: '판단·정리' },
]

export function ArrangeInOrderBlock() {
  const [criterion, setCriterion] = useState('time')
  const [arrangementType, setArrangementType] = useState('timeline')
  const [stages, setStages] = useState(initialStages)
  const [editingStageId, setEditingStageId] = useState<string | null>(null)
  const [showSelectedConditions, setShowSelectedConditions] = useState(true)
  const [showEstimatedResult, setShowEstimatedResult] = useState(false)

  const updateStage = (
    id: string,
    field: 'title' | 'description',
    value: string,
  ) => {
    setStages((current) =>
      current.map((stage) =>
        stage.id === id ? { ...stage, [field]: value } : stage,
      ),
    )
  }

  const draggableStages: DraggableBlockItem[] = stages.map((stage, index) => ({
    id: stage.id,
    content: (
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-500 text-xs font-black text-white">
          {index + 1}
        </span>
        {editingStageId === stage.id ? (
          <span
            className="min-w-0 flex-1 space-y-2"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <TextInput
              value={stage.title}
              onChange={(value) => updateStage(stage.id, 'title', value)}
              placeholder="단계 이름 입력"
              size="sm"
              autoFocus
            />
            <TextInput
              value={stage.description}
              onChange={(value) => updateStage(stage.id, 'description', value)}
              placeholder="단계 설명 입력"
              size="sm"
            />
            <button
              type="button"
              onClick={() => setEditingStageId(null)}
              className="text-xs font-bold text-indigo-500 hover:text-indigo-600"
            >
              편집 완료
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setEditingStageId(stage.id)}
            className="min-w-0 flex-1 text-left"
          >
            <span className="block text-sm font-bold text-slate-700">
              {stage.title || '단계 이름 입력'}
            </span>
            <span className="mt-0.5 block text-xs text-slate-400">
              {stage.description || '단계 설명 입력'}
            </span>
          </button>
        )}
      </div>
    ),
  }))

  const reorderStages = (items: DraggableBlockItem[]) => {
    setStages((current) =>
      items
        .map((item) => current.find((stage) => stage.id === item.id))
        .filter((stage): stage is Stage => Boolean(stage)),
    )
  }

  const addStage = () => {
    const id = `stage-${Date.now()}`
    setStages((current) => [
      ...current,
      {
        id,
        title: '',
        description: '',
      },
    ])
    setEditingStageId(id)
  }

  return (
    <ExpandableSettingBlock
      title="순서대로 정리하기"
      code="PRO-005"
      stage="PROCESS"
      description="단계 카드를 끌어 순서를 지정합니다. 드래그 중 원래 위치에는 반투명 placeholder가, 놓을 위치에는 삽입선이 표시됩니다."
      icon={<ListOrdered size={18} />}
      category="CORE"
      tagCounts={{ required: 2, optional: 2 }}
      required
      defaultOpen
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {arrangementType === 'timeline'
              ? `타임라인 · ${stages.length}단계 배치 중`
              : `${stages.length}단계 배치 중`}
          </span>
          <Button size="sm">적용</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            정렬 기준 <span className="text-rose-500">*</span>
          </p>
          <BlockCard
            columns={4}
            options={sortingCriteria}
            value={criterion}
            onChange={setCriterion}
            className="[&_button]:min-h-[88px] [&_button]:px-2 [&_button]:py-3"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            정리 형태 <span className="text-rose-500">*</span>
          </p>
          <Radio
            name="arrangement-type"
            options={arrangementTypes}
            value={arrangementType}
            onChange={setArrangementType}
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">단계 목록</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <p className="mb-3 text-xs text-slate-500">드래그 정렬 중</p>
          <DraggableBlock
            items={draggableStages}
            onChange={reorderStages}
            className="[&>div>div]:min-h-[66px]"
          />
          <button
            type="button"
            onClick={addStage}
            className="mt-3 h-11 w-full rounded-xl border-2 border-dashed border-slate-200 text-sm font-semibold text-slate-500 transition hover:border-indigo-300 hover:text-indigo-500"
          >
            + 단계 추가
          </button>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">단계 옵션</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">선택 조건 표시</span>
              <ToggleSwitch checked={showSelectedConditions} onChange={setShowSelectedConditions} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">예상 결과 표시</span>
              <ToggleSwitch checked={showEstimatedResult} onChange={setShowEstimatedResult} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
