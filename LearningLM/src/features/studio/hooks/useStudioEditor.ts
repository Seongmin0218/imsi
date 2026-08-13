import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type DragEvent,
} from 'react'

import {
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type IsValidConnection,
  type ReactFlowInstance,
  type SnapGrid,
} from '@xyflow/react'

import {
  type StudioFlowNodeInstance,
} from '../components/node/StudioFlowNode'

import {
  getStudioBlockDefinition,
} from '../data/studioBlockCatalog'

import {
  useStudioBlockDrop,
  type StudioScreenToFlowPosition,
} from './useStudioBlockDrop'

import {
  STUDIO_BLOCK_DRAG_MIME_TYPE,
  type StudioBlockDragPayload,
} from '../types/studioBlock'

import type {
  StudioBlockConfig,
  StudioSlotState,
} from '../types/studioNode'

import type {
  StudioConnectionValidationPolicy,
} from '../validation/validateStudioConnection'

import {
  validateStudioConnection,
} from '../validation/validateStudioConnection'

import {
  validateStudioWorkflow,
} from '../validation/validateStudioWorkflow'

import type {
  StudioWorkflowValidationResult,
} from '../types/studioValidation'

export type StudioEditorEdge =
  Edge

export interface UseStudioEditorOptions {
  /**
   * 페이지 최초 진입 시 표시할 노드입니다.
   */
  initialNodes?: StudioFlowNodeInstance[]

  /**
   * 페이지 최초 진입 시 표시할 연결선입니다.
   */
  initialEdges?: StudioEditorEdge[]

  /**
   * 노드 배치 좌표를 Grid에 맞출지 결정합니다.
   */
  snapToGrid?: boolean

  /**
   * Grid 간격입니다.
   */
  snapGrid?: SnapGrid

  /**
   * 노드 연결 검증 정책입니다.
   */
  connectionPolicy?: StudioConnectionValidationPolicy

  /**
   * 사용자에게 안내할 메시지가 생겼을 때 실행됩니다.
   */
  onMessage?: (
    message: string,
  ) => void
}

/**
 * 기존 단순 문자열 Inspector 값을 수정할 때 사용합니다.
 *
 * 기존 Studio 기능과의 호환을 위해 유지합니다.
 */
export interface UpdateStudioSlotValueOptions {
  nodeId: string
  slotId: string
  value: string
}

/**
 * Block Inspector의 구조화된 설정값을 수정할 때 사용합니다.
 *
 * patch:
 * 기존 config 전체를 교체하지 않고
 * 전달받은 필드만 얕은 병합합니다.
 *
 * summaryValue:
 * Node와 접힌 Inspector 카드 등에 표시할
 * 짧은 요약 문자열입니다.
 *
 * state:
 * Block 내부 Validation 결과 등을
 * 명시적으로 전달할 때 사용합니다.
 */
export interface UpdateStudioBlockConfigOptions {
  nodeId: string
  slotId: string
  patch: StudioBlockConfig
  summaryValue?: string
  state?: StudioSlotState
}

const DEFAULT_SNAP_GRID:
  SnapGrid = [
    20,
    20,
  ]

const DEFAULT_CONNECTION_POLICY: StudioConnectionValidationPolicy = {
  enforceStageOrder: true,
  requireAdjacentStages: true,
  preventCycles: true,
  rejectDuplicateConnections: true,
  limitSourceHandleToSingleEdge: true,
}

/**
 * 검증으로 추가된 노드 상태를 기본 상태로 되돌립니다.
 *
 * disabled와 pending은 외부 기능 상태일 수 있으므로 유지합니다.
 */
function clearNodeValidationState(
  node: StudioFlowNodeInstance,
): StudioFlowNodeInstance {
  const currentState =
    node.data.node.state

  if (
    currentState === 'disabled' ||
    currentState === 'pending'
  ) {
    return node
  }

  return {
    ...node,
    data: {
      ...node.data,
      node: {
        ...node.data.node,
        state: 'default',
      },
    },
  }
}

/**
 * Studio 페이지에서 사용하는 React Flow 상태와 이벤트를 관리합니다.
 *
 * 페이지의 기존 JSX와 스타일은 이 Hook과 분리하고,
 * Stdio_create1.tsx에서는 반환값을 필요한 요소에 연결해서 사용합니다.
 */
export function useStudioEditor({
  initialNodes = [],
  initialEdges = [],
  snapToGrid = true,
  snapGrid = DEFAULT_SNAP_GRID,
  connectionPolicy =
    DEFAULT_CONNECTION_POLICY,
  onMessage,
}: UseStudioEditorOptions = {}) {
  const [
    nodes,
    setNodes,
    onNodesChange,
  ] =
    useNodesState<StudioFlowNodeInstance>(
      initialNodes,
    )

  const [
    edges,
    setEdges,
    onEdgesChange,
  ] =
    useEdgesState<StudioEditorEdge>(
      initialEdges,
    )

  const [
    reactFlowInstance,
    setReactFlowInstance,
  ] = useState<
    ReactFlowInstance<StudioFlowNodeInstance> | null
  >(null)

  const [
    selectedNodeId,
    setSelectedNodeId,
  ] = useState<string | null>(
    initialNodes.find(
      (node) =>
        node.selected,
    )?.id ??
      initialNodes[0]?.id ??
      null,
  )

  const [
    validationResult,
    setValidationResult,
  ] =
    useState<StudioWorkflowValidationResult | null>(
      null,
    )

  const [
    lastMessage,
    setLastMessage,
  ] = useState('')

  const publishMessage =
    useCallback(
      (
        message: string,
      ) => {
        setLastMessage(
          message,
        )

        onMessage?.(
          message,
        )
      },
      [
        onMessage,
      ],
    )

  /**
   * 선택된 노드가 삭제됐을 경우 선택 상태를 정리합니다.
   */
  useEffect(() => {
    if (
      !selectedNodeId
    ) {
      return
    }

    const selectedNodeExists =
      nodes.some(
        (node) =>
          node.id ===
          selectedNodeId,
      )

    if (
      selectedNodeExists
    ) {
      return
    }

    setSelectedNodeId(
      nodes[0]?.id ??
        null,
    )
  }, [
    nodes,
    selectedNodeId,
  ])

  const selectedNode =
    useMemo(
      () =>
        nodes.find(
          (node) =>
            node.id ===
            selectedNodeId,
        ) ??
        null,
      [
        nodes,
        selectedNodeId,
      ],
    )

  const resolvedConnectionPolicy =
    useMemo(
      () => ({
        ...DEFAULT_CONNECTION_POLICY,
        ...connectionPolicy,
      }),
      [
        connectionPolicy,
      ],
    )

  /**
   * React Flow 초기화가 끝났을 때 인스턴스를 저장합니다.
   */
  const onInit =
    useCallback(
      (
        instance: ReactFlowInstance<StudioFlowNodeInstance>,
      ) => {
        setReactFlowInstance(
          instance,
        )
      },
      [],
    )

  /**
   * 브라우저 화면 좌표를 React Flow 좌표로 변환합니다.
   */
  const screenToFlowPosition:
    StudioScreenToFlowPosition =
    useCallback(
      (
        position,
        options,
      ) => {
        if (
          !reactFlowInstance
        ) {
          return position
        }

        return reactFlowInstance.screenToFlowPosition(
          position,
          options,
        )
      },
      [
        reactFlowInstance,
      ],
    )

  /**
   * 기존 검증 결과와 노드의 검증 상태를 초기화합니다.
   */
  const clearValidation =
    useCallback(() => {
      setValidationResult(
        null,
      )

      setNodes(
        (
          currentNodes,
        ) =>
          currentNodes.map(
            clearNodeValidationState,
          ),
      )
    }, [
      setNodes,
    ])

  /**
   * 팔레트 블록의 Drag 데이터를 구성합니다.
   */
  const onBlockDragStart =
    useCallback(
      (
        event: DragEvent<HTMLElement>,
        blockId: string,
      ) => {
        const block =
          getStudioBlockDefinition(
            blockId,
          )

        if (
          !block
        ) {
          event.preventDefault()

          publishMessage(
            `등록되지 않은 Studio 블록입니다: ${blockId}`,
          )

          return
        }

        if (
          block.availability !==
          'available'
        ) {
          event.preventDefault()

          publishMessage(
            `현재 사용할 수 없는 Studio 블록입니다: ${block.title}`,
          )

          return
        }

        const payload:
          StudioBlockDragPayload = {
            blockId:
              block.id,
          }

        event.dataTransfer.effectAllowed =
          'copy'

        event.dataTransfer.setData(
          STUDIO_BLOCK_DRAG_MIME_TYPE,
          JSON.stringify(
            payload,
          ),
        )

        event.dataTransfer.setData(
          'text/plain',
          block.id,
        )
      },
      [
        publishMessage,
      ],
    )

  /**
   * 팔레트 블록 Drop 기능을 기존 useStudioBlockDrop과 연결합니다.
   */
  const {
    onDragOver,
    onDrop,
  } =
    useStudioBlockDrop({
      nodes,
      setNodes,
      screenToFlowPosition,

      disabled:
        reactFlowInstance ===
        null,

      snapToGrid,
      snapGrid,

      onDropComplete: ({
        block,
        result,
      }) => {
        setValidationResult(
          null,
        )

        if (
          result.nodeId
        ) {
          setSelectedNodeId(
            result.nodeId,
          )

          setNodes(
            result.nodes.map(
              (
                node,
              ) => ({
                ...clearNodeValidationState(
                  node,
                ),

                selected:
                  node.id ===
                  result.nodeId,
              }),
            ),
          )
        }

        switch (
          result.reason
        ) {
          case 'created':
            publishMessage(
              `${block.title} 블록으로 새 노드를 만들었습니다.`,
            )
            break

          case 'added':
            publishMessage(
              `${block.title} 블록을 기존 노드에 추가했습니다.`,
            )
            break

          case 'duplicate':
            publishMessage(
              `${block.title} 블록은 이미 배치되어 있습니다.`,
            )
            break

          case 'unavailable':
            publishMessage(
              `${block.title} 블록은 현재 사용할 수 없습니다.`,
            )
            break
        }
      },

      onDropRejected: ({
        message,
      }) => {
        publishMessage(
          message,
        )
      },
    })

  /**
   * 노드 연결 가능 여부를 React Flow에 전달합니다.
   */
  const isValidConnection =
    useCallback<IsValidConnection>(
      (
        connection,
      ) =>
        validateStudioConnection({
          connection,
          nodes,
          edges,

          policy:
            resolvedConnectionPolicy,
        }).valid,
      [
        edges,
        nodes,
        resolvedConnectionPolicy,
      ],
    )

  /**
   * Handle 연결이 완료됐을 때 Edge를 추가합니다.
   */
  const onConnect =
    useCallback(
      (
        connection: Connection,
      ) => {
        setEdges(
          (
            currentEdges,
          ) => {
            const validation =
              validateStudioConnection({
                connection,
                nodes,

                edges:
                  currentEdges,

                policy:
                  resolvedConnectionPolicy,
              })

            if (
              !validation.valid
            ) {
              publishMessage(
                validation.message,
              )

              return currentEdges
            }

            publishMessage(
              '노드를 연결했습니다.',
            )

            setValidationResult(
              null,
            )

            return addEdge(
              {
                ...connection,
                type: 'smoothstep',
              },
              currentEdges,
            )
          },
        )

        setNodes(
          (
            currentNodes,
          ) =>
            currentNodes.map(
              clearNodeValidationState,
            ),
        )
      },
      [
        nodes,
        publishMessage,
        resolvedConnectionPolicy,
        setEdges,
        setNodes,
      ],
    )

  /**
   * 특정 노드를 선택합니다.
   */
  const selectNode =
    useCallback(
      (
        nodeId: string,
      ) => {
        setSelectedNodeId(
          nodeId,
        )

        setNodes(
          (
            currentNodes,
          ) =>
            currentNodes.map(
              (
                node,
              ) => ({
                ...node,

                selected:
                  node.id ===
                  nodeId,
              }),
            ),
        )
      },
      [
        setNodes,
      ],
    )

  /**
   * 캔버스 빈 영역을 클릭하면 선택을 해제합니다.
   */
  const clearSelection =
    useCallback(() => {
      setSelectedNodeId(
        null,
      )

      setNodes(
        (
          currentNodes,
        ) =>
          currentNodes.map(
            (
              node,
            ) => ({
              ...node,
              selected:
                false,
            }),
          ),
      )

      setEdges(
        (
          currentEdges,
        ) =>
          currentEdges.map(
            (
              edge,
            ) => ({
              ...edge,
              selected:
                false,
            }),
          ),
      )
    }, [
      setEdges,
      setNodes,
    ])

  /**
   * 선택된 노드와 Edge를 삭제합니다.
   *
   * 노드가 삭제되면 해당 노드에 연결된 Edge도 함께 제거합니다.
   */
  const deleteSelectedElements =
    useCallback(() => {
      const selectedNodeIds =
        new Set(
          nodes
            .filter(
              (
                node,
              ) =>
                node.selected,
            )
            .map(
              (
                node,
              ) =>
                node.id,
            ),
        )

      const selectedEdgeIds =
        new Set(
          edges
            .filter(
              (
                edge,
              ) =>
                edge.selected,
            )
            .map(
              (
                edge,
              ) =>
                edge.id,
            ),
        )

      if (
        selectedNodeIds.size ===
          0 &&
        selectedEdgeIds.size ===
          0
      ) {
        publishMessage(
          '삭제할 노드 또는 연결을 선택하세요.',
        )

        return
      }

      setNodes(
        (
          currentNodes,
        ) =>
          currentNodes.filter(
            (
              node,
            ) =>
              !selectedNodeIds.has(
                node.id,
              ),
          ),
      )

      setEdges(
        (
          currentEdges,
        ) =>
          currentEdges.filter(
            (
              edge,
            ) =>
              !selectedEdgeIds.has(
                edge.id,
              ) &&
              !selectedNodeIds.has(
                edge.source,
              ) &&
              !selectedNodeIds.has(
                edge.target,
              ),
          ),
      )

      setValidationResult(
        null,
      )

      publishMessage(
        '선택한 노드 또는 연결을 삭제했습니다.',
      )
    }, [
      edges,
      nodes,
      publishMessage,
      setEdges,
      setNodes,
    ])

  /**
   * 기존 단순 Inspector에서 슬롯 값을 수정할 때 사용합니다.
   *
   * 문자열 value를 변경하고,
   * 문자열이 있으면 filled,
   * 비어 있으면 empty 상태로 변경합니다.
   */
  const updateSlotValue =
    useCallback(
      ({
        nodeId,
        slotId,
        value,
      }: UpdateStudioSlotValueOptions) => {
        const normalizedValue =
          value.trim()

        setNodes(
          (
            currentNodes,
          ) =>
            currentNodes.map(
              (
                node,
              ) => {
                if (
                  node.id !==
                  nodeId
                ) {
                  return node
                }

                return {
                  ...clearNodeValidationState(
                    node,
                  ),

                  data: {
                    ...node.data,

                    node: {
                      ...node.data.node,

                      slots:
                        node.data.node.slots.map(
                          (
                            slot,
                          ) =>
                            slot.id ===
                            slotId
                              ? {
                                  ...slot,

                                  value,

                                  state:
                                    normalizedValue
                                      ? 'filled'
                                      : 'empty',
                                }
                              : slot,
                        ),
                    },
                  },
                }
              },
            ),
        )

        setValidationResult(
          null,
        )
      },
      [
        setNodes,
      ],
    )

  /**
   * 상세 Block Inspector의 구조화된 config를 수정합니다.
   *
   * 기존 config를 유지하면서 patch에 들어온 필드만
   * 얕은 병합합니다.
   *
   * 예:
   *
   * 기존:
   * {
   *   targetTone: 'professional',
   *   sentenceLength: 'normal',
   * }
   *
   * patch:
   * {
   *   sentenceLength: 'short',
   * }
   *
   * 결과:
   * {
   *   targetTone: 'professional',
   *   sentenceLength: 'short',
   * }
   *
   * summaryValue가 전달되면 기존 slot.value도 함께 갱신합니다.
   *
   * state가 직접 전달되지 않았지만 summaryValue가 전달된 경우:
   *
   * 빈 문자열     -> empty
   * 값이 있는 문자열 -> filled
   *
   * summaryValue도 state도 전달하지 않은 경우에는
   * 기존 Slot 상태를 그대로 유지합니다.
   *
   * 실제 Block 내부 필수값 Validation은
   * 이후 Block별 Validator 단계에서 연결합니다.
   */
  const updateBlockConfig =
    useCallback(
      ({
        nodeId,
        slotId,
        patch,
        summaryValue,
        state,
      }: UpdateStudioBlockConfigOptions) => {
        setNodes(
          (
            currentNodes,
          ) =>
            currentNodes.map(
              (
                node,
              ) => {
                if (
                  node.id !==
                  nodeId
                ) {
                  return node
                }

                return {
                  ...clearNodeValidationState(
                    node,
                  ),

                  data: {
                    ...node.data,

                    node: {
                      ...node.data.node,

                      slots:
                        node.data.node.slots.map(
                          (
                            slot,
                          ) => {
                            if (
                              slot.id !==
                              slotId
                            ) {
                              return slot
                            }

                            const nextState:
                              StudioSlotState | undefined =
                              state ??
                              (
                                summaryValue !==
                                undefined
                                  ? summaryValue.trim()
                                    ? 'filled'
                                    : 'empty'
                                  : slot.state
                              )

                            return {
                              ...slot,

                              config: {
                                ...(
                                  slot.config ??
                                  {}
                                ),

                                ...patch,
                              },

                              ...(summaryValue !==
                              undefined
                                ? {
                                    value:
                                      summaryValue,
                                  }
                                : {}),

                              state:
                                nextState,
                            }
                          },
                        ),
                    },
                  },
                }
              },
            ),
        )

        /*
         * Inspector 설정이 변경됐으므로
         * 이전 Workflow Validation 결과는 더 이상
         * 현재 데이터와 일치한다고 볼 수 없습니다.
         */
        setValidationResult(
          null,
        )
      },
      [
        setNodes,
      ],
    )

  /**
   * 현재 워크플로우의 필수 블록과 필수 슬롯을 검증합니다.
   */
  const validateWorkflow =
    useCallback(() => {
      const result =
        validateStudioWorkflow({
          nodes,

          includeRecommended:
            true,
        })

      setValidationResult(
        result,
      )

      setNodes(
        (
          currentNodes,
        ) =>
          currentNodes.map(
            (
              node,
            ) => ({
              ...node,

              data: {
                ...node.data,

                node: {
                  ...node.data.node,

                  state:
                    result.nodeStates[
                      node.id
                    ] ??
                    'default',
                },
              },
            }),
          ),
      )

      if (
        result.valid
      ) {
        publishMessage(
          result.warningCount >
            0
            ? `검증을 통과했습니다. 경고 ${result.warningCount}건이 있습니다.`
            : '검증을 통과했습니다.',
        )
      } else {
        publishMessage(
          `검증 오류 ${result.errorCount}건이 발견되었습니다.`,
        )
      }

      return result
    }, [
      nodes,
      publishMessage,
      setNodes,
    ])

  /**
   * 캔버스의 모든 노드와 연결을 제거합니다.
   */
  const resetEditor =
    useCallback(() => {
      setNodes(
        [],
      )

      setEdges(
        [],
      )

      setSelectedNodeId(
        null,
      )

      setValidationResult(
        null,
      )

      publishMessage(
        'Studio 캔버스를 초기화했습니다.',
      )
    }, [
      publishMessage,
      setEdges,
      setNodes,
    ])

  /**
   * 현재 노드가 화면 안에 들어오도록 Viewport를 조정합니다.
   */
  const fitView =
    useCallback(() => {
      if (
        !reactFlowInstance
      ) {
        return
      }

      void reactFlowInstance.fitView({
        padding: 0.2,
        duration: 300,
      })
    }, [
      reactFlowInstance,
    ])

  return {
    nodes,
    edges,

    setNodes,
    setEdges,

    onNodesChange,
    onEdgesChange,

    reactFlowInstance,
    onInit,

    selectedNodeId,
    selectedNode,
    selectNode,
    clearSelection,

    onBlockDragStart,
    onDragOver,
    onDrop,

    onConnect,
    isValidConnection,

    validationResult,
    validateWorkflow,
    clearValidation,

    /*
     * Inspector 상태 변경 API
     */
    updateSlotValue,
    updateBlockConfig,

    deleteSelectedElements,
    resetEditor,
    fitView,

    lastMessage,

    snapToGrid,
    snapGrid,
  }
}

export type StudioEditorController =
  ReturnType<
    typeof useStudioEditor
  >