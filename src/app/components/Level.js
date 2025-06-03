'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sheep from '@/app/components/Sheep';
import FallingHeart from '@/app/components/FallingHeart';

const sheepCount = {
  black: 5,
  white: 12,
};

const Level = ({ level = 1 }) => {
  const [sheepData, setSheepData] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [life, setLife] = useState(3);
  const [blackCaught, setBlackCaught] = useState(0);
  const [showLevelText, setShowLevelText] = useState(true);

  const sheepRefs = useRef({});
  const containerRef = useRef(null);
  const router = useRouter();

  const SHEEP_SIZE = 64;
  const BASE_SPEED = 2;
  const SPEED = BASE_SPEED + level;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLevelText(false);
    }, 400); // 顯示關卡文字 1 秒
    return () => clearTimeout(timer);
  }, [level]);

  useEffect(() => {
    if (showLevelText) return;
  
    const initSheep = () => {
      const getRandom = (min, max) => Math.random() * (max - min) + min;
      const container = containerRef.current;
      if (!container) return;
  
      const { clientWidth, clientHeight } = container;
      const initial = [];
  
      for (let i = 0; i < sheepCount.black + sheepCount.white; i++) {
        const type = i < sheepCount.black ? 'black' : 'white';
        initial.push({
          id: Date.now() + i + Math.random(),
          type,
          position: {
            x: getRandom(0, clientWidth - SHEEP_SIZE),
            y: getRandom(0, clientHeight - SHEEP_SIZE),
          },
          direction: {
            dx: getRandom(-SPEED, SPEED),
            dy: getRandom(-SPEED, SPEED),
          },
        });
      }
      setSheepData(initial);
    };
  
    initSheep();
  }, [showLevelText]); // 只有在 showLevelText 為 false 時才初始化
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (showLevelText) return; // 開場文字顯示時暫停動作

      const container = containerRef.current;
      if (!container) return;

      const maxW = container.clientWidth;
      const maxH = container.clientHeight;

      setSheepData(prev => {
        const updated = prev.map(sheep => {
          let { x, y } = sheep.position;
          let { dx, dy } = sheep.direction;

          x += dx;
          y += dy;

          if (x < 0 || x > maxW - SHEEP_SIZE) dx = -dx + (Math.random() - 0.5);
          if (y < 0 || y > maxH - SHEEP_SIZE) dy = -dy + (Math.random() - 0.5);


          return {
            ...sheep,
            position: {
              x: Math.max(0, Math.min(maxW - SHEEP_SIZE, x)),
              y: Math.max(0, Math.min(maxH - SHEEP_SIZE, y)),
            },
            direction: { dx, dy },
          };
        });

        // 避免羊重疊
        for (let i = 0; i < updated.length; i++) {
          for (let j = i + 1; j < updated.length; j++) {
            const a = updated[i];
            const b = updated[j];
            const dx = a.position.x - b.position.x;
            const dy = a.position.y - b.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDist = SHEEP_SIZE;

            if (distance < minDist && distance !== 0) {
              const overlap = minDist - distance;
              const moveX = (dx / distance) * (overlap / 2);
              const moveY = (dy / distance) * (overlap / 2);

              updated[i].position.x += moveX;
              updated[i].position.y += moveY;
              updated[j].position.x -= moveX;
              updated[j].position.y -= moveY;
            } else if (distance === 0) {
              updated[i].position.x += Math.random() * 2 - 1;
              updated[i].position.y += Math.random() * 2 - 1;
            }
          }
        }

        return updated;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [SPEED, showLevelText]);

  useEffect(() => {
    if (life <= 0 && blackCaught < sheepCount.black) {
      router.push('/game/fail');
    } else if (blackCaught >= sheepCount.black && life > 0) {
      if (level >= 5) {
        router.push('/game/success'); // 最後一關結束，跳轉 success
      } else {
        router.push(`/game/level-${level + 1}`); // 進入下一關
      }
    }
  }, [life, blackCaught, router, level]);
  

  const handleSheepClick = (clickedSheep) => {
    if (clickedSheep.type === 'white') {
      setLife(prev => {
        const newLife = Math.max(0, prev - 1);
        setHearts(prevHearts => [
          ...prevHearts,
          { id: Date.now() + Math.random(), x: 16, y: 16 },
        ]);
        return newLife;
      });

      setSheepData(prev => {
        const newSheep = {
          id: Date.now() + Math.random(),
          type: 'white',
          position: {
            x: Math.random() * (containerRef.current.clientWidth - SHEEP_SIZE),
            y: Math.random() * (containerRef.current.clientHeight - SHEEP_SIZE),
          },
          direction: {
            dx: Math.random() * 2 * SPEED - SPEED,
            dy: Math.random() * 2 * SPEED - SPEED,
          },
        };
        return prev.filter(s => s.id !== clickedSheep.id).concat(newSheep);
      });
    } else {
      setBlackCaught(prev => prev + 1);
      setSheepData(prev => prev.filter(s => s.id !== clickedSheep.id));
    }
  };

  return (
    <div className="w-screen h-screen bg-[#F3EAC2] flex items-center justify-center p-2">
      <div
        ref={containerRef}
        className="relative w-full max-w-[1024px] h-[calc(100vh-32px)] bg-green-100 rounded-2xl overflow-hidden"
      >
        {/* 關卡提示文字 */}
        {showLevelText && (
          <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm bg-black/80 animate-fade-out-quick">
            <div className="text-white text-5xl font-bold drop-shadow-lg font-pixel animate-pop-in-quick">
              LEVEL {level}
            </div>
          </div>
        )}



        {/* 生命值愛心 */}
        <div className="absolute top-2 left-2 flex gap-2 z-10">
          {[...Array(3)].map((_, i) => (
            <img
              key={i}
              src={i < life ? '/images/heart.png' : '/images/heart_gray.png'}
              alt="life"
              className="w-8 h-8"
            />
          ))}
        </div>

        {/* 羊群 */}
        {sheepData.map(sheep => (
          <Sheep
            key={sheep.id}
            id={sheep.id}
            type={sheep.type}
            position={sheep.position}
            direction={sheep.direction}
            onClick={() => handleSheepClick(sheep)}
            sheepRefs={sheepRefs}
          />
        ))}

        {/* 掉落愛心動畫 */}
        {hearts.map(h => (
          <FallingHeart
            key={h.id}
            x={h.x}
            y={h.y}
            onDone={() => setHearts(prev => prev.filter(ph => ph.id !== h.id))}
          />
        ))}
      </div>
    </div>
  );
};

export default Level;
