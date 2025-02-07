import { FetchError, handleResponse, SuccessType } from "@/libs/result";
import { err, Result } from "neverthrow";

type FetchArgs = Parameters<typeof fetch>;

/**
 * @description fetch関数のラッパー関数
 * @param url リクエスト先のURL
 * @param args fetch関数の引数
 * @returns レスポンスのResult型
 */
export async function fetcher<TResponse>(
  url: FetchArgs[0],
  args?: FetchArgs[1]
): Promise<Result<SuccessType<TResponse>, FetchError>> {
  try {
    const response = await fetch(url, args);
    let data = {} as TResponse;
    if (response.ok) {
      data = await response.json();
    }

    return await handleResponse<TResponse>(response, data);
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
