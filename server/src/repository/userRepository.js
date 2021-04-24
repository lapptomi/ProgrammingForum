const bcrypt = require('bcrypt');
const { pool } = require('../config/dbconfig');

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

const findByUsername = async (username) => {
  const query = ('SELECT * FROM Users WHERE (username = $1)');
  const result = await pool.query(query, [username]);
  if (result.rowCount === 0) {
    throw new Error(`No user found with username: ${username}`);
  }
  return result.rows[0]; // result.rows[0] is the user found from the db
};

module.exports = {
  getAll,
  create,
  findByUsername,
};
