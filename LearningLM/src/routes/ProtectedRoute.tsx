import {
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import {
  Navigate,
  useLocation,
} from 'react-router-dom'

import api from '../api/api'

interface ProtectedRouteProps {
  children: ReactNode
}

type AuthStatus =
  | 'checking'
  | 'authenticated'
  | 'guest'

export function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const location =
    useLocation()

  const [
    authStatus,
    setAuthStatus,
  ] = useState<AuthStatus>(
    'checking',
  )

  useEffect(() => {
    let cancelled = false

    const checkAuth =
      async () => {
        const accessToken =
          localStorage.getItem(
            'accessToken',
          )

        /**
         * Access Token 자체가 없으면
         * 서버 요청 없이 바로 비로그인 처리
         */
        if (!accessToken) {
          if (!cancelled) {
            setAuthStatus(
              'guest',
            )
          }

          return
        }

        try {
          /**
           * 실제 서버 인증 확인
           *
           * api.ts의 request interceptor가
           * Authorization 헤더를 자동으로 추가합니다.
           */
          await api.get(
            '/auth/me',
          )

          if (cancelled) {
            return
          }

          setAuthStatus(
            'authenticated',
          )
        } catch (error) {
          if (cancelled) {
            return
          }

          console.error(
            'ProtectedRoute 인증 확인 실패:',
            error,
          )

          /**
           * 유효하지 않은 인증 정보 제거
           */
          localStorage.removeItem(
            'accessToken',
          )

          localStorage.removeItem(
            'refreshToken',
          )

          localStorage.removeItem(
            'user',
          )

          setAuthStatus(
            'guest',
          )
        }
      }

    checkAuth()

    return () => {
      cancelled = true
    }
  }, [])

  /**
   * 인증 확인 중
   *
   * 확인이 끝나기 전에 보호된 페이지를
   * 잠깐이라도 렌더링하지 않도록 막습니다.
   */
  if (
    authStatus ===
    'checking'
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F5F7]">
        <div className="flex flex-col items-center gap-[12px]">
          <div className="h-[32px] w-[32px] animate-spin rounded-full border-[3px] border-[#E4E4E7] border-t-[#6366F1]" />

          <p className="text-[14px] font-medium text-[#666666]">
            로그인 상태를
            확인하고 있습니다.
          </p>
        </div>
      </div>
    )
  }

  /**
   * 인증 실패
   *
   * 현재 접근하려던 주소를
   * Login 페이지에 전달합니다.
   */
  if (
    authStatus ===
    'guest'
  ) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: {
            pathname:
              location.pathname,

            search:
              location.search,

            hash:
              location.hash,
          },
        }}
      />
    )
  }

  /**
   * 인증 성공
   */
  return children
}
