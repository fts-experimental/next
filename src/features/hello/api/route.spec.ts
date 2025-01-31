import { fetcher } from "@/libs/fetcher";
import { client } from "@/libs/rpc";
import type { InferResponseType } from "hono";

describe("/hello", () => {
  describe("GET", () => {
    it("メッセージを返す", async () => {
      type ResType = InferResponseType<typeof client.api.hello.$get>;
      const url = client.api.hello.$url();

      const res = await fetcher<ResType>(url);
      if (res.isOk()) {
        expect(res.value.message).toBe("hello");
      }
    });

    it("パスパラメータを含むメッセージを返す", async () => {
      type ResType = InferResponseType<
        (typeof client.api.hello)[":postId"]["$get"]
      >;
      const url = client.api.hello.$url({
        param: { postId: "1" },
      });

      const res = await fetcher<ResType>(url);
      if (res.isOk()) {
        expect(res.value.message).toBe("hello 1");
      }
    });
  });
});
