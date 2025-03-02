import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Story, AnalysisCard, Character } from '../types';
import { storyService, analysisCardService, characterService } from '../api/services';

interface StoryContextType {
  stories: Story[];
  currentStory: Story | null;
  analysisCards: AnalysisCard[];
  characters: Character[];
  isLoading: boolean;
  freeStoriesLeft: number;
  setCurrentStory: (story: Story) => void;
  createAnalysisCard: (content: string) => Promise<AnalysisCard>;
  getStoriesData: () => Promise<void>;
  getAnalysisCardsData: (storyId: number) => Promise<void>;
  getCharactersData: () => Promise<void>;
}

export const StoryContext = createContext<StoryContextType>({
  stories: [],
  currentStory: null,
  analysisCards: [],
  characters: [],
  isLoading: true,
  freeStoriesLeft: 3, // 默认有3个免费故事
  setCurrentStory: () => {},
  createAnalysisCard: async () => ({ id: 0, storyId: 0, content: '', createdAt: '' }),
  getStoriesData: async () => {},
  getAnalysisCardsData: async () => {},
  getCharactersData: async () => {},
});

interface StoryProviderProps {
  children: ReactNode;
}

export const StoryProvider: React.FC<StoryProviderProps> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [analysisCards, setAnalysisCards] = useState<AnalysisCard[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [freeStoriesLeft, setFreeStoriesLeft] = useState(3); // 默认有3个免费故事

  // 获取故事数据
  const getStoriesData = async () => {
    try {
      setIsLoading(true);
      const response = await storyService.getStories();
      setStories(response.data);
    } catch (error) {
      console.error('获取故事列表失败', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 获取分析卡片数据
  const getAnalysisCardsData = async (storyId: number) => {
    try {
      setIsLoading(true);
      const response = await analysisCardService.getAnalysisCards(storyId);
      setAnalysisCards(response.data);
    } catch (error) {
      console.error('获取分析卡片失败', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 获取角色数据
  const getCharactersData = async () => {
    try {
      setIsLoading(true);
      const response = await characterService.getCharacters();
      setCharacters(response.data);
    } catch (error) {
      console.error('获取角色列表失败', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 创建分析卡片
  const createAnalysisCard = async (content: string): Promise<AnalysisCard> => {
    if (!currentStory) {
      throw new Error('没有选择故事');
    }
    
    try {
      setIsLoading(true);
      const response = await analysisCardService.createAnalysisCard(currentStory.id, content);
      const newCard = response.data;
      
      // 更新分析卡片列表
      setAnalysisCards((prevCards) => [...prevCards, newCard]);
      
      // 如果是免费用户，减少可用的免费故事数量
      if (freeStoriesLeft > 0) {
        setFreeStoriesLeft(freeStoriesLeft - 1);
      }
      
      return newCard;
    } catch (error) {
      console.error('创建分析卡片失败', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载故事数据
  useEffect(() => {
    getStoriesData();
    getCharactersData();
  }, []);

  // 当选择故事变化时，获取相关分析卡片
  useEffect(() => {
    if (currentStory) {
      getAnalysisCardsData(currentStory.id);
    }
  }, [currentStory]);

  return (
    <StoryContext.Provider
      value={{
        stories,
        currentStory,
        analysisCards,
        characters,
        isLoading,
        freeStoriesLeft,
        setCurrentStory,
        createAnalysisCard,
        getStoriesData,
        getAnalysisCardsData,
        getCharactersData,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}; 