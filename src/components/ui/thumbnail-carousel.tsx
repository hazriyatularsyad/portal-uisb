"use client"

import * as React from "react"
import { animate, motion, useMotionValue } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ThumbnailCarouselItem {
  id: string | number
  url: string
  title: string
}

export interface ThumbnailCarouselProps {
  /** Foto yang ditampilkan, berurutan. */
  items: ThumbnailCarouselItem[]
  /** Kelas tambahan untuk pembungkus luar. @default undefined */
  className?: string
  /** Tinggi area foto utama. @default "h-[260px] sm:h-[400px] lg:h-[480px]" */
  stageClassName?: string
}

const FULL_WIDTH_PX = 120
const COLLAPSED_WIDTH_PX = 35
const GAP_PX = 2
const MARGIN_PX = 2

interface ThumbnailsProps {
  items: ThumbnailCarouselItem[]
  index: number
  setIndex: (index: number) => void
}

function Thumbnails({ items, index, setIndex }: ThumbnailsProps) {
  const thumbnailsRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = thumbnailsRef.current
    if (!el) return

    let scrollPosition = 0
    for (let i = 0; i < index; i++) {
      scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX
    }
    scrollPosition += MARGIN_PX

    const centerOffset = el.offsetWidth / 2 - FULL_WIDTH_PX / 2
    scrollPosition -= centerOffset

    el.scrollTo({ left: scrollPosition, behavior: "smooth" })
  }, [index])

  return (
    <div
      ref={thumbnailsRef}
      className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex gap-0.5 h-20 pb-2 w-fit mx-auto">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Lihat foto ${i + 1}: ${item.title}`}
            aria-current={i === index}
            initial={false}
            animate={i === index ? "active" : "inactive"}
            variants={{
              active: {
                width: FULL_WIDTH_PX,
                marginLeft: MARGIN_PX,
                marginRight: MARGIN_PX,
              },
              inactive: {
                width: COLLAPSED_WIDTH_PX,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative shrink-0 h-full overflow-hidden rounded"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt=""
              className="w-full h-full object-cover pointer-events-none select-none"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export function ThumbnailCarousel({
  items,
  className,
  stageClassName = "h-[260px] sm:h-[400px] lg:h-[480px]",
}: ThumbnailCarouselProps) {
  const [index, setIndex] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const last = items.length - 1

  React.useEffect(() => {
    if (items.length <= 1 || isPaused || isDragging) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev >= last ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [items.length, isPaused, isDragging, last])

  React.useEffect(() => {
    if (isDragging || !containerRef.current) return
    const containerWidth = containerRef.current.offsetWidth || 1
    const controls = animate(x, -index * containerWidth, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    })
    return () => controls.stop()
  }, [index, x, isDragging])

  if (items.length === 0) return null

  return (
    <div
      className={cn("flex flex-col gap-3", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl bg-black/30 border border-white/20"
      >
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false)
            const containerWidth = containerRef.current?.offsetWidth || 1
            const { offset, velocity } = info

            let next = index
            if (Math.abs(velocity.x) > 500) {
              next = velocity.x > 0 ? index - 1 : index + 1
            } else if (Math.abs(offset.x) > containerWidth * 0.3) {
              next = offset.x > 0 ? index - 1 : index + 1
            }
            setIndex(Math.max(0, Math.min(last, next)))
          }}
          style={{ x }}
        >
          {items.map((item) => (
            <div key={item.id} className={cn("shrink-0 w-full", stageClassName)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>

        <button
          type="button"
          aria-label="Foto sebelumnya"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-gray-900 shadow-lg transition-transform",
            index === 0
              ? "bg-white/60 opacity-40 cursor-not-allowed"
              : "bg-white opacity-85 hover:opacity-100 hover:scale-110"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="Foto berikutnya"
          disabled={index === last}
          onClick={() => setIndex((i) => Math.min(last, i + 1))}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-gray-900 shadow-lg transition-transform",
            index === last
              ? "bg-white/60 opacity-40 cursor-not-allowed"
              : "bg-white opacity-85 hover:opacity-100 hover:scale-110"
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/55 text-white px-3 py-1 rounded-full text-sm tabular-nums backdrop-blur-sm">
          {index + 1} / {items.length}
        </div>
      </div>

      <Thumbnails items={items} index={index} setIndex={setIndex} />
    </div>
  )
}

export default ThumbnailCarousel
