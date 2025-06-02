'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LevelSelect() {
  const [selectedLevel, setSelectedLevel] = useState(1)
  const router = useRouter()

  const handleStart = () => {
    router.push(`/game/play?level=${selectedLevel}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF6E3] font-pixel text-gray-800 p-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">選擇關卡</h1>

      <div className="flex space-x-4 mb-8">
        {[1, 2, 3, 4, 5].map(level => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`w-14 h-14 rounded-full text-lg font-bold flex items-center justify-center transition-all duration-200 cursor-pointer
              ${
                selectedLevel === level
                  ? 'bg-black text-white'
                  : 'bg-gray-400 text-white hover:bg-yellow-600 hover:scale-105'
              }`}
          >
            {level}
          </button>
        ))}
      </div>

      <p className="mb-6 text-lg">目前選擇：關卡 {selectedLevel}</p>

      <button
        onClick={handleStart}
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
      >
        開始遊戲
      </button>
    </div>
  )
}
