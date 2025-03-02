// 问题类型定义
export interface Question {
  id: string;
  text: string;
  options?: { icon?: string; label: string; value: string }[];
  type: 'options' | 'text';
}

// 所有可用问题集合
export const allQuestions: Question[] = [
  {
    id: 'question-1',
    text: '繁星点点之时，你心湖泛起的第一道涟漪是？',
    options: [
      { icon: '✨', label: '浩渺星河，无边无际', value: '广阔无垠的宇宙' },
      { icon: '🌌', label: '未知星辰，等待探寻', value: '神秘未知的探索' },
      { icon: '🏠', label: '远方灯火，思念家园', value: '遥远的家乡' },
      { icon: '👁️', label: '宇宙之眸，深邃凝望', value: '宇宙的眼睛在凝视我' },
    ],
    type: 'options',
  },
  {
    id: 'question-2',
    text: '若灵魂化为自然元素，你将选择何种形态流转人世？',
    options: [
      { icon: '🔥', label: '炽热火焰，燃烧一切', value: '火焰' },
      { icon: '💧', label: '柔情水流，包容万物', value: '水' },
      { icon: '🌪️', label: '自由之风，无拘无束', value: '风' },
      { icon: '🏔️', label: '厚重山岳，承载世界', value: '土' },
      { icon: '⚡', label: '霹雳闪电，瞬间永恒', value: '雷电' },
    ],
    type: 'options',
  },
  {
    id: 'question-3',
    text: '梦境画卷中，最常展现的那片风景是？',
    options: [
      { icon: '🏙️', label: '霓虹高楼，灯火璀璨', value: '都市高楼' },
      { icon: '🌊', label: '碧波荡漾，潮起潮落', value: '大海或河流' },
      { icon: '🌲', label: '翠林深谷，山水相依', value: '森林或山脉' },
      { icon: '🏫', label: '尘世阶梯，人来人往', value: '学校或工作场所' },
      { icon: '🏠', label: '故园旧宅，心灵归所', value: '家或熟悉的住所' },
    ],
    type: 'options',
  },
  {
    id: 'question-4',
    text: '若世间色彩消逝，唯留三色，你愿留下哪三种色调渲染你的诗篇？',
    options: [
      { icon: '❤️', label: '朱砂赤焰，湛蓝天际，金黄麦浪', value: '红色、蓝色、黄色' },
      { icon: '💙', label: '苍穹碧海，翠绿新芽，紫罗幽兰', value: '蓝色、绿色、紫色' },
      { icon: '🧡', label: '橘红晚霞，素白雪花，漆黑夜幕', value: '橙色、白色、黑色' },
      { icon: '💚', label: '青葱草原，粉樱春雨，金色时光', value: '绿色、粉色、金色' },
      { icon: '🤍', label: '白云飘渺，墨夜深邃，烟雨如墨', value: '白色、黑色、灰色' },
    ],
    type: 'options',
  },
  {
    id: 'question-5',
    text: '面对未知暗礁与迷雾，你心中的罗盘指向何方？',
    options: [
      { icon: '💪', label: '信念之焰，照亮前路', value: '相信自己，你能行' },
      { icon: '🧠', label: '理性之灯，拨开云雾', value: '仔细分析，寻找解决方案' },
      { icon: '🤝', label: '同行之手，共渡难关', value: '寻求帮助，团队合作' },
      { icon: '⏳', label: '时光细流，滴水穿石', value: '慢慢来，一步一步解决' },
      { icon: '🔄', label: '春风化雨，随缘转变', value: '如果不行就换个方向尝试' },
    ],
    type: 'options',
  },
  {
    id: 'question-6',
    text: '心灵的远行，你更向往何种漂泊方式？',
    options: [
      { icon: '🏞️', label: '踏破青山，寻幽探秘', value: '自然探索和徒步旅行' },
      { icon: '🏙️', label: '穿越时光，聆听城市脉搏', value: '城市文化和历史游览' },
      { icon: '🏖️', label: '听潮汐私语，拥抱阳光温柔', value: '海滩度假和放松' },
      { icon: '🧳', label: '行囊相随，流浪天涯', value: '背包客式的冒险旅行' },
    ],
    type: 'options',
  },
  {
    id: 'question-7',
    text: '若命运赐予你一缕超然之力，你愿拥抱哪种不凡？',
    options: [
      { icon: '🧠', label: '窥见心湖，洞悉千言万语', value: '读心术' },
      { icon: '⏱️', label: '驭时光流转，掌生命长河', value: '控制时间' },
      { icon: '🦸‍♂️', label: '御风而行，俯瞰尘世浮沉', value: '飞行能力' },
      { icon: '👻', label: '化身无形，隐于光影之间', value: '隐形能力' },
      { icon: '🔮', label: '拨开命运迷雾，窥见前路风景', value: '预知未来' },
    ],
    type: 'options',
  },
  {
    id: 'question-8',
    text: '人生长卷中，你认为最珍贵的墨色是什么？',
    options: [
      { icon: '❤️', label: '情丝相系，心灵共鸣', value: '爱与关系' },
      { icon: '🌱', label: '岁月耕耘，生命绽放', value: '成长与学习' },
      { icon: '🎯', label: '逐梦扬帆，实现本真', value: '成就与自我实现' },
      { icon: '🤝', label: '播撒善念，照亮他人', value: '帮助他人与社会贡献' },
      { icon: '😌', label: '内心安然，宁静致远', value: '内心平静与满足' },
    ],
    type: 'options',
  },
  {
    id: 'question-9',
    text: '当尘世喧嚣压紧心弦，你以何种方式抚慰心灵？',
    options: [
      { icon: '🎵', label: '任音符流淌，洗涤心灵尘埃', value: '听音乐' },
      { icon: '🏃‍♂️', label: '让汗水滴落，释放身心束缚', value: '运动' },
      { icon: '📚', label: '于字里行间，寻觅心灵归所', value: '阅读' },
      { icon: '🧘‍♀️', label: '沉心入静，感受呼吸绵长', value: '冥想或瑜伽' },
      { icon: '🎮', label: '于虚拟世界，暂别现实烦忧', value: '玩游戏' },
    ],
    type: 'options',
  },
  {
    id: 'question-10',
    text: '当生命画卷终将收笔，你希望留下怎样的一抹印记？',
    options: [
      { icon: '💡', label: '思想星火，照亮未来', value: '创新者和思想家' },
      { icon: '❤️', label: '温暖之手，点亮他人生命', value: '关爱和支持他人的人' },
      { icon: '🎭', label: '风趣灵动，散播欢笑与活力', value: '有趣和充满活力的人' },
      { icon: '🏆', label: '攀登高峰，留下成就足迹', value: '成功和有成就的人' },
      { icon: '🧠', label: '智慧明灯，指引迷途方向', value: '聪明和有智慧的人' },
    ],
    type: 'options',
  },
];

// 工具函数：随机抽取指定数量的不重复问题
export const getRandomQuestions = (count: number): Question[] => {
  // 如果请求的问题数量大于可用问题数量，则返回所有问题
  if (count >= allQuestions.length) {
    return [...allQuestions];
  }
  
  // 复制问题数组，避免修改原数组
  const questionsCopy = [...allQuestions];
  const result: Question[] = [];
  
  // 随机抽取问题
  for (let i = 0; i < count; i++) {
    // 生成随机索引
    const randomIndex = Math.floor(Math.random() * questionsCopy.length);
    // 移除并获取随机问题
    const [randomQuestion] = questionsCopy.splice(randomIndex, 1);
    result.push(randomQuestion);
  }
  
  return result;
}; 