import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 读取环境变量中设置的默认基地址
  timeout: 3000 // 设置请求超时时间
})
// 添加请求拦截器
instance.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // 请求之前携带 token
  config.headers.Authorization = `Bearer ${store.getters.token}`
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  //  * 数据脱壳
  return response.data
}, function(error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
