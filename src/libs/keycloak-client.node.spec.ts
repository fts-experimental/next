import { getUsers, createUser } from "@/libs/keycloak-client";
import { todo } from "node:test";
import { v4 as uuid } from "uuid";

describe("keycloak-client", () => {
  it("ユーザーを取得する", async () => {
    const result = await getUsers();

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toBeDefined();
    expect(result._unsafeUnwrap().length).toBeGreaterThan(0);
  });

  it("ユーザーを作成する", async () => {
    const result = await createUser({
      email: `${uuid()}@example.com`,
      enabled: true,
    });

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toBeDefined();
    expect(result._unsafeUnwrap().email).toBe("user1@example.com");
  });

  todo("単一のユーザーを取得する", () => {});
});
