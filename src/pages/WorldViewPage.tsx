import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Input, Tabs, List, Tag, Avatar, message, Tooltip, Empty, Space, Radio, Divider } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined, HeartOutlined, StarOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { aiService, characterService, storyService } from '../api/services';
import { Character, ChatMessage } from '../types';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

// 模拟的世界观标签
const worldViewTags = [
  { key: 'all', name: '全部' },
  { key: 'modern', name: '现像光' },
  { key: 'fantasy', name: '奇幻' },
  { key: 'scifi', name: '科幻' },
  { key: 'romance', name: '言情' },
  { key: 'mystery', name: '悬疑' },
  { key: 'historical', name: '历史' },
  { key: 'horror', name: '恐怖' },
];

// 模拟的故事开头数据
const storyBeginnings = [
  {
    id: 1,
    title: '未知的来电',
    preview: '午夜十二点，手机突然响起。屏幕上显示"未知号码"。犹豫片刻后，我按下了接听键...',
    tags: ['现像光', '悬疑'],
    popularity: 256
  },
  {
    id: 2,
    title: '废土之旅',
    preview: '核战后的第七年，辐射终于降到了安全水平。我背起行囊，第一次踏出了地下掩体...',
    tags: ['科幻', '冒险'],
    popularity: 189
  },
  {
    id: 3,
    title: '玉兰树下',
    preview: '奶奶的葬礼上，老宅后院的玉兰树开出了不合时节的花。风吹过，花瓣纷纷扬扬落在我的肩头，恍惚间，我似乎听见了熟悉的呼唤...',
    tags: ['言情', '奇幻'],
    popularity: 312
  },
  {
    id: 4,
    title: '皇城密令',
    preview: '宫门大开，一队禁军疾步而入。为首的统领手持圣旨，直奔我的院落而来...',
    tags: ['历史', '古代'],
    popularity: 178
  },
  {
    id: 5,
    title: '深海迷航',
    preview: '探测器发出的警报声划破了潜艇的宁静。雷达上，一个巨大的不明物体正在接近...',
    tags: ['科幻', '恐怖'],
    popularity: 205
  },
];

interface DialogMessage {
  id: string;
  role: 'user' | 'character';
  content: string;
  timestamp: Date;
}

const WorldViewPage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(characterId ? 'character' : 'worldview');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [filteredStories, setFilteredStories] = useState(storyBeginnings);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [dialogMessages, setDialogMessages] = useState<DialogMessage[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // 检查用户是否已登录
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    loadData();
    
    // 如果URL中有characterId，自动切换到角色对话标签
    if (characterId) {
      setActiveTab('character');
    }
  }, [isAuthenticated, characterId]);

  // 当消息列表更新时，滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [dialogMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // 获取角色列表
      const charactersResponse = await characterService.getCharacters();
      const unlockedCharacters = charactersResponse.data.filter(
        (character: Character) => !character.isLocked
      );
      setCharacters(unlockedCharacters);
      
      // 如果URL中有characterId，选中对应角色
      if (characterId) {
        const character = charactersResponse.data.find(
          (c: Character) => c.id === Number(characterId)
        );
        if (character && !character.isLocked) {
          setSelectedCharacter(character);
          // 初始化对话
          initializeDialog(character);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('加载数据失败', error);
      message.error('加载数据失败，请重试');
      setLoading(false);
    }
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    if (tag === 'all') {
      setFilteredStories(storyBeginnings);
    } else {
      const filtered = storyBeginnings.filter(story => 
        story.tags.some(t => t.toLowerCase() === tag)
      );
      setFilteredStories(filtered);
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    initializeDialog(character);
  };

  const initializeDialog = (character: Character) => {
    // 初始化对话，添加一条角色的欢迎消息
    const welcomeMessages = [
      `你好，我是${character.name}。很高兴认识你！`,
      `嗨，${user?.username || '冒险者'}！我是${character.name}。今天过得怎么样？`,
      `${user?.username || '你好'}，我是${character.name}。有什么我能帮你的吗？`
    ];
    
    const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    
    setDialogMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'character',
        content: randomWelcome,
        timestamp: new Date()
      }
    ]);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || !selectedCharacter) return;
    
    const userMessage: DialogMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };
    
    setDialogMessages(prev => [...prev, userMessage]);
    setSending(true);
    setUserInput('');
    
    try {
      // 构建对话历史
      const chatHistory: ChatMessage[] = [
        {
          role: 'system' as const,
          content: `你是${selectedCharacter.name}，${selectedCharacter.description}。保持角色特点，对话要自然，富有表现力。`
        },
        ...dialogMessages.map(msg => ({
          role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        })),
        {
          role: 'user' as const,
          content: userInput
        }
      ];
      
      // 在实际项目中，这里应该调用AI服务获取回复
      // 这里模拟AI回复
      setTimeout(() => {
        const characterReplies = [
          `我明白你的想法。作为${selectedCharacter.name}，我认为这是一个值得探索的方向。`,
          `有趣的观点！我们可以一起深入讨论这个话题。`,
          `谢谢分享你的想法。我喜欢从不同角度思考问题。`,
          `这让我想起了一个相关的故事...不过那是另一个时间的讨论了。`,
          `我很欣赏你的思考方式。也许我们能一起展开一个新的冒险？`
        ];
        
        const randomReply = characterReplies[Math.floor(Math.random() * characterReplies.length)];
        
        const characterMessage: DialogMessage = {
          id: `character-${Date.now()}`,
          role: 'character',
          content: randomReply,
          timestamp: new Date()
        };
        
        setDialogMessages(prev => [...prev, characterMessage]);
        setSending(false);
      }, 1500);
    } catch (error) {
      console.error('发送消息失败', error);
      message.error('发送失败，请重试');
      setSending(false);
    }
  };

  const handleStartStory = (storyId: number) => {
    // 导航到问题页面开始新故事
    navigate('/questions');
  };

  // 渲染世界观和故事标签选择界面
  const renderWorldViewTab = () => (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Title level={4}>选择世界观</Title>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {worldViewTags.map(tag => (
            <Tag.CheckableTag
              key={tag.key}
              checked={selectedTag === tag.key}
              onChange={() => handleTagChange(tag.key)}
              style={{ 
                padding: '4px 8px', 
                border: '1px solid #d9d9d9',
                borderRadius: '15px'
              }}
            >
              {tag.name}
            </Tag.CheckableTag>
          ))}
        </div>
      </div>
      
      <List
        itemLayout="vertical"
        dataSource={filteredStories}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <Space key="tags">
                {item.tags.map(tag => (
                  <Tag key={tag} color="blue">{tag}</Tag>
                ))}
              </Space>,
              <Tooltip key="popularity" title="热度">
                <Space>
                  <HeartOutlined />
                  <span>{item.popularity}</span>
                </Space>
              </Tooltip>,
              <Button 
                key="start" 
                type="primary" 
                size="small"
                onClick={() => handleStartStory(item.id)}
              >
                开始创作
              </Button>
            ]}
          >
            <List.Item.Meta
              title={<a onClick={() => handleStartStory(item.id)}>{item.title}</a>}
            />
            <Paragraph 
              ellipsis={{ rows: 2 }}
              style={{ marginBottom: 0 }}
            >
              {item.preview}
            </Paragraph>
          </List.Item>
        )}
      />
    </div>
  );

  // 渲染角色对话界面
  const renderCharacterTab = () => (
    <div style={{ display: 'flex', height: '500px' }}>
      {/* 角色列表 */}
      <div style={{ 
        width: '200px', 
        borderRight: '1px solid #f0f0f0',
        padding: '10px',
        overflow: 'auto'
      }}>
        <Title level={5}>已解锁角色</Title>
        {characters.length > 0 ? (
          <List
            dataSource={characters}
            renderItem={character => (
              <List.Item 
                onClick={() => handleSelectCharacter(character)}
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedCharacter?.id === character.id ? '#f0f7ff' : 'transparent',
                  borderRadius: '4px',
                  padding: '8px'
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      src={character.avatar} 
                      icon={<UserOutlined />}
                      size="large"
                    />
                  }
                  title={character.name}
                  description={
                    <Text ellipsis style={{ fontSize: '12px' }}>
                      {character.description}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty 
            description="还没有解锁角色" 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>
      
      {/* 对话区域 */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {selectedCharacter ? (
          <>
            <div style={{ 
              padding: '10px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Avatar 
                src={selectedCharacter.avatar} 
                icon={<UserOutlined />}
                size="large"
              />
              <div>
                <Text strong>{selectedCharacter.name}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {selectedCharacter.description}
                </Text>
              </div>
            </div>
            
            <div style={{ 
              flex: 1,
              padding: '10px',
              overflow: 'auto',
              backgroundColor: '#f9f9f9'
            }}>
              {dialogMessages.map(message => (
                <div 
                  key={message.id} 
                  style={{
                    display: 'flex',
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '12px'
                  }}
                >
                  {message.role === 'character' && (
                    <Avatar 
                      src={selectedCharacter.avatar} 
                      icon={<RobotOutlined />}
                      style={{ marginRight: '8px', alignSelf: 'flex-end' }}
                    />
                  )}
                  
                  <div style={{
                    backgroundColor: message.role === 'user' ? '#d3eafd' : 'white',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    maxWidth: '70%',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
                    <div style={{ 
                      fontSize: '10px', 
                      color: 'rgba(0,0,0,0.45)',
                      textAlign: message.role === 'user' ? 'right' : 'left',
                      marginTop: '4px'
                    }}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  
                  {message.role === 'user' && (
                    <Avatar 
                      icon={<UserOutlined />}
                      style={{ marginLeft: '8px', alignSelf: 'flex-end', backgroundColor: '#1890ff' }}
                    />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div style={{ 
              padding: '10px',
              borderTop: '1px solid #f0f0f0',
              display: 'flex',
              gap: '10px'
            }}>
              <TextArea
                rows={2}
                placeholder="输入消息..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={sending}
              />
              <Button 
                type="primary" 
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                loading={sending}
                disabled={!userInput.trim() || sending}
              />
            </div>
          </>
        ) : (
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            flexDirection: 'column',
            padding: '20px'
          }}>
            <Empty 
              description="请选择一个角色开始对话"
              style={{ margin: '30px 0' }}
            />
            {characters.length === 0 && (
              <Paragraph type="secondary" style={{ textAlign: 'center' }}>
                你还没有解锁任何角色。<br />
                完成故事创作后，你可以从故事中解锁角色。
                <br /><br />
                <Button 
                  type="primary"
                  onClick={() => navigate('/questions')}
                >
                  开始创作故事
                </Button>
              </Paragraph>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '950px', margin: '20px auto', padding: '0 20px' }}>
      <Card bordered={false}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          故事世界
        </Title>
        
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="世界观与故事标签" key="worldview">
            {renderWorldViewTab()}
          </TabPane>
          <TabPane tab="角色对话" key="character">
            {renderCharacterTab()}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default WorldViewPage; 