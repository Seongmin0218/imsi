import { Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function GoogleLogin() {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate("/auth/google/loading");
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen w-[1920px] h-[970px] top-[7009px] left-[8787px] pt-[200px] pr-[660px] pb-[200px] pl-[660px] gap-[10px] bg-[#F5F5F7] overflow-hidden">


            <div className="w-[600px] h-[570px] gap-[47px] flex flex-col justify-center items-center">
                {/*로고+타이틀+설명*/}
                <div className="w-[353px] h-[78px] gap-[14px] flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center gap-[8px] w-[201px] h-[43px] ">
                        {/* 로고 */}
                        <div className="bg-[#6366F1] pt-[7px] pr-[15px] pb-[7px] pl-[15px] rounded-[8px] flex gap-[10px] w-[44px] h-[43px]">
                            <span className=" flex items-center justify-center text-[#FFFFFF] text-[24px] font-bold tracking-[-0.03em] w-[14px] h-[29px] items-center">
                                L
                            </span>
                        </div>
                        {/* 타이틀 */}
                        <h1 className="flex items-center w-[149px] h-[33px] text-[28px] font-bold tracking-[-0.03em]">
                            LearningLM
                        </h1>

                    </div>
                    <p className="w-[353px] h-[21px] flex whitespace-nowrap text-center text-[18px] tracking-[-0.03em] font-normal leading-[100%] text-[#52525B]">
                        AI 활용 흐름을 블록형 튜토리얼로 배우는 플랫폼
                    </p>
                </div>




                {/*박스*/}
                <div className="flex flex-col items-center  gap-[10px] w-[600px] h-[377px] rounded-[12px] border border-[2px] border-[#E4E4E7] pt-[50px] px-[10px] pb-[50px] pr-[10px] bg-[#FFFFFF]">

                    <div className="w-[519px] h-[277px] gap-[38px] flex flex-col justify-center items-center">
                        <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden ">

                            <div className="absolute left-[8.79px] w-[21.21px] h-[30px] bg-[#4285F4] " />
                            <div className="absolute top-[8.79px]  w-[30px] h-[21.21px] bg-[#4285F4] " />

                            <div className="absolute top-[30px]  w-[21.21px] h-[30px] bg-[#34A853] " />
                            <div className="absolute top-[30px] left-[8.79px] w-[21.21px] h-[30px] bg-[#34A853] " />

                            <div className="absolute top-[30px] left-[30px] w-[21.21px] h-[30px] bg-[#FBBC05] " />
                            <div className="absolute top-[30px] left-[30px] w-[30px] h-[21.21px] bg-[#FBBC05] " />

                            <div className="absolute top-[8.79px] left-[30px] w-[30px] h-[21.21px] bg-[#EA4335] " />
                            <div className="absolute  left-[30px] w-[30px] h-[8.79px] bg-[#EA4335] " />

                        </div>

                        <div className="w-[519px] h-[65px] gap-[11px] flex flex-col justify-center items-center">
                            <div className="w-[519px] h-[33px] font-bold text-[28px] tracking-[-0.03em] leading-[100%] items-center text-[#27272A] text-center ">
                                Google 계정으로 로그인 실패
                            </div>

                            <div className="flex items-center justify-center w-[519px] h-[21px] text-[18px] tracking-[-0.03em] font-normal leading-[100%]  text-[#52525B] whitespace-nowrap">
                                잠시만 기다려 주세요. 권한 확인을 실패하여 잠시 중단합니다.
                            </div>
                        </div>

                        <div className="flex items-center whitespace-nowrap   w-[519px] h-[76px] border-[2px] rounded-[12px] pt-[26px] pr-[29px] pb-[26px] pl-[29px] gap-[10px] border-[#E9C9C9] bg-[#FBF1F0]">
                            <div className="flex items-center min-w-[408px] h-[24px] gap-[7px] shrink-0">
                                <div className="w-[24px] h-[24px] text-[#EF8888] top-[2px] left-[2px] shrink-0">
                                    <Info />
                                </div>

                                {/* 실패 텍스트 + 다시 시도 */}
                                <div className="flex items-center min-w-[377px] h-[21px] gap-[15px] shrink-0">
                                    <div className="flex items-center min-w-[297px] h-[21px] gap-[9px] shrink-0">
                                        <div className="leading-[100%] min-w-[65px] h-[21px] text-[18px] font-bold tracking-[-0.03em] text-[#27272A] shrink-0">
                                            인증 실패
                                        </div>

                                        <div className="leading-[100%] min-w-[223px] h-[21px] text-[18px] font-normal tracking-[-0.03em] text-[#52525B] shrink-0">
                                            — Google 인증에 실패했습니다.
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleRetry}>
                                        <div className="min-w-[65px] h-[21px] text-[18px] font-bold leading-[100%] tracking-[-0.03em] text-[#6366F1] shrink-0">
                                            다시 시도
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer >
                    <div className="w-[408px] h-[21px] gap-[36px] flex whitespace-nowrap ">

                        <span className="text-[18px] leading-[100%] tracking-[-0.03em] font-normal w-[154px] h-[21px] text-[#9A9AA3]">
                            © 2026 LearningLM
                        </span>

                        <span className="text-[18px] leading-[100%] tracking-[-0.03em] font-normal w-[61px] h-[21px] text-[#9A9AA3]">
                            이용약관
                        </span>

                        <span className="text-[18px] leading-[100%] tracking-[-0.03em] font-normal w-[121px] h-[21px] text-[#9A9AA3]">
                            개인정보처리방침
                        </span>

                    </div>
                </footer>
            </div>
        </div>

    );
}