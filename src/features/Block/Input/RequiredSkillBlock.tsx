import { BriefcaseBusiness } from 'lucide-react'
import { useState } from 'react'
import {
  Button,
  ToggleSwitch,
} from '../../../components/ui'
import { BlockButton } from '../components/ui/BlockButton'
import { Radio } from '../components/ui/Radio'
import { ExpandableSettingBlock } from '../components/layouts/ExpandableSettingBlock'

const skillTypes = ['추출', '요약', '분류', '비교', '작성', '표', '질문', '검토']

const skillDescriptions: Record<string, string> = {
  추출: '필요한 정보만 골라내기',
  요약: '핵심을 짧게 정리',
  분류: '기준에 따라 항목 나누기',
  비교: '항목 간 차이 분석',
  작성: '목적에 맞는 결과 작성',
  표: '내용을 표 형태로 구성',
  질문: '확인할 질문 만들기',
  검토: '내용의 오류와 품질 확인',
}

export function RequiredSkillBlock() {
  const [skillTypesSelected, setSkillTypesSelected] = useState<string[]>(['요약'])
  const [mainSkill, setMainSkill] = useState('요약')
  const [showRecommendation, setShowRecommendation] = useState(true)
  const orderedSkills = mainSkill
    ? [
      mainSkill,
      ...skillTypesSelected.filter((skill) => skill !== mainSkill),
    ]
    : skillTypesSelected

  const handleSkillTypesChange = (nextSkills: string[]) => {
    setSkillTypesSelected(nextSkills)
    if (!nextSkills.includes(mainSkill)) {
      setMainSkill(nextSkills[0] ?? '')
    }
  }

  return (
    <ExpandableSettingBlock
      title="필요한 스킬 확인하기"
      code="IN-006"
      stage="INPUT"
      description="작업 유형을 복수로 고른 뒤 대표 스킬 1개를 지정합니다. 수행 순서는 세로 목록처럼 정렬합니다."
      icon={<BriefcaseBusiness size={18} />}
      tagCounts={{
        required: 2,
        optional: 1,
        sortable: 1,
        recommended: Number(showRecommendation),
        missing: Number(skillTypesSelected.length === 0) + Number(mainSkill.length === 0),
      }}
      required
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {mainSkill ? `대표 스킬 ${mainSkill} · 순서 ${orderedSkills.length}단계` : '대표 스킬을 선택하세요'}
          </span>
          <Button size="sm">
            적용
          </Button>
        </div>}
    >
      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-baseline gap-2">
            <p className="text-xs font-bold text-slate-700">작업 유형 <span className="text-rose-500">*</span></p>
            <span className="text-[11px] font-medium text-indigo-500">복수 선택</span>
          </div>
          <BlockButton
            multiple
            options={skillTypes.map((item) => ({ label: item, value: item }))}
            value={skillTypesSelected}
            onChange={handleSkillTypesChange}
            variant="bare"
            className="flex-wrap"
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">주요 스킬 <span className="text-rose-500">*</span></p>
          {skillTypesSelected.length > 0 ? (
            <Radio
              name="main-skill"
              options={skillTypesSelected.map((skill) => ({
                label: skill,
                value: skill,
                description: skillDescriptions[skill],
              }))}
              value={mainSkill}
              onChange={setMainSkill}
            />
          ) : (
            <p className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-5 text-center text-xs text-slate-400">
              작업 유형을 먼저 선택하세요.
            </p>
          )}
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-slate-700">스킬 순서 · 위에서 아래로 수행</p>
          <div className="space-y-2">
            {orderedSkills.map((skill, index) => (
              <div
                key={skill}
                className="flex min-h-[76px] items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3"
              >
                <span
                  className={[
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white',
                    index === 0 ? 'bg-indigo-500' : 'bg-cyan-600',
                  ].join(' ')}
                >
                  {index + 1}
                </span>
                <span>
                  <b className="block text-sm text-slate-800">{skill}</b>
                  <span className="mt-1 block text-xs text-slate-400">
                    {skillDescriptions[skill]}
                  </span>
                </span>
              </div>
            ))}

            {showRecommendation && (
              <>
                <div className="my-4 h-1 rounded-full bg-indigo-500" />
                <div className="flex min-h-[76px] items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-xs font-bold text-white">
                    {orderedSkills.length + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <b className="block text-sm text-slate-800">표 재구성</b>
                      <span className="text-[11px] font-medium text-indigo-500">
                        추천
                      </span>
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">
                      비교 결과를 표로
                    </span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between"><div><p className="text-xs font-bold text-slate-700">추천 템플릿 표시</p><p className="mt-1 text-xs font-semibold text-slate-700">구분 바 아래 추천 스킬 표시</p></div><ToggleSwitch checked={showRecommendation} onChange={setShowRecommendation} size="sm" /></div>
      </div>
    </ExpandableSettingBlock>
  )
}
