import { fetcher } from "@/libs/fetcher";
import { client } from "@/libs/rpc";
import type { InferResponseType } from "hono";

describe("/hello", () => {
  describe("GET", () => {
    it("メッセージを返す", async () => {
      type ResType = InferResponseType<typeof client.api.hello.$get>;
      const url = client.api.hello.$url();

      const res = await fetcher<ResType>(url);
      expect(res.isOk()).toBe(true);
      if (res.isOk()) {
        expect(res.value.message).toBe("hello");
      }
    });

    it("パスパラメータを含むメッセージを返す", async () => {
      type ResType = InferResponseType<
        (typeof client.api.hello)[":postId"]["$get"]
      >;
      const validParam = { postId: "1" };
      const url = client.api.hello[":postId"].$url({
        param: validParam,
      });

      const res = await fetcher<ResType>(url);
      expect(res.isOk()).toBe(true);
      if (res.isOk()) {
        expect(res.value.message).toBe("hello 1");
      }
    });

    it("不正なパスパラメータを渡した場合はエラーを返す", async () => {
      type ResType = InferResponseType<
        (typeof client.api.hello)[":postId"]["$get"]
      >;
      const invalidParam = { postId: "hoge" };
      const url = client.api.hello[":postId"].$url({
        param: invalidParam,
      });

      const res = await fetcher<ResType>(url);
      if (res.isErr()) {
        expect(res.error.status).toBe(400);
      }
    });
  });
});
