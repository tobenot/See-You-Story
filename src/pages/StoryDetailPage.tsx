import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, Button, Card, Space, Spin, 
  Row, Col, Tabs, Modal, Input, Result, Alert 
} from 'antd';
import { 
  ArrowLeftOutlined, FileTextOutlined, 
  UserOutlined, ExclamationCircleOutlined, PlusOutlined 
} from '@ant-design/icons';
import { useStory } from '../hooks/useStory';
import { useAuth } from '../hooks/useAuth';
import AnalysisCardComponent from '../components/AnalysisCard';
import CharacterCard from '../components/CharacterCard';
import { Character } from '../types';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { confirm } = Modal;

const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentStory, analysisCards, characters, isLoading, freeStoriesLeft, createAnalysisCard } = useStory();
  const { isAuthenticated } = useAuth();
  const [analysisText, setAnalysisText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  // 模拟字符选择相关状态
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!currentStory || isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  const handleGoBack = () => {
    navigate('/stories');
  };

  const handleGenerateAnalysis = async () => {
    if (freeStoriesLeft <= 0) {
      // 显示充值提示
      confirm({
        title: '免费次数已用完',
        icon: <ExclamationCircleOutlined />,
        content: '您的免费分析次数已用完，请升级订阅以继续使用。',
        onOk() {
          navigate('/subscription');
        },
        okText: '前往订阅',
        cancelText: '取消'
      });
      return;
    }

    try {
      setIsGenerating(true);
      // 这里应该调用AI生成分析的逻辑，然后创建分析卡片
      // 这里模拟一个延迟来模拟AI生成过程
      setTimeout(async () => {
        const generatedAnalysis = "这个故事展现了主角面对挑战时的成长过程，反映了人性在困境中的多样化反应。";
        await createAnalysisCard(generatedAnalysis);
        setAnalysisText('');
        setIsGenerating(false);
        // 切换到分析卡片标签
        setActiveTab('2');
      }, 2000);
    } catch (error) {
      console.error('生成分析失败', error);
      setIsGenerating(false);
    }
  };

  const handleCharacterClick = (character: Character) => {
    if (character.isLocked) {
      // 显示角色锁定提示
      confirm({
        title: '角色已锁定',
        icon: <ExclamationCircleOutlined />,
        content: '这个角色需要订阅才能解锁。解锁后可以无限次与该角色讨论分析故事。',
        onOk() {
          navigate('/subscription');
        },
        okText: '前往订阅',
        cancelText: '取消'
      });
    } else {
      setSelectedCharacter(character);
      // 这里可以导航到角色对话页面，或者打开对话模态框
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={handleGoBack}
        style={{ marginBottom: 16 }}
      >
        返回故事列表
      </Button>

      <Card style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <div style={{ width: '100%', marginBottom: 16 }}>
              {currentStory.coverImage ? (
                <img 
                  src={currentStory.coverImage} 
                  alt={currentStory.title} 
                  style={{ 
                    width: '100%', 
                    borderRadius: 8,
                    maxHeight: 300,
                    objectFit: 'cover'
                  }} 
                />
              ) : (
                <div 
                  style={{ 
                    width: '100%', 
                    height: 200, 
                    background: '#f0f0f0', 
                    borderRadius: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <FileTextOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
                </div>
              )}
            </div>
          </Col>
          <Col xs={24} md={16}>
            <Title level={2}>{currentStory.title}</Title>
            <Paragraph>{currentStory.description}</Paragraph>
            
            {freeStoriesLeft > 0 ? (
              <Alert
                message={`您还有 ${freeStoriesLeft} 次免费分析机会`}
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            ) : (
              <Alert
                message="您的免费分析次数已用完，请升级订阅以继续使用"
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}
            
            <Space>
              <Button 
                type="primary" 
                onClick={() => setActiveTab('3')}
              >
                与角色讨论
              </Button>
              <Button 
                onClick={() => setActiveTab('1')}
              >
                生成分析
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="生成故事分析" key="1">
          <Card>
            <Title level={4}>创建分析卡片</Title>
            <Paragraph>
              AI将分析这个故事并生成分析卡片，帮助你深入理解故事内容和主题。
            </Paragraph>
            
            <div style={{ marginBottom: 16 }}>
              <TextArea
                rows={4}
                placeholder="可以输入你对这个故事的想法或问题（可选）"
                value={analysisText}
                onChange={(e) => setAnalysisText(e.target.value)}
              />
            </div>
            
            <Button 
              type="primary" 
              loading={isGenerating}
              onClick={handleGenerateAnalysis}
              disabled={freeStoriesLeft <= 0}
            >
              {isGenerating ? '正在分析...' : '生成分析'}
            </Button>
            
            {freeStoriesLeft <= 0 && (
              <Button 
                type="link" 
                icon={<PlusOutlined />}
                onClick={() => navigate('/subscription')}
                style={{ marginLeft: 8 }}
              >
                升级订阅获取更多次数
              </Button>
            )}
          </Card>
        </TabPane>
        
        <TabPane tab="分析卡片" key="2">
          {analysisCards.length > 0 ? (
            <div>
              {analysisCards.map((card) => (
                <AnalysisCardComponent key={card.id} card={card} />
              ))}
            </div>
          ) : (
            <Result
              status="info"
              title="暂无分析卡片"
              subTitle="点击生成分析标签创建您的第一个分析卡片"
              extra={
                <Button type="primary" onClick={() => setActiveTab('1')}>
                  去创建
                </Button>
              }
            />
          )}
        </TabPane>
        
        <TabPane tab="角色解析" key="3">
          <Row gutter={[16, 16]}>
            {characters.map((character) => (
              <Col key={character.id} xs={24} sm={12} md={8} lg={6}>
                <CharacterCard 
                  character={character} 
                  onClick={handleCharacterClick} 
                />
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default StoryDetailPage; 