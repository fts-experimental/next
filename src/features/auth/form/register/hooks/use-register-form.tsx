import { useForm, standardSchemaValidator } from "@tanstack/react-form";
import { useReCaptcha } from "next-recaptcha-v3";
import { RegisterForm } from "@/features/auth/form/register/types";
import { client } from "@/libs/rpc";
import { fetcher } from "@/libs/fetcher";
import { InferResponseType } from "hono";

const defaultValues = {
  email: "",
  recaptchaToken: "",
};

export const useRegisterForm = () => {
  const { executeRecaptcha } = useReCaptcha();

  type BaseResType = InferResponseType<typeof client.api.auth.register.$post>;
  const url = "/api/auth/register";

  return useForm({
    defaultValues,
    validatorAdapter: standardSchemaValidator(),
    onSubmit: async ({ value }) => {
      const recaptchaToken = await executeRecaptcha("register_form_submit");
      const inputs: RegisterForm = {
        ...value,
        recaptchaToken,
      };
      await fetcher<BaseResType>(url, {
        method: "POST",
        body: new URLSearchParams(inputs),
      });
    },
  });
};
