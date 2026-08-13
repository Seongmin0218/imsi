import { useState } from 'react'
import type { StudioNodeCardData } from '../../features/studio/types/studioNode'
import { StudioNodeCard } from '../../features/studio/components/node'

const demoNodes: StudioNodeCardData[] = [
  {
    id: 'input-basic',
    order: 1,
    stage: 'INPUT',
    title: '입력',
    statusLabel: '완료',
    state: 'complete',
    slots: [
      { id: 'text', label: '텍스트 입력', value: '리뷰 100건', required: true },
      { id: 'skill', label: '필요한 스킬', value: '요약', required: true },
    ],
  },
  {
    id: 'context-basic',
    order: 2,
    stage: 'CONTEXT',
    title: '컨텍스트',
    statusLabel: '완료',
    state: 'complete',
    slots: [
      { id: 'role', label: '역할 부여', value: '리뷰 분석가', required: true },
      { id: 'condition', label: '제약조건', value: '300자 이하', required: false },
    ],
  },
  {
    id: 'process-warning',
    order: 3,
    stage: 'PROCESS',
    title: '프로세스',
    statusLabel: '경고 1',
    state: 'warning',
    slots: [
      { id: 'extract', label: '핵심 추출', value: '요점', required: true },
      { id: 'summary', label: '요약 생성', value: '길이 보통', required: true },
    ],
  },
  {
    id: 'review-missing',
    order: 4,
    stage: 'REVIEW',
    title: '검토',
    statusLabel: '미입력 1',
    state: 'missing',
    slots: [
      {
        id: 'quality',
        label: '품질 검토',
        value: '기준 미입력',
        required: true,
        state: 'missing',
      },
      { id: 'format', label: '형식 확인', value: '선택', required: false },
    ],
  },
  {
    id: 'review-error',
    order: 4,
    stage: 'REVIEW',
    title: '검토',
    statusLabel: '오류 1',
    state: 'error',
    slots: [
      {
        id: 'quality',
        label: '품질 검토',
        value: '오류',
        required: true,
        state: 'error',
      },
      { id: 'format', label: '형식 확인', value: '선택', required: false },
    ],
  },
  {
    id: 'output-basic',
    order: 5,
    stage: 'OUTPUT',
    title: '결과',
    statusLabel: '완료',
    state: 'complete',
    slots: [
      { id: 'text-output', label: '텍스트 출력', value: '목록', required: true },
      { id: 'save', label: '저장소 저장', value: 'ON', required: false },
    ],
  },
  {
    id: 'output-pending',
    order: 5,
    stage: 'OUTPUT',
    title: '결과',
    statusLabel: '대기',
    state: 'pending',
    slots: [{ id: 'summary-output', label: '요약 출력 추가', required: true }],
  },
]

export function StudioNodeCardTestPage() {
  const [selectedNodeId, setSelectedNodeId] = useState(demoNodes[0].id)

  return (
    <div className="min-h-screen bg-slate-100 px-8 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header>
          <p className="text-sm font-black text-indigo-500">Studio Node</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
            Studio 노드 카드 테스트
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            중앙 캔버스에서 반복되는 노드 카드 상태를 한 번에 확인합니다.
          </p>
        </header>

        <section className="grid gap-6 xl:grid-cols-3">
          {demoNodes.map((node, index) => (
            <StudioNodeCard
              key={node.id}
              node={node}
              selected={selectedNodeId === node.id}
              showTargetHandle={index !== 0}
              showSourceHandle={index !== demoNodes.length - 1}
              onClick={() => setSelectedNodeId(node.id)}
            />
          ))}
        </section>
      </div>
    </div>
  )
}
