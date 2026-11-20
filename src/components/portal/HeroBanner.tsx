"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowUpRight, Pin, ChevronRight, Images } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Navbar } from "@/components/portal/Navbar"
import { Post } from "@/types/portal"
import { formatTanggalSingkat } from "@/lib/date"
import { cn } from "@/lib/utils"

interface HeroBannerProps {
  pinnedPosts: Post[]
  stats: {
    totalInfo: number
    kegiatanCount: number
    beasiswaCount: number
  }
}

export function HeroBanner({ pinnedPosts, stats }: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 24,
    restDelta: 0.001,
  })

  const yText = useTransform(smoothProgress, [0, 1], [0, 75])
  const opacityText = useTransform(smoothProgress, [0, 0.9], [1, 0.3])
  const yImage = useTransform(smoothProgress, [0, 1], [0, 28])
  const scaleImage = useTransform(smoothProgress, [0, 1], [1, 1.025])

  const slides = pinnedPosts.slice(0, 3)
  const activePost = slides[activeIndex] ?? slides[0]

  useEffect(() => {
    if (slides.length <= 1 || isPaused || prefersReducedMotion) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [slides.length, isPaused, prefersReducedMotion])

  const handleNext = () => {
    if (slides.length <= 1) return
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#130720] text-white flex flex-col justify-between"
    >
      {/* Atmospheric Background Gradient (UISB Primary #803AB3 + Secondary #BE900B) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(190,144,11,0.34),_transparent_52%),radial-gradient(ellipse_at_center,_rgba(128,58,179,0.58),_rgba(19,7,32,0.98)_76%)]"
      />

      {/* Sticky & Auto-Expanding Navbar */}
      <Navbar variant="hero" />

      {/* Center Layered Massive Typography with Parallax */}
      <div className="relative flex-1 flex items-center justify-center px-3 sm:px-4 pt-20 sm:pt-24 pb-16 sm:pb-32 select-none pointer-events-none">
        <motion.h1
          style={{
            fontFamily: "var(--font-faster-one)",
            y: prefersReducedMotion ? 0 : yText,
            opacity: prefersReducedMotion ? 1 : opacityText,
          }}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="hero-display text-[clamp(3.75rem,20vw,18rem)] font-normal tracking-[0.1em] sm:tracking-[0.16em] lg:tracking-[0.18em] scale-x-115 sm:scale-x-125 lg:scale-x-135 leading-none text-white/20 text-center -translate-y-4 sm:-translate-y-10 max-w-full will-change-transform"
        >
          UISB
        </motion.h1>
      </div>

      {/* Foreground Campus Architectural Image Layer with Parallax */}
      <motion.div
        aria-hidden="true"
        style={{
          y: prefersReducedMotion ? 0 : yImage,
          scale: prefersReducedMotion ? 1 : scaleImage,
        }}
        className="pointer-events-none select-none absolute inset-x-0 top-32 sm:top-auto sm:bottom-52 lg:bottom-0 z-10 flex justify-center will-change-transform"
      >
        <img
          src="https://uisb.ac.id/wp-content/uploads/2026/11/Gambar-Mahasiswa.png"
          alt="Mahasiswa Universitas Islam Sumatera Barat"
          className="w-full max-w-[1080px] h-[30vh] sm:h-[46vh] lg:h-[64vh] object-contain object-center lg:object-bottom sm:-translate-y-14 lg:-translate-y-24"
        />
      </motion.div>

      {/* Bottom scrim to guarantee high contrast for stats, CTA, and preview card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-72 sm:h-64 bg-gradient-to-t from-[#130720] via-[#130720]/85 to-transparent"
      />

      {/* Bottom Bar: Stats + CTA on Left, Glassmorphic Preview Card on Right */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 pb-8 sm:pb-10 pt-2"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Left Side: Live Counters + CTA + Tagline */}
          <div className="space-y-6 max-w-xl">
            <div className="grid grid-cols-3 gap-4 sm:gap-8 tabular-nums">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {stats.totalInfo}+
                </p>
                <p className="text-xs sm:text-sm text-[#e6daf2] mt-0.5">
                  Informasi Aktif
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {stats.kegiatanCount}
                </p>
                <p className="text-xs sm:text-sm text-[#e6daf2] mt-0.5">
                  Kegiatan Kampus
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {stats.beasiswaCount}
                </p>
                <p className="text-xs sm:text-sm text-[#e6daf2] mt-0.5">
                  Beasiswa &amp; Lomba
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Link
                  href="/informasi"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full bg-white text-gray-900 hover:bg-white/90 font-semibold px-6 h-11 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.35)]",
                  )}
                >
                  Jelajahi Informasi
                </Link>
                <Link
                  href="/informasi"
                  aria-label="Buka daftar informasi"
                  className={cn(
                    buttonVariants({ size: "icon" }),
                    "rounded-full bg-white text-gray-900 hover:bg-secondary hover:text-white w-11 h-11 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.35)] transition-colors",
                  )}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/aktivitas"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "md:hidden rounded-full bg-[#BE900B] text-white hover:bg-[#a67d09] font-semibold px-5 h-11 inline-flex items-center gap-2 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.35)]",
                  )}
                >
                  <Images className="w-4 h-4" />
                  Dokumentasi Aktivitas
                </Link>
              </div>
              <p className="text-xs sm:text-sm text-[#e6daf2] leading-relaxed">
                Portal informasi terpadu mahasiswa Universitas Islam Sumatera
                Barat — pengumuman, agenda, dan layanan kampus dalam satu
                tempat.
              </p>
            </div>
          </div>

          {/* Right Side: Interactive Glassmorphic Featured Preview Card */}
          {activePost && (
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="w-full sm:w-84 rounded-2xl bg-white/12 backdrop-blur-xl border border-[#BE900B]/40 p-3.5 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.45)]"
            >
              <div className="relative rounded-xl bg-[#2d1047]/90 border border-white/12 p-4 min-h-[136px] flex flex-col justify-between overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePost.id}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 8 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion ? undefined : { opacity: 0, y: -8 }
                    }
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-between h-full gap-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-white">
                        <Pin className="w-3 h-3" />
                        Disematkan
                      </span>
                      <span className="text-[11px] text-[#e6daf2] font-medium tabular-nums">
                        {formatTanggalSingkat(activePost.published_at)}
                      </span>
                    </div>

                    <Link
                      href={`/informasi/${activePost.slug}`}
                      className="group block"
                    >
                      <h2 className="font-sans font-semibold text-sm sm:text-base text-white leading-snug line-clamp-2 group-hover:underline underline-offset-4">
                        {activePost.judul}
                      </h2>
                      <span className="inline-flex items-center gap-1 text-xs text-[#f2e9fa] mt-2 font-medium">
                        Baca selengkapnya
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-3 flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-xs font-mono text-white/85 hover:text-white transition-colors tabular-nums"
                  title="Lihat pengumuman disematkan berikutnya"
                >
                  0{activeIndex + 1}/0{slides.length}
                </button>
                <div className="flex items-center gap-1.5">
                  {slides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Tampilkan pengumuman disematkan ${idx + 1}`}
                      onClick={() => setActiveIndex(idx)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        idx === activeIndex
                          ? "w-7 bg-[#BE900B]"
                          : "w-2.5 bg-white/30 hover:bg-white/60",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
