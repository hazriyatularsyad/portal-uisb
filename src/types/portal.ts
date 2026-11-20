export type PostType = "pengumuman" | "kegiatan" | "beasiswa_lomba";

export type PostStatus = "draft" | "terbit" | "arsip";

export interface Category {
  id: string;
  nama: string;
  slug: string;
  urutan: number;
  aktif: boolean;
}

export interface PostLink {
  id: string;
  post_id: string;
  label: string;
  url: string;
  urutan: number;
}

export interface Post {
  id: string;
  tipe: PostType;
  judul: string;
  slug: string;
  ringkasan: string;
  isi: string[];
  category: Category;
  cover_url: string | null;
  audiens: string[];
  status: PostStatus;
  is_pinned: boolean;
  pinned_until: string | null;
  published_at: string;
  updated_at?: string;
  event_mulai: string | null;
  event_selesai: string | null;
  lokasi: string | null;
  deadline_at: string | null;
  links: PostLink[];
}

export type CalendarEventType =
  | "perkuliahan"
  | "ujian"
  | "libur"
  | "administrasi"
  | "lainnya";

export interface CalendarEvent {
  id: string;
  judul: string;
  deskripsi: string | null;
  jenis: CalendarEventType;
  mulai: string; // YYYY-MM-DD
  selesai: string; // YYYY-MM-DD
  periode: string;
  post_slug?: string | null;
}

export interface ServiceLink {
  id: string;
  judul: string;
  deskripsi: string;
  url: string;
  ikon: "clipboard" | "globe" | "book" | "external";
  urutan: number;
  aktif: boolean;
}

export type AktivitasCategory =
  | "akademik"
  | "kemahasiswaan"
  | "pengabdian"
  | "prestasi";

export interface AktivitasItem {
  id: string;
  judul: string;
  kategori: AktivitasCategory;
  tanggal: string; // YYYY-MM-DD
  lokasi: string;
  deskripsi: string;
  foto_url: string;
}
