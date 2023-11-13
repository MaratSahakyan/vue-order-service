import axios from "axios";
import {
  getItemFromLocalStorage,
  getItemFromSessionStorage,
  removeItemFromLocalStorage,
} from "src/utils/storageTools";
import { boot } from "quasar/wrappers";
import { refreshAccessToken } from "src/providers/authProvider";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4004",
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${getItemFromSessionStorage("accessToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  responseType: "json",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getItemFromSessionStorage("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        const refreshToken = getItemFromLocalStorage("refreshToken");

        if (refreshToken) {
          try {
            const { accessToken } = await refreshAccessToken(refreshToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            try {
              const response = await axiosInstance.request(originalRequest);
              isRefreshing = false;
              return response;
            } catch (err) {
              isRefreshing = false;
              throw err;
            }
          } catch (refreshError) {
            isRefreshing = false;
            removeItemFromLocalStorage("refreshToken");
            throw refreshError;
          }
        } else {
          isRefreshing = false;
          throw new Error("Refresh token not found");
        }
      } else {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }
    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axiosInstance;
});

export { axiosInstance };
