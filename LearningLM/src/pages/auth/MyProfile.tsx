import {
    useEffect,
    useState,
    type ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";

import api from "../../api/api";

interface CurrentUser {
    userId: number;
    email: string;
    nickname: string;
    loginType?: "LOCAL" | "SOCIAL";
    provider?: string | null;
    role?: string;
    status?: string;
    updatedAt?: string;
}

type EmailMode = "view" | "edit";

type PasswordMode = "view" | "edit";

type EmailVerifyStatus =
    | "none"
    | "sending"
    | "sent"
    | "success"
    | "fail"
    | "error"
    | "expired";

export function MyProfile() {
    const navigate = useNavigate();

    // =====================================================
    // 사용자 정보
    // =====================================================

    const [currentUser, setCurrentUser] =
        useState<CurrentUser | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    // =====================================================
    // 프로필 사진
    // =====================================================

    const [profileImage, setProfileImage] =
        useState<string | null>(null);

    // =====================================================
    // 이메일
    // =====================================================

    const [emailMode, setEmailMode] =
        useState<EmailMode>("view");

    const [email, setEmail] =
        useState("");

    const [emailError, setEmailError] =
        useState("");

    const [
        emailVerifyStatus,
        setEmailVerifyStatus,
    ] = useState<EmailVerifyStatus>("none");

    const [
        verificationCode,
        setVerificationCode,
    ] = useState("");

    const [count, setCount] =
        useState(180);

    // =====================================================
    // 비밀번호
    // =====================================================

    const [passwordMode, setPasswordMode] =
        useState<PasswordMode>("view");

    const [
        currentPassword,
        setCurrentPassword,
    ] = useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [
        newPasswordCheck,
        setNewPasswordCheck,
    ] = useState("");

    const [
        passwordError,
        setPasswordError,
    ] = useState("");

    const [
        passwordSuccess,
        setPasswordSuccess,
    ] = useState("");

    const [
        isPasswordSaving,
        setIsPasswordSaving,
    ] = useState(false);

    // =====================================================
    // 사용자 정보 조회
    // =====================================================

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response =
                    await api.get("/auth/me");

                const user =
                    response.data?.result as
                    | CurrentUser
                    | undefined;

                if (!user) {
                    throw new Error(
                        "사용자 정보가 없습니다."
                    );
                }

                setCurrentUser(user);
                setEmail(user.email);

                // 로그인 상태 저장 방식에 맞춰
                // user 정보 갱신
                const userString =
                    JSON.stringify(user);

                if (
                    localStorage.getItem(
                        "user"
                    ) !== null
                ) {
                    localStorage.setItem(
                        "user",
                        userString
                    );
                }

                if (
                    sessionStorage.getItem(
                        "user"
                    ) !== null
                ) {
                    sessionStorage.setItem(
                        "user",
                        userString
                    );
                }
            } catch (error) {
                console.error(
                    "사용자 정보 조회 실패:",
                    error
                );

                navigate("/login", {
                    replace: true,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchCurrentUser();
    }, [navigate]);

    // =====================================================
    // 이메일 인증번호 타이머
    // =====================================================

    useEffect(() => {
        if (
            emailVerifyStatus !== "sent" &&
            emailVerifyStatus !== "fail"
        ) {
            return;
        }

        if (count <= 0) {
            setEmailVerifyStatus(
                "expired"
            );

            setVerificationCode("");

            setEmailError(
                "인증번호가 만료되었습니다. 인증메일을 다시 전송해주세요."
            );

            return;
        }

        const timer = setTimeout(() => {
            setCount(
                (prev) => prev - 1
            );
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [
        count,
        emailVerifyStatus,
    ]);

    // =====================================================
    // 이메일 형식 검사
    // =====================================================

    const validateEmail = (
        value: string
    ) => {
        /**
         * 예:
         * test@example.com
         *
         * @ 앞에 값이 있어야 하고
         * @ 뒤에 도메인이 있어야 하며
         * 마지막은 .com이어야 함
         */
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.com$/;

        return emailRegex.test(value);
    };

    // =====================================================
    // 비밀번호 형식 검사
    // =====================================================

    const getPasswordError = (
        value: string
    ) => {
        if (!value) {
            return "";
        }

        /**
         * 영문/숫자 이외의 문자
         */
        if (
            !/^[A-Za-z\d]+$/.test(
                value
            )
        ) {
            return "비밀번호는 영문과 숫자만 포함할 수 있습니다.";
        }

        /**
         * 8자 미만
         */
        if (value.length < 8) {
            return "비밀번호는 8자 이상 입력해주세요.";
        }

        /**
         * 영문 미포함
         */
        if (
            !/[A-Za-z]/.test(value)
        ) {
            return "비밀번호에는 영문이 포함되어야 합니다.";
        }

        /**
         * 숫자 미포함
         */
        if (!/\d/.test(value)) {
            return "비밀번호에는 숫자가 포함되어야 합니다.";
        }

        return "";
    };

    // =====================================================
    // 새 비밀번호 입력
    // =====================================================

    const handleNewPasswordChange =
        (value: string) => {
            setNewPassword(value);
            setPasswordSuccess("");

            const error =
                getPasswordError(value);

            if (error) {
                setPasswordError(error);
                return;
            }

            /**
             * 새 비밀번호와 확인 비밀번호가
             * 둘 다 입력되어 있고 같으면
             * 성공 메시지 표시
             */
            if (
                value &&
                newPasswordCheck &&
                value ===
                newPasswordCheck
            ) {
                setPasswordError("");

                setPasswordSuccess(
                    "입력한 비밀번호가 같습니다."
                );

                return;
            }

            setPasswordError("");
        };

    // =====================================================
    // 새 비밀번호 확인 입력
    // =====================================================

    const handleNewPasswordCheck =
        (value: string) => {
            setNewPasswordCheck(value);
            setPasswordSuccess("");

            /**
             * 아직 새 비밀번호를 입력하지 않은 경우
             */
            if (!value) {
                setPasswordError("");
                return;
            }

            /**
             * 새 비밀번호 자체의 규칙 검사
             */
            const passwordErrorMessage =
                getPasswordError(
                    newPassword
                );

            if (passwordErrorMessage) {
                setPasswordError(
                    passwordErrorMessage
                );

                return;
            }

            /**
             * 두 비밀번호가 같은 경우
             */
            if (
                newPassword === value
            ) {
                setPasswordError("");

                setPasswordSuccess(
                    "입력한 비밀번호가 같습니다."
                );

                return;
            }

            /**
             * 두 비밀번호가 다른 경우
             */
            setPasswordError(
                "입력한 비밀번호가 같지 않습니다."
            );
        };

    // =====================================================
    // 이메일 변경 시작
    // =====================================================

    const startEmailEdit = () => {
        if (!currentUser) {
            return;
        }

        setEmail(
            currentUser.email
        );

        setEmailMode("edit");

        setEmailError("");

        setEmailVerifyStatus(
            "none"
        );

        setVerificationCode("");

        setCount(180);
    };

    // =====================================================
    // 이메일 변경 취소
    // =====================================================

    const cancelEmailEdit = () => {
        if (!currentUser) {
            return;
        }

        /**
         * 변경 전 이메일로 복구
         */
        setEmail(
            currentUser.email
        );

        setEmailMode("view");

        setEmailError("");

        setEmailVerifyStatus(
            "none"
        );

        setVerificationCode("");

        setCount(180);
    };

    // =====================================================
    // 이메일 인증메일 전송
    // =====================================================

    const sendEmailVerification =
        async () => {
            const trimmedEmail =
                email.trim();

            setEmailError("");

            /**
             * 이메일 형식 검사
             */
            if (
                !validateEmail(
                    trimmedEmail
                )
            ) {
                setEmailError(
                    "인증메일을 전송할 수 없습니다."
                );

                setEmailVerifyStatus(
                    "error"
                );

                return;
            }

            /**
             * 기존 이메일과 같은 경우
             */
            if (
                currentUser &&
                trimmedEmail ===
                currentUser.email
            ) {
                setEmailError(
                    "현재 사용 중인 이메일과 동일합니다."
                );

                setEmailVerifyStatus(
                    "error"
                );

                return;
            }

            try {
                setEmailVerifyStatus(
                    "sending"
                );

                await api.post(
                    "/auth/email/request",
                    {
                        verificationType:
                            "LOGIN",

                        purpose:
                            "EMAIL_CHANGE",

                        email:
                            trimmedEmail,
                    }
                );

                /**
                 * 인증메일 전송 성공
                 */
                setEmailVerifyStatus(
                    "sent"
                );

                setCount(180);

                setVerificationCode("");

                setEmailError("");
            } catch (error) {
                console.error(
                    "이메일 인증메일 전송 실패:",
                    error
                );

                setEmailVerifyStatus(
                    "error"
                );

                setEmailError(
                    "인증메일을 전송할 수 없습니다."
                );
            }
        };

    // =====================================================
    // 이메일 인증번호 확인
    // =====================================================

    const verifyEmail = async () => {
        if (
            !verificationCode.trim()
        ) {
            setEmailVerifyStatus(
                "fail"
            );

            setEmailError(
                "인증번호가 유효하지 않습니다. 다시 입력해주세요."
            );

            return;
        }

        try {
            const response =
                await api.post(
                    "/auth/email/verify",
                    {
                        verificationType:
                            "LOGIN",

                        purpose:
                            "EMAIL_CHANGE",

                        email:
                            email.trim(),

                        code:
                            verificationCode.trim(),
                    }
                );

            console.log(
                "이메일 인증 성공:",
                response.data
            );

            /**
             * 이메일 변경용 임시 토큰
             */
            const temporaryToken =
                response.data
                    ?.result
                    ?.temporaryAccessToken;

            if (!temporaryToken) {
                throw new Error(
                    "이메일 인증 임시 토큰이 없습니다."
                );
            }

            /**
             * 인증 성공
             */
            setEmailVerifyStatus(
                "success"
            );

            setEmailError("");

            /**
             * 인증 성공 후
             * 실제 이메일 변경 API 호출
             */
            await updateEmail(
                temporaryToken
            );
        } catch (error) {
            console.error(
                "이메일 인증 실패:",
                error
            );

            setEmailVerifyStatus(
                "fail"
            );

            setEmailError(
                "인증번호가 유효하지 않습니다. 다시 입력해주세요."
            );
        }
    };

    // =====================================================
    // 이메일 변경 API
    // =====================================================

    const updateEmail = async (
        temporaryToken: string
    ) => {
        try {
            const response =
                await api.post(
                    "/auth/me/profile",
                    {
                        email:
                            email.trim(),
                    },
                    {
                        headers: {
                            "X-Email-Verification-Token":
                                temporaryToken,
                        },
                    }
                );

            console.log(
                "이메일 변경 성공:",
                response.data
            );

            const updatedUser =
                response.data
                    ?.result as
                | CurrentUser
                | undefined;

            if (updatedUser) {
                setCurrentUser(
                    updatedUser
                );

                setEmail(
                    updatedUser.email
                );

                const userString =
                    JSON.stringify(
                        updatedUser
                    );

                if (
                    localStorage.getItem(
                        "user"
                    ) !== null
                ) {
                    localStorage.setItem(
                        "user",
                        userString
                    );
                }

                if (
                    sessionStorage.getItem(
                        "user"
                    ) !== null
                ) {
                    sessionStorage.setItem(
                        "user",
                        userString
                    );
                }
            } else {
                setCurrentUser(
                    (prev) =>
                        prev
                            ? {
                                ...prev,
                                email:
                                    email.trim(),
                            }
                            : prev
                );
            }

            /**
             * 이메일 변경 완료 후
             * 보기 모드로 변경
             */
            setEmailMode("view");

            setEmailError("");

            setVerificationCode("");

            setEmailVerifyStatus(
                "none"
            );

            setCount(180);

            alert(
                "이메일이 변경되었습니다."
            );
        } catch (error) {
            console.error(
                "이메일 변경 실패:",
                error
            );

            setEmailVerifyStatus(
                "fail"
            );

            setEmailError(
                "이메일 변경에 실패했습니다. 다시 시도해주세요."
            );
        }
    };

    // =====================================================
    // 이메일 인증번호 재전송
    // =====================================================

    const resendEmail = async () => {
        setVerificationCode("");

        setEmailError("");

        setCount(180);

        await sendEmailVerification();
    };

    // =====================================================
    // 비밀번호 변경 시작
    // =====================================================

    const startPasswordEdit = () => {
        setPasswordMode("edit");

        setCurrentPassword("");

        setNewPassword("");

        setNewPasswordCheck("");

        setPasswordError("");

        setPasswordSuccess("");
    };

    // =====================================================
    // 비밀번호 변경 취소
    // =====================================================

    const cancelPasswordEdit = () => {
        setPasswordMode("view");

        setCurrentPassword("");

        setNewPassword("");

        setNewPasswordCheck("");

        setPasswordError("");

        setPasswordSuccess("");
    };

    // =====================================================
    // 비밀번호 변경
    // =====================================================

    const updatePassword = async () => {
        setPasswordError("");

        setPasswordSuccess("");

        /**
         * 현재 비밀번호
         */
        if (
            !currentPassword.trim()
        ) {
            setPasswordError(
                "현재 비밀번호를 입력해주세요."
            );

            return;
        }

        /**
         * 새 비밀번호
         */
        if (!newPassword.trim()) {
            setPasswordError(
                "변경할 비밀번호를 입력해주세요."
            );

            return;
        }

        /**
         * 새 비밀번호 규칙
         */
        const newPasswordError =
            getPasswordError(
                newPassword
            );

        if (newPasswordError) {
            setPasswordError(
                newPasswordError
            );

            return;
        }

        /**
         * 비밀번호 확인
         */
        if (
            !newPasswordCheck.trim()
        ) {
            setPasswordError(
                "변경할 비밀번호를 한 번 더 입력해주세요."
            );

            return;
        }

        /**
         * 두 비밀번호 비교
         */
        if (
            newPassword !==
            newPasswordCheck
        ) {
            setPasswordError(
                "입력한 비밀번호가 같지 않습니다."
            );

            return;
        }

        try {
            setIsPasswordSaving(
                true
            );

            await api.post(
                "/auth/me/profile",
                {
                    currentPassword:
                        currentPassword,

                    newPassword:
                        newPassword,
                }
            );

            console.log(
                "비밀번호 변경 성공"
            );

            /**
             * 변경 완료 후
             * 보기 모드로 복귀
             */
            setPasswordMode(
                "view"
            );

            setCurrentPassword("");

            setNewPassword("");

            setNewPasswordCheck("");

            setPasswordError("");

            setPasswordSuccess("");

            alert(
                "비밀번호가 변경되었습니다."
            );
        } catch (error: any) {
            console.error(
                "비밀번호 변경 실패:",
                error
            );

            if (
                error.response?.status ===
                401
            ) {
                setPasswordError(
                    "현재 비밀번호가 올바르지 않습니다."
                );
            } else {
                setPasswordError(
                    "비밀번호 변경에 실패했습니다. 다시 시도해주세요."
                );
            }
        } finally {
            setIsPasswordSaving(
                false
            );
        }
    };

    // =====================================================
    // 프로필 이미지
    // =====================================================

    const handleProfileImage = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        /**
         * 현재는 임시 기능이므로
         * 실제 서버에는 저장하지 않음
         */
        const imageUrl =
            URL.createObjectURL(file);

        setProfileImage(
            imageUrl
        );
    };

    // =====================================================
    // 회원탈퇴
    // =====================================================

    const deleteAccount = async () => {
        try {
            /**
             * 로컬 계정
             *
             * 현재 비밀번호 필요
             */
            let withdrawalPassword =
                "";

            if (
                currentUser?.loginType ===
                "LOCAL"
            ) {
                const password =
                    window.prompt(
                        "회원탈퇴를 위해 현재 비밀번호를 입력해주세요."
                    );

                /**
                 * 취소
                 */
                if (
                    password === null
                ) {
                    return;
                }

                /**
                 * 빈 값
                 */
                if (
                    !password.trim()
                ) {
                    alert(
                        "현재 비밀번호를 입력해주세요."
                    );

                    return;
                }

                withdrawalPassword =
                    password;
            }

            /**
             * 회원탈퇴 API
             *
             * POST /auth/me/withdrawal
             *
             * Body
             * {
             *     agreed: true,
             *     currentPassword: "현재 비밀번호"
             * }
             */
            await api.post(
                "/auth/me/withdrawal",
                {
                    agreed: true,

                    currentPassword:
                        withdrawalPassword,
                }
            );

            /**
             * 탈퇴 성공
             *
             * 로그인 정보 삭제
             */
            localStorage.removeItem(
                "accessToken"
            );

            localStorage.removeItem(
                "refreshToken"
            );

            localStorage.removeItem(
                "user"
            );

            sessionStorage.removeItem(
                "accessToken"
            );

            sessionStorage.removeItem(
                "refreshToken"
            );

            sessionStorage.removeItem(
                "user"
            );

            alert(
                "회원탈퇴가 완료되었습니다."
            );

            navigate("/login", {
                replace: true,
            });
        } catch (error: any) {
            console.error(
                "회원탈퇴 실패:",
                error
            );

            console.error(
                "상태 코드:",
                error.response?.status
            );

            console.error(
                "응답:",
                error.response?.data
            );

            /**
             * 현재 비밀번호가 틀린 경우
             */
            if (
                error.response?.status ===
                401
            ) {
                alert(
                    "현재 비밀번호가 올바르지 않습니다."
                );

                return;
            }

            alert(
                "회원탈퇴에 실패했습니다. 다시 시도해주세요."
            );
        }
    };

    // =====================================================
    // 로딩
    // =====================================================

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F5F5F7]">
                <p className="text-[14px] text-[#9A9AA3]">
                    사용자 정보를 불러오는 중...
                </p>
            </div>
        );
    }

    if (!currentUser) {
        return null;
    }

    // =====================================================
    // 화면
    // =====================================================

    return (
        <div className="min-h-screen bg-[#F5F5F7] text-[#52525B]">
            <main className="flex min-h-screen flex-col items-center pt-[70px] pb-[60px]">

                {/* =================================================
                    Logo
                ================================================= */}

                <div className="mb-[28px] flex flex-col items-center">
                    <div className="flex items-center gap-[7px]">
                        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[7px] bg-[#6366F1] text-[16px] font-bold text-white">
                            L
                        </div>

                        <span className="mt-[-2px] text-[24px] font-bold tracking-[-0.04em] text-[#27272A]">
                            LearningLM
                        </span>
                    </div>

                    <p className="mt-[10px] text-[16px] tracking-[-0.03em] text-[#666666]">
                        AI 활용 흐름을 블록형 튜토리얼로 배우는 플랫폼
                    </p>
                </div>

                {/* =================================================
                    Profile Card
                ================================================= */}

                <section className="mt-[4px] w-[600px] rounded-[9px] border-[2px] border-[#E4E4E7] bg-white px-[28px] py-[27px]">

                    {/* =================================================
                        제목
                    ================================================= */}

                    <div>
                        <h1 className="mt-[12px] text-[28px] font-bold tracking-[-0.05em] text-[#27272A]">
                            프로필 설정
                        </h1>

                        <p className="mt-[2px] text-[14px] text-[#52525B]">
                            {currentUser.nickname}
                            님의 프로필
                        </p>
                    </div>

                    {/* =================================================
                        프로필 사진
                    ================================================= */}

                    <div className="mt-[28px]">
                        <div className="flex items-center justify-between">
                            <p className="text-[20px] font-medium text-[#464646]">
                                프로필 사진
                            </p>

                            {/* 임시 기능이므로 비활성화 */}
                            <button
                                type="button"
                                disabled
                                className="flex h-[30px] cursor-not-allowed items-center justify-center rounded-[8px] border-[2px] border-[#E4E4E7] bg-[#FAFAFA] px-[9px] text-[13px] font-bold text-[#B5B5BA]"
                            >
                                변경
                            </button>
                        </div>

                        <div className="mt-[9px] flex items-center">
                            <div className="flex h-[146px] w-[146px] items-center justify-center overflow-hidden rounded-full border-[2px] border-[#E4E4E7] bg-white">
                                {profileImage ? (
                                    <img
                                        src={
                                            profileImage
                                        }
                                        alt="프로필 사진"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <UserRound
                                        size={
                                            72
                                        }
                                        strokeWidth={
                                            1.5
                                        }
                                        className="text-black"
                                    />
                                )}
                            </div>

                            {/* 임시 기능 */}
                            <input
                                type="file"
                                accept="image/*"
                                disabled
                                className="hidden"
                                onChange={
                                    handleProfileImage
                                }
                            />
                        </div>
                    </div>

                    {/* =================================================
                        이름
                    ================================================= */}

                    <div className="mt-[24px]">
                        <div className="flex items-center justify-between">
                            <p className="text-[20px] font-bold text-[#52525B]">
                                이름
                            </p>
                        </div>

                        <input
                            type="text"
                            value={
                                currentUser.nickname
                            }
                            readOnly
                            className="mt-[7px] h-[50px] w-full rounded-[8px] border-[2px] border-[#E4E4E7] bg-white px-[13px] text-[13px] text-[#666666] outline-none"
                        />
                    </div>

                    {/* =================================================
                        이메일
                    ================================================= */}

                    <div className="mt-[24px]">
                        <div className="flex items-center justify-between">
                            <p className="text-[20px] font-bold text-[#464646]">
                                이메일
                            </p>

                            {emailMode ===
                                "view" ? (
                                <button
                                    type="button"
                                    onClick={
                                        startEmailEdit
                                    }
                                    className="mt-[1px] flex h-[30px] cursor-pointer items-center justify-center rounded-[8px] border-[2px] border-[#E4E4E7] bg-white px-[9px] text-[13px] font-bold text-[#666666] hover:bg-[#F5F5F7]"
                                >
                                    변경
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={
                                        cancelEmailEdit
                                    }
                                    className="mt-[1px] flex h-[30px] cursor-pointer items-center justify-center rounded-[8px] border-[2px] border-[#E4E4E7] bg-white px-[9px] text-[13px] font-bold text-[#666666] hover:bg-[#F5F5F7]"
                                >
                                    취소
                                </button>
                            )}
                        </div>

                        <input
                            type="email"
                            value={email}
                            readOnly={
                                emailMode ===
                                "view"
                            }
                            onChange={(
                                event
                            ) => {
                                setEmail(
                                    event.target
                                        .value
                                );

                                setEmailError(
                                    ""
                                );

                                /**
                                 * 이메일을 수정하면
                                 * 이전 인증 상태 초기화
                                 */
                                setEmailVerifyStatus(
                                    "none"
                                );

                                setVerificationCode(
                                    ""
                                );

                                setCount(180);
                            }}
                            className={`mt-[8px] h-[51px] w-full rounded-[8px] border-[2px] px-[13px] text-[13px] outline-none ${emailMode ===
                                    "edit"
                                    ? "border-[#6366F1]"
                                    : "border-[#E4E4E7]"
                                }`}
                        />

                        {/* =================================================
                            이메일 변경 영역
                        ================================================= */}

                        {emailMode ===
                            "edit" && (
                                <div className="my-[6px]">

                                    {/* =========================================
                                    인증메일 전송 전
                                ========================================= */}

                                    {(
                                        emailVerifyStatus ===
                                        "none" ||
                                        emailVerifyStatus ===
                                        "error" ||
                                        emailVerifyStatus ===
                                        "expired"
                                    ) && (
                                            <>
                                                {emailError && (
                                                    <p className="mb-[7px] text-[16px] font-bold text-[#EF8888]">
                                                        {
                                                            emailError
                                                        }
                                                    </p>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={
                                                        sendEmailVerification
                                                    }
                                                    className="flex h-[31px] cursor-pointer items-center justify-center rounded-[6px] bg-[#6366F1] px-[13px] text-[12px] font-bold text-white hover:bg-[#5558E8]"
                                                >
                                                    인증메일 전송
                                                </button>
                                            </>
                                        )}

                                    {/* =========================================
                                    전송 중
                                ========================================= */}

                                    {emailVerifyStatus ===
                                        "sending" && (
                                            <button
                                                type="button"
                                                disabled
                                                className="flex h-[31px] cursor-not-allowed items-center justify-center rounded-[6px] bg-[#6366F1] px-[13px] text-[12px] font-bold text-white opacity-50"
                                            >
                                                전송 중...
                                            </button>
                                        )}

                                    {/* =========================================
                                    인증번호 입력
                                ========================================= */}

                                    {(
                                        emailVerifyStatus ===
                                        "sent" ||
                                        emailVerifyStatus ===
                                        "fail"
                                    ) && (
                                            <>
                                                {/* 인증번호 전송 상태 버튼 */}
                                                <button
                                                    type="button"
                                                    disabled
                                                    className="flex h-[31px] cursor-not-allowed items-center justify-center rounded-[6px] bg-[#6366F1] px-[13px] text-[12px] font-bold text-white opacity-70"
                                                >
                                                    인증 완료
                                                </button>

                                                <input
                                                    type="text"
                                                    value={
                                                        verificationCode
                                                    }
                                                    onChange={(
                                                        event
                                                    ) => {
                                                        setVerificationCode(
                                                            event
                                                                .target
                                                                .value
                                                        );

                                                        setEmailError(
                                                            ""
                                                        );

                                                        /**
                                                         * 다시 입력하면
                                                         * fail 상태에서
                                                         * sent 상태로 변경
                                                         */
                                                        if (
                                                            emailVerifyStatus ===
                                                            "fail"
                                                        ) {
                                                            setEmailVerifyStatus(
                                                                "sent"
                                                            );
                                                        }
                                                    }}
                                                    placeholder="인증번호를 입력해주세요."
                                                    className={`mt-[8px] h-[50px] w-full rounded-[8px] border-[2px] px-[13px] text-[13px] outline-none ${emailVerifyStatus ===
                                                            "fail"
                                                            ? "border-[#F8A3A3]"
                                                            : "border-[#D9D9DD]"
                                                        }`}
                                                />

                                                {emailError && (
                                                    <p className="mt-[7px] mb-[6px] text-[16px] font-bold text-[#EF8888]">
                                                        {
                                                            emailError
                                                        }
                                                    </p>
                                                )}

                                                <div className="mt-[5px] flex items-center justify-between">
                                                    <div className="mt-[-4px] flex items-center gap-[8px] text-[15px] text-[#666666]">
                                                        <span>
                                                            인증번호를 받지 못하셨나요?
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={
                                                                resendEmail
                                                            }
                                                            className="cursor-pointer font-bold text-[#6366F1]"
                                                        >
                                                            인증번호 재전송
                                                        </button>
                                                    </div>

                                                    <span className="mt-[-2px] text-[16px] font-bold text-[#EF8888]">
                                                        {Math.floor(
                                                            count /
                                                            60
                                                        )}
                                                        :
                                                        {String(
                                                            count %
                                                            60
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}
                                                    </span>
                                                </div>

                                                {/* 인증번호 확인 */}
                                                <button
                                                    type="button"
                                                    onClick={
                                                        verifyEmail
                                                    }
                                                    className="mt-[7px] flex h-[29px] w-[110px] cursor-pointer items-center justify-center rounded-[8px] bg-[#6366F1] px-[13px] text-[13px] font-bold text-white hover:bg-[#5558E8]"
                                                >
                                                    인증번호 확인
                                                </button>
                                            </>
                                        )}

                                    {/* =========================================
                                    인증 성공
                                ========================================= */}

                                    {emailVerifyStatus ===
                                        "success" && (
                                            <p className="text-[12px] font-bold text-[#5FAA81]">
                                                이메일 인증이 완료되었습니다.
                                            </p>
                                        )}
                                </div>
                            )}
                    </div>

                    {/* =================================================
                        비밀번호
                    ================================================= */}

                    <div className="mt-[24px]">
                        <div className="flex items-center justify-between">
                            <p className="text-[20px] font-bold text-[#464646]">
                                비밀번호
                            </p>

                            {passwordMode ===
                                "view" ? (
                                <button
                                    type="button"
                                    onClick={
                                        startPasswordEdit
                                    }
                                    className="mt-[1px] flex h-[30px] cursor-pointer items-center justify-center rounded-[8px] border-[2px] border-[#E4E4E7] bg-white px-[9px] text-[13px] font-bold text-[#666666] hover:bg-[#F5F5F7]"
                                >
                                    변경
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={
                                        cancelPasswordEdit
                                    }
                                    className="mt-[1px] flex h-[30px] cursor-pointer items-center justify-center rounded-[8px] border-[2px] border-[#E4E4E7] bg-white px-[9px] text-[13px] font-bold text-[#666666] hover:bg-[#F5F5F7]"
                                >
                                    취소
                                </button>
                            )}
                        </div>

                        {/* 비밀번호 변경 영역 */}
                        {passwordMode ===
                            "edit" && (
                                <div className="mt-[15px]">

                                    {/* 현재 비밀번호 */}
                                    <p className="mb-[7px] text-[12px] text-[#52525B]">
                                        현재 비밀번호
                                    </p>

                                    <input
                                        type="password"
                                        value={
                                            currentPassword
                                        }
                                        onChange={(
                                            event
                                        ) => {
                                            setCurrentPassword(
                                                event
                                                    .target
                                                    .value
                                            );

                                            setPasswordError(
                                                ""
                                            );
                                        }}
                                        placeholder="********"
                                        className="h-[42px] w-full rounded-[6px] border border-[#D9D9DD] px-[13px] text-[13px] outline-none focus:border-[#6366F1]"
                                    />

                                    {/* 변경할 비밀번호 */}
                                    <p className="mt-[16px] mb-[7px] text-[12px] text-[#52525B]">
                                        변경할 비밀번호
                                    </p>

                                    <input
                                        type="password"
                                        value={
                                            newPassword
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            handleNewPasswordChange(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="********"
                                        className={`h-[42px] w-full rounded-[6px] border px-[13px] text-[13px] outline-none ${passwordError
                                                ? "border-[#F8A3A3]"
                                                : "border-[#D9D9DD]"
                                            } focus:border-[#6366F1]`}
                                    />

                                    {/* 비밀번호 확인 */}
                                    <input
                                        type="password"
                                        value={
                                            newPasswordCheck
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            handleNewPasswordCheck(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="********"
                                        className={`mt-[7px] h-[42px] w-full rounded-[6px] border px-[13px] text-[13px] outline-none ${passwordError
                                                ? "border-[#F8A3A3]"
                                                : "border-[#D9D9DD]"
                                            } focus:border-[#6366F1]`}
                                    />

                                    {/* 비밀번호 규칙 */}
                                    <p className="mt-[7px] text-[11px] text-[#9A9AA3]">
                                        영문, 숫자 포함 8자 이상
                                    </p>

                                    {/* 오류 */}
                                    {passwordError && (
                                        <p className="mt-[6px] text-[12px] font-bold text-[#EF8888]">
                                            {
                                                passwordError
                                            }
                                        </p>
                                    )}

                                    {/* 성공 */}
                                    {passwordSuccess && (
                                        <p className="mt-[6px] text-[12px] font-bold text-[#5FAA81]">
                                            {
                                                passwordSuccess
                                            }
                                        </p>
                                    )}

                                    {/* 저장 */}
                                    <button
                                        type="button"
                                        disabled={
                                            isPasswordSaving
                                        }
                                        onClick={
                                            updatePassword
                                        }
                                        className="mt-[12px] flex h-[32px] cursor-pointer items-center justify-center rounded-[6px] bg-[#6366F1] px-[15px] text-[12px] font-bold text-white hover:bg-[#5558E8] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isPasswordSaving
                                            ? "변경 중..."
                                            : "저장하기"}
                                    </button>
                                </div>
                            )}
                    </div>

                    {/* =================================================
                        회원탈퇴
                    ================================================= */}

                    <div
                        className={`flex items-center justify-between ${passwordMode ===
                                "edit"
                                ? "mt-[24px]"
                                : "mt-[22px]"
                            } mb-[16px]`}
                    >
                        <p className="mt-[4px] text-[20px] font-bold text-[#52525B]">
                            회원탈퇴
                        </p>

                        <button
                            type="button"
                            onClick={
                                deleteAccount
                            }
                            className="flex h-[30px] cursor-pointer items-center justify-center rounded-[8px] border-[2px] border-[#E4E4E7] bg-white px-[9px] text-[13px] font-bold text-[#666666] hover:border-[#EF8888] hover:text-[#EF8888]"
                        >
                            탈퇴
                        </button>
                    </div>
                </section>

                {/* =================================================
                    Footer
                ================================================= */}

                <footer className="mt-[32px] flex items-center gap-[28px] text-[16px] text-[#9A9AA3]">
                    <p>
                        © 2026 LearningLM
                    </p>

                    <p>
                        이용약관
                    </p>

                    <p>
                        개인정보처리방침
                    </p>
                </footer>
            </main>
        </div>
    );
}