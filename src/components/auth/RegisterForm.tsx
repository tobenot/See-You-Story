import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../../api/auth';

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  message?: string;
}

interface LoginResponse {
  token: string;
  id: number;
  username: string;
  message?: string;
}

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      // 1. 先注册
      const registerResponse = await authApi.register({
        username: values.username,
        password: values.password
      });
      
      const registerData = registerResponse.data as RegisterResponse;
      message.success(registerData.message || '注册成功！');
      
      // 2. 注册成功后直接登录
      const loginResponse = await authApi.login({
        username: values.username,
        password: values.password
      });
      
      const loginData = loginResponse.data as LoginResponse;
      
      // 3. 保存登录信息
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('user', JSON.stringify({
        id: loginData.id,
        username: loginData.username
      }));
      
      // 4. 跳转到首页
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        message.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || '操作失败，请稍后重试');
      } else {
        message.error('操作失败，请稍后重试');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="register"
      className="register-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          { required: true, message: '请设置用户名!' },
          { min: 3, max: 20, message: '用户名长度必须在3-20个字符之间!' },
          { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线!' }
        ]}
        className="mb-4"
      >
        <Input 
          placeholder="请设置用户名(3-20个字符)" 
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          { required: true, message: '请设置密码!' },
          { min: 6, max: 20, message: '密码长度必须在6-20个字符之间!' },
          { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: '密码必须包含字母和数字!' }
        ]}
        className="mb-4"
      >
        <Input.Password
          placeholder="请设置密码(6-20个字符，必须包含字母和数字)"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="确认密码"
        dependencies={['password']}
        rules={[
          { required: true, message: '请再次输入密码!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致!'));
            },
          }),
        ]}
        className="mb-6"
      >
        <Input.Password
          placeholder="请再次输入密码"
        />
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="w-full" 
          loading={loading}
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm; 