import axios from "axios";

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  Expired: 0,
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export default instance;
