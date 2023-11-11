import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { auth } from "src/providers/authProvider";

export default route(function async(/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!auth.user) {
        next("/signin");
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return Router;
});

// import { ref } from 'vue';
// import { createRouter } from 'vue-router';
// import routes from './routes';
// import { auth } from 'src/providers/authProvider';

// const Router = createRouter({
//   scrollBehavior: () => ({ left: 0, top: 0 }),
//   routes,
//   history: createWebHistory(process.env.VUE_ROUTER_BASE),
// });

// // Function to update the router based on auth status
// function updateRouter() {
//   const hasAuth = auth.user !== null;

//   Router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//       if (!hasAuth) {
//         next("/signin");
//       } else {
//         next();
//       }
//     } else {
//       next();
//     }
//   });
// }

// updateRouter(); // Initial setup

// // Watch for changes in auth.user and update router accordingly
// watch(() => auth.user, () => {
//   updateRouter();
// });

// export default Router;
