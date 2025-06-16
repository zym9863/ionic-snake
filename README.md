# 🐍 Ionic Snake Game

[English](./README_EN.md) | [中文](./README.md)


一个使用 Ionic React 和 TypeScript 开发的现代化贪吃蛇游戏，支持跨平台部署。

## ✨ 特性

- 🎮 经典贪吃蛇游戏玩法
- 📱 响应式设计，支持移动端和桌面端
- 🎵 可切换的游戏音效
- 🏆 本地最高分记录
- ⏸️ 游戏暂停/继续功能
- 🎯 多种控制方式：键盘、触屏按钮
- 🌙 支持暗色主题
- 🚀 基于 Ionic 框架，可编译为原生移动应用

## 🎯 游戏玩法

- 使用方向键或 WASD 键控制蛇的移动
- 按空格键暂停/继续游戏
- 移动端可使用屏幕上的方向按钮
- 吃到食物得分 +10
- 撞墙或撞到自己身体游戏结束
- 挑战更高分数！

## 🛠️ 技术栈

- **前端框架**: Ionic React 8.5.0
- **开发语言**: TypeScript
- **构建工具**: Vite 5.2.0
- **移动端**: Capacitor 7.3.0
- **测试框架**: Vitest + Cypress
- **代码检查**: ESLint

## 📦 项目结构

```
src/
├── components/
│   ├── Snake.tsx           # 核心游戏组件
│   └── Snake.css          # 游戏样式
├── pages/
│   ├── Home.tsx           # 主页面
│   └── Home.css          # 主页面样式
├── theme/
│   └── variables.css      # 主题变量
├── App.tsx                # 应用入口组件
├── main.tsx              # 应用入口文件
└── setupTests.ts         # 测试配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173` 开始游戏

### 构建项目

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📱 移动端部署

### 添加平台

```bash
# iOS
npx cap add ios

# Android
npx cap add android
```

### 构建并同步

```bash
npm run build
npx cap sync
```

### 在设备上运行

```bash
# iOS
npx cap run ios

# Android
npx cap run android
```

## 🧪 测试

### 单元测试

```bash
npm run test.unit
```

### E2E 测试

```bash
npm run test.e2e
```

### 代码检查

```bash
npm run lint
```

## 🎮 游戏特性详解

### 控制方式
- **键盘控制**: 方向键 或 WASD
- **触屏控制**: 屏幕方向按钮
- **暂停控制**: 空格键

### 音效系统
- 吃食物音效：`eat-sound.mp3`
- 游戏结束音效：`game-over-sound.mp3`
- 可在游戏中切换音效开关

### 数据持久化
- 最高分记录保存在 localStorage
- 音效设置保存在 localStorage

### 游戏配置
- 游戏网格大小：20x20
- 游戏速度：150ms/帧
- 初始蛇身长度：1格
- 得分机制：每吃一个食物 +10分

## 🎨 主题定制

项目支持 Ionic 的主题系统，可在 `src/theme/variables.css` 中自定义：

- 颜色主题
- 暗色模式
- 组件样式

## 📄 许可证

本项目采用 MIT 许可证。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系

如有问题或建议，请创建 Issue 或联系开发者。

---

🎉 享受游戏乐趣！挑战更高分数！
