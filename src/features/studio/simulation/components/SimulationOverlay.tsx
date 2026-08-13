import {
  AnimatePresence,
  motion,
} from 'motion/react'

import type {
  StudioSimulationStepId,
} from '../types/studioSimulation'

interface SimulationOverlayProps {
  activeStepId: StudioSimulationStepId
  showFlyingBlock: boolean
  flyingBlockTitle: string
}

export function SimulationOverlay({
  activeStepId,
  showFlyingBlock,
  flyingBlockTitle,
}: SimulationOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <AnimatePresence>
        {showFlyingBlock && (
          <motion.div
            key="flying-block"
            initial={{
              left: '7%',
              top: '34%',
              scale: 1,
              opacity: 0,
            }}
            animate={{
              left: '45%',
              top: '43%',
              scale: 0.84,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
            }}
            transition={{
              duration: 1.25,
              ease: [0.4, 0.9, 0.3, 1],
            }}
            className="absolute flex min-w-[150px] items-center gap-2 rounded-[10px] border border-[#BFC0FF] bg-[#F0F0FF] px-3 py-2.5 shadow-[0_12px_32px_rgba(24,24,27,0.18)]"
          >
            <span className="h-2.5 w-2.5 rounded-[3px] bg-[#6366F1]" />
            <span className="text-[11px] font-black text-[#6366F1]">
              {flyingBlockTitle}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeStepId === 'connect' && (
          <motion.div
            key="connect-guide"
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            className="absolute left-[61%] top-[48%]"
          >
            <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#6366F1]" />
            <motion.span
              animate={{
                scale: [1, 1.7, 1],
                opacity: [0.75, 0, 0.75],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
              className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#6366F1]"
            />
            <span className="absolute left-5 top-5 whitespace-nowrap rounded-[7px] bg-[#27272A] px-2.5 py-1.5 text-[10px] font-black text-white shadow-lg">
              Handle을 연결합니다
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeStepId === 'inspector' && (
          <motion.div
            key="inspector-guide"
            initial={{
              opacity: 0,
              x: 12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{ opacity: 0 }}
            className="absolute right-[4%] top-[42%] rounded-[8px] bg-[#27272A] px-3 py-2 text-[10px] font-black text-white shadow-lg"
          >
            필수 값과 옵션을 설정합니다
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeStepId === 'validate' && (
          <motion.div
            key="validate-guide"
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0 }}
            className="absolute bottom-[12%] right-[4%] rounded-[8px] border border-[#DCDCFF] bg-white px-3 py-2 text-[10px] font-black text-[#6366F1] shadow-lg"
          >
            필수 구성과 연결 상태를 검증합니다
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
