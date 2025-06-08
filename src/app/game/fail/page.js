'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const FailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levelParam = searchParams.get('level') || '1';
  const currentLevel = parseInt(levelParam);
  const previousLevel = currentLevel > 1 ? currentLevel - 1 : 1;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen font-pixel text-black p-6 overflow-hidden">
      {/* 背景圖層 */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center filter brightness-100 saturate-110"
        style={{ backgroundImage: "url('/images/wood.png')" }}
      />

      {/* 主要內容 */}
      <div className="animate-fade-in flex flex-col items-center justify-center w-full max-w-3xl gap-6 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-black drop-shadow-[2px_2px_0_#ffffff]">
          <strong>Level Failed</strong>
        </h1>

        <div className="flex flex-wrap justify-center gap-4 w-full">
          <button
            onClick={() => router.push(`/game/level-${previousLevel}`)}
            className="text-xl sm:text-2xl px-6 py-3 bg-[#222] text-white border-[4px] border-black hover:bg-gray-800 pixel-border transition duration-200 font-bold"
          >
            <strong>Previous Level</strong>
          </button>

          <button
            onClick={() => router.push(`/game/level-${currentLevel}`)}
            className="text-xl sm:text-2xl px-6 py-3 bg-[#222] text-white border-[4px] border-black hover:bg-gray-800 pixel-border transition duration-200 font-bold"
          >
            <strong>Retry</strong>
          </button>

          <button
            onClick={() => router.push('/')}
            className="text-xl sm:text-2xl px-6 py-3 bg-[#222] text-white border-[4px] border-black hover:bg-gray-800 pixel-border transition duration-200 font-bold"
          >
            <strong>Home</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function FailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailContent />
    </Suspense>
  );
}
