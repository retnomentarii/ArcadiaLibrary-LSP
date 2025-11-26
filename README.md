# LSP - Arcadia Dhrive-Thru Library
PERPUSTAKAAN ARCADIA
Sistem Manajemen Perpustakaan — Fullstack Web App (Node.js + React + MySQL)
📌 Deskripsi
Perpustakaan Arcadia adalah aplikasi web full-stack yang dirancang untuk mengelola data buku, peminjaman, peminjam, dan admin.
Project ini dibuat dengan React untuk frontend, Express.js untuk backend API, dan MySQL sebagai database utama.
Aplikasi ini mendukung:
Manajemen Buku
Manajemen Peminjam (pendaftaran dan perubahan status akun)
Proses Peminjaman & Pengembalian Buku
Upload Foto Peminjam
Hak akses peran peminjam dan admin

🛠️ Tech Stack
Frontend
React.js
React-Bootstrap
Axios
Backend
Node.js
Express.js
MySQL
Multer (upload gambar)
Database
MySQL

Struktur Folder
PERPUSTAKAAN-ARCADIA/
├── client/               # Frontend React
│   ├── public/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── api.js
│       └── App.jsx
└── server/               # Backend Express
    ├── routes/
    ├── controllers/
    ├── db.js
    ├── idGenerator.js
    └── index.js

🚀 Cara Menjalankan Project
1. Clone Repository atau Download Zip
   git clone https://github.com/retnomentarii/LSPArcadiaLib.git
   cd LSPArcadiaLib
2. Setup Backend
   Masuk folder server:
   cd server
   npm install
   Jalankan server
   node index.js
   Server default: http://localhost:5050
4. Setup Frontend
   Masuk folder client:
   cd client
   npm install
   npm run dev

Note: Karena folder client sebagai frontend tidak dapat dibaca oleh github, maka saya memberikan alternatif link drive untuk file zip sebagai berikut:
https://drive.google.com/file/d/1pqHqnbmoN6i_K97IKkrH1FCTuQTvzN7w/view?usp=sharing
