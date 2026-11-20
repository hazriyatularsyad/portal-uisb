import Link from "next/link";
import { Calendar, Clock, MapPin, Pin, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post, PostType } from "@/types/portal";
import { formatTanggalSingkat, isPastDate } from "@/lib/date";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<PostType, string> = {
  pengumuman: "Pengumuman",
  kegiatan: "Kegiatan",
  beasiswa_lomba: "Beasiswa & Lomba",
};

const TYPE_STYLES: Record<PostType, string> = {
  pengumuman: "bg-primary/10 text-primary border-primary/20",
  kegiatan: "bg-secondary/15 text-[#8f6a00] border-secondary/30",
  beasiswa_lomba: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const isEventPast =
    post.tipe === "kegiatan" && isPastDate(post.event_selesai ?? post.event_mulai);
  const isDeadlineClosed =
    post.deadline_at !== null && isPastDate(post.deadline_at);

  return (
    <Link href={`/informasi/${post.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden flex flex-col justify-between transition-colors duration-200 hover:border-primary/50 bg-white shadow-none">
        {post.cover_url && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
            <img
              src={post.cover_url}
              alt={post.judul}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <CardHeader className="space-y-3 pb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {post.is_pinned && (
              <Badge className="bg-primary text-primary-foreground gap-1 rounded-full">
                <Pin className="w-3 h-3" />
                Penting
              </Badge>
            )}
            <Badge
              variant="outline"
              className={cn("rounded-full font-medium", TYPE_STYLES[post.tipe])}
            >
              {TYPE_LABELS[post.tipe]}
            </Badge>
            <Badge variant="secondary" className="rounded-full bg-muted text-muted-foreground font-normal">
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
          </div>

          <CardTitle className="text-base sm:text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.judul}
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-4 space-y-3 flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {post.ringkasan}
          </p>

          {/* Metadata spesifik tipe */}
          <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
            {post.event_mulai && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Acara: {formatTanggalSingkat(post.event_mulai)}</span>
              </div>
            )}
            {post.lokasi && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span className="truncate">{post.lokasi}</span>
              </div>
            )}
            {post.deadline_at && (
              <div
                className={cn(
                  "flex items-center gap-1.5 font-medium",
                  isDeadlineClosed ? "text-destructive" : "text-secondary"
                )}
              >
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Tenggat: {formatTanggalSingkat(post.deadline_at)}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <span>Terbit {formatTanggalSingkat(post.published_at)}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
            Detail
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
