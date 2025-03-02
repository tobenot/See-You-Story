import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { aiService } from '../api/services';

interface StoryOption {
  id: number;
  text: string;
}

const StoryGenerationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 从路由状态中获取问题答案
  const answers = location.state?.answers || {};
  
  const [loading, setLoading] = useState<boolean>(true);
  const [storyId, setStoryId] = useState<string>('');
  const [storyContent, setStoryContent] = useState<string>('');
  const [storyOptions, setStoryOptions] = useState<StoryOption[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [progressValue, setProgressValue] = useState<number>(0);
  
  // 提取问题标题
  const questionTitles = [
    "Q1",
    "Q2",
    "Q3",
    "Q4",
    "Q5 问题详细描述"
  ];
  
  // 生成故事内容
  useEffect(() => {
    const generateStory = async () => {
      try {
        setLoading(true);
        // 调用API生成故事
        const response = await aiService.generateStory(answers);
        
        // 设置故事内容和选项
        setStoryId(response.data.storyId);
        setStoryContent(response.data.content);
        setStoryOptions(response.data.options || [
          { id: 1, text: "选择一" },
          { id: 2, text: "选择二" },
          { id: 3, text: "选择三" }
        ]);
        
        // 设置初始进度
        setProgressValue(10);
        
        // 动画效果：逐渐增加进度
        const interval = setInterval(() => {
          setProgressValue(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 2;
          });
        }, 100);
        
        setLoading(false);
      } catch (error) {
        console.error('生成故事失败', error);
        message.error('生成故事失败，请重试');
        setLoading(false);
      }
    };
    
    if (Object.keys(answers).length > 0) {
      generateStory();
    } else {
      // 如果没有答案数据，返回问题页面
      navigate('/questions');
    }
  }, [answers, navigate]);
  
  // 选择故事走向选项
  const handleSelectOption = async (optionId: number) => {
    try {
      setLoading(true);
      
      // 获取选择的选项文本
      const selectedOption = storyOptions.find(option => option.id === optionId)?.text || '';
      
      // 调用API更新故事走向
      const response = await aiService.updateStoryDirection(storyId, selectedOption);
      
      // 更新故事内容和新的选项
      setStoryContent(prev => `${prev}\n\n${response.data.content}`);
      setStoryOptions(response.data.options || []);
      
      setLoading(false);
    } catch (error) {
      console.error('更新故事走向失败', error);
      message.error('更新故事走向失败，请重试');
      setLoading(false);
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* 左侧问题列表 */}
      <div className="w-1/3 bg-white shadow-md overflow-hidden">
        <div className="p-4 bg-gray-800 text-white">
          <h2 className="text-xl font-bold">当前世界：个人档案生成（初次使用默认状态）</h2>
        </div>
        
        <div className="space-y-1">
          {questionTitles.map((title, index) => (
            <div 
              key={index}
              className={`flex items-center p-4 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} ${activeQuestion === index ? 'border-l-4 border-blue-500' : ''}`}
              onClick={() => setActiveQuestion(index)}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-500 text-white mr-3">
                <span className="text-sm">i</span>
              </div>
              <span className="text-lg">{title}</span>
            </div>
          ))}
        </div>
        
        <div className="p-4 flex justify-center">
          <button className="px-4 py-2 bg-gray-800 text-white rounded">删除问题</button>
        </div>
        
        <div className="absolute bottom-0 w-1/3 p-4 flex justify-between">
          <button className="px-4 py-2 bg-gray-800 text-white rounded">开始旅程</button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded">结束旅程</button>
        </div>
      </div>
      
      {/* 右侧故事内容 */}
      <div className="w-2/3 p-8 overflow-auto">
        <div className="mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <h2 className="text-xl font-bold">故事内容生成（三至五行后结出选项）</h2>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
            <p className="text-gray-500">正在生成故事内容，请稍候...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 min-h-[400px]">
            <p className="whitespace-pre-line">{storyContent}</p>
          </div>
        )}
        
        {!loading && storyOptions.length > 0 && (
          <div className="space-y-4">
            {storyOptions.map(option => (
              <div 
                key={option.id}
                className="flex items-center p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => handleSelectOption(option.id)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
                <span>{option.text}</span>
              </div>
            ))}
            
            <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
              </svg>
              <span>...... <br />你将如何决定故事走向？</span>
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <div className="flex items-center">
            <span className="mr-3">故事进度条：</span>
            <div className="flex-1 h-1 bg-gray-200 rounded-full">
              <div className="h-full bg-gray-600 rounded-full"></div>
            </div>
            <span className="ml-3">已做出X个选择</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryGenerationPage; 