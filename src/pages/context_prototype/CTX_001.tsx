import { useState } from "react";
import { PageHeader } from "./component/PageHeader"
import { Box, Check, ChevronDown } from "lucide-react";
import Arrow from "../../assets/Arrow.svg";
import flag from "../../assets/flag-checkered.svg"
import { TriangleAlert } from "lucide-react";
import { SegmentedControl } from "../../components/ui";
import { Button } from "../../components/ui/Button";
import { BottomBar } from "./component/BottomBar";

export function CTX_001() {
    const [checked, setChecked] = useState(false);
    const [mode, setMode] = useState("전체");
    return (
        <div className="w-[498px] h-[824px] flex flex-col items-center px-[22px] pt-[26px] tracking-tighter">
            <PageHeader
                title="프로젝트 문서 불러오기"
                subTitle="CTX-001 · CONTEXT"
                content="프로젝트를 선택하고 참고할 문서를 지정합니다."
                text1="필수2"
                text2="선택2"
                text3="누락1"
                bor1="6366F1"
                bor2="5FAA81"
                bor3="EF8888"
                bg1="DFE0FF"
                bg2="DFF2DF"
                bg3="FFE1E1"
                pageState="CORE"
                imgState={flag} />
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
                        <div className={`w-[16px] h-[16px] flex items-center justify-center text-center border-2 rounded-[2px] border-[#6366F1] 
                            ${checked ? "bg-[#6366F1]" : "border-[#6366F1]"
                            }`}
                        >
                            {checked && <Check size={18} className="text-white stroke-[3]" />}
                        </div>
                        <p className="ml-[8px] text-[15px] font-bold text-[#27272A]">프로젝트 문서 불러오기</p>
                    </label>
                    <div className="w-[62px] flex items-center">
                        <p className="text-[10px] text-[#6366F1] font-bold">필수</p>
                        <img src={Arrow} alt="arrow" className="w-[21px] h-[21px] " />
                    </div>
                </div>
                <p className="mt-[10px] text-[#C0473C] text-[13px]">* 필수 작성 항목입니다.</p>
                <p className="mt-[14px] text-[#52525B] font-bold">프로젝트<span className="text-[#C0473C]">*</span></p>
                <p className="mt-[4px] flex items-center text-[#EF8888] text-[14.5px] font-bold">⚠ 프로젝트를 선택하세요</p>
                <select className="appearance-none w-full h-[47px] mt-[6px] px-[10px] py-[8px] border-[2px] border-[#EF8888] rounded-[12px] text-[#9A9AA3]">
                    <option value="">프로젝트를 선택하세요</option>
                </select>
                <ChevronDown
                    className="absolute w-[18px] h-[18px] mt-[-33px] ml-[370px]"
                    size={18}
                />
                <p className="mt-[28px] text-[#52525B] font-bold">참고 문서<span className="text-[#C0473C]">*</span></p>
                <div className="w-full h-[77px] mt-[10px] pl-[28px] flex items-center justify-center border-[2px] border-[#E4E4E7] rounded-[8px]">

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
                            <div className={`w-[18px] h-[18px] flex items-center justify-center text-center border-[2px] rounded-[2px] border-[#6366F1] 
                            ${checked ? "bg-[#6366F1]" : "border-[#E4E4E7]"
                                }`}
                            >
                                {checked && <Check size={18} className="text-white stroke-[3]" />}
                            </div>
                        </label>
                        <div className="flex flex-col items-start gap-[3px]">
                            <p className="text-[17px] font-bold">문서 카드</p>
                            <p className="text-[14px] text-[#9A9AA3]">프로젝트 선택 후 목록 표시</p>
                        </div>
                    </div>
                </div>

                <p className="mt-[10px] text-[#C0C0C0] text-[14px]">프로젝트를 먼저 선택하면 문서 목록이 나타납니다.</p>
                <div className="mt-[28px] w-full flex items-center justify-between">
                    <p className="text-[#52525B] text-[15px] font-bold">문서 우선순위</p>
                    <p className="mt-[8px] text-[10px] text-[#5FAA81]">선택</p>
                </div>
                <select className="appearance-none w-full h-[48px] mt-[20px] px-[10px] py-[8px] border-[2px] border-[#E4E4E7] rounded-[12px] text-[#9A9AA3]">
                    <option value="">문서 카드 드래그 정렬 — 위가 우선</option>

                </select>
                <ChevronDown
                    className="absolute w-[18px] h-[18px] mt-[-33px] ml-[370px]"
                    size={18}
                />
                <p className="mt-[27px] text-[#52525B] text-[15.5px] font-bold">입력방식<span className="text-[#C0473C]">*</span></p>
                <div className="mt-[9px] w-full h-[42px] flex items-center border-[2px] border-[#E4E4E7] rounded-[8px]">
                    <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center rounded-l-[8px]">전체</p>
                    <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center border-l-[2px] border-r-[2px] border-[#E4E4E7]">핵심</p>
                    <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center rounded-r-[8px]">특정 섹션</p>
                </div>
                <BottomBar context="필수 옵션 1개 미입력" btnText="적용" />
            </div>

        </div >
    )
}