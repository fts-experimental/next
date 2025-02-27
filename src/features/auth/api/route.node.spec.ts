import { client } from "@/libs/rpc";
import { randomUUID } from "crypto";
import { validateToken } from "@/libs/recaptcha";
import { InferResponseType } from "hono";
import app from "@/features/auth/api/route";

vi.mock("@/libs/recaptcha", () => {
  return {
    validateToken: vi.fn(),
  };
});

describe("/auth/register", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  type RegisterResponse = InferResponseType<
    typeof client.api.auth.register.$post
  >;

  it("既存ユーザーにメールを送信する", async () => {
    const mockValidateToken = vi.mocked(validateToken);
    mockValidateToken.mockResolvedValue(true);

    const res = await app.request("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email: "test@example.com",
        recaptchaToken: "dummy-token",
      }).toString(),
    });

    const data = (await res.json()) as RegisterResponse;

    expect(mockValidateToken).toHaveBeenCalledWith("dummy-token");
    expect(mockValidateToken).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe(
      "[既存ユーザー] 入力されたメールアドレスに確認メールを送信しました。\nメールの指示に従って登録を完了してください。"
    );
  });

  it("ユーザーを新規作成しトークン付きメールを送信する", async () => {
    const mockValidateToken = vi.mocked(validateToken);
    mockValidateToken.mockResolvedValue(true);

    const res = await app.request("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email: `${randomUUID()}@example.com`,
        recaptchaToken: "dummy-token",
      }).toString(),
    });

    const data = (await res.json()) as RegisterResponse;

    expect(mockValidateToken).toHaveBeenCalledWith("dummy-token");
    expect(mockValidateToken).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe(
      "[新規作成] 入力されたメールアドレスに確認メールを送信しました。\nメールの指示に従って登録を完了してください。"
    );
  });

  it("reCAPTCHA検証が失敗した場合、エラーを返す", async () => {
    const mockValidateToken = vi.mocked(validateToken);
    mockValidateToken.mockResolvedValue(false);

    const res = await app.request("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email: "test@example.com",
        recaptchaToken: "dummy-token",
      }).toString(),
    });

    const data = (await res.json()) as RegisterResponse;

    expect(mockValidateToken).toHaveBeenCalledWith("dummy-token");
    expect(mockValidateToken).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe("reCAPTCHA validation failed");
  });
});
