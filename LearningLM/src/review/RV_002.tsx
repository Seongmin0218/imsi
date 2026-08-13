import { useState, useMemo } from "react";
import {
    Check,
    ChevronDown,
    Search,
    Archive,
    Lightbulb,
    PenTool,
    List,
    Plus,
    AlertTriangle,
} from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import chart from "../assets/chart.svg";
import { BottomBar } from "./component/BottomBar";

const EXPECTED_FORMATS = [
    { label: "단락", icon: Search },
    { label: "목록", icon: Archive },
    { label: "표", icon: Search },
    { label: "체크", icon: Lightbulb },
    { label: "문서", icon: PenTool },
    { label: "프롬프트", icon: List },
    { label: "JSON", icon: Plus },
] as const;
type ExpectedFormat = (typeof EXPECTED_FORMATS)[number]["label"];

const DECOMPOSITION_LEVELS = ["결과 설정", "템플릿", "직접"] as const;
type DecompositionLevel = (typeof DECOMPOSITION_LEVELS)[number];

const ERROR_HANDLING_OPTIONS = [
    { key: "자동 수정", desc: "형식을 맞춰 재작성" },
    { key: "표시만", desc: "위치만 표시하고 유지" },
] as const;
type ErrorHandling = (typeof ERROR_HANDLING_OPTIONS)[number]["key"];

export function RV_002() {
    const [useFormatCheck, setUseFormatCheck] = useState<boolean>(true);
    const [expectedFormat, setExpectedFormat] = useState<ExpectedFormat>("표");
    const [decompositionLevel, setDecompositionLevel] = useState<DecompositionLevel>("결과 설정");
    const [requiredComposition, setRequiredComposition] = useState<string>("");
    const [errorHandling, setErrorHandling] = useState<ErrorHandling | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isRequired = true;
    const isEmpty = errorHandling === null;
    const showValidationWarning = useFormatCheck && isRequired && isEmpty;

    const footerLabel = useMemo(() => {
        if (isEmpty) return "오류 처리 미선택";
        return `오류 처리 "${errorHandling}" 선택됨`;
    }, [errorHandling, isEmpty]);

    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[550px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-[25px] pt-[25px] pb-6">
                    <PageHeader
                        title="형식 확인하기"
                        subTitle="RV-002 · REVIEW"
                        content="결과물이 기대 형식과 일치하는지 검사합니다."
                        text1="필수3"
                        text2="선택1"
                        text3="누락1"
                        bor1="6366F1"
                        bor2="5FAA81"
                        bor3="EF8888"
                        bg1="DFE0FF"
                        bg2="DFF2DF"
                        bg3="FFE1E1"
                        pageState="CORE"
                        imgState={chart}
                    />
                </div>
                <div className="w-[550px] h-[1.5px] mt-[-16px] ml-[-26px] bg-[#E4E4E7]" />
                <div className="px-[50px] mt-[-9px] pb-6">
                    {/* Checkbox row */}
                    <div className="pt-[25px] flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUseFormatCheck((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useFormatCheck
                                    ? "bg-[#6366F1] border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                    }`}
                            >
                                {useFormatCheck && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15px] font-bold text-[#27272A]">
                                형식 확인하기
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

                    {useFormatCheck && isRequired && (
                        <p className="mt-[10px] text-[13.5px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}

                    {/* 기대 형식 */}
                    <div className="mt-[13px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            기대 형식<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-1.5 grid grid-cols-4 gap-1.5 gap-y-[7px]">
                            {EXPECTED_FORMATS.map(({ label, icon: Icon }) => {
                                const active = expectedFormat === label;
                                return (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => setExpectedFormat(label)}
                                        className={`${(label == "문서" || label == "프롬프트" || label == "JSON") && "w-[145px]"} ${(label == "프롬프트" || label == "JSON") && (label == "프롬프트" ? "ml-[37px]" : "ml-[75px]")} flex flex-col items-center justify-center gap-1.5 rounded-xl py-[15.5px] border-[2px] border-[#E4E4E7] transition-colors ${active
                                            ? "border-[#6366F1]"
                                            : "border-[#E4E4E7] bg-white hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`w-[32px] h-[32px] rounded-[8px] flex items-center justify-center ${active ? "bg-[#6366F1]" : "border-[2px] border-[#E4E4E7]"
                                                }`}
                                        >
                                            <Icon size={16} className={active ? "text-[white]" : "text-[#666]"} />
                                        </span>
                                        <span className={`text-[13.5px] font-bold ${active ? "text-[#666]" : "text-[#666]"}`}>
                                            {label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 분해 수준 */}
                    <div className="mt-6.5">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            분해 수준<span className="text-[#C0473C]"> *</span>
                        </span>
                        <div className="mt-[-2px] flex gap-2">
                            {/* {DECOMPOSITION_LEVELS.map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setDecompositionLevel(level)}
                                    className={`flex-1 rounded-md py-2.5 text-[13.5px] font-bold transition-colors ${decompositionLevel === level
                                        ? "bg-indigo-500 text-white"
                                        : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                                        }`}
                                >
                                    {level}
                                </button>
                            ))} */}
                            <div className="w-full h-[42px] mt-[11px] flex items-center border-[2px] border-[#E4E4E7] rounded-[8px] text-[15px] text-[#666]">
                                <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center rounded-l-[8px]">결과 설정</p>
                                <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center border-x-[2px] border-[#E4E4E7]">탬플릿</p>
                                <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[148px] h-full flex items-center justify-center rounded-r-[8px]">직접</p>
                            </div>
                        </div>
                    </div>

                    {/* 필수 구성 */}
                    <div className="mt-[28px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#52525B]">필수 구성</span>
                            <span className="mt-[6px] text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <textarea
                            value={requiredComposition}
                            onChange={(e) => setRequiredComposition(e.target.value)}
                            placeholder="예: 제목 · 열 3개 이상 · 합계 행"
                            rows={2}
                            className="mt-5 w-full h-[80px] rounded-[12px] px-5.5 py-2.5 text-[14px] text-slate-700 placeholder:text-[#9A9AA3] placeholder:text-[15px] outline-none resize-none transition-colors border-[2px] border-[#E4E4E7] focus:border-indigo-400"
                        />
                    </div>

                    {/* 오류 처리 */}
                    <div className="mt-[23px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            오류 처리<span className="text-[#C0473C]">*</span>
                        </span>

                        {isEmpty && (
                            <p className="mt-[10px] flex items-center gap-1 text-[13.5px] text-[#EF8888] font-bold">
                                처리방식을 선택하세요!
                            </p>
                        )}

                        <div className="mt-[13px] flex flex-col gap-3.5">
                            {ERROR_HANDLING_OPTIONS.map(({ key, desc }) => {
                                const active = errorHandling === key;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setErrorHandling(key)}
                                        className={`h-[77px] flex items-center gap-3 rounded-[12px] border-[2px] px-4 py-3 text-left transition-colors ${active
                                            ? "border-[#6366F1]"
                                            : isEmpty
                                                ? "border-[#EF8888]"
                                                : "border-[#E4E4E7] hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${active ? "bg-[#6366F1]" : "border-slate-300"
                                                }`}
                                        >
                                        </span>
                                        <span className="leading-[25.5px]">
                                            <span className="block text-[17.5px] font-bold text-[#27272A]">{key}</span>
                                            <span className="block text-[13px] text-[#9A9AA3]">{desc}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="ml-[44px] mt-[-24px]">
                    <BottomBar context="대상 문서 미선택" btnText="적용" />
                </div>
            </div>
        </div>
    );
}