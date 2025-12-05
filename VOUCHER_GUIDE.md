# Fitur Voucher - TeknisiNi Admin Dashboard

## Fitur yang Telah Ditambahkan

### Manajemen Voucher Lengkap

Sistem voucher diskon dengan periode berlaku dan berbagai tipe diskon.

## File yang Dibuat

```
app/
├── vouchers/
│   └── page.tsx                 # Halaman kelola vouchers
├── components/
│   ├── VoucherTable.tsx         # Tabel voucher dengan status badge
│   └── VoucherForm.tsx          # Form CRUD vouchers
├── hooks/
│   └── useVouchers.ts           # Custom hook untuk vouchers
├── services/
│   └── voucherService.ts        # Service layer untuk vouchers
└── types/
    └── voucher.ts               # Type definitions untuk voucher
```

## Fitur Voucher

### 1. Tipe Diskon

- **Persentase (%)** - Diskon dalam persentase dengan opsi maksimal diskon
- **Nominal Tetap (Rp)** - Diskon dalam nominal rupiah tetap

### 2. Periode Berlaku

- **Tanggal Mulai** - Kapan voucher mulai dapat digunakan
- **Tanggal Berakhir** - Kapan voucher berakhir
- Otomatis menampilkan status "Expired" jika melewati tanggal berakhir

### 3. Kontrol Penggunaan

- **Limit Penggunaan** - Jumlah maksimal voucher dapat digunakan
- **Usage Count** - Tracking berapa kali sudah digunakan
- Progress bar visual untuk melihat penggunaan
- Status "Habis" jika sudah mencapai limit

### 4. Validasi

- **Minimal Pembelian** - Syarat minimal transaksi untuk menggunakan voucher
- **Maksimal Diskon** - Batas maksimal nominal diskon (khusus persentase)
- **Kode Voucher** - Otomatis diubah menjadi huruf besar, tanpa spasi

### 5. Status Voucher

- **Aktif** - Voucher dapat digunakan (hijau)
- **Nonaktif** - Voucher dinonaktifkan admin (merah)
- **Expired** - Melewati tanggal berakhir (abu-abu)
- **Habis** - Sudah mencapai limit penggunaan (oranye)

## Struktur Data Voucher di Firestore

```typescript
{
  code: string;                    // Kode voucher (uppercase)
  description: string;             // Deskripsi voucher
  discountType: "percentage" | "fixed";
  discountValue: number;           // Nilai diskon (% atau Rp)
  minPurchase: number;             // Minimal pembelian (Rp)
  maxDiscount?: number;            // Maksimal diskon (Rp, opsional)
  usageLimit: number;              // Limit penggunaan
  usageCount: number;              // Jumlah sudah digunakan
  validFrom: Timestamp;            // Tanggal mulai berlaku
  validUntil: Timestamp;           // Tanggal berakhir
  isActive: boolean;               // Status aktif/nonaktif
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Cara Menggunakan

### Menambah Voucher Baru

1. Buka halaman **Vouchers** di sidebar
2. Klik tombol **"Tambah Voucher"**
3. Isi form:
   - **Kode Voucher** - Contoh: DISKON20, WELCOME50
   - **Tipe Diskon** - Pilih Persentase atau Nominal Tetap
   - **Nilai Diskon** - Masukkan nilai (20 untuk 20%, atau 50000 untuk Rp 50.000)
   - **Maksimal Diskon** - (Hanya untuk persentase) Contoh: 100000 = maksimal diskon Rp 100.000
   - **Minimal Pembelian** - Contoh: 100000 = minimal transaksi Rp 100.000
   - **Limit Penggunaan** - Contoh: 100 = hanya 100 orang yang bisa pakai
   - **Berlaku Dari** - Pilih tanggal & waktu mulai
   - **Berlaku Sampai** - Pilih tanggal & waktu berakhir
   - **Deskripsi** - Jelaskan voucher (contoh: "Diskon 20% untuk semua layanan teknisi")
   - **Aktifkan Voucher** - Centang untuk langsung aktif
4. Klik **"Tambah Voucher"**

### Edit Voucher

1. Klik tombol **"Edit"** pada baris voucher
2. Ubah data yang diperlukan
3. Klik **"Update Voucher"**

### Hapus Voucher

1. Klik tombol **"Hapus"** pada baris voucher
2. Konfirmasi penghapusan

### Nonaktifkan Voucher

- Edit voucher dan uncheck **"Aktifkan Voucher"**
- Voucher akan tetap ada di database tapi tidak bisa digunakan

## Contoh Skenario Voucher

### 1. Voucher Persentase dengan Batas Maksimal

```
Kode: HEMAT20
Tipe: Persentase
Nilai: 20%
Maksimal Diskon: Rp 50.000
Min Pembelian: Rp 100.000
Limit: 100 kali
Periode: 1 Des - 31 Des 2025

Hasil: Diskon 20%, maksimal potong Rp 50.000, minimal belanja Rp 100.000
```

### 2. Voucher Nominal Tetap

```
Kode: WELCOME50K
Tipe: Nominal Tetap
Nilai: Rp 50.000
Min Pembelian: Rp 200.000
Limit: 50 kali
Periode: 1 Des - 15 Des 2025

Hasil: Potong langsung Rp 50.000, minimal belanja Rp 200.000
```

### 3. Voucher Flash Sale

```
Kode: FLASH30
Tipe: Persentase
Nilai: 30%
Maksimal Diskon: Rp 100.000
Min Pembelian: Rp 150.000
Limit: 20 kali (terbatas!)
Periode: 5 Des 08:00 - 5 Des 23:59

Hasil: Diskon 30% hanya untuk 20 orang pertama di hari ini
```

## Integrasi dengan Dashboard

### Statistik Dashboard

- **Total Vouchers** - Jumlah semua voucher
- **Voucher Aktif** - Voucher yang aktif dan belum expired

### Menu Sidebar

- Tambahan menu **"Vouchers"** dengan icon tiket

### Quick Actions

- Tombol **"Kelola Vouchers"** untuk akses cepat

## Validasi Otomatis

1. **Kode Voucher**:
   - Otomatis uppercase
   - Spasi dihapus
2. **Tanggal**:
   - Default: Hari ini sampai 30 hari ke depan
3. **Usage Count**:
   - Otomatis 0 saat voucher baru dibuat
   - Increment setiap kali digunakan (dari aplikasi utama)

## Notes untuk Developer

- Collection Firestore: `vouchers`
- Semua tanggal disimpan sebagai `Timestamp`
- Kode voucher di-uppercase di service layer
- Status expired dicek berdasarkan `validUntil` vs waktu sekarang
- Progress bar menunjukkan `usageCount / usageLimit`

## Keamanan

- Hanya admin yang dapat mengelola vouchers
- Protected dengan `ProtectedLayout` (require login)
- Validasi di client-side dan bisa ditambahkan di server-side

## Tips Penggunaan

1. **Buat voucher dengan kode yang mudah diingat** - Contoh: DISKON20, WELCOME, HEMAT
2. **Set limit penggunaan yang realistis** - Jangan terlalu banyak agar tidak rugi
3. **Gunakan maksimal diskon untuk voucher persentase** - Agar tidak minus jika transaksi besar
4. **Nonaktifkan voucher yang sudah tidak relevan** - Daripada dihapus, better dinonaktifkan
5. **Pantau penggunaan lewat progress bar** - Untuk tahu seberapa populer voucher
