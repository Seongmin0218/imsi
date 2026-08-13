import { MoreHorizontal, ShieldAlert } from 'lucide-react'
import { useState } from 'react'

import { Button, SegmentedControl, Select } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockButton } from '../components/ui/BlockButton'

const documentTypes = [
  { label: '요약', value: 'summary' },
  { label: '비교', value: 'comparison' },
  { label: '기능', value: 'features' },
  { label: '일정', value: 'schedule' },
  { label: '체크', value: 'checklist' },
]

const densityOptions = [
  { label: '한 줄', value: 'compact' },
  { label: '짧게', value: 'normal' },
  { label: '자세히', value: 'detailed' },
]

const previewRows = [
  ['가격', '₩29,000', '₩34,000'],
  ['지원', '24시간', '평일'],
]

export function ReconstructTableBlock() {
  const [documentType, setDocumentType] = useState('comparison')
  const [columns, setColumns] = useState(['항목', '제품 A', '제품 B'])
  const [criterion, setCriterion] = useState('ko')
  const [density, setDensity] = useState('normal')
  const [applied, setApplied] = useState(false)
  const [draggedColumnIndex, setDraggedColumnIndex] = useState<number | null>(null)

  const addColumn = () => {
    setColumns((current) => [...current, `제품 ${String.fromCharCode(65 + current.length - 1)}`])
    setApplied(false)
  }

  const removeColumn = (index: number) => {
    setColumns((current) => current.filter((_, columnIndex) => columnIndex !== index))
    setApplied(false)
  }

  const updateColumn = (index: number, value: string) => {
    setColumns((current) =>
      current.map((column, columnIndex) =>
        columnIndex === index ? value : column,
      ),
    )
    setApplied(false)
  }

  const moveColumn = (targetIndex: number) => {
    if (draggedColumnIndex === null || draggedColumnIndex === targetIndex) return

    setColumns((current) => {
      const next = [...current]
      const [draggedColumn] = next.splice(draggedColumnIndex, 1)
      next.splice(targetIndex, 0, draggedColumn)
      return next
    })
    setDraggedColumnIndex(null)
    setApplied(false)
  }

  return (
    <ExpandableSettingBlock
      title="표로 재구성하기"
      code="PRO-010"
      stage="PROCESS"
      description="열 블록을 가로로 끌어 순서를 바꾸고, 행 기준을 정하면 아래 미리보기가 실시간으로 갱신됩니다."
      icon={<ShieldAlert size={18} />}
      category="CORE"
      tagCounts={{ required: 3, optional: 1 }}
      required
      defaultOpen
      validationMessage="* 필수 작성 항목입니다"
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            열 {columns.length}개 이상 · 미리보기 갱신됨
          </span>
          <Button size="sm" variant="outline" onClick={() => setApplied(true)}>
            {applied ? '적용됨' : '적용'}
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            문서 유형 <span className="text-rose-500">*</span>
          </p>
          <BlockButton
            options={documentTypes}
            value={documentType}
            onChange={(value) => {
              setDocumentType(value)
              setApplied(false)
            }}
            size="md"
            className="flex w-full [&>button]:min-w-0 [&>button]:flex-1 [&>button]:px-2"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            열 구성 <span className="font-medium text-slate-400">· 가로 드래그</span>{' '}
            <span className="text-rose-500">*</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {columns.map((column, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => setDraggedColumnIndex(index)}
                onDragEnd={() => setDraggedColumnIndex(null)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => moveColumn(index)}
                className={`cursor-grab overflow-hidden rounded-xl border bg-white shadow-sm transition active:cursor-grabbing ${draggedColumnIndex === index ? 'border-indigo-400 opacity-50' : 'border-slate-200 hover:border-indigo-300'}`}
              >
                <div className="flex h-11 items-center justify-between bg-slate-50 px-3">
                  <input
                    value={column}
                    onChange={(event) => updateColumn(index, event.target.value)}
                    onPointerDown={(event) => event.stopPropagation()}
                    draggable={false}
                    aria-label={`${index + 1}번째 컬럼 이름`}
                    placeholder="컬럼 이름"
                    className="min-w-0 flex-1 bg-transparent text-xs font-bold text-slate-700 outline-none placeholder:text-slate-400 focus:text-indigo-600"
                  />
                  <MoreHorizontal size={15} className="shrink-0 text-slate-400" />
                </div>
                <div className="space-y-2 px-3 py-3">
                  <span className="block h-2 rounded-full bg-slate-100" />
                  <span className="block h-2 w-4/5 rounded-full bg-slate-100" />
                  <span className="block h-2 rounded-full bg-slate-100" />
                </div>
                <button type="button" onClick={() => removeColumn(index)} disabled={columns.length <= 2} className="h-7 w-full border-t border-slate-200 bg-slate-50 text-[10px] text-slate-500 hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-40">
                  삭제하기
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addColumn} className="mt-3 h-11 w-full rounded-xl border-2 border-dashed border-slate-200 text-sm font-semibold text-slate-400 transition hover:border-indigo-300 hover:text-indigo-500">
            + 컬럼 추가
          </button>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            행 기준 <span className="text-rose-500">*</span>
          </p>
          <Select
            value={criterion}
            onChange={(value) => {
              setCriterion(value)
              setApplied(false)
            }}
            options={[
              { label: '한국어', value: 'ko' },
              { label: '영어', value: 'en' },
              { label: '일본어', value: 'ja' },
              { label: '중국어', value: 'zh' },
            ]}
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">셀 길이</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <SegmentedControl
            options={densityOptions}
            value={density}
            onChange={(value) => {
              setDensity(value)
              setApplied(false)
            }}
            size="sm"
            className="flex w-full [&>button]:flex-1"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">미리보기</p>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full table-fixed border-collapse text-left text-xs">
              <thead className="bg-slate-100 text-slate-600">
                <tr>{columns.map((column, index) => <th key={`${column}-head-${index}`} className="border-r border-slate-200 px-3 py-2 font-bold last:border-r-0">{column}</th>)}</tr>
              </thead>
              <tbody className="text-slate-500">
                {previewRows.map((row) => (
                  <tr key={row[0]} className="border-t border-slate-200">
                    {columns.map((_, index) => <td key={`${row[0]}-${index}`} className={`border-r border-slate-200 px-3 last:border-r-0 ${density === 'compact' ? 'py-1.5' : density === 'detailed' ? 'py-4' : 'py-2'}`}>{row[index] ?? '—'}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
