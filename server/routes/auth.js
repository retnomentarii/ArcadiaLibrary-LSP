// server/routes/auth.js
const express = require("express");
const db = require("../db");
const { generateNextId } = require("../idGenerator");
const multer = require("multer");

const router = express.Router();

// Konfigurasi folder upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/**
 * REGISTER PEMINJAM
 * Form Data (multipart):
 * - nama_peminjam
 * - user_peminjam
 * - pass_peminjam
 * - foto_peminjam (FILE)
 */
router.post("/register", upload.single("foto_peminjam"), (req, res) => {
  const { nama_peminjam, user_peminjam, pass_peminjam } = req.body;
  const fotoPath = req.file ? req.file.path : null;

  if (!nama_peminjam || !user_peminjam || !pass_peminjam) {
    return res.status(400).json({ message: "Data pendaftaran belum lengkap" });
  }

  generateNextId("peminjam", "id_peminjam", "peminjam", (err, id_peminjam) => {
    if (err) {
      console.error("Error generate id_peminjam:", err);
      return res.status(500).json({ message: "Gagal generate id_peminjam" });
    }

    const sql = `
      INSERT INTO peminjam
      (id_peminjam, nama_peminjam, tgl_daftar, user_peminjam, pass_peminjam, foto_peminjam, status_peminjam)
      VALUES (?, ?, CURDATE(), ?, ?, ?, 'AKTIF')
    `;

    db.query(
      sql,
      [id_peminjam, nama_peminjam, user_peminjam, pass_peminjam, fotoPath],
      (err2) => {
        if (err2) {
          console.error("Error insert peminjam:", err2);
          return res.status(500).json({ message: "Gagal menyimpan data peminjam" });
        }

        res.status(201).json({
          id_peminjam,
          nama_peminjam,
          user_peminjam,
          foto_peminjam: fotoPath,
          status_peminjam: "AKTIF",
        });
      }
    );
  });
});

/**
 * LOGIN
 * Body: { username, password, role }  // role: "peminjam" atau "admin"
 */
router.post("/login", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Data login belum lengkap" });
  }

  if (role === "peminjam") {
    const sql =
      "SELECT * FROM peminjam WHERE user_peminjam = ? AND pass_peminjam = ?";

    db.query(sql, [username, password], (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.length === 0) {
        return res.status(401).json({ message: "Username/password salah" });
      }

      const user = rows[0];
      if (user.status_peminjam !== "AKTIF") {
        return res.status(403).json({ message: "Akun peminjam tidak aktif" });
      }

      return res.json({
        role: "peminjam",
        id_peminjam: user.id_peminjam,
        nama_peminjam: user.nama_peminjam,
      });
    });
  } else if (role === "admin") {
    const sql = "SELECT * FROM admin WHERE user_admin = ? AND pass_admin = ?";

    db.query(sql, [username, password], (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.length === 0) {
        return res.status(401).json({ message: "Username/password salah" });
      }

      const user = rows[0];
      return res.json({
        role: "admin",
        id_admin: user.id_admin,
        nama_admin: user.nama_admin,
      });
    });
  } else {
    return res.status(400).json({ message: "Role tidak valid" });
  }
});

module.exports = router;
