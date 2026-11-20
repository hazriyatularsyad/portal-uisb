import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#130720] text-white border-t border-white/10 mt-auto">
      {/* Subtle atmospheric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(128,58,179,0.28),_transparent_55%),radial-gradient(ellipse_at_top_right,_rgba(190,144,11,0.14),_transparent_50%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center rounded-xl px-3.5 py-2 shadow-xs transition-transform hover:scale-[1.02]"
            >
              <img
                src="/logo-uisb.png"
                alt="Universitas Islam Sumatera Barat (UISB)"
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#cbb8df] leading-relaxed max-w-sm">
              Pusat informasi resmi pengumuman akademik, kegiatan kampus,
              beasiswa, serta kalender akademik untuk mahasiswa UISB.
            </p>
          </div>

          {/* Portal Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Navigasi Portal
            </h3>
            <ul className="space-y-2.5 text-sm text-[#e6daf2]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/informasi"
                  className="hover:text-white transition-colors"
                >
                  Informasi &amp; Pengumuman
                </Link>
              </li>
              <li>
                <Link
                  href="/kalender"
                  className="hover:text-white transition-colors"
                >
                  Kalender Akademik
                </Link>
              </li>
              <li>
                <Link
                  href="/aktivitas"
                  className="hover:text-white transition-colors"
                >
                  Dokumentasi Aktivitas
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Links */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Layanan Resmi Kampus
            </h3>
            <ul className="space-y-2.5 text-sm text-[#e6daf2]">
              <li>
                <a
                  href="https://survey.uisb.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  Survey Mahasiswa (survey.uisb.ac.id)
                  <ExternalLink className="w-3.5 h-3.5 text-secondary" />
                </a>
              </li>
              <li>
                <a
                  href="https://uisb.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  Website Utama UISB (uisb.ac.id)
                  <ExternalLink className="w-3.5 h-3.5 text-secondary" />
                </a>
              </li>
            </ul>
            <p className="text-xs text-[#b59fd0] pt-2">
              Dikelola oleh Tim Media &amp; Humas Universitas Islam Sumatera
              Barat.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#b59fd0]">
          <p>
            © {new Date().getFullYear()} Universitas Islam Sumatera Barat
            (UISB). Hak cipta dilindungi.
          </p>
          <p>Seluruh waktu ditampilkan dalam WIB (Asia/Jakarta).</p>
        </div>
      </div>
    </footer>
  )
}
