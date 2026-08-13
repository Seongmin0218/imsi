import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import flag from "../assets/flag-checkered.svg";
import { BottomBar } from "./component/BottomBar";

const REQUIRED_TARGETS = ["사실", "수치", "정책", "결정", "비교"] as const;
type RequiredTarget = (typeof REQUIRED_TARGETS)[number];

const ALLOWED_EVIDENCE_OPTIONS = ["프로젝트 문서", "업로드 문서", "사용자 입력"] as const;
type AllowedEvidence = (typeof ALLOWED_EVIDENCE_OPTIONS)[number];

const NO_EVIDENCE_OPTIONS = [
    { key: "삭제", desc: "근거가 없는 경우 삭제 처리" },
    { key: "추정으로 표시", desc: "추정임을 명시하고 유지" },
    { key: "경고", desc: "근거가 없는 경우 경고 처리" },
] as const;
type NoEvidenceHandling = (typeof NO_EVIDENCE_OPTIONS)[number]["key"];

export function RV_005() {
    const [useEvidenceCheck, setUseEvidenceCheck] = useState<boolean>(true);
    const [requiredTargets, setRequiredTargets] = useState<RequiredTarget[]>(["사실", "수치"]);
    const [allowedEvidence, setAllowedEvidence] = useState<AllowedEvidence[]>(["프로젝트 문서"]);
    const [noEvidenceHandling, setNoEvidenceHandling] = useState<NoEvidenceHandling>("추정으로 표시");
    const [showDocLocation, setShowDocLocation] = useState<boolean>(false);
    const [distinguishInference, setDistinguishInference] = useState<boolean>(false);
    const [showSourceConflict, setShowSourceConflict] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isRequired = true;

    const toggleRequiredTarget = (t: RequiredTarget) => {
        setRequiredTargets((prev) =>
            prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
        );
    };

    const toggleAllowedEvidence = (e: AllowedEvidence) => {
        setAllowedEvidence((prev) =>
            prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
        );
    };
    const [includeTable, setIncludeTable] = useState(true);
    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[550px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-[25px] pt-[28px] pb-6">
                    <PageHeader
                        title="근거 확인하기"
                        subTitle="RV-005 · REVIEW"
                        content="주장·수치에 근거가 있는지 검사합니다."
                        text1="필수3"
                        text2="선택1"
                        // text3=""
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
                                onClick={() => setUseEvidenceCheck((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useEvidenceCheck
                                    ? "bg-[#6366F1] border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                    }`}
                            >
                                {useEvidenceCheck && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15px] font-bold text-[#27272A]">
                                근거 확인하기
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

                    {useEvidenceCheck && isRequired && (
                        <p className="mt-[9px] text-[13.5px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}

                    {/* 근거 필수 대상 */}
                    <div className="mt-[13px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            근거 필수 대상<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-[12px] flex flex-wrap gap-2">
                            {REQUIRED_TARGETS.map((t) => {
                                const active = requiredTargets.includes(t);
                                return (
                                    <div
                                        key={t}
                                        // type="button"
                                        onClick={() => toggleRequiredTarget(t)}
                                        className={`h-[37px] rounded-[8px] px-4 py-2 text-[14px] font-bold transition-colors ${active
                                            ? "bg-[#6366F1] text-white"
                                            : "bg-white text-[#666] border border-[#E4E4E7] hover:border-slate-300"
                                            }`}
                                    >
                                        {t}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 허용 근거 */}
                    <div className="mt-6.5">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            허용 근거<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-[12px] flex flex-col gap-3.5">
                            {ALLOWED_EVIDENCE_OPTIONS.map((option) => {
                                const active = allowedEvidence.includes(option);
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => toggleAllowedEvidence(option)}
                                        className={`h-[61px] flex items-center gap-3 rounded-[12px] border-[2px] px-4 py-3 text-left transition-colors ${active
                                            ? "border-[#6366F1]"
                                            : "border-[#E4E4E7] hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`w-[16.5px] h-[16.5px] rounded-[2px] flex items-center justify-center border transition-colors ${active
                                                ? "bg-[#6366F1] border-[#6366F1]"
                                                : "bg-white border-[#6366F1] border-[2px]"
                                                }`}
                                        >
                                            {active && <Check size={13} className="text-white" strokeWidth={3} />}
                                        </span>
                                        <span className="text-[17.5px] font-bold text-slate-800">{option}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 근거 없음 처리 */}
                    <div className="mt-[28px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            근거 없음 처리<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-[11px] flex flex-col gap-4">
                            {NO_EVIDENCE_OPTIONS.map(({ key, desc }) => {
                                const active = noEvidenceHandling === key;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setNoEvidenceHandling(key)}
                                        className={`h-[76px] flex items-center gap-3 rounded-xl border-[2px] px-4 text-left transition-colors ${active
                                            ? "border-[#6366F1]"
                                            : "border-[#E4E4E7] hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`w-5.5 h-5.5 shrink-0 rounded-full flex items-center justify-center border-[1.5px] transition-colors ${active ? "bg-[#6366F1]" : "border-[#E4E4E7]"
                                                }`}
                                        >
                                        </span>
                                        <span className="leading-[24.5px]">
                                            <span className="block text-[17.5px] font-bold text-[#27272A]">{key}</span>
                                            <span className="block text-[13px] text-[#9A9AA3]">{desc}</span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 위치·추론·충돌 */}
                    <div className="mt-[27px]">
                        <span className="text-[15px] font-bold text-[#52525B]">위치·추론·충돌</span>

                        <div className="mt-[18.5px] flex items-center justify-between">
                            <span className="text-[13.5px] font-bold text-[#666]">문서 위치 표시</span>
                            <div className="flex flex-col">
                                <span className="absolute mt-[-33.5px] ml-[30px] text-[10px] text-[#5FAA81]">선택</span>
                                <button
                                    type="button"
                                    onClick={() => setIncludeTable(!includeTable)}
                                    className={`
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

                        <div className="mt-[20px] flex items-center justify-between">
                            <span className="text-[13.5px] font-bold text-[#666]">추론 구분</span>
                            {/* <button
                                type="button"
                                onClick={() => setDistinguishInference((v) => !v)}
                                className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors shrink-0 ${distinguishInference ? "bg-indigo-500 justify-end" : "bg-slate-200 justify-start"
                                    }`}
                            >
                                <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
                            </button> */}
                            <button
                                type="button"
                                onClick={() => setIncludeTable(!includeTable)}
                                className={`
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

                        <div className="mt-[19.5px] flex items-center justify-between">
                            <span className="text-[13.5px] font-bold text-[#666]">출처 충돌 표시</span>
                            {/* <button
                                type="button"
                                onClick={() => setShowSourceConflict((v) => !v)}
                                className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors shrink-0 ${showSourceConflict ? "bg-indigo-500 justify-end" : "bg-slate-200 justify-start"
                                    }`}
                            >
                                <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
                            </button> */}
                            <button
                                type="button"
                                onClick={() => setIncludeTable(!includeTable)}
                                className={`
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
                <div className="ml-[44px] mt-[-23px]">
                    <BottomBar context="기본값으로 적용 가능" btnText="적용" />
                </div>
            </div>
        </div>
    );
}