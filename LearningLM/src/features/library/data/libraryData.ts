export type LibraryLevel = '입문' | '기초' | '응용'

export type LibraryCategory =
  | '커뮤니티'
  | '자료조사'
  | '튜토리얼'
  | '문서요약'
  | '요약'
  | '글쓰기'
  | '결과물 검토'
  | 'AI 툴 활용'
  | '반복 작업 정리'

export type LibraryFlowColor =
  | 'blue'
  | 'teal'
  | 'indigo'
  | 'amber'
  | 'green'

export interface LibraryFlowStep {
  id: string
  label: string
  color: LibraryFlowColor
}

export interface LibraryComment {
  id: number
  authorName: string
  authorInitial: string
  content: string
  createdAt: string
}

export interface LibraryItem {
  id: number

  authorName: string
  authorInitial: string

  title: string
  description: string

  level: LibraryLevel
  categories: LibraryCategory[]

  saves: number
  copies: number
  comments: number
  bookmarks: number

  flowSteps: LibraryFlowStep[]

  exampleInput: string
  exampleResult: string[]

  creatorNote: string
  commentItems: LibraryComment[]
}

export const libraryLevels: LibraryLevel[] = [
  '입문',
  '기초',
  '응용',
]

export const libraryCategories: LibraryCategory[] = [
  '커뮤니티',
  '자료조사',
  '튜토리얼',
  '문서요약',
  '요약',
  '글쓰기',
  '결과물 검토',
  'AI 툴 활용',
  '반복 작업 정리',
]

const baseLibraryItems: LibraryItem[] = [
  {
    id: 1,

    authorName: '김리서처',
    authorInitial: '김',

    title: '경쟁사 리서치 정리표',
    description:
      '여러 출처의 정보를 비교표로 정리하는 공개 워크플로우입니다.',

    level: '기초',
    categories: ['자료조사', '요약', 'AI 툴 활용'],

    saves: 129,
    copies: 64,
    comments: 2,
    bookmarks: 89,

    flowSteps: [
      {
        id: 'research-input',
        label: '주제 입력',
        color: 'blue',
      },
      {
        id: 'web-search',
        label: '웹 검색',
        color: 'teal',
      },
      {
        id: 'comparison',
        label: '표 정리',
        color: 'indigo',
      },
      {
        id: 'review',
        label: '검토',
        color: 'amber',
      },
      {
        id: 'output',
        label: '출력',
        color: 'green',
      },
    ],

    exampleInput:
      '국내 전기차 브랜드 5곳을 항목별로 비교 정리해줘',

    exampleResult: [
      '브랜드명',
      '주요 제품',
      '가격대',
      '핵심 특징',
      '장점과 단점',
    ],

    creatorNote:
      '출처가 많을 때는 검색 블록의 기간을 좁혀 정확도를 높여보세요.',

    commentItems: [
      {
        id: 1,
        authorName: '박워크',
        authorInitial: '박',
        content:
          '표 형식이 깔끔해서 그대로 복사해 썼어요. 감사합니다!',
        createdAt: '3일 전',
      },
      {
        id: 2,
        authorName: '백워크',
        authorInitial: '백',
        content:
          '자료 비교할 때 정말 편리했습니다.',
        createdAt: '3일 전',
      },
    ],
  },

  {
    id: 2,

    authorName: '이정리',
    authorInitial: '이',

    title: '제품 리뷰 요약기',
    description:
      '여러 제품 리뷰에서 공통 장점과 단점을 추출하는 워크플로우입니다.',

    level: '입문',
    categories: ['결과물 검토', '요약'],

    saves: 84,
    copies: 31,
    comments: 1,
    bookmarks: 45,

    flowSteps: [
      {
        id: 'review-input',
        label: '리뷰 입력',
        color: 'blue',
      },
      {
        id: 'keyword',
        label: '키워드 추출',
        color: 'teal',
      },
      {
        id: 'summary',
        label: '장단점 요약',
        color: 'indigo',
      },
      {
        id: 'output',
        label: '결과 출력',
        color: 'green',
      },
    ],

    exampleInput:
      '무선 이어폰 사용자 리뷰 30개에서 장단점을 정리해줘',

    exampleResult: [
      '긍정 평가',
      '부정 평가',
      '반복 키워드',
      '구매 추천 대상',
    ],

    creatorNote:
      '리뷰를 한 줄씩 구분해서 입력하면 결과가 더 정확합니다.',

    commentItems: [
      {
        id: 1,
        authorName: '최문서',
        authorInitial: '최',
        content:
          '리뷰 정리할 때 반복 작업이 많이 줄었어요.',
        createdAt: '1일 전',
      },
    ],
  },

  {
    id: 3,

    authorName: '박워크',
    authorInitial: '박',

    title: '주간 업무 정리 자동화',
    description:
      '한 주 동안 진행한 업무를 유형별로 분류하고 다음 할 일을 정리합니다.',

    level: '응용',
    categories: ['반복 작업 정리'],

    saves: 72,
    copies: 28,
    comments: 0,
    bookmarks: 36,

    flowSteps: [
      {
        id: 'task-input',
        label: '업무 입력',
        color: 'blue',
      },
      {
        id: 'classification',
        label: '업무 분류',
        color: 'teal',
      },
      {
        id: 'priority',
        label: '우선순위',
        color: 'amber',
      },
      {
        id: 'output',
        label: '주간 보고서',
        color: 'green',
      },
    ],

    exampleInput:
      '이번 주에 완료한 업무와 미완료 업무를 주간 보고서로 만들어줘',

    exampleResult: [
      '완료 업무',
      '진행 중 업무',
      '미완료 업무',
      '다음 주 우선순위',
    ],

    creatorNote:
      '업무마다 마감일을 함께 입력하면 우선순위 정리가 쉬워집니다.',

    commentItems: [],
  },
]

export const libraryItems: LibraryItem[] = [
  ...baseLibraryItems,
  ...Array.from({ length: 6 }, (_, index) => {
    const sourceItem = baseLibraryItems[index % baseLibraryItems.length]
    const variantNumber = index + 1

    return {
      ...sourceItem,
      id: baseLibraryItems.length + variantNumber,
      authorName: `워크플로 작성자 ${variantNumber}`,
      authorInitial: `${variantNumber}`,
      title: `${sourceItem.title} 활용 ${variantNumber}`,
      description: `${sourceItem.description} 다양한 상황에 적용할 수 있도록 확장한 버전입니다.`,
      saves: sourceItem.saves + variantNumber * 3,
      copies: sourceItem.copies + variantNumber * 2,
    }
  }),
]

export function getLibraryItemById(
  libraryId: number,
) {
  return libraryItems.find(
    (item) => item.id === libraryId,
  )
}
