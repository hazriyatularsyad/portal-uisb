import { ClipboardCheck, Globe, BookOpen, ExternalLink, ArrowUpRight } from "lucide-react";
import { ServiceLink } from "@/types/portal";
import { cn } from "@/lib/utils";

interface ServiceLinksBlockProps {
  links: ServiceLink[];
}

const ICON_MAP = {
  clipboard: ClipboardCheck,
  globe: Globe,
  book: BookOpen,
  external: ExternalLink,
};

export function ServiceLinksBlock({ links }: ServiceLinksBlockProps) {
  const activeLinks = links
    .filter((item) => item.aktif)
    .sort((a, b) => a.urutan - b.urutan);

  return (
    <section id="layanan" className="space-y-6 scroll-mt-24">
      <div className="space-y-1.5">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-foreground">
          Tautan Layanan Kampus
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
          Akses langsung ke portal survey mahasiswa dan website resmi Universitas Islam Sumatera Barat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {activeLinks.map((service, index) => {
          const Icon = ICON_MAP[service.ikon] ?? Globe;
          const isFirst = index === 0;

          return (
            <a
              key={service.id}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative rounded-2xl p-6 sm:p-7 border transition-all duration-200 flex flex-col justify-between gap-6",
                isFirst
                  ? "bg-primary text-primary-foreground border-primary hover:bg-[#7131a0]"
                  : "bg-white text-foreground border-border hover:border-primary/50"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105",
                    isFirst
                      ? "bg-white/15 text-white"
                      : "bg-secondary/15 text-secondary"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    isFirst
                      ? "bg-white/15 text-white"
                      : "bg-muted text-foreground group-hover:bg-primary group-hover:text-white"
                  )}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-bold tracking-tight">
                  {service.judul}
                </h3>
                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    isFirst ? "text-[#eedff9]" : "text-muted-foreground"
                  )}
                >
                  {service.deskripsi}
                </p>
              </div>

              <div
                className={cn(
                  "text-xs font-semibold pt-2 border-t flex items-center justify-between",
                  isFirst
                    ? "border-white/15 text-white/90"
                    : "border-border text-primary"
                )}
              >
                <span>{service.url.replace(/^https?:\/\//, "")}</span>
                <span>Buka di tab baru</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
