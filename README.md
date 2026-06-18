# Dompet Saya - Mobile Access

Untuk mengakses `Catatan Keuangan.html` di HP dan membuatnya jadi installable (Add to Home Screen), jangan kirim file HTML langsung lewat WhatsApp. Browser memerlukan website yang dilayani dari web server, bukan file lokal.

## Cara paling mudah: jalankan web server lokal
1. Buka PowerShell di folder `d:\Coding File`
2. Jalankan:
   ```powershell
   python -m http.server 8000
   ```
3. Temukan alamat IP komputer kamu:
   ```powershell
   ipconfig
   ```
   Cari `IPv4 Address` pada adapter Wi-Fi.
4. Buka browser HP dan masuk ke:
   ```text
   http://<IP-PC-ANDA>:8000/Catatan%20Keuangan.html
   ```

> Contoh: `http://192.168.1.10:8000/Catatan%20Keuangan.html`

## Mengapa ini lebih baik
- Browser di HP akan memuat file dari server HTTP, bukan dari file internal.
- Page manifest dan service worker yang sudah ditambahkan akan mulai bekerja.

## Agar bisa Add to Home Screen dengan baik
Untuk installable PWA, sebaiknya gunakan HTTPS (secure origin). Pilihan yang mudah:

- **GitHub Pages** atau **Netlify**: upload projek ke GitHub dan deploy, langsung dapat HTTPS.
- **ngrok**: jika ingin pakai dari komputer lokal, jalankan `ngrok http 8000` untuk dapat URL HTTPS.

## Multi-device / satu akun
Agar satu akun bisa dipakai di banyak device, app sekarang sudah mendukung login dengan Firebase.

Langkah singkat:
1. Buat project di [Firebase Console](https://console.firebase.google.com/)
2. Aktifkan **Authentication > Sign-in method > Email/Password**
3. Buat database **Firestore** (mode test atau rules aman sesuai kebutuhan)
4. Salin konfigurasi Firebase ke `index.html` pada variabel `firebaseConfig`
5. Deploy ulang ke GitHub Pages

Setelah konfigurasi ini, data transaksi, anggaran, dan alokasi akan tersimpan per akun dan bisa dilihat di device lain setelah login.

## Jika hanya ingin tes segera
Kalau cuma ingin buka di HP tanpa install, `http://<IP>:8000/...` sudah cukup.

## File yang sudah tersedia
- `Catatan Keuangan.html`
- `manifest.json`
- `sw.js`
- `assets/favicon-32.png`
- `assets/icon-192.png`
- `assets/icon-512.png`

Jika kamu mau, saya bisa bantu juga membuatkan panduan deploy ke GitHub Pages atau Netlify. 
