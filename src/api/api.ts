import axios, {
    AxiosError,
    type InternalAxiosRequestConfig,
} from "axios";

/**
 * API 서버 주소
 *
 * 추후 VITE_API_BASE_URL 환경변수로
 * 통합하는 것이 최종적으로는 가장 좋습니다.
 */
const API_BASE_URL =
    "http://3.39.165.3:8080/api";

/**
 * 공용 Axios 인스턴스
 */
const api = axios.create({
    baseURL: API_BASE_URL,

    headers: {
        "Content-Type":
            "application/json",
    },
});

/**
 * 401 이후 동일 요청을 다시 시도했는지
 * 확인하기 위한 확장 타입입니다.
 */
interface RetryableRequestConfig
    extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

/**
 * 동시에 여러 API 요청이 401을 반환하는 경우
 * Refresh Token 재발급 요청이 여러 번 발생하지 않도록
 * 하나의 Promise를 공유합니다.
 */
let reissuePromise:
    | Promise<string>
    | null = null;



/**
* 현재 로그인된 사용자의 Access Token을 가져옵니다.
*
* 로그인 상태 유지 O → localStorage
* 로그인 상태 유지 X → sessionStorage
*/
const getAccessToken = () => {
    return (
        localStorage.getItem(
            "accessToken"
        ) ??
        sessionStorage.getItem(
            "accessToken"
        )
    );
};

/**
 * 현재 로그인된 사용자의 Refresh Token을 가져옵니다.
 */
const getRefreshToken = () => {
    return (
        localStorage.getItem(
            "refreshToken"
        ) ??
        sessionStorage.getItem(
            "refreshToken"
        )
    );
};
/**
 * 인증 관련 localStorage 정보를 제거합니다.
 */
const clearAuthStorage = () => {
    // localStorage 삭제
    localStorage.removeItem(
        "accessToken"
    );

    localStorage.removeItem(
        "refreshToken"
    );

    localStorage.removeItem(
        "user"
    );

    // sessionStorage 삭제
    sessionStorage.removeItem(
        "accessToken"
    );

    sessionStorage.removeItem(
        "refreshToken"
    );

    sessionStorage.removeItem(
        "user"
    );
};

/**
 * 로그인 화면으로 이동합니다.
 *
 * 이미 로그인 페이지에 있다면
 * 불필요하게 location을 다시 변경하지 않습니다.
 */
const redirectToLogin = () => {
    if (
        window.location.pathname !==
        "/login"
    ) {
        window.location.assign(
            "/login"
        );
    }
};

/**
 * Access Token 만료 시
 * 자동 재발급을 시도하지 않아야 하는 API 목록입니다.
 *
 * 중요:
 * /auth/me는 여기에 포함하지 않습니다.
 *
 * /auth/me에서 401이 발생하면
 * Refresh Token으로 Access Token을 재발급하고
 * /auth/me를 다시 요청해야 하기 때문입니다.
 */
const reissueExcludedPaths = [
    "/auth/login",
    "/auth/signup",
    "/auth/reissue",
    "/auth/google",
    "/auth/oauth2",
    "/auth/email/request",
    "/auth/email/verify",
    "/auth/password",
];

/**
 * 현재 요청이 Access Token 자동 재발급
 * 제외 대상인지 확인합니다.
 */
const isReissueExcludedRequest = (
    requestUrl: string
) => {
    return reissueExcludedPaths.some(
        (path) =>
            requestUrl.startsWith(
                path
            )
    );
};

/**
 * 모든 일반 API 요청에
 * Access Token을 자동으로 추가합니다.
 */
api.interceptors.request.use(
    (config) => {
        const accessToken =
            getAccessToken();

        if (accessToken) {
            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(
            error
        );
    }
);

/**
 * Access Token 만료 처리
 *
 * 일반 API 요청이 401을 반환하면:
 *
 * 1. Refresh Token 확인
 * 2. /auth/reissue 호출
 * 3. 새로운 Access / Refresh Token 저장
 * 4. 실패했던 기존 요청 재시도
 */
api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (
        error: AxiosError
    ) => {
        const originalRequest =
            error.config as
            | RetryableRequestConfig
            | undefined;

        /**
         * 요청 정보 자체가 없다면
         * 그대로 오류 반환
         */
        if (!originalRequest) {
            return Promise.reject(
                error
            );
        }

        const status =
            error.response?.status;

        const requestUrl =
            originalRequest.url ??
            "";

        /**
         * 아래 경우에는
         * 토큰 재발급을 시도하지 않습니다.
         *
         * - 401이 아닌 경우
         * - 이미 한 번 재시도한 요청
         * - 로그인 / 회원가입 / 재발급 등의 인증 API
         */
        if (
            status !== 401 ||
            originalRequest._retry ||
            isReissueExcludedRequest(
                requestUrl
            )
        ) {
            return Promise.reject(
                error
            );
        }

        /**
         * Refresh Token 확인
         */
        const refreshToken =
            getRefreshToken();

        /**
         * Refresh Token도 없다면
         * 더 이상 로그인 상태를 유지할 수 없습니다.
         */
        if (!refreshToken) {
            clearAuthStorage();
            redirectToLogin();

            return Promise.reject(
                error
            );
        }

        /**
         * 동일 요청이 무한 반복되지 않도록
         * 재시도 표시
         */
        originalRequest._retry =
            true;

        try {
            /**
             * 여러 API가 동시에 401을 반환하더라도
             * /auth/reissue는 한 번만 호출합니다.
             */
            if (!reissuePromise) {
                reissuePromise =
                    axios
                        .post(
                            `${API_BASE_URL}/auth/reissue`,
                            {
                                refreshToken,
                            },
                            {
                                headers: {
                                    "Content-Type":
                                        "application/json",
                                },
                            }
                        )
                        .then(
                            (
                                response
                            ) => {
                                const {
                                    accessToken:
                                    newAccessToken,

                                    refreshToken:
                                    newRefreshToken,
                                } =
                                    response
                                        .data
                                        .result;

                                /**
                                 * 정상적인 재발급 응답인지 확인
                                 */
                                if (
                                    !newAccessToken ||
                                    !newRefreshToken
                                ) {
                                    throw new Error(
                                        "토큰 재발급 응답이 올바르지 않습니다."
                                    );
                                }

                                /**
                                 * 새 토큰 저장
                                 */
                                /**
 * 기존 Refresh Token이
 * 어디에 저장되어 있었는지 확인합니다.
 *
 * localStorage에 있었다면
 * 로그인 상태 유지가 활성화된 상태입니다.
 */
                                const useLocalStorage =
                                    localStorage.getItem(
                                        "refreshToken"
                                    ) !== null;

                                if (useLocalStorage) {
                                    // 로그인 상태 유지
                                    localStorage.setItem(
                                        "accessToken",
                                        newAccessToken
                                    );

                                    localStorage.setItem(
                                        "refreshToken",
                                        newRefreshToken
                                    );
                                } else {
                                    // 로그인 상태 유지 안 함
                                    sessionStorage.setItem(
                                        "accessToken",
                                        newAccessToken
                                    );

                                    sessionStorage.setItem(
                                        "refreshToken",
                                        newRefreshToken
                                    );
                                }

                                return newAccessToken;
                            }
                        )
                        .finally(
                            () => {
                                /**
                                 * 재발급 작업 종료 후
                                 * 공유 Promise 초기화
                                 */
                                reissuePromise =
                                    null;
                            }
                        );
            }

            /**
             * 진행 중인 재발급 요청의
             * 결과를 기다립니다.
             */
            const newAccessToken =
                await reissuePromise;

            /**
             * 실패했던 원래 요청에
             * 새로운 Access Token 적용
             */
            originalRequest.headers =
                originalRequest.headers ??
                {};

            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            /**
             * 새 Access Token으로
             * 원래 요청을 다시 실행합니다.
             */
            return api(
                originalRequest
            );
        } catch (
        reissueError
        ) {
            /**
             * Refresh Token까지 만료됐거나
             * 재발급 요청 자체가 실패한 경우
             */
            console.error(
                "토큰 재발급 실패:",
                reissueError
            );

            clearAuthStorage();
            redirectToLogin();

            return Promise.reject(
                reissueError
            );
        }
    }
);

export default api;