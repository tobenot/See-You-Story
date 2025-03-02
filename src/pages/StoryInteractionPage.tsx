import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Radio, Input, Space, Divider, message } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { aiService } from '../api/services';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface StoryOption {
  id: string;
  text: string;
  description?: string;
}

interface StorySegment {
  id: string;
  content: string;
  options?: StoryOption[];
}

// 模拟的故事片段数据
const DEMO_SEGMENTS: { [key: string]: StorySegment } = {
  'intro': {
    id: 'intro',
    content: '雾蓝色的晨光渗过生锈的门缝，艾琳第237次翻下日历——纸张永远停在三月十三，地下室的湿气嘶哑数据键盘，荧光屏重新标量复制随机的部件。"请搜之方案了"的机械音第16次响起，地板故障的黑暗里，某处传来破碎的《C弦上的咏叹调》，琴身上的灰尘，静静泄露已断日历的火人...\n\n艾琳决定：',
    options: [
      { id: 'option1', text: '调查破碎的音乐来源', description: '循着声音走进更深处的黑暗' },
      { id: 'option2', text: '分析数据终端上的讯息', description: '试图理解系统给出的方案内容' },
      { id: 'option3', text: '尝试修复日历', description: '回到时间正常流动之前' }
    ]
  },
  'option1': {
    id: 'option1',
    content: '艾琳循着断续的旋律，沿着铺满灰尘的走廊前进。光线逐渐稀薄，只有偶尔闪烁的应急灯提供微弱的照明。音乐声时断时续，像是一个古老的留声机在播放着记忆中的旋律。\n\n拐过一个堆满废弃设备的转角，艾琳发现了一个半开的门。门内，一个形似人类的轮廓坐在钢琴前，机械的手指在断裂的琴弦上徘徊。这是一个破损的音乐机器人，它抬起头，光学传感器中闪烁着奇异的光芒。\n\n"237次，你又来了，"机器人说道，声音中混合着电流的杂音，"但这次，有些事情变得不同。"\n\n艾琳决定：',
    options: [
      { id: 'option1-1', text: '询问什么变得不同', description: '试图了解这个循环中的新变化' },
      { id: 'option1-2', text: '要求机器人继续演奏', description: '沉浸在音乐中寻找线索' },
      { id: 'option1-3', text: '告诉机器人关于日历的事', description: '分享自己被困在循环中的经历' }
    ]
  },
  'option2': {
    id: 'option2',
    content: '艾琳转向闪烁的终端屏幕，手指在键盘上跳跃。屏幕上的代码像瀑布一样流淌，其中夹杂着系统日志和错误报告。"请搜之方案"的提示不断闪现，似乎系统正在请求某种搜索或决策。\n\n随着艾琳的深入分析，她发现这些数据并非随机生成，而是某种复杂算法的输出。每个循环都在产生微小的变化，就像一个正在学习的系统。\n\n突然，屏幕上出现了一组坐标和一段密码。屏幕上的文字闪烁：「坐标匹配 - 时间节点识别 - 等待确认」\n\n艾琳决定：',
    options: [
      { id: 'option2-1', text: '输入确认命令', description: '接受系统提供的坐标和密码' },
      { id: 'option2-2', text: '尝试修改坐标参数', description: '干预系统的计算过程' },
      { id: 'option2-3', text: '深入研究算法本身', description: '理解系统运行的根本原理' }
    ]
  },
  'option3': {
    id: 'option3',
    content: '艾琳走向墙上那个永远停留在三月十三日的日历。她伸手触碰它，纸面有一种不自然的冰冷感。当她试图翻页时，纸张像是凝固在时间中，纹丝不动。\n\n她回到工作台，找出了一些工具，开始仔细检查日历的机制。在日历背后，她发现了一个小型装置，像是某种时间锁定器。装置上闪烁着微弱的蓝光，上面刻着一行小字："时间校准点 - 请勿调整"\n\n在装置旁边，有三个不同颜色的开关：红色、蓝色和绿色。\n\n艾琳决定：',
    options: [
      { id: 'option3-1', text: '按下红色开关', description: '冒险尝试最危险的选择' },
      { id: 'option3-2', text: '按下蓝色开关', description: '选择看起来与蓝光匹配的选项' },
      { id: 'option3-3', text: '按下绿色开关', description: '选择看似最安全的选项' }
    ]
  },
  // 其他故事分支可以按需添加...
};

const StoryInteractionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentSegment, setCurrentSegment] = useState<StorySegment | null>(null);
  const [storyHistory, setStoryHistory] = useState<StorySegment[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [isInputMode, setIsInputMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const story = location.state?.story || null;

  // 检查用户是否已登录
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // 如果没有故事ID或故事数据，重定向到故事列表
    if (!id && !story) {
      navigate('/stories');
      return;
    }

    // 初始化故事片段
    initializeStory();
  }, [isAuthenticated, id, story]);

  const initializeStory = () => {
    // 使用demo数据初始化第一个片段
    const initialSegment = DEMO_SEGMENTS['intro'];
    setCurrentSegment(initialSegment);
    setStoryHistory([initialSegment]);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleContinue = async () => {
    if (!selectedOption && !isInputMode) {
      message.warning('请选择一个选项或输入自定义内容');
      return;
    }

    setLoading(true);

    try {
      // 在实际项目中，这里应该调用AI服务获取下一个故事片段
      // 这里使用模拟数据
      setTimeout(() => {
        let nextSegment: StorySegment;
        
        if (isInputMode) {
          // 处理用户自定义输入
          // 在实际项目中，这里应该将用户输入发送给AI服务
          // 这里简单模拟一个响应
          nextSegment = {
            id: `custom-${Date.now()}`,
            content: `艾琳决定${userInput}\n\n这个意外的选择似乎打破了某种规律。系统停顿了一下，仿佛在处理这个新的变量。然后，环境开始微妙地变化...\n\n艾琳发现自己来到了一个新的区域，这里的灯光更加明亮，空气中弥漫着一种新鲜感。`,
            options: [
              { id: 'custom-1', text: '探索这个新区域', description: '了解这个变化带来的可能性' },
              { id: 'custom-2', text: '寻找回到原来位置的方法', description: '回到熟悉的环境' },
              { id: 'custom-3', text: '尝试与系统沟通', description: '理解这个变化的本质' }
            ]
          };
          setUserInput('');
          setIsInputMode(false);
        } else {
          // 获取选定选项对应的下一个片段
          nextSegment = DEMO_SEGMENTS[selectedOption];
          setSelectedOption('');
        }

        // 更新当前片段和历史记录
        setCurrentSegment(nextSegment);
        setStoryHistory(prev => [...prev, nextSegment]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('获取下一个故事片段失败', error);
      message.error('加载故事失败，请重试');
      setLoading(false);
    }
  };

  const handleSwitchToInput = () => {
    setIsInputMode(true);
    setSelectedOption('');
  };

  const handleSwitchToOptions = () => {
    setIsInputMode(false);
    setUserInput('');
  };

  const handleFinishStory = () => {
    // 导航到分析卡片页面
    navigate(`/analysis-card/${id}`, { state: { story, storyHistory } });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <Card bordered={false}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          {story?.title || '故事互动'}
        </Title>
        
        <div className="story-content">
          {storyHistory.map((segment, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <Paragraph style={{ 
                fontSize: '16px', 
                lineHeight: '1.8',
                whiteSpace: 'pre-line', // 保留换行符
                textAlign: 'justify'
              }}>
                {segment.content}
              </Paragraph>
              
              {index < storyHistory.length - 1 && (
                <Divider dashed style={{ margin: '15px 0' }} />
              )}
            </div>
          ))}
        </div>
        
        {currentSegment?.options && !isInputMode && (
          <div style={{ marginTop: '30px' }}>
            <Title level={4}>选择下一步</Title>
            <Radio.Group 
              onChange={(e) => handleOptionSelect(e.target.value)} 
              value={selectedOption}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {currentSegment.options.map(option => (
                  <Radio 
                    key={option.id} 
                    value={option.id}
                    style={{ 
                      height: 'auto',
                      marginBottom: '10px',
                      padding: '10px', 
                      border: '1px solid #f0f0f0',
                      borderRadius: '5px',
                      width: '100%'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{option.text}</div>
                      {option.description && (
                        <div style={{ color: '#888', fontSize: '0.9em' }}>
                          {option.description}
                        </div>
                      )}
                    </div>
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
            
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <Button type="link" onClick={handleSwitchToInput}>
                或者自己输入下一步...
              </Button>
            </div>
          </div>
        )}
        
        {isInputMode && (
          <div style={{ marginTop: '30px' }}>
            <Title level={4}>自定义你的选择</Title>
            <TextArea
              rows={4}
              placeholder="描述艾琳接下来的行动..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={{ marginBottom: '15px' }}
            />
            
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <Button type="link" onClick={handleSwitchToOptions}>
                返回预设选项
              </Button>
            </div>
          </div>
        )}
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginTop: '30px'
        }}>
          <Button onClick={() => navigate('/stories')}>
            放弃故事
          </Button>
          <Space>
            <Button onClick={handleFinishStory}>
              结束故事
            </Button>
            <Button 
              type="primary" 
              onClick={handleContinue}
              loading={loading}
              disabled={(!selectedOption && !isInputMode) || (isInputMode && !userInput)}
            >
              继续故事
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default StoryInteractionPage; 