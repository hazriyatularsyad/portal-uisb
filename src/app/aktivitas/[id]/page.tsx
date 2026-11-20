import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight, Calendar, MapPin } from "lucide-react";
import { Navbar } from "@/components/portal/Navbar";
import { Footer } from "@/components/portal/Footer";
import { MotionReveal } from "@/components/portal/MotionReveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ThumbnailCarousel } from "@/components/ui/thumbnail-carousel";
import {
  AKTIVITAS_LIST,
  getAktivitasById,
  getAktivitasGallery,
} from "@/data/mock-portal";
import { AktivitasCategory } from "@/types/portal";
import { formatTanggalWIB } from "@/lib/date";
import { cn } from "@/lib/utils";

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

interface AktivitasDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return AKTIVITAS_LIST.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: AktivitasDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getAktivitasById(id);

  if (!item) {
    return { title: "Aktivitas tidak ditemukan - Portal UISB" };
  }

  return {
    title: `${item.judul} - Dokumentasi Aktivitas UISB`,
    description: item.deskripsi,
    openGraph: {
      title: item.judul,
      description: item.deskripsi,
      images: [item.foto_url],
    },
  };
}

export default async function AktivitasDetailPage({
  params,
}: AktivitasDetailPageProps) {
  const { id } = await params;
  const item = getAktivitasById(id);

  if (!item) {
    notFound();
  }

  const gallery = getAktivitasGallery(item);
  const others = AKTIVITAS_LIST.filter((a) => a.id !== item.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#803AB3] text-white relative overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(190,144,11,0.28),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(23,9,38,0.5),_transparent_60%)]"
      />

      <Navbar variant="hero" />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 w-full space-y-8">
        <MotionReveal>
          <Link
            href="/aktivitas"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "rounded-full bg-white/12 hover:bg-white/22 text-white border border-white/20 backdrop-blur-md inline-flex items-center gap-1.5"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Semua aktivitas
          </Link>
        </MotionReveal>

        <MotionReveal delay={0.05}>
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "rounded-full font-medium",
                  CATEGORY_BADGE_STYLES[item.kategori]
                )}
              >
                {CATEGORY_LABELS[item.kategori]}
              </Badge>
            </div>
            <h1 className="text-white">{item.judul}</h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#eedff9]">
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Calendar className="w-4 h-4 text-secondary" />
                {formatTanggalWIB(`${item.tanggal}T00:00:00+07:00`)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-secondary" />
                {item.lokasi}
              </span>
            </div>
          </header>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <ThumbnailCarousel items={gallery} />
        </MotionReveal>

        <MotionReveal delay={0.12}>
          <section className="rounded-2xl bg-white/12 backdrop-blur-xl border border-white/20 p-5 sm:p-7 space-y-3">
            <h2 className="text-white">Tentang kegiatan</h2>
            <p className="text-[#eedff9] max-w-[70ch]">{item.deskripsi}</p>
          </section>
        </MotionReveal>

        {others.length > 0 && (
          <MotionReveal delay={0.14}>
            <section className="space-y-4">
              <h2 className="text-white">Aktivitas lainnya</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {others.map((other) => (
                  <Link
                    key={other.id}
                    href={`/aktivitas/${other.id}`}
                    className="group relative h-48 rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 focus-visible:ring-2 focus-visible:ring-[#BE900B] outline-none transition-colors bg-black/30"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={other.foto_url}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a0f42]/95 via-[#2a0f42]/35 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 space-y-1">
                      <h3 className="text-white line-clamp-2">{other.judul}</h3>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#eedff9]">
                        Lihat detail
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </MotionReveal>
        )}
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
