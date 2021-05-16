import knex from 'knex';
import dotenv from 'dotenv';
import dbconfig from './knexfile';

dotenv.config();

const config = dbconfig[process.env.NODE_ENV || 'development'];

const database = knex(config);

export default database;
