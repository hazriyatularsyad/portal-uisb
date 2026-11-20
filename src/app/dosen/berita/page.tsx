import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/portal/Navbar";
import { Footer } from "@/components/portal/Footer";
import { buttonVariants } from "@/components/ui/button";
import { BERITA_DOSEN_LIST, DOSEN_LIST } from "@/data/mock-dosen";
import { formatNamaDosen } from "@/types/dosen";
import { formatTanggalSingkat } from "@/lib/date";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Berita Terbaru Dosen - UISB",
  description:
    "Kumpulan berita penelitian, pengabdian, dan capaian akademik dosen Universitas Islam Sumatera Barat.",
};

export default function DosenBeritaListPage() {
  const newsList = BERITA_DOSEN_LIST.filter((b) => b.status === "terbit").sort(
    (a, b) =>
      new Date(b.tanggal_terbit).getTime() -
      new Date(a.tanggal_terbit).getTime()
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar variant="solid" />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        <div className="space-y-3">
          <Link
            href="/dosen"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "-ml-2 text-muted-foreground hover:text-primary inline-flex items-center gap-1.5"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke direktori dosen
          </Link>
          <h1>Berita Terbaru Dosen</h1>
          <p className="text-muted-foreground">
            Kabar terkini seputar penelitian, pengabdian masyarakat, dan prestasi akademik dosen UISB.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsList.map((news) => {
            const relatedNames = news.dosen_ids
              .map((id) => DOSEN_LIST.find((d) => d.id === id))
              .filter(Boolean)
              .map((d) => formatNamaDosen(d!));

            return (
              <Link
                key={news.id}
                href={`/dosen/berita/${news.slug}`}
                className="group rounded-2xl border border-border bg-white hover:border-primary/50 transition-colors overflow-hidden flex flex-col justify-between"
              >
                {news.gambar_url && (
                  <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                    <img
                      src={news.gambar_url}
                      alt={news.judul}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground tabular-nums block">
                      {formatTanggalSingkat(news.tanggal_terbit)}
                    </span>
                    <h2 className="font-sans font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                      {news.judul}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {news.ringkasan}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                    <span className="truncate">{relatedNames.join(", ")}</span>
                    <span className="inline-flex items-center gap-1 shrink-0">
                      Baca
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
