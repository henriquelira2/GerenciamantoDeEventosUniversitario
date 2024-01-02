export type User = { cpf: string; password: string };

export enum UserType {
  Admin = "Admin",
  Manager = "Manager",
  User = "User",
}

export type RegisterUser = {
  cpf?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  resetToken: string;
  type?: UserType;
};
export type NewPassword = { password: string };
