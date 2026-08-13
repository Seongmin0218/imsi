import {
  FileUploadBlock,
  GoalSettingBlock,
  TopicInputBlock,
  UserRequestBlock,
  RequiredDocumentBlock,
  RequiredSkillBlock,
  TargetAudienceBlock,
  ResultUsageBlock,
  ConstraintInputBlock,
} from '../../features/Block/Input'

export function InputTestPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-7">
          <p className="text-sm font-bold text-indigo-500">Input blocks</p>
          <h1 className="mt-1 text-2xl font-black text-slate-950">
            입력 블록 테스트
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            제목을 클릭하면 각 설정 블록을 펼치거나 접을 수 있습니다.
          </p>
        </header>
        <div className="space-y-6">
          <UserRequestBlock />
          <GoalSettingBlock />
          <TopicInputBlock />
          <FileUploadBlock />
          <RequiredDocumentBlock />
          <RequiredSkillBlock />
          <TargetAudienceBlock />
          <ResultUsageBlock />
          <ConstraintInputBlock />
        </div>
      </div>
    </main>
  )
}
