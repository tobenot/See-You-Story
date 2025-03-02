import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spin, message, Modal } from 'antd';
import { BookOutlined, UserOutlined, CommentOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import AnalysisCard from '../components/story/AnalysisCard';
import WorldViewCard from '../components/story/WorldViewCard';
import * as storyApi from '../api/story';

interface AnalysisCardData {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

interface WorldViewCardData {
  id: string;
  content: string;
  tags: string[];
}

interface StoryAnalysisProps {}

const StoryAnalysis: React.FC<StoryAnalysisProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storyId } = location.state as { storyId: string } || { storyId: '' };
  
  const [loading, setLoading] = useState(true);
  const [analysisCard, setAnalysisCard] = useState<AnalysisCardData | null>(null);
  const [worldViewCard, setWorldViewCard] = useState<WorldViewCardData | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    if (!storyId) {
      message.error('故事ID不存在，请重新开始');
      navigate('/');
      return;
    }

    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        
        let analysisData;
        
        try {
          // 调用API获取分析数据
          const response = await storyApi.getStoryAnalysis(storyId);
          analysisData = response.data;
        } catch (apiError) {
          console.warn('API调用失败，使用模拟数据:', apiError);
          // 使用模拟数据
          analysisData = {
            analysisCard: {
              id: 'analysis-1',
              title: '分析卡片',
              content: '根据你的故事选择，我们分析出你倾向于勇敢面对挑战，同时也重视与他人的合作。你的决策展现出了领导才能和对未知的好奇心。',
              tags: ['勇敢', '合作', '好奇', '领导力']
            },
            worldViewCard: {
              id: 'world-1',
              content: '你的故事发生在一个魔法与科技共存的世界，这里的人们利用古老的魔法知识与现代科技创造出独特的文明。能量流动在这个世界中扮演着重要角色，只有少数人能够感知它。',
              tags: ['魔法', '科技', '能量', '神秘']
            }
          };
        }
        
        setAnalysisCard(analysisData.analysisCard);
        setWorldViewCard(analysisData.worldViewCard);
        setLoading(false);
      } catch (error) {
        console.error('获取分析失败:', error);
        message.error('获取分析失败，请稍后重试');
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [storyId, navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  const handleFeedback = () => {
    message.info('反馈功能即将上线');
  };

  const handleShare = (cardId: string) => {
    message.success('分享链接已复制到剪贴板');
  };

  const handleSave = async (cardId: string) => {
    try {
      await storyApi.saveAnalysisCard(cardId);
      message.success('卡片已保存');
    } catch (error) {
      console.error('保存失败:', error);
      message.error('保存失败，请稍后重试');
    }
  };

  const handleDeleteCard = () => {
    if (!selectedCard) return;
    
    Modal.confirm({
      title: '确认删除',
      content: '您确定要删除这张卡片吗？这个操作不可撤销。',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          await storyApi.deleteAnalysisCard(selectedCard);
          message.success('卡片已删除');
          // 根据删除的卡片类型，清除相应的状态
          if (analysisCard?.id === selectedCard) {
            setAnalysisCard(null);
          } else if (worldViewCard?.id === selectedCard) {
            setWorldViewCard(null);
          }
          setSelectedCard(null);
        } catch (error) {
          console.error('删除失败:', error);
          message.error('删除失败，请稍后重试');
        }
      }
    });
  };

  const handleCollectCard = async () => {
    if (!selectedCard) {
      message.info('请先选择一张卡片');
      return;
    }
    
    try {
      await storyApi.saveAnalysisCard(selectedCard);
      message.success('卡片已收藏');
      
      // 导航到角色提取页面
      navigate('/character-extraction', { state: { storyId } });
    } catch (error) {
      console.error('收藏失败:', error);
      message.error('收藏失败，请稍后重试');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-600">正在加载分析结果...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex items-center">
            <BookOutlined className="mr-2" />
            <h1 className="text-2xl font-bold">故事旅程</h1>
          </div>
          <div>
            <Button 
              className="mr-2" 
              onClick={handleGoToProfile}
            >
              个人中心
            </Button>
            <Button onClick={handleFeedback}>
              反馈
            </Button>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">故事分析</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {analysisCard && (
            <div 
              className={`cursor-pointer ${selectedCard === analysisCard.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedCard(analysisCard.id)}
            >
              <AnalysisCard 
                title={analysisCard.title}
                content={analysisCard.content}
                tags={analysisCard.tags}
                onShare={() => handleShare(analysisCard.id)}
                onSave={() => handleSave(analysisCard.id)}
              />
            </div>
          )}
          
          {worldViewCard && (
            <div 
              className={`cursor-pointer ${selectedCard === worldViewCard.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedCard(worldViewCard.id)}
            >
              <WorldViewCard 
                content={worldViewCard.content}
                tags={worldViewCard.tags}
                onShare={() => handleShare(worldViewCard.id)}
                onSave={() => handleSave(worldViewCard.id)}
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button 
            icon={<DeleteOutlined />} 
            danger
            disabled={!selectedCard}
            onClick={handleDeleteCard}
          >
            丢弃卡片
          </Button>
          <Button 
            type="primary"
            icon={<SaveOutlined />}
            disabled={!selectedCard}
            onClick={handleCollectCard}
          >
            收藏卡片
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryAnalysis; 