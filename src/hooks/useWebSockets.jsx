import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const useWebSocket = () => {
  const { getToken } = useAuth();
  const socketRef = useRef(null);
  const userIdRef = useRef(null);
  const [ready, setReady] = useState(false);

  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    const connect = async () => {
      const token = await getToken();
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded.sub;
      userIdRef.current = userId;

      const platform = "web";

      const ws = new WebSocket(
        `${import.meta.env.VITE_WS_URL}/ws?user_id=${userId}&token=${token}&platform=${platform}`
      );

      socketRef.current = ws;

      ws.onopen = () => {
        console.log("✅ WebSocket conectado");
        setReady(true);
      };

      ws.onmessage = (event) => {
        setLastMessage(event.data);
      };

      ws.onclose = () => {
        console.log("❌ WebSocket cerrado");
        setReady(false);
      };

      ws.onerror = (err) => {
        console.error("⚠️ Error WebSocket:", err);
      };
    };

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [getToken]);

  const sendMessage = (msg) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  };

  return {
    sendMessage,
    userId: userIdRef.current,
    lastMessage,
    ready,
  };
};

export default useWebSocket;
