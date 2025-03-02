import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Radio, Input, message } from 'antd';
import { 
  aiService, 
  AnswerSubmitRequest, 
  StoryGenerateRequest, 
  StoryResponse
} from '../api/services';
import { useAuth } from '../hooks/useAuth';

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
  const [genre, setGenre] = useState<string>("冒险"); // 默认故事类型
  const [style, setStyle] = useState<string>("叙事性"); // 默认故事风格
  const [worldView, setWorldView] = useState<string>("奇幻"); // 默认世界观
  const [abandonGeneration, setAbandonGeneration] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

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

    // 将当前问题标记为已回答
    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
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
      // 根据后端API格式调整请求
      const submitRequest: AnswerSubmitRequest = {
        answers: answers
      };
      
      // 1. 首先提交问题答案
      await aiService.submitQuestionAnswers(submitRequest);
      
      // 2. 然后调用故事生成API
      const storyRequest: StoryGenerateRequest = {
        answers: answers,
        genre: genre,
        style: style,
        worldView: worldView
      };
      
      const storyResponse = await aiService.generateStory(storyRequest);
      const storyData: StoryResponse = storyResponse.data;
      
      setLoading(false);
      
      // 3. 提交成功后导航到故事生成页面，并传递数据
      navigate('/story-generation', { 
        state: { 
          storyId: storyData.storyId,
          storyContent: storyData.storyContent,
          elements: storyData.elements,
          options: storyData.options,
          metadata: storyData.metadata
        } 
      });
    } catch (error) {
      console.error('提交答案失败', error);
      message.error('提交失败，请重试');
      setLoading(false);
    }
  };

  const handleQuestionSelect = (index: number) => {
    // 只允许选择已回答的问题或下一个待回答的问题
    if (answeredQuestions.includes(index) || index === answeredQuestions.length) {
      setCurrentQuestion(index);
    } else {
      message.info('请按顺序回答问题');
    }
  };

  const isQuestionAnswered = (index: number) => {
    return answeredQuestions.includes(index);
  };

  const isQuestionAccessible = (index: number) => {
    return isQuestionAnswered(index) || index === answeredQuestions.length;
  };

  const currentQuestionData = standardQuestions[currentQuestion];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 左侧问题导航区域 - 增加宽度 */}
      <div className="w-1/3 bg-white shadow-md overflow-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-700">当前世界：个人回答生成（勾选使用认证状态）</h3>
        </div>
        <div className="py-2">
          {standardQuestions.map((question, index) => (
            <div 
              key={question.id}
              className={`p-4 mb-2 mx-2 rounded-lg transition-all duration-300 cursor-pointer 
                ${index === currentQuestion ? 'bg-gray-200 shadow-md' : 'bg-white'} 
                ${isQuestionAccessible(index) ? 'opacity-100 hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}
                ${isQuestionAnswered(index) ? 'border-l-4 border-green-500' : ''}
              `}
              onClick={() => handleQuestionSelect(index)}
            >
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 
                  ${index === currentQuestion ? 'bg-gray-700 text-white' : 
                    isQuestionAnswered(index) ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                  <span className="text-sm font-medium">Q{index + 1}</span>
                </div>
                <span className={`text-lg ${index === currentQuestion ? 'font-medium' : 'text-gray-600'}`}>
                  Q{index + 1}
                </span>
              </div>
              {isQuestionAccessible(index) && (
                <p className="text-sm text-gray-500 ml-11 line-clamp-2">{question.text}</p>
              )}
              {isQuestionAnswered(index) && (
                <div className="ml-11 mt-2 text-xs text-gray-400 italic">
                  已回答: {answers[index]?.substring(0, 50)}...
                </div>
              )}
            </div>
          ))}
          <div className="p-4 mx-2 mb-2 rounded-lg bg-white">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                <span className="text-sm font-medium text-gray-700">Q5</span>
              </div>
              <span className="text-lg text-gray-600">问题详细描述</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-1/3">
          <div className="flex justify-between p-4 border-t border-gray-200">
            <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm">开始演绎</button>
            <button className="border border-gray-300 px-4 py-2 rounded text-sm">结束演绎</button>
          </div>
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
          {/* 放弃生成选项 */}
          <div className="mb-6">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={abandonGeneration}
                onChange={(e) => setAbandonGeneration(e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">放弃内容生成（三星互行结给出退款）</span>
            </label>
          </div>

          {/* 问题标题和导航 */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Q{currentQuestion + 1}</h2>
            <div className="text-sm text-gray-500">
              {currentQuestion + 1} / {standardQuestions.length}
            </div>
          </div>

          {/* 问题内容 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">{currentQuestionData.text}</h3>
            <p className="text-gray-600 mb-4">{currentQuestionData.description}</p>
            <TextArea
              rows={6}
              placeholder={currentQuestionData.placeholder}
              value={answers[currentQuestion] || ''}
              onChange={handleAnswerChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* 导航按钮 */}
          <div className="flex justify-between">
            <button 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded flex items-center ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              上一题
            </button>
            <button 
              onClick={handleNext}
              className={`px-4 py-2 rounded flex items-center ${answers[currentQuestion] ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion < standardQuestions.length - 1 ? '下一题' : '完成'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage; 