
// 执行注册store钩子
export const registerModules = (
  components,
  router,
  store
) => {
  return components
    .filter((i) => typeof i.registerModule === "function")
    .forEach((component) => {
      component.registerModule({ router: router.currentRoute, store });
    });
};

// 调用当前匹配到的组件里asyncData钩子，预取数据
export const prefetchData = (
  components,
  router,
  store
) => {
  const asyncDatas = components.filter(
    (i) => typeof i.asyncData === "function"
  );
  return Promise.all(
    asyncDatas.map((i) => {
      return i.asyncData({ router: router.currentRoute.value, store });
    })
  );
};

// ssr自定义钩子
export const getAsyncData = (
  router,
  store,
  isServer
) => {
  return new Promise(async (resolve) => {
    const { matched } = router.currentRoute.value;

    // 当前路由匹配到的组件
    const components = matched.map((i) => {
      return i.components.default;
    });
    // 动态注册store
    registerModules(components, router, store);

    if (isServer) {
      // 预取数据
      await prefetchData(components, router, store);
    }

    resolve();
  });
};
