import { render, screen, waitFor } from "@testing-library/react";
import HelloPage from "@/app/(sample)/hello/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("HelloPage", () => {
  it("helloと表示される", async () => {
    const queryClient = new QueryClient();

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
      expect(element.tagName).toBe("DIV");
    });
  });
});
