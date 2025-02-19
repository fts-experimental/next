import db from "@/libs/db";

export const findUser = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });

  return user;
};
