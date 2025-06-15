"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"

const Navigation = ({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) => {
  const navigation = [
    { name: "Trang Chủ", href: "/" },
    { name: "Sản Phẩm", href: "/products" },
    { name: "Về Chúng Tôi", href: "/about" },
    { name: "Liên Hệ", href: "/contact" },
  ]

  return (
    <nav className={isMobile ? "flex flex-col space-y-4" : "hidden md:flex items-center space-x-8"}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-gray-700 hover:text-[#005c47] font-medium transition-colors"
          onClick={onClose}
        >
          {item.name}
        </Link>
      ))}
      <a
        href="tel:+84123456789"
        className={`bg-[#005c47] text-white px-4 py-2 rounded-lg flex items-center space-x-2 ${
          isMobile ? "w-fit" : "hover:bg-[#004a3a] transition-colors"
        }`}
      >
        <Phone className="w-4 h-4" />
        <span>{isMobile ? "Hotline: 0123 456 789" : "Hotline"}</span>
      </a>
    </nav>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#005c47] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">QL</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#005c47]">Ghế Đá Quang Long</h1>
              <p className="text-sm text-gray-600">Chất lượng - Uy tín - Bền vững</p>
            </div>
          </Link>

          <Navigation />

          <button 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Navigation isMobile onClose={() => setIsMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  )
}
