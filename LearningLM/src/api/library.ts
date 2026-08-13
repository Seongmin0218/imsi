import axios from 'axios'

export interface LibraryCategoryResponse {
  categoryId: number
  code: string
  name: string
}

export interface LibraryAuthorResponse {
  userId: number
  nickname: string
}

export interface LibraryFlowItem {
  flowId: number
  title: string
  summary: string
  difficulty: string
  categories: LibraryCategoryResponse[]
  author: LibraryAuthorResponse
  likeCount: number
  copyCount: number
  commentCount: number
  isLiked: boolean
}

export interface LibraryFlowsResponse {
  totalElements: number
  items: LibraryFlowItem[]
}

export interface LibraryDetailBlock {
  flowBlockId: number
  blockId: number
  name: string
  stage: string
  blockOrder: number
}

export interface LibraryDetailComment {
  commentId: number
  author: LibraryAuthorResponse
  content: string
  createdAt: string
}

export interface LibraryFlowDetail {
  flowId: number
  title: string
  summary: string
  difficulty: string
  categories: LibraryCategoryResponse[]
  author: LibraryAuthorResponse
  tags: Array<{ tagId: number; name: string }>
  blockFlow: LibraryDetailBlock[]
  exampleInput: string
  exampleResult: string
  authorNote: string
  likeCount: number
  copyCount: number
  bookmarkCount: number
  commentCount: number
  isLiked: boolean
  isBookmarked: boolean
  comments: LibraryDetailComment[]
}

export interface CopiedFlowCreateResult {
  flowId: number
  title: string
  mode: 'GUIDED' | 'CREATE'
  status: 'DRAFT' | 'COMPLETED'
  createdAt: string
}

interface BaseResponse<T> {
  code: string
  message: string
  result: T
  success: boolean
}

interface ApiErrorResponse {
  code: string
  message: string
  success: false
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10_000,
})

function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ??
      '공개 라이브러리 요청 처리 중 오류가 발생했습니다.'
    )
  }

  if (error instanceof Error) return error.message

  return '공개 라이브러리 요청 처리 중 오류가 발생했습니다.'
}

// 공개된 흐름 목록 조회. 토큰이 있으면 사용자의 좋아요 여부도 반환됨
export async function getLibraryFlows(): Promise<LibraryFlowsResponse> {
  const accessToken =
    localStorage.getItem('accessToken') ??
    localStorage.getItem('token')

  try {
    const { data } = await api.get<BaseResponse<LibraryFlowsResponse>>(
      '/library',
      {
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      },
    )

    if (!data.success) {
      throw new Error(
        data.message || '공개 흐름을 불러오지 못했습니다.',
      )
    }

    return data.result
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}

// 공개 라이브러리의 단일 흐름 상세조회입니다. 토큰은 선택 사항입니다.
export async function getLibraryFlowDetail(
  flowId: number,
): Promise<LibraryFlowDetail> {
  const accessToken =
    localStorage.getItem('accessToken') ??
    localStorage.getItem('token')

  try {
    const { data } = await api.get<BaseResponse<LibraryFlowDetail>>(
      `/library/${flowId}`,
      {
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      },
    )

    if (!data.success) {
      throw new Error(data.message || '공개 흐름을 불러오지 못했습니다.')
    }

    return data.result
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}

// 공개 흐름을 원본으로 지정해 로그인 사용자의 복사본을 생성합니다.
export async function createCopiedFlow(
  originFlowId: number,
): Promise<CopiedFlowCreateResult> {
  const accessToken =
    localStorage.getItem('accessToken') ??
    localStorage.getItem('token')

  if (!accessToken) {
    throw new Error('로그인 후 흐름을 복사할 수 있습니다.')
  }

  try {
    const { data } = await api.post<BaseResponse<CopiedFlowCreateResult>>(
      '/flows',
      // 공개 흐름 복사는 원본 식별자만 전달합니다.
      { originFlowId },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    )

    if (!data.success) {
      throw new Error(data.message || '흐름을 복사하지 못했습니다.')
    }

    return data.result
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}
