import React, { useState, useEffect } from 'react';
import { BookOutlined } from '@ant-design/icons';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { openFeedback } from '../utils/feedback';

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('login');

  // 检查用户是否已登录，如果已登录则跳转到首页
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  // 从location state中获取activeTab
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleFeedback = () => {
    openFeedback();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <h1 className="text-2xl font-bold border-b pb-4 mb-6">用户登录注册</h1>
        
        <div className="flex flex-col md:flex-row items-start">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="flex items-center text-lg font-medium">
              <BookOutlined className="mr-2" />
              故事旅程
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              通过回答一系列问题，创建您的个性化故事。
              请先登录或注册以开始您的故事旅程。
            </p>
          </div>
          
          <div className="w-full md:w-3/4">
            <div className="flex justify-end mb-6">
              <button 
                className={`px-4 py-2 mr-2 ${activeTab === 'login' ? 'bg-gray-50 border border-gray-300 rounded' : 'text-gray-600'}`}
                onClick={() => handleTabChange('login')}
              >
                登录
              </button>
              <button 
                className={`px-4 py-2 mr-2 ${activeTab === 'register' ? 'bg-gray-50 border border-gray-300 rounded' : 'text-gray-600'}`}
                onClick={() => handleTabChange('register')}
              >
                注册
              </button>
              <button 
                className="px-4 py-2 bg-gray-600 text-white rounded"
                onClick={handleFeedback}
              >
                反馈
              </button>
            </div>
            
            <div className="flex md:flex-row gap-6">
              <div className="w-full md:w-1/2 bg-white p-6 rounded shadow-sm border border-gray-200">
                <h2 className="text-xl font-medium mb-6 text-center">{activeTab === 'login' ? '登录' : '注册'}</h2>
                {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
              </div>
              
              <div className="hidden md:block w-full md:w-1/2 bg-white p-6 rounded shadow-sm border border-gray-200">
                <h2 className="text-xl font-medium mb-6 text-center">{activeTab === 'login' ? '注册' : '登录'}</h2>
                {activeTab === 'login' ? <RegisterForm /> : <LoginForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 