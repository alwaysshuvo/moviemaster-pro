import axios from "axios";

const BASE =
  import.meta.env.VITE_API_BASE ||
  "https://moviemaster-pro-server-hazel.vercel.app";

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
});

export default api;
