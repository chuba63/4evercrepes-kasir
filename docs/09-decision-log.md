# 9. Decision log

Format: **Konteks** → **Keputusan** → **Alasan** → **Alternatif yang ditolak**.

## D-01 · Satu file HTML tanpa build step
- **Konteks:** Pemilik bukan programmer; perubahan sering dibantu AI.
- **Keputusan:** Seluruh aplikasi dalam `index.html` (HTML + Tailwind CDN + JS module).
- **Alasan:** Tidak perlu Node, bundler, atau `npm install`; satu file mudah dibaca dan di-deploy.
- **Ditolak:** React/Next.js — lebih rapi untuk skala besar, tetapi menambah rantai build.
- **Konsekuensi:** File panjang (±2.300 baris); fungsi yang dipanggil dari `onclick` wajib didaftarkan ke `window` karena kode berjalan sebagai module.

## D-02 · Firebase Realtime Database, region Singapura
- **Keputusan:** RTDB di `asia-southeast1`.
- **Alasan:** Sinkron realtime antar HP tanpa server sendiri; latensi rendah dari Indonesia; free tier cukup untuk usaha kecil.
- **Ditolak:** Firestore (model query lebih kaya, tetapi belum dibutuhkan); server sendiri.
- **Catatan:** CLI `firebase database:get` bermasalah untuk database regional; backup lebih andal lewat Console.

## D-03 · localStorage sebagai cache offline
- **Alasan:** Aplikasi tetap menampilkan data terakhir saat sinyal hilang.
- **Batas:** Bukan offline-first penuh — halaman tetap harus dimuat dari internet (L-01).

## D-04 · Whitelist UID, bukan pendaftaran terbuka
- **Keputusan:** Login email + password; akses data hanya untuk UID di `/allowedUsers`.
- **Alasan:** Cara paling sederhana membatasi akses ke keluarga/tim tanpa sistem peran.
- **Konsekuensi:** Menambah pengguna dilakukan manual di Firebase Console (dibantu tombol salin UID).

## D-05 · Array disimpan sebagai objek ber-key id
- **Alasan:** Realtime Database menyimpan array secara tidak konsisten ketika elemen dihapus.

## D-06 · Omzet tidak termasuk ongkir
- **Keputusan:** Pisahkan `calcOrderTotal` (yang dibayar customer) dan `calcOrderOmzet` (pendapatan usaha).
- **Alasan:** Ongkir adalah titipan untuk kurir, bukan pendapatan. Memasukkannya membuat omzet dan margin terlihat lebih besar dari kenyataan.

## D-07 · Customer diidentifikasi dari WA/IG, bukan nama
- **Alasan:** Nama sering ditulis berbeda-beda atau kosong; nomor WA dan username IG unik.
- **Keputusan turunan:** Nama opsional; customer tidak disimpan bila WA dan IG sama-sama kosong; bila terdeteksi duplikat, data yang kosong dilengkapi.

## D-08 · Keuangan per PO, bukan per bulan
- **Alasan:** Usaha PO berpikir per batch ("PO ini untung berapa?"), bukan per bulan kalender.
- **Keputusan turunan:** Opsi "Biaya Umum" untuk pengeluaran lintas PO; kategori tetap agar laporan konsisten.

## D-09 · Instagram lewat clipboard + `ig.me`
- **Alasan:** Tautan Instagram tidak mendukung teks terisi otomatis seperti `wa.me`.

## D-10 · Header `no-cache` untuk HTML
- **Alasan:** Tanpa ini, HP pengguna bisa terus memakai versi lama setelah deploy.

## D-11 · Pemilih menu berupa kolom pencarian
- **Tanggal:** 15 Agustus 2026
- **Konteks:** Menu bertambah banyak; dropdown panjang merepotkan di HP.
- **Keputusan:** Ganti `<select>` dengan kolom ketik + daftar saran. Saat diklik, semua menu tetap tampil.
- **Detail:** Teks yang diketik tanpa memilih dikembalikan ke menu yang terpilih, agar tidak ada nilai menggantung.

## D-12 · Input pesanan lewat Google Docs, bukan Google Sheets
- **Tanggal:** 15 Agustus 2026
- **Konteks:** Pemilik terbiasa mencatat pesanan di dokumen lalu mengetik ulang ke aplikasi.
- **Keputusan:** Google Docs, satu baris satu pesanan.
- **Alasan:** Mengetik bebas jauh lebih cepat di HP daripada mengisi sel tabel. Dokumen di cloud tetap bisa diproses walau laptop mati.
- **Ditolak:** Google Sheets (lebih mudah diproses mesin, tetapi merepotkan saat mengetik); file Word di laptop (hanya jalan saat laptop menyala); salin-tempel manual ke aplikasi (pemilik menginginkan otomatis penuh).

## D-13 · Format baris `Nama Menu Jumlah`; kontak diisi di aplikasi
- **Keputusan:** Baris hanya berisi nama, menu, dan jumlah. WA/IG/ongkir/diskon dilengkapi saat Terima.
- **Alasan:** Format sependek mungkin agar kebiasaan mencatat tidak berubah; kolom kontak di aplikasi sudah punya autocomplete.

## D-14 · Robot "bodoh", logika di aplikasi
- **Keputusan:** Robot hanya mengirim teks mentah; pencocokan menu dilakukan aplikasi.
- **Alasan:** Daftar menu hidup di aplikasi. Menu baru langsung dikenali tanpa mengubah robot.

## D-15 · Lebih baik bertanya daripada menebak
- **Keputusan:** Angka pada nama menu harus identik; nama terpanjang menang; tebakan diberi ⚠️; menu tak dikenal tidak pernah ditebak.
- **Alasan:** Menu seperti `Gimbap cake 20d` / `28D` / `60d` hanya berbeda angka. Toleransi salah ketik yang longgar bisa diam-diam mengubah pesanan Rp160.000 menjadi Rp235.000 dan merusak laporan omzet.

## D-16 · Manusia menyetujui setiap pesanan dari Docs (human-in-the-loop)
- **Keputusan:** Pesanan masuk ke Kotak Masuk; tombol **Terima** membuka formulir pesanan yang sudah ada, terisi otomatis.
- **Alasan:** Kesalahan baca terlihat sebelum menjadi data penjualan. Memakai ulang formulir lama berarti autocomplete, simpan-customer otomatis, dan perhitungan total tetap memakai kode yang sudah teruji.
- **Ditolak:** Pesanan langsung tersimpan otomatis; formulir baru khusus Kotak Masuk.

## D-17 · Node `/inbox` terpisah dari `/shop`
- **Konteks:** `saveState()` menimpa seluruh `/shop` dengan `set()`.
- **Keputusan:** Kiriman robot disimpan di `/inbox`, dibaca dengan listener terpisah, dihapus per entri.
- **Alasan:** Bila berada di dalam `/shop`, kiriman robot akan terhapus setiap kali aplikasi menyimpan data dari perangkat yang belum menerimanya.

## D-18 · Akun robot terpisah, Apps Script standalone
- **Keputusan:** Robot login dengan akun khusus (alias `+robot` dari email pemilik); password di Script Properties; project Apps Script berdiri sendiri, tidak menempel di dokumen.
- **Alasan:** Akun terpisah bisa dicabut tanpa mengganggu akun pemilik. Script yang menempel di dokumen ikut terbagikan saat dokumen dibagikan.
- **Ditolak:** Memakai akun pemilik; service account (lebih aman secara teori, tetapi terlalu rumit dipasang oleh non-programmer).

## D-19 · Baris yang terkirim ditandai ✅ + dicoret
- **Alasan:** Google Docs tidak punya kolom status. Tanda terlihat oleh pemilik dan dipakai robot untuk melewati baris. Penandaan dilakukan tepat setelah setiap baris berhasil dikirim.

## D-20 · Git + GitHub; riwayat digabung, bukan ditimpa
- **Tanggal:** 27 September 2026
- **Konteks:** Repo GitHub sudah berisi satu unggahan manual `index.html` (Mei 2026) yang tidak punya riwayat bersama dengan git lokal.
- **Keputusan:** Gabungkan dengan `--allow-unrelated-histories`; versi lokal dipakai sebagai isi terkini.
- **Ditolak:** *Force push* — akan menghapus unggahan lama.

## D-21 · Hosting tidak lagi menyajikan `.git` dan file non-aplikasi
- **Tanggal:** 27 September 2026
- **Konteks:** Pola `**/.*` hanya mengecualikan *file* berawalan titik. Isi folder `.git` (mis. `/.git/HEAD`, `/.git/config`) ternyata bisa diunduh publik dari URL production.
- **Keputusan:** Tambahkan `**/.*/**`, `backups/**`, `**/*.md`, `**/*.gs` ke daftar pengecualian.
- **Dampak saat ditemukan:** Rendah — isinya sama dengan repo GitHub yang publik dan tidak mengandung password. Tetapi bila repo dijadikan private, kebocoran ini akan membatalkannya.
- **Status:** Di-deploy 27 September 2026 (`found 1 files`); `/.git/config`, `/.git/HEAD`, `CLAUDE.md`, `docs/`, `*.gs`, `firebase.json` terverifikasi 404, dan `index.html` live identik dengan sebelum deploy. Dokumentasi baru di-push ke GitHub setelah verifikasi ini.

## D-22 · Model penjualan: multi-tenant (Opsi B)
- **Tanggal:** 27 September 2026
- **Konteks:** Pemilik ingin aplikasi masuk Play Store / App Store untuk dijual ke UMKM, bukan sekadar dipakai sendiri. Aplikasi di store adalah satu aplikasi yang diunduh semua orang.
- **Keputusan:** Opsi B — multi-tenant: satu sistem, data tiap toko dipisah di `/shops/{shopId}`, pendaftaran toko mandiri.
- **Alasan:** Opsi A (satu project Firebase per klien) tidak cocok dengan satu aplikasi store yang dipasang sendiri oleh pengguna.
- **Ditolak:** Opsi A; PWA saja tanpa store (cukup untuk pemakaian sendiri, tidak untuk dijual).

## D-23 · Versi jual dibangun terpisah sebagai "Celemek"
- **Tanggal:** 27 September 2026
- **Konteks:** Aplikasi 4ever Crepes dipakai setiap hari; perubahan multi-tenant adalah perombakan terbesar proyek ini.
- **Keputusan:** Produk baru **"Celemek: Catat Pesanan PO"** dibuat dari salinan `index.html` di folder `C:\Users\kurni\celemek`, dengan git baru, repo GitHub private sendiri, dan project Firebase sendiri. Aplikasi di repo ini tetap khusus 4ever Crepes.
- **Alasan:** Bug atau data uji Celemek tidak mungkin menyentuh data 4ever Crepes — ingat preview dan production di satu project memakai database yang sama.
- **Ditolak:** Branch git di repo ini (mudah salah deploy branch ke production); project Firebase yang sama (database ikut tercampur).
- **Konsekuensi:** Perbaikan bug di satu aplikasi harus disalin manual ke aplikasi lainnya.

---

[← 8. Kesiapan untuk dijual ke UMKM](08-kesiapan-jual.md) · [Daftar isi](README.md) · [10. Riwayat versi →](10-riwayat-versi.md)
