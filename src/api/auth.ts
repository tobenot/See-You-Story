import axios from './axios';

interface LoginResponse {
  message: string;
  username: string;
  id: number;
  token: string;
}

interface RegisterResponse {
  message: string;
}

/**
 * 登录接口
 * @param {object} data - 登录信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise<LoginResponse>} - 返回Promise对象
 */
export const login = (data: { username: string; password: string }) => {
  return axios.post<LoginResponse>('/auth/login', data);
};

/**
 * 注册接口
 * @param {object} data - 注册信息
 * @param {string} data.username - 用户名(3-20个字符,只能包含字母、数字和下划线)
 * @param {string} data.password - 密码(6-20个字符,必须包含字母和数字)
 * @returns {Promise<RegisterResponse>} - 返回Promise对象
 */
export const register = (data: { username: string; password: string }) => {
  return axios.post<RegisterResponse>('/auth/register', data);
};

/**
 * 退出登录接口
 * @returns {Promise} - 返回Promise对象
 */
export const logout = () => {
  return axios.post('/auth/logout');
};

/**
 * 获取当前用户信息接口
 * @returns {Promise} - 返回Promise对象
 */
export const getCurrentUser = () => {
  return axios.get('/auth/current-user');
};

/**
 * 重置密码接口
 * @param {object} data - 重置密码信息
 * @param {string} data.email - 邮箱
 * @returns {Promise} - 返回Promise对象
 */
export const resetPassword = (data: { email: string }) => {
  return axios.post('/auth/reset-password', data);
}; 