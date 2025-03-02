# See You Story - 故事解析应用

See You Story是一个基于React+TypeScript开发的故事解析应用，帮助用户深入理解故事背后的含义和主题。

## 功能特点

- 用户注册和登录系统
- 浏览不同类型的故事设定
- 生成故事分析卡片
- 与故事角色无限次讨论（付费功能）
- 个性化订阅方案

## 技术栈

- React 19
- TypeScript
- React Router v6
- Ant Design 4
- Axios

## 本地开发

### 前提条件

- Node.js (v16+)
- npm 或 yarn

### 安装步骤

1. 克隆仓库
   ```
   git clone https://github.com/yourusername/see-you-story.git
   cd see-you-story
   ```

2. 安装依赖
   ```
   npm install
   ```
   或
   ```
   yarn
   ```

3. 运行开发服务器
   ```
   npm start
   ```
   或
   ```
   yarn start
   ```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 自定义端口

如果3000端口已被占用或需要使用其他端口，可以通过以下方式修改：

1. 方法一：创建`.env`文件在项目根目录，添加以下内容：
   ```
   PORT=3001
   ```
   (将3001替换为你想要的端口号)

2. 方法二：直接在命令行中指定端口：
   ```
   PORT=3001 npm start
   ```
   或
   ```
   PORT=3001 yarn start
   ```

3. 方法三：在`package.json`中添加自定义脚本：
   ```json
   "scripts": {
     "start": "react-scripts start",
     "dev": "PORT=3001 react-scripts start"
   }
   ```
   然后运行：
   ```
   npm run dev
   ```

## 项目结构

```
src/
├── api/           # API服务
├── assets/        # 静态资源
├── components/    # 可复用组件
├── context/       # React上下文
├── hooks/         # 自定义钩子
├── pages/         # 页面组件
├── types/         # TypeScript类型定义
└── utils/         # 工具函数
```

## API文档

详细的API文档可在 [API文档](https://api-docs.see-you-story.com) 找到。

## 后端服务

该前端应用依赖于Node.js后端服务，可在另一个仓库中找到。

## 贡献

欢迎提交Pull Request和Issue。

## 许可证

[MIT License](LICENSE)

## 联系方式

如有问题或建议，请发送邮件至 support@see-you-story.com
