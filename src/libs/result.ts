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
 * APIから空値が返される場合のレスポンスを指定することができる。
 * @param response ハンドリングしたいレスポンス
 * @param result 呼び出し元に返したいレスポンス。
 * APIから受け取るレスポンスボディが空値の場合は任意の値を指定する。
 * @returns レスポンスの結果
 */
export const handleResponse = async <TResponse>(
  response: Response,
  result: TResponse
): Promise<Result<SuccessType<TResponse>, FetchError>> => {
  if (!response.ok) {
    return err(new FetchError(response.status, response.statusText));
  }

  return ok(result);
};
