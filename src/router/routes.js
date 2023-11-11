const routes = [
  {
    path: "/",
    meta: { requiresAuth: false },
    component: () => import("layouts/MainLayout1.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/signin",
    meta: { requiresAuth: false },
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/SignInPage.vue") }],
  },
  {
    path: "/signup",
    meta: { requiresAuth: false },
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/SignUpPage.vue") }],
  },
  {
    path: "/customers",
    meta: { requiresAuth: true },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CustomersPage.vue") },
    ],
  },
  {
    path: "/orders",
    meta: { requiresAuth: true },
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/OrdersPage.vue") }],
  },
  {
    path: "/dashboard",
    meta: { requiresAuth: true },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/DashBoardPage.vue") },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    meta: { requiresAuth: false },
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
