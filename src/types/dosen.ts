export interface Prodi {
  id: string;
  nama: string;
  slug: string;
  fakultas: string;
  urutan: number;
}

export interface Pendidikan {
  id: string;
  jenjang: "S1" | "S2" | "S3";
  institusi: string;
  jurusan: string;
  tahun_lulus: number;
}

export interface MataKuliah {
  id: string;
  kode?: string;
  nama: string;
  semester?: string;
}

export interface Penelitian {
  id: string;
  judul: string;
  tahun: number;
  sumber_dana: string;
  peran: string;
  tautan?: string;
}

export interface Publikasi {
  id: string;
  judul: string;
  jenis: "jurnal" | "prosiding" | "buku" | "lainnya";
  nama_penerbit: string;
  tahun: number;
  doi_atau_url?: string;
}

export interface Pengabdian {
  id: string;
  judul: string;
  tahun: number;
  lokasi?: string;
  deskripsi: string;
}

export interface Prestasi {
  id: string;
  judul: string;
  pemberi: string;
  tahun: number;
  tingkat: "kampus" | "nasional" | "internasional";
  deskripsi?: string;
}

export type PlatformAkademik =
  | "sinta"
  | "scholar"
  | "scopus"
  | "orcid"
  | "garuda"
  | "researchgate";

export interface TautanAkademik {
  platform: PlatformAkademik;
  url: string;
}

export interface Dosen {
  id: string;
  nama_lengkap: string;
  gelar_depan?: string;
  gelar_belakang?: string;
  slug: string;
  nidn?: string;
  is_nidn_public: boolean;
  jabatan_akademik: string;
  jabatan_struktural?: string;
  prodi: Prodi;
  bio: string;
  foto_url: string | null;
  status: "draft" | "terbit" | "nonaktif";
  keahlian: string[];
  pendidikan: Pendidikan[];
  mata_kuliah: MataKuliah[];
  penelitian: Penelitian[];
  publikasi: Publikasi[];
  pengabdian: Pengabdian[];
  prestasi: Prestasi[];
  tautan_akademik: TautanAkademik[];
}

export interface BeritaDosen {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;
  isi: string[];
  gambar_url: string | null;
  sumber_url?: string | null;
  tanggal_terbit: string;
  status: "draft" | "terbit" | "diarsipkan";
  is_pinned: boolean;
  dosen_ids: string[];
}

export function formatNamaDosen(dosen: Pick<Dosen, "gelar_depan" | "nama_lengkap" | "gelar_belakang">): string {
  const depan = dosen.gelar_depan ? `${dosen.gelar_depan} ` : "";
  const belakang = dosen.gelar_belakang ? `, ${dosen.gelar_belakang}` : "";
  return `${depan}${dosen.nama_lengkap}${belakang}`;
}
