import { getCookieValue } from "@/app/lib/utils/cookie";
import axios from "axios";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000, // 30 seconds
    withCredentials: true,
  });

  instance.interceptors.request.use(async (config) => {
    const token = await getCookieValue("token");

    if (token) {
      config.headers.Authorization = `Bearer ${encodeURIComponent(token)}`;
    }

    return config;
  });

  return instance;
};

export default createAxiosInstance();
