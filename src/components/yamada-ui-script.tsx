"use client";

import {
  ColorModeScript,
  defaultConfig,
  ThemeSchemeScript,
} from "@yamada-ui/react";

/**
 * Yamada UI用の各種機能を正常に使用するためのコンポーネント。
 * @see https://zenn.dev/108yen/articles/d5b02cf775a0c0#ColorModeScript
 */
export function YamadaUIScript() {
  const { initialThemeScheme, initialColorMode } = defaultConfig;

  return (
    <>
      <ThemeSchemeScript initialThemeScheme={initialThemeScheme} />
      <ColorModeScript initialColorMode={initialColorMode} />
    </>
  );
}
