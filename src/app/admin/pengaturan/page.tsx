"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { AdminShell } from "@/components/admin/AdminShell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAdmin } from "@/lib/admin-store"

export default function AdminPengaturanPage() {
  const { categories, serviceLinks, upsertCategory, upsertServiceLink } =
    useAdmin()
  const [newCatName, setNewCatName] = useState("")

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim()) return
    const slug = newCatName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    upsertCategory({
      id: `cat-${Date.now()}`,
      nama: newCatName.trim(),
      slug,
      urutan: categories.length + 1,
      aktif: true,
    })
    setNewCatName("")
  }

  return (
    <AdminShell
      title="Kategori & Layanan"
      description="Atur kategori informasi serta tautan layanan resmi kampus."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Categories */}
        <Card className="rounded-3xl bg-white border-0 shadow-[0_10px_30px_-10px_rgba(19,7,32,0.06)] text-gray-900">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold font-sans text-gray-900">
              Kategori Informasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddCategory} className="flex gap-2">
              <input
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="Nama kategori baru..."
                className="flex-1 h-9 px-3 rounded-full border border-gray-200 bg-gray-50 text-gray-900 text-sm"
              />
              <Button
                type="submit"
                size="sm"
                className="rounded-full px-4 bg-[#130720] text-white hover:bg-[#803AB3] gap-1"
              >
                <Plus className="w-4 h-4" />
                Tambah
              </Button>
            </form>

            <div className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {cat.nama}
                    </p>
                    <p className="text-xs text-gray-400 font-mono">
                      /{cat.slug}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      upsertCategory({ ...cat, aktif: !cat.aktif })
                    }
                    className={
                      cat.aktif
                        ? "rounded-full text-xs bg-[#803AB3] text-white border-[#803AB3] hover:bg-[#6b2e98]"
                        : "rounded-full text-xs text-gray-500 border-gray-200"
                    }
                  >
                    {cat.aktif ? "Aktif" : "Nonaktif"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Links */}
        <Card className="rounded-3xl bg-white border-0 shadow-[0_10px_30px_-10px_rgba(19,7,32,0.06)] text-gray-900">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold font-sans text-gray-900">
              Tautan Layanan Kampus
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {serviceLinks.map((link) => (
              <div
                key={link.id}
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-sm text-gray-900">
                    {link.judul}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      upsertServiceLink({ ...link, aktif: !link.aktif })
                    }
                    className={
                      link.aktif
                        ? "rounded-full text-xs bg-[#803AB3] text-white border-[#803AB3] hover:bg-[#6b2e98]"
                        : "rounded-full text-xs text-gray-500 border-gray-200"
                    }
                  >
                    {link.aktif ? "Aktif" : "Nonaktif"}
                  </Button>
                </div>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) =>
                    upsertServiceLink({ ...link, url: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-xs font-mono"
                />
                <textarea
                  rows={2}
                  value={link.deskripsi}
                  onChange={(e) =>
                    upsertServiceLink({ ...link, deskripsi: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-xs"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
