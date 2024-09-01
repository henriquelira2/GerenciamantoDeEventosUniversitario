/* eslint-disable prettier/prettier */
import { api } from "../../services/api";
import { Event } from "../types";

export const CreateEvent = async (data: Event): Promise<void> => {
  console.log("Sending Data to API:", data);
  const response = await api.post("/events/create", data);
  return response.data;
};
