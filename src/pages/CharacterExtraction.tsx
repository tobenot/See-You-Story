import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spin, message, Card, Avatar, Modal } from 'antd';
import { UserOutlined, SyncOutlined, CrownOutlined, BookOutlined } from '@ant-design/icons';
import * as storyApi from '../api/story';
import Layout from '../components/Layout';
import { openFeedback } from '../utils/feedback';

interface Character {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  personality: string;
  tags?: string[];
}

const CharacterExtraction: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storyId } = location.state as { storyId: string } || { storyId: '' };
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [maxRefreshCount, setMaxRefreshCount] = useState(3);
  // 未来将使用，暂时禁用警告
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [limitModalVisible, setLimitModalVisible] = useState(false);
  
  useEffect(() => {
    if (!storyId) {
      message.error('故事ID不存在，请重新开始');
      navigate('/');
      return;
    }

    const fetchCharacters = async () => {
      try {
        setLoading(true);
        
        let characterData;
        
        try {
          // 调用API提取角色
          const response = await storyApi.extractStoryCharacters(storyId);
          characterData = response.data;
          
          // 检查用户订阅状态
          const userLimits = await fetch('/api/user/limits').then(res => res.json());
          setIsSubscribed(userLimits.isSubscribed);
          setMaxRefreshCount(userLimits.characterRefreshLimit || 3);
        } catch (apiError) {
          message.warning('API调用失败，使用模拟数据');
          // 使用模拟数据
          characterData = {
            characters: [
              {
                id: 'character-1',
                name: '神秘老者',
                description: '一位拥有深厚知识的老者，他如平知道关于这个世界的许多秘密，并引导主角上冒险之旅。',
                imageUrl: '',
                personality: '智慧、神秘、引导',
                tags: ['引导者', '智者']
              },
              {
                id: 'character-2',
                name: '主角',
                description: '一个刚刚发现特殊能力的年轻人，能够看到他人无法察觉的能量流动，面临着重要的选择。',
                imageUrl: '',
                personality: '勇敢、好奇、特殊能力',
                tags: ['勇敢', '好奇', '特殊能力']
              }
            ]
          };
          setIsSubscribed(false);
          setMaxRefreshCount(3);
        }
        
        setCharacters(characterData.characters);
        setLoading(false);
      } catch (error) {
        message.error('获取角色失败');
        message.error('获取角色失败，请稍后重试');
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [storyId, navigate]);

  const handleRefreshCharacters = async () => {
    if (isSubscribed) {
      tryRefreshCharacters();
    } else if (refreshCount < maxRefreshCount) {
      tryRefreshCharacters();
    } else {
      setShowSubscriptionModal(true);
    }
  };
  
  const tryRefreshCharacters = async () => {
    try {
      setRefreshing(true);
      const response = await storyApi.refreshStoryCharacters(storyId);
      setCharacters(response.data.characters);
      if (!isSubscribed) {
        setRefreshCount(prevCount => prevCount + 1);
      }
      message.success('角色刷新成功');
    } catch (error) {
      message.error('刷新角色失败');
      message.error('刷新角色失败，请稍后重试');
    } finally {
      setRefreshing(false);
    }
  };

  // 未来将使用，暂时禁用警告
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubscribe = () => {
    // 这里应该跳转到订阅页面或者打开订阅对话框
    setShowSubscriptionModal(false);
    message.info('订阅功能即将上线');
  };

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  const handleFeedback = () => {
    openFeedback();
  };

  const handleSaveCharacters = async () => {
    try {
      // 这里应该调用保存角色的API
      message.success('角色保存成功');
      navigate('/profile');
    } catch (error) {
      message.error('保存角色失败');
      message.error('保存角色失败，请稍后重试');
    }
  };

  const canRefresh = !refreshing && (isSubscribed || refreshCount < maxRefreshCount);

  if (loading) {
    return (
      <Layout>
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
          
          <h2 className="text-2xl font-bold mb-6">角色提取</h2>
          
          <div className="flex flex-col items-center justify-center my-16">
            <Spin size="large" />
            <p className="mt-4 text-gray-600">正在分析...</p>
            <p className="text-gray-500 mt-2">我们正在从您的故事中提取关键角色</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">角色提取</h1>
          <div className="flex items-center space-x-2">
            <Button icon={<SyncOutlined />} onClick={handleRefreshCharacters} disabled={refreshing || !canRefresh}>
              刷新角色
            </Button>
            <Button icon={<BookOutlined />} onClick={() => navigate('/')}>
              返回首页
            </Button>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">角色提取</h2>
        
        <div className="mb-4 text-gray-700">
          <p>我们从您的故事中提取了这些角色，这些角色将被保存到您的个人资料中，您可以随时与他们聊天。</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {characters.map(character => (
            <Card key={character.id} className="border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <Avatar 
                  size={64} 
                  icon={<UserOutlined />} 
                  src={character.imageUrl}
                  className="mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">{character.name}</h3>
                  <p className="text-gray-500 mb-2">{character.personality}</p>
                  <p className="text-gray-700 mb-2">{character.description}</p>
                  {character.tags && character.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {character.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6 text-center">
            {!isSubscribed && (
              <p className="text-gray-500 mb-2">
                免费用户每天可刷新角色{maxRefreshCount}次，已使用{refreshCount}次
              </p>
            )}
            <Button 
              icon={<SyncOutlined spin={refreshing} />} 
              onClick={handleRefreshCharacters}
              disabled={refreshing}
              className="mb-4"
            >
              刷新角色 {!isSubscribed && refreshCount >= maxRefreshCount && <CrownOutlined className="ml-1 text-yellow-500" />}
            </Button>
          </div>
          
          <Button type="primary" size="large" onClick={handleSaveCharacters}>
            保存角色
          </Button>
        </div>
        
        <Modal
          title="提示"
          open={limitModalVisible}
          onOk={() => navigate('/membership')}
          onCancel={() => setLimitModalVisible(false)}
          okText="升级会员"
          cancelText="取消"
        >
          <p>您今日的角色刷新次数已用完，升级会员可获得更多刷新次数。</p>
        </Modal>
      </div>
    </Layout>
  );
};

export default CharacterExtraction; 