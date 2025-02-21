import { env } from "@/config/env";
import { getAccessToken } from "@/libs/get-access-token";
import { client } from "@/libs/openapi";
import { components, paths } from "@/types/openapi/keycloak";
import { FetchError, handleResponse } from "@/libs/result";
import { err, ok, Result } from "neverthrow";

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

const getUserId = async (
  email: string
): Promise<Result<string, FetchError>> => {
  const result = await findUser(email);
  if (result.isErr()) {
    return err(new FetchError(result.error.status, result.error.statusText));
  }

  return ok(result.value.id!);
};

const findUser = async (email: string) => {
  const { client, headers, pathParams } = await createKeycloakClient();

  const { data, response } = (await client.GET("/admin/realms/{realm}/users", {
    headers,
    params: {
      path: pathParams,
      query: {
        email,
        exact: true,
      },
    },
  })) as {
    data: UserRepresentation[];
    response: Response;
  };

  const user = data[0];
  return await handleResponse<UserRepresentation>(response, user);
};

const findAllUsers = async () => {
  const { client, headers, pathParams } = await createKeycloakClient();

  const { data, response } = (await client.GET("/admin/realms/{realm}/users", {
    headers,
    params: {
      path: pathParams,
    },
  })) as {
    data: UserRepresentation[];
    response: Response;
  };

  return await handleResponse<UserRepresentation[]>(response, data);
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

  const result = await findUser(user.email!);
  if (result.isErr()) {
    return result;
  }

  const createdUser = result.value;

  return await handleResponse<UserRepresentation>(response, createdUser);
};

const setPassword = async (userId: string, password: string) => {
  const { client, headers, pathParams } = await createKeycloakClient();

  const { response } = await client.PUT(
    "/admin/realms/{realm}/users/{user-id}/reset-password",
    {
      headers,
      params: {
        path: {
          ...pathParams,
          "user-id": userId,
        },
      },
      body: {
        type: "password",
        value: password,
      },
    }
  );

  return await handleResponse<string>(response, userId);
};

export const keycloakClient = {
  getUserId,
  findUser,
  findAllUsers,
  createUser,
  setPassword,
};
