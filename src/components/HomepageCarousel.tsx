"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const originalSlides = [
  "/homepage_slide/7.JPG",
  "/homepage_slide/2.jpg",
  "/homepage_slide/1.jpg",
  "/homepage_slide/3.jpg",
  "/homepage_slide/4.JPG",
  "/homepage_slide/5.JPG",
  "/homepage_slide/6.JPG"
]

// Create infinite loop: [last, ...original, first]
const slideImages = [
  originalSlides[originalSlides.length - 1], // Clone of last slide
  ...originalSlides,
  originalSlides[0] // Clone of first slide
]

export default function HomepageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(1) // Start at first real slide (index 1)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-advance slides every 1.5 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      handleNext()
    }, 1500)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentSlide])

  // Handle seamless transition when reaching cloned slides
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentSlide === 0) {
        // We're at the cloned last slide, jump to the real last slide
        setCurrentSlide(originalSlides.length)
      } else if (currentSlide === slideImages.length - 1) {
        // We're at the cloned first slide, jump to the real first slide
        setCurrentSlide(1)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('transitionend', handleTransitionEnd)
      return () => container.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [currentSlide])

  const handleNext = () => {
    setCurrentSlide(prev => prev + 1)
  }

  const handlePrev = () => {
    setCurrentSlide(prev => prev - 1)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index + 1) // +1 because of the cloned first slide
  }

  // Calculate the real slide index for display
  const getRealSlideIndex = () => {
    if (currentSlide === 0) return originalSlides.length - 1
    if (currentSlide === slideImages.length - 1) return 0
    return currentSlide - 1
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg">
      <div
        ref={containerRef}
        className="relative w-full h-full flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slideImages.map((src, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={src}
              alt={`Slide ${idx}`}
              fill
              className="object-cover"
              priority={currentSlide === idx}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {originalSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === getRealSlideIndex()
                ? "bg-white"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10">
        {getRealSlideIndex() + 1} / {originalSlides.length}
      </div>
    </div>
  )
} 