import {useState} from "react";
export default function Default() {
  const [sectionType, setSectionType] = useState("core");
  const [documentType, setDocumentType] = useState("document1");
  const [promptType, setPromptType] = useState("basic");
  const [save, setSave] = useState(true);
  const [form, setForm] = useState("form1");
  const [title, setTitle] = useState("");
  return (
  <div className=" relative w-[897px] h-[1628px] bg-[#FFFFFF]">
    <div className="absolute w-[658.5px] h-[1626px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7] bg-[#FFFFFF]">
      {/* 소개 */}
      <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]">
        <div className="w-[21px] h-[21px] top-[35.93px] left-[32.06px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF]">
         📄
        </div>
      </div>

      <div className="absolute whitespace-nowrap w-[218px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-inter leading-none text-[#27272A] ">
        문서 초안으로 출력하기
      </div>

      <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-SplineSansMono font-normal text-[15px] leading-none text-[#9A9AA3]">
        OUT-004 · OUTPUT
      </div>

      
      <div className="absolute w-[62px] h-[29px] top-[40.13px] left-[500.51px] pt-[5px] pb-[5px] pr-[10px] pl-[10px] rounded-[8px] border border-[2px] border-[#6366F1] bg-[#6366F1] ">
        <div className=" w-[42px] h-[18px] top-[40.13px] left-[581.51px] font-normal font-bold text-[16px] tracking-[-0.03em] leading-[100%] text-[#FFFFFF]">CORE</div>
      </div>
      

      <div className="absolute whitespace-nowrap w-[619px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
        문서 종류와 제목을 정하고, 직접 목차를 선택하면 섹션 블록을 끌어 순서를 편집합니다.
      </div>

      <div className="absolute w-[64.41px] h-[30px] top-[133.88px] left-[24.75px]  border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
        <div className="whitespace-nowrap w-[42px] h-[18px] top-[137.63px] left-[37.5px] font-inter font-bold leading-none text-[#52525B] 15px">
          기획서
        </div>
      </div>

      <div className="absolute w-[85.05px] h-[30px] top-[133.88px] left-[99.66px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
        <div className=" whitespace-nowrap w-[64px] h-[18px] top-[137.63px] left-[112.41px] text-[15px] font-inter font-bold leading-none text-[#52525B]  15px">
          목차: 직접
        </div>
      </div>

      <div className="absolute w-[85.05px] h-[30px] top-[133.88px] left-[195.21px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
        <div className="whitespace-nowrap w-[64px] h-[18px] top-[137.63px] left-[207.96px] font-inter font-bold leading-none text-[#52525B] 15px">
          깊이: 기본
        </div>
      </div>

      <hr className=" absolute w-[657px] h-0 top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

      {/* 요청 정리 수준 */}
      <div className="absolute w-[621px] h-[1320.38px] top-[203.63px] left-[19.5px] bg-[#FFFFFF]"></div>
      
        <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

        <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[216.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          문서 초안
        </div>

        <div className="absolute w-[25px] h-[16px] top-[220.43px] left-[560.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
        </div>

        <div className="absolute w-[10px] h-[22px] top-[218.03px] left-[612px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
        </div>

        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[254.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            문서 종류
          <span className=" w-[10px] h-[21px] top-[254.55px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        </div>

        <div
          onClick={() => setDocumentType("document2")}
          className={`absolute w-[186.49px] h-[91.69px] top-[290.25px] left-[38.25px] border border-[1.5px] rounded-[12px] ${
            documentType === "document2" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[304.5px] left-[113.48px] flex items-center justify-center rounded-[8px] ${
            documentType === "document2" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`w-[21px] h-[21px] top-[307.05px] left-[120.97px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              documentType === "document2" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            📝
          </div>
        </div>
        <div className="absolute w-[29px] h-[19px] top-[346.72px] left-[116.98px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          기획
        </div>

        {/* 개발자 */}
        <div
          onClick={() => setDocumentType("document1")}
          className={`absolute w-[186.49px] h-[91.69px] top-[290.25px] left-[236.74px] border border-[1.5px] rounded-[12px] ${
             documentType=== "document1" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[304.5px] left-[311.98px] flex items-center justify-center  rounded-[8px] ${
            documentType === "document1" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`w-[21px] h-[21px] top-[307.05px] left-[319.48px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              documentType === "document1" ? "text-[#27272A]" : "text-[#27272A]"
            }`}
          >
            ⚙
          </div>
        </div>
        <div className="absolute w-[58px] h-[19px] top-[346.72px] left-[300.98px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          기능명세
        </div>

        <div
          onClick={() => setDocumentType("document3")}
          className={`absolute w-[186.52px] h-[91.69px] top-[290.25px] left-[435.23px] border border-[1.5px] rounded-[12px] ${
            documentType === "document3" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[304.5px] left-[510.49px] flex items-center justify-center  rounded-[8px] ${
            documentType === "document3" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={` w-[21px] h-[21px] top-[307.05px] left-[517.98px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              documentType === "document3" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            📋
          </div>
        </div>
        <div className="absolute w-[29px] h-[19px] top-[346.72px] left-[513.99px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          정책
        </div>

        <div
          onClick={() => setDocumentType("document4")}
          className={`absolute w-[186.49px] h-[91.69px] top-[393.94px] left-[38.25px] border border-[1.5px] rounded-[12px] ${
            documentType === "document4" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[408.19px] left-[113.48px] flex items-center justify-center rounded-[8px] ${
            documentType === "document4" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`w-[21px] h-[21px] top-[410.74px] left-[120.97px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              documentType === "document4" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            📊
          </div>
        </div>
        <div className="absolute w-[29px] h-[19px] top-[450.41px] left-[116.98px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          보고
        </div>

        <div
          onClick={() => setDocumentType("document5")}
          className={`absolute w-[186.49px] h-[91.69px] top-[393.94px] left-[236.74px] border border-[1.5px] rounded-[12px] ${
            documentType === "document5" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[408.19px] left-[311.98px] flex items-center justify-center rounded-[8px] ${
            documentType === "document5" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={` w-[21px] h-[21px] top-[410.74px] left-[319.48px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              documentType === "document5" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            🗒
          </div>
        </div>
        <div className="absolute w-[44px] h-[19px] top-[450.41px] left-[307.99px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          회의록
        </div>

        <div
          onClick={() => setDocumentType("document6")}
          className={`absolute w-[186.52px] h-[91.69px] top-[393.94px] left-[435.23px] border border-[1.5px] rounded-[12px] ${
            documentType === "document6" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[408.19px] left-[510.49px] flex items-center justify-center rounded-[8px] ${
            documentType === "document6" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={` w-[21px] h-[21px] top-[410.74px] left-[517.98px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              documentType === "document6" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            📮
          </div>
        </div>
        <div className="absolute w-[29px] h-[19px] top-[450.41px] left-[513.99px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          제안
        </div>

        
        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[501.3px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            문서 제목
          <span className=" w-[10px] h-[21px] top-[501.3px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="신규 기능 기획서"
          className="absolute w-[583.5px] h-[52.5px] top-[537px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] px-[17.25px] font-inter font-normal text-[18.75px] leading-none text-[#27272A] placeholder:text-[#A1A1AA] focus:outline-none"
        />

        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[605.18px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            목차 방식
          <span className=" w-[10px] h-[21px] top-[605.18px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        </div>
        <div className="absolute w-[583.5px] h-[48.38px] top-[640.88px] left-[38.25px] border border-[#E4E4E7] rounded-[12px] border-[1.5px]"></div>

          <div
            onClick={() => setSectionType("all")}
            className={`absolute w-[195.52px] h-[46.88px] top-[642.05px] left-[40px] flex items-center justify-center cursor-pointer rounded-tl-[12px] rounded-bl-[12px] ${
              sectionType === "all" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("all")}
            className={`absolute w-[32px] h-[21px] top-[652.05px] left-[119.48px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "all"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            자동
          </div>

          <div className="absolute  z-10 w-[0px] h-[46.88px] top-[641.63px] left-[232.73px] border-[1.5px] border-[#E4E4E7]"></div>

          <div
            onClick={() => setSectionType("core")}
            className={`absolute w-[190.52px] h-[46.88px] top-[642.09px] left-[235.99px] flex items-center justify-center cursor-pointer ${
              sectionType === "core" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("core")}
            className={`absolute w-[48px] h-[21px] top-[652.05px] left-[305.99px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "core"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            템플릿
          </div>

          <div className="absolute z-10 w-[0px] h-[46.88px] top-[641.63px] left-[427.24px] border-[1.5px] border-[#E4E4E7]"></div>

          <div
            onClick={() => setSectionType("section")}
            className={`absolute w-[194.51px] h-[46.88px] top-[641.63px] left-[426.49px] flex items-center justify-center cursor-pointer rounded-tr-[12px] rounded-br-[12px] ${
              sectionType === "section" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("section")}
            className={`absolute w-[32px] h-[21px] top-[652.05px] left-[508.5px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "section"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            직접
          </div>

        {/* 목차 블록 */}
        <div className="absolute top-[705.68px] left-[37.5px] flex items-center gap-2 whitespace-nowrap">
        <div className="font-bold text-[17.25px] text-[#52525B]">
          목차 블록
        </div>

        <span className="font-bold text-[17.25px] text-[#9A9AA3]">
          · 드래그 정렬
        </span>

        <div className="w-[57.3px] h-[25.88px] rounded-[8px] border border-[1.5px] border-[#ECDCBF] flex items-center justify-center">
          <div className="font-bold text-[14.25px] text-[#8A6A3C]">
            조건부
          </div>
        </div>
      </div>

        <div className="absolute w-[583.5px] h-[90.38px] top-[742.13px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] flex items-center justify-center"></div>
        <div className="absolute w-[28.13px] h-[24.38px] top-[758.25px] left-[88.5px] bg-[#3C7A52] rounded-[6px]"></div>
        <div className="absolute w-[7px] h-[17px] top-[759.53px] left-[99px] font-inter font-bold text-[14.25px] leading-none text-[#FFFFFF]">1</div>
        <div className="absolute whitespace-nowrap w-[95px] h-[23px] top-[756px] left-[128.63px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">배경 및 목표</div>
        <div className="absolute whitespace-nowrap w-[145px] h-[20px] top-[793.2px] left-[88.5px] font-inter font-normal text-[16.5px] leading-none text-[#52525B]">문제 정의 · 기대 효과</div>

        <div className="absolute w-[585.01px] h-[100.57px] top-[849.9px] left-[37.49px] border border-[1.5px] border-[#3C7A52] rounded-[12px] flex items-center justify-center"></div>
        <div className="absolute w-[30.54px] h-[24.9px] top-[874.82px] left-[88.5px] bg-[#3C7A52] rounded-[6px]"></div>
        <div className="absolute w-[9px] h-[17px] top-[876.35px] left-[98.58px] font-inter font-bold text-[14.25px] leading-none text-[#FFFFFF]">2</div>
        <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[871.75px] left-[130.13px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">주요 기능</div>
        <div className="absolute whitespace-nowrap w-[140px] h-[20px] top-[909.15px] left-[88.5px] font-inter font-normal text-[16.5px] leading-none text-[#52525B]">기능 목록 · 우선순위</div>

        <div className="absolute w-[585px] h-[0px] top-[965.63px] left-[37.5px] border border-[1.5px] border-[#3C7A52] border border-[#6366F1] bg-[#6366F1] border-[3px] flex items-center justify-center"></div>

        <div className="absolute w-[583.5px] h-[90.38px] top-[985.88px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] flex items-center justify-center"></div>
        <div className="absolute w-[30.52px] h-[24.38px] top-[1002px] left-[88.5px] bg-[#3C7A52] rounded-[6px]"></div>
        <div className="absolute w-[10px] h-[17px] top-[1003.28px] left-[99px] font-inter font-bold text-[14.25px] leading-none text-[#FFFFFF]">3</div>
        <div className="absolute whitespace-nowrap w-[113px] h-[23px] top-[999.75px] left-[131.02px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">일정 및 리스크</div>
        <div className="absolute whitespace-nowrap w-[140px] h-[20px] top-[1036.95px] left-[88.5px] font-inter font-normal text-[16.5px] leading-none text-[#52525B]">마일스톤 · 위험 요소</div>

        <div className="absolute w-[583.5px] h-[52.5px] top-[1098.75px] left-[38.25px] flex items-center justify-center">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 583.5 52.5"
            preserveAspectRatio="none"
          >
            <rect
              x="0.75"
              y="0.75"
              width="582"
              height="51"
              rx="12"
              fill="none"
              stroke="#E4E4E7"
              strokeWidth="1.5"
              strokeDasharray="9 6"
              
            />
          </svg>
          <div className=" whitespace-nowrap  w-[89px] h-[21px] top-[1111.99px] left-[288px] font-inter font-bold text-[17.25px] leading-none text-[#9A9AA3]">＋ 섹션 추가</div>
        </div>
        
        <div className="absolute whitespace-nowrap flex w-[32px] h-[21px] top-[1166.93px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
         깊이 
          <span className=" w-[10px] h-[21px] top-[1166.93px] left-[76.34px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
         </div>

        <div className="absolute w-[583.5px] h-[48.38px] top-[1202.63px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px]"></div>
        <div
          onClick={() => setPromptType("type")}
          className={`absolute w-[192px] h-[46.88px] top-[1202.63px] left-[40.25px] flex items-center justify-center cursor-pointer rounded-tl-[12px] rounded-bl-[12px] ${
            promptType === "type" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
          }`}
        ></div>

        <div
          onClick={() => setPromptType("type")}
          className={`absolute w-[32px] h-[21px] top-[1213.8px] left-[119.48px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
            promptType === "type"
              ? "text-[#FFFFFF]"
              : "text-[#52525B]"
          }`}
        >
          개요
        </div>

        <div className="absolute z-10 w-[0px] h-[46.88px] top-[1203.38px] left-[232.73px] border-[1.5px] border-[#E4E4E7]"></div>

        <div
          onClick={() => setPromptType("basic")}
          className={`absolute w-[194.51px] h-[46.88px] top-[1203.38px] left-[231.98px] flex items-center justify-center cursor-pointer ${
            promptType === "basic" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
          }`}
        ></div>

        <div
          onClick={() => setPromptType("basic")}
          className={`absolute w-[32px] h-[21px] top-[1213.8px] left-[313.99px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
            promptType === "basic"
              ? "text-[#FFFFFF]"
              : "text-[#52525B]"
          }`}
        >
          기본
        </div>

        <div className="absolute z-10 w-[0px] h-[46.88px] top-[1203.38px] left-[427.24px] border-[1.5px] border-[#E4E4E7]"></div>

        {/* 전문 */}
        <div
          onClick={() => setPromptType("detail")}
          className={`absolute w-[191.49px] h-[46.88px] top-[1203px] left-[428.26px] flex items-center justify-center cursor-pointer rounded-tr-[12px] rounded-br-[12px] ${
            promptType === "detail" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
          }`}
        ></div>

        <div
          onClick={() => setPromptType("detail")}
          className={`absolute w-[32px] h-[21px] top-[1213.8px] left-[508.5px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
            promptType === "detail"
              ? "text-[#FFFFFF]"
              : "text-[#52525B]"
          }`}
        >
          상세
        </div>

        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[1266.68px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            미정 처리 </div>
            <span className="absolute w-[27px] h-[17px] top-[1268.78px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</span>

        <div onClick={()=>{setForm("form1")}}
        className={`absolute w-[583.5px] h-[59.63px] top-[1302.38px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form ==="form1" ? "border-[#6366F1]" : "border-[#E4E4E7]" }`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[1320.38px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
          form==="form1"? "bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[108px] h-[23px] top-[1317.75px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">미정으로 표시</div>

        <div onClick={()=>{setForm("form2")}}
        className={`absolute w-[583.5px] h-[59.63px] top-[1374px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form==="form2"?"border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[1392px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
        form ==="form2" ? "bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[108px] h-[23px] top-[1389.38px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">가정으로 채움</div>

        <div onClick={()=>{setForm("form3")}}
        className={`absolute w-[583.5px] h-[59.63px] top-[1445.63px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form==="form3"?"border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[1463.63px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
        form ==="form3" ? "bg-[#6366F1]  border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[108px] h-[23px] top-[1461px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">질문으로 남김</div>
      </div>
      <div className="w-[657px] h-[85.5px] top-[1540.5px] left-[1.5px] bg-[#FFFFFF]">
          <hr className="absolute w-[657px] h-[0px] top-[1541.25px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
          <div className=" absolute whitespace-nowrap w-[200px] h-[20px] top-[1571.32px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">기획서 · 섹션 3개 · 직접 목차</div>
          <div
          onClick={() => setSave(!save)}
          className={`absolute w-[106.78px] h-[46.5px] top-[1560.75px] left-[529.97px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
            save
              ? "bg-[#6366F1] border-[#6366F1]"
              : "bg-[#FFFFFF] border-[#E4E4E7]"
          }`}
          ></div>

          <div
            onClick={() => setSave(!save)}
            className={`absolute whitespace-nowrap w-[74px] h-[23px] top-[1570.88px] left-[546.36px] font-inter font-bold text-[18.75px] leading-none flex items-center justify-center ${
              save
                ? "text-[#FFFFFF]"
                : "text-[#27272A]"
            }`}
          >
            초안 생성
          </div>
          </div>
          
    </div>
  );
}