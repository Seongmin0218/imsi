import type { StudioBlockId } from '../../data/studioBlockCatalog'
import type { StudioStage } from '../../types/studioNode'

export type StudioSimulationStepId =
  | 'palette'
  | 'add-block'
  | 'connect'
  | 'inspector'
  | 'validate'
  | 'finish'

export type StudioSimulationValidationState =
  | 'idle'
  | 'checking'
  | 'passed'

export interface StudioSimulationStep {
  id: StudioSimulationStepId
  shortTitle: string
  title: string
  description: string
  durationMs: number
  stage?: StudioStage
  blockId?: StudioBlockId
}

export interface StudioSimulationViewState {
  stepIndex: number
  totalSteps: number
  currentStep: StudioSimulationStep
  isAutoPlay: boolean
  showFlyingBlock: boolean
  processBlockAttached: boolean
  connectionComplete: boolean
  activeEdgeId: string | null
  inspectorStrength: number
  validationState: StudioSimulationValidationState
  resultVisible: boolean
  focusStage: StudioStage | null
  focusBlockId: StudioBlockId | null
}
