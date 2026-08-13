import { useState, useMemo } from "react";
import { Check, ChevronDown, AlertTriangle } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import text from "../../assets/text.svg";
import flag from "../../assets/flag-checkered.svg";
import { BottomBar } from "./component/BottomBar";

const STAGES = ["아이디어", "기획", "설계", "개발", "QA", "운영"] as const;
type Stage = (typeof STAGES)[number];

const IMPORTANCE_LEVELS = ["참고", "중요", "반드시"] as const;
type ImportanceLevel = (typeof IMPORTANCE_LEVELS)[number];

export function CTX_006() {
    const [useBackgroundInput, setUseBackgroundInput] = useState<boolean>(true);
    const [backgroundText, setBackgroundText] = useState<string>("");
    const [stage, setStage] = useState<Stage>("아이디어");
    const [decidedItems, setDecidedItems] = useState<string>("");
    const [undecidedItems, setUndecidedItems] = useState<string>("");
    const [importance, setImportance] = useState<ImportanceLevel>("중요");
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isRequired = true;
    const isEmpty = backgroundText.trim().length === 0;
    const showValidationWarning = useBackgroundInput && isRequired && isEmpty;

    const footerLabel = useMemo(() => {
        if (isEmpty) return "배경 설명 미입력";
        return `배경 설명 ${backgroundText.trim().length}자 입력됨`;
    }, [backgroundText, isEmpty]);

    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[500px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-[25px] pt-[26px] pb-6">
                    <PageHeader
                        title="배경 설명 추가하기"
                        subTitle="CTX-006 · CONTEXT"
                        content="작업의 배경 상황과 현재 단계를 알려줍니다."
                        text1="필수1"
                        text2="선택3"
                        text3="누락1"
                        bor1="6366F1"
                        bor2="5FAA81"
                        bor3="EF8888"
                        bg1="DFE0FF"
                        bg2="DFF2DF"
                        bg3="FFE1E1"
                        pageState="RECOMMENDED"
                        imgState={flag}
                    />
                </div>
                <div className="w-[498px] h-[1.5px] mt-[-16px] ml-[-24px] bg-[#E4E4E7]" />
                <div className="px-[50px] mt-[-8px] pb-6">
                    {/* Checkbox row */}
                    <div className="pt-6 flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUseBackgroundInput((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useBackgroundInput
                                    ? "bg-[#6366F1] border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                    }`}
                            >
                                {useBackgroundInput && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15px] font-bold text-[#27272A]">
                                배경 설명 추가하기
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

                    {useBackgroundInput && isRequired && (
                        <p className="mt-2.5 text-[14px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}



                    {/* 배경 설명 */}
                    <div className="mt-[13px]">
                        <span className="text-[15px] font-bold text-[#52525B]">
                            배경 설명<span className="text-[#C0473C]">*</span>
                        </span>

                        {showValidationWarning && (
                            <p className="mt-4.5 flex items-center gap-1 text-[13.5px] text-[#EF8888] font-bold">
                                <AlertTriangle size={14} />
                                참고할 배경을 입력해주세요.
                            </p>
                        )}

                        <textarea
                            value={backgroundText}
                            onChange={(e) => setBackgroundText(e.target.value)}
                            placeholder="참고할 내용을 직접 입력하세요"
                            rows={4}
                            className={`mt-[7px] w-full h-[80px] border-[2px] rounded-[12px] px-[22px] pt-[10px] text-[15.5px] text-[#666] placeholder:text-[#9A9AA3] placeholder:text-[15.5px] outline-none resize-none transition-colors ${showValidationWarning
                                ? "border-[#EF8888] focus:border-rose-400"
                                : "border-[#E4E4E7] focus:border-indigo-400"
                                }`}
                        />
                    </div>

                    {/* 현재 단계 */}
                    <div className="mt-[23px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] font-bold text-[#52525B]">현재 단계</span>
                            <span className="mt-[7px] text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="mt-[12px] flex flex-wrap gap-[6px] gap-y-[12px]">
                            {STAGES.map((s) => (
                                <div
                                    key={s}
                                    // type="button"
                                    onClick={() => setStage(s)}
                                    className={`h-[37px] rounded-md px-4 flex items-center justify-center text-[14px] font-bold transition-colors ${stage === s
                                        ? "bg-[#6366F1] text-white"
                                        : "bg-white text-slate-600 border-[2px] border-[#E4E4E7] hover:border-slate-300"
                                        }`}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 결정·미정 사항 */}
                    <div className="mt-[28px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15.5px] font-bold text-[#52525B]">결정·미정 사항</span>
                            <span className="mt-[6px] text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <textarea
                                value={decidedItems}
                                onChange={(e) => setDecidedItems(e.target.value)}
                                placeholder="결정된 사항 입력"
                                rows={2}
                                className="h-[80px] rounded-xl px-4 pt-[10px] text-[14px] text-[#666] placeholder:text-[#9A9AA3] placeholder:text-[15px] outline-none resize-none transition-colors border-[2px] border-[#E4E4E7] focus:border-indigo-400"
                            />
                            <textarea
                                value={undecidedItems}
                                onChange={(e) => setUndecidedItems(e.target.value)}
                                placeholder="미정 사항 입력"
                                rows={2}
                                className="h-[80px] rounded-xl px-4 pt-[10px] text-[14px] text-[#666] placeholder:text-[#9A9AA3] placeholder:text-[15px] outline-none resize-none transition-colors border-[2px] border-[#E4E4E7] focus:border-indigo-400"
                            />
                        </div>
                    </div>

                    {/* 중요도 */}
                    <div className="mt-[28px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[16.5px] font-bold text-slate-800">중요도</span>
                            <span className="mt-[8px] text-[10px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="h-[42px] mt-[8px] flex items-center border-[2px] border-[#E4E4E7] rounded-[8px] ">
                            <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center rounded-l-[8px]">참고</p>
                            <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center border-l-[2px] border-r-[2px] border-[#E4E4E7]">중요</p>
                            <p className="cursor-pointer hover:bg-[#6366F1] hover:text-white hover:font-bold w-[135px] h-full flex items-center justify-center rounded-r-[8px]">반드시</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="ml-[45px] mt-[-24px]">
                    <BottomBar context="배경 설명 미입력" btnText="검증" />
                </div>
            </div>
        </div>
    );
}