import React from 'react';
import { ShareAltOutlined, SaveOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface WorldViewCardProps {
  content: string;
  tags: string[];
  onShare: () => void;
  onSave: () => void;
}

const WorldViewCard: React.FC<WorldViewCardProps> = ({
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
            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 12H21M12 3C14.7614 5.06156 16.4266 8.38341 16.5 12C16.4266 15.6166 14.7614 18.9384 12 21C9.23857 18.9384 7.57341 15.6166 7.5 12C7.57341 8.38341 9.23857 5.06156 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="text-lg font-medium">世界观卡片</h3>
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

export default WorldViewCard; 