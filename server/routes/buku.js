// server/routes/buku.js
const express = require("express");
const db = require("../db");
const { generateNextId } = require("../idGenerator");

const router = express.Router();

// GET semua buku
router.get("/", (req, res) => {
  db.query("SELECT * FROM buku ORDER BY id_buku ASC", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// POST tambah buku (id_buku: buku1, buku2, dst)
router.post("/", (req, res) => {
  const { judul_buku, tgl_terbit, nama_pengarang, nama_penerbit } = req.body;

  if (!judul_buku) {
    return res.status(400).json({ message: "Judul buku wajib diisi" });
  }

  generateNextId("buku", "id_buku", "buku", (err, id_buku) => {
    if (err) {
      console.error("Error generate id_buku:", err);
      return res.status(500).json({ message: "Gagal generate id_buku" });
    }

    const sql = `
      INSERT INTO buku (id_buku, judul_buku, tgl_terbit, nama_pengarang, nama_penerbit)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [id_buku, judul_buku, tgl_terbit || null, nama_pengarang || null, nama_penerbit || null],
      (err2) => {
        if (err2) {
          console.error("Error insert buku:", err2);
          return res.status(500).json({ message: "Gagal menyimpan buku" });
        }

        res.status(201).json({
          id_buku,
          judul_buku,
          tgl_terbit,
          nama_pengarang,
          nama_penerbit,
        });
      }
    );
  });
});

// PUT update buku
router.put("/:id_buku", (req, res) => {
  const { id_buku } = req.params;
  const { judul_buku, tgl_terbit, nama_pengarang, nama_penerbit } = req.body;

  const sql = `
    UPDATE buku
    SET judul_buku = ?, tgl_terbit = ?, nama_pengarang = ?, nama_penerbit = ?
    WHERE id_buku = ?
  `;

  db.query(
    sql,
    [judul_buku, tgl_terbit || null, nama_pengarang || null, nama_penerbit || null, id_buku],
    (err) => {
      if (err) {
        console.error("Error update buku:", err);
        return res.status(500).json({ message: "Gagal mengupdate buku" });
      }
      res.json({ message: "Buku berhasil diupdate" });
    }
  );
});

// DELETE buku
router.delete("/:id_buku", (req, res) => {
  const { id_buku } = req.params;

  db.query("DELETE FROM buku WHERE id_buku = ?", [id_buku], (err) => {
    if (err) {
      console.error("Error delete buku:", err);
      return res.status(500).json({ message: "Gagal menghapus buku" });
    }
    res.status(204).end();
  });
});

module.exports = router;

