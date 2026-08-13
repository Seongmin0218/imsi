
import {useState} from "react";
export default function Review() {
  const [form, setForm] = useState("form1");
  const [setting, setSetting] = useState("");
  const[save3,setSave3]=useState(false);
  const [controll2, setControll2]=useState(false);
  const [controll3, setControll3]=useState(false);
  const [length, setLength] = useState("error");
  return (
   
        <div className="absolute w-[598.5px] h-[2425.88px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7] bg-[#FFFFFF]">
        {/* 소개 */}
        <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#B07A2E] flex items-center justify-center rounded-[12px]">
          <div className="w-[15px] h-[25px] top-[35.93px] left-[39.47px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF]">
            4
          </div>
        </div>

        <div className="absolute whitespace-nowrap w-[89px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-SplineSansMono leading-none text-[#27272A]">
          검토 노드
        </div>

        <div className="absolute w-[153px] h-[18px] top-[57.75px] left-[84px] font-normal text-[15px] leading-none text-[#9A9AA3]">
          REVIEW · 9 blocks
        </div>

        <div className="absolute w-[83.63px] h-[30px] top-[36.38px] left-[416.72px] border border-[1.5px] border-dashed border-[#E4E4E7]  flex items-center justify-center rounded-[12px]">
          <div className="w-[60px] h-[18px] top-[40.13px] left-[429.47px] font-bold font-inter text-[15px] leading-none text-[#52525B]">
            REVIEW
          </div>
        </div>

        <div className="absolute w-[64.41px] h-[30px] top-[36.38px] left-[510.84px] border border-[1.5px] border-[#E9C9C9] bg-[#E9C9C9] flex items-center justify-center rounded-[12px]">
          <div className="w-[42px] h-[18px] top-[40.13px] left-[523.59px] font-bold text-[15px] font-inter leading-none text-[#B4453A]">
            미완성
          </div>
        </div>

        <div className="absolute whitespace-nowrap w-[545px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
          결과물의 형식·조건·근거를 점검하고, 실패 위치와 수정 가이드를 제공합니다.
        </div>


        <div className="absolute w-[79.62px] h-[30px] top-[133.88px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[57px] h-[18px] top-[137.63px] left-[37.5px] font-inter font-bold leading-none text-[#52525B]">
            필수 3/3
          </div>
        </div>

        <div className="absolute w-[74.88px] h-[30px] top-[133.88px] left-[114.87px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[53px] h-[18px] top-[137.63px] left-[127.62px] font-inter font-bold leading-none text-[#52525B]">
            미입력 1
          </div>
        </div>

        <div className="absolute w-[64.52px] h-[30px] top-[133.88px] left-[200.25px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[41px] h-[18px] top-[137.63px] left-[213px] font-inter font-bold leading-none text-[#52525B]">
            선택 6
          </div>
        </div>


        <hr className="absolute w-[597px] h-[0px] top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

        <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

          <div className="absolute w-[108px] h-[23px] top-[216.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            형식 확인하기
          </div>

          <div className="absolute w-[25px] h-[16px] top-[220.42px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
          </div>

          <div className="absolute w-[10px] h-[22px] top-[218.02px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>

          <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[254.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            기대 형식
            <span className="w-[10px] h-[21px] top-[254.55px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
              *
            </span>
          </div>
            <div
            onClick={() => setForm("form1")}
            className={`absolute w-[523.5px] h-[84.66px] top-[290.25px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
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
            표
          </div>

          <div className="absolute w-[116px] h-[19px] top-[335.85px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#27272A]">
            행/열 구조를 검사
          </div>


          <div
            onClick={() => setForm("form2")}
            className={`absolute w-[523.5px] h-[59.63px] top-[386.91px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
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

          <div className="absolute w-[35px] h-[23px] top-[402.28px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            목록
          </div>


          <div
            onClick={() => setForm("form3")}
            className={`absolute w-[523.5px] h-[59.63px] top-[458.53px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
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

          <div className="absolute w-[74px] h-[23px] top-[473.91px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            문서
          </div>


          <div
            onClick={() => setForm("form4")}
            className={`absolute w-[523.5px] h-[59.63px] top-[530.16px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
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

          <div className="absolute w-[52px] h-[23px] top-[545.53px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            JSON
          </div>

           <div className="absolute whitespace-nowrap flex w-[32px] h-[21px] top-[605.46px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            기준 <span className="w-[10px] h-[21px] top-[605.46px] left-[76.34px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">*</span>
          </div>
          <div className="absolute w-[523.5px] h-[48.38px] top-[641.16px] left-[38.25px] border border-[#E4E4E7]  rounded-[12px] border-[1.5px]"></div>
          <div onClick={()=>{setSetting("setting1")}}
          className={`absolute w-[172.99px] h-[46.88px] top-[641.91px] left-[39px] border  rounded-tl-[12px] rounded-bl-[12px] border-[1.5px] ${
          setting==="setting1"?" bg-[#6366F1] border-[#6366F1]":" border-[#E4E4E7]"}`}></div>
          <div className={`absolute w-[68px] h-[21px] top-[652.33px] left-[91.48px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center ${
          setting==="setting1"?"text-[#FFFFFF]":"text-[#52525B]"}`}>결과 설정</div>
          <div className="w-[0px] h-[46.88px] top-[641.91px] left-[212.74px] text-[#000000] border-[#E4E4E7] border-[1.5px]  flex items-center"></div>
          <div  onClick={()=>{setSetting("setting2")}}
          className={`absolute w-[177.99px] h-[46.88px] top-[641.91px] left-[210.99px] border-[1.5px]  flex items-center ${
          setting==="setting2"?" bg-[#6366F1] border-[#6366F1]":" border-[#E4E4E7]"}`}></div>
          <div className={`absolute w-[48px] h-[21px] top-[652.33px] left-[275.99px] font-inter font-bold text-[17.25px] flex items-center justify-center ${
          setting==="setting2"?"text-[#FFFFFF]":"text-[#52525B]"}`}>템플릿</div>
          <div className="absolute w-[0px] h-[46.88px] top-[641.91px] left-[387.26px] text-[#000000] border-[#E4E4E7] border-[1.5px]  flex items-center"></div>
          <div  onClick={()=>{setSetting("setting3")}}
          className={`absolute w-[175px] h-[46.88px] top-[641.91px] left-[386.5px] border-[1.5px]  flex items-center rounded-tr-[12px] rounded-br-[12px]  ${
          setting==="setting3"?" bg-[#6366F1] border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
          <div className={`absolute w-[32px] h-[21px] top-[652.33px] left-[458.5px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center ${
          setting==="setting3"?"text-[#FFFFFF]":"text-[#52525B]"}`}>직접</div>

          <div className="absolute whitespace-nowrap flex w-[68px] h-[21px] top-[705.21px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            필수 구성 </div>
            <div className="absolute w-[523.5px] h-[77.25px] top-[740.91px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] flex items-center justify-center"></div>
            <div className="absolute w-[4.5px] h-[4.5px] top-[769.78px] left-[63px]  border border-[#6366F1] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[4.5px] h-[4.5px] top-[777.28px] left-[63px]  border border-[#6366F1] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[4.5px] h-[4.5px] top-[784.78px] left-[63px]  border border-[#6366F1] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[32px] h-[21px] top-[766.52px] left-[79.5px] font-inter font-bold text-[17.25px] text-[#6366F1]">제목</div>
            <div className="absolute w-[12px] h-[20px] top-[767.98px] left-[124.27px] font-inter font-bold text-[16.5px] text-[#6366F1]">×</div>

            <div className="absolute w-[4.5px] h-[4.5px] top-[769.78px] left-[170.84px]  border border-[#6366F1] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[4.5px] h-[4.5px] top-[777.28px] left-[170.84px]  border border-[#6366F1] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[4.5px] h-[4.5px] top-[784.78px] left-[63px]  border border-[#6366F1] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[83px] h-[21px] top-[766.52px] left-[187.34px] font-inter font-bold text-[17.25px] text-[#6366F1]">열 3개 이상</div>
            <div className="absolute w-[12px] h-[20px] top-[767.98px] left-[280.99px] font-inter font-bold text-[16.5px] text-[#6366F1]">×</div>

            <div className="absolute w-[4.5px] h-[4.5px] top-[769.78px] left-[327.56px]  border border-[#6366F1] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[4.5px] h-[4.5px] top-[777.28px] left-[327.56px]  border border-[#6366F1] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[4.5px] h-[4.5px] top-[784.78px] left-[327.56px]  border border-[#6366F1] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[52px] h-[21px] top-[766.52px] left-[344.06px] font-inter font-bold text-[17.25px] text-[#6366F1]">합계 행</div>
            <div className="absolute w-[12px] h-[20px] top-[767.98px] left-[407.81px] font-inter font-bold text-[16.5px] text-[#6366F1]">×</div>

            <div className="absolute w-[53px] h-[21px] top-[753.58px] left-[443.88px] text-[#9A9AA3] text-[17.25px] font-inter font-normal">입력 후</div>
            <div className="absolute w-[96px] h-[21px] top-[779.46px] left-[443.88px] text-[#9A9AA3] text-[17.25px] font-inter font-normal">Enter로 추가</div>

            <div className="absolute whitespace-nowrap flex w-[68px] h-[21px] top-[833.83px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            오류 처리 <span className="w-[10px] h-[21px] top-[833.83px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">*</span>
            </div>

            <div
            onClick={() => setForm("form5")}
            className={`absolute w-[523.5px] h-[84.66px] top-[869.53px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              form === "form5" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            className={`absolute w-[22.5px] h-[22.5px] top-[887.53px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form5"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute w-[74px] h-[23px] top-[884.91px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            자동 수정
          </div>

          <div className="absolute w-[125px] h-[19px] top-[915.13px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">
            형식을 맞춰 재작성
          </div>


          <div
            onClick={() => setForm("form6")}
            className={`absolute w-[523.5px] h-[84.66px] top-[966.19px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              form === "form6" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            className={`absolute w-[22.5px] h-[22.5px] top-[984.19px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form6"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute w-[52px] h-[23px] top-[981.56px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            표시만
          </div>

          <div className="absolute w-[140px] h-[19px] top-[1011.79px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">
            위치만 표시하고 유지
          </div>

            <div className="absolute w-[22.5px] h-[22.5px] top-[1101.09px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[164px] h-[23px] top-[1099.22px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            수정 가이드 제공하기
            </div>

            <div className="absolute w-[25px] h-[16px] top-[1102.89px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
                필수
            </div>

            <div className="absolute w-[10px] h-[22px] top-[1100.49px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
                ⌄
            </div>

          <div className="absolute whitespace-nowrap w-[84px] h-[21px] top-[1137.02px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            가이드 범위
            <span className="w-[10px] h-[21px] top-[1137.02px] left-[125.04px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
              *
            </span></div>

        <div
        onClick={() => setLength("error")}
        className={`absolute w-[80.34px] h-[48.38px] top-[1172.72px] left-[50px] border border-[1.5px] rounded-[12px] cursor-pointer ${
          length === "error"
            ? "bg-[#6366F1] border-[#6366F1]"
            : "border-[#E4E4E7] bg-[#FFFFFF]"
        }`}
      ></div>

      <div
        onClick={() => setLength("error")}
        className={`absolute whitespace-nowrap w-[68px] h-[21px] top-[1183.89px] left-[57px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
          length === "error"
            ? "text-[#FFFFFF]"
            : "text-[#52525B]"
        }`}
      >
        현재 오류
      </div>


      <div
        onClick={() => setLength("step")}
        className={`absolute w-[67.34px] h-[48.38px] top-[1172.72px] left-[149.86px] border border-[1.5px] rounded-[12px] cursor-pointer ${
          length === "step"
            ? "bg-[#6366F1] border-[#6366F1]"
            : "border-[#E4E4E7] bg-[#FFFFFF]"
        }`}
      ></div>

      <div
        onClick={() => setLength("step")}
        className={`absolute w-[32px] h-[21px] top-[1183.89px] left-[168.61px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
          length === "step"
            ? "text-[#FFFFFF]"
            : "text-[#52525B]"
        }`}
      >
        단계
      </div>


      <div
        onClick={() => setLength("all")}
        className={`absolute w-[67.34px] h-[48.38px] top-[1172.72px] left-[227.7px] border border-[1.5px] rounded-[12px] cursor-pointer ${
          length === "all"
            ? "bg-[#6366F1] border-[#6366F1]"
            : "border-[#E4E4E7] bg-[#FFFFFF]"
        }`}
      ></div>

      <div
        onClick={() => setLength("all")}
        className={`absolute w-[32px] h-[21px] top-[1183.89px] left-[246.45px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
          length === "all"
            ? "text-[#FFFFFF]"
            : "text-[#52525B]"
        }`}
      >
        전체
      </div>
        
        
        <div className="absolute whitespace-nowrap flex w-[68px] h-[21px] top-[1236.77px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
         안내 방식 <span className="w-[10px] h-[21px] top-[1236.77px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">*</span>
        </div>

        <div
        onClick={() => setForm("form7")}
        className={`absolute w-[523.5px] h-[59.63px] top-[1272.47px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
          form === "form7" ? "border-[#6366F1]" : "border-[#E4E4E7]"
        }`}
      ></div>

      <div
        className={`absolute w-[22.5px] h-[22.5px] top-[1290.47px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
          form === "form7"
            ? "bg-[#6366F1] border-[#6366F1]"
            : "border-[#E4E4E7] bg-[#E4E4E7]"
        }`}
      ></div>

      <div className="absolute w-[35px] h-[23px] top-[1287.84px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
        위치
      </div>


      <div
        onClick={() => setForm("form8")}
        className={`absolute w-[523.5px] h-[59.63px] top-[1344.09px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
          form === "form8" ? "border-[#6366F1]" : "border-[#E4E4E7]"
        }`}
      ></div>

      <div
        className={`absolute w-[22.5px] h-[22.5px] top-[1362.09px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
          form === "form8"
            ? "bg-[#6366F1] border-[#6366F1]"
            : "border-[#E4E4E7] bg-[#E4E4E7]"
        }`}
      ></div>

      <div className="absolute w-[35px] h-[23px] top-[1359.47px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
        방법
      </div>
        <div
        onClick={() => setForm("form9")}
        className={`absolute w-[523.5px] h-[84.66px] top-[1415.72px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
          form === "form9" ? "border-[#6366F1]" : "border-[#E4E4E7]"
        }`}
      ></div>

      <div
        className={`absolute w-[22.5px] h-[22.5px] top-[1433.72px] left-[56.25px] border border-[1.5px] rounded-[10px] flex items-center justify-center ${
          form === "form9"
            ? "bg-[#6366F1] border-[#6366F1]"
            : "bg-[#E4E4E7] border-[#E4E4E7]"
        }`}
      ></div>

      <div className="absolute w-[52px] h-[23px] top-[1431.09px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
        추천값
      </div>

      <div className="absolute w-[96px] h-[19px] top-[1461.32px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">
        대체 값을 제안
      </div>

        <div className="absolute w-[84px] h-[21px] top-[1516.05px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B] ">추천값 적용</div>
        <div className="absolute w-[27px] h-[17px] top-[1518.15px] left-[537.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>
        <div className="absolute w-[129px] h-[22px] top-[1553.4px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A]">승인 후 자동 입력</div>
        <div onClick={() => setControll2(controll2 => !controll2)}
        className={`absolute w-[51px] h-[30px] top-[1551px] left-[511.5px] border border-[1.5px]  rounded-[15px] ${
        controll2
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>

        <div className="absolute w-[48px] h-[21px] top-[1595.92px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B] ">재검증</div>
        <div className="absolute w-[27px] h-[17px] top-[1598.03px] left-[537.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>
        <div className="absolute w-[199px] h-[22px] top-[1633.28px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A]">수정 후 자동으로 다시 검사</div>
        <div onClick={()=> setControll3(controll3=>!controll3)}
        className={`absolute w-[51px] h-[30px] top-[1630.88px] left-[511.5px] border-[#6366F1] border border-[1.5px] bg-[#6366F1] rounded-[15px] ${
        controll3
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>

        <div className="absolute w-[559.5px] h-[51px] top-[1696.13px] left-[20.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] flex items-center justify-center"></div>
        <div className="absolute w-[21px] h-[21px] top-[1711.13px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
        <div className="absolute w-[108px] h-[23px] top-[1708.5px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          누락 확인하기
        </div>
        <div className="absolute w-[106px] h-[19px] top-[1710.6px] left-[274.9px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          필수 항목·섹션
        </div>

        <div className="absolute w-[44.33px] h-[19.5px] top-[1711.88px] left-[489.66px] bg-[#F0F0F3]"></div>
        <div className=" absolute w-[25px] h-[16px] top-[1712.17px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
          선택
        </div>
        <div className="absolute w-[10px] h-[22px] top-[1708.28px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="absolute w-[559.5px] h-[213px] top-[1765.13px] left-[20.25px] bg-[#FDFAF3] border border-[1.5px] border-[#E6C79A] rounded-[12px] flex items-center justify-center"></div>
        <div className="absolute w-[22.5px] h-[22.5px] top-[1851.38px] left-[73.5px] bg-[#6366F1] rounded-[6px]"></div>
        <div className="absolute w-[147] h-[23px] top-[1849.5px] left-[108px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
        파일 업로드 받기
        </div>

        <div className="absolute w-[108px] h-[19px] top-[1851.6px] left-[293.27px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#B4453A]">
        조건 미연결 →
        </div>

        <div className="absolute w-[25px] h-[16px] top-[1853.17px] left-[464.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
        필수
        </div>
        <div className="absolute w-[10px] h-[22px] top-[1849.28px] left-[516px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
        ⌄
        </div>


        <div className="absolute w-[559.5px] h-[51px] top-[1996.13px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
        <div className="absolute w-[21px] h-[21px] top-[2011.13px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
        <div className="absolute w-[147px] h-[23px] top-[2008.5px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          정책 충돌 확인하기
        </div>
        <div className="absolute w-[68px] h-[19px] top-[2010.6px] left-[313.73px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          기능-정책
        </div>

        <div className="absolute w-[44.33px] h-[19.5px] top-[2011.88px] left-[489.66px] bg-[#F0F0F3]"></div>
        <div className=" absolute w-[25px] h-[16px] top-[2012.17px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
          선택
        </div>
        <div className="absolute w-[10px] h-[22px] top-[2008.28px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="absolute w-[559.5px] h-[51px] top-[2065.13px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
        <div className="absolute w-[21px] h-[21px] top-[2079.38px] left-[37.5px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
        <div className="absolute w-[108px] h-[23px] top-[2077.5px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          근거 확인하기
        </div>
        <div className="absolute w-[68px] h-[19px] top-[2079.6px] left-[295.38px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          사실·수치
        </div>

        <div className="absolute w-[44.33px] h-[19.5px] top-[2080.88px] left-[489.66px] bg-[#F0F0F3]"></div>
        <div className=" absolute w-[25px] h-[16px] top-[2081.17px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
          선택
        </div>
        <div className="absolute w-[10px] h-[22px] top-[2077.27px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="absolute w-[559.5px] h-[51px] top-[2134.13px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
        <div className="absolute w-[21px] h-[21px] top-[2149.13px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
        <div className="absolute w-[108px] h-[23px] top-[2146.5px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          중복 제거하기
        </div>
        <div className="absolute w-[125px] h-[19px] top-[2148.6px] left-[265.45px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          의미 단위 · 균형
        </div>

        <div className="absolute w-[44.33px] h-[19.5px] top-[2149.88px] left-[489.66px] bg-[#F0F0F3]"></div>
        <div className=" absolute w-[25px] h-[16px] top-[2150.17px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
          선택
        </div>
        <div className="absolute w-[10px] h-[22px] top-[2146.27px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="absolute w-[559.5px] h-[51px] top-[2203.13px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
        <div className="absolute w-[21px] h-[21px] top-[2218.13px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
        <div className="absolute w-[91px] h-[23px] top-[2215.5px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          톤 조정하기
        </div>
        <div className="absolute w-[116px] h-[19px] top-[2217.6px] left-[262.08px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          전문 · 합니다체
        </div>

        <div className="absolute w-[44.33px] h-[19.5px] top-[2218.88px] left-[489.66px] bg-[#F0F0F3]"></div>
        <div className=" absolute w-[25px] h-[16px] top-[2219.17px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
          선택
        </div>
        <div className="absolute w-[10px] h-[22px] top-[2215.27px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="absolute w-[561px] h-[52.5px] top-[2271.38px] left-[19.5px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
        <div className="absolute w-[22.5px] h-[22.5px] top-[2286.38px] left-[37.5px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
        <div className="absolute w-[147px] h-[23px] top-[2284.5px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          오류 위치 표시하기
        </div>
        <div className="absolute w-[179px] h-[19px] top-[2286.6px] left-[257.04px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          블록 단위 · 강조 ON →
        </div>

        
        <div className=" absolute w-[25px] h-[16px] top-[2288.17px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
          필수 
        </div>
        <div className="absolute w-[10px] h-[22px] top-[2284.27px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>
        <div className="absolute w-[597px] h-[85.5px] top-[2332.03px] left-[1.5px] border-[1.5px] border-[#FFFFFF]"></div>
            <hr className="absolute w-[597px] h-[0px] top-[2341.13px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
            <div className=" absolute w-[325px] h-[20px] top-[2371.2px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">“조건 충족 확인”에 조건이 연결되지 않았습니다</div>
            <div
            onClick={() => setSave3(!save3)}
            className={`absolute w-[69.91px] h-[46.5px] top-[2352.28px] left-[506.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              save3
                ? "bg-[#6366F1] border-[#6366F1]"
                : "bg-[#FFFFFF] border-[#E4E4E7]"
              }`}
            ></div>

            <div
              onClick={() => setSave3(!save3)}
              className={`absolute w-[35px] h-[23px] top-[2362.41px] left-[524.29px] font-inter font-bold text-[18.75px] leading-none flex items-center justify-center ${
                save3
                  ? "text-[#FFFFFF]"
                  : "text-[#27272A]"
              }`}
            >
            검증
          </div>
        
        
    </div>
  )
}
