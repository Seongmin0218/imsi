import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  X,
} from 'lucide-react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
} from 'motion/react'

import {
  getStudioBlockDefinition,
} from '../../data/studioBlockCatalog'

import { studioSimulationSteps } from '../data/studioSimulationSteps'
import { useStudioSimulation } from '../hooks/useStudioSimulation'
import { SimulationCanvas } from './SimulationCanvas'
import { SimulationInspector } from './SimulationInspector'
import { SimulationOverlay } from './SimulationOverlay'
import { SimulationPalette } from './SimulationPalette'

export interface StudioSimulationProps {
  open: boolean
  onClose: () => void
  onStartStudio?: () => void
}

export function StudioSimulation({
  open,
  onClose,
  onStartStudio,
}: StudioSimulationProps) {
  const {
    stepIndex,
    currentStep,
    isAutoPlay,
    showFlyingBlock,
    processBlockAttached,
    connectionComplete,
    activeEdgeId,
    inspectorStrength,
    validationState,
    resultVisible,
    focusStage,
    focusBlockId,
    goToStep,
    next,
    previous,
    replay,
    toggleAutoPlay,
  } = useStudioSimulation(open)

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow =
      document.body.style.overflow

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      document.body.style.overflow =
        previousOverflow
      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [open, onClose])

  if (typeof document === 'undefined') {
    return null
  }

  const flyingBlockTitle =
    focusBlockId
      ? getStudioBlockDefinition(
          focusBlockId,
        )?.title ?? '요약 생성'
      : '요약 생성'

  const isFirstStep = stepIndex === 0
  const isLastStep =
    stepIndex ===
    studioSimulationSteps.length - 1

  const handlePrimaryAction = () => {
    if (isLastStep) {
      if (onStartStudio) {
        onStartStudio()
        return
      }

      onClose()
      return
    }

    next()
  }

  return createPortal(
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.div
            key="studio-simulation-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] grid place-items-center bg-black/45 p-6"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                onClose()
              }
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="studio-simulation-title"
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 12,
                scale: 0.99,
              }}
              transition={{
                duration: 0.22,
              }}
              className="flex h-[calc(100vh-48px)] max-h-[820px] w-[calc(100vw-48px)] max-w-[1480px] flex-col overflow-hidden rounded-[18px] border border-[#E4E4E7] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.25)]"
            >
              <header className="border-b border-[#E4E4E7] bg-white px-5 py-4">
                <div className="flex items-start gap-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-[7px] bg-[#F0F0FF] px-2.5 py-1 text-[10px] font-black text-[#6366F1]">
                        STUDIO SIMULATION
                      </span>
                      <span className="text-[11px] font-bold text-[#A1A1AA]">
                        {stepIndex + 1} / {studioSimulationSteps.length}
                      </span>
                    </div>

                    <h2
                      id="studio-simulation-title"
                      className="mt-2 text-[18px] font-black tracking-[-0.02em] text-[#27272A]"
                    >
                      {currentStep.title}
                    </h2>
                    <p className="mt-1 text-[12px] font-semibold text-[#71717A]">
                      {currentStep.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleAutoPlay}
                      className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#E4E4E7] bg-white px-3 text-[11px] font-black text-[#52525B] hover:bg-[#F5F5F7]"
                    >
                      {isAutoPlay ? (
                        <Pause size={14} />
                      ) : (
                        <Play size={14} />
                      )}
                      자동 재생 {isAutoPlay ? '켜짐' : '꺼짐'}
                    </button>

                    <button
                      type="button"
                      onClick={replay}
                      className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#E4E4E7] bg-white px-3 text-[11px] font-black text-[#52525B] hover:bg-[#F5F5F7]"
                    >
                      <RotateCcw size={14} />
                      다시 재생
                    </button>

                    <button
                      type="button"
                      aria-label="Studio 시뮬레이션 닫기"
                      onClick={onClose}
                      className="grid h-9 w-9 place-items-center rounded-[8px] text-[#71717A] hover:bg-[#F0F0F3] hover:text-[#27272A]"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {studioSimulationSteps.map(
                    (step, index) => {
                      const active =
                        index === stepIndex
                      const done =
                        index < stepIndex

                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() =>
                            goToStep(index)
                          }
                          className={[
                            'inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[10.5px] font-black transition-colors',
                            active
                              ? 'border-[#BFC0FF] bg-[#F0F0FF] text-[#6366F1]'
                              : done
                                ? 'border-[#CFE3D3] bg-[#EEF4EE] text-[#2F7D52]'
                                : 'border-[#E4E4E7] bg-white text-[#9A9AA3]',
                          ].join(' ')}
                        >
                          <span
                            className={[
                              'grid h-4 w-4 place-items-center rounded-full text-[9px]',
                              active
                                ? 'bg-[#6366F1] text-white'
                                : done
                                  ? 'bg-[#2F8A5B] text-white'
                                  : 'bg-[#F0F0F3] text-[#9A9AA3]',
                            ].join(' ')}
                          >
                            {done ? '✓' : index + 1}
                          </span>
                          {step.shortTitle}
                        </button>
                      )
                    },
                  )}
                </div>
              </header>

              <div className="relative min-h-0 flex-1 overflow-x-auto bg-[#F5F5F7]">
                <div className="grid h-full min-w-[1180px] grid-cols-[260px_minmax(600px,1fr)_320px]">
                  <SimulationPalette
                    focusStage={focusStage}
                    focusBlockId={focusBlockId}
                    processBlockAttached={
                      processBlockAttached
                    }
                  />

                  <SimulationCanvas
                    activeStepId={
                      currentStep.id
                    }
                    processBlockAttached={
                      processBlockAttached
                    }
                    connectionComplete={
                      connectionComplete
                    }
                    activeEdgeId={activeEdgeId}
                    inspectorStrength={
                      inspectorStrength
                    }
                    validationState={
                      validationState
                    }
                  />

                  <SimulationInspector
                    processBlockAttached={
                      processBlockAttached
                    }
                    strength={
                      inspectorStrength
                    }
                    validationState={
                      validationState
                    }
                    resultVisible={
                      resultVisible
                    }
                  />
                </div>

                <SimulationOverlay
                  activeStepId={
                    currentStep.id
                  }
                  showFlyingBlock={
                    showFlyingBlock
                  }
                  flyingBlockTitle={
                    flyingBlockTitle
                  }
                />
              </div>

              <footer className="flex items-center gap-3 border-t border-[#E4E4E7] bg-white px-5 py-3.5">
                <button
                  type="button"
                  disabled={isFirstStep}
                  onClick={previous}
                  className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#E4E4E7] bg-white px-3 text-[11px] font-black text-[#52525B] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ChevronLeft size={15} />
                  이전
                </button>

                <div className="min-w-0 flex-1">
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#EEEEF1]">
                    <motion.div
                      className="h-full rounded-full bg-[#6366F1]"
                      animate={{
                        width: `${((stepIndex + 1) / studioSimulationSteps.length) * 100}%`,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePrimaryAction}
                  className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#6366F1] px-4 text-[11px] font-black text-white hover:bg-[#5558E8]"
                >
                  {isLastStep
                    ? '스튜디오 사용하기'
                    : '다음'}
                  {!isLastStep && (
                    <ChevronRight size={15} />
                  )}
                </button>
              </footer>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>,
    document.body,
  )
}
