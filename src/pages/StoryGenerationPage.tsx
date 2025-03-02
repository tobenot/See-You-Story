import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Spin, message, Space, Divider } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { aiService } from '../api/services';

const { Title, Paragraph, Text } = Typography;

// 模拟故事生成过程中的状态
enum GenerationStatus {
  EXTRACTING_ELEMENTS = 'EXTRACTING_ELEMENTS',
  CREATING_CHARACTERS = 'CREATING_CHARACTERS',
  WRITING_INTRODUCTION = 'WRITING_INTRODUCTION',
  COMPLETE = 'COMPLETE',
}

interface StoryElements {
  theme?: string;
  setting?: string;
  characters?: {
    protagonist?: string;
    antagonist?: string;
    supporting?: string[];
  };
  conflict?: string;
  tone?: string;
}

interface GeneratedStory {
  id: number;
  title: string;
  introduction: string;
  elements: StoryElements;
}

const StoryGenerationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.EXTRACTING_ELEMENTS);
  const [progress, setProgress] = useState<number>(0);
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 获取从问题页面传来的答案
  const answers = location.state?.answers || {};

  // 检查用户是否已登录
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // 检查是否有答案数据
  useEffect(() => {
    if (!location.state?.answers) {
      navigate('/questions');
      return;
    }

    // 模拟故事生成过程
    simulateStoryGeneration();
  }, [location.state]);

  const simulateStoryGeneration = () => {
    // 从0开始进度条
    setProgress(0);
    setLoading(true);
    
    // 元素提取阶段
    setTimeout(() => {
      setStatus(GenerationStatus.EXTRACTING_ELEMENTS);
      setProgress(25);
      
      // 角色创建阶段
      setTimeout(() => {
        setStatus(GenerationStatus.CREATING_CHARACTERS);
        setProgress(50);
        
        // 写入引言阶段
        setTimeout(() => {
          setStatus(GenerationStatus.WRITING_INTRODUCTION);
          setProgress(75);
          
          // 完成阶段
          setTimeout(() => {
            setStatus(GenerationStatus.COMPLETE);
            setProgress(100);
            setLoading(false);
            
            // 模拟生成的故事
            const generatedStory: GeneratedStory = {
              id: Math.floor(Math.random() * 1000),
              title: '停滞日历与地下交响曲',
              introduction: 
                '雾蓝色的晨光渗过生锈的门缝，艾琳第237次翻下日历——纸张永远停在三月十三，地下室的湿气嘶哑数据键盘，荧光屏重新标量复制随机的部件。"请搜之方案了"的机械音第16次响起，地板故障的黑暗里，某处传来破碎的《C弦上的咏叹调》，琴身上的灰尘，静静泄露已断日历的火人...',
              elements: {
                theme: '时间停滞与内心挣扎',
                setting: '未来废墟与地下室',
                characters: {
                  protagonist: '艾琳 - 被时间困住的程序员',
                  antagonist: '系统本身 - 代表着循环与规则的枷锁',
                  supporting: ['记忆中的音乐家', '数据碎片形成的幻影']
                },
                conflict: '突破循环与接受现实之间的挣扎',
                tone: '哲学性与后现代感'
              }
            };
            
            setStory(generatedStory);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const handleContinue = () => {
    if (story) {
      navigate(`/story-interaction/${story.id}`, { state: { story } });
    }
  };

  const handleRestart = () => {
    navigate('/questions');
  };

  const renderStatusText = () => {
    switch (status) {
      case GenerationStatus.EXTRACTING_ELEMENTS:
        return '正在从您的回答中提取故事核心元素...';
      case GenerationStatus.CREATING_CHARACTERS:
        return '正在创建故事角色与世界观...';
      case GenerationStatus.WRITING_INTRODUCTION:
        return '正在撰写故事开头...';
      case GenerationStatus.COMPLETE:
        return '故事创作完成！';
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <Card bordered={false}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          故事生成
        </Title>
        
        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            height: '10px', 
            background: '#f0f0f0', 
            borderRadius: '5px', 
            overflow: 'hidden',
            marginBottom: '10px'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${progress}%`, 
              background: '#1890ff',
              transition: 'width 0.5s ease-in-out'
            }} />
          </div>
          <Text>{renderStatusText()}</Text>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <Spin size="large" />
            <Paragraph style={{ marginTop: '20px' }}>
              正在创作您的专属故事，请稍候...
            </Paragraph>
          </div>
        ) : (
          <div>
            <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
              {story?.title}
            </Title>
            
            <Card type="inner" style={{ marginBottom: '20px' }}>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                {story?.introduction}
              </Paragraph>
            </Card>
            
            <Divider>故事核心元素</Divider>
            
            <div style={{ marginBottom: '30px' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>主题：</Text>
                <Text>{story?.elements.theme}</Text>
                
                <Text strong style={{ marginTop: '10px' }}>场景：</Text>
                <Text>{story?.elements.setting}</Text>
                
                <Text strong style={{ marginTop: '10px' }}>主角：</Text>
                <Text>{story?.elements.characters?.protagonist}</Text>
                
                <Text strong style={{ marginTop: '10px' }}>对手：</Text>
                <Text>{story?.elements.characters?.antagonist}</Text>
                
                <Text strong style={{ marginTop: '10px' }}>冲突：</Text>
                <Text>{story?.elements.conflict}</Text>
                
                <Text strong style={{ marginTop: '10px' }}>基调：</Text>
                <Text>{story?.elements.tone}</Text>
              </Space>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleRestart}>
                重新开始
              </Button>
              <Button type="primary" onClick={handleContinue}>
                继续故事
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StoryGenerationPage; 