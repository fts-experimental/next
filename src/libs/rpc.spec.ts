import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { env } from "@/config/env";

describe("rpc", () => {
  const originalEnv = { ...env };

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    // テスト後に環境変数を元に戻す
    process.env.NEXT_PUBLIC_APP_URL = originalEnv.NEXT_PUBLIC_APP_URL;
  });

  it("NEXT_PUBLIC_APP_URLが設定されている場合、clientが正常に初期化される", async () => {
    process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
    const { client } = await import("./rpc");
    expect(client).toBeDefined();
  });

  it("NEXT_PUBLIC_APP_URLが設定されていない場合、@t3-oss/env-nextjsのエラーがスローされる", async () => {
    process.env.NEXT_PUBLIC_APP_URL = "INVALID_VALUE";

    await expect(import("./rpc")).rejects.toThrow(
      "Invalid environment variables"
    );
  });
});
