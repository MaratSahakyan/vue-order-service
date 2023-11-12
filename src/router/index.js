import { refreshAccessToken } from "src/providers/authProvider";
import { getItemFromSessionStorage } from "src/utils/storageTools";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = getItemFromSessionStorage("accessToken");

  if (accessToken) {
    if (["/signin", "/signup", "/"].includes(to.path)) {
      next("/customers");
    } else {
      next();
    }
  } else {
    if (to.meta.requiresAuth) {
      next("/signin");
    } else {
      next();
    }
  }
});

export default router;
