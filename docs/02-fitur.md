# 2. Fitur

| Tab | Fitur |
|---|---|
| 📋 **PO** | Buka beberapa PO sekaligus · daftar pesanan per PO · ringkasan omzet & status lunas · rekap total qty per menu (untuk belanja/produksi) · tutup PO |
| 📥 **Masuk** | Kotak masuk pesanan dari Google Docs · pencocokan nama menu otomatis · peringatan ⚠️ untuk tulisan yang meragukan · terima ke PO tertentu atau buang |
| 🍴 **Menu** | Tambah/ubah/hapus menu dan harga |
| 👥 **Customer** | Daftar customer otomatis dari pesanan · deduplikasi berdasarkan WA/IG · riwayat & total belanja per customer |
| 📁 **Riwayat** | PO yang sudah ditutup · bisa dibuka kembali |
| 💰 **Keuangan** | Pengeluaran per PO atau "Biaya Umum" · 5 kategori tetap · kartu Omzet / Lunas / Pengeluaran / Laba bersih + margin % |
| ⚙️ **Pengaturan** | Nama usaha · info pembayaran · template pesan · ekspor/impor data JSON · reset |

**Formulir pesanan:** nama (opsional), WA dan/atau IG (minimal salah satu), item dari menu
dengan kolom pencarian, ongkir, diskon, catatan, status lunas. Kolom nama, WA, dan IG
memiliki *autocomplete* dari data customer.

**Pengiriman pesan:**
- **WhatsApp** — membuka `wa.me/62xxx?text=...` dengan pesan terisi. Nomor dinormalisasi otomatis (`08…` / `8…` / `620…` → `628…`).
- **Instagram** — pesan disalin ke clipboard lalu membuka `ig.me/m/<username>`, karena Instagram tidak mendukung teks terisi otomatis.

**Template pesan** dapat diubah di Pengaturan. Placeholder yang tersedia:
`{nama}` `{po}` `{bisnis}` `{items}` `{rincian}` `{catatan}` `{pembayaran}`.

---

[← 1. Masalah yang diselesaikan](01-masalah.md) · [Daftar isi](README.md) · [3. Alur utama →](03-alur-utama.md)
