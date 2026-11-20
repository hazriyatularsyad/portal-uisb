import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Megaphone,
  Pin,
  Users,
  Wallet,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroBanner } from "@/components/portal/HeroBanner";
import { MotionReveal } from "@/components/portal/MotionReveal";
import { ServiceLinksBlock } from "@/components/portal/ServiceLinksBlock";
import { Footer } from "@/components/portal/Footer";
import {
  CALENDAR_EVENTS,
  CATEGORIES,
  POSTS,
  SERVICE_LINKS,
} from "@/data/mock-portal";
import { CalendarEventType, PostType } from "@/types/portal";
import { formatTanggalSingkat, isPastDate } from "@/lib/date";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<
  string,
  { icon: typeof BookOpen; boxClass: string; iconClass: string }
> = {
  akademik: {
    icon: BookOpen,
    boxClass: "bg-[#F7F3FC] border-primary/20 hover:border-primary/50",
    iconClass: "bg-primary text-white",
  },
  kemahasiswaan: {
    icon: Users,
    boxClass: "bg-[#FCF9EE] border-secondary/25 hover:border-secondary/60",
    iconClass: "bg-secondary text-white",
  },
  keuangan: {
    icon: Wallet,
    boxClass: "bg-emerald-50/70 border-emerald-200 hover:border-emerald-400",
    iconClass: "bg-emerald-600 text-white",
  },
  umum: {
    icon: Megaphone,
    boxClass: "bg-sky-50/70 border-sky-200 hover:border-sky-400",
    iconClass: "bg-sky-600 text-white",
  },
};

const CALENDAR_DATE_STYLES: Record<CalendarEventType, string> = {
  perkuliahan: "bg-primary/12 border-primary/25 text-primary",
  administrasi: "bg-secondary/15 border-secondary/35 text-[#8f6a00]",
  ujian: "bg-rose-50 border-rose-200 text-rose-700",
  libur: "bg-emerald-50 border-emerald-200 text-emerald-700",
  lainnya: "bg-muted border-border text-foreground",
};

const BENTO_TYPE_LABELS: Record<PostType, string> = {
  pengumuman: "Pengumuman",
  kegiatan: "Kegiatan",
  beasiswa_lomba: "Beasiswa & Lomba",
};

export default function HomePage() {
  const publishedPosts = POSTS.filter((p) => p.status === "terbit").sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  const pinnedPosts = publishedPosts.filter((p) => p.is_pinned).slice(0, 3);
  const leadPinned = pinnedPosts[0];
  const secondaryPinned = pinnedPosts.slice(1);

  const latestPosts = publishedPosts.filter((p) => !p.is_pinned).slice(0, 6);

  const stats = {
    totalInfo: publishedPosts.length,
    kegiatanCount: publishedPosts.filter((p) => p.tipe === "kegiatan").length,
    beasiswaCount: publishedPosts.filter((p) => p.tipe === "beasiswa_lomba")
      .length,
  };

  const upcomingCalendar = CALENDAR_EVENTS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Hero Banner min-h-screen + Sticky Auto-Expanding Navbar */}
      <HeroBanner pinnedPosts={pinnedPosts} stats={stats} />

      <main className="flex-1 w-full">
        {/* Ubin Akses Cepat Kategori */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
          <MotionReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {CATEGORIES.filter((c) => c.aktif).map((cat) => {
                const style = CATEGORY_STYLES[cat.slug] ?? CATEGORY_STYLES.umum;
                const Icon = style.icon;

                return (
                  <Link
                    key={cat.id}
                    href={`/informasi?kategori=${cat.slug}`}
                    className={cn(
                      "group rounded-2xl border p-4 sm:p-5 flex items-center gap-3.5 transition-colors",
                      style.boxClass
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                        style.iconClass
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm sm:text-base text-foreground truncate">
                        {cat.nama}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Lihat kategori &rarr;
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </MotionReveal>
        </section>

        {/* Pengumuman Penting — Asymmetric Editorial Spotlight */}
        {leadPinned && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6">
            <MotionReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="space-y-1.5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-foreground">
                    Pengumuman Penting
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Informasi prioritas yang wajib diperhatikan mahasiswa saat ini.
                  </p>
                </div>
                <Link
                  href="/informasi"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "text-primary self-start sm:self-auto inline-flex items-center gap-1.5 font-semibold"
                  )}
                >
                  Lihat semua
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Lead Featured Pinned Post — Primary Purple Surface */}
              <Link
                href={`/informasi/${leadPinned.slug}`}
                className="lg:col-span-7 group rounded-2xl border border-primary bg-primary text-primary-foreground overflow-hidden flex flex-col justify-between transition-colors hover:bg-[#7131a0]"
              >
                {leadPinned.cover_url && (
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-primary/40">
                    <img
                      src={leadPinned.cover_url}
                      alt={leadPinned.judul}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                  </div>
                )}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-secondary text-white rounded-full gap-1 border-0">
                      <Pin className="w-3 h-3" />
                      Utama
                    </Badge>
                    <Badge
                      variant="outline"
                      className="rounded-full border-white/25 text-white bg-white/10"
                    >
                      {leadPinned.category.nama}
                    </Badge>
                    <span className="text-xs text-[#eedff9] ml-auto tabular-nums">
                      {formatTanggalSingkat(leadPinned.published_at)}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug group-hover:underline underline-offset-4">
                    {leadPinned.judul}
                  </h3>
                  <p className="text-sm sm:text-base text-[#eedff9] leading-relaxed max-w-[65ch]">
                    {leadPinned.ringkasan}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/15 text-sm font-semibold text-white">
                  <span>Baca pengumuman lengkap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                </div>
              </Link>

              {/* Secondary Pinned Items */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {secondaryPinned.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/informasi/${post.slug}`}
                    className={cn(
                      "flex-1 group rounded-2xl border p-5 sm:p-6 flex flex-col justify-between gap-4 transition-colors",
                      idx === 0
                        ? "bg-[#FFFDF5] border-secondary/35 hover:border-secondary"
                        : "bg-white border-border hover:border-primary/45"
                    )}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <Badge
                          variant="outline"
                          className="rounded-full border-secondary/40 text-[#8f6a00] bg-secondary/10"
                        >
                          {post.category.nama}
                        </Badge>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {formatTanggalSingkat(post.published_at)}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.judul}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.ringkasan}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Detail informasi
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
              </div>
            </MotionReveal>
          </section>
        )}

        {/* Informasi Terbaru — #803AB3 Surface + Glassmorphism Bento Grid */}
        <section className="relative w-full overflow-hidden bg-[#803AB3] text-white py-14 sm:py-20">
          {/* Atmospheric Gold & Deep Purple Glow for Glass Refraction */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(190,144,11,0.28),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(23,9,38,0.45),_transparent_60%)]"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <MotionReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1.5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-white">
                    Informasi Terbaru
                  </h2>
                  <p className="text-sm sm:text-base text-[#eedff9]">
                    Kumpulan pengumuman akademik, kegiatan kampus, serta info beasiswa &amp; lomba.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/informasi?tipe=pengumuman"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "rounded-full bg-white/12 hover:bg-white/22 text-white border border-white/20 backdrop-blur-md"
                    )}
                  >
                    Pengumuman
                  </Link>
                  <Link
                    href="/informasi?tipe=kegiatan"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "rounded-full bg-white/12 hover:bg-white/22 text-white border border-white/20 backdrop-blur-md"
                    )}
                  >
                    Kegiatan
                  </Link>
                  <Link
                    href="/informasi?tipe=beasiswa_lomba"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "rounded-full bg-white/12 hover:bg-white/22 text-white border border-white/20 backdrop-blur-md"
                    )}
                  >
                    Beasiswa &amp; Lomba
                  </Link>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
                {latestPosts.map((post, idx) => {
                  const isHeroTile = idx === 0;
                  const isStackedRight = idx === 1 || idx === 2;
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
                        isHeroTile && "md:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[340px] lg:min-h-[420px]",
                        isStackedRight && "lg:col-span-5",
                        !isHeroTile && !isStackedRight && "lg:col-span-4"
                      )}
                    >
                      {/* Cover Image for Hero Tile or Cards with Cover */}
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
                            <Badge className="rounded-full bg-secondary text-white border-0 font-medium">
                              {BENTO_TYPE_LABELS[post.tipe]}
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

                          <h3
                            className={cn(
                              "font-bold text-white leading-snug group-hover:underline underline-offset-4",
                              isHeroTile
                                ? "text-xl sm:text-2xl"
                                : "text-base sm:text-lg line-clamp-2"
                            )}
                          >
                            {post.judul}
                          </h3>

                          <p
                            className={cn(
                              "text-[#eedff9] leading-relaxed",
                              isHeroTile ? "text-sm sm:text-base line-clamp-3" : "text-xs sm:text-sm line-clamp-2"
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
          </div>
        </section>

        {/* Ringkasan Kalender Akademik — Soft Warm Gold Band + Color-Coded Date Blocks */}
        <section className="w-full bg-[#FCF9EE] border-b border-secondary/15 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <MotionReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="space-y-1.5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-foreground">
                    Kalender Akademik
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Jadwal penting perkuliahan, administrasi, dan ujian semester berjalan.
                  </p>
                </div>
                <Link
                  href="/kalender"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full bg-white self-start sm:self-auto inline-flex items-center gap-1.5"
                  )}
                >
                  <Calendar className="w-4 h-4" />
                  Buka kalender penuh
                </Link>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="rounded-2xl border border-secondary/20 bg-white divide-y divide-border overflow-hidden">
              {upcomingCalendar.map((item) => {
                const dayNum = item.mulai.slice(8, 10);
                const monthShort = new Intl.DateTimeFormat("id-ID", {
                  month: "short",
                }).format(new Date(`${item.mulai}T00:00:00+07:00`));

                return (
                  <div
                    key={item.id}
                    className="p-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div
                        className={cn(
                          "w-13 h-13 rounded-xl border flex flex-col items-center justify-center shrink-0 tabular-nums",
                          CALENDAR_DATE_STYLES[item.jenis]
                        )}
                      >
                        <span className="text-lg font-extrabold leading-none">
                          {dayNum}
                        </span>
                        <span className="text-[11px] font-semibold uppercase mt-0.5">
                          {monthShort}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="rounded-full text-[11px] capitalize bg-muted text-foreground"
                          >
                            {item.jenis}
                          </Badge>
                          <span className="text-xs font-medium text-muted-foreground tabular-nums">
                            {item.mulai === item.selesai
                              ? formatTanggalSingkat(item.mulai)
                              : `${formatTanggalSingkat(item.mulai)} – ${formatTanggalSingkat(item.selesai)}`}
                          </span>
                        </div>
                        <p className="font-bold text-sm sm:text-base text-foreground">
                          {item.judul}
                        </p>
                      </div>
                    </div>
                    {item.post_slug && (
                      <Link
                        href={`/informasi/${item.post_slug}`}
                        className={cn(
                          buttonVariants({ variant: "link", size: "sm" }),
                          "text-primary p-0 h-auto self-start sm:self-center font-semibold"
                        )}
                      >
                        Lihat detail &rarr;
                      </Link>
                    )}
                  </div>
                );
              })}
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* Blok Tautan Layanan */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <MotionReveal>
            <ServiceLinksBlock links={SERVICE_LINKS} />
          </MotionReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
