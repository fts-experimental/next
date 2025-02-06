import { getUsers } from "@/libs/keycloak-client";

describe("keycloak-client", () => {
  it("ユーザーを取得する", async () => {
    const { data, error } = await getUsers();

    expect(data).toBeDefined();
    expect(error).toBeUndefined();
  });
});
