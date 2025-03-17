import React from 'react';
import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';

export interface StoryOption {
  id: string;
  text: string;
}

export interface StoryChapterOptionsProps {
  options: StoryOption[];
  onSelectOption: (optionId: string) => void;
  loading?: boolean;
}

const StoryChapterOptions: React.FC<StoryChapterOptionsProps> = ({
  options,
  onSelectOption,
  loading = false,
}) => {
  return (
    <div className="mt-8 space-y-4">
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => !loading && onSelectOption(option.id)}
          className={`p-4 border border-gray-200 rounded-lg cursor-pointer transition-all flex items-center justify-between ${
            loading 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          <div className="flex items-center">
            <ArrowRightOutlined className="mr-3 text-blue-500" />
            <span>{option.text}</span>
          </div>
          {loading && <LoadingOutlined className="text-blue-500" />}
        </div>
      ))}
    </div>
  );
};

export default StoryChapterOptions; 