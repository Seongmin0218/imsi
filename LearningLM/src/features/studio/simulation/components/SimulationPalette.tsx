import { motion } from 'motion/react'

import {
  STUDIO_STAGE_ORDER,
  getStudioBlocksByStage,
  studioStageLabelMap,
  type StudioBlockId,
} from '../../data/studioBlockCatalog'

import {
  studioBlockRequirementLabelMap,
  type StudioBlockDefinition,
} from '../../types/studioBlock'

import type { StudioStage } from '../../types/studioNode'

const stageStyleMap: Record<
  StudioStage,
  {
    dot: string
    text: string
  }
> = {
  INPUT: {
    dot: 'bg-[#4A5E8A]',
    text: 'text-[#4A5E8A]',
  },
  CONTEXT: {
    dot: 'bg-[#2F8190]',
    text: 'text-[#2F8190]',
  },
  PROCESS: {
    dot: 'bg-[#6366F1]',
    text: 'text-[#6366F1]',
  },
  REVIEW: {
    dot: 'bg-[#B07A2E]',
    text: 'text-[#B07A2E]',
  },
  OUTPUT: {
    dot: 'bg-[#3C7A52]',
    text: 'text-[#3C7A52]',
  },
}

const requirementStyleMap: Record<
  StudioBlockDefinition['requirement'],
  string
> = {
  required: 'text-[#6366F1]',
  recommended:
    'bg-[#EEF4EE] text-[#3C7A52]',
  optional:
    'bg-[#F0F0F3] text-[#9A9AA3]',
}

interface SimulationPaletteProps {
  focusStage: StudioStage | null
  focusBlockId: StudioBlockId | null
  processBlockAttached: boolean
}

export function SimulationPalette({
  focusStage,
  focusBlockId,
  processBlockAttached,
}: SimulationPaletteProps) {
  return (
    <aside className="flex h-full min-h-0 flex-col border-r border-[#E4E4E7] bg-white">
      <div className="border-b border-[#E4E4E7] px-4 py-3">
        <p className="text-[15px] font-black text-[#27272A]">
          블록 팔레트
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#9A9AA3]">
          단계별 기능 블록
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {STUDIO_STAGE_ORDER.map((stage) => {
          const style = stageStyleMap[stage]
          const blocks =
            getStudioBlocksByStage(stage)
          const dimmed =
            focusStage !== null &&
            focusStage !== stage

          return (
            <motion.section
              key={stage}
              animate={{
                opacity: dimmed ? 0.42 : 1,
              }}
              transition={{ duration: 0.24 }}
              className="mb-4 last:mb-0"
            >
              <div className="mb-2 flex items-center gap-2 px-1">
                <span
                  className={[
                    'h-2.5 w-2.5 rounded-[3px]',
                    style.dot,
                  ].join(' ')}
                />
                <span className="text-[11px] font-black text-[#52525B]">
                  {studioStageLabelMap[stage]}
                </span>
                <span className="ml-auto text-[9px] font-black tracking-[0.08em] text-[#A1A1AA]">
                  {stage}
                </span>
              </div>

              <div className="space-y-2">
                {blocks.map((block) => {
                  const focused =
                    block.id === focusBlockId
                  const placed =
                    focused &&
                    processBlockAttached
                  const unavailable =
                    block.availability !==
                    'available'

                  return (
                    <motion.div
                      key={block.id}
                      data-simulation-palette-block={
                        block.id
                      }
                      animate={{
                        scale:
                          focused && !placed
                            ? 1.025
                            : 1,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 320,
                        damping: 24,
                      }}
                      className={[
                        'rounded-[10px] border px-3 py-2.5',
                        focused
                          ? 'border-[#6366F1] bg-[#F4F4FF] shadow-[0_0_0_3px_rgba(99,102,241,0.12)]'
                          : 'border-[#E4E4E7] bg-white',
                        unavailable
                          ? 'opacity-45'
                          : '',
                        placed
                          ? 'opacity-55'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={[
                            'mt-1 h-2.5 w-2.5 shrink-0 rounded-[3px]',
                            style.dot,
                          ].join(' ')}
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-[12px] font-black text-[#27272A]">
                              {block.title}
                            </p>

                            <span
                              className={[
                                'ml-auto shrink-0 rounded-[6px] px-1.5 py-0.5 text-[9px] font-black',
                                requirementStyleMap[
                                  block.requirement
                                ],
                              ].join(' ')}
                            >
                              {
                                studioBlockRequirementLabelMap[
                                  block.requirement
                                ]
                              }
                            </span>
                          </div>

                          <p className="mt-1 line-clamp-2 text-[10.5px] font-medium leading-[16px] text-[#9A9AA3]">
                            {block.description}
                          </p>

                          {placed && (
                            <p
                              className={[
                                'mt-1.5 text-[10px] font-black',
                                style.text,
                              ].join(' ')}
                            >
                              배치됨 ✓
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.section>
          )
        })}
      </div>
    </aside>
  )
}
