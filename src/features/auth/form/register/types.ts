import { FieldApi, standardSchemaValidator } from "@tanstack/react-form";
import { z } from "zod";

export const RegisterFormSchema = z.object({
  email: z.string().email(),
  recaptchaToken: z.string(),
});

export type RegisterForm = z.infer<typeof RegisterFormSchema>;

type RegisterFormFieldApi = FieldApi<
  RegisterForm,
  keyof RegisterForm,
  undefined,
  ReturnType<typeof standardSchemaValidator>,
  string
>;

export type RegisterFormFieldProps = {
  field: RegisterFormFieldApi;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  autoComplete?: string;
};
