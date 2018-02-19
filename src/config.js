import axios from 'axios'
import { Toast } from 'antd-mobile'

// 拦截请求
axios.interceptors.request.use(function (config) {
  Toast.loading('加载中', 0)
  return config
}, function (error) {
  return Promise.reject(error)
})

// 拦截响应
axios.interceptors.response.use(function (response) {
  setTimeout(() => {
    Toast.hide()
  }, 2000)
  return response
}, function (error) {
  return Promise.reject(error)
})
