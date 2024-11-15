import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // Example cache time
      refetchOnWindowFocus: false,
    },
  },
});
