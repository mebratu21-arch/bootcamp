const knex = require('knex')
const db = knex
({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 54,
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'myapp_test',
  },
});