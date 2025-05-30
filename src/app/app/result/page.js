'use client'

import { useRouter } from 'next/navigation'

export default function ResultPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-100 text-center px-4">
      <h1 className="text-4xl font-bold mb-6">🎮 遊戲結束</h1>
      <p className="mb-8 text-lg">感謝你的挑戰！你可以選擇回到首頁或重新開始。</p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          回首頁
        </button>
        <button
          onClick={() => router.push('/game')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          重新挑戰
        </button>
      </div>
    </div>
  )
}
