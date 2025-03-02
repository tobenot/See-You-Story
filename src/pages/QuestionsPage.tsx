import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Radio, Input, Space, Divider, message } from 'antd';
import { aiService } from '../api/services';
import { useAuth } from '../hooks/useAuth';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface Question {
  id: number;
  text: string;
  description: string;
  placeholder?: string;
}

const standardQuestions: Question[] = [
  {
    id: 1,
    text: "此刻展现在你心里最深的情感是什么颜色？",
    description: "消融色调造就思考领域（如此或许会引起内心深处的颜色触发云）",
    placeholder: "描述你所感受到的颜色和情绪..."
  },
  {
    id: 2,
    text: "如果把你此刻的处境比作一个空间，最为浮现的三个事物是什么？",
    description: "构建故事场景（调度的木质书架/柔软5分钟的程序/手巾图像）",
    placeholder: "描述你想象中的场景和物品..."
  },
  {
    id: 3,
    text: "你正在对我的隐形对手有什么转折？",
    description: "塑造反派角色（含各种时间的影子/重叠记忆的世界）",
    placeholder: "描述你想象中的对手或障碍..."
  },
  {
    id: 4,
    text: "如果这一件物品代表你此刻的状态，它会如何看待？",
    description: "创造核心人设（探索生长的意象/永远不死的童心）",
    placeholder: "描述这个物品及其视角..."
  },
  {
    id: 5,
    text: "最近半个错问让你变得情绪情感可能改变？",
    description: "设置剧情走向（最能时期他人的领悟/行为里落落的根叶变老）",
    placeholder: "描述近期的转变或感受..."
  }
];

const QuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [loading, setLoading] = useState<boolean>(false);

  // 如果用户未登录，重定向到登录页面
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({
      ...answers,
      [currentQuestion]: e.target.value
    });
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      message.warning('请回答当前问题');
      return;
    }

    if (currentQuestion < standardQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitAllAnswers();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitAllAnswers = async () => {
    setLoading(true);
    try {
      // 在实际项目中，这里应该调用API将答案提交到后端
      // 这里模拟API调用
      // const response = await aiService.submitQuestionAnswers(answers);
      
      // 模拟处理成功
      setTimeout(() => {
        setLoading(false);
        // 提交成功后导航到故事生成页面
        navigate('/story-generation', { 
          state: { answers } 
        });
      }, 1500);
    } catch (error) {
      console.error('提交答案失败', error);
      message.error('提交失败，请重试');
      setLoading(false);
    }
  };

  const currentQuestionData = standardQuestions[currentQuestion];

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px' }}>
      <Card bordered={false}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          故事标签与问答
        </Title>
        
        <div style={{ marginBottom: '30px' }}>
          <Title level={4}>进度: {currentQuestion + 1}/{standardQuestions.length}</Title>
          <div style={{ 
            height: '10px', 
            background: '#f0f0f0', 
            borderRadius: '5px', 
            overflow: 'hidden' 
          }}>
            <div style={{ 
              height: '100%', 
              width: `${((currentQuestion + 1) / standardQuestions.length) * 100}%`, 
              background: '#1890ff' 
            }} />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <Title level={3}>{currentQuestion + 1}. {currentQuestionData.text}</Title>
          <Paragraph type="secondary">
            → {currentQuestionData.description}
          </Paragraph>
          <TextArea
            rows={6}
            placeholder={currentQuestionData.placeholder}
            value={answers[currentQuestion] || ''}
            onChange={handleAnswerChange}
            style={{ marginTop: '15px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            上一题
          </Button>
          <Button 
            type="primary" 
            onClick={handleNext}
            loading={loading && currentQuestion === standardQuestions.length - 1}
          >
            {currentQuestion < standardQuestions.length - 1 ? '下一题' : '提交并生成故事'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuestionsPage; 