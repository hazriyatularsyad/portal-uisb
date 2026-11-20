"use client"

import { useState } from "react"
import { Pencil, Pin, Plus, Trash2 } from "lucide-react"
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
import { Post, PostStatus, PostType } from "@/types/portal"
import { cn } from "@/lib/utils"

const TYPE_LABELS: Record<PostType, string> = {
  pengumuman: "Pengumuman",
  kegiatan: "Kegiatan",
  beasiswa_lomba: "Beasiswa & Lomba",
}

export default function AdminKontenPage() {
  const { posts, categories, upsertPost, deletePost } = useAdmin()
  const [filterStatus, setFilterStatus] = useState<"semua" | PostStatus>(
    "semua",
  )
  const [editing, setEditing] = useState<Post | null>(null)
  const [open, setOpen] = useState(false)

  const [judul, setJudul] = useState("")
  const [tipe, setTipe] = useState<PostType>("pengumuman")
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "cat-1")
  const [status, setStatus] = useState<PostStatus>("terbit")
  const [ringkasan, setRingkasan] = useState("")
  const [isiText, setIsiText] = useState("")
  const [coverUrl, setCoverUrl] = useState("")
  const [lokasi, setLokasi] = useState("")
  const [isPinned, setIsPinned] = useState(false)

  const openCreate = () => {
    setEditing(null)
    setJudul("")
    setTipe("pengumuman")
    setCategoryId(categories[0]?.id ?? "cat-1")
    setStatus("terbit")
    setRingkasan("")
    setIsiText("")
    setCoverUrl("")
    setLokasi("")
    setIsPinned(false)
    setOpen(true)
  }

  const openEdit = (post: Post) => {
    setEditing(post)
    setJudul(post.judul)
    setTipe(post.tipe)
    setCategoryId(post.category.id)
    setStatus(post.status)
    setRingkasan(post.ringkasan)
    setIsiText(post.isi.join("\n\n"))
    setCoverUrl(post.cover_url ?? "")
    setLokasi(post.lokasi ?? "")
    setIsPinned(post.is_pinned)
    setOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const cat = categories.find((c) => c.id === categoryId) ?? categories[0]
    const slug =
      editing?.slug ??
      judul
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

    upsertPost({
      id: editing?.id ?? `post-${Date.now()}`,
      tipe,
      judul,
      slug,
      ringkasan,
      isi: isiText
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
      category: cat,
      cover_url: coverUrl.trim() || null,
      audiens: ["mahasiswa"],
      status,
      is_pinned: isPinned,
      pinned_until: editing?.pinned_until ?? null,
      published_at: editing?.published_at ?? new Date().toISOString(),
      updated_at: editing ? new Date().toISOString() : undefined,
      event_mulai: editing?.event_mulai ?? null,
      event_selesai: editing?.event_selesai ?? null,
      lokasi: lokasi.trim() || null,
      deadline_at: editing?.deadline_at ?? null,
      links: editing?.links ?? [],
    })
    setOpen(false)
  }

  const togglePin = (post: Post) => {
    const pinnedCount = posts.filter((p) => p.is_pinned).length
    if (!post.is_pinned && pinnedCount >= 3) {
      alert("Maksimal 3 pengumuman yang dapat disematkan (Pin).")
      return
    }
    upsertPost({ ...post, is_pinned: !post.is_pinned })
  }

  const filtered = posts.filter((p) =>
    filterStatus === "semua" ? true : p.status === filterStatus,
  )

  return (
    <AdminShell
      title="Informasi & Pengumuman"
      description="Tambah, sunting, sematkan (maks 3), atau arsipkan konten portal."
      actions={
        <Button
          onClick={openCreate}
          size="sm"
          className="rounded-full px-4 bg-[#130720] text-white hover:bg-[#803AB3] gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Konten Baru
        </Button>
      }
    >
      {/* Filter Status */}
      <div className="flex flex-wrap items-center gap-2">
        {(["semua", "terbit", "draft", "arsip"] as const).map((st) => (
          <Button
            key={st}
            variant="ghost"
            size="sm"
            onClick={() => setFilterStatus(st)}
            className={cn(
              "rounded-full capitalize",
              filterStatus === st
                ? "bg-[#130720] text-white hover:bg-[#803AB3]"
                : "bg-white text-gray-600 hover:text-gray-900 hover:bg-white/80 shadow-2xs",
            )}
          >
            {st}
          </Button>
        ))}
      </div>

      {/* Table / List */}
      <Card className="rounded-3xl bg-white border-0 shadow-[0_10px_30px_-10px_rgba(19,7,32,0.06)] overflow-hidden text-gray-900">
        <CardContent className="p-0 divide-y divide-gray-100">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
            >
              <div className="min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className="rounded-full text-[11px] border-purple-200 text-[#803AB3] bg-purple-50"
                  >
                    {TYPE_LABELS[post.tipe]}
                  </Badge>
                  <Badge className="rounded-full text-[11px] bg-gray-100 text-gray-700 border-0">
                    {post.category.nama}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full text-[11px] capitalize",
                      post.status === "terbit"
                        ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                        : "border-gray-200 text-gray-600",
                    )}
                  >
                    {post.status}
                  </Badge>
                  <span className="text-xs text-gray-400 tabular-nums">
                    {formatTanggalSingkat(post.published_at)}
                  </span>
                </div>
                <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                  {post.judul}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePin(post)}
                  className={cn(
                    "rounded-full gap-1 text-xs",
                    post.is_pinned
                      ? "bg-[#BE900B] hover:bg-[#a67d09] text-white border-[#BE900B]"
                      : "text-gray-600 border-gray-200 hover:bg-gray-100",
                  )}
                >
                  <Pin className="w-3.5 h-3.5" />
                  {post.is_pinned ? "Dipin" : "Pin"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openEdit(post)}
                  aria-label="Edit konten"
                  className="rounded-full border-gray-200 text-gray-600 hover:text-[#803AB3]"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deletePost(post.id)}
                  aria-label="Hapus konten"
                  className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Slide-over Editor Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {editing ? "Sunting Konten" : "Tambah Konten Baru"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Judul</label>
              <input
                required
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-border text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Tipe</label>
                <select
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value as PostType)}
                  className="w-full h-10 px-3 rounded-xl border border-border text-sm bg-white"
                >
                  <option value="pengumuman">Pengumuman</option>
                  <option value="kegiatan">Kegiatan</option>
                  <option value="beasiswa_lomba">Beasiswa &amp; Lomba</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Kategori</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-border text-sm bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PostStatus)}
                  className="w-full h-10 px-3 rounded-xl border border-border text-sm bg-white"
                >
                  <option value="terbit">Terbit</option>
                  <option value="draft">Draft</option>
                  <option value="arsip">Arsip</option>
                </select>
              </div>
              <div className="flex items-end pb-2">
                <label className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="rounded border-border"
                  />
                  Sematkan (Pin)
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Ringkasan</label>
              <textarea
                required
                rows={2}
                value={ringkasan}
                onChange={(e) => setRingkasan(e.target.value)}
                className="w-full p-3 rounded-xl border border-border text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Isi Lengkap</label>
              <textarea
                required
                rows={5}
                value={isiText}
                onChange={(e) => setIsiText(e.target.value)}
                placeholder="Pisahkan paragraf dengan baris kosong"
                className="w-full p-3 rounded-xl border border-border text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">
                URL Gambar Sampul (opsional)
              </label>
              <input
                type="url"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="https://..."
                className="w-full h-10 px-3 rounded-xl border border-border text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Lokasi (opsional)</label>
              <input
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-border text-sm"
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
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </AdminShell>
  )
}
