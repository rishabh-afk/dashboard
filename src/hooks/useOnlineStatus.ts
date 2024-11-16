import { useState, useEffect } from "react";

const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    if (typeof navigator !== "undefined" && navigator.onLine !== undefined) {
      setIsOnline(navigator.onLine); // Set initial online status

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    } else {
      console.error("navigator.onLine is not available in this environment.");
      return () => {};
    }
  }, []);

  return isOnline;
};

export default useOnlineStatus;
