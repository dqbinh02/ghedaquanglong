import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import dynamic from 'next/dynamic'
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin", "vietnamese"] })

// Dynamically import Header with no SSR
const Header = dynamic(() => import('@/components/Header'), {
  ssr: false
})

export const metadata: Metadata = {
  title: {
    default: "Ghế Đá Quang Long - Chuyên sản xuất ghế đá công viên",
    template: "%s | Ghế Đá Quang Long",
  },
  description:
    "Công ty TNHH Ghế Đá Quang Long chuyên sản xuất ghế đá công viên, bàn granito, gạch lát sân chất lượng cao với hơn 10 năm kinh nghiệm.",
  keywords: "ghế đá, công viên, granito, gạch lát sân, đá ốp lát, Quang Long",
  authors: [{ name: "Ghế Đá Quang Long" }],
  creator: "Ghế Đá Quang Long",
  publisher: "Ghế Đá Quang Long",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
