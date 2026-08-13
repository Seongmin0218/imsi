import {
  Navigate,
  createBrowserRouter,
} from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoute'

import { HomePage } from '../pages/home/HomePage'
import { PublicLibraryPage } from '../pages/library/PublicLibraryPage'
import LibraryDetailPage from '../pages/library/LibraryDetailPage'
import MyStoragePage from '../pages/storage/MyStoragePage'
import WorkflowDetailPage from '../pages/storage/WorkflowDetailPage'

import { Stdio_create1 } from '../pages/Stdio_create1'
import { Studio_create_review1 } from '../pages/Studio_create_review1'
import { Studio_create_review_details1 } from '../pages/Studio_create_review_details1'
import { Studio_create_review_publish1 } from '../pages/Studio_create_review_publish1'
import { Studio1 } from '../pages/Studio1'

import { OfficialTutorialPage } from '../pages/tutorial/OfficialTutorialPage'
import { TutorialDetailPage } from '../pages/tutorial/TutorialDetailPage'

import { StudioNodeCardTestPage } from '../pages/dev/StudioNodeCardTestPage'
import { ProcessTestPage } from '../pages/dev/ProcessTestPage'

import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { PwFind } from '../pages/PwFind'

import GoogleLoginLoading from '../pages/auth/GoogleLogin'
import GoogleLoginSuccess from '../pages/auth/GoogleLoginSuccess'
import GoogleLoginError from '../pages/auth/GoogleLoginError'
import { MyProfile } from '../pages/auth/MyProfile'

export const router = createBrowserRouter([
  /**
   * 공개 페이지
   */
  {
    path: '/',
    element: <HomePage />,
  },

  {
    path: '/home',
    element: (
      <Navigate
        to="/"
        replace
      />
    ),
  },

  /**
   * 인증
   */
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/register',
    element: <Register />,
  },

  {
    path: '/signup',
    element: (
      <Navigate
        to="/register"
        replace
      />
    ),
  },

  {
    path: '/pw-find',
    element: <PwFind />,
  },

  {
    path: '/password-find',
    element: (
      <Navigate
        to="/pw-find"
        replace
      />
    ),
  },

  /**
   * Google OAuth
   */
  {
    path: '/auth/google/loading',
    element: <GoogleLoginLoading />,
  },

  {
    path: '/auth/google/success',
    element: <GoogleLoginSuccess />,
  },

  {
    path: '/auth/google/error',
    element: <GoogleLoginError />,
  },

  /**
   * 공식 튜토리얼
   *
   * 로그인하지 않아도 조회 가능
   */
  {
    path: '/official-tutorials',
    element: <OfficialTutorialPage />,
  },

  {
    path: '/official-tutorials/:tutorialId',
    element: <TutorialDetailPage />,
  },

  /**
   * 마이 프로필
   *
   * 로그인 필요
   */
  {
    path: '/myProfile',
    element: (
      <ProtectedRoute>
        <MyProfile />
      </ProtectedRoute>
    ),
  },

  /**
   * Studio
   *
   * 로그인 필요
   */
  {
    path: '/studio',
    element: (
      <ProtectedRoute>
        <Studio1 />
      </ProtectedRoute>
    ),
  },

  {
    path: '/studio/create',
    element: (
      <ProtectedRoute>
        <Stdio_create1 />
      </ProtectedRoute>
    ),
  },

  {
    path: '/studio/:workflowId/edit',
    element: (
      <ProtectedRoute>
        <Stdio_create1 />
      </ProtectedRoute>
    ),
  },

  {
    path: '/studio/save/review',
    element: (
      <ProtectedRoute>
        <Studio_create_review1 />
      </ProtectedRoute>
    ),
  },

  {
    path: '/studio/save/details',
    element: (
      <ProtectedRoute>
        <Studio_create_review_details1 />
      </ProtectedRoute>
    ),
  },

  {
    path: '/studio/save/publish',
    element: (
      <ProtectedRoute>
        <Studio_create_review_publish1 />
      </ProtectedRoute>
    ),
  },

  /**
   * Workflow Preview
   *
   * 현재 사용자 Workflow 미리보기이므로 로그인 필요
   */
  {
    path: '/workflows/:workflowId/preview',
    element: (
      <ProtectedRoute>
        <Studio_create_review1 />
      </ProtectedRoute>
    ),
  },

  /**
   * 내 저장소
   *
   * 로그인 필요
   */
  {
    path: '/my-storage',
    element: (
      <ProtectedRoute>
        <MyStoragePage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/my-storage/workflows/:workflowId',
    element: (
      <ProtectedRoute>
        <WorkflowDetailPage />
      </ProtectedRoute>
    ),
  },

  {
    /**
     * 내가 만든 흐름 카드의
     * 미리보기 / 저장 전 검토 화면
     */
    path: '/my-storage/workflows/:workflowId/preview',
    element: (
      <ProtectedRoute>
        <Studio_create_review1 />
      </ProtectedRoute>
    ),
  },

  /**
   * 공개 라이브러리
   *
   * 로그인하지 않아도 조회 가능
   */
  {
    path: '/public-library',
    element: <PublicLibraryPage />,
  },

  {
    path: '/public-library/:libraryId',
    element: <LibraryDetailPage />,
  },

  /**
   * 개발 테스트 페이지
   */
  {
    path: '/studionodecardtestpage',
    element: <StudioNodeCardTestPage />,
  },

  {
    path: '/process-test',
    element: <ProcessTestPage />,
  },

  /**
   * 존재하지 않는 경로
   */
  {
    path: '*',
    element: (
      <Navigate
        to="/"
        replace
      />
    ),
  },
])
