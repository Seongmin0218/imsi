import {
  Search,
} from 'lucide-react'

import {
  useEffect,
  useState,
  useRef,
  type FormEvent,
} from 'react'

import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import api from '../../api/api'

const navItems = [
  {
    label: '홈',
    path: '/',
  },
  {
    label: '공식 튜토리얼',
    path: '/official-tutorials',
  },
  {
    label: '스튜디오',
    path: '/studio',
  },
  {
    label: '공개 라이브러리',
    path: '/public-library',
  },
  {
    label: '내 저장소',
    path: '/my-storage',
  },
]

interface CurrentUser {
  userId: number
  email: string
  nickname: string
  loginType: 'LOCAL' | 'SOCIAL'
  provider: string | null
}

type AuthStatus =
  | 'checking'
  | 'authenticated'
  | 'guest'

export function Header() {
  const navigate =
    useNavigate()

  const location =
    useLocation()

  const [
    searchKeyword,
    setSearchKeyword,
  ] = useState('')

  const [
    authStatus,
    setAuthStatus,
  ] = useState<AuthStatus>(
    'checking',
  )

  const [
    currentUser,
    setCurrentUser,
  ] = useState<CurrentUser | null>(
    null,
  )
  const [
    isProfileMenuOpen,
    setIsProfileMenuOpen,
  ] = useState(false)

  const profileMenuRef =
    useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      )
    }
  }, [])
  /**
   * 현재 사용자 확인
   *
   * accessToken이 존재한다고 해서
   * 무조건 로그인 상태로 판단하지 않습니다.
   *
   * GET /auth/me 요청이 정상적으로
   * 성공한 경우에만 로그인 상태로 처리합니다.
   */
  useEffect(() => {
    let cancelled = false

    const checkAuth =
      async () => {
        const accessToken =
          localStorage.getItem(
            'accessToken',
          ) ??
          sessionStorage.getItem(
            'accessToken',
          );

        /**
         * 토큰 자체가 없으면
         * 서버 요청 없이 비로그인 처리
         */
        if (!accessToken) {
          if (!cancelled) {
            setCurrentUser(null)
            setAuthStatus(
              'guest',
            )
          }

          return
        }

        try {
          const response =
            await api.get(
              '/auth/me',
            )

          if (cancelled) {
            return
          }

          const user =
            response.data
              ?.result as
            | CurrentUser
            | undefined

          /**
           * 정상 응답인데도
           * 사용자 정보가 없다면
           * 로그인 상태로 인정하지 않음
           */
          if (!user) {
            throw new Error(
              '현재 사용자 정보가 없습니다.',
            )
          }

          setCurrentUser(
            user,
          )

          setAuthStatus(
            'authenticated',
          )
        } catch (error) {
          if (cancelled) {
            return
          }

          console.error(
            '현재 사용자 조회 실패:',
            error,
          )

          /**
           * 유효하지 않은 인증 정보 정리
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

          setCurrentUser(null)

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
   * 현재 메뉴 활성화 여부
   */
  const isActivePath = (
    path: string,
  ) => {
    if (path === '/') {
      return (
        location.pathname ===
        '/'
      )
    }

    return location.pathname.startsWith(
      path,
    )
  }

  /**
   * 헤더 검색
   */
  const handleSearch = () => {
    const keyword =
      searchKeyword.trim()

    if (!keyword) {
      navigate(
        '/official-tutorials',
      )

      return
    }

    navigate(
      `/official-tutorials?q=${encodeURIComponent(
        keyword,
      )}`,
    )
  }

  const handleSearchSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    handleSearch()
  }

  const handleLogout = async () => {
    const accessToken =
      localStorage.getItem('accessToken')

    const refreshToken =
      localStorage.getItem('refreshToken')

    // 토큰이 없으면 서버 요청 없이 로그아웃 처리
    if (!accessToken || !refreshToken) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')

      setCurrentUser(null)
      setAuthStatus('guest')
      setIsProfileMenuOpen(false)

      navigate('/login')

      return
    }

    try {
      // 백엔드 로그아웃 API 호출
      await api.post(
        '/auth/logout',
        {
          refreshToken,
        },
      )

      console.log('로그아웃 성공')

      // 로그아웃 성공 후 로컬 인증 정보 삭제
      localStorage.removeItem(
        'accessToken',
      )

      localStorage.removeItem(
        'refreshToken',
      )

      localStorage.removeItem(
        'user',
      )

      setCurrentUser(null)
      setAuthStatus('guest')
      setIsProfileMenuOpen(false)

      // navigate('/login')
    } catch (error) {
      console.error(
        '로그아웃 실패:',
        error,
      )
    }
  }

  /**
   * 사용자 프로필 버튼에
   * 표시할 한 글자
   *
   * nickname이 있으면 첫 글자를 사용하고
   * 혹시 비어 있다면 기본값으로 "내"를 사용합니다.
   */
  const profileLabel =
    currentUser?.nickname
      ?.trim()
      ?.charAt(0) ||
    '내'

  return (
    <header className="sticky top-0 z-[999] w-full border-b border-[#E4E4E7] bg-white">
      <div className="mx-auto flex h-[58px] w-full max-w-[1440px] items-center px-[28px]">
        {/* 왼쪽 */}
        <div className="flex min-w-0 items-center">
          {/* Logo */}
          <button
            type="button"
            aria-label="홈으로 이동"
            className="flex cursor-pointer items-center gap-[8px]"
            onClick={() => {
              navigate('/')
            }}
          >
            <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[7px] bg-[#6366F1] text-[14px] font-bold text-white">
              L
            </div>

            <span className="whitespace-nowrap text-[18px] font-bold tracking-[-0.03em] text-[#27272A]">
              LearningLM
            </span>
          </button>

          {/* Navigation */}
          <nav className="ml-[34px] hidden items-center gap-[31px] lg:flex">
            {navItems.map(
              (item) => {
                const active =
                  isActivePath(
                    item.path,
                  )

                return (
                  <button
                    key={
                      item.path
                    }
                    type="button"
                    onClick={() => {
                      navigate(
                        item.path,
                      )
                    }}
                    className={[
                      'cursor-pointer whitespace-nowrap text-[13px] font-medium tracking-[-0.02em] transition-colors',

                      active
                        ? 'font-semibold text-[#6366F1]'
                        : 'text-[#666666] hover:text-[#6366F1]',
                    ].join(
                      ' ',
                    )}
                  >
                    {
                      item.label
                    }
                  </button>
                )
              },
            )}
          </nav>
        </div>

        {/* 오른쪽 */}
        <div className="ml-auto flex shrink-0 items-center gap-[17px]">
          {/* Search */}
          <form
            onSubmit={
              handleSearchSubmit
            }
            className="hidden h-[31px] w-[205px] items-center overflow-hidden rounded-[3px] bg-[#F1F1F3] md:flex"
          >
            <input
              type="search"
              value={
                searchKeyword
              }
              onChange={(
                event,
              ) => {
                setSearchKeyword(
                  event.target
                    .value,
                )
              }}
              placeholder="검색어를 입력하세요"
              aria-label="검색어 입력"
              className="h-full min-w-0 flex-1 bg-transparent px-[11px] text-[11px] text-[#52525B] outline-none placeholder:text-[#9A9AA3]"
            />

            <button
              type="submit"
              aria-label="검색"
              className="flex h-full w-[31px] cursor-pointer items-center justify-center text-[#52525B] transition-colors hover:text-[#6366F1]"
            >
              <Search
                size={14}
                strokeWidth={2}
              />
            </button>
          </form>

          {/* 인증 확인 중 */}
          {authStatus ===
            'checking' && (
              <div
                className="h-[31px] w-[72px]"
                aria-hidden="true"
              />
            )}

          {/* 비로그인 */}
          {authStatus ===
            'guest' && (
              <button
                type="button"
                onClick={() => {
                  navigate(
                    '/login',
                  )
                }}
                className="cursor-pointer whitespace-nowrap text-[11px] font-medium tracking-[-0.02em] text-[#666666] transition-colors hover:text-[#6366F1]"
              >
                로그인/회원가입
              </button>
            )}

          {/* 로그인 */}
          {authStatus ===
            'authenticated' &&
            currentUser && (
              <div
                ref={profileMenuRef}
                className="relative"
              >
                {/* 프로필 버튼 */}
                <button
                  type="button"
                  aria-label={`${currentUser.nickname}님의 프로필 메뉴`}
                  title={currentUser.nickname}
                  onClick={() => {
                    setIsProfileMenuOpen(
                      (prev) => !prev,
                    )
                  }}
                  className="flex h-[31px] w-[31px] cursor-pointer items-center justify-center rounded-full border border-[#E4E4E7] bg-[#F5F5F7] text-[12px] font-bold text-[#52525B] transition-colors hover:border-[#6366F1] hover:text-[#6366F1]"
                >
                  {profileLabel}
                </button>

                {/* 드롭다운 메뉴 */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-[39px] z-[1000] w-[145px] overflow-hidden rounded-[2px] border border-[#E4E4E7] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)]">

                    {/* 프로필 설정 */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                        navigate('/profile')
                      }}
                      className="flex h-[55px] w-full cursor-pointer items-center justify-center border-b border-[#E4E4E7] bg-white text-[18px] font-semibold text-[#52525B] transition-colors hover:bg-[#F8F8FA]"
                    >
                      프로필 설정
                    </button>

                    {/* 로그아웃 */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex h-[55px] w-full cursor-pointer items-center justify-center bg-white text-[18px] font-semibold text-[#E58A8A] transition-colors hover:bg-[#F8F8FA]"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </header>
  )
}