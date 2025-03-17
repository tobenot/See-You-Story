import { message } from 'antd';
import axios from 'axios';

// 根据环境设置baseURL
const baseURL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:35588/api/v1'
  : 'https://oma.tobenot.top:35588/api/v1';

// 创建axios实例
const instance = axios.create({
  baseURL,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器，添加token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器，处理错误
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 处理401未授权错误
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/#/auth';
      }
      
      // 处理429错误（请求频率超限或账号锁定）
      if (error.response.status === 429) {
        message.error(error.response.data.message || '请求频率超限或账号锁定');
      }
    }
    return Promise.reject(error);
  }
);

export default instance; 