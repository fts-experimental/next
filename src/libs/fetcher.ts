import { Result, ok, err } from "neverthrow";

type FetchArgs = Parameters<typeof fetch>;

export class FetchError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    message?: string
  ) {
    super(message ?? `HTTP error! status: ${status} ${statusText}`);
  }
}

export async function fetcher<TResponse>(
  url: FetchArgs[0],
  args?: FetchArgs[1]
): Promise<Result<TResponse, FetchError>> {
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
