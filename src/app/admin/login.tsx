"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem("token", data.access_token)
        router.push("/admin")
      }
    } catch (error) {
      console.error("Error logging in:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center">Đăng nhập Admin</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          className="w-full border px-3 py-2 rounded-lg"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full border px-3 py-2 rounded-lg"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-[#005c47] text-white py-2 rounded-lg hover:bg-[#004a3a] transition-colors"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  )
}
