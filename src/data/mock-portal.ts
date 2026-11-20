import {
  AktivitasItem,
  CalendarEvent,
  Category,
  Post,
  ServiceLink,
} from "@/types/portal";

export const CATEGORIES: Category[] = [
  { id: "cat-1", nama: "Akademik", slug: "akademik", urutan: 1, aktif: true },
  {
    id: "cat-2",
    nama: "Kemahasiswaan",
    slug: "kemahasiswaan",
    urutan: 2,
    aktif: true,
  },
  { id: "cat-3", nama: "Keuangan", slug: "keuangan", urutan: 3, aktif: true },
  { id: "cat-4", nama: "Umum", slug: "umum", urutan: 4, aktif: true },
];

export const SERVICE_LINKS: ServiceLink[] = [
  {
    id: "srv-1",
    judul: "Survey Mahasiswa",
    deskripsi:
      "Isi kuesioner evaluasi perkuliahan, kepuasan layanan kampus, dan fasilitas akademik secara berkala.",
    url: "https://survey.uisb.ac.id",
    ikon: "clipboard",
    urutan: 1,
    aktif: true,
  },
  {
    id: "srv-2",
    judul: "Website Utama Kampus",
    deskripsi:
      "Akses profil Universitas Islam Sumatera Barat, informasi fakultas, program studi, dan berita resmi kampus.",
    url: "https://uisb.ac.id",
    ikon: "globe",
    urutan: 2,
    aktif: true,
  },
];

export const POSTS: Post[] = [
  {
    id: "post-1",
    tipe: "pengumuman",
    judul: "Jadwal Ujian Akhir Semester (UAS) Ganjil 2026/2027",
    slug: "jadwal-uas-ganjil-2026-2027",
    ringkasan:
      "Pelaksanaan UAS Semester Ganjil dimulai tanggal 7 Desember 2026. Pastikan kartu ujian dan syarat kehadiran telah terpenuhi.",
    isi: [
      "Diberitahukan kepada seluruh mahasiswa aktif Universitas Islam Sumatera Barat (UISB) bahwa Ujian Akhir Semester (UAS) Ganjil Tahun Akademik 2026/2027 akan dilaksanakan mulai tanggal 7 Desember hingga 19 Desember 2026.",
      "Mahasiswa wajib memenuhi persyaratan kehadiran minimal 75% dari total tatap muka serta menyelesaikan administrasi keuangan sebelum mencetak Kartu Peserta Ujian.",
      "Kartu ujian dapat diunduh melalui portal akademik masing-masing mulai tanggal 1 Desember 2026. Harap memperhatikan jadwal ruang dan waktu ujian sesuai program studi.",
    ],
    category: CATEGORIES[0],
    cover_url:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80",
    audiens: ["mahasiswa"],
    status: "terbit",
    is_pinned: true,
    pinned_until: "2026-12-20T23:59:00+07:00",
    published_at: "2026-11-18T09:00:00+07:00",
    updated_at: "2026-11-18T14:30:00+07:00",
    event_mulai: null,
    event_selesai: null,
    lokasi: null,
    deadline_at: null,
    links: [
      {
        id: "lnk-1",
        post_id: "post-1",
        label: "Unduh Tata Tertib UAS 2026/2027 (Google Drive)",
        url: "https://drive.google.com",
        urutan: 1,
      },
    ],
  },
  {
    id: "post-2",
    tipe: "beasiswa_lomba",
    judul: "Pendaftaran Beasiswa Prestasi & KIP-Kuliah Tambahan 2026",
    slug: "beasiswa-prestasi-kip-2026",
    ringkasan:
      "Kesempatan beasiswa penuh dan bantuan UKT untuk mahasiswa berprestasi akademik maupun non-akademik semester 3 dan 5.",
    isi: [
      "Biro Kemahasiswaan UISB membuka pendaftaran program Beasiswa Prestasi dan Kuota Tambahan KIP-Kuliah bagi mahasiswa aktif program Sarjana (S1).",
      "Persyaratan utama meliputi IPK minimal 3.50 untuk jalur prestasi akademik, atau sertifikat kejuaraan tingkat provinsi/nasional untuk jalur non-akademik.",
      "Seluruh berkas dikumpulkan dalam satu tautan folder Google Drive dan didaftarkan melalui formulir resmi sebelum batas waktu penutupan.",
    ],
    category: CATEGORIES[1],
    cover_url: null,
    audiens: ["mahasiswa"],
    status: "terbit",
    is_pinned: true,
    pinned_until: "2026-12-05T23:59:00+07:00",
    published_at: "2026-11-15T10:00:00+07:00",
    event_mulai: null,
    event_selesai: null,
    lokasi: null,
    deadline_at: "2026-12-05T23:59:00+07:00",
    links: [
      {
        id: "lnk-2",
        post_id: "post-2",
        label: "Panduan & Syarat Berkas Beasiswa",
        url: "https://uisb.ac.id",
        urutan: 1,
      },
    ],
  },
  {
    id: "post-3",
    tipe: "pengumuman",
    judul: "Pengisian Survey Kepuasan Mahasiswa Semester Ganjil",
    slug: "survey-kepuasan-mahasiswa-ganjil-2026",
    ringkasan:
      "Seluruh mahasiswa dimohon mengisi kuesioner evaluasi layanan akademik melalui survey.uisb.ac.id sebelum masa UAS dimulai.",
    isi: [
      "Dalam rangka peningkatan mutu layanan pendidikan dan fasilitas kampus, Lembaga Penjaminan Mutu (LPM) UISB mewajibkan pengisian Survey Kepuasan Mahasiswa.",
      "Pengisian dilakukan secara daring melalui portal survey.uisb.ac.id paling lambat 4 Desember 2026. Masukan Anda bersifat rahasia dan sangat berarti bagi pengembangan kampus.",
    ],
    category: CATEGORIES[0],
    cover_url:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80",
    audiens: ["mahasiswa"],
    status: "terbit",
    is_pinned: true,
    pinned_until: "2026-12-04T23:59:00+07:00",
    published_at: "2026-11-12T08:00:00+07:00",
    event_mulai: null,
    event_selesai: null,
    lokasi: null,
    deadline_at: "2026-12-04T23:59:00+07:00",
    links: [
      {
        id: "lnk-3",
        post_id: "post-3",
        label: "Buka Portal Survey Mahasiswa",
        url: "https://survey.uisb.ac.id",
        urutan: 1,
      },
    ],
  },
  {
    id: "post-4",
    tipe: "kegiatan",
    judul: "Seminar Nasional Teknologi & Kewirausahaan Digital UISB 2026",
    slug: "seminar-nasional-teknologi-kewirausahaan-2026",
    ringkasan:
      "Hadirkan praktisi industri membahas peluang karir AI, software engineering, dan startup mahasiswa.",
    isi: [
      "Fakultas Teknik dan Fakultas Ekonomi UISB berkolaborasi menyelenggarakan Seminar Nasional bertema 'Membangun Talenta Digital dan Inovasi Bisnis di Era AI'.",
      "Peserta akan mendapatkan e-sertifikat resmi, materi presentasi, dan sesi tanya jawab interaktif bersama pembicara dari industri teknologi regional.",
      "Tempat duduk terbatas untuk 250 peserta pertama di Auditorium Utama Kampus UISB.",
    ],
    category: CATEGORIES[1],
    cover_url:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    audiens: ["mahasiswa"],
    status: "terbit",
    is_pinned: false,
    pinned_until: null,
    published_at: "2026-11-17T11:30:00+07:00",
    event_mulai: "2026-11-28T08:30:00+07:00",
    event_selesai: "2026-11-28T13:00:00+07:00",
    lokasi: "Auditorium Utama Gedung A, Kampus UISB",
    deadline_at: null,
    links: [
      {
        id: "lnk-4",
        post_id: "post-4",
        label: "Formulir Registrasi Kehadiran",
        url: "https://uisb.ac.id",
        urutan: 1,
      },
    ],
  },
  {
    id: "post-5",
    tipe: "kegiatan",
    judul: "Workshop Penulisan Karya Tulis Ilmiah & PKM 2026",
    slug: "workshop-penulisan-kti-pkm-2026",
    ringkasan:
      "Pendampingan penyusunan proposal Program Kreativitas Mahasiswa (PKM) bersama dosen pembimbing dan reviewer internal.",
    isi: [
      "Unit Kegiatan Mahasiswa Riset & Penalaran UISB mengundang seluruh mahasiswa yang berminat mengikuti hibah PKM tahun mendatang untuk menghadiri workshop intensif.",
      "Materi mencakup teknik pencarian ide, perumusan masalah, penyusunan anggaran, hingga tips lolos pendanaan nasional.",
    ],
    category: CATEGORIES[0],
    cover_url:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80",
    audiens: ["mahasiswa"],
    status: "terbit",
    is_pinned: false,
    pinned_until: null,
    published_at: "2026-11-14T13:00:00+07:00",
    event_mulai: "2026-11-25T13:30:00+07:00",
    event_selesai: "2026-11-25T16:30:00+07:00",
    lokasi: "Ruang Seminar Lt. 3, Perpustakaan UISB",
    deadline_at: null,
    links: [],
  },
  {
    id: "post-6",
    tipe: "pengumuman",
    judul: "Batas Akhir Pembayaran Cicilan UKT Tahap II Semester Ganjil",
    slug: "batas-akhir-pembayaran-ukt-tahap-2",
    ringkasan:
      "Informasi tenggat pembayaran cicilan kedua biaya kuliah serta prosedur konfirmasi bukti transfer ke bagian keuangan.",
    isi: [
      "Diingatkan kepada mahasiswa yang mengambil skema cicilan UKT bahwa batas akhir pembayaran Tahap II adalah tanggal 30 November 2026 pukul 16:00 WIB.",
      "Pembayaran dapat dilakukan melalui Virtual Account Bank mitra. Simpan bukti transaksi untuk keperluan verifikasi cetak kartu ujian.",
    ],
    category: CATEGORIES[2],
    cover_url: null,
    audiens: ["mahasiswa"],
    status: "terbit",
    is_pinned: false,
    pinned_until: null,
    published_at: "2026-11-10T09:00:00+07:00",
    event_mulai: null,
    event_selesai: null,
    lokasi: null,
    deadline_at: "2026-11-30T16:00:00+07:00",
    links: [],
  },
  {
    id: "post-7",
    tipe: "beasiswa_lomba",
    judul: "Lomba UI/UX Design & Business Plan Regional Kepri 2026",
    slug: "lomba-uiux-business-plan-kepri-2026",
    ringkasan:
      "Kompetisi inovasi digital antar perguruan tinggi se-Kepulauan Riau dengan total hadiah pembinaan Rp 15.000.000.",
    isi: [
      "Ajang tahunan kompetisi inovasi mahasiswa Kepulauan Riau kembali dibuka untuk kategori UI/UX Design dan Digital Business Plan.",
      "Setiap tim terdiri dari maksimal 3 mahasiswa aktif dari lintas program studi. Pendaftaran karya tahap awal ditutup 10 Desember 2026.",
    ],
    category: CATEGORIES[1],
    cover_url:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    audiens: ["mahasiswa"],
    status: "terbit",
    is_pinned: false,
    pinned_until: null,
    published_at: "2026-11-08T15:00:00+07:00",
    event_mulai: null,
    event_selesai: null,
    lokasi: null,
    deadline_at: "2026-12-10T23:59:00+07:00",
    links: [
      {
        id: "lnk-5",
        post_id: "post-7",
        label: "Buku Panduan Lomba & Template Proposal",
        url: "https://uisb.ac.id",
        urutan: 1,
      },
    ],
  },
  {
    id: "post-8",
    tipe: "kegiatan",
    judul: "Bakti Sosial & Donor Darah Mahasiswa UISB",
    slug: "bakti-sosial-donor-darah-uisb-2026",
    ringkasan:
      "Kegiatan sosial rutin bekerja sama dengan PMI setempat untuk membantu ketersediaan stok darah daerah.",
    isi: [
      "BEM Universitas Islam Sumatera Barat telah menyelenggarakan kegiatan donor darah dan pemeriksaan kesehatan gratis di lobi kampus.",
      "Terima kasih kepada lebih dari 120 pendonor dari kalangan mahasiswa, dosen, dan staf yang telah berpartisipasi.",
    ],
    category: CATEGORIES[3],
    cover_url: null,
    audiens: ["mahasiswa"],
    status: "terbit",
    is_pinned: false,
    pinned_until: null,
    published_at: "2026-10-25T08:00:00+07:00",
    event_mulai: "2026-11-05T09:00:00+07:00",
    event_selesai: "2026-11-05T14:00:00+07:00",
    lokasi: "Selasar Gedung Rektorat UISB",
    deadline_at: null,
    links: [],
  },
  {
    id: "post-9",
    tipe: "beasiswa_lomba",
    judul: "Seleksi Pertukaran Mahasiswa Merdeka (PMM) Batch Sebelumnya",
    slug: "seleksi-pmm-batch-sebelumnya",
    ringkasan:
      "Pendaftaran program pertukaran mahasiswa antar pulau telah resmi ditutup untuk periode berjalan.",
    isi: [
      "Pendaftaran program Pertukaran Mahasiswa Merdeka periode ini telah ditutup pada 10 November 2026.",
      "Bagi mahasiswa yang sudah mengirimkan berkas, silakan memantau pengumuman hasil verifikasi melalui laman resmi program.",
    ],
    category: CATEGORIES[0],
    cover_url:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80",
    audiens: ["mahasiswa"],
    status: "terbit",
    is_pinned: false,
    pinned_until: null,
    published_at: "2026-10-15T10:00:00+07:00",
    event_mulai: null,
    event_selesai: null,
    lokasi: null,
    deadline_at: "2026-11-10T23:59:00+07:00",
    links: [],
  },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "cal-1",
    judul: "Perkuliahan Minggu ke-10 s.d. ke-12",
    deskripsi: "Masa perkuliahan efektif sebelum minggu tenang.",
    jenis: "perkuliahan",
    mulai: "2026-11-09",
    selesai: "2026-11-27",
    periode: "Ganjil 2026/2027",
  },
  {
    id: "cal-2",
    judul: "Batas Pembayaran Cicilan UKT Tahap II",
    deskripsi: "Batas akhir pelunasan UKT untuk syarat cetak kartu UAS.",
    jenis: "administrasi",
    mulai: "2026-11-30",
    selesai: "2026-11-30",
    periode: "Ganjil 2026/2027",
    post_slug: "batas-akhir-pembayaran-ukt-tahap-2",
  },
  {
    id: "cal-3",
    judul: "Minggu Tenang & Persiapan UAS",
    deskripsi: "Tidak ada perkuliahan tatap muka; digunakan untuk persiapan ujian.",
    jenis: "perkuliahan",
    mulai: "2026-12-01",
    selesai: "2026-12-05",
    periode: "Ganjil 2026/2027",
  },
  {
    id: "cal-4",
    judul: "Batas Pengisian Survey Kepuasan Mahasiswa",
    deskripsi: "Wajib diisi melalui survey.uisb.ac.id.",
    jenis: "administrasi",
    mulai: "2026-12-04",
    selesai: "2026-12-04",
    periode: "Ganjil 2026/2027",
    post_slug: "survey-kepuasan-mahasiswa-ganjil-2026",
  },
  {
    id: "cal-5",
    judul: "Ujian Akhir Semester (UAS) Ganjil",
    deskripsi: "Pelaksanaan UAS serentak seluruh program studi.",
    jenis: "ujian",
    mulai: "2026-12-07",
    selesai: "2026-12-19",
    periode: "Ganjil 2026/2027",
    post_slug: "jadwal-uas-ganjil-2026-2027",
  },
  {
    id: "cal-6",
    judul: "Hari Raya Natal (Libur Nasional)",
    deskripsi: "Kampus libur sesuai kalender nasional.",
    jenis: "libur",
    mulai: "2026-12-25",
    selesai: "2026-12-25",
    periode: "Ganjil 2026/2027",
  },
  {
    id: "cal-7",
    judul: "Libur Akhir Semester Ganjil",
    deskripsi: "Libur akademik mahasiswa sebelum pengisian KRS Genap.",
    jenis: "libur",
    mulai: "2026-12-26",
    selesai: "2026-12-31",
    periode: "Ganjil 2026/2027",
  },
];

export const AKTIVITAS_LIST: AktivitasItem[] = [
  {
    id: "akt-1",
    judul: "Pengenalan Kehidupan Kampus Mahasiswa Baru (PKKMB) 2026",
    kategori: "kemahasiswaan",
    tanggal: "2026-09-02",
    lokasi: "Auditorium Utama UISB",
    deskripsi:
      "Rangkaian penyambutan mahasiswa baru Universitas Islam Sumatera Barat yang diisi dengan pengenalan akademik, organisasi kemahasiswaan, dan wawasan kebangsaan.",
    foto_url:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "akt-2",
    judul: "Kuliah Umum & Seminar Teknologi Informasi Regional",
    kategori: "akademik",
    tanggal: "2026-10-14",
    lokasi: "Gedung Serbaguna Kampus UISB",
    deskripsi:
      "Mahasiswa dari berbagai program studi mengikuti kuliah umum bersama praktisi industri membahas kesiapan talenta digital di Sumatera Barat.",
    foto_url:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "akt-3",
    judul: "Kuliah Kerja Nyata (KKN) & Bakti Sosial Nagari",
    kategori: "pengabdian",
    tanggal: "2026-08-20",
    lokasi: "Kabupaten Agam & Tanah Datar",
    deskripsi:
      "Tim mahasiswa UISB berkolaborasi dengan masyarakat setempat dalam program literasi digital, edukasi kesehatan, dan pemberdayaan UMKM nagari.",
    foto_url:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "akt-4",
    judul: "Delegasi Mahasiswa Raih Juara Lomba Karya Tulis Ilmiah",
    kategori: "prestasi",
    tanggal: "2026-11-03",
    lokasi: "Padang, Sumatera Barat",
    deskripsi:
      "Tim riset mahasiswa UISB berhasil meraih penghargaan terbaik pada ajang kompetisi karya tulis ilmiah tingkat wilayah Sumatera.",
    foto_url:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "akt-5",
    judul: "Workshop Penulisan Proposal PKM & Riset Mahasiswa",
    kategori: "akademik",
    tanggal: "2026-11-11",
    lokasi: "Perpustakaan Pusat UISB",
    deskripsi:
      "Pendampingan intensif penyusunan proposal Program Kreativitas Mahasiswa bersama dosen pembimbing dan reviewer internal kampus.",
    foto_url:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "akt-6",
    judul: "Aksi Donor Darah & Pemeriksaan Kesehatan Gratis",
    kategori: "pengabdian",
    tanggal: "2026-11-05",
    lokasi: "Selasar Gedung Rektorat UISB",
    deskripsi:
      "BEM Universitas Islam Sumatera Barat bersama PMI menyelenggarakan donor darah rutin yang diikuti oleh mahasiswa, dosen, dan tenaga kependidikan.",
    foto_url:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
  },
];

// Foto pendukung untuk galeri detail aktivitas (sementara dari URL luar).
const GALERI_PENDUKUNG = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1400&q=80",
];

export function getAktivitasById(id: string): AktivitasItem | undefined {
  return AKTIVITAS_LIST.find((item) => item.id === id);
}

export function getAktivitasGallery(item: AktivitasItem) {
  const start = AKTIVITAS_LIST.findIndex((a) => a.id === item.id);
  const extras = [0, 1, 2, 3].map(
    (i) => GALERI_PENDUKUNG[(start + i) % GALERI_PENDUKUNG.length]
  );
  return [item.foto_url, ...extras].map((url, i) => ({
    id: `${item.id}-${i}`,
    url,
    title: `${item.judul} - foto ${i + 1}`,
  }));
}
