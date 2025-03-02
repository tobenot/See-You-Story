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

// 答案类型定义
interface Answers {
  [key: string]: string;
}

// 问题集合 - 这些问题是灵活的，可以是意象性的问题
const questions: Question[] = [
  {
    id: 'question-1',
    text: '当你凝视星空时，内心浮现的第一个画面是什么？',
    options: [
      { icon: '✨', label: '广阔无垠的宇宙', value: '广阔无垠的宇宙' },
      { icon: '🌌', label: '神秘未知的探索', value: '神秘未知的探索' },
      { icon: '🏠', label: '遥远的家乡', value: '遥远的家乡' },
      { icon: '👁️', label: '宇宙的眼睛在凝视我', value: '宇宙的眼睛在凝视我' },
    ],
    type: 'options',
  },
  {
    id: 'question-2',
    text: '如果你可以化身为一种元素，你会选择什么？',
    options: [
      { icon: '🔥', label: '火焰', value: '火焰' },
      { icon: '💧', label: '水', value: '水' },
      { icon: '🌪️', label: '风', value: '风' },
      { icon: '🏔️', label: '土', value: '土' },
      { icon: '⚡', label: '雷电', value: '雷电' },
    ],
    type: 'options',
  },
  {
    id: 'question-3',
    text: '在你的梦境中，最常出现的场景是什么？',
    type: 'text',
  },
  {
    id: 'question-4',
    text: '如果世界上所有的颜色只剩下三种，你希望保留哪三种？',
    type: 'text',
  },
  {
    id: 'question-5',
    text: '当你面对未知的挑战时，你内心的声音会告诉你什么？',
    type: 'text',
  },
];

const StepManager: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  
  const handleAnswer = (answer: string) => {
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
    // 仅重置当前问题的答案
    const currentQuestion = questions[currentStep];
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
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default StepManager; 