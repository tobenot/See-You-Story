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

## GitHub Pages部署指南

要启用GitHub Pages自动部署，请按照以下步骤操作：

1. 在GitHub仓库页面，点击"Settings"（设置）
2. 在左侧导航栏中找到"Pages"选项
3. 在"Build and deployment"（构建和部署）部分:
   - Source: 选择"GitHub Actions"
4. 确保修改package.json中的homepage字段，将`[您的GitHub用户名]`替换为您的实际GitHub用户名
5. 将代码推送到main分支，GitHub Actions将自动执行部署流程
6. 部署完成后，您可以通过 https://[您的GitHub用户名].github.io/See-You-Story 访问您的应用

注意：首次部署可能需要几分钟时间才能完成。
