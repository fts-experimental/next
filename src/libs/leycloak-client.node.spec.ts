import { env } from "@/config/env";
import { getAccessToken } from "@/libs/get-access-token";
import { keycloakClient } from "@/libs/keycloak-client";

describe("keycloak-client", () => {
  it("ユーザーを取得する", async () => {
    const kc = keycloakClient();

    const accessToken = await getAccessToken();

    const { data, error } = await kc.GET("/admin/realms/{realm}/users", {
      params: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        path: {
          realm: env.KEYCLOAK_REALM,
        },
      },
    });

    console.log(data);
    expect(data).toBeDefined();
    expect(error).toBeUndefined();
  });
});
