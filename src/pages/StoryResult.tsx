import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spin, message } from 'antd';
import { BookOutlined, ShareAltOutlined, HeartOutlined, HeartFilled, RightCircleOutlined, BarChartOutlined } from '@ant-design/icons';
import * as storyApi from '../api/story';
import Layout from '../components/Layout';

interface QuestionWithAnswer {
  questionId: string;
  questionText: string;
  answer: string;
}

// 添加全局 Window 接口扩展
declare global {
  interface Window {
    storyRequestLock: boolean;
  }
}

const StoryResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questionsWithAnswers } = location.state as { questionsWithAnswers: QuestionWithAnswer[] } || { questionsWithAnswers: [] };
  
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState<string>('');
  const [storyId, setStoryId] = useState<string>('');
  const [liked, setLiked] = useState(false);
  const requestInProgress = useRef(false);
  const [storyGenerated, setStoryGenerated] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  // 使用静态变量来确保即使多个组件实例也共享一个锁
  if (typeof window !== 'undefined' && !('storyRequestLock' in window)) {
    Object.defineProperty(window, 'storyRequestLock', {
      value: false,
      writable: true
    });
  }

  const resetRequestLock = () => {
    if (typeof window !== 'undefined') {
      window.storyRequestLock = false;
    }
    requestInProgress.current = false;
  };

  const acquireRequestLock = (): boolean => {
    if (typeof window !== 'undefined') {
      const currentLockState = window.storyRequestLock;
      
      if (!currentLockState) {
        window.storyRequestLock = true;
        requestInProgress.current = true;
        return true;
      }
      return false;
    }
    return false;
  };

  // 组件初始化时尝试从localStorage恢复数据并重置锁
  useEffect(() => {
    // 组件初始化时重置锁状态，防止上次异常退出导致锁没有释放
    resetRequestLock();
    
    const savedStoryData = localStorage.getItem('generatedStoryData');
    if (savedStoryData) {
      try {
        const { content, id, generated, savedAnswers, timestamp } = JSON.parse(savedStoryData);
        
        // 检查当前问题和答案是否与保存的相同
        const currentAnswersJson = JSON.stringify(questionsWithAnswers);
        const savedAnswersJson = JSON.stringify(savedAnswers);
        
        // 检查缓存是否过期（24小时）
        const currentTime = new Date().getTime();
        const cacheAge = currentTime - (timestamp || 0);
        const cacheExpired = cacheAge > 24 * 60 * 60 * 1000; // 24小时过期
        
        // 只有当问题和答案完全相同，且缓存未过期时，才使用缓存的故事
        if (content && id && generated && savedAnswersJson === currentAnswersJson && !cacheExpired) {
          setStory(content);
          setStoryId(id);
          setStoryGenerated(true);
          setLoading(false);
        } else {
          if (cacheExpired) {
            message.info('缓存已过期，需要重新生成故事');
          } else {
            message.info('问题答案已更改，需要重新生成故事');
          }
          // 不设置storyGenerated，这样会触发后续的useEffect重新生成故事
        }
      } catch (error) {
        message.error('解析缓存的故事数据时出错，正在重新生成故事');
        localStorage.removeItem('generatedStoryData'); // 清除可能损坏的缓存数据
      }
    }
  }, [questionsWithAnswers]);

  useEffect(() => {
    // 检查是否有答案数据
    if (!questionsWithAnswers || questionsWithAnswers.length === 0) {
      message.error('找不到问题回答数据，请重新开始');
      navigate('/');
      return;
    }

    // 如果故事已生成，则不再重复请求
    if (storyGenerated && story && storyId) {
      return;
    }

    // 从API获取故事内容
    const fetchStory = async () => {
      // 尝试获取全局锁
      if (!acquireRequestLock()) {
        return;
      }
      
      try {
        setLoading(true);
        setFetchError(false); // 重置错误状态
        
        // 实际调用API生成故事
        const response = await storyApi.generateStory(questionsWithAnswers);
        const storyContent = response.data.content;
        const newStoryId = response.data.id;
        
        // 保存到状态
        setStory(storyContent);
        setStoryId(newStoryId);
        setStoryGenerated(true); // 标记故事已生成
        
        // 保存到本地存储
        localStorage.setItem('generatedStoryData', JSON.stringify({
          content: storyContent,
          id: newStoryId,
          generated: true,
          timestamp: new Date().getTime(),
          savedAnswers: questionsWithAnswers
        }));
        
        setLoading(false);
      } catch (error) {
        message.error('获取故事失败');
        message.error('故事生成失败，请检查网络连接后重试');
        setFetchError(true); // 设置错误状态
        
        // 显示暂时性的提示，但不使用模拟数据，让用户可以重试
        setLoading(false);
      } finally {
        // 请求结束后释放请求锁
        resetRequestLock();
      }
    };

    // 只有在需要时调用fetchStory
    // 如果有错误状态，不自动重试，等待用户手动重试
    if (!fetchError) {
      fetchStory();
    }
    
    // 组件卸载时清除请求锁
    return () => {
      resetRequestLock();
    };
  }, [questionsWithAnswers, navigate, storyGenerated, story, storyId, fetchError]);

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
      message.error('操作失败');
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
      message.error('分享失败');
      message.error('分享失败，请稍后重试');
    }
  };

  const handleViewAnalysis = () => {
    navigate('/story-analysis', { state: { storyId } });
  };

  const handleNewStory = () => {
    // 清除本地存储的故事数据
    localStorage.removeItem('generatedStoryData');
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

  const handleRetry = () => {
    // 重置请求状态
    setFetchError(false);
    setStoryGenerated(false);
    // 下一个渲染周期会自动触发fetchStory
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-600">正在创作您的专属故事...（过程可能需要三分钟）</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">故事生成失败</p>
          <p className="text-gray-600 mb-8">无法连接到服务器，请检查您的网络连接</p>
          <div className="space-x-4">
            <Button type="primary" onClick={handleRetry}>
              重试
            </Button>
            <Button onClick={handleNewStory}>
              重新回答问题
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
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
    </Layout>
  );
};

export default StoryResult; 