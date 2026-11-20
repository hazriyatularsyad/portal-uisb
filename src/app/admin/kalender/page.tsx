"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react"
import { AdminShell } from "@/components/admin/AdminShell"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useAdmin } from "@/lib/admin-store"
import { CalendarEvent, CalendarEventType } from "@/types/portal"
import { cn } from "@/lib/utils"

const DAYS_OF_WEEK = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]

const KIND_STYLES: Record<
  CalendarEventType,
  { label: string; pill: string; dot: string }
> = {
  perkuliahan: {
    label: "Perkuliahan",
    pill: "bg-purple-50 text-[#803AB3] border-purple-200 hover:bg-purple-100",
    dot: "bg-[#803AB3]",
  },
  ujian: {
    label: "Ujian",
    pill: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
    dot: "bg-rose-600",
  },
  libur: {
    label: "Libur",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    dot: "bg-emerald-600",
  },
  administrasi: {
    label: "Administrasi",
    pill: "bg-amber-50 text-[#8f6a00] border-amber-200 hover:bg-amber-100",
    dot: "bg-[#BE900B]",
  },
  lainnya: {
    label: "Lainnya",
    pill: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200",
    dot: "bg-gray-500",
  },
}

export default function AdminKalenderPage() {
  const { calendarEvents, upsertCalendarEvent, deleteCalendarEvent } =
    useAdmin()

  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(10) // November 2026
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<CalendarEvent | null>(null)

  const [judul, setJudul] = useState("")
  const [jenis, setJenis] = useState<CalendarEventType>("perkuliahan")
  const [mulai, setMulai] = useState("2026-11-25")
  const [selesai, setSelesai] = useState("2026-11-25")
  const [periode, setPeriode] = useState("Ganjil 2026/2027")
  const [deskripsi, setDeskripsi] = useState("")

  const monthLabel = useMemo(() => {
    return new Intl.DateTimeFormat("id-ID", {
      month: "long",
      year: "numeric",
    }).format(new Date(year, month, 1))
  }, [year, month])

  const calendarCells = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7

    const cells: Array<{ dateKey: string; dayNumber: number } | null> = []
    for (let i = 0; i < startOffset; i++) cells.push(null)
    for (let day = 1; day <= daysInMonth; day++) {
      const mm = String(month + 1).padStart(2, "0")
      const dd = String(day).padStart(2, "0")
      cells.push({ dateKey: `${year}-${mm}-${dd}`, dayNumber: day })
    }
    return cells
  }, [year, month])

  const openCreateOnDate = (dateKey: string) => {
    setEditing(null)
    setJudul("")
    setJenis("perkuliahan")
    setMulai(dateKey)
    setSelesai(dateKey)
    setPeriode("Ganjil 2026/2027")
    setDeskripsi("")
    setOpen(true)
  }

  const openEdit = (ev: CalendarEvent) => {
    setEditing(ev)
    setJudul(ev.judul)
    setJenis(ev.jenis)
    setMulai(ev.mulai)
    setSelesai(ev.selesai)
    setPeriode(ev.periode)
    setDeskripsi(ev.deskripsi ?? "")
    setOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    upsertCalendarEvent({
      id: editing?.id ?? `cal-${Date.now()}`,
      judul,
      jenis,
      mulai,
      selesai: selesai < mulai ? mulai : selesai,
      periode,
      deskripsi: deskripsi.trim() || null,
      post_slug: editing?.post_slug ?? null,
    })
    setOpen(false)
  }

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1)
      setMonth(11)
    } else {
      setMonth((m) => m - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1)
      setMonth(0)
    } else {
      setMonth((m) => m + 1)
    }
  }

  return (
    <AdminShell
      title="Kalender Akademik"
      description="Klik tanggal mana saja untuk menambah agenda, atau klik agenda untuk mengubahnya."
      actions={
        <Button
          onClick={() =>
            openCreateOnDate(`${year}-${String(month + 1).padStart(2, "0")}-01`)
          }
          size="sm"
          className="rounded-full px-4 bg-[#130720] text-white hover:bg-[#803AB3] gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Agenda Baru
        </Button>
      }
    >
      {/* Month Controls & Legend */}
      <div className="rounded-3xl bg-white shadow-[0_10px_30px_-10px_rgba(19,7,32,0.06)] p-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevMonth}
            aria-label="Bulan sebelumnya"
            className="rounded-full border-gray-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-bold capitalize min-w-[170px] text-center text-gray-900 font-sans">
            {monthLabel}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            aria-label="Bulan berikutnya"
            className="rounded-full border-gray-200"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(Object.keys(KIND_STYLES) as CalendarEventType[]).map((kind) => (
            <span
              key={kind}
              className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
            >
              <span
                className={cn("w-2 h-2 rounded-full", KIND_STYLES[kind].dot)}
              />
              {KIND_STYLES[kind].label}
            </span>
          ))}
        </div>
      </div>

      {/* Real Monthly Calendar Grid */}
      <div className="rounded-3xl bg-white shadow-[0_10px_30px_-10px_rgba(19,7,32,0.06)] overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/70">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="py-3 px-2 text-xs font-semibold text-gray-500 text-center uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 divide-x divide-y divide-gray-100">
          {calendarCells.map((cell, idx) => {
            if (!cell) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-[100px] sm:min-h-[120px] bg-gray-50/40"
                />
              )
            }

            const dayEvents = calendarEvents.filter(
              (ev) => ev.mulai <= cell.dateKey && ev.selesai >= cell.dateKey,
            )

            return (
              <div
                key={cell.dateKey}
                onClick={() => openCreateOnDate(cell.dateKey)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    openCreateOnDate(cell.dateKey)
                  }
                }}
                className="min-h-[100px] sm:min-h-[120px] p-1.5 sm:p-2 text-left flex flex-col gap-1 hover:bg-purple-50/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 w-6 h-6 rounded-full flex items-center justify-center group-hover:bg-[#803AB3] group-hover:text-white transition-colors tabular-nums">
                    {cell.dayNumber}
                  </span>
                  <Plus className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="space-y-1 w-full">
                  {dayEvents.slice(0, 3).map((ev) => (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        openEdit(ev)
                      }}
                      className={cn(
                        "w-full text-left text-[11px] font-medium px-1.5 py-0.5 rounded-md truncate border transition-colors",
                        KIND_STYLES[ev.jenis].pill,
                      )}
                      title={`Klik untuk ubah: ${ev.judul}`}
                    >
                      {ev.judul}
                    </button>
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[10px] font-semibold text-[#803AB3] px-1">
                      +{dayEvents.length - 3} lagi
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add / Edit Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-lg p-6 sm:p-7 overflow-y-auto bg-white">
          <SheetHeader className="space-y-1.5 pb-4 border-b border-gray-100">
            <SheetTitle className="text-xl font-bold text-gray-900 font-sans">
              {editing ? "Sunting Agenda Kalender" : "Tambah Agenda Baru"}
            </SheetTitle>
            <p className="text-xs text-gray-500">
              {editing
                ? "Ubah detail agenda atau hapus dari kalender akademik."
                : `Menambahkan agenda mulai tanggal ${mulai}.`}
            </p>
          </SheetHeader>

          <form onSubmit={handleSave} className="mt-5 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Judul Agenda
              </label>
              <input
                required
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Contoh: Ujian Akhir Semester (UAS) Ganjil"
                className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-gray-50/70 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#803AB3]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 block">
                Jenis Agenda
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(KIND_STYLES) as CalendarEventType[]).map(
                  (kind) => {
                    const active = jenis === kind
                    return (
                      <button
                        key={kind}
                        type="button"
                        onClick={() => setJenis(kind)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                          active
                            ? "bg-[#130720] text-white border-[#130720] shadow-xs"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100",
                        )}
                      >
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full",
                            KIND_STYLES[kind].dot,
                          )}
                        />
                        {KIND_STYLES[kind].label}
                      </button>
                    )
                  },
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  required
                  value={mulai}
                  onChange={(e) => setMulai(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#803AB3]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  required
                  value={selesai}
                  onChange={(e) => setSelesai(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-gray-50/70 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#803AB3]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Periode Akademik
              </label>
              <input
                required
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                placeholder="Contoh: Ganjil 2026/2027"
                className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-gray-50/70 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#803AB3]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Deskripsi (opsional)
              </label>
              <textarea
                rows={3}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Catatan singkat untuk mahasiswa..."
                className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#803AB3]"
              />
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
              {editing ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    deleteCalendarEvent(editing.id)
                    setOpen(false)
                  }}
                  className="rounded-full text-rose-600 border-rose-200 hover:bg-rose-50 gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  Hapus
                </Button>
              ) : (
                <div />
              )}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="rounded-full border-gray-200"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="rounded-full px-5 bg-[#803AB3] text-white hover:bg-[#6b2e98]"
                >
                  Simpan Agenda
                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </AdminShell>
  )
}
