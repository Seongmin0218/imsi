import axios from 'axios'
// 카테고리 정보 타입
export interface StorageCategory {
  categoryId: number
  code: string
  name: string
}
//저장된 튜토리얼 정보
export interface SavedTutorial {
  tutorialId: number
  title: string
  summary: string
  difficulty: string
  categories: StorageCategory[]
  thumbnailUrl: string | null
  status: string
  currentStepOrder: number
  totalSteps: number
  progressRate: number
  flowId: number | null
  createdAt: string
  updatedAt: string
}

export interface StorageCounts {
  saved: number
  own: number
  copied: number
}
// GET /storage/tutorials의 result 구조
export interface SavedTutorialsResponse {
  totalElements: number
  tutorials: SavedTutorial[]
  counts: StorageCounts
}

// 내가 만든 흐름과 복사한 흐름에서 공통으로 사용하는 항목
export interface StorageFlow {
  flowId: number
  title: string
  summary: string | null
  difficulty: string
  categories: StorageCategory[]
  mode: string
  visibility: string
  status: string
  originalFlowId: number | null
  originalAuthorNickname: string | null
  updatedAt: string
}

// GET /storage/flows 응답의 result 구조
export interface StorageFlowsResponse {
  totalElements: number
  flows: StorageFlow[]
  counts: StorageCounts
}

export interface FlowDetailBlock {
  flowBlockId: number
  blockId: number
  name: string
  stage: string
  blockOrder: number
  // Swagger 스키마에는 생략되어 있어도 실제 상세 응답에 포함되면 그대로 보존합니다.
  options?: Record<string, unknown>
  promptTemplateId?: number | null
}

// GET /flows/{flowId}의 result 구조입니다.
export interface FlowDetail {
  flowId: number
  title: string
  summary: string | null
  purpose: string | null
  difficulty: string
  categories: StorageCategory[]
  mode: string
  flowType: string
  visibility: 'PRIVATE' | 'PUBLIC'
  status: 'DRAFT' | 'COMPLETED'
  authorNote: string | null
  exampleInput: string | null
  exampleResult: string | null
  originFlowId: number | null
  blockFlow: FlowDetailBlock[]
  createdAt: string
  updatedAt: string
}

interface FlowUpdateResult {
  flowId: number
  status: 'DRAFT' | 'COMPLETED'
  updatedAt: string
}

interface FlowDeleteResult {
  flowId: number
  deleted: boolean
}

export type StorageFlowType = 'own' | 'copied'
// 백엔드 공통 응답 구조
interface BaseResponse<T> {
  code: string
  message: string
  result: T
  success: boolean
}

// 400, 401 등의 요청 실패 응답 구조
interface ApiErrorResponse {
  code: string
  message: string
  success: false
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10_000,
})

// Axios 오류에서 백엔드가 전달한 실제 오류 메시지를 꺼냄
function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ??
      '저장소 요청 처리 중 오류가 발생했습니다.'
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return '저장소 요청 처리 중 오류가 발생했습니다.'
}

// 저장한 튜토리얼 목록 조회
export async function getSavedTutorials(): Promise<SavedTutorialsResponse> {
  // 저장한 Access Token을 가져옴
  const accessToken =
    localStorage.getItem('accessToken') ??
    localStorage.getItem('token')

  try {
    // 인증이 필요한 Storage API 호출
    const { data } = await api.get<BaseResponse<SavedTutorialsResponse>>(
      '/storage/tutorials',
      {
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      },
    )

    // HTTP 요청은 성공했지만 백엔드가 실패로 응답한 경우
    if (!data.success) {
      throw new Error(
        data.message || '저장한 튜토리얼을 불러오지 못했습니다.',
      )
    }

    // 화면에서는 공통 응답 전체가 아니라 result 데이터만 사용
    return data.result
  } catch (error) {
    // 서버가 전달한 실제 오류 메시지로 변환
    throw new Error(getApiErrorMessage(error))
  }
}

// 내가 만든 흐름 또는 복사한 흐름 목록 조회
export async function getStorageFlows(
  type: StorageFlowType,
): Promise<StorageFlowsResponse> {
  const accessToken =
    localStorage.getItem('accessToken') ??
    localStorage.getItem('token')

  try {
    const { data } = await api.get<BaseResponse<StorageFlowsResponse>>(
      '/storage/flows',
      {
        // type은 own 또는 copied만 전달
        params: { type },
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      },
    )

    if (!data.success) {
      throw new Error(
        data.message || '저장한 흐름을 불러오지 못했습니다.',
      )
    }

    return data.result
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}

// 내가 만든 흐름과 복사한 흐름 모두 flowId로 같은 상세 API를 사용합니다.
export async function getFlowDetail(flowId: number): Promise<FlowDetail> {
  const accessToken =
    localStorage.getItem('accessToken') ??
    localStorage.getItem('token')

  try {
    const { data } = await api.get<BaseResponse<FlowDetail>>(
      `/flows/${flowId}`,
      {
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      },
    )

    if (!data.success) {
      throw new Error(data.message || '흐름 상세 정보를 불러오지 못했습니다.')
    }

    return data.result
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}

// 전체 갱신 API이므로 상세조회 데이터는 유지하고 visibility만 변경합니다.
export async function updateFlowVisibility(
  flowId: number,
  visibility: 'PUBLIC' | 'PRIVATE',
): Promise<FlowUpdateResult> {
  const accessToken =
    localStorage.getItem('accessToken') ??
    localStorage.getItem('token')

  if (!accessToken) throw new Error('로그인이 필요합니다.')

  try {
    const detail = await getFlowDetail(flowId)
    const { data } = await api.put<BaseResponse<FlowUpdateResult>>(
      `/flows/${flowId}`,
      {
        title: detail.title,
        summary: detail.summary,
        purpose: detail.purpose,
        difficulty: detail.difficulty,
        categoryIds: detail.categories.map((category) => category.categoryId),
        visibility,
        status: detail.status,
        authorNote: detail.authorNote,
        exampleInput: detail.exampleInput,
        exampleResult: detail.exampleResult,
        blocks: detail.blockFlow.map((block) => ({
          blockId: block.blockId,
          blockOrder: block.blockOrder,
          ...(block.options !== undefined ? { options: block.options } : {}),
          ...(block.promptTemplateId !== undefined
            ? { promptTemplateId: block.promptTemplateId }
            : {}),
        })),
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    )

    if (!data.success) {
      throw new Error(data.message || '공개 상태를 변경하지 못했습니다.')
    }
    return data.result
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}

export async function deleteStoredFlow(flowId: number): Promise<FlowDeleteResult> {
  const accessToken =
    localStorage.getItem('accessToken') ??
    localStorage.getItem('token')

  if (!accessToken) throw new Error('로그인이 필요합니다.')

  try {
    const { data } = await api.delete<BaseResponse<FlowDeleteResult>>(
      `/flows/${flowId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    )
    if (!data.success) {
      throw new Error(data.message || '흐름을 삭제하지 못했습니다.')
    }
    return data.result
  } catch (error) {
    throw new Error(getApiErrorMessage(error))
  }
}
