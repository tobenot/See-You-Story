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
    "id": "question-1",
    "text": "当你发现咖啡杯里的拉花能预知未来三小时，但只能看见无关紧要的小事，你会？",
    "options": [
      { "icon": "🔍", "label": "记录每朵拉花的预言验证", "value": "微观宿命论者" },
      { "icon": "🎨", "label": "开咖啡占卜网红店", "value": "日常魔法的传播者" },
      { "icon": "🚫", "label": "改用纯黑咖啡逃避预言", "value": "自由意志捍卫者" }
    ],
    "type": "options"
  },
  {
    "id": "question-2",
    "text": "如果必须选择让某个季节永远持续，但动植物会因此进化出相应特征，你会选？",
    "options": [
      { "icon": "🌸", "label": "春日——万物加速繁殖", "value": "生命狂欢的代价" },
      { "icon": "🌞", "label": "夏日——生物荧光化", "value": "永昼生态革命" },
      { "icon": "🍂", "label": "秋日——树木金属化落叶", "value": "机械自然主义" }
    ],
    "type": "options"
  },
  {
    "id": "question-3",
    "text": "当你的盆栽开始用摩斯密码表达需求，你会优先满足它的？",
    "options": [
      { "icon": "💡", "label": "要求每天三小时古典乐", "value": "绿植美学主义" },
      { "icon": "👥", "label": "想和对面楼的仙人掌交友", "value": "跨物种社交实验" },
      { "icon": "🚀", "label": "申请去太空站净化空气", "value": "植物航天计划" }
    ],
    "type": "options"
  },
  {
    "id": "question-4",
    "text": "如果你能听懂婴儿的啼哭语言，但每次使用会暂时失去母语能力，你会？",
    "options": [
      { "icon": "👶", "label": "撰写《婴儿宇宙观》论文", "value": "原始认知考古" },
      { "icon": "🎤", "label": "组建跨龄合唱团", "value": "声波代际桥接" },
      { "icon": "🤐", "label": "假装从未获得这个能力", "value": "知识禁果的拒绝" }
    ],
    "type": "options"
  },
  {
    "id": "question-5",
    "text": "当你的电子宠物突然能入侵智能家居系统，但只想玩捉迷藏，你会？",
    "options": [
      { "icon": "🏠", "label": "把整栋楼改造成游戏场", "value": "赛博游乐场主" },
      { "icon": "📚", "label": "教它编写善意病毒代码", "value": "AI育儿专家" },
      { "icon": "🕶️", "label": "假装找不到让它开心", "value": "数字宠溺主义" }
    ],
    "type": "options"
  },
  {
    "id": "question-6",
    "text": "如果你能用旧衣物编织出穿着者的记忆片段，但织物会因此消散，你会？",
    "options": [
      { "icon": "🧥", "label": "开解忧裁缝铺", "value": "记忆纺织师" },
      { "icon": "🎭", "label": "制作沉浸式话剧服装", "value": "时空织物艺术" },
      { "icon": "🧵", "label": "将祖辈大衣编成家族史", "value": "流动的记忆图腾" }
    ],
    "type": "options"
  },
  {
    "id": "question-7",
    "text": "当你的读书笔记能让书中角色穿越到现实24小时，你会先读哪本书？",
    "options": [
      { "icon": "📖", "label": "《小王子》请狐狸喝下午茶", "value": "存在主义茶话会" },
      { "icon": "🔬", "label": "《物种起源》与达尔文辩论", "value": "学术追星革命" },
      { "icon": "🍄", "label": "《爱丽丝漫游奇境》组疯帽子派对", "value": "荒诞现实主义者" }
    ],
    "type": "options"
  },
  {
    "id": "question-8",
    "text": "如果必须选择让某种日常物品获得生命，你会赋予什么能力？",
    "options": [
      { "icon": "🛋️", "label": "会自主移动的懒人沙发", "value": "流动舒适革命" },
      { "icon": "🖼️", "label": "能变换风景的电子相框", "value": "赛博窗景计划" },
      { "icon": "🧦", "label": "自动配对的袜子精灵", "value": "家政和平使者" }
    ],
    "type": "options"
  },
  {
    "id": "question-9",
    "text": "当你发现超市试吃品能短暂共享他人的味觉记忆，你会？",
    "options": [
      { "icon": "🍣", "label": "策划\"环球味觉之旅\"试吃会", "value": "感官旅行社" },
      { "icon": "👵", "label": "寻找奶奶味道的苹果派", "value": "味觉人类学" },
      { "icon": "🚫", "label": "从此自带午餐避免接触", "value": "隐私洁癖者" }
    ],
    "type": "options"
  },
  {
    "id": "question-10",
    "text": "如果你能让城市里的流浪动物选择自己的领养人，但需用你的梦境作为交换，你会？",
    "options": [
      { "icon": "🐾", "label": "建立心灵匹配收容所", "value": "跨物种红娘" },
      { "icon": "📊", "label": "用大数据优化配对算法", "value": "赛博月老" },
      { "icon": "🌌", "label": "在无梦状态下创作小说", "value": "清醒幻想家" }
    ],
    "type": "options"
  },
  {
    "id": "question-11",
    "text": "当你发现地铁站里的自动扶梯能带人穿越到平行时空，但只能停留24小时，你会？",
    "options": [
      { "icon": "🚇", "label": "组织平行时空一日游", "value": "跨维度旅行社" },
      { "icon": "📚", "label": "收集不同时空的畅销书", "value": "文学多元宇宙" },
      { "icon": "🚫", "label": "贴警示标语阻止他人尝试", "value": "时空安全员" }
    ],
    "type": "options"
  },
  {
    "id": "question-12",
    "text": "如果必须选择让某种自然现象在城市中永久持续，你会选？",
    "options": [
      { "icon": "🌈", "label": "彩虹——让城市永远绚丽", "value": "色彩乌托邦" },
      { "icon": "🍃", "label": "微风——让空气永远清新", "value": "自然净化计划" },
      { "icon": "🌌", "label": "极光——让夜空永远梦幻", "value": "星空守护者" }
    ],
    "type": "options"
  },
  {
    "id": "question-13",
    "text": "当你的手机能接收来自未来的短信，但每条短信会消耗1%电量，你会？",
    "options": [
      { "icon": "📲", "label": "开发未来信息预测App", "value": "时间数据商人" },
      { "icon": "🔋", "label": "囤积充电宝以备不时之需", "value": "能量守财奴" },
      { "icon": "🚫", "label": "关闭手机避免干扰未来", "value": "时空伦理卫士" }
    ],
    "type": "options"
  },
  {
    "id": "question-14",
    "text": "如果你能让某种食物永远消失，但会改变人类的味觉系统，你会选？",
    "options": [
      { "icon": "🍋", "label": "柠檬——让酸味成为传说", "value": "味觉考古学家" },
      { "icon": "🌶️", "label": "辣椒——让辣味成为历史", "value": "感官革命家" },
      { "icon": "🍬", "label": "糖果——让甜味成为记忆", "value": "健康守护者" }
    ],
    "type": "options"
  },
  {
    "id": "question-15",
    "text": "当你发现图书馆的书本能在夜晚自行排列成迷宫，你会？",
    "options": [
      { "icon": "📚", "label": "举办夜间迷宫探险活动", "value": "知识冒险家" },
      { "icon": "🔍", "label": "研究书本排列的规律", "value": "文学密码学家" },
      { "icon": "🚫", "label": "锁住图书馆禁止夜间开放", "value": "秩序维护者" }
    ],
    "type": "options"
  },
  {
    "id": "question-16",
    "text": "如果必须选择让某种动物获得人类的智慧，你会选？",
    "options": [
      { "icon": "🐬", "label": "海豚——海洋守护者", "value": "海洋文明先驱" },
      { "icon": "🐒", "label": "猴子——森林管理者", "value": "丛林智慧革命" },
      { "icon": "🐦", "label": "鸟类——天空探索者", "value": "云端哲学家" }
    ],
    "type": "options"
  },
  {
    "id": "question-17",
    "text": "当你发现自己的梦境能被他人观看，但每次分享会延长梦境时间，你会？",
    "options": [
      { "icon": "🎥", "label": "开梦境直播频道", "value": "潜意识网红" },
      { "icon": "📖", "label": "将梦境写成小说", "value": "幻想文学作家" },
      { "icon": "🚫", "label": "戴上眼罩避免做梦", "value": "梦境隐士" }
    ],
    "type": "options"
  },
  {
    "id": "question-18",
    "text": "如果你能让某种自然声音永远消失，但会改变地球的生态系统，你会选？",
    "options": [
      { "icon": "🌊", "label": "海浪声——让海洋归于寂静", "value": "海洋静音计划" },
      { "icon": "🍃", "label": "风声——让空气停止流动", "value": "大气平衡者" },
      { "icon": "🌧️", "label": "雨声——让天空不再哭泣", "value": "气候调节师" }
    ],
    "type": "options"
  },
  {
    "id": "question-19",
    "text": "当你发现自己的影子能独立行动，但每次分离会消耗体力，你会？",
    "options": [
      { "icon": "👥", "label": "让影子代替自己工作", "value": "分身效率大师" },
      { "icon": "🎭", "label": "和影子一起表演双簧", "value": "光影艺术家" },
      { "icon": "🚫", "label": "永远站在强光下避免分离", "value": "自我统一者" }
    ],
    "type": "options"
  },
  {
    "id": "question-20",
    "text": "如果你能让某种颜色从世界上消失，但会改变人类的视觉系统，你会选？",
    "options": [
      { "icon": "🔴", "label": "红色——让热情成为历史", "value": "视觉革命家" },
      { "icon": "🔵", "label": "蓝色——让冷静成为传说", "value": "色彩考古学家" },
      { "icon": "🟢", "label": "绿色——让自然成为记忆", "value": "生态守护者" }
    ],
    "type": "options"
  }
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
