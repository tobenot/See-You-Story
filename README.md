# See You Story - AI原生应用

See You Story是一个基于React+TypeScript开发的AI原生应用

## 技术栈

- React
- TypeScript

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
