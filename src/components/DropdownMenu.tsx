import React, { ReactNode, useState } from "react"
import Link from "next/link"

interface DropdownMenuProps {
  label: string
  labelHref: string
  items: { name: string; href: string }[]
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, labelHref, items }) => {
  const [open, setOpen] = useState(false)
  const hideTimeout = React.useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current)
      hideTimeout.current = null
    }
    setOpen(true)
  }

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setOpen(false)
    }, 180)
  }

  React.useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
    }
  }, [])

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={labelHref} className="flex items-center focus:outline-none select-none group">
        <span className="text-gray-700 hover:text-[#005c47] font-medium transition-colors cursor-pointer">
          {label}
        </span>
      </Link>
      <button
        className="ml-1 w-5 h-5 flex items-center justify-center focus:outline-none"
        onClick={(e) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
        aria-label="Mở danh mục sản phẩm"
        tabIndex={-1}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full min-w-full w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-auto max-h-[60vh]">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
