import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import StepManager from '../components/steps/StepManager';
import { BookOutlined } from '@ant-design/icons';

const StoryJourney: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">故事旅程</h1>
          <Button icon={<BookOutlined />} onClick={handleGoHome}>
            返回首页
          </Button>
        </div>
        
        <StepManager />
      </div>
    </div>
  );
};

export default StoryJourney; 