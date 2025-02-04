import { renderHook, waitFor } from "@testing-library/react";
import { useHello } from "@/features/hello/hooks/use-hello";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("useHello", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it("APIから正常にデータを取得する", async () => {
    const { result } = renderHook(() => useHello(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data?._unsafeUnwrap().message).toBe("hello");
    });
  });
});
