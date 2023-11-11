import { axiosInstance } from "src/boot/axios";
import {
  setItemToSessionStorage,
  setItemToLocalStorage,
  removeItemFromLocalStorage,
  removeItemFromSessionStorage,
} from "src/utils/storageTools";
import { reactive } from "vue";

const auth = reactive({
  user: null,
});

const updateUserTokens = (data) => {
  const { accessToken, refreshToken } = data;
  setItemToSessionStorage("accessToken", accessToken);
  setItemToLocalStorage("refreshToken", refreshToken);
};

const getUserData = async () => {
  try {
    const response = await axiosInstance.get(`/auth/my-data`);
    console.log("response.data", response.data);
    auth.user = response.data;
    return response.data;
    console.log("🚀 ~ file: authProvider.js:25 ~ getUserData ~ auth:", auth);
  } catch (error) {
    throw error;
  }
};

const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });

    updateUserTokens(response.data);
    getUserData();
  } catch (error) {
    throw error;
  }
};

const createUser = async (username, password) => {
  try {
    const response = await axiosInstance.post("/users/create", {
      username,
      password,
    });

    updateUserTokens(response.data);
    getUserData();
  } catch (error) {
    throw error;
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken,
    });
    updateUserTokens(response.data);
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  auth.user = null;
  removeItemFromLocalStorage("refreshToken");
  removeItemFromSessionStorage("accessToken");
};

export { auth, login, createUser, logout, refreshAccessToken, getUserData };
