import {
  ArrowRight,
  Bookmark,
  Clock,
  Copy,
  MessageCircle,
  Search,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import {
  getHome,
  type HomeResponse,
} from '../../api/home'

import {
  Header,
} from '../../components/layout/Header'

import {
  Footer,
} from '../../components/layout/Footer'

import {
  PageContainer,
} from '../../components/layout/PageContainer'

import {
  Section,
} from '../../components/layout/Section'

import {
  Button,
} from '../../components/ui/Button'

import {
  Badge,
} from '../../components/ui/Badge'

import {
  getTutorialLevelBadgeVariant,
} from '../../features/tutorial/utils/tutorialLevelStyle'

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '../../components/ui/Card'

import {
  ThumbnailBox,
} from '../../components/ui/ThumbnailBox'

const values = [
  {
    title: '튜토리얼 우선',
    description:
      '빈 화면이 아닌, 단계별 공식 튜토리얼로 시작합니다.',
  },
  {
    title: '흐름을 배움',
    description:
      '입력·정리·생성·검토 블록을 연결해 과정을 익힙니다.',
  },
  {
    title: '저장·공유',
    description:
      '만든 흐름을 저장하고 공개해 다른 사람과 나눕니다.',
  },
  {
    title: '이런 건 아니에요',
    description:
      '챗봇, 모델 놀이터, 개발자 도구, 자동화 도구가 아닙니다.',
  },
]

const levelMap: Record<
  string,
  {
    label: string
    variant:
      | 'green'
      | 'blue'
      | 'pink'
  }
> = {
  BEGINNER: {
    label: '입문',
    variant: 'green',
  },

  BASIC: {
    label: '기초',
    variant: 'blue',
  },

  INTERMEDIATE: {
    label: '응용',
    variant: 'pink',
  },

  입문: {
    label: '입문',
    variant: 'green',
  },

  기초: {
    label: '기초',
    variant: 'blue',
  },

  응용: {
    label: '응용',
    variant: 'pink',
  },
}

function getLevel(
  difficulty: string,
) {
  return (
    levelMap[difficulty] ?? {
      label: difficulty,
      variant: 'gray' as const,
    }
  )
}

function formatSavedAt(
  savedAt: string,
) {
  const date =
    new Date(savedAt)

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return '저장됨'
  }

  return `${date.toLocaleDateString(
    'ko-KR',
  )} 저장`
}

export function HomePage() {
  const navigate =
    useNavigate()

  // API에서 받은 홈 데이터
  const [
    home,
    setHome,
  ] = useState<HomeResponse | null>(
    null,
  )

  // 홈 API 오류
  const [
    error,
    setError,
  ] = useState('')

  // 화면이 처음 열릴 때 홈 API 호출
  useEffect(() => {
    let isMounted = true

    getHome()
      .then((result) => {
        if (!isMounted) {
          return
        }

        setHome(result)
      })
      .catch(
        (
          requestError:
            unknown,
        ) => {
          if (!isMounted) {
            return
          }

          setError(
            requestError instanceof
              Error
              ? requestError.message
              : '홈 화면을 불러오지 못했습니다.',
          )
        },
      )

    return () => {
      isMounted = false
    }
  }, [])

  // 이어서 학습하기 데이터
  const continueLearning =
    home?.continueLearning
      ? {
          tutorialId:
            home.continueLearning
              .tutorialId,

          flowId:
            home.continueLearning
              .flowId,

          title:
            home.continueLearning
              .title,

          difficulty:
            home.continueLearning
              .difficulty,

          level:
            getLevel(
              home
                .continueLearning
                .difficulty,
            ).label,

          currentStep:
            home.continueLearning
              .currentStepOrder,

          totalSteps:
            home.continueLearning
              .totalSteps,

          completedStepCount:
            home.continueLearning
              .completedStepCount,

          progressRate:
            home.continueLearning
              .progressRate,

          status:
            home.continueLearning
              .status,

          thumbnailUrl:
            home.continueLearning
              .thumbnailUrl,

          updatedAt:
            home.continueLearning
              .updatedAt,
        }
      : null

  // 완료 단계 / 전체 단계 진행률
  const progress =
    continueLearning &&
    continueLearning.totalSteps >
      0
      ? (
          continueLearning
            .completedStepCount /
          continueLearning
            .totalSteps
        ) * 100
      : 0

  // 목적별 카테고리
  const categories =
    (
      home?.categories ??
      []
    ).map(
      (category) => ({
        id:
          category.categoryId,

        code:
          category.code,

        icon:
          category.name.slice(
            0,
            1,
          ),

        title:
          category.name,

        description:
          '튜토리얼 · 공개 흐름',
      }),
    )

  // 추천 공식 튜토리얼
  const tutorials =
    (
      home?.recommendedTutorials ??
      []
    ).map(
      (tutorial) => ({
        id:
          tutorial.tutorialId,

        title:
          tutorial.title,

        description:
          tutorial.summary,

        level:
          getLevel(
            tutorial.difficulty,
          ).label,

        tags:
          tutorial.categories.map(
            (category) =>
              category.name,
          ),

        bookmarks:
          tutorial.blockCount,

        minutes:
          tutorial.estimatedMinutes,

        thumbnailUrl:
          tutorial.thumbnailUrl,
      }),
    )

  // 인기 공개 워크플로우
  const workflows =
    (
      home?.popularFlows ??
      []
    ).map(
      (workflow) => ({
        id:
          workflow.flowId,

        author:
          workflow.author
            .nickname,

        title:
          workflow.title,

        description:
          workflow.summary,

        category:
          workflow.categories[0]
            ?.name ?? '기타',

        level:
          getLevel(
            workflow.difficulty,
          ).label,

        saves:
          workflow.likeCount,

        copies:
          workflow.copyCount,

        comments:
          workflow.commentCount,
      }),
    )

  // 최근 저장한 항목
  const savedItems =
    (
      home?.recentSavedItems ??
      []
    ).map((item) => {
      const isTutorial =
        item.tutorialId !==
        undefined

      const itemId =
        isTutorial
          ? item.tutorialId
          : item.flowId

      const level =
        getLevel(
          item.difficulty,
        )

      return {
        id: `${item.itemType}-${itemId}`,

        title:
          item.title,

        typeLabel:
          isTutorial
            ? '튜토리얼'
            : '공개 흐름',

        level:
          level.label,

        meta: `${
          item.originalAuthor
            ?.nickname
            ? `${item.originalAuthor.nickname} 님의 흐름 · `
            : ''
        }${formatSavedAt(
          item.savedAt,
        )}`,

        thumbnailUrl:
          item.thumbnailUrl,

        action:
          isTutorial
            ? '이어가기'
            : '열기',

        path:
          isTutorial
            ? `/official-tutorials/${itemId}`
            : `/my-storage/workflows/${itemId}`,
      }
    })

  const goToTutorials =
    () => {
      navigate(
        '/official-tutorials',
      )
    }

  const goToPublicLibrary =
    () => {
      navigate(
        '/public-library',
      )
    }

  const goToMyStorage =
    () => {
      navigate(
        '/my-storage',
      )
    }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <PageContainer className="space-y-10">
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {/* Hero */}
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_520px] lg:items-center">
            <div>
              <p className="text-sm font-bold text-slate-400">
                AI 활용 학습
                플랫폼
              </p>

              <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl">
                블록을 쌓으며
                <br />
                AI 활용 흐름을
                배웁니다
              </h1>

              <p className="mt-8 max-w-xl text-base leading-7 text-slate-500">
                공식 튜토리얼을
                따라 하며 실제
                업무에 사용하는 AI
                활용 과정을 직접
                구성하고 저장할 수
                있습니다.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={
                    goToTutorials
                  }
                  className="cursor-pointer"
                >
                  튜토리얼
                  시작하기
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={
                    goToPublicLibrary
                  }
                  className="cursor-pointer"
                >
                  공개 활용 흐름
                  둘러보기
                </Button>
              </div>

              <form
                className="mt-6 flex h-12 max-w-md items-center gap-3 rounded-full border border-slate-200 bg-white px-4 text-slate-400 shadow-sm"
                onSubmit={(
                  event,
                ) => {
                  event.preventDefault()

                  goToTutorials()
                }}
              >
                <Search
                  size={18}
                />

                <input
                  type="text"
                  placeholder="무엇을 배우고 싶으신가요? 예: 회의록 요약"
                  className="h-full flex-1 border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </form>
            </div>

            <ThumbnailBox
              variant="hero"
              label="히어로 일러스트 / 블록 흐름 이미지"
              className="min-h-64"
            />
          </div>
        </section>

        {/* 서비스 특징 */}
        <Card className="overflow-hidden">
          <div className="grid divide-y divide-slate-200 md:grid-cols-4 md:divide-x md:divide-y-0">
            {values.map(
              (item) => (
                <div
                  key={
                    item.title
                  }
                  className="p-6"
                >
                  <h3 className="font-bold text-slate-950">
                    {
                      item.title
                    }
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {
                      item.description
                    }
                  </p>
                </div>
              ),
            )}
          </div>
        </Card>

        {/* 이어서 학습하기 */}
        {home &&
          !home.isGuest &&
          continueLearning && (
            <Section title="이어서 학습하기">
              <Card>
                <CardBody className="flex flex-col gap-5 md:flex-row md:items-center">
                  {continueLearning
                    .thumbnailUrl ? (
                    <img
                      src={
                        continueLearning
                          .thumbnailUrl
                      }
                      alt={`${continueLearning.title} 썸네일`}
                      className="h-24 w-full rounded-xl object-cover md:w-32"
                    />
                  ) : (
                    <ThumbnailBox
                      variant="compact"
                      label="썸네일"
                      className="h-24 w-full md:w-32"
                    />
                  )}

                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge
                        variant={getTutorialLevelBadgeVariant(
                          continueLearning.level,
                        )}
                      >
                        {
                          continueLearning
                            .level
                        }
                      </Badge>

                      <span className="text-xs font-semibold text-slate-400">
                        {
                          continueLearning
                            .currentStep
                        }
                        {' / '}
                        {
                          continueLearning
                            .totalSteps
                        }
                        {' 단계'}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-950">
                      {
                        continueLearning
                          .title
                      }
                    </h3>

                    <div className="mt-4 h-2 w-full max-w-sm overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      navigate(
                        `/official-tutorials/${continueLearning.tutorialId}`,
                      )
                    }}
                    className="cursor-pointer"
                  >
                    이어가기
                  </Button>
                </CardBody>
              </Card>
            </Section>
          )}

        {/* 목적별 탐색 */}
        <Section title="목적별로 둘러보기">
          <div className="grid gap-4 md:grid-cols-3">
            {categories.map(
              (category) => (
                <button
                  key={
                    category.id
                  }
                  type="button"
                  className="cursor-pointer text-left"
                  onClick={() => {
                    navigate(
                      `/official-tutorials?category=${encodeURIComponent(
                        category.code,
                      )}`,
                    )
                  }}
                >
                  <Card className="h-full transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md">
                    <CardBody className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-sm font-black text-indigo-500">
                        {
                          category.icon
                        }
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-950">
                          {
                            category.title
                          }
                        </h3>

                        <p className="text-sm text-slate-400">
                          {
                            category.description
                          }
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </button>
              ),
            )}
          </div>
        </Section>

        {/* 추천 공식 튜토리얼 */}
        <Section
          title="추천 공식 튜토리얼"
          actionLabel="전체 보기"
          onActionClick={
            goToTutorials
          }
        >
          <div className="grid gap-5 md:grid-cols-3">
            {tutorials.map(
              (tutorial) => (
                <Card
                  key={
                    tutorial.id
                  }
                  className="transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardHeader>
                    {tutorial.thumbnailUrl ? (
                      <img
                        src={
                          tutorial.thumbnailUrl
                        }
                        alt={`${tutorial.title} 썸네일`}
                        className="h-32 w-full rounded-xl object-cover"
                      />
                    ) : (
                      <ThumbnailBox
                        variant="tutorial"
                        label="튜토리얼 썸네일"
                      />
                    )}
                  </CardHeader>

                  <CardBody>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-slate-950">
                        {
                          tutorial.title
                        }
                      </h3>

                      <Badge
                        variant={getTutorialLevelBadgeVariant(
                          tutorial.level,
                        )}
                      >
                        {
                          tutorial.level
                        }
                      </Badge>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {
                        tutorial.description
                      }
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {tutorial.tags.map(
                        (tag) => (
                          <Badge
                            key={
                              tag
                            }
                          >
                            {
                              tag
                            }
                          </Badge>
                        ),
                      )}
                    </div>
                  </CardBody>

                  <CardFooter>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Bookmark
                          size={
                            14
                          }
                        />

                        {
                          tutorial.bookmarks
                        }
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <Clock
                          size={
                            14
                          }
                        />

                        {
                          tutorial.minutes
                        }
                        분
                      </span>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => {
                        navigate(
                          `/official-tutorials/${tutorial.id}`,
                        )
                      }}
                      className="cursor-pointer"
                    >
                      시작하기
                    </Button>
                  </CardFooter>
                </Card>
              ),
            )}
          </div>
        </Section>

        {/* 인기 공개 워크플로우 */}
        <Section
          title="인기 공개 워크플로우"
          actionLabel="라이브러리"
          onActionClick={
            goToPublicLibrary
          }
        >
          <div className="grid gap-5 md:grid-cols-3">
            {workflows.map(
              (workflow) => (
                <Card
                  key={
                    workflow.id
                  }
                  className="transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                          {workflow.author.slice(
                            0,
                            1,
                          )}
                        </div>

                        <span className="text-sm font-semibold text-slate-500">
                          {
                            workflow.author
                          }
                        </span>
                      </div>

                      <Badge variant="blue">
                        커뮤니티
                      </Badge>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-3">
                      <h3 className="font-bold text-slate-950">
                        {
                          workflow.title
                        }
                      </h3>

                      <Badge
                        variant={getTutorialLevelBadgeVariant(
                          workflow.level,
                        )}
                      >
                        {
                          workflow.level
                        }
                      </Badge>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {
                        workflow.description
                      }
                    </p>

                    <button
                      type="button"
                      className="mt-5 cursor-pointer text-sm font-bold text-indigo-500"
                      onClick={
                        goToPublicLibrary
                      }
                    >
                      {
                        workflow.category
                      }
                    </button>
                  </CardBody>

                  <CardFooter>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Bookmark
                          size={
                            14
                          }
                        />

                        {
                          workflow.saves
                        }
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <Copy
                          size={
                            14
                          }
                        />

                        복사{' '}
                        {
                          workflow.copies
                        }
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <MessageCircle
                          size={
                            14
                          }
                        />

                        {
                          workflow.comments
                        }
                      </span>
                    </div>

                    <Button
                      variant="link"
                      rightIcon={
                        <ArrowRight
                          size={
                            15
                          }
                        />
                      }
                      onClick={() => {
                        navigate(
                          `/public-library/${workflow.id}`,
                        )
                      }}
                      className="cursor-pointer"
                    >
                      복사해서 시작
                    </Button>
                  </CardFooter>
                </Card>
              ),
            )}
          </div>
        </Section>

        {/* 로그인했고 최근 저장 데이터가 있을 때만 표시 */}
        {home &&
          !home.isGuest &&
          savedItems.length >
            0 && (
            <Section
              title="최근 저장한 항목"
              actionLabel="내 저장소"
              onActionClick={
                goToMyStorage
              }
            >
              <div className="grid gap-5 md:grid-cols-2">
                {savedItems.map(
                  (item) => (
                    <Card
                      key={
                        item.id
                      }
                    >
                      <CardBody className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        {item.thumbnailUrl ? (
                          <img
                            src={
                              item.thumbnailUrl
                            }
                            alt={`${item.title} 썸네일`}
                            className="h-24 w-full rounded-xl object-cover sm:w-24"
                          />
                        ) : (
                          <ThumbnailBox
                            variant="compact"
                            label="썸네일"
                            className="h-24 w-full sm:w-24"
                          />
                        )}

                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap gap-2">
                            <Badge variant="blue">
                              {
                                item.typeLabel
                              }
                            </Badge>

                            <Badge
                              variant={getTutorialLevelBadgeVariant(
                                item.level,
                              )}
                            >
                              {
                                item.level
                              }
                            </Badge>
                          </div>

                          <h3 className="font-bold text-slate-950">
                            {
                              item.title
                            }
                          </h3>

                          <p className="mt-1 text-sm text-slate-400">
                            {
                              item.meta
                            }
                          </p>
                        </div>

                        <Button
                          variant="link"
                          rightIcon={
                            <ArrowRight
                              size={
                                15
                              }
                            />
                          }
                          onClick={() => {
                            navigate(
                              item.path,
                            )
                          }}
                          className="cursor-pointer"
                        >
                          {
                            item.action
                          }
                        </Button>
                      </CardBody>
                    </Card>
                  ),
                )}
              </div>
            </Section>
          )}

        {/* 초보자 가이드 */}
        <Card>
          <CardBody className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 text-2xl font-black text-white">
                ?
              </div>

              <div>
                <h3 className="font-bold text-slate-950">
                  처음이신가요?
                  3분 안내 가이드
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  블록이 무엇인지,
                  흐름을 어떻게
                  만드는지 빠르게
                  살펴보세요.
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={
                goToTutorials
              }
              className="cursor-pointer"
            >
              안내 가이드 보기
            </Button>
          </CardBody>
        </Card>
      </PageContainer>

      <Footer />
    </div>
  )
}