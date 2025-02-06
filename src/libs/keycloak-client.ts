import { env } from "@/config/env";
import { getAccessToken } from "@/libs/get-access-token";
import { client } from "@/libs/openapi";
import { paths } from "@/types/openapi/keycloak";

const getUsers = async () => {
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
};

export { getUsers };
