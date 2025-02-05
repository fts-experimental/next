import { env } from "@/config/env";
import { getAccessToken } from "@/libs/get-access-token";
import { client } from "./openapi";
import { paths } from "@/types/openapi/keycloak";

export const keycloakClient = {
  getUsers: async () => {
    const accessToken = await getAccessToken();

    return client<paths>({
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
  },
};
