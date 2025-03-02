import React, { useEffect } from 'react';
import { Row, Col, Typography, Empty, Spin, Button, Modal } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import StoryCard from '../components/StoryCard';
import { useStory } from '../hooks/useStory';
import { useAuth } from '../hooks/useAuth';

const { Title } = Typography;
const { confirm } = Modal;

const StoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { stories, isLoading, setCurrentStory, getStoriesData, freeStoriesLeft } = useStory();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      getStoriesData();
    }
  }, [isAuthenticated]);

  const handleStoryClick = (story: any) => {
    if (story.isLocked) {
      // 显示锁定提示
      confirm({
        title: '故事已锁定',
        icon: <ExclamationCircleOutlined />,
        content: '这个故事需要订阅才能访问。是否前往订阅页面？',
        onOk() {
          navigate('/subscription');
        },
        okText: '前往订阅',
        cancelText: '取消'
      });
    } else {
      // 设置当前故事并导航到故事详情页
      setCurrentStory(story);
      navigate(`/story/${story.id}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 20px' }}>
        <Title level={2}>请先登录</Title>
        <Button type="primary" size="large" onClick={() => navigate('/login')}>
          去登录
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2}>选择故事设定</Title>
        <div>
          {freeStoriesLeft > 0 ? (
            <span style={{ marginRight: 16 }}>
              剩余免费次数: <strong>{freeStoriesLeft}</strong>
            </span>
          ) : (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/subscription')}
            >
              升级订阅
            </Button>
          )}
        </div>
      </div>

      <Spin spinning={isLoading}>
        {stories.length > 0 ? (
          <Row gutter={[24, 24]}>
            {stories.map((story) => (
              <Col key={story.id} xs={24} sm={12} md={8} lg={6}>
                <StoryCard story={story} onClick={handleStoryClick} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty 
            description="暂无可用故事" 
            style={{ margin: '40px 0' }}
          />
        )}
      </Spin>
    </div>
  );
};

export default StoriesPage; 