// server/idGenerator.js
const db = require("./db");

/**
 * Generate ID varchar otomatis
 * Contoh: prefix = "buku" → buku1, buku2, dst.
 */
function generateNextId(table, column, prefix, callback) {
  const prefixLength = prefix.length;

  const sql = `
    SELECT ${column} AS id
    FROM ${table}
    WHERE ${column} LIKE '${prefix}%'
    ORDER BY CAST(SUBSTRING(${column}, ${prefixLength + 1}) AS UNSIGNED) DESC
    LIMIT 1
  `;

  db.query(sql, (err, rows) => {
    if (err) return callback(err);

    if (rows.length === 0) {
      // belum ada data
      return callback(null, prefix + "1");
    }

    const lastId = rows[0].id; // contoh: "buku12"
    const numberPart = parseInt(lastId.slice(prefixLength), 10) || 0;
    const nextNumber = numberPart + 1;
    const newId = prefix + nextNumber; // contoh: "buku13"

    callback(null, newId);
  });
}

module.exports = { generateNextId };
