import React from 'react';
import { ShareAltOutlined, SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface AnalysisCardProps {
  title: string;
  content: string;
  tags: string[];
  onShare: () => void;
  onSave: () => void;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({
  title,
  content,
  tags,
  onShare,
  onSave,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-700 mb-4">{content}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex">
          <Button 
            icon={<ShareAltOutlined />} 
            className="mr-2"
            onClick={onShare}
          >
            分享
          </Button>
          <Button 
            icon={<SaveOutlined />}
            onClick={onSave}
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard; 