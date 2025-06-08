'use client';
import React, { useRef, useEffect, useState } from 'react';

const Sheep = ({ id, type, position, direction, onClick, sheepRefs }) => {
  const ref = useRef(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (ref.current) {
      sheepRefs.current[id] = {
        ref,
        type,
        position,
        direction,
      };
    }
    return () => {
      delete sheepRefs.current[id];
    };
  }, [id, type, position, direction, sheepRefs]);

  const handleClick = () => {
    setIsFading(true);
    setTimeout(() => {
      onClick();
    }, 200);
  };

  const src = type === 'black' ? '/images/black.png' : '/images/white.png';

  return (
    <img
      ref={ref}
      src={src}
      alt={`${type} sheep`}
      className={`
        absolute 
        cursor-pointer 
        transition-opacity duration-200 
        ${isFading ? 'opacity-0' : 'opacity-100'} 
        w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32
        h-auto
      `}
      style={{
        left: position.x,
        top: position.y,
      }}
      onClick={handleClick}
    />
  );
};

export default Sheep;
