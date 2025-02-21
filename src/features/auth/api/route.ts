import { findUser } from "@/libs/db-queries";
import { Hono } from "hono";
import { validator } from "hono/validator";
import { z } from "zod";

const sendMail = async (email: string, message: string) => {
  console.log(email, message);
};

/**
 * @description /api/auth/register
 * @description ユーザー登録API
 * @param email メールアドレス
 * @returns ユーザーの有無にかかわらず同じメッセージをフロントエンドに返す。
 */
const app = new Hono().post(
  "/register",
  validator("form", (value, c) => {
    const schema = z.object({
      email: z.string().email(),
    });

    console.log(value);
    const result = schema.safeParse(value);

    if (!result.success) {
      return c.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.errors,
        },
        400
      );
    }

    return result.data;
  }),
  async (c) => {
    const { email } = c.req.valid("form");

    const user = await findUser(email);

    if (user) {
      /**
       * ユーザーが存在する場合
       * ユーザーのメールアドレスに、メールアドレスが入力されたことを知らせるメールを送信する。
       * 例：
       * お使いのメールアドレスを使用したユーザー登録の試行がありました。
       * この操作がお客様によるものでない場合、セキュリティ上の懸念がある場合がございます。
       *
       * 1. この登録試行がお客様によるものである場合、既存のアカウントにログインしてください。
       * 新規登録は不要です。
       *
       * 2. この登録試行に心当たりがない場合、以下の対応をお願いいたします。
       * - 現在のパスワードを変更してください。
       * - 二段階認証を有効にしてください(まだの場合)。
       *
       * 3. ご不明な点がある場合は、当社サポート窓口に問い合わせください。
       *
       * セキュリティに関する懸念事項は以下のリンクからお問い合わせできます。
       * https://example.com/contact/security
       *
       * お客様のアカウントの安全を保護するため、ご協力をお願いいたします。
       */

      // メールを送信する
      const message = "";
      await sendMail(email, message);

      return c.json({
        success: true,
        message:
          "入力されたメールアドレスに確認メールを送信しました。\nメールの指示に従って登録を完了してください。",
      });
    }
    /**
     * ユーザーが存在しない場合
     * ユーザーのメールアドレスに、確認メールを送信する。
     * 例：
     * ご登録いただきありがとうございます。
     * 以下のボタンをクリックしてメールアドレスを認証し、登録手続きを完了してください。
     */
    const message = "";
    await sendMail(email, message);

    return c.json({
      success: true,
      message:
        "入力されたメールアドレスに確認メールを送信しました。\nメールの指示に従って登録を完了してください。",
    });
  }
);

export default app;
