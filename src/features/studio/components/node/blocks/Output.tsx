import {useState} from "react";
export default function Output() {
  const [form, setForm] = useState("form1");
  const [save3, setSave3]=useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [selected, setSelected] = useState("");
  const [sentence, setSentence] = useState("normal");
  const [title, setTitle] = useState(true);
  const [keyword, setKeyword] = useState(true);
  const [source, setSource] = useState(false);
  return (
      <div className="absolute w-[598.5px] h-[2449.31px] top-[0.75px] left-[0.75px] border border-[1.5px] border-[#E4E4E7] bg-[#FFFFFF]">
        {/* 소개 */}
        <div className="absolute w-[45px] h-[45px] top-[28.88px] left-[24px] bg-[#3C7A52] flex items-center justify-center rounded-[12px]">
          <div className="w-[14px] h-[25px] top-[35.93px] left-[39.8px] font-inter font-bold text-[21px] leading-none text-[#FFFFFF]">
            5
          </div>
        </div>

        <div className="absolute whitespace-nowrap w-[89px] h-[27px] top-[23.25px] left-[84px] font-bold text-[22.5px] font-SplineSansMono leading-none text-[#27272A]">
          결과 노드
        </div>

        <div className="absolute w-[162px] h-[18px] top-[57.75px] left-[84px] font-normal text-[15px] leading-none text-[#9A9AA3]">
          OUTPUT · 11 blocks
        </div>

        <div className="absolute w-[87.07px] h-[30px] top-[36.38px] left-[426.23px] border border-[1.5px] border-dashed border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="w-[64px] h-[18px] top-[40.13px] left-[438.98px] font-bold font-inter text-[15px] leading-none text-[#52525B]">
            OUTPUT
          </div>
        </div>

        <div className="absolute w-[51.45px] h-[30px] top-[36.38px] left-[523.8px] border border-[1.5px] border-[#CFE3D3] bg-[#CFE3D3] flex items-center justify-center rounded-[12px]">
          <div className="w-[28px] h-[18px] top-[40.13px] left-[536.55px] font-bold text-[15px] font-inter leading-none text-[#2F7D52]">
            완료
          </div>
        </div>

        <div className="absolute whitespace-nowrap w-[488px] h-[21px] top-[93.68px] left-[24px] font-inter font-normal leading-none text-[#52525B] text-[17.25px]">
          최종 결과물의 형태를 정하고 저장·공개·복사 흐름으로 마무리합니다.
        </div>

        <div className="absolute w-[78.77px] h-[30px] top-[133.88px] left-[24.75px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[56px] h-[18px] top-[137.63px] left-[37.5px] font-inter font-bold leading-none text-[#52525B]">
            필수 2/2
          </div>
        </div>

        <div className="absolute w-[80.81px] h-[30px] top-[133.88px] left-[114.02px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[59px] h-[18px] top-[137.63px] left-[126.77px] font-inter font-bold leading-none text-[#52525B]">
            저장 대기
          </div>
        </div>

        <div className="absolute w-[64.52px] h-[30px] top-[133.88px] left-[205.34px] border border-[1.5px] border-[#E4E4E7] bg-[#E4E4E7] flex items-center justify-center rounded-[12px]">
          <div className="whitespace-nowrap w-[41px] h-[18px] top-[137.63px] left-[218.09pxpx] font-inter font-bold leading-none text-[#52525B]">
            선택 9
          </div>
        </div>

        <hr className="absolute w-[597px] h-0 top-[186.38px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />

        <div className="absolute w-[22.5px] h-[22.5px] top-[218.63px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

          <div className="absolute w-[143px] h-[23px] top-[216.75px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            텍스트로 출력하기
          </div>

          <div className="absolute w-[25px] h-[16px] top-[220.42px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
          </div>

          <div className="absolute w-[10px] h-[22px] top-[218.02px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
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
            className={`absolute w-[523.5px] h-[59.63px] top-[290.25px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
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
            단락
          </div>


          <div
            onClick={() => setForm("form2")}
            className={`absolute w-[523.5px] h-[84.66px] top-[361.88px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
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

          <div className="absolute w-[91px] h-[23px] top-[377.25px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            제목 + 단락
          </div>

          <div className="absolute w-[111px] h-[19px] top-[407.48px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3]">
            섹션 제목과 본문
          </div>


          <div
            onClick={() => setForm("form3")}
            className={`absolute w-[523.5px] h-[59.63px] top-[458.53px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
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

          <div className="absolute w-[74px] h-[23px] top-[473.91px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            목록 포함
          </div>


          <div
            onClick={() => setForm("form4")}
            className={`absolute w-[523.5px] h-[59.63px] top-[530.16px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
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

          <div className="absolute w-[35px] h-[23px] top-[545.53px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            자유
          </div>


            <div className="absolute whitespace-nowrap w-[32px] h-[21px] top-[605.46px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
                분량
                <span className="w-[10px] h-[21px] top-[605.46px] left-[76.34px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
                *
                </span></div>

            
            <div
            onClick={() => setSentence("one")}
            className={`absolute w-[86.32px] h-[48.38px] top-[641.16px] left-[38.25px] border border-[1.5px] rounded-[12px] cursor-pointer ${
              sentence === "one"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7] bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSentence("one")}
            className={`absolute w-[52px] h-[21px] top-[652.33px] left-[57px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              sentence === "one"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            한 문장
          </div>


          <div
            onClick={() => setSentence("short")}
            className={`absolute w-[67.34px] h-[48.38px] top-[641.16px] left-[135.07px] border border-[1.5px] rounded-[12px] cursor-pointer ${
              sentence === "short"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7] bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSentence("short")}
            className={`absolute w-[32px] h-[21px] top-[652.33px] left-[153.82px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              sentence === "short"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            짧게
          </div>


          <div
            onClick={() => setSentence("normal")}
            className={`absolute w-[67.34px] h-[48.38px] top-[641.16px] left-[215px] border border-[1.5px] rounded-[12px] cursor-pointer ${
              sentence === "normal"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7] bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSentence("normal")}
            className={`absolute w-[32px] h-[21px] top-[652.33px] left-[231.66px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              sentence === "normal"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            보통
          </div>


          <div
            onClick={() => setSentence("detail")}
            className={`absolute w-[82.24px] h-[48.38px] top-[641.16px] left-[290.74px] border border-[1.5px] rounded-[12px] cursor-pointer ${
              sentence === "detail"
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-[#E4E4E7] bg-[#FFFFFF]"
            }`}
          ></div>

          <div
            onClick={() => setSentence("detail")}
            className={`absolute w-[48px] h-[21px] top-[652.33px] left-[309.49px] font-inter font-bold text-[17.25px] leading-none cursor-pointer ${
              sentence === "detail"
                ? "text-[#FFFFFF]"
                : "text-[#52525B]"
            }`}
          >
            자세히
          </div>

            <div className="absolute w-[68px] h-[21px] top-[705.21px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">부가 요소</div>
            <div className="absolute w-[27px] h-[17px] top-[707.31px] left-[537.87px] font-inter font-bold text-[17.25px] leading-none text-[#9A9AA3] whitespace-nowrap">선택</div>

            <div className="absolute w-[71px] h-[22px] top-[742.56px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A]">
            제목 표시
          </div>

          <div
            onClick={() => setTitle(title => !title)}
            className={`absolute w-[51px] h-[30px] top-[740.16px] left-[511.5px] border border-[1.5px] rounded-[15px] cursor-pointer ${
              title
                ? "border-[#6366F1] bg-[#6366F1]"
                : "border-[#E4E4E7] bg-[#E7E7EC]"
            }`}
          ></div>


          <div className="absolute w-[87px] h-[22px] top-[781.56px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A]">
            핵심어 강조
          </div>

          <div
            onClick={() => setKeyword(keyword => !keyword)}
            className={`absolute w-[49.5px] h-[28.5px] top-[779.91px] left-[512.25px] border border-[1.5px] rounded-[15px] cursor-pointer ${
              keyword
                ? "border-[#6366F1] bg-[#6366F1]"
                : "border-[#E4E4E7] bg-[#E7E7EC]"
            }`}
          ></div>


          <div className="absolute w-[71px] h-[22px] top-[820.56px] left-[37.5px] font-inter font-bold text-[18px] leading-none text-[#27272A]">
            출처 표시
          </div>

          <div
            onClick={() => setSource(source => !source)}
            className={`absolute w-[49.5px] h-[28.5px] top-[818.91px] left-[512.25px] border border-[1.5px] rounded-[15px] cursor-pointer ${
              source
                ? "border-[#6366F1] bg-[#6366F1]"
                : "border-[#E4E4E7] bg-[#E7E7EC]"
            }`}
          ></div>

          <div className="absolute w-[22.5px] h-[22.5px] top-[897.66px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>

          <div className="absolute w-[160px] h-[23px] top-[895.78px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            프롬프트로 출력하기
          </div>

          <div className="absolute w-[25px] h-[16px] top-[899.46px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
            필수
          </div>

          <div className="absolute w-[10px] h-[22px] top-[897.06px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
            ⌄
          </div>

          <div className="absolute whitespace-nowrap w-[32px] h-[21px] top-[933.58px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
            형식
            <span className="w-[10px] h-[21px] top-[933.58px] left-[76.34px] font-inter font-bold text-[17.25px] leading-none text-[#C0473C]">
              *
            </span>
          </div><div
          onClick={() => setForm("form5")}
          className={`absolute w-[523.5px] h-[59.63px] top-[969.28px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
            form === "form5" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>

        <div
          className={`absolute w-[22.5px] h-[22.5px] top-[987.28px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
            form === "form5"
              ? "bg-[#6366F1] border-[#6366F1]"
              : "border-[#E4E4E7]"
          }`}
        ></div>

        <div className="absolute w-[35px] h-[23px] top-[984.66px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          일반
        </div>


        <div
          onClick={() => setForm("form6")}
          className={`absolute w-[523.5px] h-[84.66px] top-[1040.91px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
            form === "form6" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>

        <div
          className={`absolute w-[22.5px] h-[22.5px] top-[1058.91px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
            form === "form6"
              ? "bg-[#6366F1] border-[#6366F1]"
              : "border-[#E4E4E7]"
          }`}
        ></div>

        <div className="absolute w-[52px] h-[23px] top-[1056.28px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          역할형
        </div>

        <div className="absolute w-[96px] h-[19px] top-[1086.51px] left-[94.5px] font-inter font-normal text-[15.75px] leading-none text-[#9A9AA3] whitespace-nowrap">
          역할·지시 구조
        </div>


        <div
          onClick={() => setForm("form7")}
          className={`absolute w-[523.5px] h-[59.63px] top-[1137.56px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
            form === "form7" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>

        <div
          className={`absolute w-[22.5px] h-[22.5px] top-[1155.56px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
            form === "form7"
              ? "bg-[#6366F1] border-[#6366F1]"
              : "border-[#E4E4E7]"
          }`}
        ></div>

        <div className="absolute w-[52px] h-[23px] top-[1152.94px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          단계형
        </div>


        <div
          onClick={() => setForm("form8")}
          className={`absolute w-[523.5px] h-[59.63px] top-[1209.19px] left-[38.25px] border border-[1.5px] rounded-[12px] flex items-center justify-center cursor-pointer ${
            form === "form8" ? "border-[#6366F1]" : "border-[#E4E4E7]"
          }`}
        ></div>

        <div
          className={`absolute w-[22.5px] h-[22.5px] top-[1227.19px] left-[56.25px] border border-[1.5px] rounded-[10px] ${
            form === "form8"
              ? "bg-[#6366F1] border-[#6366F1]"
              : "border-[#E4E4E7]"
          }`}
        ></div>

        <div className="absolute w-[69px] h-[23px] top-[1224.56px] left-[94.5px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
          템플릿형
        </div>

            <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[1284.49px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
                변수 블록</div>
            <div className="absolute w-[27px] h-[17px] top-[1286.59px] left-[537.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

            <div className="absolute w-[91.34px] h-[40.5px] top-[1320.19px] left-[40px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

            <div
              onClick={() => setChecked1(prev => !prev)}
              className={`absolute w-[18px] h-[18px] top-[1331.44px] left-[56.25px] rounded-[5px] flex items-center justify-center cursor-pointer ${
                checked1
                  ? "bg-[#6366F1]"
                  : "border border-[1.5px] border-[#52525B]"
              }`}
            >
              {checked1 && (
                <div className="absolute w-[11px] h-[15px] top-[1.35px] left-[3.87px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
                  ✓
                </div>
              )}
            </div>

            <div
              onClick={() => setChecked1(prev => !prev)}
              className={`absolute w-[32px] h-[21px] top-[1327.42px] left-[82.5px] font-inter font-bold text-[17.25px] leading-none flex items-center cursor-pointer ${
                checked1 ? "text-[#6366F1]" : "text-[#52525B]"
              }`}
            >
              주제
            </div>


            <div className="absolute w-[91.34px] h-[40.5px] top-[1320.19px] left-[140px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

            <div
              onClick={() => setChecked2(prev => !prev)}
              className={`absolute w-[18px] h-[18px] top-[1331.44px] left-[158.09px] rounded-[5px] flex items-center justify-center cursor-pointer ${
                checked2
                  ? "bg-[#6366F1]"
                  : "border border-[1.5px] border-[#52525B]"
              }`}
            >
              {checked2 && (
                <div className="absolute w-[11px] h-[15px] top-[1.35px] left-[3.87px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
                  ✓
                </div>
              )}
            </div>

            <div
              onClick={() => setChecked2(prev => !prev)}
              className={`absolute w-[32px] h-[21px] top-[1327.42px] left-[184.34px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                checked2 ? "text-[#6366F1]" : "text-[#52525B]"
              }`}
            >
              문서
            </div>


            <div className="absolute w-[91.34px] h-[40.5px] top-[1320.19px] left-[241.92px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

            <div
              onClick={() => setChecked3(prev => !prev)}
              className={`absolute w-[18px] h-[18px] top-[1331.44px] left-[259.92px] rounded-[5px] flex items-center justify-center cursor-pointer ${
                checked3
                  ? "bg-[#6366F1]"
                  : "border border-[1.5px] border-[#52525B]"
              }`}
            >
              {checked3 && (
                <div className="absolute w-[11px] h-[15px] top-[1.35px] left-[3.87px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
                  ✓
                </div>
              )}
            </div>

            <div
              onClick={() => setChecked3(prev => !prev)}
              className={`absolute w-[32px] h-[21px] top-[1327.42px] left-[286.17px] font-inter font-bold text-[15.75px] leading-none flex items-center justify-center cursor-pointer ${
                checked3 ? "text-[#6366F1]" : "text-[#52525B]"
              }`}
            >
              역할
            </div>


            <div className="absolute w-[91.34px] h-[40.5px] top-[1320.19px] left-[343.76px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

            <div
              onClick={() => setChecked4(prev => !prev)}
              className={`absolute w-[18px] h-[18px] top-[1331.44px] left-[361.76px] rounded-[5px] flex items-center justify-center cursor-pointer ${
                checked4
                  ? "bg-[#6366F1]"
                  : "border border-[1.5px] border-[#52525B]"
              }`}
            >
              {checked4 && (
                <div className="absolute w-[11px] h-[15px] top-[1.35px] left-[3.87px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
                  ✓
                </div>
              )}
            </div>

            <div
              onClick={() => setChecked4(prev => !prev)}
              className={`absolute w-[32px] h-[21px] top-[1327.42px] left-[388.01px] font-inter font-bold text-[17.25px] leading-none flex items-center justify-center cursor-pointer ${
                checked4 ? "text-[#6366F1]" : "text-[#52525B]"
              }`}
            >
              분량
            </div>


            <div className="absolute w-[91.34px] h-[40.5px] top-[1320.19px] left-[448px] border border-[1.5px] border-[#E4E4E7] rounded-[20px] flex items-center"></div>

            <div
              onClick={() => setChecked5(prev => !prev)}
              className={`absolute w-[18px] h-[18px] top-[1331.44px] left-[463.59px] rounded-[5px] flex items-center justify-center cursor-pointer ${
                checked5
                  ? "bg-[#6366F1]"
                  : "border border-[1.5px] border-[#52525B]"
              }`}
            >
              {checked5&& (
                <div className="absolute w-[11px] h-[15px] top-[1.35px] left-[3.87px] font-inter font-bold text-[12px] leading-none text-[#FFFFFF]">
                  ✓
                </div>
              )}
            </div>

            <div
              onClick={() => setChecked5(prev => !prev)}
              className={`absolute w-[32px] h-[21px] top-[1327.42px] left-[489.84px] font-inter font-bold text-[17.25px] leading-none flex items-center cursor-pointer ${
                checked5 ? "text-[#6366F1]" : "text-[#52525B]"
              }`}
            >
              출력
            </div>

            <div className="absolute whitespace-nowrap w-[68px] h-[21px] top-[1376.36px] left-[37.5px] font-inter font-bold text-[17.25px] leading-none text-[#52525B]">
                변수 표기</div>
            <div className="absolute w-[27px] h-[17px] top-[1378.46px] left-[537.87px] font-inter font-bold text-[14.25px] leading-none text-[#9A9AA3]">선택</div>

            <div className="absolute w-[523.5px] h-[48.38px] top-[1412.06px] left-[38.25px] border border-[#E4E4E7] rounded-[12px] border-[1.5px]"></div>
            <div onClick={()=>{setSelected("selected1")}}
            className={`absolute w-[172.99px] h-[46.88px] top-[1412.81px] left-[39px]   rounded-tl-[12px] rounded-bl-[12px]  ${
            selected==="selected1"?"bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7] bg-[#FFFFFF]"}`}></div>
            <div className={`absolute w-[46px] h-[21px] top-[1423.24px] left-[102.48px] font-inter font-bold  text-[17.25px] flex items-center justify-center  rounded-[12px] ${
            selected==="selected1"?"text-[#FFFFFF]" : "text-[#52525B]"}`}>{"{변수}"}</div>
            <div className="absolute w-[0px] h-[46.88px] top-[1412.81px] left-[212.74px] text-[#000000] border-[#E4E4E7] border-[1.5px] bg-[#6366F1] flex items-center"></div>
            <div onClick={()=>{setSelected("selected2")}}
            className={`absolute w-[172.99px] h-[46.88px] top-[1412.81px] left-[215px]  ${
            selected==="selected2"?"bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7] bg-[#FFFFFF]"}`}></div>
            <div className={`absolute w-[46px] h-[21px] top-[1423.24px] left-[277px] font-inter font-bold text-[17.25px] flex items-center justify-center  rounded-[12px] ${
            selected==="selected2"?"text-[#FFFFFF]" : "text-[#52525B]"}`}>[변수]</div>
            <div 
            className="absolute w-[0px] h-[46.88px] top-[1412.81px] left-[387.26px] text-[#000000] border-[#E4E4E7] border-[1.5px]  flex items-center"></div>
            <div onClick={()=>{setSelected("selected3")}}
            className={`absolute w-[172.99px] h-[46.88px] top-[1412.81px] left-[390px]  rounded-tr-[12px] rounded-br-[12px] ${
              selected==="selected3"?"bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7] bg-[#FFFFFF]"}`}></div>
            <div className={`absolute w-[32px] h-[21px] top-[1423.24px] left-[458.5px] font-inter font-bold text-[17.25px] leading-none  flex items-center justify-center ${
            selected==="selected3"?"text-[#FFFFFF]" : "text-[#52525B]"}`}>빈칸</div>

            <div className="absolute w-[525px] h-[46.5px] top-[1476.19px] left-[37.5px] bg-[#26262E] rounded-[12px]"></div>
            <div className="absolute w-[13.5px] h-[13.5px] top-[1492.69px] left-[54px] bg-[#4A4A56] rounded-[6px]"></div>
            <div className="absolute w-[126px] h-[18px] top-[1488.19px] left-[87px] font-SplineSansMono font-normal text-[15px] leading-none text-[#9A9AA3]">preview.prompt</div>
            <div className="absolute w-[525px] h-[148.13px] top-[1537.69px] left-[37.5px] bg-[#1C1C22]"></div>
            <div className="absolute w-[51px] h-[20px] top-[1557.64px] left-[57px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#9A9AA3]"># 역할</div>
            <div className="absolute w-[46px] h-[20px] top-[1585.67px] left-[57px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#52525B]">당신은</div>
            <div className="absolute w-[51px] h-[20px] top-[1585.67px] left-[120.91px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#C3B6F2]">{"{역할}"}</div>
            <div className="absolute w-[56px] h-[20px] top-[1585.67px] left-[186.61px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#52525B]">입니다.</div>
            <div className="absolute w-[51px] h-[20px] top-[1613.7px] left-[57px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#7F7F8C]"># 작업</div>
            <div className="absolute w-[51] h-[20px] top-[1641.73px] left-[57px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#C3B6F2]">{"{주제}"}</div>
            <div className="absolute w-[16px] h-[20px] top-[1641.73px] left-[122.7px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#9A9AA3]">를</div>
            <div className="absolute w-[51px] h-[20px] top-[1641.73px] left-[150.61px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#A7D3C6]">{"{출력}"}</div>
            <div className="absolute w-[157px] h-[20px] top-[1641.73px] left-[216.3px] font-SplineSansMono font-normal text-[16.5px] leading-none text-[#52525B]">형식으로 정리하세요.</div>

            <div className="w-[561px] h-[52.5px] top-[1720.31px] left-[19.5px] bg-[#FFFFFF]"></div>
            <div className="absolute w-[22.5px] h-[22.5px] top-[1735.31px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[108px] h-[23px] top-[1733.44px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
              표로 출력하기
            </div>

            <div className="absolute w-[155px] h-[19px] top-[1735.54px] left-[251.27px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
              열 4 · 항목 기준 →
            </div>

            <div className="absolute w-[25px] h-[16px] top-[1737.11px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
              필수
            </div>
            <div className="absolute w-[10px] h-[22px] top-[1733.21px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
              ⌄
            </div>

            <div className="absolute w-[559.5px] h-[51px] top-[1790.06px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[1805.06px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
            <div className="absolute w-[177px] h-[23px] top-[1802.44px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
              체크리스트로 출력하기
            </div>
            <div className="absolute w-[125px] h-[19px] top-[1804.54px] left-[297.87px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
              단계별 · 빈 체크
            </div>

            <div className="absolute w-[44.33px] h-[19.5px] top-[1805.81px] left-[489.66px] bg-[#F0F0F3] rounded-[12px]"></div>
            <div className=" absolute w-[25px] h-[16px] top-[1806.11px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
              선택
            </div>
            <div className="absolute w-[10px] h-[22px] top-[1802.21px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
              ⌄
            </div>

            <div className="absolute w-[561px] h-[52.5] top-[1858.31px] left-[19.5px] bg-[#FFFFFF] rounded-[12px]"></div>
            <div className="absolute w-[22.5px] h-[22.5px] top-[1873.31px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[182px] h-[23px] top-[1871.44px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            문서 초안으로 출력하기
            </div>

            <div className="absolute w-[150px] h-[19px] top-[1873.54px] left-[287.44px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
              기획 · 자동 목차 →
            </div>

            <div className="absolute w-[25px] h-[16px] top-[1875.11px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
              필수
            </div>
            <div className="absolute w-[10px] h-[22px] top-[1871.21px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
              ⌄
            </div>

            <div className="absolute w-[559.5px] h-[51px] top-[1928.06px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[1943.06px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
            <div className="absolute w-[199px] h-[23px] top-[1940.44px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
              발표용 요약으로 출력하기
            </div>
            <div className="absolute w-[111px] h-[19px] top-[1942.54px] left-[316.01px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
              슬라이드 · 3분
            </div>

            <div className="absolute w-[44.33px] h-[19.5px] top-[1943.81px] left-[489.66px] bg-[#F0F0F3] rounded-[12px]"></div>
            <div className=" absolute w-[25px] h-[16px] top-[1944.11px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
              선택
            </div>
            <div className="absolute w-[10px] h-[22px] top-[1940.21px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
              ⌄
            </div>

            <div className="absolute w-[559.5px] h-[51px] top-[1997.06px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[2012.06px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
            <div className="absolute w-[216px] h-[23px] top-[2009.44px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
              개발자 전달용으로 출력하기
            </div>
            <div className="absolute w-[77px] h-[19px] top-[2011.54px] left-[343.01px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
              FE · 핵심
            </div>

            <div className="absolute w-[44.33px] h-[19.5px] top-[2012.81px] left-[489.66px] bg-[#F0F0F3] rounded-[12px]"></div>
            <div className=" absolute w-[25px] h-[16px] top-[2013.11px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
              선택
            </div>
            <div className="absolute w-[10px] h-[22px] top-[2009.21px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
              ⌄
            </div>

            <div className="absolute w-[559.5px] h-[51px] top-[2066.06px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[2081.06px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
            <div className="absolute w-[199px] h-[23px] top-[2078.44px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
              단계별 가이드로 출력하기
            </div>
            <div className="absolute w-[96px] h-[19px] top-[2080.54px] left-[323.88px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
              초보 · 5단계
            </div>

            <div className="absolute w-[44.33px] h-[19.5px] top-[2081.81px] left-[489.66px] bg-[#F0F0F3] rounded-[12px]"></div>
            <div className=" absolute w-[25px] h-[16px] top-[2082.11px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
              선택
            </div>
            <div className="absolute w-[10px] h-[22px] top-[2078.21px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
              ⌄
            </div>

            <div className="absolute w-[561px] h-[52.5px] top-[2134.31px] left-[19.5px] rounded-[12px]"></div>
            <div className="absolute w-[22.5px] h-[22.5px] top-[2149.31px] left-[37.5px] bg-[#6366F1] rounded-[6px]"></div>
            <div className="absolute w-[164px] h-[23px] top-[2147.44px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
            내 저장소에 저장하기
            </div>

            <div className="absolute w-[165px] h-[19px] top-[2149.54px] left-[271.45px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
              최종 결과 · 비공개 →
            </div>

            <div className="absolute w-[25px] h-[16px] top-[2151.11px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#6366F1]">
              필수
            </div>
            <div className="absolute w-[10px] h-[22px] top-[2147.21px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
              ⌄
            </div>

            
            <div className="absolute w-[559.5px] h-[51px] top-[2204.06px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[2219.06px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
            <div className="absolute w-[147px] h-[23px] top-[2216.44px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
              공개용 설명 만들기
            </div>
            <div className="absolute w-[87px] h-[19px] top-[2218.54px] left-[304.29px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
              자료 · 입문
            </div>

            <div className="absolute w-[44.33px] h-[19.5px] top-[2219.81px] left-[489.66px] bg-[#F0F0F3] rounded-[12px]"></div>
            <div className=" absolute w-[25px] h-[16px] top-[2220.11px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
              선택
            </div>
            <div className="absolute w-[10px] h-[22px] top-[2216.21px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
              ⌄
            </div>
            

            <div className="absolute w-[559.5px] h-[73.5px] top-[2273.06px] left-[20.25px] border-[#E4E4E7] border-[1.5px] rounded-[12px]"></div>
            <div className="absolute w-[21px] h-[21px] top-[2299.31px] left-[38.25px] border-[#D8A978] border-[1.5px] rounded-[6px]"></div>
            <div className="absolute w-[164px] h-[23px] top-[2285.44px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
              복사 가능한 흐름으로
            </div>
            <div className="absolute w-[52px] h-[23px] top-[2307.94px] left-[72px] font-inter font-bold text-[18.75px] leading-none text-[#27272A]">
              만들기
            </div>
            <div className="absolute w-[193px] h-[19px] top-[2298.79px] left-[282.09px] font-SplineSansMono font-normal text-[15.75px] leading-none text-[#9A9AA3]">
              구조·예시 · 개인정보 제거
            </div>

            <div className="absolute w-[44.33px] h-[19.5px] top-[2300.06px] left-[489.66px] bg-[#F0F0F3] rounded-[12px]"></div>
            <div className=" absolute w-[25px] h-[16px] top-[2300.36px] left-[500.16px] font-inter font-bold text-[13.5px] leading-none text-[#9A9AA3]">
              선택
            </div>
            <div className="absolute w-[10px] h-[22px] top-[2296.46px] left-[552px] font-inter font-normal text-[18px] leading-none text-[#9A9AA3]">
              ⌄
            </div>

              <div className="w-[597px] h-[85.5px] top-[2363.81px] left-[1.5px] bg-[#FFFFFF]">
              <hr className="absolute w-[597px] h-[0px] top-[2364.56px] left-[1.5px] border-[1.5px] border-[#E4E4E7]" />
              <div className=" absolute w-[271px] h-[20px] top-[2394.64px] left-[22.5px] font-inter font-normal text-[16.5px] leading-none text-[#9A9AA3]">필수 충족 · 저장하면 흐름이 완성됩니다</div>
              <div
              onClick={() => setSave3(!save3)}
              className={`absolute w-[69.91px] h-[46.5px] top-[2384.06px] left-[506.84px] border border-[1.5px] rounded-[12px] flex items-center justify-center ${
                save3
                  ? "bg-[#6366F1] border-[#6366F1]"
                  : "bg-[#FFFFFF] border-[#E4E4E7]"
                }`}
              ></div>

              <div
                onClick={() => setSave3(!save3)}
                className={`absolute w-[35px] h-[23px] top-[2394.19px] left-[524.29px] font-inter font-bold text-[18.75px] leading-none flex items-center justify-center ${
                  save3
                    ? "text-[#FFFFFF]"
                    : "text-[#27272A]"
                }`}
              >
              검증
            </div>
          </div>

            

            
            
    </div>
  );
}