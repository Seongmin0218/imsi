import {
  useEffect,
  useMemo,
  useState,
  type DragEvent,
} from 'react'

import {
  MarkerType,
  ReactFlow,
  type Edge,
} from '@xyflow/react'

import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { Header } from '../components/layout/Header'
import searchRound from '../assets/searchRound.svg'
import searchStick from '../assets/searchStick.svg'
import dashed from '../assets/dashed.png'

import {
  StudioBlockInspector,
  type StudioInspectorConnectionInfo,
} from '../features/studio/components/inspector/StudioBlockInspector'

import {
  studioNodeTypes,
  type StudioFlowNodeInstance,
} from '../features/studio/components/node/StudioFlowNode'

import {
  STUDIO_STAGE_ORDER,
  getStudioBlockDefinition,
  studioBlockCatalog,
  studioStageLabelMap,
} from '../features/studio/data/studioBlockCatalog'

import { useStudioEditor } from '../features/studio/hooks/useStudioEditor'

import type {
  StudioBlockDefinition,
  StudioBlockRequirement,
} from '../features/studio/types/studioBlock'

import type {
  StudioNodeSlot,
  StudioStage,
} from '../features/studio/types/studioNode'

import type {
  StudioValidationIssue,
  StudioWorkflowValidationResult,
} from '../features/studio/types/studioValidation'

import { validateStudioWorkflow } from '../features/studio/validation/validateStudioWorkflow'
import { useRef } from 'react'

import {
  FlowPreviewResponse,
  saveFlow,
  type FlowSavePayload,
} from './api/StudioApi'

type ValidationCheckStatus =
  | 'pass'
  | 'fail'
  | 'warning'
  | 'pending'

type ValidationCheck = {
  id: number
  title: string
  status: ValidationCheckStatus
  criterion: string
  result: string
}

type StudioNavigationState = {
  mode?: 'guided' | 'create' | 'copied' | 'edit'
  tutorialId?: number
  copiedLibraryItemId?: number
  workflowId?: number
  nodes?: StudioFlowNodeInstance[]
  edges?: Edge[]
  validationResult?: StudioWorkflowValidationResult | null
}




const stageStyleMap: Record<
  StudioStage,
  {
    dot: string
    text: string
    soft: string
  }
> = {
  INPUT: {
    dot: 'bg-[#4A5E8A]',
    text: 'text-[#4A5E8A]',
    soft: 'bg-[#EEF1F7]',
  },
  CONTEXT: {
    dot: 'bg-[#2F8190]',
    text: 'text-[#2F8190]',
    soft: 'bg-[#EDF7F8]',
  },
  PROCESS: {
    dot: 'bg-[#6366F1]',
    text: 'text-[#6366F1]',
    soft: 'bg-[#F0F0FF]',
  },
  REVIEW: {
    dot: 'bg-[#B07A2E]',
    text: 'text-[#B07A2E]',
    soft: 'bg-[#FBF6EC]',
  },
  OUTPUT: {
    dot: 'bg-[#3C7A52]',
    text: 'text-[#3C7A52]',
    soft: 'bg-[#EEF4EE]',
  },
}

const requirementStyleMap: Record<
  StudioBlockRequirement,
  {
    label: string
    className: string
  }
> = {
  required: {
    label: '필수',
    className: 'text-[#6366F1]',
  },
  recommended: {
    label: '권장',
    className:
      'rounded-[8px] bg-[#EEF4EE] px-[8px] py-[4px] text-[#3C7A52]',
  },
  optional: {
    label: '선택',
    className:
      'rounded-[8px] bg-[#F0F0F3] px-[8px] py-[4px] text-[#9A9AA3]',
  },
}

const validationStatusStyleMap: Record<
  ValidationCheckStatus,
  {
    dot: string
    badge: string
    label: string
  }
> = {
  pass: {
    dot: 'bg-[#2F8A5B]',
    badge: 'bg-[#EEF4EE] text-[#2F7D52]',
    label: '통과',
  },
  fail: {
    dot: 'bg-[#B4453A]',
    badge: 'bg-[#FBF1F0] text-[#B4453A]',
    label: '미통과',
  },
  warning: {
    dot: 'bg-[#B88A3C]',
    badge: 'bg-[#FBF6EC] text-[#9A6A1E]',
    label: '미흡',
  },
  pending: {
    dot: 'bg-[#E7E7EC]',
    badge: 'bg-[#F0F0F3] text-[#9A9AA3]',
    label: '대기',
  },
}

function hasSlotValue(
  slot: StudioNodeSlot,
): boolean {
  if (slot.state === 'filled') {
    return true
  }

  return (
    typeof slot.value === 'string' &&
    slot.value.trim().length > 0
  )
}

function getIssueBlockTitles(
  issues: readonly StudioValidationIssue[],
): string {
  const titles = issues.map((issue) => {
    if (!issue.blockId) {
      return issue.message
    }

    return (
      getStudioBlockDefinition(
        issue.blockId,
      )?.title ?? issue.message
    )
  })

  return titles.join(', ')
}

function PaletteBlockCard({
  block,
  onDragStart,
}: {
  block: StudioBlockDefinition
  onDragStart: (
    event: DragEvent<HTMLDivElement>,
    blockId: string,
  ) => void
}) {
  const stageStyle = stageStyleMap[block.stage]
  const requirement = requirementStyleMap[block.requirement]
  const available = block.availability === 'available'

  return (
    <div
      draggable={available}
      onDragStart={(event) => {
        if (!available) {
          event.preventDefault()
          return
        }

        onDragStart(event, block.id)
      }}
      className={[
        'mb-[12px] h-[72px] w-[290px] rounded-[12px] border-[1.5px] border-[#E4E4E7] bg-white px-[16.5px] pt-[13.88px] transition',
        available
          ? 'cursor-grab hover:border-[#B8BAFF] hover:bg-[#FAFAFF] active:cursor-grabbing'
          : 'cursor-not-allowed opacity-55',
      ].join(' ')}
    >
      <div className="flex items-center">
        <div
          className={[
            'h-[13px] w-[13px] shrink-0 rounded-[4px]',
            stageStyle.dot,
          ].join(' ')}
        />

        <p className="ml-[12px] min-w-0 flex-1 truncate text-[16px] font-bold">
          {block.title}
        </p>

        <span
          className={[
            'ml-[8px] shrink-0 text-[12px] font-bold',
            available
              ? requirement.className
              : 'rounded-[8px] bg-[#F0F0F3] px-[8px] py-[4px] text-[#9A9AA3]',
          ].join(' ')}
        >
          {available ? requirement.label : '준비중'}
        </span>
      </div>

      <p className="ml-[25px] mt-[2px] truncate text-[14px] text-[#9A9AA3]">
        {block.description}
      </p>
    </div>
  )
}

function ValidationRow({
  check,
  open,
  onToggle,
}: {
  check: ValidationCheck
  open: boolean
  onToggle: () => void
}) {
  const statusStyle = validationStatusStyleMap[check.status]

  return (
    <div className="min-h-[54px] border-t-[1.5px] border-[#EEEEF1] px-[21px] pt-[10px]">
      <div className="flex items-center">
        <div
          className={[
            'h-[23px] w-[23px] shrink-0 rounded-full',
            statusStyle.dot,
          ].join(' ')}
        />

        <p className="ml-[13.5px] min-w-0 flex-1 text-[17px] font-bold">
          {check.title}
        </p>

        <div className="flex items-center">
          <span
            className={[
              'flex h-[22.5px] min-w-[44px] items-center justify-center rounded-[8px] px-[7px] text-[12.5px] font-bold',
              statusStyle.badge,
            ].join(' ')}
          >
            {statusStyle.label}
          </span>

          <button
            type="button"
            onClick={onToggle}
            aria-label={`${check.title} 상세 ${open ? '닫기' : '열기'}`}
            className="ml-[13.5px] mt-[-4px] text-[19.5px] text-[#9A9AA3]"
          >
            {open ? '⌃' : '⌄'}
          </button>
        </div>
      </div>

      {open && (
        <div className="mb-[19px] mt-[10px] pl-[36.5px] pr-[8px] text-[14.5px] font-bold leading-[23px]">
          <p>
            채점 기준
            <span className="font-normal text-[#52525B]">
              · {check.criterion}
            </span>
          </p>

          <p className="mt-[8px]">
            확인 결과
            <span className="font-normal text-[#52525B]">
              · {check.result}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export function Stdio_create1() {
  const navigate = useNavigate()
  const location = useLocation()
  const { workflowId } = useParams()

  const locationState =
    (location.state as StudioNavigationState | null) ?? null

  const [searchText, setSearchText] = useState('')
  const [openValidationId, setOpenValidationId] =
    useState<number | null>(null)
  const [validationResult, setValidationResult] =
    useState<StudioWorkflowValidationResult | null>(
      locationState?.validationResult ?? null,
    )

  /*
   * API 연동 전 라우트 연결 단계에서는 location.state로 넘겨진
   * 노드와 연결선을 초기값으로 재사용합니다.
   * 전달된 값이 없으면 기존 요구사항대로 노드 0개로 시작합니다.
   */
  const studio = useStudioEditor({
    initialNodes: locationState?.nodes ?? [],
    initialEdges: locationState?.edges ?? [],
  })

  const selectedNode =
    studio.nodes.find((node) => node.selected) ?? null

    const selectedNodeConnectionInfo =
  useMemo<StudioInspectorConnectionInfo>(
    () => {
      if (!selectedNode) {
        return {
          incomingNodes: [],
          outgoingNodes: [],
        }
      }

      const incomingNodeIds =
        new Set(
          studio.edges
            .filter(
              (edge) =>
                edge.target ===
                selectedNode.id,
            )
            .map(
              (edge) =>
                edge.source,
            ),
        )

      const outgoingNodeIds =
        new Set(
          studio.edges
            .filter(
              (edge) =>
                edge.source ===
                selectedNode.id,
            )
            .map(
              (edge) =>
                edge.target,
            ),
        )

      const toConnectedNode = (
        node: StudioFlowNodeInstance,
      ) => ({
        id:
          node.id,

        title:
          node.data.node.title,

        stage:
          node.data.node.stage,

        slots:
          node.data.node.slots,
      })

      return {
        incomingNodes:
          studio.nodes
            .filter(
              (node) =>
                incomingNodeIds.has(
                  node.id,
                ),
            )
            .map(
              toConnectedNode,
            ),

        outgoingNodes:
          studio.nodes
            .filter(
              (node) =>
                outgoingNodeIds.has(
                  node.id,
                ),
            )
            .map(
              toConnectedNode,
            ),
      }
    },
    [
      selectedNode,
      studio.edges,
      studio.nodes,
    ],
  )

  const filteredBlocks = useMemo(() => {
    const keyword = searchText.trim().toLowerCase()

    if (!keyword) {
      return studioBlockCatalog
    }

    return studioBlockCatalog.filter(
      (block) =>
        block.title.toLowerCase().includes(keyword) ||
        block.description.toLowerCase().includes(keyword),
    )
  }, [searchText])

    const workflowStructureSignature =
  useMemo(() => {
    const nodeSignature =
      studio.nodes
        .map((node) => {
          const slots =
            node.data.node.slots
              .map((slot) =>
                [
                  slot.id,
                  slot.value ??
                    '',
                  slot.state ??
                    '',
                  slot.required
                    ? '1'
                    : '0',
                  JSON.stringify(
                    slot.config ??
                      {},
                  ),
                ].join(':'),
              )
              .sort()
              .join(',')

          return [
            node.id,
            node.data.node.stage,
            slots,
          ].join('|')
        })
        .sort()
        .join('||')

    const edgeSignature =
      studio.edges
        .map(
          (edge) =>
            [
              edge.source,
              edge.target,
              edge.sourceHandle ??
                '',
              edge.targetHandle ??
                '',
            ].join('>'),
        )
        .sort()
        .join('||')

    return [
      nodeSignature,
      edgeSignature,
    ].join('###')
  }, [
    studio.nodes,
    studio.edges,
  ])

  useEffect(() => {
    setValidationResult(null)
  }, [workflowStructureSignature])

  const validationChecks = useMemo<ValidationCheck[]>(() => {
    if (!validationResult) {
      return [
        {
          id: 1,
          title: '입력 노드 CORE 블록',
          status: 'pending',
          criterion:
            '입력 단계의 필수 블록이 모두 포함되어야 합니다.',
          result: '아직 검증을 실행하지 않았습니다.',
        },
        {
          id: 2,
          title: '프로세스 노드 CORE 블록',
          status: 'pending',
          criterion:
            '프로세스 단계의 필수 블록이 모두 포함되어야 합니다.',
          result: '아직 검증을 실행하지 않았습니다.',
        },
        {
          id: 3,
          title: '결과 노드 CORE 블록',
          status: 'pending',
          criterion:
            '결과 단계의 필수 블록이 모두 포함되어야 합니다.',
          result: '아직 검증을 실행하지 않았습니다.',
        },
        {
          id: 4,
          title: '필수 슬롯 채움',
          status: 'pending',
          criterion:
            '각 노드의 required slot 설정이 모두 완료되어야 합니다.',
          result: '아직 검증을 실행하지 않았습니다.',
        },
        {
          id: 5,
          title: '저장 조건',
          status: 'pending',
          criterion:
            '필수 블록과 필수 슬롯 검증을 통과해야 합니다.',
          result: '검증을 실행하면 저장 가능 여부가 표시됩니다.',
        },
      ]
    }

    const missingRequiredByStage = (stage: StudioStage) =>
      validationResult.issues.filter(
        (issue) =>
          issue.stage === stage &&
          issue.type === 'missing-required-block',
      )

    const inputIssues = missingRequiredByStage('INPUT')
    const processIssues = missingRequiredByStage('PROCESS')
    const outputIssues = missingRequiredByStage('OUTPUT')

    const slotIssues = validationResult.issues.filter(
      (issue) =>
        issue.type === 'missing-required-slot-value' ||
        issue.type === 'invalid-required-slot' ||
        issue.type === 'required-slot-warning',
    )

    const slotErrorIssues = slotIssues.filter(
      (issue) => issue.severity === 'error',
    )

    const buildStageResult = (issues: StudioValidationIssue[]) =>
      issues.length === 0
        ? '필수 블록이 모두 포함되어 있습니다.'
        : `누락: ${getIssueBlockTitles(issues)}`

    return [
      {
        id: 1,
        title: '입력 노드 CORE 블록',
        status: inputIssues.length === 0 ? 'pass' : 'fail',
        criterion:
          '입력 단계의 필수 블록이 모두 포함되어야 합니다.',
        result: buildStageResult(inputIssues),
      },
      {
        id: 2,
        title: '프로세스 노드 CORE 블록',
        status: processIssues.length === 0 ? 'pass' : 'fail',
        criterion:
          '프로세스 단계의 필수 블록이 모두 포함되어야 합니다.',
        result: buildStageResult(processIssues),
      },
      {
        id: 3,
        title: '결과 노드 CORE 블록',
        status: outputIssues.length === 0 ? 'pass' : 'fail',
        criterion:
          '결과 단계의 필수 블록이 모두 포함되어야 합니다.',
        result: buildStageResult(outputIssues),
      },
      {
        id: 4,
        title: '필수 슬롯 채움',
        status: slotIssues.length === 0 ? 'pass' : 'warning',
        criterion:
          '각 노드의 required slot 설정이 모두 완료되어야 합니다.',
        result:
          slotIssues.length === 0
            ? '필수 슬롯 설정이 모두 완료되었습니다.'
            : slotIssues.map((issue) => issue.message).join(' '),
      },
      {
        id: 5,
        title: '저장 조건',
        status: validationResult.valid ? 'pass' : 'pending',
        criterion:
          '필수 블록과 필수 슬롯 검증을 통과해야 합니다.',
        result: validationResult.valid
          ? '저장 조건을 충족했습니다.'
          : `오류 ${validationResult.errorCount}개가 남아 있어 저장할 수 없습니다.${slotErrorIssues.length > 0
            ? ' 필수 슬롯 설정을 확인하세요.'
            : ''
          }`,
      },
    ]
  }, [validationResult])

  const validationSummary = useMemo(() => {
    const passCount = validationChecks.filter(
      (check) => check.status === 'pass',
    ).length

    const insufficientCount = validationChecks.filter(
      (check) =>
        check.status === 'warning' ||
        check.status === 'fail',
    ).length

    const pendingCount = validationChecks.filter(
      (check) => check.status === 'pending',
    ).length

    return {
      passCount,
      insufficientCount,
      pendingCount,
    }
  }, [validationChecks])

  const overallValidationStatus: ValidationCheckStatus =
    !validationResult
      ? 'pending'
      : validationResult.valid
        ? 'pass'
        : 'fail'

  const selectedRequiredSlots =
    selectedNode?.data.node.slots.filter(
      (slot) => slot.required,
    ) ?? []

  const selectedCompletedRequiredSlots =
    selectedRequiredSlots.filter(hasSlotValue).length

  const handleValidate = () => {
    const result = validateStudioWorkflow({
      nodes: studio.nodes,
      includeRecommended: true,
    })

    studio.validateWorkflow()
    setValidationResult(result)
  }

  const buildNavigationState = (): StudioNavigationState => ({
    mode:
      locationState?.mode ??
      (workflowId ? 'edit' : 'create'),
    tutorialId: locationState?.tutorialId,
    copiedLibraryItemId: locationState?.copiedLibraryItemId,
    workflowId:
      locationState?.workflowId ??
      (workflowId ? Number(workflowId) : undefined),
    nodes: studio.nodes,
    edges: studio.edges,
    validationResult,
  })

  const handleOpenExample = () => {
    navigate('/workflows/draft/preview?view=example', {
      state: buildNavigationState(),
    })
  }

  const handleOpenPreview = async () => {
    try{
      const flowId=8;
      // TODO: 로그인 API 머지 후 실제 accessToken으로 교체
      const accessToken = "여기에_나중에_실제_accessToken";
      const data=await FlowPreviewResponse(
        flowId,
        accessToken,
      );
      console.log("불러온 Flow:", data);
      navigate(
        `/studio/create?mode=copied&flowId=${flowId}`,
      {
        state: {
          mode: "preview",
          flowId: flowId,
          flowData: data,
        },
      },
    );
    } catch (error) {
    console.error("Flow 불러오기 실패:", error);
  }
  }
const buildFlowSavePayload = (): FlowSavePayload => ({
  title: '새 흐름',
  summary: '자동 생성된 요약',
  purpose: '사용자 정의 흐름',
  difficulty: 'BEGINNER',
  categoryIds: [],
  visibility: 'PRIVATE',
  status: 'COMPLETED',
  authorNote: '',
  exampleInput: '',
  exampleResult: '',
  blocks: studio.nodes.map((node, index) => ({
    blockId: index + 1,
    blockOrder: index,
    options: {
      title: node.data.node.title,
      stage: node.data.node.stage,
      id: node.data.node.id,
    },
    promptTemplateId: 0,
  })),
})

const handleStartSave = async () => {
  if (!validationResult?.valid) {
    return
  }

  try {
    const flowIdNum = workflowId ? Number(workflowId) : undefined
    if (!flowIdNum) return

    const { result } = await saveFlow(flowIdNum, buildFlowSavePayload())

    navigate('/studio/save/review', {
      state: { ...buildNavigationState(), saveResult: result },
    })
  } catch (error) {
    // 에러 코드별 분기 (FLOW400xx, AUTH401xx, FLOW403xx, FLOW404xx)
  }
}

  return (
    <div className="flex h-screen min-h-0 flex-col overflow-hidden bg-white text-[#27272A]">
      <div className="shrink-0">
        <Header />
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* 블록 팔레트 */}
        <aside className="relative z-30 flex min-h-0 w-[326px] shrink-0 flex-col border-r-[1.5px] border-[#E4E4E7] bg-white">
          <div className="relative flex h-[122px] shrink-0 items-center justify-center gap-[14px] border-b-[1.5px] border-[#E4E4E7]">
            <p className="text-[22px] font-bold">
              블록 팔레트
            </p>

            <img
              src={dashed}
              alt=""
              className="absolute left-[155px] h-[80px] w-[158px]"
            />

            <div className="relative z-10 w-[150px] py-[4px] pl-[14px] text-[15px] text-[#9A9AA3]">
              📱모바일 미지원 -
              <br />
              블록 스튜디오는
              <br />
              데스크톱 전용
            </div>
          </div>

          <div className="shrink-0 px-[16px] pb-[10px] pt-[13px]">
            <div className="relative flex items-center text-[19px] text-[#9A9AA3]">
              <input
                type="search"
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
                placeholder="블록 검색"
                className="h-[50px] w-[296px] rounded-[50px] border-[1.5px] border-[#E4E4E7] bg-white pl-[60px] pr-[18px] text-[#52525B] outline-none placeholder:text-[#9A9AA3] focus:border-[#6366F1]"
              />

              <img
                src={searchRound}
                alt=""
                className="pointer-events-none absolute left-[24px] h-[21px] w-[21px]"
              />

              <img
                src={searchStick}
                alt=""
                className="pointer-events-none absolute left-[40px] top-[27px] h-[8.4px] w-[10px]"
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[18px] pb-[32px]">
            {STUDIO_STAGE_ORDER.map((stage) => {
              const blocks = filteredBlocks.filter(
                (block) => block.stage === stage,
              )

              if (blocks.length === 0) {
                return null
              }

              const stageStyle = stageStyleMap[stage]

              return (
                <section key={stage}>
                  <div className="flex w-[290px] items-center pb-[15.5px] pt-[18px]">
                    <div
                      className={[
                        'h-[13px] w-[13px] rounded-[4px]',
                        stageStyle.dot,
                      ].join(' ')}
                    />

                    <p className="ml-[10.5px] flex-1 text-[13.5px] font-bold text-[#9A9AA3]">
                      {studioStageLabelMap[stage]}
                    </p>

                    <p className="text-[13.5px] font-bold text-[#9A9AA3]">
                      {stage}
                    </p>
                  </div>

                  {blocks.map((block) => (
                    <PaletteBlockCard
                      key={block.id}
                      block={block}
                      onDragStart={studio.onBlockDragStart}
                    />
                  ))}
                </section>
              )
            })}

            {filteredBlocks.length === 0 && (
              <div className="flex min-h-[220px] items-center justify-center text-center">
                <p className="text-[14px] text-[#9A9AA3]">
                  검색 결과가 없습니다.
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* 메인 캔버스 */}
        <main className="relative z-10 min-h-0 min-w-0 flex-1 overflow-hidden bg-[#F7F7F9]">
          <ReactFlow<StudioFlowNodeInstance, Edge>
            nodes={studio.nodes}
            edges={studio.edges}
            nodeTypes={studioNodeTypes}
            onNodesChange={studio.onNodesChange}
            onEdgesChange={studio.onEdgesChange}
            onConnect={studio.onConnect}
            isValidConnection={studio.isValidConnection}
            onInit={studio.onInit}
            onDragOver={studio.onDragOver}
            onDrop={studio.onDrop}
            onNodeClick={(_event, node) =>
              studio.selectNode(node.id)
            }
            onPaneClick={studio.clearSelection}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            panOnScroll={false}
            panOnDrag
            nodesDraggable
            nodesConnectable
            elementsSelectable
            deleteKeyCode={['Backspace', 'Delete']}
            snapToGrid={studio.snapToGrid}
            snapGrid={studio.snapGrid}
            defaultViewport={{
              x: 0,
              y: 0,
              zoom: 1,
            }}
            defaultEdgeOptions={{
              type: 'smoothstep',
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
              style: {
                stroke: '#6366F1',
                strokeWidth: 2,
              },
            }}
            connectionLineStyle={{
              stroke: '#6366F1',
              strokeWidth: 2,
            }}
            className="h-full w-full"
          />
        </main>

        {/* 인스펙터와 검증 결과 */}
        <aside className="relative z-30 flex min-h-0 w-[406px] shrink-0 flex-col border-l-[1.5px] border-[#E4E4E7] bg-white">
          <div className="flex h-[78px] shrink-0 items-center border-b-[1.5px] border-[#E4E4E7] pl-[20px] text-[22px] font-bold">
            인스펙터
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {!selectedNode && (
              <div className="flex min-h-[510px] flex-col border-b-[1.5px] border-[#E4E4E7]">
                <div className="flex h-[180px] items-center justify-center border-b-[1.5px] border-[#E4E4E7] px-[30px] text-center">
                  <div>
                    <p className="text-[18px] font-bold text-[#52525B]">
                      선택된 노드가 없습니다.
                    </p>

                    <p className="mt-[8px] text-[14px] leading-[21px] text-[#9A9AA3]">
                      왼쪽 팔레트의 블록을
                      캔버스에 추가한 뒤
                      <br />
                      노드를 선택하세요.
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-center px-[30px] text-center text-[14px] text-[#9A9AA3]">
                  노드 설정은 선택 후 표시됩니다.
                </div>
              </div>
            )}

            {selectedNode && (
              <div className="border-b-[1.5px] border-[#E4E4E7]">
                <div className="border-b-[1.5px] border-[#E4E4E7] px-[21px] py-[14px]">
                  <div className="flex items-center">
                    <p
                      className={[
                        'flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[12px] text-[18px] font-bold text-white',
                        stageStyleMap[selectedNode.data.node.stage].dot,
                      ].join(' ')}
                    >
                      {selectedNode.data.node.order}
                    </p>

                    <div className="ml-[14px] min-w-0 flex-1">
                      <p className="truncate text-[19px] font-bold">
                        {selectedNode.data.node.title} 노드
                      </p>

                      <p className="mt-[2px] truncate text-[13px] text-[#9A9AA3]">
                        {selectedNode.data.node.stage}
                        {selectedNode.data.node.slots[0]
                          ? ` · ${selectedNode.data.node.slots[0].label}`
                          : ''}
                      </p>
                    </div>

                    {selectedNode.data.node.stage === 'PROCESS' && (
                      <div className="flex h-[33px] w-[132px] items-center justify-center rounded-[8px] border-[1.5px] border-dashed border-[#E4E4E7] text-[15px] font-bold text-[#52525B]">
                        AI Optional
                      </div>
                    )}
                  </div>

                  <div className="mt-[14px] flex items-center gap-[10px] text-[13px] font-bold text-[#52525B]">
                    <div className="flex h-[29px] min-w-[78px] items-center justify-center rounded-[8px] border-[1.5px] border-[#E4E4E7] bg-[#F0F0F3] px-[9px]">
                      필수 {selectedCompletedRequiredSlots}/
                      {selectedRequiredSlots.length}
                    </div>

                    <div className="flex h-[29px] min-w-[78px] items-center justify-center rounded-[8px] border-[1.5px] border-[#E4E4E7] bg-[#F0F0F3] px-[9px]">
                      슬롯 {selectedNode.data.node.slots.length}
                    </div>
                  </div>

                  <p className="mt-[11px] text-[14px] leading-[20px] text-[#9A9AA3]">
                    이 노드는 컨테이너입니다. 아래
                    컴포넌트(블록)마다 도구·프롬프트 강도·옵션을
                    따로 설정하세요.
                  </p>
                </div>

                <div className="min-h-[330px] px-[18px] pt-[12px]">
                  <div className="flex items-center justify-between font-bold text-[#9A9AA3]">
                    <p className="text-[14px]">
                      컴포넌트
                    </p>

                    <p className="text-[13px]">
                      {selectedNode.data.node.slots.length}개 · 노드에 부착된 블록
                    </p>
                  </div>

                                    <div className="mt-[14px] flex flex-col gap-[8px]">
                    {selectedNode.data.node.slots.map((slot) => (
                          <StudioBlockInspector
                            key={slot.id}
                            nodeId={selectedNode.id}
                            slot={slot}
                            connectionInfo={
                              selectedNodeConnectionInfo
                            }
                            onConfigChange={(patch, options) => {
                              studio.updateBlockConfig({
                                nodeId: selectedNode.id,
                                slotId: slot.id,
                                patch,
                                summaryValue:
                                  options?.summaryValue,
                                state:
                                  options?.state,
                              })
                            }}
                            onValueChange={(value) => {
                              studio.updateSlotValue({
                                nodeId: selectedNode.id,
                                slotId: slot.id,
                                value,
                              })
                            }}
                          />
                        ))}
                  </div>
                                  </div>

                <div className="my-[14px] border-t-[1.5px] border-[#EEEEF1]" />

                <div className="flex items-center justify-center pb-[14px]">
                  <button
                    type="button"
                    className="flex h-[53px] w-[374px] items-center justify-center rounded-[12px] border-[1.5px] border-[#EEEEF1] text-[17px] font-bold hover:bg-[#6366F1] hover:text-white"
                  >
                    설정 저장
                  </button>
                </div>
              </div>
            )}

            {/* 검증 결과 */}
            <div>
              <div className="flex h-[96px] items-center justify-between border-t-[1.5px] border-[#E4E4E7] px-[21px]">
                <div className="flex items-center">
                  <div
                    className={[
                      'flex h-[64px] w-[64px] items-center justify-center rounded-[12px] border-[1.5px] text-[25px] font-bold',
                      overallValidationStatus === 'pass'
                        ? 'border-[#CFE2D5] bg-[#EEF4EE] text-[#2F7D52]'
                        : overallValidationStatus === 'fail'
                          ? 'border-[#E9C9C9] bg-[#FBF1F0] text-[#B4453A]'
                          : 'border-[#E4E4E7] bg-[#F0F0F3] text-[#9A9AA3]',
                    ].join(' ')}
                  >
                    {validationSummary.passCount}

                    <span className="mt-[10px] text-[14px] text-[#9A9AA3]">
                      /5
                    </span>
                  </div>

                  <div className="ml-[16.5px] flex flex-col">
                    <p className="text-[18px] font-bold">
                      검증 결과
                    </p>

                    <p className="text-[14px] text-[#9A9AA3]">
                      통과 {validationSummary.passCount} · 미흡{' '}
                      {validationSummary.insufficientCount} · 대기{' '}
                      {validationSummary.pendingCount}
                    </p>
                  </div>
                </div>

                <div
                  className={[
                    'flex h-[33px] min-w-[70px] items-center justify-center rounded-[8px] border-[1.5px] px-[9px] text-[14px] font-bold',
                    overallValidationStatus === 'pass'
                      ? 'border-[#CFE2D5] bg-[#EEF4EE] text-[#2F7D52]'
                      : overallValidationStatus === 'fail'
                        ? 'border-[#E9C9C9] bg-[#FBF1F0] text-[#B4453A]'
                        : 'border-[#E4E4E7] bg-[#F0F0F3] text-[#9A9AA3]',
                  ].join(' ')}
                >
                  {validationStatusStyleMap[overallValidationStatus].label}
                </div>
              </div>

              {validationChecks.map((check) => (
                <ValidationRow
                  key={check.id}
                  check={check}
                  open={openValidationId === check.id}
                  onToggle={() =>
                    setOpenValidationId((current) =>
                      current === check.id ? null : check.id,
                    )
                  }
                />
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 하단 작업 바 */}
      <footer className="flex h-[85px] shrink-0 items-center justify-between border-t-[1.5px] border-[#E4E4E7] bg-white px-[27px] text-[20px]">
        <p className="text-[14px] text-[#9A9AA3]">
          자유 제작 · 노드 {studio.nodes.length} ·
          입력→컨텍스트→프로세스→검토→결과
        </p>

        <div className="flex items-center gap-[19px]">
          <button
            type="button"
            onClick={handleValidate}
            className="cursor-pointer flex h-[50px] w-[80px] items-center justify-center rounded-[8px] border-[1.5px] border-[#E4E4E7] text-[17px] font-bold hover:bg-[#6366F1] hover:text-white"
          >
            검증
          </button>

          <button
            type="button"
            onClick={handleOpenExample}
            className="cursor-pointer flex h-[50px] w-[110px] items-center justify-center rounded-[8px] border-[1.5px] border-[#E4E4E7] text-[17px] font-bold hover:bg-[#6366F1] hover:text-white"
          >
            예시 결과
          </button>

          <button
            type="button"
            onClick={handleOpenPreview}
            className="cursor-pointer flex h-[50px] w-[110px] items-center justify-center rounded-[8px] border-[1.5px] border-[#E4E4E7] text-[17px] font-bold hover:bg-[#6366F1] hover:text-white"
          >
            미리보기
          </button>

          <button
            type="button"
            disabled={!validationResult?.valid}
            onClick={handleStartSave}
            className={[
              'flex h-[50px] w-[80px] items-center justify-center rounded-[8px] border-[1.5px] text-[17px] font-bold',
              validationResult?.valid
                ? 'cursor-pointer border-[#6366F1] bg-[#6366F1] text-white hover:bg-[#5558DB]'
                : 'cursor-not-allowed border-[#E4E4E7] bg-[#F0F0F3] text-[#9A9AA3]',
            ].join(' ')}
          >
            저장
          </button>
        </div>
      </footer>
    </div>
  )
}