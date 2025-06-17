"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"

import { DropdownMenu } from "./DropdownMenu"

import { getCategories } from "../lib/categories"

const Navigation = ({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) => {
  const navigation = [
    { name: "Trang Chủ", href: "/" },
    { name: "Sản Phẩm", href: "/products" },
    { name: "Về Chúng Tôi", href: "/about" },
    { name: "Liên Hệ", href: "/contact" },
  ]

  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getCategories()
      .then((data) => {
        setCategories(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Không thể tải danh mục sản phẩm")
        setLoading(false)
      })
  }, [])

  const productDropdown = [
    { name: "Tất cả sản phẩm", href: "/products" },
    ...categories.map((cat) => ({
      name: cat,
      href: `/products?category=${encodeURIComponent(cat)}`
    }))
  ]

  return (
    <nav className={isMobile ? "flex flex-col space-y-4" : "hidden md:flex items-center space-x-8"}>
      {navigation.map((item) => {
        if (!isMobile && item.name === "Sản Phẩm") {
          return (
            <DropdownMenu
              key={item.name}
              label="Sản Phẩm"
              labelHref="/products"
              items={
                loading
                  ? [{ name: "Đang tải...", href: "/products" }]
                  : error
                  ? [{ name: error, href: "/products" }]
                  : productDropdown
              }
            />
          )
        }
        return (
        <Link
          key={item.name}
          href={item.href}
          className="text-gray-700 hover:text-[#005c47] font-medium transition-colors"
          onClick={onClose}
        >
          {item.name}
        </Link>
        )
      })}
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
            <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white overflow-hidden border border-gray-200">
              <img src="/logo.png" alt="Logo Quang Long" className="object-contain w-14 h-14" />
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
