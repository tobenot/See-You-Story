import axios from './axios';

// 获取当前用户的会员信息
export const getMembershipInfo = () => {
  return axios.get('/user/membership');
};

// 订阅会员计划
export const subscribePlan = (planType: string, period: 'monthly' | 'quarterly') => {
  return axios.post('/user/membership/subscribe', { planType, period });
};

// 使用兑换码
export const redeemCode = (code: string) => {
  return axios.post('/user/redeem', { code });
};

// 取消会员订阅
export const cancelSubscription = () => {
  return axios.post('/user/membership/cancel');
};

// 获取会员计划列表
export const getPlans = () => {
  return axios.get('/user/membership/plans');
};

// 获取交易历史
export const getTransactionHistory = () => {
  return axios.get('/user/membership/history');
}; 