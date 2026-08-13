import { useState } from "react";

export default function Default7() {
  // ── Default1과 동일한 패턴: 항목 하나당 useState 하나씩 ──
  const [target, setTarget] = useState("target1"); // FE/BE/전체/QA 카드 선택

  const [checked1, setChecked1] = useState(""); // 기능
  const [checked2, setChecked2] = useState(""); // 트리거
  const [checked3, setChecked3] = useState(""); // 입력
  const [checked4, setChecked4] = useState(""); // 출력
  const [checked5, setChecked5] = useState(""); // 상태
  const [checked6, setChecked6] = useState(""); // API
  const [checked7, setChecked7] = useState(""); // 예외
  const [checked8, setChecked8] = useState(""); // 권한

  const [detail, setDetail] = useState("detail2"); // 핵심/구현 가능/상세

  const [controll1, setControll1] = useState(false); // 기능 ID 표시
  const [controll2, setControll2] = useState(false); // 미정 항목 표시
  const [controll3, setControll3] = useState(false); // 우선순위 표시
  const [controll4, setControll4] = useState(false); // 우선순위 표시
  const [verify, setVerify] = useState(true); // 검증 버튼

  // 체크된 개수 계산 (하단 안내 문구용)
  const checkedList = [checked1, checked2, checked3, checked4, checked5, checked6, checked7, checked8];
  const checkedCount = checkedList.filter((v) => v !== "").length;


  return (
    <div className="relative w-[660px] h-[1083.19px] bg-[#FFFFFF] ">
      <div className="absolute w-[658.5px] h-[1081.69px] top-[0.75px] left-[0.75px] border border-[#E4E4E7] rounded-[12px]"></div>
        
          {/* ── 소개 ── */}
          <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]"></div>
          <div className="absolute w-[21px] h-[21px] top-[35.93px] left-[32.06px] font-bold text-[21px] font-inter font-bold leading-none text-[#FFFFFF]">
            💻
          </div>

          <div className="absolute whitespace-nowrap w-[259px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-inter leading-none text-[#27272A]">
            개발자 전달용으로 출력하기
          </div>

          <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-SplineSansMono font-normal text-[15px] leading-none text-[#9A9AA3]">
            OUT-006 · OUTPUT
          </div>

          <div className="absolute w-[142.92px] h-[30px] top-[36.38px] left-[492.33px] border border-[1.5px] border-dashed border-[#CFE3D3] bg-[#CFE3D3] flex items-center justify-center rounded-[12px]"></div>
          <div className="absolute whitespace-nowrap w-[121px] h-[18px] top-[40.13px] left-[505.08px] font-inter font-normal leading-none text-[#3C7A52] text-[15px]">
              RECOMMENDED
          </div>

          <div className="absolute whitespace-nowrap w-[299px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
            개발 역할에 맞는 전달 문서를 출력합니다.
          </div>

          <div className="absolute w-[64.76px] h-[30px] top-[133.88px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
            <div className="whitespace-nowrap w-[42px] h-[18px] top-[137.63px] left-37.5px] font-inter font-bold leading-none text-[#52525B]">필수 4</div>
          </div>
          <div className="absolute w-[61.92px] h-[30px] top-[133.88px] left-[100.01px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
            <div className="whitespace-nowrap w-[39px] h-[18px] top-[137.63px] left-[112.76px] font-inter font-bold leading-none text-[#52525B]">선택 1</div>
          </div>
          <div className="absolute w-[61.92px] h-[30px] top-[133.88px] left-[172.43px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
            <div className="whitespace-nowrap w-[39px] h-[18px] top-[137.63px] left-[185.18px] font-inter font-bold leading-none text-[#52525B]">누락 1</div>
          </div>

          <hr className="absolute w-[657px] h-0 top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

          {/* 섹션 타이틀 */}
          <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]" />
          <div className="absolute whitespace-nowrap w-[216px] h-[23px] top-[216.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            개발자 전달용으로 출력하기
          </div>
          <div className="absolute w-[25px] h-[16px] top-[220.43px] left-[560.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">필수</div>
          <div className="absolute w-[10px] h-[22px] top-[218.02px] left-[612px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">⌄</div>

          {/* 전달 대상 */}
          <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[254.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            전달 대상
            <span className="w-[10px] h-[21px] top-[254.55px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]"> *</span>
          </div>

          {/* target1: FE */}
          <div
            onClick={() => setTarget("target1")}
            className={`absolute w-[136.88px] h-[94.69px] top-[290.25px] left-[38.25px] border border-[1.5px] rounded-[12px] cursor-pointer ${
              target === "target1" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>
          <div
            onClick={() => setTarget("target1")}
            className={`absolute w-[39px] h-[39px] top-[304.5px] left-[87.19px] flex items-center justify-center rounded-full cursor-pointer ${
              target === "target1" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
          >
            <div className={` w-[22px] h-[22px] top-[311.4px] left-[95.68px] font-inter font-bold leading-none ${target === "target1" ? "text-[#FFFFFF]" : "text-[#52525B]"}`}>FE</div>
          </div>
          <div className="absolute w-[19px] h-[19px] top-[349.73px] left-[97.19px] font-inter font-bold text-[15.75px] leading-none text-[#52525B] text-center">FE</div>

          {/* target2: BE */}
            <div
            onClick={() => setTarget("target2")}
            className={`absolute w-[136.88px] h-[94.69px] top-[290.25px] left-[187.13px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                target === "target2" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
            ></div>

            <div
            onClick={() => setTarget("target2")}
            className={`absolute w-[39px] h-[39px] top-[304.5px] left-[236.07px] flex items-center justify-center rounded-full cursor-pointer ${
                target === "target2" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
            >
            <div
                className={`w-[23px] h-[22px] top-[311.4px] left-[244.06px] font-inter font-bold leading-none ${
                target === "target2" ? "text-[#FFFFFF]" : "text-[#52525B]"
                }`}
            >
                BE
            </div>
            </div>

            <div className="absolute w-[21px] h-[19px] top-[349.73px] left-[245.06px] font-inter font-bold text-[15.75px] leading-none text-[#52525B] text-center">
            BE
            </div>

            {/* target3: 전체 */}
            <div
            onClick={() => setTarget("target3")}
            className={`absolute w-[136.88px] h-[94.69px] top-[290.25px] left-[336px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                target === "target3" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
            ></div>

            <div
            onClick={() => setTarget("target3")}
            className={`absolute w-[39px] h-[39px] top-[304.5px] left-[384.94px] flex items-center justify-center rounded-full cursor-pointer ${
                target === "target3" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
            >
            <div
                className={`w-[18px] h-[22px] top-[311.4px] left-[395.44px] font-inter font-bold leading-none ${
                target === "target3" ? "text-[#FFFFFF]" : "text-[#52525B]"
                }`}
            >
                全
            </div>
            </div>

            <div className="absolute w-[29px] h-[19px] top-[349.73px] left-[389.94px] font-inter font-bold text-[15.75px] leading-none text-[#52525B] text-center">
            전체
            </div>

            {/* target4: QA */}
            <div
            onClick={() => setTarget("target4")}
            className={`absolute w-[136.88px] h-[94.69px] top-[290.25px] left-[484.88px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                target === "target4" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
            ></div>

            <div
            onClick={() => setTarget("target4")}
            className={`absolute w-[39px] h-[39px] top-[304.5px] left-[533.82px] flex items-center justify-center rounded-full cursor-pointer ${
                target === "target4" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
            >
            <div
                className={`w-[27px] h-[22px] top-[311.4px] left-[539.81px] font-inter font-bold leading-none ${
                target === "target4" ? "text-[#FFFFFF]" : "text-[#52525B]"
                }`}
            >
                QA
            </div>
            </div>

            <div className="absolute w-[24px] h-[19px] top-[349.73px] left-[541.31px] font-inter font-bold text-[15.75px] leading-none text-[#52525B] text-center">
            QA
            </div>

          {/* 포함 항목 */}
          <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[400.61px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            포함 항목
            <span className="w-[10px] h-[21px] top-[400.61px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]"> *</span>
          </div>

          {/* row1 : 기능/트리거/입력/출력/상태 */}
          <div className="absolute w-[91.34px] h-[40.5px] top-[436.31px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[20px]"></div>
          <div
            onClick={() => setChecked1((prev) => (prev === "checked1" ? "" : "checked1"))}
            className={`absolute w-[18px] h-[18px] top-[447.56px] left-[56.25px] rounded-[5px] flex items-center justify-center cursor-pointer ${
              checked1 === "checked1" ? "bg-[#6366F1]" : "border border-[1.5px] border-[#52525B]"
            }`}
          >
            {checked1 === "checked1" && <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">✓</span>}
          </div>
          <div
            onClick={() => setChecked1((prev) => (prev === "checked1" ? "" : "checked1"))}
            className={`absolute whitespace-nowrap w-[32px] h-[21px] top-[443.55px] left-[82.5px] font-inter font-bold text-[17.25px] leading-none  ${
              checked1 === "checked1" ? "text-[#6366F1]" : "text-[#52525B]"
            }`}
          >
            기능
          </div>

          <div className="absolute w-[106.24px] h-[40.5px] top-[436.31px] left-[140.09px] border border-[1.5px] border-[#E4E4E7] rounded-[20px]"></div>
          <div
            onClick={() => setChecked2((prev) => (prev === "checked2" ? "" : "checked2"))}
            className={`absolute w-[18px] h-[18px] top-[447.56px] left-[158.09px] rounded-[5px] flex items-center justify-center cursor-pointer ${
              checked2 === "checked2" ? "bg-[#6366F1]" : "border border-[1.5px] border-[#52525B]"
            }`}
          >
            {checked2 === "checked2" && <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">✓</span>}
          </div>
          <div
            onClick={() => setChecked2((prev) => (prev === "checked2" ? "" : "checked2"))}
            className={`absolute whitespace-nowrap w-[48px] h-[21px] top-[443.55px] left-[184.34px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              checked2 === "checked2" ? "text-[#6366F1]" : "text-[#52525B]"
            }`}
          >
            트리거
          </div>

          <div className="absolute w-[91.34px] h-[40.5px] top-[436.31px] left-[256.83px] border border-[1.5px] border-[#E4E4E7] rounded-[20px]"></div>
          <div
            onClick={() => setChecked3((prev) => (prev === "checked3" ? "" : "checked3"))}
            className={`absolute w-[18px] h-[18px] top-[447.56px] left-[274.83px] rounded-[5px] flex items-center justify-center cursor-pointer ${
              checked3 === "checked3" ? "bg-[#6366F1]" : "border border-[1.5px] border-[#52525B]"
            }`}
          >
            {checked3 === "checked3" && <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">✓</span>}
          </div>
          <div
            onClick={() => setChecked3((prev) => (prev === "checked3" ? "" : "checked3"))}
            className={`absolute whitespace-nowrap w-[32px] h-[21px] top-[443.55px] left-[301.08px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              checked3 === "checked3" ? "text-[#6366F1]" : "text-[#52525B]"
            }`}
          >
            입력
          </div>

          <div className="absolute w-[91.34px] h-[40.5px] top-[436.31px] left-[358.66px] border border-[1.5px] border-[#E4E4E7] rounded-[20px]"></div>
          <div
            onClick={() => setChecked4((prev) => (prev === "checked4" ? "" : "checked4"))}
            className={`absolute w-[18px] h-[18px] top-[447.56px] left-[376.66px] rounded-[5px] flex items-center justify-center cursor-pointer ${
              checked4 === "checked4" ? "bg-[#6366F1]" : "border border-[1.5px] border-[#52525B]"
            }`}
          >
            {checked4 === "checked4" && <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">✓</span>}
          </div>
          <div
            onClick={() => setChecked4((prev) => (prev === "checked4" ? "" : "checked4"))}
            className={`absolute whitespace-nowrap w-[32px] h-[21px] top-[443.55px] left-[402.91px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              checked4 === "checked4" ? "text-[#6366F1]" : "text-[#52525B]"
            }`}
          >
            출력
          </div>

          <div className="absolute w-[91.34px] h-[40.5px] top-[436.31px] left-[460.5px] border border-[1.5px] border-[#E4E4E7] rounded-[20px]"></div>
          <div
            onClick={() => setChecked5((prev) => (prev === "checked5" ? "" : "checked5"))}
            className={`absolute w-[18px] h-[18px] top-[447.56px] left-[478.5px] rounded-[5px] flex items-center justify-center cursor-pointer ${
              checked5 === "checked5" ? "bg-[#6366F1]" : "border border-[1.5px] border-[#52525B]"
            }`}
          >
            {checked5 === "checked5" && <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">✓</span>}
          </div>
          <div
            onClick={() => setChecked5((prev) => (prev === "checked5" ? "" : "checked5"))}
            className={`absolute whitespace-nowrap w-[32px] h-[21px] top-[443.55px] left-[504.75px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              checked5 === "checked5" ? "text-[#6366F1]" : "text-[#52525B]"
            }`}
          >
            상태
          </div>

          {/* row2 : API/예외/권한 */}
          <div className="absolute w-[88.59px] h-[40.5px] top-[487.31px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[20px]"></div>
          <div
            onClick={() => setChecked6((prev) => (prev === "checked6" ? "" : "checked6"))}
            className={`absolute w-[18px] h-[18px] top-[498.56px] left-[56.25px] rounded-[5px] flex items-center justify-center cursor-pointer ${
              checked6 === "checked6" ? "bg-[#6366F1]" : "border border-[1.5px] border-[#52525B]"
            }`}
          >
            {checked6 === "checked6" && <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">✓</span>}
          </div>
          <div
            onClick={() => setChecked6((prev) => (prev === "checked6" ? "" : "checked6"))}
            className={`absolute whitespace-nowrap w-[29px] h-[21px] top-[494.55px] left-[82.5px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              checked6 === "checked6" ? "text-[#6366F1]" : "text-[#52525B]"
            }`}
          >
            API
          </div>

          <div className="absolute w-[91.34px] h-[40.5px] top-[487.31px] left-[137.34px] border border-[1.5px] border-[#E4E4E7] rounded-[20px]"></div>
          <div
            onClick={() => setChecked7((prev) => (prev === "checked7" ? "" : "checked7"))}
            className={`absolute w-[18px] h-[18px] top-[498.56px] left-[155.34px] rounded-[5px] flex items-center justify-center cursor-pointer ${
              checked7 === "checked7" ? "bg-[#6366F1]" : "border border-[1.5px] border-[#52525B]"
            }`}
          >
            {checked7 === "checked7" && <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">✓</span>}
          </div>
          <div
            onClick={() => setChecked7((prev) => (prev === "checked7" ? "" : "checked7"))}
            className={`absolute whitespace-nowrap w-[32px] h-[21px] top-[494.55px] left-[181.59px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              checked7 === "checked7" ? "text-[#6366F1]" : "text-[#52525B]"
            }`}
          >
            예외
          </div>

          <div className="absolute w-[91.34px] h-[40.5px] top-[487.31px] left-[239.18px] border border-[1.5px] border-[#E4E4E7] rounded-[20px]"></div>
          <div
            onClick={() => setChecked8((prev) => (prev === "checked8" ? "" : "checked8"))}
            className={`absolute w-[18px] h-[18px] top-[498.56px] left-[257.18px] rounded-[5px] flex items-center justify-center cursor-pointer ${
              checked8 === "checked8" ? "bg-[#6366F1]" : "border border-[1.5px] border-[#52525B]"
            }`}
          >
            {checked8 === "checked8" && <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">✓</span>}
          </div>
          <div
            onClick={() => setChecked8((prev) => (prev === "checked8" ? "" : "checked8"))}
            className={`absolute whitespace-nowrap w-[32px] h-[21px] top-[494.55px] left-[283.43px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              checked8 === "checked8" ? "text-[#6366F1]" : "text-[#52525B]"
            }`}
          >
            권한
          </div>

          {checkedCount === 0 && (
            <div className="absolute whitespace-nowrap w-[151px] h-[19px] top-[537.79px] left-[37.5px] font-inter font-bold text-[15.75pxpx] leading-none text-[#C0473C]">
              ⚠ 1개 이상 선택하세요
            </div>
          )}

          {/* 상세 수준 */}
          <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[576.11px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            상세 수준
            <span className="w-[10px] h-[21px] top-[576.11px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]"> *</span>
          </div>

          <div className="absolute w-[583.5px] h-[48.38px] top-[611.81px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px]"></div>

          <div
            onClick={() => setDetail("detail1")}
            className={`absolute w-[194.5px] h-[46.88px] top-[612.56px] left-[38.25px] flex items-center justify-center cursor-pointer rounded-tl-[12px] rounded-bl-[12px] ${
              detail === "detail1" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          >
            <span className={` w-[32px] h-[21px] top-[622.99px] left-[119.48px] font-inter font-bold text-[16px] leading-none ${detail === "detail1" ? "text-[#FFFFFF]" : "text-[#52525B]"}`}>핵심</span>
          </div>
          <div className="absolute w-0 h-[46.88px] top-[612.56px] left-[232.73px] border-[1.5px] border-[#E4E4E7] z-10"></div>

          <div
            onClick={() => setDetail("detail2")}
            className={`absolute w-[194.5px] h-[46.88px] top-[612.56px] left-[231.98px] flex items-center justify-center cursor-pointer ${
              detail === "detail2" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          >
            <span className={`w-[68px] h-[21px] top-[622.99px] left-[295.98px] font-inter font-bold text-[16px] leading-none ${detail === "detail2" ? "text-[#FFFFFF]" : "text-[#52525B]"}`}>구현 가능</span>
          </div>
          <div className="absolute w-0 h-[46.88px] top-[612.56px] left-[427.24px] border-[1.5px] border-[#E4E4E7] z-10"></div>

          <div
            onClick={() => setDetail("detail3")}
            className={`absolute w-[194.5px] h-[46.88px] top-[612.56px] left-[427.25px] flex items-center justify-center cursor-pointer rounded-tr-[12px] rounded-br-[12px] ${
              detail === "detail3" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          >
            <span className={`font-inter font-bold text-[16px] leading-none ${detail === "detail3" ? "text-[#FFFFFF]" : "text-[#52525B]"}`}>상세</span>
          </div>

          {/* 정상·예외 구분 */}
          <div className="absolute whitespace-nowrap w-[105px] h-[21px] top-[675.86px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            정상·예외 구분
            <span className="w-[10px] h-[21px] top-[675.86px] left-[144.8px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]"> *</span>
          </div>

          <div className="absolute w-[169px] h-[22px] top-[711.71px] left-[37.5px] font-inter font-bold text-[16.5px] leading-none text-[#27272A]">
            🔒 정상·예외 흐름 구분
          </div>
          <div className="absolute whitespace-nowrap w-[138px] h-[18px] top-[739.31px] left-[37.5px] font-inter font-normal text-[14.25px] leading-none text-[#9A9AA3]">
            고정 ON — 해제 불가
          </div>
          <div
            onClick={() => setControll1((controll1) => !controll1)}
            className={`absolute w-[49.5px] h-[28.5px] top-[722.06px] left-[572.25px] border border-[1.5px] rounded-[15px] cursor-pointer ${
              controll1 ? "border-[#6366F1] bg-[#6366F1]" : "border-[#E4E4E7] bg-[#E7E7EC]"
            }`}
          ></div>

          <div className="absolute whitespace-nowrap w-[123px] h-[21px] top-[776.74px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            ID·미정·우선순위
          </div>
          <div className="absolute w-[27px] h-[17px] top-[778.84px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

          <div className="absolute top-[93px] left-[22px] top-[814.09px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A]">기능 ID 표시</div>
          <div
            onClick={() => setControll2((controll2) => !controll2)}
            className={`absolute w-[49.5px] h-[28.5px] top-[812.44px] left-[572.25px] border border-[1.5px] rounded-[15px] cursor-pointer ${
              controll2 ? "border-[#6366F1] bg-[#6366F1]" : "border-[#E4E4E7] bg-[#E7E7EC]"
            }`}
          ></div>

          <div className="absolute top-[108px] left-[22px] top-[874.09px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A]">미정 항목 표시</div>
          <div
            onClick={() => setControll3((controll3) => !controll3)}
            className={`absolute w-[49.5px] h-[28.5px] top-[872.44px] left-[572.25px] border border-[1.5px] rounded-[15px] cursor-pointer ${
              controll3 ? "border-[#6366F1] bg-[#6366F1]" : "border-[#E4E4E7] bg-[#E7E7EC]"
            }`}
          ></div>

          <div className="absolute top-[104px] left-[22px] top-[934.09px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A]">우선순위 표시</div>
          <div
            onClick={() => setControll4((controll4) => !controll4)}
            className={`absolute w-[49.5px] h-[28.5px] top-[932.44px] left-[572.25px] border border-[1.5px] rounded-[15px] cursor-pointer ${
              controll4 ? "border-[#6366F1] bg-[#6366F1]" : "border-[#E4E4E7] bg-[#E7E7EC]"
            }`}
          ></div>

          <div className="absolute w-[657px] h-[85.5px] top-[996.19px] left-[1.5px] bg-[#FFFFFF]"></div>
            <hr className="absolute w-[657px] h-0 top-[996.94px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
            <div className="absolute top-[116px] left-[20px] top-[1027.01px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3] whitespace-nowrap">
              포함 항목 미선택
            </div>
            <div
              onClick={() => setVerify(!verify)}
              className={`absolute w-[69.91px] h-[46.5px] top-[1016.44px] left-[566.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
                verify ? "bg-[#6366F1] border-[#6366F1]" : "bg-[#FFFFFF] border-[#E4E4E7]"
              }`}
            >
              <span className={`w-[35px] h-[23px] top-[1026.56px] left-[584.29px] font-inter font-bold text-[18.75px] leading-none ${verify ? "text-[#FFFFFF]" : "text-[#27272A]"}`}>검증</span>
            </div>
          
        
    </div>
  );
}