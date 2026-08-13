
import {useState} from "react";
export default function Review() {
  const [form, setForm] = useState("form1");
  const[save3,setSave3]=useState(false);
  const [controll1, setControll1]=useState(false);
  const [controll2, setControll2]=useState(false);
  const [controll3, setControll3]=useState(false);
  const [length, setLength] = useState("error");
  return (
   
        <div className="absolute w-[658.5px] h-[1117.03px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7] bg-[#FFFFFF]">
        {/* 소개 */}
        <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]">
          <div className="w-[13px] h-[25px] top-[35.93px] left-[40.27px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF]">
            ¶
          </div>
        </div>

        <div className="absolute whitespace-nowrap w-[171px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-SplineSansMono leading-none text-[#27272A]">
          텍스트로 출력하기
        </div>

        <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-normal text-[15px] leading-none text-[#9A9AA3]">
          OUT-001 · OUTPUT
        </div>

        {/*<div className="absolute w-[43px] h-[30px] top-[36.38px] left-[416.72px] border border-[1.5px] border-dashed border-[#E4E4E7]  flex items-center justify-center rounded-[12px]">
          
        </div>*/}
        <div className="absolute w-[43px] h-[18px] top-[40.13px] left-[581.51px] font-bold font-inter text-[15px] leading-none text-[#6366F1]">
            CORE
          </div>

        <div className="absolute whitespace-nowrap w-[279px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
          결과를 일반 텍스트 형태로 출력합니다.
        </div>


        <div className="absolute w-[64.05px] h-[30px] top-[133.88px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[41px] h-[18px] top-[137.63px] left-[37.5px] font-inter font-bold leading-none text-[#52525B]">
            필수 2
          </div>
        </div>
        <div className="absolute w-[64.05px] h-[30px] top-[133.88px] left-[99.3px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[41px] h-[18px] top-[137.63px] left-[112.05px] font-inter font-bold leading-none text-[#52525B]">
            선택 2
          </div>
        </div>


        <hr className="absolute w-[657px] h-[0px] top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

        <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

          <div className="absolute whitespace-nowrap w-[143px] h-[23px] top-[216.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            텍스트로 출력하기
          </div>

          <div className="absolute w-[25px] h-[16px] top-[220.43px] left-[560.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
          </div>

          <div className="absolute w-[10px] h-[22px] top-[218.02px] left-[612px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>

          <div className="absolute whitespace-nowrap w-[84px] h-[21px] top-[254.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            텍스트 구조
            <span className="w-[10px] h-[21px] top-[254.55px] left-[125.04px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
              *
            </span>
          </div>
            <div
            onClick={() => setForm("form1")}
            className={`absolute w-[583.5px] h-[84.66px] top-[290.25px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              form === "form1" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            className={`absolute w-[22.5px] h-[22.5px] top-[308.25px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form1"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute w-[35px] h-[23px] top-[305.63px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            단락
          </div>

          <div className="absolute w-[92px] h-[19px] top-[335.85px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#27272A]">
            이어지는 문단
          </div>


          <div
            onClick={() => setForm("form2")}
            className={`absolute w-[583.5px] h-[59.63px] top-[386.91px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              form === "form2" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            className={`absolute w-[22.5px] h-[22.5px] top-[404.91px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form2"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute w-[91px] h-[23px] top-[402.28px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            제목 + 단락
          </div>


          <div
            onClick={() => setForm("form3")}
            className={`absolute w-[583.5px] h-[59.63px] top-[458.53px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              form === "form3" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            className={`absolute w-[22.5px] h-[22.5px] top-[476.53px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form3"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[473.91px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            목록 포함
          </div>


          <div
            onClick={() => setForm("form4")}
            className={`absolute w-[583.5px] h-[59.63px] top-[530.16px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              form === "form4" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            className={`absolute w-[22.5px] h-[22.5px] top-[548.16px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form4"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute w-[35px] h-[23px] top-[545.53px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            자유
          </div>

           <div className="absolute whitespace-nowrap flex w-[32px] h-[21px] top-[605.46px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            분량 <span className="w-[10px] h-[21px] top-[605.46px] left-[76.34px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">*</span>
          </div>

        <div
        onClick={() => setLength("one")}
        className={`absolute w-[86.32px] h-[48.38px] top-[641.16px] left-[38.25px] border border-[1.5px] rounded-[12px] cursor-pointer ${
          length === "one"
            ? "bg-[#6366F1] border-[#6366F1]"
            : "border-[#E4E4E7] bg-[#FFFFFF]"
        }`}
      ></div>

      <div
        onClick={() => setLength("one")}
        className={`absolute whitespace-nowrap w-[52px] h-[21px] top-[652.33px] left-[57px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
          length === "one"
            ? "text-[#FFFFFF]"
            : "text-[#52525B]"
        }`}
      >
        한 문장
      </div>


      <div
        onClick={() => setLength("short")}
        className={`absolute w-[67.34px] h-[48.38px] top-[641.16px] left-[135.07px] border border-[1.5px] rounded-[12px] cursor-pointer ${
          length === "step"
            ? "bg-[#6366F1] border-[#6366F1]"
            : "border-[#E4E4E7] bg-[#FFFFFF]"
        }`}
      ></div>

      <div
        onClick={() => setLength("short")}
        className={`absolute w-[32px] h-[21px] top-[652.33px] left-[153.82px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
          length === "step"
            ? "text-[#FFFFFF]"
            : "text-[#52525B]"
        }`}
      >
        짧게
      </div>


      <div
        onClick={() => setLength("normal")}
        className={`absolute w-[67.34px] h-[48.38px] top-[641.16px] left-[212.7px] border border-[1.5px] rounded-[12px] cursor-pointer ${
          length === "all"
            ? "bg-[#6366F1] border-[#6366F1]"
            : "border-[#E4E4E7] bg-[#FFFFFF]"
        }`}
      ></div>

      <div
        onClick={() => setLength("normal")}
        className={`absolute w-[32px] h-[21px] top-[652.33px] left-[231.66px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
          length === "all"
            ? "text-[#FFFFFF]"
            : "text-[#52525B]"
        }`}
      >
        보통
      </div>
      <div
        onClick={() => setLength("detail")}
        className={`absolute w-[82.24px] h-[48.38px] top-[641.16px] left-[290.74px] border border-[1.5px] rounded-[12px] cursor-pointer ${
          length === "detail"
            ? "bg-[#6366F1] border-[#6366F1]"
            : "border-[#E4E4E7] bg-[#FFFFFF]"
        }`}
      ></div>

      <div
        onClick={() => setLength("detail")}
        className={`absolute w-[48px] h-[21px] top-[652.33px] left-[309.49px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
          length === "detail"
            ? "text-[#FFFFFF]"
            : "text-[#52525B]"
        }`}
      >
        자세히
      </div>

        <div className="absolute w-[106px] h-[21px] top-[705.21px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B] whitespace-nowrap">제목·강조·출처</div>
        <div className="absolute w-[27px] h-[17px] top-[707.31px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

        <div className="absolute w-[71px] h-[22px] top-[742.56px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">제목 표시</div>
        <div onClick={() => setControll1(controll1 => !controll1)}
        className={`absolute w-[51px] h-[30px] top-[740.16px] left-[571.5px] border border-[1.5px]  rounded-[15px] ${
        controll1
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>


        <div className="absolute w-[87px] h-[22px] top-[802.56px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">핵심어 강조</div>
        <div onClick={() => setControll2(controll2 => !controll2)}
        className={`absolute w-[51px] h-[30px] top-[800.16px] left-[571.5px] border border-[1.5px]  rounded-[15px] ${
        controll2
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>

        <div className="absolute w-[71px] h-[22px] top-[862.56px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">출처 표시</div>
        <div onClick={() => setControll3(controll3 => !controll3)}
        className={`absolute w-[49.5px] h-[28.5px] top-[860.91px] left-[572.25px] border border-[1.5px]  rounded-[15px] ${
        controll3
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>

        <div className="absolute w-[32px] h-[21px] top-[905.08px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B] ">문체</div>
        <div className="absolute w-[27px] h-[17px] top-[907.18px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

        <div className="absolute w-[583.5px] h-[55.5px] top-[940.78px] left-[38.25px] border-[1.5px] border-[#E4E4E7] rounded-[12px]"></div>
        <div className="absolute w-[115px] h-[23px] top-[954.09px] left-[55.5px] font-inter font-normal text-[18.75px] leading-none text-[#27272A]">입력 조건 사용</div>
        <div className="absolute w-[9px] h-[20px] top-[955.86px] left-[595.36px] font-inter font-normal text-[18.75px] leading-none text-[#9A9AA3]">⌄</div>
        

        
        <div className="absolute w-[657px] h-[85.5px] top-[1031.53px] left-[1.5px] border-[1.5px] border-[#FFFFFF]"></div>
            <hr className="absolute w-[657px] h-[0px] top-[1032.28px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
            <div className=" absolute w-[146px] h-[20px] top-[1062.36px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">기본값으로 출력 가능</div>
            <div
            onClick={() => setSave3(!save3)}
            className={`absolute w-[71.41px] h-[48px] top-[1051.03px] left-[566.09px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              save3
                ? "bg-[#6366F1] border-[#6366F1]"
                : "bg-[#FFFFFF] border-[#E4E4E7]"
              }`}
            ></div>

            <div
              onClick={() => setSave3(!save3)}
              className={`absolute w-[35px] h-[23px] top-[1061.91px] left-[584.29px] font-inter font-bold text-[18.75px] leading-none flex items-center justify-center ${
                save3
                  ? "text-[#FFFFFF]"
                  : "text-[#27272A]"
              }`}
            >
            출력
          </div>
        
        
    </div>
  )
}
