"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void
  defaultImage?: string
}

export default function ImageUploader({ onUploadSuccess, defaultImage }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultImage || "")
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (defaultImage) {
      setImageUrl(defaultImage)
    }
  }, [defaultImage])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Vui lòng chọn file ảnh")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Kích thước file không được vượt quá 5MB")
      return
    }

    setIsUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ghe-da-upload")

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      const secureUrl = data.secure_url
      setImageUrl(secureUrl)
      onUploadSuccess(secureUrl)
    } catch (err) {
      setError("Có lỗi xảy ra khi upload ảnh")
      console.error("Upload error:", err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setImageUrl("")
    onUploadSuccess("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click để upload</span> hoặc kéo thả
            </p>
            <p className="text-xs text-gray-500">PNG, JPG hoặc JPEG (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isUploading}
          />
        </label>
      </div>

      {isUploading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005c47]"></div>
          <span className="ml-2 text-gray-600">Đang upload...</span>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-2 rounded-lg">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="relative">
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
} 