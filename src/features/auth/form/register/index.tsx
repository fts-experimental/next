"use client";

import { FormField } from "@/features/auth/form/register/components/form-field";
import { SubmitButton } from "@/features/auth/form/register/components/submit-button";

import { useRegisterForm } from "@/features/auth/form/register/hooks/use-register-form";
import { RegisterFormSchema } from "@/features/auth/form/register/types";

const fields: Array<{
  name: keyof typeof RegisterFormSchema.shape;
  label: string;
  type: "email" | "text" | "tel" | "textarea";
  autoComplete: string;
}> = [
  {
    name: "email",
    label: "メールアドレス",
    type: "email",
    autoComplete: "email",
  },
];

/**
 * 新規登録フォームを表示するコンポーネント
 * @returns {JSX.Element} 新規登録フォームを含むJSX要素
 */
export const RegisterForm = () => {
  const form = useRegisterForm();

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-4">
          {fields.map((fieldConfig) => (
            <form.Field
              key={fieldConfig.name}
              name={fieldConfig.name}
              validators={{
                onChange: RegisterFormSchema.shape[fieldConfig.name],
              }}
            >
              {(field) => <FormField field={field} {...fieldConfig} />}
            </form.Field>
          ))}

          <div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <SubmitButton
                  canSubmit={canSubmit}
                  isSubmitting={isSubmitting}
                />
              )}
            </form.Subscribe>
          </div>
        </div>
      </form>
    </div>
  );
};
