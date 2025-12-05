# TeknisiNi Admin Dashboard - Dokumentasi Fitur Baru

## Fitur yang Ditambahkan

### 1. Sidebar Navigation
- Sidebar responsif dengan menu navigasi
- Support mobile dengan hamburger menu
- Navigasi antar halaman: Dashboard, Teknisi, dan Bookings
- Tombol logout terintegrasi

### 2. Manajemen Bookings
- CRUD lengkap untuk data bookings
- Tabel dengan filter status
- Form untuk menambah/edit booking
- Integrasi dengan Firebase Firestore collection `bookings`

### 3. Dashboard Overview
- Statistik real-time:
  - Total Teknisi
  - Total Bookings
  - Booking Pending
  - Booking Selesai
- Quick actions untuk akses cepat ke halaman teknisi dan bookings

## Struktur File Baru

```
app/
├── bookings/
│   └── page.tsx                 # Halaman kelola bookings
├── technicians/
│   └── page.tsx                 # Halaman kelola teknisi
├── components/
│   ├── Sidebar.tsx              # Komponen sidebar navigation
│   ├── BookingTable.tsx         # Tabel untuk menampilkan bookings
│   ├── BookingForm.tsx          # Form untuk CRUD bookings
│   └── ProtectedLayout.tsx      # Updated dengan sidebar
├── hooks/
│   └── useBookings.ts           # Custom hook untuk bookings
├── services/
│   └── bookingService.ts        # Service layer untuk bookings
├── types/
│   └── booking.ts               # Type definitions untuk booking
└── page.tsx                     # Dashboard utama dengan overview
```

## Cara Menggunakan

### Menjalankan Aplikasi

1. Pastikan environment variables sudah di-set di `.env.local`
2. Install dependencies (jika belum):
   ```bash
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm run dev
   ```
4. Buka browser di `http://localhost:3000`

### Navigasi

- **Dashboard** (`/`) - Overview statistik dan quick actions
- **Teknisi** (`/technicians`) - Kelola data teknisi
- **Bookings** (`/bookings`) - Kelola data bookings

### Fitur Bookings

#### Menambah Booking Baru
1. Klik tombol "Tambah Booking"
2. Isi form dengan data:
   - User ID
   - Technician ID
   - Nama Teknisi
   - Kategori
   - Alamat
   - Jadwal (date & time)
   - Status (pending/confirmed/in-progress/completed/cancelled)
   - Total Harga
   - Catatan (opsional)
3. Klik "Tambah Booking"

#### Edit Booking
1. Klik tombol "Edit" pada baris booking
2. Ubah data yang diperlukan
3. Klik "Update Booking"

#### Hapus Booking
1. Klik tombol "Hapus" pada baris booking
2. Konfirmasi penghapusan

## Status Booking

- **Menunggu** (pending) - Booking baru menunggu konfirmasi
- **Dikonfirmasi** (confirmed) - Booking sudah dikonfirmasi
- **Sedang Dikerjakan** (in-progress) - Teknisi sedang mengerjakan
- **Selesai** (completed) - Pekerjaan sudah selesai
- **Dibatalkan** (cancelled) - Booking dibatalkan

## Struktur Data Booking di Firestore

```typescript
{
  userId: string;
  technicianId: string;
  technicianName: string;
  category: string;
  address: string;
  scheduledDate: Timestamp;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  notes?: string;
  totalPrice: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Responsive Design

- Desktop: Sidebar tetap terlihat di sebelah kiri
- Mobile: Sidebar tersembunyi, dapat diakses via hamburger menu
- Semua tabel responsive dengan scroll horizontal pada layar kecil

## Notes

- Pastikan collection `bookings` sudah ada di Firebase Firestore
- Environment variables sudah di-set dengan benar di `.env.local`
- Sidebar otomatis highlight menu yang aktif berdasarkan route saat ini
