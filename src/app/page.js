// src/app/page.js

'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-8">
      <Image src="/sheep-icon.png" alt="抓黑羊" width={100} height={100} />
      <h1 className="text-4xl font-bold mt-6 mb-4">🐑 抓黑羊遊戲</h1>
      <p className="text-lg mb-8">點擊開始挑戰你的反應力吧！</p>
      <button
        className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
        onClick={() => router.push('/game')}
      >
        開始遊戲
      </button>
    </div>
  )
}
