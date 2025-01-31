import { renderHook, waitFor } from "@testing-library/react";
import { useHello } from "@/features/hello/hooks/use-hello";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("useHello", () => {
  it("APIから取得したデータを返す", async () => {
    const queryClient = new QueryClient();

    const { result } = renderHook(() => useHello(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.data?.isOk()).toBe(true);
      if (result.current.data?.isOk()) {
        expect(result.current.data?.value.message).toBe("hello");
      }
    });
  });
});
