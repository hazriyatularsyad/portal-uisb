import { BeritaDosen, Dosen, Prodi } from "@/types/dosen";

export const PRODI_LIST: Prodi[] = [
  {
    id: "prodi-1",
    nama: "Teknik Informatika",
    slug: "teknik-informatika",
    fakultas: "Fakultas Teknik",
    urutan: 1,
  },
  {
    id: "prodi-2",
    nama: "Manajemen",
    slug: "manajemen",
    fakultas: "Fakultas Ekonomi & Bisnis",
    urutan: 2,
  },
  {
    id: "prodi-3",
    nama: "Hukum Keluarga Islam",
    slug: "hukum-keluarga-islam",
    fakultas: "Fakultas Syariah",
    urutan: 3,
  },
  {
    id: "prodi-4",
    nama: "Pendidikan Agama Islam",
    slug: "pendidikan-agama-islam",
    fakultas: "Fakultas Tarbiyah",
    urutan: 4,
  },
];

export const DOSEN_LIST: Dosen[] = [
  {
    id: "dsn-1",
    nama_lengkap: "Ahmad Fauzi",
    gelar_depan: "Dr.",
    gelar_belakang: "M.Kom.",
    slug: "ahmad-fauzi",
    nidn: "1012048501",
    is_nidn_public: true,
    jabatan_akademik: "Lektor Kepala",
    jabatan_struktural: "Ketua Program Studi Teknik Informatika",
    prodi: PRODI_LIST[0],
    bio: "Menekuni bidang kecerdasan buatan terapan, pemrosesan bahasa alami, dan sistem informasi akademik berbasis cloud di Universitas Islam Sumatera Barat.",
    foto_url:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    status: "terbit",
    keahlian: ["Kecerdasan Buatan", "Data Mining", "Sistem Informasi"],
    pendidikan: [
      {
        id: "edu-1",
        jenjang: "S3",
        institusi: "Universitas Putra Malaysia",
        jurusan: "Computer Science",
        tahun_lulus: 2021,
      },
      {
        id: "edu-2",
        jenjang: "S2",
        institusi: "Institut Teknologi Bandung",
        jurusan: "Informatika",
        tahun_lulus: 2014,
      },
      {
        id: "edu-3",
        jenjang: "S1",
        institusi: "Universitas Andalas",
        jurusan: "Teknik Informatika",
        tahun_lulus: 2011,
      },
    ],
    mata_kuliah: [
      { id: "mk-1", kode: "TIF301", nama: "Kecerdasan Buatan", semester: "Ganjil" },
      { id: "mk-2", kode: "TIF402", nama: "Pembelajaran Mesin", semester: "Genap" },
      { id: "mk-3", kode: "TIF204", nama: "Basis Data Lanjut", semester: "Ganjil" },
    ],
    penelitian: [
      {
        id: "pen-1",
        judul: "Model Deteksi Dini Risiko Akademik Mahasiswa Menggunakan Gradient Boosting",
        tahun: 2025,
        sumber_dana: "Hibah Kemdiktisaintek",
        peran: "Ketua Peneliti",
      },
    ],
    publikasi: [
      {
        id: "pub-1",
        judul: "Indonesian Academic Text Classification with Fine-Tuned Transformer",
        jenis: "jurnal",
        nama_penerbit: "Jurnal Nasional Teknik Elektro dan Teknologi Informasi (JNTETI)",
        tahun: 2025,
        doi_atau_url: "https://scholar.google.com",
      },
      {
        id: "pub-2",
        judul: "Pengantar Kecerdasan Buatan untuk Mahasiswa Informatika",
        jenis: "buku",
        nama_penerbit: "UISB Press",
        tahun: 2024,
      },
    ],
    pengabdian: [
      {
        id: "abdi-1",
        judul: "Pelatihan Literasi Digital dan Keamanan Data bagi Guru Madrasah di Padang",
        tahun: 2025,
        lokasi: "Kota Padang, Sumatera Barat",
        deskripsi: "Pendampingan pemanfaatan aplikasi pembelajaran daring dan keamanan akun sekolah.",
      },
    ],
    prestasi: [
      {
        id: "pres-1",
        judul: "Dosen Berprestasi Bidang Penelitian & Publikasi",
        pemberi: "Rektor UISB",
        tahun: 2025,
        tingkat: "kampus",
      },
    ],
    tautan_akademik: [
      { platform: "sinta", url: "https://sinta.kemdikbud.go.id" },
      { platform: "scholar", url: "https://scholar.google.com" },
      { platform: "orcid", url: "https://orcid.org" },
    ],
  },
  {
    id: "dsn-2",
    nama_lengkap: "Siti Rahmah",
    gelar_depan: "Dr.",
    gelar_belakang: "S.E., M.M.",
    slug: "siti-rahmah",
    nidn: "1024078802",
    is_nidn_public: true,
    jabatan_akademik: "Lektor",
    jabatan_struktural: "Dekan Fakultas Ekonomi & Bisnis",
    prodi: PRODI_LIST[1],
    bio: "Peneliti dan praktisi manajemen pemasaran syariah serta pemberdayaan UMKM berbasis ekonomi kreatif di Sumatera Barat.",
    foto_url:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    status: "terbit",
    keahlian: ["Manajemen Pemasaran", "Ekonomi Syariah", "Kewirausahaan UMKM"],
    pendidikan: [
      {
        id: "edu-4",
        jenjang: "S3",
        institusi: "Universitas Andalas",
        jurusan: "Ilmu Manajemen",
        tahun_lulus: 2022,
      },
      {
        id: "edu-5",
        jenjang: "S2",
        institusi: "Universitas Gadjah Mada",
        jurusan: "Magister Manajemen",
        tahun_lulus: 2015,
      },
    ],
    mata_kuliah: [
      { id: "mk-4", kode: "MNJ201", nama: "Manajemen Pemasaran", semester: "Ganjil" },
      { id: "mk-5", kode: "MNJ305", nama: "Kewirausahaan Digital", semester: "Genap" },
    ],
    penelitian: [
      {
        id: "pen-2",
        judul: "Strategi Pemasaran Digital Produk Kuliner Halal UMKM Sumatera Barat",
        tahun: 2025,
        sumber_dana: "LPPM UISB",
        peran: "Ketua Peneliti",
      },
    ],
    publikasi: [
      {
        id: "pub-3",
        judul: "Halal Branding and Consumer Trust in Regional SMEs",
        jenis: "jurnal",
        nama_penerbit: "Jurnal Ekonomi dan Bisnis Islam",
        tahun: 2025,
      },
    ],
    pengabdian: [
      {
        id: "abdi-2",
        judul: "Pendampingan Sertifikasi Halal dan Pembukuan Sederhana UMKM Nagari",
        tahun: 2025,
        lokasi: "Kabupaten Agam",
        deskripsi: "Membantu 35 pelaku usaha mikro menyusun laporan keuangan dan pengajuan sertifikasi.",
      },
    ],
    prestasi: [],
    tautan_akademik: [
      { platform: "sinta", url: "https://sinta.kemdikbud.go.id" },
      { platform: "scholar", url: "https://scholar.google.com" },
    ],
  },
  {
    id: "dsn-3",
    nama_lengkap: "Hendra Wijaya",
    gelar_belakang: "S.Kom., M.Cs.",
    slug: "hendra-wijaya",
    nidn: "1005119101",
    is_nidn_public: false,
    jabatan_akademik: "Asisten Ahli",
    prodi: PRODI_LIST[0],
    bio: "Fokus pada rekayasa perangkat lunak, arsitektur web modern, serta keamanan aplikasi dan jaringan komputer.",
    foto_url:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    status: "terbit",
    keahlian: ["Rekayasa Perangkat Lunak", "Keamanan Web", "Cloud Computing"],
    pendidikan: [
      {
        id: "edu-6",
        jenjang: "S2",
        institusi: "Universitas Gadjah Mada",
        jurusan: "Ilmu Komputer",
        tahun_lulus: 2019,
      },
    ],
    mata_kuliah: [
      { id: "mk-6", kode: "TIF202", nama: "Pemrograman Web Modern", semester: "Ganjil" },
      { id: "mk-7", kode: "TIF308", nama: "Keamanan Sistem Informasi", semester: "Genap" },
    ],
    penelitian: [],
    publikasi: [
      {
        id: "pub-4",
        judul: "Evaluasi Keamanan Aplikasi Web Kampus Menggunakan OWASP Top 10",
        jenis: "prosiding",
        nama_penerbit: "Seminar Nasional Teknologi Informasi",
        tahun: 2024,
      },
    ],
    pengabdian: [],
    prestasi: [],
    tautan_akademik: [
      { platform: "scholar", url: "https://scholar.google.com" },
      { platform: "orcid", url: "https://orcid.org" },
    ],
  },
  {
    id: "dsn-4",
    nama_lengkap: "M. Yusuf Al-Farizi",
    gelar_depan: "Dr.",
    gelar_belakang: "M.H.I.",
    slug: "m-yusuf-al-farizi",
    nidn: "1018038201",
    is_nidn_public: true,
    jabatan_akademik: "Lektor Kepala",
    jabatan_struktural: "Ketua Program Studi Hukum Keluarga Islam",
    prodi: PRODI_LIST[2],
    bio: "Mengkaji hukum keluarga Islam kontemporer, mediasi sengketa perdata Islam, serta integrasi hukum adat Minangkabau dan syariah.",
    foto_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    status: "terbit",
    keahlian: ["Hukum Keluarga Islam", "Fikih Kontemporer", "Mediasi Syariah"],
    pendidikan: [
      {
        id: "edu-7",
        jenjang: "S3",
        institusi: "UIN Imam Bonjol Padang",
        jurusan: "Hukum Islam",
        tahun_lulus: 2020,
      },
    ],
    mata_kuliah: [
      { id: "mk-8", kode: "HKI201", nama: "Fikih Munakahat", semester: "Ganjil" },
      { id: "mk-9", kode: "HKI304", nama: "Hukum Waris Islam", semester: "Genap" },
    ],
    penelitian: [
      {
        id: "pen-3",
        judul: "Implementasi Mediasi Perkara Perceraian di Pengadilan Agama Sumatera Barat",
        tahun: 2025,
        sumber_dana: "Hibah Penelitian Terapan",
        peran: "Ketua Peneliti",
      },
    ],
    publikasi: [],
    pengabdian: [],
    prestasi: [],
    tautan_akademik: [
      { platform: "sinta", url: "https://sinta.kemdikbud.go.id" },
    ],
  },
  {
    id: "dsn-5",
    nama_lengkap: "Nurul Hidayah",
    gelar_belakang: "M.Pd.I.",
    slug: "nurul-hidayah",
    nidn: "1011099003",
    is_nidn_public: true,
    jabatan_akademik: "Lektor",
    prodi: PRODI_LIST[3],
    bio: "Berfokus pada inovasi kurikulum pendidikan agama Islam, media pembelajaran digital, dan psikologi pendidikan remaja.",
    foto_url:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    status: "terbit",
    keahlian: ["Kurikulum PAI", "Media Pembelajaran", "Psikologi Pendidikan"],
    pendidikan: [
      {
        id: "edu-8",
        jenjang: "S2",
        institusi: "UIN Sunan Kalijaga Yogyakarta",
        jurusan: "Pendidikan Islam",
        tahun_lulus: 2016,
      },
    ],
    mata_kuliah: [
      { id: "mk-10", kode: "PAI203", nama: "Pengembangan Kurikulum PAI", semester: "Ganjil" },
    ],
    penelitian: [],
    publikasi: [],
    pengabdian: [],
    prestasi: [],
    tautan_akademik: [
      { platform: "scholar", url: "https://scholar.google.com" },
    ],
  },
];

export const BERITA_DOSEN_LIST: BeritaDosen[] = [
  {
    id: "brd-1",
    judul: "Dr. Ahmad Fauzi Raih Hibah Penelitian Nasional Kemdiktisaintek 2026",
    slug: "dr-ahmad-fauzi-raih-hibah-penelitian-nasional-2026",
    ringkasan:
      "Proposal riset deteksi dini risiko akademik mahasiswa berbasis kecerdasan buatan lolos pendanaan nasional tahun anggaran 2026.",
    isi: [
      "Dosen Program Studi Teknik Informatika UISB, Dr. Ahmad Fauzi, M.Kom., berhasil meraih hibah penelitian terapan tingkat nasional dari Kemdiktisaintek tahun 2026.",
      "Penelitian ini mengembangkan model prediktif berbasis machine learning untuk membantu dosen wali memantau perkembangan akademik mahasiswa secara lebih dini dan terukur.",
    ],
    gambar_url:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80",
    tanggal_terbit: "2026-11-18T09:00:00+07:00",
    status: "terbit",
    is_pinned: true,
    dosen_ids: ["dsn-1"],
  },
  {
    id: "brd-2",
    judul: "Tim Pengabdian FEB UISB Dampingi 35 UMKM Nagari Raih Sertifikasi Halal",
    slug: "tim-pengabdian-feb-uisb-dampingi-umkm-halal",
    ringkasan:
      "Dipimpin Dr. Siti Rahmah, program pendampingan UMKM di Kabupaten Agam sukses memfasilitasi sertifikasi halal dan pembukuan digital.",
    isi: [
      "Fakultas Ekonomi dan Bisnis UISB melalui program pengabdian masyarakat yang dipimpin Dr. Siti Rahmah, S.E., M.M. telah mendampingi 35 pelaku usaha mikro di Kabupaten Agam.",
      "Kegiatan mencakup pelatihan pemasaran digital, penyusunan laporan keuangan sederhana, hingga pengurusan sertifikasi halal gratis.",
    ],
    gambar_url:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80",
    tanggal_terbit: "2026-11-14T10:30:00+07:00",
    status: "terbit",
    is_pinned: false,
    dosen_ids: ["dsn-2"],
  },
  {
    id: "brd-3",
    judul: "Dr. M. Yusuf Al-Farizi Menjadi Narasumber Simposium Hukum Islam Regional",
    slug: "dr-m-yusuf-al-farizi-narasumber-simposium-hukum-islam",
    ringkasan:
      "Membahas harmonisasi hukum adat Minangkabau dan hukum keluarga Islam dalam penyelesaian sengketa perdata modern.",
    isi: [
      "Ketua Prodi Hukum Keluarga Islam UISB, Dr. M. Yusuf Al-Farizi, M.H.I., diundang sebagai pembicara utama pada Simposium Hukum Islam Regional di Padang.",
    ],
    gambar_url:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    tanggal_terbit: "2026-11-09T14:00:00+07:00",
    status: "terbit",
    is_pinned: false,
    dosen_ids: ["dsn-4"],
  },
];
