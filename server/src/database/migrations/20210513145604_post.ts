import { Knex } from 'knex';
import { Table } from '../../../types';

// Create post table
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(Table.Post, (table: Knex.TableBuilder) => {
    // Schema for the post table
    table.increments('id').primary().unique();
    table.integer('original_poster_id')
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .index();
    table.string('title').notNullable();
    table.integer('likes').notNullable().defaultTo(0);
    table.string('description').notNullable();
    table.timestamps(true, true);
  });
}

// Drop post table
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(Table.Post);
}
