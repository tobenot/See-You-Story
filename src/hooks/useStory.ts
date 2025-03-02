import { useContext } from 'react';
import { StoryContext } from '../context/StoryContext';

export const useStory = () => {
  return useContext(StoryContext);
}; 