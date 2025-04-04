'use client'

import { useState, useCallback, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

interface CarouselProps {
  items: Array<{
    title: string
    client: string
    description: string
    metrics: Array<{
      name: string
      value: string
    }>
    image: string
  }>
}

export const Carousel = ({ items }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex >= items.length) nextIndex = 0
      if (nextIndex < 0) nextIndex = items.length - 1
      return nextIndex
    })
  }, [items.length])

  const handleDotClick = useCallback((index: number) => {
    const newDirection = index > currentIndex ? 1 : -1
    setDirection(newDirection)
    setCurrentIndex(index)
  }, [currentIndex])

  const handleArrowClick = useCallback((direction: number) => {
    setIsPaused(true)
    paginate(direction)
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsPaused(false), 5000)
  }, [paginate])

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      paginate(1)
    }, 5000)

    return () => clearInterval(interval)
  }, [paginate, isPaused])

  const currentItem = items[currentIndex]

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative aspect-[16/9]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                handleArrowClick(1)
              } else if (swipe > swipeConfidenceThreshold) {
                handleArrowClick(-1)
              }
            }}
            className="absolute inset-0"
          >
            <div className="h-full p-8">
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{currentItem.title}</h3>
                <p className="text-lg text-brand-500 dark:text-brand-400">{currentItem.client}</p>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{currentItem.description}</p>
                
                <div className="mt-auto">
                  <div className="grid grid-cols-3 gap-4">
                    {currentItem.metrics.map((metric) => (
                      <div
                        key={metric.name}
                        className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{metric.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          handleArrowClick(-1)
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-900 dark:text-white" />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleArrowClick(1)
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 z-10"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-900 dark:text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              handleDotClick(index)
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-brand-500 dark:bg-brand-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 