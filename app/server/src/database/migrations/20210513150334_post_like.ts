import { Knex } from 'knex';
import { Table } from '../../../types';

// Create post_like table
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(Table.PostLikes,
    (table: Knex.TableBuilder) => {
      // Schema for the post_like table
      table.increments('id').primary().unique();
      table.integer('post_id')
        .notNullable()
        .references('id')
        .inTable('post')
        .onDelete('CASCADE')
        .index();
      table.integer('liker_id')
        .notNullable()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE')
        .index();
      table.timestamps(true, true);
    });
}

// Drop post_like table
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(Table.PostLikes);
}
