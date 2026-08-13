import {
  Copy,
  Heart,
  MessageCircle,
} from 'lucide-react'

import { Card } from '../../../components/ui/Card'

import type { LibraryLevel } from '../data/libraryData'

export interface LibraryCardItem {
  id: number
  authorName: string
  authorInitial: string
  title: string
  description: string
  level: LibraryLevel
  categories: string[]
  saves: number
  copies: number
  comments: number
  isLiked: boolean
}

const levelClassMap: Record<LibraryLevel, string> = {
  입문: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  기초: 'border-blue-200 bg-blue-50 text-blue-600',
  응용: 'border-rose-200 bg-rose-50 text-rose-600',
}

interface LibraryCardProps {
  item: LibraryCardItem
  onClick: (libraryId: number) => void
}

export function LibraryCard({
  item,
  onClick,
}: LibraryCardProps) {
  return (
    <Card className="px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500">
          {item.authorInitial}
        </span>

        <span className="text-xs font-semibold text-slate-500">
          {item.authorName}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-black tracking-tight text-slate-950">
        {item.title}
      </h3>

      <p className="mt-2 line-clamp-2 min-h-10 text-sm font-medium leading-5 text-slate-500">
        {item.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={[
            'inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold',
            levelClassMap[item.level],
          ].join(' ')}
        >
          {item.level}
        </span>

        {item.categories.slice(0, 2).map((category) => (
          <span
            key={category}
            className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1">
            <Heart
              size={13}
              fill={item.isLiked ? 'currentColor' : 'none'}
            />
            {item.saves}
          </span>

          <span className="flex items-center gap-1">
            <Copy size={13} />
            {item.copies}
          </span>

          <span className="flex items-center gap-1">
            <MessageCircle size={13} />
            {item.comments}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onClick(item.id)}
          className="cursor-pointer text-sm font-black text-indigo-500 transition hover:text-indigo-600"
        >
          복사해서 시작 →
        </button>
      </div>
    </Card>
  )
}
