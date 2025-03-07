import { hc } from "hono/client";
import { env } from "@/config/env";

import type { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(env.NEXT_PUBLIC_APP_URL);
