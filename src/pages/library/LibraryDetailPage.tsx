import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Copy,
  Heart,
} from 'lucide-react'
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { PageContainer } from '../../components/layout/PageContainer'

import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

import type {
  LibraryFlowColor,
  LibraryLevel,
} from '../../features/library/data/libraryData'
import {
  getLibraryFlowDetail,
  createCopiedFlow,
  type LibraryFlowDetail,
} from '../../api/library'
import { studioStageMeta } from '../../features/studio/components/node/studioNodeStyles'
import type { StudioStage } from '../../features/studio/types/studioNode'

const PAGE_MAX_WIDTH = 'max-w-[1250px]'
const levelClassMap: Record<
  LibraryLevel,
  string
> = {
  입문:
    'border-emerald-200 bg-emerald-50 text-emerald-600',
  기초:
    'border-blue-200 bg-blue-50 text-blue-600',
  응용:
    'border-rose-200 bg-rose-50 text-rose-600',
}

const flowColorStageMap: Record<LibraryFlowColor, StudioStage> = {
  blue: 'INPUT',
  teal: 'CONTEXT',
  indigo: 'PROCESS',
  amber: 'REVIEW',
  green: 'OUTPUT',
}

interface FlowStepProps {
  label: string
  color: LibraryFlowColor
}

function FlowStep({
  label,
  color,
}: FlowStepProps) {
  const stageMeta = studioStageMeta[flowColorStageMap[color]]

  return (
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

      {label}
    </span>
  )
}

export function LibraryDetailPage() {
  const params = useParams()
  const navigate = useNavigate()

  const libraryId = Number(params.libraryId)

  const [detail, setDetail] = useState<LibraryFlowDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [isBookmarked, setIsBookmarked] =
    useState(false)

  const [isLiked, setIsLiked] =
    useState(false)

  const [isCopyModalOpen, setIsCopyModalOpen] =
    useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const [copyError, setCopyError] = useState('')
  const [copiedFlowId, setCopiedFlowId] = useState<number | null>(null)

  const [comment, setComment] = useState('')

  // URL의 libraryId는 백엔드에서 사용하는 flowId입니다.
  useEffect(() => {
    if (!Number.isInteger(libraryId) || libraryId <= 0) {
      setErrorMessage('올바르지 않은 흐름 번호입니다.')
      setIsLoading(false)
      return
    }

    let isMounted = true
    getLibraryFlowDetail(libraryId)
      .then((result) => {
        if (!isMounted) return
        setDetail(result)
        setIsLiked(result.isLiked)
        setIsBookmarked(result.isBookmarked)
      })
      .catch((error: unknown) => {
        if (!isMounted) return
        setErrorMessage(
          error instanceof Error
            ? error.message
            : '공개 흐름을 불러오지 못했습니다.',
        )
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [libraryId])

  const libraryItem = useMemo(() => {
    if (!detail) return null

    const levelMap: Record<string, LibraryLevel> = {
      BEGINNER: '입문',
      BASIC: '기초',
      ADVANCED: '응용',
    }
    const colorMap: Record<string, LibraryFlowColor> = {
      INPUT: 'blue', CONTEXT: 'teal', PROCESS: 'indigo',
      REVIEW: 'amber', OUTPUT: 'green',
    }

    return {
      id: detail.flowId,
      authorName: detail.author.nickname,
      authorInitial: detail.author.nickname.slice(0, 1) || '?',
      title: detail.title,
      description: detail.summary,
      level: levelMap[detail.difficulty] ?? '입문',
      categories: detail.categories.map((category) => category.name),
      tags: detail.tags.map((tag) => tag.name),
      saves: detail.likeCount,
      copies: detail.copyCount,
      comments: detail.commentCount,
      bookmarks: detail.bookmarkCount,
      flowSteps: [...detail.blockFlow]
        .sort((a, b) => a.blockOrder - b.blockOrder)
        .map((block) => ({
          id: String(block.flowBlockId),
          label: block.name,
          color: colorMap[block.stage] ?? 'indigo',
        })),
      exampleInput: detail.exampleInput,
      exampleResult: detail.exampleResult ? [detail.exampleResult] : [],
      creatorNote: detail.authorNote,
      commentItems: detail.comments.map((item) => ({
        id: item.commentId,
        authorName: item.author.nickname,
        authorInitial: item.author.nickname.slice(0, 1) || '?',
        content: item.content,
        createdAt: new Date(item.createdAt).toLocaleDateString('ko-KR'),
      })),
    }
  }, [detail])

  const handleCopyWorkflow = async () => {
    if (!libraryItem) {
      return
    }

    const accessToken =
      localStorage.getItem('accessToken') ??
      localStorage.getItem('token')

    if (!accessToken) {
      navigate('/login', {
        state: { from: `/public-library/${libraryItem.id}` },
      })
      return
    }

    setIsCopying(true)
    setCopyError('')

    try {
      // 버튼 클릭 시 공개 흐름을 즉시 복사하고 성공한 경우에만 완료 모달을 엽니다.
      const copiedFlow = await createCopiedFlow(libraryItem.id)
      setCopiedFlowId(copiedFlow.flowId)
      setIsCopyModalOpen(true)
    } catch (error) {
      setCopyError(
        error instanceof Error
          ? error.message
          : '흐름을 복사하지 못했습니다.',
      )
    } finally {
      setIsCopying(false)
    }
  }

  const handleContinueToStudio = () => {
    if (!libraryItem || !copiedFlowId) {
      return
    }

    // 복사 API 응답으로 받은 새 flowId를 Studio에 전달합니다.
    navigate(`/studio/create?flowId=${copiedFlowId}`, {
      state: {
        flowId: copiedFlowId,
        originFlowId: libraryItem.id,
      },
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <PageContainer className="py-20">
          <Card className="px-6 py-16 text-center text-sm font-bold text-slate-500">
            공개 흐름 상세 정보를 불러오는 중입니다.
          </Card>
        </PageContainer>
        <Footer />
      </div>
    )
  }

  // 등록 API가 생기기 전까지 입력 UI만 기존 방식으로 동작합니다.
  const handleSubmitComment = () => {
    const normalizedComment = comment.trim()
    if (!normalizedComment) return

    console.log('등록할 댓글:', normalizedComment)
    setComment('')
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <PageContainer className="py-20">
          <Card className="px-6 py-16 text-center">
            <h1 className="text-2xl font-black text-slate-900">
              공개 흐름을 불러오지 못했습니다.
            </h1>
            <p className="mt-3 text-sm font-semibold text-rose-500">
              {errorMessage}
            </p>
            <Button className="mt-8" onClick={() => navigate('/public-library')}>
              공개 라이브러리로
            </Button>
          </Card>
        </PageContainer>
        <Footer />
      </div>
    )
  }

  if (!libraryItem) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />

        <PageContainer className="py-20">
          <Card className="px-6 py-16 text-center">
            <h1 className="text-2xl font-black text-slate-900">
              워크플로우를 찾을 수 없습니다.
            </h1>

            <p className="mt-3 text-sm font-semibold text-slate-400">
              주소를 확인하거나 공개 라이브러리로
              돌아가 주세요.
            </p>

            <Button
              className="mt-8"
              onClick={() =>
                navigate('/public-library')
              }
            >
              공개 라이브러리로
            </Button>
          </Card>
        </PageContainer>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <PageContainer className={`${PAGE_MAX_WIDTH} py-12`}>
        <div className="space-y-5">
          {/* 목록으로 돌아가기 */}
          <Link
            to="/public-library"
            className="inline-flex items-center gap-2 text-sm font-black text-indigo-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            공개 라이브러리
          </Link>

          {/* 작성자 */}
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-black text-slate-500">
              {libraryItem.authorInitial}
            </span>

            <span className="text-sm font-bold text-slate-500">
              {libraryItem.authorName}
            </span>
          </div>

          {/* 제목 영역 */}
          <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                {libraryItem.title}
              </h1>

              <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
                {libraryItem.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span
                  className={[
                    'rounded-lg border px-3 py-1.5 text-xs font-black',
                    levelClassMap[
                    libraryItem.level
                    ],
                  ].join(' ')}
                >
                  {libraryItem.level}
                </span>

                {libraryItem.categories.map(
                  (category) => (
                    <span
                      key={category}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-black text-slate-600"
                    >
                      {category}
                    </span>
                  ),
                )}

                {/* API의 tags도 카테고리와 구분해 상세 화면에 표시합니다. */}
                {libraryItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-black text-indigo-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  setIsBookmarked((previous) => !previous)
                }
                className="cursor-pointer"
              >
                <Bookmark
                  size={16}
                  fill={
                    isBookmarked
                      ? 'currentColor'
                      : 'none'
                  }
                />

                {isBookmarked
                  ? '북마크됨'
                  : '북마크'}
              </Button>

              <Button
                onClick={handleCopyWorkflow}
                disabled={isCopying}
                className="cursor-pointer disabled:cursor-not-allowed" 
              >
                <Copy size={16} />
                복사해서 시작
              </Button>
            </div>
          </section>

          {copyError && !isCopyModalOpen && (
            <p role="alert" className="text-right text-sm font-bold text-rose-500">
              {copyError}
            </p>
          )}

          {/* 블록 흐름 */}
          <Card className="px-6 py-5">
            <p className="text-sm font-black text-slate-400">
              블록 흐름
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {libraryItem.flowSteps.map(
                (step, index) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-3"
                  >
                    <FlowStep
                      label={step.label}
                      color={step.color}
                    />

                    {index <
                      libraryItem.flowSteps
                        .length -
                      1 && (
                        <span className="text-lg font-bold text-slate-500">
                          →
                        </span>
                      )}
                  </div>
                ),
              )}
            </div>
          </Card>

          {/* 예시 입력 및 결과 */}
          <section className="grid gap-5 md:grid-cols-2">
            <Card className="px-6 py-5">
              <p className="text-sm font-black text-slate-400">
                예시 입력
              </p>

              <div className="mt-5 rounded-xl bg-slate-50 px-5 py-4 text-sm font-semibold leading-6 text-slate-500">
                “{libraryItem.exampleInput}”
              </div>
            </Card>

            <Card className="px-6 py-5">
              <p className="text-sm font-black text-slate-400">
                예시 결과
              </p>

              <div className="mt-5 min-h-36 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold leading-6 text-slate-500">
                {libraryItem.exampleResult.length > 0
                  ? libraryItem.exampleResult.join('\n')
                  : '등록된 예시 결과가 없습니다.'}
              </div>
            </Card>
          </section>

          {/* 작성자 노트 */}
          <Card className="px-6 py-5">
            <p className="text-sm font-black text-slate-400">
              작성자 노트
            </p>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
              {libraryItem.creatorNote}
            </p>
          </Card>

          {/* 반응 정보 */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4">
            <button
              type="button"
              onClick={() =>
                setIsLiked((previous) => !previous)
              }
              className={[
                'cursor-pointer inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-black transition',
                isLiked
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-500'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300 hover:text-indigo-500',
              ].join(' ')}
            >
              <Heart
                size={17}
                fill={
                  isLiked
                    ? 'currentColor'
                    : 'none'
                }
              />

              {libraryItem.saves +
                (isLiked ? 1 : 0) -
                (detail?.isLiked ? 1 : 0)}
            </button>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Copy size={14} />
                복사 {libraryItem.copies}
              </span>

              <span className="inline-flex items-center gap-1">
                <Bookmark size={14} />
                북마크{' '}
                {libraryItem.bookmarks +
                  (isBookmarked ? 1 : 0) -
                  (detail?.isBookmarked ? 1 : 0)}
              </span>
            </div>
          </div>

          {/* 댓글 */}
          <Card className="px-6 py-6">
            <p className="text-sm font-black text-slate-500">
              댓글 · 피드백
            </p>

            <div className="mt-6 space-y-6">
              {libraryItem.commentItems.length >
                0 ? (
                libraryItem.commentItems.map(
                  (commentItem) => (
                    <div
                      key={commentItem.id}
                      className="flex gap-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500">
                        {
                          commentItem.authorInitial
                        }
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-slate-700">
                            {
                              commentItem.authorName
                            }
                          </span>

                          <span className="text-xs font-semibold text-slate-400">
                            {
                              commentItem.createdAt
                            }
                          </span>
                        </div>

                        <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                          {commentItem.content}
                        </p>
                      </div>
                    </div>
                  ),
                )
              ) : (
                <p className="text-sm font-medium text-slate-400">
                  아직 작성된 댓글이 없습니다.
                </p>
              )}
            </div>

            {/* 댓글 입력 */}
            <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500">
                나
              </span>

              <input
                type="text"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleSubmitComment()
                }}
                placeholder="댓글 남기기..."
                className="h-11 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400"
              />

              <Button
                onClick={handleSubmitComment}
                disabled={!comment.trim()}
              >
                등록
              </Button>
            </div>
          </Card>
        </div>
      </PageContainer>

      <Footer />

      {isCopyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#181818]/[0.42] px-6"
          onClick={() => setIsCopyModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="copy-workflow-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="copy-workflow-title"
              className="text-xl font-black text-slate-900"
            >
              복사해서 시작
            </h2>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-emerald-600"
              />
              <p className="text-sm font-semibold leading-6 text-slate-600">
                내 저장소에 비공개 복사본을 만들었습니다. 스튜디오에서 자유롭게 편집할 수 있습니다.
              </p>
            </div>

            {copyError && (
              <p role="alert" className="mt-4 text-sm font-bold text-rose-500">
                {copyError}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/my-storage?tab=copied')}
              >
                내 저장소에서 보기
              </Button>
              <Button onClick={handleContinueToStudio} disabled={isCopying}>
                스튜디오로 계속
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LibraryDetailPage