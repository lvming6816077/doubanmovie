

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from "path";



export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port:3001,
    proxy: {
      // 使用 proxy 实例
      '^/api': {
        target: 'https://frodo.douban.com',
        changeOrigin: true,
        headers:{
          referer:'https://servicewechat.com/wx2f9b06c1de1ccfca/84/page-frame.html',
          'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.16(0x18001042) NetType/WIFI Language/zh_CN'
        },
        bypass: function(req, res, proxyOptions) {

        }
      }
    }
  }
})