import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const useConnectionStatus = () => {
  const { getToken } = useAuth();
  const [isMobileConnected, setIsMobileConnected] = useState(false);
  const [myConnections, setMyConnections] = useState(0);

  useEffect(() => {
    const fetchStatus = async () => {
      const token = await getToken();
      const userId = JSON.parse(atob(token.split(".")[1])).sub;
      `${import.meta.env.VITE_WS_URL}/ws/status/${userId}`
      console.log()
      const res = await fetch(
        `${import.meta.env.VITE_WS_URL}/ws/status/${userId}`
      );
      const data = await res.json();

      setMyConnections(data.connections || 0);
      setIsMobileConnected((data.platforms?.mobile || 0) > 0);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [getToken]);

  return { isMobileConnected, myConnections };
};

export default useConnectionStatus;
