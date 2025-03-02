import React from 'react';
import { Layout, Menu, Button, Dropdown, Space, Avatar } from 'antd';
import { UserOutlined, DownOutlined, LogoutOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        个人资料
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Header 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 24px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}
    >
      <div className="logo" style={{ fontSize: 20, fontWeight: 'bold' }}>
        <Link to="/" style={{ color: 'inherit' }}>
          See You Story
        </Link>
      </div>
      
      <div style={{ flex: 1 }}>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ justifyContent: 'center', border: 'none' }}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="/stories" icon={<BookOutlined />}>
            <Link to="/stories">故事库</Link>
          </Menu.Item>
        </Menu>
      </div>
      
      <div>
        {isAuthenticated ? (
          <Dropdown overlay={userMenu} trigger={['click']}>
            <Button type="text">
              <Space>
                <Avatar size="small" icon={<UserOutlined />} />
                {user?.username || '用户'}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        ) : (
          <Space>
            <Button type="text" onClick={() => navigate('/login')}>
              登录
            </Button>
            <Button type="primary" onClick={() => navigate('/register')}>
              注册
            </Button>
          </Space>
        )}
      </div>
    </Header>
  );
};

export default AppHeader; 