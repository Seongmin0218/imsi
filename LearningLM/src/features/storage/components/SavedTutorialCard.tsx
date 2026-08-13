import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import type { TutorialLevel } from '../../tutorial/data/tutorials'

export interface StorageTutorialCardData {
  id: number
  title: string
  description: string
  level: TutorialLevel
  categories: string[]
  thumbnailUrl: string | null
}

interface StorageTutorialCardProps {
  tutorial: StorageTutorialCardData
  currentStep: number
  totalSteps: number
  status: string
  isRemoving?: boolean
  onContinue: (tutorialId: number) => void
  onRemove: (tutorialId: number) => void
}

const levelClassMap: Record<TutorialLevel, string> = {
  입문: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  기초: 'border-blue-200 bg-blue-50 text-blue-600',
  응용: 'border-rose-200 bg-rose-50 text-rose-600',
}

function WireframeThumbnail() {
  return (
    <div className="relative h-24 overflow-hidden rounded-t-2xl border-b border-slate-300 bg-white">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-px w-[120%] origin-left rotate-[14deg] border-t border-dashed border-slate-300" />
        <div className="absolute bottom-0 left-0 h-px w-[120%] origin-left -rotate-[14deg] border-t border-dashed border-slate-300" />
      </div>
    </div>
  )
}

export function SavedTutorialCard({
  tutorial,
  currentStep,
  totalSteps,
  status,
  isRemoving = false,
  onContinue,
  onRemove,
}: StorageTutorialCardProps) {
  // 별도 상태 배지를 만들지 않고 기존 단계 문구만 진행 상태에 따라 바꾼다.
  const progressText =
    status === 'NOT_STARTED'
      ? '시작 전'
      : status === 'COMPLETED'
        ? '완료'
        : `${currentStep}/${totalSteps} 단계`

  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      {tutorial.thumbnailUrl ? (
        <img
          src={tutorial.thumbnailUrl}
          alt={`${tutorial.title} 썸네일`}
          className="h-24 w-full border-b border-slate-200 object-cover"
        />
      ) : (
        <WireframeThumbnail />
      )}

      <div className="px-6 py-5">
        <h3 className="text-xl font-black tracking-tight text-slate-950">
          {tutorial.title}
        </h3>

        <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
          {tutorial.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span
            className={[
              'inline-flex items-center rounded-lg border px-3 py-1 text-xs font-bold',
              levelClassMap[tutorial.level],
            ].join(' ')}
          >
            {tutorial.level}
          </span>

          {tutorial.categories.slice(0, 2).map((category) => (
            <span
              key={category}
              className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-end justify-between gap-4">
          <span className="text-xs font-semibold text-slate-400">
            {progressText}
          </span>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => onContinue(tutorial.id)}
              className="cursor-pointer"
            >
              이어하기
            </Button>

            <Button
              variant="secondary"
              size="sm"
              disabled={isRemoving}
              onClick={() => onRemove(tutorial.id)}
              className="cursor-pointer"
            >
              {isRemoving ? '해제 중...' : '저장 해제'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
