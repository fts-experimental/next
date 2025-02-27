import { env } from "@/config/env";
import { db } from "@/libs/db-queries";
import { keycloakClient as kc } from "@/libs/keycloak-client";
import { Hono } from "hono";
import { validator } from "hono/validator";
import { RegisterFormSchema } from "@/features/auth/form/register/types";
import { validateToken } from "@/libs/recaptcha";

const sendMail = async (email: string, message: string) => {
  console.log("sendMail:", email, message);
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
    const result = RegisterFormSchema.safeParse(value);

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
    // バリデーションを通過したデータを取得
    const { email, recaptchaToken } = c.req.valid("form");

    // reCAPTCHAトークンを検証
    const recaptchaResult = await validateToken(recaptchaToken);
    // const recaptchaResult = true;

    if (!recaptchaResult) {
      return c.json(
        {
          success: false,
          message: "reCAPTCHA validation failed",
        },
        400
      );
    }

    // DBにユーザーが存在するか確認
    const dbUser = await db.findUser(email);
    // IdPにユーザーが存在するか確認
    const idpUser = await kc.findUser(email);

    if (dbUser && idpUser.isOk()) {
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
      const message =
        "お使いのメールアドレスを使用したユーザー登録の試行がありました";
      await sendMail(email, message);

      return c.json({
        success: true,
        message:
          "[既存ユーザー] 入力されたメールアドレスに確認メールを送信しました。\nメールの指示に従って登録を完了してください。",
      });
    }
    /**
     * ユーザーが存在しない場合
     * ユーザーのメールアドレスに、確認メールを送信する。
     * 例：
     * ご登録いただきありがとうございます。
     * 以下のボタンをクリックしてメールアドレスを認証し、登録手続きを完了してください。
     */

    // IdPにユーザーを作成する
    await kc.createUser({
      email,
      enabled: true,
    });

    // DBにユーザーとトークンを紐づけて保存する
    const newDbUser = await db.createUser(email);

    // トークン付きURLを生成する
    const token = newDbUser.verificationToken?.token;
    const url = `${env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;
    console.log(url);

    const message = "ご登録いただきありがとうございます。";
    await sendMail(email, message);

    return c.json({
      success: true,
      message:
        "[新規作成] 入力されたメールアドレスに確認メールを送信しました。\nメールの指示に従って登録を完了してください。",
    });
  }
);

export default app;
