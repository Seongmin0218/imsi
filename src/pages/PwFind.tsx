import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function PwFind() {
    const navigate = useNavigate();

    // =========================
    // 이메일
    // =========================
    const [email, setEmail] = useState("");

    // 이메일 인증 상태
    const [emailState, setEmailState] = useState<
        "basic" | "notEnroll" | "success" | "incorrect"
    >("basic");

    // 이메일 인증번호 입력/전송 상태
    const [verifiedStatus, setVerifiedStatus] = useState<
        "none"
        | "sendCode"
        | "fail"
        | "succ"
        | "emailError"
        | "emailcertificationNo"
    >("none");

    // 인증번호를 보낸 여부
    const [isSendCode, setIsSendCode] = useState(false);

    // 인증번호
    const [code, setCode] = useState("");

    // 인증 남은 시간
    const [count, setCount] = useState(30 * 60);

    // 이메일 인증 결과
    const [emailPass, setEmailPass] = useState<
        "none" | "false" | "true"
    >("none");

    // 이메일 인증 완료 후 백엔드에서 받은 임시 토큰
    // 비밀번호 재설정 API에서 사용
    const [temporaryAccessToken, setTemporaryAccessToken] =
        useState("");

    // =========================
    // 비밀번호
    // =========================
    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");

    const [pwNull, setPwNull] = useState<
        "basic" | "false" | "true"
    >("basic");

    const [pwOk, setPwOk] = useState(false);

    // =========================
    // 비밀번호 정규식
    // 영문 + 숫자 포함
    // 8~20자
    // 특수문자 불가능
    // =========================
    const validatePw = (value: string) => {
        const pwRegex =
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

        return pwRegex.test(value);
    };

    // =========================
    // 인증번호 전송
    // =========================
    const sendEmail = async () => {
        if (!email.trim()) {
            setVerifiedStatus("emailError");
            return;
        }

        try {
            const res = await axios.post(
                "http://3.39.165.3:8080/api/auth/email/request",
                {
                    verificationType: "NON_LOGIN",
                    purpose: "PASSWORD_RESET",
                    email: email,
                }
            );

            console.log("===== 인증번호 전송 성공 =====");
            console.log("응답 status:", res.status);
            console.log("응답 data:", res.data);

            setIsSendCode(true);
            setVerifiedStatus("sendCode");

            // 백엔드 기준 30분
            setCount(30 * 60);

            // 이전 인증번호 초기화
            setCode("");

            // 새로운 인증번호를 요청했으므로
            // 기존 temporaryAccessToken도 초기화
            setTemporaryAccessToken("");

            // 이메일 인증 상태 초기화
            setEmailPass("none");

        } catch (error) {
            console.log("===== 인증번호 전송 실패 =====");

            if (axios.isAxiosError(error)) {
                console.log("status:", error.response?.status);
                console.log("data:", error.response?.data);
            } else {
                console.log(error);
            }

            setVerifiedStatus("emailError");
            setIsSendCode(false);
        }
    };

    // =========================
    // 인증번호 타이머
    // =========================
    useEffect(() => {
        if (!isSendCode) return;

        if (count <= 0) {
            alert("인증시간이 만료되었습니다.");

            setIsSendCode(false);
            setVerifiedStatus("emailcertificationNo");

            // 인증시간이 만료되었으므로
            // 기존 임시 토큰도 사용할 수 없도록 초기화
            setTemporaryAccessToken("");

            return;
        }

        const timer = setTimeout(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [count, isSendCode]);

    // =========================
    // 이메일 인증번호 확인
    // =========================
    const verifyCode = async () => {
        if (!code.trim()) {
            setVerifiedStatus("fail");
            return;
        }

        try {
            const res = await axios.post(
                "http://3.39.165.3:8080/api/auth/email/verify",
                {
                    verificationType: "NON_LOGIN",
                    purpose: "PASSWORD_RESET",
                    email: email,
                    code: code,
                }
            );

            console.log("===== 이메일 인증 성공 =====");
            console.log("응답 status:", res.status);
            console.log("응답 data:", res.data);

            /*
             * 백엔드 응답 구조에 따라
             * temporaryAccessToken을 가져온다.
             *
             * 가능한 구조:
             *
             * 1. res.data.result.temporaryAccessToken
             * 2. res.data.data.temporaryAccessToken
             * 3. res.data.temporaryAccessToken
             */
            const temporaryToken =
                res.data?.result?.temporaryAccessToken ??
                res.data?.data?.temporaryAccessToken ??
                res.data?.temporaryAccessToken;

            console.log(
                "temporaryAccessToken 존재:",
                Boolean(temporaryToken)
            );

            if (!temporaryToken) {
                console.error(
                    "이메일 인증은 성공했지만 temporaryAccessToken을 받지 못했습니다."
                );

                setVerifiedStatus("fail");

                alert(
                    "이메일 인증 토큰을 받지 못했습니다. 백엔드 응답을 확인해주세요."
                );

                return;
            }

            // 비밀번호 재설정용 임시 토큰 저장
            setTemporaryAccessToken(temporaryToken);

            console.log(
                "temporaryAccessToken 저장 완료"
            );

            // 인증번호 입력 상태 종료
            setIsSendCode(false);

            // 이메일 인증 성공
            setVerifiedStatus("succ");
            setEmailPass("true");

        } catch (error) {
            console.log("===== 이메일 인증 실패 =====");

            if (axios.isAxiosError(error)) {
                console.log("status:", error.response?.status);
                console.log("data:", error.response?.data);
            } else {
                console.log(error);
            }

            setVerifiedStatus("fail");
        }
    };

    // =========================
    // 비밀번호 / 비밀번호 확인
    // =========================
    useEffect(() => {
        const hasBothPasswords =
            pw.length > 0 &&
            pwCheck.length > 0;

        if (!hasBothPasswords) {
            setPwNull("true");
            setPwOk(false);
            return;
        }

        setPwNull("false");

        setPwOk(
            pw === pwCheck &&
            validatePw(pw)
        );
    }, [pw, pwCheck]);

    // =========================
    // 비밀번호 변경
    // =========================
    const pwChangeFun = async () => {
        // 비밀번호 형식 확인
        if (!validatePw(pw)) {
            setPwNull("basic");
            return;
        }

        // 비밀번호 확인 일치 여부
        if (!pwOk) {
            return;
        }

        // 이메일 인증 토큰 확인
        if (!temporaryAccessToken) {
            console.error(
                "temporaryAccessToken이 없습니다."
            );

            alert(
                "이메일 인증을 먼저 완료해주세요."
            );

            return;
        }

        console.log(
            "===== 비밀번호 변경 요청 ====="
        );

        console.log(
            "temporaryAccessToken 존재:",
            Boolean(temporaryAccessToken)
        );

        try {
            const res = await axios.post(
                "http://3.39.165.3:8080/api/auth/password",
                {
                    newPassword: pw,
                },
                {
                    headers: {
                        "X-Email-Verification-Token": temporaryAccessToken,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(
                "===== 비밀번호 변경 성공 ====="
            );

            console.log(
                "응답 status:",
                res.status
            );

            console.log(
                "응답:",
                res.data
            );

            alert(
                "비밀번호가 변경되었습니다."
            );

            // 비밀번호 변경 성공 후
            // 로그인 페이지로 이동
            navigate("/login");

        } catch (error) {
            console.log(
                "===== 비밀번호 변경 실패 ====="
            );

            if (axios.isAxiosError(error)) {
                console.log(
                    "status:",
                    error.response?.status
                );

                console.log(
                    "data:",
                    error.response?.data
                );

                console.log(
                    "request headers:",
                    error.config?.headers
                );
            } else {
                console.log(error);
            }
        }
    };

    // =========================
    // 다음 버튼
    // 이메일 인증 완료 여부 확인
    // =========================
    const next = () => {
        if (verifiedStatus !== "succ") {
            setEmailPass("false");
            return;
        }

        if (!temporaryAccessToken) {
            setEmailPass("false");
            return;
        }

        setEmailPass("true");
        setEmailState("success");
    };

    // =========================
    // 인증번호 UI
    // =========================
    const renderVerifyCode = () => {
        switch (verifiedStatus) {

            // -------------------------
            // 인증번호 전송 전
            // -------------------------
            case "none":
                return (
                    <button
                        className="hover:bg-[#3A3DC2] hover:border-[#3A3DC2] cursor-pointer w-[145px] h-[54px] border-[#6366F1] mt-[15px] bg-[#6366F1] text-white text-[20px] font-bold rounded-[12px] border-[2px]"
                        onClick={sendEmail}
                    >
                        인증번호 전송
                    </button>
                );

            // -------------------------
            // 인증번호 입력
            // -------------------------
            case "sendCode":
                return (
                    <>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) =>
                                setCode(e.target.value)
                            }
                            placeholder="인증번호 10자리를 입력해주세요."
                            className="hover:border-[#666666] h-[54px] w-full flex items-center pl-[20px] mt-[15px] rounded-[8px] border-2 border-[#E4E4E7]"
                        />

                        <div className="flex justify-center items-center">
                            <p className="text-[#666] my-[15px]">
                                인증번호를 받지 못하셨나요?

                                <span
                                    className="cursor-pointer text-[#6366F1] ml-[12px]"
                                    onClick={() => {
                                        console.log(
                                            "이메일 재전송"
                                        );

                                        sendEmail();
                                    }}
                                >
                                    인증번호 재전송
                                </span>
                            </p>

                            <span className="font-bold text-[#EF8888] ml-[98px]">
                                {Math.floor(count / 60)}:
                                {String(
                                    count % 60
                                ).padStart(2, "0")}
                            </span>
                        </div>

                        <button
                            className="hover:bg-[#6366F1] hover:text-white cursor-pointer w-[112px] h-[54px] border-[#6366F1] mt-[15px] text-[#6366F1] text-[20px] font-bold rounded-[12px] border-[2px]"
                            onClick={verifyCode}
                        >
                            인증 완료
                        </button>
                    </>
                );

            // -------------------------
            // 인증 실패
            // -------------------------
            case "fail":
                return (
                    <>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) =>
                                setCode(e.target.value)
                            }
                            placeholder="인증번호 6자리를 입력해주세요."
                            className="h-[54px] w-full flex items-center pl-[20px] mt-[15px] rounded-[8px] border-2 border-[#F8A3A3]"
                        />

                        <p className="text-[#EF8888] font-bold mt-[15px]">
                            인증번호가 유효하지 않습니다.
                            다시 입력해주세요.
                        </p>

                        <div className="flex justify-center items-center">
                            <p className="text-[#666] my-[15px]">
                                인증번호를 받지 못하셨나요?

                                <span
                                    className="cursor-pointer text-[#6366F1] ml-[12px]"
                                    onClick={sendEmail}
                                >
                                    인증번호 재전송
                                </span>
                            </p>

                            <span className="font-bold text-[#EF8888] ml-[98px]">
                                {Math.floor(count / 60)}:
                                {String(
                                    count % 60
                                ).padStart(2, "0")}
                            </span>
                        </div>

                        <button
                            className="hover:bg-[#6366F1] hover:text-white cursor-pointer w-[112px] h-[54px] border-[#6366F1] mt-[15px] text-[#6366F1] text-[20px] font-bold rounded-[12px] border-[2px]"
                            onClick={verifyCode}
                        >
                            인증 완료
                        </button>
                    </>
                );

            // -------------------------
            // 인증 성공
            // -------------------------
            case "succ":
                return (
                    <p className="text-[#5FAA81] font-bold mt-[15px]">
                        인증을 완료했습니다.
                    </p>
                );

            // -------------------------
            // 이메일 오류
            // -------------------------
            case "emailError":
                return (
                    <>
                        <p className="text-[#EF8888] my-[15px]">
                            유효한 이메일이 아닙니다.
                            다시 작성해 주세요.
                        </p>

                        <button
                            className="hover:bg-[#3A3DC2] hover:border-[#3A3DC2] cursor-pointer w-[145px] h-[54px] border-[#6366F1] bg-[#6366F1] text-white text-[20px] font-bold rounded-[12px] border-[2px]"
                            onClick={sendEmail}
                        >
                            인증번호 전송
                        </button>
                    </>
                );

            // -------------------------
            // 인증시간 만료
            // -------------------------
            case "emailcertificationNo":
                return (
                    <>
                        <button
                            className="hover:bg-[#3A3DC2] hover:border-[#3A3DC2] cursor-pointer w-[145px] h-[54px] mt-[11px] border-[#6366F1] bg-[#6366F1] text-white text-[20px] font-bold rounded-[12px] border-[2px]"
                            onClick={sendEmail}
                        >
                            인증번호 전송
                        </button>

                        <p className="text-[#EF8888] font-bold my-[11px]">
                            인증번호가 만료되었습니다.
                        </p>
                    </>
                );

            default:
                return null;
        }
    };

    // =========================
    // 화면
    // =========================
    return (
        <>
            <div className="min-h-screen flex flex-col items-center bg-[#F5F5F7] text-[#52525B] text-[18px] py-[100px]">

                {/* branding */}
                <div className="px-[10px] flex flex-col items-center mb-[44px]">

                    <div className="flex flex-row gap-[8px]">
                        <div
                            className="flex flex-col rounded-[8px] bg-[#6366F1] px-[15px] py-[4px] justify-center items-center text-[24px] font-bold text-[#FFF]"
                        >
                            L
                        </div>

                        <p className="text-[#27272A] text-[28px] font-bold">
                            LearningLM
                        </p>
                    </div>

                    <p className="mt-[14px]">
                        AI활용 흐름을 블록형 튜토리얼로 배우는 플랫폼
                    </p>
                </div>

                {/* white box */}
                <div className="bg-white w-[600px] min-h-[531px] flex flex-col items-center px-[10px] py-[50px] rounded-[12px]">

                    {/* =========================
                        이메일 인증 화면
                    ========================= */}
                    {emailState !== "success" ? (
                        <>
                            <p className="w-[519px] text-[32px] font-bold text-[#27272A]">
                                비밀번호 찾기
                            </p>

                            <p className="w-[519px] mt-[7px]">
                                이메일 인증을 완료해주세요.
                            </p>

                            {/* 이메일 */}
                            <div className="flex flex-col mb-[47px] w-[519px]">

                                <div className="flex flex-col mt-[47px] w-[519px]">

                                    <p className="font-bold text-[#52525B]">
                                        이메일
                                    </p>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                        placeholder="you@example.com"
                                        disabled={
                                            verifiedStatus ===
                                            "succ"
                                        }
                                        className={`hover:border-[#666666] h-[54px] flex items-center pl-[20px] mt-[11px] rounded-[8px] border-2 ${verifiedStatus ===
                                            "emailcertificationNo"
                                            ? "border-[#F8A3A3]"
                                            : "border-[#E4E4E7]"
                                            }`}
                                    />

                                    {renderVerifyCode()}
                                </div>

                                {emailPass === "false" && (
                                    <p className="mt-[11px] font-bold text-[#EF8888]">
                                        이메일 인증을
                                        완료해주세요.
                                    </p>
                                )}
                            </div>

                            {/* 다음 */}
                            <button
                                className="cursor-pointer hover:bg-[#6366F1] hover:text-white text-[#9D9ED0] w-[519px] h-[57px] items-center justify-center rounded-[8px] border-1 border-[#6366F1]"
                                onClick={next}
                            >
                                <span className="text-[24px] font-bold">
                                    다음
                                </span>
                            </button>
                        </>
                    ) : (

                        /* =========================
                           비밀번호 변경 화면
                           ========================= */
                        <>
                            <p className="w-[519px] text-[32px] font-bold text-[#27272A]">
                                비밀번호 변경
                            </p>

                            <p className="w-[519px] mt-[7px]">
                                변경할 비밀번호를
                                입력해주세요.
                            </p>

                            {/* 비밀번호 */}
                            <div className="flex flex-col w-[519px] mt-[20px]">

                                <p className="flex text-[#52525B] font-bold">
                                    비밀번호
                                </p>

                                <input
                                    type="password"
                                    value={pw}
                                    onChange={(e) => {
                                        setPw(
                                            e.target.value
                                        );
                                    }}
                                    placeholder="********"
                                    className={`hover:border-[#666666] h-[54px] flex items-center rounded-[8px] my-[11px] pl-[20px] border-2 ${(pw !== pwCheck) ||
                                        (!validatePw(pw) &&
                                            pwNull ===
                                            "basic")
                                        ? "border-[#F8A3A3]"
                                        : "border-[#E4E4E7]"
                                        }`}
                                />

                                <p className="text-[#9A9AA3]">
                                    영문 숫자 포함 8~20자
                                </p>

                                {pw.length > 0 &&
                                    !validatePw(pw) && (
                                        <p className="text-[#EF8888] font-bold mt-[11px]">
                                            비밀번호는 영문·숫자를
                                            포함한 8~20자로
                                            작성해주세요.
                                        </p>
                                    )}
                            </div>

                            {/* 비밀번호 확인 */}
                            <div className="w-[519px] flex flex-col mt-[20px]">

                                <p className="text-[#52525B] font-bold">
                                    비밀번호 확인
                                </p>

                                <input
                                    type="password"
                                    value={pwCheck}
                                    onChange={(e) => {
                                        setPwCheck(
                                            e.target.value
                                        );
                                    }}
                                    placeholder="********"
                                    className={`hover:border-[#666666] h-[54px] flex items-center rounded-[8px] my-[11px] pl-[20px] border-2 ${pw === pwCheck
                                        ? "border-[#E4E4E7]"
                                        : "border-[#F8A3A3]"
                                        }`}
                                />

                                {pwCheck.length > 0 && (
                                    <>
                                        {pw === pwCheck ? (
                                            <p className="font-bold text-[#5FAA81] mt-[11px]">
                                                입력한 비밀번호가
                                                맞습니다.
                                            </p>
                                        ) : (
                                            <p className="font-bold text-[#EF8888] mt-[11px]">
                                                입력한 비밀번호가
                                                같지 않습니다.
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* 비밀번호 변경 */}
                            <button
                                className="cursor-pointer hover:bg-[#6366F1] hover:text-white text-[#9D9ED0] mt-[47px] w-[519px] h-[57px] items-center justify-center rounded-[8px] border-1 border-[#6366F1]"
                                onClick={pwChangeFun}
                            >
                                <span className="text-[24px] font-bold">
                                    변경하기
                                </span>
                            </button>
                        </>
                    )}

                    {/* 하단 메뉴 */}
                    <div>
                        <p className="mt-[71px]">
                            계정이 없으신가요?{" "}
                            <button
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

                        <p className="mt-[14px]">
                            이미 계정이 있으신가요?{" "}
                            <button
                                onClick={() => {
                                    navigate(
                                        "/login"
                                    );
                                }}
                            >
                                <span className="cursor-pointer text-[#6366F1] font-bold mt-[20px]">
                                    로그인
                                </span>
                            </button>
                        </p>
                    </div>
                </div>

                {/* footer */}
                <div className="flex flex-row mt-[44px] text-[#9A9AA3] gap-[36px]">
                    <p>©2026LearningLM</p>
                    <p>이용약관</p>
                    <p>개인정보처리방침</p>
                </div>
            </div>
        </>
    );
}