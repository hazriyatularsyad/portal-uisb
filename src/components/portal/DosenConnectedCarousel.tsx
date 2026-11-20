"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dosen, formatNamaDosen } from "@/types/dosen";
import { cn } from "@/lib/utils";

interface DosenConnectedCarouselProps {
  items: Dosen[];
}

export function DosenConnectedCarousel({ items }: DosenConnectedCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (items.length <= 1 || isPaused || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length, isPaused, prefersReducedMotion]);

  if (items.length === 0) return null;

  const safeIndex = Math.min(index, items.length - 1);
  const active = items[safeIndex]!;

  const getOffsetItem = (offset: number) => {
    if (items.length <= 1) return null;
    const target = (safeIndex + offset + items.length) % items.length;
    return { dosen: items[target]!, targetIndex: target };
  };

  const leftFar = items.length >= 5 ? getOffsetItem(-2) : null;
  const leftNear = items.length >= 3 ? getOffsetItem(-1) : null;
  const rightNear = items.length >= 2 ? getOffsetItem(1) : null;
  const rightFar = items.length >= 4 ? getOffsetItem(2) : null;

  return (
    <div
      className="w-full space-y-6 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-center -mx-6 sm:mx-0">
        {/* Far Left Pill */}
        {leftFar && (
          <>
            <button
              type="button"
              onClick={() => setIndex(leftFar.targetIndex)}
              aria-label={`Pilih ${formatNamaDosen(leftFar.dosen)}`}
              className="hidden xl:block w-14 h-40 rounded-full overflow-hidden border-2 border-[#130720]/30 bg-[#130720] opacity-75 hover:opacity-100 hover:scale-105 transition-all shrink-0"
            >
              {leftFar.dosen.foto_url ? (
                <img
                  src={leftFar.dosen.foto_url}
                  alt={formatNamaDosen(leftFar.dosen)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <UserCheck className="w-5 h-5" />
                </div>
              )}
            </button>
            <div className="hidden xl:block w-4 h-3 bg-[#130720] shrink-0" />
          </>
        )}

        {/* Near Left Pill (peeks on mobile edges too!) */}
        {leftNear && (
          <>
            <button
              type="button"
              onClick={() => setIndex(leftNear.targetIndex)}
              aria-label={`Pilih ${formatNamaDosen(leftNear.dosen)}`}
              className="block w-10 sm:w-14 md:w-20 h-64 md:h-60 rounded-r-full md:rounded-full overflow-hidden border-2 border-[#130720]/40 bg-[#130720] opacity-85 hover:opacity-100 hover:scale-105 transition-all shrink-0 shadow-md"
            >
              {leftNear.dosen.foto_url ? (
                <img
                  src={leftNear.dosen.foto_url}
                  alt={formatNamaDosen(leftNear.dosen)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <UserCheck className="w-6 h-6" />
                </div>
              )}
            </button>
            <div className="block w-2.5 sm:w-4 md:w-5 h-4 bg-[#130720] shrink-0" />
          </>
        )}

        {/* Center Featured Connected Card */}
        <div className="flex-1 max-w-3xl rounded-3xl bg-[#130720] text-white border border-white/10 shadow-[0_24px_60px_-15px_rgba(19,7,32,0.45)] p-5 sm:p-8 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(128,58,179,0.28),_transparent_55%)]"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
            >
              {/* Left Info (centered on mobile, left-aligned on sm+) */}
              <div className="sm:col-span-7 space-y-4 sm:space-y-5 text-center sm:text-left flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <Badge className="bg-[#BE900B] text-white border-0 rounded-full">
                    {active.prodi.nama}
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug font-serif">
                    {active.jabatan_struktural ?? active.jabatan_akademik}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#e6daf2] leading-relaxed line-clamp-4">
                  &ldquo;{active.bio}&rdquo;
                </p>

                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-white/10 border border-white/15 px-3 py-1.5">
                    <p className="text-sm font-bold text-white">
                      {formatNamaDosen(active)}
                    </p>
                    <p className="text-xs text-[#cbb8df]">
                      {active.jabatan_akademik} · {active.prodi.fakultas}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-1">
                    {active.keahlian.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/8 border border-white/15 text-[#eedff9]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/dosen/${active.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#BE900B] hover:text-white transition-colors"
                >
                  Lihat profil lengkap
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right Portrait (Top on mobile, Right on sm+) */}
              <div className="sm:col-span-5 order-first sm:order-last">
                <Link
                  href={`/dosen/${active.slug}`}
                  className="block aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white/10 border border-white/15 group"
                >
                  {active.foto_url ? (
                    <img
                      src={active.foto_url}
                      alt={formatNamaDosen(active)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <UserCheck className="w-12 h-12" />
                    </div>
                  )}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Near Right Pill (peeks on mobile edges too!) */}
        {rightNear && (
          <>
            <div className="block w-2.5 sm:w-4 md:w-5 h-4 bg-[#130720] shrink-0" />
            <button
              type="button"
              onClick={() => setIndex(rightNear.targetIndex)}
              aria-label={`Pilih ${formatNamaDosen(rightNear.dosen)}`}
              className="block w-10 sm:w-14 md:w-20 h-64 md:h-60 rounded-l-full md:rounded-full overflow-hidden border-2 border-[#130720]/40 bg-[#130720] opacity-85 hover:opacity-100 hover:scale-105 transition-all shrink-0 shadow-md"
            >
              {rightNear.dosen.foto_url ? (
                <img
                  src={rightNear.dosen.foto_url}
                  alt={formatNamaDosen(rightNear.dosen)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <UserCheck className="w-6 h-6" />
                </div>
              )}
            </button>
          </>
        )}

        {/* Far Right Pill */}
        {rightFar && (
          <>
            <div className="hidden xl:block w-4 h-3 bg-[#130720] shrink-0" />
            <button
              type="button"
              onClick={() => setIndex(rightFar.targetIndex)}
              aria-label={`Pilih ${formatNamaDosen(rightFar.dosen)}`}
              className="hidden xl:block w-14 h-40 rounded-full overflow-hidden border-2 border-[#130720]/30 bg-[#130720] opacity-75 hover:opacity-100 hover:scale-105 transition-all shrink-0"
            >
              {rightFar.dosen.foto_url ? (
                <img
                  src={rightFar.dosen.foto_url}
                  alt={formatNamaDosen(rightFar.dosen)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <UserCheck className="w-5 h-5" />
                </div>
              )}
            </button>
          </>
        )}
      </div>

      {/* Bottom Controls & Progress Dots */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() =>
              setIndex((safeIndex - 1 + items.length) % items.length)
            }
            aria-label="Dosen sebelumnya"
            className="w-8 h-8 rounded-full border border-border bg-white text-gray-700 hover:border-primary hover:text-primary flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {items.map((d, i) => {
              const isActive = i === safeIndex;
              return (
                <button
                  key={d.id}
                  type="button"
                  aria-label={`Tampilkan ${formatNamaDosen(d)}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "relative h-1.5 rounded-full overflow-hidden transition-all duration-300",
                    isActive
                      ? "w-10 bg-gray-200"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  )}
                >
                  {isActive && (
                    <motion.span
                      key={`${safeIndex}-${isPaused}`}
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused || prefersReducedMotion ? "100%" : "100%" }}
                      transition={
                        isPaused || prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 5, ease: "linear" }
                      }
                      className="absolute inset-y-0 left-0 bg-[#803AB3] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIndex((safeIndex + 1) % items.length)}
            aria-label="Dosen berikutnya"
            className="w-8 h-8 rounded-full border border-border bg-white text-gray-700 hover:border-primary hover:text-primary flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
