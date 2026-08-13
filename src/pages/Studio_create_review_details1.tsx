import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { Header } from '../components/layout/Header'
import temp_dashed from '../assets/temp_dashed.png'

export function Studio_create_review_details1() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    navigate('/studio/save/review', {
      state: location.state,
    })
  }

  const handleNext = () => {
    navigate('/studio/save/publish', {
      state: location.state,
    })
  }

  return (
    <>
      <Header />
      <div className="h-[62px] pl-[27px] pr-[9.4px] bg-white flex items-center justify-between text-[#27272A]">
        <p className="text-[17.5px] font-black">워크플로우 저장</p>
        <div className="ml-[27px] flex flex-1 items-center gap-[18px]">
          <div className="flex items-center gap-[9px]">
            <div className="w-[23px] h-[23px] bg-[#2F8A5B] rounded-[50px] flex items-center justify-center text-white" />
            <p className="text-[#2F7D52] text-[15.5px] font-bold">검토</p>
          </div>
          <div className="w-[16px] h-[3px] bg-[#E4E4E7]" />
          <div className="flex items-center gap-[9px]">
            <p className="w-[23px] h-[23px] bg-[#6366F1] rounded-[50px] flex items-center justify-center text-[13px] text-white font-bold">2</p>
            <p className="text-[#6366F1] text-[15.5px] font-bold">상세정보</p>
          </div>
          <div className="w-[16px] h-[3px] bg-[#E4E4E7]" />
          <div className="flex items-center gap-[9px]">
            <p className="w-[23px] h-[23px] bg-[#E7E7EC] rounded-[50px] flex items-center justify-center text-[#9A9AA3] text-[13px] font-bold">3</p>
            <p className="text-[#9A9AA3] text-[15.5px] font-bold">공개 설정</p>
          </div>
        </div>
        <p className="text-[#9A9AA3] text-[14.5px]">자유 제작 흐름 · 저장 전 마지막 단계</p>
      </div>

      <main className="min-h-screen pb-[60px] flex justify-center bg-[#F5F5F7] border-t-[1.5px] border-[#E4E4E7]">
        <div className="w-[1158px] flex flex-col min-h-screen text-[#27272A]">
          <p className="mt-[30px] text-[#9A9AA3] text-[15px] font-bold">2 / 3 · 상세 정보</p>
          <p className="text-[38.5px] font-bold">워크플로우 정보를 입력하세요</p>

          <div className="flex items-center mt-[38px] gap-[15px]">
            <p className="w-[26px] h-[26px] flex items-center justify-center bg-[#6366F1] rounded-[50px] text-white text-[16.5px]">i</p>
            <p className="text-[#52525B] text-[17px] font-bold">블록 흐름에서 자동으로 채웠어요 <span className="font-normal">제목·요약·예시는 자유롭게 수정할 수 있습니다.</span></p>
          </div>

          <div className="w-[1158px] h-[364px] mt-[42px] pt-[24px] pl-[28px] bg-white gap-[23.8px] border-[1.5px] border-[#E4E4E7] rounded-[12px]">
            <p className="text-[#9A9AA3] text-[15px] font-bold">기본 정보</p>
            <div className="mt-[10px] flex items-center">
              <div className="w-[216px] flex flex-col gap-[9px]">
                <button
                  type="button"
                  className="h-[140px] flex items-center justify-center border-[1.5px] border-[#E4E4E7] rounded-[12px] text-[#9A9AA3] text-[15px]"
                >
                  썸네일
                </button>
                <button
                  type="button"
                  className="cursor-pointer hover:text-white hover:bg-[#6366F1] h-[44px] flex items-center justify-center border-[1.5px] border-[#E4E4E7] rounded-[12px] text-[16.5px] font-bold"
                >
                  이미지 변경
                </button>
              </div>

              <div className="w-[845px] h-[214px] ml-[25.5px]">
                <p className="text-[#52525B] mt-[8px] text-[16.5px] font-bold">제목<span className="text-[#C0473C]"> *</span></p>
                <input className="w-full h-[56px] mt-[13px] border-[1.5px] border-[#E4E4E7] rounded-[8px]" />
                <p className="mt-[11px] text-[#52525B] text-[16.5px] font-bold">한 줄 요약<span className="text-[#C0473C]"> *</span></p>
                <input className="w-full h-[55px] mt-[12px] border-[1.5px] border-[#E4E4E7] rounded-[8px]" />
                <p className="mt-[6px] text-[#9A9AA3] text-[15px]">블록 흐름에서 자동 생성 · 수정 가능</p>
              </div>
            </div>
          </div>

          <div className="w-full h-[380px] mt-[23px] px-[28px] pt-[24px] bg-white border-[1.5px] border-[#E4E4E7] rounded-[12px]">
            <div className="flex items-center justify-between font-bold">
              <p className="text-[#9A9AA3] text-[15px]">분류</p>
            </div>
            <p className="mt-[18px] text-[#52525B] text-[17px] font-bold">목적</p>
            <input className="w-[1094px] h-[54.5px] mt-[11px] border-[1.5px] border-[#E4E4E7] rounded-[8px]" />
            <p className="mt-[14px] text-[#52525B] text-[18px] font-bold">카테고리</p>

            <div className="mt-[10px] flex items-center gap-[12px] text-[#52525B] text-[17px] font-bold">
              <button type="button" className="w-[95.2px] h-[37px] flex items-center justify-center bg-[#F0F0F3] border-[1.5px] border-[#E4E4E7] rounded-[50px]">자료조사</button>
              <button type="button" className="w-[99.5px] h-[37px] flex items-center justify-center bg-[#F0F0F3] border-[1.5px] border-[#E4E4E7] rounded-[50px]">문서 요약</button>
              <button type="button" className="w-[78px] h-[37px] flex items-center justify-center bg-[#F0F0F3] border-[1.5px] border-[#E4E4E7] rounded-[50px]">글쓰기</button>
              <button type="button" className="w-[133.4px] h-[37px] flex items-center justify-center bg-[#F0F0F3] border-[1.5px] border-[#E4E4E7] rounded-[50px]">반복 작업 정리</button>
              <button type="button" className="w-[133.4px] flex items-center justify-center text-[#6366F1] text-[18px] font-bold">결과물 검토</button>
              <button type="button" className="w-[105.4px] h-[37px] flex items-center justify-center bg-[#F0F0F3] border-[1.5px] border-[#E4E4E7] rounded-[50px]">AI 툴 활용</button>
            </div>

            <div className="flex text-[#52525B] font-bold">
              <div className="w-[196.8px] mt-[15px]">
                <p className="text-[16.5px]">난이도</p>
                <div className="h-[40px] mt-[12px] flex items-center border-[1.5px] border-[#E4E4E7] rounded-[10px] text-[16.5px]">
                  <button type="button" className="w-[65.6px] flex items-center justify-center">입문</button>
                  <div className="h-[42px] border-[1px] border-[#E4E4E7]" />
                  <button type="button" className="w-[65.6px] flex items-center justify-center text-[#6366F1]">기초</button>
                  <div className="h-[42px] border-[1px] border-[#E4E4E7]" />
                  <button type="button" className="w-[65.6px] flex items-center justify-center">응용</button>
                </div>
              </div>

              <div className="w-[871px] mt-[15.5px] ml-[24.8px]">
                <p className="text-[16.5px]">태그</p>
                <div className="w-full h-[54px] mt-[12px] pl-[26.2px] flex items-center gap-[34.6px] border-[1.5px] border-[#E4E4E7] rounded-[10px] text-[16.5px] text-[#6366F1]">
                  <p>요약 <button type="button">X</button></p>
                  <p>리뷰 <button type="button">X</button></p>
                  <p>장단점 <button type="button">X</button></p>
                  <button type="button" className="cursor-pointer text-[#9A9AA3] text-[17px] font-normal">태그 추가</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[20px] flex items-center justify-between">
            <div className="w-[567px] h-[190px] bg-white flex flex-col pt-[24px] pl-[24px] gap-[18px] border-[1.5px] border-[#E4E4E7] rounded-[12px]">
              <p className="w-full text-[#9A9AA3] text-[15px] font-bold">예시 입력</p>
              <input className="w-[504px] h-[102px] mt-[-4px] border-[1.5px] border-[#E4E4E7] rounded-[8px]" />
            </div>

            <div className="w-[567px] h-[190px] px-[30px] bg-white flex flex-col pt-[27px] pl-[24px] gap-[14px] border-[1.5px] border-[#E4E4E7] rounded-[12px]">
              <div className="w-full mt-[-5px] flex items-center justify-between">
                <p className="text-[#9A9AA3] text-[15px] font-bold">예시 결과</p>
                <img src={temp_dashed} alt="" className="absolute w-[117px] h-[32px] ml-[390px]" />
                <p className="w-[117.2px] h-[32px] flex items-center justify-center text-[#52525B] text-[16.5px] font-bold">Template</p>
              </div>
              <div className="w-full flex flex-col gap-[8px]">
                <div className="w-[444px] h-[13.5px] bg-[#F0F0F3] rounded-[50px]" />
                <div className="w-[362.8px] h-[13.5px] bg-[#F0F0F3] rounded-[50px]" />
                <div className="w-[403.2px] h-[13.5px] bg-[#F0F0F3] rounded-[50px]" />
                <p className="text-[#9A9AA3] text-[14.5px]">예시 결과는 학습용 미리보기입니다.</p>
              </div>
            </div>
          </div>

          <div className="w-[1158px] h-[176px] mt-[21px] pt-[25px] pl-[31.2px] bg-white border-[1.5px] border-[#E4E4E7] rounded-[12px]">
            <p className="text-[#9A9AA3] text-[14px] font-bold">작성자 노트</p>
            <input className="w-[1094px] h-[88px] mt-[14px] border-[1.5px] border-[#E4E4E7] rounded-[12px]" />
          </div>
        </div>
      </main>

      <footer className="h-[82px] pl-[52px] pr-[28px] bg-white flex items-center">
        <button
          type="button"
          onClick={handleBack}
          className="text-[#52525B] text-[18.5px] font-bold"
        >
          ← 검토
        </button>
        <p className="flex-1 pl-[38px] text-[#9A9AA3] text-[16px]">2 / 3 · 상세 정보 — 이름 · 요약 · 분류 입력</p>
        <button
          type="button"
          onClick={handleNext}
          className="hover:bg-[#3A3DC2] w-[186px] h-[50px] bg-[#6366F1] flex items-center justify-center rounded-[12px] text-white text-[17.5px] font-bold"
        >
          다음: 공개 설정 →
        </button>
      </footer>
    </>
  )
}
