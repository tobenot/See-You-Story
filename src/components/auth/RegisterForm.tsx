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

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const response = await authApi.register({
        username: values.username,
        password: values.password
      });
      
      const data = response.data as RegisterResponse;
      message.success(data.message || '注册成功！');
      
      // 注册成功后自动跳转到登录页
      navigate('/auth', { state: { activeTab: 'login' } });
    } catch (error) {
      message.error('注册失败:', error);
      if (error instanceof Error) {
        message.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || '注册失败，请稍后重试');
      } else {
        message.error('注册失败，请稍后重试');
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