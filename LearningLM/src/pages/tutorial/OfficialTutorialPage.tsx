import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { PageContainer } from '../../components/layout/PageContainer'
import {
  tutorialCategories,
  tutorialLevels,
  type TutorialCategory,
  type TutorialLevel,
} from '../../features/tutorial/data/tutorials'
import { TutorialCard } from '../../features/tutorial/components/TutorialCard'
import {
  getTutorials,
  type TutorialListItem,
} from '../../api/tutorial'


const MAX_LEVEL_FILTER_COUNT = 2
const MAX_CATEGORY_FILTER_COUNT = 3
const ITEMS_PER_PAGE = 6

const levelButtonStyleMap: Record<
  TutorialLevel,
  {
    base: string
    selected: string
  }
> = {
  입문: {
    /*
     * 선택 전:
     * 흰 배경 + 녹색 테두리와 글자
     */
    base:
      'border-[#5FAA81] bg-white text-[#5FAA81] hover:bg-[#F5FBF7]',

    /*
     * 선택 후:
     * 연한 녹색 배경
     */
    selected:
      'border-[#5FAA81] bg-[#DFF2DF] text-[#5FAA81]',
  },

  기초: {
    /*
     * 선택 전 와이어프레임은
     * #A9BDD4보다 진한 남색 계열입니다.
     */
    base:
      'border-[#4A5E8A] bg-white text-[#4A5E8A] hover:bg-[#F5F6FA]',

    /*
     * 선택 후:
     * 사용자가 지정한 #ECEEFF + #A9BDD4 조합
     */
    selected:
      'border-[#A9BDD4] bg-[#ECEEFF] text-[#A9BDD4]',
  },

  응용: {
    /*
     * 선택 전:
     * 흰 배경 + 분홍색 테두리와 글자
     */
    base:
      'border-[#EF8888] bg-white text-[#EF8888] hover:bg-[#FFF7F7]',

    /*
     * 응용은 별도 선택 배경색이 지정되지 않았으므로
     * 옅은 분홍 배경으로만 선택 상태를 구분합니다.
     */
    selected:
      'border-[#EF8888] bg-[#FFF1F1] text-[#EF8888]',
  },
}

const selectedCategoryButtonClassName =
  'border-[#6366F1] bg-[#ECEEFF] text-[#6366F1]'

interface FilterButtonProps {
  label: string
  isSelected: boolean
  onClick: () => void
  baseClassName?: string
  selectedClassName?: string
}

function FilterButton({
  label,
  isSelected,
  onClick,
  baseClassName,
  selectedClassName,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        /*
        * 와이어프레임 기준:
        * - 테두리 2px
        * - 기존보다 넓은 좌우 여백
        * - 15px 크기의 굵은 글자
        * - 조금 더 둥근 모서리
        */
        'rounded-[11px] border-2 px-4 py-2 text-[15px] font-black leading-none transition-colors',

        isSelected
          ? selectedClassName ||
          'border-[#6366F1] bg-[#ECEEFF] text-[#6366F1]'
          : baseClassName ||
          'border-[#656568] bg-white text-[#52525B] hover:bg-[#F7F7F8]',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

export function OfficialTutorialPage() {
  

  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedLevels, setSelectedLevels] = useState<TutorialLevel[]>([])
  const [selectedCategories, setSelectedCategories] = useState<
    TutorialCategory[]
  >([])
  const [currentPage, setCurrentPage] = useState(0)
  // 서버에서 받은 튜토리얼 목록
  const [tutorialItems, setTutorialItems] = useState<TutorialListItem[]>([])
  // API 로딩 상태
  const [isLoading, setIsLoading] = useState(true)
  // API 오류 메시지
  const [error, setError] = useState('')
  // 화면이 처음 열릴 때 튜토리얼 목록 API 호출
  useEffect(() => {
    let isMounted = true

    getTutorials()
      .then((result) => {
        // 화면을 이미 벗어났다면 상태를 변경하지 않음
        if (!isMounted) return

        // result.tutorials를 화면 상태에 저장
        setTutorialItems(result.tutorials)
      })
      .catch((requestError: unknown) => {
        if (!isMounted) return

        // API 오류 메시지를 저장
        setError(
          requestError instanceof Error
            ? requestError.message
            : '튜토리얼 목록을 불러오지 못했습니다.',
        )
      })
      .finally(() => {
        if (isMounted) {
          // 요청 성공·실패와 관계없이 로딩 종료
          setIsLoading(false)
        }
      })

    // 다른 화면으로 이동할 때 실행
    return () => {
      isMounted = false
    }
  }, [])

  // 백엔드 난이도를 화면의 한글 난이도로 변환
  const levelMap: Record<string, TutorialLevel> = {
    BEGINNER: '입문',
    BASIC: '기초',
    ADVANCED: '응용',
  }

  // 서버 데이터를 기존 튜토리얼 카드 형식으로 변환
  const apiTutorials = useMemo(
    () => tutorialItems.map((tutorial) => ({
      id: tutorial.tutorialId,
      title: tutorial.title,
      description: tutorial.summary,
      level:
        levelMap[tutorial.difficulty] ??
        '입문',
      categories:
        tutorial.categories.map(
          (category) =>
            category.name as TutorialCategory,
        ),
      blockCount: tutorial.blockCount,
      estimatedMinutes:
        tutorial.estimatedMinutes,
    })),
    [tutorialItems],
  )

  const normalizedKeyword = keyword.trim()

  const filteredTutorials = useMemo(() => {
    const loweredKeyword = normalizedKeyword.toLowerCase()

    return apiTutorials.filter((tutorial) => {
      const matchesKeyword =
        loweredKeyword.length === 0 ||
        tutorial.title.toLowerCase().includes(loweredKeyword) ||
        tutorial.description.toLowerCase().includes(loweredKeyword) ||
        tutorial.categories.some((category) =>
          category.toLowerCase().includes(loweredKeyword),
        )

      const matchesLevel =
        selectedLevels.length === 0 || selectedLevels.includes(tutorial.level)

      const matchesCategory =
        selectedCategories.length === 0 ||
        tutorial.categories.some((category) =>
          selectedCategories.includes(category),
        )

      return matchesKeyword && matchesLevel && matchesCategory
    })
  }, [
    apiTutorials,
    normalizedKeyword,
    selectedCategories,
    selectedLevels,
  ])

  const totalPages = Math.ceil(filteredTutorials.length / ITEMS_PER_PAGE)
  const canGoPrev = totalPages > 1 && currentPage > 0
  const canGoNext = totalPages > 1 && currentPage < totalPages - 1

  const paginatedTutorials = filteredTutorials.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  )

  const hasSearchCondition =
    normalizedKeyword.length > 0 ||
    selectedLevels.length > 0 ||
    selectedCategories.length > 0

  const resultTitle =
    normalizedKeyword.length > 0
      ? `“${normalizedKeyword}” 에 대한 검색결과`
      : '선택한 조건에 대한 검색결과'

  useEffect(() => {
    setCurrentPage(0)
  }, [keyword, selectedLevels, selectedCategories])

  const toggleLevel = (level: TutorialLevel) => {
    setSelectedLevels((prev) => {
      if (prev.includes(level)) {
        return prev.filter((item) => item !== level)
      }

      if (prev.length >= MAX_LEVEL_FILTER_COUNT) {
        return prev
      }

      return [...prev, level]
    })
  }

  const toggleCategory = (category: TutorialCategory) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category)
      }

      if (prev.length >= MAX_CATEGORY_FILTER_COUNT) {
        return prev
      }

      return [...prev, category]
    })
  }

  const resetFilters = () => {
    setKeyword('')
    setSelectedLevels([])
    setSelectedCategories([])
    setCurrentPage(0)
  }

  const goPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0))
  }

  const goNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <PageContainer className="py-16">
        <section className="space-y-12">
          <div>
            <p className="text-sm font-bold text-slate-400">공식 튜토리얼</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              단계별로 AI 활용 흐름 배우기
            </h1>
          </div>

          <div className="w-full max-w-3xl rounded-lg border border-slate-200 bg-white px-8 py-6 shadow-sm">
            <label className="relative block">
              <Search
                className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400"
                size={24}
              />
              <input
                value={keyword}
                onFocus={() => setIsFilterOpen(true)}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="튜토리얼 검색"
                className="h-10 w-full bg-transparent pl-9 pr-4 text-base font-semibold text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>

            {isFilterOpen && (
              <div className="mt-5 border-t border-dashed border-slate-300 pt-7">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mr-1 text-sm font-black text-slate-700">
                      난이도{' '}
                      <span className="text-indigo-500">
                        {selectedLevels.length}/{MAX_LEVEL_FILTER_COUNT}
                      </span>
                    </span>

                    {tutorialLevels.map(
                      (level) => (
                        <FilterButton
                          key={level}
                          label={level}
                          isSelected={
                            selectedLevels.includes(
                              level,
                            )
                          }
                          baseClassName={
                            levelButtonStyleMap[
                              level
                            ].base
                          }
                          selectedClassName={
                            levelButtonStyleMap[
                              level
                            ].selected
                          }
                          onClick={() =>
                            toggleLevel(level)
                          }
                        />
                      ),
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mr-1 text-sm font-black text-slate-700">
                      카테고리{' '}
                      <span className="text-indigo-500">
                        {selectedCategories.length}/{MAX_CATEGORY_FILTER_COUNT}
                      </span>
                    </span>

                    {tutorialCategories.map((category) => (
                      <FilterButton
                        key={category}
                        label={category}
                        isSelected={selectedCategories.includes(category)}
                        selectedClassName={selectedCategoryButtonClassName}
                        onClick={() => toggleCategory(category)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {hasSearchCondition && (
            <h2 className="text-4xl font-black tracking-tight text-slate-700">
              {resultTitle}
            </h2>
          )}

          <div className="relative">
            {isLoading ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center text-sm font-semibold text-slate-500">
                튜토리얼 목록을 불러오는 중입니다.
              </div>
            ) : error ? (
              <div
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm font-semibold text-red-700"
              >
                {error}
              </div>
            ) : paginatedTutorials.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {paginatedTutorials.map((tutorial) => (
                  <TutorialCard
                    key={tutorial.id}
                    tutorial={tutorial}
                    onStart={(tutorialId) =>
                      navigate(`/official-tutorials/${tutorialId}`)
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                <p className="text-xl font-black text-slate-700">
                  조건에 맞는 튜토리얼이 없습니다.
                </p>
                <p className="mt-2 text-sm font-medium text-slate-400">
                  검색어 또는 필터를 조정해 다시 찾아보세요.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                  필터 초기화
                </button>
              </div>
            )}

            {canGoPrev && (
              <button
                type="button"
                aria-label="이전 튜토리얼 페이지"
                onClick={goPrevPage}
                className="cursor-pointer absolute -left-12 top-1/2 hidden -translate-y-1/2 text-indigo-500 transition hover:-translate-x-1 xl:block"
              >
                <ArrowLeft size={42} strokeWidth={3} />
              </button>
            )}

            {canGoNext && (
              <button
                type="button"
                aria-label="다음 튜토리얼 페이지"
                onClick={goNextPage}
                className="cursor-pointer absolute -right-12 top-1/2 hidden -translate-y-1/2 text-indigo-500 transition hover:translate-x-1 xl:block"
              >
                <ArrowRight size={42} strokeWidth={3} />
              </button>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-10">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`${index + 1}번째 튜토리얼 페이지`}
                  onClick={() => setCurrentPage(index)}
                  className={[
                    'h-3 w-3 rounded-full border-2 border-indigo-500 transition',
                    currentPage === index ? 'bg-indigo-500' : 'bg-white',
                  ].join(' ')}
                />
              ))}
            </div>
          )}
        </section>
      </PageContainer>

      <Footer />
    </div>
  )
}
