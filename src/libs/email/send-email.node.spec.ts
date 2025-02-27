import nodemailer from "nodemailer";
import { sendEmail } from "@/libs/email/send-email";
import { env } from "@/config/env";

vi.mock("nodemailer");
vi.mock("@/config/env", () => ({
  env: {
    EMAIL_HOST: "smtp.example.com",
    EMAIL_USER_FOR_REGISTER: "test@example.com",
    EMAIL_PASSWORD_FOR_REGISTER: "password123",
  },
}));

describe("sendEmail", () => {
  const mockSendMail = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    (nodemailer.createTransport as any).mockReturnValue({
      sendMail: mockSendMail,
    });
  });

  it("登録メールが正常に送信される", async () => {
    mockSendMail.mockResolvedValueOnce(true);

    const options = {
      type: "register" as const,
      to: "user@example.com",
      subject: "テストメール",
      text: "<p>テストメール本文</p>",
    };

    const result = await sendEmail(options);

    expect(result).toBe(true);
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: env.EMAIL_USER_FOR_REGISTER,
        pass: env.EMAIL_PASSWORD_FOR_REGISTER,
      },
    });

    expect(mockSendMail).toHaveBeenCalledWith({
      from: env.EMAIL_USER_FOR_REGISTER,
      to: options.to,
      subject: options.subject,
      html: options.text,
    });
  });

  it("メール送信が失敗した場合", async () => {
    mockSendMail.mockRejectedValueOnce(new Error("送信エラー"));
    const consoleSpy = vi.spyOn(console, "error");

    const options = {
      type: "register" as const,
      to: "user@example.com",
      subject: "テストメール",
      text: "<p>テストメール本文</p>",
    };

    const result = await sendEmail(options);

    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      "メールの送信に失敗しました:",
      expect.any(Error)
    );
  });
});
