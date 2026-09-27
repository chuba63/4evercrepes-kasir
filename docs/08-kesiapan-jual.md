# 8. Kesiapan untuk dijual ke UMKM

## Keputusan terbesar: satu instalasi per klien, atau satu sistem untuk semua klien?

| | **Opsi A — Satu project Firebase per klien** | **Opsi B — Multi-tenant (SaaS)** |
|---|---|---|
| Cara kerja | Setiap klien punya project Firebase, URL, dan database sendiri | Semua klien di satu project; data dipisah `/shops/{shopId}` |
| Perubahan kode | Kecil: konfigurasi dikeluarkan dari kode | Besar: model data, rules, pendaftaran, manajemen anggota |
| Isolasi data | Sangat kuat (terpisah total) | Bergantung pada ketepatan security rules |
| Biaya server | Umumnya gratis per klien (Spark plan) | Satu tagihan, naik seiring jumlah klien |
| Update aplikasi | Deploy ke N project | Deploy sekali untuk semua |
| Cocok untuk | ≤ 10–20 klien, dijual sebagai jasa pasang | Puluhan–ratusan klien, langganan bulanan |

Rekomendasi awal: **mulai dengan Opsi A** untuk beberapa klien pertama (validasi pasar dengan
perubahan kode minimal), lalu pindah ke Opsi B setelah model bisnis terbukti. Keputusan akhir
belum diambil — lihat [D-22](09-decision-log.md).

## Daftar yang perlu dikerjakan sebelum dijual

- [ ] Putuskan Opsi A atau B ([D-22](09-decision-log.md))
- [ ] Nama produk & white-label (nama usaha, warna, logo dari pengaturan)
- [ ] PWA (L-01) — yang membuat aplikasi terasa seperti aplikasi HP sungguhan
- [ ] Perbaiki penyimpanan per-path (L-03) sebelum ada klien yang memakai lebih dari satu perangkat
- [ ] Backup otomatis (L-07)
- [ ] Repo GitHub dijadikan private
- [ ] Istilah generik: "Menu" → "Produk" bila menyasar PO non-makanan
- [ ] Syarat & ketentuan + kebijakan privasi — aplikasi menyimpan nama dan nomor HP customer,
      sehingga tunduk pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi
- [ ] Panduan pemakaian untuk klien (bahasa awam)

---

[← 7. Batasan yang diketahui](07-batasan.md) · [Daftar isi](README.md) · [9. Decision log →](09-decision-log.md)
