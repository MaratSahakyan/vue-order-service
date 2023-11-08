import {
  removeItemFromLocalStorage,
  removeItemFromSessionStorage,
} from "src/utils/storageTools";
import { reactive } from "vue";
import axiosInstance from "./axiosInstanse";

const auth = reactive({
  user: null,
  isAuthenticated: false,
});

const updateUserTokens = (data) => {
  const { accessToken, refreshToken } = data;
  axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  setItemToSessionStorage("accessToken", accessToken);
  setItemToLocalStorage("refreshToken", refreshToken);
};

const getUserData = async () => {
  try {
    const response = await axiosInstance.get(`/users/my-data`);
    auth.user = response.data.user;
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
    // getUserData();
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
    // getUserData();
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  auth.user = null;
  removeItemFromLocalStorage("refreshToken");
  removeItemFromSessionStorage("accessToken");
};

export { auth, login, createUser, logout, getUserData };
