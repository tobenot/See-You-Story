import React from 'react';
import { Card, Avatar, Tag } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onClick?: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  return (
    <Card
      hoverable={!!onClick}
      style={{ width: 220, margin: '16px' }}
      onClick={onClick ? () => onClick(character) : undefined}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar 
          size={80} 
          src={character.avatar}
          style={{ marginBottom: '12px' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, marginRight: '8px' }}>{character.name}</h3>
          {character.isLocked && (
            <Tag color="warning" icon={<LockOutlined />}>
              需要解锁
            </Tag>
          )}
        </div>
        <p style={{ textAlign: 'center' }}>{character.description}</p>
      </div>
    </Card>
  );
};

export default CharacterCard; 