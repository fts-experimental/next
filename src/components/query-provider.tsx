"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

/**
 * @description Next.js 15用のQueryProviderを作成する。
 * @see https://www.youtube.com/watch?v=b_UQ1bdQddw
 */
export default function QueryProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
