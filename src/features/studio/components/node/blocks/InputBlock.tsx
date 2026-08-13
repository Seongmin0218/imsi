import {useState} from "react";
export default function InputBlock() {
  const [text, setText] = useState("");
  const [inputType, setInputType] = useState("direct");
  const [goal, setGoal]=useState("goal2");
  const [controll,setControll]=useState(false);
  const [request, setRequest]=useState("Request2");
  const [priority, setPriority]=useState("");
  const [output, setOutput]=useState(false);
  return (
  
  <div className="relative w-[600px] h-[2004px] bg-[#FFFFFF]">

    
    <div className="absolute w-[598.5px] h-[2002.13px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7]  bg-[#FFFFFF]">
      {/* 소개 */} 
      <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#4A5E8A] flex items-center justify-center rounded-[12px]">
        <div className="w-[11px] h-[25px] top-[35.92px] left-[41.46px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF]">
          1
        </div>
      </div>

      <div className="absolute whitespace-nowrap w-[89px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-SplineSansMono leading-none text-[#27272A]">
        입력 노드
      </div>

      <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-normal text-[15px] leading-none text-[#9A9AA3] ">
        INPUT · 9 blocks
      </div>

      <div className="absolute w-[70.01px] h-[30px] top-[36.38px] left-[430.34px] border border-[1.5px] border-dashed border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[10px]"> 
        <div className="w-[46px] h-[18px] top-[40.13px] left-[443.09px] font-bold font-inter leading-none text-[15px] text-[#52525B]"> INPUT </div> 
      </div>

      <div className="absolute w-[64.41px] h-[30px] top-[36.38px] left-[510.84px] border border-[1.5px] border-[#E9C9C9] bg-[#FBF1F0] flex items-center justify-center rounded-[10px]">
        <div className="w-[46px] h-[18px] top-[40.13px] left-[523.59px] font-bold text-[15px] font-inter leading-none text-[#B4453A] flex items-center justify-center">
          미완성
        </div>
      </div>

      <div className="absolute whitespace-nowrap w-[550px] h-[21px] top-[93.67px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
        이 노드에 부착된 블록입니다. 각 블록을 펼쳐 옵션을 설정하세요. 필수 옵션은
      </div>

      <div className="absolute whitespace-nowrap w-[85px] h-[21px] top-[119.55px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
        표시됩니다.
      </div>

      <div className="absolute w-[109.01px] h-[30px] top-[159.75px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[10px]">
        <div className="whitespace-nowrap w-[88px] h-[18px] top-[163.5px] left-[37.5px] font-inter font-bold leading-none text-[#52525B]">
          필수 3/3 배치
        </div>
      </div>

      <div className="absolute w-[74.88px] h-[30px] top-[159.75px] left-[144.26px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[10px]">
        <div className="whitespace-nowrap w-[53px] h-[18px] top-[163.5px] left-[157.01px] font-inter font-bold leading-none text-[#52525B]">
          미입력 1
        </div>
      </div>

      <div className="absolute w-[64.52px] h-[30px] top-[159.75px] left-[229.64px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[10px]">
        <div className="whitespace-nowrap w-[41px] h-[18px] top-[163.5px] left-[242.39px] font-inter font-bold leading-none text-[#52525B]">
          선택 6
        </div>
      </div>

      <hr className=" absolute w-[597px] h-0 top-[212.25px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

      <div className="absolute w-[561px] h-[504.75px] top-[229.5px] left-[19.5px] bg-[#FFFFFF]"></div>
      
        <div className="absolute w-[22.5px] h-[22.5px] top-[244.5px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

        <div className="absolute w-[130px] h-[23px] top-[242.63px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          사용자 요청 받기
        </div>

        <div className="absolute w-[25px] h-[16px] top-[246.3px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
          필수
        </div>

        <div className="absolute w-[10px] h-[22px] top-[243.9px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
          ⌄
        </div>

        <div className="absolute whitespace-nowrap w-[84px] h-[21px] top-[280.42px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
          사용자 요청
          <span className=" w-[10px] h-[21px] top-[280.42px] left-[125.04px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
            *
          </span>
        </div>

        <div>
          <textarea
            placeholder="분석하거나 작성할 내용을 입력하세요"
            className=" absolute w-[523.5px] h-[88.5px] border pt-[10px] pl-[5px] rounded-[12px] border-[#E4E4E7] top-[316.13px] left-[38.25px] "
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={2000}
          />

          <div className="absolute w-[72px] h-[18px] top-[414.38px] left-[490.5px] font-SplineSansMono font-normal text-[15px] leading-none text-[#9A9AA3]">
            {text.length}/2000
          </div>
        </div>
    </div>
        
      
      {/* 입력 방식 */}
        <div >
          <div className="absolute whitespace-nowrap flex w-[68px] h-[21px] top-[451.8px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            입력 방식
            <span className="w-[10px] h-[21px] top-[451.8px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
              *
            </span>
          </div>

          <div className="absolute overflow-hidden w-[523.5px] h-[48.38px] top-[487.5px] left-[38.25px] border border-[#E4E4E7] border-[1.5px] rounded-[12px]">

          {/* 직접 입력 */}
          <div
            onClick={() => setInputType("direct")}
            className={`absolute w-[172.99px] h-[46.88px] top-[0.75px] left-[0.75px] flex items-center justify-center cursor-pointer rounded-tl-[12px] rounded-bl-[12px] ${
              inputType === "direct" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          >
            <div
              className={`w-[68px] h-[21px] font-inter font-bold text-[17.25px] leading-none ${
                inputType === "direct"
                  ? "text-[#FFFFFF]"
                  : "text-[#52525B]"
              }`}
            >
              직접 입력
            </div>
          </div>

          <div className="absolute w-[0px] h-[46.88px] top-[0.75px] left-[174.49px] border-[1.5px] border-[#E4E4E7]"></div>

          {/* 이전 값 */}
          <div
            onClick={() => setInputType("previous")}
            className={`absolute w-[172.99px] h-[46.88px] top-[0.75px] left-[173.74px] flex items-center justify-center cursor-pointer ${
              inputType === "previous" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          >
            <div
              className={`w-[52px] h-[21px] font-inter font-bold text-[17.25px] leading-none ${
                inputType === "previous"
                  ? "text-[#FFFFFF]"
                  : "text-[#52525B]"
              }`}
            >
              이전 값
            </div>
          </div>

          <div className="absolute w-[0px] h-[46.88px] top-[0.75px] left-[349.01px] border-[1.5px] border-[#E4E4E7]"></div>

          {/* 예시 입력 */}
          <div
            onClick={() => setInputType("example")}
            className={`absolute w-[174.49px] h-[46.88px] top-[0.75px] left-[349.01px] flex items-center justify-center cursor-pointer rounded-tr-[12px] rounded-br-[12px] ${
              inputType === "example" ? "bg-[#6366F1]" : "bg-[#FFFFFF]"
            }`}
          >
            <div
              className={`w-[68px] h-[21px] font-inter font-bold text-[17.25px] leading-none ${
                inputType === "example"
                  ? "text-[#FFFFFF]"
                  : "text-[#52525B]"
              }`}
            >
              예시 입력
            </div>
          </div>


          </div>
            {/* 요청 정리 수준 */}
            
              <div className="absolute w-[104px] h-[21px] top-[551.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B] ">요청 정리 수준</div>
              <div className="absolute w-[27px] h-[17px] top-[553.65px] left-[537.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3] flex items-center justify-center">선택</div>

              <div onClick={()=>setRequest("Request1")}
              className={`absolute w-[101.25px] h-[48.38px] top-[587.25px] left-[38.25px] border-[1.5px] rounded-[12px] ${
              request==="Request1"? "bg-[#6366F1] border-[#6366F1] " : "border-[#E4E4E7] bg-[#FFFFFF] "}`}></div>
              <div onClick={()=>setRequest("Request1")}
              className={`absolute w-[68px] h-[21px] top-[598.43px] left-[57px] font-inter font-bold text-[17.25px] leading-none  flex items-center justify-center ${
              request=="Request1"? "text-[#FFFFFF]" : "text-[#666666]"}`}>원문 유지</div>
              

              <div onClick={() => setRequest("Request2")}
              className={`absolute w-[110px] h-[48.88px] top-[587.25px] left-[148px] border border-[1.5px] rounded-[10px] ${
                request === "Request2"
                  ? "bg-[#6366F1] border-[#6366F1]"
                  : "border-[#E4E4E7] bg-[#FFFFFF]"
              }`}></div>
              <div onClick={() => setRequest("Request2")}
              className={`absolute w-[68px] h-[21px] top-[598.43px] left-[168.75px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center ${
                request === "Request2"
                  ? "text-[#FFFFFF]"
                  : "text-[#52525B]"
              }`}>핵심 정리</div>
              

              <div
              onClick={() => setRequest("Request3")}
              className={`absolute w-[116.16px] h-[48.38px] top-[587.25px] left-[261.61px] border-[1.5px] rounded-[12px] ${
                request === "Request3"
                  ? "bg-[#6366F1] border-[#6366F1]"
                  : "border-[#E4E4E7] bg-[#FFFFFF]"
              }`}></div>

            <div
              onClick={() => setRequest("Request3")}
              className={`absolute w-[84px] h-[21px] top-[598.43px] left-[280.36px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center ${
                request === "Request3"
                  ? "text-[#FFFFFF]"
                  : "text-[#52525B]"
              }`}>지시문 변환</div>
              
            

            {/* 원문 유지 */}
            <div>
              <div className="absolute w-[68px] h-[21px] top-[651.3px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">원문 유지</div>
              <div className="absolute w-[27px] h-[17px] top-[653.4px] left-[537.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

              <div className="absolute w-[195px] h-[22px] top-[688.65px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A]">
                입력한 표현을 그대로 보존
              </div>
              <div onClick={()=>setControll(controll=>!controll)} className={`absolute w-[49.5px] h-[28.5px] top-[687px] left-[512.25px] border border-[1.5px] rounded-[15px] ${controll?"border-[#6366F1] bg-[#6366F1]":"border-[#E4E4E7] bg-[#E7E7EC]"}`}></div>
            </div>
          

          {/* 목표 정하기 */}
          <div className="reltaive flex w-[561px] h-[504.38px] top-[750.75px] left-[19.5px] bg-[#FFFFFF]">
            <div className="absolute  w-[22.5px] h-[22.5px] top-[765.75px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[91px] h-[23px] top-[763.88px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
              목표 정하기
            </div>
            <div className="absolute w-[25px] h-[16px] top-[767.55px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
              필수
            </div>

            <div className="absolute w-[10px] h-[22px] top-[765.15px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">⌄</div>
          

            {/* 작업 목표 */}
            <div className="absolute w-[123.38px] h-[93.19px] top-[836.63px] left-[37.5px] bg-[#FFFFFF]"></div>
            <div onClick={()=>setGoal("goal1")} className={`absolute w-[121.88px] h-[91.69px] top-[837.38px] left-[38.25px] border border-[1.5px] rounded-[12px]
            ${goal === "goal1"?"border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
            <div className="absolute w-[36px] h-[36px] top-[851.63px] left-[81.19px] bg-[#F0F0F3]"></div>
            <div className="absolute w-[21px] h-[21px] top-[854.18px] left-[88.68px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center text-[#27272A]">🔍</div>
            <div className="absolute w-[62px] h-[19px] top-[893.85px] left-[68.18px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">정보 파악</div>

            <div onClick={()=>setGoal("goal2")} className={`absolute w-[121.88px] h-[91.69px] top-[837.38px] left-[172.13px] border border-[1.5px] rounded-[12px]
              ${goal === "goal2"?"border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
            <div className="absolute w-[36px] h-[36px] top-[851.63px] left-[215.06px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[854.18px] left-[222.56px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center text-[#27272A]">🗂</div>
            <div className="absolute w-[29px] h-[19px] top-[893.85px] left-[218.56px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">정리</div>

            <div onClick={()=>setGoal("goal3")} className={`absolute w-[121.88px] h-[91.69px] top-[837.38px] left-[306px] border border-[1.5px] flex items-center rounded-[12px]
            ${goal === "goal3"?"border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
            <div className="absolute w-[36px] h-[36px] top-[851.63px] left-[348.94px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[854.18px] left-[356.43px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center text-[#27272A]">⚖️</div>
            <div className="absolute w-[29px] h-[19px] top-[893.85px] left-[352.44px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">비교</div>
            

            <div onClick={()=>setGoal("goal4")} className={`absolute w-[121.88px] h-[91.69px] top-[837.38px] left-[439.88px] border border-[1.5px] flex items-center rounded-[12px]
              ${goal === "goal4"?"border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
            <div className="absolute w-[36px] h-[36px] top-[851.63px] left-[482.81px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[854.18px] left-[490.3px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center text-[#27272A]">💡</div>
            <div className="absolute w-[58px] h-[19px] top-[893.85px] left-[471.81px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">아이디어</div>
        

            <div onClick={()=>setGoal("goal5")} className={`absolute w-[121.88px] h-[91.69px] top-[941.06px] left-[38.25px] border border-[1.5px] flex items-center rounded-[12px]
              ${goal === "goal5"?"border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
            <div className="absolute w-[36px] h-[36px] top-[955.31px] left-[81.19px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[957.86px] left-[88.68px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center text-[#27272A]">✍️</div>
            <div className="absolute w-[29px] h-[19px] top-[997.54px] left-[84.69px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">작성</div>


            <div onClick={()=>setGoal("goal6")} className={`absolute w-[121.88px] h-[91.69px] top-[941.06px] left-[172.13px] border border-[1.5px] flex items-center rounded-[12px]
              ${goal === "goal6"?"border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
            <div className="absolute w-[36px] h-[36px] top-[955.31px] left-[215.06px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[957.86px] left-[222.55px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center text-[#27272A]">🔎</div>
            <div className="absolute w-[29px] h-[19px] top-[997.54px] left-[218.56px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">검토</div>

            <div onClick={()=>setGoal("goal7")} className={`absolute w-[121.88px] h-[91.69px] top-[941.06px] left-[306px] border border-[1.5px] flex items-center rounded-[12px]
              ${goal === "goal7"?"border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
            <div className="absolute w-[36px] h-[36px] top-[955.31px] left-[348.94px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[957.86px] left-[356.43px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center text-[#27272A]">✅</div>
            <div className="absolute w-[29px] h-[19px] top-[997.54px] left-[352.44px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">결정</div>
            

            <div onClick={()=>setGoal("goal8")} className={`absolute w-[121.88px] h-[91.69px] top-[941.06px] left-[439.88px] border border-[1.5px] flex items-center rounded-[12px]
              ${goal === "goal8"?"border-[#6366F1]" : "border-[#E4E4E7]"}`}></div>
            <div className="absolute w-[36px] h-[36px] top-[955.31px] left-[482.81px]"></div>
            <div className="absolute w-[21px] h-[25px] top-[957.86px] left-[490.31px] font-inter font-normal text-[21px] leading-none flex items-center justify-center text-center text-[#27272A]">＋</div>
            <div className="absolute w-[29px] h-[19px] top-[997.54px] left-[486.31px] font-inter font-bold text-[15.75px] leading-none flex items-center text-[#52525B]">직접</div>
          

            {/* 완료 기준 */}
            <div className="absolute w-[68px] h-[21px] top-[1048.43px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
              완료 기준
            </div>
            <div className="absolute w-[27px] h-[17px] top-[1050.53px] left-[537.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

            <input
              type="text"
              placeholder="예: 비교표가 완성되면 종료"
              className="absolute w-[525px] h-[54px] top-[1083.38px] left-[37.5px] bg-[#FFFFFF] border border-[1.5px] border-[#E4E4E7] rounded-[12px]"
            />
            {/* 우선 기준 */}
            <div className="absolute w-[68px] h-[21px] top-[1152.3px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">우선 기준</div>
            <div className="absolute w-[27px] h-[17px] top-[1154.4px] left-[537.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>
          
            <div
              onClick={() => setPriority("accuracy")}
              className={`absolute w-[67.33px] h-[48.38px] top-[1188px] left-[46.2px] border border-[1.5px] rounded-[12px] ${
                priority === "accuracy"
                  ? "bg-[#6366F1] border-[#6366F1]"
                  : "border-[#E4E4E7] bg-[#FFFFFF]"
              }`}
            ></div>
            <div
              onClick={() => setPriority("accuracy")}
              className={`absolute w-[48px] h-[21px] top-[1199.18px] left-[57px] font-inter flex items-center justify-center font-bold text-[17.25px] leading-none ${
                priority === "accuracy"
                  ? "text-[#FFFFFF]"
                  : "text-[#52525B]"
              }`}
            >
              정확성
            </div>

            <div
              onClick={() => setPriority("speed")}
              className={`absolute w-[67.33px] h-[48.38px] top-[1188px] left-[130.99px] border border-[1.5px] rounded-[12px] ${
                priority === "speed"
                  ? "bg-[#6366F1] border-[#6366F1]"
                  : "border-[#E4E4E7] bg-[#FFFFFF]"
              }`}
            ></div>
            <div
              onClick={() => setPriority("speed")}
              className={`absolute w-[32px] h-[21px] top-[1199.18px] left-[149.74px] font-inter font-bold flex items-center justify-center text-[17.25px] leading-none ${
                priority === "speed"
                  ? "text-[#FFFFFF]"
                  : "text-[#52525B]"
              }`}
            >
              속도
            </div>

            <div
              onClick={() => setPriority("simple")}
              className={`absolute w-[82.24px] h-[48.38px] top-[1188px] left-[208.83px] border border-[1.5px] rounded-[12px] ${
                priority === "simple"
                  ? "bg-[#6366F1] border-[#6366F1]"
                  : "border-[#E4E4E7] bg-[#FFFFFF]"
              }`}
            ></div>
            <div
              onClick={() => setPriority("simple")}
              className={`absolute w-[48px] h-[21px] top-[1199.18px] left-[227.58px] font-inter font-bold flex items-center justify-center text-[17.25px] leading-none ${
                priority === "simple"
                  ? "text-[#FFFFFF]"
                  : "text-[#52525B]"
              }`}
            >
              간결성
            </div>

            <div
              onClick={() => setPriority("complete")}
              className={`absolute w-[82.23px] h-[48.38px] top-[1188px] left-[301.57px] border border-[1.5px] rounded-[12px] ${
                priority === "complete"
                  ? "bg-[#6366F1] border-[#6366F1]"
                  : "border-[#E4E4E7] bg-[#FFFFFF]"
              }`}
            ></div>
            <div
              onClick={() => setPriority("complete")}
              className={`absolute w-[48px] h-[21px] top-[1199.18px] left-[320.32px] font-inter font-bold flex items-center justify-center text-[17.25px] leading-none ${
                priority === "complete"
                  ? "text-[#FFFFFF]"
                  : "text-[#52525B]"
              }`}
            >
              완성도
            </div>

          {/* 주제 입력하기 */}
          <div className="absolute w-[561px] h-[52.5px] top-[1271.63px] left-[19.5px] bg-[#FFFFFF]"></div>
          <div className="absolute w-[22.5px] h-[22.5px] top-[1286.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>
          <div className="absolute w-[108px] h-[23px] top-[1284.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          주제 입력하기
          </div>

          <div className="absolute w-[173px] h-[19px] top-[1286.85px] left-[240.26px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
          전기차 · 시장 · 키워드 3
          </div>

          <div className="absolute w-[25px] h-[16px] top-[1288.43px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
          필수
          </div>
          <div className="absolute w-[10px] h-[22px] top-[1284.52px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>
   

          <div className="absolute w-[561px] h-[214.5px] top-[1340.63px] left-[19.5px] bg-[#FDFAF3]"></div>
          <div className="absolute w-[22.5px] h-[22.5px] top-[1427.63px] left-[73.5px] bg-[#6366F1] rounded-[6px]"></div>
          <div className="absolute w-[130px] h-[23px] top-[1425.75px] left-[108px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          파일 업로드 받기
          </div>

          <div className="absolute w-[150px] h-[19px] top-[1427.85px] left-[263.13px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#B4453A]">
            필수 · 파일 없음 →
          </div>

          <div className="absolute w-[25px] h-[16px] top-[1429.43px] left-[464.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
          </div>
          <div className="absolute w-[10px] h-[22px] top-[1425.53px] left-[516px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>
          
          <div className="absolute w-[561px] h-[52.5px] top-[1571.63px] left-[19.5px] bg-[#FFFFFF]"></div>
          <div className="absolute w-[22.5px] h-[22.5px] top-[1655.63px] left-[37.5px] bg-[#6366F1]"></div>
          <div className="absolute w-[164px] h-[23px] top-[1584.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            필요한 문서 확인하기
          </div>

          <div className="absolute w-[144px] h-[19px] top-[1586.85px] left-[269.88px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
            업로드 문서 · 필수 ON
          </div>

          <div className="absolute w-[25px] h-[16px] top-[1588.43px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
          </div>
          <div className="absolute w-[10px] h-[22px] top-[1584.53px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>

          <div className="absolute w-[561px] h-[52.5px] top-[1640.63px] left-[19.5px] bg-[#FFFFFF]"></div>
          <div className="absolute w-[22.5px] h-[22.5px] top-[1655.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>
          <div className="absolute w-[164px] h-[23px] top-[1653.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            필요한 스킬 확인하기
          </div>

          <div className="absolute w-[144px] h-[19px] top-[1655.85px] left-[282.47px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
            요약·비교 · 순서 3
          </div>

          <div className="absolute w-[25px] h-[16px] top-[1657.43px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
          </div>
          <div className="absolute w-[10px] h-[22px] top-[1653.53px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>
          
          <div className="absolute w-[559.5px] h-[51px] top-[1710.38px] left-[20.25px] border-[#E4E4E7] border-[1.5px]"></div>
          <div className="absolute w-[21px] h-[21px] top-[1725.38px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
          <div className="absolute w-[130px] h-[23px] top-[1722.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            대상 독자 정하기
          </div>

          <div className="absolute w-[101px] h-[19px] top-[1724.85px] left-[288.33px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
            실무자 · 기본
          </div>

          <div className="absolute w-[44.33px] h-[19.5px] top-[1726.13px] left-[489.66px] bg-[#F0F0F3] rounded-[4px]"></div>
          <div className=" absolute w-[25px] h-[16px] top-[1726.43px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
            선택
          </div>
          <div className="absolute w-[10px] h-[22px] top-[1722.53px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>
        

          <div className="absolute w-[559.5px] h-[51px] top-[1779.38px] left-[20.25px] border-[#E4E4E7] border-[1.5px] flex items-center"></div>
          <div className="absolute w-[21px] h-[21px] top-[1794.38px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
          <div className="absolute w-[169px] h-[23px] top-[1791.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            결과 사용 상황 정하기
          </div>

          <div className="absolute w-[87px] h-[19px] top-[1793.85px] left-[314.55px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
            보고 · 문서
          </div>

          <div className="absolute w-[44.33px] h-[19.5px] top-[1795.13px] left-[489.66px] bg-[#F0F0F3] rounded-[4px]"></div>
          <div className=" absolute w-[25px] h-[16px] top-[1795.43px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
            선택
          </div>
          <div className="absolute w-[10px] h-[22px] top-[1791.53px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>

          <div className="absolute w-[559.5px] h-[51px] top-[1848.38px] left-[20.25px] border-[#E4E4E7] border-[1.5px]"></div>
          <div className="absolute w-[21px] h-[21px] top-[1863.38px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
          <div className="absolute w-[143px] h-[23px] top-[1860.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            제약조건 입력하기
          </div>

          <div className="absolute w-[101px] h-[19px] top-[1862.85px] left-[294.26px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
            보통 · 존댓말
          </div>

          <div className="absolute w-[44.33px] h-[19.5px] top-[1864.13px] left-[489.66px] bg-[#F0F0F3] rounded-[4px]"></div>
          <div className=" absolute w-[25px] h-[16px] top-[1864.43px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
            선택
          </div>
          <div className="absolute w-[10px] h-[22px] top-[1860.53px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>

          <div className="w-[597px] h-[85.5px] top-[1916.63px] left-[1.5px] bg-[#FFFFFF]">
            <hr className="absolute w-[597px] h-[0px] top-[1917.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7] " />
            <div className=" absolute w-[358px] h-[20px] top-[1947.45px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">필수 옵션 1개 미입력 — “파일 업로드”를 확인하세요</div>
            <div
            onClick={() => setOutput(!output)}
            className={`absolute w-[69.91px] h-[46.5px] top-[1936.88px] left-[506.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
              output
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7] bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setOutput(!output)}
            className={`absolute w-[35px] h-[23px] top-[1947px] left-[524.29px] font-inter font-bold text-[16.5px] leading-none flex items-center justify-center ${
              output
                ? "text-[#FFFFFF]"
                : "text-[#27272A]"
            }`}
          >
            검증
          </div>
          </div>
        </div>
    </div>
  </div>  
  );
}