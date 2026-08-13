import { useState, useMemo } from "react";
import { Check, ChevronDown } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import flag from "../assets/flag-checkered.svg";
import { BottomBar } from "./component/BottomBar";

const JUDGMENT_UNITS = ["문장", "항목", "의미", "기능"] as const;
type JudgmentUnit = (typeof JUDGMENT_UNITS)[number];

function getIntensityLabel(value: number): string {
    if (value <= 0.3) return "보수적";
    if (value >= 0.7) return "적극적";
    return "균형";
}

export function RV_006() {
    const [useDuplicateRemoval, setUseDuplicateRemoval] = useState<boolean>(true);
    const [judgmentUnit, setJudgmentUnit] = useState<JudgmentUnit>("의미");
    const [removalIntensity, setRemovalIntensity] = useState<number>(0.5);
    const [mergeSimilar, setMergeSimilar] = useState<boolean>(true);
    const [provideComparison, setProvideComparison] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isRequired = true;

    const intensityLabel = useMemo(() => getIntensityLabel(removalIntensity), [removalIntensity]);
    const [includeTable, setIncludeTable] = useState(true);
    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[550px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-[25px] pt-[27px] pb-6">
                    <PageHeader
                        title="중복 제거하기"
                        subTitle="RV-006 · REVIEW"
                        content="반복되는 내용을 정리합니다."
                        text1="필수2"
                        text2="선택2"
                        text3=""
                        bor1="6366F1"
                        bor2="5FAA81"
                        bor3="FFF"
                        bg1="DFE0FF"
                        bg2="DFF2DF"
                        bg3="FFF"
                        pageState="RECOMMENDED"
                        imgState={flag}
                    />
                </div>
                <div className="w-[550px] h-[1.5px] mt-[-16px] ml-[-26px] bg-[#E4E4E7]" />
                <div className="px-[50px] mt-[-9px] pb-6">
                    {/* Checkbox row */}
                    <div className="pt-[25px] flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUseDuplicateRemoval((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useDuplicateRemoval
                                    ? "bg-[#6366F1] border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                    }`}
                            >
                                {useDuplicateRemoval && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15px] font-bold text-[#27272A]">
                                중복 제거하기
                            </span>
                        </label>
                        <div className="flex items-center gap-[6px]">
                            <p
                                // onClick={() => setDropdownOpen((v) => !v)}
                                className="flex items-center gap-1 text-[10.5px] font-bold text-[#6366F1] hover:text-[#9A9AA3]"
                            >
                                필수
                            </p>
                            <ChevronDown size={18} />
                        </div>
                    </div>

                    {useDuplicateRemoval && isRequired && (
                        <p className="mt-[10px] text-[13.5px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}

                    {/* 판단 단위 */}
                    <div className="mt-[13px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            판단 단위<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="w-[276px] mt-[11px] flex gap-2">
                            {JUDGMENT_UNITS.map((unit) => (
                                <div
                                    key={unit}
                                    // type="button"
                                    onClick={() => setJudgmentUnit(unit)}
                                    className={`cursor-pointer h-[37px] mt-[8px] flex-1 rounded-[8px] flex items-center justify-center text-[13.5px] font-bold transition-colors ${judgmentUnit === unit
                                        ? "bg-[#6366F1] text-white"
                                        : "bg-white text-[#666] border-[2px] border-[#E4E4E7] flex items-center justify-center hover:border-slate-300"
                                        }`}
                                >
                                    {unit}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 제거 강도 */}
                    <div className="mt-[28px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            제거 강도<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-[15px] px-1">
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.5}
                                value={removalIntensity}
                                onChange={(e) => setRemovalIntensity(parseFloat(e.target.value))}
                                className="w-full h-2 rounded-full appearance-none accent-[#6366F1] cursor-pointer"
                                style={{
                                    background: `linear-gradient(
                                      to right,
                                      #6366F1 0%,
                                      #6366F1 ${removalIntensity * 100}%,
                                      #E5E7EB ${removalIntensity * 100}%,
                                      #E5E7EB 100%
                                    )`,

                                }}
                            />
                            <div className="mt-[5px] flex items-center justify-between text-[14px]">
                                <span className={`${removalIntensity < 0.5 ? "font-bold text-[#6366F1]" : "text-[#AAA]"}`}>보수적</span>
                                <span className={`${removalIntensity === 0.5 ? "font-bold text-[#6366F1]" : "text-[#AAA]"}`}>
                                    {/* {removalIntensity.toFixed(1)} · {intensityLabel} */}
                                    0.5 · 균형
                                </span>
                                <span className={`${removalIntensity > 0.5 ? "font-bold text-[#6366F1]" : "text-[#AAA]"}`}>적극적</span>
                            </div>
                        </div>
                    </div>

                    {/* 유사 내용 통합 */}
                    <div className="mt-[27px] flex items-center justify-between">
                        <div>
                            <span className="text-[15.5px] font-bold text-[#52525B]">유사 내용 통합</span>
                            <p className="mt-[4px] text-[14px] text-[#666] font-bold">비슷한 내용은 하나로 합침</p>
                            <p className="text-[10px] text-[#6366F1]">기본 ON</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="absolute mt-[4px] ml-[30px] text-[10px] text-[#5FAA81]">선택</span>
                            <button
                                type="button"
                                onClick={() => setIncludeTable(!includeTable)}
                                className={`
                                    mt-[30px]
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


                    {/* 삭제 내역 */}
                    <div className="mt-[26px] flex items-center justify-between">
                        <div>
                            <span className="text-[15.5px] font-bold text-[#52525B]">삭제 내역</span>
                            <p className="mt-[20px] text-[13.5px] text-[#666] font-bold">변경 전후 비교 제공</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="absolute mt-[9px] ml-[30px] text-[10px] text-[#5FAA81]">선택</span>
                            <button
                                type="button"
                                onClick={() => setIncludeTable(!includeTable)}
                                className={`
                                    mt-[42px]
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
                </div>

                {/* Footer */}
                <div className="ml-[44px] mt-[-22px]">
                    <BottomBar context="기본값으로 적용 가능" btnText="적용" />
                </div>
            </div>
        </div >
    );
}