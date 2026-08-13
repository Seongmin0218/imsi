import { Upload } from 'lucide-react'
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
} from 'react'

interface FileDropzoneProps {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  title?: ReactNode
  description?: ReactNode
  error?: boolean
  className?: string
}

export function FileDropzone({
  onFiles,
  accept,
  multiple = true,
  disabled = false,
  title = '파일을 여기로 드래그하거나 클릭해 선택하세요',
  description,
  error = false,
  className = '',
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const emitFiles = (files: FileList | null) => {
    if (!disabled && files?.length) onFiles(Array.from(files))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    emitFiles(event.target.files)
    event.target.value = ''
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    emitFiles(event.dataTransfer.files)
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
      />
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(event) => {
          if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault()
          if (!disabled) setIsDragging(true)
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={[
          'flex min-h-32 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-6 text-center outline-none transition focus-visible:ring-4',
          error
            ? 'border-rose-300 bg-rose-50 focus-visible:ring-rose-100'
            : isDragging
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-slate-300 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 focus-visible:ring-indigo-100',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          className,
        ].join(' ')}
      >
        <Upload size={24} className={error ? 'text-rose-500' : 'text-indigo-500'} />
        <span className="mt-3 text-sm font-black text-slate-700">{title}</span>
        {description && (
          <span className="mt-1 text-xs text-slate-400">{description}</span>
        )}
      </div>
    </>
  )
}
