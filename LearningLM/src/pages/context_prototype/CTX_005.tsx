import { useState } from "react";
import {
    Check,
    ChevronDown,
    PenTool,
    Monitor,
    Ruler,
    Lightbulb,
    BarChart2,
    List,
    RefreshCw,
    Plus,
} from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import flag from "../../assets/flag-checkered.svg";
import { BottomBar } from "./component/BottomBar";

const ROLES = [
    { label: "기획자", icon: PenTool },
    { label: "개발자", icon: Monitor },
    { label: "디자이너", icon: Ruler },
    { label: "튜터", icon: Lightbulb },
    { label: "분석가", icon: BarChart2 },
    { label: "작성자", icon: List },
    { label: "리뷰어", icon: RefreshCw },
    { label: "직접입력", icon: Plus },
] as const;
type Role = (typeof ROLES)[number]["label"];

const PERSPECTIVES = ["사용자", "비즈니스", "기술", "품질", "학습"] as const;
type Perspective = (typeof PERSPECTIVES)[number];

const EXPERTISE_LEVELS = ["기본", "실무", "전문"] as const;
type ExpertiseLevel = (typeof EXPERTISE_LEVELS)[number];

export function CTX_005() {
    const [useRoleAssignment, setUseRoleAssignment] = useState<boolean>(true);
    const [role, setRole] = useState<Role>("기획자");
    const [perspective, setPerspective] = useState<Perspective>("사용자");
    const [expertise, setExpertise] = useState<ExpertiseLevel>("기본");
    const [behaviorPrinciple, setBehaviorPrinciple] = useState<string>("");
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isRequired = true;
    const isEmpty = !role;
    const showValidationWarning = useRoleAssignment && isRequired && isEmpty;

    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[500px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-[25px] pt-[27px] pb-6">
                    <PageHeader
                        title="역할 부여하기"
                        subTitle="CTX-005 · CONTEXT"
                        content="AI가 수행할 역할과 관점을 지정합니다."
                        text1="필수1"
                        text2="선택3"
                        text3="추천1"
                        bor1="6366F1"
                        bor2="5FAA81"
                        bor3="A9BDD4"
                        bg1="DFE0FF"
                        bg2="DFF2DF"
                        bg3="ECEEFF"
                        pageState="CORE"
                        imgState={flag}
                    />
                </div>
                <div className="w-[498px] h-[1.5px] mt-[-16px] ml-[-24px] bg-[#E4E4E7]" />
                <div className="px-[50px] mt-[-8px] pb-6">
                    {/* Checkbox row */}
                    <div className="pt-6 flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUseRoleAssignment((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useRoleAssignment
                                    ? "bg-indigo-500 border-indigo-500"
                                    : "bg-white border-slate-300"
                                    }`}
                            >
                                {useRoleAssignment && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15px] font-bold text-[#27272A]">
                                역할 부여하기
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

                    {useRoleAssignment && isRequired && (
                        <p className="mt-2.5 text-[14px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}



                    {/* 역할 */}
                    <div className="mt-[16px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15.5px] font-bold text-[#52525B]">
                                역할<span className="text-[#C0473C]">*</span>
                            </span>
                            <span className="h-[24px] mt-[-1px] text-[11px] font-bold text-white bg-[#6366F1] rounded-[8px] px-2 flex items-center justify-center">
                                튜토리얼 추천
                            </span>
                        </div>
                        <div className="mt-[6px] grid grid-cols-4 gap-2 gap-y-[7px]">
                            {ROLES.map(({ label, icon: Icon }) => {
                                const active = role === label;
                                return (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => setRole(label)}
                                        className={`h-[92px] cursor-pointer flex flex-col items-center justify-center gap-1.5 rounded-xl py-3 border-[2px] transition-colors ${active
                                            ? "border-[#6466F1]"
                                            : "border-[#E4E4E7] bg-white hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`w-[31px] h-[31px] rounded-[8px] flex items-center justify-center ${active ? "bg-[#6366F1]" : "bg-white border-[2px] border-[#E4E4E7]"
                                                }`}
                                        >
                                            <Icon size={16} className={active ? "text-white" : "text-slate-500"} />
                                        </span>
                                        <span className="text-[13px] font-bold text-[#666]">
                                            {label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 역할 관점 */}
                    <div className="mt-[28px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15.5px] font-bold text-[#52525B]">역할 관점</span>
                            <span className="mt-[6px] text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="mt-[13px] flex gap-2">
                            {PERSPECTIVES.map((p) => (
                                <div
                                    key={p}
                                    // type="button"
                                    onClick={() => setPerspective(p)}
                                    className={`h-[37px] cursor-pointer flex-1 rounded-[8px] flex items-center justify-center text-[13.5px] font-bold transition-colors ${perspective === p
                                        ? "bg-[#6366F1] text-white"
                                        : "bg-white text-[#666] font-bold border-[2px] border-[#E4E4E7] hover:border-slate-300"
                                        }`}
                                >
                                    {p}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 전문성 */}
                    <div className="mt-[28px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#52525B]">전문성</span>
                            <span className="mt-[6px] text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="w-full h-[42px] mt-[9.5px] flex items-center border-[2px] border-[#E4E4E7] rounded-[8px] ">
                            <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center rounded-l-[8px]">기본</p>
                            <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center border-l-[2px] border-r-[2px] border-[#E4E4E7]">실무</p>
                            <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center rounded-r-[8px]">전문</p>
                        </div>
                    </div>

                    {/* 행동 원칙 */}
                    <div className="mt-[29px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#52525B]">행동 원칙</span>
                            <span className="mt-[6px] text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <textarea
                            value={behaviorPrinciple}
                            onChange={(e) => setBehaviorPrinciple(e.target.value)}
                            placeholder="추가 설정 — 행동 원칙 입력"
                            rows={3}
                            className="mt-5 w-full h-[80px] rounded-lg px-[18px] pt-[10px] text-[14px] text-[#E4E4E7] placeholder:text-slate-400 outline-none resize-none transition-colors border-[2px] border-[#E4E4E7] focus:border-indigo-400"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="ml-[45px] mt-[-28px]">
                    <BottomBar context="기본값으로 저장 가능" btnText="적용" />
                </div>
            </div>
        </div>
    );
}