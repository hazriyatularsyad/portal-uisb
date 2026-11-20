import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  Award,
  BookOpen,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Library,
  UserCheck,
} from "lucide-react";
import { Navbar } from "@/components/portal/Navbar";
import { Footer } from "@/components/portal/Footer";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BERITA_DOSEN_LIST, DOSEN_LIST } from "@/data/mock-dosen";
import { formatNamaDosen, PlatformAkademik } from "@/types/dosen";
import { formatTanggalSingkat } from "@/lib/date";
import { cn } from "@/lib/utils";

const PLATFORM_LABELS: Record<PlatformAkademik, string> = {
  sinta: "SINTA",
  scholar: "Google Scholar",
  scopus: "Scopus",
  orcid: "ORCID",
  garuda: "Garuda",
  researchgate: "ResearchGate",
};

interface DosenDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DOSEN_LIST.filter((d) => d.status === "terbit").map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({
  params,
}: DosenDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dosen = DOSEN_LIST.find((d) => d.slug === slug && d.status === "terbit");

  if (!dosen) {
    return { title: "Profil Dosen Tidak Ditemukan - UISB" };
  }

  const nama = formatNamaDosen(dosen);
  return {
    title: `${nama} - Profil Dosen UISB`,
    description: dosen.bio,
    openGraph: {
      title: `${nama} - ${dosen.prodi.nama} UISB`,
      description: dosen.bio,
      images: dosen.foto_url ? [dosen.foto_url] : undefined,
    },
  };
}

export default async function DosenDetailPage({
  params,
}: DosenDetailPageProps) {
  const { slug } = await params;
  const dosen = DOSEN_LIST.find((d) => d.slug === slug && d.status === "terbit");

  if (!dosen) {
    notFound();
  }

  const fullName = formatNamaDosen(dosen);
  const relatedNews = BERITA_DOSEN_LIST.filter(
    (b) => b.status === "terbit" && b.dosen_ids.includes(dosen.id)
  );

  // JSON-LD Person untuk SEO teknis
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    jobTitle: dosen.jabatan_akademik,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Islam Sumatera Barat",
    },
    knowsAbout: dosen.keahlian,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar variant="solid" />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
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

        {/* Header Profil */}
        <section className="rounded-3xl bg-[#803AB3] text-white p-6 sm:p-10 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(190,144,11,0.32),_transparent_55%)]"
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white/15 border border-white/25 shrink-0 flex items-center justify-center">
              {dosen.foto_url ? (
                <img
                  src={dosen.foto_url}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCheck className="w-10 h-10 text-white" />
              )}
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-[#BE900B] text-white border-0 rounded-full">
                  {dosen.prodi.nama}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 rounded-full"
                >
                  {dosen.jabatan_akademik}
                </Badge>
                {dosen.is_nidn_public && dosen.nidn && (
                  <span className="text-xs font-mono text-[#eedff9]">
                    NIDN: {dosen.nidn}
                  </span>
                )}
              </div>

              <h1 className="text-white">{fullName}</h1>

              {dosen.jabatan_struktural && (
                <p className="text-sm font-medium text-[#eedff9]">
                  {dosen.jabatan_struktural}
                </p>
              )}

              {dosen.tautan_akademik.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {dosen.tautan_akademik.map((t) => (
                    <a
                      key={t.platform}
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-gray-900 hover:bg-[#BE900B] hover:text-white transition-colors"
                    >
                      {PLATFORM_LABELS[t.platform]}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tentang & Keahlian */}
        {(dosen.bio || dosen.keahlian.length > 0) && (
          <section className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-5">
            {dosen.bio && (
              <div className="space-y-2">
                <h2 className="text-foreground">Tentang</h2>
                <p className="text-muted-foreground max-w-[70ch]">{dosen.bio}</p>
              </div>
            )}
            {dosen.keahlian.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-foreground">Bidang Keahlian</h3>
                <div className="flex flex-wrap gap-2">
                  {dosen.keahlian.map((k) => (
                    <Badge
                      key={k}
                      variant="secondary"
                      className="rounded-full bg-purple-50 text-primary border border-primary/15"
                    >
                      {k}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Riwayat Pendidikan */}
        {dosen.pendidikan.length > 0 && (
          <section className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-4">
            <h2 className="flex items-center gap-2 text-foreground">
              <GraduationCap className="w-5 h-5 text-primary" />
              Riwayat Pendidikan
            </h2>
            <div className="divide-y divide-border">
              {dosen.pendidikan.map((edu) => (
                <div
                  key={edu.id}
                  className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                >
                  <div>
                    <p className="font-semibold text-foreground">
                      {edu.jenjang} — {edu.jurusan}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {edu.institusi}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-primary tabular-nums">
                    Lulus {edu.tahun_lulus}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mata Kuliah */}
        {dosen.mata_kuliah.length > 0 && (
          <section className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-4">
            <h2 className="flex items-center gap-2 text-foreground">
              <BookOpen className="w-5 h-5 text-primary" />
              Mata Kuliah yang Diampu
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dosen.mata_kuliah.map((mk) => (
                <div
                  key={mk.id}
                  className="p-3.5 rounded-xl border border-border bg-muted/30 flex items-center justify-between gap-2"
                >
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {mk.nama}
                    </p>
                    {mk.kode && (
                      <p className="text-xs text-muted-foreground font-mono">
                        {mk.kode}
                      </p>
                    )}
                  </div>
                  {mk.semester && (
                    <Badge variant="outline" className="rounded-full text-[11px]">
                      {mk.semester}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Penelitian */}
        {dosen.penelitian.length > 0 && (
          <section className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-4">
            <h2 className="flex items-center gap-2 text-foreground">
              <FlaskConical className="w-5 h-5 text-primary" />
              Penelitian
            </h2>
            <div className="divide-y divide-border">
              {dosen.penelitian.map((pen) => (
                <div key={pen.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <p className="font-semibold text-foreground">{pen.judul}</p>
                  <p className="text-xs text-muted-foreground">
                    {pen.tahun} · {pen.peran} · {pen.sumber_dana}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Publikasi */}
        {dosen.publikasi.length > 0 && (
          <section className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-4">
            <h2 className="flex items-center gap-2 text-foreground">
              <Library className="w-5 h-5 text-primary" />
              Publikasi Ilmiah
            </h2>
            <div className="divide-y divide-border">
              {dosen.publikasi.map((pub) => (
                <div
                  key={pub.id}
                  className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{pub.judul}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {pub.jenis} · {pub.nama_penerbit} · {pub.tahun}
                    </p>
                  </div>
                  {pub.doi_atau_url && (
                    <a
                      href={pub.doi_atau_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-primary inline-flex items-center gap-1 shrink-0 hover:underline"
                    >
                      Buka tautan
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pengabdian */}
        {dosen.pengabdian.length > 0 && (
          <section className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-4">
            <h2 className="flex items-center gap-2 text-foreground">
              <HeartHandshake className="w-5 h-5 text-primary" />
              Pengabdian kepada Masyarakat
            </h2>
            <div className="divide-y divide-border">
              {dosen.pengabdian.map((abdi) => (
                <div key={abdi.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <p className="font-semibold text-foreground">{abdi.judul}</p>
                  <p className="text-xs text-muted-foreground">
                    {abdi.tahun}
                    {abdi.lokasi ? ` · ${abdi.lokasi}` : ""}
                  </p>
                  <p className="text-sm text-muted-foreground">{abdi.deskripsi}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prestasi */}
        {dosen.prestasi.length > 0 && (
          <section className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-4">
            <h2 className="flex items-center gap-2 text-foreground">
              <Award className="w-5 h-5 text-secondary" />
              Prestasi &amp; Penghargaan
            </h2>
            <div className="divide-y divide-border">
              {dosen.prestasi.map((pres) => (
                <div key={pres.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <p className="font-semibold text-foreground">{pres.judul}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {pres.pemberi} · {pres.tahun} · Tingkat {pres.tingkat}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Berita Terkait */}
        {relatedNews.length > 0 && (
          <section className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-4">
            <h2 className="text-foreground">Berita Terkait</h2>
            <div className="divide-y divide-border">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/dosen/berita/${news.slug}`}
                  className="py-3 first:pt-0 last:pb-0 block group"
                >
                  <p className="text-xs text-muted-foreground tabular-nums">
                    {formatTanggalSingkat(news.tanggal_terbit)}
                  </p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {news.judul}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
