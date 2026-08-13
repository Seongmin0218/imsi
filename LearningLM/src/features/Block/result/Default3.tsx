import {useState} from "react";
export default function Default3() {
  const [form, setForm] = useState("form1");
  const [guide, setGuide] = useState("guide1");
  const [level, setLevel] = useState("level1");
  const [count, setCount] = useState(0);
  const [count3, setCount3]=useState("");
  const [controll, setControll]=useState(false);
  const [save3, setSave3]=useState(false);

  
  return (
  <div className=" relative w-[660px] h-[1105.97px] bg-[#FFFFFF]">
    <div className="absolute w-[658.5px] h-[1104.47px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7] bg-[#FFFFFF]">
      {/* 소개 */}
      <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]">
        <div className="w-[21px] h-[21px] top-[35.93px] left-[36px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF]">
         📽
        </div>
      </div>

      <div className="absolute whitespace-nowrap w-[239px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-inter leading-none text-[#27272A] ">
        발표용 요약으로 출력하기
      </div>

      <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-SplineSansMono font-normal text-[15px] leading-none text-[#9A9AA3]">
        OUT-005 · OUTPUT
      </div>

      
      <div className="absolute w-[142.92px] h-[30px] top-[36.38px] left-[492.33px] border border-[1.5px]] border-[#CFE3D3] bg-[#CFE3D3] flex items-center justify-center rounded-[12px]">
        <div className="w-[121px] h-[18px] top-[40.13px] left-[505.08px] font-normal font-bold text-[16px] tracking-[-0.03em] leading-[100%] text-[#3C7A52]">RECOMMENDED</div>
      </div>
      

      <div className="absolute whitespace-nowrap w-[263px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
        발표 시간에 맞는 요약을 출력합니다.
      </div>

      <div className="absolute w-[64.05px] h-[30px] top-[133.88px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[8px]">
        <div className="whitespace-nowrap w-[41px] h-[18px] top-[137.63px] left-[37.5px] font-inter font-bold leading-none text-[#6366F1] tracking-[-0.03em] leading-[100%]">
          필수 2
        </div>
      </div>

      <div className="absolute w-[74.88px] h-[30px] top-[133.88px] left-[99.3px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[8px]">
        <div className=" whitespace-nowrap w-[53px] h-[18px] top-[137.63px] left-[112.05px] text-[15px] font-inter font-bold leading-none text-[#52525B] tracking-[-0.03em] leading-[100%]">
          조건부 1
        </div>
      </div>

      <div className="absolute w-[64.05px] h-[30px] top-[133.88px] left-[184.69px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
        <div className="whitespace-nowrap w-[41px] h-[18px] top-[137.63px] left-[197.44px] font-inter font-bold leading-none text-[#52525B]">
          선택 2
        </div>
      </div>

      <hr className=" absolute w-[657px] h-0 top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
 
      <div className="absolute w-[621px] h-[798.84px] top-[203.63px] left-[19.5px] bg-[#FFFFFF]"></div>
      
        <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

        <div className="absolute whitespace-nowrap w-[199px] h-[23px] top-[216.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          발표용 요약으로 출력하기
        </div>

        <div className="absolute w-[25px] h-[16px] top-[220.43px] left-[560.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
        </div>

        <div className="absolute w-[10px] h-[22px] top-[218.03px] left-[612px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
        </div>

        <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[254.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            발표 형태
          
        </div>
        <span className=" absolute w-[10px] h-[21px] top-[254.55px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        

        <div onClick={()=>{setForm("form1")}}
        className={`absolute w-[583.5px] h-[59.63px] top-[290.25px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form ==="form1" ? "border-[#6366F1]" : "border-[#E4E4E7]" }`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[308.25px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
          form==="form1"? "bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[69px] h-[23px] top-[305.63px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">스크립트</div>

        <div onClick={()=>{setForm("form2")}}
        className={`absolute w-[583.5px] h-[84.66px] top-[361.88px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form==="form2"?"border-[#6366F1]":"border-[#E4E4E7]"}`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[379.88px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
        form ==="form2" ? "bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[108px] h-[23px] top-[377.25px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">슬라이드 개요</div>
        <div className="absolute whitespace-nowrap w-[106px] h-[19px] top-[407.48px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">슬라이드별 요점</div>

        <div onClick={()=>{setForm("form3")}}
        className={`absolute w-[583.5px] h-[59.63px] top-[458.53px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
        form ==="form3" ? "border-[#6366F1]" : "border-[#E4E4E7]" }`}></div>
        <div className={`absolute w-[22.5px] h-[22.5px] top-[476.53px] left-[56.25px] border border-[1.5px]  rounded-[10px] ${
          form==="form3"? "bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
        <div className="absolute whitespace-nowrap w-[74px] h-[23px] top-[473.91px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">핵심 요약</div>


            <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[533.83px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
                발표 시간
                <span className=" w-[10px] h-[21px] top-[533.83px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
                    *
                </span>
             </div>

             <div className="absolute  w-[32px] h-[21px] top-[633.58px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
                청중
             </div>
             <div className="absolute  w-[27px] h-[17px] top-[635.68px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">
                선택
             </div>

            <div
            onClick={() => setGuide("guide1")}
            className={`absolute w-[136.88px] h-[94.69px] top-[669.28px] left-[38.25px] border border-[1.5px] rounded-[12px] ${
                guide === "guide1" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
            ></div>
            <div
            className={`absolute w-[39px] h-[39px] top-[683.53px] left-[87.19px] flex items-center justify-center rounded-[20px] ${
                guide === "guide1" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
            >
            <div
                className={`w-[17px] h-[22px] top-[690.43px] left-[98.19px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
                guide === "guide1" ? "text-[#FFFFFF]" : "text-[#52525B]"
                }`}
            >
                팀
            </div>
            </div>
            <div className="absolute w-[15px] h-[19px] top-[728.76px] left-[99.18px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
            팀
            </div>

            <div
            onClick={() => setGuide("guide2")}
            className={`absolute w-[136.88px] h-[94.69px] top-[669.28px] left-[187.13px] border border-[1.5px] rounded-[12px] ${
                guide === "guide2" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
            ></div>
            <div
            className={`absolute w-[39px] h-[39px] top-[683.53px] left-[236.06px] flex items-center justify-center rounded-[20px] ${
                guide === "guide2" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
            >
            <div
                className={`w-[17px] h-[22px] top-[690.43px] left-[247.06px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
                guide === "guide2" ? "text-[#FFFFFF]" : "text-[#52525B]"
                }`}
            >
                심
            </div>
            </div>
            <div className="absolute w-[29px] h-[19px] top-[728.76px] left-[241.06px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
            심사
            </div>

            <div
            onClick={() => setGuide("guide3")}
            className={`absolute w-[136.88px] h-[94.69px] top-[669.28px] left-[336px] border border-[1.5px] rounded-[12px] ${
                guide === "guide3" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
            ></div>
            <div
            className={`absolute w-[39px] h-[39px] top-[683.53px] left-[384.94px] flex items-center justify-center rounded-[20px] ${
                guide === "guide3" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
            >
            <div
                className={`w-[17px] h-[22px] top-[690.43px] left-[395.94px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
                guide === "guide3" ? "text-[#FFFFFF]" : "text-[#52525B]"
                }`}
            >
                고
            </div>
            </div>
            <div className="absolute w-[29px] h-[19px] top-[728.76px] left-[389.94px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
            고객
            </div>

            <div
            onClick={() => setGuide("guide4")}
            className={`absolute w-[136.88px] h-[94.69px] top-[669.28px] left-[484.88px] border border-[1.5px] rounded-[12px] ${
                guide === "guide4" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
            ></div>
            <div
            className={`absolute w-[39px] h-[39px] top-[683.53px] left-[533.81px] flex items-center justify-center rounded-[20px] ${
                guide === "guide4" ? "bg-[#6366F1]" : "bg-[#E7E7EC]"
            }`}
            >
            <div
                className={`w-[18px] h-[22px] top-[690.43px] left-[544.31px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center ${
                guide === "guide4" ? "text-[#FFFFFF]" : "text-[#52525B]"
                }`}
            >
                一
            </div>
            </div>
            <div className="absolute w-[29px] h-[19px] top-[728.76px] left-[538.81px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">
            일반
            </div>

            <div
                onClick={() => setLevel("level1")}
                className={`absolute w-[74.34px] h-[48.38px] top-[569.53px] left-[38.25px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                level === "level1"
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-[#E4E4E7] bg-[#FFFFFF]"
                }`}
            ></div>

            <div
                onClick={() => setLevel("level1")}
                className={`absolute w-[40px] h-[21px] top-[580.71px] left-[57px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                level === "level1"
                    ? "text-[#FFFFFF]"
                    : "text-[#52525B]"
                }`}
            >
                30초
            </div>

            <div
                onClick={() => setLevel("level2")}
                className={`absolute w-[60.33px] h-[48.38px] top-[569.53px] left-[123.09px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                level === "level2"
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-[#E4E4E7] bg-[#FFFFFF]"
                }`}
            ></div>

            <div
                onClick={() => setLevel("level2")}
                className={`absolute whitespace-nowrap w-[25px] h-[21px] top-[580.71px] left-[141.84px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                level === "level2"
                    ? "text-[#FFFFFF]"
                    : "text-[#52525B]"
                }`}
            >
                1분
            </div>
            <div
                onClick={() => setLevel("level3")}
                className={`absolute w-[48.16px] h-[48.38px] top-[569.53px] left-[202.01px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                level === "level3"
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-[#E4E4E7] bg-[#FFFFFF]"
                }`}
            ></div>

            <div
                onClick={() => setLevel("level3")}
                className={`absolute w-[28px] h-[21px] top-[580.71px] left-[212.67px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                level === "level3"
                    ? "text-[#FFFFFF]"
                    : "text-[#52525B]"
                }`}
            >
                3분
            </div>
            <div
                onClick={() => setLevel("level4")}
                className={`absolute w-[63.07px] h-[48.38px] top-[569.53px] left-[267.87px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                level === "level4"
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-[#E4E4E7] bg-[#FFFFFF]"
                }`}
            ></div>

            <div
                onClick={() => setLevel("level4")}
                className={`absolute w-[27px] h-[21px] top-[580.71px] left-[286.62px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                level === "level4"
                    ? "text-[#FFFFFF]"
                    : "text-[#52525B]"
                }`}
            >
                5분
            </div>
            <div
                onClick={() => setLevel("level5")}
                className={`absolute w-[67.34px] h-[48.38px] top-[569.53px] left-[341.44px] border border-[1.5px] rounded-[12px] cursor-pointer ${
                level === "level5"
                    ? "bg-[#6366F1] border-[#6366F1]"
                    : "border-[#E4E4E7] bg-[#FFFFFF]"
                }`}
            ></div>

            <div
                onClick={() => setLevel("level5")}
                className={`absolute w-[32px] h-[21px] top-[580.71px] left-[360.19px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                level === "level5"
                    ? "text-[#FFFFFF]"
                    : "text-[#52525B]"
                }`}
            >
                직접
            </div>
            <div className="absolute whitespace-nowrap w-[84px] h-[21px] top-[780.39px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">슬라이드 수</div>
            <div className="absolute w-[57.3px] h-[25.88px] top-[780.47px] left-[125.79px] rounded-[8px] border border-[1.5px] border-[#ECDCBF] bg-[#ECDCBF] flex items-center justify-center"></div>
            <div className="absolute w-[40px] h-[17px] top-[782.49px] left-[135.54px] font-inter font-bold text-[14.25px] text-[#8A6A3C] leading-none">
                조건부
            </div>
            <div className="absolute w-[166.5px] h-[52.5px] top-[851.34px] left-[62.25px] border border-[2px] border-[#E4E4E7] flex items-center justify-center rounded-[12px]"></div>
            <div onClick={()=>{setCount(count=>(count>0 ?count-1:0))}}
            className="absolute w-[48px] h-[51px] top-[852.09px] left-[63px] bg-[#FFFFFF]"></div>
            <div className="absolute whitespace-nowrap flex w-[16px] h-[29px] top-[860.79px] left-[79px] font-inter font-normal text-[24px] leading-none text-[#52525B]">−</div>
            <div className="absolute w-[0px] h-[51px] top-[852.09px] left-[111.75px] text-[#000000] border-[1.5px] border-[#E4E4E7] flex items-center"></div>
            <div className="absolute whitespace-nowrap flex w-[12px] h-[23px] top-[862.82px] left-[139.64px] font-SplineSansMono font-bold text-[19.5px] leading-none text-[#27272A] flex items-center justify-center">{count}</div>
            <div className="absolute w-[0px] h-[51px] top-[852.09px] left-[175.25px] text-[#000000] border-[1.5px] border-[#E4E4E7] flex items-center justify-center"></div>
            <button onClick={()=>{setCount(count=>count+1)}}
            className="absolute w-[48px] h-[51px] top-[852.09px] left-[180px] bg-[#FFFFFF]"></button>
            <div className="absolute whitespace-nowrap flex w-[16px] h-[29px] top-[860.79px] left-[196px] font-inter font-normal text-[24px] leading-none text-[#52525B]">+</div>

            <div onClick={()=>{setCount3("setcount3")}}
            className={`absolute w-[38.93px] h-[44.25px] top-[855.47px] left-[242.25px] border border-[1.5px]  flex items-center justify-center rounded-[12px] ${
            count3==="setcount3"? "border-[#6366F1] bg-[#6366F1]" : "border-[#E4E4E7] bg-[#FFFFFF]"}`}></div>
            <div className={`absolute whitespace-nowrap flex w-[11px] h-[20px] top-[864.92px] left-[256.5px] font-inter font-bold text-[16.5px] leading-none  flex items-center justify-center ${
            count3==="setcount3"? "text-[#FFFFFF]" : "text-[#9A9AA3]"}`}>3</div>

            <div onClick={()=>{setCount3("setcount5")}}
            className={`absolute w-[38.93px] h-[44.25px] top-[855.47px] left-[295.68px] border border-[1.5px] flex items-center justify-center rounded-[12px] ${
            count3==="setcount5"? "border-[#6366F1] bg-[#6366F1]" : "border-[#E4E4E7] bg-[#FFFFFF]"}`}></div>
            <div className={`absolute whitespace-nowrap flex w-[11px] h-[20px] top-[864.92px] left-[308.93px] font-inter font-bold text-[16.5px] leading-none  flex items-center justify-center ${
            count3==="setcount5"? "text-[#FFFFFF]" : "text-[#9A9AA3]"}`}>5</div>

            <div onClick={()=>{setCount3("setcount7")}}
            className={`absolute w-[37.88px] h-[44.25px] top-[855.47px] left-[346.88px] border border-[1.5px] flex items-center justify-center rounded-[12px] ${
            count3==="setcount7"? "border-[#6366F1] bg-[#6366F1]" : "border-[#E4E4E7] bg-[#FFFFFF]"}`}></div>
            <div className={`absolute whitespace-nowrap flex w-[10px] h-[20px] top-[864.92px] left-[361.13px] font-inter font-bold text-[16.5px] leading-none  flex items-center justify-center ${
            count3==="setcount7"? "text-[#FFFFFF]" : "text-[#9A9AA3]"}`}>7</div>

            <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[919.52px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
                예상 질문
             </div>
             <div className="absolute  w-[27px] h-[17px] top-[921.62px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">
                선택
             </div>

             <div className="absolute w-[152px] h-[22px] top-[956.87px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A] whitespace-nowrap">Q&A 예상 질문 추가</div>
            <div onClick={() => setControll(controll => !controll)}
            className={`absolute w-[49.5px] h-[28.5px] top-[955.22px] left-[572.25px] border border-[1.5px]  rounded-[15px] ${
            controll
            ?"border-[#6366F1] bg-[#6366F1]"
            : "border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>

            <div className="absolute w-[657px] h-[85.5px] top-[1018.97px] left-[1.5px] border-[1.5px] border-[#FFFFFF]"></div>
            <hr className="absolute w-[657px] h-[0px] top-[1019.72px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
            <div className=" absolute w-[166px] h-[20px] top-[1049.79px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">3분 · 슬라이드 5장 기준</div>
            <div
            onClick={() => setSave3(!save3)}
            className={`absolute w-[69.91px] h-[46.5px] top-[1039.22px] left-[566.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              save3
                ? "bg-[#6366F1] border-[#6366F1]"
                : "bg-[#FFFFFF] border-[#E4E4E7]"
              }`}
            ></div>

            <div
              onClick={() => setSave3(!save3)}
              className={`absolute w-[35px] h-[23px] top-[1049.34px] left-[584.29px] font-inter font-bold text-[18.75px] leading-none flex items-center justify-center ${
                save3
                  ? "text-[#FFFFFF]"
                  : "text-[#27272A]"
              }`}
            >
            출력
          </div>

          </div>
    </div>
  );
}