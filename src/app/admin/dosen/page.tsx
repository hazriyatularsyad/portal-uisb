"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2, UserCheck } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdmin } from "@/lib/admin-store";
import { BeritaDosen, Dosen, formatNamaDosen } from "@/types/dosen";
import { formatTanggalSingkat } from "@/lib/date";
import { cn } from "@/lib/utils";

export default function AdminDosenPage() {
  const {
    dosenList,
    beritaDosen,
    prodiList,
    upsertDosen,
    deleteDosen,
    upsertBeritaDosen,
    deleteBeritaDosen,
  } = useAdmin();

  // Dosen Sheet State
  const [openDosen, setOpenDosen] = useState(false);
  const [editingDosen, setEditingDosen] = useState<Dosen | null>(null);
  const [namaLengkap, setNamaLengkap] = useState("");
  const [gelarDepan, setGelarDepan] = useState("");
  const [gelarBelakang, setGelarBelakang] = useState("");
  const [prodiId, setProdiId] = useState(prodiList[0]?.id ?? "prodi-1");
  const [jabatanAkademik, setJabatanAkademik] = useState("Lektor");
  const [jabatanStruktural, setJabatanStruktural] = useState("");
  const [nidn, setNidn] = useState("");
  const [isNidnPublic, setIsNidnPublic] = useState(true);
  const [bio, setBio] = useState("");
  const [keahlianText, setKeahlianText] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [statusDosen, setStatusDosen] = useState<Dosen["status"]>("terbit");

  // Berita Sheet State
  const [openBerita, setOpenBerita] = useState(false);
  const [editingBerita, setEditingBerita] = useState<BeritaDosen | null>(null);
  const [judulBerita, setJudulBerita] = useState("");
  const [ringkasanBerita, setRingkasanBerita] = useState("");
  const [isiBerita, setIsiBerita] = useState("");
  const [gambarBerita, setGambarBerita] = useState("");
  const [sumberUrl, setSumberUrl] = useState("");
  const [statusBerita, setStatusBerita] =
    useState<BeritaDosen["status"]>("terbit");
  const [selectedDosenIds, setSelectedDosenIds] = useState<string[]>([]);

  const openCreateDosen = () => {
    setEditingDosen(null);
    setNamaLengkap("");
    setGelarDepan("");
    setGelarBelakang("");
    setProdiId(prodiList[0]?.id ?? "prodi-1");
    setJabatanAkademik("Lektor");
    setJabatanStruktural("");
    setNidn("");
    setIsNidnPublic(true);
    setBio("");
    setKeahlianText("");
    setFotoUrl("");
    setStatusDosen("terbit");
    setOpenDosen(true);
  };

  const openEditDosen = (d: Dosen) => {
    setEditingDosen(d);
    setNamaLengkap(d.nama_lengkap);
    setGelarDepan(d.gelar_depan ?? "");
    setGelarBelakang(d.gelar_belakang ?? "");
    setProdiId(d.prodi.id);
    setJabatanAkademik(d.jabatan_akademik);
    setJabatanStruktural(d.jabatan_struktural ?? "");
    setNidn(d.nidn ?? "");
    setIsNidnPublic(d.is_nidn_public);
    setBio(d.bio);
    setKeahlianText(d.keahlian.join(", "));
    setFotoUrl(d.foto_url ?? "");
    setStatusDosen(d.status);
    setOpenDosen(true);
  };

  const handleSaveDosen = (e: React.FormEvent) => {
    e.preventDefault();
    const prodi = prodiList.find((p) => p.id === prodiId) ?? prodiList[0];
    const slug =
      editingDosen?.slug ??
      namaLengkap
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    upsertDosen({
      id: editingDosen?.id ?? `dsn-${Date.now()}`,
      nama_lengkap: namaLengkap,
      gelar_depan: gelarDepan.trim() || undefined,
      gelar_belakang: gelarBelakang.trim() || undefined,
      slug,
      nidn: nidn.trim() || undefined,
      is_nidn_public: isNidnPublic,
      jabatan_akademik: jabatanAkademik,
      jabatan_struktural: jabatanStruktural.trim() || undefined,
      prodi,
      bio,
      foto_url: fotoUrl.trim() || null,
      status: statusDosen,
      keahlian: keahlianText
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      pendidikan: editingDosen?.pendidikan ?? [],
      mata_kuliah: editingDosen?.mata_kuliah ?? [],
      penelitian: editingDosen?.penelitian ?? [],
      publikasi: editingDosen?.publikasi ?? [],
      pengabdian: editingDosen?.pengabdian ?? [],
      prestasi: editingDosen?.prestasi ?? [],
      tautan_akademik: editingDosen?.tautan_akademik ?? [],
    });
    setOpenDosen(false);
  };

  const openCreateBerita = () => {
    setEditingBerita(null);
    setJudulBerita("");
    setRingkasanBerita("");
    setIsiBerita("");
    setGambarBerita("");
    setSumberUrl("");
    setStatusBerita("terbit");
    setSelectedDosenIds(dosenList[0] ? [dosenList[0].id] : []);
    setOpenBerita(true);
  };

  const openEditBerita = (b: BeritaDosen) => {
    setEditingBerita(b);
    setJudulBerita(b.judul);
    setRingkasanBerita(b.ringkasan);
    setIsiBerita(b.isi.join("\n\n"));
    setGambarBerita(b.gambar_url ?? "");
    setSumberUrl(b.sumber_url ?? "");
    setStatusBerita(b.status);
    setSelectedDosenIds(b.dosen_ids);
    setOpenBerita(true);
  };

  const handleSaveBerita = (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      editingBerita?.slug ??
      judulBerita
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    upsertBeritaDosen({
      id: editingBerita?.id ?? `brd-${Date.now()}`,
      judul: judulBerita,
      slug,
      ringkasan: ringkasanBerita,
      isi: isiBerita
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
      gambar_url: gambarBerita.trim() || null,
      sumber_url: sumberUrl.trim() || null,
      tanggal_terbit: editingBerita?.tanggal_terbit ?? new Date().toISOString(),
      status: statusBerita,
      is_pinned: editingBerita?.is_pinned ?? false,
      dosen_ids: selectedDosenIds,
    });
    setOpenBerita(false);
  };

  const toggleDosenInBerita = (id: string) => {
    setSelectedDosenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <AdminShell
      title="Manajemen Dosen"
      description="Kelola profil akademik dosen dan berita terbaru dosen UISB."
    >
      <Tabs defaultValue="dosen" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <TabsList className="bg-white border border-purple-100/80 p-1 rounded-full w-fit">
            <TabsTrigger
              value="dosen"
              className="rounded-full px-4 aria-selected:bg-[#2a1040] aria-selected:text-white"
            >
              Daftar Dosen ({dosenList.length})
            </TabsTrigger>
            <TabsTrigger
              value="berita"
              className="rounded-full px-4 aria-selected:bg-[#2a1040] aria-selected:text-white"
            >
              Berita Dosen ({beritaDosen.length})
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button
              onClick={openCreateDosen}
              size="sm"
              className="rounded-full px-4 bg-[#130720] text-white hover:bg-[#803AB3] gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Tambah Dosen
            </Button>
            <Button
              onClick={openCreateBerita}
              size="sm"
              variant="outline"
              className="rounded-full px-4 bg-white border-purple-200 text-[#803AB3] hover:bg-purple-50 gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Tambah Berita
            </Button>
          </div>
        </div>

        {/* Tab Daftar Dosen */}
        <TabsContent value="dosen" className="mt-0">
          <Card className="rounded-3xl bg-white border border-purple-100/80 shadow-[0_8px_24px_-8px_rgba(42,16,64,0.08)] overflow-hidden text-gray-900">
            <CardContent className="p-0 divide-y divide-gray-100">
              {dosenList.map((d) => (
                <div
                  key={d.id}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-purple-50 text-[#803AB3] flex items-center justify-center shrink-0">
                      {d.foto_url ? (
                        <img
                          src={d.foto_url}
                          alt={formatNamaDosen(d)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserCheck className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge className="rounded-full text-[10px] bg-purple-50 text-[#803AB3] border-purple-200">
                          {d.prodi.nama}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full text-[10px] capitalize",
                            d.status === "terbit"
                              ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                              : "border-gray-200 text-gray-600"
                          )}
                        >
                          {d.status}
                        </Badge>
                      </div>
                      <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                        {formatNamaDosen(d)}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {d.jabatan_struktural ?? d.jabatan_akademik}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDosen(d)}
                      className="rounded-full gap-1 text-xs border-gray-200 text-gray-700 hover:text-[#803AB3]"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Ubah
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteDosen(d.id)}
                      aria-label="Hapus dosen"
                      className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Berita Dosen */}
        <TabsContent value="berita" className="mt-0">
          <Card className="rounded-3xl bg-white border border-purple-100/80 shadow-[0_8px_24px_-8px_rgba(42,16,64,0.08)] overflow-hidden text-gray-900">
            <CardContent className="p-0 divide-y divide-gray-100">
              {beritaDosen.map((b) => (
                <div
                  key={b.id}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full text-[10px] capitalize",
                          b.status === "terbit"
                            ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                            : "border-gray-200 text-gray-600"
                        )}
                      >
                        {b.status}
                      </Badge>
                      <span className="text-xs text-gray-400 tabular-nums">
                        {formatTanggalSingkat(b.tanggal_terbit)}
                      </span>
                    </div>
                    <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                      {b.judul}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditBerita(b)}
                      className="rounded-full gap-1 text-xs border-gray-200 text-gray-700 hover:text-[#803AB3]"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Ubah
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteBeritaDosen(b.id)}
                      aria-label="Hapus berita"
                      className="rounded-full border-rose-200 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sheet Form Dosen */}
      <Sheet open={openDosen} onOpenChange={setOpenDosen}>
        <SheetContent className="w-full sm:max-w-lg p-6 overflow-y-auto bg-white">
          <SheetHeader className="pb-4 border-b border-gray-100">
            <SheetTitle>
              {editingDosen ? "Sunting Profil Dosen" : "Tambah Dosen Baru"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSaveDosen} className="mt-5 space-y-4">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Gelar Depan</label>
                <input
                  value={gelarDepan}
                  onChange={(e) => setGelarDepan(e.target.value)}
                  placeholder="Dr."
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
                />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-xs font-semibold">Nama Lengkap</label>
                <input
                  required
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Gelar Belakang</label>
                <input
                  value={gelarBelakang}
                  onChange={(e) => setGelarBelakang(e.target.value)}
                  placeholder="M.Kom."
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Program Studi</label>
                <select
                  value={prodiId}
                  onChange={(e) => setProdiId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm bg-white"
                >
                  {prodiList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  Jabatan Akademik
                </label>
                <input
                  required
                  value={jabatanAkademik}
                  onChange={(e) => setJabatanAkademik(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">
                  Jabatan Struktural
                </label>
                <input
                  value={jabatanStruktural}
                  onChange={(e) => setJabatanStruktural(e.target.value)}
                  placeholder="Opsional"
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">NIDN</label>
                <input
                  value={nidn}
                  onChange={(e) => setNidn(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Status</label>
                <select
                  value={statusDosen}
                  onChange={(e) =>
                    setStatusDosen(e.target.value as Dosen["status"])
                  }
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm bg-white"
                >
                  <option value="terbit">Terbit</option>
                  <option value="draft">Draft</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700">
              <input
                type="checkbox"
                checked={isNidnPublic}
                onChange={(e) => setIsNidnPublic(e.target.checked)}
              />
              Tampilkan NIDN di halaman profil publik
            </label>

            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Keahlian (pisahkan dengan koma)
              </label>
              <input
                value={keahlianText}
                onChange={(e) => setKeahlianText(e.target.value)}
                placeholder="Kecerdasan Buatan, Data Mining"
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">URL Foto</label>
              <input
                type="url"
                value={fotoUrl}
                onChange={(e) => setFotoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Bio Singkat</label>
              <textarea
                required
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDosen(false)}
                className="rounded-full"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-[#803AB3] text-white hover:bg-[#6b2e98]"
              >
                Simpan Profil
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Sheet Form Berita Dosen */}
      <Sheet open={openBerita} onOpenChange={setOpenBerita}>
        <SheetContent className="w-full sm:max-w-lg p-6 overflow-y-auto bg-white">
          <SheetHeader className="pb-4 border-b border-gray-100">
            <SheetTitle>
              {editingBerita ? "Sunting Berita Dosen" : "Tambah Berita Dosen"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSaveBerita} className="mt-5 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Judul Berita</label>
              <input
                required
                value={judulBerita}
                onChange={(e) => setJudulBerita(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Status</label>
              <select
                value={statusBerita}
                onChange={(e) =>
                  setStatusBerita(e.target.value as BeritaDosen["status"])
                }
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm bg-white"
              >
                <option value="terbit">Terbit</option>
                <option value="draft">Draft</option>
                <option value="diarsipkan">Diarsipkan</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold block">
                Dosen Terkait
              </label>
              <div className="flex flex-wrap gap-1.5">
                {dosenList.map((d) => {
                  const selected = selectedDosenIds.includes(d.id);
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => toggleDosenInBerita(d.id)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                        selected
                          ? "bg-[#803AB3] text-white border-[#803AB3]"
                          : "bg-gray-50 text-gray-600 border-gray-200"
                      )}
                    >
                      {formatNamaDosen(d)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Ringkasan</label>
              <textarea
                required
                rows={2}
                value={ringkasanBerita}
                onChange={(e) => setRingkasanBerita(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Isi Berita</label>
              <textarea
                required
                rows={4}
                value={isiBerita}
                onChange={(e) => setIsiBerita(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">
                URL Gambar (opsional)
              </label>
              <input
                type="url"
                value={gambarBerita}
                onChange={(e) => setGambarBerita(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">
                Tautan Sumber uisb.ac.id (opsional)
              </label>
              <input
                type="url"
                value={sumberUrl}
                onChange={(e) => setSumberUrl(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenBerita(false)}
                className="rounded-full"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-[#803AB3] text-white hover:bg-[#6b2e98]"
              >
                Simpan Berita
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </AdminShell>
  );
}
