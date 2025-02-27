import nodemailer from "nodemailer";
import { EmailCredentials, SendEmailOptions } from "@/libs/email/types";
import { env } from "@/config/env";

/**
 * メールを送信する関数
 * @param {SendEmailOptions} options - メール送信オプション
 * @returns {Promise<boolean>} メール送信の成功状態
 */
export const sendEmail = async (
  options: SendEmailOptions
): Promise<boolean> => {
  let credentials = {} as EmailCredentials;

  if (options.type === "register") {
    credentials = {
      user: env.EMAIL_USER_FOR_REGISTER,
      pass: env.EMAIL_PASSWORD_FOR_REGISTER,
    };
  }

  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: credentials,
  });

  const data = {
    from: credentials.user,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  try {
    await transporter.sendMail(data);
    return true;
  } catch (error) {
    console.error("メールの送信に失敗しました:", error);
    return false;
  }
};
