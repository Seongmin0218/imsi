import {useState} from "react";
export default function Default1() {
  const [checked1, setChecked1]=useState("");
  const [checked2, setChecked2]=useState("");
  const [checked3, setChecked3]=useState("");
  const [checked4, setChecked4]=useState("");
  const [controll1, setControll1]=useState(false);
  const [controll2, setControll2]=useState(false);
  const [controll3, setControll3]=useState(false);
  const [level, setLevel] = useState("level");
 
  const [save2, setSave2]=useState(false);
  const [guide, setGuide]=useState("");
  return (
    <div className="relative w-[660px] h-[1005.56px] bg-[#FFFFFF]">
      <div className="absolute w-[658.5px] h-[1004.06px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7]">
        {/* 소개 */}
        <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]">
          <div className="w-[21px] h-[21px] top[35.93px] left-[32.06px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF]">
            🪜
          </div>
        </div>

        <div className="absolute whitespace-nowrap w-[239px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-SplineSansMono leading-none text-[#27272A]">
          단계별 가이드로 출력하기
        </div>

        <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-normal text-[15px] leading-none text-[#9A9AA3]">
          OUT-008 · OUTPUT
        </div>

        <div className="absolute w-[142.92px] h-[30px] top-[36.38px] left-[492.33px] border border-[1.5px] border-dashed border-[#CFE3D3] bg-[#CFE3D3] flex items-center justify-center rounded-[12px]">
          <div className="w-[121px] h-[18px] top-[40.13px] left-[505.08px] font-bold font-inter text-[15px] leading-none text-[#3C7A52]">
            RECOMMENDED
          </div>
        </div>

        <div className="absolute whitespace-nowrap w-[320px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
          따라 할 수 있는 단계별 가이드로 출력합니다.
        </div>

        <div className="absolute w-[64.48px] h-[30px] top-[133.88px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[41px] h-[18px] top-[137.63px] left-[37.5px] font-inter font-bold leading-none text-[#52525B] text-[15px]">
            필수 3
          </div>
        </div>

        <div className="absolute w-[64.05px] h-[30px] top-[133.88px] left-[99.73px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[41px] h-[18px] top-[137.63px] left-[112.48px] font-inter font-bold leading-none text-[#52525B] text-[15px] ">
            선택 2
          </div>
        </div>

        <div className="absolute w-[61.92px] h-[30px] top-[133.88px] left-[174.28px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[39px] h-[18px] top-[137.63px] left-[187.03px] font-inter font-bold leading-none text-[#52525B] text-[15px]">
            추천 1
          </div>
        </div>

        <hr className="absolute w-[657px] h-0 top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

          <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

          <div className="absolute whitespace-nowrap w-[199px] h-[23px] top-[216.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            단계별 가이드로 출력하기
          </div>

          <div className="absolute w-[25px] h-[16px] top-[220.43px] left-[560.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
          </div>

          <div className="absolute w-[10px] h-[22px] top-[218.02px] left-[612px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>

          <div className="absolute whitespace-nowrap  w-[84px] h-[21px] top-[254.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            가이드 대상</div>
           <div className="absolute w-[83.98px] h-[22.13px] top-[256.5px] left-[131.04px] border rounded-[8px] border-[#6366F1] bg-[#6366F1]"></div>
           <div className="absolute w-[74px] h-[15px] top-[258.07px] left-[138.54px] font-inter font-bold text-[12.75px] leading-none text-[#FFFFFF]">
             튜토리얼 추천
           </div>
            
           <span className="absolute w-[10px] h-[21px] top-[254.55px] left-[224.02px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
           </span>
           <div
            onClick={() => setGuide("guide1")}
            className={`absolute w-[136.88px] h-[94.69px] top-[290.25px] left-[38.25px] border border-[1.5px] rounded-[12px] ${
                guide === "guide1" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
            ></div>
            <div
            className={`absolute w-[39px] h-[39px] top-[304.5px] left-[87.19px] flex items-center justify-center rounded-[20px] ${
                guide === "guide1" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
            >
            <div
                className={`w-[17px] h-[22px] top-[311.4px] left-[98.19px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
                guide === "guide1" ? "text-[#FFFFFF]" : "text-[#52525B]"
                }`}
            >
                초
            </div>
            </div>
            <div className="absolute w-[29px] h-[19px] top-[349.73px] left-[92.19px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
            초보
            </div>

            <div
            onClick={() => setGuide("guide2")}
            className={`absolute w-[136.88px] h-[94.69px] top-[290.25px] left-[187.13px] border border-[1.5px] rounded-[12px] ${
                guide === "guide2" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
            ></div>
            <div
            className={`absolute w-[39px] h-[39px] top-[304.5px] left-[236.06px] flex items-center justify-center rounded-[20px] ${
                guide === "guide2" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
            >
            <div
                className={`w-[17px] h-[22px] top-[311.4px] left-[247.06px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
                guide === "guide2" ? "text-[#FFFFFF]" : "text-[#52525B]"
                }`}
            >
                팀
            </div>
            </div>
            <div className="absolute w-[29px] h-[19px] top-[349.73px] left-[241.06px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
            팀원
            </div>

            <div
            onClick={() => setGuide("guide3")}
            className={`absolute w-[136.88px] h-[94.69px] top-[290.25px] left-[336px] border border-[1.5px] rounded-[12px] ${
                guide === "guide3" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
            ></div>
            <div
            className={`absolute w-[39px] h-[39px] top-[304.5px] left-[384.94px] flex items-center justify-center rounded-[20px] ${
                guide === "guide3" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
            >
            <div
                className={`w-[17px] h-[22px] top-[311.4px] left-[395.94px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
                guide === "guide3" ? "text-[#FFFFFF]" : "text-[#52525B]"
                }`}
            >
                개
            </div>
            </div>
            <div className="absolute w-[29px] h-[19px] top-[349.73px] left-[389.94px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
            개발
            </div>

            <div
            onClick={() => setGuide("guide4")}
            className={`absolute w-[136.88px] h-[94.69px] top-[290.25px] left-[484.88px] border border-[1.5px] rounded-[12px] ${
                guide === "guide4" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
            ></div>
            <div
            className={`absolute w-[39px] h-[39px] top-[304.5px] left-[533.81px] flex items-center justify-center rounded-[20px] ${
                guide === "guide4" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
            >
            <div
                className={`w-[18px] h-[22px] top-[311.4px] left-[544.31px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
                guide === "guide4" ? "text-[#FFFFFF]" : "text-[#52525B]"
                }`}
            >
                一
            </div>
            </div>
            <div className="absolute w-[29px] h-[19px] top-[349.73px] left-[538.81px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
            일반
            </div>

            <div className="absolute whitespace-nowrap  w-[52px] h-[21px] top-[400.61px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            단계 수</div>
           <span className="absolute w-[10px] h-[21px] top-[400.61px] left-[95.2px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
           </span>
           <div
                onClick={() => setLevel("level1")}
                className={`absolute w-[80.32px] h-[48.38px] top-[436.31px] left-[32px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                level === "level1"
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-[#E4E4E7] bg-[#FFFFFF]"
                }`}
            ></div>

            <div
                onClick={() => setLevel("level1")}
                className={`absolute w-[32px] h-[21px] top-[447.49px] left-[57px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                level === "level1"
                    ? "text-[#FFFFFF]"
                    : "text-[#52525B]"
                }`}
            >
                자동
            </div>

            <div
                onClick={() => setLevel("level2")}
                className={`absolute w-[48.42px] h-[48.38px] top-[436.31px] left-[116.09px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                level === "level2"
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-[#E4E4E7] bg-[#FFFFFF]"
                }`}
            ></div>

            <div
                onClick={() => setLevel("level2")}
                className={`absolute w-[12px] h-[21px] top-[447.49px] left-[134.84px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                level === "level2"
                    ? "text-[#FFFFFF]"
                    : "text-[#52525B]"
                }`}
            >
                3
            </div>
            <div
                onClick={() => setLevel("level3")}
                className={`absolute w-[48.16px] h-[48.38px] top-[436.31px] left-[175.01px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                level === "level3"
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-[#E4E4E7] bg-[#FFFFFF]"
                }`}
            ></div>

            <div
                onClick={() => setLevel("level3")}
                className={`absolute w-[12px] h-[21px] top-[447.49px] left-[193.76px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                level === "level3"
                    ? "text-[#FFFFFF]"
                    : "text-[#52525B]"
                }`}
            >
                5
            </div>
            <div
                onClick={() => setLevel("level4")}
                className={`absolute w-[47.3px] h-[48.38px] top-[436.31px] left-[233.67px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                level === "level4"
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-[#E4E4E7] bg-[#FFFFFF]"
                }`}
            ></div>

            <div
                onClick={() => setLevel("level4")}
                className={`absolute w-[11px] h-[21px] top-[447.49px] left-[252.42px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                level === "level4"
                    ? "text-[#FFFFFF]"
                    : "text-[#52525B]"
                }`}
            >
                7
            </div>

          <div className="absolute whitespace-nowrap flex w-[68px] h-[21px] top-[500.36px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            단계 구성 <span className="w-[10px] h-[21px] top-[500.36px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">*</span>
          </div>


          <div className="absolute w-[91.34px] h-[40.5px] top-[536.06px] left-[41.25px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

          <div
          onClick={() =>
            setChecked1(prev => (prev === "checked1" ? "" : "checked1"))
          }
          className={`absolute w-[18px] h-[18px] top-[547.31px] left-[56.25px] rounded-[5px] flex items-center justify-center cursor-pointer ${
            checked1 === "checked1"
              ? "bg-[#6366F1]"
              : "border border-[1.5px] border-[#52525B]"
          }`}
        >
          {checked1 === "checked1" && (
            <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
              ✓
            </span>
          )}
        </div>

        <div
          onClick={() =>
            setChecked1(prev => (prev === "checked1" ? "" : "checked1"))
          }
          className={`absolute whitespace-nowrap w-[36px] h-[21px] top-[543.3px] left-[82.5px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
            checked1 === "checked1"
              ? "text-[#6366F1]"
              : "text-[#52525B]"
          }`}
        >
          할 일
        </div>

        <div className="absolute w-[91.34px] h-[40.5px] top-[536.06px] left-[144.05px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

        <div
          onClick={() =>
            setChecked2(prev => (prev === "checked2" ? "" : "checked2"))
          }
          className={`absolute w-[18px] h-[18px] top-[547.31px] left-[162.05px] rounded-[5px] flex items-center justify-center cursor-pointer ${
            checked2 === "checked2"
              ? "bg-[#6366F1]"
              : "border border-[1.5px] border-[#52525B]"
          }`}
        >
          {checked2 === "checked2" && (
            <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
              ✓
            </span>
          )}
        </div>

        <div
          onClick={() =>
            setChecked2(prev => (prev === "checked2" ? "" : "checked2"))
          }
          className={`absolute w-[32px] h-[21px] top-[543.3px] left-[188.3px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
            checked2 === "checked2"
              ? "text-[#6366F1]"
              : "text-[#52525B]"
          }`}
        >
          입력
        </div>

        <div className="absolute w-[91.34px] h-[40.5px] top-[536.06px] left-[245.88px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

        <div
          onClick={() =>
            setChecked3(prev => (prev === "checked3" ? "" : "checked3"))
          }
          className={`absolute w-[18px] h-[18px] top-[547.31px] left-[263.88px] rounded-[5px] flex items-center justify-center cursor-pointer ${
            checked3 === "checked3"
              ? "bg-[#6366F1]"
              : "border border-[1.5px] border-[#52525B]"
          }`}
        >
          {checked3 === "checked3" && (
            <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
              ✓
            </span>
          )}
        </div>

        <div
          onClick={() =>
            setChecked3(prev => (prev === "checked3" ? "" : "checked3"))
          }
          className={`absolute w-[32px] h-[21px] top-[543.3px] left-[290.13px] font-inter font-bold text-[15.75px] leading-none flex items-center cursor-pointer ${
            checked3 === "checked3"
              ? "text-[#6366F1]"
              : "text-[#52525B]"
          }`}
        >
          결과
        </div>

        <div className="absolute w-[91.34px] h-[40.5px] top-[536.06px] left-[347.72px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

        <div
          onClick={() =>
            setChecked4(prev => (prev === "checked4" ? "" : "checked4"))
          }
          className={`absolute w-[18px] h-[18px] top-[547.31px] left-[365.72px] rounded-[5px] flex items-center justify-center cursor-pointer ${
            checked4 === "checked4"
              ? "bg-[#6366F1]"
              : "border border-[1.5px] border-[#52525B]"
          }`}
        >
          {checked4 === "checked4" && (
            <span className="font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
              ✓
            </span>
          )}
        </div>

        <div
          onClick={() =>
            setChecked4(prev => (prev === "checked4" ? "" : "checked4"))
          }
          className={`absolute w-[32px] h-[21px] top-[543.3px] left-[391.97px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
            checked4 === "checked4"
              ? "text-[#6366F1]"
              : "text-[#52525B]"
          }`}
        >
          주의
        </div>
        <div className="absolute whitespace-nowrap flex w-[68px] h-[21px] top-[592.24px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            단계 순서 </div>
        <div className="absolute w-[27px] h-[17px] top-[594.34px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

        <div className="absolute w-[583.5px] h-[55.5px] top-[627.94px] left-[38.25px] bg-[#F5F5F7] rounded-[20px]">
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            viewBox="0 0 583.5 55.5"
            preserveAspectRatio="none"
          >
            <rect
              x="0.75"
              y="0.75"
              width="582"
              height="54"
              rx="20"
              fill="none"
              stroke="#E4E4E7"
              strokeWidth="1.5"
              strokeDasharray="9 6"
            />
          </svg>
        </div>
        <div className="absolute w-[286px] h-[22px] top-[643.09px] left-[55.5px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">직접 편집 시 — 단계 카드 드래그 정렬</div>
        <div className="absolute w-[9px] h-[20px] top-[643.01px] left-[595.36px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">⌄</div>

        <div className="absolute whitespace-nowrap flex w-[106px] h-[21px] top-[699.11px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            예시·오류·완료 </div>
        <div className="absolute w-[27px] h-[17px] top-[701.21px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

        <div className="absolute w-[71px] h-[22px] top-[736.46px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">예시 포함</div>
        <div onClick={() => setControll1(controll1 => !controll1)}
        className={`absolute w-[51px] h-[30px] top-[734.06px] left-[571.5px] border border-[1.5px]  rounded-[15px] ${
        controll1
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>
        <div className="absolute w-[108px] h-[22px] top-[796.46px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">오류 대처 포함</div>
        <div onClick={() => setControll2(controll2 => !controll2)}
        className={`absolute w-[51px] h-[30px] top-[794.06px] left-[571.5px] border border-[1.5px]  rounded-[15px] ${
        controll2
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>
        <div className="absolute w-[108px] h-[22px] top-[856.46px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">완료 확인 포함</div>
        <div onClick={() => setControll3(controll3 => !controll3)}
        className={`absolute w-[51px] h-[30px] top-[854.06px] left-[571.5px] border border-[1.5px]  rounded-[15px] ${
        controll3
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>
          

        <div className="w-[657px] h-[85.5px] top-[918.56px] left-[1.5px] bg-[#FFFFFF]">
            <hr className="absolute w-[657px] h-[0px] top-[919.31px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
            <div className=" absolute w-[146px] h-[20px] top-[949.39px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">기본값으로 출력 가능</div>
            <div
            onClick={() => setSave2(!save2)}
            className={`absolute w-[69.91px] h-[46.5px] top-[938.81px] left-[566.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              save2
                ? "bg-[#6366F1] border-[#6366F1]"
                : "bg-[#FFFFFF] border-[#E4E4E7]"
              }`}
            ></div>

            <div
              onClick={() => setSave2(!save2)}
              className={`absolute w-[35px] h-[23px] top-[948.94px] left-[584.29px] font-inter font-bold text-[18.75px] leading-none flex items-center justify-center ${
                save2
                  ? "text-[#FFFFFF]"
                  : "text-[#27272A]"
              }`}
            >
            출력
          </div>
        </div>
      </div>
    </div>
  );
}