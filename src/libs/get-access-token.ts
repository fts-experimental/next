import { env } from "@/config/env";
import { fetcher } from "@/libs/fetcher";

const getAccessToken = async () => {
  const url = `${env.KEYCLOAK_BASE_URL}/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect/token`;

  const result = await fetcher<{ access_token: string }>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
    }),
  });

  if (result.isErr()) return null;

  const accessToken = result.value.access_token;

  return accessToken;
};

export { getAccessToken };
