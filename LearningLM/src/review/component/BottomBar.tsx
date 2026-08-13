export function BottomBar(props: { context: string, btnText: string }) {
    return (
        <div className="w-[550px] h-[82px] ml-[-44px] mt-[16px] px-[42px] bg-white flex items-center justify-between border-t-[1.5px] border-[#E4E4E7]">
            <p className="text-[#9A9AA3] text-[15.5px]">{props.context}</p>
            <div className="cursor-pointer hover:bg-[#3A3DCE] hover:text-white bg-[#6366F1] text-white w-[66px] h-[38px] flex items-center justify-center rounded-[8px] 
            text-[13.5px] text-[#666] font-bold">{props.btnText}</div>
        </div>
    )
}