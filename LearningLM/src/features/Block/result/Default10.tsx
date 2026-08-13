import { useState } from "react";

export default function Default10() {
  // ── Default1과 동일한 패턴: 항목 하나당 useState 하나씩 ──
  const [form, setForm] = useState("form1"); // 일반/역할형/단계형/템플릿형
  
  const [sectionType, setSectionType] = useState("one");
  
  const [sentence, setSentence] = useState("normal");
  const [controll1, setControll1] = useState(false); // 기능 ID 표시
  const [controll2, setControll2]=useState(false);
  const [verify, setVerify] = useState(false); // 검증 버튼
  return (
    <div className="relative w-[660px] h-[1249.31px] bg-[#FFFFFF] ">
      <div className="absolute w-[658.5px] h-[1247.81px] top-[0.75px] left-[0.75px] border border-[#E4E4E7] rounded-[12px]"></div>
        
          {/* ── 소개 ── */}
          <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]"></div>
          <div className="absolute w-[21px] h-[21px] top-[35.93px] left-[32.06px] font-bold text-[21px] font-inter font-bold leading-none text-[#FFFFFF]">
            🧬
          </div>

          <div className="absolute whitespace-nowrap w-[265px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-inter leading-none text-[#27272A]">
            복사 가능한 흐름으로 만들기
          </div>

          <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-SplineSansMono font-normal text-[15px] leading-none text-[#9A9AA3]">
            OUT-011 · OUTPUT
          </div>

          <div className="absolute w-[142.92px] h-[30px] top-[36.38px] left-[492.33px] border border-[1.5px] border-dashed border-[#CFE3D3] bg-[#CFE3D3] flex items-center justify-center rounded-[12px]"></div>
          <div className="absolute whitespace-nowrap w-[121px] h-[18px] top-[40.13px] left-[505.08px] font-inter font-normal leading-none text-[#3C7A52] text-[15px]">
              RECOMMENDED
          </div>

          <div className="absolute whitespace-nowrap w-[372px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
            다른 사용자가 복사해 쓸 수 있게 흐름을 정리합니다.
          </div>

          <div className="absolute w-[64.29px] h-[30px] top-[133.88px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
            <div className="whitespace-nowrap w-[41px] h-[18px] top-[137.63px] left-37.5px] font-inter font-bold leading-none text-[#52525B]">필수 5</div>
          </div>
          <div className="absolute w-[61.92px] h-[30px] top-[133.88px] left-[99.54px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
            <div className="whitespace-nowrap w-[39px] h-[18px] top-[137.63px] left-[112.29px] font-inter font-bold leading-none text-[#52525B]">선택 1</div>
          </div>
          <div className="absolute w-[61.92px] h-[30px] top-[133.88px] left-[171.96px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
            <div className="whitespace-nowrap w-[39px] h-[18px] top-[137.63px] left-[184.71px] font-inter font-bold leading-none text-[#52525B]">고정 1</div>
          </div>

          <hr className="absolute w-[657px] h-0 top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

          {/* 섹션 타이틀 */}
          <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]" />
          <div className="absolute whitespace-nowrap w-[221px] h-[23px] top-[216.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            복사 가능한 흐름으로 만들기
          </div>
          <div className="absolute w-[25px] h-[16px] top-[220.43px] left-[560.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">필수</div>
          <div className="absolute w-[10px] h-[22px] top-[218.02px] left-[612px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">⌄</div>

          {/* 전달 대상 */}
          <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[254.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            복사 허용
            <span className="w-[10px] h-[21px] top-[254.55px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]"> *</span>
          </div>
          <div className="absolute w-[71px] h-[22px] top-[290.4px] left-[37.5px] font-inter font-bold text-[16.5px] leading-none text-[#27272A]">
            복사 허용
          </div>
          <div className="absolute whitespace-nowrap w-[55px] h-[18px] top-[318px] left-[37.5px] font-inter font-normal text-[14.25px] leading-none text-[#9A9AA3]">
            기본 ON
          </div>
          <div
            onClick={() => setControll1((controll1) => !controll1)}
            className={`absolute w-[51px] h-[30px] top-[300px] left-[571.5px] border border-[1.5px] rounded-[15px] cursor-pointer ${
              controll1 ? "border-[#6366F1] bg-[#6366F1]" : "border-[#E4E4E7] bg-[#E7E7EC]"
            }`}
          ></div>

          <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[355.43px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            복사 대상
            <span className="w-[10px] h-[21px] top-[355.43px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]"> *</span>
          </div>

          <div
            onClick={() => setForm("form1")}
            className={`absolute w-[583.5px] h-[59.63px] top-[391.13px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
              form === "form1" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            onClick={() => setForm("form1")}
            className={`absolute w-[24px] h-[24px] top-[408.38px] left-[55.5px] border border-[1.5px] rounded-[8px] ${
              form === "form1"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[406.5px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            블록 구조
          </div>


          <div
            onClick={() => setForm("form2")}
            className={`absolute w-[583.5px] h-[59.63px] top-[462.75px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
              form === "form2" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            onClick={() => setForm("form2")}
            className={`absolute w-[22.5px] h-[22.5px] top-[480.75px] left-[56.25px] border border-[1.5px] rounded-[8px] ${
              form === "form2"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute w-[57px] h-[23px] top-[478.13px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            옵션 값
          </div>

          <div
            onClick={() => setForm("form3")}
            className={`absolute w-[583.5px] h-[59.63px] top-[534.38px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
              form === "form3" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            onClick={() => setForm("form3")}
            className={`absolute w-[22.5px] h-[22.5px] top-[552.38px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form3"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[549.75px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            예시 입력
          </div>

          <div className="absolute whitespace-nowrap w-[120px] h-[21px] top-[609.68px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            개인 데이터 제거
            <span className="w-[10px] h-[21px] top-[609.68px] left-[158.81px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]"> *</span>
          </div>
          <div className="absolute w-[147px] h-[22px] top-[645.52px] left-[37.5px] font-inter font-bold text-[16.5px] leading-none text-[#27272A]">
            🔒 개인 데이터 제거
          </div>
          <div className="absolute whitespace-nowrap w-[138px] h-[18px] top-[673.13px] left-[37.5px] font-inter font-normal text-[14.25px] leading-none text-[#9A9AA3]">
            고정 ON — 해제 불가
          </div>
          <div
            onClick={() => setControll2((controll2) => !controll2)}
            className={`absolute w-[49.5px] h-[28.5px] top-[655.88px] left-[572.25px] border border-[1.5px] rounded-[15px] cursor-pointer ${
              controll2 ? "border-[#6366F1] bg-[#6366F1]" : "border-[#E4E4E7] bg-[#E7E7EC]"
            }`}
          ></div>


          <div className="absolute whitespace-nowrap w-[104px] h-[21px] top-[710.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            문서 연결 처리
            <span className="w-[10px] h-[21px] top-[710.55px] left-[143.91px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]"> *</span>
          </div>

          <div
            onClick={() => setForm("form4")}
            className={`absolute w-[583.5px] h-[84.66px] top-[746.25px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
              form === "form4" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            onClick={() => setForm("form4")}
            className={`absolute w-[22.5px] h-[22.5px] top-[764.25px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form4"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[761.63px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            연결 제거
          </div>
          <div className="absolute whitespace-nowrap w-[144px] h-[19px] top-[791.85px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">
            문서 연결을 끊고 복사
          </div>


          <div
            onClick={() => setForm("form5")}
            className={`absolute w-[583.5px] h-[84.66px] top-[842.91px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
              form === "form5" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            onClick={() => setForm("form5")}
            className={`absolute w-[22.5px] h-[22.5px] top-[860.91px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form5"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute whitespace-nowrap w-[113px] h-[23px] top-[858.28px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            대체 문서 요청
          </div>
          <div className="absolute whitespace-nowrap w-[140px] h-[19px] top-[888.51px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">
            복사자에게 문서 요청
          </div>

          <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[549.75px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            예시 입력
          </div>

          <div className="absolute whitespace-nowrap w-[84px] h-[21px] top-[943.24px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            입력 초기화
            <span className="w-[10px] h-[21px] top-[943.24px] left-[125.04px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]"> *</span>
          </div>
          <div
            onClick={() => setSentence("one")}
            className={`absolute w-[100.32px] h-[48.38px] top-[978.94px] left-[50.25px] border border-[1.5px] rounded-[12px] cursor-pointer ${
              sentence === "one"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7] bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSentence("one")}
            className={`absolute whitespace-nowrap w-[84px] h-[21px] top-[990.11px] left-[57px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              sentence === "one"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            모두 초기화
          </div>

          <div
            onClick={() => setSentence("two")}
            className={`absolute w-[101.25px] h-[48.38px] top-[978.94px] left-[164.79px] border border-[1.5px] rounded-[12px] cursor-pointer ${
              sentence === "two"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7] bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSentence("two")}
            className={`absolute whitespace-nowrap w-[68px] h-[21px] top-[990.11px] left-[183.54px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              sentence === "two"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            예시 유지
          </div>

          <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[1042.99px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            수정 범위 </div>
            <span className="absolute w-[27px] h-[17px] top-[1045.09px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</span>

          <div className="absolute w-[583.5px] h-[48.38px] top-[1078.69px] left-[38.25px] border border-[#E4E4E7] rounded-[12px] border-[1.5px]"></div>

          <div
            onClick={() => setSectionType("all")}
            className={`absolute w-[290.25px] h-[46.88px] top-[1079.44px] left-[39px] flex items-center justify-center cursor-pointer rounded-tl-[12px] rounded-bl-[12px] ${
              sectionType === "all" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("all")}
            className={`absolute w-[32px] h-[21px] top-[1089.86px] left-[168.11px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "all"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            전체
          </div>

          <div className="absolute  z-10 w-[0px] h-[46.88px] top-[1079.44px] left-[330px] border-[1.5px] border-[#E4E4E7] "></div>

          <div
            onClick={() => setSectionType("core")}
            className={`absolute w-[291.75px] h-[46.88px] top-[1079.44px] left-[329.25px] flex items-center justify-center rounded-tr-[12px] rounded-br-[12px] ${
              sectionType === "core" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("core")}
            className={`absolute whitespace-nowrap w-[48px] h-[21px] top-[1089.86px] left-[451.86px]  font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "core"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            입력만
          </div>
          

          <div className="absolute w-[657px] h-[85.5px] top-[1162.31px] left-[1.5px] bg-[#FFFFFF]"></div>
            <hr className="absolute w-[657px] h-0 top-[1163.06px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
            <div className="absolute top-[230px] left-[20px] top-[1193.14px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3] whitespace-nowrap">
              복사 허용 · 개인 데이터 제거 고정
            </div>
            <div
              onClick={() => setVerify(!verify)}
              className={`absolute w-[69.91px] h-[46.5px] top-[1182.56px] left-[566.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
                verify ? "bg-[#6366F1] border-[#6366F1]" : "bg-[#FFFFFF] border-[#E4E4E7]"
              }`}
            >
              <span className={`w-[35px] h-[23px] top-[1192.69px] left-[584.29px] font-inter font-bold text-[18.75px] leading-none ${verify ? "text-[#FFFFFF]" : "text-[#27272A]"}`}>적용</span>
            </div>
          
        
    </div>
  );
}