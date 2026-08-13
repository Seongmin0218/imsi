import {
  ClipboardList,
  FileSearch,
  GitCompareArrows,
  PenLine,
  Scale,
} from 'lucide-react'
import { useState } from 'react'
import { Checkbox } from '../../features/Block/components/ui/Checkbox'
import { ConnectedSegmentedControl } from '../../features/Block/components/ui/ConnectedSegmentedControl'
import {
  DraggableBlock,
  type DraggableBlockItem,
} from '../../features/Block/components/ui/DraggableBlock'
import { FileDropzone } from '../../features/Block/components/ui/FileDropzone'
import { BlockCard } from '../../features/Block/components/ui/BlockCard'
import { Radio } from '../../features/Block/components/ui/Radio'
import { SelectDropdown } from '../../features/Block/components/ui/SelectDropdown'
import { BlockTag } from '../../features/Block/components/ui/BlockTag'
import { Typography } from '../../features/Block/components/ui/Typography'

const radioOptions = [
  {
    label: '실행 중단',
    value: 'stop',
    description: '필수 입력이 없으면 실행하지 않음',
  },
  {
    label: '경고 후 진행',
    value: 'warning',
    description: '경고만 표시하고 계속 진행',
  },
]

const checkboxOptions = [
  {
    label: '블록 흐름',
    value: 'flow',
    description: '구성 전체',
  },
  {
    label: '예시 결과',
    value: 'preview',
    description: '미리보기',
  },
]

const iconOptions = [
  { label: '파악', value: 'search', icon: <FileSearch size={18} /> },
  { label: '정리', value: 'summary', icon: <ClipboardList size={18} /> },
  { label: '비교', value: 'compare', icon: <Scale size={18} /> },
  { label: '작성', value: 'write', icon: <PenLine size={18} /> },
]

const initialBlocks: DraggableBlockItem[] = [
  {
    id: 'request',
    content: (
      <div>
        <p className="text-sm font-bold text-slate-700">사용자 요청 받기</p>
        <p className="mt-0.5 text-xs text-slate-400">IN-001 · INPUT</p>
      </div>
    ),
  },
  {
    id: 'goal',
    content: (
      <div>
        <p className="text-sm font-bold text-slate-700">목표 정하기</p>
        <p className="mt-0.5 text-xs text-slate-400">IN-002 · INPUT</p>
      </div>
    ),
  },
  {
    id: 'result',
    content: (
      <div>
        <p className="text-sm font-bold text-slate-700">결과 형식 선택</p>
        <p className="mt-0.5 text-xs text-slate-400">OUT-001 · OUTPUT</p>
      </div>
    ),
  },
]

function PreviewCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-lg font-black text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
      {children}
    </section>
  )
}

export function BlockCommonComponentTestPage() {
  const [radioValue, setRadioValue] = useState('stop')
  const [checkboxValues, setCheckboxValues] = useState(['flow'])
  const [iconValue, setIconValue] = useState('summary')
  const [segmentValue, setSegmentValue] = useState('basic')
  const [selectValue, setSelectValue] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [blocks, setBlocks] = useState(initialBlocks)

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-indigo-500">Block UI Playground</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950">
              블록 공통 컴포넌트
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Block에서 사용하는 UI의 기본 상태와 상호작용을 확인합니다.
            </p>
          </div>
          <a
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm hover:border-indigo-200 hover:text-indigo-600"
          >
            입력 블록 화면으로
          </a>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <PreviewCard title="Radio" description="단일 항목 선택">
            <Radio
              name="missing-action-preview"
              title="라디오 카드"
              code="C-03"
              description="실행 조건을 하나만 선택"
              options={radioOptions}
              value={radioValue}
              onChange={setRadioValue}
            />
            <p className="mt-4 text-xs font-semibold text-indigo-500">
              선택값: {radioValue}
            </p>
          </PreviewCard>

          <PreviewCard title="Checkbox" description="여러 항목 선택">
            <Checkbox
              title="체크 카드"
              code="C-04"
              description="설명이 필요한 복수 선택"
              options={checkboxOptions}
              value={checkboxValues}
              onChange={setCheckboxValues}
            />
            <p className="mt-4 text-xs font-semibold text-indigo-500">
              선택값: {checkboxValues.join(', ') || '없음'}
            </p>
          </PreviewCard>

          <PreviewCard title="BlockCard" description="아이콘 카드형 단일 선택">
            <BlockCard
              title="아이콘 선택 카드"
              code="C-06"
              description="아이콘/아바타 단일 선택"
              columns={4}
              options={iconOptions}
              value={iconValue}
              onChange={setIconValue}
            />
          </PreviewCard>

          <PreviewCard
            title="ConnectedSegmentedControl"
            description="연결된 버튼 형태의 모드 선택"
          >
            <ConnectedSegmentedControl
              options={[
                { label: '입문', value: 'intro' },
                { label: '기본', value: 'basic' },
                { label: '실무', value: 'work' },
                { label: '전문', value: 'expert' },
              ]}
              value={segmentValue}
              onChange={setSegmentValue}
            />
          </PreviewCard>

          <PreviewCard title="SelectDropdown" description="옵션이 많은 단일 선택">
            <SelectDropdown
              placeholder="처리 방식을 선택하세요"
              options={[
                { label: '분석 대상', value: 'analysis' },
                { label: '참고 자료', value: 'reference' },
                { label: '제외', value: 'exclude' },
              ]}
              value={selectValue}
              onChange={setSelectValue}
            />
          </PreviewCard>

          <PreviewCard title="BlockTag" description="블록 설정 개수 요약">
            <BlockTag
              counts={{
                required: 2,
                optional: 1,
                recommended: 1,
                missing: 1,
                error: 1,
              }}
            />
          </PreviewCard>

          <PreviewCard title="FileDropzone" description="클릭 또는 드래그 파일 입력">
            <FileDropzone
              accept=".pdf,.doc,.docx,.png,.jpg"
              description="PDF, DOCX, PNG, JPG"
              onFiles={(nextFiles) => setFiles((current) => [...current, ...nextFiles])}
            />
            <div className="mt-3 space-y-1">
              {files.length === 0 ? (
                <p className="text-xs text-slate-400">선택된 파일이 없습니다.</p>
              ) : (
                files.map((file, index) => (
                  <p key={`${file.name}-${index}`} className="text-xs font-semibold text-slate-600">
                    {file.name}
                  </p>
                ))
              )}
            </div>
          </PreviewCard>

          <PreviewCard title="DraggableBlock" description="오른쪽 핸들로 정렬하거나 삭제">
            <DraggableBlock items={blocks} onChange={setBlocks} />
          </PreviewCard>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-5 border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900">Typography</h2>
              <p className="mt-1 text-sm text-slate-400">Block 타이포그래피 스케일</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Typography variant="title2">Title 2 · 블록 제목</Typography>
              <Typography variant="title4">Title 4 · 설정 제목</Typography>
              <Typography variant="body1">Body 1 · 주요 본문 텍스트</Typography>
              <Typography variant="body2-long">
                Body 2 Long · 설명이 길어지는 경우 사용하는 본문 텍스트입니다.
              </Typography>
              <Typography variant="body3">Body 3 · 보조 설명</Typography>
              <Typography variant="caption">Caption · IN-001 · INPUT</Typography>
            </div>
          </section>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
          <GitCompareArrows size={17} />
          선택값을 변경하거나 블록을 드래그해 각 컴포넌트의 동작을 확인할 수 있습니다.
        </div>
      </div>
    </main>
  )
}
