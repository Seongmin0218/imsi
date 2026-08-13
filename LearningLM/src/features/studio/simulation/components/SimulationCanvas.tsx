import { useMemo } from 'react'

import {
  Background,
  BackgroundVariant,
  BaseEdge,
  MarkerType,
  ReactFlow,
  getSmoothStepPath,
  type Edge,
  type EdgeProps,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import {
  STUDIO_FLOW_NODE_TYPE,
  studioNodeTypes,
  type StudioFlowNodeInstance,
} from '../../components/node/StudioFlowNode'

import {
  studioStageLabelMap,
} from '../../data/studioBlockCatalog'

import type {
  StudioNodeSlot,
  StudioNodeState,
  StudioStage,
} from '../../types/studioNode'

import type {
  StudioSimulationStepId,
  StudioSimulationValidationState,
} from '../types/studioSimulation'

type SimulationEdge = Edge<
  {
    active?: boolean
    complete?: boolean
  },
  'simulationFlow'
>

function SimulationFlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}: EdgeProps<SimulationEdge>) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 14,
    offset: 28,
  })

  const active = data?.active ?? false
  const complete = data?.complete ?? false

  const stroke = complete
    ? '#2F8A5B'
    : active
      ? '#6366F1'
      : '#CFCFD6'

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke,
          strokeWidth: active ? 3 : 2,
        }}
      />

      {active && (
        <circle
          r="6"
          fill="#6366F1"
          stroke="#FFFFFF"
          strokeWidth="2"
        >
          <animateMotion
            dur="0.95s"
            repeatCount="indefinite"
            path={edgePath}
          />
        </circle>
      )}
    </>
  )
}

const edgeTypes = {
  simulationFlow: SimulationFlowEdge,
}

interface SimulationCanvasProps {
  activeStepId: StudioSimulationStepId
  processBlockAttached: boolean
  connectionComplete: boolean
  activeEdgeId: string | null
  inspectorStrength: number
  validationState: StudioSimulationValidationState
}

function createDemoNode({
  stage,
  order,
  position,
  slots,
  state,
  selected = false,
  statusLabel,
}: {
  stage: StudioStage
  order: number
  position: { x: number; y: number }
  slots: StudioNodeSlot[]
  state: StudioNodeState
  selected?: boolean
  statusLabel: string
}): StudioFlowNodeInstance {
  const nodeId =
    `simulation-${stage.toLowerCase()}`

  return {
    id: nodeId,
    type: STUDIO_FLOW_NODE_TYPE,
    position,
    draggable: false,
    selectable: false,
    selected,
    data: {
      node: {
        id: nodeId,
        order,
        stage,
        title:
          `${studioStageLabelMap[stage]} 노드`,
        statusLabel,
        state,
        slots,
      },
      footerLabel:
        stage === 'OUTPUT'
          ? undefined
          : '다음 단계로 전달',
      handlesConnectable: false,
    },
  }
}

export function SimulationCanvas({
  activeStepId,
  processBlockAttached,
  connectionComplete,
  activeEdgeId,
  inspectorStrength,
  validationState,
}: SimulationCanvasProps) {
  const validationPassed =
    validationState === 'passed'

  const processSelected =
    activeStepId === 'inspector' ||
    activeStepId === 'validate' ||
    activeStepId === 'finish'

  const nodes = useMemo<
    StudioFlowNodeInstance[]
  >(() => {
    const completeState: StudioNodeState =
      validationPassed
        ? 'complete'
        : 'default'

    const processState: StudioNodeState =
      validationPassed
        ? 'complete'
        : !processBlockAttached
          ? 'warning'
          : processSelected
            ? 'selected'
            : 'default'

    return [
      createDemoNode({
        stage: 'INPUT',
        order: 1,
        position: { x: 0, y: 55 },
        state: completeState,
        statusLabel:
          validationPassed
            ? '완료'
            : '입력 준비',
        slots: [
          {
            id: 'input-text',
            label: '텍스트 입력',
            value: '예시 요청',
            required: true,
            state: 'filled',
          },
          {
            id: 'input-required-skill',
            label: '필요한 스킬',
            value: '요약',
            required: true,
            state: 'filled',
          },
        ],
      }),
      createDemoNode({
        stage: 'CONTEXT',
        order: 2,
        position: { x: 310, y: 150 },
        state: completeState,
        statusLabel:
          validationPassed
            ? '완료'
            : '컨텍스트 준비',
        slots: [
          {
            id: 'context-role',
            label: '역할 부여하기',
            value: '분석가',
            required: true,
            state: 'filled',
          },
        ],
      }),
      createDemoNode({
        stage: 'PROCESS',
        order: 3,
        position: { x: 620, y: 25 },
        state: processState,
        selected: processSelected,
        statusLabel:
          validationPassed
            ? '완료'
            : processBlockAttached
              ? '설정 중'
              : '블록 추가 필요',
        slots: processBlockAttached
          ? [
              {
                id: 'process-summary',
                label: '요약 생성',
                value:
                  inspectorStrength > 0
                    ? `강도 ${(inspectorStrength / 100).toFixed(1)}`
                    : '설정 필요',
                required: true,
                state:
                  inspectorStrength > 0
                    ? 'filled'
                    : 'warning',
              },
            ]
          : [],
      }),
      createDemoNode({
        stage: 'REVIEW',
        order: 4,
        position: { x: 930, y: 150 },
        state: completeState,
        statusLabel:
          validationPassed
            ? '완료'
            : '검토 준비',
        slots: [
          {
            id: 'review-quality',
            label: '품질 검토',
            value: '정확성 확인',
            required: true,
            state: 'filled',
          },
        ],
      }),
      createDemoNode({
        stage: 'OUTPUT',
        order: 5,
        position: { x: 1240, y: 60 },
        state: completeState,
        statusLabel:
          validationPassed
            ? '완료'
            : '출력 준비',
        slots: [
          {
            id: 'output-text',
            label: '텍스트로 출력하기',
            value: '텍스트',
            required: true,
            state: 'filled',
          },
        ],
      }),
    ]
  }, [
    inspectorStrength,
    processBlockAttached,
    processSelected,
    validationPassed,
  ])

  const edges = useMemo<SimulationEdge[]>(
    () => {
      const edgeDefinitions = [
        {
          id: 'edge-input-context',
          source: 'simulation-input',
          target: 'simulation-context',
        },
        {
          id: 'edge-context-process',
          source: 'simulation-context',
          target: 'simulation-process',
        },
        {
          id: 'edge-process-review',
          source: 'simulation-process',
          target: 'simulation-review',
        },
        {
          id: 'edge-review-output',
          source: 'simulation-review',
          target: 'simulation-output',
        },
      ]

      return edgeDefinitions.map(
        ({ id, source, target }) => {
          const active =
            activeEdgeId === id
          const complete =
            validationPassed ||
            connectionComplete

          return {
            id,
            source,
            target,
            type: 'simulationFlow',
            selectable: false,
            focusable: false,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: complete
                ? '#2F8A5B'
                : active
                  ? '#6366F1'
                  : '#A1A1AA',
            },
            data: {
              active,
              complete,
            },
          }
        },
      )
    },
    [
      activeEdgeId,
      connectionComplete,
      validationPassed,
    ],
  )

  return (
    <section className="relative h-full min-h-0 bg-[#F5F5F7]">
      <div className="absolute left-4 top-4 z-10 rounded-[10px] border border-[#E4E4E7] bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
        <p className="text-[11px] font-black text-[#52525B]">
          Studio Canvas
        </p>
        <p className="mt-0.5 text-[10px] font-semibold text-[#A1A1AA]">
          블록을 배치하고 노드를 연결합니다
        </p>
      </div>

      <ReactFlow<StudioFlowNodeInstance, SimulationEdge>
        nodes={nodes}
        edges={edges}
        nodeTypes={studioNodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnScroll={false}
        panOnDrag={false}
        preventScrolling={false}
        fitView
        fitViewOptions={{
          padding: 0.12,
          minZoom: 0.38,
          maxZoom: 0.78,
        }}
        minZoom={0.32}
        maxZoom={0.9}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1.2}
          color="#D8D8DE"
        />
      </ReactFlow>
    </section>
  )
}
