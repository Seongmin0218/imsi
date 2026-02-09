import React from "react";
import { useLocation } from "react-router-dom";

import type { User } from "@/features/team/types/types";
import { useAuthStore } from "@/store/authStore";

import {
  MOCK_MY_AZITS,
  mockMembers,
  mockMembersByAzit,
  mockSchedulesByAzit,
  mockClipsByAzit,
} from "@/features/team/data/mockTeamData";

import { useAzitSchedules } from "@/features/team/hooks/useAzitSchedules";
import { useAzitFeedback } from "@/features/team/hooks/useAzitFeedback";
import { useAzitMedia } from "@/features/team/hooks/useAzitMedia";
import { useAzitRooms, type ChatMessageUI } from "@/features/team/hooks/useAzitRooms";

import { useAzitSocket, type ApiError, type ChatMessage } from "@/features/team/hooks/useAzitSocket";
import {
  getChatRoomsByAzit,
  getChatMessages,
  createChatRoomByAzit,
  type ChatMessageResDto,
} from "@/features/team/api/chatApi";

const FALLBACK_USER_ID = "1";

function toUiMessage(dto: ChatMessageResDto | ChatMessage): ChatMessageUI {
  const nickname = (dto as unknown as { nickname?: string | null }).nickname;
  const userId = (dto as unknown as { userId?: number | string }).userId;

  return {
    id: String((dto as unknown as { id: number | string }).id),
    author: nickname ?? (userId != null ? `User ${String(userId)}` : "Unknown"),
    content: (dto as unknown as { content: string }).content,
    createdAt: (dto as unknown as { createdAt: string }).createdAt,
  };
}

export function useAzitPageLogic() {
  const location = useLocation();
  const routeState = location.state as { azitId?: number } | null;

  const [scheduleAnchorEl, setScheduleAnchorEl] = React.useState<HTMLElement | null>(null);
  const [azits, setAzits] = React.useState(MOCK_MY_AZITS);
  const azitIconUrlsRef = React.useRef<string[]>([]);
  const currentUserId = FALLBACK_USER_ID;

  const accessToken = useAuthStore((s) => s.accessToken);

  const apiBaseUrl =
    ((import.meta as unknown as { env?: Record<string, unknown> }).env?.VITE_API_BASE_URL as string | undefined)?.trim() ||
    "https://myfit.my";

  const currentUser =
    mockMembers.find((m) => String(m.id) === String(currentUserId)) ??
    ({
      id: String(currentUserId),
      nickname: "사용자",
      avatarUrl: "",
      isOnline: true,
    } as User);

  const {
    currentAzitId,
    setCurrentAzitId,
    schedules,
    handleStatusChange,
    addSchedule,
    markFeedbackDone,
  } = useAzitSchedules(currentUserId, mockSchedulesByAzit, mockMembersByAzit, currentUser);

  const {
    feedbackModal,
    openFeedbackModal,
    closeFeedbackModal,
    submitFeedback,
    getPendingFeedbacks,
  } = useAzitFeedback({
    schedules,
    currentUserId,
    currentUser,
    currentAzitId,
    markFeedbackDone,
  });

  const { clipsByAzit, createMediaItems, addClipsFromMedia, initAzitClips } = useAzitMedia(mockClipsByAzit);

  const {
    chatRooms,
    selectedChatRoomId,
    selectedChatRoomName,
    messages,
    setChatRoomsFromServer,
    setSelectedChatRoom,
    replaceMessagesForRoom,
    appendMessageToRoom,

    voiceRooms,
    joinVoiceRoom,
    toggleMyMic,
    initAzitRooms,
  } = useAzitRooms(currentAzitId, currentUser);

  const [socketUiError, setSocketUiError] = React.useState<ApiError | null>(null);

  const {
    socket,
    isConnected,
    currentRoomId,
    lastError,
    sendMessage: sendSocketMessage,
  } = useAzitSocket({
    roomId: selectedChatRoomId ?? undefined,
    onMessage: (msg) => {
      appendMessageToRoom(msg.chatRoomId, toUiMessage(msg));
    },
    onError: (err) => {
      setSocketUiError(err);
    },
  });

  React.useEffect(() => {
    if (routeState?.azitId) setCurrentAzitId(routeState.azitId);
  }, [routeState?.azitId, setCurrentAzitId]);

  const currentAzit = azits.find((a) => a.id === currentAzitId) ?? azits[0];
  const currentMembers = mockMembersByAzit[currentAzitId] ?? [];
  const currentClips = clipsByAzit[currentAzitId] ?? [];

  // (1) azit 변경 시: 채팅방 목록 로드
  const reloadChatRooms = React.useCallback(async () => {
    if (!accessToken) return;

    const rooms = await getChatRoomsByAzit({
      apiBaseUrl,
      accessToken,
      azitId: currentAzitId,
    });

    const textRooms = rooms
      .filter((r) => r.chatType === "TEXT")
      .map((r) => ({ id: r.id, roomName: r.roomName }));

    setChatRoomsFromServer(textRooms);
  }, [apiBaseUrl, accessToken, currentAzitId, setChatRoomsFromServer]);

  React.useEffect(() => {
    if (!accessToken) return;

    let cancelled = false;
    (async () => {
      try {
        await reloadChatRooms();
      } catch {
        // ignore
      }
    })();

    return () => {
      cancelled = true;
      void cancelled;
    };
  }, [accessToken, reloadChatRooms]);

  // (2) 방 선택 변경: 메시지 초기 로드(REST)
  React.useEffect(() => {
    if (!accessToken) return;
    if (!selectedChatRoomId) return;

    let cancelled = false;

    (async () => {
      try {
        const list = await getChatMessages({
          apiBaseUrl,
          accessToken,
          roomId: selectedChatRoomId,
        });

        if (cancelled) return;
        replaceMessagesForRoom(selectedChatRoomId, list.messages.map(toUiMessage));
      } catch {
        // ignore
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, accessToken, selectedChatRoomId, replaceMessagesForRoom]);

  // (3) 전송
  const onSendMessage = React.useCallback(
    async (roomId: number, content: string, files: File[]) => {
      const text = content.trim();
      const media = createMediaItems(files);
      if (!text && media.length === 0) return;

      if (media.length > 0) addClipsFromMedia(currentAzitId, media);

      await sendSocketMessage(roomId, text);
    },
    [addClipsFromMedia, createMediaItems, currentAzitId, sendSocketMessage]
  );

  // ✅ (4) 채팅방 생성 (여기부터가 이번 목표)
  const onCreateChatRoom = React.useCallback(
    async (name: string, type: "TEXT" | "VOICE") => {
      if (!accessToken) return;

      const trimmed = name.trim();
      if (!trimmed) return;

      // 1) 생성
      const created = await createChatRoomByAzit({
        apiBaseUrl,
        accessToken,
        azitId: currentAzitId,
        roomName: trimmed,
        chatType: type,
      });

      // 2) 목록 갱신(서버 기준)
      await reloadChatRooms();

      // 3) 생성된 방 자동 선택
      if (created.chatType === "TEXT") {
        setSelectedChatRoom(created.id);
      }
    },
    [accessToken, apiBaseUrl, currentAzitId, reloadChatRooms, setSelectedChatRoom]
  );

  React.useEffect(() => {
    return () => {
      azitIconUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      azitIconUrlsRef.current = [];
    };
  }, []);

  const addAzit = React.useCallback(
    (name: string, iconUrl?: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      const nextId = azits.reduce((max, a) => Math.max(max, a.id), 0) + 1;
      if (iconUrl) azitIconUrlsRef.current.push(iconUrl);

      const nextAzit = { id: nextId, name: trimmed, memberCount: 1, icon: iconUrl ?? "" };

      setAzits((prev) => [...prev, nextAzit]);
      initAzitRooms(nextId);
      initAzitClips(nextId);
      setCurrentAzitId(nextId);
    },
    [azits, initAzitClips, initAzitRooms, setCurrentAzitId]
  );

  const socketId = socket.current?.id ?? null;
  const socketStatus = isConnected ? "connected" : "disconnected";

  return {
    state: {
      azits,
      currentAzitId,
      scheduleAnchorEl,

      currentAzit,
      currentMembers,
      currentClips,
      schedules,
      currentUserId,
      currentUser,
      feedbackModal,

      chatRooms,
      selectedChatRoomId,
      selectedChatRoomName,
      messages,

      voiceRooms,

      socketStatus,
      socketId,
      socketConnected: isConnected,
      socketErrorText: lastError?.message ?? null,
      socketUiError,
      currentRoomId,
    },
    actions: {
      setCurrentAzitId,
      setScheduleAnchorEl,

      setSelectedChatRoom,
      onSendMessage,
      onCreateChatRoom, // ✅ 추가

      handleStatusChange,
      addSchedule,
      openFeedbackModal,
      closeFeedbackModal,
      submitFeedback,
      getPendingFeedbacks,

      joinVoiceRoom,
      toggleMyMic,

      addAzit,
    },
  };
}
