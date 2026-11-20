import Link from "next/link";
import { Metadata } from "next";
import { ArrowDown, Calendar, Newspaper, Search } from "lucide-react";
import { Navbar } from "@/components/portal/Navbar";
import { Footer } from "@/components/portal/Footer";
import { MotionReveal } from "@/components/portal/MotionReveal";
import { DosenConnectedCarousel } from "@/components/portal/DosenConnectedCarousel";
import { ServiceLinksBlock } from "@/components/portal/ServiceLinksBlock";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BERITA_DOSEN_LIST, DOSEN_LIST, PRODI_LIST } from "@/data/mock-dosen";
import { CALENDAR_EVENTS, SERVICE_LINKS } from "@/data/mock-portal";
import { CalendarEventType } from "@/types/portal";
import { formatNamaDosen } from "@/types/dosen";
import { formatTanggalSingkat } from "@/lib/date";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Direktori & Profil Dosen - Universitas Islam Sumatera Barat (UISB)",
  description:
    "Temukan profil akademik, bidang keahlian, penelitian, publikasi, serta berita terbaru dosen Universitas Islam Sumatera Barat.",
};

const CALENDAR_DATE_STYLES: Record<CalendarEventType, string> = {
  perkuliahan: "bg-primary/12 border-primary/25 text-primary",
  administrasi: "bg-secondary/15 border-secondary/35 text-[#8f6a00]",
  ujian: "bg-rose-50 border-rose-200 text-rose-700",
  libur: "bg-emerald-50 border-emerald-200 text-emerald-700",
  lainnya: "bg-muted border-border text-foreground",
};

interface DosenPageProps {
  searchParams: Promise<{
    prodi?: string;
    q?: string;
  }>;
}

export default async function DosenPage({ searchParams }: DosenPageProps) {
  const params = await searchParams;
  const activeProdi = PRODI_LIST.some((p) => p.slug === params.prodi)
    ? params.prodi
    : undefined;
  const query = (params.q ?? "").trim().toLowerCase();

  const latestNews = BERITA_DOSEN_LIST.filter((b) => b.status === "terbit")
    .sort((a, b) => {
      if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
      return (
        new Date(b.tanggal_terbit).getTime() -
        new Date(a.tanggal_terbit).getTime()
      );
    })
    .slice(0, 3);

  const filteredDosen = DOSEN_LIST.filter((d) => d.status === "terbit")
    .filter((d) => (activeProdi ? d.prodi.slug === activeProdi : true))
    .filter((d) => {
      if (!query) return true;
      const fullName = formatNamaDosen(d).toLowerCase();
      const skills = d.keahlian.join(" ").toLowerCase();
      return fullName.includes(query) || skills.includes(query);
    });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Editorial Hero Banner Halaman Dosen — min-h-screen tanpa card */}
      <section className="relative w-full min-h-screen overflow-hidden bg-[#130720] text-white flex flex-col justify-between">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80"
          alt="Suasana Akademik Dosen UISB"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(190,144,11,0.34),_transparent_52%),linear-gradient(to_top,#130720_12%,rgba(128,58,179,0.55)_55%,rgba(19,7,32,0.9)_100%)]"
        />

        <Navbar variant="hero" />

        <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex-1 flex flex-col items-center justify-center text-center space-y-6">
          {/* <p
            style={{ fontFamily: "var(--font-faster-one)" }}
            aria-hidden="true"
            className="hero-display text-[clamp(3.5rem,16vw,12rem)] font-normal tracking-[0.1em] leading-none text-white/12 select-none pointer-events-none"
          >
            DOSEN
          </p> */}

          <h1 className="text-white text-[34px] leading-[40px] sm:text-[48px] sm:leading-[56px] lg:text-[58px] lg:leading-[66px] max-w-3xl -mt-6 sm:-mt-10">
            Profil Akademik &amp; Kepakaran Dosen UISB
          </h1>

          <p className="text-base sm:text-lg text-[#e6daf2] leading-relaxed max-w-2xl">
            Temukan rekam jejak pendidikan, penelitian, publikasi ilmiah, serta pengabdian masyarakat para dosen Universitas Islam Sumatera Barat.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#direktori-dosen"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-[#BE900B] text-white hover:bg-[#a67d09] font-semibold px-7 h-11 inline-flex items-center gap-2 transition-colors"
              )}
            >
              Jelajahi Direktori
              <ArrowDown className="w-4 h-4" />
            </a>
            <Link
              href="/dosen/berita"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "rounded-full bg-white/12 hover:bg-white/22 text-white border border-white/20 px-7 h-11"
              )}
            >
              Berita Dosen
            </Link>
          </div>
        </div>
      </section>

      {/* Direktori Dosen: Pencarian + Filter Prodi + Connected Carousel */}
      <main
        id="direktori-dosen"
        className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 w-full space-y-8 scroll-mt-20"
      >
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-foreground">Direktori Dosen UISB</h2>
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredDosen.length} dosen · Cari berdasarkan nama, keahlian, atau program studi.
              </p>
            </div>

            {/* Search Form */}
            <form action="/dosen" method="GET" className="flex gap-2 w-full md:w-80">
              {activeProdi && (
                <input type="hidden" name="prodi" value={activeProdi} />
              )}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  name="q"
                  defaultValue={params.q ?? ""}
                  placeholder="Cari nama atau keahlian..."
                  className="w-full h-10 pl-9 pr-3 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </form>
          </div>
        </MotionReveal>

        {/* Filter Program Studi */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={query ? `/dosen?q=${encodeURIComponent(query)}` : "/dosen"}
            scroll={false}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors",
              !activeProdi
                ? "bg-primary text-white border-primary"
                : "bg-white text-muted-foreground border-border hover:text-foreground"
            )}
          >
            Semua Prodi
          </Link>
          {PRODI_LIST.map((prodi) => {
            const href = query
              ? `/dosen?prodi=${prodi.slug}&q=${encodeURIComponent(query)}`
              : `/dosen?prodi=${prodi.slug}`;
            return (
              <Link
                key={prodi.id}
                href={href}
                scroll={false}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors",
                  activeProdi === prodi.slug
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-muted-foreground border-border hover:text-foreground"
                )}
              >
                {prodi.nama}
              </Link>
            );
          })}
        </div>

        {/* Connected Carousel Dosen */}
        {filteredDosen.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center space-y-3">
            <p className="font-bold text-lg text-foreground">
              Dosen tidak ditemukan
            </p>
            <p className="text-sm text-muted-foreground">
              Coba ubah kata kunci pencarian atau pilih program studi lainnya.
            </p>
            <Link
              href="/dosen"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full"
              )}
            >
              Reset filter
            </Link>
          </div>
        ) : (
          <DosenConnectedCarousel items={filteredDosen} />
        )}
      </main>

      {/* Berita Terbaru Dosen Bento Grid */}
      <section className="relative w-full overflow-hidden bg-[#803AB3] text-white py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(190,144,11,0.3),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(23,9,38,0.5),_transparent_60%)]"
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <MotionReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-white">Berita Terbaru Dosen</h1>
                <p className="text-sm sm:text-base text-[#eedff9] max-w-2xl">
                  Capaian penelitian, pengabdian masyarakat, dan aktivitas akademik terkini para dosen Universitas Islam Sumatera Barat.
                </p>
              </div>
              <Link
                href="/dosen/berita"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 self-start sm:self-auto gap-1.5"
                )}
              >
                <Newspaper className="w-4 h-4" />
                Lihat semua berita
              </Link>
            </div>
          </MotionReveal>

          {latestNews.length > 0 && (
            <MotionReveal delay={0.08}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
                {latestNews.map((news, idx) => {
                  const isHeroTile = idx === 0;
                  const relatedNames = news.dosen_ids
                    .map((id) => DOSEN_LIST.find((d) => d.id === id))
                    .filter(Boolean)
                    .map((d) => formatNamaDosen(d!));

                  return (
                    <Link
                      key={news.id}
                      href={news.sumber_url ? news.sumber_url : `/dosen/berita/${news.slug}`}
                      target={news.sumber_url ? "_blank" : undefined}
                      rel={news.sumber_url ? "noopener noreferrer" : undefined}
                      className={cn(
                        "group relative rounded-2xl bg-white/12 backdrop-blur-xl border border-white/20 hover:bg-white/18 hover:border-white/35 transition-all overflow-hidden flex flex-col justify-between",
                        isHeroTile
                          ? "md:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[340px] lg:min-h-[440px]"
                          : "lg:col-span-5"
                      )}
                    >
                      {news.gambar_url && isHeroTile && (
                        <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-black/20">
                          <img
                            src={news.gambar_url}
                            alt={news.judul}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#582280] via-[#582280]/30 to-transparent" />
                        </div>
                      )}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-3">
                        <div className="space-y-2">
                          <span className="text-xs text-[#eedff9] tabular-nums block">
                            {formatTanggalSingkat(news.tanggal_terbit)}
                          </span>
                          <h2
                            className={cn(
                              "font-sans font-bold text-white leading-snug group-hover:underline underline-offset-4",
                              isHeroTile
                                ? "text-xl sm:text-2xl"
                                : "text-base sm:text-lg line-clamp-2"
                            )}
                          >
                            {news.judul}
                          </h2>
                          <p
                            className={cn(
                              "text-[#eedff9] leading-relaxed",
                              isHeroTile
                                ? "text-sm sm:text-base line-clamp-3"
                                : "text-xs sm:text-sm line-clamp-2"
                            )}
                          >
                            {news.ringkasan}
                          </p>
                        </div>
                        {relatedNames.length > 0 && (
                          <p className="text-xs font-medium text-[#BE900B] pt-3 border-t border-white/15 truncate">
                            {relatedNames.join(", ")}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </MotionReveal>
          )}
        </div>
      </section>

      {/* Ringkasan Kalender Akademik — sama dengan halaman mahasiswa */}
      <section className="w-full bg-[#FCF9EE] border-y border-secondary/15 py-12 sm:py-16">
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
              {CALENDAR_EVENTS.slice(0, 4).map((item) => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <MotionReveal>
          <ServiceLinksBlock links={SERVICE_LINKS} />
        </MotionReveal>
      </div>

      <Footer />
    </div>
  );
}
