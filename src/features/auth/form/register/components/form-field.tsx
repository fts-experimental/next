import {
  FormControl,
  Input,
  Label,
  ErrorMessage,
  Textarea,
} from "@yamada-ui/react";
import type { RegisterFormFieldProps } from "@/features/auth/form/register/types";

export const FormField = ({
  field,
  label,
  type = "text",
  autoComplete,
}: RegisterFormFieldProps) => {
  const InputComponent = type === "textarea" ? Textarea : Input;
  const textareaProps =
    type === "textarea" ? { autosize: true, minRows: 3 } : {};

  return (
    <FormControl
      className="w-full"
      isInvalid={field.state.meta.errors.length > 0}
    >
      <Label htmlFor={field.name}>{label}</Label>
      <InputComponent
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        type={type === "textarea" ? undefined : type}
        autoComplete={autoComplete}
        {...textareaProps}
      />
      <ErrorMessage>{field.state.meta.errors.join(", ")}</ErrorMessage>
    </FormControl>
  );
};
