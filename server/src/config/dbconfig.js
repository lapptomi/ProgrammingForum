const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

/*
const sslConfig = process.env.NODE_ENV === ('development' || 'test')
  ? false
  : { rejectUnauthorized: false };
*/

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
