export type SendEmailOptions = {
  type: "register";
  to: string;
  subject: string;
  text: string;
};

export type EmailCredentials = {
  user: string;
  pass: string;
};
