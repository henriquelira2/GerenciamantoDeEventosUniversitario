import axios from "axios";

export const api = axios.create({
  //baseURL: "https://back-users-eventmanager.onrender.com",
  //baseURL: "https://pro-purely-woodcock.ngrok-free.app",
  baseURL: "https://back-users-eventmanager-production.up.railway.app",
});
