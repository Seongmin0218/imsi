import { ImageIcon } from 'lucide-react'
import type { HTMLAttributes } from 'react'

type ThumbnailVariant = 'hero' | 'tutorial' | 'workflow' | 'compact' | 'empty'

interface ThumbnailBoxProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  label?: string
  variant?: ThumbnailVariant
}

const variantClass: Record<ThumbnailVariant, string> = {
  hero: 'min-h-56',
  tutorial: 'h-32',
  workflow: 'h-24',
  compact: 'h-20 w-28 shrink-0',
  empty: 'h-24',
}

export function ThumbnailBox({
  src,
  alt = '',
  label = '썸네일 이미지',
  variant = 'empty',
  className = '',
  ...props
}: ThumbnailBoxProps) {
  return (
    <div
      className={[
        'flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-slate-400',
        variantClass[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-xs font-medium">
          <ImageIcon size={22} strokeWidth={1.8} />
          <span>{label}</span>
        </div>
      )}
    </div>
  )
}
