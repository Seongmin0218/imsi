import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Copy,
  FolderKanban,
} from 'lucide-react'

import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { PageContainer } from '../../components/layout/PageContainer'

import {
  getSavedTutorials,
  getStorageFlows,
  updateFlowVisibility,
  type SavedTutorial,
  type StorageCounts,
} from '../../api/storage'
import {
  deleteFlow,
  deleteTutorialProgress,
} from '../../api/tutorial'
import type { TutorialLevel } from '../../features/tutorial/data/tutorials'

import { SavedTutorialCard } from '../../features/storage/components/SavedTutorialCard'
import {
  CreateWorkflowCard,
  type CreatedWorkflow,
} from '../../features/storage/components/CreateWorkflowCard'
import { CopiedWorkflowCard, type CopiedWorkflow } from '../../features/storage/components/CopiedWorkflowCard'

type StorageTab = 'saved' | 'created' | 'copied'

const ITEMS_PER_PAGE = 6

function MyStoragePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const requestedTab = searchParams.get('tab')

  const [selectedTab, setSelectedTab] =
    useState<StorageTab>(
      requestedTab === 'created' || requestedTab === 'copied'
        ? requestedTab
        : 'saved',
    )

  const [currentPage, setCurrentPage] = useState(0)

  /*
   * mock 데이터를 state에 넣는 이유:
   * 저장 해제나 공개 상태 변경을 화면에 바로 반영하기 위해서입니다.
   */

  // 튜토리얼 목록
  const [savedTutorialRecords, setSavedTutorialRecords] =
    useState<SavedTutorial[]>([])
  // 저장, 직접 생성, 복사 항목 개수
  const [storageCounts, setStorageCounts] =
    useState<StorageCounts | null>(null)
  // API 로딩 여부
  const [isLoadingSavedTutorials, setIsLoadingSavedTutorials] =
    useState(true)
  // API 오류 메시지
  const [savedTutorialsError, setSavedTutorialsError] =
    useState('')
  const [removingTutorialId, setRemovingTutorialId] =
    useState<number | null>(null)

  const [createdWorkflows, setCreatedWorkflows] =
    useState<CreatedWorkflow[]>([])

  const [copiedWorkflows, setCopiedWorkflows] =
    useState<CopiedWorkflow[]>([])
  const [isLoadingFlows, setIsLoadingFlows] = useState(true)
  const [flowsError, setFlowsError] = useState('')

  // Storage 화면이 처음 열릴 때 API 호출
  useEffect(() => {
    // 화면이 현재 열려 있음
    let isMounted = true

    getSavedTutorials()
      .then((result) => {
        // 이미 다른 화면으로 이동했다면 아무것도 하지 않음
        if (!isMounted) return
        // 아직 Storage 화면이면 서버 데이터를 저장
        setSavedTutorialRecords(result.tutorials)
        // 탭별 개수 저장
        setStorageCounts(result.counts)
      })
      .catch((requestError: unknown) => {
        if (!isMounted) return
        // API 오류 메시지 저장
        setSavedTutorialsError(
          requestError instanceof Error
            ? requestError.message
            : '저장한 튜토리얼을 불러오지 못했습니다.',
        )
      })
      .finally(() => {
        if (isMounted) setIsLoadingSavedTutorials(false)
      })
    // Storage 화면을 벗어날 때 실행
    return () => {
      isMounted = false
    }
  }, [])

  // 내가 만든 흐름과 복사한 흐름을 각각 조회
  useEffect(() => {
    let isMounted = true

    Promise.all([
      getStorageFlows('own'),
      getStorageFlows('copied'),
    ])
      .then(([ownResult, copiedResult]) => {
        if (!isMounted) return

        const levelMap: Record<string, TutorialLevel> = {
          BEGINNER: '입문',
          BASIC: '기초',
          ADVANCED: '응용',
        }

        setCreatedWorkflows(
          ownResult.flows.map((flow) => ({
            id: flow.flowId,
            title: flow.title,
            description: flow.summary ?? '',
            level: levelMap[flow.difficulty] ?? '입문',
            categories: flow.categories.map((category) => category.name),
            visibility:
              flow.visibility === 'PUBLIC' ? 'public' : 'private',
          })),
        )

        setCopiedWorkflows(
          copiedResult.flows.map((flow) => ({
            id: flow.flowId,
            originalWorkflowId: flow.originalFlowId ?? flow.flowId,
            authorName: flow.originalAuthorNickname ?? '알 수 없음',
            authorInitial:
              flow.originalAuthorNickname?.slice(0, 1) ?? '?',
            title: flow.title,
            description: flow.summary ?? '',
            level: levelMap[flow.difficulty] ?? '입문',
            categories: flow.categories.map((category) => category.name),
          })),
        )

        setStorageCounts(ownResult.counts)
      })
      .catch((requestError: unknown) => {
        if (!isMounted) return
        setFlowsError(
          requestError instanceof Error
            ? requestError.message
            : '저장한 흐름을 불러오지 못했습니다.',
        )
      })
      .finally(() => {
        if (isMounted) setIsLoadingFlows(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const savedTutorials = useMemo(() => {
    // 백엔드 영문 난이도를 프론트 한글 난이도로 변환
    const levelMap: Record<string, TutorialLevel> = {
      BEGINNER: '입문',
      BASIC: '기초',
      ADVANCED: '응용',
    }

    return savedTutorialRecords.map((savedRecord) => ({
      tutorial: {
        id: savedRecord.tutorialId,
        title: savedRecord.title,
        description: savedRecord.summary,
        level: levelMap[savedRecord.difficulty] ?? '입문',
        categories: savedRecord.categories.map((category) => category.name),
        thumbnailUrl: savedRecord.thumbnailUrl,
      },
      currentStep: savedRecord.currentStepOrder,
      totalSteps: savedRecord.totalSteps,
      status: savedRecord.status,
    }))
  }, [savedTutorialRecords])

  const tabs = [
    {
      id: 'saved' as const,
      label: '저장한 튜토리얼',
      icon: Bookmark,
      count: storageCounts?.saved ?? savedTutorials.length,
    },
    {
      id: 'created' as const,
      label: '내가 만든 흐름',
      icon: FolderKanban,
      count: storageCounts?.own ?? createdWorkflows.length,
    },
    {
      id: 'copied' as const,
      label: '복사한 흐름',
      icon: Copy,
      count: storageCounts?.copied ?? copiedWorkflows.length,
    },
  ]

  /*
   * 현재 탭의 전체 데이터 개수
   */
  const selectedItemCount = useMemo(() => {
    if (selectedTab === 'saved') {
      return savedTutorials.length
    }

    if (selectedTab === 'created') {
      return createdWorkflows.length
    }

    return copiedWorkflows.length
  }, [
    selectedTab,
    savedTutorials.length,
    createdWorkflows.length,
    copiedWorkflows.length,
  ])

  const totalPages = Math.ceil(
    selectedItemCount / ITEMS_PER_PAGE,
  )

  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  const visibleSavedTutorials = savedTutorials.slice(
    startIndex,
    endIndex,
  )

  const visibleCreatedWorkflows = createdWorkflows.slice(
    startIndex,
    endIndex,
  )

  const visibleCopiedWorkflows = copiedWorkflows.slice(
    startIndex,
    endIndex,
  )

  /*
   * 탭을 변경하면 첫 페이지로 돌아갑니다.
   */
  useEffect(() => {
    setCurrentPage(0)
  }, [selectedTab])

  /*
   * 저장 해제로 데이터가 줄었을 때
   * 존재하지 않는 페이지를 보고 있지 않도록 조정합니다.
   */
  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(0)
      return
    }

    if (currentPage >= totalPages) {
      setCurrentPage(totalPages - 1)
    }
  }, [currentPage, totalPages])

  /*
   * 저장한 튜토리얼 버튼 함수
   */
  const handleContinueTutorial = (tutorialId: number) => {
    navigate(`/official-tutorials/${tutorialId}`)
  }

  const handleRemoveTutorial = async (tutorialId: number) => {
    const savedTutorial = savedTutorialRecords.find(
      (record) => record.tutorialId === tutorialId,
    )

    if (!savedTutorial) return

    const shouldRemove = window.confirm(
      '저장을 해제하면 튜토리얼 진행 기록도 함께 삭제됩니다. 해제할까요?',
    )

    if (!shouldRemove) return

    setRemovingTutorialId(tutorialId)
    setSavedTutorialsError('')

    try {
      // 시작 또는 완료한 튜토리얼은 연결된 가이드 flow를 먼저 삭제한다.
      if (
        (savedTutorial.status === 'IN_PROGRESS' ||
          savedTutorial.status === 'COMPLETED') &&
        savedTutorial.flowId
      ) {
        await deleteFlow(savedTutorial.flowId)
      }

      // flow 삭제 성공 후(또는 NOT_STARTED인 경우) 저장·진행 기록을 삭제한다.
      await deleteTutorialProgress(tutorialId)

      setSavedTutorialRecords((previousRecords) =>
        previousRecords.filter(
          (record) => record.tutorialId !== tutorialId,
        ),
      )
      setStorageCounts((previousCounts) =>
        previousCounts
          ? {
              ...previousCounts,
              saved: Math.max(previousCounts.saved - 1, 0),
            }
          : previousCounts,
      )
    } catch (requestError) {
      setSavedTutorialsError(
        requestError instanceof Error
          ? requestError.message
          : '튜토리얼 저장을 해제하지 못했습니다.',
      )
    } finally {
      setRemovingTutorialId(null)
    }
  }

  /*
   * 내가 만든 흐름 버튼 함수
   */
  const handleEditWorkflow = (workflowId: number) => {
    navigate(`/my-storage/workflows/${workflowId}`)
  }

  const handlePreviewWorkflow = (workflowId: number) => {
    // 미리보기에서는 워크플로우 저장 1단계인 검토 화면으로 이동합니다.
    navigate(`/my-storage/workflows/${workflowId}/preview`)
  }

  const handleToggleVisibility = async (workflowId: number) => {
    const workflow = createdWorkflows.find((item) => item.id === workflowId)
    if (!workflow) return

    const nextVisibility =
      workflow.visibility === 'public' ? 'private' : 'public'
    setFlowsError('')

    try {
      // 전체 갱신 API 내부에서 기존 상세값을 보존하고 공개 상태만 변경합니다.
      await updateFlowVisibility(
        workflowId,
        nextVisibility === 'public' ? 'PUBLIC' : 'PRIVATE',
      )
      setCreatedWorkflows((previousWorkflows) =>
        previousWorkflows.map((item) =>
          item.id === workflowId
            ? { ...item, visibility: nextVisibility }
            : item,
        ),
      )
    } catch (error) {
      setFlowsError(
        error instanceof Error
          ? error.message
          : '공개 상태를 변경하지 못했습니다.',
      )
    }
  }

  /*
   * 복사한 흐름 버튼 함수
   */
  const handleViewOriginal = (
    originalWorkflowId: number,
  ) => {
    navigate(`/public-library/${originalWorkflowId}`)
  }

  const handleEditCopy = (workflowId: number) => {
    // 복사한 흐름도 내가 만든 흐름과 동일한 상세페이지/API를 사용합니다.
    navigate(`/my-storage/workflows/${workflowId}`)
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <PageContainer className="py-14">
        <section>
          {/* 페이지 제목 */}
          <div>
            <p className="text-sm font-bold text-slate-400">
              내 저장소
            </p>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              저장한 학습과 워크플로우
            </h1>
          </div>

          {/* 탭 */}
          <div className="mt-10 flex flex-wrap border-b border-slate-200">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isSelected = selectedTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTab(tab.id)}
                  className={[
                    'cursor-pointer flex items-center gap-2 border-b-2 px-5 py-4 text-sm font-black transition',
                    isSelected
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800',
                  ].join(' ')}
                >
                  <Icon size={16} />

                  <span>{tab.label}</span>

                  <span
                    className={
                      isSelected
                        ? 'text-indigo-400'
                        : 'text-slate-400'
                    }
                  >
                    ({tab.count})
                  </span>
                </button>
              )
            })}
          </div>

          {/* 카드 목록 */}
          <div className="relative mt-12">
            {selectedTab === 'saved' && isLoadingSavedTutorials ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center text-sm font-semibold text-slate-500">
                저장한 튜토리얼을 불러오는 중입니다.
              </div>
            ) : selectedTab === 'saved' && savedTutorialsError ? (
              <div
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm font-semibold text-red-700"
              >
                {savedTutorialsError}
              </div>
            ) : selectedTab !== 'saved' && isLoadingFlows ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center text-sm font-semibold text-slate-500">
                저장한 흐름을 불러오는 중입니다.
              </div>
            ) : selectedTab !== 'saved' && flowsError ? (
              <div
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm font-semibold text-red-700"
              >
                {flowsError}
              </div>
            ) : selectedItemCount > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {/* 저장한 튜토리얼 */}
                {selectedTab === 'saved' &&
                  visibleSavedTutorials.map((item) => (
                    <SavedTutorialCard
                      key={item.tutorial.id}
                      tutorial={item.tutorial}
                      currentStep={item.currentStep}
                      totalSteps={item.totalSteps}
                      status={item.status}
                      isRemoving={removingTutorialId === item.tutorial.id}
                      onContinue={handleContinueTutorial}
                      onRemove={handleRemoveTutorial}
                    />
                  ))}

                {/* 내가 만든 흐름 */}
                {selectedTab === 'created' &&
                  visibleCreatedWorkflows.map((workflow) => (
                    <CreateWorkflowCard
                      key={workflow.id}
                      workflow={workflow}
                      onEdit={handleEditWorkflow}
                      onPreview={handlePreviewWorkflow}
                      onToggleVisibility={handleToggleVisibility}
                    />
                  ))}

                {/* 복사한 흐름 */}
                {selectedTab === 'copied' &&
                  visibleCopiedWorkflows.map((workflow: CopiedWorkflow) => (
                    <CopiedWorkflowCard
                      key={workflow.id}
                      workflow={workflow}
                      onViewOriginal={handleViewOriginal}
                      onEditCopy={handleEditCopy}
                    />
                  ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
                <p className="text-lg font-black text-slate-700">
                  표시할 항목이 없습니다.
                </p>

                <p className="mt-2 text-sm font-medium text-slate-400">
                  저장하거나 만든 흐름이 이곳에 표시됩니다.
                </p>
              </div>
            )}

            {/* 이전 버튼 */}
            {totalPages > 1 && currentPage > 0 && (
              <button
                type="button"
                aria-label="이전 페이지"
                onClick={handlePreviousPage}
                className="cursor-pointer absolute -left-14 top-1/2 hidden -translate-y-1/2 text-indigo-500 transition hover:-translate-x-1 xl:block"
              >
                <ArrowLeft size={40} strokeWidth={3} />
              </button>
            )}

            {/* 다음 버튼 */}
            {totalPages > 1 &&
              currentPage < totalPages - 1 && (
                <button
                  type="button"
                  aria-label="다음 페이지"
                  onClick={handleNextPage}
                  className="cursor-pointer absolute -right-14 top-1/2 hidden -translate-y-1/2 text-indigo-500 transition hover:translate-x-1 xl:block"
                >
                  <ArrowRight size={40} strokeWidth={3} />
                </button>
              )}
          </div>

          {/* 페이지 표시 점 */}
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

export default MyStoragePage
