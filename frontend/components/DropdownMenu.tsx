import React, { ReactNode, useState } from "react"
import Link from "next/link"

interface DropdownMenuProps {
  label: ReactNode
  items: { name: string; href: string }[]
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items }) => {
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
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center space-x-2 focus:outline-none">
        {label}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
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
