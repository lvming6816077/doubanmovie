
import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router/router.js'
import { createStore } from './store/store.js'

export function createApp() {
  // 如果使用服务端渲染需要将createApp替换为createSSRApp方法
  const app = createSSRApp(App)
  // 路由
  const router = createRouter()
  // store
  const store = createStore()
  app.use(router)
  app.use(store)
  // 将根实例以及路由暴露给调用者
  return { app, router, store } 
}