import { useState } from "react";
import { PageHeader } from "./component/PageHeader"
import { Box, Check, ChevronDown } from "lucide-react";
import Arrow from "../../assets/Arrow.svg";
import light from "../../assets/light.svg"
import { TriangleAlert } from "lucide-react";
import { SegmentedControl } from "../../components/ui";
import { Button } from "../../components/ui/Button";
import { BottomBar } from "./component/BottomBar";
import { ToggleSwitch } from "../../components/ui/ToggleSwitch";

export function CTX_002() {
    const [checked, setChecked] = useState(false);
    const [mode, setMode] = useState("전체");
    const read = [
        {
            id: 1,
            title: "전체",
            context: "전체 읽기"
        },
        {
            id: 2,
            title: "페이지 지정",
            context: "사용자가 원하는 범위 지정"
        },
        {
            id: 3,
            title: "키워드 주변",
            context: "키워드 앞뒤 문맥만"
        }
    ]
    const toggle = [
        {
            id: 1,
            title: "표 포함",
            context: "기본 ON"
        },
        {
            id: 2,
            title: "이미지 포함",
            context: "기본 ON"
        },
        {
            id: 3,
            title: "부록 포함",
        }
    ]

    const [includeTable, setIncludeTable] = useState(true);
    return (
        <div className="w-[498px] min-h-[1084px] flex flex-col items-center px-[22px] py-[26px] bg-white border-[1.5px] tracking-tighter">
            <PageHeader
                title="업로드 문서 읽기"
                subTitle="CTX-002 · CONTEXT"
                content="업로드한 파일의 읽기 범위를 지정합니다."
                text1="필수2"
                text2="조건부1"
                text3="선택1"
                bor1="6366F1"
                bor2="A9BDD4"
                bor3="5FAA81"
                bg1="DFE0FF"
                bg2="ECEEFF"
                bg3="DFF2DF"
                pageState="RECOMMENDED"
                imgState={light} />
            <div className="w-[498px] h-[1.5px] mt-[8px] ml-[-25px] bg-[#E4E4E7]" />


            {/**----------------------------------- */}
            <div className="w-[408px] h-[661px] py-[16px]">
                <div className="flex items-center justify-center">
                    <label className="w-[519px] cursor-pointer agreement flex items-center">
                        <input
                            type="checkbox"
                            checked={checked}
                            className="hidden"
                            onChange={(e) => setChecked(e.target.checked)}
                            onClick={() => {
                                // setCkBox(!ckBox);
                            }}
                        />
                        <div className={`w-[17px] h-[17px] flex items-center justify-center text-center border-2 rounded-[2px] border-[#6366F1] 
                            ${checked ? "bg-[#6366F1]" : "border-[#6366F1]"
                            }`}
                        >
                            {checked && <Check size={18} className="text-white stroke-[3]" />}
                        </div>
                        <p className="ml-[8px] text-[16px] font-bold">스킬 구성</p>
                    </label>
                    <div className="w-[62px] flex items-center">
                        <p className="text-[10px] text-[#6366F1] font-bold">필수</p>
                        <img src={Arrow} alt="arrow" className="w-[21px] h-[21px] " />
                    </div>
                </div>
                <p className="mt-[8px] text-[#C0473C] text-[13px]">* 필수 작성 항목입니다.</p>
                <p className="mt-[16px] text-[15.5px] text-[#52525B] font-bold">업로드 파일<span className="text-[#C0473C]">*</span></p>
                <div className="w-full h-[60px] mt-[11px] px-[16px] flex items-center border-[2px] border-[#E4E4E7] rounded-[8px]">
                    <div className="w-[21px] h-[21px] bg-[#6366F1] rounded-[50px]" />
                    <div className="ml-[14px] flex-1 leading-[17px]">
                        <p className="text-[#666] text-[13px] font-bold">업로드 파일</p>
                        <p className="text-[#9A9AA3] text-[11px]">← INPUT · IN-004 파일 업로드 받기</p>
                    </div>
                    <div className="w-[70px] h-[37px] bg-[#6366F1] flex items-center justify-center rounded-[8px] text-[13px] text-white font-bold">연결됨</div>
                </div>

                <p className="mt-[29px] text-[15.5px] text-[#52525B] font-bold">읽기 범위<span className="text-[#C0473C]">*</span></p>
                <div className="flex flex-col gap-y-[3px]">
                    {read.map((item) => ((
                        <div className={`w-full h-[77px] mt-[11px] pl-[28px] flex items-center justify-center border-[2px] rounded-[8px]
                        ${checked ? "border-[2px] border-[#6366F1]" : "border-[#E4E4E7]"}`}>

                            <div className="w-full flex items-center">
                                <label className="w-[25px] cursor-pointer agreement flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        className="hidden"
                                        onChange={(e) => setChecked(e.target.checked)}
                                        onClick={() => {
                                            // setCkBox(!ckBox);
                                        }}
                                    />
                                    <div className={`w-[20px] h-[20px] flex items-center justify-center text-center border-[1.5px] rounded-[50px]
                            ${checked ? "border-[#6366F1] bg-[#6366F1]" : "bg-white border-[#E4E4E7]"
                                        }`}
                                    >
                                    </div>
                                </label>
                                <div key={item.id} className="flex flex-col items-start gap-[3px]">
                                    <p className="text-[17px] font-bold">{item.title}</p>
                                    <p className="text-[14px] text-[#9A9AA3]">{item.context}</p>
                                </div>
                            </div>
                        </div>

                    )))}
                </div>


                <div className="mt-[28px] w-full flex items-center justify-between">
                    <div className="flex items-center gap-[4px]">
                        <p className="text-[#52525B] text-[15px] font-bold">페이지·키워드</p>
                        <p className="mt-[4px] text-[#6366F1] text-[10px]">"키워드 주변" 선택됨"</p>
                    </div>
                    <p className="text-[10.5px] font-bold text-[#A68C66]">조건부</p>
                </div>
                <textarea
                    placeholder="키워드를 입력해 추가해주세요."
                    className="placeholder:text-[15px] placeholder:text-[#9A9AA3]
                    appearance-none w-full h-[80px] mt-[20px] pt-[10px] px-[20px] border-[2px] border-[#E4E4E7] rounded-[12px] text-[15px]" />
                <div className="flex items-center justify-between mt-[23px] mb-[13px]">
                    <p className="text-[#52525B] font-bold">표·이미지·부록</p>
                    <p className="mt-[6px] text-[10px] text-[#5FAA81]">선택</p>
                </div>
                {toggle.map((item) => (
                    <div key={item.id} className="mb-[12px] w-full flex items-center justify-between">
                        <div className="mt-[3px] leading-[18px]">
                            <p className="text-[#666] text-[14px] font-bold">{item.title}</p>
                            <p className="text-[10px] text-[#6366F1]">{item.context}</p>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => setIncludeTable(!includeTable)}
                                className={`
                                    mt-[5px]
                                    relative
                                    w-[56px]
                                    h-[27px]
                                    rounded-full
                                    transition-colors
                                    ${includeTable ? "bg-[#6366F1]" : "bg-[#D4D4D8]"}
                            `}
                            >
                                <div
                                    className={`
                                absolute
                                top-[1px]
                                flex
                                h-[22px]
                                w-[22px]
                                items-center
                                justify-center
                                rounded-full
                                bg-white
                                text-[10px]
                                font-bold
                                transition-all
                                ${includeTable ? "left-[31px] text-[#6366F1]" : "left-[3px] text-[#666666]"}
                                `}
                                >
                                    {includeTable ? "ON" : "OFF"}
                                </div>
                            </button>
                        </div>
                    </div>
                ))}
                <div className="mt-[-2px]">
                    <BottomBar context="키워드 미입력 — 범위를 지정하세요" btnText="검증" />
                </div>
            </div>

        </div >
    )
}