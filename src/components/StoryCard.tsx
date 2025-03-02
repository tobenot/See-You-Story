import React from 'react';
import { Card, Tag } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Story } from '../types';

interface StoryCardProps {
  story: Story;
  onClick: (story: Story) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onClick }) => {
  return (
    <Card
      hoverable
      style={{ width: 240, margin: '16px' }}
      cover={story.coverImage ? <img alt={story.title} src={story.coverImage} /> : null}
      onClick={() => onClick(story)}
    >
      <Card.Meta 
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {story.title}
            {story.isLocked && (
              <Tag color="warning" icon={<LockOutlined />}>
                需要解锁
              </Tag>
            )}
          </div>
        } 
        description={story.description} 
      />
    </Card>
  );
};

export default StoryCard; 