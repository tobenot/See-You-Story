import React, { useState } from 'react';
import { Card, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const { TabPane } = Tabs;

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  const handleAuthSuccess = () => {
    navigate('/stories');
  };

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)', // 减去顶部导航高度
        padding: '20px',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: 450,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: 8
        }}
      >
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          centered
        >
          <TabPane tab="登录" key="login">
            <LoginForm 
              onSuccess={handleAuthSuccess} 
              onRegisterClick={() => setActiveTab('register')} 
            />
          </TabPane>
          <TabPane tab="注册" key="register">
            <RegisterForm 
              onSuccess={handleAuthSuccess} 
              onLoginClick={() => setActiveTab('login')} 
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthPage; 