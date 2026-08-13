import {useState} from "react";
export default function Default9() {
  const [form, setForm] = useState("form1");
  const [save3, setSave3]=useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [sentence, setSentence] = useState("blank");
  const [title, setTitle] = useState(true);
  const [keyword, setKeyword] = useState(true);
  return (
      <div className="absolute w-[658.5px] h-[1295.53px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7] bg-[#FFFFFF]">
        {/* 소개 */}
        <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]">
          <div className="w-[21px] h-[25px] top-[35.93px] left-[36.77px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF]">
            ⌘
          </div>
        </div>

        <div className="absolute whitespace-nowrap w-[192px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-SplineSansMono leading-none text-[#27272A]">
          프롬프트로 출력하기
        </div>

        <div className="absolute w-[144px] h-[18px] top-[57.75px] left-[84px] font-normal text-[15px] leading-none text-[#9A9AA3]">
          OUT-007 · OUTPUT
        </div>

        
          <div className="absolute w-[43px] h-[18px] top-[40.13px] left-[581.51px] font-bold font-inter text-[15px] leading-none text-[#6366F1]">
            CORE
          </div>

        <div className="absolute whitespace-nowrap w-[326px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
          결과를 재사용 가능한 프롬프트로 출력합니다.</div>

        <div className="absolute w-[61.92px] h-[30px] top-[133.88px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[39px] h-[18px] top-[137.63px] left-[37.5px] font-inter font-bold leading-none text-[#52525B]">
            필수 1
          </div>
        </div>

        <div className="absolute w-[64.76px] h-[30px] top-[133.88px] left-[97.17px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[42px] h-[18px] top-[137.63px] left-[109.92px] font-inter font-bold leading-none text-[#52525B]">
            선택 4
          </div>
        </div>

        <hr className="absolute w-[657px] h-0 top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

        <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

          <div className="absolute whitespace-nowrap w-[160px] h-[23px] top-[216.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            프롬프트로 출력하기
          </div>

          <div className="absolute w-[25px] h-[16px] top-[220.42px] left-[560.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
          </div>

          <div className="absolute w-[10px] h-[22px] top-[218.02px] left-[612px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>

          <div className="absolute whitespace-nowrap w-[32px] h-[21px] top-[254.55px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            형식
            <span className="w-[10px] h-[21px] top-[254.55px] left-[76.34px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
              *
            </span>
          </div>
            <div
            onClick={() => setForm("form1")}
            className={`absolute w-[583.5px] h-[59.63px] top-[290.25px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
              form === "form1" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            onClick={() => setForm("form1")}
            className={`absolute w-[22.5px] h-[22.5px] top-[308.25px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form1"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute w-[35px] h-[23px] top-[305.63px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            일반
          </div>


          <div
            onClick={() => setForm("form2")}
            className={`absolute w-[583.5px] h-[84.66px] top-[361.88px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
              form === "form2" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            onClick={() => setForm("form2")}
            className={`absolute w-[22.5px] h-[22.5px] top-[379.88px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form2"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute w-[52px] h-[23px] top-[377.25px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            역할형
          </div>

          <div className="absolute whitespace-nowrap w-[96px] h-[19px] top-[407.48px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">
            역할·지시 구조
          </div>


          <div
            onClick={() => setForm("form3")}
            className={`absolute w-[583.5px] h-[59.63px] top-[458.53px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
              form === "form3" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            onClick={() => setForm("form3")}
            className={`absolute w-[22.5px] h-[22.5px] top-[476.53px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form3"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute w-[52px] h-[23px] top-[473.91px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            단계형
          </div>


          <div
            onClick={() => setForm("form4")}
            className={`absolute w-[583.5px] h-[59.63px] top-[530.16px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
              form === "form4" ? "border-[#6366F1]" : "border-[#E4E4E7]"
            }`}
          ></div>

          <div
            onClick={() => setForm("form4")}
            className={`absolute w-[22.5px] h-[22.5px] top-[548.16px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
              form === "form4"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7]"
            }`}
          ></div>

          <div className="absolute w-[69px] h-[23px] top-[545.53px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            템플릿형
          </div>


            <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[605.46px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
                변수 블록
            </div>
            <span className="absolute w-[27px] h-[17px] top-[607.56px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">
                선택
            </span>

            <div className="absolute w-[91.34px] h-[40.5px] top-[641.16px] left-[38.25px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

            <div
              onClick={() => setChecked1(prev => !prev)}
              className={`absolute w-[18px] h-[18px] top-[652.41px] left-[56.25px] rounded-[5px] flex items-center justify-center cursor-pointer ${
                checked1
                  ? "bg-[#6366F1]"
                  : "border border-[1.5px] border-[#52525B]"
              }`}
            >
              {checked1 && (
                <div className=" w-[11px] h-[15px] top-[648.39px] left-[70px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
                  ✓
                </div>
              )}
            </div>

            <div
              onClick={() => setChecked1(prev => !prev)}
              className={`absolute w-[32px] h-[21px] top-[648.39px] left-[82.5px] font-inter font-bold text-[17.25px] leading-none flex items-center cursor-pointer ${
                checked1 ? "text-[#6366F1]" : "text-[#52525B]"
              }`}
            >
              주제
            </div>


            <div className="absolute w-[91.34px] h-[40.5px] top-[641.16px] left-[140.09px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

            <div
              onClick={() => setChecked2(prev => !prev)}
              className={`absolute w-[18px] h-[18px] top-[652.41px] left-[158.09px] rounded-[5px] flex items-center justify-center cursor-pointer ${
                checked2
                  ? "bg-[#6366F1]"
                  : "border border-[1.5px] border-[#52525B]"
              }`}
            >
              {checked2 && (
                <div className="w-[11px] h-[15px] top-[648.39px] left-[172.34px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
                  ✓
                </div>
              )}
            </div>

            <div
              onClick={() => setChecked2(prev => !prev)}
              className={`absolute w-[32px] h-[21px] top-[648.39px] left-[184.34px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                checked2 ? "text-[#6366F1]" : "text-[#52525B]"
              }`}
            >
              문서
            </div>


            <div className="absolute w-[91.34px] h-[40.5px] top-[641.16px] left-[241.92px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

            <div
              onClick={() => setChecked3(prev => !prev)}
              className={`absolute w-[18px] h-[18px] top-[652.41px] left-[259.92px] rounded-[5px] flex items-center justify-center cursor-pointer ${
                checked3
                  ? "bg-[#6366F1]"
                  : "border border-[1.5px] border-[#52525B]"
              }`}
            >
              {checked3 && (
                <div className=" w-[11px] h-[15px] top-[648.39px] left-[274.17px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
                  ✓
                </div>
              )}
            </div>

            <div
              onClick={() => setChecked3(prev => !prev)}
              className={`absolute w-[32px] h-[21px] top-[648.39px] left-[286.17px] font-inter font-bold text-[15.75px] leading-none flex items-center justify-center cursor-pointer ${
                checked3 ? "text-[#6366F1]" : "text-[#52525B]"
              }`}
            >
              역할
            </div>


            <div className="absolute w-[91.34px] h-[40.5px] top-[641.16px] left-[343.76px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

            <div
              onClick={() => setChecked4(prev => !prev)}
              className={`absolute w-[18px] h-[18px] top-[652.41px] left-[361.76px] rounded-[5px] flex items-center justify-center cursor-pointer ${
                checked4
                  ? "bg-[#6366F1]"
                  : "border border-[1.5px] border-[#52525B]"
              }`}
            >
              {checked4 && (
                <div className=" w-[11px] h-[15px] top-[648.39px] left-[376.01px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
                  ✓
                </div>
              )}
            </div>

            <div
              onClick={() => setChecked4(prev => !prev)}
              className={`absolute w-[32px] h-[21px] top-[648.39px] left-[388.01px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                checked4 ? "text-[#6366F1]" : "text-[#52525B]"
              }`}
            >
              분량
            </div>


            <div className="absolute w-[91.34px] h-[40.5px] top-[641.16px] left-[445.59px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

            <div
              onClick={() => setChecked5(prev => !prev)}
              className={`absolute w-[18px] h-[18px] top-[652.41px] left-[463.59px] rounded-[5px] flex items-center justify-center cursor-pointer ${
                checked5
                  ? "bg-[#6366F1]"
                  : "border border-[1.5px] border-[#52525B]"
              }`}
            >
              {checked5&& (
                <div className="w-[11px] h-[15px] top-[648.39px] left-[477.84px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
                  ✓
                </div>
              )}
            </div>

            <div
              onClick={() => setChecked5(prev => !prev)}
              className={`absolute w-[32px] h-[21px] top-[648.39px] left-[489.84px] font-inter font-bold text-[17.25px] leading-none flex items-center cursor-pointer ${
                checked5 ? "text-[#6366F1]" : "text-[#52525B]"
              }`}
            >
              출력
            </div>

            <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[697.33px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
                변수 표기
            </div>
            <span className="absolute w-[27px] h-[17px] top-[699.43px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">
                선택
            </span>

            
            <div
            onClick={() => setSentence("one")}
            className={`absolute w-[86.32px] h-[48.38px] top-[733.03px] left-[38.25px] border border-[1.5px] rounded-[12px] cursor-pointer ${
              sentence === "one"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7] bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSentence("one")}
            className={`absolute w-[46px] h-[21px] top-[744.21px] left-[57px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              sentence === "one"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            {"{변수}"}
          </div>


          <div
            onClick={() => setSentence("two")}
            className={`absolute w-[80.23px] h-[48.38px] top-[733.03px] left-[129.52px] border border-[1.5px] rounded-[12px] cursor-pointer ${
              sentence === "two"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7] bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSentence("two")}
            className={`absolute w-[46px] h-[21px] top-[744.21px] left-[148.27px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              sentence === "two"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            [변수]
          </div>


          <div
            onClick={() => setSentence("blank")}
            className={`absolute w-[67.34px] h-[48.38px] top-[733.03px] left-[220.24px] border border-[1.5px] rounded-[12px] cursor-pointer ${
              sentence === "blank"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7] bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSentence("blank")}
            className={`absolute w-[32px] h-[21px] top-[744.21px] left-[238.99px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              sentence === "blank"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            빈칸
          </div>
          <div className="absolute whitespace-nowrap w-[105px] h-[21px] top-[797.08px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
                사용 안내·예시
            </div>
            <span className="absolute w-[27px] h-[17px] top-[799.18px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">
                선택
            </span>


          <div
            onClick={() => setTitle(title => !title)}
            className={`absolute w-[51px] h-[30px] top-[832.03px] left-[571.5px] border border-[1.5px] rounded-[15px] cursor-pointer ${
              title
                ? "border-[#6366F1] bg-[#6366F1]"
                : "border-[#E4E4E7] bg-[#E7E7EC]"
            }`}
          ></div>


          <div className="absolute whitespace-nowrap w-[108px] h-[22px] top-[834.43px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A]">
            사용 안내 포함
          </div>

          <div
            onClick={() => setKeyword(keyword => !keyword)}
            className={`absolute w-[49.5px] h-[28.5px] top-[892.78px] left-[572.25px] border border-[1.5px] rounded-[15px] cursor-pointer ${
              keyword
                ? "border-[#6366F1] bg-[#6366F1]"
                : "border-[#E4E4E7] bg-[#E7E7EC]"
            }`}
          ></div>


          <div className="absolute whitespace-nowrap w-[71px] h-[22px] top-[894.43px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A]">
            예시 포함
          </div>

          
            
            <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[936.96px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
                최종 편집</div>
            <div className="absolute whitespace-nowrap w-[113px] h-[21px] top-[936.96px] left-[110.11px] font-inter font-bold text-[17.25px] leading-none text-[#9A9AA3]">· 응용 모드 이상</div>
            <div className="absolute whitespace-nowrap w-[27px] h-[17px] top-[939.06px] left-[597.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>
            <div className="absolute w-[523.5px] h-[48.38px] top-[1412.06px] left-[38.25px] border border-[#E4E4E7] rounded-[12px] border-[1.5px]"></div>
            
            <div className="absolute w-[585px] h-[46.5px] top-[971.91px] left-[37.5px] bg-[#26262E] rounded-[12px]"></div>
            <div className="absolute w-[13.5px] h-[13.5px] top-[988.41px] left-[54px] bg-[#4A4A56] rounded-[6px]"></div>
            <div className="absolute w-[135px] h-[18px] top-[983.91px] left-[87px] font-SplineSansMono font-normal text-[15px] leading-none text-[#9A9AA3]">prompt.template</div>
            <div className="absolute w-[585px] h-[148.13px] top-[1027.41px] left-[37.5px] bg-[#1C1C22]"></div>
            <div className="absolute w-[51px] h-[20px] top-[1047.36px] left-[57px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#9A9AA3]"># 역할</div>
            <div className="absolute w-[46px] h-[20px] top-[1075.39px] left-[57px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#52525B]">당신은</div>
            <div className="absolute w-[51px] h-[20px] top-[1075.39px] left-[120.91px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#C3B6F2]">{"{역할}"}</div>
            <div className="absolute w-[56px] h-[20px] top-[1075.39px] left-[186.61px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#52525B]">입니다.</div>
            <div className="absolute w-[51px] h-[20px] top-[1103.42px] left-[57px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#7F7F8C]"># 작업</div>
            <div className="absolute w-[51] h-[20px] top-[1131.45px] left-[57px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#C3B6F2]">{"{주제}"}</div>
            <div className="absolute w-[16px] h-[20px] top-[1131.45px] left-[122.7px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#9A9AA3]">를</div>
            <div className="absolute w-[51px] h-[20px] top-[1131.45px] left-[150.61px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#A7D3C6]">{"{출력}"}</div>
            <div className="absolute w-[157px] h-[20px] top-[1131.45px] left-[216.3px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#52525B]">형식으로 정리하세요.</div>

            

              <div className="w-[657px] h-[85.5px] top-[1210.03px] left-[1.5px] bg-[#FFFFFF]">
              <hr className="absolute w-[657px] h-[0px] top-[1210.78px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
              <div className=" absolute whitespace-nowrap w-[137px] h-[20px] top-[1240.86px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">역할형 · {"{변수}"} 표기</div>
              <div
              onClick={() => setSave3(!save3)}
              className={`absolute w-[69.91px] h-[46.5px] top-[1230.28px] left-[566.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
                save3
                  ? "bg-[#6366F1] border-[#6366F1]"
                  : "bg-[#FFFFFF] border-[#E4E4E7]"
                }`}
              ></div>

              <div
                onClick={() => setSave3(!save3)}
                className={`absolute w-[35px] h-[23px] top-[1240.41px] left-[584.29px] font-inter font-bold text-[18.75px] leading-none flex items-center justify-center ${
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