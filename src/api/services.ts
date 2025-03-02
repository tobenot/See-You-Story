import axios from './axios';
import { ChatMessage, User } from '../types';

// 认证服务
export const authService = {
  // 用户注册
  register: (username: string, password: string) => {
    return axios.post('/auth/register', { username, password });
  },
  
  // 用户登录
  login: (username: string, password: string) => {
    return axios.post('/auth/login', { username, password });
  },
  
  // 获取当前用户信息
  getCurrentUser: () => {
    return axios.get('/user/me');
  }
};

// AI服务
export const aiService = {
  // 获取AI聊天响应（流式）
  chatStream: (messages: ChatMessage[], model?: string, temperature?: number, maxTokens?: number) => {
    return axios.post('/ai/chat', { 
      messages, 
      model, 
      temperature, 
      maxTokens 
    }, {
      responseType: 'stream'
    });
  },
  
  // 获取AI聊天响应（完整）
  chatComplete: (messages: ChatMessage[], model?: string, temperature?: number, maxTokens?: number) => {
    return axios.post('/ai/complete', { 
      messages, 
      model, 
      temperature, 
      maxTokens 
    });
  },
  
  // 获取可用的AI模型
  getModels: () => {
    return axios.get('/ai/models');
  }
};

// 模拟故事服务（根据后端API扩展）
export const storyService = {
  // 获取故事列表
  getStories: () => {
    // 模拟数据，实际项目中应从API获取
    return Promise.resolve({
      data: [
        { id: 1, title: '勇者的旅程', description: '踏上一段充满挑战的冒险', coverImage: '/stories/1.jpg', isLocked: false },
        { id: 2, title: '星际探索', description: '探索浩瀚宇宙的未知奥秘', coverImage: '/stories/2.jpg', isLocked: false },
        { id: 3, title: '神秘岛屿', description: '一个隐藏着古老秘密的岛屿', coverImage: '/stories/3.jpg', isLocked: false },
        { id: 4, title: '未来都市', description: '高科技与人性的交错世界', coverImage: '/stories/4.jpg', isLocked: true },
        { id: 5, title: '魔法学院', description: '学习魔法的奇妙校园生活', coverImage: '/stories/5.jpg', isLocked: true }
      ]
    });
  },
  
  // 获取故事详情
  getStoryById: (id: number) => {
    // 模拟数据，实际项目中应从API获取
    return Promise.resolve({
      data: { id, title: '勇者的旅程', description: '踏上一段充满挑战的冒险', coverImage: '/stories/1.jpg', isLocked: false }
    });
  }
};

// 模拟角色服务（根据后端API扩展）
export const characterService = {
  // 获取角色列表
  getCharacters: () => {
    // 模拟数据，实际项目中应从API获取
    return Promise.resolve({
      data: [
        { id: 1, name: '勇者阿尔法', description: '勇敢无畏的冒险家', avatar: '/characters/1.jpg', isLocked: false },
        { id: 2, name: '智者贝塔', description: '博学多才的顾问', avatar: '/characters/2.jpg', isLocked: false },
        { id: 3, name: '魔法师伽马', description: '精通各种魔法的施法者', avatar: '/characters/3.jpg', isLocked: true },
        { id: 4, name: '刺客德尔塔', description: '行动敏捷的暗杀者', avatar: '/characters/4.jpg', isLocked: true }
      ]
    });
  }
};

// 模拟分析卡片服务（根据后端API扩展）
export const analysisCardService = {
  // 创建分析卡片
  createAnalysisCard: (storyId: number, content: string) => {
    // 模拟数据，实际项目中应调用API创建
    return Promise.resolve({
      data: {
        id: Date.now(),
        storyId,
        content,
        createdAt: new Date().toISOString(),
        color: '#f0f0f0'
      }
    });
  },
  
  // 获取分析卡片列表
  getAnalysisCards: (storyId: number) => {
    // 模拟数据，实际项目中应从API获取
    return Promise.resolve({
      data: [
        { id: 1, storyId, content: '这个故事展现了人类面对困境时的坚韧', createdAt: '2023-01-01T12:00:00Z', color: '#e6f7ff' },
        { id: 2, storyId, content: '主角的成长过程反映了自我发现的重要性', createdAt: '2023-01-02T12:00:00Z', color: '#fff7e6' }
      ]
    });
  }
}; 