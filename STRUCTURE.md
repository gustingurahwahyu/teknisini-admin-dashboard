# Dashboard TeknisiNi - Project Structure

## 📁 Struktur Folder

```
app/
├── components/          # Reusable UI components
│   ├── DashboardHeader.tsx    # Header dashboard dengan tombol
│   ├── TechnicianForm.tsx     # Form tambah/edit teknisi
│   ├── TechnicianTable.tsx    # Tabel daftar teknisi
│   ├── ProtectedLayout.tsx    # Layout untuk proteksi route
│   └── AuthContext.tsx        # Context untuk autentikasi
│
├── hooks/               # Custom React hooks
│   └── useTechnicians.ts      # Hook untuk logic teknisi
│
├── services/            # Business logic & API calls
│   └── technicianService.ts   # Service untuk operasi CRUD
│
├── types/               # TypeScript interfaces
│   └── technician.ts          # Interface Technician & TechnicianForm
│
├── contexts/            # React contexts
│   └── AuthContext.tsx        # Context autentikasi
│
├── login/               # Halaman login
│   └── page.tsx
│
└── page.tsx             # Homepage (dashboard utama)
```

## 🎯 Komponen Utama

### 1. **page.tsx** (Main Dashboard)

- File utama yang sangat ringkas (~70 baris)
- Menggunakan custom hook `useTechnicians`
- Render komponen: Header, Form, Table

### 2. **hooks/useTechnicians.ts**

- Mengelola semua state dan logic
- Handle CRUD operations
- Form validation dan management

### 3. **services/technicianService.ts**

- Firebase operations (Firestore & Storage)
- Fetch, Create, Update, Delete technicians
- Separate business logic dari UI

### 4. **components/**

- **DashboardHeader**: Header dengan tombol tambah & logout
- **TechnicianForm**: Form reusable untuk tambah/edit
- **TechnicianTable**: Tabel dengan aksi edit & hapus

### 5. **types/technician.ts**

- TypeScript interfaces untuk type safety
- Constants (CATEGORIES)

## ✅ Keuntungan Struktur Ini

1. **Modular**: Setiap komponen punya tanggung jawab spesifik
2. **Reusable**: Komponen bisa digunakan ulang
3. **Maintainable**: Mudah di-maintain dan di-debug
4. **Testable**: Setiap bagian bisa ditest terpisah
5. **Scalable**: Mudah ditambahkan fitur baru
6. **Clean Code**: Code lebih bersih dan mudah dibaca

## 🔄 Flow Data

```
page.tsx
  ↓ uses
useTechnicians (hook)
  ↓ calls
technicianService
  ↓ interacts with
Firebase (Firestore + Storage)
```
