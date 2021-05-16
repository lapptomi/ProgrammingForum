import { Knex } from 'knex';
import { Table } from '../../../types';

// Create post_comment_like table
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(Table.PostCommentLikes,
    (table: Knex.TableBuilder) => {
      // Schema for the post_comment_like table
      table.increments('id').primary();
      table.integer('post_comment_id')
        .notNullable()
        .references('id')
        .inTable(Table.PostComments)
        .onDelete('CASCADE')
        .index();
      table.integer('liker_id')
        .notNullable()
        .references('id')
        .inTable(Table.User)
        .onDelete('CASCADE')
        .index();
      table.timestamps(true, true);
    });
}

// Drop post_comment_like table
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(Table.PostCommentLikes);
}
