export type User = { cpf: string; password: string };

export enum UserType {
  Admin = "Admin",
  Manager = "Manager",
  User = "User",
}

export type RegisterUser = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  cpf?: string;
  password: string;
  type?: UserType;
};
