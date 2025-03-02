import React, { useState, useEffect } from 'react';
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

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit(selectedOption);
    } else if (customAnswer.trim()) {
      onSubmit(customAnswer.trim());
    }
  };

  const handleReset = () => {
    setIsRefreshing(true);
    setSelectedOption(null);
    setCustomAnswer('');
    
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
        {options.map((option) => (
          <div
            key={option.value}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedOption === option.value
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

        {options.length === 0 && (
          <textarea
            className="w-full border border-gray-200 rounded-lg p-4 h-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            placeholder="或者，你可以自由描述..."
            value={customAnswer}
            onChange={(e) => setCustomAnswer(e.target.value)}
          />
        )}
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
          disabled={!selectedOption && !customAnswer.trim()}
          onClick={handleSubmit}
        >
          下一题
        </Button>
      </div>
    </div>
  );
};

export default QuestionForm; 