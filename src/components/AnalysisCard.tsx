import React from 'react';
import { Card, Typography, Tag } from 'antd';
import { AnalysisCard as AnalysisCardType } from '../types';

const { Text } = Typography;

interface AnalysisCardProps {
  card: AnalysisCardType;
  onClick?: (card: AnalysisCardType) => void;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ card, onClick }) => {
  const formattedDate = new Date(card.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <Card
      hoverable={!!onClick}
      style={{ 
        width: '100%', 
        marginBottom: '16px',
        backgroundColor: card.color || '#f0f0f0'
      }}
      onClick={onClick ? () => onClick(card) : undefined}
    >
      <div>
        <Text strong>{card.content}</Text>
        <div style={{ marginTop: '12px' }}>
          <Tag color="blue">创建于: {formattedDate}</Tag>
        </div>
      </div>
    </Card>
  );
};

export default AnalysisCard; 