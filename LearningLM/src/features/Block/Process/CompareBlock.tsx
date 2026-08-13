import { Lightbulb, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button, Slider, TextInput, ToggleSwitch } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { Radio } from '../components/ui/Radio'

interface CompareTarget {
  id: string
  name: string
  value: string
}

interface WeightCriterion {
  id: string
  label: string
  value: number
}

const comparisonMethods = [
  { label: '항목별 비교', value: 'by-item', description: '기준별로 나란히' },
  { label: '장·단점', value: 'pros-cons', description: '장·단점 비교' },
  { label: '공통·차이', value: 'common-difference', description: '공통점과 차이점으로 비교' },
  { label: '점수화', value: 'scoring', description: '점수별로 비교' },
]

const getWeightLevel = (value: number) => {
  if (value < 0.4) return '낮음'
  if (value < 0.7) return '보통'
  return '높음'
}

export function CompareBlock() {
  const [targets, setTargets] = useState<CompareTarget[]>([
    { id: 'a', name: '리뷰 분석가', value: '우리 제품' },
    { id: 'b', name: '요약·비교', value: '경쟁사 X' },
    { id: 'c', name: '연결됨', value: '경쟁사 Y' },
  ])
  const [criteria, setCriteria] = useState<WeightCriterion[]>([
    { id: 'price', label: '가격', value: 0.6 },
    { id: 'performance', label: '성능', value: 0.6 },
    { id: 'support', label: '지원', value: 0.6 },
  ])
  const [method, setMethod] = useState('by-item')
  const [recommendConclusion, setRecommendConclusion] = useState(false)
  const [applied, setApplied] = useState(false)
  const [draggedCriterionIndex, setDraggedCriterionIndex] = useState<number | null>(null)
  const [selectedCriterionId, setSelectedCriterionId] = useState<string | null>(null)

  const updateTarget = (id: string, field: 'name' | 'value', value: string) => {
    setTargets((current) => current.map((target) => target.id === id ? { ...target, [field]: value } : target))
    setApplied(false)
  }

  const addTarget = () => {
    const index = targets.length
    setTargets((current) => [...current, { id: `target-${Date.now()}`, name: '비교 대상', value: `대상 ${index + 1}` }])
    setApplied(false)
  }

  const updateWeight = (id: string, value: number) => {
    setCriteria((current) => current.map((criterion) => criterion.id === id ? { ...criterion, value } : criterion))
    setApplied(false)
  }

  const moveCriterion = (targetIndex: number) => {
    if (draggedCriterionIndex === null || draggedCriterionIndex === targetIndex) return

    setCriteria((current) => {
      const next = [...current]
      const [draggedCriterion] = next.splice(draggedCriterionIndex, 1)
      next.splice(targetIndex, 0, draggedCriterion)
      return next
    })
    setDraggedCriterionIndex(null)
    setApplied(false)
  }

  return (
    <ExpandableSettingBlock
      title="비교하기"
      code="PRO-004"
      stage="PROCESS"
      description="비교 대상과 기준을 각각 카드로 만들어 정렬합니다. 기준마다 가중치 슬라이더로 중요도를 조절할 수 있습니다."
      icon={<Lightbulb size={18} />}
      category="RECOMMENDED"
      tagCounts={{ required: 3, optional: 1 }}
      required
      defaultOpen
      validationMessage="* 필수 작성 항목입니다"
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">대상 {targets.length}개 이상 · 기준 {criteria.length}개 이상 충족</span>
          <Button size="sm" onClick={() => setApplied(true)}>{applied ? '적용됨' : '적용'}</Button>
        </div>
      }
    >
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">비교 대상 <span className="font-medium text-slate-400">· 카드 추가·정렬</span><span className="text-rose-500">*</span></p>
          <div className="space-y-3 border-b-2 border-slate-200 pb-3">
            {targets.map((target, index) => (
              <div key={target.id} draggable className="cursor-grab rounded-2xl border-2 border-slate-200 bg-white p-4 active:cursor-grabbing">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-7 min-w-10 items-center justify-center rounded-lg bg-slate-600 px-2 text-xs font-black text-white">{String.fromCharCode(65 + index)}</span>
                  <input value={target.name} onChange={(event) => updateTarget(target.id, 'name', event.target.value)} draggable={false} className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-800 outline-none focus:text-indigo-600" aria-label={`${index + 1}번째 대상 역할`} />
                </div>
                <TextInput value={target.value} onChange={(value) => updateTarget(target.id, 'value', value)} size="sm" />
              </div>
            ))}
          </div>
          <button type="button" onClick={addTarget} className="mt-3 flex h-12 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-sm font-semibold text-slate-400 hover:border-indigo-300 hover:text-indigo-500"><Plus size={15} className="mr-1" /> 대상 추가</button>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">비교 대상 <span className="font-medium text-slate-400">· 드래그 정렬 + 가중치</span><span className="text-rose-500">*</span></p>
          <div className="space-y-3">
            {criteria.map((criterion, index) => (
              <div
                key={criterion.id}
                draggable
                onDragStart={() => setDraggedCriterionIndex(index)}
                onDragEnd={() => setDraggedCriterionIndex(null)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => moveCriterion(index)}
                onClick={() => setSelectedCriterionId(criterion.id)}
                className={`cursor-grab rounded-2xl bg-white p-5 transition active:cursor-grabbing ${draggedCriterionIndex === index ? 'border-2 border-indigo-400 opacity-50' : selectedCriterionId === criterion.id ? 'border-2 border-indigo-500 shadow-[0_0_0_1px_rgba(99,102,241,0.08)]' : 'border border-slate-200 hover:border-indigo-300'}`}
              >
                <p className="mb-5 text-base font-bold text-slate-800">{criterion.label}</p>
                <div className="rounded-xl border border-indigo-400 px-5 py-4">
                  <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">중요도</span>
                    <span className="font-bold text-indigo-500">{getWeightLevel(criterion.value)}</span>
                  </div>
                  <div draggable={false} onPointerDown={(event) => { event.stopPropagation(); setSelectedCriterionId(criterion.id) }}>
                    <Slider
                      value={criterion.value}
                      onChange={(value) => updateWeight(criterion.id, value)}
                      min={0}
                      max={1}
                      step={0.1}
                      showValue={false}
                      className="[&>div>div]:h-3 [&>div>input]:h-3 [&_input::-webkit-slider-thumb]:h-5 [&_input::-webkit-slider-thumb]:w-5 [&_input::-moz-range-thumb]:h-5 [&_input::-moz-range-thumb]:w-5"
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-3 text-xs">
                    <span className={criterion.value < 0.4 ? 'font-bold text-indigo-500' : 'text-slate-400'}>낮음</span>
                    <span className="text-center text-indigo-500">{criterion.value.toFixed(1)}</span>
                    <span className={criterion.value >= 0.7 ? 'text-right font-bold text-indigo-500' : 'text-right text-slate-400'}>높음</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">비교 방식<span className="text-rose-500">*</span></p>
          <Radio name="comparison-method" options={comparisonMethods} value={method} onChange={(value) => { setMethod(value); setApplied(false) }} />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between"><p className="text-sm font-bold text-slate-700">결론 추천</p><span className="text-[11px] text-emerald-500">선택</span></div>
          <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-700">가중치를 반영해 추천안 제시</span><ToggleSwitch checked={recommendConclusion} onChange={(value) => { setRecommendConclusion(value); setApplied(false) }} size="sm" /></div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
