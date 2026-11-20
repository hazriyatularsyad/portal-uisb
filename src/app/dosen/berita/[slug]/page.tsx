import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, UserCheck } from "lucide-react";
import { Navbar } from "@/components/portal/Navbar";
import { Footer } from "@/components/portal/Footer";
import { buttonVariants } from "@/components/ui/button";
import { BERITA_DOSEN_LIST, DOSEN_LIST } from "@/data/mock-dosen";
import { formatNamaDosen } from "@/types/dosen";
import { formatTanggalWIB } from "@/lib/date";
import { cn } from "@/lib/utils";

interface BeritaDetailProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BERITA_DOSEN_LIST.filter((b) => b.status === "terbit").map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({
  params,
}: BeritaDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const news = BERITA_DOSEN_LIST.find(
    (b) => b.slug === slug && b.status === "terbit"
  );
  if (!news) return { title: "Berita Tidak Ditemukan - UISB" };
  return {
    title: `${news.judul} - Berita Dosen UISB`,
    description: news.ringkasan,
  };
}

export default async function DosenBeritaDetailPage({
  params,
}: BeritaDetailProps) {
  const { slug } = await params;
  const news = BERITA_DOSEN_LIST.find(
    (b) => b.slug === slug && b.status === "terbit"
  );

  if (!news) {
    notFound();
  }

  const relatedDosen = news.dosen_ids
    .map((id) => DOSEN_LIST.find((d) => d.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar variant="solid" />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
        <Link
          href="/dosen/berita"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "-ml-2 text-muted-foreground hover:text-primary inline-flex items-center gap-1.5"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Semua berita dosen
        </Link>

        <article className="rounded-2xl border border-border bg-white overflow-hidden">
          {news.gambar_url && (
            <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
              <img
                src={news.gambar_url}
                alt={news.judul}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground tabular-nums">
                {formatTanggalWIB(news.tanggal_terbit)}
              </p>
              <h1 className="text-foreground">{news.judul}</h1>
            </div>

            <div className="space-y-4 text-foreground/90 max-w-[70ch]">
              {news.isi.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {relatedDosen.length > 0 && (
              <div className="pt-6 border-t border-border space-y-3">
                <h2 className="font-sans font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Dosen Terkait
                </h2>
                <div className="flex flex-wrap gap-3">
                  {relatedDosen.map((d) => {
                    if (!d) return null;
                    const nama = formatNamaDosen(d);
                    if (d.status !== "terbit") {
                      return (
                        <span
                          key={d.id}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted text-sm font-medium text-muted-foreground"
                        >
                          <UserCheck className="w-4 h-4" />
                          {nama}
                        </span>
                      );
                    }
                    return (
                      <Link
                        key={d.id}
                        href={`/dosen/${d.slug}`}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-primary/20 bg-purple-50 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        <UserCheck className="w-4 h-4" />
                        {nama}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
