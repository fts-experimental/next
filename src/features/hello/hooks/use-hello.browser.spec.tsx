import { renderHook, waitFor } from "@testing-library/react";
import { useHello } from "@/features/hello/hooks/use-hello";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetcher } from "@/libs/fetcher";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";

// fetcherのモック化
vi.mock("@/libs/fetcher", () => ({
  fetcher: vi.fn(),
}));

describe("useHello", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    // モックの戻り値をセット
    (fetcher as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      _unsafeUnwrap: () => ({ message: "hello" }),
    });
  });

  afterEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
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
