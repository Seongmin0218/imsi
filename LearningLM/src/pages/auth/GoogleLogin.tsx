import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import api from "../../api/api";

interface GoogleAuthorizationResponse {
    code: string;
    message: string;
    result: {
        authorizationUrl: string;
    };
    success: boolean;
}

export default function GoogleLogin() {
    const navigate = useNavigate();

    const [
        errorMessage,
        setErrorMessage,
    ] = useState("");

    /**
     * 백엔드에서 authorizationUrl이
     * 절대 URL 또는 상대 URL 어느 쪽으로 와도
     * 정상적으로 Google 인증 페이지로 이동할 수 있게 합니다.
     */
    const resolveAuthorizationUrl = (
        authorizationUrl: string
    ) => {
        /**
         * 이미 완전한 URL이면 그대로 사용합니다.
         */
        if (
            authorizationUrl.startsWith(
                "http://"
            ) ||
            authorizationUrl.startsWith(
                "https://"
            )
        ) {
            return authorizationUrl;
        }

        /**
         * 상대 경로라면
         * 공용 Axios의 백엔드 baseURL 기준으로
         * 절대 URL로 변환합니다.
         */
        const baseURL =
            api.defaults.baseURL;

        if (!baseURL) {
            throw new Error(
                "API 서버 주소가 설정되어 있지 않습니다."
            );
        }

        return new URL(
            authorizationUrl,
            baseURL
        ).toString();
    };

    useEffect(() => {
        let cancelled = false;

        const startGoogleLogin =
            async () => {
                try {
                    /**
                     * Google 로그인 시작 API
                     *
                     * GET /api/auth/google
                     */
                    const response =
                        await api.get<
                            GoogleAuthorizationResponse
                        >(
                            "/auth/google"
                        );

                    if (cancelled) {
                        return;
                    }

                    const authorizationUrl =
                        response.data
                            ?.result
                            ?.authorizationUrl;

                    /**
                     * 백엔드 응답에
                     * authorizationUrl이 없는 경우
                     */
                    if (
                        !authorizationUrl
                    ) {
                        throw new Error(
                            "Google 인증 URL을 받지 못했습니다."
                        );
                    }

                    /**
                     * OAuth 진행 중임을 기록합니다.
                     *
                     * 추후 callback 성공 처리에서
                     * Google 로그인 흐름인지 구분하는 데
                     * 사용할 수 있습니다.
                     */
                    sessionStorage.setItem(
                        "googleLoginPending",
                        "true"
                    );

                    const resolvedUrl =
                        resolveAuthorizationUrl(
                            authorizationUrl
                        );

                    /**
                     * Google 로그인 페이지로 이동
                     *
                     * replace를 사용해서
                     * 뒤로가기를 눌렀을 때 loading 페이지로
                     * 다시 튕기는 현상을 줄입니다.
                     */
                    window.location.replace(
                        resolvedUrl
                    );
                } catch (error) {
                    if (cancelled) {
                        return;
                    }

                    console.error(
                        "Google 로그인 시작 실패:",
                        error
                    );

                    sessionStorage.removeItem(
                        "googleLoginPending"
                    );

                    setErrorMessage(
                        "Google 로그인 요청을 시작하지 못했습니다."
                    );

                    /**
                     * 잠깐 오류 메시지를 보여준 뒤
                     * 기존 실패 페이지로 이동합니다.
                     */
                    window.setTimeout(
                        () => {
                            navigate(
                                "/auth/google/error",
                                {
                                    replace:
                                        true,
                                }
                            );
                        },
                        1000
                    );
                }
            };

        startGoogleLogin();

        return () => {
            cancelled = true;
        };
    }, [navigate]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F5F5F7] px-[24px]">
            <div className="flex w-full max-w-[600px] flex-col items-center gap-[47px]">
                {/* Logo + Title */}
                <div className="flex flex-col items-center gap-[14px]">
                    <div className="flex items-center justify-center gap-[8px]">
                        {/* Logo */}
                        <div className="flex h-[43px] w-[44px] items-center justify-center rounded-[8px] bg-[#6366F1]">
                            <span className="text-[24px] font-bold tracking-[-0.03em] text-white">
                                L
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-[28px] font-bold tracking-[-0.03em] text-[#27272A]">
                            LearningLM
                        </h1>
                    </div>

                    <p className="text-center text-[18px] font-normal tracking-[-0.03em] text-[#52525B]">
                        AI 활용 흐름을
                        블록형 튜토리얼로
                        배우는 플랫폼
                    </p>
                </div>

                {/* Auth Box */}
                <div className="flex min-h-[310px] w-full flex-col items-center justify-center rounded-[12px] border-2 border-[#E4E4E7] bg-white px-[30px] py-[50px]">
                    <div className="flex w-full flex-col items-center gap-[21px]">
                        {/* Google Symbol */}
                        <div className="relative h-[60px] w-[60px] overflow-hidden rounded-full">
                            <div className="absolute left-[8.79px] h-[30px] w-[21.21px] bg-[#4285F4]" />
                            <div className="absolute top-[8.79px] h-[21.21px] w-[30px] bg-[#4285F4]" />

                            <div className="absolute top-[30px] h-[30px] w-[21.21px] bg-[#34A853]" />
                            <div className="absolute left-[8.79px] top-[30px] h-[30px] w-[21.21px] bg-[#34A853]" />

                            <div className="absolute left-[30px] top-[30px] h-[30px] w-[21.21px] bg-[#FBBC05]" />
                            <div className="absolute left-[30px] top-[30px] h-[21.21px] w-[30px] bg-[#FBBC05]" />

                            <div className="absolute left-[30px] top-[8.79px] h-[21.21px] w-[30px] bg-[#EA4335]" />
                            <div className="absolute left-[30px] h-[8.79px] w-[30px] bg-[#EA4335]" />
                        </div>

                        {/* Spinner */}
                        <div className="h-[40px] w-[40px] animate-spin rounded-full border-[4px] border-[#E4E4E7] border-t-[#6366F1]" />

                        <div className="flex flex-col items-center gap-[11px]">
                            <h2 className="text-center text-[28px] font-bold tracking-[-0.03em] text-[#27272A]">
                                Google 계정으로
                                인증 중...
                            </h2>

                            {errorMessage ? (
                                <p className="text-center text-[16px] font-medium tracking-[-0.03em] text-[#EF8888]">
                                    {
                                        errorMessage
                                    }
                                </p>
                            ) : (
                                <p className="text-center text-[18px] font-normal tracking-[-0.03em] text-[#52525B]">
                                    잠시만
                                    기다려주세요.
                                    권한 확인이
                                    끝나면 자동으로
                                    이동합니다.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer>
                    <div className="flex flex-wrap items-center justify-center gap-[36px] text-[18px] font-normal tracking-[-0.03em] text-[#9A9AA3]">
                        <span>
                            © 2026
                            LearningLM
                        </span>

                        <span>
                            이용약관
                        </span>

                        <span>
                            개인정보처리방침
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    );
}