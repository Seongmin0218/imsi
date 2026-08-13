import { GripVertical } from 'lucide-react'
import { useState, type ReactNode } from 'react'

export interface DraggableBlockItem {
  id: string
  content: ReactNode
  disabled?: boolean
  error?: boolean
}

interface DraggableBlockProps {
  items: DraggableBlockItem[]
  onChange: (items: DraggableBlockItem[]) => void
  onDelete?: (item: DraggableBlockItem) => void
  deleteLabel?: string
  disabled?: boolean
  className?: string
}

export function DraggableBlock({
  items,
  onChange,
  onDelete,
  deleteLabel = '삭제',
  disabled = false,
  className = '',
}: DraggableBlockProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const move = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return

    const sourceIndex = items.findIndex((item) => item.id === sourceId)
    const targetIndex = items.findIndex((item) => item.id === targetId)
    if (sourceIndex < 0 || targetIndex < 0) return

    const next = [...items]
    const [moved] = next.splice(sourceIndex, 1)
    next.splice(targetIndex, 0, moved)
    onChange(next)
  }

  const remove = (item: DraggableBlockItem) => {
    onChange(items.filter((candidate) => candidate.id !== item.id))
    onDelete?.(item)
    setActiveId(null)
  }

  return (
    <div className={['space-y-2', className].join(' ')}>
      {items.map((item) => {
        const itemDisabled = disabled || item.disabled
        const isActive = activeId === item.id

        return (
          <div key={item.id} className="flex items-stretch gap-2">
            <div
              draggable={!itemDisabled}
              onDragStart={(event) => {
                setDraggedId(item.id)
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.setData('text/plain', item.id)
              }}
              onDragEnd={() => setDraggedId(null)}
              onDragOver={(event) => {
                event.preventDefault()
                event.dataTransfer.dropEffect = 'move'
              }}
              onDragEnter={() => {
                if (draggedId) move(draggedId, item.id)
              }}
              onDrop={(event) => {
                event.preventDefault()
                setDraggedId(null)
              }}
              className={[
                'flex min-h-[76px] min-w-0 flex-1 cursor-grab items-center gap-3 rounded-2xl border-2 bg-white px-4 py-3 transition active:cursor-grabbing',
                draggedId === item.id
                  ? 'border-indigo-300 opacity-50'
                  : item.error
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-slate-200',
                itemDisabled ? 'opacity-50' : '',
              ].join(' ')}
            >
              <div className="min-w-0 flex-1">{item.content}</div>
              <button
                type="button"
                draggable={false}
                aria-label="블록 작업 메뉴"
                aria-expanded={isActive}
                disabled={itemDisabled}
                onClick={() =>
                  setActiveId((current) => (current === item.id ? null : item.id))
                }
                className="shrink-0 cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed"
              >
                <GripVertical size={21} strokeWidth={3} />
              </button>
            </div>

            <button
              type="button"
              aria-label={`블록 ${deleteLabel}`}
              onClick={() => remove(item)}
              className={[
                'overflow-hidden rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 transition-all hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500',
                isActive
                  ? 'w-14 translate-x-0 opacity-100'
                  : 'pointer-events-none w-0 translate-x-2 border-0 opacity-0',
              ].join(' ')}
            >
              {deleteLabel}
            </button>
          </div>
        )
      })}
    </div>
  )
}
