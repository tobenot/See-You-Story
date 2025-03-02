import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu, message } from 'antd';
import { BookOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import * as authApi from '../api/auth';

interface UserInfo {
  id: number;
  username: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    // 从localStorage获取用户信息
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userInfo = JSON.parse(userStr);
        setUser(userInfo);
      } catch (e) {
        console.error('解析用户信息失败', e);
      }
    }
  }, []);

  const handleStartJourney = () => {
    navigate('/story-journey');
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('登出请求失败', error);
    }
    
    // 无论API是否成功，都清除本地存储并跳转
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    message.success('退出登录成功');
    navigate('/auth');
  };

  // 用户菜单
  const userMenu = (
    <Menu
      items={[
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: '退出登录',
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">故事旅程</h1>
          {user && (
            <Dropdown overlay={userMenu} placement="bottomRight">
              <div className="flex items-center cursor-pointer">
                <UserOutlined className="mr-1" />
                <span>{user.username}</span>
              </div>
            </Dropdown>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row items-start">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="flex items-center text-lg font-medium">
              <BookOutlined className="mr-2" />
              故事旅程
            </div>
          </div>
          
          <div className="w-full md:w-3/4">
            <div className="bg-white p-6 rounded shadow-sm border border-gray-200 mb-6">
              <h2 className="text-xl font-medium mb-4">开始您的故事旅程</h2>
              <p className="text-gray-600 mb-6">
                欢迎来到"故事旅程"！这是一个帮助您创建个性化故事的平台。
                通过回答一系列问题，我们将为您定制一个独特的故事。
                无论您喜欢奇幻冒险、科幻未来、浪漫爱情还是悬疑恐怖，
                我们都能为您创造一个专属的故事世界。
              </p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="p-4 border border-gray-200 rounded-lg flex-1">
                  <h3 className="font-medium mb-2">如何开始</h3>
                  <p className="text-gray-600">
                    点击下方的"开始旅程"按钮，然后回答一系列关于您理想故事的问题。
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg flex-1">
                  <h3 className="font-medium mb-2">生成您的故事</h3>
                  <p className="text-gray-600">
                    完成所有问题后，我们的系统将生成一个独特的故事，专为您量身定制。
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg flex-1">
                  <h3 className="font-medium mb-2">保存与分享</h3>
                  <p className="text-gray-600">
                    您可以保存您的故事，随时查阅，或者与朋友分享您的创作。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                type="primary" 
                size="large" 
                icon={<BookOutlined />}
                onClick={handleStartJourney}
                className="px-8 h-12"
              >
                开始旅程
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 