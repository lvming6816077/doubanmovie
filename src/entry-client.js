import { createApp } from './main'

const { app, router,store } = createApp()
// 针对有懒加载路由组件的情况，需等待路由解析完
router.isReady().then(() => {
  app.mount('#app')
})
if(window.__INIT_STATE__) {
  // 当使⽤ template 时， context.state 将作为 window.__INIT_STATE__ 状态⾃动嵌⼊到最终的 HTML
  // 在客户端挂载到应⽤程序之前， store 就应该获取到状态：

  store.replaceState(window.__INIT_STATE__._state.data)
}