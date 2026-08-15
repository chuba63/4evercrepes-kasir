/**
 * ROBOT 4EVER CREPES — Google Docs ➜ Kotak Masuk app
 *
 * Tugasnya: tiap 5 menit ngintip Google Doc, tiap baris baru dikirim ke
 * Firebase (lemari 'inbox'), terus barisnya ditandain ✅ + dicoret biar ga dobel.
 *
 * Robot ini SENGAJA "bodoh" — dia cuma ngirim teks mentah apa adanya.
 * Yang mikir (nyocokin nama menu, mecah jumlah) itu app-nya, soalnya
 * app yang megang daftar menu terkini. Jadi kalo lu nambah menu baru,
 * robot ini GA PERLU diubah sama sekali.
 *
 * Password DISIMPEN DI SCRIPT PROPERTIES, bukan di kode ini.
 */

// --- Setelan yang aman ditulis di sini (bukan rahasia, sama kayak yang ada di app) ---
const API_KEY = 'AIzaSyBH9IO8Vg4tXqLdMHnDelwpoliYH0IyG9U';
const DB_URL  = 'https://evercrepes-kasir-default-rtdb.asia-southeast1.firebasedatabase.app';

// Baris yang diawali tanda ini ga bakal dikirim
const TANDA_SUDAH  = '✅'; // ✅ = udah dikirim robot
const TANDA_CATATAN = '#';     // # = catatan pribadi lu, robot cuekin


/** Ambil setelan rahasia dari Script Properties */
function ambilSetelan(nama) {
  const v = PropertiesService.getScriptProperties().getProperty(nama);
  if (!v) {
    throw new Error(
      'Setelan "' + nama + '" belom diisi.\n' +
      'Buka: ⚙️ Project Settings ➜ Script Properties ➜ Add script property'
    );
  }
  return v;
}


/** Login sebagai akun robot, balikin token buat izin nulis ke Firebase */
function loginRobot() {
  const res = UrlFetchApp.fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY,
    {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        email: ambilSetelan('ROBOT_EMAIL'),
        password: ambilSetelan('ROBOT_PASSWORD'),
        returnSecureToken: true
      }),
      muteHttpExceptions: true
    }
  );
  const body = JSON.parse(res.getContentText());
  if (res.getResponseCode() !== 200) {
    throw new Error('Login robot gagal: ' + ((body.error && body.error.message) || res.getContentText()));
  }
  return body.idToken;
}


/** Ambil semua baris teks di doc (paragraf biasa maupun bullet list) */
function ambilSemuaBaris(body) {
  const hasil = [];
  const jml = body.getNumChildren();
  for (let i = 0; i < jml; i++) {
    const el = body.getChild(i);
    const tipe = el.getType();
    if (tipe === DocumentApp.ElementType.PARAGRAPH) hasil.push(el.asParagraph());
    else if (tipe === DocumentApp.ElementType.LIST_ITEM) hasil.push(el.asListItem());
  }
  return hasil;
}


/** ===== FUNGSI UTAMA — ini yang dijalanin tiap 5 menit ===== */
function kirimPesanan() {
  const doc = DocumentApp.openById(ambilSetelan('DOC_ID'));
  const semua = ambilSemuaBaris(doc.getBody());

  // Saring baris yang belom dikirim
  const belumDikirim = semua.filter(function (p) {
    const t = p.getText().trim();
    if (!t) return false;                               // baris kosong
    if (t.charAt(0) === TANDA_SUDAH) return false;      // udah dikirim
    if (t.charAt(0) === TANDA_CATATAN) return false;    // catatan pribadi
    return true;
  });

  if (belumDikirim.length === 0) {
    Logger.log('Ga ada baris baru. Santai.');
    return;
  }

  // Login sekali aja, dipake buat semua baris
  const token = loginRobot();

  let sukses = 0, gagal = 0;
  for (let i = 0; i < belumDikirim.length; i++) {
    const p = belumDikirim[i];
    const teks = p.getText().trim();

    const res = UrlFetchApp.fetch(DB_URL + '/inbox.json?auth=' + token, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ text: teks, createdAt: Date.now(), source: 'doc' }),
      muteHttpExceptions: true
    });

    if (res.getResponseCode() === 200) {
      // Tandain DULU baru lanjut — biar kalo script mati di tengah jalan,
      // baris yang udah kekirim ga ikut kekirim lagi pas jadwal berikutnya
      p.setText(TANDA_SUDAH + ' ' + teks);
      p.editAsText().setStrikethrough(true).setForegroundColor('#999999');
      sukses++;
    } else {
      gagal++;
      Logger.log('GAGAL kirim "' + teks + '" ➜ ' + res.getContentText());
    }
  }

  Logger.log(sukses + ' baris kekirim' + (gagal ? ', ' + gagal + ' gagal' : '') + '.');
}


/** ===== Dijalanin SEKALI buat masang jadwal 5 menitan ===== */
function pasangJadwal() {
  // Buang jadwal lama biar ga dobel-dobel
  const lama = ScriptApp.getProjectTriggers();
  for (let i = 0; i < lama.length; i++) {
    if (lama[i].getHandlerFunction() === 'kirimPesanan') ScriptApp.deleteTrigger(lama[i]);
  }
  ScriptApp.newTrigger('kirimPesanan').timeBased().everyMinutes(5).create();
  Logger.log('✅ Jadwal kepasang: robot ngecek tiap 5 menit.');
}


/** ===== Matiin robot (kalo suatu saat mau disetop) ===== */
function matikanJadwal() {
  const lama = ScriptApp.getProjectTriggers();
  let n = 0;
  for (let i = 0; i < lama.length; i++) {
    if (lama[i].getHandlerFunction() === 'kirimPesanan') { ScriptApp.deleteTrigger(lama[i]); n++; }
  }
  Logger.log(n ? '🛑 Robot dimatiin.' : 'Emang lagi ga ada jadwal aktif.');
}


/** ===== Tes koneksi — AMAN, ga ngirim & ga ngubah apa-apa ===== */
function cekKoneksi() {
  const doc = DocumentApp.openById(ambilSetelan('DOC_ID'));
  Logger.log('📄 Doc kebaca: "' + doc.getName() + '"');

  const baris = ambilSemuaBaris(doc.getBody()).filter(function (p) {
    const t = p.getText().trim();
    return t && t.charAt(0) !== TANDA_SUDAH && t.charAt(0) !== TANDA_CATATAN;
  });
  Logger.log('📝 Baris yang siap dikirim: ' + baris.length);
  for (let i = 0; i < Math.min(baris.length, 5); i++) {
    Logger.log('   - "' + baris[i].getText().trim() + '"');
  }

  loginRobot();
  Logger.log('🔑 Login robot: BERHASIL');
  Logger.log('✅ Semua siap. Tinggal jalanin pasangJadwal().');
}
