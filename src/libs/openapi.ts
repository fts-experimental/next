import createClient from "openapi-fetch";

type ClientOptions = {
  baseUrl: string;
};

const client = <T extends {}>({ baseUrl }: ClientOptions) => {
  return createClient<T>({ baseUrl });
};

export { client };
