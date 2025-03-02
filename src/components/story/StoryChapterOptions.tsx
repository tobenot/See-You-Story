import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';

interface StoryOption {
  id: string;
  text: string;
}

interface StoryChapterOptionsProps {
  options: StoryOption[];
  onSelectOption: (optionId: string) => void;
}

const StoryChapterOptions: React.FC<StoryChapterOptionsProps> = ({
  options,
  onSelectOption,
}) => {
  return (
    <div className="mt-8 space-y-4">
      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => onSelectOption(option.id)}
          className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center"
        >
          <ArrowRightOutlined className="mr-3 text-blue-500" />
          <span>{option.text}</span>
        </div>
      ))}
    </div>
  );
};

export default StoryChapterOptions; 