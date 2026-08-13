import { useState, useMemo } from "react";
import { ChevronDown, Check, Bold } from "lucide-react";
import { PageHeader } from "./component/PageHeader";
import text from "../../assets/text.svg";
import { BottomBar } from "./component/BottomBar";

const CATEGORIES = ["배경", "사실", "요구", "예시"] as const;

type Category = (typeof CATEGORIES)[number];

interface ToggleRowProps {
    title: string;
    description: string;
    subLabel?: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    className?: string;
}

export function CTX_003() {
    const [useDirectInput, setUseDirectInput] = useState<boolean>(true);
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<Category>("배경");
    const [priority, setPriority] = useState<boolean>(false); // 우선 적용
    const [keepOriginal, setKeepOriginal] = useState<boolean>(true); // 원문 유지
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const isEmpty = content.trim().length === 0;
    const isRequired = true; // 필수 항목

    const footerLabel = useMemo(() => {
        if (isEmpty) return "참고 내용 미입력";
        return `참고 내용 ${content.trim().length}자 입력됨`;
    }, [content, isEmpty]);

    const showValidationWarning = useDirectInput && isRequired && isEmpty;

    return (
        <div className="min-h-screen w-full bg-slate-100 flex items-start justify-center p-6">
            <div className="w-[498px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Header */}

                <div className="px-[25px] pt-[26px] pb-6">
                    <PageHeader
                        title="직접 입력 내용 사용하기"
                        subTitle="CTX-002 · CONTEXT"
                        content="대표 주제와 키워드를 입력해 작업 범위를 정합니다."
                        text1="필수1"
                        text2="선택3"
                        text3="누락1"
                        bor1="6366F1"
                        bor2="5FAA81"
                        bor3="EF8888"
                        bg1="DFE0FF"
                        bg2="DFF2DF"
                        bg3="FFE1E1"
                        pageState="CORE"
                        imgState={text} />
                    <div className="w-[548px] h-[1.5px] mt-[8px] ml-[-24px] bg-[#E4E4E7]" />
                </div>
                {/*main */}
                <div className="px-[50px] mt-[-8px] pb-6">
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <span
                                onClick={() => setUseDirectInput((v) => !v)}
                                className={`w-[16px] h-[16px] rounded-[2px] flex items-center justify-center border transition-colors ${useDirectInput
                                    ? "bg-[#6366F1] border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                    }`}
                            >
                                {useDirectInput && <Check size={13} className="text-white" strokeWidth={3} />}
                            </span>
                            <span className="text-[15px] font-bold text-[#27272A]">
                                직접 입력 내용 사용하기
                            </span>
                        </label>

                        <div className="flex items-center gap-[6px]">
                            <p
                                // onClick={() => setDropdownOpen((v) => !v)}
                                className="flex items-center gap-1 text-[10.5px] font-bold text-[#6366F1] hover:text-slate-700"
                            >
                                필수
                            </p>
                            <ChevronDown size={18} />
                        </div>
                    </div>

                    {useDirectInput && isRequired && (
                        <p className="mt-[9.5px] text-[13px] text-[#C0473C]">
                            * 필수 작성 항목입니다
                        </p>
                    )}

                    {/* Textarea */}
                    <div className="mt-[15px] flex flex-col">
                        <label className="text-[15px] font-bold text-[#52525B]">
                            참고 내용<span className="text-[#C0473C]">*</span>
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="참고할 내용을 직접 입력하세요"
                            rows={4}
                            className={`mt-[21px] w-[440px] h-[80px] border-[2px] rounded-[12px] px-5 py-[10px] text-[13px] text-[#9A9AA3] placeholder:text-[15px] placeholder:text-[#9A9AA3] outline-none resize-none transition-colors border ${showValidationWarning
                                ? "border-[#EF8888] focus:border-rose-400"
                                : "border-[#E4E4E7] focus:border-indigo-400"
                                }`}
                        />
                    </div>

                    {/* 내용 구분 */}
                    <div className="mt-[29px]">
                        <div className="flex items-center justify-between">
                            <span className="text-[15.5px] font-bold text-[#52525B]">내용 구분</span>
                            <span className="mt-[6px] text-[10.5px] text-[#5FAA81]">선택</span>
                        </div>
                        <div className="w-[300px] h-[37px] flex gap-[8px] mt-[10px] font-bold text-[13.5px]">
                            {CATEGORIES.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setCategory(c)}
                                    className={`cursor-pointer flex-1 h-full flex items-center justify-center rounded-md transition-colors ${category === c
                                        ? "bg-[#6366F1] text-white"
                                        : "text-[#666] border-[2px] border-[#E4E4E7] hover:border-slate-300"
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* 우선 적용 */}
                    <div className="mt-[14px] font-bold text-[#52525B]">
                        <div className="mt-[28px]">
                            <p className="absolute mt-[5px] text-[15px]">우선 적용</p>
                            <p className="absolute mt-[39px] text-[#666] text-[14px]">다른 문서보다 우선 참고</p>
                        </div>
                        <div className="mt-[-5px]">
                            <ToggleRow
                                title=""
                                description=""
                                checked={priority}
                                onChange={setPriority}
                            />
                        </div>


                        {/* 원문 유지 */}
                        <div className="mt-[10px]">
                            <p className="absolute mt-[5px] text-[15px]">원문 유지</p>
                            <p className="absolute mt-[33px] text-[14px] text-[#666]">입력 표현을 그대로 보존</p>
                            <p className="absolute mt-[53px] font-normal text-[#6366F1] text-[10px]">기본 ON</p>
                        </div>
                        <div className="mt-[0px]">
                            <ToggleRow
                                title=""
                                description=""
                                subLabel=""
                                checked={keepOriginal}
                                onChange={setKeepOriginal}
                            />
                        </div>
                    </div>
                </div>
                <div className="ml-[44px] mt-[-35px]">
                    <BottomBar
                        context="참고 내용 미입력"
                        btnText="검증" />
                </div>
            </div>
        </div>
    );
}

function ToggleRow({ title, description, subLabel, checked, onChange, className }: ToggleRowProps) {
    const [includeTable, setIncludeTable] = useState(true);
    return (
        <div className="py-[15px] ">
            {/* <div> */}
            <div className="w-full flex items-center justify-between gap-4 text-[#52525B]">
                <span className="text-[15px] font-bold">{title}</span>
                <span className="ml-[290px] text-[10.5px] text-[#5FAA81] font-normal">선택</span>
            </div>
            <div className="flex items-center justify-between">
                <p className="mt-2 text-[13.5px] text-[#52525B]">{description}</p>
                <button
                    type="button"
                    onClick={() => setIncludeTable(!includeTable)}
                    className={`cursor-pointer
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
            {subLabel && (
                <p className="mt-[-2px] text-[10.5px] text-[#6366F1] font-normal">{subLabel}</p>
            )}
        </div>
    );
}