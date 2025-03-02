// 用户类型
export interface User {
  id: number;
  username: string;
  token?: string;
}

// 故事类型
export interface Story {
  id: number;
  title: string;
  description: string;
  coverImage?: string;
  isLocked: boolean;
}

// 分析卡片类型
export interface AnalysisCard {
  id: number;
  storyId: number;
  content: string;
  createdAt: string;
  color?: string;
}

// 角色类型
export interface Character {
  id: number;
  name: string;
  description: string;
  avatar?: string;
  isLocked: boolean;
}

// 聊天消息类型
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
} 