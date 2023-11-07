const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/signin",
    component: () => import("layouts/AuthLayout.vue"), // Use a different layout for signin
    children: [{ path: "", component: () => import("pages/SignInPage.vue") }],
  },
  {
    path: "/signup",
    component: () => import("layouts/AuthLayout.vue"), // Use a different layout for signin
    children: [{ path: "", component: () => import("pages/SignUpPage.vue") }],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
