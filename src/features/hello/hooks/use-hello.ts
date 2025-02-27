import { fetcher } from "@/libs/fetcher";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/libs/rpc";
import type { InferResponseType } from "hono";

export const useHello = () => {
  type ResType = InferResponseType<typeof client.api.hello.$get>;
  const url = "/api/hello";

  return useQuery({
    queryKey: ["hello"],
    queryFn: async () => await fetcher<ResType>(url),
  });
};
