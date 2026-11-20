"use client"

import { useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { AdminShell } from "@/components/admin/AdminShell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useAdmin } from "@/lib/admin-store"
import { formatTanggalSingkat } from "@/lib/date"
import { AktivitasCategory, AktivitasItem } from "@/types/portal"

export default function AdminAktivitasPage() {
  const { aktivitas, upsertAktivitas, deleteAktivitas } = useAdmin()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<AktivitasItem | null>(null)

  const [judul, setJudul] = useState("")
  const [kategori, setKategori] = useState<AktivitasCategory>("kemahasiswaan")
  const [tanggal, setTanggal] = useState("2026-11-20")
  const [lokasi, setLokasi] = useState("")
  const [fotoUrl, setFotoUrl] = useState("")
  const [deskripsi, setDeskripsi] = useState("")

  const openCreate = () => {
    setEditing(null)
    setJudul("")
    setKategori("kemahasiswaan")
    setTanggal("2026-11-20")
    setLokasi("")
    setFotoUrl("")
    setDeskripsi("")
    setOpen(true)
  }

  const openEdit = (item: AktivitasItem) => {
    setEditing(item)
    setJudul(item.judul)
    setKategori(item.kategori)
    setTanggal(item.tanggal)
    setLokasi(item.lokasi)
    setFotoUrl(item.foto_url)
    setDeskripsi(item.deskripsi)
    setOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    upsertAktivitas({
      id: editing?.id ?? `akt-${Date.now()}`,
      judul,
      kategori,
      tanggal,
      lokasi,
      foto_url: fotoUrl,
      deskripsi,
    })
    setOpen(false)
  }

  return (
    <AdminShell
      title="Dokumentasi Aktivitas"
      description="Kelola galeri foto dan cerita kegiatan mahasiswa."
      actions={
        <Button
          onClick={openCreate}
          size="sm"
          className="rounded-full px-4 bg-[#130720] text-white hover:bg-[#803AB3] gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Aktivitas Baru
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {aktivitas.map((item) => (
          <Card
            key={item.id}
            className="rounded-3xl bg-white border-0 shadow-[0_10px_30px_-10px_rgba(19,7,32,0.06)] overflow-hidden flex flex-col justify-between text-gray-900"
          >
            <div className="aspect-[16/10] w-full bg-gray-100 overflow-hidden">
              <img
                src={item.foto_url}
                alt={item.judul}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <Badge className="rounded-full text-[11px] capitalize bg-purple-50 text-[#803AB3] border-purple-200">
                    {item.kategori}
                  </Badge>
                  <span className="text-xs text-gray-400 tabular-nums">
                    {formatTanggalSingkat(item.tanggal)}
                  </span>
                </div>
                <p className="font-bold text-sm text-gray-900 line-clamp-2">
                  {item.judul}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {item.lokasi}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(item)}
                  className="rounded-full gap-1 text-xs border-gray-200 text-gray-700 hover:text-[#803AB3]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Ubah
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteAktivitas(item.id)}
                  aria-label="Hapus aktivitas"
                  className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {editing ? "Sunting Aktivitas" : "Tambah Dokumentasi Aktivitas"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Judul Aktivitas</label>
              <input
                required
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-border text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Kategori</label>
                <select
                  value={kategori}
                  onChange={(e) =>
                    setKategori(e.target.value as AktivitasCategory)
                  }
                  className="w-full h-10 px-3 rounded-xl border border-border text-sm bg-white"
                >
                  <option value="akademik">Akademik</option>
                  <option value="kemahasiswaan">Kemahasiswaan</option>
                  <option value="pengabdian">Pengabdian</option>
                  <option value="prestasi">Prestasi</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Tanggal</label>
                <input
                  type="date"
                  required
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-border text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Lokasi</label>
              <input
                required
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-border text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">URL Foto Utama</label>
              <input
                type="url"
                required
                value={fotoUrl}
                onChange={(e) => setFotoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full h-10 px-3 rounded-xl border border-border text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Deskripsi</label>
              <textarea
                required
                rows={4}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="w-full p-3 rounded-xl border border-border text-sm"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="rounded-xl"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="rounded-xl bg-primary text-white hover:bg-primary/90"
              >
                Simpan
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </AdminShell>
  )
}
