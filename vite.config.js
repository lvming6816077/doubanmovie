

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from "path";

export default defineConfig({
  base: './', // 项目根路径
  plugins: [vue()],// 配置vue插件
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port:3001,
    proxy: {
      // 使用 proxy 实例
      // 模拟请求豆瓣电影后台真实数据
      '^/api': {
        target: 'https://frodo.douban.com',
        changeOrigin: true,
        // 模拟referer和ua
        headers:{
          'referer':'https://servicewechat.com/wx2f9b06c1de1ccfca/84/page-frame.html',
          'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.16(0x18001042) NetType/WIFI Language/zh_CN'
        }
      }
    }
  }
})