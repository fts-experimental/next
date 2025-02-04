/// <reference types="vitest" />
import { defineConfig, loadEnv, mergeConfig } from "vite";
import { defineWorkspace } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

const sharedConfig = defineConfig({
  test: {
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  plugins: [
    // pathsの解決
    tsconfigPaths(),
  ],
});

const browserConfig = defineConfig({
  test: {
    name: "browser",
    environment: "jsdom",
    exclude: ["**/*.node.{spec,test}.{ts,tsx}", "node_modules"],
  },
  plugins: [
    // reactのサポート
    react(),
  ],
});

const nodeConfig = defineConfig({
  test: {
    name: "node",
    environment: "node",
    exclude: ["**/*.browser.{spec,test}.{ts,tsx}", "node_modules"],
  },
});

export default defineWorkspace([
  mergeConfig(sharedConfig, browserConfig),
  mergeConfig(sharedConfig, nodeConfig),
]);
