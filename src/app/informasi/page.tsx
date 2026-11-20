import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  FilterX,
  MapPin,
  Pin,
} from "lucide-react";
import { Navbar } from "@/components/portal/Navbar";
import { Footer } from "@/components/portal/Footer";
import { MotionReveal } from "@/components/portal/MotionReveal";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, POSTS } from "@/data/mock-portal";
import { PostType } from "@/types/portal";
import { formatTanggalSingkat, isPastDate } from "@/lib/date";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Informasi & Pengumuman - Portal Mahasiswa UISB",
  description:
    "Daftar pengumuman akademik, kegiatan kampus, serta informasi beasiswa dan lomba untuk mahasiswa Universitas Islam Sumatera Barat.",
};

const VALID_TYPES: Array<{ value: PostType; label: string }> = [
  { value: "pengumuman", label: "Pengumuman" },
  { value: "kegiatan", label: "Kegiatan" },
  { value: "beasiswa_lomba", label: "Beasiswa & Lomba" },
];

const TYPE_LABELS: Record<PostType, string> = {
  pengumuman: "Pengumuman",
  kegiatan: "Kegiatan",
  beasiswa_lomba: "Beasiswa & Lomba",
};

const PAGE_SIZE = 6;

interface InformasiPageProps {
  searchParams: Promise<{
    tipe?: string;
    kategori?: string;
    page?: string;
  }>;
}

export default async function InformasiPage({
  searchParams,
}: InformasiPageProps) {
  const params = await searchParams;

  const activeTipe = VALID_TYPES.some((t) => t.value === params.tipe)
    ? (params.tipe as PostType)
    : undefined;

  const activeKategori = CATEGORIES.some((c) => c.slug === params.kategori)
    ? params.kategori
    : undefined;

  const parsedPage = Number.parseInt(params.page ?? "1", 10);
  const currentPage = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  const filteredPosts = POSTS.filter((post) => post.status === "terbit")
    .filter((post) => (activeTipe ? post.tipe === activeTipe : true))
    .filter((post) =>
      activeKategori ? post.category.slug === activeKategori : true
    )
    .sort((a, b) => {
      if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
      return (
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
    });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const buildUrl = (next: {
    tipe?: string;
    kategori?: string;
    page?: number;
  }) => {
    const query = new URLSearchParams();
    if (next.tipe) query.set("tipe", next.tipe);
    if (next.kategori) query.set("kategori", next.kategori);
    if (next.page && next.page > 1) query.set("page", String(next.page));
    const qs = query.toString();
    return qs ? `/informasi?${qs}` : "/informasi";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#803AB3] text-white relative overflow-x-hidden">
      {/* Atmospheric Radial Glow for Glass Refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(190,144,11,0.28),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(23,9,38,0.5),_transparent_60%)]"
      />

      <Navbar variant="hero" />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 w-full space-y-8">
        {/* Page Header */}
        <MotionReveal>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] text-white">
              Pengumuman, Kegiatan &amp; Beasiswa
            </h1>
            <p className="text-sm sm:text-base text-[#eedff9] max-w-2xl">
              Gunakan filter tipe atau kategori di bawah ini. Tautan hasil filter dapat langsung Anda bagikan kepada teman.
            </p>
          </div>
        </MotionReveal>

        {/* Glassmorphic Filter Bar */}
        <MotionReveal delay={0.05}>
          <div className="rounded-2xl bg-white/12 backdrop-blur-xl border border-white/20 p-4 sm:p-5 space-y-4">
            {/* Tipe Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#eedff9] mr-1">
                Tipe:
              </span>
              <Link
                href={buildUrl({ kategori: activeKategori })}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors border",
                  !activeTipe
                    ? "bg-white text-gray-900 border-white font-semibold"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                )}
              >
                Semua
              </Link>
              {VALID_TYPES.map((item) => (
                <Link
                  key={item.value}
                  href={buildUrl({
                    tipe: item.value,
                    kategori: activeKategori,
                  })}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors border",
                    activeTipe === item.value
                      ? "bg-white text-gray-900 border-white font-semibold"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Kategori Filter */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/15">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#eedff9] mr-1">
                Kategori:
              </span>
              <Link
                href={buildUrl({ tipe: activeTipe })}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors border",
                  !activeKategori
                    ? "bg-secondary text-white border-secondary font-semibold"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                )}
              >
                Semua Kategori
              </Link>
              {CATEGORIES.filter((c) => c.aktif).map((cat) => (
                <Link
                  key={cat.id}
                  href={buildUrl({
                    tipe: activeTipe,
                    kategori: cat.slug,
                  })}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-colors border",
                    activeKategori === cat.slug
                      ? "bg-secondary text-white border-secondary font-semibold"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  )}
                >
                  {cat.nama}
                </Link>
              ))}
            </div>
          </div>
        </MotionReveal>

        {/* Glassmorphism Bento Grid or Empty State */}
        {paginatedPosts.length === 0 ? (
          <MotionReveal delay={0.1}>
            <div className="rounded-2xl border border-dashed border-white/30 bg-white/10 backdrop-blur-xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/15 mx-auto flex items-center justify-center text-white">
                <FilterX className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-white">
                  Tidak ada informasi yang cocok
                </h2>
                <p className="text-sm text-[#eedff9]">
                  Coba ubah kombinasi filter tipe atau kategori untuk melihat informasi lainnya.
                </p>
              </div>
              <Link
                href="/informasi"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "rounded-full bg-white text-gray-900 hover:bg-white/90"
                )}
              >
                Reset semua filter
              </Link>
            </div>
          </MotionReveal>
        ) : (
          <>
            <MotionReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
                {paginatedPosts.map((post, idx) => {
                  const isHeroTile = idx === 0 && paginatedPosts.length >= 3;
                  const isStackedRight =
                    (idx === 1 || idx === 2) && paginatedPosts.length >= 3;
                  const isEventPast =
                    post.tipe === "kegiatan" &&
                    isPastDate(post.event_selesai ?? post.event_mulai);
                  const isDeadlineClosed =
                    post.deadline_at !== null && isPastDate(post.deadline_at);

                  return (
                    <Link
                      key={post.id}
                      href={`/informasi/${post.slug}`}
                      className={cn(
                        "group relative rounded-2xl bg-white/12 backdrop-blur-xl border border-white/20 hover:bg-white/18 hover:border-white/35 transition-all duration-300 overflow-hidden flex flex-col justify-between",
                        isHeroTile &&
                          "md:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[340px] lg:min-h-[420px]",
                        isStackedRight && "lg:col-span-5",
                        !isHeroTile &&
                          !isStackedRight &&
                          (paginatedPosts.length <= 2
                            ? "lg:col-span-6"
                            : "lg:col-span-4")
                      )}
                    >
                      {post.cover_url && isHeroTile && (
                        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                          <img
                            src={post.cover_url}
                            alt={post.judul}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#582280] via-[#582280]/25 to-transparent" />
                        </div>
                      )}

                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {post.is_pinned && (
                              <Badge className="rounded-full bg-white text-gray-900 border-0 gap-1 font-semibold">
                                <Pin className="w-3 h-3 text-primary" />
                                Penting
                              </Badge>
                            )}
                            <Badge className="rounded-full bg-secondary text-white border-0 font-medium">
                              {TYPE_LABELS[post.tipe]}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="rounded-full border-white/25 text-white bg-white/10 font-normal"
                            >
                              {post.category.nama}
                            </Badge>
                            {isEventPast && (
                              <Badge
                                variant="outline"
                                className="rounded-full border-white/25 text-[#eedff9]"
                              >
                                Telah berlalu
                              </Badge>
                            )}
                            {isDeadlineClosed && (
                              <Badge className="rounded-full bg-rose-500/90 text-white border-0">
                                Ditutup
                              </Badge>
                            )}
                          </div>

                          <h2
                            className={cn(
                              "font-bold text-white leading-snug group-hover:underline underline-offset-4",
                              isHeroTile
                                ? "text-xl sm:text-2xl"
                                : "text-base sm:text-lg line-clamp-2"
                            )}
                          >
                            {post.judul}
                          </h2>

                          <p
                            className={cn(
                              "text-[#eedff9] leading-relaxed",
                              isHeroTile
                                ? "text-sm sm:text-base line-clamp-3"
                                : "text-xs sm:text-sm line-clamp-2"
                            )}
                          >
                            {post.ringkasan}
                          </p>
                        </div>

                        <div className="space-y-2.5 pt-2">
                          {(post.event_mulai || post.lokasi || post.deadline_at) && (
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#eedff9]">
                              {post.event_mulai && (
                                <span className="inline-flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-secondary shrink-0" />
                                  {formatTanggalSingkat(post.event_mulai)}
                                </span>
                              )}
                              {post.lokasi && (
                                <span className="inline-flex items-center gap-1.5 truncate max-w-[240px]">
                                  <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                                  <span className="truncate">{post.lokasi}</span>
                                </span>
                              )}
                              {post.deadline_at && (
                                <span className="inline-flex items-center gap-1.5 font-medium text-white">
                                  <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                                  Tenggat: {formatTanggalSingkat(post.deadline_at)}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-[#eedff9]">
                            <span className="tabular-nums">
                              Terbit {formatTanggalSingkat(post.published_at)}
                            </span>
                            <span className="inline-flex items-center gap-1 font-semibold text-white group-hover:translate-x-0.5 transition-transform">
                              Detail
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </MotionReveal>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <Link
                  href={buildUrl({
                    tipe: activeTipe,
                    kategori: activeKategori,
                    page: safePage - 1,
                  })}
                  aria-disabled={safePage <= 1}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "rounded-full bg-white/15 text-white border border-white/20 hover:bg-white/25",
                    safePage <= 1 && "pointer-events-none opacity-40"
                  )}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Sebelumnya
                </Link>
                <span className="text-xs sm:text-sm font-medium text-[#eedff9] px-3 tabular-nums">
                  Halaman {safePage} dari {totalPages}
                </span>
                <Link
                  href={buildUrl({
                    tipe: activeTipe,
                    kategori: activeKategori,
                    page: safePage + 1,
                  })}
                  aria-disabled={safePage >= totalPages}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "rounded-full bg-white/15 text-white border border-white/20 hover:bg-white/25",
                    safePage >= totalPages && "pointer-events-none opacity-40"
                  )}
                >
                  Berikutnya
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            )}
          </>
        )}
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
