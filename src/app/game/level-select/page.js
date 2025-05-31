'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LevelSelect() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState(null)

  const handleStart = () => {
    if (selectedLevel) {
      router.push(`/game/level-${selectedLevel}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#C7F0D8] flex flex-col items-center justify-center p-6 font-pixel">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">選擇關卡</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 rounded text-lg transition-all border-2 ${
              selectedLevel === level
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-400 hover:border-black'
            }`}
          >
            關卡 {level}
          </button>
        ))}
      </div>

      <button
        onClick={handleStart}
        disabled={!selectedLevel}
        className={`px-6 py-3 rounded text-lg font-bold transition ${
          selectedLevel
            ? 'bg-black text-white hover:bg-gray-800'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}
      >
        開始遊戲
      </button>
    </div>
  )
}
