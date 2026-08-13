import axios from 'axios'

export interface HomeCategory {
  categoryId: number
  code: string
  name: string
}

export interface ContinueLearning {
  tutorialId: number
  flowId: number
  title: string
  difficulty: string
  currentStepOrder: number
  totalSteps: number
  completedStepCount: number
  progressRate: number
  status: string
  thumbnailUrl: string | null
  updatedAt: string
}

export interface RecommendedTutorial {
  tutorialId: number
  title: string
  summary: string
  difficulty: string
  categories: HomeCategory[]
  blockCount: number
  estimatedMinutes: number
  thumbnailUrl: string | null
}

export interface PopularFlow {
  flowId: number
  title: string
  summary: string
  difficulty: string
  categories: HomeCategory[]
  author: {
    userId: number
    nickname: string
  }
  likeCount: number
  copyCount: number
  commentCount: number
}

interface RecentSavedItemBase {
  itemType: string
  title: string
  difficulty: string
  status?: string
  originalAuthor?: {
    userId: number
    nickname: string
  }
  thumbnailUrl: string | null
  savedAt: string
}

export interface RecentSavedTutorial extends RecentSavedItemBase {
  tutorialId: number
  flowId?: never
  originFlowId?: never
}

export interface RecentSavedFlow extends RecentSavedItemBase {
  tutorialId?: never
  flowId: number
  originFlowId: number
}

export type RecentSavedItem = RecentSavedTutorial | RecentSavedFlow

export interface HomeResponse {
  isGuest: boolean
  continueLearning: ContinueLearning | null
  recommendedTutorials: RecommendedTutorial[]
  categories: HomeCategory[]
  popularFlows: PopularFlow[]
  recentSavedItems: RecentSavedItem[]
}

interface BaseResponse<T> {
  code: string
  message: string
  result: T
  success: boolean
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10_000,
})

export async function getHome(): Promise<HomeResponse> {
  const accessToken =
    localStorage.getItem('accessToken') ?? localStorage.getItem('token')

  const { data } = 
   await api.get<BaseResponse<HomeResponse>>
   ('/home', 
    {
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined,
  })

  if (!data.success) {
    throw new Error(data.message || '홈 화면을 불러오지 못했습니다.')
  }

  return data.result
}
