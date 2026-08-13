import { useState, useMemo } from "react";
import { Check, ChevronDown } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import flag from "../assets/flag-checkered.svg";
import { BottomBar } from "./component/BottomBar";

const TARGET_TONES = [
    { chip: "일", label: "객관" },
    { chip: "전", label: "전문" },
    { chip: "기", label: "쉬운" },
    { chip: "일", label: "친근" },
    { chip: "학", label: "설득" },
    { chip: "리", label: "발표" },
] as const;
type TargetTone = (typeof TARGET_TONES)[number]["label"];

const ENDING_STYLES = ["합니다", "해요", "명사형", "유지"] as const;
type EndingStyle = (typeof ENDING_STYLES)[number];

const JARGON_LEVELS = ["최소", "보통", "전문"] as const;
type JargonLevel = (typeof JARGON_LEVELS)[number];

const SENTENCE_LENGTHS = ["짧게", "보통", "길게"] as const;
type SentenceLength = (typeof SENTENCE_LENGTHS)[number];

function getMeaningLabel(value: number): string {
    if (value <= 0.2) return "엄격";
    if (value <= 0.7) return "엄격에 가깝게";
    if (value < 0.9) return "균형";
    return "자연스럽게";
}

export function RV_007() {
    const [useToneAdjustment, setUseToneAdjustment] = useState<boolean>(true);
    const [targetTone, setTargetTone] = useState<TargetTone>("객관");
    const [endingStyle, setEndingStyle] = useState<EndingStyle>("합니다");
    const [jargonLevel, setJargonLevel] = useState<JargonLevel>("보통");
    const [sentenceLength, setSentenceLength] = useState<SentenceLength>("보통");
    const [meaningPreservation, setMeaningPreservation] = useState<number>(0.5);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isRequired = true;

    const meaningLabel = useMemo(() => getMeaningLabel(meaningPreservation), [meaningPreservation]);
    console.log(meaningPreservation)
    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[550px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-[25px] pt-[27.5px] pb-6">
                    <PageHeader
                        title="톤 조정하기"
                        subTitle="RV-007 · REVIEW"
                        content="결과물의 어조를 목표 톤에 맞게 다듬습니다."
                        text1="필수2"
                        text2="선택3"
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
                <div className="px-[50px] mt-[-8px] pb-6">
                    {/* Checkbox row */}
                    <div className="pt-[25px] flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUseToneAdjustment((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useToneAdjustment
                                    ? "bg-[#6366F1] border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                    }`}
                            >
                                {useToneAdjustment && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15px] font-bold text-[#27272A]">
                                톤 조정하기
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

                    {useToneAdjustment && isRequired && (
                        <p className="mt-[10px] text-[13.5px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}

                    {/* 목표 톤 */}
                    <div className="mt-[13.5px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            목표 톤<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-[18.5px] grid grid-cols-3 gap-2 gap-y-[20px]">
                            {TARGET_TONES.map(({ chip, label }) => {
                                const active = targetTone === label;
                                return (
                                    <div
                                        key={label}
                                        // type="button"
                                        onClick={() => setTargetTone(label)}
                                        className={`cursor-pointer h-[93px] flex flex-col items-center justify-center gap-2 rounded-[12px] border-[2px] transition-colors ${active
                                            ? "border-[#6366F1]"
                                            : "border-[#E4E4E7] hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className="w-8.5 h-8.5 rounded-md flex items-center justify-center text-[15.5px] font-bold bg-[#E7E7EC] text-[#52525B]"                                        >
                                            {chip}
                                        </span>
                                        <span className="text-[13.5px] font-bold text-[#666]">
                                            {label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 종결 방식 */}
                    <div className="mt-[28px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#52525B]">종결 방식</span>
                            <span className="mt-[6px] text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="mt-[12.5px] w-[340px] flex gap-2">
                            {ENDING_STYLES.map((s) => (
                                <div
                                    key={s}
                                    // type="button"
                                    onClick={() => setEndingStyle(s)}
                                    className={`cursor-pointer h-[37px] flex-1 flex items-center justify-center rounded-[8px] py-2.5 text-[13.5px] font-bold transition-colors ${endingStyle === s
                                        ? "bg-[#6366F1] text-white"
                                        : "bg-white text-[#666] border-[2px] border-[#E4E4E7] hover:border-slate-300"
                                        }`}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 전문 용어 */}
                    <div className="mt-[27.5px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#52525B]">전문 용어</span>
                            <span className="mt-[8px] text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="mt-2.5 flex gap-2">
                            {/* {JARGON_LEVELS.map((level) => (
                                <div
                                    key={level}
                                    // type="button"
                                    onClick={() => setJargonLevel(level)}
                                    className={`h-[42.5px] flex-1 flex items-center justify-center rounded-[12px] py-2.5 text-[15px] transition-colors ${jargonLevel === level
                                        ? "bg-[#6366F1] text-white"
                                        : "text-[#666] border-[2px] border-[#E4E4E7] hover:border-slate-300"
                                        }`}
                                >
                                    {level}
                                </div>
                            ))} */}
                            <div className="w-full h-[42.5px] flex items-center border-[2px] border-[#E4E4E7] rounded-[8px] text-[15px] text-[#666]">
                                <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center rounded-l-[8px]">최소</p>
                                <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center border-l-[2px] border-r-[2px] border-[#E4E4E7]">보통</p>
                                <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center rounded-r-[8px]">전문</p>
                            </div>
                        </div>
                    </div>

                    {/* 문장 길이 */}
                    <div className="mt-[28px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15.5px] font-bold text-[#52525B]">문장 길이</span>
                            <span className="mt-[7px] text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="mt-[9px] flex gap-2">
                            {/* {SENTENCE_LENGTHS.map((len) => (
                                <div
                                    key={len}
                                    // type="button"
                                    onClick={() => setSentenceLength(len)}
                                    className={`h-[42.5px] flex-1 flex items-center justify-center rounded-[12px] py-2.5 text-[14px] font-bold transition-colors ${sentenceLength === len
                                        ? "bg-[#6366F1] text-white"
                                        : "text-[#666] border-[2px] border-[#E4E4E7] hover:border-slate-300"
                                        }`}
                                >
                                    {len}
                                </div>
                            ))} */}
                            <div className="w-full h-[42.5px] flex items-center border-[2px] border-[#E4E4E7] rounded-[8px] text-[15px] text-[#666]">
                                <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center rounded-l-[8px]">짧게</p>
                                <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center border-l-[2px] border-r-[2px] border-[#E4E4E7]">보통</p>
                                <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center rounded-r-[8px]">길게</p>
                            </div>
                        </div>
                    </div>

                    {/* 의미 유지 */}
                    <div className="mt-[27px]">
                        <span className="text-[15.5px] font-bold text-slate-800">
                            의미 유지<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-[15px] px-1">
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.5}
                                value={meaningPreservation}
                                onChange={(e) => setMeaningPreservation(parseFloat(e.target.value))}
                                className="w-full h-2 rounded-full appearance-none accent-[#6366F1] cursor-pointer"
                                style={{
                                    background: `linear-gradient(
                                      to right,
                                      #6366F1 0%,
                                      #6366F1 ${meaningPreservation * 100}%,
                                      #E5E7EB ${meaningPreservation * 100}%,
                                      #E5E7EB 100%
                                    )`,

                                }}
                            />
                            <div className="mt-[5px] flex items-center justify-between text-[13px]">
                                <span className={`${meaningPreservation < 0.5 ? "font-bold text-[#6366F1]" : "text-[#AAA]"}`}>엄격</span>
                                <span className={`${meaningPreservation == 0.5 ? "font-bold text-[#6366F1]" : "text-[#AAA]"}`}>
                                    0.7 · 엄격에 가깝게
                                </span>
                                <span className={`${meaningPreservation > 0.5 ? "font-bold text-[#6366F1]" : "text-[#AAA]"}`}>
                                    자연스럽게</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="ml-[44px] mt-[-23px]">
                    <BottomBar context="기본값으로 적용 가능" btnText="적용" />
                </div>
            </div>
        </div>
    );
}