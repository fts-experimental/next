import { Result, ok, err } from "neverthrow";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetcherOptions extends Omit<RequestInit, "body"> {
  method?: HttpMethod;
  body?: unknown;
}

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
  url: string,
  options: FetcherOptions = {}
): Promise<Result<TResponse, FetchError>> {
  const {
    method = "GET",
    body,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const headers = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const config: RequestInit = {
    method,
    headers,
    ...restOptions,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      return err(new FetchError(response.status, response.statusText));
    }

    const data = await response.json();
    return ok(data as TResponse);
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
