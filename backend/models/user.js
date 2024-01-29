const bcrypt = require('bcrypt');
const pool = require('./db.js');

const authenticateUser = async (username, password) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  const user = rows[0];

  if (user && await bcrypt.compare(password, user.password_hash)) {
    return user;
  } else {
    return null;
  }
};

const registerUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await pool.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hashedPassword]);
    return rows.insertId;
    };

module.exports = { registerUser, authenticateUser };
