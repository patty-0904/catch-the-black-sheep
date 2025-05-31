'use client';
import React, { useRef, useEffect, useState } from 'react';

const Sheep = ({ id, type, position, direction, onClick, sheepRefs }) => {
  const ref = useRef(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (ref.current) {
      sheepRefs.current[id] = {
        ref: ref,
        type,
        position,
        direction,
      };
    }

    return () => {
      delete sheepRefs.current[id];
    };
  }, [ref, id, type, position, direction, sheepRefs]);

  const handleClick = () => {
    setIsFading(true); // 啟動淡出
    setTimeout(() => {
      onClick(); // 淡出結束後觸發父層刪除
    }, 200); // 與動畫時間同步
  };

  const src = type === 'black' ? '/images/black.png' : '/images/white.png';

  return (
    <img
      ref={ref}
      src={src}
      alt={`${type} sheep`}
      className={`absolute w-32 h-32 cursor-pointer transition-opacity duration-200 ${isFading ? 'opacity-0' : 'opacity-100'}`}
      style={{
        left: position.x,
        top: position.y,
        transition: 'opacity 0.2s ease, transform 0.1s linear',
      }}
      onClick={handleClick}
    />
  );
};

export default Sheep;
