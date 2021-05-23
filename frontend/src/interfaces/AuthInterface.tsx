export interface RegisterData {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export type ChangePasswordData = Pick<
  RegisterData,
  "password" | "passwordConfirmation"
>;

export type ForgetPasswordData = Pick<LoginData, "email">;
