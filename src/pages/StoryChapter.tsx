import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spin, message, Alert } from 'antd';
import { RollbackOutlined, BookOutlined, RedoOutlined } from '@ant-design/icons';
import StoryChapterOptions, { StoryOption } from '../components/story/StoryChapterOptions';
import * as storyApi from '../api/story';
import Layout from '../components/Layout';

// 使用API中定义的接口
import { StoryChapter as _StoryChapterType } from '../api/story';

const StoryChapter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storyId, chapterId } = location.state as { storyId: string; chapterId: string } || 
    { storyId: '', chapterId: '1' };
  
  const [loading, setLoading] = useState(true);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [options, setOptions] = useState<StoryOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [optionSelecting, setOptionSelecting] = useState(false);
  
  useEffect(() => {
    if (!storyId) {
      message.error('故事ID不存在，请重新开始');
      navigate('/');
      return;
    }

    const fetchChapter = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 调用API获取章节内容
        const response = await storyApi.getStoryChapter(storyId, chapterId);
        const chapterData = response.data;
        
        setChapterTitle(chapterData.title);
        setChapterContent(chapterData.content);
        setOptions(chapterData.options);
        setLoading(false);
      } catch (error) {
        console.error('获取章节失败:', error);
        setError('获取故事章节失败，请稍后重试');
        setLoading(false);
      }
    };

    fetchChapter();
  }, [storyId, chapterId, navigate]);

  const handleSelectOption = async (optionId: string) => {
    try {
      setOptionSelecting(true);
      
      // 调用API选择选项，获取下一章节
      const response = await storyApi.selectStoryOption(storyId, chapterId, optionId);
      const nextChapterId = response.data.nextChapterId;
      
      setOptionSelecting(false);
      
      // 保存当前的章节历史到localStorage，方便用户回溯
      const historyKey = `story_${storyId}_history`;
      const currentHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
      currentHistory.push({ chapterId, title: chapterTitle, selectedOption: optionId });
      localStorage.setItem(historyKey, JSON.stringify(currentHistory));
      
      navigate('/story-chapter', { 
        state: { 
          storyId, 
          chapterId: nextChapterId 
        } 
      });
    } catch (error) {
      console.error('选择选项失败:', error);
      message.error('选择选项失败，请稍后重试');
      setOptionSelecting(false);
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  const handleEndStory = () => {
    navigate('/story-analysis', { state: { storyId } });
  };
  
  const handleRetryFetch = async () => {
    setError(null);
    const fetchChapter = async () => {
      try {
        setLoading(true);
        const response = await storyApi.getStoryChapter(storyId, chapterId);
        const chapterData = response.data;
        
        setChapterTitle(chapterData.title);
        setChapterContent(chapterData.content);
        setOptions(chapterData.options);
        setLoading(false);
      } catch (error) {
        console.error('重试获取章节失败:', error);
        setError('获取故事章节失败，请稍后重试');
        setLoading(false);
      }
    };
    
    fetchChapter();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-600">正在加载故事章节...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <Alert
            message="加载失败"
            description={error}
            type="error"
            showIcon
          />
          <div className="mt-4 flex justify-center space-x-4">
            <Button type="primary" icon={<RedoOutlined />} onClick={handleRetryFetch}>
              重试
            </Button>
            <Button onClick={handleReturn}>
              返回
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
          <h1 className="text-2xl font-bold">故事旅程</h1>
          <div className="flex items-center space-x-4">
            <Button icon={<RollbackOutlined />} onClick={handleReturn}>
              返回
            </Button>
            <Button icon={<BookOutlined />} onClick={handleEndStory}>
              结束旅程
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">{chapterTitle}</h2>
          <div className="prose max-w-none">
            {chapterContent.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          <StoryChapterOptions 
            options={options} 
            onSelectOption={handleSelectOption}
            loading={optionSelecting}
          />
        </div>
      </div>
    </Layout>
  );
};

export default StoryChapter; 