import {
  Archive,
  Lightbulb,
  ListChecks,
  Plus,
  Scale,
  Search,
  Tag,
} from 'lucide-react'
import { useState } from 'react'

import { Button, TextInput, ToggleSwitch } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockCard } from '../components/ui/BlockCard'
import { Radio } from '../components/ui/Radio'

// 분류 기준으로 선택할 수 있는 항목들
const classificationCriteria = [
  { label: '주제', value: 'topic', icon: <Search size={17} /> },
  { label: '유형', value: 'type', icon: <Archive size={17} /> },
  { label: '우선순위', value: 'priority', icon: <Scale size={17} /> },
  { label: '담당자', value: 'owner', icon: <Lightbulb size={17} /> },
  { label: '상태', value: 'status', icon: <Tag size={17} /> },
  { label: '공통점', value: 'commonality', icon: <ListChecks size={17} /> },
  { label: '직접 입력', value: 'custom', icon: <Plus size={17} /> },
]

// 미분류 처리 방법
const uncategorizedOptions = [
  { label: '기타로 모으기', value: 'other' },
  { label: '별도 표시', value: 'separate' },
  { label: '제외', value: 'exclude' },
]

export function CategorizeItemsBlock() {
  // 현재 선택한 분류 기준
  const [criterion, setCriterion] = useState('')
  const [categories, setCategories] = useState(['', ''])
  const [validationAttempted, setValidationAttempted] = useState(false)
  const [allowMultiple, setAllowMultiple] = useState(false)
  const [uncategorized, setUncategorized] = useState('other')

  const completedCategoryCount = categories.filter((category) => category.trim()).length
  const isCustomCriterion = criterion === 'custom'
  const missingCount =
    Number(criterion.length === 0) +
    (isCustomCriterion
      ? categories.filter((category) => !category.trim()).length
      : 0)
  const hasValidationError = validationAttempted && missingCount > 0
  // 특정 순서의 카테고리 이름을 변경하는 함수
  const updateCategory = (index: number, value: string) => {
    setCategories((current) =>
      current.map((category, categoryIndex) =>
        categoryIndex === index ? value : category,
      ),
    )
  }
  // 카테고리 입력칸을 추가하는 함수
  // 최대 7개까지만 추가 가능
  const addCategory = () => {
    if (categories.length < 7) setCategories((current) => [...current, ''])
  }

  return (
    <ExpandableSettingBlock
      title="항목별로 분류하기"
      code="PRO-003"
      stage="PROCESS"
      description="분류 기준을 정하고 카테고리를 구성합니다."
      icon={<ListChecks size={18} />}
      category="CORE"
      tagCounts={{
        required: 2,
        optional: 1,
        missing: hasValidationError ? missingCount : 0,
      }}
      required
      validationMessage={hasValidationError ? '필수 작성 항목입니다' : undefined}
      defaultOpen
      footer={
        <div className="flex items-center justify-between">
          <span className={hasValidationError ? 'text-xs text-rose-500' : 'text-xs text-slate-400'}>
            {hasValidationError
              ? `필수 입력 ${missingCount}개를 확인하세요`
              : isCustomCriterion
                ? `카테고리 ${completedCategoryCount}개 입력됨`
                : criterion
                  ? '분류 기준 선택 완료'
                  : '분류 기준을 선택하세요'}
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setValidationAttempted(true)}
          >
            검증
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 분류 기준 선택 영역 */}
        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            분류 기준 <span className="text-rose-500">*</span>
          </p>
          <BlockCard
            columns={4}
            options={classificationCriteria}
            value={criterion}
            onChange={setCriterion}
            className="[&_button]:min-h-[88px] [&_button]:px-2 [&_button]:py-3"
          />
        </div>
       {/* 직접 입력을 선택했을 때만 카테고리 이름 입력 영역 표시 */}
        {isCustomCriterion && <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <p className="text-sm font-bold text-slate-700">분류 카테고리</p>
              <span className="text-[11px] font-medium text-indigo-500">
                직접 입력 선택됨 · 2개 이상 생성
              </span>
            </div>
            <span className="text-[11px] text-amber-500">조건부</span>
          </div>

          <div className="space-y-3">
            {categories.map((category, index) => (
              <TextInput
                key={index}
                value={category}
                onChange={(value) => updateCategory(index, value)}
                placeholder="카테고리 이름 입력"
                error={validationAttempted && category.trim().length === 0}
                leftContent={
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500 text-[11px] font-black text-white">
                    {index + 1}
                  </span>
                }
              />
            ))}
            <button
              type="button"
              onClick={addCategory}
              disabled={categories.length >= 7}
              className="h-11 w-full rounded-xl border-2 border-dashed border-slate-200 text-sm font-semibold text-slate-500 transition hover:border-indigo-300 hover:text-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              + 카테고리 추가
            </button>
          </div>
        </div>}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">다중 분류</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              한 항목이 여러 카테고리에 소속
            </span>
            <ToggleSwitch checked={allowMultiple} onChange={setAllowMultiple} size="sm" />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            미분류 처리 <span className="text-rose-500">*</span>
          </p>
          <Radio
            name="uncategorized-handling"
            options={uncategorizedOptions}
            value={uncategorized}
            onChange={setUncategorized}
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
