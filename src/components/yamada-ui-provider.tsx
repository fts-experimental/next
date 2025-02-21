import { UIProvider } from "@yamada-ui/react";

export function YamadaUIProvider({ children }: { children: React.ReactNode }) {
  return <UIProvider>{children}</UIProvider>;
}
