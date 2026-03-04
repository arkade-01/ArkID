import axios from "axios";
import { getAuthToken } from "../services/config";
import { toast } from "sonner";

const apis = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//before request is sent
apis.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

//after request
apis.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Unauthorized access, Trying logging in");

      // redirect to login
      //delay so notification casn show first
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);

      console.error("API call failed:", error);
    }
    return Promise.reject(error);
  },
);

//no auth needed request instance
export const noAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default apis;
