import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Pin,
  Link2,
} from "lucide-react";
import { Navbar } from "@/components/portal/Navbar";
import { Footer } from "@/components/portal/Footer";
import { ShareButtons } from "@/components/portal/ShareButtons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { POSTS } from "@/data/mock-portal";
import { PostType } from "@/types/portal";
import { formatTanggalWIB, isPastDate } from "@/lib/date";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<PostType, string> = {
  pengumuman: "Pengumuman",
  kegiatan: "Kegiatan",
  beasiswa_lomba: "Beasiswa & Lomba",
};

interface DetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug && p.status === "terbit");

  if (!post) {
    return { title: "Informasi tidak ditemukan - Portal UISB" };
  }

  return {
    title: `${post.judul} - Portal Mahasiswa UISB`,
    description: post.ringkasan,
    openGraph: {
      title: post.judul,
      description: post.ringkasan,
      type: "article",
    },
  };
}

export default async function InformasiDetailPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug && p.status === "terbit");

  if (!post) {
    notFound();
  }

  const isEventPast =
    post.tipe === "kegiatan" && isPastDate(post.event_selesai ?? post.event_mulai);
  const isDeadlineClosed =
    post.deadline_at !== null && isPastDate(post.deadline_at);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar variant="solid" />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
        <Link
          href="/informasi"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "-ml-2 text-muted-foreground hover:text-primary inline-flex items-center gap-1.5"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke daftar informasi
        </Link>

        <article className="rounded-2xl border border-border bg-white p-6 sm:p-10 shadow-2xs space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {post.is_pinned && (
              <Badge className="bg-primary text-primary-foreground rounded-full gap-1">
                <Pin className="w-3 h-3" />
                Disematkan
              </Badge>
            )}
            <Badge
              variant="outline"
              className="rounded-full border-primary/30 text-primary bg-primary/5"
            >
              {TYPE_LABELS[post.tipe]}
            </Badge>
            <Badge variant="secondary" className="rounded-full bg-muted text-muted-foreground">
              {post.category.nama}
            </Badge>
            {isEventPast && (
              <Badge variant="outline" className="rounded-full text-muted-foreground">
                Telah berlalu
              </Badge>
            )}
            {isDeadlineClosed && (
              <Badge variant="destructive" className="rounded-full">
                Ditutup
              </Badge>
            )}
            {post.updated_at && (
              <Badge variant="outline" className="rounded-full border-secondary/30 text-secondary">
                Diperbarui
              </Badge>
            )}
          </div>

          {/* Title & Dates */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-snug">
              {post.judul}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
              <span>Diterbitkan: {formatTanggalWIB(post.published_at, true)}</span>
              {post.updated_at && (
                <span>Diperbarui: {formatTanggalWIB(post.updated_at, true)}</span>
              )}
            </div>
          </div>

          {/* Event / Deadline Info Box */}
          {(post.event_mulai || post.lokasi || post.deadline_at) && (
            <Card className="bg-muted/40 border-border/80 shadow-none">
              <CardContent className="p-4 sm:p-5 space-y-2.5 text-sm">
                {post.event_mulai && (
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground block">
                        Jadwal Kegiatan
                      </span>
                      <span className="text-muted-foreground">
                        {formatTanggalWIB(post.event_mulai, true)}
                        {post.event_selesai &&
                          ` – ${formatTanggalWIB(post.event_selesai, true)}`}
                      </span>
                    </div>
                  </div>
                )}
                {post.lokasi && (
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground block">
                        Lokasi
                      </span>
                      <span className="text-muted-foreground">{post.lokasi}</span>
                    </div>
                  </div>
                )}
                {post.deadline_at && (
                  <div className="flex items-start gap-2.5">
                    <Clock
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        isDeadlineClosed ? "text-destructive" : "text-secondary"
                      }`}
                    />
                    <div>
                      <span className="font-semibold text-foreground block">
                        Batas Waktu / Tenggat
                      </span>
                      <span
                        className={
                          isDeadlineClosed
                            ? "text-destructive font-medium"
                            : "text-muted-foreground"
                        }
                      >
                        {formatTanggalWIB(post.deadline_at, true)}
                        {isDeadlineClosed ? " (Sudah ditutup)" : ""}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Body Content */}
          <div className="space-y-4 text-base leading-relaxed text-foreground/90">
            {post.isi.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Attachment Links */}
          {post.links.length > 0 && (
            <Card className="border-primary/20 bg-primary/5 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
                  <Link2 className="w-4 h-4" />
                  Lampiran &amp; Tautan Terkait
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {post.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-border hover:border-primary/50 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-4 h-4 shrink-0 ml-2" />
                  </a>
                ))}
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Share Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Bagikan informasi ini:
            </span>
            <ShareButtons title={post.judul} slug={post.slug} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
