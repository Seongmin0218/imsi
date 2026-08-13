import { Download } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockButton } from '../components/ui/BlockButton'
import { ConnectedSegmentedControl } from '../components/ui/ConnectedSegmentedControl'
import { DraggableBlock } from '../components/ui/DraggableBlock'
import { FileDropzone } from '../components/ui/FileDropzone'
import { Radio } from '../components/ui/Radio'

const targets = ['기능', '화면', '행동', '데이터']
const policyTypes = ['권한', '상태', '검증', '예외', '저장', '공개']
const matchingMethods = [
  { label: '직접', value: 'direct' },
  { label: '추천', value: 'recommended' },
]
const missingPolicyOptions = [
  { label: '미정으로 표시', value: 'undecided' },
  { label: '질문으로 남김', value: 'question' },
  { label: '제외', value: 'exclude' },
]

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))}KB`
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`
}

function getFileTypeStyle(fileName: string) {
  const extension = fileName.split('.').pop()?.toLowerCase()
  if (extension === 'pdf') return 'border-rose-400 bg-rose-200 text-white'
  if (extension === 'doc' || extension === 'docx') {
    return 'border-blue-500 bg-blue-50 text-blue-600'
  }
  return 'border-slate-300 bg-slate-100 text-slate-600'
}

export function PolicyConnectionBlock() {
  const [target, setTarget] = useState('기능')
  const [files, setFiles] = useState<File[]>([])
  const [types, setTypes] = useState(['권한', '상태'])
  const [matchingMethod, setMatchingMethod] = useState('recommended')
  const [missingPolicy, setMissingPolicy] = useState('undecided')
  const [validationAttempted, setValidationAttempted] = useState(false)

  const missingCount = Number(files.length === 0)

  return (
    <ExpandableSettingBlock
      title="정책과 연결하기"
      code="PRO-007"
      stage="PROCESS"
      description="기능·화면을 정책 문서와 연결합니다."
      icon={<Download size={18} />}
      category="RECOMMENDED"
      tagCounts={{ required: 5, missing: validationAttempted ? missingCount : 0 }}
      required
      validationMessage={validationAttempted && missingCount > 0 ? '필수 작성 항목입니다' : undefined}
      defaultOpen
      footer={
        <div className="flex items-center justify-between">
          <span className={validationAttempted && missingCount > 0 ? 'text-xs text-rose-500' : 'text-xs text-slate-400'}>
            {validationAttempted && missingCount > 0 ? '정책 문서를 선택하세요' : files.length > 0 ? `정책 문서 ${files.length}개 선택됨` : '정책 문서를 검증할 수 있습니다'}
          </span>
          <Button size="sm" variant="secondary" onClick={() => setValidationAttempted(true)}>검증</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            분해 대상 <span className="text-rose-500">*</span>
          </p>
          <BlockButton
            options={targets.map((item) => ({ label: item, value: item }))}
            value={target}
            onChange={setTarget}
            size="md"
            className="flex-wrap"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            정책 문서 <span className="text-rose-500">*</span>
          </p>
          {files.length === 0 ? (
            <FileDropzone
              accept=".pdf,.doc,.docx,.txt"
              multiple={false}
              error={validationAttempted && missingCount > 0}
              description="PDF, DOC, DOCX, TXT"
              onFiles={(nextFiles) => setFiles(nextFiles.slice(0, 1))}
            />
          ) : (
            <div>
              <p className="mb-2 text-sm font-bold text-slate-700">업로드 된 파일</p>
              <DraggableBlock
                items={files.map((file) => ({
                  id: `${file.name}-${file.lastModified}`,
                  content: (
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 text-xs font-black ${getFileTypeStyle(file.name)}`}>
                        {file.name.split('.').pop()?.toUpperCase().slice(0, 4)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-bold text-slate-700" title={file.name}>
                          {file.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-400">
                          {formatFileSize(file.size)}
                        </span>
                      </span>
                    </div>
                  ),
                }))}
                onChange={(items) => {
                  if (items.length === 0) setFiles([])
                }}
                className="[&>div>div]:min-h-[56px] [&>div>div]:rounded-xl [&>div>div]:px-3 [&>div>div]:py-2"
              />
            </div>
          )}
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <p className="text-sm font-bold text-slate-700">
              정책 유형 <span className="text-rose-500">*</span>
            </p>
            <span className="text-[11px] font-medium text-indigo-500">복수 선택</span>
          </div>
          <BlockButton
            multiple
            options={policyTypes.map((item) => ({ label: item, value: item }))}
            value={types}
            onChange={setTypes}
            size="md"
            className="flex-wrap"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            매칭 방식 <span className="text-rose-500">*</span>
          </p>
          <ConnectedSegmentedControl
            options={matchingMethods}
            value={matchingMethod}
            onChange={setMatchingMethod}
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            정책 없음 처리 <span className="text-rose-500">*</span>
          </p>
          <Radio
            name="missing-policy"
            options={missingPolicyOptions}
            value={missingPolicy}
            onChange={setMissingPolicy}
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
