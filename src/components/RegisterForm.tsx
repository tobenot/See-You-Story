import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';

interface RegisterFormProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onLoginClick }) => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (values: { username: string; password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      await register(values.username, values.password);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '注册失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>用户注册</h2>
      
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      
      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={handleRegister}
        size="large"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名至少3个字符' },
            { max: 20, message: '用户名最多20个字符' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>
        
        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' },
            { max: 20, message: '密码最多20个字符' },
            { pattern: /^(?=.*[A-Za-z])(?=.*\d)/, message: '密码必须包含字母和数字' }
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            注册
          </Button>
        </Form.Item>
        
        <Form.Item>
          <Button type="link" onClick={onLoginClick} block>
            已有账号？立即登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm; 