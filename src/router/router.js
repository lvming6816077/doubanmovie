
import home from '../views/home/home.vue'
// import detail from '../views/detail/detail.vue'
import {createRouter,createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
      { path: '/', redirect: '/home' },// 配置默认路由，重定向到/home
      { path: '/home', component: home },
      { path: '/detail', component:() => import('../views/detail/detail.vue') },
      { path: '/publish', component:() => import('../views/publish/publish.vue') },
      { path: '/login', component:() => import('../views/login/login.vue') },
      { path: '/search', component:() => import('../views/search/search.vue') },
    ]
})

export default router
