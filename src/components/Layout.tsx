import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout as AntLayout, Menu, Button } from 'antd';
import { BookOutlined, UserOutlined, GiftOutlined } from '@ant-design/icons';

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  
  return (
    <AntLayout className="min-h-screen">
      <Header className="flex justify-between items-center px-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-xl font-bold mr-8">
            <BookOutlined className="mr-2" /> 故事旅程
          </Link>
        </div>
        
        <div className="flex items-center">
          <Button 
            type="text" 
            icon={<GiftOutlined />} 
            onClick={() => navigate('/membership')}
            className="mr-2"
          >
            会员订阅
          </Button>
          <Button 
            type="text" 
            icon={<UserOutlined />} 
            onClick={() => navigate('/user-center')}
          >
            个人中心
          </Button>
        </div>
      </Header>
      
      <Content className="bg-gray-50">
        {children}
      </Content>
    </AntLayout>
  );
};

export default Layout; 