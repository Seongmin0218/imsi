import { useState, useMemo } from "react";
import { Check, ChevronDown } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import { BottomBar } from "./component/BottomBar";
import text from "../assets/text.svg";
import flag from "../assets/flag-checkered.svg"

const CONFIRM_TARGETS = ["필수항목", "섹션", "기능", "정책", "조건", "근거"] as const;
type ConfirmTarget = (typeof CONFIRM_TARGETS)[number];

const CRITERIA_SOURCES = [
    { key: "사용자 조건", desc: "사용자가 정의한 조건으로 작성" },
    { key: "템플릿", desc: "템플릿 기준으로 작성" },
    { key: "문서", desc: "문서 기준으로 작성" },
    { key: "직접 입력", desc: "기준을 직접 작성" },
] as const;
type CriteriaSource = (typeof CRITERIA_SOURCES)[number]["key"];

export function RV_001() {
    const [useOmissionCheck, setUseOmissionCheck] = useState<boolean>(true);
    const [confirmTarget, setConfirmTarget] = useState<ConfirmTarget>("필수항목");
    const [criteriaSource, setCriteriaSource] = useState<CriteriaSource>("직접 입력");
    const [customCriteria, setCustomCriteria] = useState<string>("");
    const [severityDisplay, setSeverityDisplay] = useState<boolean>(false);
    const [suggestFix, setSuggestFix] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isRequired = true;
    const isCustomModeActive = criteriaSource === "직접 입력";
    const isEmpty = isCustomModeActive && customCriteria.trim().length === 0;
    const showValidationWarning = useOmissionCheck && isRequired && isEmpty;

    const footerLabel = useMemo(() => {
        if (!isCustomModeActive) return `"${criteriaSource}" 기준 적용됨`;
        if (isEmpty) return "직접 기준 입력 대기";
        return `직접 기준 ${customCriteria.trim().length}자 입력됨`;
    }, [criteriaSource, isCustomModeActive, customCriteria, isEmpty]);
    const [includeTable, setIncludeTable] = useState(true);
    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[550px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 pt-[26px] pb-6">
                    <PageHeader
                        title="누락 확인하기"
                        subTitle="RV-001 · REVIEW"
                        content="빠진 항목이 없는지 기준에 따라 점검합니다."
                        text1="필수2"
                        text2="조건부1"
                        text3="선택1"
                        bor1="6366F1"
                        bor2="9CA3AF"
                        bor3="5FAA81"
                        bg1="DFE0FF"
                        bg2="F1F1F2"
                        bg3="DFF2DF"
                        pageState="RECOMMENDED"
                        imgState={flag}
                    />
                    <div className="w-[548px] h-[1.5px] mt-[8px] ml-[-24px] bg-[#E4E4E7]" />
                    <div className="px-[50px] mt-[-3px] "></div>
                    {/* Checkbox row */}
                    <div className="pt-[19px] flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUseOmissionCheck((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useOmissionCheck
                                    ? "bg-[#6366F1] border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                    }`}
                            >
                                {useOmissionCheck && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15px] font-bold text-[#27272A]">
                                누락 확인하기
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

                    {useOmissionCheck && isRequired && (
                        <p className="mt-[9px] text-[13.5px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}

                    {/* 확인 대상 */}
                    <div className="mt-[13px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            확인 대상<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="w-[400px] mt-[12px] flex flex-wrap gap-2 gap-y-[13px]">
                            {CONFIRM_TARGETS.map((t) => (
                                <div
                                    key={t}
                                    // type="button"
                                    onClick={() => setConfirmTarget(t)}
                                    className={`cursor-pointer h-[37px] rounded-md px-4 flex items-center justify-center text-[13.5px] font-bold transition-colors ${confirmTarget === t
                                        ? "bg-[#6366F1] text-white"
                                        : "text-[#666] border-[2px] border-[#E4E4E7] hover:border-slate-300"
                                        }`}
                                >
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 기준 출처 */}
                    <div className="mt-[27px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            기준 출처<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-[11px] flex flex-col gap-3.5">
                            {CRITERIA_SOURCES.map(({ key, desc }) => {
                                const active = criteriaSource === key;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setCriteriaSource(key)}
                                        className={`h-[77px] flex items-center gap-3 rounded-[12px] border-[2px] px-4 text-left transition-colors ${active
                                            ? "border-i[#6366F1]"
                                            : "border-[#E4E4E7] hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center border-[1.5px] transition-colors ${active ? "bg-[#6366F1]" : "border-[#E4E4E7]"
                                                }`}
                                        >
                                            {/* {active && <span className="w-5 h-5 rounded-full bg-[#6366F1]" />} */}
                                        </span>
                                        <span className="leading-[27px]">
                                            <span className="block text-[18px] font-bold text-[#27272A]">{key}</span>
                                            <span className="block text-[14px] text-[#9A9AA3]">{desc}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 직접 기준 */}
                    <div className="mt-7">
                        <div className="flex items-center justify-between">
                            <span className="text-[14px] font-bold text-[#52525B]">
                                직접 기준{" "}
                                <span className="text-[10px] font-normal text-[#6366F1]">
                                    &quot;직접 입력&quot; 선택됨
                                </span>
                            </span>
                            <span className="mt-[2px] text-[10.5px] text-[#A68C66] font-bold">조건부</span>
                        </div>
                        <textarea
                            value={customCriteria}
                            onChange={(e) => setCustomCriteria(e.target.value)}
                            placeholder="점검 기준을 입력하세요"
                            rows={3}
                            disabled={!isCustomModeActive}
                            className={`mt-5 w-full h-[82px] rounded-[12px] px-4 pt-[11px] text-[15px] text-[#666] placeholder:text-[#9A9AA3] placeholder:text-[15px] outline-none resize-none transition-colors border-[2px] ${!isCustomModeActive
                                ? "border-[#E4E4E7]"
                                : "border-[#E4E4E7] focus:border-indigo-400"
                                }`}
                        />
                    </div>

                    {/* 심각도·보완 */}
                    <div className="pt-5.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-slate-800">심각도·보완</span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-[13.5px] text-[#666] font-bold">심각도 표시</span>
                            <div className="flex flex-col">
                                <span className="absolute mt-[-32px] ml-[30px] text-[10px] text-[#5FAA81]">선택</span>
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

                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-[13.5px] text-[#666] font-bold">수정 제안 포함</span>
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
                    </div>
                </div>

                {/* Footer */}
                <div className="ml-[44px] mt-[-26px]">
                    <BottomBar context="대상 문서 미선택" btnText="적용" />
                </div>
            </div>
        </div>
    );
}