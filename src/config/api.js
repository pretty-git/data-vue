import axios from 'axios';

// 创建实例
const instance = axios.create({
  baseURL: 'http://api.example.com', // 设置接口的基础路径
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 可以在这里添加一些公共的请求头等
    config.Authorization = this.$store.state.Authorization
    config.Timestamp = new Date().getTime()
    config.Token = this.$store.state.token
    return config;
  },
  error => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if(response.code == 200) {
        return response.data;

    }
    this.$message.error(response.message)
    // 对响应数据做些什么
  },
  error => {
    // 处理响应错误
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
