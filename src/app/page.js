'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState(1)
  const router = useRouter()

  const handleStart = () => {
    router.push(`/game/level-${selectedLevel}`);
  };
  

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-screen bg-[#D3FCD5] font-pixel text-gray-800 p-6">
      {/* 標題：抓黑羊 */}
      <h1 className="text-5xl font-bold mb-4 drop-shadow-lg text-black">抓黑羊</h1>
      <h2 className="text-2xl mb-8 text-gray-700 drop-shadow-sm">選擇關卡</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`w-16 h-16 rounded-full flex items-center justify-center border-4 font-bold text-lg transition-all duration-300 cursor-pointer ${
              selectedLevel === level
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-500 hover:bg-gray-300 hover:border-black'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <p className="mb-6 text-lg">目前選擇：關卡 {selectedLevel}</p>

      <button
        onClick={handleStart}
        className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 cursor-pointer"
      >
        開始遊戲
      </button>
    </div>
  )
}
