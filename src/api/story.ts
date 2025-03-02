import axios from './axios';

/**
 * 生成故事接口
 * @param {object} data - 故事生成参数
 * @returns {Promise} - 返回Promise对象
 */
export const generateStory = (data: Record<string, string>) => {
  return axios.post('/story/generate', data);
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
  metadata: Record<string, any>;
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

/**
 * 选择故事选项接口
 * @param {string} storyId - 故事ID
 * @param {string} chapterId - 章节ID
 * @param {string} optionId - 选项ID
 * @returns {Promise} - 返回Promise对象，包含下一章节内容
 */
export const selectStoryOption = (
  storyId: string,
  chapterId: string,
  optionId: string
) => {
  return axios.post(`/story/${storyId}/chapters/${chapterId}/select`, { optionId });
};

/**
 * 获取故事章节接口
 * @param {string} storyId - 故事ID
 * @param {string} chapterId - 章节ID
 * @returns {Promise} - 返回Promise对象，包含章节内容
 */
export const getStoryChapter = (storyId: string, chapterId: string) => {
  return axios.get(`/story/${storyId}/chapters/${chapterId}`);
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