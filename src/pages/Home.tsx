import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, message } from 'antd';
import { BookOutlined, RightOutlined } from '@ant-design/icons';
import * as authApi from '../api/auth';
import Layout from '../components/Layout';

interface UserInfo {
  id: number;
  username: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    // 从localStorage获取用户信息
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userInfo = JSON.parse(userStr);
        setUser(userInfo);
      } catch (e) {
        message.error('解析用户信息失败');
      }
    }
  }, []);

  const handleStartJourney = () => {
    navigate('/story-journey');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      message.error('登出请求失败');
    }
    
    // 无论API是否成功，都清除本地存储并跳转
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    message.success('退出登录成功');
    navigate('/auth');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">欢迎来到故事旅程</h1>
          <p className="text-gray-600">创造专属于你的故事世界，开启奇妙冒险</p>
        </div>

        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} md={8}>
            <Card 
              hoverable 
              className="h-full"
              onClick={handleStartJourney}
            >
              <div className="text-center">
                <BookOutlined style={{ fontSize: '48px', color: '#1890ff' }} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">创建新故事</h3>
                <p className="text-gray-600">回答几个简单问题，生成专属于你的故事</p>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable className="h-full">
              <div className="text-center">
                <BookOutlined style={{ fontSize: '48px', color: '#52c41a' }} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">继续旅程</h3>
                <p className="text-gray-600">继续你未完成的故事旅程</p>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable className="h-full">
              <div className="text-center">
                <BookOutlined style={{ fontSize: '48px', color: '#fa8c16' }} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">我的收藏</h3>
                <p className="text-gray-600">查看你收藏的故事</p>
              </div>
            </Card>
          </Col>
        </Row>

        <div className="bg-blue-50 p-6 rounded-lg flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold mb-1">升级到高级会员</h3>
            <p className="text-gray-600">解锁更多精彩功能，获得无限创作体验</p>
          </div>
          <Button 
            type="primary" 
            size="large" 
            icon={<RightOutlined />}
            onClick={() => navigate('/membership')}
          >
            查看会员特权
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home; 