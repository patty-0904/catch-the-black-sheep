'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LevelSelect() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [countdown, setCountdown] = useState(null)

  const handleStart = () => {
    if (selectedLevel) {
      setCountdown(3)
    }
  }

  useEffect(() => {
    if (countdown === null) return
    if (countdown === 0) {
      router.push(`/game/level-${selectedLevel}`)
      return
    }

    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, selectedLevel, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#C7F0D8] p-8 font-pixel text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">選擇關卡</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 border-2 rounded transition-all ${
              selectedLevel === level
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-500'
            }`}
          >
            關卡 {level}
          </button>
        ))}
      </div>

      <button
        onClick={handleStart}
        disabled={!selectedLevel}
        className="bg-black text-white px-6 py-3 rounded shadow-md hover:bg-gray-800 disabled:opacity-50"
      >
        開始遊戲
      </button>

      {countdown !== null && (
        <div className="text-4xl font-bold mt-6 animate-pulse">{countdown}</div>
      )}
    </div>
  )
}
