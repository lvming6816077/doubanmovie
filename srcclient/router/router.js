
import home from '../views/home/home.vue'
import {createRouter,createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
      { path: '/', redirect: '/home' },// 配置默认路由，重定向到/home
      { path: '/home', component: home },
      { path: '/detail', component:() => import('../views/detail/detail.vue') }, // 延迟加载
      { path: '/publish', component:() => import('../views/publish/publish.vue') },// 延迟加载
      { path: '/login', component:() => import('../views/login/login.vue') },// 延迟加载
      { path: '/search', component:() => import('../views/search/search.vue') },// 延迟加载
    ]
})

export default router
