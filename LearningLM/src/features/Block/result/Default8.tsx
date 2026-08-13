import { useState } from "react";

export default function Default8() {
  const [publicTitle, setPublicTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [authorNote, setAuthorNote] = useState("");
  const [sectionType, setSectionType] = useState("all"); // 목차 방식 선택 상태
  const [verify, setVerify] = useState(false); // 검증 버튼 상태

  const [purpose, setPurpose] = useState(""); // 역할 선택 상태

  return (
    <div className="relative w-[660px] h-[1307.63px] bg-[#FFFFFF] text-[#27272A] font-inter">
      <div className="absolute w-[658.5px] h-[1306.13px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7] rounded-[12px]"></div>
        
        {/* 상단 헤더 영역 */}
        <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]"></div>
        <span className="absolute w-[21px] h-[21px] top-[35.93px] left-[32.06px] font-inter font-bold leading-none text-[21px]">🌐</span>
        <div className="absolute whitespace-nowrap w-[177px] h-[27px] top-[23.25px] left-[84px] font-inter font-bold leading-none text-[22.5px] text-[#27272A]">
          공개용 설명 만들기
        </div>

        <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-normal font-SplineSansMono text-[15px] leading-none text-[#9A9AA3]">
          OUT-010 · OUTPUT
        </div>

        <div className="absolute w-[142.92px] h-[30px] top-[36.38px] left-[492.33px] border border-[1.5px] border-[#CFE3D3] bg-[#CFE3D3] flex items-center justify-center rounded-[12px]"></div>
        <span className="absolute w-[121px] h-[18px] top-[40.13px] left-[505.08px] font-inter font-bold leading-none text-[15px] text-[#3C7A52]">
            RECOMMENDED
        </span>

        <div className="absolute whitespace-nowrap w-[336px] h-[21px] top-[93.68px] left-[24px] font-inter leading-none font-normal text-[17.25px] text-[#52525B]">
          흐름을 공개할 때 보일 소개 정보를 작성합니다.
        </div>

        {/* 뱃지 영역 */}
        <div className="absolute w-[64.29px] h-[30px] top-[133.88px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
            <div className="whitespace-nowrap w-[41px] h-[18px] top-[137.63px] left-[37.5px] font-inter font-bold leading-none text-[#52525B]">필수 5</div>
          </div>
          <div className="absolute w-[61.92px] h-[30px] top-[133.88px] left-[99.54px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
            <div className="whitespace-nowrap w-[39px] h-[18px] top-[137.63px] left-[112.29px] font-inter font-bold leading-none text-[#52525B]">선택 1</div>
          </div>
          <div className="absolute w-[61.92px] h-[30px] top-[133.88px] left-[171.96px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
            <div className="whitespace-nowrap w-[39px] h-[18px] top-[137.63px] left-[184.71px] font-inter font-bold leading-none text-[#52525B]">누락 1</div>
          </div>

        <hr className="absolute w-[657px] top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

        {/* 메인 폼 영역 */}
          
          <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]" />
          <div className="absolute whitespace-nowrap w-[147px] h-[23px] top-[216.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            공개용 설명 만들기
          </div>
          <div className="absolute w-[25px] h-[16px] top-[220.43px] left-[560.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">필수</div>
          <div className="absolute w-[10px] h-[22px] top-[218.02px] left-[612px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">⌄</div>

          {/* 1. 공개 제목 */}
            <div className=" whitespace-nowrap absolute w-[68px] h-[21px] top-[254.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
              공개 제목 <span className="w-[10px] h-[21px] top-[254.55px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">*</span>
            </div>

            <input
              type="text"
              value={publicTitle}
              onChange={(e) => setPublicTitle(e.target.value)}
              placeholder="공개 제목을 입력하세요"
              className={`absolute w-[583.5px] h-[52.5px] top-[290.25px] left-[38.25px] rounded-[12px] border-[1.5px] px-[21px] font-inter font-normal text-[18.75px] leading-none text-[#27272A] placeholder:text-[#9A9AA3] placeholder:font-normal placeholder:text-[18.75px] ${
                !publicTitle
                  ? "border-[#C0473C]"
                  : "border-[#E4E4E7]"
              }`}
            />

            {!publicTitle && (
              <span className="absolute whitespace-nowrap w-[125px] h-[19px] top-[352.73px] left-[37.5px] font-bold font-inter text-[15.75px] text-[#C0473C] leading-none flex items-center ">
                ⚠️ 필수 항목입니다
              </span>
            )}

          {/* 2. 한 줄 설명 */}
            <div className="absolute whitespace-nowrap w-[72px] h-[21px] top-[391.05px] left-[37.5px] font-inter font-bold text-[17.25px] leading-nonetext-[#52525B]">
              한 줄 설명 <span className="w-[10px] h-[21px] top-[391.05px] left-[114.09px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">*</span>
            </div>
            <input
              type="text"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="흐름을 한 줄로 소개하세요"
              className={`absolute w-[583.5px] h-[52.5px] top-[426.75px] left-[38.25px] rounded-[12px] border-[1.5px] px-[21px] font-inter font-normal text-[18.75px] leading-none text-[#27272A] placeholder:text-[#9A9AA3] placeholder:font-normal placeholder:text-[18.75px] ${
                !shortDesc
                  ? "border-[#C0473C]"
                  : "border-[#E4E4E7]"
              }`}
            />

          {/* 3. 사용 목적 */}
            <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[494.93px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
              사용 목적 <span className="w-[10px] h-[21px] top-[494.93px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">*</span>
            </div>
            <div
          onClick={() => setPurpose("data")}
          className={`absolute w-[186.49px] h-[91.69px] top-[530.63px] left-[38.25px] border border-[1.5px] rounded-[12px] ${
            purpose === "data" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[544.88px] left-[113.48px] flex items-center justify-center  rounded-[8px] ${
            purpose === "data" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`w-[21px] h-[21px] top-[547.43px] left-[120.97px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              purpose === "data" ? "text-[#27272A]" : "text-[#27272A]"
            }`}
          >
            📚
          </div>
        </div>
        <div className="absolute w-[29px] h-[19px] top-[587.1px] left-[116.98px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          자료
        </div>

        <div
          onClick={() => setPurpose("summary")}
          className={`absolute w-[186.49px] h-[91.69px] top-[530.63px] left-[236.74px] border border-[1.5px] rounded-[12px] ${
            purpose === "summary" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[544.88px] left-[311.98px] flex items-center justify-center  rounded-[8px] ${
            purpose === "summary" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={` w-[21px] h-[21px] top-[547.43px] left-[319.46px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              purpose === "summary" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            📝
          </div>
        </div>
        <div className="absolute w-[29px] h-[19px] top-[587.1px] left-[315.48px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          요약
        </div>

        <div
          onClick={() => setPurpose("write")}
          className={`absolute w-[186.52px] h-[91.69px] top-[530.63px] left-[435.23px] border border-[1.5px] rounded-[12px] ${
            purpose === "write" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[544.88px] left-[510.49px] flex items-center justify-center rounded-[8px] ${
            purpose === "write" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`w-[21px] h-[21px] top-[547.43px] left-[517.98px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              purpose === "write" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            ✍️
          </div>
        </div>
        <div className="absolute w-[44px] h-[19px] top-[587.1px] left-[506.48px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          글쓰기
        </div>

        <div
          onClick={() => setPurpose("roop")}
          className={`absolute w-[186.49px] h-[91.69px] top-[633.56px] left-[37.5px] border border-[1.5px] rounded-[12px] ${
            purpose === "roop" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[648.56px] left-[113.48px] flex items-center justify-center rounded-[8px] ${
            purpose === "roop" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={` w-[21px] h-[21px] top-[651.11px] left-[120.97px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              purpose === "roop" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            🔁
          </div>
        </div>
        <div className="absolute w-[29px] h-[19px] top-[690.79px] left-[116.98px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          반복
        </div>

        <div
          onClick={() => setPurpose("review")}
          className={`absolute w-[186.49px] h-[91.69px] top-[634.31px] left-[236.74px] border border-[1.5px] rounded-[12px] ${
            purpose === "review" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[648.56px] left-[311.98px] flex items-center justify-center rounded-[8px] ${
            purpose === "review" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={` w-[21px] h-[21px] top-[651.11px] left-[319.46px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              purpose === "review" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            🔎
          </div>
        </div>
        <div className="absolute w-[29px] h-[19px] top-[690.79px] left-[315.48px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          검토
        </div>
        <div
          onClick={() => setPurpose("Ai")}
          className={`absolute w-[186.52px] h-[91.69px] top-[634.31px] left-[435.23px] border border-[1.5px] rounded-[12px] ${
            purpose === "Ai" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[648.56px] left-[510.49px] flex items-center justify-center rounded-[8px] ${
            purpose === "Ai" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={` w-[21px] h-[21px] top-[651.11px] left-[517.98px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              purpose === "Ai" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            🤖
          </div>
        </div>
        <div className="absolute w-[31px] h-[19px] top-[690.79px] left-[512.98px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          AI툴
        </div>
        <div className="absolute whitespace-nowrap w-[48px] h-[21px] top-[741.68px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            난이도
          
        </div>
        <span className=" absolute w-[10px] h-[21px] top-[741.68px] left-[91.24px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        <div className="absolute w-[583.5px] h-[48.38px] top-[777.38px] left-[38.25px] border border-[#E4E4E7] rounded-[12px] border-[1.5px]"></div>

          <div
            onClick={() => setSectionType("type1")}
            className={`absolute w-[192.98px] h-[46.88px] top-[778.13px] left-[39px] flex items-center justify-center cursor-pointer rounded-tl-[12px] rounded-bl-[12px] ${
              sectionType === "type1" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("type1")}
            className={`absolute w-[32px] h-[21px] top-[788.55px] left-[119.48px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "type1"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            입문
          </div>

          <div className="absolute  z-10 w-[0px] h-[46.88px] top-[778.13px] left-[232.73px] border-[1.5px] border-[#E4E4E7]"></div>

          <div
            onClick={() => setSectionType("type2")}
            className={`absolute w-[190.52px] h-[46.88px] top-[778.13px] left-[235.99px] flex items-center justify-center cursor-pointer ${
              sectionType === "type2" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("type2")}
            className={`absolute w-[32px] h-[21px] top-[788.55px] left-[313.99px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "type2"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            기초
          </div>

          <div className="absolute z-10 w-[0px] h-[46.88px] top-[778.13px] left-[427.24px] border-[1.5px] border-[#E4E4E7]"></div>

          <div
            onClick={() => setSectionType("type3")}
            className={`absolute w-[194.51px] h-[46.88px] top-[778.13px] left-[426.49px] flex items-center justify-center cursor-pointer rounded-tr-[12px] rounded-br-[12px] ${
              sectionType === "type3" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("type3")}
            className={`absolute w-[32px] h-[21px] top-[788.55px] left-[508.5px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "type3"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            응용
          </div>

            <div className="absolute w-[32px] h-[21px] top-[841.43px] left-[37.5px] font-bold font-inter text-[17.25px] leading-none text-[#52525B] ">
              태그 
            </div>
            <span className=" absolute w-[10px] h-[21px] top-[841.43px] left-[76.34px] font-bold font-inter text-[17.25px] leading-none text-[#C0473C]">*</span>

            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="태그 입력 후 Enter · 드래그 정렬"
              className="absolute w-[583.5px] h-[61.5px] top-[877.13px] left-[38.25px] border border-[#E4E4E7] border-[1.5px] rounded-[12px] px-[21px] font-inter font-normal text-[18.75px] leading-none text-[#27272A] placeholder:text-[#9A9AA3] placeholder:font-normal placeholder:text-[18.75px]"
            />

          {/* 6. 예시 입력·결과 */}\
            <div className="absolute whitespace-nowrap w-[105px] h-[21px] top-[954.3px] left-[37.5px] font-bold font-inter text-[17.25px] leading-none text-[#52525B]">
              예시 입력·결과 
            </div>
            <span className="absolute w-[10px] h-[21px] top-[954.3px] left-[144.8px] font-bold font-inter text-[17.25px] leading-none text-[#C0473C]">*</span>
            <div className="absolute w-[285px] h-[55.5px] top-[990px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] "></div>
            <div className="absolute whitespace-nowrap w-[115px] h-[23px] top-[1003.31px] left-[55.5px] font-inter font-normal text-[18.75px] leading-none text-[#27272A]">
                예시 입력 선택
            </div>
            <div className="absolute w-[9px] h-[20px] top-[1005.07px] left-[296.86px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">
              ⌄
            </div>

            <div className="absolute w-[285px] h-[55.5px] top-[990px] left-[336.75px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] "></div>
            <div className="absolute w-[115px] h-[23px] top-[1003.31px] left-[354px] font-inter font-normal text-[18.75px] leading-none text-[#27272A]">
                예시 결과 선택
            </div>
            <div className="absolute w-[9px] h-[20px] top-[1005.07px] left-[595.36px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">
              ⌄
            </div>

          {/* 7. 작성자 노트 */}
            <div className="absolute whitespace-nowrap w-[84px] h-[21px] top-[1061.18px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            작성자 노트
          </div>
          <span className="absolute w-[27px] h-[17px] top-[1063.27px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">
              선택
          </span>
            <textarea
              value={authorNote}
              onChange={(e) => setAuthorNote(e.target.value)}
              placeholder="활용 팁을 적어주세요"
              className="absolute w-[583.5px] h-[88.5px] top-[1096.88px] left-[38.25px] border border-[#E4E4E7] rounded-[12px] border-[1.5px] border-[1.5px] px-[21px] py-[16px] font-inter font-normal text-[18.75px] leading-none text-[#27272A] placeholder:text-[#9A9AA3] placeholder:font-normal placeholder:text-[18.75px]"
            />

            <div className="absolute w-[657px] h-[85.5px] top-[1220.63px] left-[1.5px] bg-[#FFFFFF]"></div>
            <hr className="absolute w-[657px] h-0 top-[1221.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
            <div className="absolute top-[116px] left-[20px] top-[1251.45px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3] whitespace-nowrap">
              공개 제목 미입력
            </div>
            <div
              onClick={() => setVerify(!verify)}
              className={`absolute w-[69.91px] h-[46.5px] top-[1240.88px] left-[566.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
                verify ? "bg-[#6366F1] border-[#6366F1]" : "bg-[#FFFFFF] border-[#E4E4E7]"
              }`}
            >
              <span className={`w-[35px] h-[23px] top-[1251px] left-[584.29px] font-inter font-bold text-[18.75px] leading-none ${verify ? "text-[#FFFFFF]" : "text-[#27272A]"}`}>검증</span>
            </div>
        
     </div>         
  );
}