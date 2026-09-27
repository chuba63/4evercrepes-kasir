# 5. Model data

## Di memori aplikasi

```js
state = {
  business:  { name, payment, template },
  menu:      [{ id, name, price }],
  pos:       [{ id, name, date, status: 'active' | 'closed',
                orders: [{ id, customerName, customerWA, customerIG,
                           items: [{ menuId, qty }],
                           shipping, discount, paid, notes }] }],
  customers: [{ id, name, wa, ig, createdAt, lastOrderAt }],
  expenses:  [{ id, date, category, amount, notes, poId?, createdAt }]
}

inbox = [{ id, text, createdAt, source: 'doc' }]   // terpisah dari state
```

## Di Firebase

```
/shop                 ← seluruh `state`; array disimpan sebagai objek ber-key id
/inbox/{pushId}       ← { text, createdAt, source }
/allowedUsers/{uid}   = true
```

Array dikonversi ke objek ber-key `id` (`arrayToObj` / `objToArray`) karena Realtime Database
tidak menyimpan array secara andal.

## Rumus

| Nama | Rumus | Dipakai di |
|---|---|---|
| `calcOrderTotal` | subtotal + ongkir − diskon | Tampilan per pesanan, pesan WA/IG (yang dibayar customer) |
| `calcOrderOmzet` | subtotal − diskon | Semua agregat: ringkasan PO, Riwayat, total customer, Keuangan |

---

[← 4. Arsitektur](04-arsitektur.md) · [Daftar isi](README.md) · [6. Deployment & operasional →](06-deployment-operasional.md)
