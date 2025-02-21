import { db as database } from "@/libs/db";
import { randomUUID } from "crypto";

const findUser = async (email: string) => {
  const user = await database.user.findUnique({
    where: { email },
    include: {
      verificationToken: true,
    },
  });

  return user;
};

const createUser = async (email: string) => {
  const token = randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 30); // 30分後に時間切れになる

  const user = await database.user.create({
    data: {
      email,
      verificationToken: { create: { expires, token } },
    },
    include: {
      verificationToken: true,
    },
  });

  return user;
};

export const db = {
  findUser,
  createUser,
};
