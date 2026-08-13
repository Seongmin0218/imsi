import { useState, useMemo } from "react";
import { Check, ChevronDown } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import file from "../../assets/multiFile.svg";
import { BottomBar } from "./component/BottomBar";


const EXCLUSION_TYPES = [
    { key: "문서", desc: "연결된 문서 제외" },
    { key: "섹션", desc: "입력된 섹션 제외" },
    { key: "키워드", desc: "키워드 기준 제외" },
    { key: "이전 버전", desc: "이전 버전 결과 제외" },
] as const;
type ExclusionType = (typeof EXCLUSION_TYPES)[number]["key"];

const CONFLICT_OPTIONS = [
    { key: "제외 규칙 우선", desc: "충돌 시 제외를 우선" },
    { key: "경고", desc: "경고만 표시" },
] as const;
type ConflictOption = (typeof CONFLICT_OPTIONS)[number]["key"];

export function CTX_009() {
    const [useExclusionSetting, setUseExclusionSetting] = useState<boolean>(true);
    const [exclusionTypes, setExclusionTypes] = useState<ExclusionType[]>(["키워드"]);
    const [exclusionKeyword, setExclusionKeyword] = useState<string>("");
    const [conflictHandling, setConflictHandling] = useState<ConflictOption | null>(null);
    const [mentionExclusion, setMentionExclusion] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isRequired = true;
    const isKeywordModeActive = exclusionTypes.includes("키워드");
    const isEmpty = isKeywordModeActive && exclusionKeyword.trim().length === 0;
    const showValidationWarning = useExclusionSetting && isRequired && isEmpty;

    const footerLabel = useMemo(() => {
        if (isEmpty) return "제외 키워드 미입력";
        return `제외 키워드 ${exclusionKeyword.trim().length}자 입력됨`;
    }, [exclusionKeyword, isEmpty]);

    const toggleExclusionType = (t: ExclusionType) => {
        setExclusionTypes((prev) =>
            prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
        );
    };
    const [includeTable, setIncludeTable] = useState(true);

    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[500px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-[19px] pt-[26px] pb-6">
                    <PageHeader
                        title="참고 제외 내용 정하기"
                        subTitle="CTX-009 · CONTEXT"
                        content="참고에서 제외할 유형과 대상을 정합니다."
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
                        imgState={file}
                    />
                </div>
                <div className="w-[498px] h-[1.5px] mt-[-16px] bg-[#E4E4E7]" />
                <div className="px-[50px] mt-[-7px] pb-6">
                    {/* Checkbox row */}
                    <div className="pt-6 flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUseExclusionSetting((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useExclusionSetting
                                    ? "bg-[#6366F1] border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                    }`}
                            >
                                {useExclusionSetting && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15px] font-bold text-[#27272A]">
                                참고하지 말아야 할 내용 정하기
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

                    {useExclusionSetting && isRequired && (
                        <p className="mt-2.5 text-[13px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}


                    {/* 제외 유형 */}
                    <div className="mt-3.5">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            제외 유형<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-3 flex flex-col gap-3.5">
                            {EXCLUSION_TYPES.map(({ key, desc }) => {
                                const active = exclusionTypes.includes(key);
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => toggleExclusionType(key)}
                                        className={`h-[77px] flex items-center gap-3 rounded-lg border-[2px] px-4 text-left transition-colors ${active
                                            ? "border-[#6366F1]"
                                            : "border-[#E4E4E7] hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`w-4 h-4 shrink-0 rounded-[2px] border-[2px] flex items-center justify-center border transition-colors ${active
                                                ? "bg-[#6366F1] border-[#6366F1]"
                                                : "border-[#6366F1]"
                                                }`}
                                        >
                                            {active && <Check size={13} className="text-white" strokeWidth={3} />}
                                        </span>
                                        <span className="flex flex-col gap-[3px]">
                                            <span className="block text-[17px] font-bold text-[#27272A]">{key}</span>
                                            <span className="block text-[12.5px] text-slate-400">{desc}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 제외 대상 */}
                    <div className="mt-[28px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#52525]">
                                제외 대상{" "}
                                <span className="text-[10px] text-[#6366F1]">
                                    &quot;{isKeywordModeActive ? "키워드" : exclusionTypes[0] ?? "미선택"}&quot; 선택됨
                                </span>
                            </span>
                            <span className="text-[10.5px] text-[#A68C66] font-bold">조건부</span>
                        </div>
                        <textarea
                            value={exclusionKeyword}
                            onChange={(e) => setExclusionKeyword(e.target.value)}
                            placeholder="제외할 키워드 입력"
                            rows={2}
                            disabled={!isKeywordModeActive}
                            className={`mt-5 w-full h-[80px] border-[2px] rounded-[12px] px-5 py-[10px] text-[14px] text-[#666] placeholder:text-[#9A9AA3] placeholder:text-[15px] outline-none resize-none transition-colors ${!isKeywordModeActive
                                ? "border-slate-100 bg-slate-50 opacity-50"
                                : showValidationWarning
                                    ? "border-[#EF8888] focus:border-rose-400"
                                    : "border-[#E4E4E7] focus:border-indigo-400"
                                }`}
                        />
                    </div>

                    {/* 충돌 처리 */}
                    <div className="mt-[22px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            충돌 처리<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-3 flex flex-col gap-3.5">
                            {CONFLICT_OPTIONS.map(({ key, desc }) => {
                                const active = conflictHandling === key;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setConflictHandling(key)}
                                        className={`h-[76px] flex items-center gap-3 rounded-xl border-[2px] px-4 pt-[2px] text-left transition-colors ${active
                                            ? "border-[#6366F1]"
                                            : "border-[#E4E4E7] hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center border transition-colors ${active ? "bg-[#6366F1] border-[#6366F1]" : "border-[#E4E4E7]"
                                                }`}
                                        >
                                        </span>
                                        <span className="leading-[26px]">
                                            <span className="block text-[17.5px] font-bold text-[#27272A]">{key}</span>
                                            <span className="block text-[12.5px] text-[#9A9AA3]">{desc}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 제외 내용 언급 */}
                    <div className="mt-[28px] flex items-center justify-between">
                        <div>
                            <span className="text-[15px] font-bold text-[#52525B]">제외 내용 언급</span>
                            <p className="mt-[5px] text-[13px] text-[#666] font-bold">결과에 제외 사실 표시</p>
                            <p className="mt-[0px] text-[10px] text-[#6366F1]">기본 OFF</p>
                        </div>
                        <div className="mt-[3px] flex flex-col gap-[6px]">
                            <span className="mt-[0px] text-[10px] text-[#5FAA81]">선택</span>
                            <button
                                type="button"
                                onClick={() => setIncludeTable(!includeTable)}
                                className={`
                                    mt-[4px]
                                    ml-[-40px]
                                    relative
                                    w-[56px]
                                    h-[26px]
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
                    <BottomBar context="대상 문서 미선택" btnText="적용" />
                </div>
            </div>
        </div>
    );
}