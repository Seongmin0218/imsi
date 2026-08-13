import {
  FileText,
  Lightbulb,
  List,
  Mail,
  Megaphone,
  NotebookText,
  Presentation,
} from 'lucide-react'
import { useState } from 'react'

import { Button, Textarea, TextInput } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockCard } from '../components/ui/BlockCard'
import { ConnectedSegmentedControl } from '../components/ui/ConnectedSegmentedControl'
import { Radio } from '../components/ui/Radio'

const documentTypes = [
  { label: '보고서', value: 'report', icon: <FileText size={17} /> },
  { label: '기획', value: 'plan', icon: <List size={17} /> },
  { label: '기능명세', value: 'specification', icon: <NotebookText size={17} /> },
  { label: '이메일', value: 'email', icon: <Mail size={17} /> },
  { label: '발표', value: 'presentation', icon: <Presentation size={17} /> },
  { label: '안내', value: 'guide', icon: <Megaphone size={17} /> },
  { label: '일반', value: 'general', icon: <Lightbulb size={17} /> },
]

const compositionMethods = [
  { label: '자동', value: 'automatic' },
  { label: '템플릿', value: 'template' },
  { label: '직접 목차', value: 'custom' },
]

const draftLevels = [
  { label: '뼈대', value: 'outline' },
  { label: '수정용', value: 'editing' },
  { label: '거의 완성', value: 'almost-complete' },
]

const emptyInformationOptions = [
  { label: '미정으로 표시', value: 'undecided' },
  { label: '가정으로 채움', value: 'assumption' },
  { label: '질문으로 남김', value: 'question' },
]

export function DraftBlock() {
  const [documentType, setDocumentType] = useState('report')
  const [purpose, setPurpose] = useState('')
  const [compositionMethod, setCompositionMethod] = useState('custom')
  const [sections, setSections] = useState(['', ''])
  const [draftLevel, setDraftLevel] = useState('editing')
  const [emptyInformation, setEmptyInformation] = useState('undecided')
  const [validationAttempted, setValidationAttempted] = useState(false)

  const isCustomComposition = compositionMethod === 'custom'
  const missingCount =
    Number(purpose.trim().length === 0) +
    (isCustomComposition
      ? sections.filter((section) => section.trim().length === 0).length
      : 0)

  const updateSection = (index: number, value: string) => {
    setSections((current) =>
      current.map((section, sectionIndex) =>
        sectionIndex === index ? value : section,
      ),
    )
  }

  const addSection = () => setSections((current) => [...current, ''])

  return (
    <ExpandableSettingBlock
      title="초안 작성하기"
      code="PRO-009"
      stage="PROCESS"
      description="문서 유형과 목차 구성 방식을 정해 초안을 만듭니다."
      icon={<NotebookText size={18} />}
      category="CORE"
      tagCounts={{ required: 3, optional: 2, conditional: 1, missing: validationAttempted ? missingCount : 0 }}
      required
      validationMessage={validationAttempted && missingCount > 0 ? '필수 작성 항목입니다' : undefined}
      defaultOpen
      footer={
        <div className="flex items-center justify-between">
          <span className={validationAttempted && missingCount > 0 ? 'text-xs text-rose-500' : 'text-xs text-slate-400'}>
            {validationAttempted && missingCount > 0 ? `필수 입력 ${missingCount}개를 확인하세요` : '초안 설정을 검증할 수 있습니다'}
          </span>
          <Button size="sm" variant="secondary" onClick={() => setValidationAttempted(true)}>검증</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            문서 유형 <span className="text-rose-500">*</span>
          </p>
          <BlockCard
            columns={4}
            options={documentTypes}
            value={documentType}
            onChange={setDocumentType}
            className="[&_[role=radiogroup]]:grid-cols-12 [&_[role=radiogroup]>button]:col-span-3 [&_[role=radiogroup]>button]:min-h-[88px] [&_[role=radiogroup]>button]:px-2 [&_[role=radiogroup]>button]:py-3 [&_[role=radiogroup]>button:nth-child(n+5)]:col-span-4"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            작성 목적 <span className="text-rose-500">*</span>
          </p>
          {validationAttempted && purpose.trim().length === 0 && (
            <p className="mb-2 text-xs font-medium text-rose-500">
              작성 목적을 입력해주세요
            </p>
          )}
          <Textarea
            value={purpose}
            onChange={setPurpose}
            placeholder="작성 목적을 입력하세요"
            rows={3}
            error={validationAttempted && purpose.trim().length === 0}
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">구성 방식</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <ConnectedSegmentedControl
            options={compositionMethods}
            value={compositionMethod}
            onChange={setCompositionMethod}
          />
        </div>

        {isCustomComposition && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-bold text-slate-700">목차 목록</p>
                <span className="text-[11px] font-medium text-indigo-500">
                  직접 목차 선택됨
                </span>
              </div>
              <span className="text-[11px] text-amber-500">조건부</span>
            </div>
            <div className="space-y-3">
              {sections.map((section, index) => (
                <TextInput
                  key={index}
                  value={section}
                  onChange={(value) => updateSection(index, value)}
                  placeholder="섹션 제목 입력"
                  error={validationAttempted && section.trim().length === 0}
                  leftContent={
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500 text-[11px] font-black text-white">
                      {index + 1}
                    </span>
                  }
                />
              ))}
              <button
                type="button"
                onClick={addSection}
                className="h-11 w-full rounded-xl border-2 border-dashed border-slate-200 text-sm font-semibold text-slate-500 transition hover:border-indigo-300 hover:text-indigo-500"
              >
                + 섹션 추가
              </button>
            </div>
          </div>
        )}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">구성 방식</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <ConnectedSegmentedControl
            options={draftLevels}
            value={draftLevel}
            onChange={setDraftLevel}
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">빈 정보</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <Radio
            name="empty-information"
            options={emptyInformationOptions}
            value={emptyInformation}
            onChange={setEmptyInformation}
            className="[&_[role=radiogroup]>label]:min-h-[48px] [&_[role=radiogroup]>label]:rounded-xl [&_[role=radiogroup]>label]:py-2"
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
