import {useState} from "react";
export default function Default6() {
  const [save, setSave] = useState(true);
  const [form, setForm] = useState("form1");
  const [controll1, setControll1] = useState(false);
  const [controll2, setControll2] = useState(false);
  const [controll3, setControll3] = useState(false);
  const [controll4, setControll4] = useState(false);
  const [level, setLevel] = useState("level1");

  return (
  <div className=" relative w-[660px] h-[1309.78] bg-[#FFFFFF]">
    <div className="absolute w-[658.5px] h-[1308.28px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7] bg-[#FFFFFF]">
      {/* 소개 */}
      <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]">
        <div className="w-[21px] h-[21px] top-[35.93px] left-[32.06px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF]">
         ☑️
        </div>
      </div>

      <div className="absolute whitespace-nowrap w-[213px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-inter leading-none text-[#27272A] ">
        체크리스트로 출력하기
      </div>

      <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-SplineSansMono font-normal text-[15px] leading-none text-[#9A9AA3]">
        OUT-003 · OUTPUT
      </div>

      
      <div className="absolute w-[142.92px] h-[30px] top-[36.38px] left-[492.33px] rounded-[8px] border border-[1.5px] border-[#CFE3D3] bg-[#CFE3D3] "></div>
      <div className="absolute w-[121px] h-[18px] top-[40.13px] left-[505.08px] font-inter font-bold text-[15px] leading-[100%] text-[#3C7A52]">RECOMMENDED</div>
      

      <div className="absolute whitespace-nowrap w-[290px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
        결과를 점검용 체크리스트로 출력합니다.
      </div>

      <div className="absolute w-[74.88px] h-[30px] top-[133.88px] left-[99.3px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[8px]">
        <div className="whitespace-nowrap w-[53px] h-[18px] top-[137.63px] left-[112.05px] font-inter font-bold leading-none text-[#52525B] tracking-[-0.03em] leading-[100%]">
          조건부 1
        </div>
      </div>

      <div className="absolute w-[61.92px] h-[30px] top-[133.88px] left-[184.69px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[8px]">
        <div className=" whitespace-nowrap w-[39px] h-[18px] top-[137.63px] left-[197.44px] text-[15px] font-inter font-bold leading-none text-[#52525B] tracking-[-0.03em] leading-[100%]">
          선택 1
        </div>
      </div>
      <div className="absolute w-[64.05px] h-[30px] top-[133.88px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[8px]">
        <div className=" whitespace-nowrap w-[41px] h-[18px] top-[137.63px] left-[37.5px] text-[15px] font-inter font-bold leading-none text-[#52525B] tracking-[-0.03em] leading-[100%]">
          필수 2
        </div>
      </div>


      <hr className=" absolute w-[657px] h-0 top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

      {/* 요청 정리 수준 */}
      <div className="absolute w-[621px] h-[1002.66px] top-[203.63px] left-[19.5px] bg-[#FFFFFF]"></div>
      
        <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

        <div className="absolute whitespace-nowrap w-[177px] h-[23px] top-[216.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          체크리스트로 출력하기
        </div>

        <div className="absolute w-[25px] h-[16px] top-[220.43px] left-[560.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
        </div>

        <div className="absolute w-[10px] h-[22px] top-[218.03px] left-[612px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
        </div>

        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[254.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            그룹 기준
          <span className=" w-[10px] h-[21px] top-[254.55px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        </div>
        <div onClick={()=>{setForm("form1")}}
        className={`absolute w-[583.5px] h-[84.66px] top-[290.25px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form ==="form1" ? "border-[#6366F1]" : "border-[#E4E4E7]" }`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[308.25px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
          form==="form1"? "bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[35px] h-[23px] top-[305.63px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">단계</div>
        <div className="absolute whitespace-nowrap w-[96px] h-[19px] top-[335.85px] left-[94.5px] font-inter font-bold text-[15.75px] leading-none text-[#9A9AA3]">진행 순서 기준</div>
        <div onClick={()=>{setForm("form2")}}
        className={`absolute w-[583.5px] h-[59.63px] top-[386.91px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form==="form2"?"border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[404.91px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
        form ==="form2" ? "bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[52px] h-[23px] top-[402.28px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">담당자</div>

        <div onClick={()=>{setForm("form3")}}
        className={`absolute w-[583.5px] h-[59.63px] top-[458.53px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form==="form3"?"border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[476.53px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
        form ==="form3" ? "bg-[#6366F1]  border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[69px] h-[23px] top-[473.91px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">우선순위</div>
        
        <div onClick={()=>{setForm("form4")}}
        className={`absolute w-[583.5px] h-[59.63px] top-[530.16px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form==="form4"?"border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[548.16px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
        form ==="form4" ? "bg-[#6366F1]  border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[35px] h-[23px] top-[545.53px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">없음</div>

        
        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[605.46px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            체크 상태
          <span className=" w-[10px] h-[21px] top-[605.46px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        </div>
        <div
                onClick={() => setLevel("level1")}
                className={`absolute w-[80.16px] h-[48.38px] top-[641.16px] left-[40.5px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                level === "level1"
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-[#E4E4E7] bg-[#FFFFFF]"
                }`}
            ></div>

            <div
                onClick={() => setLevel("level1")}
                className={`absolute whitespace-nowrap w-[52px] h-[21px] top-[652.33px] left-[57px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                level === "level1"
                    ? "text-[#FFFFFF]"
                    : "text-[#52525B]"
                }`}
            >
                빈 체크
            </div>

            <div
                onClick={() => setLevel("level2")}
                className={`absolute w-[135.14px] h-[48.38px] top-[641.16px] left-[134.95px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                level === "level2"
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-[#E4E4E7] bg-[#FFFFFF]"
                }`}
            ></div>

            <div
                onClick={() => setLevel("level2")}
                className={`absolute whitespace-nowrap w-[104px] h-[21px] top-[652.33px] left-[153.7px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                level === "level2"
                    ? "text-[#FFFFFF]"
                    : "text-[#52525B]"
                }`}
            >
                현재 상태 반영
            </div>

        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[705.21px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            부가 필드</div>
        <div className="absolute w-[27px] h-[17px] top-[707.31px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">
        선택
        </div>

        <div className="absolute w-[71px] h-[22px] top-[742.56px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">필수 배지</div>
        <div onClick={() => setControll1(controll1 => !controll1)}
        className={`absolute w-[49.5px] h-[28.5px] top-[740.16px] left-[571.5px] border border-[1.5px]  rounded-[15px] ${
        controll1
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>
        <div className="absolute w-[71px] h-[22px] top-[802.56px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">완료 기준</div>
        <div onClick={() => setControll2(controll2 => !controll2)}
        className={`absolute w-[49.5px] h-[28.5px] top-[800.91px] left-[572.25px] border border-[1.5px]  rounded-[15px] ${
        controll2
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>
        <div className="absolute w-[50px] h-[22px] top-[862.56px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">담당자</div>
        <div onClick={() => setControll3(controll3 => !controll3)}
        className={`absolute w-[49.5px] h-[28.5px] top-[860.91px] left-[572.25px] border border-[1.5px]  rounded-[15px] ${
        controll3
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>
        <div className="absolute w-[34px] h-[22px] top-[922.56px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">비고</div>
        <div onClick={() => setControll4(controll4 => !controll4)}
        className={`absolute w-[49.5px] h-[28.5px] top-[920.91px] left-[572.25px] border border-[1.5px]  rounded-[15px] ${
        controll4
        ?"border-[#6366F1] bg-[#6366F1]"
        : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>

        

        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[965.83px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
        그룹 순서
        </div>
        <div className="absolute w-[57.3px] h-[25.88px] top-[965.91px] left-[110.86px] border bodrer-[1.5px] border-[#ECDCBF] bg-[#ECDCBF] rounded-[8px]"></div>
        <div className="absolute w-[40px] h-[17px] top-[967.93px] left-[120.61px] font-inter font-bold text-[14.25px] leading-none text-[#8A6A3C]">
            조건부
        </div>
      

        <div className="absolute w-[559.5px] h-[56.63px] top-[1036.78px] left-[62.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] flex items-center justify-center"></div>
        <div className="absolute w-[28.13px] h-[24.38px] top-[1052.91px] left-[112.5px] bg-[#3C7A52] rounded-[6px]"></div>
        <div className="absolute w-[7px] h-[17px] top-[1054.18px] left-[123px] font-inter font-bold text-[14.25px] leading-none text-[#FFFFFF]">1</div>
        <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[1050.66px] left-[152.63px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">그룹 이름</div>

        <div className="absolute w-[559.5px] h-[56.63px] top-[1130.91px] left-[62.25px] border border-[1.5px] border-[#E4E4E7] rounded-[12px] flex items-center justify-center"></div>
        <div className="absolute w-[30.12px] h-[24.38px] top-[1147.03px] left-[112.5px] bg-[#3C7A52] rounded-[6px]"></div>
        <div className="absolute w-[9px] h-[17px] top-[1148.31px] left-[123px] font-inter font-bold text-[14.25px] leading-none text-[#FFFFFF]">2</div>
        <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[1144.78px] left-[154.62px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">그룹 이름</div>

        
        
      
      <div className="w-[657px] h-[85.5px] top-[1222.78px] left-[1.5px] bg-[#FFFFFF]">
          <hr className="absolute w-[657px] h-[0px] top-[1223.53px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
          <div className=" absolute whitespace-nowrap w-[146px] h-[20px] top-[1253.61px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">기본값으로 출력 가능</div>
          <div
          onClick={() => setSave(!save)}
          className={`absolute w-[69.91px] h-[46.5px] top-[1243.03px] left-[566.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
            save
              ? "bg-[#6366F1] border-[#6366F1]"
              : "bg-[#FFFFFF] border-[#E4E4E7]"
          }`}
          ></div>

          <div
            onClick={() => setSave(!save)}
            className={`absolute whitespace-nowrap w-[35px] h-[23px] top-[1253.16px] left-[584.29px] font-inter font-bold text-[18.75px] leading-none flex items-center justify-center ${
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