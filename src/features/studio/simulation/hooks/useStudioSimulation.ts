import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { studioSimulationSteps } from '../data/studioSimulationSteps'
import type {
  StudioSimulationStep,
  StudioSimulationViewState,
} from '../types/studioSimulation'

const ADD_BLOCK_INDEX = studioSimulationSteps.findIndex(
  (step) => step.id === 'add-block',
)

const CONNECT_INDEX = studioSimulationSteps.findIndex(
  (step) => step.id === 'connect',
)

const INSPECTOR_INDEX = studioSimulationSteps.findIndex(
  (step) => step.id === 'inspector',
)

const VALIDATE_INDEX = studioSimulationSteps.findIndex(
  (step) => step.id === 'validate',
)

const FINISH_INDEX = studioSimulationSteps.findIndex(
  (step) => step.id === 'finish',
)

const LAST_STEP_INDEX =
  studioSimulationSteps.length - 1

function clampStepIndex(index: number) {
  return Math.min(
    Math.max(index, 0),
    LAST_STEP_INDEX,
  )
}

export function useStudioSimulation(
  enabled = true,
) {
  const [stepIndex, setStepIndex] =
    useState(0)

  const [isAutoPlay, setIsAutoPlay] =
    useState(true)

  useEffect(() => {
    if (!enabled) {
      return
    }

    setStepIndex(0)
    setIsAutoPlay(true)
  }, [enabled])

  const currentStep: StudioSimulationStep =
    studioSimulationSteps[stepIndex] ??
    studioSimulationSteps[0]

  useEffect(() => {
    if (
      !enabled ||
      !isAutoPlay ||
      !currentStep
    ) {
      return
    }

    const delay =
      stepIndex === LAST_STEP_INDEX
        ? currentStep.durationMs + 1800
        : currentStep.durationMs

    const timerId = window.setTimeout(
      () => {
        setStepIndex((currentIndex) =>
          currentIndex >= LAST_STEP_INDEX
            ? 0
            : currentIndex + 1,
        )
      },
      delay,
    )

    return () => {
      window.clearTimeout(timerId)
    }
  }, [
    currentStep,
    enabled,
    isAutoPlay,
    stepIndex,
  ])

  const goToStep = useCallback(
    (nextIndex: number) => {
      setIsAutoPlay(false)
      setStepIndex(
        clampStepIndex(nextIndex),
      )
    },
    [],
  )

  const next = useCallback(() => {
    setIsAutoPlay(false)
    setStepIndex((currentIndex) =>
      clampStepIndex(currentIndex + 1),
    )
  }, [])

  const previous = useCallback(() => {
    setIsAutoPlay(false)
    setStepIndex((currentIndex) =>
      clampStepIndex(currentIndex - 1),
    )
  }, [])

  const replay = useCallback(() => {
    setStepIndex(0)
    setIsAutoPlay(true)
  }, [])

  const toggleAutoPlay =
    useCallback(() => {
      setIsAutoPlay(
        (currentValue) =>
          !currentValue,
      )
    }, [])

  const viewState =
    useMemo<StudioSimulationViewState>(
      () => ({
        stepIndex,
        totalSteps:
          studioSimulationSteps.length,
        currentStep,
        isAutoPlay,
        showFlyingBlock:
          stepIndex === ADD_BLOCK_INDEX,
        processBlockAttached:
          stepIndex > ADD_BLOCK_INDEX,
        connectionComplete:
          stepIndex > CONNECT_INDEX,
        activeEdgeId:
          stepIndex === CONNECT_INDEX
            ? 'edge-process-review'
            : null,
        inspectorStrength:
          stepIndex >= INSPECTOR_INDEX
            ? 70
            : 0,
        validationState:
          stepIndex < VALIDATE_INDEX
            ? 'idle'
            : stepIndex === VALIDATE_INDEX
              ? 'checking'
              : 'passed',
        resultVisible:
          stepIndex >= FINISH_INDEX,
        focusStage:
          currentStep.stage ?? null,
        focusBlockId:
          currentStep.blockId ?? null,
      }),
      [
        currentStep,
        isAutoPlay,
        stepIndex,
      ],
    )

  return {
    ...viewState,
    goToStep,
    next,
    previous,
    replay,
    toggleAutoPlay,
  }
}
