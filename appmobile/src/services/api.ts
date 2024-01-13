import axios from "axios";

export const api = axios.create({
  baseURL: "https://back-users-eventmanager.onrender.com",
});
