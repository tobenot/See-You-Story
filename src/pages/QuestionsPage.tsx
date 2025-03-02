import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Radio, Input, message, Checkbox } from 'antd';
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
  
  // 计算问题回答的进度百分比
  const progressPercentage = Math.round((answeredQuestions.length / standardQuestions.length) * 100);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 顶部导航栏 */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-sm">当前世界：个人档案生成（初次使用默认状态）</span>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-800 text-white px-3 py-1 rounded text-sm">登陆</button>
          <button className="bg-gray-800 text-white px-3 py-1 rounded text-sm">注册</button>
          <button className="bg-gray-800 text-white px-3 py-1 rounded text-sm">反馈</button>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧问题列表 */}
        <div className="w-96 bg-gray-100 overflow-auto">
          {standardQuestions.map((question, index) => (
            <div 
              key={question.id}
              className={`flex items-center p-4 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} cursor-pointer 
                ${!isQuestionAccessible(index) ? 'opacity-50 cursor-not-allowed' : ''}
                ${currentQuestion === index ? 'border-l-4 border-gray-800' : ''}
                ${isQuestionAnswered(index) ? 'border-l-4 border-green-500' : ''}
              `}
              onClick={() => handleQuestionSelect(index)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 
                ${isQuestionAnswered(index) ? 'bg-green-500' : 
                  currentQuestion === index ? 'bg-gray-800' : 'bg-gray-500'}`}
              >
                <span className="text-xs">i</span>
              </div>
              <span className="text-base">Q{index + 1}</span>
            </div>
          ))}
          <div className="flex items-center p-4 bg-gray-200 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white mr-3">
              <span className="text-xs">i</span>
            </div>
            <div>
              <span className="text-base">Q5</span>
              <div className="text-sm text-gray-600">问题详细描述</div>
            </div>
          </div>

          {/* 删除问题按钮 */}
          <div className="flex justify-center mt-4 mb-20">
            <button className="bg-white border border-gray-300 px-4 py-2 rounded text-sm">删除问题</button>
          </div>

          {/* 底部按钮组 */}
          <div className="absolute bottom-0 left-0 w-96 p-4 flex justify-between border-t border-gray-200 bg-white">
            <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm">开始旅程</button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm">结束旅程</button>
          </div>

          {/* 进度条 */}
          <div className="absolute bottom-16 left-0 w-96 px-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-800 mr-1"></div>
              <div className="flex-1 h-0.5 bg-gray-300 relative">
                <div className="absolute top-0 left-0 h-0.5 bg-gray-800" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="w-4 h-4 rounded-full bg-gray-300 ml-1"></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              故事进度条：已回答 {answeredQuestions.length} 个问题
            </div>
          </div>
        </div>

        {/* 右侧内容区域 */}
        <div className="flex-1 p-6 bg-white overflow-auto">
          <div className="max-w-3xl mx-auto">
            {/* 故事内容生成选项 */}
            <div className="mb-6">
              <label className="flex items-center">
                <Checkbox checked={abandonGeneration} onChange={(e) => setAbandonGeneration(e.target.checked)} />
                <span className="ml-2 text-sm">故事内容生成（三至五行后给出选项）</span>
              </label>
            </div>

            {/* 当前问题区域 */}
            {currentQuestionData && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Q{currentQuestion + 1}</h2>
                <h3 className="text-lg font-medium mb-2">{currentQuestionData.text}</h3>
                <p className="text-gray-600 mb-4">{currentQuestionData.description}</p>
                <TextArea
                  rows={6}
                  placeholder={currentQuestionData.placeholder}
                  value={answers[currentQuestion] || ''}
                  onChange={handleAnswerChange}
                  className="w-full border border-gray-300 rounded p-2 mb-4"
                />
                
                {/* 导航按钮 */}
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className={`flex items-center px-4 py-2 rounded-md ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    上一题
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!answers[currentQuestion]}
                    className={`flex items-center px-4 py-2 rounded-md ${answers[currentQuestion] ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                  >
                    {currentQuestion < standardQuestions.length - 1 ? '下一题' : '完成'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* 已回答完所有问题后显示选择项 */}
            {answeredQuestions.length === standardQuestions.length && (
              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-medium mb-4">请选择故事发展方向：</h3>
                
                <div className="flex items-center py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>选择一</span>
                </div>
                
                <div className="flex items-center py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>选择二</span>
                </div>
                
                <div className="flex items-center py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>选择三</span>
                </div>
                
                <div className="flex items-center py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div>......</div>
                    <div className="text-sm text-gray-500">你将如何决定故事走向？</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage; 