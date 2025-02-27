/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
  // 環境変数を読み込む
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };

  return {
    test: {
      // パスエイリアスの設定を追加
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  };
});
