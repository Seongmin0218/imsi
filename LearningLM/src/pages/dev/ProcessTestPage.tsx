import {
  ArrangeInOrderBlock,
  CategorizeItemsBlock,
  CheckListBlock,
  ExtractKeyInformation,
  DraftBlock,
  FindExceptionCasesBlock,
  FunctionSplitBlock,
  PolicyConnectionBlock,
  QuestionListBlock,
  SkillCallBlock,
  SummarizeBlock,
  SummaryPromptLayoutBlock,
  ReconstructTableBlock,
  CompareBlock,
} from '../../features/Block/Process'

export function ProcessTestPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-[550px]">
        <header className="mb-7">
          <p className="text-sm font-bold text-indigo-500">Process blocks</p>
          <h1 className="mt-1 text-2xl font-black text-slate-950">
            프로세스 블록 테스트
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            제목을 클릭하면 각 설정 블록을 펼치거나 접을 수 있습니다.
          </p>
        </header>

        <div className="space-y-6">
          <SummaryPromptLayoutBlock />
          <ReconstructTableBlock />
          <CompareBlock />
          <SkillCallBlock />
          <QuestionListBlock />
          <CheckListBlock />
          <DraftBlock />
          <FindExceptionCasesBlock />
          <PolicyConnectionBlock />
          <FunctionSplitBlock />
          <ArrangeInOrderBlock />
          <CategorizeItemsBlock />
          <SummarizeBlock />
          <ExtractKeyInformation />
        </div>
      </div>
    </main>
  )
}
