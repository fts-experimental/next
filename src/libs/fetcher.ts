import { FetchError, FetchResult } from "@/types/openapi/fetch";
import { ok, err } from "neverthrow";

type FetchArgs = Parameters<typeof fetch>;

export async function fetcher<TResponse>(
  url: FetchArgs[0],
  args?: FetchArgs[1]
): Promise<FetchResult<TResponse>> {
  try {
    const response = await fetch(url, args);

    if (!response.ok) {
      return err(new FetchError(response.status, response.statusText));
    }

    const data: TResponse = await response.json();
    return ok(data);
  } catch (error) {
    return err(
      new FetchError(
        500,
        "Internal Server Error",
        error instanceof Error ? error.message : "Unknown error"
      )
    );
  }
}
