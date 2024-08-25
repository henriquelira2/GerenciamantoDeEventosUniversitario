import axios from "axios";

export const api = axios.create({
  // baseURL: "https://back-users-eventmanager.onrender.com",
  baseURL: "http://192.168.1.17:8080",
});
