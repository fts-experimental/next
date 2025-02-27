import { client } from "@/libs/rpc";
import type { InferResponseType } from "hono";
import app from "@/features/hello/api/route";

describe("/hello", () => {
  // レスポンスタイプの型定義をテストスイート全体で共有
  type HelloResponse = InferResponseType<typeof client.api.hello.$get>;

  describe("GET", () => {
    it("メッセージを返す", async () => {
      const res = await app.request("/");
      const data = (await res.json()) as HelloResponse;

      expect(res.status).toBe(200);
      expect(data.message).toBe("hello");
    });

    it("パスパラメータを含むメッセージを返す", async () => {
      const res = await app.request("/1");
      const data = (await res.json()) as HelloResponse;

      expect(res.status).toBe(200);
      expect(data.message).toBe("hello 1");
    });

    it("不正なパスパラメータを渡した場合はエラーを返す", async () => {
      const res = await app.request("/hoge");
      const data = (await res.json()) as HelloResponse;

      expect(res.status).toBe(400);
      expect(data.message).toBe("Validation failed");
    });
  });
});
