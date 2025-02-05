import { env } from "@/config/env";
import { getAccessToken } from "@/libs/get-access-token";
import { client } from "./openapi";
import { paths } from "@/types/openapi/keycloak";

describe("keycloak-client", () => {
  it("ユーザーを取得する", async () => {
    const accessToken = await getAccessToken();

    const { data, error } = await client<paths>({
      baseUrl: env.KEYCLOAK_BASE_URL,
    }).GET("/admin/realms/{realm}/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        path: {
          realm: env.KEYCLOAK_REALM,
        },
      },
    });

    expect(data).toBeDefined();
    expect(error).toBeUndefined();
  });
});
