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
  {
    id: 'question-11',
    text: '当镜中倒影与你对视，你看见的自己是什么模样？',
    options: [
      { icon: '🔍', label: '探索者，好奇心驱使前行', value: '充满好奇与探索精神的人' },
      { icon: '🛡️', label: '守护者，坚毅而有担当', value: '负责任且可靠的人' },
      { icon: '🌟', label: '光芒万丈，照亮他人', value: '乐观开朗且富有感染力的人' },
      { icon: '🧩', label: '思考者，深邃而内敛', value: '深思熟虑且内省的人' },
      { icon: '🦋', label: '变幻多姿，随风而动', value: '灵活多变且适应性强的人' },
    ],
    type: 'options',
  },
  {
    id: 'question-12',
    text: '若情绪化为天气，你内心最常见的气候是？',
    options: [
      { icon: '☀️', label: '艳阳高照，万里无云', value: '愉悦和乐观' },
      { icon: '🌧️', label: '细雨绵绵，思绪万千', value: '沉思和感伤' },
      { icon: '⛈️', label: '雷雨交加，激情澎湃', value: '强烈和变化多端' },
      { icon: '🌫️', label: '雾霭迷蒙，若隐若现', value: '混沌和不确定' },
      { icon: '🌤️', label: '阴晴不定，时变时晴', value: '变化多端和复杂' },
    ],
    type: 'options',
  },
  {
    id: 'question-13',
    text: '面对内心深处的阴影，你会如何回应它的呼唤？',
    options: [
      { icon: '🔦', label: '照亮黑暗，正视阴影', value: '直面并接受' },
      { icon: '🚪', label: '轻掩心门，暂缓面对', value: '暂时回避' },
      { icon: '🧵', label: '编织故事，转化能量', value: '通过创造性表达转化' },
      { icon: '🤝', label: '寻求明灯，共同探索', value: '寻求他人帮助' },
      { icon: '🌊', label: '随波逐流，顺其自然', value: '接受并让它自然流转' },
    ],
    type: 'options',
  },
  {
    id: 'question-14',
    text: '在人际关系的花园中，你倾向于扮演什么角色？',
    options: [
      { icon: '🌱', label: '默默守护，滋养生长', value: '支持者和照顾者' },
      { icon: '🔥', label: '引领前行，点燃热情', value: '领导者和鼓舞者' },
      { icon: '🌉', label: '连接彼此，架设桥梁', value: '调解者和连接者' },
      { icon: '🎭', label: '活跃气氛，带来欢笑', value: '娱乐者和轻松制造者' },
      { icon: '🧠', label: '提供见解，分享智慧', value: '思想者和建议者' },
    ],
    type: 'options',
  },
  {
    id: 'question-15',
    text: '当生活剧本出现意外转折，你内心最初的反应是？',
    options: [
      { icon: '🧘', label: '平心静气，接纳变化', value: '冷静接受' },
      { icon: '🧩', label: '分析情势，寻找出路', value: '分析并制定新计划' },
      { icon: '😰', label: '心潮起伏，情绪波动', value: '感到焦虑或不安' },
      { icon: '💪', label: '迎难而上，勇敢应对', value: '视为挑战并积极面对' },
      { icon: '🔄', label: '顺势而为，寻找机遇', value: '寻找其中的机会' },
    ],
    type: 'options',
  },
  {
    id: 'question-16',
    text: '若将自我价值感比作一座建筑，它的根基是什么？',
    options: [
      { icon: '❤️', label: '爱与归属，心灵港湾', value: '关系和被爱的感觉' },
      { icon: '🏆', label: '成就与肯定，辉煌荣耀', value: '成就和外在认可' },
      { icon: '🧠', label: '自知与接纳，内在和平', value: '自我接纳和内在和平' },
      { icon: '🌱', label: '成长与进步，不断超越', value: '持续成长和自我提升' },
      { icon: '🤲', label: '付出与贡献，利他精神', value: '对他人和社会的贡献' },
    ],
    type: 'options',
  },
  {
    id: 'question-17',
    text: '在记忆的长廊中，哪类片段最容易被你珍藏？',
    options: [
      { icon: '❤️', label: '温情时刻，心灵相依', value: '与亲友的温馨时刻' },
      { icon: '🏆', label: '巅峰之境，成就辉煌', value: '个人成就和胜利' },
      { icon: '😂', label: '欢声笑语，喜悦连连', value: '欢乐和有趣的经历' },
      { icon: '🌄', label: '自然之美，心灵震撼', value: '与自然相连的体验' },
      { icon: '✨', label: '顿悟之光，内心觉醒', value: '个人成长和顿悟时刻' },
    ],
    type: 'options',
  },
  {
    id: 'question-18',
    text: '思绪万千之时，你的思维往往呈现怎样的图景？',
    options: [
      { icon: '📊', label: '层次分明，条理清晰', value: '逻辑和系统化的思维' },
      { icon: '🎨', label: '色彩斑斓，意象丰富', value: '图像和直觉性思维' },
      { icon: '🌀', label: '漩涡纷呈，层层深入', value: '深度思考和分析' },
      { icon: '⚡', label: '灵光乍现，跳跃联结', value: '创造性和联想性思维' },
      { icon: '🔄', label: '循环往复，反思不止', value: '反思性和自我对话' },
    ],
    type: 'options',
  },
  {
    id: 'question-19',
    text: '面对内心深处的欲望，你通常会采取什么态度？',
    options: [
      { icon: '🔍', label: '审视探究，理解根源', value: '探索和理解' },
      { icon: '⚖️', label: '权衡利弊，理性决策', value: '理性分析和控制' },
      { icon: '🎯', label: '顺应本心，适度满足', value: '适度满足和享受' },
      { icon: '🧘', label: '超越执着，内心自由', value: '超越和放下' },
      { icon: '🌱', label: '转化升华，创造价值', value: '转化为创造性动力' },
    ],
    type: 'options',
  },
  {
    id: 'question-20',
    text: '若将你的人生哲学浓缩为一句话，最接近的会是？',
    options: [
      { icon: '🌈', label: '活在当下，珍惜此刻', value: '活在当下，享受每一刻' },
      { icon: '🌱', label: '不断成长，超越自我', value: '持续成长和自我超越' },
      { icon: '❤️', label: '付出真爱，收获幸福', value: '爱与被爱是最重要的' },
      { icon: '🔍', label: '探索真理，寻找意义', value: '追求真理和意义' },
      { icon: '🤝', label: '与人为善，利他共生', value: '帮助他人，共同繁荣' },
    ],
    type: 'options',
  },
  {
    id: 'question-21',
    text: '若将童年比作一本书，你的书名会是什么？',
    options: [
      { icon: '🌟', label: '《璀璨星光下的奇幻旅程》', value: '充满想象和冒险' },
      { icon: '🏡', label: '《宁静港湾的温馨记忆》', value: '安全和温暖' },
      { icon: '🌪️', label: '《风雨中成长的勇者之路》', value: '挑战和成长' },
      { icon: '🧩', label: '《探索未知的好奇之旅》', value: '好奇和探索' },
      { icon: '🎭', label: '《多彩人生的初章序曲》', value: '丰富多彩和变化' },
    ],
    type: 'options',
  },
  {
    id: 'question-22',
    text: '在人际冲突的风暴中，你倾向于如何寻求平衡？',
    options: [
      { icon: '🤝', label: '沟通桥梁，寻求共识', value: '开放沟通和寻求共识' },
      { icon: '🧘', label: '内观思索，理解差异', value: '自我反思和理解' },
      { icon: '🛡️', label: '坚守立场，据理力争', value: '坚持自己的观点' },
      { icon: '🕊️', label: '暂避锋芒，等待时机', value: '暂时回避' },
      { icon: '🔄', label: '灵活变通，寻求平衡', value: '寻找折中方案' },
    ],
    type: 'options',
  },
  {
    id: 'question-23',
    text: '当你凝视内心的孤独时，它向你展现的面貌是？',
    options: [
      { icon: '🌌', label: '静谧星空，深邃无边', value: '平静与自我连接' },
      { icon: '🕳️', label: '深渊暗影，空洞无依', value: '痛苦与失落' },
      { icon: '🏝️', label: '安宁港湾，独处自适', value: '自由与独立' },
      { icon: '🔄', label: '短暂过客，来去无常', value: '暂时的状态' },
      { icon: '🌱', label: '孕育土壤，成长养分', value: '成长与创造的机会' },
    ],
    type: 'options',
  },
  {
    id: 'question-24',
    text: '在与自我对话的静夜里，你最常思考的生命议题是？',
    options: [
      { icon: '🔍', label: '我是谁，为何而来', value: '身份和存在的意义' },
      { icon: '🌱', label: '如何成长，超越自我', value: '个人成长和自我实现' },
      { icon: '❤️', label: '情感联结，爱与被爱', value: '爱和关系' },
      { icon: '⚖️', label: '价值取舍，人生抉择', value: '价值观和人生选择' },
      { icon: '🌍', label: '社会责任，个体使命', value: '对世界的贡献和责任' },
    ],
    type: 'options',
  },
  {
    id: 'question-25',
    text: '你的心灵深处，最难以抑制的渴望是什么？',
    options: [
      { icon: '🔓', label: '自由之翼，无拘无束', value: '自由和独立' },
      { icon: '❤️', label: '深刻连结，心灵共鸣', value: '亲密关系和被理解' },
      { icon: '✨', label: '闪耀光芒，被人认可', value: '成就和认可' },
      { icon: '🧠', label: '智慧之光，洞察真理', value: '知识和智慧' },
      { icon: '🏡', label: '安全港湾，稳定依靠', value: '安全感和稳定' },
    ],
    type: 'options',
  },
  {
    id: 'question-26',
    text: '在生命的十字路口，你作决定时最看重的指南针是？',
    options: [
      { icon: '❤️', label: '心之所向，情感引导', value: '情感和直觉' },
      { icon: '🧠', label: '理性分析，逻辑思考', value: '理性和逻辑' },
      { icon: '🧭', label: '价值准则，道德坚守', value: '价值观和原则' },
      { icon: '👥', label: '集体智慧，参考他人', value: '他人的建议和社会规范' },
      { icon: '⚖️', label: '利弊权衡，实用主义', value: '实际结果和效用' },
    ],
    type: 'options',
  },
  {
    id: 'question-27',
    text: '当面对无法改变的现实，你的内心会采取怎样的姿态？',
    options: [
      { icon: '🧘', label: '平静接纳，顺其自然', value: '接受和顺应' },
      { icon: '🔄', label: '寻找缝隙，变通应对', value: '寻找新的可能性' },
      { icon: '💪', label: '坚韧不拔，迎难而上', value: '坚持和努力克服' },
      { icon: '🌱', label: '从中学习，内在成长', value: '从中学习和成长' },
      { icon: '🎯', label: '重新定向，调整目标', value: '改变目标和方向' },
    ],
    type: 'options',
  },
  {
    id: 'question-28',
    text: '你认为内心深处最真实的自己是什么样子？',
    options: [
      { icon: '🌊', label: '深沉如海，情感丰富', value: '情感丰富且深刻' },
      { icon: '🧠', label: '理性思考，逻辑清晰', value: '理性和分析性强' },
      { icon: '🔥', label: '热情四溢，活力充沛', value: '充满激情和活力' },
      { icon: '🌱', label: '柔韧坚韧，不断成长', value: '适应性强且不断成长' },
      { icon: '🧩', label: '复杂多面，难以定义', value: '复杂且多面性的' },
    ],
    type: 'options',
  },
  {
    id: 'question-29',
    text: '若能与过去的自己对话，你最想告诉那个你什么？',
    options: [
      { icon: '💪', label: '坚持信念，相信自己', value: '保持信心，相信自己' },
      { icon: '🌈', label: '珍惜当下，活在当下', value: '珍惜每一刻，活在当下' },
      { icon: '🧘', label: '放下执着，随缘自在', value: '学会放下，不要太执着' },
      { icon: '❤️', label: '勇敢爱吧，敞开心扉', value: '勇敢去爱和表达感受' },
      { icon: '🧠', label: '学习成长，拓展视野', value: '持续学习和拓展视野' },
    ],
    type: 'options',
  },
  {
    id: 'question-30',
    text: '在情感的河流中，你觉得自己最难以驾驭的情绪是？',
    options: [
      { icon: '😡', label: '怒火燃烧，难以平息', value: '愤怒' },
      { icon: '😔', label: '悲伤低谷，难以自拔', value: '悲伤' },
      { icon: '😨', label: '恐惧阴影，挥之不去', value: '恐惧' },
      { icon: '😳', label: '羞愧难当，内心煎熬', value: '羞愧' },
      { icon: '😬', label: '焦虑不安，心神不宁', value: '焦虑' },
    ],
    type: 'options',
  },
  {
    id: 'question-31',
    text: '若将你的灵魂放入一首古老的乐曲，会是哪种旋律？',
    options: [
      { icon: '🎻', label: '悠扬弦音，轻叹流年', value: '舒缓而略带忧伤的旋律' },
      { icon: '🥁', label: '激昂鼓点，震撼心魄', value: '强劲而富有力量的节奏' },
      { icon: '🎹', label: '跳跃音符，变幻莫测', value: '活泼而变化多端的曲调' },
      { icon: '🪕', label: '朴实民谣，返璞归真', value: '简单而质朴的传统曲风' },
      { icon: '🎺', label: '华彩乐章，璀璨夺目', value: '华丽而复杂的交响乐' },
    ],
    type: 'options',
  },
  {
    id: 'question-32',
    text: '清晨的第一缕阳光穿过窗帘，你希望它洒在什么样的场景上？',
    options: [
      { icon: '📚', label: '书香墨韵，静待时光', value: '安静的书房或阅读角落' },
      { icon: '🍵', label: '一杯清茶，袅袅升腾', value: '温馨的早餐桌边' },
      { icon: '🏞️', label: '翠绿新芽，晶莹露珠', value: '充满生机的花园或植物' },
      { icon: '🛌', label: '温暖被窝，恬静安眠', value: '舒适的床铺与枕头' },
      { icon: '🎨', label: '色彩画布，创意迸发', value: '艺术工作室或创作空间' },
    ],
    type: 'options',
  },
  {
    id: 'question-33',
    text: '若你的心事能幻化为一种景观，会是怎样的风貌？',
    options: [
      { icon: '🌊', label: '海潮起伏，深不可测', value: '变幻莫测的海洋' },
      { icon: '🏔️', label: '巍峨山岳，静默坚韧', value: '高耸入云的山脉' },
      { icon: '🌌', label: '星空璀璨，广袤无垠', value: '璀璨的夜空' },
      { icon: '🌳', label: '古木参天，根深叶茂', value: '古老而繁茂的森林' },
      { icon: '🏙️', label: '灯火阑珊，人生百态', value: '熙熙攘攘的城市街景' },
    ],
    type: 'options',
  },
  {
    id: 'question-34',
    text: '若能捧起一朵云，你希望它会变幻成什么形状？',
    options: [
      { icon: '🐉', label: '神龙腾跃，翱翔九天', value: '神秘而强大的生物' },
      { icon: '🏝️', label: '浮岛仙境，世外桃源', value: '理想中的栖息地' },
      { icon: '👤', label: '思念之人，朦胧轮廓', value: '心中思念的人' },
      { icon: '🚪', label: '门扉洞开，通向未知', value: '通往新世界的大门' },
      { icon: '🎭', label: '千面变幻，流转不定', value: '不断变化的形态' },
    ],
    type: 'options',
  },
  {
    id: 'question-35',
    text: '若世界万物皆能倾诉，你最想聆听谁的低语？',
    options: [
      { icon: '🌲', label: '古树沧桑，百年见证', value: '古老的树木' },
      { icon: '🗿', label: '岩石沉默，亘古不变', value: '历经风霜的石头' },
      { icon: '🌊', label: '海洋低吟，广纳百川', value: '浩瀚的海洋' },
      { icon: '🦊', label: '野生精灵，智慧灵动', value: '野生动物' },
      { icon: '🏛️', label: '历史建筑，岁月回响', value: '古老的建筑' },
    ],
    type: 'options',
  },
  {
    id: 'question-36',
    text: '当雨滴敲击心灵的窗棂，你聆听到的是什么旋律？',
    options: [
      { icon: '🎵', label: '舒缓安眠，安抚心灵', value: '平静而舒缓的摇篮曲' },
      { icon: '📝', label: '思绪翻涌，创作灵感', value: '激发灵感的思考乐章' },
      { icon: '🌧️', label: '忧伤叹息，细语倾诉', value: '略带忧伤的轻柔音调' },
      { icon: '💃', label: '欢快舞蹈，雨中嬉戏', value: '欢快跳跃的舞曲节奏' },
      { icon: '🧘', label: '禅意心境，空灵净化', value: '净化心灵的自然音韵' },
    ],
    type: 'options',
  },
  {
    id: 'question-37',
    text: '若能在时光长河中选一处停留，你会选择哪个瞬间？',
    options: [
      { icon: '👶', label: '童真无邪，万象初见', value: '充满好奇的童年时光' },
      { icon: '💑', label: '情感绽放，心意相通', value: '爱情最炽热的时刻' },
      { icon: '🌅', label: '破晓之时，希望初现', value: '充满可能性的新开始' },
      { icon: '🍂', label: '金秋收获，丰盈满足', value: '收获成果的圆满时刻' },
      { icon: '✨', label: '灵光乍现，顿悟人生', value: '生命顿悟的启示时分' },
    ],
    type: 'options',
  },
  {
    id: 'question-38',
    text: '若你的心语可以化作一种花朵绽放，会是什么模样？',
    options: [
      { icon: '🌹', label: '玫瑰热烈，深情似火', value: '热情奔放的玫瑰' },
      { icon: '🌸', label: '樱花轻盈，短暂绚烂', value: '短暂而绚丽的樱花' },
      { icon: '🌻', label: '向日葵昂扬，追逐光明', value: '积极向上的向日葵' },
      { icon: '💮', label: '素雅淡香，内敛纯净', value: '淡雅宁静的白色花朵' },
      { icon: '🌵', label: '仙人掌坚韧，守护柔软', value: '外刚内柔的仙人掌花' },
    ],
    type: 'options',
  },
  {
    id: 'question-39',
    text: '若将你的精神家园描绘成一幅画，画中会有什么意象？',
    options: [
      { icon: '🌄', label: '山水相依，烟波浩渺', value: '宁静的山水画卷' },
      { icon: '🏞️', label: '曲径通幽，花木扶疏', value: '幽静的庭院小径' },
      { icon: '🌌', label: '星辰大海，无限可能', value: '壮阔的宇宙星空' },
      { icon: '🏙️', label: '灯火璀璨，繁华盛世', value: '充满活力的都市景象' },
      { icon: '🧩', label: '抽象构图，深邃内涵', value: '富有深意的抽象图形' },
    ],
    type: 'options',
  },
  {
    id: 'question-40',
    text: '若生命是一场旅行，你最在意沿途的什么风景？',
    options: [
      { icon: '👣', label: '同行之人，心灵契合', value: '一路同行的人们' },
      { icon: '🌈', label: '刹那美景，稍纵即逝', value: '短暂但美丽的景色' },
      { icon: '🧭', label: '旅途意义，方向指引', value: '旅行的意义和目标' },
      { icon: '🌱', label: '成长痕迹，蜕变印记', value: '自己的成长与改变' },
      { icon: '🎒', label: '未知探索，好奇心引', value: '未知与探索的乐趣' },
    ],
    type: 'options',
  },
  {
    id: 'question-41',
    text: '若能将一种声音珍藏在记忆的宝盒，你会选择什么？',
    options: [
      { icon: '👶', label: '童真笑语，天真烂漫', value: '孩童的笑声' },
      { icon: '🌧️', label: '雨打芭蕉，滴答私语', value: '雨滴的声音' },
      { icon: '🌊', label: '海浪呢喃，潮起潮落', value: '海浪的声音' },
      { icon: '🗣️', label: '挚爱之人，温柔呼唤', value: '爱人呼唤自己的声音' },
      { icon: '🎵', label: '心弦拨动，灵魂共鸣', value: '触动心灵的音乐' },
    ],
    type: 'options',
  },
  {
    id: 'question-42',
    text: '若光阴可以具象，你心中的时间是什么形态？',
    options: [
      { icon: '⏳', label: '沙漏细流，静默无声', value: '缓缓流动的沙漏' },
      { icon: '🌊', label: '江河奔涌，不舍昼夜', value: '奔流不息的河流' },
      { icon: '🌀', label: '漩涡盘旋，周而复始', value: '循环往复的漩涡' },
      { icon: '🕸️', label: '丝网交织，点线成面', value: '复杂交织的网格' },
      { icon: '🎠', label: '旋转木马，起落交替', value: '起伏变化的循环' },
    ],
    type: 'options',
  },
  {
    id: 'question-43',
    text: '当黎明破晓之际，你内心最先萌发的是什么念头？',
    options: [
      { icon: '✨', label: '新的可能，崭新篇章', value: '新的一天充满可能性' },
      { icon: '📝', label: '计划前行，有条不紊', value: '规划今天要做的事情' },
      { icon: '😴', label: '眷恋梦境，温柔徘徊', value: '想要再多睡一会儿' },
      { icon: '☕', label: '沏一杯茶，慢享时光', value: '享受宁静的早晨时光' },
      { icon: '🧘', label: '深呼吸，感恩存在', value: '感恩能够迎接新的一天' },
    ],
    type: 'options',
  },
  {
    id: 'question-44',
    text: '若你能为自己的心灵定制一把钥匙，它会是什么形状？',
    options: [
      { icon: '🔑', label: '古朴厚重，历经沧桑', value: '古老而复杂的雕花钥匙' },
      { icon: '💎', label: '晶莹剔透，光彩夺目', value: '璀璨华丽的宝石钥匙' },
      { icon: '🌿', label: '枝叶交织，生机盎然', value: '由植物藤蔓形成的钥匙' },
      { icon: '⚙️', label: '齿轮咬合，精密运作', value: '精密的机械结构钥匙' },
      { icon: '🔮', label: '变幻莫测，随心而变', value: '能随意变化形态的钥匙' },
    ],
    type: 'options',
  },
  {
    id: 'question-45',
    text: '当夜深人静，月光如水，你的思绪会流向何方？',
    options: [
      { icon: '🌠', label: '遥远星辰，宇宙奥秘', value: '宇宙和存在的奥秘' },
      { icon: '📔', label: '往事翻阅，温柔回味', value: '过去的回忆和经历' },
      { icon: '🔮', label: '未来图景，憧憬展望', value: '对未来的期望和计划' },
      { icon: '❤️', label: '情感流淌，牵挂思念', value: '对亲友的思念和牵挂' },
      { icon: '🧠', label: '冥想沉思，寻求答案', value: '对人生问题的思考' },
    ],
    type: 'options',
  },
  {
    id: 'question-46',
    text: '若能在宇宙诞生的瞬间许下心愿，你会期望世界拥有什么？',
    options: [
      { icon: '❤️', label: '爱的律动，贯穿万物', value: '爱与和谐的本质' },
      { icon: '🌈', label: '多元并存，色彩斑斓', value: '丰富多彩的多样性' },
      { icon: '⚖️', label: '平衡法则，循环往复', value: '自然平衡的法则' },
      { icon: '✨', label: '无限可能，创造奇迹', value: '无限的可能性' },
      { icon: '🧩', label: '秩序之美，规律运行', value: '优雅的秩序和规律' },
    ],
    type: 'options',
  },
  {
    id: 'question-47',
    text: '若你的灵魂有一处秘密花园，花园中最鲜明的景致是什么？',
    options: [
      { icon: '🌷', label: '百花争艳，绚烂多彩', value: '五彩缤纷的花海' },
      { icon: '🌲', label: '古树参天，静谧深邃', value: '宁静的古树林荫' },
      { icon: '⛲', label: '清泉流淌，灵动婉转', value: '流水喷泉和小溪' },
      { icon: '🛤️', label: '蜿蜒小径，未知远方', value: '引向远方的小路' },
      { icon: '🏛️', label: '古老遗迹，记忆碎片', value: '承载记忆的古老建筑' },
    ],
    type: 'options',
  },
  {
    id: 'question-48',
    text: '若你的思想化为一道风景，会是怎样的场景？',
    options: [
      { icon: '🌄', label: '晨曦初露，万物苏醒', value: '日出时分的山峦' },
      { icon: '🌊', label: '汹涌波涛，深不可测', value: '波涛汹涌的大海' },
      { icon: '🏙️', label: '灯火阑珊，繁华都市', value: '熙熙攘攘的城市' },
      { icon: '🏝️', label: '宁静海岛，远离尘嚣', value: '宁静祥和的小岛' },
      { icon: '🌌', label: '星云变幻，无垠深空', value: '神秘浩瀚的星空' },
    ],
    type: 'options',
  },
  {
    id: 'question-49',
    text: '若能为心灵找一处隐居之所，你会选择怎样的居所？',
    options: [
      { icon: '🏔️', label: '云端木屋，俯瞰大地', value: '山顶的小木屋' },
      { icon: '🌲', label: '森林深处，与世无争', value: '森林中的隐居小屋' },
      { icon: '🏝️', label: '海岛静谧，碧海蓝天', value: '远离喧嚣的海岛' },
      { icon: '📚', label: '城市一隅，书香为伴', value: '城市中的书房或阁楼' },
      { icon: '🏰', label: '古堡深居，历史沉淀', value: '充满历史感的古老建筑' },
    ],
    type: 'options',
  },
  {
    id: 'question-50',
    text: '若能与逝去的时光对话，你最想对哪个年龄段的自己说些什么？',
    options: [
      { icon: '👶', label: '童年纯真，心怀梦想', value: '童年时期的自己' },
      { icon: '👦', label: '青涩年华，迷茫探索', value: '青少年时期的自己' },
      { icon: '👨', label: '成年转折，选择人生', value: '刚成年的自己' },
      { icon: '🧓', label: '中年沉淀，承担责任', value: '中年时期的自己' },
      { icon: '⏳', label: '时间长河，每个节点', value: '人生中的每个关键时刻' },
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