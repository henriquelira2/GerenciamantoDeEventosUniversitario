import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../../services/api";
import { RegisterUser, User, Event } from "../types";

export const CreateUser = async (data: RegisterUser): Promise<void> => {
  const response = await api.post("/users/create", data);
  return response.data;
};

export const GetUser = async ({ cpf }: { cpf: string }): Promise<void> => {
  const response = await api.get(`/users/${cpf}`);
  return response.data;
};

export const LoginUser = async (data: User): Promise<void> => {
  const response = await api.post("users/login", data);

  if (response.status !== 401) {
    await AsyncStorage.setItem("accessToken", response.data.token);
    await AsyncStorage.setItem("userCPF", data.cpf);
    return response.data;
  }
};

export const UpdateUser = async (data: RegisterUser): Promise<void> => {
  const cpf = await AsyncStorage.getItem("userCPF");
  const response = await api.put(`/users/update2/${cpf}`, data);
  return response.data;
};

export const CreateEvent = async (data: Event): Promise<void> => {
  console.log("Sending Data to API:", data);
  const response = await api.post("/events/create", data);
  return response.data;
};
