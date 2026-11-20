import { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Navbar } from "@/components/portal/Navbar";
import { Footer } from "@/components/portal/Footer";
import { MotionReveal } from "@/components/portal/MotionReveal";
import { Badge } from "@/components/ui/badge";
import {
  HeroCarousel,
  type HeroCarouselItem,
} from "@/components/ui/hero-carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AKTIVITAS_LIST } from "@/data/mock-portal";
import { AktivitasCategory, AktivitasItem } from "@/types/portal";
import { formatTanggalSingkat } from "@/lib/date";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dokumentasi Aktivitas Mahasiswa - Portal UISB",
  description:
    "Galeri foto dan dokumentasi kegiatan mahasiswa Universitas Islam Sumatera Barat (UISB).",
};

const CATEGORY_LABELS: Record<AktivitasCategory, string> = {
  akademik: "Akademik",
  kemahasiswaan: "Kemahasiswaan",
  pengabdian: "Pengabdian",
  prestasi: "Prestasi",
};

const CATEGORY_BADGE_STYLES: Record<AktivitasCategory, string> = {
  akademik: "bg-white/20 text-white border-white/25",
  kemahasiswaan: "bg-secondary text-white border-0",
  pengabdian: "bg-emerald-500/85 text-white border-0",
  prestasi: "bg-sky-500/85 text-white border-0",
};

const CATEGORY_ACCENTS: Record<AktivitasCategory, string> = {
  akademik: "#803AB3",
  kemahasiswaan: "#BE900B",
  pengabdian: "#0f9f6e",
  prestasi: "#0ea5e9",
};

// Judul singkat untuk headline hero (baris baru = baris terpisah).
const HERO_TITLES: Record<string, string> = {
  "akt-1": "Penyambutan\nMahasiswa Baru",
  "akt-2": "Kuliah Umum\nTeknologi",
  "akt-3": "KKN & Bakti\nSosial Nagari",
  "akt-4": "Juara Karya\nTulis Ilmiah",
  "akt-5": "Workshop\nProposal PKM",
  "akt-6": "Donor Darah\nMahasiswa",
};

const HERO_ITEMS: HeroCarouselItem[] = AKTIVITAS_LIST.map((item) => ({
  id: item.id,
  title: HERO_TITLES[item.id] ?? item.judul,
  image: item.foto_url,
  credit: item.lokasi.toUpperCase(),
  meta: [formatTanggalSingkat(item.tanggal), CATEGORY_LABELS[item.kategori]],
  accent: CATEGORY_ACCENTS[item.kategori],
}));

// Pola bento 12 kolom. Tinggi baris tetap, jadi ukuran kartu tidak
// bergantung pada panjang teks.
function tileSpan(idx: number, total: number): string {
  if (total === 1) return "md:col-span-2 lg:col-span-12 lg:row-span-2";
  if (total === 2) return "lg:col-span-6 lg:row-span-2";
  const pattern = [
    "md:col-span-2 lg:col-span-7 lg:row-span-2",
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-4",
    "lg:col-span-4",
    "lg:col-span-4",
  ];
  return pattern[idx % pattern.length];
}

function AktivitasGrid({ items }: { items: AktivitasItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[300px] lg:auto-rows-[230px] gap-4 sm:gap-5 grid-flow-dense">
      {items.map((item, idx) => {
        const span = tileSpan(idx, items.length);
        const isLarge = span.includes("row-span-2");

        return (
          <Link
            key={item.id}
            href={`/aktivitas/${item.id}`}
            aria-label={`Lihat detail: ${item.judul}`}
            className={cn(
              "group relative rounded-2xl border border-white/20 hover:border-white/40 focus-visible:ring-2 focus-visible:ring-[#BE900B] outline-none transition-colors duration-300 overflow-hidden bg-black/30",
              span
            )}
          >
            <img
              src={item.foto_url}
              alt={item.judul}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a0f42]/95 via-[#2a0f42]/40 to-transparent" />

            <div className="absolute inset-x-0 top-0 p-4 sm:p-5 flex items-center justify-between gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "rounded-full font-medium backdrop-blur-md",
                  CATEGORY_BADGE_STYLES[item.kategori]
                )}
              >
                {CATEGORY_LABELS[item.kategori]}
              </Badge>
              <span className="inline-flex items-center gap-1 text-xs text-white rounded-full bg-black/30 backdrop-blur-md border border-white/15 px-2.5 py-1 tabular-nums">
                <Calendar className="w-3.5 h-3.5 text-secondary" />
                {formatTanggalSingkat(item.tanggal)}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 space-y-2">
              <h2
                className={cn(
                  "font-bold leading-snug text-white",
                  isLarge ? "text-xl sm:text-2xl line-clamp-3" : "text-base sm:text-lg line-clamp-2"
                )}
              >
                {item.judul}
              </h2>
              {isLarge && (
                <p className="text-sm text-[#eedff9] leading-relaxed line-clamp-2 max-w-[60ch]">
                  {item.deskripsi}
                </p>
              )}
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#eedff9]">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span className="truncate">{item.lokasi}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function AktivitasPage() {
  const categories = Object.keys(CATEGORY_LABELS) as AktivitasCategory[];

  return (
    <div className="min-h-screen flex flex-col bg-[#803AB3] text-white relative overflow-x-hidden">
      {/* Atmospheric Radial Glow for Glass Refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(190,144,11,0.28),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(23,9,38,0.5),_transparent_60%)]"
      />

      <Navbar variant="hero" />

      {/* Hero: filmstrip carousel dokumentasi aktivitas */}
      <section className="relative z-10 h-[100svh] min-h-[600px] w-full">
        <HeroCarousel items={HERO_ITEMS} autoplay autoplayDelay={6500} />
      </section>

      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-14 w-full space-y-8">
        <MotionReveal>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] text-white">
              Dokumentasi Aktivitas Mahasiswa
            </h1>
            <p className="text-sm sm:text-base text-[#eedff9] max-w-2xl">
              Galeri foto dan cerita kegiatan akademik, kemahasiswaan, pengabdian masyarakat, serta prestasi mahasiswa Universitas Islam Sumatera Barat.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <Tabs defaultValue="semua" className="space-y-6">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-white/12 backdrop-blur-xl border border-white/20 p-1.5 rounded-full w-fit">
              <TabsTrigger
                value="semua"
                className="rounded-full px-4 text-white/85 aria-selected:bg-[#BE900B] aria-selected:text-white"
              >
                Semua
              </TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="rounded-full px-4 text-white/85 aria-selected:bg-[#BE900B] aria-selected:text-white"
                >
                  {CATEGORY_LABELS[cat]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="semua" className="mt-0">
              <AktivitasGrid items={AKTIVITAS_LIST} />
            </TabsContent>

            {categories.map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-0">
                <AktivitasGrid
                  items={AKTIVITAS_LIST.filter((item) => item.kategori === cat)}
                />
              </TabsContent>
            ))}
          </Tabs>
        </MotionReveal>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
