export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  console.log(token);

  return <div>{token}</div>;
}
