import { findAllUsers, createUser, findUser } from "@/libs/keycloak-client";
import { v4 as uuid } from "uuid";

describe("keycloak-client", () => {
  it("単一のユーザーを取得する", async () => {
    const result = await findUser("test@example.com");

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toBeDefined();
    expect(result._unsafeUnwrap().email).toBe("test@example.com");
  });

  it("すべてのユーザーを取得する", async () => {
    const result = await findAllUsers();

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toBeDefined();
    expect(result._unsafeUnwrap().length).toBeGreaterThan(0);
  });

  it("ユーザーを作成する", async () => {
    const email = `${uuid()}@example.com`;
    const result = await createUser({
      email,
      enabled: true,
    });

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap()).toBeDefined();
    expect(result._unsafeUnwrap().email).toBe(email);
  });
});
