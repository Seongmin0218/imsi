import type {
  TutorialCategory,
  TutorialLevel,
} from '../../tutorial/data/tutorials'
import type { StudioStage } from '../../studio/types/studioNode'

export interface CreatedWorkflowFlowStep {
  id: string
  label: string
  stage: StudioStage
}

export interface SavedTutorialRecord {
  tutorialId: number
  currentStep: number
  totalSteps: number
}

export interface CreatedWorkflow {
  id: number
  title: string
  description: string
  level: TutorialLevel
  categories: TutorialCategory[]
  visibility: 'public' | 'private'
  updatedAt: string
  flowSteps: CreatedWorkflowFlowStep[]
  exampleInput: string
  exampleResult: string[]
  creatorNote: string
}

export interface CopiedWorkflow {
  id: number
  originalWorkflowId: number
  authorName: string
  authorInitial: string
  title: string
  description: string
  level: TutorialLevel
  categories: TutorialCategory[]
}

export const mockSavedTutorialRecords: SavedTutorialRecord[] = [
  {
    tutorialId: 1,
    currentStep: 3,
    totalSteps: 4,
  },
  {
    tutorialId: 2,
    currentStep: 2,
    totalSteps: 5,
  },
  {
    tutorialId: 3,
    currentStep: 4,
    totalSteps: 6,
  },
  {
    tutorialId: 4,
    currentStep: 3,
    totalSteps: 5,
  },
  {
    tutorialId: 5,
    currentStep: 2,
    totalSteps: 4,
  },
  {
    tutorialId: 6,
    currentStep: 3,
    totalSteps: 4,
  },
  {
    tutorialId: 7,
    currentStep: 1,
    totalSteps: 4,
  },
  {
    tutorialId: 8,
    currentStep: 2,
    totalSteps: 5,
  },
  {
    tutorialId: 9,
    currentStep: 1,
    totalSteps: 6,
  },
]
const baseMockCopiedWorkflows: CopiedWorkflow[] = [
  {
    id: 201,
    originalWorkflowId: 1001,
    authorName: '김리서처',
    authorInitial: '김',
    title: '경쟁사 리서치 정리표',
    description: '여러 출처를 표로 정리하는 공개 흐름.',
    level: '기초',
    categories: ['자료조사'],
  },
]

export const mockCopiedWorkflows: CopiedWorkflow[] = [
  ...baseMockCopiedWorkflows,
  ...Array.from({ length: 8 }, (_, index) => ({
    ...baseMockCopiedWorkflows[0],
    id: 202 + index,
    originalWorkflowId: 1002 + index,
    authorName: `워크플로 작성자 ${index + 2}`,
    authorInitial: `${index + 2}`,
    title: `공개 워크플로 복사본 ${index + 2}`,
    description: '공개 라이브러리에서 복사해 편집 중인 흐름입니다.',
  })),
]

const baseMockCreatedWorkflows: CreatedWorkflow[] = [
  {
    id: 101,
    title: '경쟁사 리서치 정리표',
    description: '여러 출처를 표로 정리하는 공개 흐름.',
    level: '기초',
    categories: ['자료조사'],
    visibility: 'private',

    updatedAt: '2일 전',

    flowSteps: [
      {
        id: 'topic-input',
        label: '주제 입력',
        stage: 'INPUT',
      },
      {
        id: 'web-search',
        label: '웹 검색',
        stage: 'CONTEXT',
      },
      {
        id: 'table-summary',
        label: '표 정리',
        stage: 'PROCESS',
      },
      {
        id: 'review',
        label: '검토',
        stage: 'REVIEW',
      },
      {
        id: 'output',
        label: '출력',
        stage: 'OUTPUT',
      },
    ],

    exampleInput:
      '국내 전기차 브랜드 5곳을 항목별로 비교 정리해줘',

    exampleResult: [
      '브랜드별 대표 제품',
      '가격대 비교',
      '주요 장점과 단점',
      '핵심 차이점',
    ],

    creatorNote:
      '출처가 많을 때는 검색 범위와 기간을 좁히면 결과가 더 정확해집니다.',
  },

  {
    id: 102,
    title: '제품 리뷰 요약기',
    description: '리뷰 데이터에서 장단점을 추출.',
    level: '입문',
    categories: ['결과물 검토'],
    visibility: 'public',

    updatedAt: '2일 전',

    flowSteps: [
      {
        id: 'review-upload',
        label: '파일 업로드',
        stage: 'INPUT',
      },
      {
        id: 'keyword-extract',
        label: '핵심 키워드',
        stage: 'CONTEXT',
      },
      {
        id: 'summary',
        label: '요약하기',
        stage: 'PROCESS',
      },
      {
        id: 'missing-check',
        label: '누락 확인',
        stage: 'REVIEW',
      },
      {
        id: 'text-output',
        label: '텍스트로 출력',
        stage: 'OUTPUT',
      },
    ],

    exampleInput:
      '이 제품 리뷰 100건의 장단점을 요약해줘',

    exampleResult: [
      '주요 장점',
      '주요 단점',
      '반복 언급 키워드',
      '종합 평가',
    ],

    creatorNote:
      '리뷰가 많을수록 반복적으로 등장하는 장단점을 더 정확하게 찾을 수 있습니다.',
  },

  {
    id: 103,
    title: '주간 업무 정리 자동화',
    description: '반복 작업을 체크리스트로 정리합니다.',
    level: '응용',
    categories: ['반복 작업 정리'],
    visibility: 'private',

    updatedAt: '5일 전',

    flowSteps: [
      {
        id: 'task-input',
        label: '업무 입력',
        stage: 'INPUT',
      },
      {
        id: 'task-classification',
        label: '업무 분류',
        stage: 'CONTEXT',
      },
      {
        id: 'priority',
        label: '우선순위 정리',
        stage: 'PROCESS',
      },
      {
        id: 'checklist',
        label: '체크리스트 생성',
        stage: 'OUTPUT',
      },
    ],

    exampleInput:
      '이번 주 완료 업무와 미완료 업무를 정리해줘',

    exampleResult: [
      '완료 업무',
      '진행 중 업무',
      '미완료 업무',
      '다음 주 우선순위',
    ],

    creatorNote:
      '각 업무에 마감일과 담당자를 함께 입력하면 더 구체적으로 정리됩니다.',
  },

  {
    id: 104,
    title: '블로그 초안 작성 흐름',
    description: '주제 입력부터 초안 생성까지 구성합니다.',
    level: '기초',
    categories: ['글쓰기'],
    visibility: 'public',

    updatedAt: '1주 전',

    flowSteps: [
      {
        id: 'topic-input',
        label: '주제 입력',
        stage: 'INPUT',
      },
      {
        id: 'reader-select',
        label: '대상 독자 설정',
        stage: 'CONTEXT',
      },
      {
        id: 'outline',
        label: '목차 생성',
        stage: 'PROCESS',
      },
      {
        id: 'draft',
        label: '초안 작성',
        stage: 'OUTPUT',
      },
    ],

    exampleInput:
      '초보자를 위한 러닝 입문 글을 작성해줘',

    exampleResult: [
      '제목',
      '도입부',
      '본문 목차',
      '마무리 문장',
    ],

    creatorNote:
      '대상 독자와 원하는 말투를 구체적으로 입력하면 결과가 자연스러워집니다.',
  },

  {
    id: 105,
    title: '회의록 후속 업무 정리',
    description: '회의록에서 담당 업무를 분리합니다.',
    level: '기초',
    categories: ['문서요약'],
    visibility: 'private',

    updatedAt: '1주 전',

    flowSteps: [
      {
        id: 'minutes-input',
        label: '회의록 입력',
        stage: 'INPUT',
      },
      {
        id: 'decision-summary',
        label: '결정사항 추출',
        stage: 'PROCESS',
      },
      {
        id: 'task-extract',
        label: '담당 업무 분리',
        stage: 'REVIEW',
      },
      {
        id: 'deadline',
        label: '마감일 정리',
        stage: 'OUTPUT',
      },
    ],

    exampleInput:
      '회의록에서 담당자별 업무와 마감일을 정리해줘',

    exampleResult: [
      '결정사항',
      '담당자별 업무',
      '마감일',
      '추가 확인사항',
    ],

    creatorNote:
      '회의록에 담당자 이름이 명확히 적혀 있을수록 결과가 정확합니다.',
  },

  {
    id: 106,
    title: 'AI 도구 비교 흐름',
    description: 'AI 도구별 특징과 장단점을 비교합니다.',
    level: '입문',
    categories: ['AI 툴 활용'],
    visibility: 'public',

    updatedAt: '2주 전',

    flowSteps: [
      {
        id: 'tool-input',
        label: '도구 입력',
        stage: 'INPUT',
      },
      {
        id: 'feature-search',
        label: '특징 조사',
        stage: 'CONTEXT',
      },
      {
        id: 'comparison',
        label: '장단점 비교',
        stage: 'PROCESS',
      },
      {
        id: 'recommendation',
        label: '추천 정리',
        stage: 'OUTPUT',
      },
    ],

    exampleInput:
      'ChatGPT, Claude, Gemini의 특징을 비교해줘',

    exampleResult: [
      '주요 기능',
      '장점',
      '단점',
      '추천 사용 상황',
    ],

    creatorNote:
      '비교 목적과 사용 환경을 같이 입력하면 추천 결과가 더 구체적입니다.',
  },
]

export const mockCreatedWorkflows: CreatedWorkflow[] = [
  ...baseMockCreatedWorkflows,
  ...baseMockCreatedWorkflows.slice(0, 3).map((workflow, index) => ({
    ...workflow,
    id: 107 + index,
    title: `${workflow.title} 확장 ${index + 1}`,
    updatedAt: '방금 전',
  })),
]
