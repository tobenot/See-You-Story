import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spin, message } from 'antd';
import { BookOutlined, ShareAltOutlined, HeartOutlined, HeartFilled, RightCircleOutlined, BarChartOutlined } from '@ant-design/icons';
import * as storyApi from '../api/story';

interface QuestionWithAnswer {
  questionId: string;
  questionText: string;
  answer: string;
}

interface StoryResultProps {}

const StoryResult: React.FC<StoryResultProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questionsWithAnswers } = location.state as { questionsWithAnswers: QuestionWithAnswer[] } || { questionsWithAnswers: [] };
  
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState<string>('');
  const [storyId, setStoryId] = useState<string>('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // 检查是否有答案数据
    if (!questionsWithAnswers || questionsWithAnswers.length === 0) {
      message.error('找不到问题回答数据，请重新开始');
      navigate('/');
      return;
    }

    // 从API获取故事内容
    const fetchStory = async () => {
      try {
        setLoading(true);
        // 实际调用API生成故事
        const response = await storyApi.generateStory(questionsWithAnswers);
        setStory(response.data.content);
        setStoryId(response.data.id);
        setLoading(false);
      } catch (error) {
        console.error('获取故事失败:', error);
        
        // 如果API调用失败，使用本地模拟数据（仅用于演示）
        // 提取第一个问题的答案作为故事类型参考
        const storyTitleRef = questionsWithAnswers[0]?.answer || '未知';
        
        // 生成一个假的故事内容
        const mockStory = `
# 基于你的回答生成的故事

这是一个基于你回答的五个问题而生成的故事。你的回答反映了你的想象力和个性。

**你的回答：**
${questionsWithAnswers.map(qa => `- **${qa.questionText}**: ${qa.answer}`).join('\n')}

*这个故事将基于你的回答生成。实际上，这只是一个前端演示，真实的故事内容将由后端API生成。*
        `;
        
        setStory(mockStory);
        setStoryId('mock-id-123');
        setLoading(false);
        message.warning('使用本地模拟数据，API连接失败');
      }
    };

    fetchStory();
  }, [questionsWithAnswers, navigate]);

  const handleLike = async () => {
    try {
      if (liked) {
        await storyApi.unlikeStory(storyId);
        setLiked(false);
        message.success('已取消收藏');
      } else {
        await storyApi.likeStory(storyId);
        setLiked(true);
        message.success('已添加到收藏');
      }
    } catch (error) {
      console.error('操作失败:', error);
      message.error('操作失败，请稍后重试');
    }
  };

  const handleShare = async () => {
    try {
      const response = await storyApi.shareStory(storyId);
      const shareLink = response.data.shareLink;
      
      // 复制链接到剪贴板
      navigator.clipboard.writeText(shareLink)
        .then(() => {
          message.success('分享链接已复制到剪贴板');
        })
        .catch(() => {
          message.info(`分享链接: ${shareLink}`);
        });
    } catch (error) {
      console.error('分享失败:', error);
      message.error('分享失败，请稍后重试');
    }
  };

  const handleViewAnalysis = () => {
    navigate('/story-analysis', { state: { storyId } });
  };

  const handleNewStory = () => {
    navigate('/');
  };

  const handleStartJourney = () => {
    // 导航到故事章节页面，开始互动旅程
    navigate('/story-chapter', {
      state: {
        storyId,
        chapterId: '1'
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-600">正在创作您的专属故事...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">您的故事</h1>
          <div className="flex items-center space-x-4">
            <Button 
              type="text" 
              icon={liked ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
              onClick={handleLike}
            >
              {liked ? '已收藏' : '收藏'}
            </Button>
            <Button type="text" icon={<ShareAltOutlined />} onClick={handleShare}>
              分享
            </Button>
            <Button icon={<BarChartOutlined />} onClick={handleViewAnalysis}>
              查看分析
            </Button>
            <Button icon={<BookOutlined />} onClick={handleNewStory}>
              创建新故事
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
          <div className="prose max-w-none">
            {story.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={index} className="text-2xl font-bold mb-4">{paragraph.substring(2)}</h1>;
              } else if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-bold mb-3">{paragraph.substring(3)}</h2>;
              } else if (paragraph.startsWith('- ')) {
                return <li key={index} className="ml-4">{paragraph.substring(2)}</li>;
              } else if (paragraph.trim() === '') {
                return <br key={index} />;
              } else {
                return <p key={index} className="mb-4">{paragraph}</p>;
              }
            })}
          </div>

          <div className="mt-8 border-t pt-6">
            <Button 
              type="primary" 
              size="large" 
              icon={<RightCircleOutlined />} 
              className="w-full"
              onClick={handleStartJourney}
            >
              开始互动旅程
            </Button>
            <p className="text-center text-gray-500 mt-2">
              进入互动模式，你的选择将影响故事的走向
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryResult; 