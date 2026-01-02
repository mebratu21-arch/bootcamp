/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // Create Lists Table
    .createTable('lists', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // Create Tags Table
    .createTable('tags', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('color').defaultTo('#6366f1'); // Default primary color
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // Create Subtasks Table
    .createTable('subtasks', function(table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.boolean('completed').defaultTo(false);
      table.integer('task_id').unsigned().references('id').inTable('tasks').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // Create Junction Table for Task Tags
    .createTable('task_tags', function(table) {
      table.increments('id').primary();
      table.integer('task_id').unsigned().references('id').inTable('tasks').onDelete('CASCADE');
      table.integer('tag_id').unsigned().references('id').inTable('tags').onDelete('CASCADE');
    })
    // Modify Tasks Table
    .table('tasks', function(table) {
      table.text('description');
      table.enu('priority', ['low', 'medium', 'high']).defaultTo('medium');
      table.timestamp('due_date');
      table.integer('list_id').unsigned().references('id').inTable('lists').onDelete('SET NULL');
      table.enu('status', ['todo', 'in-progress', 'completed']).defaultTo('todo');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .table('tasks', function(table) {
      table.dropColumn('description');
      table.dropColumn('priority');
      table.dropColumn('due_date');
      table.dropColumn('list_id');
      table.dropColumn('status');
    })
    .dropTableIfExists('task_tags')
    .dropTableIfExists('subtasks')
    .dropTableIfExists('tags')
    .dropTableIfExists('lists');
};
