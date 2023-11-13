import {
  getItemFromLocalStorage,
  getItemFromSessionStorage,
} from "src/utils/storageTools";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = getItemFromSessionStorage("accessToken");
  const refreshToken = getItemFromLocalStorage("refreshToken");

  const publicRoutes = ["/", "/signin", "/signup"];

  if (!refreshToken && !publicRoutes.includes(to.path)) {
    next("/");
  } else if (!accessToken && !publicRoutes.includes(to.path)) {
    next("/");
  } else {
    next();
  }
});

export default router;
