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
```
PERPUSTAKAAN-ARCADIA/
├── client/
│   ├── public/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── api.js
│       └── App.jsx
└── server/
    ├── routes/
    ├── controllers/
    ├── db.js
    ├── idGenerator.js
    └── index.js
```

---

## Screenshoots page
Landing Page
<img width="1470" height="919" alt="Screenshot 2025-11-26 at 18 39 18" src="https://github.com/user-attachments/assets/8f87f170-8fea-4cd4-ae62-5dadfba575f4" />

Register Peminjam
<img width="1470" height="919" alt="Screenshot 2025-11-26 at 18 43 00" src="https://github.com/user-attachments/assets/86a6749e-7ac3-4162-bb64-04e14b842f3b" />


Halaman Akses Peminjam
<img width="1470" height="919" alt="Screenshot 2025-11-26 at 18 43 59" src="https://github.com/user-attachments/assets/91f512c9-f5a4-4c43-a897-2343bc73a965" />
<img width="1470" height="919" alt="Screenshot 2025-11-26 at 18 44 52" src="https://github.com/user-attachments/assets/f1021b47-37e4-4a9c-98bd-b4b0f171557e" />
<img width="1470" height="919" alt="Screenshot 2025-11-26 at 18 45 30" src="https://github.com/user-attachments/assets/3aba5f82-47bd-44f4-afe6-7fbc67d93907" />


Halaman Akses Admin
<br>Manajemen Peminjaman</br> 
<img width="1470" height="919" alt="Screenshot 2025-11-26 at 18 48 03" src="https://github.com/user-attachments/assets/ed20a909-05d4-45d4-9f0f-f23e06a9c46f" />
<img width="1470" height="919" alt="Screenshot 2025-11-26 at 18 48 40" src="https://github.com/user-attachments/assets/2179a4bd-3838-4a39-b4d3-5e548487b667" />
<img width="1470" height="919" alt="Screenshot 2025-11-26 at 18 49 28" src="https://github.com/user-attachments/assets/afcaeeb9-e5e7-470c-bba1-0257a1c5d6c4" />

Manajemen Buku
<img width="1470" height="919" alt="Screenshot 2025-11-26 at 18 50 28" src="https://github.com/user-attachments/assets/c78f7a56-f53a-42c6-a35e-686012db10c4" />
<img width="1470" height="919" alt="Screenshot 2025-11-26 at 18 50 36" src="https://github.com/user-attachments/assets/e5c58516-8d19-4789-8742-a2e5a87f5c90" />

Manajemen Peminjam (Ubah status akun)
<img width="1470" height="919" alt="Screenshot 2025-11-26 at 18 57 26" src="https://github.com/user-attachments/assets/4f2a0ac8-ee59-4fe5-9967-aec956ac031f" />







---

## 🚀 Cara Menjalankan

### **1. Clone Repository atau Download Zip kemudian masuk ke main folder**
```bash
git clone https://github.com/retnomentarii/LSPArcadiaLib.git
cd LSPArcadiaLib
```
2. Backend
```bash
cd server
npm install
node index.js
```
Server berjalan di:
http://localhost:5050
4. Frontend
```bash
cd client
npm install
npm run dev
```
Frontend berjalan di:
http://localhost:3000

## 📌 Catatan
Karena folder client tidak terbaca oleh GitHub, disediakan file ZIP:
🔗 https://drive.google.com/file/d/1pqHqnbmoN6i_K97IKkrH1FCTuQTvzN7w/view?usp=sharing

