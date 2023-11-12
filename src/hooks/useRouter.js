import { useRouter as vueRouter } from "vue-router";

const useRouter = () => {
  const router = vueRouter();
  const currentPath = router.currentRoute.value.path;
  const params = router.currentRoute.value.params;
  const queryParameters = router.currentRoute.value.query;

  const push = (path, query = {}) => {
    router.push({ path, query });
  };

  return {
    router,
    path: currentPath,
    params,
    query: queryParameters,
    push,
  };
};

export default useRouter;
