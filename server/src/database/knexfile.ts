import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

interface KnexConfig {
  [env: string]: Knex.Config;
}

const connectionString = process.env.DATABASE_URL;

// Database uses different configuration
// depending what environment (NODE_ENV) is being used
const dbconfig: KnexConfig = {
  development: {
    client: 'postgresql',
    connection: {
      connectionString,
      ssl: { rejectUnauthorized: false },
    },
    searchPath: ['knex', 'public'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },

  test: {
    client: 'postgresql',
    connection: {
      connectionString,
      ssl: { rejectUnauthorized: false },
    },
    searchPath: ['knex', 'public'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      connectionString,
      ssl: { rejectUnauthorized: false },
    },
    searchPath: ['knex', 'public'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};

export default dbconfig;
