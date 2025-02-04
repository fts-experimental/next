import { fetcher } from "@/libs/fetcher";
import { client } from "@/libs/rpc";
import type { InferResponseType } from "hono";

describe("/hello", () => {
  // レスポンスタイプの型定義をテストスイート全体で共有
  type BaseResType = InferResponseType<typeof client.api.hello.$get>;
  type ParamResType = InferResponseType<
    (typeof client.api.hello)[":postId"]["$get"]
  >;

  describe("GET", () => {
    it("メッセージを返す", async () => {
      const url = client.api.hello.$url();
      const res = await fetcher<BaseResType>(url);

      expect(res.isOk()).toBe(true);
      // 成功ケースでは必ず値の検証を行う
      expect(res._unsafeUnwrap().message).toBe("hello");
    });

    it("パスパラメータを含むメッセージを返す", async () => {
      const validParam = { postId: "1" };
      const url = client.api.hello[":postId"].$url({ param: validParam });
      const res = await fetcher<ParamResType>(url);

      expect(res.isOk()).toBe(true);
      expect(res._unsafeUnwrap().message).toBe("hello 1");
    });

    it("不正なパスパラメータを渡した場合はエラーを返す", async () => {
      const invalidParam = { postId: "hoge" };
      const url = client.api.hello[":postId"].$url({ param: invalidParam });
      const res = await fetcher<ParamResType>(url);

      expect(res.isErr()).toBe(true);
      // エラーオブジェクトの詳細検証を追加
      expect(res._unsafeUnwrapErr()).toBeInstanceOf(Error);
      expect(res._unsafeUnwrapErr().status).toBe(400);
    });
  });
});
