import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Navbar } from "@/components/portal/Navbar";
import { Footer } from "@/components/portal/Footer";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar variant="solid" />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <FileQuestion className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Informasi atau halaman yang Anda cari mungkin telah dipindahkan, diarsipkan, atau tautannya tidak valid.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className={cn(
                buttonVariants(),
                "rounded-full inline-flex items-center gap-1.5"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
            <Link
              href="/informasi"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full"
              )}
            >
              Lihat Daftar Informasi
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
