import { Paperclip } from 'lucide-react'
import { useState } from 'react'
import { Button, Select } from '../../../components/ui'
import { DraggableBlock } from '../components/ui/DraggableBlock'
import { FileDropzone } from '../components/ui/FileDropzone'
import { Radio } from '../components/ui/Radio'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'

interface UploadedFile {
  id: string
  name: string
  size: number
  role: string
  validationError?: string
}

const roleOptions = [
  { label: '분석 대상', value: 'analysis' },
  { label: '참고', value: 'reference' },
  { label: '제외', value: 'exclude' },
]

const missingOptions = [
  { value: 'stop', label: '실행 중지', description: '파일이 없으면 실행하지 않음' },
  { value: 'warn', label: '경고 후 진행', description: '경고만 표시하고 계속' },
]

const allowedExtensions = new Set(['pdf', 'doc', 'docx', 'xls', 'xlsx'])
const maxFileSize = 20 * 1024 * 1024

function getFileValidationError(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
  const isSupportedType = file.type.startsWith('image/') || allowedExtensions.has(extension)

  if (!isSupportedType) return '지원하지 않는 형식입니다. 올바른 형식으로 다시 올려주세요'
  if (file.size > maxFileSize) return '20MB 용량을 초과했습니다. 더 작은 파일로 다시 올려주세요'
  return undefined
}

function getFileTypeStyle(fileName: string, hasError: boolean) {
  if (hasError) return 'border-slate-500 bg-slate-100 text-slate-600'

  const extension = fileName.split('.').pop()?.toLowerCase()

  if (extension === 'pdf') return 'border-rose-400 bg-rose-200 text-white'
  if (extension === 'xls' || extension === 'xlsx') {
    return 'border-emerald-500 bg-emerald-50 text-emerald-600'
  }
  if (extension === 'doc' || extension === 'docx') {
    return 'border-blue-500 bg-blue-50 text-blue-600'
  }
  return 'border-slate-200 bg-slate-100 text-slate-500'
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))}KB`
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`
}

export function FileUploadBlock() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [missingAction, setMissingAction] = useState('stop')
  const validFileCount = files.filter((file) => !file.validationError).length
  const errorCount = files.length - validFileCount
  const missingCount =
    Number(validFileCount === 0) + Number(missingAction.length === 0)

  const addFiles = (incoming: FileList | File[]) => {
    const next = Array.from(incoming).map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      name: file.name,
      size: file.size,
      role: 'analysis',
      validationError: getFileValidationError(file),
    }))
    setFiles((current) => [...current, ...next])
  }

  return (
    <ExpandableSettingBlock
      title="파일 업로드 받기"
      code="IN-004"
      stage="INPUT"
      description="문서·이미지를 드래그해 업로드합니다. 카드별 역할과 우선순위를 정할 수 있습니다."
      icon={<Paperclip size={18} />}
      category="RECOMMENDED"
      tagCounts={{
        required: 2,
        optional: 1,
        sortable: 1,
        missing: missingCount,
        error: errorCount,
      }}
      required
      footer={
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            {errorCount > 0
              ? `오류 파일 ${errorCount}개 — 제거 후 저장하세요`
              : missingCount > 0
                ? `필수 옵션 ${missingCount}개 미입력`
                : '파일 설정 완료'}
          </span>
          <Button size="sm">저장</Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            파일 업로드 <span className="text-rose-500">*</span>
          </p>
          <FileDropzone
            accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
            multiple
            title="파일을 여기에 놓기 또는 찾아보기"
            description="PDF · DOCX · XLSX · 이미지 · 최대 20MB"
            onFiles={addFiles}
          />
        </div>

        {files.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-bold text-slate-700">
              업로드 된 파일
              <span className="font-medium text-slate-300"> · 드래그로 우선순위 변경</span>
            </p>
            <DraggableBlock
              items={files.map((file) => ({
                id: file.id,
                error: Boolean(file.validationError),
                content: (
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={[
                        'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 text-base font-black',
                        getFileTypeStyle(file.name, Boolean(file.validationError)),
                      ].join(' ')}
                    >
                      {file.name.split('.').pop()?.toUpperCase().slice(0, 4)}
                    </span>
                    <span className="min-w-[120px] basis-0 flex-1">
                      <span className="block truncate text-[15px] font-bold text-slate-700" title={file.name}>{file.name}</span>
                      <span className={file.validationError ? 'mt-0.5 block text-[11px] font-medium text-rose-400' : 'mt-0.5 block text-xs text-slate-400'}>
                        {file.validationError ?? formatFileSize(file.size)}
                      </span>
                    </span>
                    {!file.validationError && (
                      <Select
                        size="sm"
                        value={file.role}
                        options={roleOptions}
                        onChange={(role) => setFiles((items) => items.map((item) => item.id === file.id ? { ...item, role } : item))}
                        style={{ fontSize: '11px', lineHeight: '16px' }}
                        className="!w-[118px] shrink-0 [&>select]:!h-[54px] [&>select]:rounded-xl [&>select]:border-2 [&>select]:pl-3 [&>select]:pr-8 [&>select]:font-medium"
                      />
                    )}
                  </div>
                ),
              }))}
              onChange={(orderedItems) =>
                setFiles((current) =>
                  orderedItems
                    .map((item) => current.find((file) => file.id === item.id))
                    .filter((file): file is UploadedFile => Boolean(file)),
                )
              }
            />
          </div>
        )}

        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            누락 시 처리 <span className="text-rose-500">*</span>
          </p>
          <Radio
            name="file-missing-action"
            options={missingOptions}
            value={missingAction}
            onChange={setMissingAction}
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
