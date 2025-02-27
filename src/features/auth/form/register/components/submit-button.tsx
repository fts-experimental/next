import { Button } from "@yamada-ui/react";

type SubmitButtonProps = {
  canSubmit: boolean;
  isSubmitting: boolean;
};

export const SubmitButton = ({
  canSubmit,
  isSubmitting,
}: SubmitButtonProps) => (
  <Button
    variant="solid"
    size={{ base: "xl", sm: "md" }}
    isLoading={isSubmitting}
    loadingText="送信中です..."
    shadow="md"
    type="submit"
    disabled={!canSubmit}
  >
    登録する
  </Button>
);
