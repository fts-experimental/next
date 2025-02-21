import { db as database } from "@/libs/db";

const findUser = async (email: string) => {
  const user = await database.user.findUnique({
    where: { email },
  });

  return user;
};

export const db = {
  findUser,
};
