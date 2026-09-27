# 6. Deployment & operasional

## Alur rilis

```bash
# 1. Uji di preview channel (URL terpisah, kedaluwarsa otomatis)
firebase.cmd hosting:channel:deploy <nama-uji> --expires 7d

# 2. Setelah dites di HP: simpan ke git dan GitHub
git add . && git commit -m "ringkasan perubahan" && git push

# 3. Rilis ke production
firebase.cmd deploy --only hosting
```

> ⚠️ Preview channel dan production **memakai database yang sama**. Data yang dibuat saat uji
> masuk ke data asli.

## Rollback

- **Kode:** Firebase Console → Hosting → Release history → pilih versi → Rollback.
- **Data:** tidak ada backup otomatis. Ekspor manual lewat ⚙️ Pengaturan → Ekspor, atau Firebase Console → Export JSON.

## File yang dipublikasikan hosting

`firebase.json` menyajikan folder proyek sebagai situs, dengan pengecualian: file/folder berawalan
titik (termasuk `.git`), `backups/`, `*.md`, dan `*.gs`. Hanya `index.html` yang seharusnya
dapat diakses publik.

## Robot Google Docs

| Fungsi di Apps Script | Kegunaan |
|---|---|
| `cekKoneksi` | Uji baca dokumen dan login robot, tanpa mengirim apa pun |
| `kirimPesanan` | Kirim semua baris baru sekarang (fungsi yang dijalankan trigger) |
| `pasangJadwal` | Pasang trigger 5 menit (menghapus trigger lama agar tidak ganda) |
| `matikanJadwal` | Hentikan robot |

Script Properties yang wajib diisi: `ROBOT_EMAIL`, `ROBOT_PASSWORD`, `DOC_ID` (boleh URL lengkap dokumen).

---

[← 5. Model data](05-model-data.md) · [Daftar isi](README.md) · [7. Batasan yang diketahui →](07-batasan.md)
