const bcrypt = require('bcrypt');
const pool = require('../config/dbconfig');

const getAll = async () => {
  const result = await pool.query('SELECT * FROM Users');
  return result.rows;
};

const create = async (user) => {
  const query = ('INSERT INTO Users (email, username, password) VALUES ($1, $2, $3)');
  const passwordHash = await bcrypt.hash(user.password, 10);
  const values = [user.email, user.username, passwordHash];
  await pool.query(query, values);

  return {
    email: user.email,
    username: user.username,
    password: passwordHash,
  };
};

module.exports = {
  getAll,
  create,
};
