// pages/game/fail.js
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Fail = () => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen bg-red-100 flex items-center justify-center flex-col gap-6">
      <h1 className="text-4xl font-bold text-red-600">💥 失敗了，再試一次！</h1>
      <button
        onClick={() => router.push('/game/level-1')}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl text-lg"
      >
        返回第一關
      </button>
    </div>
  );
};

export default Fail;
