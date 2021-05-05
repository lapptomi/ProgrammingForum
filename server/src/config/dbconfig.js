const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const initializeDB = async () => {
  await pool.query('DROP TABLE IF EXISTS Users CASCADE');
  await pool.query(`CREATE TABLE Users (
    id SERIAL PRIMARY KEY, 
    email TEXT NOT NULL, 
    username TEXT NOT NULL UNIQUE, 
    password TEXT NOT NULL)
  `);

  await pool.query('DROP TABLE IF EXISTS Posts CASCADE');
  await pool.query(`CREATE TABLE Posts (
    id SERIAL PRIMARY KEY, 
    original_poster_id INTEGER REFERENCES Users(id), 
    title TEXT NOT NULL, 
    description TEXT NOT NULL,
    posting_date DATE NOT NULL DEFAULT CURRENT_DATE
  )`);

  await pool.query('DROP TABLE IF EXISTS Comments CASCADE');
  await pool.query(`CREATE TABLE Comments (
    id SERIAL PRIMARY KEY, 
    post_id INTEGER REFERENCES Posts(id), 
    writer_id INTEGER REFERENCES Users(id), 
    writer_username TEXT REFERENCES Users(username), 
    comment TEXT NOT NULL,
    posting_date DATE NOT NULL DEFAULT CURRENT_DATE
  )`);
};

module.exports = {
  pool,
  initializeDB,
};
