# 🐍 Ionic Snake Game

[English](./README_EN.md) | [中文](./README.md)

A modern Snake game developed with Ionic React and TypeScript, supporting cross-platform deployment.

## ✨ Features

- 🎮 Classic Snake game gameplay
- 📱 Responsive design, supporting mobile and desktop
- 🎵 Toggleable game sound effects
- 🏆 Local high score records
- ⏸️ Game pause/resume functionality
- 🎯 Multiple control methods: keyboard, touch buttons
- 🌙 Dark theme support
- 🚀 Based on Ionic framework, can be compiled to native mobile apps

## 🎯 Gameplay

- Use arrow keys or WASD keys to control snake movement
- Press spacebar to pause/resume game
- Use on-screen direction buttons on mobile devices
- Eat food to score +10 points
- Game ends when hitting walls or snake's own body
- Challenge for higher scores!

## 🛠️ Tech Stack

- **Frontend Framework**: Ionic React 8.5.0
- **Development Language**: TypeScript
- **Build Tool**: Vite 5.2.0
- **Mobile**: Capacitor 7.3.0
- **Testing Framework**: Vitest + Cypress
- **Code Linting**: ESLint

## 📦 Project Structure

```
src/
├── components/
│   ├── Snake.tsx           # Core game component
│   └── Snake.css          # Game styles
├── pages/
│   ├── Home.tsx           # Main page
│   └── Home.css          # Main page styles
├── theme/
│   └── variables.css      # Theme variables
├── App.tsx                # App entry component
├── main.tsx              # App entry file
└── setupTests.ts         # Test configuration
```

## 🚀 Quick Start

### Requirements

- Node.js >= 16
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

Visit `http://localhost:5173` to start playing

### Build Project

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 📱 Mobile Deployment

### Add Platforms

```bash
# iOS
npx cap add ios

# Android
npx cap add android
```

### Build and Sync

```bash
npm run build
npx cap sync
```

### Run on Device

```bash
# iOS
npx cap run ios

# Android
npx cap run android
```

## 🧪 Testing

### Unit Tests

```bash
npm run test.unit
```

### E2E Tests

```bash
npm run test.e2e
```

### Code Linting

```bash
npm run lint
```

## 🎮 Game Features

### Control Methods
- **Keyboard Control**: Arrow keys or WASD
- **Touch Control**: On-screen direction buttons
- **Pause Control**: Spacebar

### Sound System
- Eat food sound: `eat-sound.mp3`
- Game over sound: `game-over-sound.mp3`
- Toggle sound effects in-game

### Data Persistence
- High score records saved in localStorage
- Sound settings saved in localStorage

### Game Configuration
- Game grid size: 20x20
- Game speed: 150ms/frame
- Initial snake length: 1 segment
- Scoring: +10 points per food

## 🎨 Theme Customization

The project supports Ionic's theming system, customizable in `src/theme/variables.css`:

- Color themes
- Dark mode
- Component styles

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📧 Contact

For questions or suggestions, please create an Issue or contact the developer.

---

🎉 Enjoy the game! Challenge for higher scores!
