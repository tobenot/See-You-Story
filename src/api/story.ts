import axios from './axios';

interface QuestionWithAnswer {
  questionId: string;
  questionText: string;
  answer: string;
}

/**
 * 生成故事接口
 * @param {QuestionWithAnswer[]} questionsWithAnswers - 问题和答案数组
 * @returns {Promise} - 返回Promise对象
 */
export const generateStory = (questionsWithAnswers: QuestionWithAnswer[]) => {
  return axios.post('/story/generate', { questionsWithAnswers });
};

/**
 * 保存故事接口
 * @param {object} data - 故事数据
 * @param {string} data.title - 故事标题
 * @param {string} data.content - 故事内容
 * @param {object} data.metadata - 故事元数据
 * @returns {Promise} - 返回Promise对象
 */
export const saveStory = (data: {
  title: string;
  content: string;
  metadata: Record<string, unknown>;
}) => {
  return axios.post('/story/save', data);
};

/**
 * 喜欢故事接口
 * @param {string} storyId - 故事ID
 * @returns {Promise} - 返回Promise对象
 */
export const likeStory = (storyId: string) => {
  return axios.post(`/story/${storyId}/like`);
};

/**
 * 取消喜欢故事接口
 * @param {string} storyId - 故事ID
 * @returns {Promise} - 返回Promise对象
 */
export const unlikeStory = (storyId: string) => {
  return axios.delete(`/story/${storyId}/like`);
};

/**
 * 获取用户所有故事接口
 * @returns {Promise} - 返回Promise对象
 */
export const getUserStories = () => {
  return axios.get('/story/user');
};

/**
 * 获取故事详情接口
 * @param {string} storyId - 故事ID
 * @returns {Promise} - 返回Promise对象
 */
export const getStoryDetail = (storyId: string) => {
  return axios.get(`/story/${storyId}`);
};

/**
 * 分享故事接口
 * @param {string} storyId - 故事ID
 * @returns {Promise} - 返回Promise对象，包含分享链接
 */
export const shareStory = (storyId: string) => {
  return axios.post(`/story/${storyId}/share`);
};

// 接口类型定义
export interface StoryChapter {
  id: string;
  title: string;
  content: string;
  options: StoryOption[];
}

export interface StoryOption {
  id: string;
  text: string;
}

export interface SelectOptionResponse {
  nextChapterId: string;
}

/**
 * 选择故事选项接口
 * @param {string} storyId - 故事ID
 * @param {string} chapterId - 章节ID
 * @param {string} optionId - 选项ID
 * @returns {Promise<{ data: SelectOptionResponse }>} - 返回Promise对象，包含下一章节ID
 */
export const selectStoryOption = (
  storyId: string,
  chapterId: string,
  optionId: string
) => {
  return axios.post<SelectOptionResponse>(`/story/${storyId}/chapters/${chapterId}/select`, { optionId });
};

/**
 * 获取故事章节接口
 * @param {string} storyId - 故事ID
 * @param {string} chapterId - 章节ID
 * @returns {Promise<{ data: StoryChapter }>} - 返回Promise对象，包含章节内容
 */
export const getStoryChapter = (storyId: string, chapterId: string) => {
  return axios.get<StoryChapter>(`/story/${storyId}/chapters/${chapterId}`);
};

/**
 * 获取故事分析接口
 * @param {string} storyId - 故事ID
 * @returns {Promise} - 返回Promise对象，包含故事分析结果
 */
export const getStoryAnalysis = (storyId: string) => {
  return axios.get(`/story/${storyId}/analysis`);
};

/**
 * 保存分析卡片接口
 * @param {string} cardId - 卡片ID
 * @returns {Promise} - 返回Promise对象
 */
export const saveAnalysisCard = (cardId: string) => {
  return axios.post(`/story/analysis/card/${cardId}/save`);
};

/**
 * 删除分析卡片接口
 * @param {string} cardId - 卡片ID
 * @returns {Promise} - 返回Promise对象
 */
export const deleteAnalysisCard = (cardId: string) => {
  return axios.delete(`/story/analysis/card/${cardId}`);
};

/**
 * 提取故事角色接口
 * @param {string} storyId - 故事ID
 * @returns {Promise} - 返回Promise对象，包含角色信息
 */
export const extractStoryCharacters = (storyId: string) => {
  return axios.post(`/story/${storyId}/extract-characters`);
};

/**
 * 刷新故事角色接口
 * @param {string} storyId - 故事ID
 * @returns {Promise} - 返回Promise对象，包含刷新后的角色信息
 */
export const refreshStoryCharacters = (storyId: string) => {
  return axios.post(`/story/${storyId}/refresh-characters`);
}; 