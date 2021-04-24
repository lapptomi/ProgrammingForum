const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const initializeDB = async () => {
  await pool.query('DROP TABLE IF EXISTS Users');
  await pool.query('CREATE TABLE Users (id SERIAL PRIMARY KEY, email TEXT NOT NULL, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL)');

  await pool.query('DROP TABLE IF EXISTS Posts');
  await pool.query('CREATE TABLE Posts (id SERIAL PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL)');

  await pool.query('DROP TABLE IF EXISTS Comments');
  await pool.query('CREATE TABLE Comments (id SERIAL PRIMARY KEY, comment TEXT NOT NULL)');
};

module.exports = {
  pool,
  initializeDB,
};
