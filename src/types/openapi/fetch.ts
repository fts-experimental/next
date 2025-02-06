import { Result } from "neverthrow";

export class FetchError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    message?: string
  ) {
    super(message ?? `HTTP error! status: ${status} ${statusText}`);
  }
}

export type FetchResult<TResponse> = Result<TResponse, FetchError>;
