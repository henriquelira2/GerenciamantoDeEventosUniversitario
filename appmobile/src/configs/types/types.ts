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
export type RegisterUserAdmin = {
  cpf?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  resetToken: string;
  type: UserType;
};

export type Event = {
  [x: string]: any;
  id: any;
  nameEvent?: string;
  descriptionEvent: string;
  dateEventStart: string;
  dateEventEnd: string;
  hourEventStart: string;
  hourEventEnd: string;
  priceEvent: string;
  organizerEvent: string;
  qtdVacanciesEvent: string;
  durationEvent: string;
  imageEvent: string;
  typeEvent: string;
  locationEvent: string;
};
