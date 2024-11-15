import { useState, useEffect } from "react";

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

const cache: { [key: string]: any } = {};
const BASEURL = process.env.REACT_APP_API_URL;

function useFetch(url: string, options?: FetchOptions) {
  const [state, setState] = useState<any>({
    data: cache[url] || null, // Load data from cache if available
    loading: !cache[url], // Skip loading if data is cached
    error: null,
    isCached: !!cache[url], // Indicate if the response is from the cache
  });

  useEffect(() => {
    if (cache[url]) return; // If data is cached, do not fetch again
    let isMounted = true;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Abort request after 10 seconds

    const fetchData = async () => {
      setState({ data: null, loading: true, error: null, isCached: false });

      try {
        const response = await fetch(`${BASEURL}${url}`, {
          ...options,
          signal: controller.signal, // Attach AbortController signal
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            ...(options?.headers || {}),
          },
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(
            errorDetails.message ||
              `Error ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();

        if (isMounted) {
          cache[url] = data; // Cache the response
          setState({ data, loading: false, error: null, isCached: false });
        }
      } catch (error: any) {
        if (isMounted) {
          if (error.name === "AbortError") {
            setState({
              data: null,
              loading: false,
              error: "Request timed out after 10 seconds",
              isCached: false,
            });
          } else {
            setState({
              data: null,
              loading: false,
              error: error.message || "An unknown error occurred",
              isCached: false,
            });
          }
        }
      } finally {
        clearTimeout(timeoutId); // Clear timeout after request completes
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Prevent state updates after component unmount
      controller.abort(); // Abort fetch on unmount
    };
  }, [url, options]);

  return state;
}

export default useFetch;
