// playproof/src/features/azit/hooks/useAzitSocket.ts
import { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/store/authStore";

const SOCKET_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://myfit.my";

/** 서버 ack 공통 형태 */
export type SocketAck<TData> =
  | { ok: true; data: TData }
  | { ok: false; error: unknown };

/** 서버 broadcast error 이벤트 형태(명세) */
export interface ApiError {
  code: string;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export interface JoinRoomData {
  roomId: number; // chatRoomId
  azitId: number;
}

export interface ChatMessage {
  id: number;
  chatRoomId: number;
  memberId: number;
  userId: number;
  nickname?: string;
  content: string;
  createdAt: string;
}

type EmitWithAck = <TPayload, TData>(
  event: string,
  payload: TPayload
) => Promise<TData>;

export const useAzitSocket = (params: {
  roomId?: number;
  onMessage?: (msg: ChatMessage) => void;
  onError?: (err: ApiError) => void;
}) => {
  const { roomId } = params;

  const token = useAuthStore((s) => s.accessToken);

  const socketRef = useRef<Socket | null>(null);
  const joinedRoomIdRef = useRef<number | null>(null);

  const onMessageRef = useRef<typeof params.onMessage>(params.onMessage);
  const onErrorRef = useRef<typeof params.onError>(params.onError);

  const [isConnected, setIsConnected] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);
  const [lastError, setLastError] = useState<ApiError | null>(null);

  useEffect(() => {
    onMessageRef.current = params.onMessage;
  }, [params.onMessage]);

  useEffect(() => {
    onErrorRef.current = params.onError;
  }, [params.onError]);

  const disconnect = () => {
    const sock = socketRef.current;
    if (!sock) return;
    try {
      sock.disconnect();
    } finally {
      socketRef.current = null;
      joinedRoomIdRef.current = null;
      setIsConnected(false);
      setCurrentRoomId(null);
    }
  };

  const emitWithAck: EmitWithAck = useMemo(() => {
    return async <TPayload, TData>(event: string, payload: TPayload) => {
      const sock = socketRef.current;
      if (!sock || !sock.connected) {
        throw new Error(`[socket] not connected (event=${event})`);
      }

      return await new Promise<TData>((resolve, reject) => {
        sock.emit(event, payload, (ack: SocketAck<TData>) => {
          if (ack && typeof ack === "object" && "ok" in ack) {
            if (ack.ok) resolve(ack.data);
            else reject(ack.error);
            return;
          }
          reject(new Error(`[socket] invalid ack for event=${event}`));
        });
      });
    };
  }, []);

  /** 🔌 connect / subscribe */
  useEffect(() => {
    if (!token) {
      disconnect();
      return;
    }

    disconnect();

    const socket = io(SOCKET_BASE_URL, {
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 500,
      reconnectionDelayMax: 3000,
      timeout: 20000,
    });

    socketRef.current = socket;

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    const handleConnectError = (err: unknown) => {
      const wrapped: ApiError = {
        code: "SOCKET_CONNECT_ERROR",
        message:
          err instanceof Error
            ? err.message
            : typeof err === "string"
              ? err
              : "Socket connection error",
      };
      setLastError(wrapped);
      onErrorRef.current?.(wrapped);
    };

    const handleServerError = (err: ApiError) => {
      setLastError(err);
      onErrorRef.current?.(err);
    };

    const handleNewMessage = (payload: ChatMessage) => {
      onMessageRef.current?.(payload);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.on("error", handleServerError);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.off("error", handleServerError);
      socket.off("newMessage", handleNewMessage);
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /** 🏠 room 자동 join/leave */
  useEffect(() => {
    if (!roomId) {
      const prev = joinedRoomIdRef.current;
      if (prev !== null && socketRef.current?.connected) {
        socketRef.current.emit("leaveRoom", { roomId: prev });
      }
      joinedRoomIdRef.current = null;
      setCurrentRoomId(null);
      return;
    }

    if (!isConnected) return;

    const prev = joinedRoomIdRef.current;
    if (prev === roomId) {
      setCurrentRoomId(roomId);
      return;
    }

    if (prev !== null) {
      socketRef.current?.emit("leaveRoom", { roomId: prev });
    }

    let cancelled = false;

    (async () => {
      try {
        const data = await emitWithAck<{ roomId: number }, JoinRoomData>(
          "joinRoom",
          { roomId }
        );
        if (cancelled) return;
        joinedRoomIdRef.current = data.roomId;
        setCurrentRoomId(data.roomId);
      } catch (e) {
        if (cancelled) return;
        const wrapped: ApiError = {
          code: "JOIN_ROOM_FAILED",
          message: e instanceof Error ? e.message : "Failed to join room",
        };
        setLastError(wrapped);
        onErrorRef.current?.(wrapped);
        joinedRoomIdRef.current = null;
        setCurrentRoomId(null);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, isConnected]);

  const sendMessage = async (
    targetRoomId: number,
    content: string
  ): Promise<ChatMessage> => {
    return emitWithAck("sendMessage", { roomId: targetRoomId, content });
  };

  const voiceJoin = async (targetRoomId: number) => {
    return emitWithAck("voiceJoin", { roomId: targetRoomId });
  };

  const voiceLeave = (targetRoomId: number) => {
    socketRef.current?.emit("voiceLeave", { roomId: targetRoomId });
  };

  return {
    socket: socketRef,
    isConnected,
    currentRoomId,
    lastError,
    sendMessage,
    voiceJoin,
    voiceLeave,
  };
};
