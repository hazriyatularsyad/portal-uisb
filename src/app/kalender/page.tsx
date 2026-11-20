import { Metadata } from "next";
import { Navbar } from "@/components/portal/Navbar";
import { Footer } from "@/components/portal/Footer";
import { CalendarView } from "@/components/portal/CalendarView";
import { MotionReveal } from "@/components/portal/MotionReveal";
import { CALENDAR_EVENTS, POSTS } from "@/data/mock-portal";

export const metadata: Metadata = {
  title: "Kalender Akademik & Kegiatan - Portal Mahasiswa UISB",
  description:
    "Kalender akademik bulanan, jadwal perkuliahan, ujian, libur, serta agenda kegiatan mahasiswa Universitas Islam Sumatera Barat.",
};

export default function KalenderPage() {
  const kegiatanPosts = POSTS.filter(
    (p) => p.status === "terbit" && p.tipe === "kegiatan"
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#803AB3] text-white relative overflow-x-hidden">
      {/* Atmospheric Radial Glow for Glass Refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(190,144,11,0.28),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(23,9,38,0.5),_transparent_60%)]"
      />

      <Navbar variant="hero" />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 w-full space-y-8">
        <MotionReveal>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] text-white">
              Kalender &amp; Agenda Mahasiswa
            </h1>
            <p className="text-sm sm:text-base text-[#eedff9] max-w-2xl">
              Lihat jadwal perkuliahan, tenggat administrasi, ujian, serta kegiatan kampus dalam satu tampilan bulanan.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <CalendarView
            calendarEvents={CALENDAR_EVENTS}
            kegiatanPosts={kegiatanPosts}
            initialYear={2026}
            initialMonth={10}
          />
        </MotionReveal>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
