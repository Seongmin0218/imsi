import axios from 'axios'

import type {
  ApiErrorResponse,
  BaseResponse,
} from './types'

//튜토리얼 카테고리
export interface TutorialCategory {
  categoryId: number
  code: string
  name: string
}

//튜토리얼 목록의 항목 한개
export interface TutorialListItem {
  tutorialId: number
  title: string
  summary: string
  difficulty: string
  categories: TutorialCategory[]
  blockCount: number
  estimatedMinutes: number
  thumbnailUrl: string | null
}

// 응답의 result 구조
export interface TutorialListResponse {
  totalElements: number
  tutorials: TutorialListItem[]
}

// 상세 조회 응답의 blocks 배열 항목
export interface TutorialDetailBlock {
  blockId: number
  name: string
  stage: string
  description: string
  reason: string
}

// 상세 조회에서 반환하는 최소 진행 정보
export interface TutorialDetailProgress {
  currentStepOrder: number
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
  flowId?: number | null
}

// 저장·시작 API에서 반환하는 전체 진행 정보
export interface TutorialProgress extends TutorialDetailProgress {
  tutorialId: number
  totalSteps: number
  progressRate: number
  createdAt?: string
  updatedAt?: string
}

interface FlowCreateResponse {
  flowId: number
  title: string
  mode: 'GUIDED' | 'CREATE'
  status: 'DRAFT' | 'COMPLETED'
  createdAt: string
}

// GET /tutorials/{tutorialId} 응답의 result 구조
export interface TutorialDetailResponse {
  tutorialId: number
  title: string
  summary: string
  difficulty: string
  categories: TutorialCategory[]
  blockCount: number
  estimatedMinutes: number
  useCases: Array<{ label: string; description: string }>
  requiredConcepts: string[]
  flowType: string
  blockFlow: string[]
  blocks: TutorialDetailBlock[]
  example: {
    input: string
    result: string
    source: string
  }
  // 토큰이 있고 학습 이력이 있는 경우에만 서버가 진행 정보를 반환한다.
  progress: TutorialDetailProgress | null
}

// 백엔드가 허용하는 난이도 코드
export type TutorialDifficulty =
  | 'BEGINNER'
  | 'BASIC'
  | 'ADVANCED'

// GET /tutorials에 전달할 검색·필터 조건
export interface GetTutorialsParams {
  // 제목 또는 요약 검색어
  q?: string

  // 카테고리 ID, 최대 3개
  categoryIds?: number[]

  // 난이도, 최대 2개
  difficulties?: TutorialDifficulty[]
}

// .env의 백엔드 주소를 사용하는 Axios 인스턴스
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10_000,
})

// 서버가 보낸 실제 오류 메시지를 가져옴
function getApiErrorMessage(
  error: unknown,
): string {
  if (
    axios.isAxiosError<ApiErrorResponse>(
      error,
    )
  ) {
    return (
      error.response?.data?.message ??
      '튜토리얼 요청 처리 중 오류가 발생했습니다.'
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return '튜토리얼 요청 처리 중 오류가 발생했습니다.'
}

// 공식 튜토리얼 목록 조회
export async function getTutorials(
  params: GetTutorialsParams = {},
): Promise<TutorialListResponse> {
  try {
    const { data } =
      await api.get<
        BaseResponse<TutorialListResponse>
      >('/tutorials', {
        params,
      })

    if (!data.success) {
      throw new Error(
        data.message ||
          '튜토리얼 목록을 불러오지 못했습니다.',
      )
    }

    return data.result
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error),
    )
  }
}

export async function getTutorialDetail(
  tutorialId: number,
): Promise<TutorialDetailResponse> {
  // 상세 조회는 선택 인증이므로 저장된 토큰이 있을 때만 사용한다.
  const accessToken =
    localStorage.getItem('accessToken') ??
    localStorage.getItem('token')

  try {
    // URL의 tutorialId로 해당 튜토리얼 상세 정보를 요청한다.
    const { data } = await api.get<BaseResponse<TutorialDetailResponse>>(
      `/tutorials/${tutorialId}`,
      {
        headers: accessToken
          // 로그인 사용자는 진행률(progress)을 받을 수 있도록 토큰을 전달한다.
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      },
    )

    if (!data.success) {
      throw new Error(data.message || '튜토리얼 상세 정보를 불러오지 못했습니다.')
    }

    // 비로그인 요청에서는 progress를 사용하지 않는다. 토큰이 있는 경우에만
    // 서버가 반환한 진행 정보를 상세 화면 데이터에 반영한다.
    return {
      ...data.result,
      progress: accessToken ? data.result.progress : null,
    }
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}

// 튜토리얼을 내 저장소에 NOT_STARTED 상태로 저장한다.
export async function saveTutorial(
  tutorialId: number,
): Promise<TutorialProgress> {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('로그인 후 튜토리얼을 저장할 수 있습니다.')
  }

  try {
    // 명세상 Request Body가 없으므로 두 번째 인자로 빈 객체를 전달한다.
    const { data } = await api.post<BaseResponse<TutorialProgress>>(
      `/tutorials/${tutorialId}/progress`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    if (!data.success) {
      throw new Error(data.message || '튜토리얼을 저장하지 못했습니다.')
    }

    return data.result
  } catch (error) {
    // 401, 404, 409 등 서버가 보낸 실제 오류 메시지를 사용한다.
    throw new Error(getApiErrorMessage(error))
  }
}

// 가이드 학습에서 생성된 flow를 먼저 삭제한다.
export async function deleteFlow(flowId: number): Promise<void> {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('로그인 후 저장을 해제할 수 있습니다.')
  }

  try {
    const { data } = await api.delete<BaseResponse<unknown>>(
      `/flows/${flowId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )

    if (!data.success) {
      throw new Error(data.message || '학습용 작업 공간을 삭제하지 못했습니다.')
    }
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}

// 저장·진행 기록을 삭제해 튜토리얼 저장을 해제한다.
export async function deleteTutorialProgress(
  tutorialId: number,
): Promise<void> {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('로그인 후 저장을 해제할 수 있습니다.')
  }

  try {
    const { data } = await api.delete<BaseResponse<null>>(
      `/tutorials/${tutorialId}/progress`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )

    if (!data.success) {
      throw new Error(data.message || '튜토리얼 저장을 해제하지 못했습니다.')
    }
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}

// 튜토리얼을 따라갈 가이드 모드 작업 공간을 생성한다.
export async function createGuidedFlow(
  tutorialId: number,
): Promise<FlowCreateResponse> {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('로그인 후 튜토리얼을 시작할 수 있습니다.')
  }

  try {
    const { data } = await api.post<BaseResponse<FlowCreateResponse>>(
      '/flows',
      {
        mode: 'GUIDED',
        tutorialId,
        originFlowId: null,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )

    if (!data.success) {
      throw new Error(data.message || '학습용 작업 공간을 만들지 못했습니다.')
    }

    return data.result
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}

// 생성된 가이드 모드 flow를 튜토리얼 진행 정보와 연결한다.
export async function startTutorial(
  tutorialId: number,
  flowId: number,
): Promise<TutorialProgress> {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('로그인 후 튜토리얼을 시작할 수 있습니다.')
  }

  try {
    const { data } = await api.post<BaseResponse<TutorialProgress>>(
      `/tutorials/${tutorialId}/progress/start`,
      { flowId },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )

    if (!data.success) {
      throw new Error(data.message || '튜토리얼을 시작하지 못했습니다.')
    }

    return data.result
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}
