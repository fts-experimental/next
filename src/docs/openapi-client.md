# OpenAPI クライアント

## ライブラリ

- [openapi-typescript](https://www.npmjs.com/package/openapi-typescript)
- [openapi-fetch](https://www.npmjs.com/package/openapi-fetch)

## Keycloak の OpenAPI ドキュメントから型定義ファイルを取得する

```bash
yarn openapi-typescript https://www.keycloak.org/docs-api/latest/rest-api/openapi.json -o ./types/openapi/keycloak.d.ts
```
