import { hc } from "hono/client";

import type { AppType } from "@/app/api/[[...route]]/route";
import { env } from "@/config/env";

if (!env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

export const client = hc<AppType>(env.NEXT_PUBLIC_API_URL);
