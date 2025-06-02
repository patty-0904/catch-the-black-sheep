// pages/game/success.js
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Success = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen bg-yellow-100 flex items-center justify-center flex-col gap-6">
      <h1 className="text-4xl font-bold text-green-700">🎉 恭喜過關！</h1>
      <button
        onClick={() => router.push('/game/level-1')}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl text-lg"
      >
        再玩一次
      </button>
    </div>
  );
};

export default Success;