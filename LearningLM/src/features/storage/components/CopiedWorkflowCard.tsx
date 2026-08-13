import { Copy } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import type { TutorialLevel } from '../../tutorial/data/tutorials'

export interface CopiedWorkflow {
  id: number
  originalWorkflowId: number
  authorName: string
  authorInitial: string
  title: string
  description: string
  level: TutorialLevel
  categories: string[]
}

interface CopiedWorkflowCardProps {
  workflow: CopiedWorkflow
  onViewOriginal: (originalWorkflowId: number) => void
  onEditCopy: (workflowId: number) => void
}

const levelClassMap: Record<TutorialLevel, string> = {
  입문: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  기초: 'border-blue-200 bg-blue-50 text-blue-600',
  응용: 'border-rose-200 bg-rose-50 text-rose-600',
}

export function CopiedWorkflowCard({ workflow, onViewOriginal, onEditCopy }: CopiedWorkflowCardProps) {
  return (
    <Card className="px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500">{workflow.authorInitial}</span>
          <span className="truncate text-xs font-semibold text-slate-500">{workflow.authorName}</span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
          <Copy size={12} /> 복사본
        </span>
      </div>
      <h3 className="mt-5 text-lg font-black tracking-tight text-slate-950">{workflow.title}</h3>
      <p className="mt-2 line-clamp-2 min-h-10 text-sm font-medium leading-5 text-slate-500">{workflow.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={['inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold', levelClassMap[workflow.level]].join(' ')}>{workflow.level}</span>
        {workflow.categories.slice(0, 2).map((category) => (
          <span key={category} className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{category}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
        <button type="button" onClick={() => onViewOriginal(workflow.originalWorkflowId)} className="cursor-pointer text-sm font-black text-indigo-500 transition hover:text-indigo-600">
          원작 흐름 보기 →
        </button>
        <Button variant="link" size="sm" onClick={() => onEditCopy(workflow.id)} className="cursor-pointer">복사본 편집하기 →</Button>
      </div>
    </Card>
  )
}
