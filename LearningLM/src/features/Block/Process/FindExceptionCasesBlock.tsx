import { FileWarning } from 'lucide-react'
import { useState } from 'react'

import { Button, ToggleSwitch } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockButton } from '../components/ui/BlockButton'
import { Checkbox } from '../components/ui/Checkbox'

const exceptionTypes = [
  '빈 상태',
  '입력 오류',
  '네트워크',
  '권한',
  '중복',
  '삭제',
  '한도 초과',
]

const analysisScopes = [
  { label: '선택 기능', value: 'selected' },
  { label: '단계', value: 'step' },
  { label: '전체', value: 'all' },
]

const responseScopes = ['사용자 대응', '시스템 대응', '정책 질문']

export function FindExceptionCasesBlock() {
  const [types, setTypes] = useState(['빈 상태', '입력 오류'])
  const [analysisScope, setAnalysisScope] = useState('all')
  const [showSeverity, setShowSeverity] = useState(false)
  const [responses, setResponses] = useState<string[]>([])

  const missingCount = Number(types.length === 0) + Number(analysisScope.length === 0)

  return (
    <ExpandableSettingBlock
      title="예외 케이스 찾기"
      code="PRO-008"
      stage="PROCESS"
      description="점검할 예외 유형과 범위를 정합니다."
      icon={<FileWarning size={18} />}
      category="RECOMMENDED"
      tagCounts={{ required: 2, optional: 2, missing: missingCount }}
      required
      validationMessage={missingCount > 0 ? '필수 작성 항목입니다' : undefined}
      defaultOpen
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            유형 {types.length}개 선택 · {analysisScope === 'all' ? '전체 범위' : '일부 범위'}
          </span>
          <Button size="sm">적용</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <div className="mb-3 flex items-baseline gap-2">
            <p className="text-sm font-bold text-slate-700">
              제외 유형 <span className="text-rose-500">*</span>
            </p>
            <span className="text-[11px] font-medium text-indigo-500">복수 선택</span>
          </div>
          <Checkbox
            options={exceptionTypes.map((item) => ({ label: item, value: item }))}
            value={types}
            onChange={setTypes}
            className="[&>div>label]:min-h-[48px] [&>div>label]:py-2"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            분석 범위 <span className="text-rose-500">*</span>
          </p>
          <BlockButton
            options={analysisScopes}
            value={analysisScope}
            onChange={setAnalysisScope}
            size="md"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-700">심각도</p>
              <p className="mt-1 text-xs text-slate-500">치명적·주의·경미 구분 표시</p>
              <p className="mt-0.5 text-[11px] text-indigo-500">기본 OFF</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-emerald-500">선택</span>
              <ToggleSwitch checked={showSeverity} onChange={setShowSeverity} size="sm" />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <p className="text-sm font-bold text-slate-700">대응 범위</p>
              <span className="text-[11px] font-medium text-indigo-500">복수 선택</span>
            </div>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <BlockButton
            multiple
            options={responseScopes.map((item) => ({ label: item, value: item }))}
            value={responses}
            onChange={setResponses}
            size="md"
            className="flex-wrap"
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
