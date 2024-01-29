const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'ontrack',
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
});

module.exports = pool;
