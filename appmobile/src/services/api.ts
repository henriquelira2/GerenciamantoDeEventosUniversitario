import axios from "axios";

export const api = axios.create({
  //baseURL: "https://back-users-eventmanager.onrender.com",
  baseURL: "http://192.168.75.10:8080",
});
