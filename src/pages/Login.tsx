import {
    useEffect,
    useState,
} from "react";
import { FcGoogle } from "react-icons/fc";
import {
    useLocation,
    useNavigate,
} from "react-router-dom";
import { Check } from "lucide-react";

import api from "../api/api";

interface LoginLocationState {
    from?: {
        pathname: string;
        search?: string;
        hash?: string;
    };
}

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [checked, setChecked] = useState(false);

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const [emailState, setEmailState] = useState<
        "basic" | "incorrect" | "success"
    >("basic");

    const [emailFormErr, setEmailFormErr] =
        useState(false);

    const [pwCheckState, setPwCheckState] = useState<
        "basic" | "incorrect" | "success"
    >("basic");

    const [pwNumFail, setPwNumFail] = useState<
        "basic" | "incorrect" | "success"
    >("basic");

    const [ckBox, setCkBox] = useState(false);

    const [, setNoAgree] = useState(false);
    const [, setMem] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    };

    useEffect(() => {
        if (
            0 < pw.length &&
            pw.length < 8
        ) {
            setPwNumFail("incorrect");
        } else {
            setPwNumFail("success");
        }
    }, [pw]);

    useEffect(() => {
        if (!ckBox) {
            setNoAgree(true);
        } else {
            setNoAgree(false);
            setMem(true);
        }
    }, [ckBox]);

    const login = async () => {
        /**
         * 이메일 형식 검사
         */
        if (!validateEmail(email)) {
            setEmailFormErr(true);
            return;
        }

        setEmailFormErr(false);

        /**
         * 비밀번호 길이 검사
         */
        if (pw.length < 8) {
            setPwNumFail("incorrect");
            return;
        }

        setPwNumFail("success");

        /**
         * 이전 로그인 실패 표시 초기화
         */
        setEmailState("basic");
        setPwCheckState("basic");

        console.log("로그인 전");

        try {
            const response =
                await api.post(
                    "/auth/login",
                    {
                        email,
                        password: pw,
                        rememberMe: ckBox,
                    }
                );

            console.log(
                "로그인 응답:",
                response.data
            );

            const {
                accessToken,
                refreshToken,
            } = response.data.result;

            /**
             * 인증 토큰 저장
             */
            /**
  * 로그인 상태 유지 여부에 따라
  * 토큰 저장 위치 결정
  *
  * 체크 O → localStorage
  * 체크 X → sessionStorage
  */
            if (ckBox) {
                // 로그인 상태 유지
                localStorage.setItem(
                    "accessToken",
                    accessToken
                );

                localStorage.setItem(
                    "refreshToken",
                    refreshToken
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        response.data.result
                    )
                );

                // 기존 sessionStorage 정리
                sessionStorage.removeItem(
                    "accessToken"
                );

                sessionStorage.removeItem(
                    "refreshToken"
                );

                sessionStorage.removeItem(
                    "user"
                );
            } else {
                // 로그인 상태 유지 안 함
                sessionStorage.setItem(
                    "accessToken",
                    accessToken
                );

                sessionStorage.setItem(
                    "refreshToken",
                    refreshToken
                );

                sessionStorage.setItem(
                    "user",
                    JSON.stringify(
                        response.data.result
                    )
                );

                // 기존 localStorage 정리
                localStorage.removeItem(
                    "accessToken"
                );

                localStorage.removeItem(
                    "refreshToken"
                );

                localStorage.removeItem(
                    "user"
                );
            }

            console.log("로그인 성공!");

            /**
             * ProtectedRoute에서 로그인 페이지로
             * 이동시킨 경우 원래 접근하려던
             * 페이지 정보를 확인합니다.
             *
             * 예:
             *
             * /my-storage
             * → /login
             * → 로그인 성공
             * → /my-storage
             */
            const state =
                location.state as
                | LoginLocationState
                | null;

            const from =
                state?.from;

            if (from?.pathname) {
                const redirectPath =
                    `${from.pathname}` +
                    `${from.search ?? ""}` +
                    `${from.hash ?? ""}`;

                navigate(
                    redirectPath,
                    {
                        replace: true,
                    }
                );

                return;
            }

            /**
             * 로그인 페이지에 직접 들어온 경우
             * 홈으로 이동합니다.
             */
            navigate(
                "/",
                {
                    replace: true,
                }
            );
        } catch (error: any) {
            console.log(
                "로그인 실패:",
                error
            );

            if (error.response) {
                console.log(
                    "상태 코드:",
                    error.response.status
                );

                console.log(
                    "에러 응답:",
                    error.response.data
                );
            }

            /**
             * 이메일 또는 비밀번호 오류
             */
            if (
                error.response?.status ===
                401
            ) {
                setEmailState(
                    "incorrect"
                );

                setPwCheckState(
                    "incorrect"
                );
            }
        }
    };

    const googleLogin = () => {
        navigate(
            "/auth/google/loading"
        );

    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center bg-[#F5F5F7] text-[#464646] text-[18px] pt-[91px]">
                {/* branding */}
                <div className="px-[10px] flex flex-col items-center mb-[34px]">
                    <div className="flex flex-row gap-[8px]">
                        <div
                            className="
                                h-[40px]
                                flex
                                flex-col
                                rounded-[8px]
                                bg-[#6366F1]
                                px-[15px]
                                justify-center
                                items-center
                                text-[21px]
                                font-bold
                                text-[#FFF]
                            "
                        >
                            L
                        </div>

                        <p className="mt-[-1.5px] text-[#27272A] text-[26px] font-bold">
                            LearningLM
                        </p>
                    </div>

                    <p className="text-[#52525B] text-[15px] mt-[9.5px] tracking-tighter">
                        AI활용 흐름을
                        블록형 튜토리얼로
                        배우는 플랫폼
                    </p>
                </div>

                {/* white box */}
                <div className="bg-white w-[600px] min-h-[791px] flex flex-col items-center px-[10px] py-[39px] rounded-[12px] border-[#E4E4E7] border-[2px]">
                    {/* title */}
                    <div className="flex flex-col w-[529px]">
                        <p className="text-[28px] font-bold text-[#27272A] tracking-tighter">
                            로그인
                        </p>

                        <p className="text-[15px] text-[#52525B] tracking-tighter">
                            학습을 이어서
                            진행하려면
                            로그인하세요.
                        </p>
                    </div>

                    {/* main content */}
                    <div className="flex flex-col gap-[30px]">
                        {/* email */}
                        <div className="flex flex-col mt-[26px] w-[519px]">
                            <p className="text-[20px]">
                                이메일
                            </p>

                            <div className="mt-[8px]">
                                <input
                                    type="email"
                                    onChange={(e) => {
                                        setEmail(
                                            e.target
                                                .value
                                        );

                                        setEmailState(
                                            "basic"
                                        );
                                    }}
                                    value={
                                        email
                                    }
                                    placeholder="you@example.com"
                                    className="hover:border-[#666666] w-full h-[51px] flex items-center pl-[20px] rounded-[8px] border-2 border-[#E4E4E7]"
                                />

                                {emailState ===
                                    "incorrect" && (
                                        <p className="mt-[6.5px] text-[16px] font-bold text-[#EF8888] tracking-tighter">
                                            이메일이
                                            맞지
                                            않습니다.
                                            다시
                                            입력해주세요.
                                        </p>
                                    )}

                                {emailFormErr && (
                                    <p className="mt-[4px] text-[16px] font-bold text-[#EF8888] tracking-tighter">
                                        유효한
                                        이메일이
                                        아닙니다.
                                        다시
                                        작성해
                                        주세요.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* password */}
                        <div className="flex flex-col w-[519px] mt-[-8px]">
                            <p className="text-[20px] tracking-tighter">
                                비밀번호
                            </p>

                            <input
                                type="password"
                                onChange={(e) => {
                                    setPw(
                                        e.target
                                            .value
                                    );

                                    setPwCheckState(
                                        "basic"
                                    );
                                }}
                                value={pw}
                                placeholder="********"
                                className="hover:border-[#666666] h-[51px] flex items-center rounded-[8px] mt-[8px] pl-[20px] border-2 border-[#E4E4E7]"
                            />

                            {pwCheckState ===
                                "incorrect" && (
                                    <p className="mt-[6px] text-[16px] font-bold text-[#EF8888] tracking-tighter">
                                        비밀번호가
                                        맞지
                                        않습니다.
                                        다시
                                        입력해주세요.
                                    </p>
                                )}

                            {pwNumFail ===
                                "incorrect" && (
                                    <p className="mt-[4px] text-[16px] font-bold text-[#EF8888] tracking-tighter">
                                        비밀번호
                                        8자리 이상
                                        입력해주세요.
                                    </p>
                                )}
                        </div>

                        {/* login state */}
                        <label className="w-[519px] mt-[-7px] cursor-pointer agreement flex items-center">
                            <input
                                type="checkbox"
                                checked={
                                    checked
                                }
                                className="hidden"
                                onChange={(
                                    e
                                ) => {
                                    const value =
                                        e
                                            .target
                                            .checked;

                                    setChecked(
                                        value
                                    );

                                    setCkBox(
                                        value
                                    );
                                }}
                            />

                            <div
                                className={`
                                    w-[17px]
                                    h-[17px]
                                    flex
                                    items-center
                                    justify-center
                                    text-center
                                    border-2
                                    rounded-[2px]
                                    border-[#6366F1]
                                    ${checked
                                        ? "bg-[#6366F1]"
                                        : "border-[#6366F1]"
                                    }
                                `}
                            >
                                {checked && (
                                    <Check
                                        size={
                                            18
                                        }
                                        className="text-white stroke-[3]"
                                    />
                                )}
                            </div>

                            <span className="text-[15.5px] text-[#52525B] tracking-tighter">
                                로그인 상태
                                유지
                            </span>
                        </label>

                        {/* login button */}
                        <button
                            type="button"
                            className="hover:bg-[#6366F1] hover:text-white text-[#9D9ED0] cursor-pointer w-[519px] h-[51px] mt-[-4px] items-center justify-center rounded-[8px] border-1 border-[#6366F1]"
                            onClick={
                                login
                            }
                        >
                            <span className="text-[24px] font-bold tracking-tighter">
                                로그인
                            </span>
                        </button>
                    </div>

                    {/* divider */}
                    <div className="flex items-center w-[519px] mt-[30px]">
                        <div className="flex-1 h-px bg-[#E4E4E7]" />

                        <span className="mx-[16px] text-[#9A9AA3] text-[15px] tracking-tighter">
                            또는
                        </span>

                        <div className="flex-1 h-px bg-[#E4E4E7]" />
                    </div>

                    {/* Google login */}
                    <button
                        type="button"
                        className="cursor-pointer w-[522px] h-[56px] mt-[28px] flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#E4E4E7]"
                        onClick={
                            googleLogin
                        }
                    >
                        <FcGoogle
                            size={32}
                        />

                        <span className="cursor-pointer text-[18px] font-bold text-[#27272A] tracking-tighter">
                            Google
                            계정으로
                            계속하기
                        </span>
                    </button>

                    <div className="mb-[3px]">
                        <p className="text-[#52525B] text-[16px] mt-[20.5px] tracking-tighter">
                            아직 계정이
                            없으신가요?{" "}

                            <button
                                type="button"
                                onClick={() => {
                                    navigate(
                                        "/register"
                                    );
                                }}
                            >
                                <span className="cursor-pointer text-[#6366F1] font-bold mt-[20px]">
                                    회원가입
                                </span>
                            </button>
                        </p>

                        <p className="text-[#52525B] text-[16px] mt-[8px] tracking-tighter">
                            비밀번호를
                            잊으셨나요?{" "}

                            <button
                                type="button"
                                onClick={() => {
                                    navigate(
                                        "/pw-find"
                                    );
                                }}
                            >
                                <span className="cursor-pointer text-[#6366F1] font-bold mt-[20px]">
                                    비밀번호
                                    찾기
                                </span>
                            </button>
                        </p>
                    </div>
                </div>

                {/* footer */}
                <div className="flex flex-row mt-[32px] mb-[86px] text-[16px] text-[#9A9AA3] gap-[38px]">
                    <p>
                        ©2026LearningLM
                    </p>
                    <p>
                        이용약관
                    </p>
                    <p>
                        개인정보처리방침
                    </p>
                </div>
            </div>
        </>
    );
}