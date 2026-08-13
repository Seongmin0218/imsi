// 모든 백엔드 API가 공통으로 사용하는 성공 응답 구조
export interface BaseResponse<T> {
  code: string
  message: string
  result: T
  success: boolean
}

// 400, 401 등 오류가 발생했을 때의 응답 구조
export interface ApiErrorResponse {
  code: string
  message: string
  success: false
}