import axios from "axios";
import useRouter from "src/hooks/useRouter";
import {
  getItemFromSessionStorage,
  setItemToLocalStorage,
  setItemToSessionStorage,
} from "src/utils/storageTools";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
  headers: {
    Authorization: getItemFromSessionStorage("accessToken")
      ? `Bearer ${getItemFromSessionStorage("accessToken")}`
      : "",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  responseType: "json",
  withCredentials: true,
});

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken,
    });
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;
    setItemToSessionStorage("accessToken", newAccessToken);
    setItemToLocalStorage("refreshToken", newRefreshToken);
    return newAccessToken;
  } catch (error) {
    push("/login");
    throw error;
  }
};

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
      const { push } = useRouter();
      const refreshToken = getItemFromSessionStorage("refreshToken");
      if (refreshToken) {
        try {
          const { accessToken } = await refreshAccessToken(refreshToken);

          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          // Handle the refresh token error (e.g., logout the user)
          throw refreshError;
        }
      } else {
        push("/login");
        throw new Error("Refresh token not found");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
