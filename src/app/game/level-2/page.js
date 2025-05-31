'use client'

import { useEffect, useState } from 'react'

export default function Level2Page() {
  const [countdown, setCountdown] = useState(3)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setGameStarted(true)
    }
  }, [countdown])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#C7F0D8] font-pixel">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">關卡 2 - 普通</h1>
      {!gameStarted ? (
        <p className="text-lg text-gray-800">遊戲開始倒數：{countdown}</p>
      ) : (
        <p className="text-lg text-gray-800">遊戲進行中！（這裡將顯示羊群）</p>
      )}
    </div>
  )
}