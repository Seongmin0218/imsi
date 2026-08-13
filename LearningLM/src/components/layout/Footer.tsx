export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-xs font-black text-white">
            L
          </div>

          <div>
            <p className="text-sm font-bold text-slate-700">LearningLM</p>
            <p className="text-xs text-slate-400">
              AI 활용 흐름을 블록형 튜토리얼로 배우는 플랫폼
            </p>
          </div>
        </div>

        <nav className="flex gap-5 text-xs font-semibold text-slate-400">
          <button type="button" className="cursor-pointer hover:text-indigo-500">
            소개
          </button>
          <button type="button" className="cursor-pointer hover:text-indigo-500">
            이용약관
          </button>
          <button type="button" className="cursor-pointer hover:text-indigo-500">
            개인정보
          </button>
          <button type="button" className="cursor-pointer hover:text-indigo-500">
            문의
          </button>
        </nav>
      </div>
    </footer>
  )
}
