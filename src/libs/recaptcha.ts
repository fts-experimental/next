import { env } from "@/config/env";

type ReCaptcha = {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes": string[];
};

/**
 * reCAPTCHAトークンを検証する関数
 * @param {string} recaptchaToken - reCAPTCHAトークン
 * @returns {Promise<boolean>} 検証結果
 */
export const validateToken = async (
  recaptchaToken: string
): Promise<boolean> => {
  const body = new URLSearchParams({
    secret: env.RECAPTCHA_SECRET,
    response: recaptchaToken,
  }).toString();

  const result = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  )
    .then(async (response) => {
      const result = (await response.json()) as ReCaptcha;
      console.log(result);

      return result;
    })
    .catch((error) => {
      console.log(error);
      throw new Error("reCAPTCHAトークンの検証中にエラーが発生");
    });

  if (result.score > 0.5) return true;
  return false;
};
