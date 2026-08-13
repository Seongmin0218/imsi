import { useState, useMemo } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import text from "../assets/text.svg";
import light from "../assets/light.svg";
import dashed from "../assets/coditionBtn.png";
import { BottomBar } from "./component/BottomBar";

type ConditionStatus = "통과" | "미흡" | "대기";

interface ConditionItem {
    id: string;
    title: string;
    subtitle: string;
    status: ConditionStatus;
}

const INITIAL_CONDITIONS: ConditionItem[] = [
    {
        id: "c1",
        title: "비교표에 4개 열 이상 포함",
        subtitle: "← PROCESS · 표로 재구성",
        status: "통과",
    },
    {
        id: "c2",
        title: "각 항목에 근거 표기",
        subtitle: "← INPUT · 제약조건",
        status: "미흡",
    },
    {
        id: "c3",
        title: "존댓말 톤 유지",
        subtitle: "연결 안 됨 — 소스 지정 필요",
        status: "대기",
    },
];

const STATUS_STYLES: Record<ConditionStatus, string> = {
    통과: "bg-[#6366F1] text-white",
    미흡: "bg-[#EF8888] text-white",
    대기: "text-[#666] border-[2px] border-[#E4E4E7]",
};

const APPLY_MODES = ["모두 충족", "핵심 필수"] as const;
type ApplyMode = (typeof APPLY_MODES)[number];

export function RV_003() {
    const [useConditionCheck, setUseConditionCheck] = useState<boolean>(true);
    const [conditions] = useState<ConditionItem[]>(INITIAL_CONDITIONS);
    const [applyMode, setApplyMode] = useState<ApplyMode>("모두 충족");
    const [partialAllowed, setPartialAllowed] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isRequired = true;

    const counts = useMemo(() => {
        const result: Record<ConditionStatus, number> = { 통과: 0, 미흡: 0, 대기: 0 };
        conditions.forEach((c) => {
            result[c.status] += 1;
        });
        return result;
    }, [conditions]);

    const unconnectedCount = counts["대기"];
    const isEmpty = unconnectedCount > 0;
    const showValidationWarning = useConditionCheck && isRequired && isEmpty;

    const footerLabel = isEmpty
        ? `조건 ${unconnectedCount}개 미연결 · 검사 실행 불가`
        : "모든 조건 연결됨 · 검사 가능";
    const [includeTable, setIncludeTable] = useState(true);
    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[550px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-[25px] pt-[26px] pb-6">
                    <PageHeader
                        title="조건 충족 확인하기"
                        subTitle="RV-003 · REVIEW"
                        content="이전 블록의 조건을 불러와 검사 순서를 정합니다. 각 조건은 소스 포트로 원본 블록과 연결됩니다."
                        text1="필수2"
                        text2="선택1"
                        text3=""
                        bor1="6366F1"
                        bor2="5FAA81"
                        bor3="FFF"
                        bg1="DFE0FF"
                        bg2="DFF2DF"
                        bg3="FFF"
                        pageState="CORE"
                        imgState={light}
                    />
                </div>
                <div className="w-[550px] h-[1.5px] mt-[-10px] ml-[-26px] bg-[#E4E4E7]" />
                <div className="px-[50px] mt-[-8px] pb-6">
                    {/* Checkbox row */}
                    <div className="pt-[23.5px] flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUseConditionCheck((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useConditionCheck
                                    ? "bg-[#6366F1] border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                    }`}
                            >
                                {useConditionCheck && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15.5x] font-bold text-[#27272A]">
                                조건 검사
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

                    {useConditionCheck && isRequired && (
                        <p className="mt-[8.5px] text-[13.5px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}

                    {/* 조건 목록 */}
                    <div className="mt-[15px] text-[15px] font-bold">
                        <span className="text-[#52525B] tracking-tighter">
                            조건 목록
                            <span className=" text-[#CDCDCD]">
                                · 이전 블록에서 불러옴
                            </span>
                            <span className="text-[#C0473C]">*</span>
                        </span>

                        <div className="mt-[12px] flex flex-col gap-[13px]">
                            {conditions.map((c) => (
                                <div
                                    key={c.id}
                                    className="h-[61px] flex items-center justify-between gap-3 rounded-[12px] border-[2px] border-[#E4E4E7] px-4 py-3.5"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span
                                            className={`w-5.5 h-5.5 shrink-0 rounded-full ${c.status === "통과" ? "bg-[#6366F1]" : (c.status === "미흡" ? "border-[1.5px] border-[#EF8888]" : "border-[1.5px] border-[#666]")}`}
                                        />
                                        <span className="min-w-0 leading-[17px]">
                                            <span className="block text-[14.5px] font-bold text-[#666] tracking-tighter">
                                                {c.title}
                                            </span>
                                            <span className="block text-[10.5px] font-normal text-[#9A9AA3]">
                                                {c.subtitle}
                                            </span>
                                        </span>
                                    </div>

                                    <span
                                        className={`w-[64px] h-[36px] text-[13.5px] font-bold rounded-[8px] flex items-center justify-center ${STATUS_STYLES[c.status]}`}
                                    >
                                        {c.status}
                                    </span>
                                </div>
                            ))}
                            <div className="w-full h-[3px] mt-[1px] bg-[#E4E4E7]" />
                            <button
                                type="button"
                                className="cusor-pointer h-[48px] flex items-center justify-center gap-1.5 border-[2px] border-[#E4E4E7] border-dashed rounded-xl text-[13.5px] font-bold text-[#9A9AA3] hover:border-slate-400 hover:text-slate-500 transition-colors"
                            >
                                {/* <img src={dashed} className="w-full h-[48px]" /> */}
                                <Plus size={14} />
                                <p className="cursor-pointer text-[18px]">조건 불러오기</p>
                            </button>
                        </div>
                    </div>

                    {/* 적용 방식 */}
                    <div className="mt-[27px]">
                        <span className="text-[15.5px] font-bold text-[#52525B]">
                            적용 방식<span className="text-[#C0473C]">*</span>
                        </span>
                        <div className="mt-2.5 flex gap-2">
                            {/* {APPLY_MODES.map((mode) => (
                                <button
                                    key={mode}
                                    type="button"
                                    onClick={() => setApplyMode(mode)}
                                    className={`flex-1 rounded-md py-2 text-[14px] font-bold transition-colors ${applyMode === mode
                                        ? "bg-[#6366F1] text-white font-bold"
                                        : "bg-white text-[#666] border border-slate-200 hover:border-slate-300"
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))} */}
                            <div className="w-full h-[40px] flex items-center border-[2px] border-[#E4E4E7] rounded-[8px] text-[15.5px] text-[#666]">
                                <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[230px] h-full flex items-center justify-center rounded-l-[8px]">모두 충족</p>
                                <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[230px] h-full flex items-center justify-center border-l-[2px] border-[#E4E4E7]">핵심 필수</p>
                            </div>
                        </div>
                    </div>

                    {/* 부분 충족 허용 */}
                    <div className="mt-[30px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#52525B]">부분 충족 허용</span>
                        </div>
                        <div className="mt-[14px] flex items-center justify-between">
                            <span className="mt-[4px] text-[13.5px] text-[#666] font-bold">일부만 만족해도 통과 처리</span>
                            <div className="flex flex-col">
                                <span className="absolute mt-[-30px] ml-[30px] text-[10px] text-[#5FAA81]">선택</span>
                                <button
                                    type="button"
                                    onClick={() => setIncludeTable(!includeTable)}
                                    className={`
                                    mt-[4px]
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

                    {/* 결과 표시 */}
                    <div className="mt-[29px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#52525B]">결과 표시</span>
                            <span className="mt-[7px] mr-[7px] text-[10px] text-[#666]">고정</span>
                        </div>
                        <div className="mt-3 w-[220px] h-[37px] flex gap-2 text-[13px]">
                            <span className="flex-1 flex items-center justify-center rounded-md py-3 font-bold bg-[#6366F1] text-white">
                                통과{counts["통과"]}
                            </span>
                            <span className="flex-1 flex items-center justify-center text-center rounded-md py-2.5 font-bold bg-[#EF8888] text-white">
                                미흡{counts["미흡"]}
                            </span>
                            <span className="flex-1 flex items-center justify-center text-center rounded-md py-2.5 font-bold bg-white text-[#666] border border-[#E4E4E7]">
                                대기{counts["대기"]}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="ml-[44px] mt-[-24px]">
                    <BottomBar context="조건 1개 미연결 · 검사 실행 불가" btnText="검사" />
                </div>
            </div>
        </div>
    );
}