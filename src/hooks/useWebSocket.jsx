// src/hooks/useWebSocket.js
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const useWebSocket = (platform = "web") => {
  const { getToken } = useAuth();
  const socketRef = useRef(null);
  const userIdRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!platform) {
      // No conectar si platform es null
      setReady(false);
      setError(null);
      return;
    }

    const connect = async () => {
      try {
        const token = await getToken();
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const userId = decoded.sub;
        userIdRef.current = userId;

        const ws = new WebSocket(
          `${import.meta.env.VITE_WS_URL}/ws?user_id=${userId}&token=${token}&platform=${platform}`
        );

        socketRef.current = ws;

        ws.onopen = () => {
          console.log(`✅ WebSocket conectado (${platform})`);
          setReady(true);
          setError(null);
        };

        ws.onmessage = (event) => {
          setLastMessage(event.data);
        };

        ws.onclose = () => {
          console.log(`❌ WebSocket cerrado (${platform})`);
          setReady(false);
        };

        ws.onerror = (err) => {
          console.error(`⚠️ Error WebSocket (${platform}):`, err);
          setError(`Error en la conexión WebSocket para ${platform}`);
        };
      } catch (err) {
        console.error(`⚠️ Error al conectar WebSocket (${platform}):`, err);
        setError("No se pudo establecer la conexión");
      }
    };

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [getToken, platform]);

  const sendMessage = (msg) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    } else {
      console.warn(`⚠️ No se puede enviar mensaje: WebSocket (${platform}) no está abierto`);
    }
  };

  return {
    sendMessage,
    userId: userIdRef.current,
    lastMessage,
    ready,
    error,
  };
};

export default useWebSocket;