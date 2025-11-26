// server/db.js
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "perpustakaan1",
});

module.exports = db;
