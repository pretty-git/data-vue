import axios from 'axios';
import {Message} from 'element-ui';
import md5 from 'md5'
import {getCookieValue} from './env'
// 创建实例
// 获取指定名称的 cookie 值


const instance = axios.create({
  // baseURL: 'http://192.168.161.129', // 设置接口的基础路径
  baseURL: 'http://www.sinupaas.com', // 设置接口的基础路径

  timeout: 5000, // 请求超时时间
});
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.withCredentials = true;

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 可以在这里添加一些公共的请求头等
    config.headers.Timestamp = Math.floor(Date.now() / 1000)
    const Authorization = md5(`${getCookieValue('SET_TOKEN')}${Math.floor(Date.now() / 1000)}!@#$1234`)
    config.headers.Authorization = Authorization
    config.headers.Token = getCookieValue('SET_TOKEN')

    return config;
  },
  error => {
    console.log(error,'请求前')
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    console.log(response,'详情')

    if(response.data.code == 200) {
         return response.data

    }
    Message.error(response.data.message)

    // 对响应数据做些什么
  },
  error => {
    // 处理响应错误
    console.log(error,'错误')
    Message.error(error.message)
    return Promise.reject(error);

  }
);

// 发送 GET 请求
export function get(url, params) {
  return instance.get(url, { params });
}

// 发送 POST 请求
export function post(url, data) {
  return instance.post(url, data);
}
