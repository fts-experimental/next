/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // 環境変数を読み込む
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };

  return {};
});
