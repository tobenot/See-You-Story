import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spin, message } from 'antd';
import { RollbackOutlined, BookOutlined } from '@ant-design/icons';
import StoryChapterOptions from '../components/story/StoryChapterOptions';
import * as storyApi from '../api/story';
import Layout from '../components/Layout';

interface StoryOption {
  id: string;
  text: string;
}

const StoryChapter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storyId, chapterId } = location.state as { storyId: string; chapterId: string } || 
    { storyId: '', chapterId: '1' };
  
  const [loading, setLoading] = useState(true);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [options, setOptions] = useState<StoryOption[]>([]);
  
  useEffect(() => {
    if (!storyId) {
      message.error('故事ID不存在，请重新开始');
      navigate('/');
      return;
    }

    const fetchChapter = async () => {
      try {
        setLoading(true);
        // 调用API获取章节内容
        let chapterData;
        
        try {
          const response = await storyApi.getStoryChapter(storyId, chapterId);
          chapterData = response.data;
        } catch (apiError) {
          console.warn('API调用失败，使用模拟数据:', apiError);
          // 使用模拟数据
          chapterData = {
            id: chapterId,
            title: '奇幻世界：魔法与科技的融合',
            content: '在一个魔法与科技共存的世界里，你是一名刚刚觉醒特殊能力的年轻人。今天早晨，你发现自己能够看到他人无法察觉的能量流动。当你走在繁忙的街道上，一位神秘的老者向你走来，他似乎注意到了你的不同...\n\n"年轻人，我看得出你与众不同。这个世界正面临一场危机，而你可能是解决它的关键。"老者神秘地说道。',
            options: [
              { id: 'option1', text: '询问老者更多关于危机的信息' },
              { id: 'option2', text: '礼貌地拒绝，继续自己的路' },
              { id: 'option3', text: '展示你的能力，询问老者是否知道这意味着什么' }
            ]
          };
        }
        
        setChapterTitle(chapterData.title);
        setChapterContent(chapterData.content);
        setOptions(chapterData.options);
        setLoading(false);
      } catch (error) {
        console.error('获取章节失败:', error);
        message.error('获取章节失败，请稍后重试');
        setLoading(false);
      }
    };

    fetchChapter();
  }, [storyId, chapterId, navigate]);

  const handleSelectOption = async (optionId: string) => {
    try {
      setLoading(true);
      
      let nextChapterId;
      
      try {
        // 调用API选择选项，获取下一章节
        const response = await storyApi.selectStoryOption(storyId, chapterId, optionId);
        nextChapterId = response.data.nextChapterId;
      } catch (apiError) {
        console.warn('API调用失败，使用模拟数据:', apiError);
        // 模拟API调用，生成下一章节ID
        nextChapterId = String(parseInt(chapterId, 10) + 1);
      }
      
      setLoading(false);
      navigate('/story-chapter', { 
        state: { 
          storyId, 
          chapterId: nextChapterId 
        } 
      });
    } catch (error) {
      console.error('选择选项失败:', error);
      message.error('选择失败，请稍后重试');
      setLoading(false);
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  const handleEndStory = () => {
    navigate('/story-analysis', { state: { storyId } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-600">正在加载故事章节...</p>
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
          />
        </div>
      </div>
    </Layout>
  );
};

export default StoryChapter; 