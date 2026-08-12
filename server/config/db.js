// This file creates the connection to our MySQL database
// We use a "pool" so multiple requests can use the database at the same time

const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// promise() lets us use async/await instead of callbacks
const db = pool.promise();

module.exports = db;
