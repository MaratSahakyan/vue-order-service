const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout1.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/signin",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/SignInPage.vue") }],
  },
  {
    path: "/signup",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/SignUpPage.vue") }],
  },
  {
    path: "/customers",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CustomersPage.vue") },
    ],
  },
  {
    path: "/orders",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/OrdersPage.vue") }],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
