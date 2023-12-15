import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../../services/api";
import { RegisterUser, User } from "../types";

export const CreateUser = async (data: RegisterUser): Promise<void> => {
  const response = await api.post("/users/save", data);
  return response.data;
};

export const GetUser = async ({ cpf }: { cpf: string }): Promise<void> => {
  const response = await api.get(`/users/${cpf}`);
  return response.data;
};

export const LoginUser = async (data: User): Promise<void> => {
  const response = await api.get(`/login/${data.cpf}/${data.password}`);
  if (response.status !== 401) {
    const token = "300";
    await AsyncStorage.setItem("accessToken", token);
    await AsyncStorage.setItem("userCPF", data.cpf);
    return response.data;
  }
};

export const UpdateUser = async (data: RegisterUser): Promise<void> => {
  const cpf = await AsyncStorage.getItem("userCPF");
  const response = await api.put(`/users/update/${cpf}`, data);
  return response.data;
};
