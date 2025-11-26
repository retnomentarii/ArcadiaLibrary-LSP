# 📚 PERPUSTAKAAN ARCADIA
Fullstack Library Management System (Node.js • React • MySQL)

Perpustakaan Arcadia adalah aplikasi web full-stack yang dirancang untuk mengelola data buku, peminjaman, peminjam, dan admin. Aplikasi ini dibangun menggunakan React untuk frontend, Express.js sebagai backend API, dan MySQL sebagai basis data.

Sistem ini mencakup:
- Manajemen Buku
- Manajemen Peminjam (pendaftaran & perubahan status)
- Proses Peminjaman & Pengembalian Buku
- Upload Foto Peminjam
- Role-based Access (Admin & Peminjam)

---

## 🛠 Tech Stack

### **Frontend**
- React.js  
- React-Bootstrap  
- Axios  

### **Backend**
- Node.js  
- Express.js  
- MySQL  
- Multer  

---

## 📂 Struktur Folder
PERPUSTAKAAN-ARCADIA/
├── client/
│ ├── public/
│ └── src/
│ ├── pages/
│ ├── components/
│ ├── api.js
│ └── App.jsx
└── server/
├── routes/
├── controllers/
├── db.js
├── idGenerator.js
└── index.js

---

## 🚀 Cara Menjalankan

### **1. Clone Repository**
```bash
git clone https://github.com/retnomentarii/LSPArcadiaLib.git
cd LSPArcadiaLib
2. Backend
cd server
npm install
node index.js
Server berjalan di:
http://localhost:5050
3. Frontend
cd client
npm install
npm run dev
Frontend berjalan di:
http://localhost:5173
📌 Catatan
Karena folder client tidak terbaca oleh GitHub, disediakan file ZIP:
🔗 https://drive.google.com/file/d/1pqHqnbmoN6i_K97IKkrH1FCTuQTvzN7w/view?usp=sharing

