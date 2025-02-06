import { FetchError, hundleResponse, SuccessType } from "@/libs/result";
import { err, ResultAsync } from "neverthrow";

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
): Promise<ResultAsync<SuccessType<TResponse>, FetchError>> {
  try {
    const response = await fetch(url, args);

    return await hundleResponse<TResponse>(response);
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
