import React from 'react';
import { Button, Typography, Row, Col, Divider, Space } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto' }}>
      <Row gutter={[24, 48]} align="middle">
        <Col xs={24} md={12}>
          <div style={{ padding: '20px 0' }}>
            <Title level={1}>故事解析设定：回答卡片问题</Title>
            <Paragraph style={{ fontSize: 18 }}>
              探索故事的深层含义，通过AI分析获取独特视角，深入理解角色和情节发展。
            </Paragraph>
            <Space size="large">
              <Button 
                type="primary" 
                size="large" 
                icon={<BookOutlined />}
                onClick={() => navigate(isAuthenticated ? '/stories' : '/login')}
              >
                {isAuthenticated ? '开始旅程' : '登录开始'}
              </Button>
              {!isAuthenticated && (
                <Button 
                  size="large" 
                  onClick={() => navigate('/register')}
                >
                  注册账号
                </Button>
              )}
            </Space>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <img 
            src="/assets/hero-image.jpg" 
            alt="故事分析" 
            style={{ width: '100%', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} 
          />
        </Col>
      </Row>

      <Divider style={{ margin: '60px 0' }}>
        <span style={{ fontSize: 20, fontWeight: 'bold' }}>我们的特色</span>
      </Divider>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center', padding: 24, height: '100%', backgroundColor: '#f8f8f8', borderRadius: 8 }}>
            <Title level={3}>生成分析卡片</Title>
            <Paragraph>
              AI将分析故事内容，生成深度解析卡片，帮助你理解故事的核心要素。
            </Paragraph>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center', padding: 24, height: '100%', backgroundColor: '#f8f8f8', borderRadius: 8 }}>
            <Title level={3}>解锁故事角色</Title>
            <Paragraph>
              与各种角色进行无限次讨论，获取更多视角和见解，深入探索故事世界。
            </Paragraph>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center', padding: 24, height: '100%', backgroundColor: '#f8f8f8', borderRadius: 8 }}>
            <Title level={3}>多种故事设定</Title>
            <Paragraph>
              探索各种不同类型的故事设定，从奇幻冒险到科幻未来，满足你的好奇心。
            </Paragraph>
          </div>
        </Col>
      </Row>

      <div style={{ textAlign: 'center', margin: '60px 0 20px' }}>
        <Button 
          type="primary" 
          size="large"
          onClick={() => navigate(isAuthenticated ? '/stories' : '/login')}
        >
          立即开始
        </Button>
      </div>
    </div>
  );
};

export default HomePage; 