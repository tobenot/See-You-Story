import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, List, Spin, Empty, message, Tooltip } from 'antd';
import { BookOutlined, RightOutlined, ClockCircleOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import Layout from '../components/Layout';
import * as storyApi from '../api/story';
import { StoryWithProgress, StoriesResponse } from '../api/story';

const ContinueJourney: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<StoryWithProgress[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [favoriteLoading, setFavoriteLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchStories();
  }, [page]);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await storyApi.getUserStoriesWithProgress({ page, limit });
      const data = response.data as StoriesResponse;
      
      setStories(data.stories);
      setTotal(data.total);
      setLoading(false);
    } catch (error) {
      console.error('获取故事列表失败:', error);
      message.error('获取故事列表失败，请稍后重试');
      setLoading(false);
    }
  };

  const handleContinueStory = (story: StoryWithProgress) => {
    // 导航到故事章节页面，开始从上次的章节继续
    navigate('/story-chapter', {
      state: {
        storyId: story.id,
        chapterId: story.lastCreatedChapter.id
      }
    });
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleToggleFavorite = async (story: StoryWithProgress) => {
    try {
      setFavoriteLoading(prev => ({ ...prev, [story.id]: true }));
      
      if (story.isFavorite) {
        await storyApi.unfavoriteStory(story.id);
        message.success('已取消收藏');
      } else {
        await storyApi.favoriteStory(story.id);
        message.success('收藏成功');
      }
      
      // 更新本地状态
      setStories(prevStories => 
        prevStories.map(s => 
          s.id === story.id ? { ...s, isFavorite: !s.isFavorite } : s
        )
      );
    } catch (error) {
      console.error('收藏操作失败:', error);
      message.error('操作失败，请稍后重试');
    } finally {
      setFavoriteLoading(prev => ({ ...prev, [story.id]: false }));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">继续旅程</h1>
          <Button icon={<BookOutlined />} onClick={handleGoHome}>
            返回首页
          </Button>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center my-16">
            <Spin size="large" />
            <p className="mt-4 text-gray-600">正在加载故事列表...</p>
          </div>
        ) : stories.length === 0 ? (
          <Empty
            description="你还没有创建过故事"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={handleGoHome}>
              返回首页创建故事
            </Button>
          </Empty>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={stories}
            pagination={{
              onChange: setPage,
              pageSize: limit,
              total,
              current: page,
            }}
            renderItem={(item) => (
              <Card className="mb-4 hover:shadow-md transition-shadow" key={item.id}>
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{item.content}</p>
                    <div className="flex items-center text-gray-500">
                      <ClockCircleOutlined className="mr-1" />
                      <span>最后章节: {item.lastCreatedChapter.title}</span>
                    </div>
                  </div>
                  <div className="md:ml-6 mt-4 md:mt-0 flex md:flex-col justify-center items-center space-y-2">
                    <Button
                      type="primary"
                      icon={<RightOutlined />}
                      onClick={() => handleContinueStory(item)}
                      className="mb-2 w-full"
                    >
                      继续旅程
                    </Button>
                    <Tooltip title={item.isFavorite ? "取消收藏" : "收藏故事"}>
                      <Button 
                        type={item.isFavorite ? "default" : "dashed"}
                        icon={item.isFavorite ? <StarFilled className="text-yellow-500" /> : <StarOutlined />}
                        onClick={() => handleToggleFavorite(item)}
                        loading={favoriteLoading[item.id]}
                        className="w-full"
                      >
                        {item.isFavorite ? "已收藏" : "收藏"}
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </Card>
            )}
          />
        )}
      </div>
    </Layout>
  );
};

export default ContinueJourney; 