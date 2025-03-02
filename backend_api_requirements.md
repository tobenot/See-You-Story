# 故事应用后端API需求说明

尊敬的后端开发团队：

我们正在开发的故事生成应用现在需要一些API接口的调整。根据最新的需求变更，用户回答的问题不再是固定的故事元素（如主题、角色等），而是更加灵活的、意象性的问题。以下是详细的API需求说明：

## 1. 故事生成流程

整个应用的流程如下：

1. **问题回答阶段（Step 1）**：用户回答五个问题，这些问题是意象性的，如"当你凝视星空时，内心浮现的第一个画面是什么？"
2. **生成故事（Step 2）**：基于用户回答生成故事的开头和选项
3. **互动推进（Step 3）**：用户选择选项推进故事
4. **结束旅程（Step 4）**：用户结束故事，生成分析卡片和世界观卡片
5. **处理卡片（Step 5-6）**：用户可以丢弃或收藏卡片
6. **提取角色（Step 7）**：从故事中提取角色
7. **保存内容（Step 8）**：保存生成的卡片和角色

## 2. API接口需求

### 2.1 生成故事接口 `/story/generate`

**请求方法**：POST

**请求体格式**：
```json
{
  "questionsWithAnswers": [
    {
      "questionId": "question-1",
      "questionText": "当你凝视星空时，内心浮现的第一个画面是什么？",
      "answer": "广阔无垠的宇宙"
    },
    {
      "questionId": "question-2",
      "questionText": "如果你可以化身为一种元素，你会选择什么？",
      "answer": "火焰"
    },
    // ... 更多问题和答案
  ]
}
```

**预期响应**：
```json
{
  "id": "story-123456",
  "title": "故事标题",
  "content": "故事内容...",
  "firstChapterId": "chapter-1"
}
```

### 2.2 获取故事章节接口 `/story/{storyId}/chapters/{chapterId}`

**请求方法**：GET

**预期响应**：
```json
{
  "id": "chapter-1",
  "title": "章节标题",
  "content": "章节内容...",
  "options": [
    {
      "id": "option-1",
      "text": "选项1描述"
    },
    {
      "id": "option-2",
      "text": "选项2描述"
    },
    {
      "id": "option-3",
      "text": "选项3描述"
    }
  ]
}
```

### 2.3 选择故事选项接口 `/story/{storyId}/chapters/{chapterId}/select`

**请求方法**：POST

**请求体格式**：
```json
{
  "optionId": "option-1"
}
```

**预期响应**：
```json
{
  "nextChapterId": "chapter-2"
}
```

### 2.4 获取故事分析接口 `/story/{storyId}/analysis`

**请求方法**：GET

**预期响应**：
```json
{
  "analysisCard": {
    "id": "analysis-card-123",
    "title": "分析卡片",
    "content": "基于你的选择，我们分析出...",
    "tags": ["勇敢", "好奇", "创新"]
  },
  "worldViewCard": {
    "id": "world-view-card-123",
    "content": "你的故事发生在一个...",
    "tags": ["魔法", "科技", "自然"]
  }
}
```

### 2.5 提取角色接口 `/story/{storyId}/extract-characters`

**请求方法**：POST

**预期响应**：
```json
{
  "characters": [
    {
      "id": "character-1",
      "name": "角色名称",
      "description": "角色描述",
      "imageUrl": "角色图像URL",
      "personality": "角色性格特点"
    }
    // ... 更多角色
  ]
}
```

## 3. 订阅相关接口

### 3.1 获取用户限制信息 `/user/limits`

**请求方法**：GET

**预期响应**：
```json
{
  "isSubscribed": false,
  "dailyStoryLimit": 3,
  "remainingStories": 2,
  "dailyCharacterChatLimit": 10,
  "remainingChats": 8
}
```

## 4. 其他说明

1. 所有API应返回标准的HTTP状态码：
   - 200: 成功
   - 400: 请求格式错误
   - 401: 未授权
   - 403: 权限不足（如超出免费限额）
   - 404: 资源不存在
   - 500: 服务器错误

2. 用户每天有免费的故事生成次数限制（默认3次）
3. 非订阅用户不能刷新生成的角色
4. 请确保所有响应包含合适的错误消息和状态码

希望这份说明能帮助您理解我们的需求。如有任何问题，请随时联系前端开发团队。

谢谢您的配合！

前端开发团队 