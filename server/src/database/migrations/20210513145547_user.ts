import { Knex } from 'knex';
import { Table } from '../../../types';

// Create user table
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(Table.User, (table: Knex.TableBuilder) => {
    // Schema for the user table
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
}

// Drop user table
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(Table.User);
}
