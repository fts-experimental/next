import { fetcher } from "./fetcher";
import type { FetchError } from "./fetcher";

describe("fetcher", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  type MockUser = {
    id: number;
    username: string;
  };

  it("[GET] 正常なレスポンスを処理する", async () => {
    const mockUser: MockUser = { id: 1, username: "emilys" };
    const mockUrl = "/api/users/1";

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const result = await fetcher<MockUser>(mockUrl);

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith(mockUrl, undefined);
  });

  it("[POST] 正常にデータを送信できる", async () => {
    const mockUser: MockUser = { id: 1, username: "test_user" };
    const mockUrl = "/api/users/add";

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockUser),
    };

    const result = await fetcher<MockUser>(mockUrl, options);

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith(mockUrl, options);
  });

  it("404エラーを適切に処理する", async () => {
    const mockUrl = "/api/invalid-endpoint";
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const result = await fetcher<MockUser>(mockUrl);

    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr() as FetchError;
    expect(error.status).toBe(404);
    expect(error.message).toContain("HTTP error! status: 404 Not Found");
  });

  it("ネットワークエラーを捕捉できる", async () => {
    const mockUrl = "/api/users/1";
    global.fetch = vi.fn().mockRejectedValue(new Error("Connection failed"));

    const result = await fetcher<MockUser>(mockUrl);

    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr() as FetchError;
    expect(error.message).toContain("Connection failed");
    expect(error.status).toBe(500);
  });

  it("不正なJSON形式のレスポンスを処理する", async () => {
    const mockUrl = "/api/users/1";
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.reject(new Error("Invalid JSON")),
    });

    const result = await fetcher<MockUser>(mockUrl);

    expect(result.isErr()).toBe(true);
    const error = result._unsafeUnwrapErr() as FetchError;
    expect(error.message).toContain("Invalid JSON");
  });
});
