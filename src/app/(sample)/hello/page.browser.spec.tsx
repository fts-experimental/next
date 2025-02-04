import { render, screen, waitFor } from "@testing-library/react";
import HelloPage from "@/app/(sample)/hello/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("HelloPage", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it("helloと表示される", async () => {
    render(<HelloPage />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => {
      const element = screen.getByText("hello");
      expect(element).toBeInTheDocument();
    });
  });
});
