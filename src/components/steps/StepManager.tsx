import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import { Question, getRandomQuestions } from '../../config/questions';

// 答案类型定义
interface Answers {
  [key: string]: string;
}

// 默认抽取的问题数量
const DEFAULT_QUESTION_COUNT = 5;

const StepManager: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  
  // 组件挂载时随机抽取问题
  useEffect(() => {
    // 从配置中随机抽取问题
    const randomQuestions = getRandomQuestions(DEFAULT_QUESTION_COUNT);
    setQuestions(randomQuestions);
  }, []);
  
  const handleAnswer = (answer: string) => {
    // 确保问题已加载
    if (questions.length === 0) return;
    
    const currentQuestion = questions[currentStep];
    
    // 保存当前问题的答案
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
    
    // 如果是最后一个问题，导航到结果页面
    if (currentStep === questions.length - 1) {
      // 发送所有问题和答案到后端
      const questionsWithAnswers = questions.map(q => ({
        questionId: q.id,
        questionText: q.text,
        answer: answers[q.id] || (q.id === currentQuestion.id ? answer : '')
      }));
      
      navigate('/story-result', { state: { questionsWithAnswers } });
    } else {
      // 否则前进到下一个问题
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    // 重新随机抽取问题
    const randomQuestions = getRandomQuestions(DEFAULT_QUESTION_COUNT);
    setQuestions(randomQuestions);
    setCurrentStep(0);
    setAnswers({});
  };
  
  const handleResetCurrentQuestion = () => {
    // 仅重置当前问题的答案和重新抽取当前问题
    if (questions.length === 0) return;
    
    const currentQuestion = questions[currentStep];
    
    // 重新随机抽取一个问题替换当前问题
    const newQuestion = getRandomQuestions(1)[0];
    const newQuestions = [...questions];
    newQuestions[currentStep] = newQuestion;
    
    setQuestions(newQuestions);
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion.id];
      return newAnswers;
    });
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // 如果问题尚未加载，显示加载状态
  if (questions.length === 0) {
    return <div className="max-w-2xl mx-auto py-8 text-center">正在加载问题...</div>;
  }

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
        onReset={handleResetCurrentQuestion}
        onPrevious={handlePrevious}
      />
      
      <div className="mt-6 text-center">
        <button 
          onClick={handleReset} 
          className="text-blue-500 hover:text-blue-700 underline"
        >
          重新开始并随机抽取新问题
        </button>
      </div>
    </div>
  );
};

export default StepManager; 