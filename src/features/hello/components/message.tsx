"use client";

import { useHello } from "@/features/hello/hooks/use-hello";

export const Message = () => {
  const { data } = useHello();

  if (!data?.isOk()) return null;

  return data.value.message;
};
