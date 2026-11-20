"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmin } from "@/lib/admin-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdmin();
  const [email, setEmail] = useState("admin@uisb.ac.id");
  const [password, setPassword] = useState("uisb2026");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      router.push("/admin");
    } else {
      setError("Email atau kata sandi Super Admin tidak cocok.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#803AB3] px-4 py-10 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(190,144,11,0.32),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(23,9,38,0.55),_transparent_60%)]"
      />

      <div className="relative z-10 w-full max-w-md space-y-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#eedff9] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Portal Mahasiswa
        </Link>

        <Card className="bg-white/12 backdrop-blur-xl border border-[#BE900B]/45 text-white shadow-[0_20px_50px_-12px_rgba(23,9,38,0.55)] rounded-2xl">
          <CardHeader className="space-y-3 pb-4">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-white/95 px-3 py-1">
                <img
                  src="/logo-uisb.png"
                  alt="UISB"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-[#BE900B] text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                Super Admin
              </span>
            </div>
            <CardTitle className="text-2xl font-bold text-white font-sans">
              Masuk Panel Admin
            </CardTitle>
            <p className="text-sm text-[#eedff9]">
              Kelola pengumuman, kalender akademik, dokumentasi aktivitas, kategori, dan tautan layanan UISB.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Email Admin
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-white/25 bg-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#BE900B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white block">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-white/25 bg-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#BE900B]"
                />
              </div>

              {error && (
                <p className="text-xs font-medium text-rose-100 bg-rose-500/30 border border-rose-300/40 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-10 rounded-xl bg-[#BE900B] hover:bg-[#a67d09] text-white font-semibold gap-2 shadow-sm"
              >
                <Lock className="w-4 h-4" />
                Masuk sebagai Super Admin
              </Button>

              <p className="text-[11px] text-[#eedff9] text-center pt-1">
                Akun demo: <code className="font-mono text-white">admin@uisb.ac.id</code> /{" "}
                <code className="font-mono text-white">uisb2026</code>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
