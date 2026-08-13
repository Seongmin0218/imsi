import { Puzzle } from 'lucide-react'
import { useState } from 'react'

import { Button, Select, StatusBadge, Textarea } from '../../../components/ui'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'
import { BlockCard } from '../components/ui/BlockCard'
import { ConnectedSegmentedControl } from '../components/ui/ConnectedSegmentedControl'

const skillProfiles = [
  ['요약가', '일'],
  ['기획자', '학'],
  ['개발자', '기'],
  ['작성자', '일'],
  ['분석가', '학'],
  ['리뷰어', '리'],
]

const executionIntensities = [
  { label: '빠르게', value: 'fast' },
  { label: '균형', value: 'balanced' },
  { label: '정밀', value: 'precise' },
]

export function SkillCallBlock() {
  const [profile, setProfile] = useState('요약가')
  const [purpose, setPurpose] = useState('')
  const [executionIntensity, setExecutionIntensity] = useState('balanced')
  const [resultDelivery, setResultDelivery] = useState('next-block')
  const [validationAttempted, setValidationAttempted] = useState(false)

  const missingCount = Number(purpose.trim().length === 0)

  return (
    <ExpandableSettingBlock
      title="특정 스킬 호출하기"
      code="PRO-013"
      stage="PROCESS"
      description="프리셋 스킬을 불러와 이전 결과에 적용합니다."
      icon={<Puzzle size={18} />}
      category="CORE"
      tagCounts={{ required: 3, optional: 2, recommended: 1, missing: validationAttempted ? missingCount : 0 }}
      required
      validationMessage={validationAttempted && missingCount > 0 ? '필수 작성 항목입니다' : undefined}
      defaultOpen
      footer={
        <div className="flex items-center justify-between">
          <span className={validationAttempted && missingCount > 0 ? 'text-xs text-rose-500' : 'text-xs text-slate-400'}>
            {validationAttempted && missingCount > 0 ? '수행 목적을 입력하세요' : '스킬 설정을 적용할 수 있습니다'}
          </span>
          <Button size="sm" variant="secondary" onClick={() => setValidationAttempted(true)}>적용</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">
              스킬 프로필 <span className="text-rose-500">*</span>
            </p>
            <StatusBadge variant="recommended">튜토리얼 추천</StatusBadge>
          </div>
          <BlockCard
            columns={3}
            options={skillProfiles.map(([label, mark]) => ({
              label,
              value: label,
              icon: <span className="font-black">{mark}</span>,
            }))}
            value={profile}
            onChange={setProfile}
            className="[&_button]:min-h-[92px] [&_button]:px-2 [&_button]:py-3"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            수행 목적 <span className="text-rose-500">*</span>
          </p>
          {validationAttempted && missingCount > 0 && (
            <p className="mb-2 text-xs font-medium text-rose-500">
              스킬을 사용하는 이유를 작성해주세요
            </p>
          )}
          <Textarea
            value={purpose}
            onChange={setPurpose}
            placeholder="이 스킬을 사용하는 이유"
            rows={3}
            error={validationAttempted && missingCount > 0}
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-slate-700">
            적용 대상 <span className="text-rose-500">*</span>
          </p>
          <div className="flex min-h-[64px] items-center justify-between rounded-xl border-2 border-slate-200 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="h-4 w-4 shrink-0 rounded-full bg-indigo-500" />
              <span className="min-w-0">
                <span className="block text-sm font-bold text-slate-700">이전 블록 결과</span>
                <span className="mt-0.5 block truncate text-[11px] text-slate-400">
                  연결 코드 — 현재 입력 / 선택 문서 / 이전 결과
                </span>
              </span>
            </div>
            <span className="shrink-0 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-bold text-white">
              연결됨
            </span>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">수행 강도</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <ConnectedSegmentedControl
            options={executionIntensities}
            value={executionIntensity}
            onChange={setExecutionIntensity}
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">결과 전달</p>
            <span className="text-[11px] text-emerald-500">선택</span>
          </div>
          <Select
            value={resultDelivery}
            onChange={setResultDelivery}
            options={[
              { label: '다음 블록', value: 'next-block' },
              { label: '현재 블록에 저장', value: 'current-block' },
              { label: '새 결과로 생성', value: 'new-result' },
            ]}
          />
        </div>
      </div>
    </ExpandableSettingBlock>
  )
}
