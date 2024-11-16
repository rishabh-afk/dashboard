import { useState, useEffect } from "react";

const useScript = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => setIsError(true);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return { isLoaded, isError };
};

export default useScript;
