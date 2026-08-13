import { useState } from "react"

export function PageHeader(props: { title: string, subTitle: string, content: string, text1: string, text2: string, text3?: string, bor1: string, bor2: string, bor3?: string, bg1: string, bg2: string, bg3?: string, pageState: string, imgState: string }) {
    // console.log(props)
    const state = [
        {
            id: 1,
            text: props.text1,
            bor: props.bor1,
            bg: props.bg1
        },
        {
            id: 2,
            text: props.text2,
            bor: props.bor2,
            bg: props.bg2
        },
        {
            id: 3,
            text: props.text3,
            bor: props.bor3,
            bg: props.bg3
        },
    ]

    return (
        <div className="w-full min-h-[113px] text-[#27272A]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-[31px] h-[31px] bg-[#4A5E8A] rounded-[8px]" />

                    <img src={props.imgState} alt="flag" className="w-[22px] h-[22px] absolute ml-[4px]" />
                    <p className="mt-[4px] ml-[6px] text-[20px] font-bold tracking-tighter">{props.title}</p>
                    <p className="text-[#9A9AA3] text-[10px] mt-[17px]">{props.subTitle}</p>
                </div>
                <p className={`h-[27px] mt-[6px] flex items-center justify-center ${props.pageState == "CORE" ? "w-[54px] bg-[#6366F1] text-white" : "w-[130px] bg-[#DFF2DF] border-[2px] border-[#5FAA81] text-[#5FAA81]"} text-[14px] font-bold rounded-[8px]`}>{props.pageState}</p>
            </div>
            <p className="mt-[11.5px] text-[#52525B] text-[15px] tracking-tighter">{props.content}</p>
            <div className="mt-[10.5px] flex items-center">
                {state.map((item) => (
                    <div key={item.id} className="w-[48px] h-[24px] mr-[10px] mt-[2px] flex items-center justify-center rounded-[8px] border-[2px] text-[10.5px] font-bold"
                        style={{ backgroundColor: `#${item.bg}`, borderColor: `#${item.bor}`, color: `#${item.bor}` }}>
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    )
}