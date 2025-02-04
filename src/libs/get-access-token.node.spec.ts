import { getAccessToken } from "@/libs/get-access-token";

describe("getAccessToken", () => {
  it("アクセストークンを取得する", async () => {
    const result = await getAccessToken();

    expect(result).toBeDefined();
    expect(result).toBeTypeOf("string");
  });
});
