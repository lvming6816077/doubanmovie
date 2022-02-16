import axios from 'axios'


const baseURL = import.meta.env.SSR ? 'http://localhost:8887' : '/'// 此处和webpack的publicPath保持一致
const apiKey = '0ac44ae016490db2204ce0a042db2916'

// 创建axios实例
let service = axios.create({
  baseURL: baseURL,
  withCredentials: true,// 跨域访问带上cookie
  timeout: 30000, // 请求超时时间,
})

// 添加request拦截器
service.interceptors.request.use(config => {
  if (config.params) {
    config.params = {
      apiKey:apiKey,
      ...config.params
    }
  }
  if (config.data) {
    config.data = {
      apiKey:apiKey,
      ...config.data
    }
  }
  return config
}, error => {
  Promise.reject(error)
})
// 添加respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error.response)
  }
)

const get = (url, params = {}) =>{
  return service({
    url: url,
    method: 'get',
    params,
  })
}

// 封装post请求
const post = (url, data = {}) =>{
  // 默认配置
  let sendObject = {
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: data
  }
  return service(sendObject)
}


// 不要忘记export
export default {
  get,
  post,
  baseURL
}