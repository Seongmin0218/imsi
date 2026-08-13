import { Lightbulb } from 'lucide-react'
import { useState } from 'react'

import { Button, ToggleSwitch } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockButton } from '../components/ui/BlockButton'
import { BlockCard } from '../components/ui/BlockCard'
import { Radio } from '../components/ui/Radio'

const questionPurposes = ['요구 확인', '정책 확인', '인터뷰', '개발 확인', '누락 점검']

const questionTargets = [
  ['일반', '일'],
  ['학생', '학'],
  ['기획', '기'],
  ['디자인', '디'],
  ['개발', '개'],
]

const questionTypes = ['선택형', '개방형', '확인형', '우선순위']
const countOptions = [
  { label: '3', value: '3' },
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '자동', value: 'auto' },
]

export function QuestionListBlock() {
  const [purpose, setPurpose] = useState('요구 확인')
  const [target, setTarget] = useState('')
  const [questionCount, setQuestionCount] = useState('5')
  const [types, setTypes] = useState<string[]>([])
  const [showRequiredQuestions, setShowRequiredQuestions] = useState(false)
  const [showQuestionReason, setShowQuestionReason] = useState(false)
  const [validationAttempted, setValidationAttempted] = useState(false)

  const missingCount = Number(target.length === 0)

  const changeQuestionCount = (amount: number) => {
    const current = questionCount === 'auto' ? 5 : Number(questionCount)
    setQuestionCount(String(Math.max(1, Math.min(20, current + amount))))
  }

  return (
    <ExpandableSettingBlock
      title="질문 리스트 만들기"
      code="PRO-012"
      stage="PROCESS"
      description="확인이 필요한 질문 목록을 생성합니다."
      icon={<Lightbulb size={18} />}
      category="RECOMMENDED"
      tagCounts={{ required: 3, optional: 2, missing: validationAttempted ? missingCount : 0 }}
      required
      validationMessage={validationAttempted && missingCount > 0 ? '필수 작성 항목입니다' : undefined}
      defaultOpen
      footer={
        <div className="flex items-center justify-between">
          <span className={validationAttempted && missingCount > 0 ? 'text-xs text-rose-500' : 'text-xs text-slate-400'}>
            {validationAttempted && missingCount > 0 ? '질문 대상을 선택하세요' : target ? `${target} 대상 선택됨` : '질문 대상을 검증할 수 있습니다'}
          </span>
          <Button size="sm" variant="secondary" onClick={() => setValidationAttempted(true)}>검증</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            질문 목적 <span className="text-rose-500">*</span>
          </p>
          <Radio
            name="question-purpose"
            options={questionPurposes.map((item) => ({ label: item, value: item }))}
            value={purpose}
            onChange={setPurpose}
            className="[&_[role=radiogroup]>label]:min-h-[48px] [&_[role=radiogroup]>label]:rounded-xl [&_[role=radiogroup]>label]:py-2"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            질문 대상 <span className="text-rose-500">*</span>
          </p>
          {validationAttempted && !target && (
            <p className="mb-3 text-xs font-medium text-rose-500">
              질문 대상을 선택하세요
            </p>
          )}
          <BlockCard
            columns={4}
            options={questionTargets.map(([label, mark]) => ({
              label,
              value: label,
              icon: <span className="font-black">{mark}</span>,
            }))}
            value={target}
            onChange={setTarget}
            className={[
              '[&_button]:min-h-[88px] [&_button]:px-2 [&_button]:py-3',
              validationAttempted && !target ? '[&_button]:border-rose-400' : '',
            ].join(' ')}
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            질문 수 <span className="text-rose-500">*</span>
          </p>
          <div className="mb-3 grid h-10 grid-cols-3 overflow-hidden rounded-xl border-2 border-slate-200 bg-white">
            <button type="button" onClick={() => changeQuestionCount(-1)} className="text-sm font-bold text-slate-600 hover:bg-slate-50">−</button>
            <span className="flex items-center justify-center border-x border-slate-200 text-sm font-bold text-slate-700">
              {questionCount === 'auto' ? '자동' : questionCount}
            </span>
            <button type="button" onClick={() => changeQuestionCount(1)} className="text-sm font-bold text-slate-600 hover:bg-slate-50">+</button>
          </div>
          <BlockButton
            options={countOptions}
            value={questionCount}
            onChange={setQuestionCount}
            size="sm"
            className="w-full [&>button]:flex-1"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <p className="text-sm font-bold text-slate-700">질문 유형</p>
              <span className="text-[11px] font-medium text-indigo-500">복수 선택</span>
            </div>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <BlockButton
            multiple
            options={questionTypes.map((item) => ({ label: item, value: item }))}
            value={types}
            onChange={setTypes}
            size="md"
            className="flex-wrap"
          />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">중요도·배경</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">필수 질문 표시</span>
              <ToggleSwitch checked={showRequiredQuestions} onChange={setShowRequiredQuestions} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">질문 이유 표시</span>
              <ToggleSwitch checked={showQuestionReason} onChange={setShowQuestionReason} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
