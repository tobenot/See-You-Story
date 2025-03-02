import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onRegisterClick }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      await login(values.username, values.password);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>用户登录</h2>
      
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        size="large"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名至少3个字符' }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>
        
        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' }
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            登录
          </Button>
        </Form.Item>
        
        <Form.Item>
          <Button type="link" onClick={onRegisterClick} block>
            没有账号？立即注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm; 