import React from 'react';
import { Button, Typography, Row, Col, Divider, Space, Card } from 'antd';
import { BookOutlined, QuestionCircleOutlined, GlobalOutlined, TeamOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 如果用户已登录，导航到问题页面开始新故事，否则导航到登录页面
  const handleStartJourney = () => {
    if (isAuthenticated) {
      navigate('/questions');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto' }}>
      <Row gutter={[24, 48]} align="middle">
        <Col xs={24} md={12}>
          <div style={{ padding: '20px 0' }}>
            <Title level={1}>回答问题，创造你的专属故事</Title>
            <Paragraph style={{ fontSize: 18 }}>
              通过回答精心设计的问题，AI将为你创造独特的故事世界。探索角色、情节，解锁更多故事可能性。
            </Paragraph>
            <Space size="large">
              <Button 
                type="primary" 
                size="large" 
                icon={<QuestionCircleOutlined />}
                onClick={handleStartJourney}
              >
                {isAuthenticated ? '开始问答' : '登录开始'}
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
            alt="故事世界" 
            style={{ width: '100%', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} 
          />
        </Col>
      </Row>

      <Divider style={{ margin: '60px 0 40px' }}>
        <span style={{ fontSize: 20, fontWeight: 'bold' }}>故事创作流程</span>
      </Divider>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
            onClick={() => isAuthenticated && navigate('/questions')}
          >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <QuestionCircleOutlined style={{ fontSize: 36, color: '#1890ff' }} />
            </div>
            <Title level={4} style={{ textAlign: 'center' }}>Step 1: 回答问题</Title>
            <Paragraph>
              回答五个精心设计的问题，帮助AI理解你的想象和偏好，为故事创作奠定基础。
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
            onClick={() => isAuthenticated && navigate('/story-generation')}
          >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <BookOutlined style={{ fontSize: 36, color: '#52c41a' }} />
            </div>
            <Title level={4} style={{ textAlign: 'center' }}>Step 2: 故事生成</Title>
            <Paragraph>
              AI分析你的回答，提取核心元素，创建独特角色和情节开头，打造专属故事世界。
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
          >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <TeamOutlined style={{ fontSize: 36, color: '#fa8c16' }} />
            </div>
            <Title level={4} style={{ textAlign: 'center' }}>Step 3: 互动与创作</Title>
            <Paragraph>
              选择故事发展方向，或输入自己的想法，与AI共同创作，推动故事情节发展。
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
            onClick={() => isAuthenticated && navigate('/analysis-card/0')}
          >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <FileTextOutlined style={{ fontSize: 36, color: '#722ed1' }} />
            </div>
            <Title level={4} style={{ textAlign: 'center' }}>Step 4: 分析卡片</Title>
            <Paragraph>
              创建故事分析卡片，记录你的感悟，解锁故事角色，分享到社交平台与朋友共享。
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
            onClick={() => isAuthenticated && navigate('/world-view')}
          >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <GlobalOutlined style={{ fontSize: 36, color: '#eb2f96' }} />
            </div>
            <Title level={4} style={{ textAlign: 'center' }}>Step 5: 世界探索</Title>
            <Paragraph>
              探索不同世界观的故事开头，与解锁的角色自由对话，发现更多故事可能性。
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <div style={{ textAlign: 'center', margin: '60px 0 20px' }}>
        <Space size="large">
          <Button 
            type="primary" 
            size="large"
            icon={<QuestionCircleOutlined />}
            onClick={handleStartJourney}
          >
            立即开始创作
          </Button>
          {isAuthenticated && (
            <Button 
              size="large"
              onClick={() => navigate('/world-view')}
            >
              探索故事世界
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
};

export default HomePage; 