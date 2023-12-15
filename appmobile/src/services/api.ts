import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.17.40.96:8080",
});
