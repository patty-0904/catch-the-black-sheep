'use client';
import React, { useEffect, useRef, useState } from 'react';
import Sheep from '@/app/components/Sheep';
import FallingHeart from '@/app/components/FallingHeart';

const sheepCount = {
  black: 5,
  white: 12,
};

const Level1 = () => {
  const [sheepData, setSheepData] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [life, setLife] = useState(3); // 💖 初始三顆愛心
  const sheepRefs = useRef({});

  useEffect(() => {
    const initSheep = [];
    const getRandom = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < sheepCount.black + sheepCount.white; i++) {
      const type = i < sheepCount.black ? 'black' : 'white';

      initSheep.push({
        id: i,
        type,
        position: {
          x: getRandom(0, window.innerWidth - 64),
          y: getRandom(0, window.innerHeight - 64),
        },
        direction: {
          dx: getRandom(-2, 2),
          dy: getRandom(-2, 2),
        },
      });
    }

    setSheepData(initSheep);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSheepData(prev => {
        const updated = prev.map(sheep => {
          let { x, y } = sheep.position;
          let { dx, dy } = sheep.direction;

          x += dx;
          y += dy;

          if (x < 0 || x > window.innerWidth - 64) dx *= -1;
          if (y < 0 || y > window.innerHeight - 64) dy *= -1;

          return {
            ...sheep,
            position: {
              x: Math.max(0, Math.min(window.innerWidth - 64, x)),
              y: Math.max(0, Math.min(window.innerHeight - 64, y)),
            },
            direction: { dx, dy },
          };
        });

        // 碰撞反彈
        for (let i = 0; i < updated.length; i++) {
          for (let j = i + 1; j < updated.length; j++) {
            const a = updated[i];
            const b = updated[j];
            const dx = a.position.x - b.position.x;
            const dy = a.position.y - b.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDist = 64;

            if (distance < minDist) {
              const tempDx = a.direction.dx;
              const tempDy = a.direction.dy;
              updated[i].direction.dx = b.direction.dx;
              updated[i].direction.dy = b.direction.dy;
              updated[j].direction.dx = tempDx;
              updated[j].direction.dy = tempDy;

              const overlap = minDist - distance;
              const moveX = (dx / distance) * (overlap / 2);
              const moveY = (dy / distance) * (overlap / 2);

              updated[i].position.x += moveX;
              updated[i].position.y += moveY;
              updated[j].position.x -= moveX;
              updated[j].position.y -= moveY;
            }
          }
        }

        return updated;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handleSheepClick = (clickedSheep) => {
    setSheepData(prev => {
      if (clickedSheep.type === 'white') {
        setHearts(h => [
          ...h,
          {
            id: Date.now(),
            x: 16,
            y: 16,
          },
        ]);
        setLife(l => Math.max(0, l - 1));

        const newSheep = {
          id: Date.now() + 1,
          type: 'white',
          position: {
            x: Math.random() * (window.innerWidth - 64),
            y: Math.random() * (window.innerHeight - 64),
          },
          direction: {
            dx: Math.random() * 4 - 2,
            dy: Math.random() * 4 - 2,
          },
        };

        return prev.filter(s => s.id !== clickedSheep.id).concat(newSheep);
      } else {
        return prev.filter(s => s.id !== clickedSheep.id);
      }
    });
  };

  return (
    <div className="w-screen h-screen relative bg-green-100 overflow-hidden">
      {/* 愛心 UI */}
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
  );
};

export default Level1;
