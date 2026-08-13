import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Globe2,
  Info,
  Lock,
} from 'lucide-react'
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { PageContainer } from '../../components/layout/PageContainer'

import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

import {
  deleteStoredFlow,
  getFlowDetail,
  updateFlowVisibility,
  type FlowDetail,
} from '../../api/storage'
import { studioStageMeta } from '../../features/studio/components/node/studioNodeStyles'
import type { StudioStage } from '../../features/studio/types/studioNode'

function WorkflowDetailPage() {
  const { workflowId } = useParams()
  const navigate = useNavigate()

  const [flow, setFlow] = useState<FlowDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // 내가 만든/복사한 흐름 모두 URL의 flowId로 공통 상세 API를 호출합니다.
  useEffect(() => {
    const parsedFlowId = Number(workflowId)
    if (!Number.isInteger(parsedFlowId) || parsedFlowId <= 0) {
      setErrorMessage('올바르지 않은 흐름 번호입니다.')
      setIsLoading(false)
      return
    }

    let isMounted = true
    getFlowDetail(parsedFlowId)
      .then((result) => {
        if (isMounted) setFlow(result)
      })
      .catch((error: unknown) => {
        if (!isMounted) return
        setErrorMessage(
          error instanceof Error
            ? error.message
            : '흐름 상세 정보를 불러오지 못했습니다.',
        )
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [workflowId])

  const workflow = useMemo(() => {
    if (!flow) return null

    const stages: StudioStage[] = [
      'INPUT', 'CONTEXT', 'PROCESS', 'REVIEW', 'OUTPUT',
    ]

    return {
      id: flow.flowId,
      title: flow.title,
      description: flow.summary ?? flow.purpose ?? '',
      level: flow.difficulty,
      categories: flow.categories.map((category) => category.name),
      visibility:
        flow.visibility === 'PUBLIC' ? 'public' as const : 'private' as const,
      updatedAt: new Date(flow.updatedAt).toLocaleDateString('ko-KR'),
      flowSteps: [...flow.blockFlow]
        .sort((a, b) => a.blockOrder - b.blockOrder)
        .filter((block) => stages.includes(block.stage as StudioStage))
        .map((block) => ({
          id: String(block.flowBlockId),
          label: block.name,
          stage: block.stage as StudioStage,
        })),
      exampleInput: flow.exampleInput ?? '등록된 예시 입력이 없습니다.',
      exampleResult: flow.exampleResult ? [flow.exampleResult] : [],
      creatorNote: flow.authorNote ?? '등록된 작성자 노트가 없습니다.',
    }
  }, [flow])

  const [visibility, setVisibility] = useState<
    'public' | 'private'
  >('private')

  useEffect(() => {
    if (workflow) setVisibility(workflow.visibility)
  }, [workflow])

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false)
  const [isUpdatingVisibility, setIsUpdatingVisibility] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [actionError, setActionError] = useState('')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <PageContainer className="py-20">
          <Card className="px-6 py-16 text-center font-bold text-slate-600">
            흐름 상세 정보를 불러오는 중입니다.
          </Card>
        </PageContainer>
        <Footer />
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <PageContainer className="py-20">
          <Card className="px-6 py-16 text-center">
            <h1 className="text-2xl font-black text-slate-900">
              흐름 상세 정보를 불러오지 못했습니다.
            </h1>
            <p className="mt-3 text-sm font-semibold text-rose-500">
              {errorMessage}
            </p>
            <Button className="mt-8" onClick={() => navigate('/my-storage')}>
              내 저장소로
            </Button>
          </Card>
        </PageContainer>
        <Footer />
      </div>
    )
  }

  if (!workflow) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />

        <PageContainer className="py-20">
          <Card className="px-6 py-16 text-center">
            <h1 className="text-2xl font-black text-slate-900">
              워크플로우를 찾을 수 없습니다.
            </h1>

            <p className="mt-3 text-sm font-semibold text-slate-400">
              주소를 확인하거나 내 저장소로 돌아가 주세요.
            </p>

            <Button
              className="mt-8"
              onClick={() => navigate('/my-storage')}
            >
              내 저장소로
            </Button>
          </Card>
        </PageContainer>

        <Footer />
      </div>
    )
  }

  const handleEdit = () => {
    // Studio가 기존 흐름을 불러올 수 있도록 flowId를 전달합니다.
    navigate(`/studio/create?flowId=${workflow.id}`)
  }

  const handleToggleVisibility = async () => {
    const nextVisibility = visibility === 'public' ? 'private' : 'public'
    setIsUpdatingVisibility(true)
    setActionError('')

    try {
      await updateFlowVisibility(
        workflow.id,
        nextVisibility === 'public' ? 'PUBLIC' : 'PRIVATE',
      )
      setVisibility(nextVisibility)
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : '공개 상태를 변경하지 못했습니다.',
      )
    } finally {
      setIsUpdatingVisibility(false)
    }
  }

const handleDelete = () => {
  setIsDeleteModalOpen(true)
}

const handleConfirmDelete =
  async () => {
    setIsDeleting(true)
    setActionError('')

    try {
      await deleteStoredFlow(
        workflow.id,
      )

      navigate(
        '/my-storage',
      )
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : '흐름을 삭제하지 못했습니다.',
      )

      setIsDeleteModalOpen(
        false,
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <PageContainer className="max-w-5xl py-12">
        <div className="space-y-6">
          {/* 뒤로 가기 */}
          <Link
            to="/my-storage"
            className="inline-flex items-center gap-2 text-sm font-black text-indigo-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            내 저장소
          </Link>

          {/* 상단 정보 */}
          <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-500">
                  {visibility === 'public' ? (
                    <Globe2 size={14} />
                  ) : (
                    <Lock size={14} />
                  )}

                  {visibility === 'public'
                    ? '공개'
                    : '비공개'}
                </span>

                <span className="text-xs font-semibold text-slate-400">
                  마지막 편집 {workflow.updatedAt}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                {workflow.title}
              </h1>

              <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
                {workflow.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600">
                  {workflow.level}
                </span>

                {workflow.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-black text-slate-600"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleEdit}>
                편집
              </Button>

              <Button
                variant="secondary"
                onClick={handleToggleVisibility}
                disabled={isUpdatingVisibility}
              >
                {isUpdatingVisibility
                  ? '변경 중...'
                  : visibility === 'public'
                  ? '비공개로 설정'
                  : '공개로 설정'}
              </Button>
            </div>
          </section>

          {actionError && (
            <p role="alert" className="text-sm font-bold text-rose-500">
              {actionError}
            </p>
          )}

          {/* 블록 흐름 */}
          <Card className="px-6 py-5">
            <p className="text-sm font-black text-slate-400">
              블록 흐름
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {workflow.flowSteps.map(
                (step, index) => {
                  const stageMeta = studioStageMeta[step.stage]

                  return (
                    <div
                      key={step.id}
                      className="flex items-center gap-3"
                    >
                    <span
                      className={[
                        'inline-flex items-center gap-2 rounded-lg border-2 bg-white px-3 py-2 text-sm font-bold text-slate-600',
                        stageMeta.handleClassName,
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'h-2.5 w-2.5 rounded-sm',
                          stageMeta.slotMarkClassName,
                        ].join(' ')}
                      />
                      {step.label}
                    </span>

                    {index <
                      workflow.flowSteps.length - 1 && (
                      <span className="text-lg font-bold text-slate-500">
                        →
                      </span>
                    )}
                  </div>
                  )
                },
              )}
            </div>
          </Card>

          {/* 예시 입력 / 결과 */}
          <section className="grid gap-5 md:grid-cols-2">
            <Card className="px-6 py-5">
              <p className="text-sm font-black text-slate-400">
                예시 입력
              </p>

              <div className="mt-5 rounded-xl bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-500">
                “{workflow.exampleInput}”
              </div>
            </Card>

            <Card className="px-6 py-5">
              <p className="text-sm font-black text-slate-400">
                예시 결과
              </p>

              <div className="mt-5 space-y-3">
                {workflow.exampleResult.map(
                  (result, index) => (
                    <div
                      key={`${result}-${index}`}
                      className="h-3 rounded-full bg-slate-100"
                    >
                      <div className="h-3 w-4/5 rounded-full bg-slate-200" />
                    </div>
                  ),
                )}
              </div>
            </Card>
          </section>

          {/* 작성자 노트 */}
          <Card className="px-6 py-5">
            <p className="text-sm font-black text-slate-400">
              작성자 노트
            </p>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
              {workflow.creatorNote}
            </p>
          </Card>

          {/* 공개 설정 */}
          <Card className="px-6 py-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-slate-400">
                공개 설정
              </p>

              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-500 bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600">
                {visibility === 'public' ? (
                  <Globe2 size={14} />
                ) : (
                  <Lock size={14} />
                )}
                {visibility === 'public'
                  ? '공개'
                  : '비공개'}
              </span>
            </div>

            <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-600">
              {[
                '제목 · 한 줄 요약 작성됨',
                '블록 흐름 1개 이상',
                '예시 입력·결과 작성 권장',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-3.5 w-3.5 rounded-sm border-2 border-indigo-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm font-semibold text-slate-600">
              <Info size={17} className="shrink-0 text-amber-600" />
              {visibility === 'public'
                ? '현재 다른 사용자가 이 흐름을 보고 복사할 수 있습니다.'
                : '공개하면 다른 사용자가 흐름을 보고 복사할 수 있습니다.'}
            </div>

            <div className="mt-5 flex flex-wrap gap-4">
              <Button
                size="lg"
                disabled={isUpdatingVisibility || visibility === 'public'}
                onClick={handleToggleVisibility}
              >
                {visibility === 'public'
                  ? '공개 상태 유지'
                  : '공개로 게시'}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                disabled={isUpdatingVisibility || visibility === 'private'}
                onClick={handleToggleVisibility}
              >
                {visibility === 'public'
                  ? '비공개로 전환'
                  : '비공개로 유지'}
              </Button>

              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-rose-300 bg-white px-5 text-base font-semibold text-rose-500 transition hover:bg-rose-50"
              >
                삭제
              </button>
            </div>
          </Card>
        </div>
      </PageContainer>

      <Footer />

      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#181818]/[0.42] px-6"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-workflow-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="delete-workflow-title"
              className="text-xl font-black text-[#C0473C]"
            >
              워크플로우를 삭제할까요?
            </h2>

            <p className="mt-5 text-sm font-semibold leading-6 text-slate-600">
              “{workflow.title}” 워크플로우가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                취소
              </Button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#C0473C] px-4 text-sm font-semibold text-white transition hover:bg-[#A93D34]"
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkflowDetailPage
