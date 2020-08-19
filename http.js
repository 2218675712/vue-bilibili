import axios from "axios";
import router from './src/router'
import {Toast} from "vant";

const http = axios.create({
  baseURL: 'http://112.74.99.5:3000/web/api',
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  if (localStorage.getItem('token') && localStorage.getItem('id')) {
    config.headers.authorization = 'Bearer ' + localStorage.getItem('token')
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  if (error.response.status === 401 || error.response.status === 402) {
    Toast.fail(error.response.data.message)
    router.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default http
