
import { useState } from "react";

export default function Default5() {
  const [title, setTitle] = useState("");
  const [promptType, setPromptType] = useState("one");
  const [save, setSave] = useState(false);

  return (
    <div className="relative w-[660px] h-[928.13px] bg-[#FFFFFF]">
      <div className="absolute w-[658.5px] h-[926.63px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7] bg-[#FFFFFF]">

        {/* ===== 헤더 ===== */}
        <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]">
          <div className="w-[18px] h-[25px] h-[35.93px] left-[36px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF] flex items-center justify-center">
            ▦
          </div>
        </div>

        <div className="absolute whitespace-nowrap w-[130px] h-[27px] top-[23.25px] left-[84px] font-inter font-bold text-[22.5px] leading-none text-[#27272A] ">
          표로 출력하기
        </div>

        <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-SplineSansMono font-normal text-[15px] leading-none text-[#9A9AA3]">
          OUT-002 · OUTPUT
        </div>

        
          <div className="absolute w-[43px] h-[18px] top-[40.13px] left-[581.51px] ont-inter font-bold text-[15px] leading-[100%] text-[#6366F1]">
            CORE
          </div>
        

        <div className="absolute w-[571px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
          출력할 표의 열을 카드로 만들어 순서를 정하고, 행 기준과 셀 분량을 지정합니다.
        </div>

        {/* 태그 */}
        <div className="absolute w-[51.8px] h-[30px] top-[133.88px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[8px]">
          <div className="whitespace-nowrap  w-[28px] h-[18px] top-[137.63px] left-[37.5px] font-inter font-bold leading-none text-[#52525B] text-[15px] ">
            열 4
          </div>
        </div>

        <div className="absolute w-[72.09px] h-[30px] top-[133.88px] left-[87.05px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[8px]">
          <div className="whitespace-nowrap  w-[50px] h-[18px] top-[137.63px] left-[99.8px] font-inter font-bold leading-none text-[#52525B] text-[15px]">
            행: 대상
          </div>
        </div>

        <div className="absolute w-[72.09px] h-[30px] top-[133.88px] left-[169.64px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[8px]">
          <div className="whitespace-nowrap  w-[50px] h-[18px] top-[137.63px] left-[182.39px] font-inter font-bold leading-none text-[#52525B] text-[15px]">
            셀: 짧게
          </div>
        </div>

        <hr className="absolute w-[657px] h-0 top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

        {/* ===== 본문 ===== */}
        <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

        <div className="absolute whitespace-nowrap w-[57px] h-[23px] top-[216.63px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          표 출력
        </div>

        <div className="absolute w-[25px] h-[16px] top-[220.43px] left-[560.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
          필수
        </div>

        <div className="absolute w-[10px] h-[22px] top-[218.03px] left-[612px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        {/* 표 제목 */}
        <div className="absolute whitespace-nowrap w-[52px] h-[21px] top-[254.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
          표 제목
        </div>
        <div className="absolute w-[27px] h-[17px] top-[256.65px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">
          선택
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제품 비교 요약표"
          className="absolute w-[583.5px] h-[52.5px] top-[290.25px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] px-[17.25px] font-inter font-normal text-[18.75px] leading-none text-[#27272A] placeholder:text-[#A1A1AA] focus:outline-none"
        />

        {/* 열 블록 */}
        <div className="absolute whitespace-nowrap w-[52px] h-[21px] top-[358.43px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
          열 블록
          <span className="whitespace-nowrap w-[93px] h-[21px] top-[358.43px] left-[95.2px] font-inter font-bold text-[17.25px] leading-none text-[#9A9AA3]">· 드래그 정렬</span>
          <span className="whitespace-nowrap w-[10px] h-[21px] top-[358.43px] left-[191.65px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]"> *</span>
        </div>
        <div className="absolute w-[163.99px] h-[99.75px] top-[393.38px] left-[37.5px] bg-[#FFFFFF] border border-[1.5px] border-[#E4E4E7] rounded-[12px]"></div>
        <div className="absolute w-[160.99px] h-[47.25px] top-[394.88px] left-[39px] bg-[#F0F0F3] rounded-tl-[12px] rounded-tr-[12px]"></div>
        <div className="absolute w-[4.5px] h-[4.5px] top-[415.5px] left-[51px] border border-[1.5px] border-[#9A9AA3] bg-[#9A9AA3] rounded-full"></div>
        <div className="absolute w-[4.5px] h-[4.5px] top-[415.5px] left-[60px] border border-[1.5px] border-[#9A9AA3] bg-[#9A9AA3] rounded-full"></div>
        <div className="absolute w-[4.5px] h-[4.5px] top-[415.5px] left-[69px] border border-[1.5px] border-[#9A9AA3] bg-[#9A9AA3] rounded-full"></div>
        <div className="absolute w-[31px] h-[20px] top-[405.07px] left-[81px]  font-inter font-bold text-[16.5px] leading-none text-[#27272A]">대상</div>
        <div className="absolute w-[11px] h-[20px] top-[405.07px] left-[177.63px]  font-inter font-bold text-[16.5px] leading-none text-[#9A9AA3]">×</div>
        <div className="absolute w-[160.99px] h-[0px] top-[441.38px] left-[39px] border border-[1.5px] border-[#EEEEF1]"></div>
        <div className="absolute w-[116.44px] h-[10.5px] top-[452.63px] left-[51px] bg-[#F0F0F3] rounded-[12px]"></div>
        <div className="absolute w-[95.88px] h-[10.5px] top-[470.63px] left-[51px] bg-[#F0F0F3] rounded-[12px]"></div>

        <div className="absolute w-[162.52px] h-[98.25px] top-[394.13px] left-[214.24px] bg-[#FFFFFF] border border-[1.5px] border-[#E4E4E7] rounded-[12px]"></div>
        <div className="absolute w-[161.02px] h-[47.25px] top-[394.88px] left-[214.99px] bg-[#F0F0F3] rounded-tl-[12px] rounded-tr-[12px]"></div>
        <div className="absolute w-[4.5px] h-[4.5px] top-[415.5px] left-[226.99px] border border-[1.5px] border-[#9A9AA3] bg-[#9A9AA3] rounded-full"></div>
        <div className="absolute w-[4.5px] h-[4.5px] top-[415.5px] left-[235.99px] border border-[1.5px] border-[#9A9AA3] bg-[#9A9AA3] rounded-full"></div>
        <div className="absolute w-[4.5px] h-[4.5px] top-[415.5px] left-[244.99px] border border-[1.5px] border-[#9A9AA3] bg-[#9A9AA3] rounded-full"></div>
        <div className="absolute w-[31px] h-[20px] top-[405.07px] left-[256.99px]  font-inter font-bold text-[16.5px] leading-none text-[#27272A]">장점</div>
        <div className="absolute w-[11px] h-[20px] top-[405.07px] left-[353.65px]  font-inter font-bold text-[16.5px] leading-none text-[#9A9AA3]">×</div>
        <div className="absolute w-[161.02px] h-[0px] top-[441.38px] left-[214.99px] border border-[1.5px] border-[#EEEEF1]"></div>
        <div className="absolute w-[102.75px] h-[10.5px] top-[452.63px] left-[226.99px] bg-[#F0F0F3] rounded-[12px]"></div>
        <div className="absolute w-[123.3px] h-[10.5px] top-[470.63px] left-[226.99px] bg-[#F0F0F3] rounded-[12px]"></div>

        <div className="absolute w-[163.99px] h-[99.75px] top-[393.38px] left-[389.51px] bg-[#FFFFFF] border border-[1.5px] border-[#E4E4E7] rounded-[12px]"></div>
        <div className="absolute w-[160.99px] h-[47.25px] top-[394.88px] left-[391.01px] bg-[#F0F0F3] rounded-tl-[12px] rounded-tr-[12px]"></div>
        <div className="absolute w-[4.5px] h-[4.5px] top-[415.5px] left-[403.01px] border border-[1.5px] border-[#9A9AA3] bg-[#9A9AA3] rounded-full"></div>
        <div className="absolute w-[4.5px] h-[4.5px] top-[415.5px] left-[412.01px] border border-[1.5px] border-[#9A9AA3] bg-[#9A9AA3] rounded-full"></div>
        <div className="absolute w-[4.5px] h-[4.5px] top-[415.5px] left-[421.01px] border border-[1.5px] border-[#9A9AA3] bg-[#9A9AA3] rounded-full"></div>
        <div className="absolute w-[31px] h-[20px] top-[405.07px] left-[433.01px]  font-inter font-bold text-[16.5px] leading-none text-[#27272A]">단점</div>
        <div className="absolute w-[11px] h-[20px] top-[405.07px] left-[529.64px]  font-inter font-bold text-[16.5px] leading-none text-[#9A9AA3]">×</div>
        <div className="absolute w-[160.99px] h-[0px] top-[441.38px] left-[391.01px] border border-[1.5px] border-[#EEEEF1]"></div>
        <div className="absolute w-[89.04px] h-[10.5px] top-[452.63px] left-[403.01px] bg-[#F0F0F3] rounded-[12px]"></div>
        <div className="absolute w-[109.59px] h-[10.5px] top-[470.63px] left-[403.01px] bg-[#F0F0F3] rounded-[12px]"></div>

          <div className="absolute w-[55.5px] h-[98.25px] top-[394.13px] left-[566.25px]">
            <svg
              className="top-0 left-0 w-full h-full pointer-events-none"
              viewBox="0 0 55.5 98.25"
              preserveAspectRatio="none"
            >
              <rect
                x="0.75"
                y="0.75"
                width="54"
                height="96.75"
                rx="12"
                fill="none"
                stroke="#E4E4E7"
                strokeWidth="1.5"
                strokeDasharray="9 6"
              />
            </svg></div>

          <div className="absolute w-[26px] h-[31px] top-[424.28px] left-[582.05px] font-inter font-normal text-[25.5px] leading-none text-[#9A9AA3] flex items-center justify-center">
            ＋
          </div>
        
        <div className="absolute whitespace-nowrap w-[52px] h-[21px] top-[508.05px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
          행 기준<span className="whitespace-nowrap w-[10px] h-[21px] top-[508.05px] left-[95.2px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]"> *</span>
        </div>

        <div className="absolute w-[583.5px] h-[55.5px] top-[543.75px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] flex items-center justify-between "></div>
        <div className="absolute w-[35px] h-[23px] top-[557.06px] left-[55.5px] font-inter font-normal text-[18.75px] leading-none text-[#27272A]">
            대상
        </div>
        <div className="absolute whitespace-nowrap w-[9px] h-[20px] top-[558.82px] left-[595.36px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">⌄</div>
          
        <div className="absolute whitespace-nowrap w-[52px] h-[21px] top-[614.93px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
          셀 분량
        </div>
        <div className="absolute w-[27px] h-[17px] top-[617.03px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">
          선택
        </div>

        <div className="absolute w-[583.5px] h-[48.38px] top-[650.63px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px]"></div>
        <div
          onClick={() => setPromptType("one")}
          className={`absolute w-[192px] h-[46.88px] top-[651.38px] left-[40.25px] flex items-center justify-center cursor-pointer rounded-tl-[12px] rounded-bl-[12px] ${
            promptType === "one" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
          }`}
        ></div>

        <div
          onClick={() => setPromptType("one")}
          className={`absolute whitespace-nowrap w-[36px] h-[21px] top-[661.8px] left-[117.49px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
            promptType === "one"
              ? "text-[#FFFFFF]"
              : "text-[#52525B]"
          }`}
        >
          한 줄
        </div>

        <div className="absolute z-10 w-[0px] h-[46.88px] top-[651.38px] left-[232.73px] border-[1.5px] border-[#E4E4E7]"></div>

        <div
          onClick={() => setPromptType("short")}
          className={`absolute w-[194.51px] h-[46.88px] top-[651.38px] left-[231.98px] flex items-center justify-center cursor-pointer ${
            promptType === "practical" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
          }`}
        ></div>

        <div
          onClick={() => setPromptType("short")}
          className={`absolute w-[32px] h-[21px] top-[661.8px] left-[313.99px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
            promptType === "practical"
              ? "text-[#FFFFFF]"
              : "text-[#52525B]"
          }`}
        >
          짧게
        </div>
        <div className="absolute z-10 w-[0px] h-[46.88px] top-[651.38px] left-[427.24px] border-[1.5px] border-[#E4E4E7]"></div>

        <div
          onClick={() => setPromptType("detail")}
          className={`absolute w-[194.51px] h-[46.88px] top-[651.38px] left-[430.98px] flex items-center justify-center rounded-tr-[12px] rounded-br-[12px]  cursor-pointer ${
            promptType === "detail" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
          }`}
        ></div>

        <div
          onClick={() => setPromptType("detail")}
          className={`absolute w-[48px] h-[21px] top-[661.8px] left-[500.5px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
            promptType === "detail"
              ? "text-[#FFFFFF]"
              : "text-[#52525B]"
          }`}
        >
          자세히
        </div>

        {/* 빈 값 · 정렬 */}
        <div className="absolute whitespace-nowrap w-[81px] h-[21px] top-[714.68px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
          빈 값 · 정렬
        </div>
        <div className="absolute w-[27px] h-[17px] top-[716.78px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">
          선택
        </div>

        <div className="absolute w-[286.5px] h-[52.5px] top-[750.38px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] "></div>
        <div className="absolute whitespace-nowrap w-[139px] h-[23px] top-[763.69px] left-[55.5px] font-inter font-normal text-[18.75px] leading-none text-[#27272A]">
            빈 셀: "미정" 표시
        </div>
        <div className="absolute w-[9px] h-[20px] top-[765.45px] left-[296.86px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="absolute w-[285px] h-[55.5px] top-[750.38px] left-[336.75px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] "></div>
        <div className="absolute w-[154px] h-[23px] top-[763.69px] left-[354px] font-inter font-normal text-[18.75px] leading-none text-[#27272A]">
            정렬: 대상 오름차순
        </div>
        <div className="absolute w-[9px] h-[20px] top-[765.45px] left-[595.36px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="w-[657px] h-[85.5px] top-[841.13px] left-[1.5px] bg-[#FFFFFF]">
          <hr className="absolute w-[657px] h-[0px] top-[841.88px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
          <div className=" absolute whitespace-nowrap w-[160px] h-[20px] top-[871.95px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">열 3개 · 행 기준 지정됨</div>
          <div
          onClick={() => setSave(!save)}
          className={`absolute w-[69.91px] h-[46.5px] top-[861.38px] left-[566.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
            save
              ? "bg-[#6366F1] border-[#6366F1]"
              : "bg-[#FFFFFF] border-[#E4E4E7]"
          }`}
          ></div>

          <div
            onClick={() => setSave(!save)}
            className={`absolute whitespace-nowrap w-[35px] h-[23px] top-[871.5px] left-[584.29px] font-inter font-bold text-[18.75px] leading-none flex items-center justify-center ${
              save
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