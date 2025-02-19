import { fetcher } from "@/libs/fetcher";
import { client } from "@/libs/rpc";
import { InferResponseType } from "hono";

describe("/auth/register", () => {
  it("メッセージを返す", async () => {
    type BaseResType = InferResponseType<typeof client.api.auth.register.$post>;

    const url = client.api.auth.register.$url();
    const res = await fetcher<BaseResType>(url, {
      method: "POST",
      body: new URLSearchParams({
        email: "test@example.com",
      }),
    });

    expect(res.isOk()).toBe(true);
    expect(res._unsafeUnwrap().success).toBe(true);
    expect(res._unsafeUnwrap().message).toBe(
      "入力されたメールアドレスに確認メールを送信しました。\nメールの指示に従って登録を完了してください。"
    );
  });
});
