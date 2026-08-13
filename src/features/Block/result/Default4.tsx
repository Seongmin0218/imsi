import {useState} from "react";
export default function Default4() {
  const [sectionType, setSectionType] = useState("all");
  const [flow, setFlow] = useState("flow1");
  const [save, setSave] = useState(true);
  const [form, setForm] = useState("form1");
  const [title, setTitle] = useState("");
  const [controll, setControll] = useState(false);
  return (
  <div className=" relative w-[660px] h-[1419.66px] bg-[#FFFFFF]">
    <div className="absolute w-[658.5px] h-[1418.16px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7] bg-[#FFFFFF]">
      {/* 소개 */}
      <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]">
        <div className="w-[21px] h-[21px] top-[35.93px] left-[32.06px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF]">
         💾
        </div>
      </div>

      <div className="absolute whitespace-nowrap w-[197px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-inter leading-none text-[#27272A] ">
        내 저장소에 저장하기
      </div>

      <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-SplineSansMono font-normal text-[15px] leading-none text-[#9A9AA3]">
        OUT-009 · OUTPUT
      </div>

      
      <div className="absolute w-[62px] h-[29px] top-[40.13px] left-[500.51px] pt-[5px] pb-[5px] pr-[10px] pl-[10px] rounded-[8px] border border-[2px] border-[#6366F1] bg-[#6366F1] ">
        <div className=" w-[42px] h-[18px] top-[40.13px] left-[581.51px] font-normal font-bold text-[16px] tracking-[-0.03em] leading-[100%] text-[#FFFFFF]">CORE</div>
      </div>
      

      <div className="absolute whitespace-nowrap w-[641px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
        저장할 대상과 위치를 고릅니다. 흐름은 MVP 기준 비공개로 저장되며, 이후 공개로 전환할
      </div>
      <div className="absolute whitespace-nowrap w-[89px] h-[21px] top-[119.55px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
        수 있습니다.
      </div>

      <div className="absolute w-[64.48px] h-[30px] top-[159.75px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[8px]">
        <div className="whitespace-nowrap w-[41px] h-[18px] top-[163.5px] left-[37.5px] font-inter font-bold leading-none text-[#6366F1] tracking-[-0.03em] leading-[100%]">
          대상 3
        </div>
      </div>

      <div className="absolute w-[101.48px] h-[30px] top-[159.75px] left-[99.73px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[8px]">
        <div className=" whitespace-nowrap w-[81px] h-[18px] top-[163.5px] left-[112.48px] text-[15px] font-inter font-bold leading-none text-[#52525B] tracking-[-0.03em] leading-[100%]">
          위치: 내 흐름
        </div>
      </div>

      <div className="absolute w-[64.41px] h-[30px] top-[159.75px] left-[211.71px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
        <div className="whitespace-nowrap w-[42px] h-[18px] top-[163.5px] left-[224.46px] font-inter font-bold leading-none text-[#52525B]">
          비공개
        </div>
      </div>

      <hr className=" absolute w-[657px] h-0 top-[212.25px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

      {/* 요청 정리 수준 */}
      <div className="absolute w-[621px] h-[1086.66px] top-[229.5px] left-[19.5px] bg-[#FFFFFF]"></div>
      
        <div className="absolute w-[22.5px] h-[22.5px] top-[244.5px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

        <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[242.63px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          저장 설정
        </div>

        <div className="absolute w-[25px] h-[16px] top-[246.3px] left-[560.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
        </div>

        <div className="absolute w-[10px] h-[22px] top-[243.9px] left-[612px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
        </div>

        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[280.43px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            저장 대상
          <span className=" w-[10px] h-[21px] top-[280.43px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        </div>
        <div onClick={()=>{setForm("form1")}}
        className={`absolute w-[583.5px] h-[84.66px] top-[316.13px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form ==="form1" ? "border-[#6366F1]" : "border-[#E4E4E7]" }`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[334.13px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
          form==="form1"? "bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[331.5px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">블록 흐름</div>
        <div className="absolute whitespace-nowrap w-[130px] h-[19px] top-[361.72px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">노드·옵션 구성 전체</div>

        <div onClick={()=>{setForm("form2")}}
        className={`absolute w-[583.5px] h-[84.66px] top-[412.78px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form==="form2"?"border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[430.78px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
        form ==="form2" ? "bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[428.16px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">예시 결과</div>
        <div className="absolute whitespace-nowrap w-[106px] h-[19px] top-[458.38px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">학습용 미리보기</div>

        <div onClick={()=>{setForm("form3")}}
        className={`absolute w-[583.5px] h-[84.66px] top-[509.44px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form==="form3"?"border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[526.69px] left-[55.5px] border border-[1.5px]  rounded-[10px] ${
        form ==="form3" ? "bg-[#6366F1]  border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[524.81px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">최종 결과</div>
        <div className="absolute whitespace-nowrap w-[77px] h-[19px] top-[555.04px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">실행 결과물</div>

        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[609.77px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            흐름 제목
          <span className=" w-[10px] h-[21px] top-[609.77px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제품 리뷰 요약기"
          className="absolute w-[583.5px] h-[52.5px] top-[645.47px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] px-[17.25px] font-inter font-normal text-[18.75px] leading-none text-[#27272A] placeholder:text-[#A1A1AA] focus:outline-none"
        />

        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[713.64px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            저장 위치
          <span className=" w-[10px] h-[21px] top-[713.64px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        </div>

        <div
          onClick={() => setFlow("flow1")}
          className={`absolute w-[186.49px] h-[91.69px] top-[749.34px] left-[38.25px] border border-[1.5px] rounded-[12px] ${
            flow === "flow1" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[763.59px] left-[113.48px] flex items-center justify-center rounded-[8px] ${
            flow === "flow1" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`w-[21px] h-[21px] top-[766.14px] left-[120.97px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              flow === "flow1" ? "text-[#FFFFFF]" : "text-[#27272A]"
            }`}
          >
            📁
          </div>
        </div>
        <div className="absolute w-[48px] h-[19px] top-[805.82px] left-[107.48px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          내 흐름
        </div>

        <div
          onClick={() => setFlow("setFlow")}
          className={`absolute w-[186.49px] h-[91.69px] top-[749.34px] left-[236.74px] border border-[1.5px] rounded-[12px] ${
            flow === "flow2" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>
        <div
          className={`absolute w-[36px] h-[36px] top-[763.59px] left-[311.98px] flex items-center justify-center  rounded-[8px] ${
            flow === "flow2" ? "bg-[#6366F1]" : "bg-[#F0F0F3]"
          }`}
        >
          <div
            className={`w-[21px] h-[21px] top-[766.14px] left-[319.46px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
              flow === "flow2" ? "text-[#27272A]" : "text-[#27272A]"
            }`}
          >
            🎓
          </div>
        </div>
        <div className="absolute whitespace-nowrap w-[91px] h-[19px] top-[805.82px] left-[284.49px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
          튜토리얼 진행
        </div>


        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[856.71px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            저장 시점
          <span className=" w-[10px] h-[21px] top-[856.71px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        </div>
        <div onClick={()=>{setForm("form4")}}
        className={`absolute w-[583.5px] h-[59.63px] top-[892.41px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form==="form4"?"border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[910.41px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
        form ==="form4" ? "bg-[#6366F1]  border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[907.78px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">수동 저장</div>

        <div onClick={()=>{setForm("form5")}}
        className={`absolute w-[583.5px] h-[59.63px] top-[964.03px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form==="form5"?"border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[982.03px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
        form ==="form5" ? "bg-[#6366F1]  border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[95px] h-[23px] top-[979.41px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">단계 완료 시</div>

        <div onClick={()=>{setForm("form6")}}
        className={`absolute w-[583.5px] h-[59.63px] top-[1035.66px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form==="form6"?"border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[1053.66px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
        form ==="form6" ? "bg-[#6366F1]  border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[57px] h-[23px] top-[1051.03px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">실행 후</div>
        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[1110.96px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">기존 항목</div>
        <div className="absolute whitespace-nowrap w-[27px] h-[17px] top-[1113.06px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

        <div className="absolute w-[583.5px] h-[48.38px] top-[1146.66px] left-[38.25px] border border-[#E4E4E7] rounded-[12px] border-[1.5px]"></div>

          <div
            onClick={() => setSectionType("all")}
            className={`absolute w-[291.75px] h-[46.88px] top-[1147.41px] left-[38.25px] flex items-center justify-center cursor-pointer rounded-tl-[12px] rounded-bl-[12px] ${
              sectionType === "all" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("all")}
            className={`absolute w-[64px] h-[21px] top-[1157.83px] left-[152.11px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "all"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            덮어쓰기
          </div>

          <div className="absolute  z-10 w-[0px] h-[46.88px] top-[1147.41px] left-[330px] border-[1.5px] border-[#E4E4E7]"></div>

          <div
            onClick={() => setSectionType("new")}
            className={`absolute w-[291.75px] h-[46.88px] top-[1147.41px] left-[329.25px] flex items-center justify-center cursor-pointer ${
              sectionType === "new" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSectionType("new")}
            className={`absolute whitespace-nowrap w-[52px] h-[21px] top-[1157.83px] left-[449.88px]  font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer z-20 ${
              sectionType === "new"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            새 버전
          </div>
          <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[1211.46px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">공개 범위</div>
          <div className="absolute w-[44.72px] h-[25.88px] top-[1211.53px] left-[110.86px] border border-[1.5px] rounded-[8px] border-[#E4E4E7] bg-[#E4E4E7]"></div>
          <div className="absolute w-[27px] h-[17px] top-[1213.56px] left-[120.61px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3] flex items-center justify-center">고정</div>

          <div className="absolute w-[170px] h-[22px] top-[1248.06px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">🔒 비공개 (MVP 기본)</div>
          <div className="absolute w-[229px] h-[18px] top-[1275.66px] left-[37.5px] font-inter font-normal text-[15px] leading-none text-[#9A9AA3] whitespace-nowrap">저장 후 저장소에서 공개로 전환 가능</div>
            <div onClick={() => setControll(controll => !controll)}
            className={`absolute w-[49.5px] h-[28.5px] top-[1258.41px] left-[572.25px] border border-[1.5px]  rounded-[15px] ${
            controll
            ?"border-[#6366F1] bg-[#6366F1]"
            : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>

        </div>
        <div className="w-[657px] h-[85.5px] top-[1332.66px] left-[1.5px] bg-[#FFFFFF]">
          <hr className="absolute w-[657px] h-[0px] top-[1333.41px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
          <div className=" absolute whitespace-nowrap w-[226px] h-[20px] top-[1363.48px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">대상 3개 · 내 흐름에 비공개 저장</div>
          <div
          onClick={() => setSave(!save)}
          className={`absolute w-[69.91px] h-[46.5px] top-[1352.91px] left-[566.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
            save
              ? "bg-[#6366F1] border-[#6366F1]"
              : "bg-[#FFFFFF] border-[#E4E4E7]"
          }`}
          ></div>

          <div
            onClick={() => setSave(!save)}
            className={`absolute whitespace-nowrap w-[35px] h-[23px] top-[1363.03px] left-[584.29px] font-inter font-bold text-[18.75px] leading-none flex items-center justify-center ${
              save
                ? "text-[#FFFFFF]"
                : "text-[#27272A]"
            }`}
          >
            저장
          </div>
          </div>
          
    </div>
  );
}