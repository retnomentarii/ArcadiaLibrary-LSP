// server/routes/peminjam.js
const express = require("express");
const db = require("../db");
const { generateNextId } = require("../idGenerator");

const router = express.Router();

/**
 * GET semua peminjam (ADMIN)
 * GET /api/peminjam
 */
router.get("/", (req, res) => {
  const sql = `
    SELECT id_peminjam, nama_peminjam, tgl_daftar, user_peminjam, foto_peminjam, status_peminjam
    FROM peminjam
    ORDER BY id_peminjam ASC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

/**
 * GET detail peminjam berdasarkan id (ADMIN & PEMINJAM)
 * GET /api/peminjam/:id_peminjam
 */
router.get("/:id_peminjam", (req, res) => {
  const { id_peminjam } = req.params;

  const sql = `
    SELECT id_peminjam, nama_peminjam, tgl_daftar, user_peminjam, foto_peminjam, status_peminjam
    FROM peminjam
    WHERE id_peminjam = ?
  `;

  db.query(sql, [id_peminjam], (err, rows) => {
    if (err) return res.status(500).json(err);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Peminjam tidak ditemukan" });
    }
    res.json(rows[0]);
  });
});

/**
 * EDIT data peminjam (ADMIN)
 * PUT /api/peminjam/:id_peminjam
 */
router.put("/:id_peminjam", (req, res) => {
  const { id_peminjam } = req.params;
  const { nama_peminjam, foto_peminjam, status_peminjam } = req.body;

  const sql = `
    UPDATE peminjam
    SET nama_peminjam = ?, foto_peminjam = ?, status_peminjam = ?
    WHERE id_peminjam = ?
  `;

  db.query(
    sql,
    [nama_peminjam, foto_peminjam || null, status_peminjam, id_peminjam],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Data peminjam berhasil diperbarui" });
    }
  );
});

/**
 * NON-AKTIFKAN peminjam (ADMIN)
 * PUT /api/peminjam/:id_peminjam/nonaktif
 */
router.put("/:id_peminjam/nonaktif", (req, res) => {
  const { id_peminjam } = req.params;

  const sql = `
    UPDATE peminjam
    SET status_peminjam = 'TIDAK_AKTIF'
    WHERE id_peminjam = ?
  `;

  db.query(sql, [id_peminjam], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Peminjam berhasil dinonaktifkan" });
  });
});

/**
 * AKTIFKAN peminjam (ADMIN)
 * PUT /api/peminjam/:id_peminjam/aktif
 */
router.put("/:id_peminjam/aktif", (req, res) => {
  const { id_peminjam } = req.params;

  const sql = `
    UPDATE peminjam
    SET status_peminjam = 'AKTIF'
    WHERE id_peminjam = ?
  `;

  db.query(sql, [id_peminjam], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Peminjam berhasil diaktifkan kembali" });
  });
});

module.exports = router;
