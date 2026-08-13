import { Lightbulb } from 'lucide-react'
import { useState } from 'react'

import { Button, ToggleSwitch } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import {
  DraggableBlock,
  type DraggableBlockItem,
} from '../components/ui/DraggableBlock'

type CardKind = 'role' | 'process' | 'reference' | 'output'

interface SummaryCard {
  id: string
  title: string
  description: string
  badge: string
  kind: CardKind
}

const initialCards: SummaryCard[] = [
  { id: 'analyst', title: '분석가', description: '리뷰를 객관적으로 해석', badge: '역할', kind: 'role' },
  { id: 'summary', title: '핵심 요약', description: '긍정·부정 요점 추출', badge: '프로세스', kind: 'process' },
  { id: 'review-data', title: '리뷰 데이터', description: '← 상세 프롬프트 연결', badge: '참고', kind: 'reference' },
  { id: 'table', title: '표 형식', description: '항목별 빈도표', badge: '출력', kind: 'output' },
]

const badgeClasses: Record<CardKind, string> = {
  role: 'bg-slate-600',
  process: 'bg-indigo-500',
  reference: 'bg-amber-600',
  output: 'bg-emerald-700',
}

export function SummaryPromptLayoutBlock() {
  const [cards, setCards] = useState(initialCards)
  const [showDetails, setShowDetails] = useState(true)
  const [applied, setApplied] = useState(false)

  const items: DraggableBlockItem[] = cards.map((card) => ({
    id: card.id,
    content: (
      <div className="flex min-w-0 items-start justify-between gap-4 py-1">
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-800">{card.title}</p>
          <p className="mt-1.5 text-xs text-slate-400">{card.description}</p>
        </div>
        <span className={`${badgeClasses[card.kind]} shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white`}>
          {card.badge}
        </span>
      </div>
    ),
  }))

  const reorderCards = (orderedItems: DraggableBlockItem[]) => {
    setCards((current) =>
      orderedItems
        .map((item) => current.find((card) => card.id === item.id))
        .filter((card): card is SummaryCard => Boolean(card)),
    )
    setApplied(false)
  }

  const addCard = () => {
    const id = `summary-card-${Date.now()}`
    setCards((current) => [
      ...current,
      {
        id,
        title: `요약 카드 ${current.length + 1}`,
        description: '상세 프롬프트를 연결하세요',
        badge: '역할',
        kind: 'role',
      },
    ])
    setApplied(false)
  }

  return (
    <ExpandableSettingBlock
      title="요약 프롬프트 배치하기"
      code="DR-016"
      stage="PROCESS"
      description="역할·작업·참고·출력 카드를 사각 아이콘으로 구분해 배치합니다. 각 카드에 한 줄 요약을 적고 상세 프롬프트를 연결할 수 있습니다."
      icon={<Lightbulb size={18} />}
      category="RECOMMENDED"
      tagCounts={{ required: 1, optional: 1 }}
      required
      defaultOpen
      validationMessage="* 필수 작성 항목입니다"
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            유형 4종 배치 · 상세 연결 {showDetails ? 1 : 0}개
          </span>
          <Button size="sm" onClick={() => setApplied(true)}>
            {applied ? '적용됨' : '적용'}
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        <div>
          <p className="mb-1 text-sm font-bold text-slate-700">
            요약 카드 <span className="font-medium text-slate-400">· 드래그 정렬</span>{' '}
            <span className="text-rose-500">*</span>
          </p>
          <DraggableBlock
            items={items}
            onChange={reorderCards}
            className="mt-3 [&>div>div]:min-h-[72px]"
          />
          <button
            type="button"
            onClick={addCard}
            className="mt-3 h-11 w-full rounded-xl border-2 border-dashed border-slate-200 text-sm font-semibold text-slate-400 transition hover:border-indigo-300 hover:text-indigo-500"
          >
            + 카드 추가
          </button>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">상세 보기</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              카드별 상세 프롬프트 펼쳐 보기
            </span>
            <ToggleSwitch
              checked={showDetails}
              onChange={(checked) => {
                setShowDetails(checked)
                setApplied(false)
              }}
              size="sm"
            />
          </div>
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
