// server/routes/peminjaman.js
const express = require("express");
const db = require("../db");
const { generateNextId } = require("../idGenerator");

const router = express.Router();

/**
 * PEMINJAM – Step 1: Buat pemesanan peminjaman (tanpa buku dulu)
 * Body: { id_peminjam, tgl_ambil, durasi_hari (7 atau 14) }
 * Auto-filled: kode_pinjam, tgl_pesan (today), tgl_wajibkembali (tgl_ambil + durasi_hari)
 * Status awal: DIPROSES, id_admin: NULL, tgl_kembali: NULL
 * Returns: kode_pinjam untuk digunakan di step 2
 */
router.post("/", (req, res) => {
  const { id_peminjam, tgl_ambil, durasi_hari } = req.body;

  if (!id_peminjam || !tgl_ambil || !durasi_hari) {
    return res.status(400).json({
      message:
        "Data peminjaman belum lengkap (id_peminjam, tgl_ambil, durasi_hari required)",
    });
  }

  if (![7, 14].includes(durasi_hari)) {
    return res
      .status(400)
      .json({ message: "durasi_hari harus 7 atau 14 hari" });
  }

  // generate kode_pinjam: pinjam1, pinjam2, dst
  generateNextId(
    "peminjaman",
    "kode_pinjam",
    "pinjam",
    (err, kode_pinjam) => {
      if (err) {
        console.error("Error generate kode_pinjam:", err);
        return res
          .status(500)
          .json({ message: "Gagal generate kode_pinjam" });
      }

      const sqlPeminjaman = `
        INSERT INTO peminjaman 
        (kode_pinjam, id_peminjam, tgl_pesan, tgl_ambil, tgl_wajibkembali, status_pinjam, id_admin, tgl_kembali)
        VALUES (?, ?, CURDATE(), ?, DATE_ADD(?, INTERVAL ? DAY), 'DIPROSES', NULL, NULL)
      `;

      db.query(
        sqlPeminjaman,
        [kode_pinjam, id_peminjam, tgl_ambil, tgl_ambil, durasi_hari],
        (err2) => {
          if (err2) {
            console.error("Error insert peminjaman:", err2);
            return res
              .status(500)
              .json({ message: "Gagal menyimpan peminjaman" });
          }

          res.status(201).json({
            kode_pinjam,
            id_peminjam,
            tgl_ambil,
            durasi_hari,
            status_pinjam: "DIPROSES",
            message:
              "Peminjaman berhasil dibuat. Silakan tambahkan buku di step berikutnya.",
          });
        }
      );
    }
  );
});

/**
 * PEMINJAM – Step 2: Tambahkan buku ke peminjaman yang sudah dibuat
 * POST /peminjaman/:kode_pinjam/tambah-buku
 * Body: { id_buku } atau { list_buku: [id_buku1, id_buku2, ...] }
 */
router.post("/:kode_pinjam/tambah-buku", (req, res) => {
  const { kode_pinjam } = req.params;
  let { id_buku, list_buku } = req.body;

  if (!list_buku && id_buku) {
    list_buku = [id_buku];
  }

  if (!Array.isArray(list_buku) || list_buku.length === 0) {
    return res.status(400).json({
      message: "list_buku harus berupa array dengan minimal 1 buku",
    });
  }

  const checkSql = "SELECT kode_pinjam FROM peminjaman WHERE kode_pinjam = ?";
  db.query(checkSql, [kode_pinjam], (err, rows) => {
    if (err) {
      console.error("Error check kode_pinjam:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengecek peminjaman" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "Peminjaman tidak ditemukan" });
    }

    const valuesDetail = list_buku.map((id) => [kode_pinjam, id]);
    const sqlDetail =
      "INSERT INTO detil_peminjaman (kode_pinjam, id_buku) VALUES ?";

    db.query(sqlDetail, [valuesDetail], (err3) => {
      if (err3) {
        console.error("Error insert detil_peminjaman:", err3);
        return res.status(500).json({
          message:
            "Gagal menambahkan buku ke peminjaman. Buku mungkin sudah ditambahkan atau tidak ada.",
        });
      }

      res.status(201).json({
        kode_pinjam,
        list_buku,
        message: `${list_buku.length} buku berhasil ditambahkan ke peminjaman`,
      });
    });
  });
});

/**
 * ADMIN / PEMINJAM – daftar peminjaman
 * GET /api/peminjaman
 * Optional query: ?id_peminjam=xxx
 */
router.get("/", (req, res) => {
  const { id_peminjam } = req.query;

  let sql = `
    SELECT p.*, pm.nama_peminjam
    FROM peminjaman p
    JOIN peminjam pm ON p.id_peminjam = pm.id_peminjam
  `;
  const params = [];

  if (id_peminjam) {
    sql += " WHERE p.id_peminjam = ?";
    params.push(id_peminjam);
  }

  sql += " ORDER BY p.kode_pinjam DESC";

  db.query(sql, params, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

/**
 * DETAIL peminjaman (peminjam & admin)
 * GET /api/peminjaman/:kode_pinjam
 */
router.get("/:kode_pinjam", (req, res) => {
  const { kode_pinjam } = req.params;

  const sqlPeminjaman = `
    SELECT p.*, pm.nama_peminjam, a.nama_admin
    FROM peminjaman p
    JOIN peminjam pm ON p.id_peminjam = pm.id_peminjam
    LEFT JOIN admin a ON p.id_admin = a.id_admin
    WHERE p.kode_pinjam = ?
  `;

  const sqlDetail = `
    SELECT dp.id_buku, b.judul_buku, b.nama_pengarang
    FROM detil_peminjaman dp
    JOIN buku b ON dp.id_buku = b.id_buku
    WHERE dp.kode_pinjam = ?
  `;

  db.query(sqlPeminjaman, [kode_pinjam], (err, rows) => {
    if (err) return res.status(500).json(err);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Data peminjaman tidak ditemukan" });
    }

    const peminjaman = rows[0];

    db.query(sqlDetail, [kode_pinjam], (err2, detail) => {
      if (err2) return res.status(500).json(err2);
      res.json({ peminjaman, detail });
    });
  });
});

/**
 * ADMIN – setujui / tolak peminjaman
 * PUT /api/peminjaman/:kode_pinjam/status
 * Body: { id_admin, status_pinjam } // DISETUJUI atau DITOLAK
 */
router.put("/:kode_pinjam/status", (req, res) => {
  const { kode_pinjam } = req.params;
  const { id_admin, status_pinjam } = req.body;

  if (!["DISETUJUI", "DITOLAK"].includes(status_pinjam)) {
    return res.status(400).json({ message: "Status tidak valid" });
  }

  const sql = `
    UPDATE peminjaman
    SET status_pinjam = ?, id_admin = ?, 
        tgl_ambil = IF(? = 'DISETUJUI', CURDATE(), tgl_ambil)
    WHERE kode_pinjam = ?
  `;

  db.query(
    sql,
    [status_pinjam, id_admin, status_pinjam, kode_pinjam],
    (err) => {
      if (err) {
        console.error("Error update status peminjaman:", err);
        return res
          .status(500)
          .json({ message: "Gagal mengupdate status peminjaman" });
      }

      res.json({ message: "Status peminjaman berhasil diperbarui" });
    }
  );
});

/**
 * ADMIN – konfirmasi pengembalian (SELESAI)
 * PUT /api/peminjaman/:kode_pinjam/selesai
 * Body optional: { tgl_kembali }  // kalau tidak ada => pakai CURDATE()
 */
router.put("/:kode_pinjam/selesai", (req, res) => {
  const { kode_pinjam } = req.params;
  const { tgl_kembali } = req.body || {};

  // kalau tgl_kembali tidak dikirim / kosong => pakai NULL, nanti di COALESCE jadi CURDATE()
  const tglParam =
    tgl_kembali && String(tgl_kembali).trim() !== "" ? tgl_kembali : null;

  const sql = `
    UPDATE peminjaman
    SET status_pinjam = 'SELESAI',
        tgl_kembali   = COALESCE(?, CURDATE())
    WHERE kode_pinjam = ?
  `;

  db.query(sql, [tglParam, kode_pinjam], (err) => {
    if (err) {
      console.error("Error set selesai:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengupdate peminjaman" });
    }

    res.json({ message: "Peminjaman diset SELESAI" });
  });
});

/**
 * PEMINJAM / ADMIN – hapus PEMINJAMAN (hanya jika status DIPROSES)
 * DELETE /api/peminjaman/:kode_pinjam
 */
router.delete("/:kode_pinjam", (req, res) => {
  const { kode_pinjam } = req.params;

  const checkSql =
    "SELECT status_pinjam FROM peminjaman WHERE kode_pinjam = ?";

  db.query(checkSql, [kode_pinjam], (err, rows) => {
    if (err) return res.status(500).json(err);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Peminjaman tidak ditemukan" });
    }

    if (rows[0].status_pinjam !== "DIPROSES") {
      return res.status(400).json({
        message: "Peminjaman tidak dapat dihapus karena sudah diproses",
      });
    }

    const deleteSql = "DELETE FROM peminjaman WHERE kode_pinjam = ?";

    db.query(deleteSql, [kode_pinjam], (err2) => {
      if (err2) return res.status(500).json(err2);

      res.json({ message: "Peminjaman berhasil dihapus" });
    });
  });
});

/**
 * ADMIN – mengurangi buku dari daftar pemesanan
 * DELETE /api/peminjaman/:kode_pinjam/buku/:id_buku
 */
router.delete("/:kode_pinjam/buku/:id_buku", (req, res) => {
  const { kode_pinjam, id_buku } = req.params;

  const sql = `
    DELETE FROM detil_peminjaman
    WHERE kode_pinjam = ? AND id_buku = ?
  `;

  db.query(sql, [kode_pinjam, id_buku], (err) => {
    if (err) {
      console.error("Error hapus detil_peminjaman:", err);
      return res
        .status(500)
        .json({ message: "Gagal menghapus buku dari peminjaman" });
    }

    res.status(204).end();
  });
});

module.exports = router;
