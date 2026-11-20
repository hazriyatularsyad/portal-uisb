"use client";

import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight, Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useAdmin } from "@/lib/admin-store";
import { formatTanggalSingkat } from "@/lib/date";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { posts, calendarEvents, aktivitas, categories, serviceLinks } =
    useAdmin();

  const pinnedCount = posts.filter((p) => p.is_pinned).length;
  const publishedCount = posts.filter((p) => p.status === "terbit").length;
  const featuredAktivitas = aktivitas[0];

  return (
    <AdminShell
      title="Ringkasan Portal"
      description="Kelola seluruh data publik Portal Mahasiswa UISB."
      actions={
        <Link
          href="/admin/konten"
          className={cn(
            buttonVariants({ size: "sm" }),
            "rounded-full px-4 bg-amber-500 text-white hover:bg-amber-600 gap-1.5 transition-colors"
          )}
        >
          <Plus className="w-4 h-4" />
          Konten Baru
        </Link>
      }
    >
      {/* Top Large Floating White Glass Card */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/45 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-sans">
              Informasi Terbaru
            </h2>
            <p className="text-sm text-gray-500">
              <strong className="text-gray-900">{posts.length} total</strong>, kelola pengumuman, kegiatan, dan beasiswa.
            </p>
          </div>

          <div className="flex items-center gap-8 tabular-nums">
            <div className="text-right">
              <p className="text-3xl font-extrabold text-gray-900 leading-none">
                {publishedCount}
              </p>
              <p className="text-xs text-gray-400 mt-1">Terbit</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-[#BE900B] leading-none">
                {pinnedCount}
              </p>
              <p className="text-xs text-gray-400 mt-1">Dipin (maks 3)</p>
            </div>
          </div>
        </div>

        {/* Clean Table Rows */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-medium text-gray-400">
                <th className="pb-3 font-medium">Judul</th>
                <th className="pb-3 font-medium">Kategori</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Tanggal</th>
                <th className="pb-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {posts.slice(0, 5).map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-gray-900 max-w-xs truncate">
                    {post.judul}
                  </td>
                  <td className="py-3.5 pr-4 text-gray-500">
                    {post.category.nama}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                        post.status === "terbit"
                          ? "bg-emerald-50 text-emerald-700"
                          : post.status === "draft"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                      )}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-gray-500 tabular-nums whitespace-nowrap">
                    {formatTanggalSingkat(post.published_at)}
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href="/admin/konten"
                      className="text-xs font-semibold text-[#803AB3] hover:underline"
                    >
                      Sunting
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left White Glass Card: Kalender & Pengaturan */}
        <section className="lg:col-span-6 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/45 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 font-sans">
              Kalender &amp; Konfigurasi
            </h3>
            <Link
              href="/admin/kalender"
              className="text-xs font-semibold text-[#803AB3] inline-flex items-center gap-1 hover:underline"
            >
              Kelola kalender
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {calendarEvents.slice(0, 3).map((ev) => (
              <div
                key={ev.id}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#803AB3]/10 text-[#803AB3] flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {ev.judul}
                    </p>
                    <p className="text-xs text-gray-400 tabular-nums">
                      {formatTanggalSingkat(ev.mulai)}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="rounded-full text-[11px] capitalize bg-gray-100 text-gray-700"
                >
                  {ev.jenis}
                </Badge>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
            <span>
              {categories.filter((c) => c.aktif).length} Kategori ·{" "}
              {serviceLinks.filter((l) => l.aktif).length} Layanan Aktif
            </span>
            <Link
              href="/admin/pengaturan"
              className="font-semibold text-[#803AB3] hover:underline"
            >
              Pengaturan &rarr;
            </Link>
          </div>
        </section>

        {/* Right Dark Accent Card (UISB Purple + Gold) */}
        <section className="lg:col-span-6 rounded-3xl bg-[#2a1040] text-white p-6 flex flex-col justify-between gap-5 shadow-[0_16px_40px_-12px_rgba(42,16,64,0.3)]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-sans">
              Dokumentasi Aktivitas:
            </h3>
            <span className="text-xs font-medium text-amber-400 tabular-nums">
              {aktivitas.length} galeri
            </span>
          </div>

          {featuredAktivitas && (
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-2xl bg-white text-gray-900 p-5 space-y-3 shadow-lg">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-100 text-[#803AB3] capitalize">
                    {featuredAktivitas.kategori}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-[#8f6a00]">
                    {formatTanggalSingkat(featuredAktivitas.tanggal)}
                  </span>
                </div>
                <p className="font-bold text-base text-gray-900 line-clamp-2">
                  {featuredAktivitas.judul}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {featuredAktivitas.lokasi}
                </p>
              </div>

              <Link
                href="/admin/aktivitas"
                aria-label="Kelola dokumentasi aktivitas"
                className="w-10 h-10 rounded-full bg-white text-gray-900 hover:bg-[#BE900B] hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
