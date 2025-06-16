import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText, IonToggle, IonItem, IonLabel } from '@ionic/react';
import './Snake.css';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  food: Position;
  direction: string;
  score: number;
  gameOver: boolean;
  gameStarted: boolean;
  isPaused: boolean;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const GAME_SPEED = 150;

const Snake: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: { x: 15, y: 15 },
    direction: 'RIGHT',
    score: 0,
    gameOver: false,
    gameStarted: false,
    isPaused: false,
  });

  const [highScore, setHighScore] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const eatSoundRef = useRef<HTMLAudioElement | null>(null);
  const gameOverSoundRef = useRef<HTMLAudioElement | null>(null);

  // 初始化音效
  useEffect(() => {
    eatSoundRef.current = new Audio('/eat-sound.mp3');
    gameOverSoundRef.current = new Audio('/game-over-sound.mp3');
    
    // 设置音量
    if (eatSoundRef.current) eatSoundRef.current.volume = 0.3;
    if (gameOverSoundRef.current) gameOverSoundRef.current.volume = 0.3;

    // 从localStorage读取最高分
    const savedHighScore = localStorage.getItem('snake-high-score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }

    // 从localStorage读取音效设置
    const savedSoundSetting = localStorage.getItem('snake-sound-enabled');
    if (savedSoundSetting !== null) {
      setSoundEnabled(JSON.parse(savedSoundSetting));
    }
  }, []);

  // 播放音效
  const playSound = useCallback((soundRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (soundEnabled && soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(() => {
        // 忽略播放错误
      });
    }
  }, [soundEnabled]);

  // 保存最高分
  const updateHighScore = useCallback((score: number) => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snake-high-score', score.toString());
    }
  }, [highScore]);

  // 切换音效
  const toggleSound = () => {
    const newSoundEnabled = !soundEnabled;
    setSoundEnabled(newSoundEnabled);
    localStorage.setItem('snake-sound-enabled', JSON.stringify(newSoundEnabled));
  };

  // 生成随机食物位置
  const generateFood = useCallback((snake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // 检查碰撞
  const checkCollision = useCallback((head: Position, snake: Position[]): boolean => {
    // 检查边界碰撞
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // 检查自身碰撞
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // 游戏循环
  const gameLoop = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.gameStarted || prevState.gameOver || prevState.isPaused) {
        return prevState;
      }

      const { snake, direction, food, score } = prevState;
      const head = { ...snake[0] };

      // 根据方向移动蛇头
      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // 检查碰撞
      if (checkCollision(head, snake)) {
        return { ...prevState, gameOver: true };
      }

      const newSnake = [head, ...snake];

      // 检查是否吃到食物
      if (head.x === food.x && head.y === food.y) {
        const newFood = generateFood(newSnake);
        return {
          ...prevState,
          snake: newSnake,
          food: newFood,
          score: score + 10,
        };
      } else {
        // 移除蛇尾
        newSnake.pop();
        return {
          ...prevState,
          snake: newSnake,
        };
      }
    });
  }, [checkCollision, generateFood]);

  // 键盘控制
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const { direction } = gameState;
    let newDirection = direction;

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (direction !== 'DOWN') newDirection = 'UP';
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (direction !== 'UP') newDirection = 'DOWN';
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (direction !== 'RIGHT') newDirection = 'LEFT';
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (direction !== 'LEFT') newDirection = 'RIGHT';
        break;
      case ' ':
        event.preventDefault();
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
        return;
    }

    if (newDirection !== direction) {
      setGameState(prev => ({ ...prev, direction: newDirection }));
    }
  }, [gameState.gameStarted, gameState.gameOver, gameState.direction]);

  // 触摸控制
  const handleDirectionChange = (newDirection: string) => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const { direction } = gameState;
    const opposites = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT'
    };

    if (opposites[direction as keyof typeof opposites] !== newDirection) {
      setGameState(prev => ({ ...prev, direction: newDirection }));
    }
  };

  // 开始游戏
  const startGame = () => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: generateFood(INITIAL_SNAKE),
      direction: 'RIGHT',
      score: 0,
      gameOver: false,
      gameStarted: true,
      isPaused: false,
    });
  };

  // 重置游戏
  const resetGame = () => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: generateFood(INITIAL_SNAKE),
      direction: 'RIGHT',
      score: 0,
      gameOver: false,
      gameStarted: false,
      isPaused: false,
    });
  };

  // 暂停/继续游戏
  const togglePause = () => {
    if (gameState.gameStarted && !gameState.gameOver) {
      setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
    }
  };

  // 监听游戏状态变化，处理音效和最高分
  useEffect(() => {
    if (gameState.gameOver && gameState.score > 0) {
      playSound(gameOverSoundRef);
      updateHighScore(gameState.score);
    }
  }, [gameState.gameOver, gameState.score, playSound, updateHighScore]);

  // 监听分数变化，播放吃食物音效
  const prevScoreRef = useRef(gameState.score);
  useEffect(() => {
    if (gameState.score > prevScoreRef.current && gameState.gameStarted) {
      playSound(eatSoundRef);
    }
    prevScoreRef.current = gameState.score;
  }, [gameState.score, gameState.gameStarted, playSound]);

  // 设置游戏循环定时器
  useEffect(() => {
    const gameInterval = setInterval(gameLoop, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [gameLoop]);

  // 添加键盘事件监听
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="snake-game">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>贪吃蛇游戏</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div className="game-info">
            <div className="score-display">
              <IonText color="primary">
                <h2>分数: {gameState.score}</h2>
              </IonText>
              <IonText color="secondary">
                <h3>最高分: {highScore}</h3>
              </IonText>
            </div>
            {gameState.gameOver && (
              <IonText color="danger">
                <h3>游戏结束!</h3>
                {gameState.score === highScore && gameState.score > 0 && (
                  <p>🎉 新纪录！</p>
                )}
              </IonText>
            )}
            {gameState.isPaused && gameState.gameStarted && !gameState.gameOver && (
              <IonText color="warning">
                <h3>游戏暂停</h3>
              </IonText>
            )}
          </div>

          <div className="game-board">
            {Array.from({ length: GRID_SIZE }).map((_, row) =>
              Array.from({ length: GRID_SIZE }).map((_, col) => {
                const isSnake = gameState.snake.some(segment => segment.x === col && segment.y === row);
                const isFood = gameState.food.x === col && gameState.food.y === row;
                const isHead = gameState.snake[0]?.x === col && gameState.snake[0]?.y === row;

                return (
                  <div
                    key={`${row}-${col}`}
                    className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''} ${isHead ? 'head' : ''}`}
                  />
                );
              })
            )}
          </div>

          <div className="game-controls">
            {!gameState.gameStarted ? (
              <IonButton expand="block" onClick={startGame}>
                开始游戏
              </IonButton>
            ) : (
              <>
                <div className="control-buttons">
                  <IonButton onClick={togglePause} disabled={gameState.gameOver}>
                    {gameState.isPaused ? '继续' : '暂停'}
                  </IonButton>
                  <IonButton onClick={resetGame} color="danger">
                    重新开始
                  </IonButton>
                </div>
              </>
            )}
          </div>

          {/* 方向控制按钮 */}
          <div className="direction-controls">
            <div className="control-row">
              <IonButton
                size="large"
                onClick={() => handleDirectionChange('UP')}
                disabled={!gameState.gameStarted || gameState.gameOver}
              >
                ↑
              </IonButton>
            </div>
            <div className="control-row">
              <IonButton
                size="large"
                onClick={() => handleDirectionChange('LEFT')}
                disabled={!gameState.gameStarted || gameState.gameOver}
              >
                ←
              </IonButton>
              <IonButton
                size="large"
                onClick={() => handleDirectionChange('DOWN')}
                disabled={!gameState.gameStarted || gameState.gameOver}
              >
                ↓
              </IonButton>
              <IonButton
                size="large"
                onClick={() => handleDirectionChange('RIGHT')}
                disabled={!gameState.gameStarted || gameState.gameOver}
              >
                →
              </IonButton>
            </div>
          </div>

          {/* 游戏设置 */}
          <div className="game-settings">
            <IonItem>
              <IonLabel>音效</IonLabel>
              <IonToggle checked={soundEnabled} onIonChange={toggleSound} />
            </IonItem>
          </div>

          <div className="game-instructions">
            <IonText color="medium">
              <p>使用方向键或WASD控制蛇的移动</p>
              <p>按空格键暂停/继续游戏</p>
              <p>也可以使用下方的方向按钮控制</p>
            </IonText>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default Snake;
