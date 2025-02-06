import { err, ok, Result } from "neverthrow";

export class FetchError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    message?: string
  ) {
    super(message ?? `HTTP error! status: ${status} ${statusText}`);
  }
}

export type SuccessType<TResponse> = TResponse;

/**
 * @description レスポンスを処理するユーティリティ関数。
 * リクエスト成功時に空値が返される場合のレスポンスを指定することができる。
 * @param response レスポンス
 * @param result リクエスト成功時に空値が返される場合のレスポンスを指定
 * @returns レスポンスの結果
 */
export const hundleResponse = async <TResponse>(
  response: Response,
  result?: TResponse
): Promise<Result<SuccessType<TResponse>, FetchError>> => {
  if (!response.ok) {
    return err(new FetchError(response.status, response.statusText));
  }

  if (result) {
    return ok(result);
  }

  const data: TResponse = await response.json();
  return ok(data);
};
