# 📚 Manajemen Matakuliah App - Grace Exauditha

Aplikasi web Full-Stack untuk manajemen data matakuliah yang dibangun menggunakan framework Pyramid (Python) untuk Backend dan React (JS) untuk Frontend.

## 🛠️ Tech Stack

* Backend: Pyramid Framework
* Frontend: React.js (Sage & Cream Aesthetic)
* Database: PostgreSQL
* ORM: SQLAlchemy

## 🚀 Fitur Utama

Aplikasi ini mendukung operasional CRUD penuh secara asinkronus:

1. **Create**: Menambah matakuliah baru melalui form estetik.
2. **Read**: Menampilkan daftar matakuliah dalam bentuk tabel responsif.
3. **Update**: Memperbarui informasi matakuliah yang sudah ada.
4. **Delete**: Menghapus data matakuliah dengan konfirmasi keamanan.

## 📁 Struktur Folder
```
.
├── matakuliah_app/          # Backend (Pyramid)
│   ├── models/              # Definisi Database
│   ├── views/               # Logika API
│   ├── routes.py            # Konfigurasi Endpoints
│   └── __init__.py          # Konfigurasi Server & CORS
└── matakuliah-frontend/     # Frontend (React)
    ├── src/App.js           # Logic & Fetching
    └── src/App.css          # Sage & Cream Styling
```

## ⚙️ Cara Menjalankan

### 1. Backend (Pyramid)

Pastikan virtual environment aktif, lalu jalankan:
```powershell
pserve development.ini --reload
```

### 2. Frontend (React)

Buka terminal baru di folder frontend, lalu jalankan:
```powershell
npm start
```

## 📝 Catatan Integrasi (CORS)

Proyek ini menggunakan CORS Subscriber manual di Pyramid untuk menangani Preflight Request (OPTIONS) dari browser. Hal ini memungkinkan komunikasi antara Frontend (Port 3000) dan Backend (Port 6543).
