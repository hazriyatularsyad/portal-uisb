"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  ExternalLink,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarEvent, CalendarEventType, Post } from "@/types/portal";
import { formatTanggalSingkat, toWIBDateKey } from "@/lib/date";
import { cn } from "@/lib/utils";

type UnifiedAgendaKind = CalendarEventType | "kegiatan";

interface UnifiedAgendaItem {
  id: string;
  judul: string;
  deskripsi: string | null;
  jenis: UnifiedAgendaKind;
  mulai: string; // YYYY-MM-DD
  selesai: string; // YYYY-MM-DD
  post_slug?: string | null;
}

const KIND_META: Record<
  UnifiedAgendaKind,
  {
    label: string;
    pillClass: string;
    dateBoxClass: string;
    dotClass: string;
  }
> = {
  perkuliahan: {
    label: "Perkuliahan",
    pillClass: "bg-white/20 text-white border-white/25",
    dateBoxClass: "bg-white/15 border-white/25 text-white",
    dotClass: "bg-white",
  },
  ujian: {
    label: "Ujian",
    pillClass: "bg-rose-500/85 text-white border-rose-300/40",
    dateBoxClass: "bg-rose-500/25 border-rose-300/40 text-rose-100",
    dotClass: "bg-rose-400",
  },
  libur: {
    label: "Libur",
    pillClass: "bg-emerald-500/85 text-white border-emerald-300/40",
    dateBoxClass: "bg-emerald-500/25 border-emerald-300/40 text-emerald-100",
    dotClass: "bg-emerald-400",
  },
  administrasi: {
    label: "Administrasi",
    pillClass: "bg-secondary text-white border-secondary/50",
    dateBoxClass: "bg-secondary/30 border-secondary/50 text-amber-100",
    dotClass: "bg-secondary",
  },
  kegiatan: {
    label: "Kegiatan Kampus",
    pillClass: "bg-sky-500/80 text-white border-sky-300/40",
    dateBoxClass: "bg-sky-500/25 border-sky-300/40 text-sky-100",
    dotClass: "bg-sky-400",
  },
  lainnya: {
    label: "Lainnya",
    pillClass: "bg-white/15 text-[#eedff9] border-white/20",
    dateBoxClass: "bg-white/10 border-white/20 text-[#eedff9]",
    dotClass: "bg-white/60",
  },
};

const DAYS_OF_WEEK = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

interface CalendarViewProps {
  calendarEvents: CalendarEvent[];
  kegiatanPosts: Post[];
  initialYear?: number;
  initialMonth?: number; // 0-indexed (10 = November)
}

export function CalendarView({
  calendarEvents,
  kegiatanPosts,
  initialYear = 2026,
  initialMonth = 10,
}: CalendarViewProps) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  const allItems: UnifiedAgendaItem[] = useMemo(() => {
    const fromCalendar: UnifiedAgendaItem[] = calendarEvents.map((e) => ({
      id: e.id,
      judul: e.judul,
      deskripsi: e.deskripsi,
      jenis: e.jenis,
      mulai: e.mulai,
      selesai: e.selesai,
      post_slug: e.post_slug,
    }));

    const fromPosts: UnifiedAgendaItem[] = kegiatanPosts
      .filter((p) => p.tipe === "kegiatan" && p.event_mulai)
      .map((p) => ({
        id: `post-${p.id}`,
        judul: p.judul,
        deskripsi: p.lokasi ? `Lokasi: ${p.lokasi}` : p.ringkasan,
        jenis: "kegiatan",
        mulai: toWIBDateKey(p.event_mulai!),
        selesai: toWIBDateKey(p.event_selesai ?? p.event_mulai!),
        post_slug: p.slug,
      }));

    return [...fromCalendar, ...fromPosts].sort((a, b) =>
      a.mulai.localeCompare(b.mulai)
    );
  }, [calendarEvents, kegiatanPosts]);

  const monthLabel = useMemo(() => {
    return new Intl.DateTimeFormat("id-ID", {
      month: "long",
      year: "numeric",
    }).format(new Date(year, month, 1));
  }, [year, month]);

  const handlePrevMonth = () => {
    setSelectedDateKey(null);
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedDateKey(null);
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const calendarCells = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

    const cells: Array<{ dateKey: string; dayNumber: number } | null> = [];
    for (let i = 0; i < startOffset; i++) {
      cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const mm = String(month + 1).padStart(2, "0");
      const dd = String(day).padStart(2, "0");
      cells.push({ dateKey: `${year}-${mm}-${dd}`, dayNumber: day });
    }
    return cells;
  }, [year, month]);

  const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthAgenda = useMemo(() => {
    const monthStart = `${monthPrefix}-01`;
    const lastDay = new Date(year, month + 1, 0).getDate();
    const monthEnd = `${monthPrefix}-${String(lastDay).padStart(2, "0")}`;

    return allItems.filter(
      (item) => item.selesai >= monthStart && item.mulai <= monthEnd
    );
  }, [allItems, monthPrefix, year, month]);

  const getItemsForDate = (dateKey: string) =>
    monthAgenda.filter(
      (item) => item.mulai <= dateKey && item.selesai >= dateKey
    );

  const displayedAgenda = selectedDateKey
    ? getItemsForDate(selectedDateKey)
    : monthAgenda;

  return (
    <div className="space-y-6">
      {/* Controls & Month Header */}
      <div className="rounded-2xl bg-white/12 backdrop-blur-xl border border-white/20 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevMonth}
            aria-label="Bulan sebelumnya"
            className="rounded-full bg-white/15 text-white hover:bg-white/25 border border-white/20"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-bold capitalize min-w-[180px] text-center text-white">
            {monthLabel}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextMonth}
            aria-label="Bulan berikutnya"
            className="rounded-full bg-white/15 text-white hover:bg-white/25 border border-white/20"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2">
          {(Object.keys(KIND_META) as UnifiedAgendaKind[]).map((kind) => (
            <span
              key={kind}
              className="inline-flex items-center gap-1.5 text-xs text-white bg-white/10 border border-white/15 px-3 py-1 rounded-full"
            >
              <span
                className={cn("w-2 h-2 rounded-full", KIND_META[kind].dotClass)}
              />
              {KIND_META[kind].label}
            </span>
          ))}
        </div>
      </div>

      {/* Desktop Glassmorphic Grid View */}
      <div className="hidden md:block rounded-2xl bg-white/12 backdrop-blur-xl border border-white/20 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-white/15 bg-white/8">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="py-3 px-3 text-xs font-semibold text-[#eedff9] text-center uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 divide-x divide-y divide-white/15">
          {calendarCells.map((cell, idx) => {
            if (!cell) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[112px] bg-black/10"
                />
              );
            }

            const dayItems = getItemsForDate(cell.dateKey);
            const isSelected = selectedDateKey === cell.dateKey;
            const visibleItems = dayItems.slice(0, 2);
            const extraCount = dayItems.length - visibleItems.length;

            return (
              <button
                key={cell.dateKey}
                type="button"
                onClick={() =>
                  setSelectedDateKey(isSelected ? null : cell.dateKey)
                }
                className={cn(
                  "min-h-[112px] p-2.5 text-left flex flex-col gap-1.5 transition-colors hover:bg-white/10",
                  isSelected && "bg-white/20 ring-2 ring-inset ring-secondary"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center tabular-nums",
                    isSelected
                      ? "bg-secondary text-white"
                      : "text-white"
                  )}
                >
                  {cell.dayNumber}
                </span>

                <div className="space-y-1 w-full">
                  {visibleItems.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "text-[11px] font-medium px-2 py-0.5 rounded-md truncate border",
                        KIND_META[item.jenis].pillClass
                      )}
                      title={item.judul}
                    >
                      {item.judul}
                    </div>
                  ))}
                  {extraCount > 0 && (
                    <span className="text-[11px] font-semibold text-secondary block px-1">
                      +{extraCount} lagi
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Agenda List (Mobile & Desktop Detail) */}
      <div className="rounded-2xl bg-white/12 backdrop-blur-xl border border-white/20 overflow-hidden">
        <div className="p-5 sm:px-6 border-b border-white/15 flex flex-row items-center justify-between gap-3">
          <h3 className="text-lg font-bold flex items-center gap-2 text-white">
            <CalendarIcon className="w-5 h-5 text-secondary" />
            {selectedDateKey
              ? `Agenda Tanggal ${formatTanggalSingkat(selectedDateKey)}`
              : `Daftar Agenda ${monthLabel}`}
          </h3>
          {selectedDateKey && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedDateKey(null)}
              className="text-xs text-white bg-white/15 hover:bg-white/25 rounded-full"
            >
              Tampilkan semua bulan ini
            </Button>
          )}
        </div>

        <div className="p-5 sm:p-6">
          {displayedAgenda.length === 0 ? (
            <p className="text-sm text-[#eedff9] py-6 text-center">
              Tidak ada agenda akademik atau kegiatan yang terjadwal pada periode ini.
            </p>
          ) : (
            <div className="divide-y divide-white/15">
              {displayedAgenda.map((item) => {
                const dayNum = item.mulai.slice(8, 10);
                const monthShort = new Intl.DateTimeFormat("id-ID", {
                  month: "short",
                }).format(new Date(`${item.mulai}T00:00:00+07:00`));

                return (
                  <div
                    key={item.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl border flex flex-col items-center justify-center shrink-0 tabular-nums",
                          KIND_META[item.jenis].dateBoxClass
                        )}
                      >
                        <span className="text-base font-extrabold leading-none">
                          {dayNum}
                        </span>
                        <span className="text-[10px] font-semibold uppercase mt-0.5">
                          {monthShort}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              "rounded-full text-[11px]",
                              KIND_META[item.jenis].pillClass
                            )}
                          >
                            {KIND_META[item.jenis].label}
                          </Badge>
                          <span className="text-xs font-medium text-[#eedff9] tabular-nums">
                            {item.mulai === item.selesai
                              ? formatTanggalSingkat(item.mulai)
                              : `${formatTanggalSingkat(item.mulai)} – ${formatTanggalSingkat(item.selesai)}`}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-white">
                          {item.judul}
                        </h4>
                        {item.deskripsi && (
                          <p className="text-xs sm:text-sm text-[#eedff9]">
                            {item.deskripsi}
                          </p>
                        )}
                      </div>
                    </div>

                    {item.post_slug && (
                      <Link
                        href={`/informasi/${item.post_slug}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "rounded-full shrink-0 self-start sm:self-center gap-1.5 bg-white text-gray-900 hover:bg-white/90 font-semibold"
                        )}
                      >
                        Lihat info
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
