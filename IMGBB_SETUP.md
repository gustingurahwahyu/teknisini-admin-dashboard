# Cara Mendapatkan ImgBB API Key (GRATIS)

ImgBB adalah layanan hosting gambar gratis unlimited. Cocok sebagai alternatif Firebase Storage.

## ✅ Keunggulan ImgBB:

- 🎉 **Gratis unlimited** storage & bandwidth
- 📁 Upload hingga **32MB** per gambar
- 🚀 CDN cepat di seluruh dunia
- 🔗 Langsung dapat URL permanen
- ⚡ Tidak perlu setup kompleks

## 📝 Langkah Mendapatkan API Key:

### 1. Daftar Akun

- Buka: https://imgbb.com/
- Klik **"Sign Up"** (pojok kanan atas)
- Daftar dengan email atau gunakan akun Google/Facebook

### 2. Dapatkan API Key

- Setelah login, buka: https://api.imgbb.com/
- Klik **"Get API Key"**
- Isi nama aplikasi, contoh: `TeknisIni Dashboard`
- Klik **"Get API Key"**
- Copy API Key yang muncul

### 3. Masukkan ke .env.local

```env
NEXT_PUBLIC_IMGBB_API_KEY=paste_api_key_disini
```

### 4. Restart Development Server

```bash
# Tekan Ctrl+C untuk stop server
# Lalu jalankan lagi:
npm run dev
```

## 🎯 Contoh API Key

```
1234567890abcdef1234567890abcdef
```

## 🔧 Testing

1. Jalankan aplikasi: `npm run dev`
2. Buka halaman Teknisi
3. Tambah teknisi baru dengan foto
4. Foto akan otomatis terupload ke ImgBB
5. Check di https://imgbb.com (dashboard) untuk melihat gambar yang diupload

## ⚠️ Jika Tidak Ingin Pakai Foto

Jika tidak memasukkan API key atau mengosongkan field foto:

- ✅ Teknisi tetap bisa disimpan
- ✅ photoURL akan kosong (`""`)
- ✅ Tidak akan error

## 📚 Dokumentasi

- Website: https://imgbb.com
- API Docs: https://api.imgbb.com/
- Dashboard: https://imgbb.com/my/images (setelah login)

## 💡 Tips

- **Batas upload**: 32MB per gambar (lebih dari cukup untuk foto profil)
- **Format supported**: JPG, PNG, GIF, BMP, WEBP
- **Unlimited**: Tidak ada batas jumlah gambar atau bandwidth
- **CDN**: Gambar ter-host di CDN global (cepat diakses dari mana saja)
