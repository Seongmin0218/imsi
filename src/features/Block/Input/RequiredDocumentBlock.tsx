import { BookOpen } from 'lucide-react'
import { useState } from 'react'
import { Button, ToggleSwitch } from '../../../components/ui'
import { Checkbox } from '../components/ui/Checkbox'
import { Radio } from '../components/ui/Radio'
import { ConnectedSegmentedControl } from '../components/ui/ConnectedSegmentedControl'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'

const sources = [
  { label: '프로젝트 문서', value: 'project', description: '연결된 프로젝트에서 사용' },
  { label: '업로드 문서', value: 'upload', description: '연결된 문서에서 사용' },
  { label: '직접 입력', value: 'direct', description: '사용자가 입력한 텍스트로 사용' },
  { label: '이전 결과', value: 'previous', description: '이전 블록 결과 사용' },
]

const missingOptions = [
  { label: '차단', value: 'block', description: '실행하지 않음' },
  { label: '경고', value: 'warning', description: '경고 후 진행' },
  { label: '직접 입력 대체', value: 'replace', description: '입력창으로 대체' },
]

export function RequiredDocumentBlock() {
  const [source, setSource] = useState<string[]>(['project'])
  const [required, setRequired] = useState(true)
  const [checkTiming, setCheckTiming] = useState('now')
  const [missingAction, setMissingAction] = useState('')
  const missingCount =
    Number(source.length === 0) +
    Number(checkTiming.length === 0) +
    Number(missingAction.length === 0)

  return (
    <ExpandableSettingBlock
      title="필요한 문서 확인하기"
      code="IN-005"
      stage="INPUT"
      description="실행 전 필요한 자료 유형과 없을 때의 처리 방식을 정합니다."
      icon={<BookOpen size={18} />}
      tagCounts={{ required: 3, optional: 1, missing: missingCount }}
      required
      footer={<div className="flex items-center justify-between"><span className="text-xs text-slate-400">{missingCount > 0 ? `필수 옵션 ${missingCount}개 미입력` : '필수 옵션 입력 완료'}</span><Button size="sm" variant="secondary">검증</Button></div>}
    >
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">자료 유형 <span className="text-rose-500">*</span></p>
          <Checkbox
            options={sources}
            value={source}
            onChange={setSource}
            selectionMode="single"
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">
            자료가 있어야 실행 <span className="text-rose-500">*</span>
          </p>
          <ToggleSwitch
            checked={required}
            onChange={setRequired}
            label="필수 자료가 있을 때만 블록 실행"
            description="기본 ON"
            descriptionClassName="!text-indigo-500"
            size="sm"
            className="flex w-full flex-row-reverse justify-between"
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">선택 시점</p>
          <ConnectedSegmentedControl options={[{ label: '지금', value: 'now' }, { label: '실행 전', value: 'before' }]} value={checkTiming} onChange={setCheckTiming} />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">자료 없음 처리 <span className="text-rose-500">*</span></p>
          <Radio name="document-missing-action" options={missingOptions} value={missingAction} onChange={setMissingAction} />
          {!missingAction && <p className="mt-2 text-xs font-semibold text-rose-500">⚠ 처리 방식을 선택하세요</p>}
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
