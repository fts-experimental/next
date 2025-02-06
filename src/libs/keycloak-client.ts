import { env } from "@/config/env";
import { getAccessToken } from "@/libs/get-access-token";
import { client } from "@/libs/openapi";
import { components, paths } from "@/types/openapi/keycloak";
import { hundleResponse } from "@/libs/result";

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

type UserRepresentation = components["schemas"]["UserRepresentation"];

const createUser = async (user: UserRepresentation) => {
  const accessToken = await getAccessToken();

  const { response } = await client<paths>({
    baseUrl: env.KEYCLOAK_BASE_URL,
  }).POST("/admin/realms/{realm}/users", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      path: {
        realm: env.KEYCLOAK_REALM,
      },
    },
    body: user,
  });

  // TODO: getUser関数を作成し、作成したユーザーを返却するようにする
  const createdUser: UserRepresentation = {
    email: "user1@example.com",
  };

  return await hundleResponse<UserRepresentation>(response, createdUser);
};

export { getUsers, createUser };
