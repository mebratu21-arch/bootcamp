const knex = require('knex');
const config = require('./knexfile');
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const db = knex(config[environment]);

const initDb = async () => {
  try {
    const hasUsersTable = await db.schema.hasTable('users');
    if (!hasUsersTable) {
      await db.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.text('username').unique().notNullable();
        table.text('password').notNullable();
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log("Users table created.");
    }

    const hasTasksTable = await db.schema.hasTable('tasks');
    if (!hasTasksTable) {
      await db.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.text('title').notNullable();
        table.boolean('completed').defaultTo(false);
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log("Tasks table created.");
    } else {
      // Check if user_id column exists for migration
      const hasColumn = await db.schema.hasColumn('tasks', 'user_id');
      if (!hasColumn) {
        await db.schema.table('tasks', (table) => {
          table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        });
        console.log("user_id column added to tasks table.");
      }
    }
  } catch (err) {
    console.error("Error initializing database with Knex:", err.message);
  }
};

module.exports = {
  db,
  initDb,
};
