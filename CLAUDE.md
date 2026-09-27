# CLAUDE.md — 4ever Crepes Kasir

Konteks kerja untuk Claude. Dokumentasi lengkap ada di `docs/` — baca `docs/README.md`
dulu, lalu bab yang relevan dengan tugas (arsitektur: bab 4, keputusan: bab 9).

## Cara kerja dengan pemilik

- Pemilik bukan programmer. Pakai bahasa santai (lu/gw); jelaskan istilah teknis pakai analogi.
- Pemilik sedang belajar git dan membaca kode: setelah mengubah kode, tunjukkan `git diff`
  dan jelaskan singkat apa yang berubah.
- Pemilik sangat hati-hati soal bug: fitur baru selalu diuji di preview channel dulu.
- Jangan deploy production dan jangan `git push` tanpa persetujuan eksplisit di chat.

## Alur rilis

1. Ubah kode → cek fungsi inline sudah terdaftar di `window` (lihat gotcha di bawah)
2. Preview: `firebase.cmd hosting:channel:deploy <nama> --expires 7d` → pemilik tes di HP
3. Setelah pemilik bilang oke: `git commit` → `git push` → `firebase.cmd deploy --only hosting`

Firebase CLI di Windows dipanggil `firebase.cmd`, dijalankan dari folder ini.

## Gotcha kode (`index.html`)

- Kode ada di `<script type="module">`, jadi setiap fungsi yang dipanggil dari
  `onclick` / `oninput` / `onblur` WAJIB ditambahkan ke `Object.assign(window, {...})`
  di bagian bawah file.
- `orderDraft` di-mirror ke `window.orderDraft` agar bisa diakses inline handler.
- `saveState()` menimpa seluruh `/shop` dengan `set()`. Data yang ditulis pihak lain
  (mis. robot) harus di node terpisah seperti `/inbox`, bukan di dalam `/shop`.
- `calcOrderTotal` (dengan ongkir) hanya untuk tampilan per pesanan & pesan WA/IG;
  `calcOrderOmzet` (tanpa ongkir) untuk semua agregat.
- Preview channel dan production memakai database yang SAMA.
- Security rules ada di Firebase Console, bukan di repo (salinannya di `docs/04-arsitektur.md`).
- `firebase.json` menyajikan folder ini sebagai situs; file baru yang bukan bagian aplikasi
  harus masuk daftar `ignore` agar tidak ikut terpublikasi.

## Robot Google Docs

- `robot-apps-script.gs` dipasang manual oleh pemilik di project Apps Script standalone.
  Setiap perubahan file ini berarti pemilik harus menempel ulang kodenya.
- Password akun robot ada di Script Properties. Jangan pernah minta atau tulis di kode/chat.

## Menjaga dokumentasi

- Keputusan baru → tambah entri `D-xx` di `docs/09-decision-log.md`
- Kelemahan baru → tambah `L-xx` di `docs/07-batasan.md`
- Setiap commit fitur → tambah baris di `docs/10-riwayat-versi.md`

## Pekerjaan tertunda

> Perbarui bagian ini setiap kali ada yang selesai atau tertunda.

- **2026-09-27 — Diputuskan:** versi jual dibuat TERPISAH sebagai "Celemek: Catat Pesanan PO"
  (multi-tenant, target PO makanan, gratis dulu) di folder `C:\Users\kurni\celemek` dengan
  Firebase & repo GitHub sendiri. Aplikasi di folder ini tetap untuk 4ever Crepes saja —
  jangan tambahkan fitur Celemek ke sini.
- **Menunggu keputusan pemilik:** repo 4ever Crepes dijadikan private.
- **Belum dikonfirmasi:** apakah `pasangJadwal` di Apps Script sudah dijalankan (robot aktif).
