import axios from "axios";
import useRouter from "../hooks/useRouter";
import { getItemFromSessionStorage } from "src/utils/storageTools";
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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // const { push } = useRouter();
      const refreshToken = getItemFromSessionStorage("refreshToken");
      if (refreshToken) {
        try {
          const { accessToken } = await refreshAccessToken(refreshToken);
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          // push("/login");
          throw refreshError;
        }
      } else {
        // push("/login");
        throw new Error("Refresh token not found");
      }
    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axiosInstance;
});

export { axiosInstance };
