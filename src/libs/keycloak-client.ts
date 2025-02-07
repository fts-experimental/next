import { env } from "@/config/env";
import { getAccessToken } from "@/libs/get-access-token";
import { client } from "@/libs/openapi";
import { components, paths } from "@/types/openapi/keycloak";
import { handleResponse } from "@/libs/result";

// Keycloakクライアントの共通設定を作成する関数
const createKeycloakClient = async () => {
  const accessToken = await getAccessToken();
  return {
    client: client<paths>({
      baseUrl: env.KEYCLOAK_BASE_URL,
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    pathParams: {
      realm: env.KEYCLOAK_REALM,
    },
  };
};

const getUsers = async () => {
  const { client, headers, pathParams } = await createKeycloakClient();

  return client.GET("/admin/realms/{realm}/users", {
    headers,
    params: {
      path: pathParams,
    },
  });
};

type UserRepresentation = components["schemas"]["UserRepresentation"];

const createUser = async (user: UserRepresentation) => {
  const { client, headers, pathParams } = await createKeycloakClient();

  const { response } = await client.POST("/admin/realms/{realm}/users", {
    headers,
    params: {
      path: pathParams,
    },
    body: user,
  });

  // TODO: getUser関数を作成し、作成したユーザーを返却するようにする
  const createdUser: UserRepresentation = {
    email: "user1@example.com",
  };

  return await handleResponse<UserRepresentation>(response, createdUser);
};

export { getUsers, createUser };
