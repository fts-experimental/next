import { env } from "@/config/env";
import { client } from "@/libs/openapi";
import { paths } from "@/types/openapi/keycloak";

const keycloakClient = () => {
  return client<paths>({ baseUrl: env.KEYCLOAK_BASE_URL });
};

export { keycloakClient };
