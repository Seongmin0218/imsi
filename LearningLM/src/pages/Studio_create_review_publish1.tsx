import { useState } from 'react'
import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { Header } from '../components/layout/Header'

export function Studio_create_review_publish1() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isPublic, setIsPublic] = useState(false)
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  const handleBack = () => {
    navigate('/studio/save/details', {
      state: location.state,
    })
  }

  const handlePreview = () => {
    navigate('/workflows/draft/preview', {
      state: location.state,
    })
  }

  const handleContinueEditing = () => {
    navigate('/studio/create', {
      state: location.state,
    })
  }

  const handleOpenStorage = () => {
    navigate('/my-storage?tab=created')
  }

  return (
    <>
      <Header />
      <div className="h-[62px] pl-[27px] pr-[9.4px] bg-white flex items-center justify-between border-b-[1.5px] border-[#E4E4E7] text-[#27272A]">
        <p className="text-[17.5px] font-bold">워크플로우 저장</p>
        <div className="ml-[27px] flex flex-1 items-center gap-[22px]">
          <div className="flex items-center gap-[9px]">
            <div className="w-[23px] h-[23px] bg-[#2F7D52] rounded-[50px] flex items-center justify-center text-white" />
            <p className="text-[#2F7D52] text-[15.5px] font-bold">검토</p>
          </div>
          <div className="w-[16px] h-[3px] bg-[#E4E4E7]" />
          <div className="flex items-center gap-[9px]">
            <div className="w-[23px] h-[23px] bg-[#2F7D52] rounded-[50px] flex items-center justify-center" />
            <p className="text-[#2F7D52] text-[15.5px] font-bold">상세정보</p>
          </div>
          <div className="w-[16px] h-[3px] bg-[#E4E4E7]" />
          <div className="flex items-center gap-[9px]">
            <p className="w-[23px] h-[23px] bg-[#6366F1] rounded-[50px] flex items-center justify-center text-white text-[12px] font-bold">3</p>
            <p className="text-[#6366F1] text-[15.5px] font-bold">공개 설정</p>
          </div>
        </div>
        <p className="text-[#9A9AA3] text-[14.5px]">자유 제작 흐름 · 저장 전 마지막 단계</p>
      </div>

      <main className="min-h-screen pb-[60px] flex justify-center bg-[#F5F5F7]">
        <div className="w-[1158px] flex flex-col min-h-screen text-[#27272A]">
          <p className="mt-[34px] text-[#9A9AA3] text-[14px] font-bold">3 / 3 · 공개 설정</p>
          <p className="text-[38px] font-bold">공개 범위를 정하고 저장하세요</p>

          <div className="w-[1158px] h-[300px] mt-[24px] pt-[25px] pl-[26px] pr-[32px] bg-white gap-[23.8px] border-[1.5px] border-[#E4E4E7] rounded-[12px]">
            <div className="flex items-center justify-between">
              <p className="text-[#9A9AA3] text-[14px] font-bold">공개 범위</p>
              <p className="w-[116px] h-[28px] bg-[#F0F0F3] flex items-center justify-center rounded-[8px] text-[#52525B] text-[14px] font-bold">
                현재: {isPublic ? '🌐 공개' : '🔒 비공개'}
              </p>
            </div>

            <button
              type="button"
              aria-pressed={!isPublic}
              onClick={() => setIsPublic(false)}
              className="w-full h-[92px] mt-[21.5px] pt-[18px] pl-[24px] flex gap-[18px] border-[1.5px] border-[#E4E4E7] rounded-[12px] text-left"
            >
              <div
                className={[
                  'w-[22px] h-[22px] rounded-[50px]',
                  !isPublic
                    ? 'bg-[#6366F1]'
                    : 'border-[3px] border-[#C4C4CC]',
                ].join(' ')}
              />
              <div className="mt-[-4px] flex flex-col gap-[7px]">
                <p className="text-[17.5px] font-bold">🔒 비공개</p>
                <p className="text-[#9A9AA3] text-[15.5px] font-semibold">나만 볼 수 있어요. 내 저장소에서 언제든 공개로 전환할 수 있습니다.</p>
              </div>
            </button>

            <button
              type="button"
              aria-pressed={isPublic}
              onClick={() => setIsPublic(true)}
              className="w-full mt-[31px] pl-[24px] flex gap-[21.5px] text-left"
            >
              <div
                className={[
                  'w-[23px] h-[23px] rounded-[50px]',
                  isPublic
                    ? 'bg-[#6366F1]'
                    : 'border-[2px] border-[#C4C4CC]',
                ].join(' ')}
              />
              <div className="flex flex-col gap-[6px]">
                <p className="mt-[-3px] text-[17.5px] font-bold">🌐 공개</p>
                <p className="text-[#9A9AA3] text-[15.5px] font-semibold">공개 라이브러리에 올라가 다른 사용자가 보고 복사할 수 있어요.</p>
              </div>
            </button>
          </div>

          <div className="w-full h-[368px] mt-[20px] px-[26px] pt-[24px] bg-white border-[1.5px] border-[#E4E4E7] rounded-[12px]">
            <div className="flex items-center justify-between font-bold">
              <p className="text-[#9A9AA3] text-[14.5px]">공개 준비 조건</p>
              <p className="w-[54px] h-[24px] bg-[#FBF6EC] flex items-center justify-center rounded-[8px] text-[#9A6A1E] text-[14px]">권장1</p>
            </div>

            <div className="w-[1094px] h-[194px] mt-[19px] border-[1.5px] border-[#E4E4E7] rounded-[12px]">
              <div className="h-[56px] flex items-center">
                <div className="ml-[21.75px] w-[23px] h-[23px] bg-[#2F8A5B] rounded-[50%]" />
                <div className="flex-1">
                  <p className="ml-[14px] text-[16.5px] font-bold">제목 · 한 줄 요약 작성됨</p>
                </div>
                <p className="mr-[30px] w-[44px] h-[24px] bg-[#EEF4EE] rounded-[8px] flex items-center justify-center text-[#2F7D52] text-[14px] font-bold">완료</p>
              </div>

              <div className="border-b-[1.5px] border-[#EEEEF1]" />
              <div className="h-[56px] flex items-center">
                <div className="ml-[21.75px] w-[23px] h-[23px] bg-[#2F8A5B] rounded-[50%]" />
                <div className="flex-1 ml-[15px]">
                  <p className="text-[16.5px] font-bold">블록 흐름 1개 이상</p>
                </div>
                <p className="mr-[30px] w-[44px] h-[24px] bg-[#EEF4EE] rounded-[8px] flex items-center justify-center text-[#2F7D52] text-[14px] font-bold">완료</p>
              </div>

              <div className="border-b-[1.5px] border-[#EEEEF1]" />
              <div className="mt-[10.5px] h-[56px] flex items-center">
                <div className="ml-[21.75px] w-[23px] h-[23px] bg-[#B88A3C] rounded-[50%]" />
                <div className="flex-1 ml-[15px]">
                  <p className="text-[16.5px] font-bold">예시 입력 · 결과 작성</p>
                  <p className="text-[#9A9AA3] text-[13.5px]">권장 — 없어도 공개할 수 있어요</p>
                </div>
                <p className="mr-[30px] w-[44px] h-[24px] bg-[#FBF6EC] rounded-[8px] flex items-center justify-center text-[#9A6A1E] text-[14px] font-bold">권장</p>
              </div>

              <div className="flex items-center h-[60px] mt-[26px] pl-[21.8px] gap-[15px] border-[1.5px] bg-[#FBF6EC] border-[#ECD6B8] rounded-[12px]">
                <p className="w-[24px] h-[24px] flex items-center justify-center bg-[#B88A3C] rounded-[50px] text-white text-[15px] font-bold">!</p>
                <p className="text-[#52525B] text-[16.5px] font-semibold">공개하면 다른 사용자가 흐름을 <span className="font-bold">보고 복사</span>할 수 있습니다.</p>
              </div>
            </div>
          </div>

          <div className="mt-[20px] h-[190px] px-[26px] pt-[25px] bg-white border-[1.5px] border-[#E4E4E7] rounded-[12px]">
            <p className="text-[#9A9AA3] text-[14.5px] font-bold">저장 요약</p>
            <div className="mt-[22px] flex items-center justify-between">
              <div className="flex items-center text-[15px]">
                <p className="w-[56px] h-[30px] bg-[#EEF1F7] flex items-center justify-center rounded-[6px] text-[#4A5E8A] font-bold">기초</p>
                <p className="px-[24.3px] text-[#6366F1] font-bold">결과물 검토</p>
                <p className="w-[50px] h-[30px] bg-[#F0F0F3] flex items-center justify-center rounded-[12px] border-[1.5px] border-[#E4E4E7] text-[#4A5E8A] font-bold">요약</p>
                <p className="w-[50px] h-[30px] bg-[#F0F0F3] ml-[12.7px] flex items-center justify-center rounded-[12px] border-[1.5px] border-[#E4E4E7] text-[#4A5E8A] font-bold">리뷰</p>
              </div>
              <p className="text-[#9A9AA3] text-[14px]">노드 5 · 예시 1</p>
            </div>
            <div className="mt-[18px] border-[0.5px] border-[#E4E4E7]" />
            <div className="flex items-center justify-between">
              <p className="mt-[13px] text-[17px] font-bold">제품 리뷰 요약기</p>
              <p className="w-[90px] h-[20px] bg-[#EEF4EE] flex items-center justify-center rounded-[4px] text-[#2F7D52] text-[12px] font-bold">저장 조건 통과</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="h-[80px] bg-white pl-[52px] pr-[28px] flex items-center">
        <button
          type="button"
          onClick={handleBack}
          className="cursor-pointer text-[#52525B] text-[18.5px] font-bold"
        >
          ← 상세 정보
        </button>
        <p className="flex-1 pl-[38px] text-[#9A9AA3] text-[16px]">3 / 3 · 공개 설정 — 범위 선택 후 저장</p>
        <div className="flex items-center">
          <button
            type="button"
            onClick={handlePreview}
            className="cursor-pointer hover:border-[#666666] w-[100px] h-[48px] flex items-center justify-center border-[1.5px] border-[#E4E4E7] rounded-[12px] text-[17.5px] font-bold"
          >
            미리보기
          </button>
          <button
            type="button"
            onClick={() => setIsSaveModalOpen(true)}
            className="cursor-pointer hover:bg-[#3A3DC2] w-[186px] h-[50px] bg-[#6366F1] ml-[16px] flex items-center justify-center rounded-[12px] text-white text-[17.5px] font-bold"
          >
            저장 · 내 저장소에
          </button>
        </div>
      </footer>

      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            aria-label="저장 완료 모달 닫기"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsSaveModalOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="studio-save-complete-title"
            className="relative z-10 w-[660px] h-[334px] rounded-2xl bg-white pt-[27px] px-[26px] shadow-xl"
          >
            <div className="flex items-center">
              <div className="w-[35px] h-[35px] bg-[#3C7A52] flex items-center justify-center rounded-[50px] text-white text-[14px] font-bold">✓</div>
              <p id="studio-save-complete-title" className="ml-[15px] text-[22px] font-bold">저장 완료</p>
            </div>

            <div className="w-[620px] h-[86px] mt-[18px] px-[22.5px] pt-[17px] bg-[#F5F5F7] flex gap-[15px] border-[1.5px] border-[#E4E4E7] rounded-[12px]">
              <div className="w-[23px] h-[23px] bg-[#3C7A52] flex items-center justify-center rounded-[50px] text-white text-[12px] font-bold">✓</div>
              <p className="mt-[-4px] text-[16px] text-[#52525B] leading-[26px] tracking-tight">
                <span className="font-bold">"제품 리뷰 요약기"</span>를 내 저장소에{' '}
                <span className="font-bold">{isPublic ? '공개' : '비공개'}</span>로 저장했어요. 언제든 편집하거나
                <br />공개 범위를 전환할 수 있습니다.
              </p>
            </div>

            <div className="h-[33px] mt-[16px] flex items-center font-bold text-[14.5px]">
              <p className="w-[90px] h-[30px] flex items-center justify-center bg-[#F0F0F3] rounded-[8px] text-[#52525B]">
                {isPublic ? '🌐 공개' : '🔒 비공개'}
              </p>
              <p className="w-[66px] h-[30px] ml-[10.5px] bg-[#EEF1F7] flex items-center justify-center rounded-[8px] text-[#4A5E8A]">기초</p>
              <p className="ml-[21.5px] text-[#6366F1] text-[16px]">결과물 검토</p>
            </div>

            <div className="mt-[44px] flex items-center justify-end gap-[36px]">
              <button
                type="button"
                onClick={handleContinueEditing}
                className="cursor-pointer text-[#52525B] text-[17px] font-bold"
              >
                계속 편집
              </button>

              <button
                type="button"
                onClick={handleOpenStorage}
                className="cursor-pointer hover:bg-[#3A3DC2] w-[160px] h-[50px] flex items-center justify-center rounded-lg text-[17px] font-bold bg-[#6366F1] text-white"
              >
                내 저장소 보기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
