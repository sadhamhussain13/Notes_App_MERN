
const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,            // 127.0.0.1
  port: Number(process.env.DB_PORT),    // 3307
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


db.getConnection()
  .then(conn => {
    console.log("✅ Database connection established!");
    conn.release();
  })
  .catch(err => {
    console.error("❌ Error connecting to the database:", err.message);
  });

module.exports = db;
