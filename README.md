# 4ever Crepes Kasir — Dokumentasi Produk & Teknis

> Aplikasi kasir berbasis web untuk usaha **Pre-Order (PO)**: mencatat pesanan per batch PO,
> mengirim rincian tagihan ke customer lewat WhatsApp/Instagram dalam satu klik,
> dan menghitung omzet serta laba per PO.

| | |
|---|---|
| **Status** | Dipakai di production oleh 1 usaha (4ever Crepes) |
| **URL production** | https://evercrepes-kasir.web.app |
| **Versi dokumen** | 27 September 2026 |
| **Kode** | `index.html` (±2.300 baris) + `robot-apps-script.gs` (±190 baris) |

> ⚠️ **Dua hal yang perlu diketahui sebelum membaca lebih jauh**
> 1. Aplikasi ini **belum** Progressive Web App (PWA) — belum ada *web manifest* maupun
>    *service worker*. Lihat [L-01](docs/07-batasan.md) dan [bagian 8](docs/08-kesiapan-jual.md).
> 2. Arsitekturnya masih **single-tenant** (satu usaha per instalasi). Untuk dijual ke
>    banyak UMKM, ada keputusan arsitektur yang harus diambil dulu — lihat
>    [bagian 8](docs/08-kesiapan-jual.md).

---

## Dokumentasi

Dokumentasi lengkap ada di folder [`docs/`](docs/README.md), dipecah per bab:

1. [Masalah yang diselesaikan](docs/01-masalah.md) — Kenapa aplikasi ini ada dan masalah apa yang dipecahkan
2. [Fitur](docs/02-fitur.md) — Isi setiap tab, formulir pesanan, pengiriman WA/IG, template pesan
3. [Alur utama](docs/03-alur-utama.md) — Siklus satu PO, pesanan dari Google Docs, perhitungan keuangan
4. [Arsitektur](docs/04-arsitektur.md) — Diagram sistem, komponen, keamanan, mesin pembaca Kotak Masuk
5. [Model data](docs/05-model-data.md) — Struktur data di aplikasi & Firebase, rumus omzet
6. [Deployment & operasional](docs/06-deployment-operasional.md) — Alur rilis, rollback, file yang dipublikasikan, robot Google Docs
7. [Batasan yang diketahui](docs/07-batasan.md) — L-01 s/d L-10: kelemahan yang sudah diketahui dan arah perbaikannya
8. [Kesiapan untuk dijual ke UMKM](docs/08-kesiapan-jual.md) — Pilihan model penjualan dan checklist sebelum dijual ke UMKM
9. [Decision log](docs/09-decision-log.md) — D-01 s/d D-22: setiap keputusan penting beserta alasannya
10. [Riwayat versi](docs/10-riwayat-versi.md) — Daftar perubahan per commit

## Isi repo

```
index.html              aplikasi (satu file: UI + logika)
robot-apps-script.gs    robot Google Docs → Kotak Masuk (dipasang di Apps Script)
firebase.json           setelan Firebase Hosting
.firebaserc             project Firebase default
docs/                   dokumentasi per bab
CLAUDE.md               konteks kerja untuk AI (Claude) yang membantu mengembangkan app
```
