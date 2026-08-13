import { Lock, Unlock } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import type { TutorialLevel } from '../../tutorial/data/tutorials'

export interface CreatedWorkflow {
  id: number
  title: string
  description: string
  level: TutorialLevel
  categories: string[]
  visibility: 'public' | 'private'
}

interface CreatedWorkflowCardProps {
  workflow: CreatedWorkflow
  onEdit: (workflowId: number) => void
  onPreview: (workflowId: number) => void
  onToggleVisibility: (workflowId: number) => void
}

const levelClassMap: Record<TutorialLevel, string> = {
  입문: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  기초: 'border-blue-200 bg-blue-50 text-blue-600',
  응용: 'border-rose-200 bg-rose-50 text-rose-600',
}

const visibilityClassMap: Record<CreatedWorkflow['visibility'], string> = {
  public: 'border-emerald-400 bg-emerald-50 text-emerald-600',
  private: 'border-slate-500 bg-slate-50 text-slate-700',
}

export function CreateWorkflowCard({ workflow, onEdit, onPreview, onToggleVisibility }: CreatedWorkflowCardProps) {
  const isPublic = workflow.visibility === 'public'
  const VisibilityIcon = isPublic ? Unlock : Lock

  return (
    <Card className="px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <span className={['inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-bold', visibilityClassMap[workflow.visibility]].join(' ')}>
        <VisibilityIcon size={13} />
        {isPublic ? '공개' : '비공개'}
      </span>
      <h3 className="mt-5 text-lg font-black tracking-tight text-slate-950">{workflow.title}</h3>
      <p className="mt-2 line-clamp-2 min-h-10 text-sm font-medium leading-5 text-slate-500">{workflow.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={['inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold', levelClassMap[workflow.level]].join(' ')}>{workflow.level}</span>
        {workflow.categories.slice(0, 2).map((category) => (
          <span key={category} className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{category}</span>
        ))}
      </div>
      <div className="mt-5 border-t border-slate-200 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => onEdit(workflow.id)}>편집하기</Button>
            <Button variant="secondary" size="sm" onClick={() => onPreview(workflow.id)}>미리보기</Button>
          </div>
          <Button variant="secondary" size="sm" onClick={() => onToggleVisibility(workflow.id)}>
            {isPublic ? '비공개로 전환' : '공개로 전환'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
