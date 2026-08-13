import type { StudioSimulationStep } from '../types/studioSimulation'

export const studioSimulationSteps = [
  {
    id: 'palette',
    shortTitle: '팔레트',
    title: '① 블록 팔레트에서 필요한 기능을 고릅니다',
    description:
      '왼쪽 팔레트는 입력, 컨텍스트, 프로세스, 검토, 결과 단계별 블록으로 나뉩니다.',
    durationMs: 2400,
  },
  {
    id: 'add-block',
    shortTitle: '블록 추가',
    title: '② 블록을 캔버스의 알맞은 노드에 추가합니다',
    description:
      '예시로 프로세스 단계의 “요약 생성” 블록을 프로세스 노드에 추가합니다.',
    durationMs: 2800,
    stage: 'PROCESS',
    blockId: 'process-summary',
  },
  {
    id: 'connect',
    shortTitle: '노드 연결',
    title: '③ 노드의 Handle을 연결해 작업 순서를 만듭니다',
    description:
      '노드는 입력에서 결과 방향으로 연결되며, 연결선을 따라 다음 단계로 데이터가 전달됩니다.',
    durationMs: 2600,
    stage: 'PROCESS',
  },
  {
    id: 'inspector',
    shortTitle: '설정',
    title: '④ 선택한 노드의 세부 설정은 인스펙터에서 조정합니다',
    description:
      '노드에 포함된 블록의 필수 값과 옵션을 확인하고 필요한 설정을 채웁니다.',
    durationMs: 3000,
    stage: 'PROCESS',
    blockId: 'process-summary',
  },
  {
    id: 'validate',
    shortTitle: '검증',
    title: '⑤ 검증으로 누락된 필수 블록과 설정을 확인합니다',
    description:
      '필수 블록, 필수 슬롯, 연결 구조를 확인한 뒤 문제가 있으면 해당 위치를 수정합니다.',
    durationMs: 2800,
  },
  {
    id: 'finish',
    shortTitle: '완료',
    title: '⑥ 검증을 통과하면 미리보기와 저장으로 이어집니다',
    description:
      '구성이 끝난 워크플로우는 미리보기로 결과를 확인한 뒤 내 저장소에 저장할 수 있습니다.',
    durationMs: 3600,
  },
] as const satisfies readonly StudioSimulationStep[]
