import axios from "axios";
import { API_URL } from "@env";
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use((response) => {
  const { data } = response;
  return response.data;
});

export default api;
