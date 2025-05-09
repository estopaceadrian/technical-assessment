import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Users table
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('name').notNullable();
    table.timestamps(true, true);
  });

  // Tasks table
  await knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('title').notNullable();
    table.text('description');
    table.uuid('assigned_to').references('id').inTable('users');
    table.uuid('created_by').references('id').inTable('users').notNullable();
    table.enum('status', ['TODO', 'IN_PROGRESS', 'COMPLETED']).defaultTo('TODO');
    table.enum('priority', ['LOW', 'MEDIUM', 'HIGH']).defaultTo('MEDIUM');
    table.timestamp('due_date');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks');
  await knex.schema.dropTable('users');
} 