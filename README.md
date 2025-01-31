# ポートマッピング

| コンテナ名    | ポート |
| ------------- | ------ |
| exp-next-db   | 20002  |
| exp-next-app  | 10002  |
| Prisma Studio | 10003  |

# セットアップ

### コンテナを起動

```bash
make up
```

### フロントエンドにアクセス

http://localhost:10002

### Prisma Studio にアクセス

http://localhost:10003

# ドキュメント

- [fetcher ヘルパー関数](src/docs/fetcher.md)
- [Hono](src/docs/hono.md)
- [テスト](src/docs/test.md)
