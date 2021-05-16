import { Knex } from 'knex';
import { Table } from '../../../types';

// Create post_comment table
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(Table.PostComments,
    (table: Knex.TableBuilder) => {
      // Schema for the post_comment table
      table.increments('id').primary().unique();
      table.integer('post_id')
        .notNullable()
        .references('id')
        .inTable(Table.Post)
        .onDelete('CASCADE')
        .index();
      table.integer('writer_id')
        .notNullable()
        .references('id')
        .inTable(Table.User)
        .onDelete('CASCADE')
        .index();
      table.integer('likes').notNullable().defaultTo(0);
      table.string('comment').notNullable();
      table.timestamps(true, true);
    });
}

// Drop post_comment table
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(Table.PostComments);
}
