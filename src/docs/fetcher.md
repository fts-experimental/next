# fetcher ヘルパー関数

## 概要

fetcher ヘルパー関数は、HTTP リクエストを行い、その結果を Result 型で返す関数です。  
内部的には `fetch` 関数をラップしていて、neverthrow ライブラリの Result 型を返します。

## 使い方

[fetcher.spec.ts](../libs/fetcher.spec.ts) を参照してください。

## 参考

https://zenn.dev/praha/articles/863e16e2e1feec
