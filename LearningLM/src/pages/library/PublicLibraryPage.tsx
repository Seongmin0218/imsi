import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Search,
} from 'lucide-react'

import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { PageContainer } from '../../components/layout/PageContainer'

import {
  LibraryCard,
  type LibraryCardItem,
} from '../../features/library/component/LibraryCard'
import { getLibraryFlows } from '../../api/library'

import {
  libraryCategories,
  libraryLevels,
} from '../../features/library/data/libraryData'

import type {
  LibraryCategory,
  LibraryLevel,
} from '../../features/library/data/libraryData'

const MAX_LEVEL_FILTER_COUNT = 2
const MAX_CATEGORY_FILTER_COUNT = 3
const ITEMS_PER_PAGE = 6

const levelButtonClassMap: Record<
  LibraryLevel,
  string
> = {
  입문:
    'border-emerald-500 bg-emerald-50 text-emerald-600',
  기초:
    'border-blue-500 bg-blue-50 text-blue-600',
  응용:
    'border-rose-500 bg-rose-50 text-rose-600',
}

const selectedCategoryButtonClassName =
  'border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm'

interface FilterButtonProps {
  label: string
  isSelected: boolean
  onClick: () => void
  selectedClassName?: string
}

function FilterButton({
  label,
  isSelected,
  onClick,
  selectedClassName,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-lg border px-3 py-1.5 text-sm font-black transition',
        isSelected
          ? selectedClassName ||
          selectedCategoryButtonClassName
          : 'border-slate-700 bg-white text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-500',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

export function PublicLibraryPage() {
  const navigate = useNavigate()

  const [searchKeyword, setSearchKeyword] =
    useState('')

  const [isFilterOpen, setIsFilterOpen] =
    useState(false)

  const [selectedLevels, setSelectedLevels] =
    useState<LibraryLevel[]>([])

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<LibraryCategory[]>([])

  const [currentPage, setCurrentPage] = useState(0)
  const [libraryItems, setLibraryItems] =
    useState<LibraryCardItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // 공개 라이브러리 화면이 처음 열릴 때 서버 목록 조회
  useEffect(() => {
    let isMounted = true

    getLibraryFlows()
      .then((result) => {
        if (!isMounted) return

        const levelMap: Record<string, LibraryLevel> = {
          BEGINNER: '입문',
          BASIC: '기초',
          ADVANCED: '응용',
        }

        setLibraryItems(
          result.items.map((item) => ({
            id: item.flowId,
            authorName: item.author.nickname,
            authorInitial: item.author.nickname.slice(0, 1),
            title: item.title,
            description: item.summary,
            level: levelMap[item.difficulty] ?? '입문',
            categories: item.categories.map((category) => category.name),
            saves: item.likeCount,
            copies: item.copyCount,
            comments: item.commentCount,
            isLiked: item.isLiked,
          })),
        )
      })
      .catch((requestError: unknown) => {
        if (!isMounted) return
        setError(
          requestError instanceof Error
            ? requestError.message
            : '공개 흐름을 불러오지 못했습니다.',
        )
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleLevelClick = (
    level: LibraryLevel,
  ) => {
    setSelectedLevels((previousLevels) => {
      if (previousLevels.includes(level)) {
        return previousLevels.filter(
          (item) => item !== level,
        )
      }

      if (
        previousLevels.length >=
        MAX_LEVEL_FILTER_COUNT
      ) {
        return previousLevels
      }

      return [...previousLevels, level]
    })
  }

  const handleCategoryClick = (
    category: LibraryCategory,
  ) => {
    setSelectedCategories(
      (previousCategories) => {
        if (
          previousCategories.includes(category)
        ) {
          return previousCategories.filter(
            (item) => item !== category,
          )
        }

        if (
          previousCategories.length >=
          MAX_CATEGORY_FILTER_COUNT
        ) {
          return previousCategories
        }

        return [
          ...previousCategories,
          category,
        ]
      },
    )
  }

  const normalizedKeyword = searchKeyword
    .trim()
    .toLowerCase()

  const filteredLibraryItems = useMemo(() => {
    return libraryItems.filter((item) => {
      const matchesSearch =
        normalizedKeyword === '' ||
        item.title
          .toLowerCase()
          .includes(normalizedKeyword) ||
        item.description
          .toLowerCase()
          .includes(normalizedKeyword) ||
        item.authorName
          .toLowerCase()
          .includes(normalizedKeyword)

      const matchesLevel =
        selectedLevels.length === 0 ||
        selectedLevels.includes(item.level)

      const matchesCategory =
        selectedCategories.length === 0 ||
        item.categories.some((category) =>
          selectedCategories.some(
            (selectedCategory) => selectedCategory === category,
          ),
        )

      return (
        matchesSearch &&
        matchesLevel &&
        matchesCategory
      )
    })
  }, [
    normalizedKeyword,
    selectedLevels,
    selectedCategories,
  ])

  const hasSubmittedKeyword = normalizedKeyword.length > 0
  const hasSelectedOptions =
    selectedLevels.length > 0 || selectedCategories.length > 0
  const hasSearchCondition = hasSubmittedKeyword || hasSelectedOptions

  const resultTitle =
    hasSubmittedKeyword
      ? `“${normalizedKeyword}” 에 대한 검색결과`
      : '선택한 조건에 대한 검색결과'

  const quoteOptions = (options: string[]) =>
    options.map((option) => `“${option}”`).join(', ')

  const optionSummary = [
    selectedLevels.length > 0
      ? `${quoteOptions(selectedLevels)}에 대한 난이도 옵션`
      : '',
    selectedCategories.length > 0
      ? `${quoteOptions(selectedCategories)}에 대한 카테고리 옵션`
      : '',
  ].filter(Boolean).join(' + ')

  const totalPages = Math.ceil(
    filteredLibraryItems.length /
    ITEMS_PER_PAGE,
  )

  const startIndex =
    currentPage * ITEMS_PER_PAGE

  const endIndex =
    startIndex + ITEMS_PER_PAGE

  const visibleLibraryItems =
    filteredLibraryItems.slice(
      startIndex,
      endIndex,
    )

  useEffect(() => {
    setCurrentPage(0)
  }, [
    searchKeyword,
    selectedLevels,
    selectedCategories,
  ])

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(0)
      return
    }

    if (currentPage >= totalPages) {
      setCurrentPage(totalPages - 1)
    }
  }, [currentPage, totalPages])

  const handleLibraryClick = (
    libraryId: number,
  ) => {
    navigate(`/public-library/${libraryId}`)
  }

  const handlePreviousPage = () => {
    setCurrentPage((previousPage) =>
      Math.max(previousPage - 1, 0),
    )
  }

  const handleNextPage = () => {
    setCurrentPage((previousPage) =>
      Math.min(previousPage + 1, totalPages - 1),
    )
  }

  const handleResetFilters = () => {
    setSearchKeyword('')
    setSelectedLevels([])
    setSelectedCategories([])
    setCurrentPage(0)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <PageContainer className="py-14">
        <section>
          <div>
            <p className="text-sm font-bold text-slate-400">
              공개 라이브러리
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              다른 사람의 워크플로우를 복사해
              시작하기
            </h1>
          </div>

          <div className="mt-12 w-full max-w-3xl rounded-lg border border-slate-200 bg-white px-8 py-6 shadow-sm">
            <label className="relative block">
              <Search
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-slate-400"
                size={24}
              />

              <input
                type="text"
                value={searchKeyword}
                onFocus={() => setIsFilterOpen(true)}
                onChange={(event) =>
                  setSearchKeyword(
                    event.target.value,
                  )
                }
                placeholder="워크플로우 검색"
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

                    {libraryLevels.map((level) => (
                      <FilterButton
                        key={level}
                        label={level}
                        isSelected={selectedLevels.includes(level)}
                        onClick={() => handleLevelClick(level)}
                        selectedClassName={levelButtonClassMap[level]}
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mr-1 text-sm font-black text-slate-700">
                      카테고리{' '}
                      <span className="text-indigo-500">
                        {selectedCategories.length}/{MAX_CATEGORY_FILTER_COUNT}
                      </span>
                    </span>

                    {libraryCategories.map((category) => (
                      <FilterButton
                        key={category}
                        label={category}
                        isSelected={selectedCategories.includes(category)}
                        onClick={() => handleCategoryClick(category)}
                        selectedClassName={selectedCategoryButtonClassName}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {hasSearchCondition && (
            <div className="mt-12">
              {hasSubmittedKeyword && (
                <h2 className="text-4xl font-black tracking-tight text-slate-700">
                  {resultTitle}
                </h2>
              )}

              {hasSelectedOptions && (
                <p className={hasSubmittedKeyword ? 'mt-5 text-sm font-semibold text-slate-600' : 'text-sm font-semibold text-slate-600'}>
                  {optionSummary} 적용
                </p>
              )}
            </div>
          )}

          <div className="relative mt-12">
            {isLoading ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center text-sm font-semibold text-slate-500">
                공개 흐름을 불러오는 중입니다.
              </div>
            ) : error ? (
              <div
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm font-semibold text-red-700"
              >
                {error}
              </div>
            ) : visibleLibraryItems.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleLibraryItems.map(
                  (item) => (
                    <LibraryCard
                      key={item.id}
                      item={item}
                      onClick={
                        handleLibraryClick
                      }
                    />
                  ),
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                <p className="text-xl font-black text-slate-700">
                  {hasSubmittedKeyword && hasSelectedOptions
                    ? '해당 검색어와 옵션에 부합하는 워크플로우가 없습니다.'
                    : hasSubmittedKeyword
                      ? `“${searchKeyword.trim()}”에 대한 워크플로우가 없습니다.`
                      : hasSelectedOptions
                        ? '해당 옵션에 맞는 워크플로우가 없습니다.'
                        : '공개된 워크플로우가 없습니다.'}
                </p>

                <p className="mt-2 text-sm font-medium text-slate-400">
                  {hasSubmittedKeyword && hasSelectedOptions
                    ? '검색어 혹은 옵션을 다시 선택해주세요.'
                    : hasSubmittedKeyword
                      ? '검색어를 다시 입력해주세요.'
                      : '옵션을 다시 선택해주세요.'}
                </p>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-6 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                  필터 초기화
                </button>
              </div>
            )}

            {totalPages > 1 && currentPage > 0 && (
              <button
                type="button"
                aria-label="이전 페이지"
                onClick={handlePreviousPage}
                className="cursor-pointer absolute -left-14 top-1/2 hidden -translate-y-1/2 text-indigo-500 transition hover:-translate-x-1 xl:block"
              >
                <ArrowLeft
                  size={40}
                  strokeWidth={3}
                />
              </button>
            )}

            {totalPages > 1 && currentPage < totalPages - 1 && (
              <button
                type="button"
                aria-label="다음 페이지"
                onClick={handleNextPage}
                className="cursor-pointer absolute -right-14 top-1/2 hidden -translate-y-1/2 text-indigo-500 transition hover:translate-x-1 xl:block"
              >
                <ArrowRight
                  size={40}
                  strokeWidth={3}
                />
              </button>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-3">
              {Array.from({
                length: totalPages,
              }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  type="button"
                  aria-label={`${pageIndex + 1}페이지`}
                  onClick={() =>
                    setCurrentPage(pageIndex)
                  }
                  className={[
                    'h-3 w-3 rounded-full border-2 border-indigo-500 transition',
                    currentPage === pageIndex
                      ? 'bg-indigo-500'
                      : 'bg-white',
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
