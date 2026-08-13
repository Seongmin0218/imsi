import { useState, useMemo } from "react";
import { Check, ChevronDown } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import flag from "../assets/flag-checkered.svg";
import { BottomBar } from "./component/BottomBar";

const GUIDE_SCOPES = ["현재 오류", "단계", "전체"] as const;
type GuideScope = (typeof GUIDE_SCOPES)[number];

const GUIDANCE_METHODS = [
    { key: "위치", desc: "어디가 문제인지" },
    { key: "방법", desc: "어떻게 고치는지" },
    { key: "추천값", desc: "대체 값을 제안" },
] as const;
type GuidanceMethod = (typeof GUIDANCE_METHODS)[number]["key"];

const EXPLANATION_LEVELS = ["입문", "기본", "상세"] as const;
type ExplanationLevel = (typeof EXPLANATION_LEVELS)[number];

export function RV_010() {
    const [useGuideProvision, setUseGuideProvision] = useState<boolean>(true);
    const [guideScope, setGuideScope] = useState<GuideScope>("현재 오류");
    const [guidanceMethod, setGuidanceMethod] = useState<GuidanceMethod>("방법");
    const [autoApplySuggestion, setAutoApplySuggestion] = useState<boolean>(false);
    const [explanationLevel, setExplanationLevel] = useState<ExplanationLevel>("기본");
    const [autoRecheck, setAutoRecheck] = useState<boolean>(true);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isRequired = true;

    const footerLabel = useMemo(() => {
        if (!guidanceMethod) return "안내 방식 미선택";
        return `안내 방식 "${guidanceMethod}" 선택됨`;
    }, [guidanceMethod]);
    const [includeTable, setIncludeTable] = useState(true);
    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[550px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-[25px] pt-[28px] pb-6">
                    <PageHeader
                        title="수정 가이드 제공하기"
                        subTitle="RV-010 · REVIEW"
                        content="검토 실패 시 어디를 어떻게 고칠지 안내합니다."
                        text1="필수2"
                        text2="선택3"
                        text3=""
                        bor1="6366F1"
                        bor2="5FAA81"
                        bor3="FFF"
                        bg1="DFE0FF"
                        bg2="DFF2DF"
                        bg3="FFF"
                        pageState="CORE"
                        imgState={flag}
                    />
                </div>
                <div className="w-[550px] h-[1.5px] mt-[-16px] ml-[-26px] bg-[#E4E4E7]" />
                <div className="px-[50px] mt-[-8px] pb-6">
                    {/* Checkbox row */}
                    <div className="mt-[24px] flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUseGuideProvision((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useGuideProvision
                                    ? "bg-[#6366F1] border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                    }`}
                            >
                                {useGuideProvision && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15px] font-bold text-[#27272A]">
                                수정 가이드 제공하기
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

                    {useGuideProvision && isRequired && (
                        <p className="mt-[10px] text-[13.5px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}

                    {/* 가이드 범위 */}
                    <div className="mt-[13.3px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            가이드 범위<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-[11px] flex gap-2">
                            {GUIDE_SCOPES.map((scope) => (
                                <div
                                    key={scope}
                                    // type="button"
                                    onClick={() => setGuideScope(scope)}
                                    className={`h-[38px] flex-1 flex items-center justify-center rounded-md text-[13.5px] font-bold transition-colors ${guideScope === scope
                                        ? "bg-[#6366F1] text-white"
                                        : "text-[#666] border-[2px] border-[#E4E4E7] hover:border-slate-300"
                                        }`}
                                >
                                    {scope}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 안내 방식 */}
                    <div className="mt-[26.5px]">
                        <span className="text-[14.5px] font-bold text-[#52525B]">
                            안내 방식<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-[12px] flex flex-col gap-3.5">
                            {GUIDANCE_METHODS.map(({ key, desc }) => {
                                const active = guidanceMethod === key;
                                return (
                                    <div
                                        key={key}
                                        // type="button"
                                        onClick={() => setGuidanceMethod(key)}
                                        className={`h-[76.5px] flex items-center gap-3 rounded-[12px] border-[2px] px-4 text-left transition-colors ${active
                                            ? "border-[#6366F1]"
                                            : "border-[#E4E4E7] hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`w-5.5 h-5.5 rounded-full flex items-center justify-center transition-colors ${active ? "bg-[#6366F1]" : "border-[1.5px]  border-[#E4E4E7]"
                                                }`}
                                        >
                                        </span>
                                        <span className="leading-[25px]">
                                            <span className="block text-[17.5px] font-bold text-[#27272A]">{key}</span>
                                            <span className="block text-[13px] text-[#9A9AA3]">{desc}</span>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 추천값 적용 */}
                    <div className="mt-[27px]">
                        <span className="text-[15.5px] font-bold text-[#52525B]">추천값 적용</span>
                        <div className="flex items-center justify-between">
                            <span className="mt-[19px] text-[13.5px] font-bold text-[#666]">승인 후 자동 입력</span>
                            <div className="flex flex-col">
                                <span className="absolute mt-[-15px] ml-[30px] text-[10px] text-[#5FAA81]">선택</span>
                                <button
                                    type="button"
                                    onClick={() => setIncludeTable(!includeTable)}
                                    className={`
                                    mt-[17px]
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

                    {/* 설명 수준 */}
                    <div className="w-full mt-[30px]">
                        <span className="text-[15.5px] font-bold text-[#52525B]">설명 수준</span>
                        <div className="flex flex-col">
                            <span className="absolute ml-[422px] mt-[-16px] ml-[30px] text-[10px] text-[#5FAA81]">선택</span>
                            <div className="mt-[8.5px] flex gap-2">
                                <div className="w-full h-[42.5px] flex items-center border-[2px] border-[#E4E4E7] rounded-[8px] text-[15px] text-[#666]">
                                    <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center rounded-l-[8px]">입문</p>
                                    <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center border-l-[2px] border-r-[2px] border-[#E4E4E7]">기본</p>
                                    <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center rounded-r-[8px]">상세</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* 재검증 */}
                    <div className="mt-[26px] flex items-center justify-between">
                        <div>
                            <span className="text-[14px] font-bold text-[#52525B]">재검증</span>
                            <p className="mt-[6px] text-[13.5px] font-bold text-[#666]">수정 후 자동 재검사</p>
                            <p className="mt-[-1px] text-[11px] text-[#6366F1]">기본 ON</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="absolute mt-[5px] ml-[30px] text-[10px] text-[#5FAA81]">선택</span>
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
                </div>

                {/* Footer */}
                <div className="ml-[44px] mt-[-24px]">
                    <BottomBar context="안내 방식 미선택" btnText="적용" />
                </div>
            </div>
        </div>
    );
}