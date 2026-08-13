import { useState } from "react";
import { Search, Layers, Lightbulb, Check, X, ChevronDown } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import text from "../../assets/text.svg";
import { BottomBar } from "./component/BottomBar";
import light from "../../assets/light.svg";
import group from "../../assets/group.svg"

const RANGE_MODES = ["전체", "특정 문서", "섹션", "키워드"] as const;
type RangeMode = (typeof RANGE_MODES)[number];

const RANGE_ICONS: Record<RangeMode, typeof Search> = {
    "전체": Search,
    "특정 문서": Search,
    "섹션": Layers,
    "키워드": Lightbulb,
};

const CONTEXT_MODES = ["해당 부분", "앞뒤 포함", "전체 연계"] as const;
type ContextMode = (typeof CONTEXT_MODES)[number];

export function CTX_004() {
    const [useScopeSetting, setUseScopeSetting] = useState<boolean>(true);
    const [rangeMode, setRangeMode] = useState<RangeMode>("특정 문서");
    const [docQuery, setDocQuery] = useState<string>("");
    const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
    const [keywordInput, setKeywordInput] = useState<string>("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [contextMode, setContextMode] = useState<ContextMode>("앞뒤 포함");

    const isRequired = true;
    const isDocModeActive = rangeMode === "특정 문서";
    const isEmpty = isDocModeActive && selectedDocs.length === 0;
    const showValidationWarning = useScopeSetting && isRequired && isEmpty;

    const footerLabel = isEmpty ? "대상 문서 미선택" : `대상 문서 ${selectedDocs.length}건 선택됨`;

    const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && keywordInput.trim()) {
            e.preventDefault();
            setKeywords((prev) => [...prev, keywordInput.trim()]);
            setKeywordInput("");
        }
    };

    const removeKeyword = (idx: number) => {
        setKeywords((prev) => prev.filter((_, i) => i !== idx));
    };

    return (
        <div className="min-h-[848px] w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[500px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-[25px] pt-[27px] pb-6">
                    <PageHeader
                        title="참고 범위 정하기"
                        subTitle="CTX-004 · CONTEXT"
                        content="참고할 자료의 범위 방식을 정합니다."
                        text1="필수1"
                        text2="조건부1"
                        text3="선택2"
                        bor1="6366F1"
                        bor2="9CA3AF"
                        bor3="5FAA81"
                        bg1="DFE0FF"
                        bg2="F1F1F2"
                        bg3="DFF2DF"
                        pageState="RECOMMENDED"
                        imgState={group}
                    />
                </div>
                <div className="w-[484px] h-[1.5px] mt-[-16px] bg-[#E4E4E7]" />
                <div className="px-[50px] mt-[-8px] pb-6">

                    {/* Checkbox row */}
                    <div className="pt-6 flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUseScopeSetting((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useScopeSetting
                                    ? "bg-indigo-500 border-indigo-500"
                                    : "bg-white border-slate-300"
                                    }`}
                            >
                                {useScopeSetting && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15px] font-bold text-[#27272A]">
                                참고 범위 정하기
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

                    {useScopeSetting && isRequired && (
                        <p className="mt-2.5 text-[14px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}

                    {/* 범위 방식 */}
                    <div className="mt-3">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            범위 방식<span className="text-[#C0473C]"> *</span>
                        </span>
                        <div className="mt-1.5 grid grid-cols-4 gap-2">
                            {RANGE_MODES.map((mode) => {
                                const Icon = RANGE_ICONS[mode];
                                const active = rangeMode === mode;
                                return (
                                    <button
                                        key={mode}
                                        type="button"
                                        onClick={() => setRangeMode(mode)}
                                        className={`h-[92px] flex flex-col items-center justify-center gap-1.5 rounded-lg py-3 border-[2px] transition-colors ${active
                                            ? "border-[#6366F1]"
                                            : "border-[#E4E4E7] bg-white hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`w-[32px] h-[32px] rounded-[8px] flex items-center justify-center ${active ? "bg-indigo-500" : "bg-white border-[2px]"
                                                }`}
                                        >
                                            <Icon size={16} className={active ? "text-white" : "text-[#52525B]"} />
                                        </span>
                                        <span className={`text-[13px] font-bold ${active ? "text-[#6366F1]" : "text-slate-600"}`}>
                                            {mode}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 대상 문서 */}
                    <div className="mt-7">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#52525B]">
                                대상 문서{" "}
                                <span className="text-[10px] font-normal text-[#6366F1]">
                                    &quot;{rangeMode}&quot; 선택됨
                                </span>
                            </span>
                            <span className="text-[10px] text-[#A68C66] font-bold">조건부</span>
                        </div>
                        <div
                            className={`mt-[22px] rounded-lg border ${isDocModeActive ? "border-[#E4E4E7]" : "border-[#E4E4E7] opacity-50 pointer-events-none"
                                }`}
                        >
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E4E4E7]">
                                <Search size={15} className="text-[#9A9AA3]" />
                                <input
                                    value={docQuery}
                                    onChange={(e) => setDocQuery(e.target.value)}
                                    placeholder="문서 검색..."
                                    className="flex-1 text-[15px] text-[#52525B] placeholder:text-[15px] placeholder:text-[#9A9AA3] outline-none"
                                />
                            </div>
                            <div className="px-4 py-7 text-center text-[15px] text-[#9A9AA3]">
                                {selectedDocs.length === 0
                                    ? "문서를 검색해 복수 선택하세요"
                                    : selectedDocs.join(", ")}
                            </div>
                        </div>
                    </div>

                    {/* 포함·제외 키워드 */}
                    <div className="mt-[25px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#52525B]">포함·제외 키워드</span>
                            <span className="mt-[6px] text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="mt-5 h-[80px] rounded-lg border-[2px] border-[#E4E4E7] px-4 pt-[10px]">
                            {keywords.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    {keywords.map((kw, idx) => (
                                        <span
                                            key={`${kw}-${idx}`}
                                            className="flex items-center gap-1 text-[12px] font-medium text-[#6366F1] bg-indigo-50 rounded-full px-2.5 py-1"
                                        >
                                            {kw}
                                            <X
                                                size={11}
                                                className="cursor-pointer"
                                                onClick={() => removeKeyword(idx)}
                                            />
                                        </span>
                                    ))}
                                </div>
                            )}
                            <input
                                value={keywordInput}
                                onChange={(e) => setKeywordInput(e.target.value)}
                                onKeyDown={handleKeywordKeyDown}
                                placeholder="키워드 입력 후 Enter"
                                className="w-full text-[14px] text-[#9A9AA3] placeholder:text-[#9A9AA3] outline-none"
                            />
                        </div>
                    </div>

                    {/* 문맥 확장 */}
                    <div className="mt-[27px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[14.5px] font-bold text-[#52525B]">문맥 확장</span>
                            <span className="text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="w-full h-[42px] mt-[10px] flex items-center border-[2px] border-[#E4E4E7] rounded-[8px] ">
                            <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center rounded-l-[8px]">해당 부분</p>
                            <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center border-l-[2px] border-r-[2px] border-[#E4E4E7]">앞뒤 포함</p>
                            <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center rounded-r-[8px]">전체</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="ml-[34px] mt-[-23px]">
                    <BottomBar context="대상 문서 미선택" btnText="적용" />
                </div>
            </div>
        </div>
    );
}