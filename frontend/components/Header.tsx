"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Trang Chủ", href: "/" },
    { name: "Sản Phẩm", href: "/products" },
    { name: "Về Chúng Tôi", href: "/about" },
    { name: "Liên Hệ", href: "/contact" },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#005c47] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">QL</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#005c47]">Ghế Đá Quang Long</h1>
              <p className="text-sm text-gray-600">Chất lượng - Uy tín - Bền vững</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#005c47] font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="tel:+84123456789"
              className="bg-[#005c47] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#004a3a] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Hotline</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#005c47] font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:+84123456789"
                className="bg-[#005c47] text-white px-4 py-2 rounded-lg flex items-center space-x-2 w-fit"
              >
                <Phone className="w-4 h-4" />
                <span>Hotline: 0123 456 789</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
