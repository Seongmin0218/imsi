import {useState} from "react";
export default function Context() {
  const [sectionType, setSectionType] = useState("core");
  const [role, setRole] = useState("planner");
  const [promptType, setPromptType] = useState("practical");
  const [save, setSave] = useState(true);
  const [checked1, setChecked1]=useState("");
  const [checked2, setChecked2]=useState("");
  const [checked3, setChecked3]=useState("");
  const [checked4, setChecked4]=useState("");
  const [checked5, setChecked5]=useState("");
  return (
  <div className="relative w-[600px] h-[1827.83px] bg-[#FFFFFF]">
    <div className="absolute w-[598.5px] h-[1826.33px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7] bg-[#FFFFFF]">
      {/* 소개 */}
      <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#2F8190] flex items-center justify-center rounded-[12px]">
        <div className="w-[14px] h-[25px] top-[35.92px] left-[40.01px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF]">
          2
        </div>
      </div>

      <div className="absolute whitespace-nowrap w-[130px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-SplineSansMono leading-none text-[#27272A] ">
        컨텍스트 노드
      </div>

      <div className="absolute w-[162px] h-[18px] top-[57.75px] left-[84px] font-normal text-[15px] leading-none text-[#9A9AA3]">
        CONTEXT · 7 blocks
      </div>

      <div className="absolute w-[97.72px] h-[30px] top-[36.38px] left-[415.57px] border border-[1.5px] border-dashed border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
        <div className="w-[74px] h-[18px] top-[40.13px] left-[428.32px] font-bold font-inter text-[15px] leading-none text-[#52525B]">
          CONTEXT
        </div>
      </div>

      <div className="absolute w-[51.45px] h-[30px] top-[36.38px] left-[523.8px] border border-[1.5px] border-[#CFE3D3] bg-[#CFE3D3] flex items-center justify-center rounded-[12px]">
        <div className="w-[28px] h-[18px] top-[40.13px] left-[536.55px] font-bold text-[15px] font-inter leading-none text-[#2F7D52]">
          완료
        </div>
      </div>

      <div className="absolute whitespace-nowrap w-[558px] h-[21px] top-[93.67px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
        AI가 참고할 자료·역할·배경을 지정합니다. 이전 단계(입력)의 결과를 연결할 수
      </div>

      <div className="absolute whitespace-nowrap w-[69px] h-[21px] top-[119.55px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
        있습니다.
      </div>

      <div className="absolute w-[78.77px] h-[30px] top-[159.75px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
        <div className="whitespace-nowrap w-[56px] h-[18px] top-[163.5px] left-[37.5px] font-inter font-bold leading-none text-[#52525B]">
          필수 2/2
        </div>
      </div>

      <div className="absolute w-[61.92px] h-[30px] top-[159.75px] left-[114.02px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
        <div className="whitespace-nowrap w-[39px] h-[18px] top-[163.5px] left-[126.77px] font-inter font-bold leading-none text-[#52525B]">
          연결 1
        </div>
      </div>

      <div className="absolute w-[64.29px] h-[30px] top-[159.75px] left-[186.45px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
        <div className="whitespace-nowrap w-[41px] h-[18px] top-[163.5px] left-[199.2px] font-inter font-bold leading-none text-[#52525B]">
          선택 5
        </div>
      </div>

      <hr className=" absolute w-[597px] h-0 top-[212.25px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

      {/* 요청 정리 수준 */}
      <div className="absolute w-[561px] h-[543.38px] top-[835.97px] left-[19.5px] bg-[#FFFFFF]"></div>
      
        <div className="absolute w-[22.5px] h-[22.5px] top-[244.5px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

        <div className="absolute w-[182px] h-[23px] top-[242.63px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          프로젝트 문서 불러오기
        </div>

        <div className="absolute w-[25px] h-[16px] top-[246.3px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
        </div>

        <div className="absolute w-[10px] h-[22px] top-[243.9px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
        </div>

        <div className="absolute whitespace-nowrap w-[64px] h-[21px] top-[280.42px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            프로젝트
          <span className=" w-[10px] h-[21px] top-[280.42px] left-[106.15px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        </div>
        
        <div className="absolute w-[523.5px] h-[55.5px] top-[316.13px] left-[38.25px] border-[#E4E4E7] border border-[1.5px] rounded-[12px] flex items-center justify-center"></div>
        <div className="absolute w-[189px] h-[23px] top-[329.44px] left-[55.5px] font-inter font-normal text-[18.75px] leading-none text-[#27272A] ">제품 리뷰 분석 프로젝트</div>
        <div className="absolute  w-[9px] h-[20px] top-[331.2px] left-[535.36px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3] ">⌄</div>

        {/* 참고 문서 */}
        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[387.3px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
          참고 문서
          <span className=" w-[10px] h-[21px] top-[387.3px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span></div>
        <div className="absolute w-[523.5px] h-[84.66px] top-[423px] left-[38.25px] border border-[1.5px] border-[#6366F1] rounded-[12px] flex items-center justify-center"></div>
        <div className="absolute w-[22.5px] h-[22.5px] top-[441px] left-[56.25px] bg-[#6366F1] rounded-[6px]"></div>
        <div className="absolute w-[198px] h-[23px] top-[438.38px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">2024 사용자 리서치.pdf</div>
        <div className="absolute w-[73px] h-[19px] top-[468.6px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">PDF · 32p</div>

        <div className="absolute w-[523.5px] h-[84.66px] top-[519.66px] left-[38.25px] border border-[1.5px] border-[#6366F1] rounded-[12px] flex items-center justify-center"></div>
        <div className="absolute w-[22.5px] h-[22.5px] top-[537.66px] left-[56.25px] bg-[#6366F1] rounded-[6px]"></div>
        <div className="absolute w-[151px] h-[23px] top-[535.03px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">경쟁사 비교표.xlsx</div>
        <div className="absolute w-[117px] h-[19px] top-[565.26px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">XLSX · 3 sheets</div>

        <div className="absolute w-[523.5px] h-[84.66px] top-[616.31px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] flex items-center justify-center"></div>
        <div className="absolute w-[22.5px] h-[22.5px] top-[634.31px] left-[56.25px] border border-[1.5px] border-[#E4E4E7] rounded-[6px]"></div>
        <div className="absolute w-[159px] h-[23px] top-[631.69px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">제품 요구사항.docx</div>
        <div className="absolute w-[85px] h-[19px] top-[661.91px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">DOCX · 18p</div>

        <div className="absolute whitespace-nowrap flex w-[68px] h-[21px] top-[716.64px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
          사용 범위 <span className=" w-[10px] h-[21px] top-[716.64px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">*</span>
        </div>

        <div className="absolute w-[523.5px] h-[48.38px] top-[752.34px] left-[38.25px] border border-[#E4E4E7] rounded-[12px] border-[1.5px]"></div>

          {/* 전체 */}
          <div
            onClick={() => setSectionType("all")}
            className={`absolute w-[174.52px] h-[46.88px] top-[753.09px] left-[38.25px] flex items-center justify-center cursor-pointer rounded-tl-[12px] rounded-bl-[12px] ${
              sectionType === "all" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("all")}
            className={`absolute w-[32px] h-[21px] top-[763.52px] left-[109.5px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "all"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            전체
          </div>

          <div className="absolute  z-10 w-[0px] h-[46.88px] top-[753.09px] left-[212.74px] border-[1.5px] border-[#E4E4E7]"></div>

          {/* 핵심 */}
          <div
            onClick={() => setSectionType("core")}
            className={`absolute w-[174.52px] h-[46.88px] top-[753.09px] left-[211.99px] flex items-center justify-center cursor-pointer ${
              sectionType === "core" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("core")}
            className={`absolute w-[32px] h-[21px] top-[763.52px] left-[283.99px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "core"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            핵심
          </div>

          <div className="absolute z-10 w-[0px] h-[46.88px] top-[753.09px] left-[387.26px] border-[1.5px] border-[#E4E4E7]"></div>

          {/* 특정 섹션 */}
          <div
            onClick={() => setSectionType("section")}
            className={`absolute w-[174.49px] h-[46.88px] top-[753.09px] left-[387.26px] flex items-center justify-center cursor-pointer rounded-tr-[12px] rounded-br-[12px] ${
              sectionType === "section" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("section")}
            className={`absolute w-[68px] h-[21px] top-[763.52px] left-[440.49px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "section"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            특정 섹션
          </div>
       
      
      
    

            {/* 요청 정리 수준 */}
      <div className="w-[561px] h-[543.38px] top-[835.97px] left-[19.5px] bg-[#FFFFFF]">
        <div className="absolute w-[22.5px] h-[22.5px] top-[850.97px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

        <div className="absolute w-[108px] h-[23px] top-[849.09px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          역할 부여하기
        </div>
        <div className="absolute w-[25px] h-[16px] top-[852.77px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
        </div>
        <div className="absolute whitespace-nowrap flex w-[32px] h-[21px] top-[886.89px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
          역할 <span className=" w-[10px] h-[21px] top-[886.89px] left-[76.34px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">*</span>
        </div>

        {/* 기획자 */}
        <div
          onClick={() => setRole("planner")}
          className={`absolute w-[121.88px] h-[91.69px] top-[922.59px] left-[38.25px] border border-[1.5px] rounded-[12px] ${
            role === "planner" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[936.84px] left-[81.19px] flex items-center justify-center ${
            role === "planner" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`absolute w-[21px] h-[21px] top-[2.55px] left-[7.49px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              role === "planner" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            🧭
          </div>
        </div>
        <div className="absolute w-[44px] h-[19px] top-[979.07px] left-[77.18px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          기획자
        </div>

        {/* 개발자 */}
        <div
          onClick={() => setRole("developer")}
          className={`absolute w-[121.88px] h-[91.69px] top-[922.59px] left-[172.13px] border border-[1.5px] rounded-[12px] ${
            role === "developer" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[936.84px] left-[215.06px] flex items-center justify-center ${
            role === "developer" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`absolute w-[21px] h-[21px] top-[2.55px] left-[7.49px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              role === "developer" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            💻
          </div>
        </div>
        <div className="absolute w-[44px] h-[19px] top-[979.07px] left-[211.05px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          개발자
        </div>

        {/* 디자이너 */}
        <div
          onClick={() => setRole("designer")}
          className={`absolute w-[121.88px] h-[91.69px] top-[922.59px] left-[306px] border border-[1.5px] rounded-[12px] ${
            role === "designer" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[936.84px] left-[348.94px] flex items-center justify-center ${
            role === "designer" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`absolute w-[21px] h-[21px] top-[2.55px] left-[7.49px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              role === "designer" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            🎨
          </div>
        </div>
        <div className="absolute w-[58px] h-[19px] top-[979.07px] left-[337.94px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          디자이너
        </div>

        {/* 튜터 */}
        <div
          onClick={() => setRole("tutor")}
          className={`absolute w-[121.88px] h-[91.69px] top-[922.59px] left-[439.88px] border border-[1.5px] rounded-[12px] ${
            role === "tutor" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[936.84px] left-[482.81px] flex items-center justify-center ${
            role === "tutor" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`absolute w-[21px] h-[21px] top-[2.55px] left-[7.49px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              role === "tutor" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            📚
          </div>
        </div>
        <div className="absolute w-[29px] h-[19px] top-[979.07px] left-[486.31px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          튜터
        </div>

        {/* 분석가 */}
        <div
          onClick={() => setRole("analyst")}
          className={`absolute w-[121.88px] h-[91.69px] top-[1026.28px] left-[38.25px] border border-[1.5px] rounded-[12px] ${
            role === "analyst" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[1040.53px] left-[81.19px] flex items-center justify-center ${
            role === "analyst" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`absolute w-[21px] h-[21px] top-[2.55px] left-[7.49px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              role === "analyst" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            📊
          </div>
        </div>
        <div className="absolute w-[44px] h-[19px] top-[1082.76px] left-[77.18px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          분석가
        </div>

        {/* 작성자 */}
        <div
          onClick={() => setRole("writer")}
          className={`absolute w-[121.88px] h-[91.69px] top-[1026.28px] left-[172.13px] border border-[1.5px] rounded-[12px] ${
            role === "writer" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[1040.53px] left-[215.06px] flex items-center justify-center ${
            role === "writer" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`absolute w-[21px] h-[21px] top-[2.55px] left-[7.49px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              role === "writer" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            ✍️
          </div>
        </div>
        <div className="absolute w-[44px] h-[19px] top-[1082.76px] left-[211.05px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          작성자
        </div>

        {/* 리뷰어 */}
        <div
          onClick={() => setRole("reviewer")}
          className={`absolute w-[121.88px] h-[91.69px] top-[1026.28px] left-[306px] border border-[1.5px] rounded-[12px] ${
            role === "reviewer" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[1040.53px] left-[348.94px] flex items-center justify-center ${
            role === "reviewer" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`absolute w-[21px] h-[21px] top-[2.55px] left-[7.49px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              role === "reviewer" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            🔎
          </div>
        </div>
        <div className="absolute w-[44px] h-[19px] top-[1082.76px] left-[344.93px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          리뷰어
        </div>

        {/* 직접 */}
        <div
          onClick={() => setRole("custom")}
          className={`absolute w-[121.88px] h-[93.18px] top-[1025.53px] left-[439.13px] border border-[1.5px] rounded-[12px] ${
            role === "custom" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[1040.53px] left-[482.81px] flex items-center justify-center ${
            role === "custom" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`absolute w-[21px] h-[25px] top-[2.55px] left-[7.5px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              role === "custom" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            ＋
          </div>
        </div>
        <div className="absolute w-[29px] h-[19px] top-[1082.76px] left-[486.31px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          직접
        </div>
        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[1133.64px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
          역할 관점</div>
        <div className="absolute w-[27px] h-[17px] top-[1135.74px] left-[537.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

        <div className="absolute w-[112px] h-[40.5px] top-[1169.34px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>
        <div
          onClick={() => setChecked1("checked1")}
          className={`absolute w-[18px] h-[18px] top-[1180.59px] left-[56.25px] rounded-[5px] flex items-center justify-center cursor-pointer ${
             checked1==="checked1"
              ? "bg-[#6366F1]"
              : "border border-[1.5px] border-[#52525B]"
          }`}
        >
          {checked1==="checked1" && (
            <div className="absolute w-[11px] h-[15px] top-[1.35px] left-[3.87px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
              ✓
            </div>
          )}
        </div>
        <div
          onClick={() => setChecked1("checked1")}
          className={`absolute w-[48px] h-[21px] top-[1176.58px] left-[82.5px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
            checked1==="checked1"
              ? "text-[#6366F1]"
              : "text-[#52525B]"
          }`}
        >
          사용자
        </div>

        {/* 비즈니스 */}
        <div className="absolute w-[121.15px] h-[40.5px] top-[1169.34px] left-[154.99px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

        <div className="absolute w-[121.15px] h-[40.5px] top-[1169.34px] left-[154.99px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

        <div
          onClick={() => setChecked2("checked2")}
          className={`absolute w-[18px] h-[18px] top-[1180.59px] left-[172.99px] rounded-[5px] flex items-center justify-center cursor-pointer ${
            checked2==="checked2"
              ? "bg-[#6366F1]"
              : "border border-[1.5px] border-[#52525B]"
          }`}
        >
          {checked2==="checked2" && (
            <div className="absolute w-[11px] h-[15px] top-[1.35px] left-[3.87px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
              ✓
            </div>
          )}
        </div>

        <div
          onClick={() => setChecked2("checked2")}
          className={`absolute w-[64px] h-[21px] top-[1176.58px] left-[199.24px] font-inter font-bold text-[15.75px] leading-none flex items-center cursor-pointer ${
            checked2==="checked2" ? "text-[#6366F1]" : "text-[#52525B]"
          }`}
        >
          비즈니스
        </div>

        <div className="absolute w-[91.34px] h-[40.5px] top-[1169.34px] left-[286.64px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

        <div
          onClick={() => setChecked3("checked3")}
          className={`absolute w-[18px] h-[18px] top-[1180.59px] left-[304.64px] rounded-[5px] flex items-center justify-center cursor-pointer ${
            checked3==="checked3"
              ? "bg-[#6366F1]"
              : "border border-[1.5px] border-[#52525B]"
          }`}
        >
          {checked2==="checked3"&& (
            <div className="absolute w-[11px] h-[15px] top-[1.35px] left-[3.87px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
              ✓
            </div>
          )}
        </div>

        <div
          onClick={() => setChecked3("checked3")}
          className={`absolute w-[32px] h-[21px] top-[1176.58px] left-[330.89px] font-inter font-bold text-[15.75px] leading-none flex items-center cursor-pointer ${
            checked3==="checked3" ? "text-[#6366F1]" : "text-[#52525B]"
          }`}
        >
          기술
        </div>

        <div className="absolute w-[95px] h-[40.5px] top-[1169.34px] left-[388.48px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

        <div
          onClick={() => setChecked4("checked4")}
          className={`absolute w-[18px] h-[18px] top-[1180.59px] left-[406.48px] rounded-[5px] flex items-center justify-center cursor-pointer ${
            checked4==="checked4"
              ? "bg-[#6366F1]"
              : "border border-[1.5px] border-[#52525B]"
          }`}
        >
          {checked4==="checked4" && (
            <div className="absolute w-[11px] h-[15px] top-[1.35px] left-[3.87px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
              ✓
            </div>
          )}
        </div>

        <div
          onClick={() => setChecked4("checked4")}
          className={`absolute w-[32px] h-[21px] top-[1176.58px] left-[432.73px] font-inter font-bold text-[17.25px] leading-none flex items-center cursor-pointer ${
            checked4==="checked4" ? "text-[#6366F1]" : "text-[#52525B]"
          }`}
        >
          품질
        </div>

        <div className="absolute w-[91.34px] h-[40.5px] top-[1220.34px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

        <div
          onClick={() => setChecked5("checked5")}
          className={`absolute w-[18px] h-[18px] top-[1231.59px] left-[56.25px] rounded-[5px] flex items-center justify-center cursor-pointer ${
            checked5==="checked5"
              ? "bg-[#6366F1]"
              : "border border-[1.5px] border-[#52525B]"
          }`}
        >
          {checked5==="checked5" && (
            <div className="absolute w-[11px] h-[15px] top-[1.35px] left-[3.87px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
              ✓
            </div>
          )}
        </div>

        <div
          onClick={() => setChecked5("checked5")}
          className={`absolute w-[32px] h-[21px] top-[1227.58px] left-[82.5px] font-inter font-bold text-[17.25px] leading-none flex items-center cursor-pointer ${
            checked5==="checked5" ? "text-[#6366F1]" : "text-[#52525B]"
          }`}
        >
          학습
        </div>

        <div className="absolute whitespace-nowrap flex w-[48px] h-[21px] top-[1276.53px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
         전문성 </div>
         <div className="absolute w-[27px] h-[17px] top-[1278.62px] left-[537.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

        <div className="absolute w-[523.5px] h-[48.38px] top-[1312.22px] left-[38.25px] border border-[#E4E4E7] rounded-[12px] border-[1.5px]"></div>

        {/* 기본 */}
        <div
          onClick={() => setPromptType("basic")}
          className={`absolute w-[174.52px] h-[46.88px] top-[1312.97px] left-[38.25px] flex items-center justify-center cursor-pointer rounded-tl-[12px] rounded-bl-[12px] ${
            promptType === "basic" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
          }`}
        ></div>

        <div
          onClick={() => setPromptType("basic")}
          className={`absolute w-[32px] h-[21px] top-[1323.39px] left-[109.5px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
            promptType === "basic"
              ? "text-[#FFFFFF]"
              : "text-[#52525B]"
          }`}
        >
          기본
        </div>

        <div className="absolute z-10 w-[0px] h-[46.88px] top-[1312.97px] left-[212.74px] border-[1.5px] border-[#E4E4E7]"></div>

        {/* 실무 */}
        <div
          onClick={() => setPromptType("practical")}
          className={`absolute w-[174.52px] h-[46.88px] top-[1312.97px] left-[211.99px] flex items-center justify-center cursor-pointer ${
            promptType === "practical" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
          }`}
        ></div>

        <div
          onClick={() => setPromptType("practical")}
          className={`absolute w-[32px] h-[21px] top-[1323.39px] left-[283.99px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
            promptType === "practical"
              ? "text-[#FFFFFF]"
              : "text-[#52525B]"
          }`}
        >
          실무
        </div>

        <div className="absolute z-10 w-[0px] h-[46.88px] top-[1312.97px] left-[387.26px] border-[1.5px] border-[#E4E4E7]"></div>

        {/* 전문 */}
        <div
          onClick={() => setPromptType("expert")}
          className={`absolute w-[174.49px] h-[46.88px] top-[1312.97px] left-[387.26px] flex items-center justify-center cursor-pointer rounded-tr-[12px] rounded-br-[12px] ${
            promptType === "expert" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
          }`}
        ></div>

        <div
          onClick={() => setPromptType("expert")}
          className={`absolute w-[32px] h-[21px] top-[1323.39px] left-[458.5px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
            promptType === "expert"
              ? "text-[#FFFFFF]"
              : "text-[#52525B]"
          }`}
        >
          전문
        </div>
        
        <div className="absolute w-[561px] h-[51px] top-[1396.59px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
        <div className="absolute w-[21px] h-[21px] top-[1410.84px] left-[37.5px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
        <div className="absolute w-[143px] h-[23px] top-[1408.97px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          업로드 문서 읽기
        </div>
        <div className="absolute w-[101px] h-[19px] top-[1411.07px] left-[289.9px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          전체 · 표 ON
        </div>

        <div className="absolute w-[44.33px] h-[19.5px] top-[1412.34px] left-[489.66px] bg-[#F0F0F3] rounded-[6px]"></div>
        <div className=" absolute w-[25px] h-[16px] top-[1412.64px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
          선택
        </div>
        <div className="absolute w-[10px] h-[22px] top-[1408.74px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="absolute w-[561px] h-[52.5px] top-[1464.84px] left-[19.5px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
        <div className="absolute w-[22.5px] h-[22.5px] top-[1479.84px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>
        <div className="absolute w-[186px] h-[23px] top-[1477.97px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          직접 입력 내용 사용하기
        </div>

        <div className="absolute w-[125px] h-[19px] top-[1480.07px] left-[302.2px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          배경 · 원문 유지
        </div>

        <div className="absolute w-[25px] h-[16px] top-[1481.64px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
          필수
        </div>
        <div className="absolute w-[10px] h-[22px] top-[1477.74px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="absolute w-[559.5px] h-[51px] top-[1534.59px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
        <div className="absolute w-[21px] h-[21px] top-[1549.59px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
        <div className="absolute w-[130px] h-[23px] top-[1546.97px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          참고 범위 정하기
        </div>
        <div className="absolute w-[101px] h-[19px] top-[1549.07px] left-[288.33px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          특정 문서 2개
        </div>

        <div className="absolute w-[44.33px] h-[19.5px] top-[1550.34px] left-[489.66px] bg-[#F0F0F3] rounded-[6px]"></div>
        <div className=" absolute w-[25px] h-[16px] top-[1550.64px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
          선택
        </div>
        <div className="absolute w-[10px] h-[22px] top-[1546.74px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="absolute w-[559.5px] h-[51px] top-[1603.59px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
        <div className="absolute w-[21px] h-[21px] top-[1618.59px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
        <div className="absolute w-[147px] h-[23px] top-[1615.97px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          배경 설명 추가하기
        </div>
        <div className="absolute w-[125px] h-[19px] top-[1618.07px] left-[283.83px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          설계 단계 · 중요
        </div>

        <div className="absolute w-[44.33px] h-[19.5px] top-[1619.34px] left-[489.66px] bg-[#F0F0F3] rounded-[6px]"></div>
        <div className=" absolute w-[25px] h-[16px] top-[1619.64px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
          선택
        </div>
        <div className="absolute w-[10px] h-[22px] top-[1615.74px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="absolute w-[559.5px] h-[51px] top-[1672.59px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
        <div className="absolute w-[22.5px] h-[22.5px] top-[1686.84px] left-[37.5px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
        <div className="absolute w-[242px] h-[23px] top-[1684.97px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          참고하지 말아야 할 내용 정하기
        </div>
        <div className="absolute w-[106px] h-[19px] top-[1687.07px] left-[338.11px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          이전 버전 제외
        </div>

        <div className="absolute w-[44.33px] h-[19.5px] top-[1688.34px] left-[489.66px] bg-[#F0F0F3] rounded-[6px]"></div>
        <div className=" absolute w-[25px] h-[16px] top-[1688.64px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
          선택
        </div>
        <div className="absolute w-[10px] h-[22px] top-[1684.74px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>
      </div>
      <div className="w-[597px] h-[85.5px] top-[1740.84px] left-[1.5px] bg-[#FFFFFF]">
            <hr className="absolute w-[597px] h-[0px] top-[1741.59px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
            <div className=" absolute w-[215px] h-[20px] top-[1771.67px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">필수 옵션 모두 충족 · 저장 가능</div>
            <div
            onClick={() => setSave(!save)}
            className={`absolute w-[106.78px] h-[46.5px] top-[1761.09px] left-[469.97px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              save
                ? "bg-[#6366F1] border-[#6366F1]"
                : "bg-[#FFFFFF] border-[#E4E4E7]"
            }`}
          ></div>

          <div
            onClick={() => setSave(!save)}
            className={`absolute w-[74px] h-[23px] top-[1771.22px] left-[486.36px] font-inter font-bold text-[18.75px] leading-none flex items-center justify-center ${
              save
                ? "text-[#FFFFFF]"
                : "text-[#27272A]"
            }`}
          >
            설정 저장
          </div>
          </div>
          
    </div>
  </div>  
  );
}