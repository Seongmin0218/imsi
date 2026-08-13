import {
  Blocks,
  Clock,
} from 'lucide-react'

import type {
  TutorialCategory,
  TutorialLevel,
} from '../data/tutorials'

import {
  Button,
} from '../../../components/ui/Button'

import {
  Badge,
} from '../../../components/ui/Badge'

import {
  Card,
} from '../../../components/ui/Card'

import {
  getTutorialLevelBadgeVariant,
} from '../utils/tutorialLevelStyle'

export interface TutorialCardData {
  id: number
  title: string
  description: string
  level: TutorialLevel
  categories: TutorialCategory[]
  blockCount: number
  estimatedMinutes: number
}

interface TutorialCardProps {
  tutorial: TutorialCardData
  onStart?: (tutorialId: number) => void
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

export function TutorialCard({
  tutorial,
  onStart,
}: TutorialCardProps) {
  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <WireframeThumbnail />

      <div className="px-6 py-5">
        <h3 className="text-xl font-black tracking-tight text-slate-950">
          {tutorial.title}
        </h3>

        <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
          {tutorial.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge
            variant={getTutorialLevelBadgeVariant(
              tutorial.level,
            )}
            size="sm"
            className="px-3"
          >
            {tutorial.level}
          </Badge>

          {tutorial.categories
            .slice(0, 2)
            .map((category) => (
              <span
                key={category}
                className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
              >
                {category}
              </span>
            ))}
        </div>

        <div className="mt-7 flex items-end justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Blocks size={14} />
              블록 {tutorial.blockCount}
            </span>

            <span className="inline-flex items-center gap-1">
              <Clock size={14} />
              {tutorial.estimatedMinutes}분
            </span>
          </div>

          <Button
            size="sm"
            onClick={() =>
              onStart?.(tutorial.id)
            }
            className="cursor-pointer"
          >
            시작하기
          </Button>
        </div>
      </div>
    </Card>
  )
}