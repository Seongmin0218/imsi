import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { Header } from '../components/layout/Header'

export function Studio_create_review1() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBackToEditor = () => {
    navigate('/studio/create', {
      state: location.state,
    })
  }

  const handleNext = () => {
    navigate('/studio/save/details', {
      state: location.state,
    })
  }

  return (
    <>
      <Header />
      <div className="h-[62px] pl-[27px] pr-[9.4px] bg-white flex items-center justify-between border-b-[1.5px] border-[#E4E4E7] text-[#27272A]">
        <p className="text-[17.5px] font-bold">워크플로우 저장</p>
        <div className="ml-[27px] flex flex-1 items-center gap-[22px]">
          <div className="flex items-center gap-[9px]">
            <div className="w-[23px] h-[23px] bg-[#6366F1] rounded-[50px] flex items-center justify-center text-white" />
            <p className="text-[#6366F1] text-[15.5px] font-bold">검토</p>
          </div>
          <div className="w-[16px] h-[3px] bg-[#E4E4E7]" />
          <div className="flex items-center gap-[9px]">
            <div className="w-[23px] h-[23px] bg-[#E7E7EC] rounded-[50px] flex items-center justify-center text-[#9A9AA3] text-[12px] font-bold">2</div>
            <p className="text-[#9A9AA3] text-[15.5px] font-bold">상세정보</p>
          </div>
          <div className="w-[16px] h-[3px] bg-[#E4E4E7]" />
          <div className="flex items-center gap-[9px]">
            <p className="w-[23px] h-[23px] bg-[#E7E7EC] rounded-[50px] flex items-center justify-center text-[#9A9AA3] text-[12px] font-bold">3</p>
            <p className="text-[#9A9AA3] text-[15.5px] font-bold">공개 설정</p>
          </div>
        </div>
        <p className="text-[#9A9AA3] text-[14.5px]">자유 제작 흐름 · 저장 전 마지막 단계</p>
      </div>

      <main className="min-h-screen pb-[60px] flex justify-center bg-[#F5F5F7]">
        <div className="w-[1158px] flex flex-col min-h-screen text-[#27272A]">
          <p className="mt-[34px] text-[#9A9AA3] text-[14px] font-bold">자유 제작 · 저장 검토</p>
          <p className="text-[38px] font-bold">저장하기 전에 흐름을 검토하세요</p>
          <p className="mt-[7px] text-[#52525B] text-[18px]">내가 만든 블록 흐름과 저장 조건을 먼저 확인합니다. 이어서 상세 정보를 입력하고 공개 범위를 정해요.</p>

          <div className="w-[1158px] h-[136px] mt-[26px] bg-white pt-[22px] px-[26px] border-[1.5px] border-[#E4E4E7] rounded-[12px]">
            <div className="w-full flex items-center justify-between text-[#9A9AA3] text-[14px]">
              <p className="font-bold">내가 만든 블록 흐름</p>
              <p className="text-[15px]">5개 노드 · 입력 → 결과</p>
            </div>
            <div className="mt-[17px] flex items-center gap-[12px]">
              <div className="w-[164px] h-[42px] bg-[#F0F0F3] px-[8px] border-[1.5px] border-[#4A5E8A] rounded-[50px] flex items-center justify-center gap-[7.5px] text-[#52525B] text-[16px] font-bold">
                <div className="w-[11px] h-[11px] bg-[#4A5E8A] rounded-[4px]" />사용자 요청 받기
              </div>
              <p>→</p>
              <div className="w-[144px] h-[42px] bg-[#F0F0F3] px-[8px] border-[1.5px] border-[#2F8190] rounded-[50px] flex items-center justify-center gap-[7.5px] text-[#52525B] text-[16px] font-bold">
                <div className="w-[11px] h-[11px] bg-[#2F8190] rounded-[4px]" />역할 부여하기
              </div>
              <p>→</p>
              <div className="w-[113px] h-[42px] bg-[#F0F0F3] px-[8px] border-[1.5px] border-[#6366F1] rounded-[50px] flex items-center justify-center gap-[7.5px] text-[#52525B] text-[16px] font-bold">
                <div className="w-[11px] h-[11px] bg-[#6366F1] rounded-[4px]" />요약하기
              </div>
              <p>→</p>
              <div className="w-[142px] h-[42px] bg-[#F0F0F3] px-[8px] border-[1.5px] border-[#B07A2E] rounded-[50px] flex items-center justify-center gap-[7.5px] text-[#52525B] text-[16px] font-bold">
                <div className="w-[11px] h-[11px] bg-[#B07A2E] rounded-[4px]" />형식 확인하기
              </div>
              <p>→</p>
              <div className="w-[180px] h-[42px] bg-[#F0F0F3] px-[8px] border-[1.5px] border-[#3C7A52] rounded-[50px] flex items-center justify-center gap-[7.5px] text-[#52525B] text-[16px] font-bold">
                <div className="w-[11px] h-[11px] bg-[#3C7A52] rounded-[4px]" />텍스트로 출력하기
              </div>
            </div>
          </div>

          <div className="w-full h-[416px] mt-[22px] px-[30px] pt-[22px] bg-white border-[1.5px] border-[#E4E4E7] rounded-[12px]">
            <div className="flex items-center justify-between font-bold">
              <p className="text-[#9A9AA3] text-[15px]">저장 조건</p>
              <p className="w-[73px] h-[26.6px] bg-[#FBF6EC] flex items-center justify-center rounded-[8px] text-[#9A6A1E] text-[14px]">1개 남음</p>
            </div>

            <div className="w-[1094px] h-[244px] mt-[18px] border-[1.5px] border-[#E4E4E7] rounded-[12px]">
              <div className="h-[78px] flex items-center">
                <div className="ml-[21.75px] w-[23px] h-[23px] bg-[#2F8A5B] rounded-[50%]" />
                <div className="flex-1 ml-[15px]">
                  <p className="text-[17px] font-bold">블록 흐름 — 입력 → 결과 연결</p>
                  <p className="text-[#9A9AA3] text-[14.5px]">5개 노드가 끊김 없이 연결됨</p>
                </div>
                <p className="mr-[30px] w-[46px] h-[24px] bg-[#EEF4EE] rounded-[8px] flex items-center justify-center text-[#2F7D52] text-[14px] font-bold">통과</p>
              </div>

              <div className="border-b-[1.5px] border-[#EEEEF1]" />
              <div className="h-[78px] flex items-center">
                <div className="ml-[21.75px] w-[25.5px] h-[25.5px] bg-[#2F8A5B] rounded-[50%]" />
                <div className="flex-1 ml-[15px]">
                  <p className="text-[17px] font-bold">각 노드 필수 슬롯</p>
                  <p className="text-[#9A9AA3] text-[14.5px]">검토 노드 기준까지 모두 채움</p>
                </div>
                <p className="mr-[30px] w-[46px] h-[24px] bg-[#EEF4EE] rounded-[8px] flex items-center justify-center text-[#2F7D52] text-[14px] font-bold">통과</p>
              </div>

              <div className="border-b-[1.5px] border-[#EEEEF1]" />
              <div className="h-[70px] mt-[4px] flex items-center">
                <div className="ml-[21.75px] w-[25.5px] h-[25.5px] bg-[#E7E7EC] rounded-[50%]" />
                <div className="flex-1 ml-[15px]">
                  <p className="text-[17px] font-bold">제목 · 한 줄 요약</p>
                  <p className="text-[#9A9AA3] text-[14.5px]">다음 단계(상세 정보)에서 작성합니다</p>
                </div>
                <p className="mr-[30px] w-[46px] h-[24px] bg-[#F0F0F3] rounded-[8px] flex items-center justify-center text-[#9A9AA3] text-[14px] font-bold">대기</p>
              </div>

              <div className="flex items-center mt-[41px] gap-[12px]">
                <p className="w-[24px] h-[24px] flex items-center justify-center bg-[#6366F1] rounded-[50px] text-white text-[16.5px]">i</p>
                <p className="mt-[-3px] text-[#52525B] text-[17px]">모든 조건이 <span className="font-bold">통과</span>되어야 저장할 수 있어요. 제목·요약은 다음 단계에서 입력합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="h-[82px] pl-[52px] pr-[28px] bg-white flex items-center">
        <button
          type="button"
          onClick={handleBackToEditor}
          className="text-[#52525B] text-[18.5px] font-bold"
        >
          ← 편집으로
        </button>
        <p className="flex-1 pl-[38px] text-[#9A9AA3] text-[16px]">1 / 3 · 검토 — 흐름과 저장 조건 확인</p>
        <button
          type="button"
          onClick={handleNext}
          className="hover:bg-[#3A3DC2] w-[186px] h-[50px] bg-[#6366F1] flex items-center justify-center rounded-[12px] text-white text-[17.5px] font-bold"
        >
          다음: 상세 정보 →
        </button>
      </footer>
    </>
  )
}
