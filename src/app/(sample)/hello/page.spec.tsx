import { render, screen } from "@testing-library/react";
import HelloPage from "@/app/(sample)/hello/page";

describe("HelloPage", () => {
  it("helloと表示される", async () => {
    render(<HelloPage />);

    const element = screen.getByText("hello");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("DIV");
  });
});
