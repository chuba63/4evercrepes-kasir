# 7. Batasan yang diketahui

| ID | Batasan | Dampak | Arah perbaikan |
|---|---|---|---|
| L-01 | Belum PWA (tanpa manifest & service worker) | Tidak bisa dipasang sebagai aplikasi dengan ikon & layar penuh; tidak bisa dibuka saat offline dari awal | Tambah `manifest.webmanifest`, ikon, dan service worker |
| L-02 | Single-tenant: konfigurasi Firebase ditulis langsung di kode, satu `/shop` | Satu instalasi = satu usaha | Lihat [bab 8](08-kesiapan-jual.md) |
| L-03 | `saveState()` menulis ulang seluruh `/shop` dengan `set()` | Dua perangkat menyimpan bersamaan → perubahan salah satu bisa hilang (*last write wins*). Setiap simpan mengunggah seluruh data, sehingga pemakaian bandwidth tumbuh seiring data | Tulis per-path dengan `update()` (mis. hanya `/shop/pos/{id}/orders/{id}`) |
| L-04 | Pendaftaran akun terbuka untuk siapa saja | Aman karena whitelist, tetapi bisa muncul akun sampah | Matikan sign-up publik atau ganti dengan undangan |
| L-05 | Tailwind dimuat dari CDN versi *play* | Bergantung pada CDN pihak ketiga; tidak disarankan untuk production | Build Tailwind menjadi file CSS statis |
| L-06 | Nilai bawaan masih spesifik 4ever Crepes (nama usaha, key localStorage, contoh rekening) | Perlu disesuaikan tiap klien | Jadikan konfigurasi |
| L-07 | Tidak ada backup otomatis | Kehilangan data bila terhapus | Backup terjadwal (mis. ekspor harian ke Google Drive lewat Apps Script) |
| L-08 | Robot: jeda hingga 5 menit; bila pengiriman sukses tetapi penandaan ✅ gagal, baris bisa terkirim dua kali | Kecil; entri ganda bisa dibuang di Kotak Masuk | Kirim ID unik per baris agar penulisan idempoten |
| L-09 | Pemasangan robot teknis (Apps Script, layar "unverified app", Script Properties) | Sulit dilakukan sendiri oleh UMKM | Dipasangkan oleh penjual, atau ganti kanal input |
| L-10 | Belum ada tes otomatis di repo | Regresi mesin pembaca tidak terdeteksi | Pindahkan 14 kasus uji ke folder `tests/` |

---

[← 6. Deployment & operasional](06-deployment-operasional.md) · [Daftar isi](README.md) · [8. Kesiapan untuk dijual ke UMKM →](08-kesiapan-jual.md)
