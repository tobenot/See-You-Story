import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionForm from './QuestionForm';

// 问题类型定义
interface Question {
  id: string;
  text: string;
  options?: { icon?: string; label: string; value: string }[];
  type: 'options' | 'text';
}

// 故事旅程类型
type StoryType = '奇幻冒险' | '科幻未来' | '浪漫爱情' | '悬疑恐怖';

// 问题集合
const questions: Question[] = [
  {
    id: 'story-type',
    text: '你喜欢什么类型的故事?',
    options: [
      { icon: '✨', label: '奇幻冒险', value: '奇幻冒险' },
      { icon: '🤖', label: '科幻未来', value: '科幻未来' },
      { icon: '❤️', label: '浪漫爱情', value: '浪漫爱情' },
      { icon: '👻', label: '悬疑恐怖', value: '悬疑恐怖' },
    ],
    type: 'options',
  },
  {
    id: 'story-theme',
    text: '你希望故事有什么主题?',
    type: 'text',
  },
  {
    id: 'main-character',
    text: '描述一下你想要的主角',
    type: 'text',
  },
  {
    id: 'story-setting',
    text: '故事的背景设定是什么?',
    type: 'text',
  },
  {
    id: 'story-length',
    text: '你想要多长的故事?',
    options: [
      { label: '短篇 (5分钟阅读)', value: 'short' },
      { label: '中篇 (15分钟阅读)', value: 'medium' },
      { label: '长篇 (30分钟阅读)', value: 'long' },
    ],
    type: 'options',
  },
];

const StepManager: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [storyType, setStoryType] = useState<StoryType | null>(null);

  // 当回答第一个问题时，设置故事类型
  useEffect(() => {
    if (answers['story-type']) {
      setStoryType(answers['story-type'] as StoryType);
    }
  }, [answers['story-type']]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentStep];
    
    // 保存当前问题的答案
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
    
    // 如果是最后一个问题，导航到结果页面
    if (currentStep === questions.length - 1) {
      // 这里可以发送请求到后端API
      navigate('/story-result', { state: { answers } });
    } else {
      // 否则前进到下一个问题
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    // 仅重置当前问题的答案
    const currentQuestion = questions[currentStep];
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion.id];
      return newAnswers;
    });
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
            {currentStep + 1}
          </div>
          <div className="h-1 bg-gray-200 flex-grow mx-2">
            <div 
              className="h-full bg-blue-500" 
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg">
            {questions.length}
          </div>
        </div>
      </div>

      <QuestionForm
        questionNumber={currentStep + 1}
        totalQuestions={questions.length}
        question={currentQuestion.text}
        options={currentQuestion.options}
        onSubmit={handleAnswer}
        onReset={handleReset}
      />
    </div>
  );
};

export default StepManager; 