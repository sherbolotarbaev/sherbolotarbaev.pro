import axios from "axios";
import { getCookie } from "cookies-next";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000, // 30 seconds
  });

  instance.interceptors.request.use(async (config) => {
    const token = getCookie("token");

    if (token) {
      config.headers.Authorization = `Bearer ${encodeURIComponent(token)}`;
    }

    return config;
  });

  return instance;
};

export default createAxiosInstance();
