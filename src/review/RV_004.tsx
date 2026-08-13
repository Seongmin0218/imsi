import { useState, useMemo } from "react";
import { Check, ChevronDown, MoreVertical } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import down from "../assets/download.svg";
import { BottomBar } from "./component/BottomBar";

const COMPARISON_TARGETS = ["기능 - 정책", "정책 간", "화면 - 정책", "권한 - 액션"] as const;
type ComparisonTarget = (typeof COMPARISON_TARGETS)[number];

const CONFLICT_TYPES = ["권한", "상태", "예외", "저장", "공개"] as const;
type ConflictType = (typeof CONFLICT_TYPES)[number];

export function RV_004() {
    const [usePolicyConflictCheck, setUsePolicyConflictCheck] = useState<boolean>(true);
    const [comparisonTarget, setComparisonTarget] = useState<ComparisonTarget>("기능 - 정책");
    const [policyDocument, setPolicyDocument] = useState<string | null>(null);
    const [conflictTypes, setConflictTypes] = useState<ConflictType[]>(["권한", "상태"]);
    const [includeSolution, setIncludeSolution] = useState<boolean>(true);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isRequired = true;
    const isEmpty = policyDocument === null;
    const showValidationWarning = usePolicyConflictCheck && isRequired && isEmpty;

    const footerLabel = useMemo(() => {
        if (isEmpty) return "정책 문서 미선택";
        return `정책 문서 "${policyDocument}" 선택됨`;
    }, [policyDocument, isEmpty]);

    const toggleConflictType = (t: ConflictType) => {
        setConflictTypes((prev) =>
            prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
        );
    };
    const [includeTable, setIncludeTable] = useState(true);
    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[550px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-[25px] pt-[28px] pb-6">
                    <PageHeader
                        title="정책 충돌 확인하기"
                        subTitle="RV-004 · REVIEW"
                        content="기능과 정책, 정책 간 충돌을 점검합니다."
                        text1="필수2"
                        text2="선택2"
                        text3="누락1"
                        bor1="6366F1"
                        bor2="5FAA81"
                        bor3="EF8888"
                        bg1="DFE0FF"
                        bg2="DFF2DF"
                        bg3="FFE1E1"
                        pageState="RECOMMENDED"
                        imgState={down}
                    />
                </div>
                <div className="w-[550px] h-[1.5px] mt-[-16px] ml-[-26px] bg-[#E4E4E7]" />
                <div className="px-[50px] mt-[-8px] pb-6">
                    {/* Checkbox row */}
                    <div className="pt-[24px] flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUsePolicyConflictCheck((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${usePolicyConflictCheck
                                    ? "bg-[#6366F1] border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                    }`}
                            >
                                {usePolicyConflictCheck && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15.5x] font-bold text-[#27272A]">
                                정책 충돌 확인하기
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

                    {usePolicyConflictCheck && isRequired && (
                        <p className="mt-[8px] text-[13.5px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}

                    {/* 비교 대상 */}
                    <div className="mt-[14px]">
                        <span className="font-bold text-[#52525B]">
                            비교 대상<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-[11px] flex flex-col gap-3.5">
                            {COMPARISON_TARGETS.map((target) => {
                                const active = comparisonTarget === target;
                                return (
                                    <button
                                        key={target}
                                        type="button"
                                        onClick={() => setComparisonTarget(target)}
                                        className={`h-[60.5px] flex items-center gap-3 rounded-[12px] border-[2px] px-4 py-4 text-left transition-colors ${active
                                            ? "border-[#6366F1]"
                                            : "border-[#E4E4E7] hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`w-5.5 h-5.5 shrink-0 rounded-full flex items-center justify-center transition-colors ${active ? "bg-[#6366F1]" : "border-[1.5px] border-[#E4E4E7]"
                                                }`}
                                        >
                                        </span>
                                        <span className="text-[17px] font-bold text-[#27272A]">{target}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 정책 문서 */}
                    <div className="mt-[28px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            정책 문서<span className="text-[#52525B]">*</span>
                        </span>
                        <button
                            type="button"
                            onClick={() => setPolicyDocument("정책 v1.2")}
                            className={`mt-2 w-full flex items-center gap-3 rounded-[12px] border-[2px] px-4.5 py-[10px] text-left transition-colors ${isEmpty ? "border-[#EF8888] bg-[#FFE1E1]" : "border-[E4E4E7] hover:border-slate-300"
                                }`}
                        >
                            <span className="w-10.5 h-10.5 shrink-0 rounded-lg bg-[#ECEEFF] border-[2px] border-[#4A5E8A] flex items-center justify-center text-[15px] font-bold text-[#4A5E8A]">
                                DOC
                            </span>
                            <span className="flex-1 min-w-0 leading-[17px]">
                                <span className="block text-[13.5px] font-bold text-[#666] truncate">
                                    {policyDocument ?? "정책 문서를 선택하세요"}
                                </span>
                                {isEmpty && (
                                    <span className="block text-[10.5px] text-[#C0473C]">필수 — 미선택</span>
                                )}
                            </span>
                            <MoreVertical size={16} className="text-slate-400 shrink-0" />
                        </button>
                    </div>

                    {/* 충돌 유형 */}
                    <div className="mt-[27px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15.5px] font-bold text-[#52525B]">충돌 유형</span>
                            <span className="text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {CONFLICT_TYPES.map((t) => {
                                const active = conflictTypes.includes(t);
                                return (
                                    <div
                                        key={t}
                                        // type="button"
                                        onClick={() => toggleConflictType(t)}
                                        className={`h-[36px] rounded-[8px] flex items-center justify-center px-5 py-1.5 text-[13.5px] font-bold transition-colors ${active
                                            ? "bg-[#6366F1] text-white"
                                            : "text-[#666] border border-[#E4E4E7] hover:border-slate-300"
                                            }`}
                                    >
                                        {t}
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    {/* 해결안 */}
                    <div className="pt-[29px] flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[15px] font-bold text-slate-800">해결안</span>
                            </div>
                            <p className="mt-[6px] text-[13.5px] text-[#52525B] font-bold">해결안 제안 포함</p>
                            <p className="mt-[0.5px] text-[10px] text-[#6366F1]">기본 ON</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="absolute mt-[3.5px] ml-[30px] text-[10px] text-[#5FAA81]">선택</span>
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
                    <BottomBar context="정책 문서 미선택" btnText="검증" />
                </div>
            </div>
        </div>
    );
}