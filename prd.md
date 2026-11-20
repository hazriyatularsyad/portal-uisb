# PRD — Halaman Informasi Mahasiswa UISB

|             |                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------ |
| **Versi**   | 1.0 (draft siap review)                                                                          |
| **Tanggal** | 19 November 2026                                                                                 |
| **Cakupan** | Halaman untuk **mahasiswa** (fase 1). Halaman staff dan dosen menyusul dengan fondasi yang sama, |

| **Stack** | React + TypeScript + Tailwind CSS, shadcn, (Next.js), PostgreSQL di **Neon**, deploy ke VPS |
| **Status** | Wawancara 10 pertanyaan selesai; ada beberapa pertanyaan terbuka (bagian 14) |

---

## 1. Ringkasan dan Tujuan

Halaman informasi publik tanpa login untuk mahasiswa UISB. Isinya **pengumuman, kegiatan, beasiswa dan lomba, serta kalender akademik**, ditambah **tautan ke layanan lain** (survey mahasiswa dan website utama kampus). Konten dikelola tim kecil media/humas lewat panel admin.

**Tujuan produk**

1. Mahasiswa menemukan informasi penting kampus di satu tempat, dari HP maupun laptop.
2. Tim media/humas dapat menerbitkan dan mengubah informasi sendiri tanpa bantuan developer.
3. Halaman ringan dan murah dijalankan di VPS dan database dengan resource terbatas.
4. Fondasi data dan UI dapat dipakai ulang untuk halaman staff dan dosen.

**Metrik keberhasilan**

- Mahasiswa menemukan informasi yang dicari dalam **maksimal 3 klik** dari beranda.
- Halaman publik terbuka dalam **kurang dari 2,5 detik** (LCP) pada jaringan seluler 4G.
- Editor dapat menerbitkan satu pengumuman dalam **kurang dari 3 menit**.
- **Nol** insiden data pribadi mahasiswa tampil di halaman publik.

---

## 2. Hasil Wawancara (Keputusan yang Sudah Ditetapkan)

| #   | Topik              | Keputusan                                                                           |
| --- | ------------------ | ----------------------------------------------------------------------------------- |
| 1   | Tujuan             | Pengumuman + kegiatan + tautan ke layanan lain (survey, dll.)                       |
| 2   | Pengelola konten   | Tim kecil di media/humas (beberapa editor)                                          |
| 3   | Perangkat          | Campuran HP dan laptop, jadi desain responsif penuh                                 |
| 4   | Jenis konten       | Pengumuman akademik, kegiatan/event, beasiswa dan lomba, kalender akademik          |
| 5   | Penyimpanan        | Database baru di **Neon** (bukan Supabase)                                          |
| 6   | Tautan layanan     | Survey mahasiswa (`survey.uisb.ac.id`) dan website utama (`uisb.ac.id`)             |
| 7   | Penemuan informasi | Pin pengumuman penting, filter kategori, kalender bulanan (pencarian tidak dipilih) |
| 8   | Pemberitahuan      | Cukup dibuka manual oleh mahasiswa, tanpa notifikasi otomatis                       |
| 9   | Batasan            | Biaya dan resource VPS terbatas                                                     |
| 10  | Privasi            | Semua konten boleh dilihat publik                                                   |

**Konsekuensi teknis dari keputusan di atas**

- Neon hanya menyediakan database. **Login admin dan API harus dibangun di dalam aplikasi sendiri.**
- Resource VPS terbatas, jadi halaman publik dirancang **statis/ter-cache** (ISR), bukan query database di setiap kunjungan.
- Tanpa login dan tanpa notifikasi, nilai halaman bergantung pada **urutan yang jelas** (pin, terbaru, tanggal terbit, tenggat).

---

## 3. Profil Pengguna dan User Story

### Profil 1 — Mahasiswa UISB (pembaca)

Mahasiswa aktif yang membuka halaman dari HP di sela kuliah atau dari laptop. Tidak perlu akun. Ingin tahu dengan cepat: jadwal ujian, tenggat beasiswa, kegiatan minggu ini, dan di mana mengisi survey.

**User story**

1. Sebagai mahasiswa, saya ingin melihat pengumuman terbaru dan yang dipin saat membuka halaman, supaya saya tidak melewatkan informasi penting.
2. Sebagai mahasiswa, saya ingin memfilter informasi berdasarkan kategori, supaya saya hanya melihat yang relevan untuk saya.
3. Sebagai mahasiswa, saya ingin melihat kalender bulanan, supaya saya tahu tanggal ujian dan kegiatan dalam sekali lihat.
4. Sebagai mahasiswa, saya ingin melihat tenggat beasiswa dan lomba dengan jelas, supaya saya tidak terlambat mendaftar.
5. Sebagai mahasiswa, saya ingin membuka survey mahasiswa dan website kampus dari satu tempat, supaya saya tidak perlu mencari tautannya.
6. Sebagai mahasiswa, saya ingin membagikan tautan satu pengumuman ke teman, supaya informasi cepat menyebar di grup kami.

### Profil 2 — Staf Media/Humas (editor)

Anggota tim kecil yang menerbitkan informasi dari laptop. Tidak teknis. Butuh alat yang sederhana, aman, dan tidak bisa merusak halaman publik tanpa sengaja.

**User story**

1. Sebagai editor, saya ingin login dengan aman ke panel admin, supaya hanya tim kami yang bisa mengubah konten.
2. Sebagai editor, saya ingin menulis dan menyimpan draf sebelum terbit, supaya saya bisa memeriksa isinya dulu.
3. Sebagai editor, saya ingin menerbitkan, menjadwalkan, atau mengarsipkan pengumuman, supaya informasi tampil tepat waktu dan yang kedaluwarsa tidak mengganggu.
4. Sebagai editor, saya ingin mem-pin pengumuman penting, supaya selalu tampil paling atas.
5. Sebagai editor, saya ingin mengisi kalender akademik dan mengubah tautan layanan, supaya data tetap mutakhir tanpa meminta developer.
6. Sebagai admin, saya ingin menambah atau menonaktifkan akun editor dan melihat siapa mengubah apa, supaya ada akuntabilitas.

---

## 4. Fitur MVP

### Wajib (5)

| #   | Fitur                                                                                                                            | Alasan                                                                     |
| --- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 1   | **Tampilan konten publik**: beranda (pin + terbaru), daftar, dan halaman detail untuk pengumuman, kegiatan, serta beasiswa/lomba | Inti produk; tanpa ini halaman tidak berguna                               |
| 2   | **Filter kategori** (lewat parameter URL, jadi bisa dibagikan)                                                                   | Dipilih langsung di wawancara; mengurangi kebisingan saat konten banyak    |
| 3   | **Kalender bulanan** (akademik + kegiatan; di HP tampil sebagai daftar agenda)                                                   | Dipilih langsung di wawancara; satu-satunya cara melihat tanggal sekaligus |
| 4   | **Blok tautan layanan** (survey mahasiswa dan website utama)                                                                     | Tujuan utama #1; murah dibuat, nilainya besar                              |
| 5   | **Panel admin** untuk tim media: login, tambah/ubah konten, draf/terbit/arsip, pin, kalender, tautan layanan                     | Tanpa admin tidak ada konten; wajib sejak hari pertama                     |

### Bagus kalau ada

- Pencarian pengumuman dan kegiatan.
- Tombol bagikan (WhatsApp, salin tautan) dan pratinjau tautan (Open Graph) yang rapi.
- Tombol "Tambah ke kalender" (`.ics`).
- Penjadwalan terbit otomatis (tanggal terbit di masa depan).
- Halaman arsip untuk konten lama.
- Penghitung kunjungan yang ramah privasi (tanpa cookie pelacak).
- Statistik sederhana untuk editor (konten paling banyak dibuka).

### Nanti dulu

- Halaman staff dan dosen (fase berikutnya, memakai tabel dan komponen yang sama).
- Notifikasi (RSS, bot Telegram, email).
- Akun mahasiswa, komentar, RSVP/pendaftaran kegiatan.
- Versi bahasa Inggris.
- Alur persetujuan berlapis (editor → admin).
- Integrasi otomatis dengan WordPress atau sistem akademik.

---

## 5. Alur Pengguna

### 5.1 Mahasiswa (dari buka halaman sampai tujuan tercapai)

1. Mahasiswa membuka halaman dari tautan di WhatsApp, website utama, atau langsung dari browser.
2. **Beranda** menampilkan: pengumuman yang dipin, daftar terbaru, kegiatan mendatang, ringkasan kalender, dan blok layanan.
3. Tergantung kebutuhan:
   - **Baca informasi:** klik satu item, membuka halaman detail (isi, tanggal, tenggat, tautan lampiran).
   - **Cari yang relevan:** gunakan filter kategori di daftar, hasilnya muncul dengan URL yang bisa dibagikan.
   - **Cek tanggal:** buka kalender, pilih bulan, klik tanggal atau agenda.
   - **Pakai layanan lain:** klik kartu "Survey Mahasiswa" atau "Website Kampus" (membuka di tab baru).
4. Tujuan tercapai: informasi ditemukan dalam maksimal 3 klik, atau mahasiswa sudah berada di layanan yang dituju.

### 5.2 Editor (menerbitkan pengumuman)

1. Buka `/admin/login`, masuk dengan email dan password.
2. Dashboard menampilkan daftar konten dengan filter status (draf, terbit, arsip).
3. Klik **Konten baru**, pilih tipe (pengumuman, kegiatan, atau beasiswa/lomba).
4. Isi judul, kategori, ringkasan, isi, gambar sampul (opsional), tautan lampiran, dan field khusus tipe (tanggal kegiatan/lokasi, atau tenggat).
5. **Simpan draf**, lalu **Pratinjau**.
6. **Terbit** (atau jadwalkan). Halaman publik diperbarui otomatis.
7. Jika penting, aktifkan **Pin**. Jika ada kesalahan, edit atau arsipkan.

---

## 6. Daftar Halaman dan Isinya

### Publik (tanpa login)

| Rute                     | Isi                                                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` Beranda              | Pengumuman pin (maks 3), terbaru, kegiatan mendatang, blok layanan, ringkasan kalender bulan ini                                             |
| `/informasi`             | Daftar semua konten, filter `?tipe=` dan `?kategori=`, paginasi                                                                              |
| `/informasi/[slug]`      | Detail: judul, tipe, kategori, tanggal terbit/diperbarui, isi, gambar, tenggat atau tanggal+lokasi kegiatan, tautan lampiran, tombol bagikan |
| `/kalender`              | Kalender bulanan (grid di layar lebar, daftar agenda di HP), navigasi bulan, legenda jenis                                                   |
| `/404` dan halaman error | Pesan jelas dengan tautan kembali ke beranda                                                                                                 |

Komponen bersama: header (logo UISB), footer (tautan ke `uisb.ac.id`, kontak), blok layanan, kartu konten, label status ("Telah berlalu", "Ditutup", "Diperbarui").

### Admin (login wajib)

| Rute                                          | Isi                                                    |
| --------------------------------------------- | ------------------------------------------------------ |
| `/admin/login`                                | Form login, pembatasan percobaan                       |
| `/admin`                                      | Daftar konten + filter status/tipe, tombol konten baru |
| `/admin/konten/baru` dan `/admin/konten/[id]` | Form konten, pratinjau, terbit/jadwal/arsip, pin       |
| `/admin/kalender`                             | Kelola agenda akademik (tambah, ubah, hapus)           |
| `/admin/layanan`                              | Kelola kartu tautan layanan (urutan, aktif/nonaktif)   |
| `/admin/kategori`                             | Kelola kategori (khusus admin)                         |
| `/admin/pengguna`                             | Kelola akun editor (khusus admin)                      |
| `/admin/log`                                  | Riwayat perubahan (khusus admin)                       |

---

## 7. Rancangan Database (Neon PostgreSQL)

Semua waktu disimpan sebagai `timestamptz` (UTC) dan ditampilkan dalam **WIB (Asia/Jakarta)**.

### `users`

| Kolom                        | Tipe        | Catatan                                           |
| ---------------------------- | ----------- | ------------------------------------------------- |
| id                           | uuid PK     |                                                   |
| nama                         | text        |                                                   |
| email                        | text unique |                                                   |
| password_hash                | text        | argon2id atau bcrypt, tidak pernah disimpan polos |
| role                         | text        | `admin` atau `editor`                             |
| aktif                        | boolean     | akun dinonaktifkan, bukan dihapus                 |
| dibuat_at, login_terakhir_at | timestamptz |                                                   |

Tabel sesi mengikuti library autentikasi yang dipilih (misalnya Auth.js atau Better Auth).

### `categories`

| Kolom  | Tipe        | Catatan                                      |
| ------ | ----------- | -------------------------------------------- |
| id     | uuid PK     |                                              |
| nama   | text        | mis. Akademik, Kemahasiswaan, Keuangan, Umum |
| slug   | text unique |                                              |
| urutan | int         |                                              |
| aktif  | boolean     |                                              |

### `posts`

| Kolom                            | Tipe                 | Catatan                                       |
| -------------------------------- | -------------------- | --------------------------------------------- |
| id                               | uuid PK              |                                               |
| tipe                             | text                 | `pengumuman`, `kegiatan`, `beasiswa_lomba`    |
| judul                            | text                 |                                               |
| slug                             | text unique          | tidak berubah setelah terbit                  |
| ringkasan                        | text                 | maks sekitar 200 karakter                     |
| isi                              | text                 | disanitasi di server                          |
| category_id                      | uuid FK → categories |                                               |
| cover_url                        | text null            | gambar sudah dikompres                        |
| audiens                          | text[]               | default `{mahasiswa}`; nanti `dosen`, `staff` |
| status                           | text                 | `draft`, `terbit`, `arsip`                    |
| is_pinned                        | boolean              |                                               |
| pinned_until                     | timestamptz null     | pin otomatis lepas                            |
| published_at                     | timestamptz null     | boleh di masa depan (terjadwal)               |
| event_mulai, event_selesai       | timestamptz null     | wajib untuk tipe `kegiatan`                   |
| lokasi                           | text null            |                                               |
| deadline_at                      | timestamptz null     | tenggat beasiswa/lomba/pendaftaran            |
| version                          | int                  | untuk pengecekan edit bersamaan               |
| dibuat_oleh, diubah_oleh         | uuid FK → users      |                                               |
| dibuat_at, diubah_at, dihapus_at | timestamptz          | `dihapus_at` untuk soft delete                |

Constraint: `event_selesai >= event_mulai`; jika `tipe = 'kegiatan'` maka `event_mulai` wajib; jika `status = 'terbit'` maka `published_at` wajib.

### `post_links` (lampiran berupa tautan)

| Kolom   | Tipe            | Catatan                         |
| ------- | --------------- | ------------------------------- |
| id      | uuid PK         |                                 |
| post_id | uuid FK → posts | `on delete cascade`             |
| label   | text            |                                 |
| url     | text            | hanya `http://` atau `https://` |
| urutan  | int             |                                 |

### `calendar_events` (kalender akademik)

| Kolom                            | Tipe                 | Catatan                                                    |
| -------------------------------- | -------------------- | ---------------------------------------------------------- |
| id                               | uuid PK              |                                                            |
| judul                            | text                 |                                                            |
| deskripsi                        | text null            |                                                            |
| jenis                            | text                 | `perkuliahan`, `ujian`, `libur`, `administrasi`, `lainnya` |
| mulai, selesai                   | date                 | tanggal kalender (bukan jam)                               |
| periode                          | text                 | mis. "Ganjil 2026/2027"                                    |
| audiens                          | text[]               | seperti `posts`                                            |
| post_id                          | uuid FK → posts null | tautan ke pengumuman terkait                               |
| dibuat_oleh                      | uuid FK → users      |                                                            |
| dibuat_at, diubah_at, dihapus_at | timestamptz          |                                                            |

Kegiatan bertipe `kegiatan` di `posts` ikut tampil di kalender lewat `event_mulai/event_selesai`, tanpa perlu input ganda.

### `service_links`

| Kolom            | Tipe      | Catatan                  |
| ---------------- | --------- | ------------------------ |
| id               | uuid PK   |                          |
| judul, deskripsi | text      |                          |
| url              | text      | hanya `http(s)`          |
| ikon             | text null | nama ikon dari set tetap |
| urutan           | int       |                          |
| aktif            | boolean   |                          |
| audiens          | text[]    |                          |

Data awal: Survey Mahasiswa (`https://survey.uisb.ac.id`) dan Website Kampus (`https://uisb.ac.id`).

### `audit_logs`

| Kolom               | Tipe            | Catatan                                                   |
| ------------------- | --------------- | --------------------------------------------------------- |
| id                  | bigserial PK    |                                                           |
| user_id             | uuid FK → users |                                                           |
| aksi                | text            | `buat`, `ubah`, `terbit`, `arsip`, `hapus`, `login`, dll. |
| entitas, entitas_id | text            | tabel dan id yang berubah                                 |
| ringkasan           | text            | tanpa menyimpan isi sensitif                              |
| waktu               | timestamptz     |                                                           |

### Relasi

- `users` 1—N `posts` (dibuat_oleh, diubah_oleh), `calendar_events`, `audit_logs`
- `categories` 1—N `posts`
- `posts` 1—N `post_links`
- `posts` 0..1—N `calendar_events` (tautan opsional)

### Indeks utama

`posts(status, published_at desc)`, `posts(slug)` unik, `posts(is_pinned, pinned_until)`, `posts(tipe)`, `calendar_events(mulai)`, GIN pada `audiens` bila perlu.

### Akses data publik

Halaman publik membaca dari **view** `v_posts_publik` yang sudah memfilter `status = 'terbit' AND published_at <= now() AND dihapus_at IS NULL`, memakai **role database read-only** terpisah dari role admin. Dengan begitu draf dan arsip tidak mungkin bocor walau ada kesalahan query.

---

## 8. Arsitektur dan Penanganan Resource Terbatas

- **Aplikasi:** satu aplikasi Next.js (App Router), React + TypeScript + Tailwind. Satu proses Node di Docker dengan batas memori (`mem_limit`).
- **Rendering publik:** statis dengan **ISR**: halaman dibangun ulang saat editor menerbitkan (revalidasi sesuai permintaan) dan otomatis tiap sekitar 5 menit (menangani konten terjadwal). Pengunjung hampir tidak menyentuh database.
- **Database:** Neon dengan connection string **pooled** dan driver serverless; pilih region terdekat (Singapura). Cold start Neon hanya terasa di panel admin, bukan di halaman publik.
- **Gambar:** diperkecil dan dikonversi ke WebP **saat upload** (maks sekitar 1 MB), bukan lewat optimizer saat runtime, agar CPU VPS tidak terbebani.
- **Lampiran dokumen (MVP):** berupa tautan (misalnya Google Drive), bukan upload PDF ke VPS.
- **Reverse proxy:** Caddy dengan HTTPS otomatis, kompresi, dan header cache untuk aset statis.
- **Subdomain:** `mahasiswa.uisb.ac.id` (asumsi, lihat bagian 14), record A di cPanel Rumahweb mengarah ke VPS.
- **Autentikasi admin:** login email + password lewat library yang sudah teruji (Auth.js atau Better Auth). Jangan menulis kriptografi sendiri.
- **Ketahanan:** jika Neon sedang bermasalah, halaman publik yang sudah ter-cache tetap tampil; hanya admin yang terdampak.
- Cek kuota paket gratis Neon (storage dan jam compute) sebelum rilis dan pantau pemakaiannya.

---

## 9. Kebutuhan Non-Fungsional

- **Responsif:** desain mulai dari layar HP (mobile-first), tetap nyaman di laptop. Kalender menjadi daftar agenda di layar kecil.
- **Performa:** LCP < 2,5 detik di 4G; bobot halaman beranda kecil; tanpa library berat yang tidak perlu.
- **Aksesibilitas:** target WCAG 2.1 AA (kontras warna, fokus keyboard, teks alternatif gambar, label tombol).
- **SEO dan berbagi:** judul dan deskripsi per halaman, Open Graph/Twitter card agar pratinjau di WhatsApp rapi, `sitemap.xml`.
- **Bahasa:** Indonesia. Format tanggal Indonesia, zona waktu WIB.
- **Identitas visual:** mengikuti palet portal survey (primer `#7C3AED`, sekunder Gold, latar `#EDE9FE`) agar konsisten antarsubdomain; dapat diubah jika kampus punya pedoman lain.
- **Monitoring:** uptime check sederhana pada URL publik dan log aplikasi.
- **Backup:** ekspor `pg_dump` berkala dari Neon dan salinan folder gambar; periksa juga jendela _restore_ bawaan paket Neon yang dipakai.

---

## 10. Hasil Review Kritis

### 10.1 Keamanan

| Risiko                    | Perbaikan yang masuk ke PRD                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Tebak password admin      | Pembatasan percobaan login (rate limit + penundaan), password kuat, opsi 2FA di fase berikutnya                   |
| XSS lewat isi konten      | `isi` disanitasi di server dengan allowlist tag; tidak ada HTML mentah dari editor; CSP ketat                     |
| `javascript:` pada tautan | URL di `post_links` dan `service_links` dibatasi skema `http/https` (constraint database + validasi aplikasi)     |
| Tab-nabbing               | Tautan keluar memakai `rel="noopener noreferrer"`                                                                 |
| SQL injection             | Semua query berparameter lewat ORM/driver; tidak ada rangkaian string SQL                                         |
| CSRF di panel admin       | Cookie sesi `HttpOnly`, `Secure`, `SameSite=Lax`, ditambah token CSRF pada aksi tulis                             |
| Draf bocor ke publik      | Halaman publik hanya membaca `v_posts_publik` dengan role read-only; pratinjau draf hanya untuk editor yang login |
| Editor terlalu berkuasa   | Dua peran: `admin` (kelola pengguna, kategori, log) dan `editor` (konten); hapus permanen hanya admin             |
| Rahasia bocor             | `DATABASE_URL` dan secret hanya di environment server, tidak di repositori atau bundel browser                    |
| Penyalahgunaan upload     | Hanya gambar (cek tipe sebenarnya), batas ukuran, nama file diganti acak, disajikan sebagai file statis           |
| Header keamanan           | CSP, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors` lewat Caddy atau Next.js                      |

### 10.2 Privasi

Walau semua konten publik, ada risiko editor tidak sengaja memuat data pribadi (misalnya daftar penerima beasiswa dengan NIM, nama, nilai, atau nomor HP).

- **Panduan editor** ditampilkan di form: jangan menuliskan NIM, nilai, nomor HP, alamat, atau data pribadi lain di konten publik. Pengumuman hasil yang perlu identitas dibagikan lewat kanal terbatas, bukan halaman ini.
- Editor menampilkan **peringatan otomatis** bila isi mengandung pola yang mirip NIM atau nomor telepon (bersifat peringatan, bukan pemblokiran).
- Lampiran dibagikan sebagai tautan; editor diingatkan memeriksa izin akses dokumen dan metadata file.
- Tidak ada cookie pelacak. Jika dipasang penghitung kunjungan, pakai yang tanpa cookie sehingga tidak butuh banner persetujuan.
- Perhatikan ketentuan **UU Pelindungan Data Pribadi (UU No. 27 Tahun 2022)** untuk data pribadi apa pun yang diproses, termasuk email dan log aktivitas editor.
- `audit_logs` mencatat tindakan, bukan isi konten.

### 10.3 Edge case

| Situasi                                | Penanganan                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Zona waktu                             | Simpan UTC, tampilkan WIB; tenggat "hari ini 23:59 WIB" dihitung eksplisit                             |
| Kegiatan lintas hari atau lintas bulan | Tampil di setiap hari yang dilewati; kalender menampilkan rentang                                      |
| Banyak agenda di satu tanggal          | Tampil beberapa lalu "+N lagi"; di HP berupa daftar agenda                                             |
| Pin terlalu banyak                     | Maksimal 3 pin aktif; pin ke-4 ditolak dengan pesan jelas; `pinned_until` melepas pin otomatis         |
| Kegiatan sudah lewat                   | Label "Telah berlalu", keluar dari "kegiatan mendatang", tetap bisa dibuka                             |
| Beasiswa melewati tenggat              | Label "Ditutup", tidak dihapus                                                                         |
| Konten terjadwal                       | `published_at` di masa depan; muncul otomatis lewat revalidasi berkala (jeda maksimal sekitar 5 menit) |
| Judul diubah setelah terbit            | Slug tidak berubah, tautan lama tetap valid                                                            |
| Dua editor menyunting konten yang sama | Pengecekan `version`; yang kedua mendapat pesan konflik, bukan menimpa diam-diam                       |
| Salah hapus                            | Soft delete (`dihapus_at`) dan arsip; pemulihan oleh admin                                             |
| Filter tidak valid atau hasil kosong   | Parameter tidak dikenal diabaikan; tampilan kosong yang ramah dengan tautan kembali                    |
| Tautan layanan mati                    | Admin dapat menonaktifkan kartu; pengecekan manual berkala masuk daftar tugas rutin                    |
| Neon atau server lambat                | Halaman publik tetap dari cache; admin menampilkan pesan error yang jelas                              |
| Konten untuk audiens lain nanti        | Kolom `audiens` memisahkan konten mahasiswa, dosen, staff dari awal                                    |

### 10.4 Bagian yang tadinya ambigu dan sudah diputuskan di dokumen ini

- Kalender akademik: **diinput manual oleh admin/editor** tiap semester (impor CSV masuk "nanti dulu").
- Lampiran: **tautan** pada MVP, bukan upload dokumen.
- Pin: **maksimal 3**, dengan batas waktu opsional.
- Hak terbit: editor **boleh menerbitkan langsung** (tanpa persetujuan berlapis), dengan jejak audit.
- Tipe konten: tetap tiga (`pengumuman`, `kegiatan`, `beasiswa_lomba`); kalender akademik adalah tabel tersendiri.

---

## 11. Fase Pengerjaan

**Fase 1 — Frontend publik (data tiruan)**

1. Setup proyek, Tailwind, token warna, layout dasar.
2. Beranda, daftar + filter, detail, kalender (grid + agenda), blok layanan.
3. Kondisi kosong, error, dan loading; uji tampilan di HP dan laptop.

**Fase 2 — Database dan data publik**

1. Skema Neon, role read-only, view publik, data awal (`service_links`, kategori).
2. Lapisan akses data, ISR dan revalidasi.

**Fase 3 — Panel admin**

1. Autentikasi, peran, rate limit.
2. CRUD konten, kalender, layanan, kategori, pengguna; pratinjau; audit log.

**Fase 4 — Pengerasan dan rilis**

1. Header keamanan, sanitasi, uji penetrasi dasar, backup.
2. Deploy ke VPS (Docker + Caddy), DNS subdomain di cPanel Rumahweb.
3. Pengisian konten awal dan pelatihan singkat tim media.

**Setelahnya:** halaman staff dan dosen memakai tabel dan komponen yang sama dengan filter `audiens`.

---

## 12. Kriteria Penerimaan

- Beranda menampilkan maksimal 3 pin aktif lalu konten terbaru berurutan tanggal terbit.
- Konten berstatus draf, arsip, atau terhapus **tidak pernah** tampil di halaman publik.
- Filter kategori dan tipe bekerja, dan URL hasil filter bisa dibagikan.
- Kalender menampilkan agenda akademik dan kegiatan, dan berfungsi baik di HP maupun laptop.
- Kartu layanan Survey Mahasiswa dan Website Kampus tampil dan membuka tujuan yang benar.
- Editor dapat membuat, menerbitkan, mem-pin, dan mengarsipkan konten; perubahan tampil di halaman publik tanpa deploy ulang.
- Editor tidak dapat membuka halaman khusus admin; akun nonaktif tidak bisa login.
- Tautan `javascript:` ditolak; isi dengan skrip tidak tereksekusi di halaman publik.
- Dua editor yang menyunting konten sama mendapat pesan konflik.
- LCP beranda < 2,5 detik pada uji 4G, dan skor aksesibilitas memenuhi target.

---

## 13. Risiko Proyek

| Risiko                                                     | Mitigasi                                                                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Resource VPS habis karena layanan lain di server yang sama | Halaman statis ter-cache, batas memori container, pantau pemakaian                   |
| Kuota gratis Neon terlampaui                               | Query publik minimal lewat ISR; pantau kuota; rencanakan paket berbayar bila perlu   |
| Konten tidak terbarui (halaman terlihat mati)              | Tampilkan tanggal terbit/diperbarui; tetapkan jadwal pengecekan rutin oleh tim media |
| Data pribadi tidak sengaja terpublikasi                    | Panduan editor, peringatan pola data pribadi, tinjauan berkala                       |
| Ketergantungan pada satu developer                         | Dokumentasi singkat, struktur proyek rapi, backup terjadwal                          |

---

## 14. Pertanyaan Terbuka

1. **Subdomain final:** `mahasiswa.uisb.ac.id` atau nama lain? Perlu diputuskan juga pola untuk staff dan dosen (subdomain terpisah atau satu domain dengan jalur berbeda).
2. **Panel admin:** dibuat baru dalam proyek ini, atau digabung ke dashboard admin UISB yang sudah ada? Jika digabung, sistem login ikut dashboard itu, bukan dibangun ulang di proyek ini.
3. **Penyimpanan gambar sampul:** disk VPS atau object storage terpisah? (Asumsi sementara: disk VPS dengan batas ukuran.)
4. **Jumlah dan peran akun:** berapa editor, dan siapa yang menjadi admin?
5. **Format editor konten:** teks kaya sederhana atau Markdown? (Asumsi: editor teks sederhana dengan keluaran yang disanitasi.)
6. **Identitas visual:** apakah memakai palet yang sama dengan portal survey, dan apakah ada pedoman logo/branding resmi kampus?
7. **Retensi konten:** berapa lama konten lama dipertahankan sebelum diarsipkan permanen?
