# 📘 LearningLM Frontend

> **AI를 단순 질문·답변 도구에서 실제 작업 흐름을 설계하는 도구로 확장하는 학습 플랫폼**

LearningLM은 초급 사용자가 생성형 AI를 단순히 “질문하면 답변을 받는 챗봇”으로만 사용하는 단계에서 벗어나, 실제 작업 목적에 맞는 AI 활용 흐름을 이해하고 직접 조합해 볼 수 있도록 돕는 학습 플랫폼입니다.

LearningLM은 실제 AI 자동화 실행 도구가 아니라, 사용자가 AI 활용 방식을 학습하고, 튜토리얼을 따라가며, 자신만의 워크플로우를 구성해 보는 프론트엔드 중심의 학습 서비스입니다.

<br/>

## 🚀 Deployment

현재 LearningLM 프론트엔드는 Vercel에 배포되어 있습니다.

* **Production URL:** https://umc-learning-lm-fe.vercel.app
* **Repository:** https://github.com/UMCLearningLM/UMCLearningLM_FE
* **Production Branch:** `main`
* **Build Command:** `npm run build`
* **Output Directory:** `dist`

`main` 브랜치에 변경 사항이 반영되면 Vercel에서 프로덕션 배포를 진행합니다. Pull Request와 기능 개발 브랜치는 Vercel Preview Deployment를 통해 병합 전에 실제 화면을 확인할 수 있습니다.

<br/>

## 💡 Service Vision: "From Prompting to Workflow"

LearningLM은 AI 사용 경험이 부족한 초급 사용자가 프롬프트 입력에만 머무르지 않고, 목적에 맞는 AI 활용 흐름을 단계적으로 이해하도록 돕는 것을 목표로 합니다.

* **AI 활용 흐름 학습:** 단순 질문·답변을 넘어 작업 목적에 맞는 AI 사용 단계를 학습합니다.
* **튜토리얼 기반 이해:** 공식 튜토리얼을 통해 AI 활용 사례와 구성 방식을 익힙니다.
* **워크플로우 조합 경험:** Studio에서 직접 블록과 단계를 구성하며 AI 활용 구조를 체험합니다.
* **저장과 공유:** 완성한 워크플로우를 저장하고, 다른 사용자의 예시를 탐색할 수 있습니다.

<br/>

## 🛠️ Service Structure

LearningLM은 사용자가 AI 활용법을 배우고, 직접 구성하고, 저장하거나 공유하는 흐름을 중심으로 설계됩니다.

### 1. Home

* 서비스의 핵심 가치와 주요 기능을 소개합니다.
* 사용자가 Official Tutorials, Studio, Public Library 등 주요 기능으로 진입할 수 있도록 안내합니다.

### 2. Official Tutorials

* 초급 사용자를 위한 공식 AI 활용 튜토리얼 목록을 제공합니다.
* 검색, 난이도, 카테고리 필터를 통해 원하는 튜토리얼을 탐색합니다.
* 튜토리얼을 통해 AI를 활용하는 흐름과 각 단계의 의미를 학습합니다.

### 3. Tutorial Detail / Tutorial Start

* 선택한 튜토리얼의 목적, 구성 단계, 예상 결과를 확인합니다.
* 사용자는 안내에 따라 단계별 AI 활용 흐름을 따라갈 수 있습니다.
* 튜토리얼 시작 시 Guided Studio로 이동하여 미리 구성된 흐름을 학습합니다.

### 4. Studio

* 사용자가 직접 AI 활용 워크플로우를 구성하는 핵심 작업 공간입니다.
* Guided Studio와 Create Studio로 구분하여 초급자와 자유 제작 사용자를 모두 지원합니다.
* 입력, 컨텍스트, 프로세스, 검토, 결과 노드를 조합하여 하나의 작업 흐름을 만듭니다.
* `@xyflow/react`를 활용하여 노드 배치, 연결, 이동이 가능한 워크플로우 편집 화면을 구성합니다.

### 5. Preview / Validation

* 사용자가 구성한 워크플로우의 흐름을 미리 확인합니다.
* 필수 블록과 슬롯이 모두 채워졌는지 검증합니다.
* 구성 단계가 논리적으로 이어지는지 확인하고 예시 결과를 살펴봅니다.
* 검증 결과는 `PASS`, `INSUFFICIENT`, `PENDING` 등의 상태로 표현할 수 있도록 설계합니다.

### 6. My Storage

* 사용자가 저장한 튜토리얼과 워크플로우를 관리합니다.
* 이전에 만든 흐름을 다시 확인하거나 수정할 수 있습니다.
* 직접 만든 흐름과 Public Library에서 복사한 흐름을 구분하여 관리합니다.

### 7. Public Library

* 다른 사용자가 공유한 워크플로우를 탐색합니다.
* 검색, 카테고리, 난이도 필터를 통해 다양한 활용 사례를 확인합니다.
* 공개 워크플로우를 자신의 저장소로 복사한 뒤 Studio에서 수정할 수 있습니다.

### 8. Auth

* Google OAuth 로그인과 이메일 기반 인증 화면을 제공합니다.
* 로그인, 회원가입, 비밀번호 찾기, 인증 성공·실패 화면을 포함합니다.
* 저장, 공유, 개인 워크플로우 관리 기능과 연결됩니다.

<br/>

## ✨ Implementation Highlights

LearningLM 프론트엔드는 사용자가 AI 활용 흐름을 자연스럽게 이해할 수 있도록 화면 흐름, 상태 관리, 단계별 인터랙션에 집중합니다.

* **Learning Flow 중심 설계:** 튜토리얼 탐색부터 Studio 제작, Preview, 저장까지 이어지는 학습 흐름을 제공합니다.
* **State-Driven UI:** 사용자가 선택한 튜토리얼, 블록, 워크플로우 단계에 따라 화면 상태가 동적으로 변경됩니다.
* **Node-Based Workflow Editor:** `@xyflow/react`를 사용하여 블록과 노드를 시각적으로 배치하고 연결하는 Studio를 구현합니다.
* **Workflow Preview:** 사용자가 구성한 AI 활용 흐름을 미리 확인하고 검토할 수 있도록 설계합니다.
* **Reusable Components:** 버튼, 카드, 배지, 입력 폼, 선택 컴포넌트 등 반복되는 UI를 공용 컴포넌트로 분리합니다.
* **Accessible UI Foundation:** Base UI와 공통 UI 컴포넌트를 활용하여 키보드 조작과 상태 표현을 고려합니다.
* **Feature-based Architecture:** 기능 단위로 폴더를 분리하여 유지보수성과 협업 효율을 높입니다.
* **Utility-based Styling:** Tailwind CSS와 CVA를 활용하여 컴포넌트의 크기와 상태별 스타일을 관리합니다.
* **SPA Routing:** React Router DOM을 기반으로 Home, Tutorial, Studio, Storage, Library, Auth 화면을 연결합니다.

---

## 📔 LearningLM의 프론트엔드 저장소입니다

React, TypeScript, Vite를 기반으로 하며, 유지보수성을 위해 기능 단위 Feature-based Architecture를 따릅니다.

<br/>

## 🛠 Tech Stack

| 분류                  | 기술                        | 비고                        |
| :------------------ | :------------------------ | :------------------------ |
| **Core**            | React, TypeScript         | UI 구성 및 정적 타입 검사          |
| **Build**           | Vite                      | 개발 서버 및 프로덕션 빌드           |
| **Routing**         | React Router DOM          | SPA 라우팅 및 동적 경로 관리        |
| **Workflow Editor** | `@xyflow/react`           | Studio 노드 배치, 연결, 이동      |
| **Server State**    | TanStack Query            | API 데이터 조회, 캐싱, 동기화       |
| **Client State**    | Zustand                   | Studio와 인증 관련 전역 상태 관리    |
| **Network**         | Axios                     | HTTP 비동기 통신               |
| **Style**           | Tailwind CSS              | 유틸리티 기반 스타일링              |
| **UI Foundation**   | Base UI, shadcn           | 접근성을 고려한 UI 기반 컴포넌트       |
| **Animation**       | tw-animate-css            | UI 전환 및 애니메이션 유틸리티        |
| **Variant Styling** | class-variance-authority  | 컴포넌트 상태와 크기별 스타일 관리       |
| **Class Utilities** | clsx, tailwind-merge      | 조건부 클래스 및 Tailwind 클래스 병합 |
| **Icons**           | lucide-react, react-icons | 공통 아이콘 및 브랜드 아이콘          |
| **Font**            | Geist Variable            | 전역 기본 폰트                  |
| **Package Manager** | npm                       | 패키지 및 잠금 파일 관리            |
| **Quality**         | ESLint, TypeScript        | 코드 품질 및 타입 오류 검사          |
| **Deploy**          | Vercel                    | 프로덕션 및 Preview Deployment |

<br/>

## 📦 Main Libraries

### `@xyflow/react`

Studio의 노드 기반 워크플로우 편집 화면을 구성하기 위해 사용합니다.

주요 사용 목적:

* 워크플로우 노드 렌더링
* 노드 간 연결선 표현
* 노드 드래그 및 위치 변경
* 캔버스 이동과 확대·축소
* 입력, 컨텍스트, 프로세스, 검토, 결과 노드 연결
* 선택한 노드와 Inspector 상태 연동

```tsx
import { ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
```

### TanStack Query

서버에서 전달받는 튜토리얼, 워크플로우, Public Library 데이터를 관리하기 위해 사용합니다.

```tsx
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
```

주요 사용 대상:

* 튜토리얼 목록 및 상세 조회
* 워크플로우 저장 및 수정
* Public Library 조회
* 사용자 저장소 조회
* 서버 데이터 캐싱과 재요청

### Zustand

Studio의 노드, 블록, 선택 상태 등 클라이언트 중심 상태를 관리하기 위해 사용합니다.

주요 관리 대상:

* 현재 선택한 노드
* Studio 모드
* 노드와 연결선 목록
* 워크플로우 제목 및 설명
* 필수 슬롯 입력 상태
* 검증 및 저장 상태
* 로그인 사용자 상태

### Base UI / shadcn

Button, Slider 등 공용 UI의 기반으로 사용합니다.

직접 작성한 LearningLM 디자인 시스템과 결합하여 재사용 가능한 공용 컴포넌트를 구성합니다.

### class-variance-authority

버튼, 배지, 상태 컴포넌트의 variant와 size 스타일을 관리합니다.

```tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        secondary: 'bg-secondary',
      },
      size: {
        sm: 'h-8 px-3',
        lg: 'h-11 px-6',
      },
    },
  },
)
```

<br/>

## Getting Started

이 프로젝트는 Node.js v20 LTS 이상 환경을 권장합니다.

```bash
node -v
npm -v
```

### 1. 프로젝트 클론

```bash
git clone https://github.com/UMCLearningLM/UMCLearningLM_FE.git
cd UMCLearningLM_FE
```

### 2. 패키지 설치

```bash
npm install
```

팀원들과 `package-lock.json`에 기록된 동일한 패키지 버전을 설치하려면 아래 명령어를 사용합니다.

```bash
npm ci
```

일반적으로 새 패키지를 추가하지 않고 프로젝트를 실행하거나 CI 환경에서 설치할 때는 `npm ci` 사용을 권장합니다.

### 3. 환경 변수 설정

루트 디렉토리에 `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다.

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Vite에서 브라우저 코드에 노출할 환경 변수는 반드시 `VITE_` 접두사를 사용해야 합니다.

환경 변수 사용 예시:

```tsx
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
```

`.env` 파일에는 서버 주소나 개인 개발 환경 설정이 포함될 수 있으므로 Git에 커밋하지 않습니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

```txt
http://localhost:5173
```

### 5. 프로덕션 빌드 확인

```bash
npm run build
```

현재 빌드 명령은 TypeScript 프로젝트 검사와 Vite 빌드를 함께 실행합니다.

```json
{
  "build": "tsc -b && vite build"
}
```

빌드 결과는 `dist` 디렉토리에 생성됩니다.

### 6. 프로덕션 빌드 로컬 확인

```bash
npm run preview
```

<br/>

## 📂 Project Structure

LearningLM은 기능 중심 아키텍처를 기반으로 합니다. 화면, 컴포넌트, 훅, API 로직을 기능 단위로 모아 관리합니다.

```text
src/
├── assets/                  # 이미지, 아이콘, 폰트 등 정적 리소스
│
├── components/              # 전역 공용 UI 컴포넌트
│   ├── layout/              # Header, Footer, PageContainer, Section
│   └── ui/                  # Button, Input, Select, Card, Badge 등
│
├── api/                     # 기능별 API 요청 함수 및 타입
│   ├── auth/                # 로그인, 회원가입 API
│   ├── tutorial/            # 튜토리얼 관련 API
│   ├── workflow/            # 워크플로우 생성, 저장, 조회 API
│   └── library/             # Public Library 관련 API
│
├── features/                # 핵심 도메인별 기능 모음
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   ├── home/
│   │   ├── components/
│   │   └── hooks/
│   │
│   ├── tutorial/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   ├── studio/
│   │   ├── components/
│   │   │   ├── node/        # Studio 공통 노드 UI
│   │   │   ├── block/       # 노드별 블록 설정 UI
│   │   │   ├── editor/      # Studio 편집 영역
│   │   │   └── preview/     # Preview 관련 UI
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── storage/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   ├── library/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   └── user/
│       ├── components/
│       ├── hooks/
│       └── utils/
│
├── pages/                   # 라우트 페이지, features 조립
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── GoogleLogin.tsx
│   │   ├── GoogleLoginSuccess.tsx
│   │   └── GoogleLoginError.tsx
│   │
│   ├── home/
│   │   └── HomePage.tsx
│   │
│   ├── tutorial/
│   │   ├── OfficialTutorialPage.tsx
│   │   └── TutorialDetailPage.tsx
│   │
│   ├── studio/
│   │   ├── StudioPage.tsx
│   │   ├── GuidedStudioPage.tsx
│   │   └── CreateStudioPage.tsx
│   │
│   ├── storage/
│   │   ├── MyStoragePage.tsx
│   │   └── WorkflowDetailPage.tsx
│   │
│   ├── library/
│   │   ├── PublicLibraryPage.tsx
│   │   └── LibraryDetailPage.tsx
│   │
│   └── dev/                 # 공통 컴포넌트 및 Studio 노드 테스트
│
├── routes/
│   └── router.tsx
│
├── services/
│   └── axiosInstance.ts
│
├── store/
│   ├── authStore.ts
│   └── workflowStore.ts
│
├── types/
│   ├── auth.ts
│   ├── tutorial.ts
│   └── workflow.ts
│
├── lib/
│   └── utils.ts             # cn 등 UI 공용 유틸리티
│
├── utils/
│
├── App.tsx
├── main.tsx
└── index.css
```

### 개발 원칙

1. **Colocation:** 특정 기능에서만 쓰이는 컴포넌트는 `features/기능명/components` 안에 둡니다.
2. **Barrel Exports:** `index.ts`를 활용하여 import 경로를 정리합니다.
3. **Absolute Import:** `../../` 대신 `@/features/user`와 같은 절대 경로를 사용합니다.
4. **Feature First:** 페이지는 기능 컴포넌트를 조립하고, 실제 UI와 로직은 `features` 내부에서 관리합니다.
5. **Page Responsibility:** `pages`는 라우팅 파라미터와 기능 조립을 담당하고 복잡한 비즈니스 로직을 직접 포함하지 않습니다.
6. **Server / Client State Separation:** API 데이터는 TanStack Query, 편집 중인 UI 상태는 Zustand 또는 지역 상태로 관리합니다.

<br/>

## 🧭 Screen List & Flow

### 주요 화면 목록

| 구분       | 화면                 | 설명                    |
| :------- | :----------------- | :-------------------- |
| Home     | Home               | 서비스 소개 및 주요 기능 진입     |
| Tutorial | Official Tutorials | 공식 튜토리얼 목록            |
| Tutorial | Tutorial Detail    | 튜토리얼 상세 정보            |
| Tutorial | Tutorial Start     | 튜토리얼 단계별 진행           |
| Studio   | Studio             | 워크플로우 제작 메인 화면        |
| Studio   | Guided Studio      | 안내 기반 워크플로우 제작        |
| Studio   | Create Studio      | 자유 제작 워크플로우 편집        |
| Studio   | Preview            | 제작한 흐름 미리보기           |
| Storage  | My Storage         | 저장한 튜토리얼 및 워크플로우 목록   |
| Storage  | Workflow Detail    | 저장된 워크플로우 상세          |
| Library  | Public Library     | 공개 워크플로우 탐색           |
| Library  | Library Detail     | 공개 워크플로우 상세           |
| Auth     | Login              | 로그인                   |
| Auth     | Signup             | 회원가입                  |
| Auth     | Password Find      | 비밀번호 찾기               |
| Auth     | OAuth Result       | Google 로그인 성공 및 실패 처리 |

### 기본 사용자 흐름

```text
Home
 ├── Official Tutorials
 │    └── Tutorial Detail
 │         └── Tutorial Start
 │              └── Guided Studio
 │                   └── Validation / Preview
 │                        └── My Storage
 │
 ├── Create Studio
 │    └── Validation / Preview
 │         └── My Storage
 │
 └── Public Library
      └── Library Detail
           └── Copy Workflow
                └── Studio
                     └── My Storage
```

<br/>

## 🌐 Routing

LearningLM은 `createBrowserRouter`와 `RouterProvider`를 사용하여 SPA 라우팅을 구성합니다.

```tsx
import { RouterProvider } from 'react-router-dom'

import { router } from './routes/router'

function App() {
  return <RouterProvider router={router} />
}

export default App
```

주요 경로 예시:

```text
/
├── official-tutorials
│   └── :tutorialId
├── studio
│   └── :workflowId/edit
├── my-storage
│   └── workflows/:workflowId
├── public-library
│   └── :libraryId
├── login
├── register
└── pw-find
```

모든 앱 라우팅은 `src/routes/router.tsx`에서 관리합니다. 컴포넌트 내부에서 별도의 `BrowserRouter`를 생성하지 않습니다.

<br/>

## 🌿 Branch Strategy

### 기본 브랜치

* `main`: 배포 가능한 안정 버전
* `dev`: 개발 통합 브랜치
* `feature/*`: 기능 개발 브랜치

### 브랜치 명명 규칙

```txt
타입/기능명_작성자
```

| 타입       | 설명          | 예시                               |
| :------- | :---------- | :------------------------------- |
| feat     | 새로운 기능 추가   | feat/login_seongmin              |
| fix      | 버그 수정       | fix/studio-preview_seongmin      |
| design   | 스타일 및 UI 수정 | design/home-layout_seongmin      |
| refactor | 코드 구조 개선    | refactor/workflow-store_seongmin |
| docs     | 문서 수정       | docs/readme_seongmin             |

<br/>

## Commit Convention

커밋 메시지는 Conventional Commits 규칙을 따릅니다.

```txt
feat: 로그인 페이지 구현
fix: Studio Preview 렌더링 오류 수정
design: Home CTA 버튼 스타일 수정
refactor: workflow store 구조 분리
docs: README 배포 정보 추가
```

<br/>

## Code Quality

PR을 올리기 전 아래 명령어를 실행하여 타입 오류, 빌드 오류, 린트 오류를 확인합니다.

```bash
npm run build
npm run lint
```

현재 `npm run build`에는 TypeScript 검사가 포함되어 있습니다.

```bash
tsc -b && vite build
```

따라서 별도의 `type-check` 스크립트를 추가하지 않은 상태에서는 `npm run build`로 타입 검사와 빌드를 함께 확인합니다.

<br/>

## ▲ Vercel Deployment

### Production Deployment

LearningLM은 Vercel에서 `main` 브랜치를 기준으로 프로덕션 배포를 진행합니다.

```text
main push
→ Vercel Build
→ TypeScript Check
→ Vite Production Build
→ dist 배포
```

현재 프로덕션 주소:

```txt
https://umc-learning-lm-fe.vercel.app
```

### Preview Deployment

Pull Request 또는 기능 브랜치를 원격 저장소에 Push하면 Vercel Preview Deployment를 사용할 수 있습니다.

Preview Deployment를 통해 다음 내용을 병합 전에 확인합니다.

* 페이지 라우팅
* 반응형 레이아웃
* 환경 변수 연결
* API 호출 주소
* Studio 캔버스 렌더링
* Public Library와 Storage 화면
* 직접 URL 접근과 새로고침

### Vercel 프로젝트 설정

Vercel 프로젝트에서 다음 값을 사용합니다.

| 항목                | 값                         |
| :---------------- | :------------------------ |
| Framework Preset  | Vite                      |
| Install Command   | `npm ci` 또는 `npm install` |
| Build Command     | `npm run build`           |
| Output Directory  | `dist`                    |
| Node.js Version   | 20.x                      |
| Production Branch | `main`                    |

### Vercel 환경 변수

Vercel Dashboard에서 아래 경로로 이동하여 환경 변수를 등록합니다.

```text
Project
→ Settings
→ Environment Variables
```

예시:

```env
VITE_API_BASE_URL=https://api.example.com/api
```

환경 변수는 필요에 따라 Production, Preview, Development 환경별로 구분하여 등록합니다.

환경 변수를 추가하거나 수정한 뒤에는 기존 배포에 자동으로 적용되지 않을 수 있으므로 Redeploy를 진행합니다.

### SPA 라우팅 설정

LearningLM은 React Router 기반 SPA이므로 `/official-tutorials/1`, `/public-library/1`과 같은 경로에서 브라우저 새로고침을 했을 때 Vercel이 해당 경로의 실제 파일을 찾으려고 할 수 있습니다.

직접 경로 접근 시 404 오류가 발생한다면 프로젝트 루트에 `vercel.json`을 추가합니다.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

이 설정은 모든 프론트엔드 경로를 `index.html`로 전달하고, 이후 React Router가 실제 화면을 렌더링하도록 합니다.

### 배포 전 확인 명령어

```bash
npm ci
npm run build
npm run lint
```

빌드가 완료되면 아래 명령어로 프로덕션 결과를 로컬에서 확인할 수 있습니다.

```bash
npm run preview
```

<br/>

## Troubleshooting

### Q. `npm install` 시 에러가 발생해요

Node.js와 npm 버전을 확인합니다.

```bash
node -v
npm -v
```

Node.js v20 이상 사용을 권장합니다.

`package-lock.json`과 동일한 버전을 설치해야 한다면 다음 명령어를 사용합니다.

```bash
npm ci
```

### Q. `@/` import 경로가 인식되지 않아요

VS Code에서 TypeScript 서버를 재시작합니다.

```txt
Ctrl + Shift + P
→ TypeScript: Restart TS Server
```

`tsconfig.app.json`과 `vite.config.ts`에 `@` alias가 모두 설정되어 있는지도 확인합니다.

### Q. 개발 서버가 실행되지 않아요

패키지 설치 여부와 `.env` 파일이 존재하는지 확인합니다.

```bash
npm install
npm run dev
```

### Q. Vercel에서 환경 변수가 적용되지 않아요

환경 변수 이름이 `VITE_`로 시작하는지 확인합니다.

```env
VITE_API_BASE_URL=https://api.example.com/api
```

Vercel 환경 변수를 수정한 뒤에는 Redeploy를 진행합니다.

### Q. Vercel에서 하위 페이지를 새로고침하면 404가 발생해요

React Router의 SPA 경로를 Vercel이 실제 파일 경로로 해석해서 발생할 수 있습니다.

프로젝트 루트에 다음 `vercel.json`을 추가합니다.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Q. Studio 화면에서 React Flow 스타일이 적용되지 않아요

`@xyflow/react` 기본 CSS가 import되어 있는지 확인합니다.

```tsx
import '@xyflow/react/dist/style.css'
```

전역으로 사용할 경우 `main.tsx` 또는 Studio 진입 파일에서 한 번만 import합니다.

### Q. `npm run type-check` 명령어가 동작하지 않아요

현재 `package.json`에는 별도의 `type-check` 스크립트가 없을 수 있습니다.

현재 빌드 명령에 TypeScript 검사가 포함되어 있으므로 다음 명령어를 사용합니다.

```bash
npm run build
```

별도의 명령어가 필요한 경우 `package.json`에 아래 스크립트를 추가할 수 있습니다.

```json
{
  "scripts": {
    "type-check": "tsc -b"
  }
}
```

---

## 문의

문의사항은 팀 Discord 또는 Notion에 공유된 프론트엔드 채널을 이용해 주세요.
