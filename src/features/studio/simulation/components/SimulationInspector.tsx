import {
  AnimatePresence,
  motion,
} from 'motion/react'
import {
  CheckCircle2,
  Circle,
  Eye,
  LoaderCircle,
  Save,
  SlidersHorizontal,
} from 'lucide-react'

import type {
  StudioSimulationValidationState,
} from '../types/studioSimulation'

interface SimulationInspectorProps {
  processBlockAttached: boolean
  strength: number
  validationState: StudioSimulationValidationState
  resultVisible: boolean
}

function ValidationIcon({
  validationState,
}: {
  validationState: StudioSimulationValidationState
}) {
  if (validationState === 'passed') {
    return (
      <CheckCircle2
        size={16}
        className="text-[#2F8A5B]"
      />
    )
  }

  if (validationState === 'checking') {
    return (
      <LoaderCircle
        size={16}
        className="animate-spin text-[#6366F1]"
      />
    )
  }

  return (
    <Circle
      size={16}
      className="text-[#D4D4D8]"
    />
  )
}

export function SimulationInspector({
  processBlockAttached,
  strength,
  validationState,
  resultVisible,
}: SimulationInspectorProps) {
  const strengthLabel =
    (strength / 100).toFixed(1)

  return (
    <aside className="flex h-full min-h-0 flex-col border-l border-[#E4E4E7] bg-white">
      <div className="border-b border-[#E4E4E7] px-4 py-3">
        <p className="text-[15px] font-black text-[#27272A]">
          인스펙터
        </p>
        <p className="mt-1 text-[11px] font-semibold text-[#9A9AA3]">
          선택한 노드의 세부 설정
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="border-b border-[#E4E4E7] bg-[#F8F8FF] px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#6366F1] text-[12px] font-black text-white">
              3
            </span>

            <div>
              <p className="text-[13px] font-black text-[#27272A]">
                프로세스 노드
              </p>
              <p className="mt-0.5 text-[9px] font-black tracking-[0.08em] text-[#9A9AA3]">
                PROCESS
              </p>
            </div>

            <span className="ml-auto rounded-[7px] border border-[#DCDCFF] bg-white px-2 py-1 text-[9px] font-black text-[#6366F1]">
              시뮬레이션
            </span>
          </div>

          <div className="mt-3 flex gap-2">
            <span className="rounded-[6px] border border-[#E4E4E7] bg-white px-2 py-1 text-[10px] font-black text-[#52525B]">
              필수 {processBlockAttached ? '1/1' : '0/1'}
            </span>
            <span className="rounded-[6px] border border-[#E4E4E7] bg-white px-2 py-1 text-[10px] font-black text-[#52525B]">
              도구 {strength > 0 ? '1' : '0'}
            </span>
          </div>
        </div>

        <div className="space-y-3 px-3 py-3">
          <div className="flex items-center gap-2 px-1">
            <SlidersHorizontal
              size={14}
              className="text-[#9A9AA3]"
            />
            <p className="text-[10px] font-black tracking-[0.08em] text-[#9A9AA3]">
              COMPONENTS
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!processBlockAttached ? (
              <motion.div
                key="missing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-[11px] border border-dashed border-[#E2C28E] bg-[#FFFDF8] px-3 py-4"
              >
                <p className="text-[12px] font-black text-[#8A6A3C]">
                  요약 생성
                </p>
                <p className="mt-2 text-[10.5px] font-semibold leading-[17px] text-[#9A7C55]">
                  아직 부착되지 않았습니다. 팔레트의 블록을 프로세스 노드에 추가하면 설정 카드가 활성화됩니다.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="attached"
                initial={{
                  opacity: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="overflow-hidden rounded-[11px] border border-[#DCDCFF] bg-white"
              >
                <div className="flex items-center gap-2 border-b border-[#EEEEF1] px-3 py-2.5">
                  <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-[#6366F1] text-[9px] font-black text-white">
                    ✓
                  </span>
                  <p className="text-[12px] font-black text-[#27272A]">
                    요약 생성
                  </p>
                  <span className="ml-auto rounded-[5px] bg-[#F0F0FF] px-2 py-0.5 text-[9px] font-black text-[#6366F1]">
                    필수
                  </span>
                </div>

                <div className="space-y-4 px-3 py-3">
                  <div>
                    <p className="text-[10.5px] font-black text-[#52525B]">
                      요약 길이
                    </p>
                    <div className="mt-2 flex overflow-hidden rounded-[7px] border border-[#E4E4E7]">
                      {['짧게', '보통', '길게'].map(
                        (label) => (
                          <span
                            key={label}
                            className={[
                              'flex-1 px-2 py-1.5 text-center text-[10px] font-black',
                              label === '보통'
                                ? 'bg-[#F0F0FF] text-[#6366F1]'
                                : 'bg-white text-[#9A9AA3]',
                            ].join(' ')}
                          >
                            {label}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10.5px] font-black text-[#52525B]">
                        요약 강도
                      </p>
                      <span className="text-[10px] font-black text-[#9A9AA3]">
                        {strengthLabel}
                      </span>
                    </div>

                    <div className="relative mt-2 h-2 rounded-full bg-[#E7E7EC]">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-[#6366F1]"
                        animate={{
                          width: `${strength}%`,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: 'easeOut',
                        }}
                      />
                      <motion.span
                        className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-[#6366F1] bg-white shadow-sm"
                        animate={{
                          left: `calc(${strength}% - 8px)`,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-[10.5px] font-black text-[#52525B]">
                      AI 도구
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span
                        className={[
                          'rounded-[7px] border px-2.5 py-1.5 text-[10px] font-black transition-colors',
                          strength > 0
                            ? 'border-[#DCDCFF] bg-[#F0F0FF] text-[#6366F1]'
                            : 'border-[#E4E4E7] bg-[#F0F0F3] text-[#9A9AA3]',
                        ].join(' ')}
                      >
                        ● 요약
                      </span>
                      <span className="rounded-[7px] border border-[#E4E4E7] bg-[#F0F0F3] px-2.5 py-1.5 text-[10px] font-black text-[#9A9AA3]">
                        웹 검색
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="rounded-[11px] border border-[#E4E4E7] bg-white p-3">
            <div className="flex items-center gap-2">
              <ValidationIcon
                validationState={validationState}
              />
              <p className="text-[12px] font-black text-[#27272A]">
                검증 결과
              </p>
              <span
                className={[
                  'ml-auto rounded-[6px] px-2 py-1 text-[9px] font-black',
                  validationState === 'passed'
                    ? 'bg-[#EEF4EE] text-[#2F7D52]'
                    : validationState === 'checking'
                      ? 'bg-[#F0F0FF] text-[#6366F1]'
                      : 'bg-[#F0F0F3] text-[#9A9AA3]',
                ].join(' ')}
              >
                {validationState === 'passed'
                  ? '통과'
                  : validationState === 'checking'
                    ? '검증 중'
                    : '검증 전'}
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {[
                '필수 블록 포함',
                '필수 설정 입력',
                '노드 연결 구조',
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-[10.5px] font-semibold text-[#52525B]"
                >
                  <ValidationIcon
                    validationState={validationState}
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {resultVisible && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{ opacity: 0 }}
                className="rounded-[11px] border border-[#CFE3D3] bg-[#F2F8F3] p-3"
              >
                <p className="text-[12px] font-black text-[#2F7D52]">
                  워크플로우 준비 완료
                </p>
                <p className="mt-1.5 text-[10.5px] font-semibold leading-[17px] text-[#5D7A66]">
                  검증을 통과하면 미리보기로 결과를 확인하고 저장할 수 있습니다.
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    tabIndex={-1}
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-[7px] border border-[#D8D8DE] bg-white text-[10px] font-black text-[#52525B]"
                  >
                    <Eye size={13} />
                    미리보기
                  </button>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-[7px] bg-[#6366F1] text-[10px] font-black text-white"
                  >
                    <Save size={13} />
                    저장
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  )
}
