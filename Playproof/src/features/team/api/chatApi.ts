// src/features/team/api/chatApi.ts
export type ApiError = {
  code: string;
  message: string;
  errors?: { field: string; value: unknown; reason: string }[];
};

export type Result<T> =
  | { statusCode: number; data: T; error: null }
  | { statusCode: number; data: null; error: ApiError };

export type ChatRoomGetResDto = {
  id: number; // chatRoomId
  roomName: string;
  chatType: "TEXT" | "VOICE";
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ChatMessageResDto = {
  id: number;
  chatRoomId: number;
  memberId: number;
  userId: number;
  nickname?: string | null;
  content: string;
  createdAt: string;
};

export type ChatMessageListResDto = {
  messages: ChatMessageResDto[];
  nextCursor: number | null;
};

const normalizeBase = (baseUrl: string) => baseUrl.trim().replace(/\/+$/, "");

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  const json = (await res.json().catch(() => null)) as T | null;
  if (!json) throw new Error(`API 응답 파싱 실패 (status=${res.status})`);
  return json;
}

export async function getChatRoomsByAzit(params: {
  apiBaseUrl: string;
  accessToken: string;
  azitId: number;
}): Promise<ChatRoomGetResDto[]> {
  const base = normalizeBase(params.apiBaseUrl);
  const url = `${base}/azits/${params.azitId}/chat-rooms`;

  const json = await fetchJson<Result<ChatRoomGetResDto[]>>(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
      Accept: "application/json",
    },
  });

  if (json.error) throw new Error(json.error.message);
  return json.data;
}

export async function createChatRoomByAzit(params: {
  apiBaseUrl: string;
  accessToken: string;
  azitId: number;
  roomName: string;
  chatType: "TEXT" | "VOICE";
  // 필요하면 여기 확장:
  // isPrivate?: boolean;
}): Promise<ChatRoomGetResDto> {
  const base = normalizeBase(params.apiBaseUrl);
  const url = `${base}/azits/${params.azitId}/chat-rooms`;

  // ✅ 백엔드가 다른 키를 쓰면 여기 body만 맞추면 됨
  const body = {
    roomName: params.roomName,
    chatType: params.chatType,
    // isPrivate: params.isPrivate ?? false,
  };

  const json = await fetchJson<Result<ChatRoomGetResDto>>(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (json.error) throw new Error(json.error.message);
  return json.data;
}

export async function getChatMessages(params: {
  apiBaseUrl: string;
  accessToken: string;
  roomId: number; // chatRoomId
  cursor?: number | null;
}): Promise<ChatMessageListResDto> {
  const base = normalizeBase(params.apiBaseUrl);
  const qs = params.cursor ? `?cursor=${params.cursor}` : "";
  const url = `${base}/chat-rooms/${params.roomId}/messages${qs}`;

  const json = await fetchJson<Result<ChatMessageListResDto>>(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
      Accept: "application/json",
    },
  });

  if (json.error) throw new Error(json.error.message);
  return json.data;
}

/**
 * Alias for chat message list fetch (hook-friendly name).
 * Backend contract: cursor-based pagination (not limit/beforeId).
 */
export async function fetchChatMessages(params: {
  apiBaseUrl: string;
  accessToken: string;
  roomId: number;
  cursor?: number | null;
}): Promise<ChatMessageListResDto> {
  return getChatMessages({
    apiBaseUrl: params.apiBaseUrl,
    accessToken: params.accessToken,
    roomId: params.roomId,
    cursor: params.cursor ?? null,
  });
}
