// server/index.js
const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");

const authRoutes = require("./routes/auth");
const bukuRoutes = require("./routes/buku");
const peminjamRoutes = require("./routes/peminjam");
const peminjamanRoutes = require("./routes/peminjaman");

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

// Cek server hidup
app.get("/", (req, res) => {
  res.send("API Drive-Thru Perpustakaan Arcadia jalan di port 5050 🔥");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/buku", bukuRoutes);
app.use("/api/peminjam", peminjamRoutes);
app.use("/api/peminjaman", peminjamanRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
