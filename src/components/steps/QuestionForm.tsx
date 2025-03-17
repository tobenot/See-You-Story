import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

interface QuestionFormProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options?: { icon?: string; label: string; value: string }[];
  onSubmit: (answer: string) => void;
  onReset?: () => void;
  onPrevious?: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  questionNumber,
  totalQuestions,
  question,
  options = [],
  onSubmit,
  onReset,
  onPrevious,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customAnswer, setCustomAnswer] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [useCustomAnswer, setUseCustomAnswer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    setSelectedOption(null);
    setCustomAnswer('');
    setUseCustomAnswer(false);
    setIsSubmitting(false);
    submittedRef.current = false;
  }, [questionNumber]);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setUseCustomAnswer(false);
  };

  const handleCustomAnswerFocus = () => {
    // 当用户开始输入自定义回答时，取消选项选择
    if (customAnswer.trim() !== '') {
      setSelectedOption(null);
      setUseCustomAnswer(true);
    }
  };

  const handleCustomAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomAnswer(e.target.value);
    if (e.target.value.trim() !== '') {
      setUseCustomAnswer(true);
    } else {
      setUseCustomAnswer(false);
    }
  };

  const handleSubmit = () => {
    // 防止重复提交
    if (isSubmitting || submittedRef.current) {
      return;
    }
    
    setIsSubmitting(true);
    submittedRef.current = true;
    
    if (useCustomAnswer && customAnswer.trim()) {
      onSubmit(customAnswer.trim());
    } else if (selectedOption) {
      onSubmit(selectedOption);
    }
  };

  const handleReset = () => {
    setIsRefreshing(true);
    setSelectedOption(null);
    setCustomAnswer('');
    setUseCustomAnswer(false);
    setIsSubmitting(false);
    submittedRef.current = false;
    
    if (onReset) onReset();
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const handlePrevious = () => {
    if (onPrevious) onPrevious();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-500">
          问题 {questionNumber}/{totalQuestions}
        </div>
        <Button 
          onClick={handleReset} 
          type="text"
          icon={<SyncOutlined spin={isRefreshing} />}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          刷新问题
        </Button>
      </div>

      <h2 className="text-xl font-medium mb-8">{question}</h2>

      <div className="space-y-4 mb-8">
        {options.length > 0 && (
          <div className="space-y-4 mb-4">
            {options.map((option) => (
              <div
                key={option.value}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedOption === option.value && !useCustomAnswer
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleOptionSelect(option.value)}
              >
                <div className="flex items-center">
                  {option.icon && <span className="mr-2">{option.icon}</span>}
                  <span>{option.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={`mt-6 ${useCustomAnswer ? 'border-blue-500 bg-blue-50 rounded-lg p-2' : ''}`}>
          <div className="text-gray-500 mb-2 italic">或者，自由输入你的回答...</div>
          <textarea
            className={`w-full border ${useCustomAnswer ? 'border-blue-500' : 'border-gray-200'} rounded-lg p-4 h-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none`}
            placeholder="在此输入你的个性化回答..."
            value={customAnswer}
            onChange={handleCustomAnswerChange}
            onFocus={handleCustomAnswerFocus}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="default"
          size="large"
          className="px-6"
          onClick={handlePrevious}
          disabled={questionNumber <= 1}
        >
          上一题
        </Button>
        <Button
          type="primary"
          size="large"
          className="px-6"
          disabled={!((useCustomAnswer && customAnswer.trim()) || (!useCustomAnswer && selectedOption)) || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? '提交中...' : '下一题'}
        </Button>
      </div>
    </div>
  );
};

export default QuestionForm; 