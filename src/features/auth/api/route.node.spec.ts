import { fetcher } from "@/libs/fetcher";
import { client } from "@/libs/rpc";
import { randomUUID } from "crypto";
import { InferResponseType } from "hono";

describe("/auth/register", () => {
  it("既存ユーザーにメールを送信する", async () => {
    type BaseResType = InferResponseType<typeof client.api.auth.register.$post>;

    const url = client.api.auth.register.$url();
    const res = await fetcher<BaseResType>(url, {
      method: "POST",
      body: new URLSearchParams({
        email: "test@example.com",
        recaptchaToken: "dummy-token",
      }),
    });

    expect(res.isOk()).toBe(true);
    expect(res._unsafeUnwrap().success).toBe(true);
    expect(res._unsafeUnwrap().message).toBe(
      "[既存ユーザー] 入力されたメールアドレスに確認メールを送信しました。\nメールの指示に従って登録を完了してください。"
    );
  });

  it("ユーザーを新規作成しトークン付きメールを送信する", async () => {
    type BaseResType = InferResponseType<typeof client.api.auth.register.$post>;

    const url = client.api.auth.register.$url();
    const res = await fetcher<BaseResType>(url, {
      method: "POST",
      body: new URLSearchParams({
        email: `${randomUUID()}@example.com`,
        recaptchaToken: "dummy-token",
      }),
    });

    expect(res.isOk()).toBe(true);
    expect(res._unsafeUnwrap().success).toBe(true);
    expect(res._unsafeUnwrap().message).toBe(
      "[新規作成] 入力されたメールアドレスに確認メールを送信しました。\nメールの指示に従って登録を完了してください。"
    );
  });
});
