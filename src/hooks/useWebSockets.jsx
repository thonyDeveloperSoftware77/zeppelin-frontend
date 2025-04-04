import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";

const useWebSocket = (onMessage) => {
  const { getToken } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    const connect = async () => {
      const token = await getToken();
      const userId = JSON.parse(atob(token.split('.')[1])).sub;

      const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/ws?user_id=${userId}&token=${token}`);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("✅ WebSocket conectado");
      };

      ws.onmessage = (event) => {
        if (onMessage) onMessage(event.data);
      };

      ws.onclose = () => {
        console.log("❌ WebSocket cerrado");
      };

      ws.onerror = (err) => {
        console.error("⚠️ Error WebSocket:", err);
      };
    };

    connect();

    return () => {
      socketRef.current?.close();
    };
  }, [getToken]);

  const sendMessage = (msg) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  };

  return {
    sendMessage,
  };
};

export default useWebSocket;
