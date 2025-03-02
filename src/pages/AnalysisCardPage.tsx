import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Input, Space, Divider, message, Avatar, Row, Col, Tooltip, Select } from 'antd';
import { EditOutlined, ShareAltOutlined, SaveOutlined, CloseOutlined, PlusOutlined, UserOutlined, ExportOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { analysisCardService, characterService } from '../api/services';
import { AnalysisCard, Character } from '../types';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// 预设的卡片颜色选项
const cardColors = [
  '#e6f7ff', // 浅蓝
  '#fff7e6', // 浅橙
  '#f6ffed', // 浅绿
  '#fff0f6', // 浅粉
  '#f9f0ff', // 浅紫
  '#e6fffb', // 浅青
  '#fffbe6'  // 浅黄
];

const AnalysisCardPage: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [analysisCards, setAnalysisCards] = useState<AnalysisCard[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [newCardContent, setNewCardContent] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(cardColors[0]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [unlockingCharacter, setUnlockingCharacter] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);

  const story = location.state?.story || null;
  const storyHistory = location.state?.storyHistory || [];

  // 检查用户是否已登录
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // 如果没有故事ID或故事数据，重定向到故事列表
    if (!storyId && !story) {
      navigate('/stories');
      return;
    }

    // 加载分析卡片和角色
    loadData();
  }, [isAuthenticated, storyId, story]);

  const loadData = async () => {
    setLoading(true);
    try {
      // 获取分析卡片
      const cardsResponse = await analysisCardService.getAnalysisCards(Number(storyId) || story?.id);
      setAnalysisCards(cardsResponse.data);

      // 获取角色列表
      const charactersResponse = await characterService.getCharacters();
      setCharacters(charactersResponse.data);

      setLoading(false);
    } catch (error) {
      console.error('加载数据失败', error);
      message.error('加载数据失败，请重试');
      setLoading(false);
    }
  };

  const handleCreateCard = async () => {
    if (!newCardContent.trim()) {
      message.warning('请输入分析内容');
      return;
    }

    setIsCreating(true);
    try {
      const response = await analysisCardService.createAnalysisCard(
        Number(storyId) || story?.id,
        newCardContent
      );
      
      // 添加新卡片到列表
      const newCard = {
        ...response.data,
        color: selectedColor
      };
      setAnalysisCards([...analysisCards, newCard]);
      
      // 重置表单
      setNewCardContent('');
      setSelectedColor(cardColors[0]);
      setIsCreating(false);
      message.success('分析卡片创建成功');
    } catch (error) {
      console.error('创建分析卡片失败', error);
      message.error('创建失败，请重试');
      setIsCreating(false);
    }
  };

  const handleUnlockCharacter = async () => {
    if (!selectedCharacter) {
      message.warning('请选择要解锁的角色');
      return;
    }

    setUnlockingCharacter(true);
    try {
      // 在实际项目中，这里应该调用API解锁角色
      // 模拟API调用成功
      setTimeout(() => {
        // 更新角色列表中的解锁状态
        const updatedCharacters = characters.map(character => {
          if (character.id === selectedCharacter) {
            return { ...character, isLocked: false };
          }
          return character;
        });
        setCharacters(updatedCharacters);
        
        setUnlockingCharacter(false);
        setSelectedCharacter(null);
        message.success('角色解锁成功！');
      }, 1500);
    } catch (error) {
      console.error('解锁角色失败', error);
      message.error('解锁失败，请重试');
      setUnlockingCharacter(false);
    }
  };

  const handleShareToSocial = () => {
    // 在实际项目中，这里应该实现社交分享功能
    message.info('分享功能正在开发中');
  };

  const handleBackToStories = () => {
    navigate('/stories');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <Card bordered={false}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          故事分析与角色解锁
        </Title>

        <Divider orientation="left">故事摘要</Divider>
        
        <Card type="inner" style={{ marginBottom: '30px' }}>
          <Title level={4}>{story?.title || '未命名故事'}</Title>
          <Paragraph>
            {story?.introduction || storyHistory[0]?.content || '没有故事内容'}
          </Paragraph>
        </Card>

        <Divider orientation="left">分析卡片</Divider>
        
        <Row gutter={[16, 16]} style={{ marginBottom: '30px' }}>
          {analysisCards.map(card => (
            <Col xs={24} sm={12} key={card.id}>
              <Card
                style={{ 
                  backgroundColor: card.color || '#f0f0f0',
                  borderRadius: '8px'
                }}
                actions={[
                  <Tooltip title="编辑" key="edit">
                    <EditOutlined />
                  </Tooltip>,
                  <Tooltip title="分享" key="share">
                    <ShareAltOutlined onClick={handleShareToSocial} />
                  </Tooltip>
                ]}
              >
                <Paragraph style={{ minHeight: '100px' }}>
                  {card.content}
                </Paragraph>
                <div style={{ 
                  textAlign: 'right', 
                  fontSize: '0.8em', 
                  color: 'rgba(0,0,0,0.45)' 
                }}>
                  {new Date(card.createdAt).toLocaleDateString()}
                </div>
              </Card>
            </Col>
          ))}
          
          {/* 添加新卡片表单 */}
          <Col xs={24} sm={12}>
            <Card
              style={{ 
                backgroundColor: selectedColor,
                borderRadius: '8px',
                height: '100%'
              }}
            >
              <TextArea
                rows={4}
                placeholder="写下你对这个故事的分析或感想..."
                value={newCardContent}
                onChange={(e) => setNewCardContent(e.target.value)}
                style={{ 
                  backgroundColor: 'transparent',
                  border: 'none',
                  marginBottom: '15px'
                }}
              />
              
              <div style={{ marginBottom: '15px' }}>
                <Text strong style={{ display: 'block', marginBottom: '5px' }}>选择卡片颜色:</Text>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {cardColors.map(color => (
                    <div
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: color,
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: selectedColor === color ? '2px solid #1890ff' : '1px solid #d9d9d9'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                  icon={<CloseOutlined />} 
                  onClick={() => {
                    setNewCardContent('');
                    setSelectedColor(cardColors[0]);
                  }}
                >
                  取消
                </Button>
                <Button 
                  type="primary" 
                  icon={<SaveOutlined />} 
                  onClick={handleCreateCard}
                  loading={isCreating}
                  disabled={!newCardContent.trim()}
                >
                  保存
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        <Divider orientation="left">角色解锁</Divider>
        
        <Row gutter={[16, 16]} style={{ marginBottom: '30px' }}>
          {characters.map(character => (
            <Col xs={12} sm={8} md={6} key={character.id}>
              <Card
                style={{ textAlign: 'center' }}
                bodyStyle={{ padding: '12px' }}
                hoverable
              >
                <Avatar 
                  size={64} 
                  src={character.avatar}
                  icon={<UserOutlined />}
                  style={{ 
                    filter: character.isLocked ? 'grayscale(100%)' : 'none',
                    opacity: character.isLocked ? 0.6 : 1
                  }}
                />
                <Title level={5} style={{ marginTop: '8px', marginBottom: '0' }}>
                  {character.name}
                  {character.isLocked && (
                    <span style={{ marginLeft: '5px', color: '#999' }}>🔒</span>
                  )}
                </Title>
                <Paragraph 
                  ellipsis={{ rows: 2 }} 
                  style={{ fontSize: '12px', color: '#666' }}
                >
                  {character.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
        
        <Card type="inner" style={{ marginBottom: '30px' }}>
          <Title level={5}>选择要解锁的角色</Title>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Select
              placeholder="选择角色"
              style={{ width: '100%' }}
              value={selectedCharacter}
              onChange={setSelectedCharacter}
            >
              {characters.filter(c => c.isLocked).map(character => (
                <Option key={character.id} value={character.id}>
                  {character.name}
                </Option>
              ))}
            </Select>
            <Button 
              type="primary" 
              onClick={handleUnlockCharacter}
              loading={unlockingCharacter}
              disabled={!selectedCharacter}
            >
              解锁角色
            </Button>
          </div>
          <Paragraph style={{ marginTop: '10px', fontSize: '12px', color: '#888' }}>
            注：从您的故事中解锁一个角色后，您可以在自由对话模式中与该角色互动。
          </Paragraph>
        </Card>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleBackToStories}>
            返回故事列表
          </Button>
          <Button type="primary" icon={<ShareAltOutlined />} onClick={handleShareToSocial}>
            分享到社交平台
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisCardPage; 