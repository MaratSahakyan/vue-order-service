import { useRouter as vueRouter } from "vue-router";

const useRouter = () => {
  const router = vueRouter();
  const currentPath = router.currentRoute.value.path;
  const queryParameters = router.currentRoute.value.query;

  const push = (path, query = {}) => {
    router.push({ path, query });
  };

  return {
    router,
    path: currentPath,
    query: queryParameters,
    push,
  };
};

export default useRouter;
