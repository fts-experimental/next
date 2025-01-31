# セットアップ

既存の Next.js プロジェクトに Hono を導入する場合は、以下のコマンドを実行します。

```bash
yarn add hono
```

# ファイル構成

以下のファイル構成を推奨します。

### API

- [app/api/[[...route]]/route.ts](../app/api/[[...route]]/route.ts)
- [app/features/hello/api/route.ts](../app/features/hello/api/route.ts)

### ヘルパー

- [libs/fetcher.ts](../libs/fetcher.ts)
- [libs/rpc.ts](../libs/rpc.ts)

# 使い方

[route.spec.ts](../app/features/hello/api/route.spec.ts) を参照してください。

# 参考

https://hono.dev/docs/getting-started/vercel
https://qiita.com/curry__30/items/b895d092555a2318c7c6
