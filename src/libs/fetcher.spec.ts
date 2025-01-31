import { fetcher } from "./fetcher";

describe("fetcher", () => {
  type MockUser = {
    id: number;
    username: string;
  };

  const mockApiUrl = "https://dummyjson.com";

  it("[GET] MockUser型を返す", async () => {
    const userId = 1;
    const result = await fetcher<MockUser>(`${mockApiUrl}/users/${userId}`);
    if (result.isOk()) {
      expect(result.isOk()).toBe(true);
      expect(result.value.id).toBeTypeOf("number");
      expect(result.value.username).toBeTypeOf("string");
      expect(result.value.username).toBe("emilys");
    }
  });

  it("[POST] MockUser型を返す", async () => {
    const mockUser: MockUser = {
      id: 1,
      username: "test_user",
    };
    const result = await fetcher<MockUser>(`${mockApiUrl}/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockUser),
    });
    if (result.isOk()) {
      expect(result.isOk()).toBe(true);
      expect(result.value.id).toBeTypeOf("number");
      expect(result.value.username).toBeTypeOf("string");
      expect(result.value.username).toBe("test_user");
    }
  });

  it("fetcher関数内部でリクエストが失敗した場合はエラーを返す", async () => {
    const userId = 999;
    const result = await fetcher<MockUser>(`${mockApiUrl}/users/${userId}`);

    if (result.isErr()) {
      expect(result.isErr()).toBe(true);
      expect(result.error.status).toBe(404);
      expect(result.error.statusText).toBe("Not Found");
    }
  });
});
