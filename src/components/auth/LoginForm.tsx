import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../../api/auth';

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await authApi.login({
        username: values.username,
        password: values.password
      });
      
      // 保存token和用户信息
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.id,
        username: response.data.username
      }));
      
      message.success(response.data.message || '登录成功！');
      navigate('/');
    } catch (error: any) {
      console.error('登录失败:', error);
      message.error(error.response?.data?.message || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    message.info('忘记密码功能开发中，请稍后再试');
    // 未来可以添加导航到重置密码页面的代码
    // navigate('/reset-password');
  };

  return (
    <Form
      name="login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名!' }]}
        className="mb-4"
      >
        <Input 
          placeholder="请输入用户名" 
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码!' }]}
        className="mb-6"
      >
        <Input.Password
          placeholder="请输入密码"
        />
      </Form.Item>

      <Form.Item className="mb-4">
        <Button 
          type="primary" 
          htmlType="submit" 
          className="w-full" 
          loading={loading}
        >
          登录
        </Button>
      </Form.Item>

      <div className="text-center">
        <button 
          type="button"
          onClick={handleForgotPassword}
          className="text-blue-500 hover:text-blue-700 bg-transparent border-none cursor-pointer"
        >
          忘记密码?
        </button>
      </div>
    </Form>
  );
};

export default LoginForm; 